import React, {
    forwardRef,
    useState,
    useMemo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react'
import Block from '../Primitives/Block/Block'
import { TextInputV2, InputSizeV2 } from '../InputsV2/TextInputV2'
import { MenuV2, MenuV2Alignment, MenuV2GroupType, MenuV2Side } from '../MenuV2'
import { isDateToday, getDatePartsInTimezone } from './utils'
import { DateRange } from './types'
import {
    type TimeValue,
    createTimeValue,
    formatTimeValue,
    generateTimeSlots,
    parseTimeInput,
    timeValueFromString,
    timeValueToString,
} from '../shared/datetime/timeCore'

type TimeSelectorProps = {
    value: string
    onChange: (time: string) => void
    disablePastDates: boolean
    disableFutureDates: boolean
    today: Date
    isStart: boolean
    selectedRange?: DateRange
    timezone?: string
    className?: string
    autoFocus?: boolean
    tabIndex?: number
    id?: string
    'aria-label'?: string
}

/**
 * Imperative escape hatch for callers that need the field's typed value
 * *right now* rather than waiting for its own blur/debounce cycle — see
 * `commitPendingInput`'s own docs below for why that's needed at all.
 */
export type TimeSelectorHandle = {
    /**
     * Synchronously parses and commits whatever is currently typed (calling
     * `onChange` immediately, the same way the field's own blur handler
     * eventually would), and returns the committed value — or `undefined`
     * if there's nothing pending (empty/invalid/unchanged input), in which
     * case the caller should keep using its own last-known value.
     */
    commitPendingInput: () => string | undefined
}

/**
 * DateRangePicker's time field is minute-granularity, 15-minute stepped and
 * always displayed in 12-hour form. It delegates all of that to the shared
 * time core (`components/shared/datetime/timeCore`) so `TimePicker` and
 * `SingleDatePicker` parse and format identically.
 */
const TIME_SELECTOR_STEP_MINUTES = 15

const formatTimeStringFor12Hour = (timeString: string): string => {
    const parsed = timeValueFromString(timeString)
    if (!parsed) return ''
    return formatTimeValue(parsed, { format: '12h' })
}

const generateTimeOptions = (
    onSelect: (timeValue: string) => void,
    minTime: TimeValue,
    maxTime: TimeValue
): MenuV2GroupType[] => {
    const options = generateTimeSlots({
        stepMinutes: TIME_SELECTOR_STEP_MINUTES,
        minTime,
        maxTime,
    }).map((slot) => ({
        label: { text: formatTimeValue(slot, { format: '12h' }) },
        onClick: () => onSelect(timeValueToString(slot)),
    }))

    return [{ items: options }]
}

const TimeSelector = forwardRef<TimeSelectorHandle, TimeSelectorProps>(
    (
        {
            value,
            onChange,
            disablePastDates,
            disableFutureDates,
            today,
            isStart,
            selectedRange,
            timezone,
            tabIndex,
            id,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false)
        const [inputValue, setInputValue] = useState('')
        const [isValidTime, setIsValidTime] = useState(true)
        const [isProcessingSelection, setIsProcessingSelection] =
            useState(false)
        const stParts =
            selectedRange &&
            (timezone
                ? getDatePartsInTimezone(selectedRange.startDate, timezone)
                : {
                      year: selectedRange.startDate.getFullYear(),
                      month: selectedRange.startDate.getMonth(),
                      day: selectedRange.startDate.getDate(),
                      hours: selectedRange.startDate.getHours(),
                      minutes: selectedRange.startDate.getMinutes(),
                      seconds: selectedRange.startDate.getSeconds(),
                  })
        const startDate =
            stParts &&
            new Date(
                stParts.year,
                stParts.month,
                stParts.day,
                stParts.hours,
                stParts.minutes,
                stParts.seconds
            )

        const edParts = !selectedRange?.endDate
            ? undefined
            : timezone
              ? getDatePartsInTimezone(selectedRange.endDate, timezone)
              : {
                    year: selectedRange.endDate.getFullYear(),
                    month: selectedRange.endDate.getMonth(),
                    day: selectedRange.endDate.getDate(),
                    hours: selectedRange.endDate.getHours(),
                    minutes: selectedRange.endDate.getMinutes(),
                    seconds: selectedRange.endDate.getSeconds(),
                }
        const endDate = edParts
            ? new Date(
                  edParts.year,
                  edParts.month,
                  edParts.day,
                  edParts.hours,
                  edParts.minutes,
                  edParts.seconds
              )
            : selectedRange?.endDate

        const isToday =
            startDate && isStart
                ? isDateToday(startDate, today)
                : endDate
                  ? isDateToday(endDate, today)
                  : false
        const [minHour, minMunite] =
            disablePastDates && isToday
                ? [today.getHours(), today.getMinutes()]
                : [0, 0]
        const [maxHour, maxMinute] =
            disableFutureDates && isToday
                ? [today.getHours(), today.getMinutes()]
                : [23, 59]

        const minTime = useMemo(
            () => createTimeValue(minHour, minMunite),
            [minHour, minMunite]
        )
        const maxTime = useMemo(
            () => createTimeValue(maxHour, maxMinute),
            [maxHour, maxMinute]
        )

        const parseInput = useCallback(
            (input: string) =>
                parseTimeInput(input, {
                    minTime,
                    maxTime,
                    // Minute-granularity field: reject "12:30:45".
                    allowSeconds: false,
                }),
            [minTime, maxTime]
        )

        useEffect(() => {
            if (value) {
                const displayValue = formatTimeStringFor12Hour(value)
                setInputValue(displayValue)
                setIsValidTime(true)
            }
        }, [value])

        const handleTimeSelect = useCallback(
            (timeValue: string) => {
                setIsProcessingSelection(true)
                setInputValue(formatTimeStringFor12Hour(timeValue))
                setIsValidTime(true)
                onChange(timeValue)
                setIsOpen(false)

                setTimeout(() => {
                    setIsProcessingSelection(false)
                }, 100)
            },
            [onChange]
        )

        const timeOptions = useMemo(
            () => generateTimeOptions(handleTimeSelect, minTime, maxTime),
            [handleTimeSelect, minTime, maxTime]
        )

        const handleOpenChange = useCallback(
            (open: boolean) => {
                const isDateSelected =
                    isStart && selectedRange
                        ? selectedRange.startDate
                        : selectedRange?.endDate
                if (!isProcessingSelection && isDateSelected) {
                    setIsOpen(open)
                }
            },
            [isProcessingSelection, selectedRange, isStart]
        )

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value

                // Allow better typing experience
                setInputValue(newValue)

                const parsed = parseInput(newValue)
                setIsValidTime(parsed !== null || newValue.trim() === '')
            },
            [parseInput]
        )

        const handleInputFocus = useCallback(() => {}, [])

        const pendingBlurTimeoutRef = useRef<ReturnType<
            typeof setTimeout
        > | null>(null)

        // Shared by the blur handler (debounced, see below) and the
        // imperative `commitPendingInput` (synchronous). Parses whatever is
        // currently typed and, if valid, commits it via `onChange` —
        // returning the committed value, or `undefined` when there was
        // nothing to commit (empty, unchanged, or unparseable input).
        const commitTypedInput = useCallback((): string | undefined => {
            const trimmedInput = inputValue.trim()

            if (!trimmedInput) {
                setInputValue(formatTimeStringFor12Hour(value))
                setIsValidTime(true)
                return undefined
            }

            const parsed = parseInput(trimmedInput)

            if (!parsed) {
                setInputValue(formatTimeStringFor12Hour(value))
                setIsValidTime(true)
                return undefined
            }

            const finalTimeValue = timeValueToString(parsed)
            setInputValue(formatTimeStringFor12Hour(finalTimeValue))
            setIsValidTime(true)

            // Unchanged from the committed value — nothing to flush.
            if (finalTimeValue === value) {
                return undefined
            }

            onChange(finalTimeValue)
            return finalTimeValue
        }, [inputValue, value, parseInput, onChange])

        const handleInputBlur = useCallback(() => {
            if (isProcessingSelection) {
                return
            }

            // Debounced rather than immediate: clicking a dropdown option
            // also blurs this input (focus moves to the option) before the
            // option's own click handler runs and flips
            // `isProcessingSelection`, so committing immediately here would
            // win that race and overwrite the selection with a re-parse of
            // the stale typed text. Waiting lets that flag land first.
            // `commitPendingInput` (below) exists for callers that can't
            // afford this delay — e.g. clicking Apply immediately after
            // typing, which blurs this field but must see the typed value
            // applied right away, not 150ms later after the popover has
            // already closed (#1787).
            pendingBlurTimeoutRef.current = setTimeout(() => {
                pendingBlurTimeoutRef.current = null
                if (!isOpen && !isProcessingSelection) {
                    commitTypedInput()
                }
            }, 150)
        }, [isOpen, isProcessingSelection, commitTypedInput])

        const commitPendingInput = useCallback((): string | undefined => {
            if (pendingBlurTimeoutRef.current) {
                clearTimeout(pendingBlurTimeoutRef.current)
                pendingBlurTimeoutRef.current = null
            }
            return commitTypedInput()
        }, [commitTypedInput])

        useImperativeHandle(ref, () => ({ commitPendingInput }), [
            commitPendingInput,
        ])

        const handleInputKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    if (!isOpen) {
                        setIsOpen(true)
                    } else {
                        setIsOpen(false)
                        e.currentTarget.blur()
                    }
                } else if (e.key === 'Escape') {
                    e.preventDefault()
                    setInputValue(formatTimeStringFor12Hour(value))
                    setIsValidTime(true)
                    setIsOpen(false)
                    e.currentTarget.blur()
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    if (!isOpen) {
                        setIsOpen(true)
                    }
                }
            },
            [value, isOpen]
        )

        const handleInputClick = useCallback(() => {
            if (!isProcessingSelection && !isOpen) {
                setIsOpen(true)
            }
        }, [isProcessingSelection, isOpen])

        const triggerElement = (
            <Block
                data-element="time-selector"
                role="button"
                tabIndex={-1}
                style={{ width: '118px', flexShrink: 0 }}
            >
                <TextInputV2
                    id={id}
                    type="text"
                    disabled={
                        isStart && selectedRange
                            ? !selectedRange.startDate
                            : !selectedRange?.endDate
                    }
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onClick={handleInputClick}
                    onKeyDown={handleInputKeyDown}
                    placeholder="12:00 PM"
                    size={InputSizeV2.SM}
                    error={{ show: !isValidTime, message: '' }}
                    tabIndex={tabIndex}
                    label=""
                    aria-label={ariaLabel}
                />
            </Block>
        )

        return (
            <Block style={{ width: '118px', flexShrink: 0 }}>
                <MenuV2
                    trigger={triggerElement}
                    items={timeOptions}
                    open={isOpen && !isProcessingSelection}
                    onOpenChange={handleOpenChange}
                    side={MenuV2Side.BOTTOM}
                    alignment={MenuV2Alignment.START}
                    sideOffset={4}
                    dimensions={{
                        maxHeight: 200,
                        minWidth: 120,
                        maxWidth: 120,
                    }}
                />
            </Block>
        )
    }
)

TimeSelector.displayName = 'TimeSelector'

export default TimeSelector

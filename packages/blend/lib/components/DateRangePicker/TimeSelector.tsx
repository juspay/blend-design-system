import React, {
    forwardRef,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from 'react'
import Block from '../Primitives/Block/Block'
import TextInput from '../Inputs/TextInput/TextInput'
import { TextInputSize } from '../Inputs/TextInput/types'
import Menu from '../Menu/Menu'
import {
    MenuItemType,
    MenuGroupType,
    MenuAlignment,
    MenuSide,
} from '../Menu/types'
import { isDateToday, getDatePartsInTimezone } from './utils'
import { DateRange } from './types'

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

const formatTimeFor12Hour = (hour: number, minute: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

const formatTimeStringFor12Hour = (timeString: string): string => {
    const [hour, minute] = timeString.split(':').map(Number)
    return formatTimeFor12Hour(hour, minute)
}

const parseTimeInput = (
    input: string,
    minHour: number,
    minMunite: number,
    maxHour: number,
    maxMinute: number
): {
    hour: number
    minute: number
    isValid: boolean
    originalInput: string
} => {
    const originalInput = input.trim()
    if (!originalInput) {
        return { hour: 0, minute: 0, isValid: false, originalInput }
    }

    const cleanInput = input.replace(/\s+/g, ' ').trim().toUpperCase()

    const timePatterns = [
        /^(\d{1,2})(?::(\d{1,2}))?\s*(AM|PM)$/i, // 12:30 PM, 12 PM
        /^(\d{1,2})(?::(\d{1,2}))$/, // 12:30, 12
        /^(\d{3,4})$/, // 1230, 130
    ]

    for (const pattern of timePatterns) {
        const match = cleanInput.match(pattern)
        if (!match) continue

        let hour: number
        let minute: number
        const period = match[3]?.toUpperCase()

        if (pattern === timePatterns[2]) {
            const digits = match[1]
            if (digits.length === 3) {
                hour = parseInt(digits.slice(0, 1), 10)
                minute = parseInt(digits.slice(1), 10)
            } else {
                hour = parseInt(digits.slice(0, 2), 10)
                minute = parseInt(digits.slice(2), 10)
            }
        } else {
            hour = parseInt(match[1], 10)
            minute = parseInt(match[2] || '0', 10)
        }

        if (minute < 0 || minute > 59) continue

        if (period) {
            if (hour < 1 || hour > 12) continue
            if (period === 'PM' && hour !== 12) {
                hour += 12
            } else if (period === 'AM' && hour === 12) {
                hour = 0
            }
        } else {
            // 24-hour format or ambiguous
            if (hour > 23) continue

            if (hour >= 1 && hour <= 12) {
                const currentHour = new Date().getHours()
                const defaultToPM = currentHour >= 12
                if (defaultToPM && hour !== 12) {
                    hour += 12
                } else if (!defaultToPM && hour === 12) {
                    hour = 0
                }
            }
        }

        if (
            hour < minHour ||
            hour > maxHour ||
            minute < (hour === minHour ? minMunite : 0) ||
            minute > (hour === maxHour ? maxMinute : 59)
        )
            continue

        return { hour, minute, isValid: true, originalInput }
    }

    return { hour: 0, minute: 0, isValid: false, originalInput }
}

const generateTimeOptions = (
    onSelect: (timeValue: string) => void,
    minHour: number,
    minMunite: number,
    maxHour: number,
    maxMinute: number
): MenuGroupType[] => {
    const options: MenuItemType[] = []

    for (let hour = minHour; hour <= maxHour; hour++) {
        for (
            let minute = hour === minHour ? minMunite : 0;
            minute <= (hour === maxHour ? maxMinute : 59);
            minute += 15
        ) {
            const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            const displayText = formatTimeFor12Hour(hour, minute)

            options.push({
                label: displayText,
                onClick: () => onSelect(timeValue),
            })
        }
    }

    return [{ items: options }]
}

const TimeSelector = forwardRef<HTMLDivElement, TimeSelectorProps>(
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
            () =>
                generateTimeOptions(
                    handleTimeSelect,
                    minHour,
                    minMunite,
                    maxHour,
                    maxMinute
                ),
            [handleTimeSelect, minHour, minMunite, maxHour, maxMinute]
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

                const parsed = parseTimeInput(
                    newValue,
                    minHour,
                    minMunite,
                    maxHour,
                    maxMinute
                )
                setIsValidTime(parsed.isValid || newValue.trim() === '')
            },
            [maxHour, maxMinute, minHour, minMunite]
        )

        const handleInputFocus = useCallback(() => {}, [])

        const handleInputBlur = useCallback(() => {
            if (isProcessingSelection) {
                return
            }

            setTimeout(() => {
                if (!isOpen && !isProcessingSelection) {
                    const trimmedInput = inputValue.trim()

                    if (!trimmedInput) {
                        setInputValue(formatTimeStringFor12Hour(value))
                        setIsValidTime(true)
                        return
                    }

                    const parsed = parseTimeInput(
                        trimmedInput,
                        minHour,
                        minMunite,
                        maxHour,
                        maxMinute
                    )

                    if (parsed.isValid) {
                        const finalTimeValue = `${parsed.hour.toString().padStart(2, '0')}:${parsed.minute.toString().padStart(2, '0')}`
                        const finalDisplayValue =
                            formatTimeStringFor12Hour(finalTimeValue)

                        setInputValue(finalDisplayValue)
                        setIsValidTime(true)
                        onChange(finalTimeValue)
                    } else {
                        setInputValue(formatTimeStringFor12Hour(value))
                        setIsValidTime(true)
                    }
                }
            }, 150)
        }, [
            inputValue,
            value,
            onChange,
            isOpen,
            isProcessingSelection,
            maxHour,
            maxMinute,
            minHour,
            minMunite,
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
                <TextInput
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
                    size={TextInputSize.SMALL}
                    error={!isValidTime}
                    tabIndex={tabIndex}
                    label=""
                    aria-label={ariaLabel}
                />
            </Block>
        )

        return (
            <Block ref={ref} style={{ width: '118px', flexShrink: 0 }}>
                <Menu
                    trigger={triggerElement}
                    items={timeOptions}
                    open={isOpen && !isProcessingSelection}
                    onOpenChange={handleOpenChange}
                    side={MenuSide.BOTTOM}
                    alignment={MenuAlignment.START}
                    sideOffset={4}
                    maxHeight={200}
                    minWidth={120}
                    maxWidth={120}
                />
            </Block>
        )
    }
)

TimeSelector.displayName = 'TimeSelector'

export default TimeSelector

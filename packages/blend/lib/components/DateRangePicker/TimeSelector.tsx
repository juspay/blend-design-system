import React, {
    forwardRef,
    useState,
    useMemo,
    useCallback,
    useEffect,
    useRef,
} from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveInput from '../Primitives/PrimitiveInput/PrimitiveInput'
import Menu from '../Menu/Menu'
import {
    MenuItemType,
    MenuGroupType,
    MenuAlignment,
    MenuSide,
} from '../Menu/types'
import { CalendarTokenType } from './dateRangePicker.tokens'
import { FOUNDATION_THEME } from '../../tokens'

type TimeSelectorProps = {
    value: string
    onChange: (time: string) => void
    className?: string
    autoFocus?: boolean
    tabIndex?: number
    calendarToken?: CalendarTokenType
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
    input: string
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

        return { hour, minute, isValid: true, originalInput }
    }

    return { hour: 0, minute: 0, isValid: false, originalInput }
}

const generateTimeOptions = (
    onSelect: (timeValue: string) => void
): MenuGroupType[] => {
    const options: MenuItemType[] = []

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
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
    ({ value, onChange, autoFocus = true, tabIndex, calendarToken }, ref) => {
        const [isOpen, setIsOpen] = useState(false)
        const [inputValue, setInputValue] = useState('')
        const [isValidTime, setIsValidTime] = useState(true)
        const [isProcessingSelection, setIsProcessingSelection] =
            useState(false)
        const inputRef = useRef<HTMLInputElement>(null)

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
                    inputRef.current?.blur()
                }, 100)
            },
            [onChange]
        )

        const timeOptions = useMemo(
            () => generateTimeOptions(handleTimeSelect),
            [handleTimeSelect]
        )

        const handleOpenChange = useCallback(
            (open: boolean) => {
                if (!isProcessingSelection) {
                    setIsOpen(open)
                }
            },
            [isProcessingSelection]
        )

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value
                const cursorPosition = e.target.selectionStart || 0

                // Allow better typing experience by preserving cursor position
                setInputValue(newValue)

                const parsed = parseTimeInput(newValue)
                setIsValidTime(parsed.isValid || newValue.trim() === '')

                // Restore cursor position after state update
                requestAnimationFrame(() => {
                    if (inputRef.current) {
                        inputRef.current.setSelectionRange(
                            cursorPosition,
                            cursorPosition
                        )
                    }
                })
            },
            []
        )

        const handleInputFocus = useCallback(() => {
            if (!isProcessingSelection && autoFocus) {
                setIsOpen(true)
            }
        }, [isProcessingSelection, autoFocus])

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

                    const parsed = parseTimeInput(trimmedInput)

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
        }, [inputValue, value, onChange, isOpen, isProcessingSelection])

        const handleInputKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    setIsOpen(false)
                    inputRef.current?.blur()
                } else if (e.key === 'Escape') {
                    e.preventDefault()
                    setInputValue(formatTimeStringFor12Hour(value))
                    setIsValidTime(true)
                    setIsOpen(false)
                    inputRef.current?.blur()
                }
            },
            [value]
        )

        const triggerElement = (
            <PrimitiveInput
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onKeyDown={handleInputKeyDown}
                placeholder="12:00 PM"
                width="118px"
                height="32px"
                paddingX={calendarToken?.calendar?.inputs?.dateInput?.gap}
                paddingY={FOUNDATION_THEME.unit[6]}
                fontSize={calendarToken?.calendar?.inputs?.dateInput?.fontSize}
                fontWeight={
                    calendarToken?.calendar?.inputs?.dateInput?.fontWeight
                }
                lineHeight={FOUNDATION_THEME.unit[20]}
                borderRadius={FOUNDATION_THEME.border.radius[6]}
                border="none"
                tabIndex={tabIndex}
                outline={
                    isValidTime
                        ? `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`
                        : `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.red[500]}`
                }
                boxShadow={FOUNDATION_THEME.shadows.sm}
                backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                color={FOUNDATION_THEME.colors.gray[800]}
                cursor="text"
                _hover={{
                    outline: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[400]}`,
                    boxShadow: FOUNDATION_THEME.shadows.sm,
                }}
                _focus={{
                    outline: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.primary[500]}`,
                    boxShadow: FOUNDATION_THEME.shadows.focusPrimary,
                }}
                _disabled={{
                    backgroundColor: FOUNDATION_THEME.colors.gray[50],
                    color: FOUNDATION_THEME.colors.gray[300],
                    outline: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
                    cursor: 'not-allowed',
                }}
            />
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

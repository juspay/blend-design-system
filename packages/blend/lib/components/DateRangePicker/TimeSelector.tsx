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

type TimeSelectorProps = {
    value: string
    onChange: (time: string) => void
    className?: string
    autoFocus?: boolean
    tabIndex?: number
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
    ({ value, onChange, autoFocus = true, tabIndex }, ref) => {
        const [isOpen, setIsOpen] = useState(false)
        const [inputValue, setInputValue] = useState('')
        const [isValidTime, setIsValidTime] = useState(true)
        const [isProcessingSelection, setIsProcessingSelection] =
            useState(false)

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

                // Allow better typing experience
                setInputValue(newValue)

                const parsed = parseTimeInput(newValue)
                setIsValidTime(parsed.isValid || newValue.trim() === '')
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
                    e.currentTarget.blur()
                } else if (e.key === 'Escape') {
                    e.preventDefault()
                    setInputValue(formatTimeStringFor12Hour(value))
                    setIsValidTime(true)
                    setIsOpen(false)
                    e.currentTarget.blur()
                }
            },
            [value]
        )

        const triggerElement = (
            <Block
                data-element="time-selector"
                style={{ width: '118px', flexShrink: 0 }}
            >
                <TextInput
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onKeyDown={handleInputKeyDown}
                    placeholder="12:00 PM"
                    size={TextInputSize.SMALL}
                    error={!isValidTime}
                    tabIndex={tabIndex}
                    label=""
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

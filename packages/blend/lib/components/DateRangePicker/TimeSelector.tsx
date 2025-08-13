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
    MenuItemV2Type,
    MenuV2GroupType,
    MenuAlignment,
    MenuSide,
} from '../Menu/types'
import { FOUNDATION_THEME } from '../../tokens'

type TimeSelectorProps = {
    value: string
    onChange: (time: string) => void
    className?: string
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

// Parse various time input formats to 24-hour format
const parseTimeInput = (
    input: string
): { hour: number; minute: number; isValid: boolean } => {
    const cleanInput = input.replace(/\s+/g, '').toUpperCase()
    const timeRegex = /^(\d{1,2}):?(\d{0,2})\s*(AM|PM)?$/i
    const match = cleanInput.match(timeRegex)

    if (!match) {
        return { hour: 0, minute: 0, isValid: false }
    }

    let hour = parseInt(match[1], 10)
    let minute = parseInt(match[2] || '0', 10)
    const period = match[3]?.toUpperCase()

    // Validate ranges
    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) {
        return { hour: 0, minute: 0, isValid: false }
    }

    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
        hour += 12
    } else if (period === 'AM' && hour === 12) {
        hour = 0
    }

    return { hour, minute, isValid: true }
}

const isValidTimeOption = (minute: number): boolean => {
    return minute % 15 === 0
}

const TimeSelector = forwardRef<HTMLDivElement, TimeSelectorProps>(
    ({ value, onChange }, ref) => {
        const [isOpen, setIsOpen] = useState(false)
        const [inputValue, setInputValue] = useState('')
        const [isValidTime, setIsValidTime] = useState(true)
        const [isDropdownClosing, setIsDropdownClosing] = useState(false)
        const inputRef = useRef<HTMLInputElement>(null)

        useEffect(() => {
            if (value) {
                setInputValue(formatTimeStringFor12Hour(value))
                setIsValidTime(true)
            }
        }, [value])

        const handleTimeSelect = useCallback(
            (timeValue: string) => {
                setIsDropdownClosing(true)
                setInputValue(formatTimeStringFor12Hour(timeValue))
                setIsValidTime(true)
                onChange(timeValue)
                setIsOpen(false)

                setTimeout(() => {
                    setIsDropdownClosing(false)
                    inputRef.current?.blur()
                }, 100)
            },
            [onChange]
        )

        // Generate time options with 15-minute intervals
        const timeOptions = useMemo((): MenuV2GroupType[] => {
            const options: MenuItemV2Type[] = []

            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m += 15) {
                    const timeValue = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
                    const displayText = formatTimeFor12Hour(h, m)

                    options.push({
                        label: displayText,
                        onClick: () => handleTimeSelect(timeValue),
                    })
                }
            }

            return [{ items: options }]
        }, [handleTimeSelect])

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value
                setInputValue(newValue)

                // Real-time validation
                const parsed = parseTimeInput(newValue)
                setIsValidTime(parsed.isValid)
            },
            []
        )

        const handleInputBlur = useCallback(() => {
            if (isDropdownClosing) {
                return
            }

            setTimeout(() => {
                if (!isOpen && !isDropdownClosing) {
                    if (!inputValue.trim()) {
                        // Reset to original value if empty
                        setInputValue(formatTimeStringFor12Hour(value))
                        setIsValidTime(true)
                        return
                    }

                    const parsed = parseTimeInput(inputValue)

                    if (parsed.isValid) {
                        const finalTimeValue = `${parsed.hour.toString().padStart(2, '0')}:${parsed.minute.toString().padStart(2, '0')}`
                        const finalDisplayValue =
                            formatTimeStringFor12Hour(finalTimeValue)

                        if (isValidTimeOption(parsed.minute)) {
                            setInputValue(finalDisplayValue)
                            setIsValidTime(true)
                            onChange(finalTimeValue)
                        } else {
                            const roundedMinute =
                                Math.round(parsed.minute / 15) * 15
                            const finalMinute =
                                roundedMinute === 60 ? 0 : roundedMinute
                            const finalHour =
                                roundedMinute === 60
                                    ? (parsed.hour + 1) % 24
                                    : parsed.hour

                            const roundedTimeValue = `${finalHour.toString().padStart(2, '0')}:${finalMinute.toString().padStart(2, '0')}`
                            const roundedDisplayValue =
                                formatTimeStringFor12Hour(roundedTimeValue)

                            setInputValue(roundedDisplayValue)
                            setIsValidTime(true)
                            onChange(roundedTimeValue)
                        }
                    } else {
                        setInputValue(formatTimeStringFor12Hour(value))
                        setIsValidTime(true)
                    }
                }
            }, 150)
        }, [inputValue, value, onChange, isOpen, isDropdownClosing])

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

        const handleInputFocus = useCallback(() => {
            if (!isDropdownClosing) {
                setIsOpen(true)
            }
        }, [isDropdownClosing])

        const handleOpenChange = useCallback(
            (open: boolean) => {
                if (!isDropdownClosing) {
                    setIsOpen(open)
                }
            },
            [isDropdownClosing]
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
                paddingX={FOUNDATION_THEME.unit[10]}
                paddingY={FOUNDATION_THEME.unit[6]}
                fontSize={FOUNDATION_THEME.font.size.body.md.fontSize}
                fontWeight={500}
                lineHeight={FOUNDATION_THEME.unit[20]}
                borderRadius={FOUNDATION_THEME.unit[10]}
                border="none"
                outline={
                    isValidTime
                        ? `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
                        : `1px solid ${FOUNDATION_THEME.colors.red[500]}`
                }
                boxShadow={FOUNDATION_THEME.shadows.sm}
                backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                color={FOUNDATION_THEME.colors.gray[800]}
                cursor="text"
                _hover={{
                    outline: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
                    boxShadow: FOUNDATION_THEME.shadows.sm,
                }}
                _focus={{
                    outline: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                    boxShadow: FOUNDATION_THEME.shadows.focusPrimary,
                }}
                _disabled={{
                    backgroundColor: FOUNDATION_THEME.colors.gray[50],
                    color: FOUNDATION_THEME.colors.gray[300],
                    outline: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                    cursor: 'not-allowed',
                }}
            />
        )

        return (
            <Block ref={ref} style={{ width: '118px', flexShrink: 0 }}>
                <Menu
                    trigger={triggerElement}
                    items={timeOptions}
                    open={isOpen && !isDropdownClosing}
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

import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import {
    DateRangePickerProps,
    DateRangePreset,
    DateRange,
    DateRangePickerSize,
    PresetSelectionData,
} from './types'
import {
    formatDate,
    formatDateDisplay,
    handleDateInputChange,
    handleTimeChange,
    handleCalendarDateSelect,
    handlePresetSelection,
    formatTriggerDisplay,
    validateDateTimeRange,
    DateValidationResult,
    detectPresetFromRange,
    processCustomPresets,
    getFilteredPresets,
    validateCustomRangeConfig,
    getPresetLabelWithCustom,
    getPresetLabel,
    getTodayInTimezone,
    validateDateInput,
} from './utils'
import CalendarGrid from './CalendarGrid'
import QuickRangeSelector from './QuickRangeSelector'
import TimeSelector from './TimeSelector'
import MobileDrawerPresets from './MobileDrawerPresets'
import { CalendarTokenType } from './dateRangePicker.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'
import { Popover } from '../Popover'
import { TextInput, TextInputSize } from '../Inputs/TextInput'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { ButtonType, ButtonSize, Button, Tooltip } from '../../main'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

type DateInputsSectionProps = {
    startDate?: string
    endDate?: string
    startTime?: string
    endTime?: string
    showDateTimePicker: boolean
    isSingleDatePicker: boolean
    allowSingleDateSelection: boolean
    selectedRange?: DateRange
    startDateValidation: DateValidationResult
    endDateValidation: DateValidationResult
    onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onStartTimeChange: (time: string) => void
    onEndTimeChange: (time: string) => void
    calendarToken: CalendarTokenType
    disablePastDates: boolean
    disableFutureDates: boolean
    today: Date
    timezone?: string
}

const DateInputsSection: React.FC<DateInputsSectionProps> = ({
    startDate,
    endDate,
    startTime,
    endTime,
    showDateTimePicker,
    isSingleDatePicker,
    allowSingleDateSelection,
    selectedRange,
    startDateValidation,
    endDateValidation,
    onStartDateChange,
    onEndDateChange,
    onStartTimeChange,
    onEndTimeChange,
    calendarToken,
    disablePastDates,
    disableFutureDates,
    today,
    timezone,
}) => {
    const startDateId = React.useId()
    const endDateId = React.useId()
    const startTimeId = React.useId()
    const endTimeId = React.useId()

    return (
        <Block
            paddingX={calendarToken?.calendar?.header?.padding?.x}
            paddingY={calendarToken?.calendar?.header?.padding?.y}
        >
            <Block
                display="flex"
                flexDirection="column"
                gap={calendarToken?.calendar?.header?.dateInput?.gap}
            >
                <Block
                    display="flex"
                    gap={calendarToken?.calendar?.header?.dateInput?.gap}
                    alignItems="center"
                >
                    <PrimitiveText
                        as="label"
                        htmlFor={startDateId}
                        color={
                            calendarToken?.calendar?.header?.dateInput?.label
                                ?.color
                        }
                        fontWeight={
                            calendarToken?.calendar?.header?.dateInput?.label
                                ?.fontWeight
                        }
                        fontSize={
                            calendarToken?.calendar?.header?.dateInput?.label
                                ?.fontSize
                        }
                    >
                        Start
                    </PrimitiveText>
                    <Block
                        display="flex"
                        alignItems="start"
                        gap={calendarToken?.calendar?.header?.dateInput?.gap}
                        width="100%"
                    >
                        <Block data-element="start-date-selector" flexGrow={1}>
                            <TextInput
                                id={startDateId}
                                label=""
                                placeholder="DD/MM/YYYY"
                                value={startDate || ''}
                                onChange={onStartDateChange}
                                error={!startDateValidation.isValid}
                                errorMessage={
                                    !startDateValidation.isValid
                                        ? startDateValidation.message
                                        : undefined
                                }
                                size={TextInputSize.SMALL}
                                autoFocus={false}
                                aria-invalid={!startDateValidation.isValid}
                            />
                        </Block>
                        {showDateTimePicker && (
                            <TimeSelector
                                id={startTimeId}
                                value={startTime || ''}
                                onChange={onStartTimeChange}
                                autoFocus={false}
                                disablePastDates={disablePastDates}
                                disableFutureDates={disableFutureDates}
                                today={today}
                                isStart={true}
                                selectedRange={selectedRange}
                                timezone={timezone}
                                aria-label="Start time"
                            />
                        )}
                    </Block>
                </Block>

                {!isSingleDatePicker &&
                    selectedRange &&
                    (!allowSingleDateSelection ||
                        (allowSingleDateSelection &&
                            selectedRange.startDate.getTime() !==
                                selectedRange.endDate?.getTime())) && (
                        <Block
                            display="flex"
                            gap={
                                calendarToken?.calendar?.header?.dateInput?.gap
                            }
                            alignItems="center"
                        >
                            <PrimitiveText
                                as="label"
                                htmlFor={endDateId}
                                color={
                                    calendarToken?.calendar?.header?.dateInput
                                        ?.label?.color
                                }
                                fontWeight={
                                    calendarToken?.calendar?.header?.dateInput
                                        ?.label?.fontWeight
                                }
                                fontSize={
                                    calendarToken?.calendar?.header?.dateInput
                                        ?.label?.fontSize
                                }
                                style={{
                                    minWidth: '30.6px',
                                }}
                            >
                                End
                            </PrimitiveText>
                            <Block
                                display="flex"
                                alignItems="start"
                                gap={
                                    calendarToken?.calendar?.header?.dateInput
                                        ?.gap
                                }
                                width="100%"
                            >
                                <Block
                                    data-element="end-date-selector"
                                    flexGrow={1}
                                >
                                    <TextInput
                                        id={endDateId}
                                        label=""
                                        placeholder="DD/MM/YYYY"
                                        value={endDate || ''}
                                        onChange={onEndDateChange}
                                        error={!endDateValidation.isValid}
                                        errorMessage={
                                            !endDateValidation.isValid
                                                ? endDateValidation.message
                                                : undefined
                                        }
                                        size={TextInputSize.SMALL}
                                        autoFocus={false}
                                        aria-invalid={
                                            !endDateValidation.isValid
                                        }
                                    />
                                </Block>
                                {showDateTimePicker && (
                                    <TimeSelector
                                        id={endTimeId}
                                        value={endTime || ''}
                                        onChange={onEndTimeChange}
                                        autoFocus={false}
                                        disablePastDates={disablePastDates}
                                        disableFutureDates={disableFutureDates}
                                        today={today}
                                        isStart={false}
                                        selectedRange={selectedRange}
                                        timezone={timezone}
                                        aria-label="End time"
                                    />
                                )}
                            </Block>
                        </Block>
                    )}
            </Block>
        </Block>
    )
}

type CalendarSectionProps = {
    selectedRange: DateRange | undefined
    today: Date
    allowSingleDateSelection: boolean
    disableFutureDates: boolean
    disablePastDates: boolean
    hideFutureDates: boolean
    hidePastDates: boolean
    customDisableDates?: (date: Date) => boolean
    customRangeConfig?: import('./types').CustomRangeConfig
    onDateSelect: (range: DateRange) => void
    showDateTimePicker: boolean
    timezone?: string
    isSingleDatePicker?: boolean
}

const CalendarSection: React.FC<
    CalendarSectionProps & { resetScrollPosition?: number }
> = ({
    selectedRange,
    today,
    allowSingleDateSelection,
    disableFutureDates,
    disablePastDates,
    hideFutureDates,
    hidePastDates,
    customDisableDates,
    customRangeConfig,
    onDateSelect,
    showDateTimePicker,
    resetScrollPosition,
    timezone,
    isSingleDatePicker,
}) => (
    <Block>
        <CalendarGrid
            selectedRange={selectedRange}
            onDateSelect={onDateSelect}
            today={today}
            allowSingleDateSelection={allowSingleDateSelection}
            disableFutureDates={disableFutureDates}
            disablePastDates={disablePastDates}
            hideFutureDates={hideFutureDates}
            hidePastDates={hidePastDates}
            customDisableDates={customDisableDates}
            customRangeConfig={customRangeConfig}
            showDateTimePicker={showDateTimePicker}
            resetScrollPosition={resetScrollPosition}
            timezone={timezone}
            isSingleDatePicker={isSingleDatePicker}
        />
    </Block>
)

type FooterControlsProps = {
    onCancel: () => void
    onApply: () => void
    isApplyDisabled: boolean
    applyDisabledMessage?: string
    calendarToken: CalendarTokenType
}

const FooterControls: React.FC<FooterControlsProps> = ({
    onCancel,
    onApply,
    isApplyDisabled,
    applyDisabledMessage,
    calendarToken,
}) => (
    <Block
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        paddingX={calendarToken?.calendar?.footer?.padding?.x}
        paddingY={calendarToken?.calendar?.footer?.padding?.y}
        borderTop={calendarToken?.calendar?.footer?.borderTop}
    >
        <Block display="flex" gap={calendarToken?.calendar?.footer?.gap}>
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                onClick={onCancel}
                text="Cancel"
            />
            {isApplyDisabled ? (
                <Tooltip content={applyDisabledMessage}>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        onClick={onApply}
                        text="Apply"
                        disabled={true}
                    />
                </Tooltip>
            ) : (
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                    onClick={onApply}
                    text="Apply"
                    disabled={false}
                />
            )}
        </Block>
    </Block>
)

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
    (
        {
            value,
            onChange,
            onPresetSelection,
            showDateTimePicker = true,
            showPresets: shouldShowPresets = true,
            customPresets,
            isDisabled = false,
            dateFormat = 'dd/MM/yyyy',
            allowSingleDateSelection = false,
            isSingleDatePicker = false,
            disableFutureDates = false,
            disablePastDates = false,
            hideFutureDates = false,
            hidePastDates = false,
            customDisableDates,
            customRangeConfig,
            triggerElement = null,
            useDrawerOnMobile = true,
            skipQuickFiltersOnMobile = false,
            size = DateRangePickerSize.MEDIUM,
            formatConfig,
            triggerConfig,
            maxMenuHeight = 250,
            showPreset = false,
            timezone,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false)
        const [popoverKey, setPopoverKey] = useState(0)
        const [isQuickRangeOpen, setIsQuickRangeOpen] = useState(false)
        const [drawerOpen, setDrawerOpen] = useState(false)
        const calendarToken = useResponsiveTokens<CalendarTokenType>('CALENDAR')
        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < 1024
        const showPresets = shouldShowPresets && !isSingleDatePicker

        const [selectedRange, setSelectedRange] = useState<
            DateRange | undefined
        >(value)
        const lastExternalValueRef = React.useRef<{
            start: number | null
            end: number | null
            dateFormat: string
        } | null>(null)

        const [activePreset, setActivePreset] = useState<DateRangePreset>(
            DateRangePreset.CUSTOM
        )

        const [startTime, setStartTime] = useState(
            selectedRange &&
                formatDate(selectedRange.startDate, 'HH:mm', timezone)
        )
        const [endTime, setEndTime] = useState(
            isSingleDatePicker
                ? undefined
                : selectedRange &&
                      selectedRange.endDate &&
                      formatDate(selectedRange.endDate, 'HH:mm', timezone)
        )

        const [startDate, setStartDate] = useState(
            selectedRange &&
                formatDate(selectedRange.startDate, dateFormat, timezone)
        )
        const [endDate, setEndDate] = useState(
            isSingleDatePicker
                ? undefined
                : selectedRange &&
                      selectedRange.endDate &&
                      formatDate(selectedRange.endDate, dateFormat, timezone)
        )

        const [startDateValidation, setStartDateValidation] =
            useState<DateValidationResult>({ isValid: true, error: 'none' })
        const [endDateValidation, setEndDateValidation] =
            useState<DateValidationResult>({
                isValid: isSingleDatePicker || !!selectedRange?.endDate,
                error:
                    isSingleDatePicker || selectedRange?.endDate
                        ? 'none'
                        : 'invalid-date',
            })

        const today = getTodayInTimezone(timezone)

        const presetConfigs = React.useMemo(() => {
            return processCustomPresets(customPresets)
        }, [customPresets])

        const availablePresets = React.useMemo(() => {
            return getFilteredPresets(
                presetConfigs,
                disableFutureDates,
                disablePastDates
            )
        }, [presetConfigs, disableFutureDates, disablePastDates])

        // Calculate if apply button should be disabled and get validation message
        const applyButtonValidation = React.useMemo(() => {
            // Check if date header are invalid
            if (!startDateValidation.isValid) {
                return {
                    isDisabled: true,
                    message:
                        startDateValidation.message || 'Invalid start date',
                }
            }

            if (!isSingleDatePicker && !endDateValidation.isValid) {
                return {
                    isDisabled: true,
                    message: endDateValidation.message || 'Invalid end date',
                }
            }

            // Check if we have valid dates
            if (isSingleDatePicker && !selectedRange) {
                return {
                    isDisabled: true,
                    message: 'Please select start date',
                }
            } else if (
                !isSingleDatePicker &&
                (!selectedRange || !selectedRange.endDate)
            ) {
                return {
                    isDisabled: true,
                    message: 'Please select both start and end dates',
                }
            }

            // Validate the date/time range
            const validation = validateDateTimeRange(
                selectedRange as DateRange,
                isSingleDatePicker
            )

            return {
                isDisabled: !validation.isValid,
                message: validation.message || 'Invalid date/time range',
            }
        }, [
            selectedRange,
            startDateValidation,
            endDateValidation,
            allowSingleDateSelection,
            isSingleDatePicker,
        ])

        const isApplyDisabled = applyButtonValidation.isDisabled

        const resetValues = useCallback(
            (dateRangeObj?: DateRange) => {
                setSelectedRange(dateRangeObj)
                setActivePreset(
                    dateRangeObj
                        ? detectPresetFromRange(dateRangeObj, timezone)
                        : DateRangePreset.CUSTOM
                )
                setStartDate(
                    dateRangeObj &&
                        formatDate(dateRangeObj.startDate, dateFormat, timezone)
                )
                if (dateRangeObj && dateRangeObj.endDate) {
                    setEndDate(
                        formatDate(dateRangeObj.endDate, dateFormat, timezone)
                    )
                }
                setStartTime(
                    dateRangeObj &&
                        formatDate(dateRangeObj.startDate, 'HH:mm', timezone)
                )
                if (dateRangeObj && dateRangeObj.endDate) {
                    setEndTime(
                        formatDate(dateRangeObj.endDate, 'HH:mm', timezone)
                    )
                }
                setStartDateValidation({ isValid: true, error: 'none' })
                setEndDateValidation({
                    isValid: true,
                    error: 'none',
                })
            },
            [timezone, dateFormat]
        )

        useEffect(() => {
            if (!value) {
                lastExternalValueRef.current = null
                return
            }

            const nextSignature = {
                start: value.startDate.getTime() ?? null,
                end: value.endDate?.getTime() ?? null,
                dateFormat,
            }

            const prevSignature = lastExternalValueRef.current
            const hasRangeChanged =
                !prevSignature ||
                prevSignature.start !== nextSignature.start ||
                prevSignature.end !== nextSignature.end
            const hasFormatChanged =
                !prevSignature || prevSignature.dateFormat !== dateFormat

            if (!hasRangeChanged && !hasFormatChanged) {
                return
            }

            lastExternalValueRef.current = nextSignature

            resetValues(value)
        }, [value, isOpen, dateFormat, timezone, resetValues])

        const handleDateSelect = useCallback(
            (range: DateRange) => {
                setSelectedRange(range)
                setStartTime(formatDate(range.startDate, 'HH:mm', timezone))
                if (!isSingleDatePicker)
                    setEndTime(
                        range.endDate &&
                            formatDate(range.endDate, 'HH:mm', timezone)
                    )

                setStartDate(formatDate(range.startDate, dateFormat, timezone))
                const startDateValidation = validateDateInput(
                    formatDate(range.startDate, dateFormat, timezone),
                    dateFormat,
                    disableFutureDates,
                    disablePastDates,
                    timezone
                )

                setEndDateValidation(startDateValidation)
                if (!isSingleDatePicker)
                    setEndDate(
                        range.endDate &&
                            formatDate(range.endDate, dateFormat, timezone)
                    )
                const endDateValidation =
                    range.endDate &&
                    validateDateInput(
                        formatDate(range.endDate, dateFormat, timezone),
                        dateFormat,
                        disableFutureDates,
                        disablePastDates,
                        timezone
                    )

                if (endDateValidation) setEndDateValidation(endDateValidation)
            },
            [dateFormat, timezone]
        )

        useEffect(() => {
            if (customRangeConfig) {
                const validation = validateCustomRangeConfig(customRangeConfig)
                if (!validation.isValid) {
                    console.warn(
                        'DateRangePicker: Invalid customRangeConfig:',
                        validation.error
                    )
                }
            }
        }, [customRangeConfig])

        const handlePresetSelect = useCallback(
            (preset: DateRangePreset) => {
                if (isSingleDatePicker) return
                const result = handlePresetSelection(
                    preset,
                    dateFormat,
                    timezone
                )
                if (!result) return
                setSelectedRange(result.updatedRange)
                setActivePreset(preset)
                setStartDate(result.formattedStartDate)
                setEndDate(result.formattedEndDate)
                setStartTime(result.formattedStartTime)
                setEndTime(result.formattedEndTime)

                // Trigger preset selection callback if provided
                if (onPresetSelection && preset !== DateRangePreset.CUSTOM) {
                    const presetSelectionData: PresetSelectionData = {
                        preset,
                        label: getPresetLabelWithCustom(preset, presetConfigs),
                        dateRange: result.updatedRange,
                        formattedStartDate: result.formattedStartDate,
                        formattedEndDate: result.formattedEndDate,
                        formattedStartTime: result.formattedStartTime,
                        formattedEndTime: result.formattedEndTime,
                    }
                    onPresetSelection(presetSelectionData)
                }

                // For presets, immediately update the committed value (different from calendar selection)
                if (preset !== DateRangePreset.CUSTOM) {
                    onChange?.(result.updatedRange)

                    if (showPreset) {
                        setIsQuickRangeOpen(false)
                        setIsOpen(false)
                        setDrawerOpen(false)
                        setPopoverKey((prev) => prev + 1)
                    }
                }
            },
            [
                dateFormat,
                onChange,
                showPreset,
                onPresetSelection,
                presetConfigs,
                timezone,
            ]
        )

        const handleStartDateChange = useCallback(
            (value: string) => {
                const result = handleDateInputChange(
                    value,
                    dateFormat,
                    selectedRange,
                    startTime,
                    true,
                    disableFutureDates || hideFutureDates,
                    disablePastDates || hidePastDates,
                    timezone
                )
                setStartDate(result.formattedValue)
                setStartDateValidation(result.validation)

                if (result.updatedRange) {
                    setSelectedRange(result.updatedRange)
                    setStartTime(
                        formatDate(result.updatedRange.startDate, 'HH:mm')
                    )
                }
            },
            [
                selectedRange,
                startTime,
                dateFormat,
                disableFutureDates,
                disablePastDates,
                hideFutureDates,
                hidePastDates,
                timezone,
            ]
        )

        const handleEndDateChange = useCallback(
            (value: string) => {
                if (isSingleDatePicker) return
                const result = handleDateInputChange(
                    value,
                    dateFormat,
                    selectedRange,
                    endTime,
                    false,
                    disableFutureDates || hideFutureDates,
                    disablePastDates || hidePastDates,
                    timezone
                )
                setEndDate(result.formattedValue)
                setEndDateValidation(result.validation)

                if (result.updatedRange && result.updatedRange.endDate) {
                    setSelectedRange(result.updatedRange)
                    setEndTime(formatDate(result.updatedRange.endDate, 'HH:mm'))
                }
            },
            [
                selectedRange,
                endTime,
                dateFormat,
                disableFutureDates,
                disablePastDates,
                hideFutureDates,
                hidePastDates,
                timezone,
            ]
        )

        const handleStartTimeChange = useCallback(
            (time: string) => {
                if (!selectedRange) return
                setStartTime(time)
                const updatedRange = handleTimeChange(
                    time,
                    selectedRange,
                    timezone,
                    true
                )
                setSelectedRange(updatedRange)
            },
            [selectedRange, timezone]
        )

        const handleEndTimeChange = useCallback(
            (time: string) => {
                if (isSingleDatePicker || !selectedRange) return
                setEndTime(time)
                const updatedRange = handleTimeChange(
                    time,
                    selectedRange,
                    timezone,
                    false
                )
                setSelectedRange(updatedRange)
            },
            [selectedRange, timezone]
        )

        const handleApply = useCallback(() => {
            if (
                !startTime ||
                !selectedRange ||
                (!isSingleDatePicker && (!endTime || !selectedRange.endDate))
            )
                return

            // Apply time from time selectors to the selected range
            const result = handleCalendarDateSelect(
                selectedRange,
                startTime,
                dateFormat,
                timezone,
                endTime
            )

            // Update the input fields to match the applied range
            setStartDate(result.formattedStartDate)
            if (!isSingleDatePicker) setEndDate(result.formattedEndDate)
            onChange?.(result.updatedRange)
            setIsOpen(false)
            setDrawerOpen(false)
            setPopoverKey((prev) => prev + 1)
        }, [selectedRange, startTime, endTime, dateFormat, onChange, timezone])

        const handleCancel = useCallback(() => {
            resetValues(value)

            setIsOpen(false)
            setDrawerOpen(false)
            setPopoverKey((prev) => prev + 1)
        }, [value, timezone, resetValues])

        useEffect(() => {
            if (isDisabled) {
                setIsOpen(false)
                setIsQuickRangeOpen(false)
            }
        }, [isDisabled, isOpen])

        const handleDateSelectCallback = useCallback(handleDateSelect, [
            handleDateSelect,
        ])
        const handleStartTimeChangeCallback = useCallback(
            handleStartTimeChange,
            [handleStartTimeChange]
        )
        const handleEndTimeChangeCallback = useCallback(handleEndTimeChange, [
            handleEndTimeChange,
        ])
        const handleStartDateChangeCallback = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                handleStartDateChange(e.target.value)
            },
            [handleStartDateChange]
        )
        const handleEndDateChangeCallback = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (isSingleDatePicker) return
                handleEndDateChange(e.target.value)
            },
            [handleEndDateChange]
        )

        const renderTrigger = () => {
            // Use the committed value (value prop) for trigger display, not the selectedRange
            const displayRange = value

            if (triggerConfig?.renderTrigger) {
                const formattedValue = formatConfig
                    ? formatTriggerDisplay(
                          displayRange,
                          formatConfig,
                          isSingleDatePicker,
                          triggerConfig.placeholder,
                          timezone
                      )
                    : formatDateDisplay(
                          displayRange,
                          allowSingleDateSelection,
                          timezone,
                          isSingleDatePicker
                      )

                return triggerConfig.renderTrigger({
                    selectedRange: displayRange,
                    isOpen,
                    isDisabled,
                    formattedValue,
                    onClick: () => setIsOpen(!isOpen),
                })
            }

            if (triggerConfig?.element || triggerElement) {
                return (
                    <Block
                        style={{
                            opacity: isDisabled ? 0.5 : 1,
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            ...triggerConfig?.style,
                        }}
                    >
                        {triggerConfig?.element || triggerElement}
                    </Block>
                )
            }

            const formatMobileDateRange = (
                range: DateRange | undefined
            ): string => {
                if (formatConfig) {
                    return formatTriggerDisplay(
                        range,
                        formatConfig,
                        isSingleDatePicker,
                        isSingleDatePicker ? 'Select date' : 'Select dates',
                        timezone
                    )
                }

                const formatOptions: Intl.DateTimeFormatOptions = {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit',
                    ...(timezone && { timeZone: timezone }),
                }

                const startStr = range
                    ? range.startDate.toLocaleDateString('en-US', formatOptions)
                    : ''
                const endStr = range?.endDate
                    ? range.endDate.toLocaleDateString('en-US', formatOptions)
                    : ''

                if (
                    range &&
                    (!range.endDate ||
                        range.startDate.getTime() === range.endDate.getTime())
                ) {
                    return startStr
                } else if (!range) {
                    return isSingleDatePicker ? 'Select date' : 'Select dates'
                }

                return `${startStr} - ${endStr}`
            }

            if (isMobile && useDrawerOnMobile) {
                return (
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text={formatMobileDateRange(displayRange)}
                        disabled={isDisabled}
                        onClick={() => setDrawerOpen(true)}
                    />
                )
            }

            const displayText = formatConfig
                ? formatTriggerDisplay(
                      displayRange,
                      formatConfig,
                      isSingleDatePicker,
                      triggerConfig?.placeholder,
                      timezone
                  )
                : formatDateDisplay(
                      displayRange,
                      allowSingleDateSelection,
                      timezone,
                      isSingleDatePicker
                  )

            const iconElement =
                triggerConfig?.showIcon === false
                    ? null
                    : triggerConfig?.icon || (
                          <Calendar
                              size={calendarToken?.trigger?.dateInput?.iconSize}
                          />
                      )

            return (
                <PrimitiveButton
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor={
                        calendarToken?.trigger?.dateInput?.backgroundColor
                    }
                    color={calendarToken?.trigger?.dateInput?.text?.color}
                    cursor={isDisabled ? 'not-allowed' : 'pointer'}
                    paddingX={
                        calendarToken?.trigger?.dateInput?.padding?.[
                            size as keyof CalendarTokenType['trigger']['dateInput']['padding']
                        ]?.x
                    }
                    paddingY={
                        calendarToken?.trigger?.dateInput?.padding?.[
                            size as keyof CalendarTokenType['trigger']['dateInput']['padding']
                        ]?.y
                    }
                    borderRadius={
                        showPresets
                            ? calendarToken?.trigger?.dateInput?.borderRadius
                                  ?.withQuickSelector
                            : calendarToken?.trigger?.dateInput?.borderRadius
                                  ?.withoutQuickSelector
                    }
                    border={
                        isDisabled
                            ? calendarToken?.trigger?.dateInput?.border
                                  ?.disabled
                            : calendarToken?.trigger?.dateInput?.border?.default
                    }
                    boxShadow={FOUNDATION_THEME.shadows.xs}
                    aria-expanded={isOpen}
                    aria-disabled={isDisabled}
                    aria-label={`Date range picker, ${displayText || 'Select date range'}`}
                    aria-haspopup="dialog"
                    disabled={isDisabled}
                    data-component-field-wrapper=""
                    data-date-picker="dateRangePicker-Filter"
                    data-id={displayText.replace(/\s/g, '').replace(/-/g, '➟')}
                    data-status={isDisabled ? 'disabled' : 'enabled'}
                    type="button"
                    data-element="datepicker-selector"
                >
                    <Block
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{
                            color: calendarToken?.trigger?.dateInput?.text
                                ?.color,
                            fontWeight:
                                calendarToken?.trigger?.dateInput?.text
                                    ?.fontWeight,
                            fontSize:
                                calendarToken?.trigger?.dateInput?.text
                                    ?.fontSize?.[
                                    size as keyof CalendarTokenType['trigger']['dateInput']['text']['fontSize']
                                ],
                        }}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={calendarToken?.trigger?.dateInput?.gap}
                        >
                            {iconElement && (
                                <span aria-hidden="true">{iconElement}</span>
                            )}
                            <span
                                data-element="placeholder"
                                data-id={displayText}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {displayText}
                            </span>
                        </Block>
                        {isOpen ? (
                            <ChevronUp
                                size={
                                    calendarToken?.trigger?.dateInput?.iconSize
                                }
                                aria-hidden="true"
                                style={{
                                    marginLeft:
                                        calendarToken?.trigger?.dateInput?.gap,
                                }}
                            />
                        ) : (
                            <ChevronDown
                                size={
                                    calendarToken?.trigger?.dateInput?.iconSize
                                }
                                aria-hidden="true"
                                style={{
                                    marginLeft:
                                        calendarToken?.trigger?.dateInput?.gap,
                                }}
                            />
                        )}
                    </Block>
                </PrimitiveButton>
            )
        }

        if (isMobile && useDrawerOnMobile) {
            const getMobilePresets = () => {
                const presetsWithCustom = [...availablePresets]
                if (!presetsWithCustom.includes(DateRangePreset.CUSTOM)) {
                    presetsWithCustom.push(DateRangePreset.CUSTOM)
                }
                return presetsWithCustom
            }

            return (
                <Block ref={ref} display="flex" width="100%">
                    <MobileDrawerPresets
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                        renderTrigger={renderTrigger}
                        showPresets={showPresets && !skipQuickFiltersOnMobile}
                        availablePresets={getMobilePresets()}
                        activePreset={activePreset}
                        selectedRange={selectedRange}
                        startTime={startTime}
                        endTime={endTime}
                        dateFormat={dateFormat}
                        handlePresetSelect={handlePresetSelect}
                        handleStartTimeChange={handleStartTimeChange}
                        handleEndTimeChange={handleEndTimeChange}
                        setSelectedRange={setSelectedRange}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        handleCancel={handleCancel}
                        handleApply={handleApply}
                        showCustomDropdownOnly={
                            !showPresets || skipQuickFiltersOnMobile
                        }
                        isApplyDisabled={isApplyDisabled}
                        applyDisabledMessage={applyButtonValidation.message}
                        disableFutureDates={disableFutureDates}
                        disablePastDates={disablePastDates}
                    />
                </Block>
            )
        }

        // Check if custom trigger is being used
        const hasCustomTrigger = !!(
            triggerConfig?.renderTrigger ||
            triggerConfig?.element ||
            triggerElement
        )

        if (showPreset && showPresets) {
            return (
                <Block ref={ref} display="flex">
                    <QuickRangeSelector
                        isOpen={isQuickRangeOpen}
                        onToggle={() =>
                            !isDisabled &&
                            setIsQuickRangeOpen(!isQuickRangeOpen)
                        }
                        activePreset={activePreset}
                        onPresetSelect={handlePresetSelect}
                        excludeCustom={true}
                        customPresets={presetConfigs}
                        disableFutureDates={disableFutureDates}
                        disablePastDates={disablePastDates}
                        isDisabled={isDisabled}
                        size={size}
                        maxMenuHeight={maxMenuHeight}
                        isStandalone={true}
                        calendarToken={calendarToken}
                    />
                </Block>
            )
        }

        return (
            <Block
                data-datepicker={getPresetLabel(activePreset) || 'datepicker'}
                ref={ref}
                display="flex"
            >
                {showPresets && !hasCustomTrigger && (
                    <QuickRangeSelector
                        isOpen={isQuickRangeOpen}
                        onToggle={() =>
                            !isDisabled &&
                            setIsQuickRangeOpen(!isQuickRangeOpen)
                        }
                        activePreset={activePreset}
                        onPresetSelect={handlePresetSelect}
                        excludeCustom={true}
                        customPresets={presetConfigs}
                        disableFutureDates={disableFutureDates}
                        disablePastDates={disablePastDates}
                        isDisabled={isDisabled}
                        size={size}
                        maxMenuHeight={maxMenuHeight}
                        calendarToken={calendarToken}
                    />
                )}

                <Popover
                    key={popoverKey}
                    open={isOpen}
                    onOpenChange={(open) => {
                        setIsOpen(open)
                    }}
                    trigger={renderTrigger()}
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    shadow="sm"
                >
                    <Block
                        style={{
                            ...calendarToken.calendar,
                        }}
                    >
                        {showDateTimePicker && (
                            <DateInputsSection
                                startDate={startDate}
                                endDate={endDate}
                                startTime={startTime}
                                endTime={endTime}
                                showDateTimePicker={showDateTimePicker}
                                isSingleDatePicker={isSingleDatePicker}
                                allowSingleDateSelection={
                                    allowSingleDateSelection
                                }
                                selectedRange={selectedRange}
                                startDateValidation={startDateValidation}
                                endDateValidation={endDateValidation}
                                onStartDateChange={
                                    handleStartDateChangeCallback
                                }
                                onEndDateChange={handleEndDateChangeCallback}
                                onStartTimeChange={
                                    handleStartTimeChangeCallback
                                }
                                onEndTimeChange={handleEndTimeChangeCallback}
                                calendarToken={calendarToken}
                                disablePastDates={disablePastDates}
                                disableFutureDates={disableFutureDates}
                                today={today}
                                timezone={timezone}
                            />
                        )}

                        <CalendarSection
                            selectedRange={selectedRange}
                            today={today}
                            allowSingleDateSelection={allowSingleDateSelection}
                            disableFutureDates={disableFutureDates}
                            disablePastDates={disablePastDates}
                            hideFutureDates={hideFutureDates}
                            hidePastDates={hidePastDates}
                            customDisableDates={customDisableDates}
                            customRangeConfig={customRangeConfig}
                            onDateSelect={handleDateSelectCallback}
                            showDateTimePicker={showDateTimePicker}
                            resetScrollPosition={popoverKey}
                            timezone={timezone}
                            isSingleDatePicker={isSingleDatePicker}
                        />

                        <FooterControls
                            onCancel={handleCancel}
                            onApply={handleApply}
                            isApplyDisabled={isApplyDisabled}
                            applyDisabledMessage={applyButtonValidation.message}
                            calendarToken={calendarToken}
                        />
                    </Block>
                </Popover>
            </Block>
        )
    }
)

DateRangePicker.displayName = 'DateRangePicker'

export default DateRangePicker

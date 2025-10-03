import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import {
    DateRangePickerProps,
    DateRangePreset,
    DateRange,
    DateRangePickerSize,
} from './types'
import {
    formatDate,
    getPresetDateRange,
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
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    showDateTimePicker: boolean
    allowSingleDateSelection: boolean
    selectedRange: DateRange
    startDateValidation: DateValidationResult
    endDateValidation: DateValidationResult
    onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onStartTimeChange: (time: string) => void
    onEndTimeChange: (time: string) => void
    calendarToken: CalendarTokenType
}

const DateInputsSection: React.FC<DateInputsSectionProps> = ({
    startDate,
    endDate,
    startTime,
    endTime,
    showDateTimePicker,
    allowSingleDateSelection,
    selectedRange,
    startDateValidation,
    endDateValidation,
    onStartDateChange,
    onEndDateChange,
    onStartTimeChange,
    onEndTimeChange,
    calendarToken,
}) => (
    <Block padding={calendarToken.calendar.inputs.padding}>
        <Block
            display="flex"
            flexDirection="column"
            gap={calendarToken.calendar.inputs.dateInput.gap}
        >
            <Block
                display="flex"
                gap={calendarToken.calendar.inputs.dateInput.gap}
                alignItems="center"
            >
                <PrimitiveText
                    as="span"
                    color={calendarToken.calendar.inputs.dateInput.label.color}
                    fontWeight={
                        calendarToken.calendar.inputs.dateInput.label.fontWeight
                    }
                    fontSize={
                        calendarToken.calendar.inputs.dateInput.label.fontSize
                    }
                    style={{
                        minWidth:
                            calendarToken.calendar.inputs.dateInput.label.width,
                    }}
                >
                    Start
                </PrimitiveText>
                <Block
                    display="flex"
                    alignItems="start"
                    gap={FOUNDATION_THEME.unit[8]}
                    width="100%"
                >
                    <Block flexGrow={1}>
                        <TextInput
                            label=""
                            placeholder="DD/MM/YYYY"
                            value={startDate}
                            onChange={onStartDateChange}
                            error={!startDateValidation.isValid}
                            size={TextInputSize.SMALL}
                            autoFocus={false}
                            tabIndex={-1}
                        />
                    </Block>
                    {showDateTimePicker && (
                        <TimeSelector
                            value={startTime}
                            onChange={onStartTimeChange}
                            autoFocus={false}
                            tabIndex={-1}
                        />
                    )}
                </Block>
            </Block>

            {(!allowSingleDateSelection ||
                (allowSingleDateSelection &&
                    selectedRange.startDate.getTime() !==
                        selectedRange.endDate.getTime())) && (
                <Block
                    display="flex"
                    gap={calendarToken.calendar.inputs.dateInput.gap}
                    alignItems="center"
                >
                    <PrimitiveText
                        as="span"
                        color={
                            calendarToken.calendar.inputs.dateInput.label.color
                        }
                        style={{
                            minWidth:
                                calendarToken.calendar.inputs.dateInput.label
                                    .width,
                        }}
                    >
                        End
                    </PrimitiveText>
                    <Block
                        display="flex"
                        alignItems="start"
                        gap={FOUNDATION_THEME.unit[8]}
                        width="100%"
                    >
                        <Block flexGrow={1}>
                            <TextInput
                                label=""
                                placeholder="DD/MM/YYYY"
                                value={endDate}
                                onChange={onEndDateChange}
                                error={!endDateValidation.isValid}
                                size={TextInputSize.SMALL}
                                autoFocus={false}
                                tabIndex={-1}
                            />
                        </Block>
                        {showDateTimePicker && (
                            <TimeSelector
                                value={endTime}
                                onChange={onEndTimeChange}
                                autoFocus={false}
                                tabIndex={-1}
                            />
                        )}
                    </Block>
                </Block>
            )}
        </Block>
    </Block>
)

type CalendarSectionProps = {
    selectedRange: DateRange
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
}

const CalendarSection: React.FC<CalendarSectionProps> = ({
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
        />
    </Block>
)

type FooterControlsProps = {
    onCancel: () => void
    onApply: () => void
    calendarToken: CalendarTokenType
    isApplyDisabled: boolean
    applyDisabledMessage?: string
}

const FooterControls: React.FC<FooterControlsProps> = ({
    onCancel,
    onApply,
    calendarToken,
    isApplyDisabled,
    applyDisabledMessage,
}) => (
    <Block
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        padding={calendarToken.calendar.footer.padding}
        borderTop={calendarToken.calendar.footer.borderTop}
    >
        <Block display="flex" gap={calendarToken.calendar.footer.button.gap}>
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                onClick={onCancel}
                text="Cancel"
            />
            <Tooltip
                content={isApplyDisabled ? applyDisabledMessage : undefined}
                open={isApplyDisabled ? undefined : false}
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                    onClick={onApply}
                    text="Apply"
                    disabled={isApplyDisabled}
                />
            </Tooltip>
        </Block>
    </Block>
)

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
    (
        {
            value,
            onChange,
            showDateTimePicker = true,
            showPresets = true,
            customPresets,
            isDisabled = false,
            dateFormat = 'dd/MM/yyyy',
            allowSingleDateSelection = false,
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
            maxMenuHeight = 200,
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

        const [selectedRange, setSelectedRange] = useState<DateRange>(
            value || getPresetDateRange(DateRangePreset.TODAY)
        )

        const [activePreset, setActivePreset] = useState<DateRangePreset>(
            DateRangePreset.TODAY
        )

        const [startTime, setStartTime] = useState(
            formatDate(selectedRange.startDate, 'HH:mm')
        )
        const [endTime, setEndTime] = useState(
            formatDate(selectedRange.endDate, 'HH:mm')
        )

        const [startDate, setStartDate] = useState(
            formatDate(selectedRange.startDate, dateFormat)
        )
        const [endDate, setEndDate] = useState(
            formatDate(selectedRange.endDate, dateFormat)
        )

        const [startDateValidation, setStartDateValidation] =
            useState<DateValidationResult>({ isValid: true, error: 'none' })
        const [endDateValidation, setEndDateValidation] =
            useState<DateValidationResult>({ isValid: true, error: 'none' })

        const today = new Date()

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
            // Check if date inputs are invalid
            if (!startDateValidation.isValid) {
                return {
                    isDisabled: true,
                    message:
                        startDateValidation.message || 'Invalid start date',
                }
            }

            if (!endDateValidation.isValid) {
                return {
                    isDisabled: true,
                    message: endDateValidation.message || 'Invalid end date',
                }
            }

            // Check if we have valid dates
            if (!selectedRange.startDate || !selectedRange.endDate) {
                return {
                    isDisabled: true,
                    message: 'Please select both start and end dates',
                }
            }

            // Validate the date/time range
            const validation = validateDateTimeRange(selectedRange)

            return {
                isDisabled: !validation.isValid,
                message: validation.message || 'Invalid date/time range',
            }
        }, [
            selectedRange,
            startDateValidation,
            endDateValidation,
            allowSingleDateSelection,
        ])

        const isApplyDisabled = applyButtonValidation.isDisabled

        useEffect(() => {
            if (value) {
                setSelectedRange(value)
                setStartDate(formatDate(value.startDate, dateFormat))
                setEndDate(formatDate(value.endDate, dateFormat))
                setStartTime(formatDate(value.startDate, 'HH:mm'))
                setEndTime(formatDate(value.endDate, 'HH:mm'))

                const detectedPreset = detectPresetFromRange(value)
                setActivePreset(detectedPreset)
            }
        }, [value, dateFormat])

        const handleDateSelect = useCallback(
            (range: DateRange) => {
                setSelectedRange(range)
                const detectedPreset = detectPresetFromRange(range)
                setActivePreset(detectedPreset)

                setStartDate(formatDate(range.startDate, dateFormat))
                setEndDate(formatDate(range.endDate, dateFormat))

                console.log('Date selected from calendar:', range)
            },
            [dateFormat]
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
                const result = handlePresetSelection(preset, dateFormat)
                setSelectedRange(result.updatedRange)
                setActivePreset(preset)
                setStartDate(result.formattedStartDate)
                setEndDate(result.formattedEndDate)
                setStartTime(result.formattedStartTime)
                setEndTime(result.formattedEndTime)

                // For presets, immediately update the committed value (different from calendar selection)
                if (preset !== DateRangePreset.CUSTOM) {
                    onChange?.(result.updatedRange)
                }
            },
            [dateFormat, onChange]
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
                    disablePastDates || hidePastDates
                )
                setStartDate(result.formattedValue)
                setStartDateValidation(result.validation)

                if (result.updatedRange) {
                    setSelectedRange(result.updatedRange)
                    const detectedPreset = detectPresetFromRange(
                        result.updatedRange
                    )
                    setActivePreset(detectedPreset)
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
            ]
        )

        const handleEndDateChange = useCallback(
            (value: string) => {
                const result = handleDateInputChange(
                    value,
                    dateFormat,
                    selectedRange,
                    endTime,
                    false,
                    disableFutureDates || hideFutureDates,
                    disablePastDates || hidePastDates
                )
                setEndDate(result.formattedValue)
                setEndDateValidation(result.validation)

                if (result.updatedRange) {
                    setSelectedRange(result.updatedRange)
                    const detectedPreset = detectPresetFromRange(
                        result.updatedRange
                    )
                    setActivePreset(detectedPreset)
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
            ]
        )

        const handleStartTimeChange = useCallback(
            (time: string) => {
                setStartTime(time)
                const updatedRange = handleTimeChange(time, selectedRange, true)
                setSelectedRange(updatedRange)
                const detectedPreset = detectPresetFromRange(updatedRange)
                setActivePreset(detectedPreset)
            },
            [selectedRange]
        )

        const handleEndTimeChange = useCallback(
            (time: string) => {
                setEndTime(time)
                const updatedRange = handleTimeChange(
                    time,
                    selectedRange,
                    false
                )
                setSelectedRange(updatedRange)
                // Detect preset from time change
                const detectedPreset = detectPresetFromRange(updatedRange)
                setActivePreset(detectedPreset)
            },
            [selectedRange]
        )

        const handleApply = useCallback(() => {
            // Apply time from time selectors to the selected range
            const result = handleCalendarDateSelect(
                selectedRange,
                startTime,
                endTime,
                dateFormat
            )

            // Update the input fields to match the applied range
            setStartDate(result.formattedStartDate)
            setEndDate(result.formattedEndDate)

            // Call onChange with the final range
            onChange?.(result.updatedRange)
            setIsOpen(false)
            setDrawerOpen(false)
            setPopoverKey((prev) => prev + 1)
        }, [selectedRange, startTime, endTime, dateFormat, onChange])

        const handleCancel = useCallback(() => {
            const resetRange =
                value || getPresetDateRange(DateRangePreset.TODAY)
            setSelectedRange(resetRange)
            setActivePreset(
                value ? DateRangePreset.CUSTOM : DateRangePreset.TODAY
            )
            setStartDate(formatDate(resetRange.startDate, dateFormat))
            setEndDate(formatDate(resetRange.endDate, dateFormat))
            setStartTime(formatDate(resetRange.startDate, 'HH:mm'))
            setEndTime(formatDate(resetRange.endDate, 'HH:mm'))

            setStartDateValidation({ isValid: true, error: 'none' })
            setEndDateValidation({ isValid: true, error: 'none' })

            setIsOpen(false)
            setDrawerOpen(false)
            setPopoverKey((prev) => prev + 1)
        }, [dateFormat, value])

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
                handleEndDateChange(e.target.value)
            },
            [handleEndDateChange]
        )

        const renderTrigger = () => {
            // Use the committed value (value prop) for trigger display, not the selectedRange
            const displayRange =
                value || getPresetDateRange(DateRangePreset.TODAY)

            if (triggerConfig?.renderTrigger) {
                const formattedValue = formatConfig
                    ? formatTriggerDisplay(
                          displayRange,
                          formatConfig,
                          triggerConfig.placeholder
                      )
                    : formatDateDisplay(displayRange, allowSingleDateSelection)

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
                        className={triggerConfig?.className}
                    >
                        {triggerConfig?.element || triggerElement}
                    </Block>
                )
            }

            const formatMobileDateRange = (range: DateRange): string => {
                if (formatConfig) {
                    return formatTriggerDisplay(
                        range,
                        formatConfig,
                        'Select dates'
                    )
                }

                const formatOptions: Intl.DateTimeFormatOptions = {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit',
                }

                const startStr = range.startDate.toLocaleDateString(
                    'en-US',
                    formatOptions
                )
                const endStr = range.endDate.toLocaleDateString(
                    'en-US',
                    formatOptions
                )

                if (range.startDate.getTime() === range.endDate.getTime()) {
                    return startStr
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

            const {
                borderRadiusWithPresets,
                borderRadiusWithoutPresets,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                padding: _,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                fontSize: __,
                ...triggerProps
            } = calendarToken.trigger

            const displayText = formatConfig
                ? formatTriggerDisplay(
                      displayRange,
                      formatConfig,
                      triggerConfig?.placeholder || 'Select date range'
                  )
                : formatDateDisplay(displayRange, allowSingleDateSelection)

            const iconElement =
                triggerConfig?.showIcon === false
                    ? null
                    : triggerConfig?.icon || <Calendar size={14} />

            return (
                <PrimitiveButton
                    {...triggerProps}
                    padding={calendarToken.trigger.padding[size]}
                    borderRadius={
                        showPresets
                            ? borderRadiusWithPresets
                            : borderRadiusWithoutPresets
                    }
                    border={
                        isDisabled
                            ? calendarToken.trigger.disabled.border
                            : calendarToken.trigger.border
                    }
                    aria-expanded={isOpen}
                    aria-disabled={isDisabled}
                    disabled={isDisabled}
                    className={triggerConfig?.className}
                >
                    <Block
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{
                            color: FOUNDATION_THEME.colors.gray[600],
                            fontWeight: FOUNDATION_THEME.font.weight[500],
                            fontSize: calendarToken.trigger.fontSize[size],
                        }}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            {iconElement}
                            <span style={{ whiteSpace: 'nowrap' }}>
                                {displayText}
                            </span>
                        </Block>
                        {isOpen ? (
                            <ChevronUp
                                size={14}
                                style={{ marginLeft: '8px' }}
                            />
                        ) : (
                            <ChevronDown
                                size={14}
                                style={{ marginLeft: '8px' }}
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

        return (
            <Block ref={ref} display="flex">
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
                        />

                        <FooterControls
                            onCancel={handleCancel}
                            onApply={handleApply}
                            calendarToken={calendarToken}
                            isApplyDisabled={isApplyDisabled}
                            applyDisabledMessage={applyButtonValidation.message}
                        />
                    </Block>
                </Popover>
            </Block>
        )
    }
)

DateRangePicker.displayName = 'DateRangePicker'

export default DateRangePicker

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
    DateValidationResult,
    formatDateDisplay,
    handleDateInputChange,
    handleTimeChange,
    handleCalendarDateSelect,
    handlePresetSelection,
    formatTriggerDisplay,
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
import { ButtonType, ButtonSize, Button } from '../../main'
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
    onDateSelect: (range: DateRange) => void
    showDateTimePicker: boolean
}

const CalendarSection: React.FC<CalendarSectionProps> = ({
    selectedRange,
    today,
    allowSingleDateSelection,
    disableFutureDates,
    disablePastDates,
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
            showDateTimePicker={showDateTimePicker}
        />
    </Block>
)

type FooterControlsProps = {
    onCancel: () => void
    onApply: () => void
    calendarToken: CalendarTokenType
}

const FooterControls: React.FC<FooterControlsProps> = ({
    onCancel,
    onApply,
    calendarToken,
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
            <Button
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={onApply}
                text="Apply"
            />
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
            isDisabled = false,
            dateFormat = 'dd/MM/yyyy',
            allowSingleDateSelection = false,
            disableFutureDates = false,
            disablePastDates = false,
            triggerElement = null,
            useDrawerOnMobile = true,
            skipQuickFiltersOnMobile = false,
            size = DateRangePickerSize.MEDIUM,
            formatConfig,
            triggerConfig,
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

        useEffect(() => {
            if (value) {
                setSelectedRange(value)
                setStartDate(formatDate(value.startDate, dateFormat))
                setEndDate(formatDate(value.endDate, dateFormat))
                setStartTime(formatDate(value.startDate, 'HH:mm'))
                setEndTime(formatDate(value.endDate, 'HH:mm'))
            }
        }, [value, dateFormat])

        const handleDateSelect = useCallback(
            (range: DateRange) => {
                const result = handleCalendarDateSelect(
                    range,
                    startTime,
                    endTime,
                    dateFormat
                )
                setSelectedRange(result.updatedRange)
                setStartDate(result.formattedStartDate)
                setEndDate(result.formattedEndDate)
                setActivePreset(DateRangePreset.CUSTOM)
                console.log('Date selected from calendar:', result.updatedRange)
            },
            [startTime, endTime, dateFormat]
        )

        const handlePresetSelect = useCallback(
            (preset: DateRangePreset) => {
                const result = handlePresetSelection(preset, dateFormat)
                setSelectedRange(result.updatedRange)
                setActivePreset(preset)
                setStartDate(result.formattedStartDate)
                setEndDate(result.formattedEndDate)
                setStartTime(result.formattedStartTime)
                setEndTime(result.formattedEndTime)

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
                    true
                )
                setStartDate(result.formattedValue)
                setStartDateValidation(result.validation)

                if (result.updatedRange) {
                    setSelectedRange(result.updatedRange)
                    setActivePreset(DateRangePreset.CUSTOM)
                }
            },
            [selectedRange, startTime, dateFormat]
        )

        const handleEndDateChange = useCallback(
            (value: string) => {
                const result = handleDateInputChange(
                    value,
                    dateFormat,
                    selectedRange,
                    endTime,
                    false
                )
                setEndDate(result.formattedValue)
                setEndDateValidation(result.validation)

                if (result.updatedRange) {
                    setSelectedRange(result.updatedRange)
                    setActivePreset(DateRangePreset.CUSTOM)
                }
            },
            [selectedRange, endTime, dateFormat]
        )

        const handleStartTimeChange = useCallback(
            (time: string) => {
                setStartTime(time)
                const updatedRange = handleTimeChange(time, selectedRange, true)
                setSelectedRange(updatedRange)
                setActivePreset(DateRangePreset.CUSTOM)
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
                setActivePreset(DateRangePreset.CUSTOM)
            },
            [selectedRange]
        )

        const handleApply = useCallback(() => {
            onChange?.(selectedRange)
            setIsOpen(false)
            setDrawerOpen(false)
            setPopoverKey((prev) => prev + 1)
        }, [selectedRange, onChange])

        const handleCancel = useCallback(() => {
            const defaultRange = getPresetDateRange(DateRangePreset.TODAY)
            setSelectedRange(defaultRange)
            setActivePreset(DateRangePreset.TODAY)
            setStartDate(formatDate(defaultRange.startDate, dateFormat))
            setEndDate(formatDate(defaultRange.endDate, dateFormat))
            setStartTime(formatDate(defaultRange.startDate, 'HH:mm'))
            setEndTime(formatDate(defaultRange.endDate, 'HH:mm'))

            setStartDateValidation({ isValid: true, error: 'none' })
            setEndDateValidation({ isValid: true, error: 'none' })
        }, [dateFormat])

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
            if (triggerConfig?.renderTrigger) {
                const formattedValue = formatConfig
                    ? formatTriggerDisplay(
                          selectedRange,
                          formatConfig,
                          triggerConfig.placeholder
                      )
                    : formatDateDisplay(selectedRange, allowSingleDateSelection)

                return triggerConfig.renderTrigger({
                    selectedRange,
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
                        text={formatMobileDateRange(selectedRange)}
                        disabled={isDisabled}
                        onClick={() => setDrawerOpen(true)}
                    />
                )
            }

            const {
                borderRadiusWithPresets,
                borderRadiusWithoutPresets,
                padding,
                fontSize,
                ...triggerProps
            } = calendarToken.trigger

            const displayText = formatConfig
                ? formatTriggerDisplay(
                      selectedRange,
                      formatConfig,
                      triggerConfig?.placeholder || 'Select date range'
                  )
                : formatDateDisplay(selectedRange, allowSingleDateSelection)

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
            const getFilteredPresets = () => {
                const pastPresets = [
                    DateRangePreset.LAST_6_HOURS,
                    DateRangePreset.TODAY,
                    DateRangePreset.YESTERDAY,
                    DateRangePreset.LAST_7_DAYS,
                    DateRangePreset.LAST_30_DAYS,
                ]

                const availablePresets = [...pastPresets]
                availablePresets.push(DateRangePreset.CUSTOM)
                return availablePresets
            }

            return (
                <Block ref={ref} display="flex" width="100%">
                    <MobileDrawerPresets
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                        renderTrigger={renderTrigger}
                        showPresets={showPresets && !skipQuickFiltersOnMobile}
                        availablePresets={getFilteredPresets()}
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
                        disableFutureDates={disableFutureDates}
                        disablePastDates={disablePastDates}
                        isDisabled={isDisabled}
                        size={size}
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
                    shadow="xs"
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
                            onDateSelect={handleDateSelectCallback}
                            showDateTimePicker={showDateTimePicker}
                        />

                        <FooterControls
                            onCancel={handleCancel}
                            onApply={handleApply}
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

import { ReactNode } from 'react'

// =============================================================================
// ENUMS
// =============================================================================

export enum DateRangePreset {
    CUSTOM = 'custom',
    TODAY = 'today',
    YESTERDAY = 'yesterday',
    TOMORROW = 'tomorrow',
    LAST_30_MINUTES = 'last30Minutes',
    LAST_1_HOUR = 'last1Hour',
    LAST_6_HOURS = 'last6Hours',
    LAST_24_HOURS = 'last24Hours',
    LAST_7_DAYS = 'last7Days',
    LAST_30_DAYS = 'last30Days',
    THIS_MONTH = 'thisMonth',
    LAST_MONTH = 'lastMonth',
    LAST_3_MONTHS = 'last3Months',
    LAST_12_MONTHS = 'last12Months',
    NEXT_7_DAYS = 'next7Days',
    NEXT_30_DAYS = 'next30Days',
    NEXT_3_MONTHS = 'next3Months',
    NEXT_12_MONTHS = 'next12Months',
}

export enum DateRangePickerSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

/**
 * Predefined format presets for common date display patterns
 */
export enum DateFormatPreset {
    SHORT_RANGE = 'short-range', // "Sep 3-5 2025"
    MEDIUM_RANGE = 'medium-range', // "Sep 3 - Sep 5 2025"
    LONG_RANGE = 'long-range', // "Sep 3 2025 - Sep 5 2025"
    SHORT_SINGLE = 'short-single', // "Sep 3 2025"
    MEDIUM_SINGLE = 'medium-single', // "September 3, 2025"
    LONG_SINGLE = 'long-single', // "September 3rd, 2025"
    ISO_RANGE = 'iso-range', // "2025-09-03 - 2025-09-05"
    US_RANGE = 'us-range', // "09/03/2025 - 09/05/2025"
    CUSTOM = 'custom', // Use custom format function
}

/**
 * Haptic feedback types for different interactions
 */
export enum HapticFeedbackType {
    SELECTION = 'selection',
    IMPACT = 'impact',
    NOTIFICATION = 'notification',
}

/**
 * Validation error types for date inputs
 */
export enum DateValidationError {
    NONE = 'none',
    INVALID_FORMAT = 'format',
    INVALID_DATE = 'invalid-date',
    OUT_OF_RANGE = 'out-of-range',
    INVALID_TIME_ORDER = 'invalid-time-order',
    MISSING_DATES = 'missing-dates',
    FUTURE_DATE_DISABLED = 'future-date-disabled',
    PAST_DATE_DISABLED = 'past-date-disabled',
}

/**
 * Calendar interaction modes
 */
export enum CalendarInteractionMode {
    SINGLE_DATE = 'single-date',
    DATE_RANGE = 'date-range',
}

// =============================================================================
// TYPES
// =============================================================================

export type DateRangeIntermediate = {
    startDate: Date
    endDate?: Date
    showTimePicker?: boolean
}

export type DateRange = {
    startDate: Date
    endDate: Date
    showTimePicker?: boolean
}

/**
 * Custom format function type for advanced formatting
 */
export type CustomFormatFunction = (
    range: DateRange,
    options?: {
        includeTime?: boolean
        includeYear?: boolean
        separator?: string
        locale?: string
    }
) => string

/**
 * Format configuration for date display
 */
export type DateFormatConfig = {
    preset?: DateFormatPreset
    customFormat?: CustomFormatFunction
    includeTime?: boolean
    includeYear?: boolean
    separator?: string
    locale?: string
    timeFormat?: '12h' | '24h'
}

/**
 * Custom trigger configuration
 */
export type TriggerConfig = {
    element?: ReactNode
    placeholder?: string
    showIcon?: boolean
    icon?: ReactNode
    style?: React.CSSProperties
    renderTrigger?: (props: {
        selectedRange: DateRange | undefined
        isOpen: boolean
        isDisabled: boolean
        formattedValue: string
        onClick: () => void
    }) => ReactNode
}

/**
 * Date validation result
 */
export type DateValidationResult = {
    isValid: boolean
    error: DateValidationError
    message?: string
}

/**
 * Date range validation result
 */
export type DateRangeValidationResult = {
    isValid: boolean
    error: DateValidationError
    message?: string
}

/**
 * Calendar month data structure
 */
export type CalendarMonth = {
    month: number
    year: number
    index?: number
}

/**
 * Picker column data
 */
export type PickerColumnData = {
    items: (string | number)[]
    selectedIndex: number
}

/**
 * Custom preset configuration for predefined presets
 */
export type CustomPresetConfig = {
    preset: DateRangePreset
    label?: string
    visible?: boolean
}

/**
 * Custom preset definition for truly custom presets
 */
export type CustomPresetDefinition = {
    id: string
    label: string
    getDateRange: () => DateRange
    visible?: boolean
}

/**
 * Presets configuration - can be predefined presets, custom configs, or custom definitions
 */
export type PresetsConfig =
    | DateRangePreset[]
    | CustomPresetConfig[]
    | CustomPresetDefinition[]
    | (DateRangePreset | CustomPresetConfig | CustomPresetDefinition)[]

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Function type for custom date disabling logic
 * @param date The date to check
 * @returns true if the date should be disabled, false otherwise
 */
export type CustomDateDisableFunction = (date: Date) => boolean

/**
 * Function type for custom range calculation
 * @param selectedDate The date that was selected
 * @param currentRange The current date range
 * @param isStartDate Whether the selected date is for start or end
 * @returns The new date range or null to use default behavior
 */
export type CustomRangeCalculationFunction = (
    selectedDate: Date,
    currentRange: DateRange,
    isStartDate: boolean
) => DateRange | null

/**
 * Configuration for automatic range calculation
 */
export type AutoRangeConfig = {
    /** Number of days to add to start date for end date */
    rangeDays?: number
    /** Number of hours to add to start date for end date */
    rangeHours?: number
    /** Number of minutes to add to start date for end date */
    rangeMinutes?: number
    /** Whether to include the start date in the range (true) or exclude it (false) */
    includeStartDate?: boolean
    /** Custom function to calculate the range */
    customCalculation?: CustomRangeCalculationFunction
}

/**
 * Function type for custom range calculation
 * @param startDate The selected start date
 * @param currentRange The current selected range (if any)
 * @returns The calculated end date, or null to use default behavior
 */
export type CustomRangeCalculatorFunction = (
    startDate: Date,
    currentRange?: DateRange
) => Date | null

/**
 * Configuration for custom range behavior
 */
export type CustomRangeConfig = {
    /**
     * Function to calculate end date based on start date
     */
    calculateEndDate?: CustomRangeCalculatorFunction

    /**
     * Fixed number of days for the range (alternative to calculateEndDate)
     */
    fixedDayRange?: number

    /**
     * Reference date range to use for comparison/duration calculation
     * When provided, the component will calculate a range with the same duration
     */
    referenceRange?: DateRange

    /**
     * Number of days to go backward for backward ranges (e.g., last 5 days)
     * Used when calculateEndDate returns the same date as clicked date
     * @default 6
     */
    backwardDays?: number

    /**
     * Whether to allow manual end date selection when using custom range logic
     * @default false
     */
    allowManualEndDateSelection?: boolean

    /**
     * Whether to apply custom range logic to preset selections
     * @default false
     */
    applyToPresets?: boolean
}

/**
 * Preset selection callback data
 */
export type PresetSelectionData = {
    preset: DateRangePreset
    label: string
    dateRange: DateRange
    formattedStartDate: string
    formattedEndDate: string
    formattedStartTime: string
    formattedEndTime: string
}

export type DateRangePickerProps = {
    value?: DateRange
    onChange?: (range: DateRange) => void
    onPresetSelection?: (data: PresetSelectionData) => void
    showDateTimePicker?: boolean
    showPresets?: boolean
    customPresets?: PresetsConfig
    placeholder?: string
    isDisabled?: boolean
    icon?: ReactNode
    minDate?: Date
    maxDate?: Date
    dateFormat?: string
    allowSingleDateSelection?: boolean
    disableFutureDates?: boolean
    disablePastDates?: boolean
    hideFutureDates?: boolean
    hidePastDates?: boolean
    customDisableDates?: CustomDateDisableFunction
    customRangeConfig?: CustomRangeConfig
    triggerElement?: ReactNode
    useDrawerOnMobile?: boolean
    skipQuickFiltersOnMobile?: boolean
    size?: DateRangePickerSize
    formatConfig?: DateFormatConfig
    triggerConfig?: TriggerConfig
    maxMenuHeight?: number
    showPreset?: boolean
    /**
     * IANA timezone string (e.g., "America/New_York", "Europe/London", "Asia/Tokyo")
     * When provided, all date/time operations use this timezone.
     * Presets like "yesterday" or "today" are calculated in this timezone.
     * Defaults to system timezone if not provided.
     * @example timezone="America/New_York"
     * @example timezone="Asia/Tokyo"
     * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     */
    timezone?: string
}

export type PresetItemProps = {
    preset: DateRangePreset
    isActive: boolean
    isCustomExpanded?: boolean
    onPresetSelect: (preset: DateRangePreset) => void
    onCustomToggle?: () => void
    setDrawerOpen?: (open: boolean) => void
    isDisabled?: boolean
}

export type ActionButtonsProps = {
    onCancel: () => void
    onApply: () => void
    isDisabled?: boolean
    isApplyDisabled?: boolean
    applyDisabledMessage?: string
}

export type ScrollablePickerProps = {
    items: (string | number)[]
    selectedIndex: number
    onSelect: (index: number) => void
    isTimeColumn?: boolean
    columnId: string
    isDisabled?: boolean
}

export type DatePickerComponentProps = {
    selectedRange: DateRangeIntermediate
    startTime: string
    endTime?: string
    dateFormat: string
    handleStartTimeChange: (time: string) => void
    handleEndTimeChange: (time: string) => void
    setSelectedRange: (range: DateRange) => void
    setStartDate: (date: string) => void
    setEndDate: (date: string) => void
    isDisabled?: boolean
    disableFutureDates?: boolean
    disablePastDates?: boolean
}

export type MobileDrawerPresetsProps = {
    drawerOpen: boolean
    setDrawerOpen: (open: boolean) => void
    renderTrigger: () => React.ReactNode
    showPresets: boolean
    availablePresets: DateRangePreset[]
    activePreset: DateRangePreset
    selectedRange: DateRangeIntermediate
    startTime: string
    endTime?: string
    dateFormat: string
    handlePresetSelect: (preset: DateRangePreset) => void
    handleStartTimeChange: (time: string) => void
    handleEndTimeChange: (time: string) => void
    setSelectedRange: (range: DateRange) => void
    setStartDate: (date: string) => void
    setEndDate: (date: string) => void
    handleCancel: () => void
    handleApply: () => void
    showCustomDropdownOnly?: boolean
    isDisabled?: boolean
    isApplyDisabled?: boolean
    applyDisabledMessage?: string
    disableFutureDates?: boolean
    disablePastDates?: boolean
}

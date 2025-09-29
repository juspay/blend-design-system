import { ReactNode } from 'react'

export enum DateRangePreset {
    CUSTOM = 'custom',
    TODAY = 'today',
    YESTERDAY = 'yesterday',
    TOMORROW = 'tomorrow',
    LAST_1_HOUR = 'last1Hour',
    LAST_6_HOURS = 'last6Hours',
    LAST_7_DAYS = 'last7Days',
    LAST_30_DAYS = 'last30Days',
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

export type DateRange = {
    startDate: Date
    endDate: Date
    showTimePicker?: boolean
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
    className?: string
    style?: React.CSSProperties
    renderTrigger?: (props: {
        selectedRange: DateRange | undefined
        isOpen: boolean
        isDisabled: boolean
        formattedValue: string
        onClick: () => void
    }) => ReactNode
}

export type DateRangePickerProps = {
    value?: DateRange
    onChange?: (range: DateRange) => void
    showDateTimePicker?: boolean
    showPresets?: boolean
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
    triggerElement?: ReactNode
    useDrawerOnMobile?: boolean
    skipQuickFiltersOnMobile?: boolean
    size?: DateRangePickerSize
    formatConfig?: DateFormatConfig
    triggerConfig?: TriggerConfig
    maxMenuHeight?: number
}

/**
 * Haptic feedback types for different interactions
 */
export enum HapticFeedbackType {
    SELECTION = 'selection',
    IMPACT = 'impact',
    NOTIFICATION = 'notification',
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
    selectedRange: DateRange
    startTime: string
    endTime: string
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
    selectedRange: DateRange
    startTime: string
    endTime: string
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

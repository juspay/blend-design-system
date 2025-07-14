import { DateRange, DateRangePreset } from './types'
import { CalendarTokenType } from './dateRangePicker.tokens'
/**
 * Formats a date according to the specified format
 * @param date The date to format
 * @param format The format string (e.g., "dd/MM/yyyy")
 * @returns The formatted date string or empty string if date is invalid
 */
export declare const formatDate: (date: Date, format: string) => string
/**
 * Parses a date string according to the specified format
 * @param dateString The date string to parse
 * @param format The format string
 * @returns The parsed date or null if invalid
 */
export declare const parseDate: (
    dateString: string,
    format: string
) => Date | null
/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns True if the date is valid
 */
export declare const isValidDate: (date: Date) => boolean
/**
 * Formats time in 12-hour format
 * @param date The date to format
 * @returns The formatted time string
 */
export declare const formatTimeIn12Hour: (date: Date) => string
/**
 * Formats a date range for display
 * @param range The date range to format
 * @param showTime Whether to include time in the formatted string
 * @returns The formatted date range string
 */
export declare const formatDateRange: (
    range: DateRange,
    showTime?: boolean
) => string
/**
 * Gets a date range based on a preset
 * @param preset The preset to get the range for
 * @returns The date range for the preset
 */
export declare const getPresetDateRange: (preset: DateRangePreset) => DateRange
/**
 * Gets a label for a preset
 * @param preset The preset to get the label for
 * @returns The label for the preset
 */
export declare const getPresetLabel: (preset: DateRangePreset) => string
/**
 * Formats time string to HH:MM format
 * @param time The time string to format
 * @returns The formatted time string
 */
export declare const formatTime: (time: string) => string
/**
 * Validates a time string
 * @param time The time string to validate
 * @returns True if the time is valid
 */
export declare const isValidTime: (time: string) => boolean
/**
 * Converts a date to string with optional time
 * @param date The date to convert
 * @param includeTime Whether to include time
 * @param timeFormat The time format to use
 * @returns The formatted date string
 */
export declare const dateToString: (
    date: Date,
    includeTime?: boolean,
    timeFormat?: string
) => string
/**
 * Checks if two dates are the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if dates are the same day
 */
export declare const isSameDay: (date1: Date, date2: Date) => boolean
/**
 * Checks if a date is within a range
 * @param date The date to check
 * @param startDate Range start date
 * @param endDate Range end date
 * @returns True if date is in range
 */
export declare const isDateInRange: (
    date: Date,
    startDate: Date,
    endDate: Date
) => boolean
/**
 * Gets the number of days in a month
 * @param year The year
 * @param month The month (0-based)
 * @returns The number of days in the month
 */
export declare const getDaysInMonth: (year: number, month: number) => number
/**
 * Gets the first day of the month (0 = Sunday)
 * @param year The year
 * @param month The month (0-based)
 * @returns The day of the week (0-6)
 */
export declare const getFirstDayOfMonth: (year: number, month: number) => number
/**
 * Generates a calendar grid for a month
 * @param year The year
 * @param month The month (0-based)
 * @returns Array of weeks, each containing day numbers or null for empty cells
 */
export declare const generateCalendarGrid: (
    year: number,
    month: number
) => (number | null)[][]
/**
 * Checks if a date is the start date of a range
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is the start date
 */
export declare const isStartDate: (
    date: Date,
    selectedRange: DateRange
) => boolean
/**
 * Checks if a date is the end date of a range
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is the end date
 */
export declare const isEndDate: (
    date: Date,
    selectedRange: DateRange
) => boolean
/**
 * Checks if a date is within a selected range (not including start/end)
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is in the range
 */
export declare const isInSelectedRange: (
    date: Date,
    selectedRange: DateRange
) => boolean
/**
 * Checks if a date is today
 * @param date The date to check
 * @param today Today's date
 * @returns True if the date is today
 */
export declare const isDateToday: (date: Date, today: Date) => boolean
/**
 * Handles date click logic for calendar
 * @param clickedDate The date that was clicked
 * @param selectedRange Current selected range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @param today Today's date for validation
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param isDoubleClick Whether this is a double-click event
 * @returns New date range or null if click should be ignored
 */
export declare const handleCalendarDateClick: (
    clickedDate: Date,
    selectedRange: DateRange,
    allowSingleDateSelection: boolean | undefined,
    today: Date,
    disableFutureDates?: boolean,
    disablePastDates?: boolean,
    isDoubleClick?: boolean
) => DateRange | null
/**
 * Generates calendar weeks for a specific month with consistent alignment
 * @param year The year
 * @param month The month (0-based)
 * @returns Array of weeks with day numbers or null for empty cells
 */
export declare const generateMonthWeeks: (
    year: number,
    month: number
) => (number | null)[][]
/**
 * Generates the list of months to display in calendar
 * @param startYear Starting year
 * @param startMonth Starting month (0-based)
 * @param endYear Ending year
 * @returns Array of month/year objects
 */
export declare const generateCalendarMonths: (
    startYear?: number,
    startMonth?: number,
    endYear?: number
) => {
    month: number
    year: number
}[]
/**
 * Generates initial months around current date (4-5 months)
 * @param today Current date
 * @returns Array of initial months to display
 */
export declare const generateInitialMonths: (today: Date) => {
    month: number
    year: number
}[]
/**
 * Generates a chunk of months for progressive loading
 * @param startYear Starting year
 * @param startMonth Starting month (0-based)
 * @param endYear Ending year for this chunk
 * @param endMonth Ending month for this chunk (0-based)
 * @returns Array of months for the chunk
 */
export declare const generateMonthChunk: (
    startYear: number,
    startMonth: number,
    endYear: number,
    endMonth?: number
) => {
    month: number
    year: number
}[]
/**
 * Calculates the next chunk to load based on current data
 * @param currentMonths Currently loaded months
 * @param direction Direction to load ('past' or 'future')
 * @returns Next chunk parameters or null if reached bounds
 */
export declare const getNextChunkParams: (
    currentMonths: {
        month: number
        year: number
    }[],
    direction: 'past' | 'future'
) => {
    startYear: number
    startMonth: number
} | null
/**
 * Gets month name from month index
 * @param monthIndex Month index (0-based)
 * @returns Month name
 */
export declare const getMonthName: (monthIndex: number) => string
/**
 * Gets day names for calendar header
 * @returns Array of day names
 */
export declare const getDayNames: () => string[]
/**
 * Calculates the height of a single month in the calendar
 * @returns Height in pixels
 */
export declare const getMonthHeight: () => number
/**
 * Calculates which months should be visible in the viewport
 * @param scrollTop Current scroll position
 * @param containerHeight Height of the scrollable container
 * @param months Array of all months
 * @param monthHeight Height of each month
 * @param buffer Number of months to render outside viewport for smooth scrolling
 * @returns Object with start/end indices and visible months
 */
export declare const getVisibleMonths: (
    scrollTop: number,
    containerHeight: number,
    months: {
        month: number
        year: number
    }[],
    monthHeight: number,
    buffer?: number
) => {
    startIndex: number
    endIndex: number
    visibleMonths: {
        month: number
        year: number
        index: number
    }[]
    totalHeight: number
}
/**
 * Throttle function to limit how often a function can be called
 * @param func Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export declare const throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
) => (...args: Parameters<T>) => void
/**
 * Calculates the top offset for a month at a given index
 * @param index Month index
 * @param monthHeight Height of each month
 * @returns Top offset in pixels
 */
export declare const getMonthOffset: (
    index: number,
    monthHeight: number
) => number
/**
 * Finds the month that contains today's date
 * @param months Array of months
 * @param today Today's date
 * @returns Index of the month containing today
 */
export declare const findCurrentMonthIndex: (
    months: {
        month: number
        year: number
    }[],
    today: Date
) => number
/**
 * Scrolls to a specific month
 * @param monthIndex Index of the month to scroll to
 * @param monthHeight Height of each month
 * @returns Scroll position
 */
export declare const getScrollToMonth: (
    monthIndex: number,
    monthHeight: number
) => number
/**
 * Gets all the states for a date cell
 * @param date The date to check
 * @param selectedRange Current selected range
 * @param today Today's date
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @returns Object with all date states
 */
export declare const getDateCellStates: (
    date: Date,
    selectedRange: DateRange,
    today: Date,
    disableFutureDates?: boolean,
    disablePastDates?: boolean
) => {
    isStart: boolean
    isEnd: boolean
    isRangeDay: boolean
    isTodayDay: boolean
    isSingleDate: boolean
    isDisabled: boolean
}
/**
 * Determines if a today indicator should be shown
 * @param dateStates Object containing all date states
 * @returns Boolean indicating if today indicator should be shown
 */
export declare const shouldShowTodayIndicator: (
    dateStates: ReturnType<typeof getDateCellStates>
) => boolean
/**
 * Validation result for date input
 */
export type DateValidationResult = {
    isValid: boolean
    error: 'none' | 'format' | 'invalid-date' | 'out-of-range'
    message?: string
}
/**
 * Interface for date range picker tokens used in styling functions
 */
export type DateRangePickerTokens = {
    calendar: {
        dayCell: Record<string, unknown>
        singleDate: Record<string, unknown>
        startDate: Record<string, unknown>
        endDate: Record<string, unknown>
        rangeDay: Record<string, unknown>
        todayDay: Record<string, unknown>
    }
    states: {
        disabledDay: Record<string, unknown>
    }
    text: {
        selectedDay: {
            color?: string | unknown
        }
        todayDay: {
            color?: string | unknown
        }
        dayNumber: {
            color?: string | unknown
        }
    }
}
/**
 * Validates date format and date values
 * @param value The input value to validate
 * @param format The expected format (e.g., 'dd/MM/yyyy')
 * @returns Validation result with specific error type
 */
export declare const validateDateInput: (
    value: string,
    format: string
) => DateValidationResult
/**
 * Formats date input as user types, adding slashes automatically
 * @param value The input value to format
 * @param format The target format (e.g., 'dd/MM/yyyy')
 * @returns Formatted input value
 */
export declare const formatDateInput: (value: string, format: string) => string
/**
 * Checks if date input is complete (full format length)
 * @param value The input value to check
 * @param format The expected format
 * @returns True if input is complete
 */
export declare const isDateInputComplete: (
    value: string,
    format: string
) => boolean
/**
 * Formats date display for the trigger button
 * @param selectedRange Current selected date range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @returns Formatted display string
 */
export declare const formatDateDisplay: (
    selectedRange: DateRange,
    allowSingleDateSelection?: boolean
) => string
/**
 * Handles date input change with formatting and validation
 * @param value Input value
 * @param dateFormat Date format string
 * @param currentRange Current selected range
 * @param timeValue Current time value (HH:mm)
 * @returns Object with formatted value, validation result, and updated range
 */
export declare const handleDateInputChange: (
    value: string,
    dateFormat: string,
    currentRange: DateRange,
    timeValue: string,
    isStartDate?: boolean
) => {
    formattedValue: string
    validation: DateValidationResult
    updatedRange?: DateRange
}
/**
 * Handles time change for date range
 * @param time New time value (HH:mm)
 * @param currentRange Current selected range
 * @param isStartTime Whether this is start time or end time
 * @returns Updated date range
 */
export declare const handleTimeChange: (
    time: string,
    currentRange: DateRange,
    isStartTime?: boolean
) => DateRange
/**
 * Handles date selection from calendar
 * @param range Selected date range from calendar
 * @param startTime Current start time
 * @param endTime Current end time
 * @param dateFormat Date format string
 * @returns Object with updated range and formatted date strings
 */
export declare const handleCalendarDateSelect: (
    range: DateRange,
    startTime: string,
    endTime: string,
    dateFormat: string
) => {
    updatedRange: DateRange
    formattedStartDate: string
    formattedEndDate: string
}
/**
 * Handles preset selection
 * @param preset Selected preset
 * @param dateFormat Date format string
 * @returns Object with updated range, formatted dates, and times
 */
export declare const handlePresetSelection: (
    preset: DateRangePreset,
    dateFormat: string
) => {
    updatedRange: DateRange
    formattedStartDate: string
    formattedEndDate: string
    formattedStartTime: string
    formattedEndTime: string
}
/**
 * Handles cancel action - resets to original values
 * @param originalValue Original date range value
 * @param dateFormat Date format string
 * @returns Object with reset values
 */
export declare const handleCancelAction: (
    originalValue: DateRange | undefined,
    dateFormat: string
) => {
    resetRange: DateRange
    formattedStartDate: string
    formattedEndDate: string
    formattedStartTime: string
    formattedEndTime: string
} | null
/**
 * Handles loading more months in calendar
 * @param months Current months array
 * @param direction Direction to load ('past' or 'future')
 * @param isLoadingPast Current loading state for past
 * @param isLoadingFuture Current loading state for future
 * @returns Promise that resolves when loading is complete
 */
export declare const handleLoadMoreMonths: (
    months: {
        month: number
        year: number
    }[],
    direction: 'past' | 'future',
    isLoadingPast: boolean,
    isLoadingFuture: boolean
) => Promise<
    | {
          month: number
          year: number
      }[]
    | null
>
/**
 * Handles scroll position updates for calendar
 * @param scrollTop Current scroll position
 * @param scrollHeight Total scroll height
 * @param clientHeight Client height
 * @param loadThreshold Threshold for triggering loads
 * @returns Object indicating what should be loaded
 */
export declare const handleCalendarScroll: (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
    loadThreshold?: number
) => {
    shouldLoadPast: boolean
    shouldLoadFuture: boolean
}
/**
 * Creates calendar month data structure for rendering
 * @param year Year of the month
 * @param month Month (0-based)
 * @param monthIndex Index in the months array
 * @param monthHeight Height of each month
 * @returns Month data for rendering
 */
export declare const createCalendarMonthData: (
    year: number,
    month: number,
    monthIndex: number,
    monthHeight: number
) => {
    key: string
    year: number
    month: number
    weeks: (number | null)[][]
    topOffset: number
    monthHeight: number
    monthName: string
}
/**
 * Calculates day cell props for rendering
 * @param date Date object
 * @param selectedRange Current selected range
 * @param today Today's date
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param calendarToken Calendar token for styling
 * @returns Day cell props
 */
export declare const calculateDayCellProps: (
    date: Date,
    selectedRange: DateRange,
    today: Date,
    disableFutureDates: boolean,
    disablePastDates: boolean,
    calendarToken: CalendarTokenType
) => {
    dateStates: ReturnType<typeof getDateCellStates>
    styles: Record<string, unknown>
    textColor: string | unknown
    showTodayIndicator: boolean
}

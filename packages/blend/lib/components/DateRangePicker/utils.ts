import {
    DateRange,
    DateRangePreset,
    DateFormatPreset,
    DateFormatConfig,
    CustomFormatFunction,
    HapticFeedbackType,
    CustomPresetConfig,
    CustomPresetDefinition,
    PresetsConfig,
    CustomRangeConfig,
} from './types'
import { CalendarTokenType } from './dateRangePicker.tokens'
import { DATE_RANGE_PICKER_CONSTANTS } from './constants'

/**
 * Formats a date according to the specified format
 * @param date The date to format
 * @param format The format string (e.g., "dd/MM/yyyy")
 * @returns The formatted date string or empty string if date is invalid
 */
export const formatDate = (date: Date, format: string): string => {
    if (!date || !isValidDate(date)) return ''

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return format
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', year.toString())
        .replace('HH', hours)
        .replace('mm', minutes)
}

/**
 * Parses a date string according to the specified format
 * @param dateString The date string to parse
 * @param format The format string
 * @returns The parsed date or null if invalid
 */
export const parseDate = (dateString: string, format: string): Date | null => {
    try {
        const formatParts = format.split(/[^a-zA-Z]/)
        const dateParts = dateString.split(/[^0-9]/)

        if (formatParts.length !== dateParts.length) return null

        let day = 1,
            month = 1,
            year = new Date().getFullYear(),
            hours = 0
        const minutes = 0

        formatParts.forEach((part, index) => {
            const value = parseInt(dateParts[index])
            if (isNaN(value)) return null

            switch (part.toLowerCase()) {
                case 'dd':
                    day = value
                    break
                case 'mm':
                    month = value
                    break
                case 'yyyy':
                    year = value
                    break
                case 'hh':
                    hours = value
                    break
                default:
                    break
            }
        })

        const date = new Date(year, month - 1, day, hours, minutes)
        return isValidDate(date) ? date : null
    } catch {
        return null
    }
}

/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns True if the date is valid
 */
export const isValidDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Formats time in 12-hour format
 * @param date The date to format
 * @returns The formatted time string
 */
export const formatTimeIn12Hour = (date: Date): string => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 === 0 ? 12 : hours % 12
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Formats a date range for display
 * @param range The date range to format
 * @param showTime Whether to include time in the formatted string
 * @returns The formatted date range string
 */
export const formatDateRange = (
    range: DateRange,
    showTime: boolean = false
): string => {
    if (!range.startDate) {
        return ''
    }

    const startFormat = showTime ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy'
    const endFormat = showTime ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy'

    const start = formatDate(range.startDate, startFormat)

    if (!range.endDate) {
        return start
    }

    const end = formatDate(range.endDate, endFormat)
    return `${start} – ${end}`
}

/**
 * Gets a date range based on a preset
 * @param preset The preset to get the range for
 * @returns The date range for the preset
 */
export const getPresetDateRange = (preset: DateRangePreset): DateRange => {
    // Check if this is a custom preset
    const customDefinition = getCustomPresetDefinition(preset as string)
    if (customDefinition) {
        return customDefinition.getDateRange()
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (preset) {
        case DateRangePreset.TODAY: {
            // Today should be from 12:00 AM to current time
            const startDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                0,
                0,
                0,
                0
            )
            const endDate = new Date(now) // Current time
            return { startDate, endDate }
        }

        case DateRangePreset.YESTERDAY: {
            // Yesterday should be from 12:00 AM to 11:59 PM of yesterday
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            return createSingleDateRange(yesterday)
        }

        case DateRangePreset.LAST_30_MINUTES: {
            const thirtyMinsAgo = new Date(now.getTime() - 30 * 60 * 1000)
            return { startDate: thirtyMinsAgo, endDate: now }
        }

        case DateRangePreset.TOMORROW: {
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            return createSingleDateRange(tomorrow)
        }

        case DateRangePreset.LAST_1_HOUR: {
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
            return { startDate: oneHourAgo, endDate: now }
        }

        case DateRangePreset.LAST_6_HOURS: {
            const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000)
            return { startDate: sixHoursAgo, endDate: now }
        }

        case DateRangePreset.LAST_24_HOURS: {
            const twentyFourHoursAgo = new Date(
                now.getTime() - 24 * 60 * 60 * 1000
            )
            return { startDate: twentyFourHoursAgo, endDate: now }
        }

        case DateRangePreset.LAST_7_DAYS: {
            // Last 7 days: 7 complete days ago to current time today
            // Day 1-6: 12:00 AM to 11:59 PM, Day 7 (today): 12:00 AM to current time
            const sevenDaysAgo = new Date(today)
            sevenDaysAgo.setDate(today.getDate() - 6) // 6 days ago + today = 7 days
            sevenDaysAgo.setHours(0, 0, 0, 0) // Start at 12:00 AM

            return { startDate: sevenDaysAgo, endDate: now }
        }

        case DateRangePreset.LAST_30_DAYS: {
            // Last 30 days: 30 complete days ago to current time today
            const thirtyDaysAgo = new Date(today)
            thirtyDaysAgo.setDate(today.getDate() - 29) // 29 days ago + today = 30 days
            thirtyDaysAgo.setHours(0, 0, 0, 0) // Start at 12:00 AM

            return { startDate: thirtyDaysAgo, endDate: now }
        }

        case DateRangePreset.THIS_MONTH: {
            // This month: Start of current month (1st day at 12:00 AM) to current time
            const startOfMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                1,
                0,
                0,
                0,
                0
            )
            return { startDate: startOfMonth, endDate: now }
        }

        case DateRangePreset.LAST_MONTH: {
            // Last month: Full previous month (1st day 12:00 AM to last day 11:59 PM)
            const lastMonth = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                1
            )
            const startOfLastMonth = new Date(
                lastMonth.getFullYear(),
                lastMonth.getMonth(),
                1,
                0,
                0,
                0,
                0
            )
            const endOfLastMonth = new Date(
                lastMonth.getFullYear(),
                lastMonth.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            )
            return { startDate: startOfLastMonth, endDate: endOfLastMonth }
        }

        case DateRangePreset.LAST_3_MONTHS: {
            // Last 3 months: Start from 12:00 AM of 3 months ago to current time
            const threeMonthsAgo = new Date(now)
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
            threeMonthsAgo.setHours(0, 0, 0, 0) // Start at 12:00 AM
            return { startDate: threeMonthsAgo, endDate: now }
        }

        case DateRangePreset.LAST_12_MONTHS: {
            // Last 12 months: Start from 12:00 AM of 12 months ago to current time
            const twelveMonthsAgo = new Date(now)
            twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1)
            twelveMonthsAgo.setHours(0, 0, 0, 0) // Start at 12:00 AM
            return { startDate: twelveMonthsAgo, endDate: now }
        }

        case DateRangePreset.NEXT_7_DAYS: {
            // Next 7 days: From current time to 11:59 PM of 7 days later
            const sevenDaysLater = new Date(today)
            sevenDaysLater.setDate(sevenDaysLater.getDate() + 6)
            sevenDaysLater.setHours(23, 59, 59, 999) // End at 11:59 PM
            return { startDate: now, endDate: sevenDaysLater }
        }

        case DateRangePreset.NEXT_30_DAYS: {
            // Next 30 days: From current time to 11:59 PM of 30 days later
            const thirtyDaysLater = new Date(today)
            thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 29)
            thirtyDaysLater.setHours(23, 59, 59, 999) // End at 11:59 PM
            return { startDate: now, endDate: thirtyDaysLater }
        }

        case DateRangePreset.NEXT_3_MONTHS: {
            // Next 3 months: From current time to 11:59 PM of 3 months later
            const threeMonthsLater = new Date(today)
            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3)
            threeMonthsLater.setHours(23, 59, 59, 999) // End at 11:59 PM
            return { startDate: now, endDate: threeMonthsLater }
        }

        case DateRangePreset.NEXT_12_MONTHS: {
            // Next 12 months: From current time to 11:59 PM of 12 months later
            const twelveMonthsLater = new Date(today)
            twelveMonthsLater.setFullYear(twelveMonthsLater.getFullYear() + 1)
            twelveMonthsLater.setHours(23, 59, 59, 999) // End at 11:59 PM
            return { startDate: now, endDate: twelveMonthsLater }
        }

        default: {
            return { startDate: today, endDate: today }
        }
    }
}

/**
 * Gets a label for a preset
 * @param preset The preset to get the label for
 * @returns The label for the preset
 */
export const getPresetLabel = (preset: DateRangePreset): string => {
    // Check if this is a custom preset
    const customDefinition = getCustomPresetDefinition(preset as string)
    if (customDefinition) {
        return customDefinition.label
    }

    switch (preset) {
        case DateRangePreset.TODAY:
            return 'Today'
        case DateRangePreset.YESTERDAY:
            return 'Yesterday'
        case DateRangePreset.TOMORROW:
            return 'Tomorrow'
        case DateRangePreset.LAST_30_MINUTES:
            return 'Last 30 minutes'
        case DateRangePreset.LAST_1_HOUR:
            return 'Last 1 hour'
        case DateRangePreset.LAST_6_HOURS:
            return 'Last 6 hours'
        case DateRangePreset.LAST_24_HOURS:
            return 'Last 24 hours'
        case DateRangePreset.LAST_7_DAYS:
            return 'Last 7 days'
        case DateRangePreset.LAST_30_DAYS:
            return 'Last 30 days'
        case DateRangePreset.THIS_MONTH:
            return 'This month'
        case DateRangePreset.LAST_MONTH:
            return 'Last month'
        case DateRangePreset.LAST_3_MONTHS:
            return 'Last 3 months'
        case DateRangePreset.LAST_12_MONTHS:
            return 'Last 12 months'
        case DateRangePreset.NEXT_7_DAYS:
            return 'Next 7 days'
        case DateRangePreset.NEXT_30_DAYS:
            return 'Next 30 days'
        case DateRangePreset.NEXT_3_MONTHS:
            return 'Next 3 months'
        case DateRangePreset.NEXT_12_MONTHS:
            return 'Next 12 months'
        case DateRangePreset.CUSTOM:
            return 'Custom'
        default:
            return 'Select Range'
    }
}

/**
 * Formats time string to HH:MM format
 * @param time The time string to format
 * @returns The formatted time string
 */
export const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':')
    const h = parseInt(hours) || 0
    const m = parseInt(minutes) || 0

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

/**
 * Validates a time string
 * @param time The time string to validate
 * @returns True if the time is valid
 */
export const isValidTime = (time: string): boolean => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
}

/**
 * Converts a date to string with optional time
 * @param date The date to convert
 * @param includeTime Whether to include time
 * @param timeFormat The time format to use
 * @returns The formatted date string
 */
export const dateToString = (
    date: Date,
    includeTime?: boolean,
    timeFormat?: string
): string => {
    const dateStr = formatDate(date, 'dd/MM/yyyy')

    if (includeTime && timeFormat) {
        const timeStr = formatDate(date, timeFormat)
        return `${dateStr} ${timeStr}`
    }

    return dateStr
}

/**
 * Checks if two dates are the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

/**
 * Checks if a date is within a range
 * @param date The date to check
 * @param startDate Range start date
 * @param endDate Range end date
 * @returns True if date is in range
 */
export const isDateInRange = (
    date: Date,
    startDate: Date,
    endDate: Date
): boolean => {
    const dateTime = date.getTime()
    const startTime = startDate.getTime()
    const endTime = endDate.getTime()

    return dateTime >= startTime && dateTime <= endTime
}

/**
 * Gets the number of days in a month
 * @param year The year
 * @param month The month (0-based)
 * @returns The number of days in the month
 */
export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
}

/**
 * Gets the first day of the month (0 = Sunday)
 * @param year The year
 * @param month The month (0-based)
 * @returns The day of the week (0-6)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay()
}

/**
 * Generates a calendar grid for a month
 * @param year The year
 * @param month The month (0-based)
 * @returns Array of weeks, each containing day numbers or null for empty cells
 */
export const generateCalendarGrid = (
    year: number,
    month: number
): (number | null)[][] => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const weeks: (number | null)[][] = []
    let currentWeek: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) {
        currentWeek.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
        currentWeek.push(day)

        if (currentWeek.length === 7) {
            weeks.push(currentWeek)
            currentWeek = []
        }
    }

    while (currentWeek.length > 0 && currentWeek.length < 7) {
        currentWeek.push(null)
    }

    if (currentWeek.length > 0) {
        weeks.push(currentWeek)
    }

    return weeks
}

/**
 * Checks if a date is the start date of a range
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is the start date
 */
export const isStartDate = (date: Date, selectedRange: DateRange): boolean => {
    if (!selectedRange.startDate) return false
    return (
        date.getDate() === selectedRange.startDate.getDate() &&
        date.getMonth() === selectedRange.startDate.getMonth() &&
        date.getFullYear() === selectedRange.startDate.getFullYear()
    )
}

/**
 * Checks if a date is the end date of a range (but not if it's the same as start date)
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is the end date and different from start date
 */
export const isEndDate = (date: Date, selectedRange: DateRange): boolean => {
    if (!selectedRange.endDate || !selectedRange.startDate) return false

    // Don't show as end date if it's the same day as start date (single date selection)
    if (isSameDay(selectedRange.startDate, selectedRange.endDate)) {
        return false
    }

    return (
        date.getDate() === selectedRange.endDate.getDate() &&
        date.getMonth() === selectedRange.endDate.getMonth() &&
        date.getFullYear() === selectedRange.endDate.getFullYear()
    )
}

/**
 * Checks if a date is within a selected range (not including start/end)
 * @param date The date to check
 * @param selectedRange The selected date range
 * @returns True if the date is in the range
 */
export const isInSelectedRange = (
    date: Date,
    selectedRange: DateRange
): boolean => {
    if (!selectedRange.startDate || !selectedRange.endDate) return false
    return date > selectedRange.startDate && date < selectedRange.endDate
}

/**
 * Checks if a date is today
 * @param date The date to check
 * @param today Today's date
 * @returns True if the date is today
 */
export const isDateToday = (date: Date, today: Date): boolean => {
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    )
}

/**
 * Creates a proper single date range (24-hour selection within the same day)
 * @param date The date to create a range for
 * @returns DateRange spanning the entire day (same date, different times)
 */
export const createSingleDateRange = (date: Date): DateRange => {
    // Start of day (00:00:00)
    const startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
    )

    // End of day (23:59:59.999) - same date but end of day
    const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999
    )

    return { startDate, endDate }
}

/**
 * Creates a date at start of day (00:00:00)
 */
const createStartOfDay = (date: Date): Date => {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
    )
}

/**
 * Creates a date at end of day (23:59:59.999 same day)
 */
const createEndOfDay = (date: Date): Date => {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999
    )
}

/**
 * Checks if we have a complete range (both start and end dates that are different)
 */
const hasCompleteRange = (range: DateRange): boolean => {
    return !!(
        range.startDate &&
        range.endDate &&
        !isSameDay(range.startDate, range.endDate)
    )
}

/**
 * Handles date click logic for calendar with clean first click = start, second click = end pattern
 * @param clickedDate The date that was clicked
 * @param selectedRange Current selected range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @param today Today's date for validation
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param isDoubleClick Whether this is a double-click event
 * @returns New date range or null if click should be ignored
 */
export const handleCalendarDateClick = (
    clickedDate: Date,
    selectedRange: DateRange,
    allowSingleDateSelection: boolean = false,
    today: Date,
    disableFutureDates: boolean = false,
    disablePastDates: boolean = false,
    isDoubleClick: boolean = false
): DateRange | null => {
    // Validate date is not disabled
    if (
        (disableFutureDates && clickedDate > today) ||
        (disablePastDates && clickedDate < today)
    ) {
        return null
    }

    // Create clean date without time components for comparison
    const clickedDateOnly = new Date(
        clickedDate.getFullYear(),
        clickedDate.getMonth(),
        clickedDate.getDate()
    )

    // Handle double click - always create single date range if allowed
    if (isDoubleClick && allowSingleDateSelection) {
        return createSingleDateRange(clickedDateOnly)
    }

    // Case 1: No selection - first click sets start date
    if (!selectedRange.startDate) {
        const startDate = createStartOfDay(clickedDateOnly)
        return { startDate, endDate: startDate }
    }

    // Case 2: We have only start date (same as start date) - second click on same date
    if (
        selectedRange.startDate &&
        selectedRange.endDate &&
        isSameDay(selectedRange.startDate, selectedRange.endDate)
    ) {
        // If clicking the same day as start date
        if (isSameDay(clickedDateOnly, selectedRange.startDate)) {
            // If single date selection is allowed, create full day range
            if (allowSingleDateSelection) {
                return createSingleDateRange(clickedDateOnly)
            }
            // Otherwise keep as single point
            return {
                startDate: selectedRange.startDate,
                endDate: selectedRange.startDate,
            }
        }

        // Clicking different date - set as end date
        if (clickedDateOnly > selectedRange.startDate) {
            // Normal range: start to end
            return {
                startDate: selectedRange.startDate,
                endDate: createEndOfDay(clickedDateOnly),
            }
        } else {
            // Clicked date is before start date - make it the new start
            const startDate = createStartOfDay(clickedDateOnly)
            return { startDate, endDate: startDate }
        }
    }

    // Case 3: We have a complete range - start over with new start date
    if (hasCompleteRange(selectedRange)) {
        const startDate = createStartOfDay(clickedDateOnly)
        return { startDate, endDate: startDate }
    }

    // Fallback - should not reach here, but handle gracefully
    const startDate = createStartOfDay(clickedDateOnly)
    return { startDate, endDate: startDate }
}

/**
 * Generates calendar weeks for a specific month with consistent alignment
 * @param year The year
 * @param month The month (0-based)
 * @returns Array of weeks with day numbers or null for empty cells
 */
export const generateMonthWeeks = (
    year: number,
    month: number
): (number | null)[][] => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const firstDayAdjusted = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const weeks = []
    let week = Array(7).fill(null)
    let dayCounter = 1

    for (let i = firstDayAdjusted; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = dayCounter++
    }
    weeks.push(week)

    while (dayCounter <= daysInMonth) {
        week = Array(7).fill(null)
        for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
            week[i] = dayCounter++
        }
        weeks.push(week)
    }

    return weeks
}

/**
 * Generates the list of months to display in calendar
 * @param startYear Starting year
 * @param startMonth Starting month (0-based)
 * @param endYear Ending year
 * @returns Array of month/year objects
 */
export const generateCalendarMonths = (
    startYear: number = 2012,
    startMonth: number = 0,
    endYear?: number
): { month: number; year: number }[] => {
    const months = []
    const currentDate = new Date()
    const finalEndYear = endYear || currentDate.getFullYear() + 5

    for (let year = startYear; year <= finalEndYear; year++) {
        const monthStart = year === startYear ? startMonth : 0
        for (let month = monthStart; month <= 11; month++) {
            months.push({ month, year })
        }
    }

    return months
}

/**
 * Generates initial months around current date (4-5 months)
 * @param today Current date
 * @returns Array of initial months to display
 */
export const generateInitialMonths = (
    today: Date
): { month: number; year: number }[] => {
    const months = []
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    for (let i = -2; i <= 2; i++) {
        const date = new Date(currentYear, currentMonth + i, 1)
        months.push({
            month: date.getMonth(),
            year: date.getFullYear(),
        })
    }

    return months
}

/**
 * Generates a chunk of months for progressive loading
 * @param startYear Starting year
 * @param startMonth Starting month (0-based)
 * @param endYear Ending year for this chunk
 * @param endMonth Ending month for this chunk (0-based)
 * @returns Array of months for the chunk
 */
export const generateMonthChunk = (
    startYear: number,
    startMonth: number,
    endYear: number,
    endMonth: number = 11
): { month: number; year: number }[] => {
    const months = []

    for (let year = startYear; year <= endYear; year++) {
        const monthStart = year === startYear ? startMonth : 0
        const monthEnd = year === endYear ? endMonth : 11

        for (let month = monthStart; month <= monthEnd; month++) {
            months.push({ month, year })
        }
    }

    return months
}

/**
 * Calculates the next chunk to load based on current data
 * @param currentMonths Currently loaded months
 * @param direction Direction to load ('past' or 'future')
 * @returns Next chunk parameters or null if reached bounds
 */
export const getNextChunkParams = (
    currentMonths: { month: number; year: number }[],
    direction: 'past' | 'future'
): { startYear: number; startMonth: number } | null => {
    const MIN_YEAR = 2012
    const MAX_YEAR = new Date().getFullYear() + 10

    if (direction === 'past') {
        const firstMonth = currentMonths[0]

        if (firstMonth.year <= MIN_YEAR && firstMonth.month === 0) {
            return null
        }

        const targetYear = Math.max(MIN_YEAR, firstMonth.year - 3)
        return {
            startYear: targetYear,
            startMonth: targetYear === MIN_YEAR ? 0 : 0,
        }
    } else {
        const lastMonth = currentMonths[currentMonths.length - 1]

        if (lastMonth.year >= MAX_YEAR) {
            return null
        }

        const nextMonth = lastMonth.month === 11 ? 0 : lastMonth.month + 1
        const nextYear =
            lastMonth.month === 11 ? lastMonth.year + 1 : lastMonth.year
        return { startYear: nextYear, startMonth: nextMonth }
    }
}

/**
 * Gets month name from month index
 * @param monthIndex Month index (0-based)
 * @returns Month name
 */
export const getMonthName = (monthIndex: number): string => {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    return monthNames[monthIndex]
}

/**
 * Gets day names for calendar header
 * @returns Array of day names
 */
export const getDayNames = (): string[] => {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
}

/**
 * Calculates the height of a single month in the calendar
 * @param year The year of the month
 * @param month The month (0-based)
 * @returns Height in pixels
 */
export const getMonthHeight = (year?: number, month?: number): number => {
    if (year !== undefined && month !== undefined) {
        const weeks = generateMonthWeeks(year, month)
        const numberOfWeeks = weeks.length
        // Month header height (32px) + consistent margin (16px) + actual weeks * 40px per week + bottom padding (16px)
        return 32 + 16 + numberOfWeeks * 40 + 16
    }
    // Default fallback for when year/month not provided (6 weeks max)
    return 32 + 16 + 6 * 40 + 16
}

/**
 * Calculates which months should be visible in the viewport
 * @param scrollTop Current scroll position
 * @param containerHeight Height of the scrollable container
 * @param months Array of all months
 * @param monthHeight Height of each month
 * @param buffer Number of months to render outside viewport for smooth scrolling
 * @returns Object with start/end indices and visible months
 */
export const getVisibleMonths = (
    scrollTop: number,
    containerHeight: number,
    months: { month: number; year: number }[],
    monthHeight: number,
    buffer: number = 12
): {
    startIndex: number
    endIndex: number
    visibleMonths: { month: number; year: number; index: number }[]
    totalHeight: number
} => {
    const totalHeight = months.length * monthHeight

    const startIndex = Math.max(0, Math.floor(scrollTop / monthHeight) - buffer)
    const endIndex = Math.min(
        months.length - 1,
        Math.ceil((scrollTop + containerHeight) / monthHeight) + buffer
    )

    const visibleMonths = months
        .slice(startIndex, endIndex + 1)
        .map((month, i) => ({
            ...month,
            index: startIndex + i,
        }))

    return {
        startIndex,
        endIndex,
        visibleMonths,
        totalHeight,
    }
}

/**
 * Throttle function to limit how often a function can be called
 * @param func Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return function (this: unknown, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * Calculates the top offset for a month at a given index
 * @param index Month index
 * @param monthHeight Height of each month
 * @returns Top offset in pixels
 */
export const getMonthOffset = (index: number, monthHeight: number): number => {
    return index * monthHeight
}

/**
 * Finds the month that contains today's date
 * @param months Array of months
 * @param today Today's date
 * @returns Index of the month containing today
 */
export const findCurrentMonthIndex = (
    months: { month: number; year: number }[],
    today: Date
): number => {
    return months.findIndex(
        ({ month, year }) =>
            month === today.getMonth() && year === today.getFullYear()
    )
}

/**
 * Scrolls to a specific month
 * @param monthIndex Index of the month to scroll to
 * @param monthHeight Height of each month
 * @returns Scroll position
 */
export const getScrollToMonth = (
    monthIndex: number,
    monthHeight: number
): number => {
    return monthIndex * monthHeight
}

/**
 * Gets all the states for a date cell
 * @param date The date to check
 * @param selectedRange Current selected range
 * @param today Today's date
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param customDisableDates Custom function to disable specific dates
 * @returns Object with all date states
 */
export const getDateCellStates = (
    date: Date,
    selectedRange: DateRange,
    today: Date,
    disableFutureDates: boolean = false,
    disablePastDates: boolean = false,
    customDisableDates?: (date: Date) => boolean
) => {
    const isStart = isStartDate(date, selectedRange)
    const isEnd = isEndDate(date, selectedRange)
    const isRangeDay = isInSelectedRange(date, selectedRange)
    const isTodayDay = isDateToday(date, today)

    // For single date selection, only show as single date if start and end are the same day
    const isSingleDate =
        isStart &&
        selectedRange.startDate &&
        selectedRange.endDate &&
        isSameDay(selectedRange.startDate, selectedRange.endDate)

    const isDisabled = Boolean(
        (disableFutureDates && date > today) ||
            (disablePastDates && date < today) ||
            (customDisableDates && customDisableDates(date))
    )

    return {
        isStart,
        isEnd,
        isRangeDay,
        isTodayDay,
        isSingleDate,
        isDisabled,
    }
}

/**
 * Determines if a today indicator should be shown
 * @param dateStates Object containing all date states
 * @returns Boolean indicating if today indicator should be shown
 */
export const shouldShowTodayIndicator = (
    dateStates: ReturnType<typeof getDateCellStates>
): boolean => {
    const { isTodayDay, isStart, isEnd, isRangeDay } = dateStates
    return isTodayDay && !isStart && !isEnd && !isRangeDay
}

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
 * @param disableFutureDates Whether future dates should be disabled
 * @param disablePastDates Whether past dates should be disabled
 * @returns Validation result with specific error type
 */
export const validateDateInput = (
    value: string,
    format: string,
    disableFutureDates: boolean = false,
    disablePastDates: boolean = false
): DateValidationResult => {
    if (!value || value.length === 0) {
        return { isValid: true, error: 'none' }
    }

    if (format === 'dd/MM/yyyy') {
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
        const match = value.match(dateRegex)

        if (!match) {
            return {
                isValid: false,
                error: 'format',
                message: 'Invalid date',
            }
        }

        const day = parseInt(match[1], 10)
        const month = parseInt(match[2], 10)
        const year = parseInt(match[3], 10)

        if (year < 2001 || year > 2100) {
            return {
                isValid: false,
                error: 'out-of-range',
                message: 'Date not in range',
            }
        }

        if (month < 1 || month > 12) {
            return {
                isValid: false,
                error: 'invalid-date',
                message: 'Invalid date',
            }
        }

        if (day < 1 || day > 31) {
            return {
                isValid: false,
                error: 'invalid-date',
                message: 'Invalid date',
            }
        }

        const date = new Date(year, month - 1, day)
        const isValidCalendarDate =
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day

        if (!isValidCalendarDate) {
            return {
                isValid: false,
                error: 'invalid-date',
                message: 'Invalid date',
            }
        }

        // Check future/past date restrictions
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Compare dates only, not times
        date.setHours(0, 0, 0, 0)

        if (disableFutureDates && date > today) {
            return {
                isValid: false,
                error: 'out-of-range',
                message: 'Future dates are not allowed',
            }
        }

        if (disablePastDates && date < today) {
            return {
                isValid: false,
                error: 'out-of-range',
                message: 'Past dates are not allowed',
            }
        }

        return { isValid: true, error: 'none' }
    }

    return { isValid: true, error: 'none' }
}

/**
 * Formats date input as user types, adding slashes automatically
 * @param value The input value to format
 * @param format The target format (e.g., 'dd/MM/yyyy')
 * @returns Formatted input value
 */
export const formatDateInput = (value: string, format: string): string => {
    if (format === 'dd/MM/yyyy') {
        // Allow existing slashes to remain, only add where needed
        const cleaned = value.replace(/[^\d/]/g, '')

        // Remove multiple consecutive slashes
        const singleSlash = cleaned.replace(/\/+/g, '/')

        // Split by slashes to work with parts
        const parts = singleSlash.split('/')

        if (parts.length === 1) {
            // Only day part
            const day = parts[0]
            if (day.length === 0) return ''
            if (day.length <= 2) return day
            if (day.length <= 4) return day.slice(0, 2) + '/' + day.slice(2)
            return (
                day.slice(0, 2) + '/' + day.slice(2, 4) + '/' + day.slice(4, 8)
            )
        } else if (parts.length === 2) {
            // Day and month parts
            const day = parts[0].slice(0, 2)
            const month = parts[1]
            if (month.length === 0) return day + '/'
            if (month.length <= 2) return day + '/' + month
            return day + '/' + month.slice(0, 2) + '/' + month.slice(2, 6)
        } else if (parts.length >= 3) {
            // All parts
            const day = parts[0].slice(0, 2)
            const month = parts[1].slice(0, 2)
            const year = parts[2].slice(0, 4)
            return day + '/' + month + (year ? '/' + year : '')
        }
    }

    return value
}

/**
 * Checks if date input is complete (full format length)
 * @param value The input value to check
 * @param format The expected format
 * @returns True if input is complete
 */
export const isDateInputComplete = (value: string, format: string): boolean => {
    if (format === 'dd/MM/yyyy') {
        return value.length === 10
    }
    return true
}

/**
 * Formats date display for the trigger button
 * @param selectedRange Current selected date range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @returns Formatted display string
 */
export const formatDateDisplay = (
    selectedRange: DateRange,
    allowSingleDateSelection: boolean = false
): string => {
    if (!selectedRange.startDate) {
        return 'Select date range'
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }

    const timeFormatOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }

    const startDateStr = selectedRange.startDate.toLocaleDateString(
        'en-US',
        formatOptions
    )
    const startTimeStr = selectedRange.startDate.toLocaleTimeString(
        'en-US',
        timeFormatOptions
    )

    if (
        !selectedRange.endDate ||
        (allowSingleDateSelection &&
            selectedRange.startDate.getTime() ===
                selectedRange.endDate.getTime())
    ) {
        return `${startDateStr}, ${startTimeStr}`
    }

    const endDateStr = selectedRange.endDate.toLocaleDateString(
        'en-US',
        formatOptions
    )
    const endTimeStr = selectedRange.endDate.toLocaleTimeString(
        'en-US',
        timeFormatOptions
    )

    return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr}`
}

/**
 * Handles date input change with formatting and validation
 * @param value Input value
 * @param dateFormat Date format string
 * @param currentRange Current selected range
 * @param timeValue Current time value (HH:mm)
 * @param isStartDate Whether this is start date or end date
 * @param disableFutureDates Whether future dates should be disabled
 * @param disablePastDates Whether past dates should be disabled
 * @returns Object with formatted value, validation result, and updated range
 */
export const handleDateInputChange = (
    value: string,
    dateFormat: string,
    currentRange: DateRange,
    timeValue: string,
    isStartDate: boolean = true,
    disableFutureDates: boolean = false,
    disablePastDates: boolean = false
): {
    formattedValue: string
    validation: DateValidationResult
    updatedRange?: DateRange
} => {
    const formattedValue = formatDateInput(value, dateFormat)
    const validation = validateDateInput(
        formattedValue,
        dateFormat,
        disableFutureDates,
        disablePastDates
    )

    let updatedRange: DateRange | undefined

    if (validation.isValid && isDateInputComplete(formattedValue, dateFormat)) {
        const parsedDate = parseDate(formattedValue, dateFormat)
        if (parsedDate !== null && isValidDate(parsedDate)) {
            const [hours, minutes] = timeValue.split(':').map(Number)
            parsedDate.setHours(hours, minutes)

            updatedRange = isStartDate
                ? { ...currentRange, startDate: parsedDate }
                : { ...currentRange, endDate: parsedDate }
        }
    }

    return {
        formattedValue,
        validation,
        updatedRange,
    }
}

/**
 * Handles time change for date range
 * @param time New time value (HH:mm)
 * @param currentRange Current selected range
 * @param isStartTime Whether this is start time or end time
 * @returns Updated date range
 */
export const handleTimeChange = (
    time: string,
    currentRange: DateRange,
    isStartTime: boolean = true
): DateRange => {
    const targetDate = isStartTime
        ? currentRange.startDate
        : currentRange.endDate

    if (targetDate) {
        const [hours, minutes] = time.split(':').map(Number)
        const newDate = new Date(targetDate)
        newDate.setHours(hours, minutes)

        return isStartTime
            ? { ...currentRange, startDate: newDate }
            : { ...currentRange, endDate: newDate }
    }

    return currentRange
}

/**
 * Handles date selection from calendar
 * @param range Selected date range from calendar
 * @param startTime Current start time
 * @param endTime Current end time
 * @param dateFormat Date format string
 * @returns Object with updated range and formatted date strings
 */
export const handleCalendarDateSelect = (
    range: DateRange,
    startTime: string,
    endTime: string,
    dateFormat: string
): {
    updatedRange: DateRange
    formattedStartDate: string
    formattedEndDate: string
} => {
    // Check if this is a single date range (same day for start and end)
    const isSingleDateRange =
        range.startDate &&
        range.endDate &&
        isSameDay(range.startDate, range.endDate)

    if (range.startDate) {
        if (isSingleDateRange) {
            // For single date ranges, preserve the 00:00:00 time for start date
            // Only override if it's not already set to start of day
            if (
                range.startDate.getHours() !== 0 ||
                range.startDate.getMinutes() !== 0
            ) {
                const [startHour, startMinute] = startTime
                    .split(':')
                    .map(Number)
                range.startDate.setHours(startHour, startMinute)
            }
        } else {
            // For range selections, use the time picker values
            const [startHour, startMinute] = startTime.split(':').map(Number)
            range.startDate.setHours(startHour, startMinute)
        }
    }

    if (range.endDate) {
        if (isSingleDateRange) {
            // For single date ranges, preserve the 23:59:59 time for end date
            // Only override if it's not already set to end of day
            if (
                range.endDate.getHours() !== 23 ||
                range.endDate.getMinutes() !== 59
            ) {
                const [endHour, endMinute] = endTime.split(':').map(Number)
                range.endDate.setHours(endHour, endMinute)
            }
        } else {
            // For range selections, use the time picker values
            const [endHour, endMinute] = endTime.split(':').map(Number)
            range.endDate.setHours(endHour, endMinute)
        }
    }

    return {
        updatedRange: range,
        formattedStartDate: formatDate(range.startDate, dateFormat),
        formattedEndDate: formatDate(range.endDate, dateFormat),
    }
}

/**
 * Handles preset selection
 * @param preset Selected preset
 * @param dateFormat Date format string
 * @returns Object with updated range, formatted dates, and times
 */
export const handlePresetSelection = (
    preset: DateRangePreset,
    dateFormat: string
): {
    updatedRange: DateRange
    formattedStartDate: string
    formattedEndDate: string
    formattedStartTime: string
    formattedEndTime: string
} => {
    const range = getPresetDateRange(preset)

    return {
        updatedRange: range,
        formattedStartDate: formatDate(range.startDate, dateFormat),
        formattedEndDate: formatDate(range.endDate, dateFormat),
        formattedStartTime: formatDate(range.startDate, 'HH:mm'),
        formattedEndTime: formatDate(range.endDate, 'HH:mm'),
    }
}

/**
 * Handles cancel action - resets to original values
 * @param originalValue Original date range value
 * @param dateFormat Date format string
 * @returns Object with reset values
 */
export const handleCancelAction = (
    originalValue: DateRange | undefined,
    dateFormat: string
): {
    resetRange: DateRange
    formattedStartDate: string
    formattedEndDate: string
    formattedStartTime: string
    formattedEndTime: string
} | null => {
    if (!originalValue) return null

    return {
        resetRange: originalValue,
        formattedStartDate: formatDate(originalValue.startDate, dateFormat),
        formattedEndDate: formatDate(originalValue.endDate, dateFormat),
        formattedStartTime: formatDate(originalValue.startDate, 'HH:mm'),
        formattedEndTime: formatDate(originalValue.endDate, 'HH:mm'),
    }
}

/**
 * Handles loading more months in calendar
 * @param months Current months array
 * @param direction Direction to load ('past' or 'future')
 * @param isLoadingPast Current loading state for past
 * @param isLoadingFuture Current loading state for future
 * @returns Promise that resolves when loading is complete
 */
export const handleLoadMoreMonths = async (
    months: { month: number; year: number }[],
    direction: 'past' | 'future',
    isLoadingPast: boolean,
    isLoadingFuture: boolean
): Promise<{ month: number; year: number }[] | null> => {
    if (
        (direction === 'past' && isLoadingPast) ||
        (direction === 'future' && isLoadingFuture)
    ) {
        return null
    }

    const chunkParams = getNextChunkParams(months, direction)
    if (!chunkParams) {
        return null
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const { startYear, startMonth } = chunkParams
    let newChunk: { month: number; year: number }[]

    if (direction === 'past') {
        const firstMonth = months[0]
        const endMonth = firstMonth.month === 0 ? 11 : firstMonth.month - 1
        const adjustedEndYear =
            firstMonth.month === 0 ? firstMonth.year - 1 : firstMonth.year

        newChunk = generateMonthChunk(
            startYear,
            startMonth,
            adjustedEndYear,
            endMonth
        )
    } else {
        const endYear = startYear + 2
        newChunk = generateMonthChunk(startYear, startMonth, endYear)
    }

    return newChunk
}

/**
 * Handles scroll position updates for calendar
 * @param scrollTop Current scroll position
 * @param scrollHeight Total scroll height
 * @param clientHeight Client height
 * @param loadThreshold Threshold for triggering loads
 * @returns Object indicating what should be loaded
 */
export const handleCalendarScroll = (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
    loadThreshold: number = 100
): {
    shouldLoadPast: boolean
    shouldLoadFuture: boolean
} => {
    const shouldLoadPast = scrollTop < loadThreshold
    const shouldLoadFuture =
        scrollTop + clientHeight > scrollHeight - loadThreshold

    return {
        shouldLoadPast,
        shouldLoadFuture,
    }
}

/**
 * Creates calendar month data structure for rendering
 * @param year Year of the month
 * @param month Month (0-based)
 * @param monthIndex Index in the months array
 * @param monthHeight Height of each month
 * @returns Month data for rendering
 */
export const createCalendarMonthData = (
    year: number,
    month: number,
    monthIndex: number,
    monthHeight: number
) => {
    const weeks = generateMonthWeeks(year, month)
    const topOffset = getMonthOffset(monthIndex, monthHeight)

    return {
        key: `month-${year}-${month}`,
        year,
        month,
        weeks,
        topOffset,
        monthHeight,
        monthName: getMonthName(month),
    }
}

/**
 * Calculates day cell props for rendering
 * @param date Date object
 * @param selectedRange Current selected range
 * @param today Today's date
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param calendarToken Calendar token for styling
 * @param customDisableDates Custom function to disable specific dates
 * @returns Day cell props
 */
export const calculateDayCellProps = (
    date: Date,
    selectedRange: DateRange,
    today: Date,
    disableFutureDates: boolean,
    disablePastDates: boolean,
    calendarToken: CalendarTokenType,
    customDisableDates?: (date: Date) => boolean
): {
    dateStates: ReturnType<typeof getDateCellStates>
    styles: Record<string, unknown>
    textColor: string | unknown
    showTodayIndicator: boolean
} => {
    const dateStates = getDateCellStates(
        date,
        selectedRange,
        today,
        disableFutureDates,
        disablePastDates,
        customDisableDates
    )

    const getCellStyles = () => {
        // Base cell styles - hardcoded values for consistent styling
        let styles: Record<string, unknown> = {
            cursor: 'pointer',
            textAlign: 'center',
            padding: '10px 8px',
            position: 'relative',
            fontWeight: '500',
            boxSizing: 'border-box',
            outline: '1px solid transparent',
            fontSize: '16px',
            lineHeight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }

        // Apply state-specific styles with hardcoded values
        if (dateStates.isSingleDate) {
            styles = {
                ...styles,
                backgroundColor: '#3b82f6',
                borderRadius: '8px',
            }
        } else if (dateStates.isStart) {
            styles = {
                ...styles,
                backgroundColor: '#3b82f6',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
            }
        } else if (dateStates.isEnd) {
            styles = {
                ...styles,
                backgroundColor: '#3b82f6',
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
            }
        } else if (dateStates.isRangeDay) {
            styles = {
                ...styles,
                backgroundColor: '#dbeafe',
            }
        }

        // Apply disabled state last to override everything
        if (dateStates.isDisabled) {
            styles = {
                ...styles,
                opacity: 0.4,
                cursor: 'not-allowed',
                pointerEvents: 'none',
            }
        }

        return styles
    }

    const getTextColor = () => {
        if (dateStates.isDisabled) {
            return calendarToken.calendar.calendarGrid.day.text.disabledDate
                .color
        } else if (
            dateStates.isStart ||
            dateStates.isEnd ||
            dateStates.isSingleDate
        ) {
            return calendarToken.calendar.calendarGrid.day.text.selectedDay
                .color
        } else if (dateStates.isTodayDay) {
            return calendarToken.calendar.calendarGrid.day.text.todayDay.color
        } else if (dateStates.isRangeDay) {
            return calendarToken.calendar.calendarGrid.day.text.rangeDay.color
        }
        return calendarToken.calendar.calendarGrid.day.text.dayNumber.color
    }

    return {
        dateStates,
        styles: getCellStyles(),
        textColor: getTextColor(),
        showTodayIndicator: shouldShowTodayIndicator(dateStates),
    }
}

const getPickerYearRange = (selectedRange: DateRange) => {
    const { MIN_YEAR, MAX_YEAR_OFFSET } = DATE_RANGE_PICKER_CONSTANTS
    const currentYear = new Date().getFullYear()
    const defaultMaxYear = currentYear + MAX_YEAR_OFFSET

    const selectedYears: number[] = []
    if (selectedRange.startDate && isValidDate(selectedRange.startDate)) {
        selectedYears.push(selectedRange.startDate.getFullYear())
    }
    if (selectedRange.endDate && isValidDate(selectedRange.endDate)) {
        selectedYears.push(selectedRange.endDate.getFullYear())
    }

    const hasSelectedYears = selectedYears.length > 0
    const earliestYear = hasSelectedYears
        ? Math.min(...selectedYears)
        : currentYear
    const latestYear = hasSelectedYears
        ? Math.max(...selectedYears)
        : currentYear

    const minYear = Math.min(MIN_YEAR, earliestYear)
    const maxYear = Math.max(defaultMaxYear, latestYear)

    return {
        minYear: Math.max(0, minYear),
        maxYear: Math.max(minYear, maxYear),
    }
}

const buildYearOptions = (minYear: number, maxYear: number): number[] => {
    if (maxYear < minYear) {
        return [minYear]
    }

    const totalYears = maxYear - minYear + 1
    return Array.from({ length: totalYears }, (_, index) => minYear + index)
}

/**
 * Generates picker data for date/time selection
 * @param tabType Whether this is for start or end date
 * @param selectedRange Current selected date range
 * @param startTime Current start time
 * @param endTime Current end time
 * @returns Object with picker data for all columns
 */
export const generatePickerData = (
    tabType: 'start' | 'end',
    selectedRange: DateRange,
    startTime: string,
    endTime: string
) => {
    const rawDate =
        tabType === 'start' ? selectedRange.startDate : selectedRange.endDate
    const targetTime = tabType === 'start' ? startTime : endTime

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const safeDate = rawDate && isValidDate(rawDate) ? new Date(rawDate) : today

    const { minYear, maxYear } = getPickerYearRange(selectedRange)
    const yearOptions = buildYearOptions(minYear, maxYear)
    const monthIndex = safeDate.getMonth()
    const daysInMonth = new Date(
        safeDate.getFullYear(),
        monthIndex + 1,
        0
    ).getDate()
    const dateOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const monthOptions = Array.from({ length: 12 }, (_, i) => i)

    const allTimes = []
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            allTimes.push(
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
            )
        }
    }

    const yearIndex = yearOptions.indexOf(safeDate.getFullYear())
    const resolvedYearIndex =
        yearIndex >= 0
            ? yearIndex
            : clampPickerIndex(yearIndex, yearOptions.length)
    const dateIndex = dateOptions.indexOf(safeDate.getDate())
    const resolvedDateIndex =
        dateIndex >= 0
            ? dateIndex
            : clampPickerIndex(dateIndex, dateOptions.length)

    return {
        years: {
            items: yearOptions,
            selectedIndex: resolvedYearIndex,
        },
        months: {
            items: monthOptions.map((m) => getMonthName(m).slice(0, 3)),
            selectedIndex: monthIndex,
        },
        dates: {
            items: dateOptions,
            selectedIndex: resolvedDateIndex,
        },
        times: {
            items: allTimes,
            selectedIndex: Math.max(0, allTimes.indexOf(targetTime)),
        },
    }
}

/**
 * Creates selection handler for picker columns
 * @param tabType Whether this is for start or end date
 * @param type The type of selection (year, month, date, time)
 * @param selectedRange Current selected range
 * @param dateFormat Date format string
 * @param handleStartTimeChange Start time change handler
 * @param handleEndTimeChange End time change handler
 * @param setSelectedRange Range setter function
 * @param setStartDate Start date setter function
 * @param setEndDate End date setter function
 * @returns Selection handler function
 */
export const createSelectionHandler = (
    tabType: 'start' | 'end',
    type: 'year' | 'month' | 'date' | 'time',
    selectedRange: DateRange,
    dateFormat: string,
    handleStartTimeChange: (time: string) => void,
    handleEndTimeChange: (time: string) => void,
    setSelectedRange: (range: DateRange) => void,
    setStartDate: (date: string) => void,
    setEndDate: (date: string) => void
) => {
    return (index: number) => {
        const now = new Date()
        const baselineDate =
            tabType === 'start'
                ? selectedRange.startDate
                : selectedRange.endDate
        const safeBaseDate =
            baselineDate && isValidDate(baselineDate)
                ? baselineDate
                : new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const newDate = new Date(safeBaseDate)

        switch (type) {
            case 'year': {
                const { minYear, maxYear } = getPickerYearRange(selectedRange)
                const years = buildYearOptions(minYear, maxYear)
                const safeIndex = clampPickerIndex(index, years.length)
                const newYear = years[safeIndex]
                const currentMonth = newDate.getMonth()
                const currentDay = newDate.getDate()
                const daysInTargetMonth = new Date(
                    newYear,
                    currentMonth + 1,
                    0
                ).getDate()
                const clampedDay = Math.min(currentDay, daysInTargetMonth)
                newDate.setFullYear(newYear, currentMonth, clampedDay)
                break
            }
            case 'month': {
                const newMonth = Math.max(0, Math.min(11, index))
                const currentDay = newDate.getDate()
                const daysInTargetMonth = new Date(
                    newDate.getFullYear(),
                    newMonth + 1,
                    0
                ).getDate()
                const clampedDay = Math.min(currentDay, daysInTargetMonth)
                newDate.setMonth(newMonth, clampedDay)
                break
            }
            case 'date': {
                const daysInMonth = new Date(
                    newDate.getFullYear(),
                    newDate.getMonth() + 1,
                    0
                ).getDate()
                const clampedIndex = Math.max(
                    0,
                    Math.min(daysInMonth - 1, index)
                )
                const dates = Array.from(
                    { length: daysInMonth },
                    (_, i) => i + 1
                )
                newDate.setDate(dates[clampedIndex])
                break
            }
            case 'time': {
                const times = []
                for (let h = 0; h < 24; h++) {
                    for (let m = 0; m < 60; m += 15) {
                        times.push(
                            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
                        )
                    }
                }
                const time = times[index]
                if (tabType === 'start') {
                    handleStartTimeChange(time)
                } else {
                    handleEndTimeChange(time)
                }
                return
            }
        }

        if (tabType === 'start') {
            setSelectedRange({ ...selectedRange, startDate: newDate })
            setStartDate(formatDate(newDate, dateFormat))
        } else {
            setSelectedRange({ ...selectedRange, endDate: newDate })
            setEndDate(formatDate(newDate, dateFormat))
        }
    }
}

/**
 * Gets preset display label with custom mappings
 * @param preset The preset to get label for
 * @returns Display label for the preset
 */
export const getPresetDisplayLabel = (preset: DateRangePreset): string => {
    switch (preset) {
        case DateRangePreset.LAST_1_HOUR:
            return 'Last 6 hours'
        case DateRangePreset.LAST_6_HOURS:
            return 'Last 6 hours'
        case DateRangePreset.LAST_7_DAYS:
            return 'Last 2 Days'
        default:
            return getPresetLabel(preset)
    }
}

/**
 * Enhanced date range formatting with preset patterns
 * @param range The date range to format
 * @param config Format configuration
 * @returns Formatted date range string
 */
export const formatDateRangeWithConfig = (
    range: DateRange,
    config: DateFormatConfig = {}
): string => {
    if (!range.startDate) {
        return ''
    }

    const {
        preset = DateFormatPreset.MEDIUM_RANGE,
        customFormat,
        includeTime = false,
        includeYear = true,
        separator = ' - ',
        locale = 'en-US',
        timeFormat = '12h',
    } = config

    if (preset === DateFormatPreset.CUSTOM && customFormat) {
        return customFormat(range, {
            includeTime,
            includeYear,
            separator,
            locale,
        })
    }

    const startDate = range.startDate
    const endDate = range.endDate || range.startDate
    const isSameDate = isSameDay(startDate, endDate)

    // Helper function to format time
    const formatTimeString = (date: Date): string => {
        if (!includeTime) return ''

        if (timeFormat === '12h') {
            return formatTimeIn12Hour(date)
        } else {
            return formatDate(date, 'HH:mm')
        }
    }

    // Helper function to get month abbreviation
    const getMonthAbbr = (date: Date): string => {
        return date.toLocaleDateString(locale, { month: 'short' })
    }

    // Helper function to get full month name
    const getMonthFull = (date: Date): string => {
        return date.toLocaleDateString(locale, { month: 'long' })
    }

    // Helper function to get ordinal suffix
    const getOrdinalSuffix = (day: number): string => {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
            case 1:
                return 'st'
            case 2:
                return 'nd'
            case 3:
                return 'rd'
            default:
                return 'th'
        }
    }

    switch (preset) {
        case DateFormatPreset.SHORT_RANGE: {
            const startMonth = getMonthAbbr(startDate)
            const startDay = startDate.getDate()
            const endDay = endDate.getDate()
            const year = includeYear ? ` ${startDate.getFullYear()}` : ''

            if (isSameDate && !includeTime) {
                return `${startMonth} ${startDay}${year}`
            }

            if (isSameDate && includeTime) {
                const startTimeStr = formatTimeString(startDate)
                const endTimeStr = formatTimeString(endDate)

                if (startTimeStr === endTimeStr) {
                    return `${startMonth} ${startDay}${year}, ${startTimeStr}`
                } else {
                    return `${startMonth} ${startDay}${year}, ${startTimeStr} - ${endTimeStr}`
                }
            }

            if (
                startDate.getMonth() === endDate.getMonth() &&
                startDate.getFullYear() === endDate.getFullYear()
            ) {
                const timeStr = includeTime
                    ? `, ${formatTimeString(startDate)} - ${formatTimeString(endDate)}`
                    : ''
                return `${startMonth} ${startDay}-${endDay}${year}${timeStr}`
            }

            const endMonth = getMonthAbbr(endDate)
            const endYear =
                includeYear && endDate.getFullYear() !== startDate.getFullYear()
                    ? ` ${endDate.getFullYear()}`
                    : ''
            const timeStr = includeTime
                ? `, ${formatTimeString(startDate)} - ${formatTimeString(endDate)}`
                : ''
            return `${startMonth} ${startDay}${year} - ${endMonth} ${endDay}${endYear}${timeStr}`
        }

        case DateFormatPreset.MEDIUM_RANGE: {
            const startMonth = getMonthAbbr(startDate)
            const startDay = startDate.getDate()
            const year = includeYear ? ` ${startDate.getFullYear()}` : ''

            if (isSameDate) {
                if (!includeTime) {
                    return `${startMonth} ${startDay}${year}`
                } else {
                    const startTimeStr = formatTimeString(startDate)
                    const endTimeStr = formatTimeString(endDate)

                    if (startTimeStr === endTimeStr) {
                        return `${startMonth} ${startDay}${year}, ${startTimeStr}`
                    } else {
                        return `${startMonth} ${startDay}${year}, ${startTimeStr} - ${endTimeStr}`
                    }
                }
            }

            const endMonth = getMonthAbbr(endDate)
            const endDay = endDate.getDate()
            const endYear =
                includeYear && endDate.getFullYear() !== startDate.getFullYear()
                    ? ` ${endDate.getFullYear()}`
                    : ''
            const timeStr = includeTime
                ? `, ${formatTimeString(startDate)} - ${formatTimeString(endDate)}`
                : ''
            return `${startMonth} ${startDay}${separator}${endMonth} ${endDay}${endYear || year}${timeStr}`
        }

        case DateFormatPreset.LONG_RANGE: {
            const startMonth = getMonthAbbr(startDate)
            const startDay = startDate.getDate()
            const startYear = includeYear ? ` ${startDate.getFullYear()}` : ''

            if (isSameDate && !includeTime) {
                return `${startMonth} ${startDay}${startYear}`
            }

            if (isSameDate && includeTime) {
                const startTimeStr = formatTimeString(startDate)
                const endTimeStr = formatTimeString(endDate)

                if (startTimeStr === endTimeStr) {
                    return `${startMonth} ${startDay}${startYear}, ${startTimeStr}`
                } else {
                    return `${startMonth} ${startDay}${startYear}, ${startTimeStr}${separator}${startMonth} ${startDay}${startYear}, ${endTimeStr}`
                }
            }

            const endMonth = getMonthAbbr(endDate)
            const endDay = endDate.getDate()
            const endYear = includeYear ? ` ${endDate.getFullYear()}` : ''

            if (includeTime) {
                const startTimeStr = formatTimeString(startDate)
                const endTimeStr = formatTimeString(endDate)
                return `${startMonth} ${startDay}${startYear}, ${startTimeStr}${separator}${endMonth} ${endDay}${endYear}, ${endTimeStr}`
            }

            return `${startMonth} ${startDay}${startYear}${separator}${endMonth} ${endDay}${endYear}`
        }

        case DateFormatPreset.SHORT_SINGLE: {
            const month = getMonthAbbr(startDate)
            const day = startDate.getDate()
            const year = includeYear ? ` ${startDate.getFullYear()}` : ''
            const timeStr = includeTime
                ? `, ${formatTimeString(startDate)}`
                : ''
            return `${month} ${day}${year}${timeStr}`
        }

        case DateFormatPreset.MEDIUM_SINGLE: {
            const month = getMonthFull(startDate)
            const day = startDate.getDate()
            const year = includeYear ? `, ${startDate.getFullYear()}` : ''
            const timeStr = includeTime
                ? `, ${formatTimeString(startDate)}`
                : ''
            return `${month} ${day}${year}${timeStr}`
        }

        case DateFormatPreset.LONG_SINGLE: {
            const month = getMonthFull(startDate)
            const day = startDate.getDate()
            const ordinal = getOrdinalSuffix(day)
            const year = includeYear ? `, ${startDate.getFullYear()}` : ''
            const timeStr = includeTime
                ? `, ${formatTimeString(startDate)}`
                : ''
            return `${month} ${day}${ordinal}${year}${timeStr}`
        }

        case DateFormatPreset.ISO_RANGE: {
            const startISO = startDate.toISOString().split('T')[0]

            if (isSameDate) {
                const timeStr = includeTime
                    ? ` ${formatDate(startDate, 'HH:mm')}`
                    : ''
                return `${startISO}${timeStr}`
            }

            const endISO = endDate.toISOString().split('T')[0]
            const timeStr = includeTime
                ? ` ${formatDate(startDate, 'HH:mm')} - ${formatDate(endDate, 'HH:mm')}`
                : ''
            return `${startISO}${separator}${endISO}${timeStr}`
        }

        case DateFormatPreset.US_RANGE: {
            const startUS = formatDate(startDate, 'MM/dd/yyyy')

            if (isSameDate) {
                const timeStr = includeTime
                    ? ` ${formatTimeString(startDate)}`
                    : ''
                return `${startUS}${timeStr}`
            }

            const endUS = formatDate(endDate, 'MM/dd/yyyy')
            const timeStr = includeTime
                ? ` ${formatTimeString(startDate)} - ${formatTimeString(endDate)}`
                : ''
            return `${startUS}${separator}${endUS}${timeStr}`
        }

        default:
            return formatDateRange(range, includeTime)
    }
}

/**
 * Creates a custom trigger element with enhanced formatting
 * @param range Current selected date range
 * @param config Format configuration
 * @param placeholder Placeholder text when no range is selected
 * @returns Formatted display string for trigger
 */
export const formatTriggerDisplay = (
    range: DateRange | undefined,
    config: DateFormatConfig = {},
    placeholder: string = 'Select date range'
): string => {
    if (!range || !range.startDate) {
        return placeholder
    }

    return formatDateRangeWithConfig(range, config)
}

/**
 * Predefined format configurations for common use cases
 */
export const FORMAT_PRESETS = {
    COMPACT_NO_TIME: {
        preset: DateFormatPreset.SHORT_RANGE,
        includeTime: false,
        includeYear: true,
    } as DateFormatConfig,

    COMPACT_NO_YEAR: {
        preset: DateFormatPreset.SHORT_RANGE,
        includeTime: false,
        includeYear: false,
    } as DateFormatConfig,

    MEDIUM_NO_TIME: {
        preset: DateFormatPreset.MEDIUM_RANGE,
        includeTime: false,
        includeYear: true,
    } as DateFormatConfig,

    MEDIUM_WITH_TIME: {
        preset: DateFormatPreset.MEDIUM_RANGE,
        includeTime: true,
        includeYear: true,
        timeFormat: '12h' as const,
    } as DateFormatConfig,

    VERBOSE_NO_TIME: {
        preset: DateFormatPreset.LONG_RANGE,
        includeTime: false,
        includeYear: true,
    } as DateFormatConfig,

    VERBOSE_WITH_TIME: {
        preset: DateFormatPreset.LONG_RANGE,
        includeTime: true,
        includeYear: true,
        timeFormat: '12h' as const,
    } as DateFormatConfig,

    ISO_FORMAT: {
        preset: DateFormatPreset.ISO_RANGE,
        includeTime: false,
        includeYear: true,
    } as DateFormatConfig,

    ISO_WITH_TIME: {
        preset: DateFormatPreset.ISO_RANGE,
        includeTime: true,
        includeYear: true,
        timeFormat: '24h' as const,
    } as DateFormatConfig,

    US_FORMAT: {
        preset: DateFormatPreset.US_RANGE,
        includeTime: false,
        includeYear: true,
    } as DateFormatConfig,

    US_WITH_TIME: {
        preset: DateFormatPreset.US_RANGE,
        includeTime: true,
        includeYear: true,
        timeFormat: '12h' as const,
    } as DateFormatConfig,
} as const

/**
 * Helper function to create custom format functions
 * @param formatFn Custom formatting function
 * @returns DateFormatConfig with custom format
 */
export const createCustomFormat = (
    formatFn: CustomFormatFunction
): DateFormatConfig => ({
    preset: DateFormatPreset.CUSTOM,
    customFormat: formatFn,
})

/**
 * Example custom format functions
 */
export const CUSTOM_FORMAT_EXAMPLES = {
    RELATIVE: createCustomFormat((range) => {
        const now = new Date()
        const startDiff = Math.floor(
            (now.getTime() - range.startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
        const endDiff = Math.floor(
            (now.getTime() - range.endDate.getTime()) / (1000 * 60 * 60 * 24)
        )

        const formatRelative = (diff: number): string => {
            if (diff === 0) return 'today'
            if (diff === 1) return 'yesterday'
            if (diff === -1) return 'tomorrow'
            if (diff > 0) return `${diff} days ago`
            return `in ${Math.abs(diff)} days`
        }

        if (isSameDay(range.startDate, range.endDate)) {
            return formatRelative(startDiff)
        }

        return `${formatRelative(startDiff)} - ${formatRelative(endDiff)}`
    }),

    BUSINESS: createCustomFormat((range) => {
        const startDate = range.startDate
        const endDate = range.endDate

        const startQuarter = Math.floor(startDate.getMonth() / 3) + 1
        const endQuarter = Math.floor(endDate.getMonth() / 3) + 1

        if (
            startQuarter === endQuarter &&
            startDate.getFullYear() === endDate.getFullYear()
        ) {
            return `Q${startQuarter} ${startDate.getFullYear()}`
        }

        const startMonth = startDate.toLocaleDateString('en-US', {
            month: 'short',
        })
        const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' })
        const year = startDate.getFullYear()

        return `${startMonth} - ${endMonth} ${year}`
    }),

    MINIMAL: createCustomFormat((range, options = {}) => {
        const { separator = '-' } = options
        const startDate = range.startDate
        const endDate = range.endDate

        if (isSameDay(startDate, endDate)) {
            return `${startDate.getDate()} ${startDate.toLocaleDateString('en-US', { month: 'short' })}`
        }

        const startDay = startDate.getDate()
        const endDay = endDate.getDate()
        const month = startDate.toLocaleDateString('en-US', { month: 'short' })

        if (
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getFullYear() === endDate.getFullYear()
        ) {
            return `${startDay}${separator}${endDay} ${month}`
        }

        const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' })
        return `${startDay} ${month} ${separator} ${endDay} ${endMonth}`
    }),
}

const HAPTIC_PATTERNS = {
    selection: [5], // Light feedback for scroll selection
    impact: [10], // Subtle impact for direct selection
    notification: [15, 30, 15], // Softer pattern for notifications
} as const

/**
 * Enhanced haptic feedback utility with better error handling
 * @param type The type of haptic feedback to trigger
 */
export const triggerHapticFeedback = (
    type: HapticFeedbackType = HapticFeedbackType.SELECTION
): void => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return
    }

    const pattern = HAPTIC_PATTERNS[type] || HAPTIC_PATTERNS.selection
    let hapticTriggered = false

    // Method 1: Standard Vibration API
    try {
        if (navigator.vibrate && typeof navigator.vibrate === 'function') {
            const success = navigator.vibrate(pattern)
            if (success) {
                hapticTriggered = true
            }
        }
    } catch {
        // Silent fail, continue to next method
    }

    // Method 2: Vendor-prefixed vibration APIs
    if (!hapticTriggered) {
        try {
            // @ts-expect-error - Vendor prefixed APIs
            const vibrate = navigator.webkitVibrate || navigator.mozVibrate
            if (vibrate && typeof vibrate === 'function') {
                vibrate.call(navigator, pattern)
                hapticTriggered = true
            }
        } catch {
            // Silent fail
        }
    }

    if (!hapticTriggered && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        try {
            if (
                window.DeviceMotionEvent &&
                // @ts-expect-error - iOS 13+ requires permission
                typeof window.DeviceMotionEvent.requestPermission === 'function'
            ) {
                if (navigator.vibrate) {
                    navigator.vibrate(pattern)
                    hapticTriggered = true
                }
            }
        } catch {
            // Silent fail
        }
    }
}

export class calendarHapticManager {
    private lastHapticTime = 0
    private lastHapticIndex = -1
    private readonly hapticCooldown = 100
    private isDestroyed = false

    /**
     * Triggers haptic feedback when scrolling to a new item
     * @param currentIndex The current selected index
     */
    triggerScrollHaptic(currentIndex: number): void {
        if (this.isDestroyed || !Number.isInteger(currentIndex)) {
            return
        }

        const now = performance.now()

        if (
            currentIndex !== this.lastHapticIndex &&
            now - this.lastHapticTime >= this.hapticCooldown &&
            currentIndex >= 0
        ) {
            triggerHapticFeedback(HapticFeedbackType.SELECTION)
            this.lastHapticTime = now
            this.lastHapticIndex = currentIndex
        }
    }

    triggerSelectionHaptic(): void {
        if (this.isDestroyed) {
            return
        }

        triggerHapticFeedback(HapticFeedbackType.IMPACT)
        this.lastHapticTime = performance.now()
    }

    reset(): void {
        this.lastHapticTime = 0
        this.lastHapticIndex = -1
    }

    destroy(): void {
        this.isDestroyed = true
        this.reset()
    }
}

export const MOBILE_CALENDAR_CONSTANTS = {
    // Scroll behavior - optimized for smoothness and control
    SNAP_DURATION: 340, // Controlled snap similar to native pickers
    MOMENTUM_THRESHOLD: 0.01, // Lower threshold for steadier momentum
    DECELERATION_RATE: 0.95, // Slower deceleration for smoother glide
    MIN_VELOCITY: 0.005, // Prevent tiny jitters
    MAX_MOMENTUM_DISTANCE: 50, // Allow momentum to scroll through many items
    VELOCITY_MULTIPLIER: 0.8, // Impact from swipe speed
    VELOCITY_SMOOTHING: 0.7, // Balanced velocity curve
    SCROLL_RESISTANCE: 0.95, // Lower friction for Apple-like feel

    // Visual feedback - refined values
    SCALE_SELECTED: 1.02, // More subtle scaling
    SCALE_UNSELECTED: 0.98, // Gentler unselected scaling
    OPACITY_SELECTED: 1, // Full opacity for selected
    OPACITY_UNSELECTED: 0.9, // Better visibility

    TRANSITION_DURATION: '220ms',
    EASING: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    ANIMATION_FRAME_LIMIT: 60, // Limit animation frames
    VELOCITY_HISTORY_SIZE: 3, // Smaller history for better performance
} as const

export const MOBILE_PICKER_CONSTANTS = {
    ITEM_HEIGHT: 44,
    VISIBLE_ITEMS: 3,
    SCROLL_DEBOUNCE: 130,
} as const

/**
 * Safely gets an item from an array with comprehensive bounds checking
 * @param items The array of items
 * @param index The index to access
 * @returns The item at the index or empty string if out of bounds
 */
export const safeGetPickerItem = (
    items: (string | number)[],
    index: number
): string => {
    // Comprehensive validation
    if (!Array.isArray(items) || items.length === 0) {
        return ''
    }

    if (!Number.isInteger(index) || index < 0 || index >= items.length) {
        return ''
    }

    const item = items[index]
    if (item === undefined || item === null) {
        return ''
    }

    return String(item)
}

/**
 * Calculates the visible items for the picker with robust bounds checking
 * @param items The array of items
 * @param selectedIndex The currently selected index
 * @returns Object with top, center, and bottom items plus availability flags
 */
export const getPickerVisibleItems = (
    items: (string | number)[],
    selectedIndex: number
) => {
    if (!Array.isArray(items) || items.length === 0) {
        return {
            topItem: '',
            centerItem: '',
            bottomItem: '',
            hasTopItem: false,
            hasBottomItem: false,
        }
    }

    const clampedIndex = clampPickerIndex(selectedIndex, items.length)

    return {
        topItem: safeGetPickerItem(items, clampedIndex - 1),
        centerItem: safeGetPickerItem(items, clampedIndex),
        bottomItem: safeGetPickerItem(items, clampedIndex + 1),
        hasTopItem: clampedIndex > 0 && items.length > 1,
        hasBottomItem: clampedIndex < items.length - 1 && items.length > 1,
    }
}

/**
 * Validates and clamps an index to array bounds with safety checks
 * @param index The index to validate
 * @param arrayLength The length of the array
 * @returns Clamped index within bounds
 */
export const clampPickerIndex = (
    index: number,
    arrayLength: number
): number => {
    if (!Number.isInteger(arrayLength) || arrayLength <= 0) {
        return 0
    }

    if (!Number.isFinite(index)) {
        return 0
    }

    return Math.max(0, Math.min(arrayLength - 1, Math.floor(index)))
}

/**
 * Calculates scroll position for a given index with validation
 * @param index The target index
 * @param itemHeight Height of each item
 * @returns Scroll position in pixels
 */
export const calculateScrollPosition = (
    index: number,
    itemHeight: number
): number => {
    if (
        !Number.isFinite(index) ||
        !Number.isFinite(itemHeight) ||
        itemHeight <= 0
    ) {
        return 0
    }

    const clampedIndex = Math.max(0, Math.floor(index))
    return clampedIndex * itemHeight
}

/**
 * Calculates index from scroll position with bounds checking
 * @param scrollTop Current scroll position
 * @param itemHeight Height of each item
 * @returns Calculated index
 */
export const calculateIndexFromScroll = (
    scrollTop: number,
    itemHeight: number
): number => {
    if (
        !Number.isFinite(scrollTop) ||
        !Number.isFinite(itemHeight) ||
        itemHeight <= 0
    ) {
        return 0
    }

    const calculatedIndex = Math.round(Math.max(0, scrollTop) / itemHeight)
    return Math.max(0, calculatedIndex)
}

/**
 * Validates time input with comprehensive checks
 * @param input The input string to validate
 * @returns True if input is valid
 */
export const isValidTimeInput = (input: string): boolean => {
    if (typeof input !== 'string') {
        return false
    }

    return /^[0-9:.\s]*$/.test(input) && input.length <= 8
}

/**
 * Formats time input with better validation
 * @param input The input string to format
 * @returns Formatted time string
 */
export const formatTimeInput = (input: string): string => {
    if (!isValidTimeInput(input)) {
        return ''
    }

    const cleaned = input.replace(/[^0-9:]/g, '')

    if (cleaned.length === 0) {
        return ''
    }

    if (cleaned.length <= 2) {
        return cleaned
    }

    if (cleaned.length === 3 && !cleaned.includes(':')) {
        return cleaned.slice(0, 2) + ':' + cleaned.slice(2)
    }

    if (cleaned.length >= 4) {
        const parts = cleaned.split(':')
        if (parts.length >= 2) {
            const hours = parts[0].slice(0, 2)
            const minutes = parts[1].slice(0, 2)
            return hours + ':' + minutes
        }
    }

    return cleaned.slice(0, 5)
}

/**
 * Validates if a date range has valid date/time combinations
 * @param range The date range to validate
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @returns Validation result with specific error information
 */
export const validateDateTimeRange = (
    range: DateRange
): {
    isValid: boolean
    error:
        | 'none'
        | 'invalid-time-order'
        | 'missing-dates'
        | 'invalid-single-date'
    message?: string
} => {
    if (!range.startDate || !range.endDate) {
        return {
            isValid: false,
            error: 'missing-dates',
            message: 'Both start and end dates are required',
        }
    }

    const isSingleDate = isSameDay(range.startDate, range.endDate)

    if (range.endDate.getTime() < range.startDate.getTime()) {
        return {
            isValid: false,
            error: 'invalid-time-order',
            message: isSingleDate
                ? 'End time must be after or equal to start time on the same day'
                : 'End date/time must be after start date/time',
        }
    }

    if (isSingleDate) {
        return { isValid: true, error: 'none' }
    }

    return { isValid: true, error: 'none' }
}

/**
 * Checks if a date should be hidden from calendar view
 * @param date The date to check
 * @param today Today's date
 * @param disableFutureDates Whether future dates should be hidden
 * @param disablePastDates Whether past dates should be hidden
 * @param hideFutureDates Whether to completely hide future dates (not just disable)
 * @param hidePastDates Whether to completely hide past dates (not just disable)
 * @returns True if the date should be hidden
 */
export const shouldHideDateFromCalendar = (
    date: Date,
    today: Date,
    hideFutureDates: boolean = false,
    hidePastDates: boolean = false
): boolean => {
    const dateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    )
    const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    )

    if (hideFutureDates && dateOnly > todayOnly) {
        return true
    }

    if (hidePastDates && dateOnly < todayOnly) {
        return true
    }

    return false
}

/**
 * Enhanced calendar date click handler with proper single date selection
 * @param clickedDate The date that was clicked
 * @param selectedRange Current selected range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @param today Today's date for validation
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param isDoubleClick Whether this is a double-click event
 * @returns New date range or null if click should be ignored
 */
export const handleEnhancedCalendarDateClick = (
    clickedDate: Date,
    selectedRange: DateRange,
    allowSingleDateSelection: boolean = false,
    today: Date,
    disableFutureDates: boolean = false,
    disablePastDates: boolean = false,
    isDoubleClick: boolean = false
): DateRange | null => {
    // Validate date is not disabled
    if (
        (disableFutureDates && clickedDate > today) ||
        (disablePastDates && clickedDate < today)
    ) {
        return null
    }

    // Create clean date without time components for comparison
    const clickedDateOnly = new Date(
        clickedDate.getFullYear(),
        clickedDate.getMonth(),
        clickedDate.getDate()
    )

    // Handle double click - always create single date range if allowed
    if (isDoubleClick && allowSingleDateSelection) {
        return createSingleDateRange(clickedDateOnly)
    }

    // For single date selection mode, always create single date ranges
    if (allowSingleDateSelection) {
        return createSingleDateRange(clickedDateOnly)
    }

    // Regular range selection logic
    // Case 1: No selection - first click sets start date
    if (!selectedRange.startDate) {
        const startDate = createStartOfDay(clickedDateOnly)
        return { startDate, endDate: startDate }
    }

    // Case 2: We have only start date (same as start date) - second click on same date
    if (
        selectedRange.startDate &&
        selectedRange.endDate &&
        isSameDay(selectedRange.startDate, selectedRange.endDate)
    ) {
        // If clicking the same day as start date, keep as single point
        if (isSameDay(clickedDateOnly, selectedRange.startDate)) {
            return {
                startDate: selectedRange.startDate,
                endDate: selectedRange.startDate,
            }
        }

        // Clicking different date - set as end date
        if (clickedDateOnly > selectedRange.startDate) {
            // Normal range: start to end
            return {
                startDate: selectedRange.startDate,
                endDate: createEndOfDay(clickedDateOnly),
            }
        } else {
            // Clicked date is before start date - make it the new start
            const startDate = createStartOfDay(clickedDateOnly)
            return { startDate, endDate: startDate }
        }
    }

    // Case 3: We have a complete range - start over with new start date
    if (hasCompleteRange(selectedRange)) {
        const startDate = createStartOfDay(clickedDateOnly)
        return { startDate, endDate: startDate }
    }

    // Fallback - should not reach here, but handle gracefully
    const startDate = createStartOfDay(clickedDateOnly)
    return { startDate, endDate: startDate }
}

/**
 * Validates custom range configuration
 * @param config The custom range configuration to validate
 * @returns Validation result
 */
export const validateCustomRangeConfig = (
    config: CustomRangeConfig
): { isValid: boolean; error?: string } => {
    if (!config.calculateEndDate && !config.referenceRange) {
        return {
            isValid: false,
            error: 'Either calculateEndDate or referenceRange must be provided',
        }
    }

    if (config.backwardDays !== undefined && config.backwardDays < 0) {
        return {
            isValid: false,
            error: 'backwardDays must be a non-negative number',
        }
    }

    return { isValid: true }
}

/**
 * Handles calendar date click with custom range configuration support
 * @param clickedDate The date that was clicked
 * @param selectedRange Current selected range
 * @param allowSingleDateSelection Whether single date selection is allowed
 * @param today Today's date for validation
 * @param disableFutureDates Whether future dates are disabled
 * @param disablePastDates Whether past dates are disabled
 * @param customRangeConfig Custom range configuration
 * @param isDoubleClick Whether this is a double-click event
 * @returns New date range or null if click should be ignored
 */
export const handleCustomRangeCalendarDateClick = (
    clickedDate: Date,
    selectedRange: DateRange,
    allowSingleDateSelection: boolean = false,
    today: Date,
    disableFutureDates: boolean = false,
    disablePastDates: boolean = false,
    customRangeConfig?: CustomRangeConfig,
    isDoubleClick: boolean = false
): DateRange | null => {
    // Validate date is not disabled
    if (
        (disableFutureDates && clickedDate > today) ||
        (disablePastDates && clickedDate < today)
    ) {
        return null
    }

    // If no custom range config, use standard logic
    if (!customRangeConfig) {
        return handleCalendarDateClick(
            clickedDate,
            selectedRange,
            allowSingleDateSelection,
            today,
            disableFutureDates,
            disablePastDates,
            isDoubleClick
        )
    }

    // Custom range logic
    const clickedDateOnly = new Date(
        clickedDate.getFullYear(),
        clickedDate.getMonth(),
        clickedDate.getDate()
    )

    // Handle double click - always create single date range if allowed
    if (isDoubleClick && allowSingleDateSelection) {
        return createSingleDateRange(clickedDateOnly)
    }

    // Calculate end date based on custom config
    let endDate: Date

    if (customRangeConfig.referenceRange) {
        // Use reference range to calculate duration
        const duration =
            customRangeConfig.referenceRange.endDate.getTime() -
            customRangeConfig.referenceRange.startDate.getTime()
        endDate = new Date(clickedDateOnly.getTime() + duration)
    } else if (customRangeConfig.calculateEndDate) {
        const calculatedDate =
            customRangeConfig.calculateEndDate(clickedDateOnly)
        if (!calculatedDate) {
            // Fallback to standard logic if calculation returns null
            return handleCalendarDateClick(
                clickedDate,
                selectedRange,
                allowSingleDateSelection,
                today,
                disableFutureDates,
                disablePastDates,
                isDoubleClick
            )
        }
        endDate = calculatedDate
    } else {
        // Fallback to standard logic
        return handleCalendarDateClick(
            clickedDate,
            selectedRange,
            allowSingleDateSelection,
            today,
            disableFutureDates,
            disablePastDates,
            isDoubleClick
        )
    }

    // Handle backward days if specified
    if (customRangeConfig.backwardDays !== undefined) {
        const startDate = new Date(clickedDateOnly)
        startDate.setDate(startDate.getDate() - customRangeConfig.backwardDays)
        startDate.setHours(0, 0, 0, 0)

        const calculatedEndDate = new Date(clickedDateOnly)
        calculatedEndDate.setHours(23, 59, 59, 999)

        return { startDate, endDate: calculatedEndDate }
    }

    // Set start date to beginning of clicked day
    const startDate = createStartOfDay(clickedDateOnly)

    // If manual end date selection is allowed and we already have a start date
    if (
        customRangeConfig.allowManualEndDateSelection &&
        selectedRange.startDate &&
        !isSameDay(selectedRange.startDate, selectedRange.endDate)
    ) {
        // Allow second click to set end date
        if (clickedDateOnly > selectedRange.startDate) {
            return {
                startDate: selectedRange.startDate,
                endDate: createEndOfDay(clickedDateOnly),
            }
        }
    }

    // Ensure end date is at end of day
    if (isSameDay(startDate, endDate)) {
        endDate = createEndOfDay(endDate)
    }

    return { startDate, endDate }
}

// =============================================================================
// PRESET DETECTION UTILITIES
// =============================================================================

/**
 * Checks if two dates represent the same calendar day (ignoring time and timezone)
 */
export const isSameCalendarDay = (date1: Date, date2: Date): boolean => {
    // Compare both in local timezone and UTC to handle timezone differences
    const localSame =
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()

    const utcSame =
        date1.getUTCFullYear() === date2.getUTCFullYear() &&
        date1.getUTCMonth() === date2.getUTCMonth() &&
        date1.getUTCDate() === date2.getUTCDate()

    return localSame || utcSame
}

/**
 * Checks if a date range represents a full day in any timezone
 */
export const isFullDayRange = (startDate: Date, endDate: Date): boolean => {
    // Check if it's a full day in local timezone
    const localStartIsStartOfDay =
        startDate.getHours() === 0 &&
        startDate.getMinutes() === 0 &&
        startDate.getSeconds() === 0 &&
        startDate.getMilliseconds() === 0

    const localEndIsEndOfDay =
        endDate.getHours() === 23 &&
        endDate.getMinutes() === 59 &&
        endDate.getSeconds() === 59 &&
        endDate.getMilliseconds() === 999

    // Check if it's a full day in UTC
    const utcStartIsStartOfDay =
        startDate.getUTCHours() === 0 &&
        startDate.getUTCMinutes() === 0 &&
        startDate.getUTCSeconds() === 0 &&
        startDate.getUTCMilliseconds() === 0

    const utcEndIsEndOfDay =
        endDate.getUTCHours() === 23 &&
        endDate.getUTCMinutes() === 59 &&
        endDate.getUTCSeconds() === 59 &&
        endDate.getUTCMilliseconds() === 999

    const isLocalFullDay =
        localStartIsStartOfDay &&
        localEndIsEndOfDay &&
        isSameCalendarDay(startDate, endDate)
    const isUtcFullDay =
        utcStartIsStartOfDay &&
        utcEndIsEndOfDay &&
        isSameCalendarDay(startDate, endDate)

    return isLocalFullDay || isUtcFullDay
}

/**
 * Checks if a date range matches "Today" preset
 */
export const matchesTodayPreset = (range: DateRange): boolean => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Check if start date is today at midnight
    const startIsToday = isSameCalendarDay(range.startDate, today)
    const startIsStartOfDay =
        range.startDate.getHours() === 0 &&
        range.startDate.getMinutes() === 0 &&
        range.startDate.getSeconds() === 0 &&
        range.startDate.getMilliseconds() === 0

    // End date should be sometime today (not necessarily current time)
    const endIsToday = isSameCalendarDay(range.endDate, today)

    return startIsToday && startIsStartOfDay && endIsToday
}

/**
 * Checks if a date range matches "Yesterday" preset
 */
export const matchesYesterdayPreset = (range: DateRange): boolean => {
    const now = new Date()
    const yesterday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
    )

    // Check if it's a full day range for yesterday
    const startIsYesterday = isSameCalendarDay(range.startDate, yesterday)
    const endIsYesterday = isSameCalendarDay(range.endDate, yesterday)

    // More flexible check for full day - allow for slight variations in milliseconds
    const isFullDayOrClose =
        isFullDayRange(range.startDate, range.endDate) ||
        (startIsYesterday &&
            endIsYesterday &&
            range.startDate.getHours() === 0 &&
            range.startDate.getMinutes() === 0 &&
            range.endDate.getHours() === 23 &&
            range.endDate.getMinutes() === 59)

    return startIsYesterday && endIsYesterday && isFullDayOrClose
}

/**
 * Checks if a date range matches "Tomorrow" preset
 */
export const matchesTomorrowPreset = (range: DateRange): boolean => {
    const now = new Date()
    const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
    )

    // Check if it's a full day range for tomorrow
    const startIsTomorrow = isSameCalendarDay(range.startDate, tomorrow)
    const endIsTomorrow = isSameCalendarDay(range.endDate, tomorrow)
    const isFullDay = isFullDayRange(range.startDate, range.endDate)

    return startIsTomorrow && endIsTomorrow && isFullDay
}

/**
 * Checks if a date range matches "This Month" preset
 */
export const matchesThisMonthPreset = (range: DateRange): boolean => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const startOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
        0,
        0,
        0,
        0
    )

    const startMatches =
        Math.abs(range.startDate.getTime() - startOfMonth.getTime()) <=
        DATE_RANGE_PICKER_CONSTANTS.TIMEZONE_TOLERANCE_HOURS * 60 * 60 * 1000

    const endInCurrentMonth =
        range.endDate.getFullYear() === now.getFullYear() &&
        range.endDate.getMonth() === now.getMonth()

    return startMatches && endInCurrentMonth
}

/**
 * Checks if a date range matches "Last Month" preset
 */
export const matchesLastMonthPreset = (range: DateRange): boolean => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

    const startOfLastMonth = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth(),
        1,
        0,
        0,
        0,
        0
    )

    const endOfLastMonth = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
    )

    const startMatches =
        Math.abs(range.startDate.getTime() - startOfLastMonth.getTime()) <=
        DATE_RANGE_PICKER_CONSTANTS.TIMEZONE_TOLERANCE_HOURS * 60 * 60 * 1000

    const endMatches =
        Math.abs(range.endDate.getTime() - endOfLastMonth.getTime()) <=
        DATE_RANGE_PICKER_CONSTANTS.TIMEZONE_TOLERANCE_HOURS * 60 * 60 * 1000

    return startMatches && endMatches
}

/**
 * Robust preset detection that works with both UTC and local timezone dates
 */
export const detectPresetFromRange = (range: DateRange): DateRangePreset => {
    if (!range.startDate || !range.endDate) {
        return DateRangePreset.CUSTOM
    }

    // Check specific day presets first
    if (matchesTodayPreset(range)) {
        return DateRangePreset.TODAY
    }

    if (matchesYesterdayPreset(range)) {
        return DateRangePreset.YESTERDAY
    }

    if (matchesTomorrowPreset(range)) {
        return DateRangePreset.TOMORROW
    }

    if (matchesThisMonthPreset(range)) {
        return DateRangePreset.THIS_MONTH
    }

    if (matchesLastMonthPreset(range)) {
        return DateRangePreset.LAST_MONTH
    }

    // Check time-based presets with tolerance
    const now = new Date()
    const timeDiff = Math.abs(range.endDate.getTime() - now.getTime())
    const tolerance = DATE_RANGE_PICKER_CONSTANTS.PRESET_DETECTION_TOLERANCE_MS

    if (timeDiff <= tolerance) {
        const durationMs = range.endDate.getTime() - range.startDate.getTime()

        // Check minute and hour-based presets
        const thirtyMinutes = 30 * 60 * 1000
        const oneHour = 60 * 60 * 1000
        const sixHours = 6 * 60 * 60 * 1000
        const twentyFourHours = 24 * 60 * 60 * 1000

        if (Math.abs(durationMs - thirtyMinutes) <= tolerance) {
            return DateRangePreset.LAST_30_MINUTES
        }

        if (Math.abs(durationMs - oneHour) <= tolerance) {
            return DateRangePreset.LAST_1_HOUR
        }

        if (Math.abs(durationMs - sixHours) <= tolerance) {
            return DateRangePreset.LAST_6_HOURS
        }

        if (Math.abs(durationMs - twentyFourHours) <= tolerance) {
            return DateRangePreset.LAST_24_HOURS
        }
    }

    // Check multi-day presets
    const daysDiff = Math.round(
        (range.endDate.getTime() - range.startDate.getTime()) /
            (24 * 60 * 60 * 1000)
    )

    if (daysDiff === 6 || daysDiff === 7) {
        // Allow for timezone differences
        // Check if start is 7 days ago at midnight
        const sevenDaysAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 6,
            0,
            0,
            0,
            0
        )
        if (
            Math.abs(range.startDate.getTime() - sevenDaysAgo.getTime()) <=
            DATE_RANGE_PICKER_CONSTANTS.TIMEZONE_TOLERANCE_HOURS *
                60 *
                60 *
                1000
        ) {
            return DateRangePreset.LAST_7_DAYS
        }
    }

    if (daysDiff >= 29 && daysDiff <= 30) {
        // Allow for timezone differences
        // Check if start is 30 days ago at midnight
        const thirtyDaysAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 29,
            0,
            0,
            0,
            0
        )
        if (
            Math.abs(range.startDate.getTime() - thirtyDaysAgo.getTime()) <=
            DATE_RANGE_PICKER_CONSTANTS.TIMEZONE_TOLERANCE_HOURS *
                60 *
                60 *
                1000
        ) {
            return DateRangePreset.LAST_30_DAYS
        }
    }

    // For future presets, check if start is today and end is appropriate days later
    const startIsToday = isSameCalendarDay(range.startDate, now)

    if (startIsToday && (daysDiff === 6 || daysDiff === 7)) {
        return DateRangePreset.NEXT_7_DAYS
    }

    if (startIsToday && daysDiff >= 29 && daysDiff <= 30) {
        return DateRangePreset.NEXT_30_DAYS
    }

    // Check month-based presets (approximate)
    const monthsDiff = Math.round(daysDiff / 30)

    if (monthsDiff === 3) {
        return DateRangePreset.LAST_3_MONTHS
    }

    if (monthsDiff === 12) {
        return DateRangePreset.LAST_12_MONTHS
    }

    if (startIsToday && monthsDiff === 3) {
        return DateRangePreset.NEXT_3_MONTHS
    }

    if (startIsToday && monthsDiff === 12) {
        return DateRangePreset.NEXT_12_MONTHS
    }

    return DateRangePreset.CUSTOM
}

// =============================================================================
// CUSTOM PRESET CONFIGURATION UTILITIES
// =============================================================================

/**
 * Default preset configuration for the DateRangePicker
 */
export const DEFAULT_PRESET_CONFIG: DateRangePreset[] = [
    DateRangePreset.LAST_30_MINUTES,
    DateRangePreset.LAST_1_HOUR,
    DateRangePreset.LAST_6_HOURS,
    DateRangePreset.LAST_24_HOURS,
    DateRangePreset.TODAY,
    DateRangePreset.YESTERDAY,
    DateRangePreset.LAST_7_DAYS,
    DateRangePreset.LAST_30_DAYS,
    DateRangePreset.THIS_MONTH,
    DateRangePreset.LAST_MONTH,
]

/**
 * Store for custom preset definitions
 * Maps custom preset IDs to their definitions
 */
const customPresetDefinitions = new Map<string, CustomPresetDefinition>()

/**
 * Get custom preset definition by ID
 */
export const getCustomPresetDefinition = (
    id: string
): CustomPresetDefinition | undefined => {
    return customPresetDefinitions.get(id)
}

/**
 * Processes custom presets configuration and returns normalized preset configs
 * @param customPresets User-provided presets configuration
 * @returns Array of normalized CustomPresetConfig objects
 */
export const processCustomPresets = (
    customPresets?: PresetsConfig
): CustomPresetConfig[] => {
    if (!customPresets || customPresets.length === 0) {
        return DEFAULT_PRESET_CONFIG.map((preset) => ({
            preset,
            visible: true,
        }))
    }

    // If first item is a DateRangePreset, treat as simple array
    if (typeof customPresets[0] === 'string') {
        return (customPresets as DateRangePreset[]).map((preset) => ({
            preset,
            visible: true,
        }))
    }

    // Process array that may contain DateRangePreset, CustomPresetConfig, or CustomPresetDefinition
    return customPresets.map((item) => {
        // If it's a string, it's a DateRangePreset
        if (typeof item === 'string') {
            return {
                preset: item as DateRangePreset,
                visible: true,
            }
        }

        // Check if it's a CustomPresetDefinition (has id and getDateRange)
        if ('id' in item && 'getDateRange' in item) {
            const definition = item as CustomPresetDefinition
            // Store the definition for later use
            customPresetDefinitions.set(definition.id, definition)

            // Convert to CustomPresetConfig using the id as the preset value
            return {
                preset: definition.id as DateRangePreset,
                label: definition.label,
                visible: definition.visible !== false,
            }
        }

        // Otherwise, it's already a CustomPresetConfig
        return item as CustomPresetConfig
    })
}

/**
 * Filters presets based on visibility and other criteria
 * @param presetConfigs Array of preset configurations
 * @param disableFutureDates Whether future date presets should be excluded
 * @param disablePastDates Whether past date presets should be excluded
 * @returns Array of visible and enabled presets
 */
export const getFilteredPresets = (
    presetConfigs: CustomPresetConfig[],
    disableFutureDates: boolean = false,
    disablePastDates: boolean = false
): DateRangePreset[] => {
    const futurePresets = [
        DateRangePreset.TOMORROW,
        DateRangePreset.NEXT_7_DAYS,
        DateRangePreset.NEXT_30_DAYS,
        DateRangePreset.NEXT_3_MONTHS,
        DateRangePreset.NEXT_12_MONTHS,
    ]

    const pastPresets = [
        DateRangePreset.LAST_30_MINUTES,
        DateRangePreset.LAST_1_HOUR,
        DateRangePreset.LAST_6_HOURS,
        DateRangePreset.LAST_24_HOURS,
        DateRangePreset.YESTERDAY,
        DateRangePreset.LAST_7_DAYS,
        DateRangePreset.LAST_30_DAYS,
        DateRangePreset.LAST_MONTH,
        DateRangePreset.LAST_3_MONTHS,
        DateRangePreset.LAST_12_MONTHS,
    ]

    return presetConfigs
        .filter((config) => {
            // Filter out invisible presets
            if (config.visible === false) {
                return false
            }

            // Filter out future presets if disabled
            if (disableFutureDates && futurePresets.includes(config.preset)) {
                return false
            }

            // Filter out past presets if disabled
            if (disablePastDates && pastPresets.includes(config.preset)) {
                return false
            }

            return true
        })
        .map((config) => config.preset)
}

/**
 * Gets the label for a preset, using custom label if provided
 * @param preset The preset to get label for
 * @param presetConfigs Array of preset configurations with potential custom labels
 * @returns The label for the preset
 */
export const getPresetLabelWithCustom = (
    preset: DateRangePreset,
    presetConfigs?: CustomPresetConfig[]
): string => {
    if (presetConfigs) {
        const config = presetConfigs.find((config) => config.preset === preset)
        if (config?.label) {
            return config.label
        }
    }

    return getPresetLabel(preset)
}

/**
 * Creates a preset configuration with custom label and visibility
 * @param preset The preset enum value
 * @param label Optional custom label
 * @param visible Whether the preset should be visible (default: true)
 * @returns CustomPresetConfig object
 */
export const createPresetConfig = (
    preset: DateRangePreset,
    label?: string,
    visible: boolean = true
): CustomPresetConfig => ({
    preset,
    label,
    visible,
})

/**
 * Helper function to create common preset configurations
 */
export const PRESET_HELPERS = {
    /**
     * Creates a configuration for time-based presets only
     */
    timeBasedOnly: (): CustomPresetConfig[] => [
        createPresetConfig(DateRangePreset.LAST_30_MINUTES),
        createPresetConfig(DateRangePreset.LAST_1_HOUR),
        createPresetConfig(DateRangePreset.LAST_6_HOURS),
        createPresetConfig(DateRangePreset.LAST_24_HOURS),
    ],

    /**
     * Creates a configuration for day-based presets only
     */
    dayBasedOnly: (): CustomPresetConfig[] => [
        createPresetConfig(DateRangePreset.TODAY),
        createPresetConfig(DateRangePreset.YESTERDAY),
        createPresetConfig(DateRangePreset.LAST_7_DAYS),
        createPresetConfig(DateRangePreset.LAST_30_DAYS),
    ],

    /**
     * Creates a configuration for month-based presets only
     */
    monthBasedOnly: (): CustomPresetConfig[] => [
        createPresetConfig(DateRangePreset.THIS_MONTH),
        createPresetConfig(DateRangePreset.LAST_MONTH),
        createPresetConfig(DateRangePreset.LAST_3_MONTHS),
        createPresetConfig(DateRangePreset.LAST_12_MONTHS),
    ],

    /**
     * Creates a minimal preset configuration
     */
    minimal: (): CustomPresetConfig[] => [
        createPresetConfig(DateRangePreset.TODAY),
        createPresetConfig(DateRangePreset.LAST_7_DAYS),
        createPresetConfig(DateRangePreset.LAST_30_DAYS),
    ],

    /**
     * Creates a comprehensive preset configuration
     */
    comprehensive: (): CustomPresetConfig[] => [
        createPresetConfig(DateRangePreset.LAST_30_MINUTES),
        createPresetConfig(DateRangePreset.LAST_1_HOUR),
        createPresetConfig(DateRangePreset.LAST_6_HOURS),
        createPresetConfig(DateRangePreset.LAST_24_HOURS),
        createPresetConfig(DateRangePreset.TODAY),
        createPresetConfig(DateRangePreset.YESTERDAY),
        createPresetConfig(DateRangePreset.LAST_7_DAYS),
        createPresetConfig(DateRangePreset.LAST_30_DAYS),
        createPresetConfig(DateRangePreset.THIS_MONTH),
        createPresetConfig(DateRangePreset.LAST_MONTH),
        createPresetConfig(DateRangePreset.LAST_3_MONTHS),
        createPresetConfig(DateRangePreset.LAST_12_MONTHS),
    ],

    /**
     * Creates a configuration with custom labels
     */
    withCustomLabels: (): CustomPresetConfig[] => [
        createPresetConfig(DateRangePreset.LAST_30_MINUTES, 'Last 30 min'),
        createPresetConfig(DateRangePreset.LAST_1_HOUR, 'Last hour'),
        createPresetConfig(DateRangePreset.LAST_6_HOURS, 'Last 6 hours'),
        createPresetConfig(DateRangePreset.LAST_24_HOURS, 'Last 24 hours'),
        createPresetConfig(DateRangePreset.TODAY, 'Today'),
        createPresetConfig(DateRangePreset.YESTERDAY, 'Yesterday'),
        createPresetConfig(DateRangePreset.LAST_7_DAYS, 'Last 7 days'),
        createPresetConfig(DateRangePreset.LAST_30_DAYS, 'Last 30 days'),
        createPresetConfig(DateRangePreset.THIS_MONTH, 'This month'),
        createPresetConfig(DateRangePreset.LAST_MONTH, 'Last month'),
    ],

    /**
     * Creates a configuration with some presets hidden
     */
    selectiveVisibility: (): CustomPresetConfig[] => [
        createPresetConfig(DateRangePreset.LAST_30_MINUTES),
        createPresetConfig(DateRangePreset.LAST_1_HOUR),
        createPresetConfig(DateRangePreset.LAST_6_HOURS),
        createPresetConfig(DateRangePreset.LAST_24_HOURS, undefined, false), // Hidden
        createPresetConfig(DateRangePreset.TODAY),
        createPresetConfig(DateRangePreset.YESTERDAY),
        createPresetConfig(DateRangePreset.LAST_7_DAYS),
        createPresetConfig(DateRangePreset.LAST_30_DAYS),
        createPresetConfig(DateRangePreset.THIS_MONTH),
        createPresetConfig(DateRangePreset.LAST_MONTH),
    ],
}

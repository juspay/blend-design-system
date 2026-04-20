/**
 * Highcharts-style DateTime Formatter Utility for Charts (Functional)
 *
 * This utility provides Highcharts-compatible datetime formatting for charts.
 * It intelligently formats timestamps based on the data range and supports
 * custom format strings similar to Highcharts' dateTimeLabelFormats.
 */

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

// Time unit constants in milliseconds
export const TIME_UNITS = {
    millisecond: 1,
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2592000000, // ~30 days
    year: 31536000000, // 365 days
} as const

export type TimeUnit = keyof typeof TIME_UNITS

// Default Highcharts-style format strings
export const DEFAULT_DATE_TIME_FORMATS: Record<TimeUnit, string> = {
    millisecond: '%H:%M:%S.%L',
    second: '%H:%M:%S',
    minute: '%H:%M',
    hour: '%H:%M',
    day: '%e %b',
    week: '%e %b',
    month: "%b '%y",
    year: '%Y',
}

export interface DateTimeFormatterConfig {
    useUTC?: boolean
    customFormats?: Partial<Record<TimeUnit, string>>
    startOfWeek?: number // 0 = Sunday, 1 = Monday (default)
}

// Static constants for month and weekday names
const MONTH_NAMES = [
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
] as const

const MONTH_NAMES_SHORT = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
] as const

const WEEKDAY_NAMES = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
] as const

const WEEKDAY_NAMES_SHORT = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
] as const

// Token regex for efficient replacement
const TOKEN_REGEX = /%%|%[YyBbmddeHIMSLpaA]/g

// ============================================================================
// CORE UTILITIES
// ============================================================================

/**
 * Parse and validate a timestamp value
 * Handles: numbers, numeric strings, ISO strings, seconds vs milliseconds
 */
export function parseTimestamp(value: string | number): number | null {
    let timestamp: number

    // Handle string values
    if (typeof value === 'string') {
        // Try parsing as ISO date string first
        const isoDate = new Date(value)
        if (!isNaN(isoDate.getTime())) {
            return isoDate.getTime()
        }
        // Fall back to parsing as number
        timestamp = parseInt(value, 10)
        if (isNaN(timestamp)) {
            return null
        }
    } else {
        timestamp = value
    }

    // Auto-detect seconds vs milliseconds
    // Timestamps < 10 billion are likely in seconds (< Sep 9, 2001)
    if (timestamp > 0 && timestamp < 10000000000) {
        timestamp = timestamp * 1000
    }

    // Validate the resulting timestamp
    const date = new Date(timestamp)
    return isNaN(date.getTime()) ? null : timestamp
}

/**
 * Determines the most appropriate time unit based on data range
 */
export function getTimeUnit(dataRange: number): TimeUnit {
    if (dataRange > TIME_UNITS.year * 2) return 'year'
    if (dataRange > TIME_UNITS.month * 2) return 'month'
    if (dataRange > TIME_UNITS.week * 2) return 'week'
    if (dataRange > TIME_UNITS.day * 2) return 'day'
    if (dataRange > TIME_UNITS.hour * 2) return 'hour'
    if (dataRange > TIME_UNITS.minute * 2) return 'minute'
    if (dataRange > TIME_UNITS.second * 2) return 'second'
    return 'millisecond'
}

/**
 * Get time unit from an array of timestamps
 */
export function getTimeUnitFromData(timestamps: number[]): TimeUnit {
    if (timestamps.length < 2) return 'day'
    const min = Math.min(...timestamps)
    const max = Math.max(...timestamps)
    return getTimeUnit(max - min)
}

/**
 * Normalize timestamp to the nearest time unit boundary
 * This ensures consistent tick positioning like Highcharts
 */
export function normalizeTimestamp(
    timestamp: number,
    timeUnit: TimeUnit,
    config: DateTimeFormatterConfig = {}
): number {
    const { useUTC = false, startOfWeek = 1 } = config
    const date = new Date(timestamp)

    if (useUTC) {
        // UTC normalization
        switch (timeUnit) {
            case 'year':
                date.setUTCMonth(0, 1)
                date.setUTCHours(0, 0, 0, 0)
                break
            case 'month':
                date.setUTCDate(1)
                date.setUTCHours(0, 0, 0, 0)
                break
            case 'week': {
                const day = date.getUTCDay()
                const dow = (((day - startOfWeek) % 7) + 7) % 7
                date.setUTCDate(date.getUTCDate() - dow)
                date.setUTCHours(0, 0, 0, 0)
                break
            }
            case 'day':
                date.setUTCHours(0, 0, 0, 0)
                break
            case 'hour':
                date.setUTCMinutes(0, 0, 0)
                break
            case 'minute':
                date.setUTCSeconds(0, 0)
                break
            case 'second':
                date.setUTCMilliseconds(0)
                break
            default:
                break
        }
    } else {
        // Local time normalization
        switch (timeUnit) {
            case 'year':
                date.setMonth(0, 1)
                date.setHours(0, 0, 0, 0)
                break
            case 'month':
                date.setDate(1)
                date.setHours(0, 0, 0, 0)
                break
            case 'week': {
                const day = date.getDay()
                const dow = (((day - startOfWeek) % 7) + 7) % 7
                date.setDate(date.getDate() - dow)
                date.setHours(0, 0, 0, 0)
                break
            }
            case 'day':
                date.setHours(0, 0, 0, 0)
                break
            case 'hour':
                date.setMinutes(0, 0, 0)
                break
            case 'minute':
                date.setSeconds(0, 0)
                break
            case 'second':
                date.setMilliseconds(0)
                break
            default:
                break
        }
    }

    return date.getTime()
}

/**
 * Formats a timestamp according to a format string (Highcharts-style)
 *
 * Format tokens:
 * - %Y: 4-digit year (2024)
 * - %y: 2-digit year (24)
 * - %m: 2-digit month (01-12)
 * - %b: Short month name (Jan)
 * - %B: Full month name (January)
 * - %d: 2-digit day (01-31)
 * - %e: Day without leading zero (1-31)
 * - %H: 2-digit hour 24h (00-23)
 * - %I: 2-digit hour 12h (01-12)
 * - %M: 2-digit minute (00-59)
 * - %S: 2-digit second (00-59)
 * - %L: Milliseconds (000-999)
 * - %p: AM/PM
 * - %A: Full weekday name (Monday)
 * - %a: Short weekday name (Mon)
 * - %%: Literal % character
 */
export function dateFormat(
    formatString: string,
    timestamp: number,
    config: DateTimeFormatterConfig = {}
): string {
    const { useUTC = false } = config
    const date = new Date(timestamp)

    // Get date components based on UTC setting
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear()
    const month = useUTC ? date.getUTCMonth() : date.getMonth()
    const day = useUTC ? date.getUTCDate() : date.getDate()
    const hours = useUTC ? date.getUTCHours() : date.getHours()
    const minutes = useUTC ? date.getUTCMinutes() : date.getMinutes()
    const seconds = useUTC ? date.getUTCSeconds() : date.getSeconds()
    const milliseconds = useUTC
        ? date.getUTCMilliseconds()
        : date.getMilliseconds()
    const weekdayIndex = useUTC ? date.getUTCDay() : date.getDay()

    // Helper function for padding
    const pad = (n: number, width: number = 2): string =>
        n.toString().padStart(width, '0')

    // Token map for efficient and safe replacement
    const tokens: Record<string, string> = {
        '%Y': year.toString(),
        '%y': (year % 100).toString().padStart(2, '0'),
        '%B': MONTH_NAMES[month],
        '%b': MONTH_NAMES_SHORT[month],
        '%m': pad(month + 1),
        '%d': pad(day),
        '%e': day.toString(),
        '%H': pad(hours),
        '%I': pad(hours % 12 || 12),
        '%M': pad(minutes),
        '%S': pad(seconds),
        '%L': pad(milliseconds, 3),
        '%p': hours < 12 ? 'AM' : 'PM',
        '%A': WEEKDAY_NAMES[weekdayIndex],
        '%a': WEEKDAY_NAMES_SHORT[weekdayIndex],
        '%%': '%',
    }

    // Replace all tokens in a single pass using regex
    return formatString.replace(TOKEN_REGEX, (match) => tokens[match] ?? match)
}

/**
 * Get the appropriate date format for a given time unit
 */
export function getDateFormat(
    timeUnit: TimeUnit,
    config: DateTimeFormatterConfig = {}
): string {
    const { customFormats } = config
    const formats = { ...DEFAULT_DATE_TIME_FORMATS, ...customFormats }
    return formats[timeUnit] || formats.day
}

// ============================================================================
// TICK GENERATION
// ============================================================================

/**
 * Get optimal tick interval to prevent cluttered axes
 * Returns recommended number of milliseconds between ticks
 */
export function getOptimalTickInterval(
    dataRange: number,
    maxTicks: number = 10
): { interval: number; unit: TimeUnit } {
    const timeUnit = getTimeUnit(dataRange)

    // Define nice intervals for each time unit
    const niceIntervals: Record<TimeUnit, number[]> = {
        year: [1, 2, 5, 10, 20, 50, 100],
        month: [1, 2, 3, 6, 12],
        week: [1, 2, 4],
        day: [1, 2, 5, 7, 14, 30],
        hour: [1, 2, 3, 6, 12],
        minute: [1, 2, 5, 10, 15, 30],
        second: [1, 2, 5, 10, 15, 30],
        millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    }

    const baseUnit = TIME_UNITS[timeUnit]
    const intervals = niceIntervals[timeUnit]

    // Find the smallest interval that gives us <= maxTicks
    for (const mult of intervals) {
        const interval = baseUnit * mult
        const numTicks = Math.ceil(dataRange / interval)
        if (numTicks <= maxTicks) {
            return { interval, unit: timeUnit }
        }
    }

    // If no suitable interval found, use the largest
    const lastInterval = intervals[intervals.length - 1]
    return { interval: baseUnit * lastInterval, unit: timeUnit }
}

/**
 * Generate evenly spaced tick values for a time range
 * This prevents cluttered axes by ensuring consistent spacing
 */
export function generateTickValues(
    minTimestamp: number,
    maxTimestamp: number,
    maxTicks: number = 10,
    config: DateTimeFormatterConfig = {}
): number[] {
    const dataRange = maxTimestamp - minTimestamp
    const { interval, unit } = getOptimalTickInterval(dataRange, maxTicks)

    const ticks: number[] = []

    // Start from normalized minimum
    let current = normalizeTimestamp(minTimestamp, unit, config)

    // Ensure we start before or at minTimestamp
    while (current > minTimestamp) {
        current -= interval
    }

    // Generate ticks up to maxTimestamp
    while (current <= maxTimestamp) {
        if (current >= minTimestamp) {
            ticks.push(current)
        }
        current += interval
    }

    return ticks
}

/**
 * Generate ticks at a custom interval (in milliseconds)
 * Useful for forcing specific tick spacing (e.g., every 6 hours)
 */
export function generateTicksAtInterval(
    minTimestamp: number,
    maxTimestamp: number,
    intervalMs: number,
    timeUnit: TimeUnit = 'hour',
    config: DateTimeFormatterConfig = {}
): number[] {
    const ticks: number[] = []
    let current = normalizeTimestamp(minTimestamp, timeUnit, config)

    // Ensure we start at or before min
    while (current > minTimestamp) {
        current -= intervalMs
    }

    // Generate ticks up to maxTimestamp
    while (current <= maxTimestamp) {
        if (current >= minTimestamp) {
            ticks.push(current)
        }
        current += intervalMs
    }

    return ticks
}

// ============================================================================
// FORMATTERS
// ============================================================================

/**
 * Create a basic formatter function for a specific time unit
 */
export function createFormatter(
    timeUnit: TimeUnit,
    config: DateTimeFormatterConfig = {}
): (value: number) => string {
    const format = getDateFormat(timeUnit, config)
    return (value: number) => dateFormat(format, value, config)
}

/**
 * Create a formatter function for chart axes with auto time unit detection
 */
export function createAxisFormatter(
    timestamps: number[],
    config: DateTimeFormatterConfig = {}
): (value: number) => string {
    const timeUnit = getTimeUnitFromData(timestamps)
    return createFormatter(timeUnit, config)
}

/**
 * Create a smart formatter that shows date on day change, time otherwise
 * Similar to Highcharts' smart datetime formatting
 */
export function createSmartFormatter(
    timestamps: number[],
    showYear: boolean = false,
    config: DateTimeFormatterConfig = {}
): (value: number) => string {
    const { useUTC = false } = config
    const timeUnit = getTimeUnitFromData(timestamps)

    let previousDate: string | null = null
    let isFirstCall = true

    return (value: number) => {
        const date = new Date(value)
        const dateStr = useUTC
            ? `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
            : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        if (isFirstCall || previousDate !== dateStr) {
            isFirstCall = false
            previousDate = dateStr
            // Show full date
            const format = showYear ? '%e %b %Y' : '%e %b'
            return dateFormat(format, value, config)
        }

        // Show time only
        if (
            timeUnit === 'hour' ||
            timeUnit === 'minute' ||
            timeUnit === 'second'
        ) {
            return dateFormat('%H:%M', value, config)
        }

        // For longer intervals, still show the date
        const format = showYear ? '%e %b %Y' : '%e %b'
        return dateFormat(format, value, config)
    }
}

/**
 * Create an alternating date/time formatter
 * Shows date on even ticks, time on odd ticks (e.g., "1 Oct", "12:00", "2 Oct", "12:00")
 */
export function createAlternatingFormatter(
    ticks: number[],
    dateFormatStr: string = '%e %b',
    timeFormatStr: string = '%H:%M',
    config: DateTimeFormatterConfig = {}
): (value: number) => string {
    return (value: number) => {
        const tickIndex = ticks.indexOf(value)
        const isDateTick = tickIndex % 2 === 0
        return isDateTick
            ? dateFormat(dateFormatStr, value, config)
            : dateFormat(timeFormatStr, value, config)
    }
}

/**
 * Format multiple timestamps
 */
export function formatMultiple(
    timestamps: number[],
    timeUnit?: TimeUnit,
    config: DateTimeFormatterConfig = {}
): string[] {
    const unit = timeUnit || getTimeUnitFromData(timestamps)
    const formatString = getDateFormat(unit, config)
    return timestamps.map((ts) => dateFormat(formatString, ts, config))
}

// ============================================================================
// HIGH-LEVEL TICK & FORMATTER GENERATORS
// ============================================================================

/**
 * Generate date-only ticks (for Charts dateOnly mode)
 * Returns ticks at day boundaries with date-only labels
 */
export function createDateOnlyTicksAndFormatter(
    minTimestamp: number,
    maxTimestamp: number,
    maxTicks: number = 10,
    showYear: boolean = false,
    config: DateTimeFormatterConfig = {}
): {
    ticks: number[]
    formatter: (value: number) => string
} {
    const ticks = generateTickValues(
        minTimestamp,
        maxTimestamp,
        maxTicks,
        config
    )
    const format = showYear ? '%e. %b %Y' : '%e. %b'
    const formatter = (value: number) => dateFormat(format, value, config)

    return { ticks, formatter }
}

/**
 * Generate time-only ticks spanning the entire data range
 * Shows times at regular intervals (e.g., every 15 minutes, 1 hour, etc.)
 */
export function createTimeOnlyTicksAndFormatter(
    minTimestamp: number,
    maxTimestamp: number,
    intervalMinutes?: number,
    maxTicks: number = 96,
    config: DateTimeFormatterConfig = {}
): {
    ticks: number[]
    formatter: (value: number) => string
} {
    const dataRange = maxTimestamp - minTimestamp

    // Auto-detect interval if not provided
    let interval: number
    if (intervalMinutes) {
        interval = intervalMinutes * 60 * 1000
    } else {
        // Smart interval selection based on range
        const hours = dataRange / (60 * 60 * 1000)
        if (hours <= 6) {
            interval = 15 * 60 * 1000 // 15 minutes
        } else if (hours <= 24) {
            interval = 30 * 60 * 1000 // 30 minutes
        } else if (hours <= 72) {
            interval = 60 * 60 * 1000 // 1 hour
        } else if (hours <= 168) {
            interval = 3 * 60 * 60 * 1000 // 3 hours
        } else {
            interval = 6 * 60 * 60 * 1000 // 6 hours
        }
    }

    const ticks = generateTicksAtInterval(
        minTimestamp,
        maxTimestamp,
        interval,
        'minute',
        config
    )

    // Limit ticks if too many
    const finalTicks =
        ticks.length > maxTicks
            ? ticks.filter(
                  (_, i) => i % Math.ceil(ticks.length / maxTicks) === 0
              )
            : ticks

    const formatter = (value: number) => dateFormat('%H:%M', value, config)

    return { ticks: finalTicks, formatter }
}

/**
 * Generate ticks with alternating date and time labels
 * Pattern: Date, Time, Date, Time, etc.
 */
export function createDateTimeAlternatingTicksAndFormatter(
    minTimestamp: number,
    maxTimestamp: number,
    intervalMs?: number,
    showYear: boolean = false,
    maxTicks: number = 20,
    config: DateTimeFormatterConfig = {}
): {
    ticks: number[]
    formatter: (value: number) => string
} {
    const dataRange = maxTimestamp - minTimestamp

    // Auto-detect interval if not provided
    let interval: number
    if (intervalMs) {
        interval = intervalMs
    } else {
        const { interval: optimalInterval } = getOptimalTickInterval(
            dataRange,
            maxTicks
        )
        interval = optimalInterval
    }

    const ticks = generateTicksAtInterval(
        minTimestamp,
        maxTimestamp,
        interval,
        'hour',
        config
    )

    const dateFormatStr = showYear ? '%e. %b %Y' : '%e. %b'
    const formatter = createAlternatingFormatter(
        ticks,
        dateFormatStr,
        '%H:%M',
        config
    )

    return { ticks, formatter }
}

/**
 * All-in-one helper: Generate ticks and create alternating formatter
 */
export function createAlternatingTicksAndFormatter(
    minTimestamp: number,
    maxTimestamp: number,
    intervalMs: number,
    options: {
        timeUnit?: TimeUnit
        dateFormat?: string
        timeFormat?: string
    } = {},
    config: DateTimeFormatterConfig = {}
): {
    ticks: number[]
    formatter: (value: number) => string
} {
    const ticks = generateTicksAtInterval(
        minTimestamp,
        maxTimestamp,
        intervalMs,
        options.timeUnit || 'hour',
        config
    )

    const formatter = createAlternatingFormatter(
        ticks,
        options.dateFormat || '%e %b',
        options.timeFormat || '%H:%M',
        config
    )

    return { ticks, formatter }
}

/**
 * Create a dynamic tick generator that adapts to available width
 * This prevents tick collision by adjusting density based on chart width
 */
export function createResponsiveTicksAndFormatter(
    minTimestamp: number,
    maxTimestamp: number,
    chartWidthPx: number,
    avgLabelWidthPx: number = 50,
    mode: 'dateOnly' | 'timeOnly' | 'alternating' | 'smart' = 'smart',
    showYear: boolean = false,
    config: DateTimeFormatterConfig = {}
): {
    ticks: number[]
    formatter: (value: number) => string
} {
    // Calculate max ticks based on available width
    const maxTicks = Math.max(
        2,
        Math.floor(chartWidthPx / (avgLabelWidthPx * 1.2))
    )

    switch (mode) {
        case 'dateOnly':
            return createDateOnlyTicksAndFormatter(
                minTimestamp,
                maxTimestamp,
                maxTicks,
                showYear,
                config
            )

        case 'timeOnly':
            return createTimeOnlyTicksAndFormatter(
                minTimestamp,
                maxTimestamp,
                undefined,
                maxTicks,
                config
            )

        case 'alternating':
            return createDateTimeAlternatingTicksAndFormatter(
                minTimestamp,
                maxTimestamp,
                undefined,
                showYear,
                maxTicks,
                config
            )

        case 'smart':
        default: {
            const ticks = generateTickValues(
                minTimestamp,
                maxTimestamp,
                maxTicks,
                config
            )
            const timestamps =
                ticks.length > 0 ? ticks : [minTimestamp, maxTimestamp]
            const formatter = createSmartFormatter(timestamps, showYear, config)
            return { ticks, formatter }
        }
    }
}

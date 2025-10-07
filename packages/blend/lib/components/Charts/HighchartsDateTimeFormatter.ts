/**
 * Highcharts-style DateTime Formatter Utility for Charts
 *
 * This utility provides Highcharts-compatible datetime formatting for charts.
 * It intelligently formats timestamps based on the data range and supports
 * custom format strings similar to Highcharts' dateTimeLabelFormats.
 */

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

interface HighchartsDateTimeFormatterOptions {
    useUTC?: boolean
    customFormats?: Partial<Record<TimeUnit, string>>
    // 0 = Sunday ... 6 = Saturday; default to Monday like Highcharts
    startOfWeek?: number
}

export class HighchartsDateTimeFormatter {
    private useUTC: boolean
    private formats: Record<TimeUnit, string>
    private startOfWeek: number

    // Static constants to avoid repeated allocations
    private static readonly MONTH_NAMES = [
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

    private static readonly MONTH_NAMES_SHORT = [
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

    // Token regex for efficient replacement (supports %% escape and weekday tokens)
    private static readonly TOKEN_REGEX = /%%|%[YyBbmddeHIMSLpaA]/g

    // Weekday names for tokens
    private static readonly WEEKDAY_NAMES = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ] as const

    private static readonly WEEKDAY_NAMES_SHORT = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ] as const

    // Instance cache for better performance
    private static formatterCache = new Map<
        string,
        HighchartsDateTimeFormatter
    >()

    constructor(options: HighchartsDateTimeFormatterOptions = {}) {
        this.useUTC = options.useUTC ?? false
        this.formats = {
            ...DEFAULT_DATE_TIME_FORMATS,
            ...options.customFormats,
        }
        this.startOfWeek =
            typeof options.startOfWeek === 'number' ? options.startOfWeek : 1
    }

    /**
     * Get or create a cached formatter instance
     */
    static getInstance(
        options: HighchartsDateTimeFormatterOptions = {}
    ): HighchartsDateTimeFormatter {
        const key = JSON.stringify(options)
        if (!this.formatterCache.has(key)) {
            this.formatterCache.set(
                key,
                new HighchartsDateTimeFormatter(options)
            )
        }
        return this.formatterCache.get(key)!
    }

    /**
     * Parse and validate a timestamp value (static utility method)
     * Handles: numbers, numeric strings, ISO strings, seconds vs milliseconds
     *
     * This is exposed as a public static method for use in other utilities
     */
    static parseTimestamp(value: string | number): number | null {
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
        // This handles dates from 1970-2286 correctly
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
    getTimeUnit(dataRange: number): TimeUnit {
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
     * Normalize timestamp to the nearest time unit boundary
     * This ensures consistent tick positioning like Highcharts
     *
     * Examples:
     * - For 'day': rounds to midnight
     * - For 'hour': rounds to start of hour
     * - For 'month': rounds to first day of month
     */
    normalizeTimestamp(timestamp: number, timeUnit: TimeUnit): number {
        const date = new Date(timestamp)

        if (this.useUTC) {
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
                    const dow = (((day - this.startOfWeek) % 7) + 7) % 7
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
                    const dow = (((day - this.startOfWeek) % 7) + 7) % 7
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
     * Get optimal tick interval to prevent cluttered axes
     * Returns recommended number of milliseconds between ticks
     */
    getOptimalTickInterval(
        dataRange: number,
        maxTicks: number = 10
    ): { interval: number; unit: TimeUnit } {
        const timeUnit = this.getTimeUnit(dataRange)

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
    generateTickValues(
        minTimestamp: number,
        maxTimestamp: number,
        maxTicks: number = 10
    ): number[] {
        const dataRange = maxTimestamp - minTimestamp
        const { interval, unit } = this.getOptimalTickInterval(
            dataRange,
            maxTicks
        )

        const ticks: number[] = []

        // Start from normalized minimum
        let current = this.normalizeTimestamp(minTimestamp, unit)

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
     * Determines time unit from an array of timestamps
     */
    getTimeUnitFromData(timestamps: number[]): TimeUnit {
        if (timestamps.length < 2) return 'day'
        const min = Math.min(...timestamps)
        const max = Math.max(...timestamps)
        return this.getTimeUnit(max - min)
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
     */
    dateFormat(formatString: string, timestamp: number): string {
        // Create date object once (UTC/local handling is done via get methods)
        const date = new Date(timestamp)

        // Get date components based on UTC setting
        const year = this.useUTC ? date.getUTCFullYear() : date.getFullYear()
        const month = this.useUTC ? date.getUTCMonth() : date.getMonth()
        const day = this.useUTC ? date.getUTCDate() : date.getDate()
        const hours = this.useUTC ? date.getUTCHours() : date.getHours()
        const minutes = this.useUTC ? date.getUTCMinutes() : date.getMinutes()
        const seconds = this.useUTC ? date.getUTCSeconds() : date.getSeconds()
        const milliseconds = this.useUTC
            ? date.getUTCMilliseconds()
            : date.getMilliseconds()

        // Helper function for padding
        const pad = (n: number, width: number = 2): string =>
            n.toString().padStart(width, '0')

        // Token map for efficient and safe replacement
        const weekdayIndex = this.useUTC ? date.getUTCDay() : date.getDay()
        const tokens: Record<string, string> = {
            '%Y': year.toString(),
            '%y': (year % 100).toString().padStart(2, '0'),
            '%B': HighchartsDateTimeFormatter.MONTH_NAMES[month],
            '%b': HighchartsDateTimeFormatter.MONTH_NAMES_SHORT[month],
            '%m': pad(month + 1),
            '%d': pad(day),
            '%e': day.toString(),
            '%H': pad(hours),
            '%I': pad(hours % 12 || 12),
            '%M': pad(minutes),
            '%S': pad(seconds),
            '%L': pad(milliseconds, 3),
            '%p': hours < 12 ? 'AM' : 'PM',
            '%A': HighchartsDateTimeFormatter.WEEKDAY_NAMES[weekdayIndex],
            '%a': HighchartsDateTimeFormatter.WEEKDAY_NAMES_SHORT[weekdayIndex],
            '%%': '%',
        }

        // Replace all tokens in a single pass using regex
        return formatString.replace(
            HighchartsDateTimeFormatter.TOKEN_REGEX,
            (match) => tokens[match] ?? match
        )
    }

    /**
     * Gets the appropriate date format for a given time unit
     */
    getDateFormat(
        timeUnit: TimeUnit,
        customFormats?: Partial<Record<TimeUnit, string>>
    ): string {
        const formats = { ...this.formats, ...customFormats }
        return formats[timeUnit] || formats.day
    }

    /**
     * Format a timestamp with automatic unit detection
     */
    format(timestamp: number, timeUnit?: TimeUnit): string {
        const unit = timeUnit || 'day'
        const formatString = this.formats[unit]
        return this.dateFormat(formatString, timestamp)
    }

    /**
     * Create a formatter function for chart axes
     * This is useful for Recharts or other chart libraries
     */
    createAxisFormatter(timestamps: number[]): (value: number) => string {
        const timeUnit = this.getTimeUnitFromData(timestamps)
        const formatString = this.formats[timeUnit]
        return (value: number) => this.dateFormat(formatString, value)
    }

    /**
     * Create a smart formatter that shows date on first occurrence and time afterwards
     * Similar to Highcharts' smart datetime formatting
     */
    createSmartFormatter(
        timestamps: number[],
        showYear: boolean = false
    ): (value: number) => string {
        let previousDate: string | null = null
        let isFirstCall = true
        const timeUnit = this.getTimeUnitFromData(timestamps)

        return (value: number) => {
            const date = new Date(value)
            const dateStr = this.useUTC
                ? `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
                : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

            if (isFirstCall || previousDate !== dateStr) {
                isFirstCall = false
                previousDate = dateStr
                // Show full date
                const format = showYear ? '%e %b %Y' : '%e %b'
                return this.dateFormat(format, value)
            }

            // Show time only
            if (
                timeUnit === 'hour' ||
                timeUnit === 'minute' ||
                timeUnit === 'second'
            ) {
                return this.dateFormat('%H:%M', value)
            }

            // For longer intervals, still show the date
            const format = showYear ? '%e %b %Y' : '%e %b'
            return this.dateFormat(format, value)
        }
    }

    /**
     * Format multiple timestamps
     */
    formatMultiple(timestamps: number[], timeUnit?: TimeUnit): string[] {
        const unit = timeUnit || this.getTimeUnitFromData(timestamps)
        const formatString = this.formats[unit]
        return timestamps.map((ts) => this.dateFormat(formatString, ts))
    }

    /**
     * Generate ticks at a custom interval (in milliseconds)
     * Useful for forcing specific tick spacing (e.g., every 6 hours)
     *
     * @param minTimestamp - Start of the range
     * @param maxTimestamp - End of the range
     * @param intervalMs - Interval in milliseconds (e.g., 6 * 60 * 60 * 1000 for 6 hours)
     * @param timeUnit - Time unit for normalization (defaults to 'hour')
     * @returns Array of tick timestamps
     */
    generateTicksAtInterval(
        minTimestamp: number,
        maxTimestamp: number,
        intervalMs: number,
        timeUnit: TimeUnit = 'hour'
    ): number[] {
        const ticks: number[] = []
        let current = this.normalizeTimestamp(minTimestamp, timeUnit)

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

    /**
     * Create an alternating date/time formatter
     * Shows date on even ticks, time on odd ticks (e.g., "1 Oct", "12:00", "2 Oct", "12:00")
     *
     * @param ticks - Array of tick timestamps (determines position for alternation)
     * @param dateFormat - Format string for date ticks (default: '%e %b')
     * @param timeFormat - Format string for time ticks (default: '%H:%M')
     * @returns Formatter function
     */
    createAlternatingFormatter(
        ticks: number[],
        dateFormat: string = '%e %b',
        timeFormat: string = '%H:%M'
    ): (value: number) => string {
        return (value: number) => {
            const tickIndex = ticks.indexOf(value)
            const isDateTick = tickIndex % 2 === 0
            return isDateTick
                ? this.dateFormat(dateFormat, value)
                : this.dateFormat(timeFormat, value)
        }
    }

    /**
     * All-in-one helper: Generate ticks and create alternating formatter
     *
     * @param minTimestamp - Start of the range
     * @param maxTimestamp - End of the range
     * @param intervalMs - Interval in milliseconds (e.g., 6 * 60 * 60 * 1000 for 6 hours)
     * @param options - Optional formatting options
     * @returns Object with ticks array and formatter function
     */
    createAlternatingTicksAndFormatter(
        minTimestamp: number,
        maxTimestamp: number,
        intervalMs: number,
        options: {
            timeUnit?: TimeUnit
            dateFormat?: string
            timeFormat?: string
        } = {}
    ): {
        ticks: number[]
        formatter: (value: number) => string
    } {
        const ticks = this.generateTicksAtInterval(
            minTimestamp,
            maxTimestamp,
            intervalMs,
            options.timeUnit || 'hour'
        )

        const formatter = this.createAlternatingFormatter(
            ticks,
            options.dateFormat || '%e %b',
            options.timeFormat || '%H:%M'
        )

        return { ticks, formatter }
    }

    /**
     * Generate date-only ticks (for Charts dateOnly mode)
     * Returns ticks at day boundaries with date-only labels
     *
     * @param minTimestamp - Start of range
     * @param maxTimestamp - End of range
     * @param maxTicks - Maximum number of ticks (default: 10)
     * @param showYear - Include year in labels
     * @returns Object with ticks and formatter
     */
    createDateOnlyTicksAndFormatter(
        minTimestamp: number,
        maxTimestamp: number,
        maxTicks: number = 10,
        showYear: boolean = false
    ): {
        ticks: number[]
        formatter: (value: number) => string
    } {
        const ticks = this.generateTickValues(
            minTimestamp,
            maxTimestamp,
            maxTicks
        )
        const format = showYear ? '%e. %b %Y' : '%e. %b'

        const formatter = (value: number) => this.dateFormat(format, value)

        return { ticks, formatter }
    }

    /**
     * Generate time-only ticks spanning the entire data range
     * Shows times at regular intervals (e.g., every 15 minutes, 1 hour, etc.)
     *
     * @param minTimestamp - Start of range
     * @param maxTimestamp - End of range
     * @param intervalMinutes - Interval in minutes (default: auto-detect based on range)
     * @param maxTicks - Maximum number of ticks (default: 96 for 15-min intervals over 24h)
     * @returns Object with ticks and formatter
     */
    createTimeOnlyTicksAndFormatter(
        minTimestamp: number,
        maxTimestamp: number,
        intervalMinutes?: number,
        maxTicks: number = 96
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

        const ticks = this.generateTicksAtInterval(
            minTimestamp,
            maxTimestamp,
            interval,
            'minute'
        )

        // Limit ticks if too many
        const finalTicks =
            ticks.length > maxTicks
                ? ticks.filter(
                      (_, i) => i % Math.ceil(ticks.length / maxTicks) === 0
                  )
                : ticks

        const formatter = (value: number) => this.dateFormat('%H:%M', value)

        return { ticks: finalTicks, formatter }
    }

    /**
     * Generate ticks with alternating date and time labels
     * Pattern: Date, Time, Date, Time, etc.
     *
     * @param minTimestamp - Start of range
     * @param maxTimestamp - End of range
     * @param intervalMs - Interval in milliseconds (auto-detect if not provided)
     * @param showYear - Include year in date labels
     * @param maxTicks - Maximum number of ticks (default: 20)
     * @returns Object with ticks and formatter
     */
    createDateTimeAlternatingTicksAndFormatter(
        minTimestamp: number,
        maxTimestamp: number,
        intervalMs?: number,
        showYear: boolean = false,
        maxTicks: number = 20
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
            const { interval: optimalInterval } = this.getOptimalTickInterval(
                dataRange,
                maxTicks
            )
            interval = optimalInterval
        }

        const ticks = this.generateTicksAtInterval(
            minTimestamp,
            maxTimestamp,
            interval,
            'hour'
        )

        const dateFormat = showYear ? '%e. %b %Y' : '%e. %b'
        const formatter = this.createAlternatingFormatter(
            ticks,
            dateFormat,
            '%H:%M'
        )

        return { ticks, formatter }
    }

    /**
     * Create a dynamic tick generator that adapts to available width
     * This prevents tick collision by adjusting density based on chart width
     *
     * @param minTimestamp - Start of range
     * @param maxTimestamp - End of range
     * @param chartWidthPx - Available chart width in pixels
     * @param avgLabelWidthPx - Average label width in pixels (default: 50)
     * @param mode - 'dateOnly' | 'timeOnly' | 'alternating' | 'smart'
     * @param showYear - Include year in labels
     * @returns Object with ticks and formatter
     */
    createResponsiveTicksAndFormatter(
        minTimestamp: number,
        maxTimestamp: number,
        chartWidthPx: number,
        avgLabelWidthPx: number = 50,
        mode: 'dateOnly' | 'timeOnly' | 'alternating' | 'smart' = 'smart',
        showYear: boolean = false
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
                return this.createDateOnlyTicksAndFormatter(
                    minTimestamp,
                    maxTimestamp,
                    maxTicks,
                    showYear
                )

            case 'timeOnly':
                return this.createTimeOnlyTicksAndFormatter(
                    minTimestamp,
                    maxTimestamp,
                    undefined,
                    maxTicks
                )

            case 'alternating':
                return this.createDateTimeAlternatingTicksAndFormatter(
                    minTimestamp,
                    maxTimestamp,
                    undefined,
                    showYear,
                    maxTicks
                )

            case 'smart':
            default: {
                const ticks = this.generateTickValues(
                    minTimestamp,
                    maxTimestamp,
                    maxTicks
                )
                const timestamps =
                    ticks.length > 0 ? ticks : [minTimestamp, maxTimestamp]
                const formatter = this.createSmartFormatter(
                    timestamps,
                    showYear
                )
                return { ticks, formatter }
            }
        }
    }
}

export default HighchartsDateTimeFormatter

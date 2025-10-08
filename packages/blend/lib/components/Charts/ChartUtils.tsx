import {
    NewNestedDataPoint,
    FlattenedDataPoint,
    AxisType,
    AxisConfig,
} from './types'
import { parseTimestamp, dateFormat } from './DateTimeFormatter'

export function transformNestedData(
    data: NewNestedDataPoint[],
    selectedKeys: string[] = []
): FlattenedDataPoint[] {
    return data.map((item) => {
        const flattened: FlattenedDataPoint = { name: item.name }

        const keysToInclude =
            selectedKeys.length > 0
                ? Object.keys(item.data).filter((key) =>
                      selectedKeys.includes(key)
                  )
                : Object.keys(item.data)

        for (const key of keysToInclude) {
            flattened[key] = item.data[key].primary.val
        }

        return flattened
    })
}

export function transformScatterData(
    data: NewNestedDataPoint[],
    selectedKeys: string[] = []
): Array<{ name: string; x: number; y: number; seriesKey: string }> {
    const scatterPoints: Array<{
        name: string
        x: number
        y: number
        seriesKey: string
    }> = []

    data.forEach((item) => {
        const keysToInclude =
            selectedKeys.length > 0
                ? Object.keys(item.data).filter((key) =>
                      selectedKeys.includes(key)
                  )
                : Object.keys(item.data)

        keysToInclude.forEach((key) => {
            const dataPoint = item.data[key]

            // Look for x and y coordinates in aux data
            const auxData = dataPoint.aux || []
            const xData = auxData.find((aux) => aux.label.toLowerCase() === 'x')
            const yData = auxData.find((aux) => aux.label.toLowerCase() === 'y')

            if (xData && yData) {
                scatterPoints.push({
                    name: item.name,
                    x:
                        typeof xData.val === 'number'
                            ? xData.val
                            : parseFloat(String(xData.val)),
                    y:
                        typeof yData.val === 'number'
                            ? yData.val
                            : parseFloat(String(yData.val)),
                    seriesKey: key,
                })
            } else {
                // Fallback: use name as x and primary.val as y
                const x = parseFloat(item.name) || 0
                const y = dataPoint.primary.val
                scatterPoints.push({
                    name: item.name,
                    x,
                    y,
                    seriesKey: key,
                })
            }
        })
    })

    return scatterPoints
}

export function lightenHexColor(hex: string, amount: number = 0.3): string {
    hex = hex.replace(/^#/, '')

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    const [h, s, l] = rgbToHsl(r, g, b)

    const newL = Math.min(1, l + amount)

    const [newR, newG, newB] = hslToRgb(h, s, newL)

    return (
        '#' +
        [newR, newG, newB]
            .map((x) => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            })
            .join('')
    )
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r: number, g: number, b: number

    if (s === 0) {
        r = g = b = l // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export const formatNumber = (value: number | string): string => {
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value)
        if (isNaN(parsedValue)) return value
        value = parsedValue
    }

    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M'
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K'
    }
    return value.toString()
}

export const capitaliseCamelCase = (text: string): string => {
    if (!text) return ''
    const words = text.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)
    return words
        .map((word) => {
            if (word.toUpperCase() === word && word.length > 1) {
                return word
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(' ')
}

export type DateTimeFormatterOptions = {
    useUTC?: boolean
    formatString?: string
    dateOnly?: boolean
    timeOnly?: boolean
    showYear?: boolean
    smartDateTimeFormat?: boolean // Alternates between date and time like Highcharts
}

/**
 * Creates a DateTime formatter with custom options
 * @param options - Configuration options for the formatter
 * @param options.useUTC - Whether to use UTC timezone (default: true)
 * @param options.formatString - Optional custom format string
 * @param options.dateOnly - Show only dates (e.g., "1. Oct", "2. Oct")
 * @param options.timeOnly - Show only times (e.g., "12:00", "13:00")
 * @param options.showYear - Include year in the output (works with dateOnly and default mode)
 * @param options.smartDateTimeFormat - Alternates between date and time like Highcharts
 * @returns A formatter function that handles timestamps from any timezone
 *
 * @example
 * // Date only without year: "1. Oct" "2. Oct" "3. Oct"
 * createDateTimeFormatter({ dateOnly: true, showYear: false })
 *
 * @example
 * // Date only with year: "1. Oct 2024" "2. Oct 2024"
 * createDateTimeFormatter({ dateOnly: true, showYear: true })
 *
 * @example
 * // Time only: "00:00" "06:00" "12:00"
 * createDateTimeFormatter({ timeOnly: true })
 *
 * @example
 * // Smart format (alternates): "1. Oct" "12:00" "2. Oct" "12:00"
 * createDateTimeFormatter({ smartDateTimeFormat: true })
 *
 * @example
 * // Default with year: "1 Oct 2024, 12:00"
 * createDateTimeFormatter({ showYear: true })
 */
export const createDateTimeFormatter = (
    options: DateTimeFormatterOptions = {}
): ((value: string | number) => string) => {
    const {
        useUTC = true,
        formatString,
        dateOnly = false,
        timeOnly = false,
        showYear = false,
        smartDateTimeFormat = false,
    } = options

    const dateTimeConfig = { useUTC }

    // Smart format: show date at start of day, time otherwise
    if (smartDateTimeFormat) {
        let previousDay: number | null = null

        return (value: string | number) => {
            const timestamp = parseTimestamp(value)
            if (timestamp === null) return value.toString()

            // Get the day of this timestamp
            const currentDay = parseInt(
                dateFormat('%e', timestamp, dateTimeConfig)
            )

            // If it's a new day, show the date
            if (previousDay === null || currentDay !== previousDay) {
                previousDay = currentDay
                const formatStr = showYear ? '%e. %b %Y' : '%e. %b'
                return dateFormat(formatStr, timestamp, dateTimeConfig)
            }

            // Otherwise, show the time
            return dateFormat('%H:%M', timestamp, dateTimeConfig)
        }
    }

    // Determine the format based on options
    let finalFormat: string

    if (formatString) {
        // User provided custom format string, use it directly
        finalFormat = formatString
    } else if (dateOnly) {
        // Date only mode: "1. Oct" or "1. Oct 2024"
        finalFormat = showYear ? '%e. %b %Y' : '%e. %b'
    } else if (timeOnly) {
        // Time only mode: "12:00"
        finalFormat = '%H:%M'
    } else {
        // Default mode: "1 Oct 2024, 12:00" or "1 Oct, 12:00"
        finalFormat = showYear ? '%e %b %Y, %H:%M' : '%e %b, %H:%M'
    }

    return (value: string | number) => {
        const timestamp = parseTimestamp(value)
        if (timestamp === null) return value.toString()

        return dateFormat(finalFormat, timestamp, { useUTC })
    }
}

/**
 * Get a formatter function based on axis type with optional DateTime customization
 * @param axisType - The type of axis (DATE_TIME, CURRENCY, PERCENTAGE, NUMBER)
 * @param dateTimeOptions - Options for DateTime formatting (only used when axisType is DATE_TIME)
 * @returns A formatter function for the specified axis type
 *
 * @example
 * // Simple usage with default UTC
 * getAxisFormatter(AxisType.DATE_TIME)
 *
 * @example
 * // Date only without year
 * getAxisFormatter(AxisType.DATE_TIME, { dateOnly: true })
 *
 * @example
 * // Date only with year
 * getAxisFormatter(AxisType.DATE_TIME, { dateOnly: true, showYear: true })
 *
 * @example
 * // Time only
 * getAxisFormatter(AxisType.DATE_TIME, { timeOnly: true })
 *
 * @example
 * // Local timezone instead of UTC
 * getAxisFormatter(AxisType.DATE_TIME, { useUTC: false })
 */
export const getAxisFormatter = (
    finalAxis: AxisConfig
): ((value: string | number) => string) => {
    const dateTimeOptions = {
        useUTC: finalAxis.useUTC,
        formatString: finalAxis.formatString,
        dateOnly: finalAxis.dateOnly,
        timeOnly: finalAxis.timeOnly,
        showYear: finalAxis.showYear,
        smartDateTimeFormat: finalAxis.smartDateTimeFormat,
    }
    switch (finalAxis.type) {
        case AxisType.DATE_TIME: {
            // Create a formatter instance with UTC enabled by default
            return createDateTimeFormatter(dateTimeOptions)
        }

        case AxisType.CURRENCY:
            return (value: string | number) => {
                const numValue =
                    typeof value === 'string' ? parseFloat(value) : value
                if (isNaN(numValue)) return value.toString()

                if (numValue >= 1000000) {
                    return `$${(numValue / 1000000).toFixed(1)}M`
                } else if (numValue >= 1000) {
                    return `$${(numValue / 1000).toFixed(1)}K`
                }
                return `$${numValue.toLocaleString()}`
            }

        case AxisType.PERCENTAGE:
            return (value: string | number) => {
                const numValue =
                    typeof value === 'string' ? parseFloat(value) : value
                if (isNaN(numValue)) return value.toString()
                return `${numValue}%`
            }

        case AxisType.NUMBER:
            return (value: string | number) => {
                const numValue =
                    typeof value === 'string' ? parseFloat(value) : value
                if (isNaN(numValue)) return value.toString()
                return formatNumber(numValue)
            }

        default:
            return (value: string | number) => value.toString()
    }
}

/**
 * Suggests an optimal tick interval based on the data range
 * Automatically determines whether to use minutes, hours, days, etc.
 */
export function getSuggestedTickInterval(
    data: NewNestedDataPoint[],
    maxTicks: number = 10
): {
    interval: number
    description: string
    unit: string
} {
    if (data.length === 0) {
        return { interval: 3600000, description: '1 hour', unit: 'hour' }
    }

    // Parse timestamps
    const timestamps = data
        .map((d) => parseTimestamp(d.name))
        .filter((t): t is number => t !== null)
        .sort((a, b) => a - b)

    if (timestamps.length < 2) {
        return { interval: 3600000, description: '1 hour', unit: 'hour' }
    }

    const minTime = timestamps[0]
    const maxTime = timestamps[timestamps.length - 1]
    const range = maxTime - minTime

    // Determine ideal interval based on range and desired tick count
    const idealInterval = range / maxTicks

    // Define standard intervals in milliseconds
    const intervals = [
        { ms: 60 * 1000, desc: '1 minute', unit: 'minute' },
        { ms: 5 * 60 * 1000, desc: '5 minutes', unit: 'minute' },
        { ms: 15 * 60 * 1000, desc: '15 minutes', unit: 'minute' },
        { ms: 30 * 60 * 1000, desc: '30 minutes', unit: 'minute' },
        { ms: 60 * 60 * 1000, desc: '1 hour', unit: 'hour' },
        { ms: 2 * 60 * 60 * 1000, desc: '2 hours', unit: 'hour' },
        { ms: 3 * 60 * 60 * 1000, desc: '3 hours', unit: 'hour' },
        { ms: 6 * 60 * 60 * 1000, desc: '6 hours', unit: 'hour' },
        { ms: 12 * 60 * 60 * 1000, desc: '12 hours', unit: 'hour' },
        { ms: 24 * 60 * 60 * 1000, desc: '1 day', unit: 'day' },
        { ms: 3 * 24 * 60 * 60 * 1000, desc: '3 days', unit: 'day' },
        { ms: 5 * 24 * 60 * 60 * 1000, desc: '5 days', unit: 'day' },
        { ms: 7 * 24 * 60 * 60 * 1000, desc: '1 week', unit: 'week' },
        { ms: 30 * 24 * 60 * 60 * 1000, desc: '1 month', unit: 'month' },
    ]

    // Find the closest standard interval
    let bestInterval = intervals[0]
    let minDiff = Math.abs(idealInterval - bestInterval.ms)

    for (const interval of intervals) {
        const diff = Math.abs(idealInterval - interval.ms)
        if (diff < minDiff) {
            minDiff = diff
            bestInterval = interval
        }
    }

    return {
        interval: bestInterval.ms,
        description: bestInterval.desc,
        unit: bestInterval.unit,
    }
}

/**
 * Generates consistent, evenly-spaced tick values for datetime axes
 * This mimics Highcharts behavior where ticks are at regular intervals
 *
 * @param data - Chart data with timestamps in 'name' field
 * @param options - Configuration options
 * @returns Object containing tick array (as strings to match data format) and formatter function
 */
export function generateConsistentDateTimeTicks(
    data: NewNestedDataPoint[],
    options: DateTimeFormatterOptions & {
        maxTicks?: number
        customInterval?: number
    } = {}
): {
    ticks: string[]
    formatter: (value: string | number) => string
} {
    const { maxTicks = 10, customInterval, ...formatterOptions } = options

    if (data.length === 0) {
        return {
            ticks: [],
            formatter: createDateTimeFormatter(formatterOptions),
        }
    }

    // Parse all timestamps
    const timestamps = data
        .map((d) => parseTimestamp(d.name))
        .filter((t): t is number => t !== null)
        .sort((a, b) => a - b)

    if (timestamps.length === 0) {
        return {
            ticks: [],
            formatter: createDateTimeFormatter(formatterOptions),
        }
    }

    const minTime = timestamps[0]
    const maxTime = timestamps[timestamps.length - 1]

    // Determine interval
    const interval =
        customInterval || getSuggestedTickInterval(data, maxTicks).interval

    // Round down minTime to nearest interval boundary
    const startTick = Math.floor(minTime / interval) * interval

    // Generate ticks
    const ticksNumbers: number[] = []
    let currentTick = startTick

    // Generate ticks that cover the data range
    while (currentTick <= maxTime + interval) {
        if (currentTick >= minTime - interval) {
            ticksNumbers.push(currentTick)
        }
        currentTick += interval
    }

    // Convert to strings to match the data format (data.name is a string)
    const ticks = ticksNumbers.map((tick) => String(tick))

    return {
        ticks,
        formatter: createDateTimeFormatter(formatterOptions),
    }
}

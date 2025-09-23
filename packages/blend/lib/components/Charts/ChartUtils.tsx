import {
    NewNestedDataPoint,
    FlattenedDataPoint,
    AxisType,
    XAxisConfig,
} from './types'

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

export const createSmartDateTimeFormatter = (
    timeZone?: string,
    hour12?: boolean
): ((value: string | number) => string) => {
    let previousDate: string | null = null

    return (value: string | number) => {
        let date = new Date(value)
        if (isNaN(date.getTime())) {
            let timestamp = typeof value === 'string' ? parseInt(value) : value
            if (timestamp < 946684800000) {
                timestamp = timestamp * 1000
            }
            date = new Date(timestamp)
            if (isNaN(date.getTime())) {
                return value.toString()
            }
        }

        const dateOptions: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: timeZone || 'UTC',
        }

        const currentDate = date.toLocaleDateString('en-US', dateOptions)

        if (previousDate === null || previousDate !== currentDate) {
            previousDate = currentDate
            const fullOptions: Intl.DateTimeFormatOptions = {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: hour12 || false,
                timeZone: timeZone || 'UTC',
            }
            return date.toLocaleString('en-US', fullOptions)
        }

        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: hour12 || false,
            timeZone: timeZone || 'UTC',
        }
        return date.toLocaleTimeString('en-US', timeOptions)
    }
}

export const getAxisFormatterWithConfig = (
    axisType: AxisType,
    dateOnly?: boolean,
    smart?: boolean,
    timeZone?: string,
    hour12?: boolean
): ((value: string | number) => string) => {
    if (axisType === AxisType.DATE_TIME) {
        if (smart) {
            return createSmartDateTimeFormatter(timeZone, hour12)
        } else if (dateOnly) {
            return (value: string | number) => {
                const date = new Date(value)
                if (isNaN(date.getTime())) {
                    let timestamp =
                        typeof value === 'string' ? parseInt(value) : value

                    if (timestamp < 946684800000) {
                        timestamp = timestamp * 1000
                    }

                    const timestampDate = new Date(timestamp)
                    if (isNaN(timestampDate.getTime())) {
                        return value.toString()
                    }
                    const options: Intl.DateTimeFormatOptions = {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        timeZone: timeZone || 'UTC',
                    }
                    return timestampDate.toLocaleDateString('en-US', options)
                }
                const options: Intl.DateTimeFormatOptions = {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: timeZone || 'UTC',
                }
                return date.toLocaleDateString('en-US', options)
            }
        } else {
            return (value: string | number) => {
                const date = new Date(value)
                if (isNaN(date.getTime())) {
                    let timestamp =
                        typeof value === 'string' ? parseInt(value) : value

                    if (timestamp < 946684800000) {
                        timestamp = timestamp * 1000
                    }

                    const timestampDate = new Date(timestamp)
                    if (isNaN(timestampDate.getTime())) {
                        return value.toString()
                    }
                    const options: Intl.DateTimeFormatOptions = {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: hour12 || false,
                    }
                    options.timeZone = timeZone || 'UTC'
                    return timestampDate.toLocaleString('en-US', options)
                }
                const options: Intl.DateTimeFormatOptions = {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: hour12 || false,
                }
                options.timeZone = timeZone || 'UTC'
                return date.toLocaleString('en-US', options)
            }
        }
    }

    return getAxisFormatter(axisType, timeZone, hour12)
}
// Have to revisit from optimizaion POV.
export const createStableSmartFormatter = (
    xAxisConfig: XAxisConfig,
    flattenedData: FlattenedDataPoint[]
): ((value: string | number) => string) | undefined => {
    if (xAxisConfig?.customTick) return undefined
    if (xAxisConfig?.tickFormatter) return xAxisConfig.tickFormatter
    if (
        xAxisConfig?.type &&
        xAxisConfig.type === AxisType.DATE_TIME &&
        xAxisConfig?.smart
    ) {
        const isPreserveStartEnd =
            xAxisConfig?.interval === 'preserveStartEnd' ||
            xAxisConfig?.interval === 'preserveStart' ||
            xAxisConfig?.interval === 'preserveEnd'

        const dataValues = flattenedData.map((d) => d.name)
        const dateMap = new Set<string>()
        const showFullDateForValue = new Map<string, boolean>()

        dataValues.forEach((value) => {
            let date = new Date(value)
            if (isNaN(date.getTime())) {
                let timestamp =
                    typeof value === 'string' ? parseInt(value) : value
                if (timestamp < 946684800000) {
                    timestamp = timestamp * 1000
                }
                date = new Date(timestamp)
            }

            if (!isNaN(date.getTime())) {
                const dateString = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: xAxisConfig?.timeZone || 'UTC',
                })

                const shouldShowFull = isPreserveStartEnd
                    ? false
                    : !dateMap.has(dateString)
                dateMap.add(dateString)
                showFullDateForValue.set(value.toString(), shouldShowFull)
            }
        })

        return (value: string | number) => {
            let date = new Date(value)
            if (isNaN(date.getTime())) {
                let timestamp =
                    typeof value === 'string' ? parseInt(value) : value
                if (timestamp < 946684800000) {
                    timestamp = timestamp * 1000
                }
                date = new Date(timestamp)
                if (isNaN(date.getTime())) {
                    return value.toString()
                }
            }

            const shouldShowFullDate = showFullDateForValue.get(
                value.toString()
            )

            if (shouldShowFullDate) {
                return date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: xAxisConfig?.hour12 ?? false,
                    timeZone: xAxisConfig?.timeZone || 'UTC',
                })
            } else {
                return date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: xAxisConfig?.hour12 ?? false,
                    timeZone: xAxisConfig?.timeZone || 'UTC',
                })
            }
        }
    }
    if (xAxisConfig?.type) {
        return getAxisFormatterWithConfig(
            xAxisConfig.type,
            xAxisConfig.dateOnly,
            xAxisConfig?.smart ?? false,
            xAxisConfig.timeZone,
            xAxisConfig.hour12
        )
    }
    return undefined
}

export const getAxisFormatter = (
    axisType: AxisType,
    timeZone?: string,
    hour12?: boolean
): ((value: string | number) => string) => {
    switch (axisType) {
        case AxisType.DATE_TIME:
            return (value: string | number) => {
                const date = new Date(value)
                if (isNaN(date.getTime())) {
                    let timestamp =
                        typeof value === 'string' ? parseInt(value) : value

                    if (timestamp < 946684800000) {
                        timestamp = timestamp * 1000
                    }

                    const timestampDate = new Date(timestamp)
                    if (isNaN(timestampDate.getTime())) {
                        return value.toString()
                    }
                    const options: Intl.DateTimeFormatOptions = {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: hour12 || false,
                    }
                    options.timeZone = timeZone || 'UTC'
                    return timestampDate.toLocaleString('en-US', options)
                }
                const options: Intl.DateTimeFormatOptions = {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: hour12 || false,
                }
                options.timeZone = timeZone || 'UTC'
                return date.toLocaleString('en-US', options)
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

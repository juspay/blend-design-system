/**
 * Shared, framework-free time-of-day primitives.
 *
 * Every date/time component in the library (DateRangePicker's TimeSelector,
 * TimePicker, SingleDatePicker's optional time section) builds on these so the
 * parsing, clamping and formatting rules stay identical across all of them.
 *
 * Canonical representation is `TimeValue` — 24-hour `hours` (0-23), `minutes`
 * (0-59), `seconds` (0-59). The `'12h' | '24h'` format only ever affects
 * *display*; it never changes the stored value.
 */

export type TimeValue = {
    hours: number
    minutes: number
    seconds: number
}

export type TimeFormat = '12h' | '24h'

export const SECONDS_PER_DAY = 24 * 60 * 60

/** Legacy `"HH:mm"` string used by DateRangePicker's internal time state. */
export type TimeString = string

const pad = (n: number): string => n.toString().padStart(2, '0')

const clampInt = (value: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, Math.trunc(value)))

/**
 * Caller-supplied step values reach these generators straight from props.
 * `Math.trunc(Infinity) || 1` is still Infinity, so a finite check has to come
 * before the `|| 1` fallback or the arithmetic downstream produces NaN.
 */
export const sanitizeStep = (step: number): number =>
    Number.isFinite(step) ? Math.max(1, Math.trunc(step) || 1) : 1

// =============================================================================
// CONVERSION
// =============================================================================

export const createTimeValue = (
    hours: number,
    minutes: number = 0,
    seconds: number = 0
): TimeValue => ({
    hours: clampInt(hours, 0, 23),
    minutes: clampInt(minutes, 0, 59),
    seconds: clampInt(seconds, 0, 59),
})

export const timeValueToSeconds = (time: TimeValue): number =>
    time.hours * 3600 + time.minutes * 60 + time.seconds

export const secondsToTimeValue = (totalSeconds: number): TimeValue => {
    // Non-finite input would propagate NaN through every downstream formatter
    // and serialize as "NaN" into consumer form state. Fail closed instead.
    if (!Number.isFinite(totalSeconds))
        return { hours: 0, minutes: 0, seconds: 0 }
    const normalized =
        ((Math.trunc(totalSeconds) % SECONDS_PER_DAY) + SECONDS_PER_DAY) %
        SECONDS_PER_DAY
    return {
        hours: Math.floor(normalized / 3600),
        minutes: Math.floor((normalized % 3600) / 60),
        seconds: normalized % 60,
    }
}

export type DateTimeParts = {
    year: number
    month: number
    day: number
    hours: number
    minutes: number
    seconds: number
}

/**
 * Canonical wall-clock decomposition of an instant.
 *
 * Without `timezone` this is the machine-local reading; with one it is what a
 * clock in that IANA zone shows. `DateRangePicker/utils.ts` delegates its own
 * `getDatePartsInTimezone` here so there is a single implementation.
 */
/**
 * Constructing an `Intl.DateTimeFormat` costs ~15x what formatting with one
 * does, and resolving a single wall-clock reading to an instant needs several
 * readings. Formatters are immutable, so cache one per zone.
 */
const zoneFormatters = new Map<string, Intl.DateTimeFormat>()

const warnedZones = new Set<string>()

/**
 * Returns null for an unusable zone instead of throwing.
 *
 * `timezone` is a public prop typed `string`, so a typo like
 * `"America/New_Yrok"` reaches `Intl` and raises `RangeError`. Because every
 * caller runs in React's render phase, that would white-screen the consumer's
 * subtree. Callers fall back to machine-local time and warn once per bad zone.
 */
const zoneFormatter = (timezone: string): Intl.DateTimeFormat | null => {
    if (zoneFormatters.has(timezone)) {
        return zoneFormatters.get(timezone) as Intl.DateTimeFormat
    }
    let formatter: Intl.DateTimeFormat
    try {
        formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        })
    } catch {
        if (!warnedZones.has(timezone)) {
            warnedZones.add(timezone)
            console.warn(
                `[Blend] Unknown timezone "${timezone}" — falling back to the local timezone.`
            )
        }
        return null
    }
    zoneFormatters.set(timezone, formatter)
    return formatter
}

/** Machine-local wall-clock reading, used as the fallback everywhere. */
const localParts = (date: Date): DateTimeParts => ({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
})

export const getDateTimeParts = (
    date: Date,
    timezone?: string
): DateTimeParts => {
    // An Invalid Date makes `formatToParts` throw, and yields NaN parts on the
    // local path; short-circuit so both behave the same.
    if (!timezone || Number.isNaN(date.getTime())) {
        return localParts(date)
    }

    const formatter = zoneFormatter(timezone)
    if (!formatter) return localParts(date)

    const parts = formatter.formatToParts(date)

    const read = (type: string, fallback: string) =>
        parseInt(parts.find((p) => p.type === type)?.value || fallback, 10)

    return {
        year: read('year', '2024'),
        month: read('month', '1') - 1,
        day: read('day', '1'),
        // Intl emits hour 24 for midnight under hourCycle h24 in some engines.
        hours: read('hour', '0') % 24,
        minutes: read('minute', '0'),
        seconds: read('second', '0'),
    }
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Offset of `timezone` at `instant`, in milliseconds — the wall-clock reading
 * minus UTC, so `-18_000_000` for New York on a winter day.
 */
const zoneOffsetMs = (instant: number, timezone: string): number => {
    const p = getDateTimeParts(new Date(instant), timezone)
    // Offsets are whole seconds, so compare against a whole-second instant;
    // otherwise a millisecond remainder would leak into the "offset".
    return (
        Date.UTC(p.year, p.month, p.day, p.hours, p.minutes, p.seconds) -
        Math.floor(instant / 1000) * 1000
    )
}

/**
 * Builds the instant at which the given wall-clock reading occurs in
 * `timezone` (machine-local when omitted).
 *
 * DST disambiguation follows the standard "compatible" policy (Temporal's
 * `disambiguation: 'compatible'`, java.time, Luxon):
 *
 * - **Gap** (spring-forward; the reading never happens) — resolve *forward* by
 *   the size of the gap. New York 02:30 on 2025-03-09 becomes 03:30, and
 *   midnight in a zone that transitions at midnight (Santiago, Havana) becomes
 *   01:00 **on the same calendar day**. Resolving backwards instead — which the
 *   old correction loop did in those zones — silently moved the calendar day,
 *   breaking `applyTimeValueToDate`'s contract.
 * - **Fold** (fall-back; the reading happens twice) — pick the *first*, i.e.
 *   earlier, occurrence.
 *
 * Both are resolved explicitly from the zone's offsets rather than left to a
 * fixed-point iteration, which cannot converge on a gap at all.
 */
export const createDateFromParts = (
    parts: DateTimeParts,
    timezone?: string
): Date => {
    const { year, month, day, hours, minutes, seconds } = parts

    if (!timezone) {
        return new Date(year, month, day, hours, minutes, seconds, 0)
    }

    // The requested reading treated as if it were UTC. An instant `i` shows
    // that reading in `timezone` exactly when `zoneOffsetMs(i) === wanted - i`.
    const wanted = Date.UTC(year, month, day, hours, minutes, seconds)

    // A transition can only sit between these two, so one of the two offsets
    // is the right one to subtract — unless the reading falls inside a gap.
    const offsetBefore = zoneOffsetMs(wanted - MS_PER_DAY, timezone)
    const offsetAfter = zoneOffsetMs(wanted + MS_PER_DAY, timezone)

    // `wanted - offsetBefore` is the earlier of the two in a fold and the
    // later of the two in a gap, which is what both policies want; try it
    // first so an ambiguous reading resolves to its first occurrence.
    const candidates =
        offsetBefore === offsetAfter
            ? [wanted - offsetBefore]
            : [wanted - offsetBefore, wanted - offsetAfter]

    for (const candidate of candidates) {
        if (zoneOffsetMs(candidate, timezone) === wanted - candidate) {
            return new Date(candidate)
        }
    }

    // Gap: no instant shows this reading. Reading it with the pre-transition
    // offset lands past the transition, i.e. shifted forward by the gap.
    return new Date(wanted - offsetBefore)
}

/**
 * Reads the time-of-day off an instant.
 *
 * Pass `timezone` whenever the surrounding component is timezone-aware —
 * omitting it silently mixes a zone-local date with a machine-local time,
 * which is how a picker ends up displaying one zone's date beside another
 * zone's clock.
 */
export const timeValueFromDate = (date: Date, timezone?: string): TimeValue => {
    const { hours, minutes, seconds } = getDateTimeParts(date, timezone)
    return { hours, minutes, seconds }
}

/**
 * Replaces the time-of-day of `date`, keeping its calendar day *in `timezone`*
 * and returning the corresponding instant.
 *
 * The calendar day is the hard guarantee — `SingleDatePicker` commits whatever
 * day comes back out of here, so a shifted day is a wrong selection. DST gaps
 * are resolved forward by `createDateFromParts`, which normally stays inside
 * the day (Santiago midnight becomes 01:00 on the same date). A handful of
 * zones move their clocks at 23:00 instead, so the gap swallows the end of the
 * day and forward resolution would land on the next one — America/Nuuk on
 * 2025-03-29 jumps 22:59:59 straight to 00:00. There the day wins and the
 * result is clamped to the last instant that day actually has.
 */
export const applyTimeValueToDate = (
    date: Date,
    time: TimeValue,
    timezone?: string
): Date => {
    if (!timezone) {
        const next = new Date(date)
        next.setHours(time.hours, time.minutes, time.seconds, 0)
        return next
    }

    const { year, month, day } = getDateTimeParts(date, timezone)
    const resolved = createDateFromParts(
        {
            year,
            month,
            day,
            hours: time.hours,
            minutes: time.minutes,
            seconds: time.seconds,
        },
        timezone
    )
    if (isSameCalendarDayInTimezone(resolved, date, timezone)) return resolved

    // `day + 1` overflows into the next month/year through Date.UTC, which
    // normalises it. The following midnight can never itself be in a gap here:
    // that would need a second transition inside the same 24 hours.
    const nextMidnight = createDateFromParts(
        { year, month, day: day + 1, hours: 0, minutes: 0, seconds: 0 },
        timezone
    )
    return new Date(nextMidnight.getTime() - 1000)
}

/** Same calendar day as seen from `timezone` (machine-local when omitted). */
export const isSameCalendarDayInTimezone = (
    a: Date,
    b: Date,
    timezone?: string
): boolean => {
    const pa = getDateTimeParts(a, timezone)
    const pb = getDateTimeParts(b, timezone)
    return pa.year === pb.year && pa.month === pb.month && pa.day === pb.day
}

// =============================================================================
// SERIALISATION
// =============================================================================

/** Canonical machine string: `"HH:mm"`, or `"HH:mm:ss"` when `showSeconds`. */
export const timeValueToString = (
    time: TimeValue,
    showSeconds: boolean = false
): TimeString =>
    showSeconds
        ? `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`
        : `${pad(time.hours)}:${pad(time.minutes)}`

/** Parses a canonical `"HH:mm"` / `"HH:mm:ss"` string. Returns null if invalid. */
export const timeValueFromString = (value: string): TimeValue | null => {
    const match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(value.trim())
    if (!match) return null

    const hours = parseInt(match[1], 10)
    const minutes = parseInt(match[2], 10)
    const seconds = match[3] ? parseInt(match[3], 10) : 0

    if (hours > 23 || minutes > 59 || seconds > 59) return null
    return { hours, minutes, seconds }
}

// =============================================================================
// DISPLAY FORMATTING
// =============================================================================

export const to12Hour = (
    hours: number
): { hour: number; period: 'AM' | 'PM' } => ({
    hour: hours % 12 === 0 ? 12 : hours % 12,
    period: hours >= 12 ? 'PM' : 'AM',
})

export const from12Hour = (hour: number, period: 'AM' | 'PM'): number => {
    if (period === 'PM') return hour === 12 ? 12 : hour + 12
    return hour === 12 ? 0 : hour
}

export type FormatTimeOptions = {
    format?: TimeFormat
    showSeconds?: boolean
}

/**
 * Human-readable time. `'12h'` produces `"2:30 PM"` / `"2:30:15 PM"`,
 * `'24h'` produces `"14:30"` / `"14:30:15"`.
 */
export const formatTimeValue = (
    time: TimeValue,
    { format = '12h', showSeconds = false }: FormatTimeOptions = {}
): string => {
    const secondsPart = showSeconds ? `:${pad(time.seconds)}` : ''

    if (format === '24h') {
        return `${pad(time.hours)}:${pad(time.minutes)}${secondsPart}`
    }

    const { hour, period } = to12Hour(time.hours)
    return `${hour}:${pad(time.minutes)}${secondsPart} ${period}`
}

/** Placeholder matching what `formatTimeValue` would produce. */
export const getTimePlaceholder = ({
    format = '12h',
    showSeconds = false,
}: FormatTimeOptions = {}): string =>
    format === '24h'
        ? showSeconds
            ? 'HH:mm:ss'
            : 'HH:mm'
        : showSeconds
          ? 'hh:mm:ss AM'
          : 'hh:mm AM'

// =============================================================================
// BOUNDS
// =============================================================================

export const MIN_TIME: TimeValue = { hours: 0, minutes: 0, seconds: 0 }
export const MAX_TIME: TimeValue = { hours: 23, minutes: 59, seconds: 59 }

export const isTimeWithinBounds = (
    time: TimeValue,
    minTime?: TimeValue,
    maxTime?: TimeValue
): boolean => {
    const total = timeValueToSeconds(time)
    if (minTime && total < timeValueToSeconds(minTime)) return false
    if (maxTime && total > timeValueToSeconds(maxTime)) return false
    return true
}

/**
 * Clamps into `[minTime, maxTime]`. If the bounds are inverted the min wins,
 * which keeps the result deterministic rather than throwing at render time.
 */
export const clampTimeValue = (
    time: TimeValue,
    minTime?: TimeValue,
    maxTime?: TimeValue
): TimeValue => {
    let total = timeValueToSeconds(time)
    if (maxTime) total = Math.min(total, timeValueToSeconds(maxTime))
    if (minTime) total = Math.max(total, timeValueToSeconds(minTime))
    return secondsToTimeValue(total)
}

// =============================================================================
// OPTION GENERATION
// =============================================================================

export type TimeSlotOptions = {
    /** Minute granularity. Values < 1 are treated as 1. */
    stepMinutes?: number
    minTime?: TimeValue
    maxTime?: TimeValue
}

/**
 * Generates the selectable minute-granularity slots for a dropdown-style time
 * field, inclusive of both bounds.
 *
 * Stepping restarts at :00 on every new hour, so the list stays aligned to the
 * step grid (00/15/30/45 for the default step) even when `minTime` is off-grid
 * — only the first hour begins at `minTime`'s minute. This mirrors the
 * long-standing DateRangePicker generator exactly. `TimeSelector`, the mobile
 * wheel picker (`generatePickerData`) and `createSelectionHandler` all route
 * through here, so the step can only change in one place.
 */
export const generateTimeSlots = ({
    stepMinutes = 15,
    minTime,
    maxTime,
}: TimeSlotOptions = {}): TimeValue[] => {
    const step = sanitizeStep(stepMinutes)
    // Bounds are caller-supplied. A non-finite hour would make the outer loop
    // never terminate and allocate until the tab dies, so clamp into the day.
    const bound = (value: number, fallback: number, hi: number) =>
        Number.isFinite(value)
            ? Math.min(hi, Math.max(0, Math.trunc(value)))
            : fallback
    const minHour = bound(minTime?.hours ?? 0, 0, 23)
    const minMinute = bound(minTime?.minutes ?? 0, 0, 59)
    const maxHour = bound(maxTime?.hours ?? 23, 23, 23)
    const maxMinute = bound(maxTime?.minutes ?? 59, 59, 59)

    const slots: TimeValue[] = []
    for (let hour = minHour; hour <= maxHour; hour++) {
        const firstMinute = hour === minHour ? minMinute : 0
        const lastMinute = hour === maxHour ? maxMinute : 59
        for (let minute = firstMinute; minute <= lastMinute; minute += step) {
            slots.push({ hours: hour, minutes: minute, seconds: 0 })
        }
    }
    return slots
}

/** The discrete values for a single column of a segmented time picker. */
export const generateHourOptions = (format: TimeFormat = '24h'): number[] =>
    format === '24h'
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i))

export const generateMinuteOptions = (stepMinutes: number = 1): number[] => {
    const step = sanitizeStep(stepMinutes)
    const values: number[] = []
    for (let m = 0; m < 60; m += step) values.push(m)
    return values
}

export const generateSecondOptions = (stepSeconds: number = 1): number[] => {
    const step = sanitizeStep(stepSeconds)
    const values: number[] = []
    for (let s = 0; s < 60; s += step) values.push(s)
    return values
}

/** Rounds a value to the nearest representable slot on the minute grid. */
export const snapToMinuteStep = (
    time: TimeValue,
    stepMinutes: number
): TimeValue => {
    const step = sanitizeStep(stepMinutes)
    if (step === 1) return time
    const snapped = Math.round(time.minutes / step) * step
    return snapped > 59
        ? createTimeValue((time.hours + 1) % 24, 0, time.seconds)
        : { ...time, minutes: snapped }
}

// =============================================================================
// FLEXIBLE INPUT PARSING
// =============================================================================

export type ParseTimeInputOptions = {
    minTime?: TimeValue
    maxTime?: TimeValue
    /**
     * When no AM/PM is typed and the hour is 1-12, guess the period from the
     * current wall-clock hour. This is the long-standing DateRangePicker
     * behaviour; 24-hour pickers should pass `false` so "3" means 03:00.
     */
    ambiguousHourHeuristic?: boolean
    /** Injectable clock, for the heuristic above. Tests pass a fixed date. */
    now?: Date
    /** Reject `"12:30:45"` style input. Minute-only fields pass `false`. */
    allowSeconds?: boolean
}

const TIME_INPUT_PATTERNS = [
    // 12:30:45 PM, 12:30 PM, 12 PM
    /^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?\s*(AM|PM)$/i,
    // 12:30:45, 12:30
    /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/,
    // 1230, 130 (compact)
    /^(\d{3,4})$/,
]

/**
 * Forgiving parser for free-typed time input. Accepts `"2:30 PM"`, `"14:30"`,
 * `"1430"`, `"230"`, `"2:30:15 PM"`. Returns null when the input is
 * unparseable *or* falls outside `[minTime, maxTime]`.
 */
export const parseTimeInput = (
    input: string,
    {
        minTime,
        maxTime,
        ambiguousHourHeuristic = true,
        now,
        allowSeconds = true,
    }: ParseTimeInputOptions = {}
): TimeValue | null => {
    if (!input.trim()) return null

    const cleanInput = input.replace(/\s+/g, ' ').trim().toUpperCase()

    for (const pattern of TIME_INPUT_PATTERNS) {
        const match = cleanInput.match(pattern)
        if (!match) continue

        let hours: number
        let minutes: number
        let seconds = 0
        const period = (
            pattern === TIME_INPUT_PATTERNS[0] ? match[4] : undefined
        )?.toUpperCase() as 'AM' | 'PM' | undefined

        if (pattern === TIME_INPUT_PATTERNS[2]) {
            const digits = match[1]
            if (digits.length === 3) {
                hours = parseInt(digits.slice(0, 1), 10)
                minutes = parseInt(digits.slice(1), 10)
            } else {
                hours = parseInt(digits.slice(0, 2), 10)
                minutes = parseInt(digits.slice(2), 10)
            }
        } else {
            if (!allowSeconds && match[3] !== undefined) continue
            hours = parseInt(match[1], 10)
            minutes = parseInt(match[2] || '0', 10)
            seconds = parseInt(match[3] || '0', 10)
        }

        if (minutes < 0 || minutes > 59) continue
        if (seconds < 0 || seconds > 59) continue

        if (period) {
            if (hours < 1 || hours > 12) continue
            hours = from12Hour(hours, period)
        } else {
            if (hours > 23) continue

            if (ambiguousHourHeuristic && hours >= 1 && hours <= 12) {
                const currentHour = (now ?? new Date()).getHours()
                const defaultToPM = currentHour >= 12
                if (defaultToPM && hours !== 12) {
                    hours += 12
                } else if (!defaultToPM && hours === 12) {
                    hours = 0
                }
            }
        }

        const candidate: TimeValue = { hours, minutes, seconds }
        if (!isTimeWithinBounds(candidate, minTime, maxTime)) continue

        return candidate
    }

    return null
}

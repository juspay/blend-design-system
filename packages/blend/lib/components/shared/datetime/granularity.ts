import type { DateRange } from '../../DateRangePicker/types'

/**
 * Selection granularity shared by `SingleDatePicker` and `DateRangePicker`.
 *
 * `'day'` is the historical behaviour and the default everywhere: nothing in
 * this module runs for it, so day pickers keep returning exactly the `Date`
 * `CalendarGrid` produced. The coarser modes normalise the returned `Date` to
 * the *start of the selected period* (and, for a range's end, to the last day
 * of the end period) so consumers never have to guess which day inside a month
 * a "September 2025" selection stands for.
 *
 * All arithmetic is local-time, matching `CalendarGrid`, which builds its day
 * cells with `new Date(year, month, day)`. Timezone only ever affects
 * *display* in these components, never the constructed calendar date.
 */
export type PickerGranularity = 'day' | 'month' | 'year'

/** `DateRangePicker` supports month ranges; a "year range" has no consumer. */
export type RangePickerGranularity = 'day' | 'month'

const isUsableDate = (date: Date | undefined): date is Date =>
    date instanceof Date && !Number.isNaN(date.getTime())

/** First day of `date`'s month, at local midnight. */
export const startOfMonth = (date: Date): Date =>
    isUsableDate(date)
        ? new Date(date.getFullYear(), date.getMonth(), 1)
        : new Date(NaN)

/**
 * Last day of `date`'s month, at local midnight.
 *
 * Day 0 of the following month is the previous month's last day, which also
 * gives December the right answer (Dec → month index 12 rolls into January of
 * the next year, day 0 walks back to Dec 31) and handles leap Februaries.
 *
 * Midnight, not 23:59:59, so a month range's end matches what a day-granularity
 * range returns when the same last day is clicked in the calendar.
 */
export const endOfMonth = (date: Date): Date =>
    isUsableDate(date)
        ? new Date(date.getFullYear(), date.getMonth() + 1, 0)
        : new Date(NaN)

/** 1 January of `date`'s year, at local midnight. */
export const startOfYear = (date: Date): Date =>
    isUsableDate(date) ? new Date(date.getFullYear(), 0, 1) : new Date(NaN)

/**
 * The canonical `Date` for the period `date` falls in.
 *
 * This is the value the pickers hand back to `onChange` in the coarser modes,
 * and also what the grid uses to decide whether a cell is selected — feeding
 * both from one function is what keeps "what you clicked" and "what you get"
 * in sync.
 */
export const startOfPeriod = (
    date: Date,
    granularity: PickerGranularity
): Date => {
    switch (granularity) {
        case 'month':
            return startOfMonth(date)
        case 'year':
            return startOfYear(date)
        default:
            return date
    }
}

/**
 * Collapses both ends of a range onto their period starts.
 *
 * Used for *rendering only*. A committed month range ends on the last day of
 * its end month, but the grid draws one cell per month, so the end cap has to
 * be matched against that month's first day or it would render as an interior
 * range cell instead of an end cap.
 */
export const normalizeRangeToPeriodStarts = (
    range: DateRange | undefined,
    granularity: PickerGranularity
): DateRange | undefined => {
    if (!range || granularity === 'day') return range
    return {
        ...range,
        startDate: startOfPeriod(range.startDate, granularity),
        endDate: range.endDate
            ? startOfPeriod(range.endDate, granularity)
            : undefined,
    }
}

/**
 * Range accumulation for month granularity, mirroring the day-mode rules in
 * `handleCalendarDateClick`: a click with no pending selection (or with a
 * complete range) starts a new one, a later click closes it, and a click
 * *before* the pending start restarts rather than swapping.
 *
 * `picked` is any date inside the clicked month.
 */
export const nextMonthRange = (
    current: DateRange | undefined,
    picked: Date
): DateRange => {
    const start = startOfMonth(picked)

    if (!current || !current.startDate || current.endDate) {
        return { startDate: start }
    }

    const pendingStart = startOfMonth(current.startDate)

    if (start.getTime() < pendingStart.getTime()) {
        return { startDate: start }
    }

    // `pendingStart`, not `current.startDate`: a caller can seed `value` with a
    // half-open range whose start sits mid-month, and closing the range against
    // it verbatim would commit a month range starting on the 10th.
    return { startDate: pendingStart, endDate: endOfMonth(picked) }
}

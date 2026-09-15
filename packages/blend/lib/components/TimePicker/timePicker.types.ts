import type { TimeFormat, TimeValue } from '../shared/datetime/timeCore'

/**
 * Re-exported so consumers get the value shape straight from the component
 * barrel instead of reaching into `shared/datetime`.
 */
export type { TimeFormat, TimeValue } from '../shared/datetime/timeCore'

export enum TimePickerSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

/**
 * Props for `TimePicker`.
 *
 * **Value shape.** `value` is a `{ hours, minutes, seconds }` object in
 * canonical 24-hour form — `hours` is always 0-23, `minutes` and `seconds` are
 * 0-59 — regardless of what `format` is set to. A 2:30 PM selection is always
 * `{ hours: 14, minutes: 30, seconds: 0 }`.
 *
 * **`format` is display only.** `'12h'` renders an AM/PM column and a
 * `"2:30 PM"` trigger label, `'24h'` renders `"14:30"`. Neither changes the
 * stored value, so a consumer can flip the format at runtime without
 * migrating any state.
 *
 * **Controlled vs uncontrolled.** Pass `value` to control the component; the
 * columns then render exactly what you hand them. Omit `value` and the
 * component keeps an internal draft (starting at midnight, clamped into
 * `[minTime, maxTime]`) purely so the columns have something to render — the
 * only way to observe a selection is `onChange`.
 *
 * Every value handed to `onChange` is already clamped into
 * `[minTime, maxTime]` and snapped to `minuteStep`.
 *
 * **Bounds apply to `value` too.** A controlled `value` outside
 * `[minTime, maxTime]` is clamped into range for the trigger label, the
 * columns and the hidden form input, so an out-of-bounds time is never
 * displayed or submitted. The clamp is presentation only — no `onChange`
 * fires, because the consumer owns `value` and a silent write-back would be
 * a surprise. Hand back a clamped `value` if you want the two to agree.
 *
 * **Bounds are whole minutes unless `showSeconds` is set.** Without a seconds
 * column every selectable time has `seconds: 0`, so a bound carrying seconds
 * is tightened to a whole minute: `minTime` rounds up, `maxTime` rounds down.
 * `minTime: 09:00:30` therefore behaves as `09:01:00`.
 */
export type TimePickerProps = {
    /**
     * Canonical 24-hour value. Omit for uncontrolled usage. Values outside
     * `[minTime, maxTime]` are clamped for display and for the form input
     * without firing `onChange`.
     */
    value?: TimeValue
    /** Called with a clamped, step-snapped canonical value. */
    onChange?: (value: TimeValue) => void
    /** Display format only — never affects `value`. Defaults to `'12h'`. */
    format?: TimeFormat
    /** Adds a seconds column and shows seconds in the trigger. */
    showSeconds?: boolean
    /** Minute granularity of the minutes column. Defaults to `1`. */
    minuteStep?: number
    /**
     * Inclusive lower bound. Out-of-bounds options render disabled. Rounded
     * up to a whole minute unless `showSeconds` is set.
     */
    minTime?: TimeValue
    /**
     * Inclusive upper bound. Out-of-bounds options render disabled. Rounded
     * down to a whole minute unless `showSeconds` is set.
     */
    maxTime?: TimeValue
    disabled?: boolean
    /** Applies the error border to the trigger. */
    error?: boolean
    /** Rendered in a live region and linked to the trigger. */
    errorMessage?: string
    size?: TimePickerSize
    /** Trigger text when there is no value. Defaults to a format-shaped hint. */
    placeholder?: string
    /** Emits a hidden input carrying `"HH:mm"` / `"HH:mm:ss"` for form posts. */
    name?: string
    'aria-label'?: string
}

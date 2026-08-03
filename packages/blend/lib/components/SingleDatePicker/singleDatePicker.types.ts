import type {
    DateFormatConfig,
    DateRangePickerPopoverConfig,
    DateRangePickerSize,
    TriggerConfig,
} from '../DateRangePicker/types'

/**
 * Props for `SingleDatePicker`.
 *
 * Deliberately a thin, single-`Date` surface over the same internals
 * `DateRangePicker` uses (`CalendarGrid`, `renderPickerTrigger`, the shared
 * `timeCore` helpers), so the two components cannot drift apart visually or
 * behaviourally. Every shared shape — `DateFormatConfig`, `TriggerConfig`,
 * `DateRangePickerPopoverConfig`, `DateRangePickerSize` — is imported rather
 * than redeclared.
 */
export type SingleDatePickerProps = {
    /**
     * Committed value. Omit it (or pass `undefined`) to run the picker
     * uncontrolled, in which case the last applied date is held internally and
     * observed through `onChange`. Matches `DateRangePicker` and `TimePicker`,
     * which are both optionally controlled.
     */
    value?: Date
    /** Fired on Apply, and with `undefined` when the value is cleared. */
    onChange?: (date: Date | undefined) => void
    minDate?: Date
    maxDate?: Date
    /** Per-date predicate; disabled days are unclickable in the calendar. */
    disableDates?: (date: Date) => boolean
    /** Renders a time selector below the calendar. */
    showTime?: boolean
    /** Display-only; the stored value is always a 24-hour `Date`. */
    timeFormat?: '12h' | '24h'
    showSeconds?: boolean
    /**
     * IANA timezone string, same semantics as `DateRangePicker` — it drives
     * "today" and the trigger's formatting.
     */
    timezone?: string
    dateFormat?: string
    /**
     * Richer trigger formatting, replacing `dateFormat`.
     *
     * Precedence: the component-level time props seed it, and anything set
     * explicitly on the config wins — `includeTime` defaults to `showTime` and
     * `timeFormat` defaults to the `timeFormat` prop, so a picker with
     * `showTime` shows that time in the trigger without restating it here.
     * Pass `includeTime: false` to keep the time selector but hide the time
     * from the trigger.
     *
     * `DateFormatConfig` has no seconds granularity, so `showSeconds` only
     * affects the in-popover readout; a trigger that must show seconds needs
     * `dateFormat` (no `formatConfig`) or a custom `triggerConfig.renderTrigger`.
     */
    formatConfig?: DateFormatConfig
    placeholder?: string
    disabled?: boolean
    error?: boolean
    /**
     * Inline error text below the trigger, announced as an `alert`.
     *
     * NOTE: it is styled from the `TIME_PICKER` component token slot
     * (`errorMessage.*`), shared with `TimePicker`, so the two error texts
     * always match. Overriding `TIME_PICKER` to restyle `TimePicker` therefore
     * also restyles this. The same slot's `dropdown.*` drives the optional
     * time section inside the popover.
     */
    errorMessage?: string
    /** Renders the inline clear affordance inside the trigger. */
    allowClear?: boolean
    size?: DateRangePickerSize
    triggerConfig?: TriggerConfig
    popoverConfig?: DateRangePickerPopoverConfig
}

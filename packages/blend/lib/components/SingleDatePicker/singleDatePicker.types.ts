import type {
    DateFormatConfig,
    DateRangePickerPopoverConfig,
    DateRangePickerSize,
    TriggerConfig,
} from '../DateRangePicker/types'
import type { PickerGranularity } from '../shared/datetime/granularity'

// Re-exported the way `timePicker.types.ts` re-exports `TimeValue`, so a
// consumer can name the type of the `granularity` prop they are passing.
export type {
    PickerGranularity,
    RangePickerGranularity,
} from '../shared/datetime/granularity'

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
    /**
     * Selection resolution. `'day'` (the default) is the original behaviour and
     * is untouched by this prop's existence.
     *
     * `'month'` swaps the day calendar for a 12-cell month grid with year
     * navigation and returns the **first day of the selected month** at local
     * midnight; `'year'` renders a year grid and returns **1 January** of the
     * selected year. `minDate` / `maxDate` are compared at the same resolution,
     * so a `minDate` half-way through September still leaves September (or
     * 2025) selectable.
     *
     * `dateFormat` and `placeholder` pick granularity-appropriate defaults
     * (`'MM/yyyy'` / "Select month", `'yyyy'` / "Select year") unless you set
     * them. `disableDates` is called with the period's first day, not with
     * every day inside it.
     */
    granularity?: PickerGranularity
    /** Per-date predicate; disabled days are unclickable in the calendar. */
    disableDates?: (date: Date) => boolean
    /** Renders a time selector below the day calendar; ignored for month/year. */
    showTime?: boolean
    /** Display-only; the stored value is always a 24-hour `Date`. */
    timeFormat?: '12h' | '24h'
    showSeconds?: boolean
    /**
     * IANA timezone string, same semantics as `DateRangePicker` — it drives
     * "today" and the trigger's formatting.
     */
    timezone?: string
    /** Defaults to `'dd/MM/yyyy'`, or a granularity-appropriate pattern. */
    dateFormat?: string
    /**
     * Richer trigger formatting, replacing `dateFormat`.
     *
     * Precedence: in day mode, the component-level time props seed it, and anything set
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

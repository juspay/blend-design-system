/**
 * TimePicker strings.
 *
 * Transcribed verbatim from `components/TimePicker/TimeColumns.tsx`.
 *
 * Note what is NOT here: the `'AM' | 'PM'` union itself. In
 * `components/shared/datetime/timeCore.ts` that union is a data type —
 * `to12Hour` returns it, `from12Hour` consumes it, and parsed input is cast to
 * it — so only the rendered label is localized, via the two keys below. The
 * column's option list keys off a numeric index, never the label text.
 *
 * Zero imports. Components import THIS fragment, never `catalog/index.ts`.
 */
export const TIME_PICKER_MESSAGES = {
    'time-picker.label.hours': 'Hours',
    'time-picker.label.minutes': 'Minutes',
    'time-picker.label.seconds': 'Seconds',
    'time-picker.label.period': 'AM/PM',
    'time-picker.label.am': 'AM',
    'time-picker.label.pm': 'PM',
    // Where the day period sits relative to the time is a locale convention
    // (`2:30 PM` vs `午後2:30`), so the whole pattern is translatable.
    // `{period}` is the translated `label.am` / `label.pm`.
    'time-picker.label.time-with-period': '{time} {period}',

    'time-picker.a11y.choose-time': 'Choose time',
    'time-picker.a11y.trigger': 'Time picker, {value}',
} as const

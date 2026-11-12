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

    'time-picker.a11y.choose-time': 'Choose time',
} as const

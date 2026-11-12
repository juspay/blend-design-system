/**
 * DateRangePicker strings.
 *
 * The preset values are transcribed verbatim from `getPresetLabel`'s switch in
 * `DateRangePicker/utils.ts`, including its `default:` arm
 * (`'Select Range'`), so the migration renders byte-identical output.
 *
 * Note what is deliberately absent: the strings in `getPresetDisplayLabel`.
 * Two of its three cases return the wrong text today, and giving them keys
 * would enshrine those bugs behind a translation key. They are corrected in
 * their own fix first.
 *
 * Zero imports. Components import THIS fragment, never `catalog/index.ts`.
 */
export const DATE_RANGE_PICKER_MESSAGES = {
    'date-range-picker.preset.today': 'Today',
    'date-range-picker.preset.yesterday': 'Yesterday',
    'date-range-picker.preset.tomorrow': 'Tomorrow',
    'date-range-picker.preset.last-30-minutes': 'Last 30 minutes',
    'date-range-picker.preset.last-1-hour': 'Last 1 hour',
    'date-range-picker.preset.last-6-hours': 'Last 6 hours',
    'date-range-picker.preset.last-24-hours': 'Last 24 hours',
    'date-range-picker.preset.last-7-days': 'Last 7 days',
    'date-range-picker.preset.last-30-days': 'Last 30 days',
    'date-range-picker.preset.this-month': 'This month',
    'date-range-picker.preset.last-month': 'Last month',
    'date-range-picker.preset.last-3-months': 'Last 3 months',
    'date-range-picker.preset.last-12-months': 'Last 12 months',
    'date-range-picker.preset.next-7-days': 'Next 7 days',
    'date-range-picker.preset.next-30-days': 'Next 30 days',
    'date-range-picker.preset.next-3-months': 'Next 3 months',
    'date-range-picker.preset.next-12-months': 'Next 12 months',
    'date-range-picker.preset.custom': 'Custom',
    'date-range-picker.placeholder.select-range': 'Select Range',
    'date-range-picker.action.apply-date': 'Apply Date',

    'date-range-picker.placeholder.select-date': 'Select date',
    'date-range-picker.placeholder.select-dates': 'Select dates',
    'date-range-picker.placeholder.select-date-range': 'Select date range',
    'date-range-picker.placeholder.select-month-range': 'Select month range',

    // Calendar chrome shared with SingleDatePicker and the month/year grid.
    // These keep the `date-range-picker.` prefix rather than gaining a
    // `single-date-picker.` one: all three pickers resolve against this single
    // fragment (SingleDatePicker already reads
    // `date-range-picker.placeholder.select-date` for its own trigger), and a
    // second prefix inside one fragment would make the override surface look
    // like two families when it is one.
    'date-range-picker.a11y.start-time': 'Start time',
    'date-range-picker.a11y.end-time': 'End time',
    'date-range-picker.a11y.previous-year': 'Previous year',
    'date-range-picker.a11y.next-year': 'Next year',
    'date-range-picker.a11y.select-month': 'Select month',
    'date-range-picker.a11y.select-year': 'Select year',
    // SingleDatePicker's granularity defaults. `placeholder.select-month` and
    // `a11y.select-month` carry the same English text but are deliberately
    // separate keys: one is a trigger placeholder, the other names the
    // month/year grid, and a translator may well want different words.
    'date-range-picker.placeholder.select-month': 'Select month',
    'date-range-picker.placeholder.select-year': 'Select year',
    'date-range-picker.label.date': 'Date',
    'date-range-picker.label.month': 'Month',
    'date-range-picker.label.year': 'Year',
    'date-range-picker.a11y.choose-date': 'Choose date',
    'date-range-picker.a11y.choose-month': 'Choose month',
    'date-range-picker.a11y.choose-year': 'Choose year',
    // Whole sentence with a placeholder, not `'Date picker, ' + value`:
    // word order around an interpolated value is not portable.
    'date-range-picker.a11y.trigger': 'Date picker, {value}',

    // State words appended to a calendar cell's accessible name. Joined with
    // the date by `Intl.ListFormat`, which yields "<date>, selected, today" in
    // English — byte-identical to the hand-rolled suffixes these replace —
    // while letting the separator follow the locale. Each word stays
    // independently translatable, which concatenation in JSX did not allow.
    'date-range-picker.a11y.state-selected': 'selected',
    'date-range-picker.a11y.state-not-selected': 'not selected',
    'date-range-picker.a11y.state-today': 'today',
    'date-range-picker.a11y.state-disabled': 'disabled',
} as const

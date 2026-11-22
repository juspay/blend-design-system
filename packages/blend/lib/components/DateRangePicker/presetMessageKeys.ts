/**
 * `DateRangePreset` to message key.
 *
 * Explicit rather than derived: the enum values are camelCase
 * (`last30Minutes`, `thisMonth`) while the key grammar is kebab-case, so no
 * template literal can bridge them. The `Record<DateRangePreset, …>`
 * annotation makes a missing or misspelled entry a compile error, which is
 * the whole point — this is the one place the mapping can be checked.
 *
 * Lives here rather than in `lib/i18n/catalog/` because the catalog fragments
 * are zero-import leaves and must not depend on component types.
 */

import { DateRangePreset } from './types'
import type { DATE_RANGE_PICKER_MESSAGES } from '../../i18n/catalog/dateRangePicker.messages'

type DateRangePickerMessageKey = keyof typeof DATE_RANGE_PICKER_MESSAGES

export const PRESET_MESSAGE_KEY: Record<
    DateRangePreset,
    DateRangePickerMessageKey
> = {
    [DateRangePreset.CUSTOM]: 'date-range-picker.preset.custom',
    [DateRangePreset.TODAY]: 'date-range-picker.preset.today',
    [DateRangePreset.YESTERDAY]: 'date-range-picker.preset.yesterday',
    [DateRangePreset.TOMORROW]: 'date-range-picker.preset.tomorrow',
    [DateRangePreset.LAST_30_MINUTES]:
        'date-range-picker.preset.last-30-minutes',
    [DateRangePreset.LAST_1_HOUR]: 'date-range-picker.preset.last-1-hour',
    [DateRangePreset.LAST_6_HOURS]: 'date-range-picker.preset.last-6-hours',
    [DateRangePreset.LAST_24_HOURS]: 'date-range-picker.preset.last-24-hours',
    [DateRangePreset.LAST_7_DAYS]: 'date-range-picker.preset.last-7-days',
    [DateRangePreset.LAST_30_DAYS]: 'date-range-picker.preset.last-30-days',
    [DateRangePreset.THIS_MONTH]: 'date-range-picker.preset.this-month',
    [DateRangePreset.LAST_MONTH]: 'date-range-picker.preset.last-month',
    [DateRangePreset.LAST_3_MONTHS]: 'date-range-picker.preset.last-3-months',
    [DateRangePreset.LAST_12_MONTHS]: 'date-range-picker.preset.last-12-months',
    [DateRangePreset.NEXT_7_DAYS]: 'date-range-picker.preset.next-7-days',
    [DateRangePreset.NEXT_30_DAYS]: 'date-range-picker.preset.next-30-days',
    [DateRangePreset.NEXT_3_MONTHS]: 'date-range-picker.preset.next-3-months',
    [DateRangePreset.NEXT_12_MONTHS]: 'date-range-picker.preset.next-12-months',
}

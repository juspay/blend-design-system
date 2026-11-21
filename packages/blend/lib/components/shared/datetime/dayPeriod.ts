import { resolveMessage } from '../../../i18n/resolve'
import { TIME_PICKER_MESSAGES } from '../../../i18n/catalog/timePicker.messages'
import type { BlendTranslate } from '../../../i18n/types'

/**
 * The display formatter for 12-hour times, bound to the provider's
 * translator: it resolves the translated day period and places it with the
 * translatable `time-picker.label.time-with-period` pattern.
 *
 * Pure (no hooks), so the shared trigger formatter in
 * `DateRangePicker/utils.ts` can use it as well as the components. With no
 * translator it returns the English `"2:30 PM"` form.
 */
export const createPeriodFormatter =
    (translate?: BlendTranslate) =>
    (time: string, period: 'AM' | 'PM'): string =>
        resolveMessage(
            TIME_PICKER_MESSAGES,
            'time-picker.label.time-with-period',
            {
                translate,
                vars: {
                    time,
                    period: resolveMessage(
                        TIME_PICKER_MESSAGES,
                        period === 'AM'
                            ? 'time-picker.label.am'
                            : 'time-picker.label.pm',
                        { translate }
                    ),
                },
            }
        )

import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getCalendarLightTokens } from './dateRangePicker.light.tokens'
import { getCalendarDarkTokens } from './dateRangePicker.dark.tokens'
import type { ResponsiveCalendarTokens } from './dateRangePicker.tokens.types'

export type {
    CalendarState,
    CalendarSize,
    CalendarTokenType,
    ResponsiveCalendarTokens,
} from './dateRangePicker.tokens.types'

export const getCalendarToken = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCalendarTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getCalendarDarkTokens(foundationToken)
    }

    return getCalendarLightTokens(foundationToken)
}

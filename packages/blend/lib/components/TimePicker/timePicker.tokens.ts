import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTimePickerLightTokens } from './timePicker.light.tokens'
import { getTimePickerDarkTokens } from './timePicker.dark.tokens'
import type { ResponsiveTimePickerTokens } from './timePicker.tokens.types'

export type {
    TimePickerTokensType,
    ResponsiveTimePickerTokens,
} from './timePicker.tokens.types'

export const getTimePickerTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTimePickerTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTimePickerDarkTokens(foundationToken)
    }

    return getTimePickerLightTokens(foundationToken)
}

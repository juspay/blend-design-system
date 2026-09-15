import { Theme } from '../../context/theme.enum'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { getSpinnerDarkTokens } from './spinner.dark.tokens'
import { getSpinnerLightTokens } from './spinner.light.tokens'
import type { ResponsiveSpinnerTokens } from './spinner.tokens.types'

export type {
    ResponsiveSpinnerTokens,
    SpinnerColor,
    SpinnerSize,
    SpinnerTokensType,
} from './spinner.tokens.types'

export const getSpinnerTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSpinnerTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSpinnerDarkTokens(foundationToken)
    }

    return getSpinnerLightTokens(foundationToken)
}

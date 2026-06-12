import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getAlertV2DarkTokens } from './alertV2.dark.tokens'
import { getAlertV2LightTokens } from './alertV2.light.tokens'
import type { ResponsiveAlertV2Tokens } from './alertV2.tokens.types'

export type {
    AlertV2TokensType,
    ResponsiveAlertV2Tokens,
} from './alertV2.tokens.types'

export const getAlertV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveAlertV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getAlertV2DarkTokens(foundationToken)
    }

    return getAlertV2LightTokens(foundationToken)
}

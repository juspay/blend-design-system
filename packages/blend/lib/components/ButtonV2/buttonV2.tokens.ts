import { FoundationTokenType } from '../../tokens/theme.token'
import { getButtonV2LightTokens } from './buttonV2.light.tokens'
import { Theme } from '../../context/theme.enum'
import { getButtonV2DarkTokens } from './buttonV2.dark.tokens'
import type { ResponsiveButtonV2Tokens } from './buttonV2.tokens.types'

export type {
    ButtonV2TokensType,
    ResponsiveButtonV2Tokens,
} from './buttonV2.tokens.types'

export const getButtonV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveButtonV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getButtonV2DarkTokens(foundationToken)
    }

    return getButtonV2LightTokens(foundationToken)
}

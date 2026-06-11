import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getTextInputV2DarkTokens } from './TextInputV2.dark.tokens'
import { getTextInputV2LightTokens } from './TextInputV2.light.tokens'
import type { ResponsiveTextInputV2Tokens } from './TextInputV2.tokens.types'

export type {
    TextInputV2TokensType,
    ResponsiveTextInputV2Tokens,
} from './TextInputV2.tokens.types'

export const getTextInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTextInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTextInputV2DarkTokens(foundationToken)
    }
    return getTextInputV2LightTokens(foundationToken)
}

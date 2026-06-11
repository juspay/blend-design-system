import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getTextAreaV2DarkTokens } from './TextAreaV2.dark.tokens'
import { getTextAreaV2LightTokens } from './TextAreaV2.light.tokens'
import type { ResponsiveTextAreaV2Tokens } from './TextAreaV2.tokens.types'

export type {
    TextAreaV2TokensType,
    ResponsiveTextAreaV2Tokens,
} from './TextAreaV2.tokens.types'

export const getTextAreaV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTextAreaV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTextAreaV2DarkTokens(foundationToken)
    }
    return getTextAreaV2LightTokens(foundationToken)
}

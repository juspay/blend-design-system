import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTagV2DarkTokens } from './tagV2.dark.tokens'
import { getTagV2LightTokens } from './tagV2.light.tokens'
import type { ResponsiveTagV2Tokens } from './tagV2.tokens.types'

export type {
    ResponsiveTagV2Tokens,
    TagV2TokensType,
} from './tagV2.tokens.types'

export const getTagV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTagV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTagV2DarkTokens(foundationToken)
    }

    return getTagV2LightTokens(foundationToken)
}

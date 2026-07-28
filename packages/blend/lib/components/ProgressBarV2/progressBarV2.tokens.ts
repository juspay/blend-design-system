import { Theme } from '../../context/theme.enum'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getProgressBarV2DarkTokens } from './progressBarV2.dark.tokens'
import { getProgressBarV2LightTokens } from './progressBarV2.light.tokens'
import type { ResponsiveProgressBarV2Tokens } from './progressBarV2.tokens.types'

export type {
    ProgressBarV2TokenType,
    ResponsiveProgressBarV2Tokens,
} from './progressBarV2.tokens.types'

export const getProgressBarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveProgressBarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getProgressBarV2DarkTokens(foundationToken)
    }

    return getProgressBarV2LightTokens(foundationToken)
}

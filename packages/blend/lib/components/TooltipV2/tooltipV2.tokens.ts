import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTooltipV2LightTokens } from './tooltipV2.light.tokens'
import { getTooltipV2DarkTokens } from './tooltipV2.dark.tokens'
import type { ResponsiveTooltipV2Tokens } from './tooltipV2.tokens.types'

export type {
    TooltipV2TokensType,
    ResponsiveTooltipV2Tokens,
} from './tooltipV2.tokens.types'

export const getTooltipV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTooltipV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTooltipV2DarkTokens(foundationToken)
    }

    return getTooltipV2LightTokens(foundationToken)
}

import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getChartV2DarkTokens } from './chartV2.dark.tokens'
import { getChartV2LightTokens } from './chartV2.light.tokens'
import type { ResponsiveChartV2Tokens } from './chartV2.tokens.types'

export type {
    ChartV2TokensType,
    ResponsiveChartV2Tokens,
} from './chartV2.tokens.types'

export const getChartV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveChartV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getChartV2DarkTokens(foundationToken)
    }

    return getChartV2LightTokens(foundationToken)
}

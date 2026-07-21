import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getChartV3DarkTokens } from './chartV3.dark.tokens'
import { getChartV3LightTokens } from './chartV3.light.tokens'
import type { ResponsiveChartV3Tokens } from './chartV3.tokens.types'

export type {
    ChartV3TokensType,
    ResponsiveChartV3Tokens,
} from './chartV3.tokens.types'

export const getChartV3Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveChartV3Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getChartV3DarkTokens(foundationToken)
    }

    return getChartV3LightTokens(foundationToken)
}

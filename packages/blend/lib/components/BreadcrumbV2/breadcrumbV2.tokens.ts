import { FoundationTokenType } from '../../tokens/theme.token'
import { getBreadcrumbV2LightTokens } from './breadcrumbV2.light.tokens'
import { Theme } from '../../context/theme.enum'
import { getBreadcrumbV2DarkTokens } from './breadcrumbV2.dark.tokens'
import type { ResponsiveBreadcrumbV2Tokens } from './breadcrumbV2.tokens.types'

export type {
    BreadcrumbV2State,
    BreadcrumbV2TokensType,
    ResponsiveBreadcrumbV2Tokens,
} from './breadcrumbV2.tokens.types'

export const getBreadcrumbV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveBreadcrumbV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getBreadcrumbV2DarkTokens(foundationToken)
    }

    return getBreadcrumbV2LightTokens(foundationToken)
}

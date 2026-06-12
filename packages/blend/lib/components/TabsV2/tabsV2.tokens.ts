import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTabsV2LightTokens } from './tabsV2.light.tokens'
import { getTabsV2DarkTokens } from './tabsV2.dark.tokens'
import type { ResponsiveTabsV2Tokens } from './tabsV2.tokens.types'

export type {
    ResponsiveTabsV2Tokens,
    TabsV2TokensType,
} from './tabsV2.tokens.types'

export const getTabsV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTabsV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTabsV2DarkTokens(foundationToken)
    }

    return getTabsV2LightTokens(foundationToken)
}

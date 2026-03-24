import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTabsV2DarkTokens } from './tabsV2.dark.tokens'
import { getTabsV2LightTokens } from './tabsV2.light.tokens'

export type {
    TabsV2TokensType,
    ResponsiveTabsV2Tokens,
} from './tabsV2.tokens.schema'
export {
    buildResponsiveTabsV2Tokens,
    buildTabsV2TokensForBreakpoint,
} from './tabsV2.tokens.build'
export { getTabsV2Primitives } from './tabsV2.tokens.primitives'

export const getTabsV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
) => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTabsV2DarkTokens(foundationToken)
    }

    return getTabsV2LightTokens(foundationToken)
}

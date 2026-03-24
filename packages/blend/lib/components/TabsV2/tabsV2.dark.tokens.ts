import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveTabsV2Tokens } from './tabsV2.tokens.schema'
import { buildResponsiveTabsV2Tokens } from './tabsV2.tokens.build'

export const getTabsV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTabsV2Tokens =>
    buildResponsiveTabsV2Tokens(foundationToken, 'dark')

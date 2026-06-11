import type { FoundationTokenType } from '../../../tokens/theme.token'

import { Theme } from '../../../context/theme.enum'
import { getSearchInputV2DarkTokens } from './SearchInputV2.dark.tokens'
import { getSearchInputV2LightTokens } from './SearchInputV2.light.tokens'
import type { ResponsiveSearchInputV2Tokens } from './SearchInputV2.tokens.types'

export type {
    SearchInputV2TokensType,
    ResponsiveSearchInputV2Tokens,
} from './SearchInputV2.tokens.types'

export const getSearchInputV2Tokens = (
    foundationTokens: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSearchInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSearchInputV2DarkTokens(foundationTokens)
    }
    return getSearchInputV2LightTokens(foundationTokens)
}

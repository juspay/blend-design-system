import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { FOUNDATION_THEME } from '../../tokens'
import { getSelectLightTokens } from './select.light.tokens'
import { getSelectDarkTokens } from './select.dark.tokens'
import type { ResponsiveSelectTokens } from './select.tokens.types'

export type {
    SelectTokenTypes,
    ResponsiveSelectTokens,
} from './select.tokens.types'

/**
 * @deprecated Use `useComponentToken('SELECT')` or `useResponsiveTokens('SELECT')` instead.
 */
const selectTokens = getSelectLightTokens(FOUNDATION_THEME).sm

export const getSelectTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSelectTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSelectDarkTokens(foundationToken)
    }

    return getSelectLightTokens(foundationToken)
}

export default selectTokens

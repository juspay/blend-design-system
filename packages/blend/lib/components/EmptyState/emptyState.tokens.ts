import { Theme } from '../../context/theme.enum'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { getEmptyStateDarkTokens } from './emptyState.dark.tokens'
import { getEmptyStateLightTokens } from './emptyState.light.tokens'
import type { ResponsiveEmptyStateTokens } from './emptyState.tokens.types'

export type {
    EmptyStateSize,
    EmptyStateTokensType,
    ResponsiveEmptyStateTokens,
} from './emptyState.tokens.types'

export const getEmptyStateTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveEmptyStateTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getEmptyStateDarkTokens(foundationToken)
    }

    return getEmptyStateLightTokens(foundationToken)
}

import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveEmptyStateTokens } from './emptyState.tokens.types'
import { getEmptyStateLightTokens } from './emptyState.light.tokens'

export const getEmptyStateDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveEmptyStateTokens => {
    const lightTokens = getEmptyStateLightTokens(foundationToken)

    return {
        sm: {
            ...lightTokens.sm,
            sm: {
                ...lightTokens.sm.sm,
                title: {
                    ...lightTokens.sm.sm.title,
                    color: foundationToken.colors.gray[50],
                },
                description: {
                    ...lightTokens.sm.sm.description,
                    color: foundationToken.colors.gray[300],
                },
            },
            md: {
                ...lightTokens.sm.md,
                title: {
                    ...lightTokens.sm.md.title,
                    color: foundationToken.colors.gray[50],
                },
                description: {
                    ...lightTokens.sm.md.description,
                    color: foundationToken.colors.gray[300],
                },
            },
            lg: {
                ...lightTokens.sm.lg,
                title: {
                    ...lightTokens.sm.lg.title,
                    color: foundationToken.colors.gray[50],
                },
                description: {
                    ...lightTokens.sm.lg.description,
                    color: foundationToken.colors.gray[300],
                },
            },
        },
        lg: {
            ...lightTokens.lg,
            sm: {
                ...lightTokens.lg.sm,
                title: {
                    ...lightTokens.lg.sm.title,
                    color: foundationToken.colors.gray[50],
                },
                description: {
                    ...lightTokens.lg.sm.description,
                    color: foundationToken.colors.gray[300],
                },
            },
            md: {
                ...lightTokens.lg.md,
                title: {
                    ...lightTokens.lg.md.title,
                    color: foundationToken.colors.gray[50],
                },
                description: {
                    ...lightTokens.lg.md.description,
                    color: foundationToken.colors.gray[300],
                },
            },
            lg: {
                ...lightTokens.lg.lg,
                title: {
                    ...lightTokens.lg.lg.title,
                    color: foundationToken.colors.gray[50],
                },
                description: {
                    ...lightTokens.lg.lg.description,
                    color: foundationToken.colors.gray[300],
                },
            },
        },
    }
}

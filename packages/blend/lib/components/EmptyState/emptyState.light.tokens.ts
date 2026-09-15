import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveEmptyStateTokens } from './emptyState.tokens.types'

export const getEmptyStateLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveEmptyStateTokens => {
    const tokens = {
        sm: {
            layout: {
                minHeight: foundationToken.unit[144],
                maxWidth: foundationToken.unit[350],
                padding: foundationToken.unit[16],
                gap: foundationToken.unit[12],
                contentGap: foundationToken.unit[4],
                actionGap: foundationToken.unit[8],
            },
            title: {
                fontSize: foundationToken.font.size.heading.sm.fontSize,
                lineHeight: foundationToken.font.size.heading.sm.lineHeight,
                fontWeight: foundationToken.font.weight[600],
                color: foundationToken.colors.gray[800],
            },
            description: {
                fontSize: foundationToken.font.size.body.sm.fontSize,
                lineHeight: foundationToken.font.size.body.sm.lineHeight,
                color: foundationToken.colors.gray[600],
            },
        },
        md: {
            layout: {
                minHeight: foundationToken.unit[200],
                maxWidth: foundationToken.unit[350],
                padding: foundationToken.unit[24],
                gap: foundationToken.unit[16],
                contentGap: foundationToken.unit[8],
                actionGap: foundationToken.unit[8],
            },
            title: {
                fontSize: foundationToken.font.size.heading.md.fontSize,
                lineHeight: foundationToken.font.size.heading.md.lineHeight,
                fontWeight: foundationToken.font.weight[600],
                color: foundationToken.colors.gray[800],
            },
            description: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                lineHeight: foundationToken.font.size.body.md.lineHeight,
                color: foundationToken.colors.gray[600],
            },
        },
        lg: {
            layout: {
                minHeight: foundationToken.unit[280],
                maxWidth: foundationToken.unit[350],
                padding: foundationToken.unit[32],
                gap: foundationToken.unit[20],
                contentGap: foundationToken.unit[8],
                actionGap: foundationToken.unit[12],
            },
            title: {
                fontSize: foundationToken.font.size.heading.lg.fontSize,
                lineHeight: foundationToken.font.size.heading.lg.lineHeight,
                fontWeight: foundationToken.font.weight[600],
                color: foundationToken.colors.gray[800],
            },
            description: {
                fontSize: foundationToken.font.size.body.lg.fontSize,
                lineHeight: foundationToken.font.size.body.lg.lineHeight,
                color: foundationToken.colors.gray[600],
            },
        },
    }

    return { sm: tokens, lg: tokens }
}

import { CardVariant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { CardTokenType, ResponsiveCardTokens } from './card.tokens.types'

const getCardDarkToken = (
    foundationToken: FoundationTokenType
): CardTokenType => ({
    maxWidth: 'auto',
    borderRadius: foundationToken.border.radius[12],
    border: `1px solid ${foundationToken.colors.gray[700]}`,
    boxShadow: foundationToken.shadows.sm,
    backgroundColor: foundationToken.colors.gray[900],
    padding: {
        [CardVariant.DEFAULT]: {
            x: foundationToken.unit[16],
            y: foundationToken.unit[16],
        },
        [CardVariant.ALIGNED]: {
            x: foundationToken.unit[16],
            y: foundationToken.unit[16],
        },
        [CardVariant.CUSTOM]: undefined,
    },
    header: {
        [CardVariant.DEFAULT]: {
            backgroundColor: foundationToken.colors.gray[800],
            padding: {
                x: foundationToken.unit[16],
                y: foundationToken.unit[12],
            },
            borderBottom: `1px solid ${foundationToken.colors.gray[700]}`,
        },
        [CardVariant.ALIGNED]: undefined,
        [CardVariant.CUSTOM]: undefined,
        text: {
            title: {
                fontSize: foundationToken.font.size.body.lg.fontSize,
                fontWeight: foundationToken.font.weight[600],
                color: foundationToken.colors.gray[50],
                gap: foundationToken.unit[8],
            },
            subTitle: {
                fontSize: foundationToken.font.size.body.sm.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: foundationToken.colors.gray[300],
            },
            gap: foundationToken.unit[2],
        },
    },
    body: {
        padding: {
            [CardVariant.DEFAULT]: {
                x: foundationToken.unit[16],
                y: foundationToken.unit[16],
            },
            [CardVariant.ALIGNED]: undefined,
            [CardVariant.CUSTOM]: undefined,
        },
        gap: {
            [CardVariant.DEFAULT]: foundationToken.unit[16],
            [CardVariant.ALIGNED]: foundationToken.unit[16],
            [CardVariant.CUSTOM]: foundationToken.unit[16],
        },
        text: {
            title: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: foundationToken.colors.gray[50],
            },
            content: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                color: foundationToken.colors.gray[300],
                fontWeight: foundationToken.font.weight[400],
            },
            gap: foundationToken.unit[6],
        },
        actions: {
            gap: foundationToken.unit[14],
            centerAlignGap: foundationToken.unit[24],
        },
        alignment: {
            [CardVariant.ALIGNED]: {
                cardSlot: {
                    vertical: {
                        marginBottom: foundationToken.unit[16],
                        minHeight: '142px',
                    },
                    horizontal: {
                        marginRight: foundationToken.unit[16],
                        width: foundationToken.unit[92],
                        height: foundationToken.unit[92],
                    },
                },
            },
            [CardVariant.DEFAULT]: undefined,
            [CardVariant.CUSTOM]: undefined,
        },
    },
})

export const getCardDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCardTokens => {
    const tokens = getCardDarkToken(foundationToken)
    return { sm: tokens, lg: tokens }
}

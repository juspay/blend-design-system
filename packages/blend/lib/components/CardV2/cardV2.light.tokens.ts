import type { FoundationTokenType } from '../../tokens/theme.token'
import { CardV2Orientation, CardV2Padding, CardV2Variant } from './cardV2.types'
import type { ResponsiveCardV2Tokens } from './cardV2.tokens.types'

export const getCardV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCardV2Tokens => {
    const lgTokens = {
        width: '100%',
        minWidth: '0',
        maxWidth: '100%',
        borderRadius: foundationToken.border.radius[12],
        border: {
            [CardV2Variant.OUTLINED]: `1px solid ${foundationToken.colors.gray[200]}`,
            [CardV2Variant.ELEVATED]: `1px solid ${foundationToken.colors.gray[100]}`,
            [CardV2Variant.GHOST]: '1px solid transparent',
        },
        backgroundColor: {
            [CardV2Variant.OUTLINED]: foundationToken.colors.gray[0],
            [CardV2Variant.ELEVATED]: foundationToken.colors.gray[0],
            [CardV2Variant.GHOST]: 'transparent',
        },
        boxShadow: {
            [CardV2Variant.OUTLINED]: 'none',
            [CardV2Variant.ELEVATED]: foundationToken.shadows.sm,
            [CardV2Variant.GHOST]: 'none',
        },
        state: {
            hover: {
                border: `1px solid ${foundationToken.colors.gray[300]}`,
                boxShadow: foundationToken.shadows.sm,
            },
            selected: {
                border: `1px solid ${foundationToken.colors.primary[500]}`,
                boxShadow: `0 0 0 3px ${foundationToken.colors.primary[50]}`,
            },
            focus: {
                outline: `2px solid ${foundationToken.colors.primary[500]}`,
                outlineOffset: foundationToken.unit[2],
            },
        },
        padding: {
            [CardV2Padding.NONE]: {
                x: '0',
                y: '0',
            },
            [CardV2Padding.COMPACT]: {
                x: foundationToken.unit[10],
                y: foundationToken.unit[10],
            },
            [CardV2Padding.COMFORTABLE]: {
                x: foundationToken.unit[12],
                y: foundationToken.unit[12],
            },
        },
        layout: {
            gap: foundationToken.unit[10],
            mediaGap: {
                [CardV2Orientation.VERTICAL]: foundationToken.unit[10],
                [CardV2Orientation.HORIZONTAL]: foundationToken.unit[12],
            },
        },
        media: {
            width: foundationToken.unit[64],
            height: foundationToken.unit[64],
            minHeight: '96px',
            borderRadius: foundationToken.border.radius[8],
            backgroundColor: foundationToken.colors.gray[50],
        },
        header: {
            gap: foundationToken.unit[6],
            eyebrow: {
                fontSize: foundationToken.font.fontSize[12],
                fontWeight: foundationToken.font.weight[600],
                lineHeight: foundationToken.font.lineHeight[18],
                color: foundationToken.colors.gray[500],
            },
            title: {
                fontSize: foundationToken.font.fontSize[16],
                fontWeight: foundationToken.font.weight[600],
                lineHeight: foundationToken.font.lineHeight[24],
                color: foundationToken.colors.gray[800],
            },
            subtitle: {
                fontSize: foundationToken.font.fontSize[14],
                fontWeight: foundationToken.font.weight[500],
                lineHeight: foundationToken.font.lineHeight[20],
                color: foundationToken.colors.gray[500],
            },
        },
        body: {
            gap: foundationToken.unit[10],
            description: {
                fontSize: foundationToken.font.fontSize[14],
                fontWeight: foundationToken.font.weight[400],
                lineHeight: foundationToken.font.lineHeight[20],
                color: foundationToken.colors.gray[600],
            },
        },
        footer: {
            gap: foundationToken.unit[8],
            paddingTop: foundationToken.unit[10],
            borderTop: `1px solid ${foundationToken.colors.gray[100]}`,
        },
        actions: {
            gap: foundationToken.unit[8],
        },
    }

    const smTokens = {
        ...lgTokens,
        borderRadius: foundationToken.border.radius[8],
        padding: {
            [CardV2Padding.NONE]: {
                x: '0',
                y: '0',
            },
            [CardV2Padding.COMPACT]: {
                x: foundationToken.unit[8],
                y: foundationToken.unit[8],
            },
            [CardV2Padding.COMFORTABLE]: {
                x: foundationToken.unit[10],
                y: foundationToken.unit[10],
            },
        },
        layout: {
            gap: foundationToken.unit[8],
            mediaGap: {
                [CardV2Orientation.VERTICAL]: foundationToken.unit[8],
                [CardV2Orientation.HORIZONTAL]: foundationToken.unit[10],
            },
        },
        media: {
            ...lgTokens.media,
            width: foundationToken.unit[56],
            height: foundationToken.unit[56],
            minHeight: '80px',
        },
        header: {
            ...lgTokens.header,
            gap: foundationToken.unit[4],
            title: {
                ...lgTokens.header.title,
                fontSize: foundationToken.font.fontSize[14],
                lineHeight: foundationToken.font.lineHeight[20],
            },
            subtitle: {
                ...lgTokens.header.subtitle,
                fontSize: foundationToken.font.fontSize[12],
                lineHeight: foundationToken.font.lineHeight[18],
            },
        },
        body: {
            ...lgTokens.body,
            gap: foundationToken.unit[8],
            description: {
                ...lgTokens.body.description,
                fontSize: foundationToken.font.fontSize[12],
                lineHeight: foundationToken.font.lineHeight[18],
            },
        },
        footer: {
            ...lgTokens.footer,
            gap: foundationToken.unit[6],
            paddingTop: foundationToken.unit[8],
        },
        actions: {
            gap: foundationToken.unit[6],
        },
    }

    return {
        sm: smTokens,
        lg: lgTokens,
    }
}

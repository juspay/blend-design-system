import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveTopbarV2Tokens } from './topbarV2.tokens.types'

export const getTopbarV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTopbarV2Tokens => ({
    sm: {
        zIndex: '10',
        height: foundationToken.unit[48],
        borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
        backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: `${foundationToken.unit[5]} ${foundationToken.unit[16]}`,
        gap: foundationToken.unit[12],
        separator: {
            width: '1.5px',
            color: foundationToken.colors.gray[200],
        },
        toggleButton: {
            borderRadius: foundationToken.border.radius[10],
            padding: foundationToken.unit[9],
            backgroundColor: {
                default: 'transparent',
                hover: foundationToken.colors.gray[100],
                active: foundationToken.colors.gray[150],
            },
            transition: 'background-color 0.15s ease',
            icon: {
                size: foundationToken.unit[16],
                color: foundationToken.colors.gray[600],
            },
        },
        actionButton: {
            borderRadius: foundationToken.border.radius[8],
            padding: foundationToken.unit[8],
            minWidth: foundationToken.unit[40],
            height: foundationToken.unit[40],
            backgroundColor: {
                default: 'transparent',
                hover: foundationToken.colors.gray[100],
                active: foundationToken.colors.gray[150],
            },
            transition: 'background-color 0.15s ease',
            icon: {
                size: foundationToken.unit[20],
                color: foundationToken.colors.gray[600],
            },
        },
        tenantIconButton: {
            borderRadius: foundationToken.border.radius[8],
            minHeight: foundationToken.unit[36],
            backgroundColor: {
                default: 'transparent',
                hover: foundationToken.colors.gray[100],
                active: foundationToken.colors.gray[150],
            },
            transition: 'background-color 0.15s ease',
        },
        merchantSelectTrigger: {
            gap: foundationToken.unit[6],
            icon: {
                size: foundationToken.unit[14],
                color: foundationToken.colors.gray[600],
            },
            text: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[600],
                color: foundationToken.colors.gray[800],
            },
        },
        leftSection: {
            gap: foundationToken.unit[6],
            maxHeight: '26px',
            divider: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: foundationToken.colors.gray[400],
            },
        },
        rightSection: { gap: foundationToken.unit[8] },
        sidebarSection: { gap: foundationToken.unit[16] },
    },
    lg: {
        zIndex: '10',
        height: foundationToken.unit[48],
        borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
        backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: `${foundationToken.unit[5]} ${foundationToken.unit[32]}`,
        gap: foundationToken.unit[16],
        separator: {
            width: '1.5px',
            color: foundationToken.colors.gray[200],
        },
        toggleButton: {
            borderRadius: foundationToken.border.radius[10],
            padding: foundationToken.unit[10],
            backgroundColor: {
                default: 'transparent',
                hover: foundationToken.colors.gray[100],
                active: foundationToken.colors.gray[150],
            },
            transition: 'background-color 0.15s ease',
            icon: {
                size: foundationToken.unit[16],
                color: foundationToken.colors.gray[600],
            },
        },
        actionButton: {
            borderRadius: foundationToken.border.radius[8],
            padding: foundationToken.unit[8],
            minWidth: foundationToken.unit[40],
            height: foundationToken.unit[36],
            backgroundColor: {
                default: 'transparent',
                hover: foundationToken.colors.gray[100],
                active: foundationToken.colors.gray[150],
            },
            transition: 'background-color 0.15s ease',
            icon: {
                size: foundationToken.unit[20],
                color: foundationToken.colors.gray[600],
            },
        },
        tenantIconButton: {
            borderRadius: foundationToken.border.radius[8],
            minHeight: foundationToken.unit[36],
            backgroundColor: {
                default: 'transparent',
                hover: foundationToken.colors.gray[100],
                active: foundationToken.colors.gray[150],
            },
            transition: 'background-color 0.15s ease',
        },
        merchantSelectTrigger: {
            gap: foundationToken.unit[6],
            icon: {
                size: foundationToken.unit[14],
                color: foundationToken.colors.gray[600],
            },
            text: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[600],
                color: foundationToken.colors.gray[800],
            },
        },
        leftSection: {
            gap: foundationToken.unit[6],
            maxHeight: '26px',
            divider: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: foundationToken.colors.gray[400],
            },
        },
        rightSection: { gap: foundationToken.unit[8] },
        sidebarSection: { gap: foundationToken.unit[16] },
    },
})

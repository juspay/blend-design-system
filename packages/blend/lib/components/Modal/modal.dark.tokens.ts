import type { FoundationTokenType } from '../../tokens/theme.token'
import type {
    ModalTokensType,
    ResponsiveModalTokens,
} from './modal.tokens.types'

const getModalDarkToken = (
    foundationToken: FoundationTokenType,
    isLarge: boolean
): ModalTokensType => ({
    boxShadow: isLarge
        ? foundationToken.shadows.lg
        : foundationToken.shadows.xs,
    borderRadius: isLarge
        ? foundationToken.border.radius[16]
        : foundationToken.border.radius[12],
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    header: {
        padding: {
            x: isLarge ? foundationToken.unit[20] : foundationToken.unit[16],
            y: isLarge ? foundationToken.unit[20] : foundationToken.unit[16],
        },
        borderBottom: `1px solid ${foundationToken.colors.gray[600]}`,
        backgroundColor: foundationToken.colors.gray[700],
        text: {
            title: {
                color: foundationToken.colors.gray[0],
                fontSize: isLarge
                    ? foundationToken.font.size.body.lg.fontSize
                    : foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[600],
            },
            subtitle: {
                color: foundationToken.colors.gray[100],
                fontSize: isLarge
                    ? foundationToken.font.size.body.md.fontSize
                    : foundationToken.font.size.body.sm.fontSize,
                fontWeight: foundationToken.font.weight[400],
            },
        },
    },
    body: {
        padding: isLarge ? foundationToken.unit[20] : foundationToken.unit[16],
        backgroundColor: foundationToken.colors.gray[700],
    },
    footer: {
        padding: isLarge ? foundationToken.unit[20] : foundationToken.unit[16],
        borderTop: `1px solid ${foundationToken.colors.gray[600]}`,
        backgroundColor: foundationToken.colors.gray[700],
        gap: isLarge ? foundationToken.unit[16] : foundationToken.unit[12],
    },
    closeButton: {
        color: foundationToken.colors.gray[100],
    },
})

export const getModalDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveModalTokens => ({
    sm: getModalDarkToken(foundationToken, false),
    lg: getModalDarkToken(foundationToken, true),
})

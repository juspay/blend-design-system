import type { FoundationTokenType } from '../../tokens/theme.token'
import type {
    ResponsiveUploadTokens,
    UploadTokenType,
} from './upload.tokens.types'

const getUploadDarkToken = (
    foundationToken: FoundationTokenType,
    isLarge: boolean
): UploadTokenType => ({
    header: {
        label: {
            text: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: foundationToken.colors.gray[100],
            },
            marginBottom: foundationToken.unit[8],
            gap: foundationToken.unit[2],
        },
        required: {
            text: {
                color: foundationToken.colors.red[400],
            },
            gap: foundationToken.unit[8],
        },
        subLabel: {
            text: {
                fontSize: foundationToken.font.size.body.sm.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: foundationToken.colors.gray[400],
            },
            gap: foundationToken.unit[8],
        },
        helpIcon: {
            width: foundationToken.unit[16],
            color: foundationToken.colors.gray[400],
        },
    },
    container: {
        border: {
            idle: `1px dashed ${foundationToken.colors.gray[700]}`,
            uploading: `1px dashed ${foundationToken.colors.gray[700]}`,
            success: `1px dashed ${foundationToken.colors.gray[700]}`,
            error: `1px dashed ${foundationToken.colors.red[800]}`,
            dragActive: `1px dashed ${foundationToken.colors.primary[500]}`,
        },
        backgroundColor: {
            idle: foundationToken.colors.gray[900],
            uploading: foundationToken.colors.gray[900],
            success: foundationToken.colors.gray[900],
            error: foundationToken.colors.gray[900],
            dragActive: foundationToken.colors.primary[950],
        },
        borderRadius: foundationToken.border.radius[12],
        padding: isLarge
            ? `${foundationToken.unit[32]} ${foundationToken.unit[40]}`
            : `${foundationToken.unit[24]} ${foundationToken.unit[32]}`,
        content: {
            slot: {
                width: foundationToken.unit[32],
                gap: isLarge
                    ? foundationToken.unit[20]
                    : foundationToken.unit[16],
            },
            text: {
                title: {
                    color: foundationToken.colors.gray[100],
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                },
                subtitle: {
                    color: foundationToken.colors.gray[400],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                },
                gap: foundationToken.unit[4],
            },
            actionable: {
                gap: isLarge
                    ? foundationToken.unit[24]
                    : foundationToken.unit[20],
                errorText: {
                    color: foundationToken.colors.red[400],
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                },
            },
        },
    },
})

export const getUploadDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveUploadTokens => ({
    sm: getUploadDarkToken(foundationToken, false),
    lg: getUploadDarkToken(foundationToken, true),
})

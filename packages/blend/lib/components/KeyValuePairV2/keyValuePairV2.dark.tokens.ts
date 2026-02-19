import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveKeyValuePairV2Tokens } from './KeyValuePairV2.tokens'
import { KeyValuePairV2Size } from './KeyValuePairV2.types'

export const getKeyValuePairV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveKeyValuePairV2Tokens => {
    return {
        sm: {
            gap: {
                vertical: foundationToken.unit[4],
                horizontal: foundationToken.unit[32],
            },
            key: {
                color: foundationToken.colors.gray[500],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                gap: foundationToken.unit[8],
            },
            value: {
                color: foundationToken.colors.gray[700],
                fontSize: {
                    [KeyValuePairV2Size.SMALL]:
                        foundationToken.font.size.body.md.fontSize,
                    [KeyValuePairV2Size.MEDIUM]:
                        foundationToken.font.size.body.lg.fontSize,
                    [KeyValuePairV2Size.LARGE]: 18,
                },
                fontWeight: foundationToken.font.weight[600],
                gap: foundationToken.unit[8],
                slot: {
                    color: foundationToken.colors.gray[50],
                },
            },
        },
        lg: {
            gap: {
                vertical: foundationToken.unit[4],
                horizontal: foundationToken.unit[32],
            },
            key: {
                color: foundationToken.colors.gray[50],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                gap: foundationToken.unit[8],
            },
            value: {
                color: foundationToken.colors.gray[400],
                fontSize: {
                    [KeyValuePairV2Size.SMALL]:
                        foundationToken.font.size.body.md.fontSize,
                    [KeyValuePairV2Size.MEDIUM]:
                        foundationToken.font.size.body.lg.fontSize,
                    [KeyValuePairV2Size.LARGE]:
                        foundationToken.font.size.heading.sm.fontSize,
                },
                fontWeight: foundationToken.font.weight[600],
                gap: foundationToken.unit[8],
                slot: {
                    color: foundationToken.colors.gray[400],
                },
            },
        },
    }
}

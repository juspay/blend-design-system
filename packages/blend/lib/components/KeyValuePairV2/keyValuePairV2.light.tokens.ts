import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveKeyValuePairV2Tokens } from './keyValuePairV2.tokens'
import { KeyValuePairV2Size } from './keyValuePairV2.types'

export const getKeyValuePairV2LightTokens = (
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
                fontSize: foundationToken.font.size.body.md.fontSize, // 14px
                fontWeight: foundationToken.font.weight[400], // 400
                gap: foundationToken.unit[8], // 8px
            },
            value: {
                color: foundationToken.colors.gray[700],
                fontSize: {
                    [KeyValuePairV2Size.SM]:
                        foundationToken.font.size.body.md.fontSize, // 14px
                    [KeyValuePairV2Size.MD]:
                        foundationToken.font.size.body.lg.fontSize, // 16px
                    [KeyValuePairV2Size.LG]: 18, // 18px
                },
                fontWeight: foundationToken.font.weight[600], // 600
                gap: foundationToken.unit[8], // 8px
            },
        },
        lg: {
            gap: {
                vertical: foundationToken.unit[4],
                horizontal: foundationToken.unit[32],
            },
            key: {
                color: foundationToken.colors.gray[500],
                fontSize: foundationToken.font.size.body.md.fontSize, // 14px (was lg.fontSize which is 16px)
                fontWeight: foundationToken.font.weight[400], // 400
                gap: foundationToken.unit[8], // 8px
            },
            value: {
                color: foundationToken.colors.gray[700],
                fontSize: {
                    [KeyValuePairV2Size.SM]:
                        foundationToken.font.size.body.md.fontSize, // 14px
                    [KeyValuePairV2Size.MD]:
                        foundationToken.font.size.body.lg.fontSize, // 16px
                    [KeyValuePairV2Size.LG]:
                        foundationToken.font.size.heading.sm.fontSize, // 18px
                },
                fontWeight: foundationToken.font.weight[600], // 600
                gap: foundationToken.unit[8], // 8px
            },
        },
    }
}

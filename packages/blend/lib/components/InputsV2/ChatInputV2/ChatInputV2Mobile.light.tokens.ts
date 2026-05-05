import { FoundationTokenType } from '../../../tokens/theme.token'
import { InputStateV2 } from '../inputV2.types'
import { ChatInputV2MobileTokensType } from './ChatInputV2Mobile.tokens'
export const getChatInputV2MobileLightTokens = (
    foundationToken: FoundationTokenType
): ChatInputV2MobileTokensType => {
    return {
        gap: foundationToken.unit[8],
        attachmentButtonDimensions: {
            width: foundationToken.unit[44],
            height: foundationToken.unit[44],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.unit[48],
            backgroundColor: {
                [InputStateV2.DEFAULT]: foundationToken.colors.gray[0],
                [InputStateV2.HOVER]: foundationToken.colors.gray[0],
                [InputStateV2.FOCUS]: foundationToken.colors.gray[0],
                [InputStateV2.DISABLED]: foundationToken.colors.gray[50],
                [InputStateV2.ERROR]: foundationToken.colors.gray[0],
            },
            color: foundationToken.colors.gray[900],
        },
        inputContainer: {
            width: foundationToken.unit[100],
            height: foundationToken.unit[100],
            minHeight: foundationToken.unit[48],
            maxHeight: foundationToken.unit[150],
            minWidth: foundationToken.unit[100],
            maxWidth: foundationToken.unit[100],
            backgroundColor: foundationToken.colors.gray[0],
            border: {
                [InputStateV2.DEFAULT]: `1px solid ${foundationToken.colors.gray[200]}`,
                [InputStateV2.HOVER]: `1px solid ${foundationToken.colors.gray[200]}`,
                [InputStateV2.FOCUS]: `1px solid ${foundationToken.colors.primary[500]}`,
                [InputStateV2.DISABLED]: `1px solid ${foundationToken.colors.gray[200]}`,
                [InputStateV2.ERROR]: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            borderRadius: {
                [InputStateV2.DEFAULT]: foundationToken.unit[48],
                [InputStateV2.HOVER]: foundationToken.unit[48],
                [InputStateV2.FOCUS]: foundationToken.unit[12],
                [InputStateV2.DISABLED]: foundationToken.unit[48],
                [InputStateV2.ERROR]: foundationToken.unit[48],
            },
            boxShadow: {
                [InputStateV2.DEFAULT]: 'none',
                [InputStateV2.HOVER]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                [InputStateV2.FOCUS]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                [InputStateV2.DISABLED]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                [InputStateV2.ERROR]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
            },
            paddingLeft: foundationToken.unit[12],
            paddingTop: foundationToken.unit[10],
            paddingBottom: foundationToken.unit[10],
            lineHeight: foundationToken.unit[20],
            color: foundationToken.colors.gray[900],
            fontSize: foundationToken.unit[14],
            fontWeight: foundationToken.font.weight[500],
            placeholder: {
                color: foundationToken.colors.gray[500],
            },
        },
        secondaryAction: {
            color: foundationToken.colors.gray[0],
            width: foundationToken.unit[36],
            height: foundationToken.unit[36],
            borderRadius: foundationToken.unit[48],
            right: foundationToken.unit[3],
            bottom: foundationToken.unit[5],
            backgroundColor: {
                [InputStateV2.DEFAULT]: foundationToken.colors.primary[500],
                [InputStateV2.HOVER]: foundationToken.colors.primary[500],
                [InputStateV2.FOCUS]: foundationToken.colors.primary[500],
                [InputStateV2.DISABLED]: foundationToken.colors.gray[100],
                [InputStateV2.ERROR]: foundationToken.colors.primary[500],
            },
        },
    }
}

import type { FoundationTokenType } from '../../tokens/theme.token'
import type {
    ButtonGroupTokensType,
    ResponsiveButtonGroupTokens,
} from './buttonGroup.tokens.types'

export const getButtonGroupLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveButtonGroupTokens => {
    const baseTokens: ButtonGroupTokensType = {
        gap: {
            default: foundationToken.unit[10],
            stacked: foundationToken.unit[0],
        },
        separator: {
            width: foundationToken.border.width[1],
            color: foundationToken.colors.gray[200],
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}

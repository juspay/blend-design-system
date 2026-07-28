import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getChatInputV2MobileDarkTokens } from './ChatInputV2Mobile.dark.tokens'
import { getChatInputV2MobileLightTokens } from './ChatInputV2Mobile.light.tokens'
import type { ChatInputV2MobileTokensType } from './ChatInputV2Mobile.tokens.types'

export type {
    Dimensions,
    ChatInputV2MobileTokensType,
} from './ChatInputV2Mobile.tokens.types'

export const getChatInputV2MobileTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ChatInputV2MobileTokensType => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getChatInputV2MobileDarkTokens(foundationToken)
    }
    return getChatInputV2MobileLightTokens(foundationToken)
}

export default getChatInputV2MobileTokens

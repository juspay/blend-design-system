import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getChatInputV2DarkTokens } from './ChatInputV2.dark.tokens'
import { getChatInputV2LightTokens } from './ChatInputV2.light.tokens'
import type { ResponsiveChatInputV2TokensType } from './ChatInputV2.tokens.types'

export type {
    ChatInputV2TokensType,
    ResponsiveChatInputV2TokensType,
} from './ChatInputV2.tokens.types'

export const getChatInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveChatInputV2TokensType => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getChatInputV2DarkTokens(foundationToken)
    }
    return getChatInputV2LightTokens(foundationToken)
}

export default getChatInputV2Tokens

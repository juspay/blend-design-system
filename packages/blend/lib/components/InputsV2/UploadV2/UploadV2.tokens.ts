import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getUploadV2DarkTokens } from './UploadV2.dark.tokens'
import { getUploadV2LightTokens } from './UploadV2.light.tokens'
import type { ResponsiveUploadV2Tokens } from './UploadV2.tokens.types'

export type {
    UploadV2TokensType,
    ResponsiveUploadV2Tokens,
} from './UploadV2.tokens.types'

export const getUploadV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveUploadV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getUploadV2DarkTokens(foundationToken)
    }
    return getUploadV2LightTokens(foundationToken)
}

import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getUploadDarkTokens } from './upload.dark.tokens'
import { getUploadLightTokens } from './upload.light.tokens'
import type { ResponsiveUploadTokens } from './upload.tokens.types'

export type {
    UploadState,
    UploadTokenType,
    ResponsiveUploadTokens,
} from './upload.tokens.types'

export const getUploadTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveUploadTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getUploadDarkTokens(foundationToken)
    }

    return getUploadLightTokens(foundationToken)
}

export default getUploadTokens

import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getCodeBlockLightTokens } from './codeBlock.light.tokens'
import { getCodeBlockDarkTokens } from './codeBlock.dark.tokens'
import type { ResponsiveCodeBlockTokens } from './codeBlock.tokens.types'

export type {
    CodeBlockTokenType,
    ResponsiveCodeBlockTokens,
} from './codeBlock.tokens.types'

export const getCodeBlockTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCodeBlockTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getCodeBlockDarkTokens(foundationToken)
    }
    return getCodeBlockLightTokens(foundationToken)
}

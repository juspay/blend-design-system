import { FoundationTokenType } from '../../tokens/theme.token'
import { getDirectoryLightTokens } from './directory.light.tokens'
import { getDirectoryDarkTokens } from './directory.dark.tokens'
import { Theme } from '../../context/theme.enum'
import type { ResponsiveDirectoryTokens } from './directory.tokens.types'

export type {
    ResponsiveDirectoryTokens,
    DirectoryTokenType,
    DirectoryState,
} from './directory.tokens.types'

export const getDirectoryTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveDirectoryTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getDirectoryDarkTokens(foundationToken)
    }
    return getDirectoryLightTokens(foundationToken)
}

export default getDirectoryTokens

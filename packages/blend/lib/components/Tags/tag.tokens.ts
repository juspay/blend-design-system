import { FoundationTokenType } from '../../tokens/theme.token'
import { getTagLightTokens } from './tag.light.tokens'
import { getTagDarkTokens } from './tag.dark.tokens'
import { Theme } from '../../context/theme.enum'
import type { ResponsiveTagTokens } from './tag.tokens.types'

export type { ResponsiveTagTokens, TagTokensType } from './tag.tokens.types'

export const getTagTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTagTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTagDarkTokens(foundationToken)
    }

    return getTagLightTokens(foundationToken)
}

export default getTagTokens

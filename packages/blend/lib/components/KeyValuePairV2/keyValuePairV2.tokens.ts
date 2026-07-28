import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getKeyValuePairV2LightTokens } from './keyValuePairV2.light.tokens'
import { getKeyValuePairV2DarkTokens } from './keyValuePairV2.dark.tokens'
import type { ResponsiveKeyValuePairV2Tokens } from './keyValuePairV2.tokens.types'

export type {
    KeyValuePairV2TokensType,
    ResponsiveKeyValuePairV2Tokens,
} from './keyValuePairV2.tokens.types'

export const getKeyValuePairV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveKeyValuePairV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getKeyValuePairV2DarkTokens(foundationToken)
    }

    return getKeyValuePairV2LightTokens(foundationToken)
}

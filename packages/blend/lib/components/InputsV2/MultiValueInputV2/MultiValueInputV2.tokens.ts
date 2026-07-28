import { Theme } from '../../../context/theme.enum'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { getMultiValueInputV2DarkTokens } from './MultiValueInputV2.dark.tokens'
import { getMultiValueInputV2LightTokens } from './MultiValueInputV2.light.tokens'
import type { ResponsiveMultiValueInputV2Tokens } from './MultiValueInputV2.tokens.types'

export type {
    MultiValueInputV2TokensType,
    ResponsiveMultiValueInputV2Tokens,
} from './MultiValueInputV2.tokens.types'

export const getMultiValueInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMultiValueInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMultiValueInputV2DarkTokens(foundationToken)
    }
    return getMultiValueInputV2LightTokens(foundationToken)
}

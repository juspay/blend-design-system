import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getMultiSelectV2LightTokens } from './multiSelectV2.light.tokens'
import { getMultiSelectV2DarkTokens } from './multiSelectV2.dark.tokens'
import type { ResponsiveMultiSelectV2Tokens } from './multiSelectV2.tokens.types'

export type {
    MultiSelectV2TriggerStates,
    MultiSelectV2ItemStates,
    MultiSelectV2TokensType,
    ResponsiveMultiSelectV2Tokens,
} from './multiSelectV2.tokens.types'

export const getMultiSelectV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMultiSelectV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMultiSelectV2DarkTokens(foundationToken)
    }
    return getMultiSelectV2LightTokens(foundationToken)
}

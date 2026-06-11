import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSingleSelectV2LightTokens } from './singleSelectV2.light.tokens'
import { getSingleSelectV2DarkTokens } from './singleSelectV2.dark.tokens'
import type { ResponsiveSingleSelectV2Tokens } from './singleSelectV2.tokens.types'

export type {
    SingleSelectV2ItemStates,
    SingleSelectV2TriggerStates,
    SingleSelectV2TokensType,
    ResponsiveSingleSelectV2Tokens,
    SingleSelectV2MenuItemTokensType,
} from './singleSelectV2.tokens.types'

export const getSingleSelectV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSingleSelectV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSingleSelectV2DarkTokens(foundationToken)
    }
    return getSingleSelectV2LightTokens(foundationToken)
}

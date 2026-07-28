import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import type { ResponsiveMenuV2TokensType } from './menuV2.tokens.types'
import { getMenuV2LightTokens } from './menuV2.light.tokens'
import { getMenuV2DarkTokens } from './menuV2.dark.tokens'

export type { SelectV2ItemStates as MenuV2ItemStates } from '../SelectV2/selectV2.tokenStates'

export type {
    MenuV2TokensType,
    ResponsiveMenuV2TokensType,
} from './menuV2.tokens.types'

export const getMenuV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMenuV2TokensType => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMenuV2DarkTokens(foundationToken)
    }
    return getMenuV2LightTokens(foundationToken)
}

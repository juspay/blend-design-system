import { type FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getMobileNavigationV2LightTokens } from './mobile.light.tokens'
import { getMobileNavigationV2DarkTokens } from './mobile.dark.tokens'
import type { ResponsiveMobileNavigationV2Tokens } from './mobile.tokens.types'

export type {
    MobileNavigationV2State,
    MobileNavigationV2TokenType,
    ResponsiveMobileNavigationV2Tokens,
} from './mobile.tokens.types'

export const getMobileNavigationV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMobileNavigationV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMobileNavigationV2DarkTokens(foundationToken)
    }
    return getMobileNavigationV2LightTokens(foundationToken)
}

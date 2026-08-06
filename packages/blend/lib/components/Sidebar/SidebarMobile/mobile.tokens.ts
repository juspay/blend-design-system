import { type FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getMobileNavigationLightTokens } from './mobile.light.tokens'
import { getMobileNavigationDarkTokens } from './mobile.dark.tokens'
import type { ResponsiveMobileNavigationTokens } from './mobile.tokens.types'

export type {
    MobileNavigationState,
    MobileNavigationTokenType,
    ResponsiveMobileNavigationTokens,
} from './mobile.tokens.types'

export const getMobileNavigationTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMobileNavigationTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMobileNavigationDarkTokens(foundationToken)
    }
    return getMobileNavigationLightTokens(foundationToken)
}

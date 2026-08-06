import type { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getMobileDarkTokens } from './mobile.dark.tokens'
import { getMobileLightTokens } from './mobile.light.tokens'
import type { ResponsiveMobileTokens } from './mobile.tokens.types'

export type {
    MobileTokenType,
    ResponsiveMobileTokens,
} from './mobile.tokens.types'

/**
 * Mobile DateRangePicker Tokens for mobile-specific components
 *
 * Separate tokens for mobile components that have different styling requirements
 * These tokens are used by the mobile picker, its preset list, drawer surface,
 * footer, and date/time columns.
 */
export { getMobileLightTokens, getMobileDarkTokens }

export const getMobileToken = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMobileTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMobileDarkTokens(foundationToken)
    }

    return getMobileLightTokens(foundationToken)
}

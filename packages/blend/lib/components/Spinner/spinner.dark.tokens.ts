import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSpinnerTokens } from './spinner.tokens.types'

export const getSpinnerDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSpinnerTokens => {
    const tokens = {
        size: {
            sm: foundationToken.unit[16],
            md: foundationToken.unit[24],
            lg: foundationToken.unit[32],
        },
        strokeWidth: {
            sm: 2,
            md: 2.5,
            lg: 3,
        },
        colors: {
            default: foundationToken.colors.gray[300],
            primary: foundationToken.colors.primary[400],
            inverse: foundationToken.colors.gray[950],
        },
        trackColor: foundationToken.colors.gray[600],
        animation: {
            duration: '0.8s',
        },
        overlay: {
            backgroundColor: `rgba(0, 0, 0, ${foundationToken.opacity[50]})`,
            zIndex: foundationToken.zIndex[100],
        },
    }

    return { sm: tokens, lg: tokens }
}

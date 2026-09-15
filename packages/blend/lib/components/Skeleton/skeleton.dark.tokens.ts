import type { FoundationTokenType } from '../../tokens/theme.token'
import type {
    ResponsiveSkeletonTokens,
    SkeletonTokensType,
} from './skeleton.tokens.types'

export const getSkeletonDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSkeletonTokens => {
    const baseTokens: SkeletonTokensType = {
        animation: {
            duration: '1.5s',
            timingFunction: 'ease-in-out',
            iterationCount: 'infinite',
            direction: 'alternate',
        },
        colors: {
            base: foundationToken.colors.gray[800],
            highlight: foundationToken.colors.gray[700],
            shimmer: foundationToken.colors.gray[600],
        },
        borderRadius: {
            rectangle: foundationToken.border.radius[4],
            rounded: foundationToken.border.radius[8],
            circle: '50%',
        },
        spacing: {
            gap: foundationToken.unit[8],
            margin: foundationToken.unit[4],
        },
        sizes: {
            text: {
                height: '16px',
                minWidth: '100px',
            },
            avatar: {
                sm: '32px',
                md: '40px',
                lg: '48px',
            },
            button: {
                sm: {
                    height: '32px',
                    minWidth: '80px',
                },
                md: {
                    height: '36px',
                    minWidth: '100px',
                },
                lg: {
                    height: '44px',
                    minWidth: '120px',
                },
            },
        },
    }

    return {
        sm: baseTokens,
        lg: {
            ...baseTokens,
            sizes: {
                ...baseTokens.sizes,
                text: {
                    height: '18px',
                    minWidth: '120px',
                },
                avatar: {
                    sm: '36px',
                    md: '44px',
                    lg: '52px',
                },
                button: {
                    sm: {
                        height: '36px',
                        minWidth: '90px',
                    },
                    md: {
                        height: '40px',
                        minWidth: '110px',
                    },
                    lg: {
                        height: '48px',
                        minWidth: '130px',
                    },
                },
            },
        },
    }
}

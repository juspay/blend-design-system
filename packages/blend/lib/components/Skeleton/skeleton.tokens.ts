import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type SkeletonVariant = 'pulse' | 'wave' | 'shimmer'
export type SkeletonShape = 'rectangle' | 'circle' | 'rounded'

export type SkeletonTokensType = {
    animation: {
        duration: CSSObject['animationDuration']
        timingFunction: CSSObject['animationTimingFunction']
        iterationCount: CSSObject['animationIterationCount']
        direction: CSSObject['animationDirection']
    }
    colors: {
        base: CSSObject['backgroundColor']
        highlight: CSSObject['backgroundColor']
        shimmer: CSSObject['backgroundColor']
    }
    borderRadius: {
        rectangle: CSSObject['borderRadius']
        rounded: CSSObject['borderRadius']
        circle: CSSObject['borderRadius']
    }
    spacing: {
        gap: CSSObject['gap']
        margin: CSSObject['margin']
    }
    sizes: {
        text: {
            height: CSSObject['height']
            minWidth: CSSObject['minWidth']
        }
        avatar: {
            sm: CSSObject['width']
            md: CSSObject['width']
            lg: CSSObject['width']
        }
        button: {
            sm: {
                height: CSSObject['height']
                minWidth: CSSObject['minWidth']
            }
            md: {
                height: CSSObject['height']
                minWidth: CSSObject['minWidth']
            }
            lg: {
                height: CSSObject['height']
                minWidth: CSSObject['minWidth']
            }
        }
    }
}

export type ResponsiveSkeletonTokens = {
    [key in keyof BreakpointType]: SkeletonTokensType
}

export const getSkeletonTokens = (
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
            base: foundationToken.colors.gray[150],
            highlight: foundationToken.colors.gray[100],
            shimmer: foundationToken.colors.gray[50],
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

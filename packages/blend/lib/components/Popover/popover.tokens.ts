import type { CSSObject } from 'styled-components'
import { PopoverSize } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import type { FoundationTokenType } from '../../tokens/theme.token'

export type PopoverTokenType = {
    background: CSSObject['backgroundColor']
    border: CSSObject['border']
    shadow: FoundationTokenType['shadows']
    gap: CSSObject['gap']
    zIndex: CSSObject['zIndex']
    borderRadius: CSSObject['borderRadius']
    padding: {
        horizontal: CSSObject['paddingLeft']
        top: CSSObject['paddingTop']
        bottom: CSSObject['paddingBottom']
    }
    headerContainer: {
        heading: {
            fontSize: {
                [key in PopoverSize]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in PopoverSize]: CSSObject['fontWeight']
            }
            color: {
                [key in PopoverSize]: CSSObject['color']
            }
        }
        description: {
            fontSize: {
                [key in PopoverSize]: CSSObject['fontSize']
            }
            color: {
                [key in PopoverSize]: CSSObject['color']
            }
            fontWeight: {
                [key in PopoverSize]: CSSObject['fontWeight']
            }
        }
    }
    footer: {
        justifyContent: CSSObject['justifyContent']
        gap: CSSObject['gap']
    }
}

export const getPopoverTokens = (
    foundationTokens: FoundationTokenType
): PopoverTokenType => {
    return {
        background: foundationTokens.colors.gray[0],
        border: foundationTokens.border.radius[8],
        shadow: foundationTokens.shadows,
        gap: foundationTokens.unit[12],
        zIndex: 1000,
        borderRadius: foundationTokens.border.radius[8],
        padding: {
            horizontal: foundationTokens.unit[16],
            top: foundationTokens.unit[12],
            bottom: foundationTokens.unit[16],
        },
        headerContainer: {
            heading: {
                fontSize: {
                    small: FOUNDATION_THEME.font.size.body.md.fontSize,
                    medium: FOUNDATION_THEME.font.size.body.lg.fontSize,
                },
                fontWeight: {
                    small: FOUNDATION_THEME.font.weight[600],
                    medium: FOUNDATION_THEME.font.weight[600],
                },
                color: {
                    small: foundationTokens.colors.gray[900],
                    medium: foundationTokens.colors.gray[900],
                },
            },
            description: {
                fontSize: {
                    small: FOUNDATION_THEME.font.size.body.sm.fontSize,
                    medium: FOUNDATION_THEME.font.size.body.md.fontSize,
                },
                fontWeight: {
                    small: FOUNDATION_THEME.font.weight[500],
                    medium: FOUNDATION_THEME.font.weight[500],
                },
                color: {
                    small: foundationTokens.colors.gray[500],
                    medium: foundationTokens.colors.gray[500],
                },
            },
        },
        footer: {
            justifyContent: 'flex-end',
            gap: foundationTokens.unit[12],
        },
    }
}

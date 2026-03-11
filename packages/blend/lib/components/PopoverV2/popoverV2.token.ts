import type { CSSObject } from 'styled-components'
import { PopoverV2Size } from './popoverV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getPopoverV2LightToken } from './popoverV2.light.tokens'
import { getPopoverV2DarkToken } from './popoverV2.dark.tokens'
export type PopoverV2TokenType = {
    background: CSSObject['backgroundColor']
    border: CSSObject['border']
    shadow: FoundationTokenType['shadows']
    gap: {
        [key in PopoverV2Size]: CSSObject['gap']
    }
    zIndex: CSSObject['zIndex']
    borderRadius: {
        [key in PopoverV2Size]: CSSObject['borderRadius']
    }
    padding: {
        left: {
            [key in PopoverV2Size]: CSSObject['paddingLeft']
        }
        right: {
            [key in PopoverV2Size]: CSSObject['paddingRight']
        }
        top: {
            [key in PopoverV2Size]: CSSObject['paddingTop']
        }
        bottom: {
            [key in PopoverV2Size]: CSSObject['paddingBottom']
        }
    }
    headerContainer: {
        heading: {
            color: CSSObject['color']
            fontSize: {
                [key in PopoverV2Size]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in PopoverV2Size]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in PopoverV2Size]: CSSObject['lineHeight']
            }
            gap: {
                [key in PopoverV2Size]: CSSObject['gap']
            }
            IconSize: {
                [key in PopoverV2Size]: CSSObject['size']
            }
        }
        description: {
            color: CSSObject['color']
            fontSize: {
                [key in PopoverV2Size]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in PopoverV2Size]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in PopoverV2Size]: CSSObject['lineHeight']
            }
            gap: {
                [key in PopoverV2Size]: CSSObject['gap']
            }
        }
    }
    footer: {
        gap: {
            [key in PopoverV2Size]: CSSObject['gap']
        }
    }
}

export type ResponsivePopoverV2Tokens = {
    [key in keyof BreakpointType]: PopoverV2TokenType
}

export const getPopoverV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsivePopoverV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getPopoverV2DarkToken(foundationToken)
    }

    return getPopoverV2LightToken(foundationToken)
}

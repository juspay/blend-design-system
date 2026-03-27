import type { CSSObject } from 'styled-components'
import { TabsV2Variant, TabsV2Size, TabsV2State } from './tabsV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getTabsV2LightTokens } from './tabsV2.light.tokens'
import { getTabsV2DarkTokens } from './tabsV2.dark.tokens'

export type TabsV2TokensType = {
    gap: CSSObject['gap']
    width: CSSObject['width']
    backgroundColor: {
        [key in TabsV2Variant]: {
            [key in TabsV2State]: CSSObject['backgroundColor']
        }
    }
    borderRadius: {
        [key in TabsV2Size]: {
            [key in TabsV2Variant]: CSSObject['borderRadius']
        }
    }
    padding: {
        [key in TabsV2Size]: {
            [key in TabsV2Variant]: {
                top: CSSObject['paddingTop']
                right: CSSObject['paddingRight']
                bottom: CSSObject['paddingBottom']
                left: CSSObject['paddingLeft']
            }
        }
    }
    border: {
        [key in TabsV2Variant]: CSSObject['border']
    }
    borderBottom: {
        [key in TabsV2Variant]: CSSObject['borderBottom']
    }
    outline: CSSObject['outline']
    transition: CSSObject['transition']
    container: {
        backgroundColor: {
            [key in TabsV2Variant]: CSSObject['backgroundColor']
        }
        borderRadius: {
            [key in TabsV2Size]: {
                [key in TabsV2Variant]: CSSObject['borderRadius']
            }
        }
        padding: {
            [key in TabsV2Size]: {
                [key in TabsV2Variant]: {
                    top: CSSObject['paddingTop']
                    right: CSSObject['paddingRight']
                    bottom: CSSObject['paddingBottom']
                    left: CSSObject['paddingLeft']
                }
            }
        }
    }
    trigger: {
        gap: CSSObject['gap']
        activeIndicator: {
            height: CSSObject['height']
            color: CSSObject['color']
            position: {
                bottom: CSSObject['bottom']
            }
            transition: CSSObject['transition']
            zIndex: CSSObject['zIndex']
        }
        text: {
            color: {
                [key in TabsV2Variant]: {
                    [key in TabsV2State]: CSSObject['color']
                }
            }
            fontSize: {
                [key in TabsV2Size]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in TabsV2Size]: CSSObject['fontWeight']
            }
        }
        closeButton: {
            width: CSSObject['width']
            borderRadius: CSSObject['borderRadius']
            backgroundColor: {
                [key in TabsV2State]: CSSObject['backgroundColor']
            }
        }
        outline: CSSObject['outline']
        transition: CSSObject['transition']
    }
    chrome: {
        stickyHeaderShadow: CSSObject['boxShadow']
    }
}

export type ResponsiveTabsV2Tokens = {
    [key in keyof BreakpointType]: TabsV2TokensType
}

export const getTabsV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTabsV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTabsV2DarkTokens(foundationToken)
    }

    return getTabsV2LightTokens(foundationToken)
}

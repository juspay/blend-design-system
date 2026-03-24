import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { TabsV2Variant, TabsV2Size, TabsV2State } from './tabsV2.types'

/**
 * TabsV2 token schema (theme-agnostic shape).
 * Values are supplied by light/dark builders from foundation tokens only.
 */
export type TabsV2TokensType = {
    gap: CSSObject['gap']
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
    }
    chrome: {
        stickyHeaderShadow: CSSObject['boxShadow']
    }
}

export type ResponsiveTabsV2Tokens = {
    [key in keyof BreakpointType]: TabsV2TokensType
}

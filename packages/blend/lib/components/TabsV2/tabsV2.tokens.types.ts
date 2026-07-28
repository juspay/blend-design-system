import type { CSSObject } from 'styled-components'
import { TabsV2Variant, TabsV2Size, TabsV2State } from './tabsV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type TabsV2TokensType = {
    width: CSSObject['width']
    outline: CSSObject['outline']
    tabList: {
        gap: CSSObject['gap']
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
        borderBottom: {
            [key in TabsV2Variant]: CSSObject['borderBottom']
        }
        activeIndicator: {
            height: CSSObject['height']
            color: CSSObject['color']
            position: {
                bottom: CSSObject['bottom']
            }
            transition: CSSObject['transition']
            zIndex: CSSObject['zIndex']
        }
        stickyHeader: {
            boxShadow: CSSObject['boxShadow']
            zIndex: CSSObject['zIndex']
        }
        trigger: {
            gap: CSSObject['gap']
            icon: {
                maxWidth: CSSObject['maxWidth']
            }
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
            border: {
                [key in TabsV2Variant]: CSSObject['border']
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
            transition: CSSObject['transition']
        }
    }
}

export type ResponsiveTabsV2Tokens = {
    [key in keyof BreakpointType]: TabsV2TokensType
}

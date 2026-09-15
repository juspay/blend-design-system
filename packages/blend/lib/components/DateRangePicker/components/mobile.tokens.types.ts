import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../../breakpoints/breakPoints'

export type MobileTokenType = {
    picker: {
        itemHeight: CSSObject['height']
        containerHeight: CSSObject['height']
        divider: {
            width: CSSObject['width']
            strokeColor: CSSObject['color']
            strokeColorEnd: CSSObject['color']
        }
        text: {
            selected: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
                opacity: CSSObject['opacity']
            }
            unselected: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
                opacity: CSSObject['opacity']
            }
        }
        title: {
            padding: {
                x: CSSObject['padding']
                y: CSSObject['padding']
            }
            backgroundColor: CSSObject['backgroundColor']
            text: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            fade: {
                top: CSSObject['background']
                bottom: CSSObject['background']
            }
        }
    }
    footer: {
        gap: CSSObject['gap']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        borderTop: CSSObject['borderTop']
        backgroundColor: CSSObject['backgroundColor']
    }
    presets: {
        backgroundColor: CSSObject['backgroundColor']
        hoverBackgroundColor: CSSObject['backgroundColor']
        borderBottom: CSSObject['borderBottom']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        text: {
            default: CSSObject['color']
            selected: CSSObject['color']
            disabled: CSSObject['color']
        }
    }
    drawer: {
        backgroundColor: CSSObject['backgroundColor']
    }
    padding: {
        x: CSSObject['padding']
        y: CSSObject['padding']
    }
    gap: CSSObject['gap']
    header: {
        backgroundColor: CSSObject['backgroundColor']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }
}

export type ResponsiveMobileTokens = {
    [key in keyof BreakpointType]: MobileTokenType
}

import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { CardV2Orientation, CardV2Padding, CardV2Variant } from './cardV2.types'

export type CardV2TokensType = {
    width: CSSObject['width']
    minWidth: CSSObject['minWidth']
    maxWidth: CSSObject['maxWidth']
    borderRadius: CSSObject['borderRadius']
    border: {
        [key in CardV2Variant]: CSSObject['border']
    }
    backgroundColor: {
        [key in CardV2Variant]: CSSObject['backgroundColor']
    }
    boxShadow: {
        [key in CardV2Variant]: CSSObject['boxShadow']
    }
    state: {
        hover: {
            border: CSSObject['border']
            boxShadow: CSSObject['boxShadow']
        }
        selected: {
            border: CSSObject['border']
            boxShadow: CSSObject['boxShadow']
        }
        focus: {
            outline: CSSObject['outline']
            outlineOffset: CSSObject['outlineOffset']
        }
    }
    padding: {
        [key in CardV2Padding]: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
    }
    layout: {
        gap: CSSObject['gap']
        mediaGap: {
            [key in CardV2Orientation]: CSSObject['gap']
        }
    }
    media: {
        width: CSSObject['width']
        height: CSSObject['height']
        minHeight: CSSObject['minHeight']
        borderRadius: CSSObject['borderRadius']
        backgroundColor: CSSObject['backgroundColor']
    }
    header: {
        gap: CSSObject['gap']
        eyebrow: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
        }
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
        }
        subtitle: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
        }
    }
    body: {
        gap: CSSObject['gap']
        description: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
        }
    }
    footer: {
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        borderTop: CSSObject['borderTop']
    }
    actions: {
        gap: CSSObject['gap']
    }
}

export type ResponsiveCardV2Tokens = {
    [key in keyof BreakpointType]: CardV2TokensType
}

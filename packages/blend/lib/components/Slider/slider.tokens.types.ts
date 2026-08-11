import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { SliderSize, SliderVariant } from './types'

export type SliderTokenSizeBlock = {
    height: CSSObject['height']
    trackHeight: CSSObject['height']
    thumbSize: CSSObject['width']
    thumbBorder: CSSObject['borderWidth']
}

export type SliderTokenVariantBlock = {
    trackBackground: CSSObject['backgroundColor']
    rangeBackground: CSSObject['backgroundColor']
    thumbBackground: CSSObject['backgroundColor']
    thumbBorder: CSSObject['borderColor']
    thumbFocusRing: CSSObject['color']
}

export type SliderTokensType = {
    [key in SliderSize]: SliderTokenSizeBlock
} & {
    [key in SliderVariant]: SliderTokenVariantBlock
} & {
    borderRadius: CSSObject['borderRadius']
    thumbBorderRadius: CSSObject['borderRadius']
    thumbBoxShadow: CSSObject['boxShadow']
    thumbHoverBoxShadow: CSSObject['boxShadow']
    disabledOpacity: CSSObject['opacity']
    label: {
        color: CSSObject['color']
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        boxShadow: CSSObject['boxShadow']
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
        margin: CSSObject['margin']
    }
}

export type ResponsiveSliderTokens = {
    [key in keyof BreakpointType]: SliderTokensType
}

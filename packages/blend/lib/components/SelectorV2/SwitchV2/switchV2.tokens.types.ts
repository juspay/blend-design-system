import { type CSSObject } from 'styled-components'
import { type BreakpointType } from '../../../breakpoints/breakPoints'
import {
    type SelectorV2Size,
    type SelectorV2InteractionState,
} from '../selectorV2.types'

export type SwitchV2Variant = 'checked' | 'unchecked'

export type SwitchV2TokensType = {
    gap: CSSObject['gap']
    switch: {
        height: {
            [key in SelectorV2Size]: CSSObject['height']
        }
        width: {
            [key in SelectorV2Size]: CSSObject['width']
        }
        backgroundColor: {
            [key in SwitchV2Variant]: {
                [key in SelectorV2InteractionState]: CSSObject['backgroundColor']
            }
        }
        thumb: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            width: {
                [key in SelectorV2Size]: CSSObject['width']
            }
            height: {
                [key in SelectorV2Size]: CSSObject['height']
            }
            outline: CSSObject['outline']
        }
    }
    content: {
        gap: CSSObject['gap']
        label: {
            gap: CSSObject['gap']
            color: {
                [key in SelectorV2InteractionState]: CSSObject['color']
            }
            fontSize: { [key in SelectorV2Size]: CSSObject['fontSize'] }
            fontWeight: { [key in SelectorV2Size]: CSSObject['fontWeight'] }
            lineHeight: { [key in SelectorV2Size]: CSSObject['lineHeight'] }
            slot: {
                maxHeight: {
                    [key in SelectorV2Size]: CSSObject['maxHeight']
                }
            }
        }
        subLabel: {
            color: {
                [key in SelectorV2InteractionState]: CSSObject['color']
            }
            fontSize: { [key in SelectorV2Size]: CSSObject['fontSize'] }
            fontWeight: { [key in SelectorV2Size]: CSSObject['fontWeight'] }
            lineHeight: { [key in SelectorV2Size]: CSSObject['lineHeight'] }
        }
        required: {
            color: CSSObject['color']
        }
    }
}

export type ResponsiveSwitchV2Tokens = {
    [key in keyof BreakpointType]: SwitchV2TokensType
}

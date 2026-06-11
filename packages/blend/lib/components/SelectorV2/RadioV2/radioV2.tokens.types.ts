import { type CSSObject } from 'styled-components'
import { type BreakpointType } from '../../../breakpoints/breakPoints'
import {
    type SelectorV2Size,
    type SelectorV2InteractionState,
} from '../selectorV2.types'

export type RadioV2IndicatorState = 'active' | 'inactive'

export type RadioV2TokensType = {
    gap: CSSObject['gap']
    group: {
        gap: CSSObject['gap']
    }
    radio: {
        indicator: {
            [key in RadioV2IndicatorState]: {
                backgroundColor: {
                    [key in SelectorV2InteractionState]: CSSObject['backgroundColor']
                }

                borderColor: {
                    [key in SelectorV2InteractionState]: CSSObject['borderColor']
                }
            }
        }
        activeIndicator: {
            active: {
                backgroundColor: {
                    [key in Exclude<
                        SelectorV2InteractionState,
                        'hover' | 'error'
                    >]: CSSObject['backgroundColor']
                }
            }
        }
        height: {
            [key in SelectorV2Size]: CSSObject['height']
        }
        borderWidth: {
            [key in RadioV2IndicatorState]: {
                [key in SelectorV2InteractionState]: number
            }
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

export type ResponsiveRadioV2Tokens = {
    [key in keyof BreakpointType]: RadioV2TokensType
}

import { Theme } from '../../../context/theme.enum'

import { CSSObject } from 'styled-components'
import { RadioV2State, RadioV2IndicatorState } from './radioV2.types'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../../tokens/theme.token'
import { getRadioV2LightTokens } from './radioV2.light.tokens'
import { getRadioV2DarkTokens } from './radioV2.dark.tokens'
import { SelectorV2Size, SelectorV2InteractionState } from '../selectorV2.types'

export type RadioV2TokensType = {
    gap: CSSObject['gap']
    group: {
        gap: CSSObject['gap']
    }
    radio: {
        indicator: {
            [key in RadioV2IndicatorState]: {
                backgroundColor: {
                    [key in RadioV2State]: CSSObject['backgroundColor']
                }

                borderColor: {
                    [key in RadioV2State]: CSSObject['borderColor']
                }
            }
        }
        activeIndicator: {
            active: {
                backgroundColor: {
                    [key in Exclude<
                        RadioV2State,
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
                [key in RadioV2State]: number
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

export const getRadioV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveRadioV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getRadioV2DarkTokens(foundationToken)
    }

    return getRadioV2LightTokens(foundationToken)
}

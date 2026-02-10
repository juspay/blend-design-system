import { Theme } from '../../context/theme.enum'

import { CSSObject } from 'styled-components'
import {
    CheckboxV2Size,
    CheckboxV2InteractionState,
    CheckboxV2CheckedState,
} from './checkboxV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getCheckboxV2LightTokens } from './checkboxV2.light.tokens'
import { getCheckboxV2DarkTokens } from './checkboxV2.dark.tokens'

export type CheckboxV2TokensType = {
    gap: CSSObject['gap']
    checkbox: {
        height: {
            [key in CheckboxV2Size]: CSSObject['height']
        }
        width: {
            [key in CheckboxV2Size]: CSSObject['width']
        }
        backgroundColor: {
            [key in CheckboxV2CheckedState]?: {
                [key in CheckboxV2InteractionState]?: CSSObject['backgroundColor']
            }
        }

        borderRadius: { [key in CheckboxV2Size]: CSSObject['borderRadius'] }

        border: {
            [key in CheckboxV2CheckedState]?: {
                [key in CheckboxV2InteractionState]?: CSSObject['border']
            }
        }

        outline: CSSObject['outline']
        outlineOffset: CSSObject['outlineOffset']
        boxShadow: CSSObject['boxShadow']
        icon: {
            color: {
                [key in CheckboxV2CheckedState]?: {
                    [key in Extract<
                        CheckboxV2InteractionState,
                        'default' | 'disabled'
                    >]?: CSSObject['color']
                }
            }
            width: { [key in CheckboxV2Size]: CSSObject['width'] }
            height: { [key in CheckboxV2Size]: CSSObject['height'] }
            strokeWidth: { [key in CheckboxV2Size]: CSSObject['strokeWidth'] }
        }
    }
    content: {
        gap: CSSObject['gap']
        label: {
            gap: CSSObject['gap']
            color: {
                [key in CheckboxV2InteractionState]: CSSObject['color']
            }
            fontSize: { [key in CheckboxV2Size]: CSSObject['fontSize'] }
            fontWeight: { [key in CheckboxV2Size]: CSSObject['fontWeight'] }
            lineHeight: { [key in CheckboxV2Size]: CSSObject['lineHeight'] }
            slot: {
                maxHeight: {
                    [key in CheckboxV2Size]: CSSObject['maxHeight']
                }
            }
        }
        subLabel: {
            color: {
                [key in CheckboxV2InteractionState]: CSSObject['color']
            }
            fontSize: { [key in CheckboxV2Size]: CSSObject['fontSize'] }
            fontWeight: { [key in CheckboxV2Size]: CSSObject['fontWeight'] }
            lineHeight: { [key in CheckboxV2Size]: CSSObject['lineHeight'] }
        }
        required: {
            color: CSSObject['color']
        }
    }
}

export type ResponsiveCheckboxV2Tokens = {
    [key in keyof BreakpointType]: CheckboxV2TokensType
}

export const getCheckboxV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCheckboxV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getCheckboxV2DarkTokens(foundationToken)
    }

    return getCheckboxV2LightTokens(foundationToken)
}

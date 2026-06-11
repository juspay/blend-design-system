import type { CSSObject } from 'styled-components'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
} from './buttonV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type ButtonV2TokensType = Readonly<{
    gap: CSSObject['gap']
    backgroundColor: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['background']
            }
        }
    }
    borderRadius: {
        [key in ButtonV2Size]: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: CSSObject['borderRadius']
            }
        }
    }
    padding: {
        [key in PaddingDirection]: {
            [key in ButtonV2Size]: {
                [key in ButtonV2Type]: {
                    [key in ButtonV2SubType]: CSSObject['padding']
                }
            }
        }
    }
    border: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['border']
            }
        }
    }
    shadow: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['boxShadow']
            }
        }
    }
    text: {
        color: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: {
                    [key in ButtonV2State]: CSSObject['color']
                }
            }
        }
        fontSize: {
            [key in ButtonV2Size]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in ButtonV2Size]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in ButtonV2Size]: CSSObject['lineHeight']
        }
    }
}>

export type ResponsiveButtonV2Tokens = {
    [key in keyof BreakpointType]: ButtonV2TokensType
}

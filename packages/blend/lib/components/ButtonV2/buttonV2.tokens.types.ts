import type { CSSProperties } from 'react'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
} from './buttonV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type ButtonV2TokensType = Readonly<{
    gap: CSSProperties['gap']
    slotMaxHeight: {
        [key in ButtonV2Size]: NonNullable<CSSProperties['maxHeight']>
    }
    focusRing: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: CSSProperties['boxShadow']
        }
    }
    backgroundColor: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSProperties['background']
            }
        }
    }
    borderRadius: {
        [key in ButtonV2Size]: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: CSSProperties['borderRadius']
            }
        }
    }
    padding: {
        [key in PaddingDirection]: {
            [key in ButtonV2Size]: {
                [key in ButtonV2Type]: {
                    [key in ButtonV2SubType]: CSSProperties['padding']
                }
            }
        }
    }
    border: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSProperties['border']
            }
        }
    }
    shadow: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSProperties['boxShadow']
            }
        }
    }
    text: {
        color: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: {
                    [key in ButtonV2State]: CSSProperties['color']
                }
            }
        }
        fontSize: {
            [key in ButtonV2Size]: CSSProperties['fontSize']
        }
        fontWeight: {
            [key in ButtonV2Size]: CSSProperties['fontWeight']
        }
        lineHeight: {
            [key in ButtonV2Size]: CSSProperties['lineHeight']
        }
    }
}>

export type ResponsiveButtonV2Tokens = {
    [key in keyof BreakpointType]: ButtonV2TokensType
}

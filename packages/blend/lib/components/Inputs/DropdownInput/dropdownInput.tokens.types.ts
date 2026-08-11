import type { CSSObject } from 'styled-components'
import { DropdownInputSize, DropdownInputState } from './types'
import { BreakpointType } from '../../../breakpoints/breakPoints'

export type DropdownInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in DropdownInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in DropdownInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in DropdownInputState]: CSSObject['color']
        }
    }
    errorMessage: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    required: {
        color: CSSObject['color']
    }
    placeholder?: {
        color: CSSObject['color']
    }
    helpIcon: {
        width: CSSObject['width']
        color: {
            [key in DropdownInputState]: CSSObject['color']
        }
    }
    inputContainer: {
        gap: CSSObject['gap']
        fontSize: {
            [key in DropdownInputSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in DropdownInputSize]: CSSObject['fontWeight']
        }
        color: {
            [key in DropdownInputState]: CSSObject['color']
        }

        borderRadius?: {
            [key in DropdownInputSize]: CSSObject['borderRadius']
        }
        boxShadow: CSSObject['boxShadow']

        padding: {
            x: {
                [key in DropdownInputSize]: CSSObject['padding']
            }
            y: {
                [key in DropdownInputSize]: CSSObject['padding']
            }
        }
        border: {
            [key in DropdownInputState]: CSSObject['border']
        }

        backgroundColor: {
            [key in DropdownInputState]: CSSObject['backgroundColor']
        }
    }
}

export type ResponsiveDropdownInputTokens = {
    [key in keyof BreakpointType]: DropdownInputTokensType
}

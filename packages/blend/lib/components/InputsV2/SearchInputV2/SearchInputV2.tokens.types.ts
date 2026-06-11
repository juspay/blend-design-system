import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../../breakpoints/breakPoints'

import type { InputSizeV2, InputStateV2 } from '../inputV2.types'

export type SearchInputV2TokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in InputStateV2]: CSSObject['color']
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
    inputContainer: {
        paddingTop: {
            [key in InputSizeV2]: CSSObject['paddingTop']
        }
        paddingRight: {
            [key in InputSizeV2]: CSSObject['paddingRight']
        }
        paddingBottom: {
            [key in InputSizeV2]: CSSObject['paddingBottom']
        }
        paddingLeft: {
            [key in InputSizeV2]: CSSObject['paddingLeft']
        }
        borderRadius: CSSObject['borderRadius']
        borderBottom: {
            [key in InputStateV2]: CSSObject['borderBottom']
        }
        outline: CSSObject['outline']
        boxShadow: CSSObject['boxShadow']
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
        placeholderColor: {
            [key in InputStateV2]: CSSObject['color']
        }
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        slot: {
            left: {
                top: CSSObject['top']
                left: CSSObject['left']
                bottom: CSSObject['bottom']
            }
            right: {
                top: CSSObject['top']
                right: CSSObject['right']
                bottom: CSSObject['bottom']
            }
            transition: CSSObject['transition']
            transform: CSSObject['transform']
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
        }
    }
    icon: {
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
        width: CSSObject['width']
    }
}

export type ResponsiveSearchInputV2Tokens = {
    [key in keyof BreakpointType]: SearchInputV2TokensType
}

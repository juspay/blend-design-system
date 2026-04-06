import { CSSObject } from 'styled-components'
import { InputSizeV2, InputStateV2 } from './inputV2.types'

export type FloatingLabelsV2Tokens = {
    placeholder: {
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
    }
    required: {
        color: CSSObject['color']
    }
}

export type InputLabelsV2Tokens = {
    label: {
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
    required: {
        color: CSSObject['color']
    }
    helpIcon: {
        width: {
            [key in InputSizeV2]: CSSObject['width']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
}

export type InputFooterV2Tokens = {
    hintText: {
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
    errorMessage: {
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
        color: CSSObject['color']
    }
}

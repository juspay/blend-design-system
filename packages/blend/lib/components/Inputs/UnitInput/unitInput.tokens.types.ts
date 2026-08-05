import type { CSSObject } from 'styled-components'
import { UnitInputSize } from './types'
import { BreakpointType } from '../../../breakpoints/breakPoints'

enum UnitInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type UnitInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
    }
    helpIcon: {
        width: CSSObject['width']
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in UnitInputState]: CSSObject['color']
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
    inputContainer: {
        fontSize: {
            [key in UnitInputSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in UnitInputSize]: CSSObject['fontWeight']
        }
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
        borderRadius: {
            [key in UnitInputSize]: CSSObject['borderRadius']
        }
        boxShadow: CSSObject['boxShadow']
        padding: {
            x: {
                [key in UnitInputSize]: CSSObject['padding']
            }
            y: {
                [key in UnitInputSize]: CSSObject['padding']
            }
        }
        border: {
            [key in UnitInputState]: CSSObject['border']
        }
        backgroundColor: {
            [key in UnitInputState]: CSSObject['backgroundColor']
        }
        unit: {
            fontSize: {
                [key in UnitInputSize]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in UnitInputSize]: CSSObject['fontWeight']
            }
            color: {
                [key in UnitInputState]: CSSObject['color']
            }
            padding: {
                [key in UnitInputSize]: CSSObject['padding']
            }
            backgroundColor: {
                [key in UnitInputState]: CSSObject['backgroundColor']
            }
        }
    }
}

export type ResponsiveUnitInputTokens = {
    [key in keyof BreakpointType]: UnitInputTokensType
}

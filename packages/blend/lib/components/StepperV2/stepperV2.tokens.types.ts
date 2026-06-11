import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import type {
    StepperV2InteractionState,
    StepperV2StepStatus,
} from './stepperV2.types'

export type StepperV2TokensType = {
    container: {
        gap: CSSObject['gap']
        step: {
            circle: {
                [key in StepperV2StepStatus]: {
                    [key in StepperV2InteractionState]: {
                        backgroundColor: CSSObject['backgroundColor']
                        borderColor: CSSObject['borderColor']
                        borderWidth: CSSObject['borderWidth']
                        borderRadius: CSSObject['borderRadius']
                        size: CSSObject['width']
                        transition: CSSObject['transition']
                        outline: CSSObject['outline']
                        outlineOffset: CSSObject['outlineOffset']
                        paddingTop: CSSObject['paddingTop']
                        paddingRight: CSSObject['paddingRight']
                        paddingBottom: CSSObject['paddingBottom']
                        paddingLeft: CSSObject['paddingLeft']
                    }
                }
            }
            icon: {
                [key in StepperV2StepStatus]: {
                    [key in StepperV2InteractionState]: {
                        color: CSSObject['color']
                    }
                }
            }
        }
        connector: {
            line: {
                color: CSSObject['color']
                height: CSSObject['height']
            }
        }
        subConnector: {
            line: {
                color: CSSObject['color']
                height: CSSObject['height']
            }
            dot: {
                border: CSSObject['border']
                borderRadius: CSSObject['borderRadius']
                height: CSSObject['height']
                width: CSSObject['width']
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingBottom: CSSObject['paddingBottom']
                paddingLeft: CSSObject['paddingLeft']
            }
            expander: {
                icon: {
                    color: CSSObject['color']
                }
                width: CSSObject['width']
            }
            text: {
                [key in StepperV2StepStatus]: {
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
            }
        }
        title: {
            text: {
                [key in StepperV2StepStatus]: {
                    [key in StepperV2InteractionState]: {
                        color: CSSObject['color']
                        fontSize: CSSObject['fontSize']
                        fontWeight: CSSObject['fontWeight']
                        gap: CSSObject['gap']
                        paddingTop: CSSObject['paddingTop']
                        paddingRight: CSSObject['paddingRight']
                        paddingBottom: CSSObject['paddingBottom']
                        paddingLeft: CSSObject['paddingLeft']
                    }
                }
            }
        }
        description: {
            text: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
        }
    }
}

export type ResponsiveStepperV2Tokens = {
    [key in keyof BreakpointType]: StepperV2TokensType
}

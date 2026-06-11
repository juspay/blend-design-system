import type { CSSObject } from 'styled-components'
import { SnackbarV2Variant } from './snackbarV2.types'
import { type BreakpointType } from '../../breakpoints/breakPoints'

export type SnackbarV2TokensType = {
    width: CSSObject['width']
    maxWidth: CSSObject['maxWidth']
    minWidth: CSSObject['minWidth']
    backgroundColor: CSSObject['backgroundColor']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']
    slot: {
        height: CSSObject['height']
        width: CSSObject['width']
        color: {
            [key in SnackbarV2Variant]: CSSObject['color']
        }
    }
    mainContainer: {
        gap: CSSObject['gap']
        content: {
            gap: CSSObject['gap']
            textContainer: {
                gap: CSSObject['gap']
                header: {
                    color: {
                        [key in SnackbarV2Variant]: CSSObject['color']
                    }
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                }
                description: {
                    color: {
                        [key in SnackbarV2Variant]: CSSObject['color']
                    }
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                }
            }
            actionContainer: {
                primaryAction: {
                    color: {
                        [key in SnackbarV2Variant]: CSSObject['color']
                    }
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                }
            }
        }
        closeButton: {
            height: CSSObject['height']
            color: {
                [key in SnackbarV2Variant]: CSSObject['color']
            }
        }
    }
}

export type ResponsiveSnackbarV2Tokens = {
    [key in keyof BreakpointType]: SnackbarV2TokensType
}

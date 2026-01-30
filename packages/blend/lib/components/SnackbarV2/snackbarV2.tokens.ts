import type { CSSObject } from 'styled-components'
import { SnackbarV2Variant } from './snackbarV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getSnackbarV2DarkTokens } from './snackbarV2.dark.tokens'
import { getSnackbarV2LightTokens } from './snackbarV2.light.tokens'

export enum SnackbarV2PaddingDirection {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
}

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

export const getSnackbarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSnackbarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSnackbarV2DarkTokens(foundationToken)
    }

    return getSnackbarV2LightTokens(foundationToken)
}

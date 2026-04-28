import type { CSSObject } from 'styled-components'
import { type FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getModalV2LightToken } from './modalV2.light.tokens'
import { getModalV2DarkToken } from './modalV2.dark.tokens'

export type ModalV2State = 'default'
export type ModalV2TokensType = {
    boxShadow: CSSObject['boxShadow']
    borderRadius: CSSObject['borderRadius']
    overlay: {
        backgroundColor: CSSObject['backgroundColor']
        offset: CSSObject['offset']
    }
    paddingTop: CSSObject['paddingTop']
    paddingRight: CSSObject['paddingRight']
    paddingBottom: CSSObject['paddingBottom']
    paddingLeft: CSSObject['paddingLeft']
    backgroundColor: CSSObject['backgroundColor']
    header: {
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        borderBottom: CSSObject['border']
        backgroundColor: CSSObject['backgroundColor']
        borderTopLeftRadius: CSSObject['borderTopLeftRadius']
        borderTopRightRadius: CSSObject['borderTopRightRadius']
        slot: {
            gap: CSSObject['gap']
        }
        text: {
            title: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']
            }
            subtitle: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']
            }
        }
    }
    dividerColor: CSSObject['color']
    skeleton: {
        header: {
            gap: CSSObject['gap']
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            borderBottom: CSSObject['border']
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
        }
        body: {
            gap: CSSObject['gap']
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
        }
    }

    body: {
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        backgroundColor: CSSObject['backgroundColor']
    }

    footer: {
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        borderTop: CSSObject['border']
        backgroundColor: CSSObject['backgroundColor']
        gap: CSSObject['gap']
    }
    closeButton: {
        color: CSSObject['color']
        width: CSSObject['width']
        height: CSSObject['height']
    }
}

export type ResponsiveModalV2Tokens = {
    [key in keyof BreakpointType]: ModalV2TokensType
}

export const getModalV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveModalV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getModalV2DarkToken(foundationToken)
    }
    return getModalV2LightToken(foundationToken)
}

import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type ModalState = 'default'

export type ModalTokensType = {
    boxShadow: CSSObject['boxShadow']
    borderRadius: CSSObject['borderRadius']
    overlay: {
        backgroundColor: CSSObject['backgroundColor']
    }
    header: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        borderBottom: CSSObject['border']
        backgroundColor: CSSObject['backgroundColor']
        text: {
            title: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
            subtitle: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
        }
    }
    body: {
        padding: CSSObject['padding']
        backgroundColor: CSSObject['backgroundColor']
    }
    footer: {
        padding: CSSObject['padding']
        borderTop: CSSObject['border']
        backgroundColor: CSSObject['backgroundColor']
        gap: CSSObject['gap']
    }
    closeButton: {
        color: CSSObject['color']
    }
}

export type ResponsiveModalTokens = {
    [key in keyof BreakpointType]: ModalTokensType
}

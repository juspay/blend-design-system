import { CSSObject } from 'styled-components'
import { PopoverSize } from './types'
import { FoundationTokenType } from '../../tokens/theme.token'
export type PopoverTokenType = {
    background: CSSObject['backgroundColor']
    border: CSSObject['border']
    shadow: CSSObject['boxShadow']
    gap: CSSObject['gap']
    zIndex: CSSObject['zIndex']
    borderRadius: CSSObject['borderRadius']
    headerContainer: {
        heading: {
            fontSize: {
                [key in PopoverSize]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in PopoverSize]: CSSObject['fontWeight']
            }
            color: {
                [key in PopoverSize]: CSSObject['color']
            }
        }
        description: {
            fontSize: {
                [key in PopoverSize]: CSSObject['fontSize']
            }
            color: {
                [key in PopoverSize]: CSSObject['color']
            }
            fontWeight: {
                [key in PopoverSize]: CSSObject['fontWeight']
            }
        }
    }
    footer: {
        justifyContent: CSSObject['justifyContent']
        gap: CSSObject['gap']
    }
}
export declare const getPopoverTokens: (
    foundationTokens: FoundationTokenType
) => PopoverTokenType

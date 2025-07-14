import { CSSObject } from 'styled-components'
import { AccordionType } from './types'
import { FoundationTokenType } from '../../tokens/theme.token'
export type AccordionState =
    | 'default'
    | 'hover'
    | 'active'
    | 'disabled'
    | 'open'
    | 'closed'
export type AccordionTokenType = {
    gap: {
        [key in AccordionType]: CSSObject['gap']
    }
    borderRadius: {
        [key in AccordionType]: CSSObject['borderRadius']
    }
    item: {
        trigger: {
            border: {
                [key in AccordionType]: {
                    [key in AccordionState]?: CSSObject['border']
                }
            }
            padding: {
                [key in AccordionType]: CSSObject['padding']
            }
            backgroundColor: {
                [key in AccordionType]: {
                    [key in AccordionState]?: CSSObject['backgroundColor']
                }
            }
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in AccordionState]?: CSSObject['color']
                }
            }
            subtext: {
                fontSize: CSSObject['fontSize']
                gap: CSSObject['gap']
                color: {
                    [key in AccordionState]?: CSSObject['color']
                }
            }
        }
        separator: {
            color: {
                [key in AccordionType]: CSSObject['color']
            }
        }
    }
}
export declare const getAccordionToken: (
    foundationToken: FoundationTokenType
) => AccordionTokenType

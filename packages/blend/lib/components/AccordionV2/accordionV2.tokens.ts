import type { CSSObject } from 'styled-components'
import { AccordionV2Type } from './accordionV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getAccordionV2DarkTokens } from './accordionV2.dark.tokens'
import { getAccordionV2LightTokens } from './accordionV2.light.tokens'

export type AccordionV2State =
    | 'default'
    | 'hover'
    | 'active'
    | 'disabled'
    | 'open'
export type AccordionV2TokensType = {
    gap: {
        [key in AccordionV2Type]: CSSObject['gap']
    }
    borderRadius: {
        [key in AccordionV2Type]: CSSObject['borderRadius']
    }
    trigger: {
        backgroundColor: {
            [key in AccordionV2Type]: {
                [key in AccordionV2State]: CSSObject['backgroundColor']
            }
        }
        border: {
            [key in AccordionV2Type]: {
                [key in AccordionV2State]: CSSObject['border']
            }
        }
        padding: {
            [key in AccordionV2Type]: CSSObject['padding']
        }
        text: {
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in AccordionV2State]: CSSObject['color']
                }
            }
            subtext: {
                fontSize: CSSObject['fontSize']
                gap: CSSObject['gap']
                color: {
                    [key in AccordionV2State]: CSSObject['color']
                }
            }
        }
    }
    separator: {
        color: {
            [key in AccordionV2Type]: CSSObject['color']
        }
    }
    chevron: {
        size: CSSObject['width']
        color: {
            [key in AccordionV2State]: CSSObject['color']
        }
    }
}

export type ResponsiveAccordionV2Tokens = {
    [key in keyof BreakpointType]: AccordionV2TokensType
}

export const getAccordionV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveAccordionV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getAccordionV2DarkTokens(foundationToken)
    }

    return getAccordionV2LightTokens(foundationToken)
}

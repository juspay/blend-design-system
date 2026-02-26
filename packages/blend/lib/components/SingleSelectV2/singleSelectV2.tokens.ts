import type { CSSObject } from 'styled-components'
import { SingleSelectV2Size, SingleSelectV2Variant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getSingleSelectV2LightTokens } from './singleSelectV2.light.tokens'
import { getSingleSelectV2DarkTokens } from './singleSelectV2.dark.tokens'

type TriggerStates = 'open' | 'closed' | 'hover' | 'focus' | 'error'

export type SingleSelectV2ItemStates =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'
    | 'selected'

export type SingleSelectV2TokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in SingleSelectV2ItemStates]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in SingleSelectV2ItemStates]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in SingleSelectV2ItemStates]: CSSObject['color']
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

    trigger: {
        height: {
            [key in SingleSelectV2Size]: {
                [key in SingleSelectV2Variant]: CSSObject['height']
            }
        }
        padding: {
            [key in SingleSelectV2Size]: {
                [key in SingleSelectV2Variant]: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }

        borderRadius: {
            [key in SingleSelectV2Size]: {
                [key in SingleSelectV2Variant]: CSSObject['borderRadius']
            }
        }
        boxShadow: {
            [key in SingleSelectV2Variant]: CSSObject['boxShadow']
        }
        backgroundColor: {
            [key in SingleSelectV2Variant]: {
                [key in TriggerStates]: CSSObject['backgroundColor']
            }
        }
        outline: {
            //this acts as a border for the trigger in default state
            [key in SingleSelectV2Variant]: {
                [key in TriggerStates]: CSSObject['outline']
            }
        }
        placeholder: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        selectedValue: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
    }
    popover: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        padding: {
            [key in SingleSelectV2Size]: {
                [key in SingleSelectV2Variant]: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }
        item: {
            padding: CSSObject['padding']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            backgroundColor: {
                [key in SingleSelectV2ItemStates]: CSSObject['backgroundColor']
            }
            optionsLabel: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectV2ItemStates]: CSSObject['color']
                }
            }
            option: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectV2ItemStates]: CSSObject['color']
                }
            }
            description: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectV2ItemStates]: CSSObject['color']
                }
            }
            separator: {
                color: CSSObject['color']
                height: CSSObject['height']
                margin: CSSObject['margin']
            }
        }
    }
    mobilePanel: {
        header: {
            paddingX: CSSObject['padding']
            paddingBottom: CSSObject['padding']
            borderBottom: CSSObject['borderBottom']
        }
    }
}

export type ResponsiveSingleSelectV2Tokens = {
    [key in keyof BreakpointType]: SingleSelectV2TokensType
}

export const getSingleSelectV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSingleSelectV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSingleSelectV2DarkTokens(foundationToken)
    }

    return getSingleSelectV2LightTokens(foundationToken)
}

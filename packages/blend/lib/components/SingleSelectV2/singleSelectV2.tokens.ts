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
        color: Record<SingleSelectV2ItemStates, CSSObject['color']>
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: Record<SingleSelectV2ItemStates, CSSObject['color']>
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: Record<SingleSelectV2ItemStates, CSSObject['color']>
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
        height: Record<
            SingleSelectV2Size,
            Record<SingleSelectV2Variant, CSSObject['height']>
        >
        padding: Record<
            SingleSelectV2Size,
            Record<
                SingleSelectV2Variant,
                {
                    paddingInline: CSSObject['paddingInline']
                    paddingBlock: CSSObject['paddingBlock']
                }
            >
        >
        borderRadius: Record<
            SingleSelectV2Size,
            Record<SingleSelectV2Variant, CSSObject['borderRadius']>
        >
        boxShadow: Record<SingleSelectV2Variant, CSSObject['boxShadow']>
        backgroundColor: Record<
            SingleSelectV2Variant,
            Record<TriggerStates, CSSObject['backgroundColor']>
        >
        outline: Record<
            SingleSelectV2Variant,
            Record<TriggerStates, CSSObject['outline']>
        >
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

    menu: {
        content: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            borderRadius: CSSObject['borderRadius']
            boxShadow: CSSObject['boxShadow']
        }
        padding: Record<
            SingleSelectV2Size,
            Record<
                SingleSelectV2Variant,
                {
                    paddingInline: CSSObject['paddingInline']
                    paddingBlock: CSSObject['paddingBlock']
                }
            >
        >
        groupLabel: {
            margin: CSSObject['margin']
            padding: CSSObject['padding']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: Record<SingleSelectV2ItemStates, CSSObject['color']>
        }
        item: {
            padding: CSSObject['padding']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            backgroundColor: Record<
                SingleSelectV2ItemStates,
                CSSObject['backgroundColor']
            >
            groupLabelText: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: Record<SingleSelectV2ItemStates, CSSObject['color']>
            }
            optionText: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: Record<SingleSelectV2ItemStates, CSSObject['color']>
            }
            description: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: Record<SingleSelectV2ItemStates, CSSObject['color']>
            }
            separator: {
                color: CSSObject['color']
                height: CSSObject['height']
                margin: CSSObject['margin']
            }
        }
        submenu: {
            trigger: {
                padding: CSSObject['padding']
                margin: CSSObject['margin']
                borderRadius: CSSObject['borderRadius']
                backgroundColor: Record<
                    'default' | 'hover' | 'focus',
                    CSSObject['backgroundColor']
                >
            }
            content: {
                backgroundColor: CSSObject['backgroundColor']
                border: CSSObject['border']
                borderRadius: CSSObject['borderRadius']
                padding: CSSObject['padding']
                boxShadow: CSSObject['boxShadow']
            }
            optionText: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            iconColor: CSSObject['color']
        }
    }
    mobilePanel: {
        header: {
            paddingInline: CSSObject['paddingInline']
            paddingBlockEnd: CSSObject['paddingBlockEnd']
            borderBottom: CSSObject['borderBottom']
        }
    }
}

export type ResponsiveSingleSelectV2Tokens = {
    [key in keyof BreakpointType]: SingleSelectV2TokensType
}

export type SingleSelectV2MenuItemTokensType =
    SingleSelectV2TokensType['menu']['item']

export const getSingleSelectV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSingleSelectV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSingleSelectV2DarkTokens(foundationToken)
    }
    return getSingleSelectV2LightTokens(foundationToken)
}

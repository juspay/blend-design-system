import type { CSSObject } from 'styled-components'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from './singleSelectV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getSingleSelectV2LightTokens } from './singleSelectV2.light.tokens'
import { getSingleSelectV2DarkTokens } from './singleSelectV2.dark.tokens'
import type {
    SelectV2ItemStates,
    SelectV2TriggerStates,
} from '../SelectV2/selectV2.tokenStates'

export type SingleSelectV2ItemStates = SelectV2ItemStates

export type SingleSelectV2TriggerStates = SelectV2TriggerStates

type StateToken<T> = Record<SingleSelectV2ItemStates, T>
type TriggerStateToken<T> = Record<SingleSelectV2TriggerStates, T>
type VariantToken<T> = Record<SingleSelectV2Variant, T>
type SizeToken<T> = Record<SingleSelectV2Size, T>

type SubmenuTriggerStateToken<T> = Record<'default' | 'hover' | 'focus', T>

export type SingleSelectV2TokensType = {
    gap: CSSObject['gap']

    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: StateToken<CSSObject['color']>
    }

    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: StateToken<CSSObject['color']>
    }

    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: StateToken<CSSObject['color']>
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
        height: SizeToken<VariantToken<CSSObject['height']>>
        padding: SizeToken<
            VariantToken<{
                top: CSSObject['paddingTop']
                right: CSSObject['paddingRight']
                bottom: CSSObject['paddingBottom']
                left: CSSObject['paddingLeft']
            }>
        >
        borderRadius: SizeToken<VariantToken<CSSObject['borderRadius']>>
        boxShadow: VariantToken<CSSObject['boxShadow']>
        backgroundColor: VariantToken<
            TriggerStateToken<CSSObject['backgroundColor']>
        >
        outline: VariantToken<TriggerStateToken<CSSObject['outline']>>
        slot: {
            gap: CSSObject['gap']
            width: CSSObject['width']
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

    menu: {
        content: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            borderRadius: CSSObject['borderRadius']
            boxShadow: CSSObject['boxShadow']
        }
        padding: SizeToken<
            VariantToken<{
                top: CSSObject['paddingTop']
                right: CSSObject['paddingRight']
                bottom: CSSObject['paddingBottom']
                left: CSSObject['paddingLeft']
            }>
        >
        groupLabel: {
            margin: CSSObject['margin']
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: StateToken<CSSObject['color']>
        }
        item: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            backgroundColor: StateToken<CSSObject['backgroundColor']>
            groupLabelText: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: StateToken<CSSObject['color']>
            }
            option: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: StateToken<CSSObject['color']>
            }
            description: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: StateToken<CSSObject['color']>
            }
            separator: {
                color: CSSObject['color']
                height: CSSObject['height']
                margin: CSSObject['margin']
            }
        }
        submenu: {
            trigger: {
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingBottom: CSSObject['paddingBottom']
                paddingLeft: CSSObject['paddingLeft']
                margin: CSSObject['margin']
                borderRadius: CSSObject['borderRadius']
                backgroundColor: SubmenuTriggerStateToken<
                    CSSObject['backgroundColor']
                >
            }
            content: {
                backgroundColor: CSSObject['backgroundColor']
                border: CSSObject['border']
                borderRadius: CSSObject['borderRadius']
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingBottom: CSSObject['paddingBottom']
                paddingLeft: CSSObject['paddingLeft']
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
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
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

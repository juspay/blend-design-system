import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import {
    MultiSelectV2Size,
    MultiSelectV2SelectionTagType,
    MultiSelectV2Variant,
} from './multiSelectV2.types'
import { Theme } from '../../context/theme.enum'
import { getMultiSelectV2LightTokens } from './multiSelectV2.light.tokens'
import { getMultiSelectV2DarkTokens } from './multiSelectV2.dark.tokens'
import type {
    SelectV2ItemStates,
    SelectV2TriggerStates,
} from '../SelectV2/selectV2.tokenStates'

type StateToken<T> = Record<SelectV2ItemStates, T>
type TriggerStateToken<T> = Record<SelectV2TriggerStates, T>
type VariantToken<T> = Record<MultiSelectV2Variant, T>
type SizeToken<T> = Record<MultiSelectV2Size, T>
type SelectionTagTypeToken<T> = Record<MultiSelectV2SelectionTagType, T>

export type MultiSelectV2TriggerStates = SelectV2TriggerStates

export type MultiSelectV2ItemStates = SelectV2ItemStates

export type MultiSelectV2TokensType = {
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
        selectionTag: VariantToken<
            SelectionTagTypeToken<{
                color: CSSObject['color']
                backgroundColor: CSSObject['backgroundColor']
                fontWeight: CSSObject['fontWeight']
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingBottom: CSSObject['paddingBottom']
                paddingLeft: CSSObject['paddingLeft']
            }>
        > & {
            marginLeft: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
        }
        chevron: {
            gap: CSSObject['gap']
            width: CSSObject['width']
            height: CSSObject['height']
            iconSize?: number
        }
        clearButton?: {
            backgroundColor: TriggerStateToken<CSSObject['backgroundColor']>
            outline: TriggerStateToken<CSSObject['outline']>
            color: CSSObject['color']
            width?: CSSObject['width']
        }
        floatingLabel: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
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
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        padding: SizeToken<
            VariantToken<{
                top: CSSObject['paddingTop']
                right: CSSObject['paddingRight']
                bottom: CSSObject['paddingBottom']
                left: CSSObject['paddingLeft']
            }>
        >
        minWidth: CSSObject['minWidth']
        scroll: {
            height: CSSObject['height']
            maxHeight: CSSObject['maxHeight']
        }
        header: {
            backgroundColor: CSSObject['backgroundColor']
            borderBottom: CSSObject['borderBottom']
            selectAllRowPaddingLeft: CSSObject['paddingLeft']
            selectAllRowPaddingRight: CSSObject['paddingRight']
        }
        selectAll: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            borderRadius: CSSObject['borderRadius']
        }
        list: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
        }
        actions: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            gap: CSSObject['gap']
            backgroundColor: CSSObject['backgroundColor']
            borderTop: CSSObject['borderTop']
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
            optionsLabel: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: StateToken<CSSObject['color']>
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingBottom: CSSObject['paddingBottom']
                paddingLeft: CSSObject['paddingLeft']
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
            seperator: {
                color: CSSObject['color']
                height: CSSObject['height']
                margin: CSSObject['margin']
            }
        }
    }

    subMenu: {
        trigger: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
        }
        content: {
            borderRadius: CSSObject['borderRadius']
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
        }
    }

    drawer: {
        header: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            borderBottom: CSSObject['borderBottom']
        }
        search: {
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            marginTop: CSSObject['margin']
            marginBottom: CSSObject['margin']
        }
        content: {
            gap: CSSObject['gap']
        }
    }
}

export type ResponsiveMultiSelectV2Tokens = {
    [key in keyof BreakpointType]: MultiSelectV2TokensType
}

export const getMultiSelectV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMultiSelectV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMultiSelectV2DarkTokens(foundationToken)
    }
    return getMultiSelectV2LightTokens(foundationToken)
}

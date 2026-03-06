import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import {
    MultiSelectV2Size,
    MultiSelectV2SelectionTagType,
    MultiSelectV2Variant,
} from './types'
import { Theme } from '../../context/theme.enum'
import { getMultiSelectV2LightTokens } from './multiSelectV2.light.tokens.ts'
import { getMultiSelectV2DarkTokens } from './multiSelectV2.dark.tokens.ts'
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
                x: CSSObject['padding']
                y: CSSObject['padding']
            }>
        >
        borderRadius: SizeToken<VariantToken<CSSObject['borderRadius']>>
        boxShadow: VariantToken<CSSObject['boxShadow']>
        backgroundColor: VariantToken<
            TriggerStateToken<CSSObject['backgroundColor']>
        >
        outline: VariantToken<TriggerStateToken<CSSObject['outline']>>
        slot: { gap: CSSObject['gap'] }
        selectionTag: VariantToken<
            SelectionTagTypeToken<{
                color: CSSObject['color']
                backgroundColor: CSSObject['backgroundColor']
                fontWeight: CSSObject['fontWeight']
            }>
        > & {
            marginLeft: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
            paddingCount: CSSObject['padding']
            paddingText: CSSObject['padding']
        }
        chevron: { gap: CSSObject['gap'] }
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
                x: CSSObject['padding']
                y: CSSObject['padding']
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
            padding: CSSObject['padding']
            borderRadius: CSSObject['borderRadius']
        }
        list: {
            padding: CSSObject['padding']
            paddingTop: CSSObject['paddingTop']
        }
        actions: {
            padding: CSSObject['padding']
            gap: CSSObject['gap']
            backgroundColor: CSSObject['backgroundColor']
            borderTop: CSSObject['borderTop']
        }
        item: {
            padding: CSSObject['padding']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            backgroundColor: StateToken<CSSObject['backgroundColor']>
            optionsLabel: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: StateToken<CSSObject['color']>
                padding: CSSObject['padding']
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
            padding: CSSObject['padding']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
        }
        content: {
            borderRadius: CSSObject['borderRadius']
            padding: CSSObject['padding']
        }
    }

    drawer: {
        header: {
            paddingX: CSSObject['padding']
            paddingBottom: CSSObject['padding']
            borderBottom: CSSObject['borderBottom']
        }
        search: {
            paddingX: CSSObject['padding']
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

import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import {
    getMultiSelectTokens,
    type MultiSelectTokensType,
} from '../MultiSelect/multiSelect.tokens'
import {
    MultiSelectV2Size,
    MultiSelectV2SelectionTagType,
    MultiSelectV2Variant,
} from './types'

type StateToken<T> = Record<MultiSelectV2ItemStates, T>
type TriggerStateToken<T> = Record<MultiSelectV2TriggerStates, T>
type VariantToken<T> = Record<MultiSelectV2Variant, T>
type SizeToken<T> = Record<MultiSelectV2Size, T>
type SelectionTagTypeToken<T> = Record<MultiSelectV2SelectionTagType, T>

export type MultiSelectV2TriggerStates =
    | 'open'
    | 'closed'
    | 'hover'
    | 'focus'
    | 'error'

export type MultiSelectV2ItemStates =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'
    | 'selected'

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
        selectionTag: VariantToken<
            SelectionTagTypeToken<{
                color: CSSObject['color']
                backgroundColor: CSSObject['backgroundColor']
                fontWeight: CSSObject['fontWeight']
            }>
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
    menu: MultiSelectTokensType['menu']
    drawer: MultiSelectTokensType['drawer']
}

export type ResponsiveMultiSelectV2Tokens = {
    [key in keyof BreakpointType]: MultiSelectV2TokensType
}

export const getMultiSelectV2Tokens = (
    foundationToken: FoundationTokenType
): ResponsiveMultiSelectV2Tokens =>
    getMultiSelectTokens(foundationToken) as ResponsiveMultiSelectV2Tokens

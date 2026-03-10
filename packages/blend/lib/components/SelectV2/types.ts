import type { ReactNode } from 'react'
import type { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'
import type { SingleSelectV2MenuItemTokensType } from '../SingleSelectV2/singleSelectV2.tokens'
import type { MultiSelectV2TokensType } from '../MultiSelectV2/multiSelectV2.tokens'
import type { CSSObject } from 'styled-components'

// ---------------------------------------------------------------------------
// Shared item type (used by SelectItemV2 and MultiSelectItemV2)
// ---------------------------------------------------------------------------

/** Item type for SelectV2-family components. */
export type SelectV2ItemType = {
    label: string
    value: string
    checked?: boolean
    subLabel?: string
    slot1?: ReactNode
    slot2?: ReactNode
    slot3?: ReactNode
    slot4?: ReactNode
    disabled?: boolean
    onClick?: () => void
    subMenu?: SelectV2ItemType[]
    tooltip?: string | ReactNode
    tooltipProps?: {
        side?: TooltipSide
        align?: TooltipAlign
        size?: TooltipSize
        showArrow?: boolean
        delayDuration?: number
        offset?: number
    }
    disableTruncation?: boolean
}

// ---------------------------------------------------------------------------
// Unified menu-item token shape
// Both SSV2 and MSV2 item tokens are compatible with this base after the
// optionText→option rename in SSV2 tokens.
// ---------------------------------------------------------------------------

type SelectV2ItemStateToken<T> = {
    default: T
    hover: T
    active: T
    focus: T
    focusVisible: T
    disabled: T
    selected: T
}

export type SelectV2MenuItemTokensBase = {
    padding: CSSObject['padding']
    margin: CSSObject['margin']
    borderRadius: CSSObject['borderRadius']
    gap: CSSObject['gap']
    backgroundColor: SelectV2ItemStateToken<CSSObject['backgroundColor']>
    /** Option label text styles. Key is `option` in both V2 token types. */
    option: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: SelectV2ItemStateToken<CSSObject['color']>
    }
    description: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: SelectV2ItemStateToken<CSSObject['color']>
    }
}

// ---------------------------------------------------------------------------
// Discriminated-union props for the unified SelectItemV2 component
// ---------------------------------------------------------------------------

type SelectItemV2BaseProps = {
    item: SelectV2ItemType
    onSelect: (value: string) => void
    itemTokens: SelectV2MenuItemTokensBase
    index?: number
    selectedPosition?: 'first' | 'middle' | 'last' | 'only' | 'none'
    className?: string
}

/** Single-select mode: one value selected at a time; optional checkmark. */
export type SingleSelectItemV2Props = SelectItemV2BaseProps & {
    mode: 'single'
    selected: string
    showCheckmark?: boolean
}

/** Multi-select mode: multiple values; renders a Checkbox. */
export type MultiSelectItemV2Props = SelectItemV2BaseProps & {
    mode: 'multi'
    selectedValues: string[]
}

/** Discriminated union: covers both single and multi selection modes. */
export type SelectItemV2Props = SingleSelectItemV2Props | MultiSelectItemV2Props

// ---------------------------------------------------------------------------
// Backward-compat named export aliases used by existing consumers
// ---------------------------------------------------------------------------

/** @deprecated Use SelectItemV2Props with mode="single" */
export type SelectItemV2SingleProps = SingleSelectItemV2Props & {
    itemTokens: SingleSelectV2MenuItemTokensType
}

/** @deprecated Use SelectItemV2Props with mode="multi" */
export type MultiSelectItemV2LegacyProps = MultiSelectItemV2Props & {
    itemTokens: MultiSelectV2TokensType['menu']['item']
}

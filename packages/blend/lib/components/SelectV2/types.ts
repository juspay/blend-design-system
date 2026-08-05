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
    paddingTop: CSSObject['paddingTop']
    paddingRight: CSSObject['paddingRight']
    paddingBottom: CSSObject['paddingBottom']
    paddingLeft: CSSObject['paddingLeft']
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
    /** Internal identity used to recover focus while controlled results update. */
    focusIdentityValue?: string
    /**
     * Set false to render outside a Radix Menu.Root (e.g. inside a Drawer),
     * where RadixMenu.Item has no menu context to attach to. Falls back to a
     * plain click/keyboard handler instead. Defaults to true.
     */
    asMenuItem?: boolean
    /**
     * Overrides the row's ARIA role. Defaults to `option` in multi mode and
     * `menuitem` in single mode. Always-visible lists pass `option` for both
     * modes (APG listbox), which also emits `aria-disabled` on disabled rows.
     */
    role?: 'menuitem' | 'option'
    /**
     * Roving-tabindex control for list surfaces where only the active row is
     * a tab stop. Defaults to 0, or -1 when the item is disabled.
     */
    tabIndex?: number
    /** Overrides the computed `aria-selected`. */
    ariaSelected?: boolean
    /**
     * Total option count. Required by APG when a listbox is only partially
     * rendered, which is always true under virtualization.
     */
    ariaSetSize?: number
    /** 1-based position of this option within `ariaSetSize`. */
    ariaPosInSet?: number
    /** Optional accessible description, used for virtualized group context. */
    ariaDescription?: string
    /**
     * Renders the multi-select checkbox as a read-only visual instead of a
     * live `Checkbox`. Required when the row itself carries a widget role: a
     * real checkbox nested inside `role="option"` is a second focusable
     * control, which axe flags as `nested-interactive` and which neither
     * `tabindex="-1"` nor `aria-hidden` clears. Defaults to false so the
     * dropdown menus render exactly as before.
     */
    decorativeIndicator?: boolean
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

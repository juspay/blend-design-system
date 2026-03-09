# MultiSelect Component Documentation

## Overview

The Blend design system provides two MultiSelect components:

- **MultiSelect (v1)** – Original component; open state is internal; uses `useDrawerOnMobile`; menu dimensions via `minMenuWidth` / `maxMenuWidth` / `maxMenuHeight`; `onChange(selectedValue: string)` (single value toggle; clear via `onChange('')` or `onClearAllClick`).
- **MultiSelectV2** – Refactored API with controlled/uncontrolled open state, `onChange(value: string | string[])` for type-safe clear via `onChange([])`, theme-driven tokens (light/dark), and decomposed subcomponents. UI, accessibility, and data attributes match v1 for parity.

Both support: label/sublabel, hint text, required, help icon, placeholder, sizes (sm/md/lg), variants (container / no-container), selection display (count badge or text tags), grouped items, search, Select All, virtualization, infinite scroll, action buttons, custom trigger, clear button, and mobile panel/drawer.

---

## Requirements

- **Controlled value**: `selectedValues: string[]` and `onChange` – v1: `(selectedValue: string) => void` (toggle one value; `''` or `onClearAllClick` for clear); v2: `(value: string | string[]) => void` (toggle string or set full array e.g. `[]` for clear).
- **Labels**: Optional `label`, `subLabel`/`sublabel`, `hintText`, `required`, `helpIconText`/`helpIconHintText`.
- **Sizes**: `sm`, `md`, `lg` (via `MultiSelectMenuSize` / `MultiSelectV2Size`).
- **Variants**: `CONTAINER` (bordered box with label above) or `NO_CONTAINER` (minimal, no wrapper box).
- **Selection display**: `selectionTagType` – `COUNT` (badge with number) or `TEXT` (comma-separated labels).
- **States**: Default, hover, focus, error, disabled – trigger and clear button use token-driven background and outline.
- **Validation**: `error` and optional `errorMessage`.
- **Items**: Grouped list (`MultiSelectMenuGroupType[]` / `MultiSelectV2GroupType[]`) with optional group labels, separators, submenus, slots, tooltips.
- **Search**: Optional `enableSearch` and `searchPlaceholder`.
- **Select All**: Optional `enableSelectAll`, `selectAllText`, `onSelectAll` (v2 passes filtered groups).
- **Virtualization**: Optional `enableVirtualization`, `virtualListItemHeight`, `virtualListOverscan`; v1 defaults to `items.length > 20`, v2 uses `enableVirtualization && items.length > 20`.
- **Infinite scroll**: `onEndReached`, `endReachedThreshold`, `hasMore`, `loadingComponent`.
- **Actions**: Optional `showActionButtons`, `primaryAction`, `secondaryAction`.
- **Clear**: Optional `showClearButton`, `onClearAllClick`; when no custom handler, v1 calls `onChange('')`, v2 calls `onChange([])`.
- **Mobile**: On small viewports, optional full-screen panel (v1: `useDrawerOnMobile`, v2: `usePanelOnMobile`); both default to `true`.
- **Accessibility**: Trigger has `aria-expanded`, `aria-haspopup`, `aria-controls` (menu id), `role="combobox"`; menu has `role="listbox"`, `aria-multiselectable="true"`; label/hint/error linked via `aria-describedby` / `aria-labelledby`; keyboard (Enter/Space to open, arrows, Escape to close); clear button has `aria-label`.
- **Theme**: V1 uses `MULTI_SELECT` tokens (responsive); V2 uses `MULTI_SELECT_V2` with light/dark via `getMultiSelectV2Tokens(foundationToken, theme)`.

---

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Label] [SubLabel] [Required *] [Help icon]                                │  ← label row (variant=container)
├─────────────────────────────────────────────────────────────────────────────┤
│  [Slot] │ [Placeholder or selection tags/count]              │ [X] │ [Chevron] │  ← trigger (+ optional clear)
├─────────────────────────────────────────────────────────────────────────────┤
│  [Hint text / Error message]                                                 │  ← footer (variant=container)
└─────────────────────────────────────────────────────────────────────────────┘

Menu (dropdown or panel):
┌─────────────────────────────────────┐
│  [Search input] (if enableSearch)   │
├─────────────────────────────────────┤
│  [Select All] (if enableSelectAll)  │
├─────────────────────────────────────┤
│  Group label (optional)             │
│    Option 1  [checkbox]             │
│    Option 2  (subLabel, slot1..4)   │
│  ───────── separator ─────────      │
│  Group 2                            │
│    Option A  [submenu →]            │
├─────────────────────────────────────┤
│  [Primary action] [Secondary action]│  ← optional action bar
└─────────────────────────────────────┘
```

- **Top (container variant)**: Label, subLabel, required asterisk, optional help icon – from shared `InputLabels`.
- **Trigger**: Optional left slot; placeholder or selection (count badge or text tags); optional clear (X) button; chevron. Height/padding/border/background from tokens by size and variant; trigger and clear button states (open/closed/hover/focus/error) from tokens.
- **Footer (container variant)**: Hint text and/or error message – from shared `InputFooter`.
- **Menu**: Search (optional), Select All row (optional), grouped items (labels, separators, submenus), optional action buttons at bottom.

---

## Props & Types Comparison

### Shared / equivalent props (v1 vs v2)

| Prop                                                         | V1 (MultiSelect)                          | V2 (MultiSelectV2)                                 |
| ------------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------- |
| label                                                        | ✓                                         | ✓                                                  |
| sublabel / subLabel                                          | sublabel                                  | subLabel                                           |
| hintText                                                     | ✓                                         | ✓                                                  |
| required                                                     | ✓                                         | ✓                                                  |
| helpIconHintText / helpIconText                              | helpIconHintText                          | helpIconText                                       |
| placeholder                                                  | ✓                                         | ✓                                                  |
| size                                                         | MultiSelectMenuSize                       | MultiSelectV2Size                                  |
| items                                                        | MultiSelectMenuGroupType[]                | MultiSelectV2GroupType[] (optional, default [])    |
| variant                                                      | MultiSelectVariant                        | MultiSelectV2Variant                               |
| selectedValues                                               | string[]                                  | string[]                                           |
| onChange                                                     | (selectedValue: string) => void           | (value: string \| string[]) => void                |
| enableSearch                                                 | ✓                                         | ✓                                                  |
| searchPlaceholder                                            | ✓                                         | ✓                                                  |
| enableSelectAll, selectAllText                               | ✓                                         | ✓                                                  |
| maxSelections                                                | ✓                                         | ✓                                                  |
| slot                                                         | ReactNode                                 | ReactNode                                          |
| disabled                                                     | ✓                                         | ✓                                                  |
| name                                                         | ✓                                         | ✓                                                  |
| alignment                                                    | MultiSelectMenuAlignment                  | MultiSelectV2Alignment                             |
| side                                                         | MultiSelectMenuSide                       | MultiSelectV2Side                                  |
| sideOffset, alignOffset                                      | ✓                                         | ✓                                                  |
| min/max menu width/height                                    | minMenuWidth, maxMenuWidth, maxMenuHeight | minPopoverWidth, maxPopoverWidth, maxPopoverHeight |
| inline                                                       | ✓                                         | ✓                                                  |
| onBlur / onFocus                                             | ✓                                         | ✓                                                  |
| error / errorMessage                                         | ✓                                         | ✓                                                  |
| fullWidth                                                    | ✓                                         | ✓                                                  |
| showActionButtons, primaryAction, secondaryAction            | ✓                                         | ✓                                                  |
| showItemDividers, showHeaderBorder                           | ✓                                         | ✓                                                  |
| enableVirtualization                                         | ✓ (default: items.length > 20)            | ✓ (default: false; use with items.length > 20)     |
| virtualListItemHeight, virtualListOverscan                   | ✓                                         | ✓                                                  |
| onEndReached, endReachedThreshold, hasMore, loadingComponent | ✓                                         | ✓                                                  |
| skeleton                                                     | MultiSelectSkeletonProps                  | MultiSelectV2SkeletonProps                         |
| maxTriggerWidth, minTriggerWidth                             | ✓                                         | ✓                                                  |
| allowCustomValue, customValueLabel                           | ✓                                         | ✓                                                  |
| showClearButton, onClearAllClick                             | ✓                                         | ✓                                                  |
| multiSelectGroupPosition                                     | ✓                                         | ✓                                                  |
| selectionTagType                                             | MultiSelectSelectionTagType               | MultiSelectV2SelectionTagType                      |
| customTrigger                                                | ReactNode                                 | ReactElement                                       |

### V1-only

- **height**: Optional number for wrapper (v2 uses token height).
- **itemsToRender**: Optional override for virtualization (v2 does not expose).
- **useDrawerOnMobile**: Same behavior as V2’s `usePanelOnMobile`; name differs.

### V2-only

- **open**: Controlled open state (boolean). If provided, component is controlled.
- **defaultOpen**: Initial open state when uncontrolled.
- **onOpenChange**: `(open: boolean) => void` – called when menu opens or closes.
- **usePanelOnMobile**: Same behavior as V1’s `useDrawerOnMobile`; name aligned with “panel” terminology.

### Naming differences

- **sublabel vs subLabel**: V1 uses `sublabel`; V2 uses `subLabel` (camelCase).
- **helpIconHintText vs helpIconText**: V1 uses `helpIconHintText`; V2 uses `helpIconText`.
- **Menu vs popover**: V1 uses `minMenuWidth`, `maxMenuWidth`, `maxMenuHeight`; V2 uses `minPopoverWidth`, `maxPopoverWidth`, `maxPopoverHeight`. Behavior is the same.
- **Mobile**: V1 `useDrawerOnMobile` vs V2 `usePanelOnMobile` – same meaning, different name.

### onChange behavior

- **V1**: `onChange(selectedValue: string)`. Toggle one value by passing that value; clear by passing `''` or using `onClearAllClick()`. Select All is implemented by calling `onChange(value)` repeatedly for each value.
- **V2**: `onChange(value: string | string[])`. Toggle one value by passing that string; set full selection by passing `string[]`; clear by passing `[]`. Type-safe; Select All uses the same pattern with array updates.

### Item and group types

- **V1**: `MultiSelectMenuItemType`, `MultiSelectMenuGroupType` (items have `subMenu`, `tooltip`, `tooltipProps`, slots, etc.).
- **V2**: `MultiSelectV2ItemType`, `MultiSelectV2GroupType` – same shape; type names prefixed for V2. Both support grouped items, optional group labels, separators, submenus, and per-item tooltips/slots.
- **V2** also defines `FlattenedMultiSelectV2Item` for internal list rendering (item vs label vs separator).

### Data attributes (parity for testing and automation)

Both versions expose the following for consistency:

| Element               | Attribute                                                                                    | V1                      | V2                      |
| --------------------- | -------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- |
| Root wrapper          | data-multi-select                                                                            | label or 'multi-select' | "multi-select" (stable) |
| Root wrapper          | data-status                                                                                  | "disabled" \| "enabled" | "disabled" \| "enabled" |
| Trigger button        | data-element="multi-select-button"                                                           | ✓                       | ✓                       |
| Slot                  | data-element="icon"                                                                          | ✓                       | ✓                       |
| Placeholder text      | data-element="placeholder", data-id                                                          | ✓                       | ✓                       |
| Selection tag / count | data-element="selection-tag", data-id, data-badge-value                                      | ✓                       | ✓                       |
| Chevron               | data-element="chevron-icon"                                                                  | ✓                       | ✓                       |
| Clear button          | data-element="clear-button"                                                                  | ✓                       | ✓                       |
| Menu content          | data-dropdown="dropdown"                                                                     | ✓                       | ✓                       |
| Select All row        | data-element="selectAll-checkbox", data-element="checkbox", data-id, data-status, data-state | ✓                       | ✓                       |
| Action buttons        | data-button-for, data-dynamic-button, data-batch-value                                       | ✓                       | ✓                       |

V1 uses `data-multi-select={label || 'multi-select'}`; V2 uses `data-multi-select="multi-select"` for a stable test target.

---

## Token Structure (V2 – anatomy-driven)

Tokens are defined in `multiSelectV2.tokens.ts` with light/dark in `multiSelectV2.light.tokens.ts` and `multiSelectV2.dark.tokens.ts`. Structure mirrors the component’s UI parts. Theme is chosen via `getMultiSelectV2Tokens(foundationToken, theme)`.

**Main type**: `MultiSelectV2TokensType`

- **gap**: Spacing between label row, trigger, and footer.
- **label, subLabel, hintText**: Typography (fontSize, fontWeight) and **color by item state** (default, hover, active, focus, focusVisible, disabled, selected) – `StateToken<CSSObject['color']>` (from `SelectV2ItemStates`).
- **errorMessage, required**: Single color; errorMessage has fontSize/fontWeight.
- **trigger**:
    - **height, padding, borderRadius**: By **size × variant**.
    - **boxShadow**: By variant.
    - **backgroundColor, outline**: By **variant × trigger state** (open, closed, hover, focus, error) – `TriggerStateToken` (from `SelectV2TriggerStates`).
    - **slot**: gap.
    - **selectionTag**: By variant and selectionTagType (COUNT / TEXT): color, backgroundColor, fontWeight; plus marginLeft, borderRadius, paddingCount, paddingText.
    - **chevron**: gap, width, height, iconSize.
    - **clearButton** (optional): backgroundColor, outline by trigger state (e.g. closed, hover, focus, error); color; width.
    - **floatingLabel**: paddingTop.
    - **placeholder, selectedValue**: Typography and single color.
- **menu**:
    - **backgroundColor, border, borderRadius**, padding by size × variant; **minWidth**; **scroll** (height, maxHeight).
    - **header**: backgroundColor, borderBottom, selectAllRowPaddingLeft, selectAllRowPaddingRight.
    - **selectAll**: padding, borderRadius.
    - **list**: padding, paddingTop.
    - **actions**: padding, gap, backgroundColor, borderTop.
    - **item**: padding, margin, borderRadius, gap; **backgroundColor by item state**; **optionsLabel, option, description** (typography + color by item state); **seperator** (color, height, margin).
- **subMenu**: trigger (padding, margin, borderRadius); content (borderRadius, padding).
- **drawer** (mobile panel): header (paddingLeft, paddingRight, paddingBottom, borderBottom); search (paddingLeft, paddingRight, marginTop, marginBottom); content (gap).

**Shared state types** (in `SelectV2/selectV2.tokenStates.ts`): `SelectV2TriggerStates` (open, closed, hover, focus, error), `SelectV2ItemStates` (default, hover, active, focus, focusVisible, disabled, selected). Reused by SingleSelectV2 and MultiSelectV2.

Usage pattern: `tokens.trigger.height[size][variant]`, `tokens.trigger.backgroundColor[variant][triggerState]`, `tokens.trigger.clearButton?.backgroundColor[state]`, `tokens.menu.item.backgroundColor[itemState]`, etc.

---

## Design Decisions

### 1. onChange signature (V2)

**Decision**: V2 uses `onChange(value: string | string[]) => void` instead of V1’s `onChange(selectedValue: string) => void`.

**Rationale**: Clear is expressed as `onChange([])` rather than `onChange('')`, giving correct types and clearer intent. Toggle remains `onChange(value)` for a single value.

### 2. Controlled vs uncontrolled open (V2 only)

**Decision**: V2 supports both controlled (`open` + `onOpenChange`) and uncontrolled (internal state) open state.

**Rationale**: Parents can close on route change, sync with other UI, or track open/close for analytics.

### 3. Panel vs drawer naming (V2)

**Decision**: V2 uses `usePanelOnMobile`; V1 uses `useDrawerOnMobile`. Same behavior (full-screen on small viewports).

**Rationale**: Aligns naming with other components that use “panel” for full-screen overlay.

### 4. Popover vs menu width/height (V2)

**Decision**: V2 uses `minPopoverWidth`, `maxPopoverWidth`, `maxPopoverHeight` instead of `minMenuWidth`, etc.

**Rationale**: Matches Radix popover/dropdown API and clarifies that constraints apply to the popover content.

### 5. customTrigger: ReactNode vs ReactElement (V1 vs V2)

**Decision**: V1 accepts `ReactNode`; V2 requires `ReactElement` for the custom trigger.

**Rationale**: V2 uses Radix `Trigger asChild` and must clone and forward ref and props (e.g. `data-radix-dropdown-menu-trigger`). A single cloneable element is required; `ReactElement` makes that contract explicit.

### 6. Virtualization default (V1 vs V2)

**Decision**: V1 defaults to enabling virtualization when `items.length > 20`; V2 defaults `enableVirtualization` to `false` and uses `shouldVirtualize = enableVirtualization && items.length > 20`.

**Rationale**: V2 avoids derived default from props and lets the consumer opt in; behavior when enabled matches V1 for large lists.

### 7. Token anatomy (V2)

**Decision**: Token keys mirror the component’s anatomy (label, trigger, trigger.clearButton, trigger.selectionTag, menu.header, menu.selectAll, menu.list, menu.actions, menu.item, subMenu, drawer). State-driven maps use `TriggerStateToken` and `StateToken` (item states).

**Rationale**: Reading the token type makes the component structure and which part each token affects obvious; shared state types live in SelectV2 for consistency.

### 8. Error and trigger/clear state (both)

**Decision**: Error overrides normal trigger and clear-button state (outline and background use error styling when `error` is true).

**Rationale**: Validation state stays visible until the error is cleared, consistent with other inputs.

### 9. data-multi-select value (V2)

**Decision**: V2 uses a stable `data-multi-select="multi-select"` instead of the label.

**Rationale**: Stable attribute improves test and automation reliability; label may change.

### 10. Clear button and trigger border (V2)

**Decision**: Clear button uses its own token slice `trigger.clearButton` with state-based `backgroundColor` and `outline` (e.g. closed, hover, focus, error). Wrapper uses `alignItems='stretch'` when clear is visible so trigger and clear button share height; clear button has `minHeight` from trigger tokens.

**Rationale**: Keeps border visible when hovering over the clear button and matches V1 behavior; all layout and state styling come from tokens.

---

## Summary Table: When to Use Which

| Need                                                                          | Prefer                                               |
| ----------------------------------------------------------------------------- | ---------------------------------------------------- |
| Controlled open state or onOpenChange                                         | MultiSelectV2                                        |
| Type-safe clear via onChange([])                                              | MultiSelectV2                                        |
| Consistent “panel”/“popover” naming                                           | MultiSelectV2                                        |
| customTrigger as any ReactNode                                                | MultiSelect (v1)                                     |
| customTrigger as single ReactElement (ref forwarding)                         | MultiSelectV2                                        |
| Light/dark tokens from theme                                                  | MultiSelectV2 (`getMultiSelectV2Tokens(..., theme)`) |
| Default virtualization when items > 20                                        | MultiSelect (v1)                                     |
| Explicit virtualization opt-in                                                | MultiSelectV2                                        |
| Same core behavior (labels, search, Select All, actions, clear, mobile panel) | Either; API and naming differ as above               |

---

## Source of truth for refactor

This document is the **source of truth** for the MultiSelect refactor (V2). When implementing or changing MultiSelectV2:

1. **UI parity**: Trigger (including slot, placeholder, selection tags, count badge, clear button, chevron), label row, footer, menu (search, Select All, groups, items, separators, submenus, actions) must match V1 behavior and appearance unless explicitly documented above.
2. **Accessibility**: Same roles, ARIA attributes, and keyboard behavior as V1; trigger and menu IDs and relationships must be correct.
3. **Data attributes**: Preserve the data attributes listed in the table so tests and automation remain valid.
4. **Tokens**: All visual and layout values that are design-derived belong in tokens (V2); static layout (e.g. flex, overflow) may stay in components. Token keys must be valid CSS property names where the value is a CSS value.
5. **API**: Follow the props and types described here; V2-specific props (open, defaultOpen, onOpenChange, usePanelOnMobile, popover width/height, helpIconText, subLabel) and the V2 onChange signature are intentional.

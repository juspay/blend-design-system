# MultiSelect Component Documentation

## Overview

The Blend design system provides two MultiSelect components:

- **MultiSelect (v1)** – Original component; open state is internal; uses `useDrawerOnMobile`; flat props for menu dimensions (`minMenuWidth` / `maxMenuWidth` / `maxMenuHeight`), alignment, side, error, search, trigger dimensions; `onChange(selectedValue: string)` (single value toggle; clear via `onChange('')` or `onClearAllClick`).
- **MultiSelectV2** – Refactored API with controlled open state (`open` / `onOpenChange`), **grouped props** for menu dimensions, trigger dimensions, menu position, search, and error (same shapes as SingleSelectV2); extends `ButtonHTMLAttributes`; `onChange(value: string | string[])` for type-safe clear via `onChange([])`; theme-driven tokens (light/dark). UI, accessibility, and data attributes match v1 for parity.

Both support: label/sublabel, hint text, required, help icon, placeholder, sizes (sm/md/lg), variants (container / no-container), selection display (count badge or text tags), grouped items, search, Select All, virtualization, infinite scroll, action buttons, custom trigger, clear button, and mobile panel/drawer.

---

## Requirements

- **Controlled value**: `selectedValues: string[]` and `onChange` – v1: `(selectedValue: string) => void` (toggle one value; `''` or `onClearAllClick` for clear); v2: `(value: string | string[]) => void` (toggle string or set full array e.g. `[]` for clear).
- **Labels**: Optional `label`, `subLabel`/`sublabel`, `hintText`, `required`, `helpIconText`/`helpIconHintText`.
- **Sizes**: `sm`, `md`, `lg` (via `MultiSelectMenuSize` / `MultiSelectV2Size`).
- **Variants**: `CONTAINER` (bordered box with label above) or `NO_CONTAINER` (minimal, no wrapper box).
- **Selection display**: `selectionTagType` – `COUNT` (badge with number) or `TEXT` (comma-separated labels).
- **States**: Default, hover, focus, error, disabled – trigger and clear button use token-driven background and outline.
- **Validation**: V1: `error` (boolean) and `errorMessage` (string). V2: `error?: SelectV2ErrorState` with `{ show?: boolean, message?: string }`.
- **Items**: Grouped list (`MultiSelectMenuGroupType[]` / `MultiSelectV2GroupType[]`) with optional group labels, separators, submenus, slots, tooltips.
- **Search**: V1: `enableSearch` and `searchPlaceholder`. V2: `search?: SelectV2SearchConfig` with `{ show?: boolean, placeholder?: string }`.
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

### V1: flat props

V1 uses flat props: `alignment`, `side`, `sideOffset`, `alignOffset`, `minMenuWidth`, `maxMenuWidth`, `maxMenuHeight`, `enableSearch`, `searchPlaceholder`, `error`, `errorMessage`, `fullWidth`, `maxTriggerWidth`, `minTriggerWidth`, `disabled`, `name`, `onBlur`, `onFocus`.

### V2: grouped props and ButtonHTMLAttributes

V2 extends `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className' | 'onChange' | 'slot'>`, so **disabled**, **name**, **onFocus**, **onBlur** are passed through from the consumer.

V2 **replaces** flat props with **grouped** types (same as SingleSelectV2):

| V1 (flat)                                         | V2 (grouped)                                                                                    |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `alignment`, `side`, `sideOffset`, `alignOffset`  | **menuPosition?**: `{ alignment?, side?, sideOffset?, alignOffset? }` (`SelectV2MenuPosition`)  |
| `minMenuWidth`, `maxMenuWidth`, `maxMenuHeight`   | **menuDimensions?**: `{ minWidth?, maxWidth?, maxHeight? }` (`SelectV2MenuDimensions`)          |
| `enableSearch`, `searchPlaceholder`               | **search?**: `{ show?, placeholder? }` (`SelectV2SearchConfig`)                                 |
| `error`, `errorMessage`                           | **error?**: `{ show?, message? }` (`SelectV2ErrorState`)                                        |
| `fullWidth`, `maxTriggerWidth`, `minTriggerWidth` | **triggerDimensions?**: `{ width?, minWidth?, maxWidth? }`. Use `width: '100%'` for full-width. |

### Shared / equivalent props (v1 vs v2)

| Prop                                                        | V1 (MultiSelect)                            | V2 (MultiSelectV2)                            |
| ----------------------------------------------------------- | ------------------------------------------- | --------------------------------------------- |
| label                                                       | ✓                                           | ✓                                             |
| sublabel / subLabel                                         | sublabel                                    | subLabel                                      |
| hintText, required, placeholder                             | ✓                                           | ✓                                             |
| helpIconHintText / helpIconText                             | helpIconHintText                            | helpIconText                                  |
| size                                                        | MultiSelectMenuSize                         | MultiSelectV2Size (SM, MD, LG)                |
| items                                                       | MultiSelectMenuGroupType[]                  | MultiSelectV2GroupType[] (optional)           |
| variant                                                     | MultiSelectVariant                          | MultiSelectV2Variant                          |
| selectedValues                                              | string[]                                    | string[]                                      |
| onChange                                                    | (selectedValue: string) => void             | (value: string \| string[]) => void           |
| search                                                      | enableSearch, searchPlaceholder             | search?: SelectV2SearchConfig                 |
| enableSelectAll, selectAllText, maxSelections               | ✓                                           | ✓                                             |
| slot                                                        | ReactNode                                   | ReactNode                                     |
| disabled, name, onBlur, onFocus                             | ✓ explicit                                  | ✓ via ButtonHTMLAttributes                    |
| alignment, side, sideOffset, alignOffset                    | ✓ flat                                      | menuPosition?: SelectV2MenuPosition           |
| min/max menu width/height                                   | minMenuWidth, maxMenuWidth, maxMenuHeight   | menuDimensions?: SelectV2MenuDimensions       |
| inline                                                      | ✓                                           | ✓                                             |
| error / errorMessage                                        | error (bool), errorMessage                  | error?: SelectV2ErrorState                    |
| fullWidth / trigger dimensions                              | fullWidth, maxTriggerWidth, minTriggerWidth | triggerDimensions?: SelectV2TriggerDimensions |
| showActionButtons, primaryAction, secondaryAction           | ✓                                           | ✓                                             |
| showItemDividers, showHeaderBorder                          | ✓                                           | ✓                                             |
| enableVirtualization (V2 default: false)                    | ✓ (default: items.length > 20)              | ✓                                             |
| virtualListItemHeight, virtualListOverscan, onEndReached, … | ✓                                           | ✓                                             |
| skeleton                                                    | MultiSelectSkeletonProps                    | MultiSelectV2SkeletonProps                    |
| allowCustomValue, customValueLabel                          | ✓                                           | ✓                                             |
| showClearButton, onClearAllClick                            | ✓                                           | ✓                                             |
| multiSelectGroupPosition                                    | ✓                                           | ✓                                             |
| selectionTagType                                            | MultiSelectSelectionTagType                 | MultiSelectV2SelectionTagType                 |
| customTrigger                                               | ReactNode                                   | ReactElement                                  |

### V1-only

- **height**: Optional number for wrapper (v2 uses token height).
- **itemsToRender**: Optional override for virtualization (v2 does not expose).
- **useDrawerOnMobile**: Same behavior as V2’s `usePanelOnMobile`; name differs.

### V2-only

- **open**: Controlled open state (boolean). If provided, component is controlled.
- **onOpenChange**: `(open: boolean) => void` – called when menu opens or closes.
- **usePanelOnMobile**: Same behavior as V1’s `useDrawerOnMobile`; name aligned with “panel” terminology.

### Naming and structure differences

- **sublabel vs subLabel**: V1 uses `sublabel`; V2 uses `subLabel` (camelCase).
- **helpIconHintText vs helpIconText**: V1 uses `helpIconHintText`; V2 uses `helpIconText`.
- **Menu dimensions**: V1 uses `minMenuWidth`, `maxMenuWidth`, `maxMenuHeight`. V2 uses **menuDimensions** `{ minWidth?, maxWidth?, maxHeight? }` (same behavior; “menu” naming).
- **Trigger dimensions**: V1 uses `fullWidth`, `maxTriggerWidth`, `minTriggerWidth`. V2 uses **triggerDimensions** `{ width?, minWidth?, maxWidth? }`; use `width: '100%'` for full-width.
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

### 2. Controlled open state (V2 only)

**Decision**: V2 supports controlled open state via `open` and `onOpenChange`. When `open` is omitted, component uses internal state.

**Rationale**: Parents can close on route change, sync with other UI, or track open/close for analytics.

### 3. Panel vs drawer naming (V2)

**Decision**: V2 uses `usePanelOnMobile`; V1 uses `useDrawerOnMobile`. Same behavior (full-screen on small viewports).

**Rationale**: Aligns naming with other components that use “panel” for full-screen overlay.

### 4. Grouped menu and trigger dimensions (V2)

**Decision**: V2 uses **menuDimensions** `{ minWidth?, maxWidth?, maxHeight? }` and **triggerDimensions** `{ width?, minWidth?, maxWidth? }` instead of flat `minMenuWidth`, `maxMenuWidth`, `maxMenuHeight`, `fullWidth`, `maxTriggerWidth`, `minTriggerWidth` (same pattern as SingleSelectV2).

**Rationale**: Grouped props keep the API consistent across Select V2 components; “menu” naming is used. Trigger width is explicit (e.g. `width: '100%'` for full-width).

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
| Consistent “panel”/“menu” naming and grouped props (menuDimensions, etc.)     | MultiSelectV2                                        |
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
5. **API**: Follow the props and types described here; V2-specific props (open, onOpenChange, usePanelOnMobile, grouped menuDimensions/triggerDimensions/menuPosition/search/error, helpIconText, subLabel) and the V2 onChange signature are intentional.

# Menu Component Documentation

## Overview

The Blend design system provides two Menu components:

- **Menu (v1)** – Original component; uses internal or controlled open state; flat props for alignment, side, dimensions, and virtualization; optional `MENU` tokens; some hardcoded styles (e.g. content background, z-index); typo in prop name `collisonBoundaryRef`.
- **MenuV2** – Refactored API with **token-driven styling** (no hardcoded colors/z-index/dimensions; content z-index from tokens), **grouped virtual config** (`virtualScrolling?: { itemHeight?, overscan?, threshold? }`), **slot + slot2/slot3/slot4** (same positions as v1; `slot` for leading, `slot1` supported for backward compat), optional `id` on groups and items; correct `collisionBoundaryRef`; TanStack Virtual for large lists; theme via `getMenuV2Tokens(foundationToken, theme)` from `menuV2.tokens`.

Both support: trigger, grouped items with labels and separators, search, submenus with optional submenu search, item variants (default/action), action types (primary/danger), slots, tooltips, virtualization, controlled open state, and Radix-based positioning (alignment, side, offsets, collision boundary).

---

## Requirements

- **Trigger**: Any `ReactNode`; opens the menu on click (Radix Trigger).
- **Items**: Grouped list (`MenuGroupType[]` / `MenuV2GroupType[]`) with optional group labels, separators, and nested submenus.
- **Item content**: Label, optional subLabel, up to 4 slot positions (v1 and V2: `slot` or `slot1` for leading, then `slot2`, `slot3`, `slot4`; V2 `slot` takes priority over `slot1`), variant (default/action), actionType (primary/danger), disabled, onClick, tooltip/tooltipProps.
- **Submenus**: Nested items; optional `enableSubMenuSearch`, `subMenuSearchPlaceholder`.
- **Search**: Top-level `enableSearch`, `searchPlaceholder`; filters items and submenus by label/sublabel.
- **Virtualization**: V1: `enableVirtualScrolling`, `virtualItemHeight` (number or function), `virtualOverscan`, `virtualScrollThreshold`. V2: `enableVirtualScrolling` and `virtualScrolling?: { itemHeight?, overscan?, threshold? }`; uses TanStack Virtual when item count ≥ threshold (default 30).
- **Positioning**: `alignment`, `side`, `sideOffset`, `alignOffset`, `collisionBoundaryRef` (V1 had typo `collisonBoundaryRef`).
- **Dimensions**: `maxHeight`, `minHeight`, `maxWidth`, `minWidth`; V2 falls back to tokens when min/max width omitted.
- **State**: `open`, `onOpenChange` for controlled open; `asModal`.
- **Accessibility**: Radix menu roles and keyboard navigation; focus management; `data-status="disabled"` on disabled items; `_focusVisible` from tokens for focus ring.
- **Theme**: V1 uses `MENU` tokens; V2 uses `MENU_V2` via `getMenuV2Tokens(foundationToken, theme)` exported from `menuV2.tokens` (light/dark).

---

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Trigger]                                                               │  ← Radix Trigger (any ReactNode)
└─────────────────────────────────────────────────────────────────────────┘

Menu (dropdown):
┌─────────────────────────────────────┐
│  [Search input] (if enableSearch)   │
├─────────────────────────────────────┤
│  Group label (optional)             │
│    Item 1  [slot1] label [slot2..4] │
│    Item 2  (subLabel, tooltip)      │
│  ───────── separator ─────────      │
│  Group 2                            │
│    Item A  [submenu →]              │
│    Submenu panel (min/max from      │
│      tokens; z-index from tokens)   │
└─────────────────────────────────────┘
```

- **Trigger**: Opens/closes the menu; no built-in styling (consumer provides button or custom element).
- **Content**: Search (optional), then groups; each group can have a label, items, and a separator below. Items can be leaf (with `onClick`) or submenu (nested list). All dimensions and colors come from tokens in V2; V1 had some hardcoded values.
- **Submenu**: Nested content in a portal; V2 uses content tokens for background, border, borderRadius, boxShadow, zIndex, minWidth, maxWidth.

---

## Props & Types Comparison

### V1: flat props

V1 uses flat props: `alignment`, `side`, `sideOffset`, `alignOffset`, `maxHeight`, `minHeight`, `maxWidth`, `minWidth`, `enableSearch`, `searchPlaceholder`, `enableVirtualScrolling`, `virtualItemHeight`, `virtualOverscan`, `virtualScrollThreshold`, `open`, `onOpenChange`, `asModal`, `collisonBoundaryRef`, `skeleton`.

### V2: virtual config and tokens

V2 keeps flat props for positioning and dimensions but:

- **Virtualization**: Replaces `virtualItemHeight`, `virtualOverscan`, `virtualScrollThreshold` with **`virtualScrolling?`**: `{ itemHeight?, overscan?, threshold? }` (`MenuV2VirtualScrollingConfig`). TanStack Virtual is used when `enableVirtualScrolling` is true and flattened row count ≥ `threshold` (default 30).
- **Slots**: **`slot`** for leading (same role as v1’s `slot1`); **`slot2`, `slot3`, `slot4`** for other positions. **`slot1`** supported for backward compatibility; `getItemSlots(item)` returns `[slot ?? slot1, slot2, slot3, slot4]` (slot takes priority when both set).
- **Spelling**: **`collisionBoundaryRef`** (correct).
- **Ids**: **`id`** optional on `MenuV2GroupType` and `MenuV2ItemType` for stable keys and a11y.
- **Theme**: Tokens (including content `minWidth`, `maxWidth`, `zIndex`) from `getMenuV2Tokens(foundationToken, theme)` in `menuV2.tokens`; no hardcoded colors or z-index in submenu/content.

### Shared / equivalent props (v1 vs v2)

| Prop                                                         | V1 (Menu)                         | V2 (MenuV2)                           |
| ------------------------------------------------------------ | --------------------------------- | ------------------------------------- |
| trigger                                                      | ✓                                 | ✓                                     |
| items                                                        | MenuGroupType[]                   | MenuV2GroupType[]                     |
| maxHeight, minHeight, maxWidth, minWidth                     | ✓                                 | ✓ (min/max width fallback to tokens)  |
| enableSearch, searchPlaceholder                              | ✓                                 | ✓                                     |
| open, onOpenChange                                           | ✓                                 | ✓                                     |
| asModal                                                      | ✓                                 | ✓                                     |
| alignment, side, sideOffset, alignOffset                     | MenuAlignment, MenuSide           | MenuV2Alignment, MenuV2Side           |
| collisionBoundaryRef                                         | collisonBoundaryRef (typo)        | collisionBoundaryRef                  |
| enableVirtualScrolling                                       | ✓                                 | ✓                                     |
| virtualItemHeight                                            | number or (item, index) => number | virtualScrolling?.itemHeight (number) |
| virtualOverscan                                              | ✓                                 | virtualScrolling?.overscan            |
| virtualScrollThreshold                                       | ✓                                 | virtualScrolling?.threshold           |
| Item: label, subLabel, slot / slot1, slot2, slot3, slot4     | slot1–slot4                       | slot (or slot1), slot2, slot3, slot4  |
| Item: variant, actionType, disabled, onClick                 | ✓                                 | ✓                                     |
| Item: subMenu, enableSubMenuSearch, subMenuSearchPlaceholder | ✓                                 | ✓                                     |
| Item: tooltip, tooltipProps                                  | ✓                                 | ✓                                     |
| Group: label, items, showSeparator                           | ✓                                 | ✓                                     |
| Group/Item id                                                | —                                 | optional id                           |

### V1-only

- **virtualItemHeight** as function: `(item: MenuItemType, index: number) => number` for per-item height in virtual list. V2 uses a single `itemHeight` in `virtualScrolling`.
- **Submenu virtualization**: V1 item type has `enableSubMenuVirtualScrolling`, `subMenuVirtualItemHeight`, `subMenuVirtualOverscan`, `subMenuVirtualScrollThreshold`; V2 does not implement submenu virtualization (these props removed to avoid dead API).
- **skeleton**: V1 supports `skeleton`; V2 does not (removed until implemented).
- **collisonBoundaryRef** (typo) – same behavior as V2’s `collisionBoundaryRef`.

### V2-only

- **slot**: Leading slot prop; `slot1` still supported for compatibility. `getItemSlots(item)` returns `[slot ?? slot1, slot2, slot3, slot4]` (slot takes priority when both set).
- **virtualScrolling**: Single config object `{ itemHeight?, overscan?, threshold? }`.
- **id** on `MenuV2GroupType` and `MenuV2ItemType`.
- **Token export**: `getMenuV2Tokens` is exported from **`menuV2.tokens`**; content z-index from `menuTokens.content.zIndex` (no SelectV2 constant).

### Naming and structure differences

- **Collision boundary**: V1 `collisonBoundaryRef` → V2 `collisionBoundaryRef`.
- **Virtual props**: V1 flat `virtualItemHeight`, `virtualOverscan`, `virtualScrollThreshold` → V2 `virtualScrolling?: MenuV2VirtualScrollingConfig`.
- **Enums**: V1 `MenuAlignment`, `MenuSide`, `MenuItemVariant`, `MenuItemActionType` → V2 `MenuV2Alignment`, `MenuV2Side`, `MenuV2ItemVariant`, `MenuV2ItemActionType`.

### Item and group types

- **V1**: `MenuItemType`, `MenuGroupType` (no `id`; `slot1`–`slot4` only).
- **V2**: `MenuV2ItemType`, `MenuV2GroupType` – optional `id`; `slot` (or `slot1`), `slot2`, `slot3`, `slot4`; same shape otherwise (label, subLabel, variant, actionType, disabled, onClick, subMenu, search, tooltip).

### Internal / utils (V2)

- **getItemSlots(item)**: Returns `[leading, slot2, slot3, slot4]` with `leading = item.slot ?? item.slot1` (slot takes priority over slot1).
- **flattenMenuV2Groups(groups)**: Flattens groups into `MenuV2FlatRow[]` (label | separator | item) for virtual list.
- **filterMenuItem**, **filterMenuGroups**: Search filtering; shared with V1-style logic.

---

## Token Structure (V2)

Tokens are defined in `menuV2.tokens.ts`. Theme is selected via **`getMenuV2Tokens(foundationToken, theme)`** exported from **`menuV2.tokens`** (same file as types); light/dark implementations live in `menuV2.light.tokens` and `menuV2.dark.tokens`, but the public API is the tokens file.

**Responsive**: Per breakpoint (`sm`, `lg` from `BreakpointType`). Each breakpoint has a full `MenuV2TokensType`. Theme (light/dark) is chosen inside `getMenuV2Tokens`.

**Main type**: `MenuV2TokensType`

- **content**: backgroundColor, border, borderRadius, boxShadow, **zIndex**, **minWidth**, **maxWidth**, padding (top/right/bottom/left). Used for main menu Content (z-index from tokens) and submenu panel; no hardcoded z-index or dimensions in components.
- **item**: padding, margin, borderRadius, gap; **backgroundColor** by variant (default/action) × actionType (primary/danger) × enabled/disabled × state (default, hover, active, focus, focusVisible, disabled, selected); **optionsLabel** (fontSize, fontWeight, color, padding, margin); **option** (fontSize, fontWeight, color by variant/actionType/enabled/disabled/state); **description** (sublabel; same color structure); **separator** (color, height, margin).

**Helper types**: `MenuV2ItemStates` (from SelectV2); `StateToken<T>` for state-keyed values.

Usage: `tokens.content.zIndex`, `tokens.content.minWidth`, `tokens.content.maxWidth`, `tokens.item.backgroundColor[variant].enabled[state]`, etc. Submenu and content use the same content tokens for layout and stacking.

---

## Design Decisions

### 1. getMenuV2Tokens in menuV2.tokens

**Decision**: `getMenuV2Tokens(foundationToken, theme)` is exported from **`menuV2.tokens`**, not from `menuV2.light.tokens` or `menuV2.dark.tokens`. The tokens file imports light/dark getters and returns the correct theme.

**Rationale**: Single entry point for theme-aware tokens (same pattern as SingleSelectV2’s `singleSelectV2.tokens`). Consumers and `index.ts` import from `menuV2.tokens` only.

### 2. No hardcoded values in V2

**Decision**: V2 content and submenu use tokens for backgroundColor, border, borderRadius, boxShadow, zIndex, minWidth, maxWidth. Default min/max widths and z-index come from token definitions (e.g. in light/dark token files), not literals in components.

**Rationale**: Theming and consistency; one place to change layout and stacking.

### 3. Virtual config object (V2)

**Decision**: V2 uses `virtualScrolling?: { itemHeight?, overscan?, threshold? }` instead of flat `virtualItemHeight`, `virtualOverscan`, `virtualScrollThreshold`.

**Rationale**: Grouped config is easier to extend and mirrors patterns used elsewhere (e.g. SingleSelectV2). TanStack Virtual is used when count ≥ threshold (default 30).

### 4. Slots: slot + slot2/slot3/slot4

**Decision**: V2 uses **`slot`** for the leading position (same as v1’s slot1) and **slot2**, **slot3**, **slot4** for other positions. **slot1** is supported for backward compatibility; when both `slot` and `slot1` are set, `slot` takes priority. `getItemSlots(item)` returns `[item.slot ?? item.slot1, item.slot2, item.slot3, item.slot4]`.

**Rationale**: Aligns with original Menu’s slot positions; single leading prop `slot` with explicit slot2–slot4; no separate slots object.

### 5. collisionBoundaryRef spelling

**Decision**: V2 uses correct spelling `collisionBoundaryRef`; V1 had `collisonBoundaryRef`.

**Rationale**: API correctness and consistency with Radix.

### 6. Optional id on groups and items (V2)

**Decision**: V2 allows optional `id` on `MenuV2GroupType` and `MenuV2ItemType`.

**Rationale**: Stable keys for lists and submenus; better a11y and testing.

---

## Summary Table: When to Use Which

| Need                                                                   | Prefer                                 |
| ---------------------------------------------------------------------- | -------------------------------------- |
| Token-driven styling, no hardcoded z-index/dimensions                  | MenuV2                                 |
| Single token entry point: `getMenuV2Tokens` from `menuV2.tokens`       | MenuV2                                 |
| Grouped virtual config and TanStack Virtual                            | MenuV2                                 |
| Clear slots API (`slots.leading` / `trailing`) with legacy support     | MenuV2                                 |
| Correct `collisionBoundaryRef` spelling                                | MenuV2                                 |
| Per-item virtual height function                                       | Menu (v1)                              |
| Existing V1 usage with no breaking changes                             | Menu (v1)                              |
| Same core behavior (trigger, groups, search, submenus, virtualization) | Either; API and tokens differ as above |

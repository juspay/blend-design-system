# SingleSelect Component Documentation

## Overview

The Blend design system provides two SingleSelect components:

- **SingleSelect (v1)** – Original component; open state is internal; uses `useDrawerOnMobile` and `minMenuWidth` / `maxMenuWidth` / `maxMenuHeight`; supports `allowDeselect`.
- **SingleSelectV2** – Updated API with controlled/uncontrolled open state, renamed props for consistency, and stricter typing for `customTrigger`; no `allowDeselect` (parent can call `onSelect('')` if needed).

Both support: label/sublabel, hint text, required, help icon, placeholder, sizes (sm/md/lg), variants (container / no-container), grouped items, search, virtualization, infinite scroll, custom trigger, and mobile panel/drawer.

---

## Requirements

- **Controlled value**: `selected: string` and `onSelect: (value: string) => void`
- **Labels**: Optional `label`, `subLabel`, `hintText`, `required`, `helpIconText`
- **Sizes**: `sm`, `md`, `lg` (via `SelectMenuSize` / `SingleSelectV2Size`)
- **Variants**: `CONTAINER` (bordered box with label above) or `NO_CONTAINER` (minimal, no wrapper box)
- **States**: Default, hover, focus, error, disabled – with correct trigger background and outline from tokens
- **Validation**: `error` and optional `errorMessage`
- **Items**: Grouped list (`SelectMenuGroupType[]` / `SingleSelectV2GroupType[]`) with optional group labels, separators, submenus, slots, tooltips
- **Search**: Optional `enableSearch` and `searchPlaceholder`
- **Virtualization**: Optional `enableVirtualization`, `virtualListItemHeight`, `virtualListOverscan` (V2 defaults virtualization when item count > 20)
- **Infinite scroll**: `onEndReached`, `endReachedThreshold`, `hasMore`, `loadingComponent`
- **Mobile**: On small viewports, optional full-screen panel (v1: `useDrawerOnMobile`, v2: `usePanelOnMobile`); both default to `true`
- **Accessibility**: Trigger has `aria-expanded`, `aria-haspopup`, `aria-controls` (menu id); label/hint/error linked via `aria-describedby` / `aria-labelledby`; keyboard (Enter/Space to open, arrows, Escape to close)
- **Theme**: V1 uses `SINGLE_SELECT` tokens; V2 uses `SINGLE_SELECT_V2` with light/dark via `getSingleSelectV2Tokens(foundationToken, theme)`

---

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Label] [SubLabel] [Required *] [Help icon]                            │  ← label row (variant=container)
├─────────────────────────────────────────────────────────────────────────┤
│  [Slot] │ [Placeholder or selected value]                    │[Chevron] │  ← trigger (opens menu)
├─────────────────────────────────────────────────────────────────────────┤
│  [Hint text / Error message]                                            │  ← footer (variant=container)
└─────────────────────────────────────────────────────────────────────────┘

Menu (dropdown or panel):
┌─────────────────────────────────────┐
│  [Search input] (if enableSearch)   │
├─────────────────────────────────────┤
│  Group label (optional)             │
│    Option 1                         │
│    Option 2  (subLabel, slot1..4)   │
│  ───────── separator ─────────      │
│  Group 2                            │
│    Option A  [submenu →]            │
└─────────────────────────────────────┘
```

- **Top (container variant)**: Label, subLabel, required asterisk, optional help icon – from shared `InputLabels`.
- **Trigger**: Optional left slot, placeholder or selected label, chevron; height/padding/border/background from tokens by size and variant; open/closed/hover/focus/error from tokens.
- **Footer (container variant)**: Hint text and/or error message – from shared `InputFooter`.
- **Menu**: Search (optional), then grouped items; each item can have label, subLabel, slots, tooltip, submenu; group labels and separators supported.

---

## Props & Types Comparison

### Shared / equivalent props (v1 vs v2)

| Prop                                                         | V1 (SingleSelect)                         | V2 (SingleSelectV2)                                |
| ------------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------- |
| label                                                        | ✓                                         | ✓                                                  |
| subLabel                                                     | ✓                                         | ✓                                                  |
| hintText                                                     | ✓                                         | ✓                                                  |
| required                                                     | ✓                                         | ✓                                                  |
| helpIconText                                                 | ✓                                         | ✓                                                  |
| placeholder                                                  | ✓                                         | ✓                                                  |
| size                                                         | SelectMenuSize                            | SingleSelectV2Size                                 |
| items                                                        | SelectMenuGroupType[]                     | SingleSelectV2GroupType[]                          |
| variant                                                      | SelectMenuVariant                         | SingleSelectV2Variant                              |
| selected                                                     | string                                    | string                                             |
| onSelect                                                     | (value: string) => void                   | (value: string) => void                            |
| enableSearch                                                 | ✓                                         | ✓                                                  |
| searchPlaceholder                                            | ✓                                         | ✓                                                  |
| slot                                                         | ReactNode                                 | ReactNode                                          |
| disabled                                                     | ✓                                         | ✓                                                  |
| name                                                         | ✓                                         | ✓                                                  |
| alignment                                                    | SelectMenuAlignment                       | SingleSelectV2Alignment                            |
| side                                                         | SelectMenuSide                            | SingleSelectV2Side                                 |
| sideOffset                                                   | number                                    | number                                             |
| alignOffset                                                  | number                                    | number                                             |
| min width/height                                             | minMenuWidth, maxMenuWidth, maxMenuHeight | minPopoverWidth, maxPopoverWidth, maxPopoverHeight |
| inline                                                       | ✓                                         | ✓                                                  |
| onBlur / onFocus                                             | ✓                                         | ✓                                                  |
| error / errorMessage                                         | ✓                                         | ✓                                                  |
| fullWidth                                                    | ✓                                         | ✓                                                  |
| enableVirtualization                                         | ✓ (default: items.length > 20)            | ✓ (default: items.length > 20)                     |
| virtualListItemHeight, virtualListOverscan                   | ✓                                         | ✓                                                  |
| onEndReached, endReachedThreshold, hasMore, loadingComponent | ✓                                         | ✓                                                  |
| skeleton                                                     | SingleSelectSkeletonProps                 | SingleSelectV2SkeletonProps                        |
| maxTriggerWidth, minTriggerWidth                             | ✓                                         | ✓                                                  |
| allowCustomValue, customValueLabel                           | ✓                                         | ✓                                                  |
| singleSelectGroupPosition                                    | ✓                                         | ✓                                                  |
| customTrigger                                                | ReactNode                                 | ReactElement                                       |

### V1-only

- **allowDeselect**: When true, selecting the same value again clears selection (`onSelect('')`). V2 does not expose this; parent can implement by calling `onSelect('')` when desired.
- **useDrawerOnMobile**: Same behavior as V2’s `usePanelOnMobile`; name differs.

### V2-only

- **open**: Controlled open state (boolean). If provided, component is controlled.
- **defaultOpen**: Initial open state when uncontrolled.
- **onOpenChange**: `(open: boolean) => void` – called when menu opens or closes; supports analytics or parent-controlled closing.
- **usePanelOnMobile**: Same behavior as V1’s `useDrawerOnMobile`; name aligned with “panel” terminology.

### Naming differences

- **Menu vs popover**: V1 uses `minMenuWidth`, `maxMenuWidth`, `maxMenuHeight`; V2 uses `minPopoverWidth`, `maxPopoverWidth`, `maxPopoverHeight`. Behavior is the same; V2 aligns with Radix popover naming.
- **Mobile**: V1 `useDrawerOnMobile` vs V2 `usePanelOnMobile` – same meaning, different name.

### Item and group types

- **V1**: `SelectMenuItemType`, `SelectMenuGroupType` (items have `subMenu`, `tooltip`, `tooltipProps`, slots, etc.).
- **V2**: `SingleSelectV2ItemType`, `SingleSelectV2GroupType` – same shape; type names prefixed for V2. Both support grouped items, optional group labels, separators, submenus, and per-item tooltips/slots.

### Internal / subcomponent types (V2)

V2 defines types used by subcomponents and shared logic; V1 keeps these implicit or local:

- **FlattenedItem**: Flattened list for rendering (item vs label vs separator).
- **MenuListProps**, **MenuListSharedProps**: Props for the menu list.
- **VirtualListProps**, **VirtualItemShape**: Virtual list rendering.
- **MenuSearchProps**: Search input inside menu.
- **MenuPopoverProps**: Popover wrapper (open, alignment, side, content style, etc.).

---

## Token Structure (V2 – anatomy-driven)

Tokens are documented in `singleSelectV2.tokens.ts` with an anatomy comment at the top. Structure is one-to-one with the component’s UI parts.

**Responsive**: Per breakpoint (`sm`, `lg` from `BreakpointType`). Each breakpoint has a full `SingleSelectV2TokensType`. Theme is chosen via `getSingleSelectV2Tokens(foundationToken, theme)` (light/dark).

**Main type**: `SingleSelectV2TokensType`

- **gap**: Spacing between label row, trigger, and footer.
- **label, subLabel, hintText**: Typography (fontSize, fontWeight) and **color by item state** (default, hover, active, focus, focusVisible, disabled, selected) – type `ItemStateColorMap` / `TextElementTokens`.
- **errorMessage, required**: Single color; errorMessage has fontSize/fontWeight.
- **trigger**:
    - **height, padding, borderRadius**: By **size × variant** (`SizeVariantMap<T>`).
    - **boxShadow**: By variant.
    - **backgroundColor, outline**: By **variant × trigger state** (open, closed, hover, focus, error) – `TriggerStateMap<T>`.
    - **placeholder, selectedValue**: Typography and single color.
- **menu**:
    - **content**: Wrapper (backgroundColor, border, borderRadius, boxShadow).
    - **padding**: By size × variant.
    - **groupLabel**: Margin, padding, typography, color by item state.
    - **item**: Padding, margin, borderRadius, gap; **backgroundColor by item state**; **groupLabelText, optionText, description** (typography + color by item state); **separator** (color, height, margin).
    - **submenu**: **trigger** (padding, margin, borderRadius, backgroundColor for default/hover/focus); **content** (background, border, padding, boxShadow); **optionText**; **iconColor**.
- **mobilePanel.header**: Padding and borderBottom when `usePanelOnMobile` is used.

**Helper types** (no raw `Record<K, V>` in the main type; names describe intent):

- `SingleSelectV2ItemStates`: Union of item states (default, hover, active, focus, focusVisible, disabled, selected).
- `ItemStateColorMap`, `ItemStateBackgroundMap`: One value per item state.
- `SizeVariantMap<T>`: One value per size, then per variant (e.g. trigger height).
- `TriggerStateMap<T>`: One value per variant, then per trigger state (open/closed/hover/focus/error).
- `InlineBlockPadding`: `{ paddingInline, paddingBlock }`.
- `TextElementTokens`: fontSize, fontWeight, color (ItemStateColorMap).
- `SimpleTextTokens`: fontSize, fontWeight, single color.

Usage pattern: `tokens.trigger.height[size][variant]`, `tokens.trigger.backgroundColor[variant][triggerState]`, `tokens.menu.item.backgroundColor[itemState]`, etc.

---

## Design Decisions

### 1. Controlled vs uncontrolled open (V2 only)

**Decision**: V2 supports both controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) open state.

**Rationale**: Parents can close on route change, sync with other UI, or track open/close for analytics without managing full internal state.

### 2. Panel vs drawer naming (V2)

**Decision**: V2 uses `usePanelOnMobile`; V1 uses `useDrawerOnMobile`. Same behavior (full-screen on small viewports).

**Rationale**: Aligns naming with other components that use “panel” for full-screen overlay behavior.

### 3. Popover vs menu width/height (V2)

**Decision**: V2 uses `minPopoverWidth`, `maxPopoverWidth`, `maxPopoverHeight` instead of `minMenuWidth`, etc.

**Rationale**: Matches the underlying Radix popover/dropdown API and makes it clear the constraints apply to the popover content.

### 4. customTrigger: ReactNode vs ReactElement (V1 vs V2)

**Decision**: V1 accepts `ReactNode`; V2 requires `ReactElement` and throws if not a valid element.

**Rationale**: V2 clones the trigger and forwards ref and props (e.g. for Radix). A single cloneable element is required; `ReactElement` makes that contract explicit.

### 5. allowDeselect only in V1

**Decision**: V1 has `allowDeselect`; V2 does not.

**Rationale**: Deselection can be handled by the parent (e.g. `onSelect('')` or a “Clear” action). V2 keeps the API smaller; parents that need deselect can implement it.

### 6. Virtualization default (both)

**Decision**: Both default to enabling virtualization when `items.length > 20` (V2: `enableVirtualization ?? items.length > 20`).

**Rationale**: Keeps large lists performant without requiring the consumer to opt in explicitly.

### 7. Token anatomy (V2)

**Decision**: Token keys mirror the component’s anatomy (label, trigger, menu.content, menu.item, menu.submenu, mobilePanel.header); nested Records replaced with named types (`ItemStateColorMap`, `SizeVariantMap`, `TriggerStateMap`, etc.).

**Rationale**: Reading the token type should make the component’s structure and which part each token affects obvious; named types avoid confusing `Record<..., ...>` chains.

### 8. Error and trigger state (both)

**Decision**: Error overrides normal trigger state (e.g. outline and background use error styling when `error` is true).

**Rationale**: Validation state stays visible until the error is cleared, consistent with other inputs.

---

## Summary Table: When to Use Which

| Need                                                                      | Prefer                                                 |
| ------------------------------------------------------------------------- | ------------------------------------------------------ |
| Controlled open state or onOpenChange                                     | SingleSelectV2                                         |
| allowDeselect built-in                                                    | SingleSelect (v1)                                      |
| Consistent “panel”/“popover” naming                                       | SingleSelectV2                                         |
| customTrigger as any ReactNode                                            | SingleSelect (v1)                                      |
| customTrigger as single ReactElement (ref forwarding)                     | SingleSelectV2                                         |
| Light/dark tokens from theme                                              | SingleSelectV2 (`getSingleSelectV2Tokens(..., theme)`) |
| Same core behavior (labels, search, groups, virtualization, mobile panel) | Either; API and naming differ as above                 |

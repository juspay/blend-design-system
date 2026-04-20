# SearchInputV2 Component Documentation

## Requirements

Create a compact search field that supports:

- **Value API**: Standard controlled input — `value` and `onChange` receive a `React.ChangeEvent<HTMLInputElement>` (same as a native `<input>`).
- **Search semantics**: The inner field uses **`role="searchbox"`** and **`type="text"`** on `PrimitiveInput`.
- **Underline chrome**: Bottom border only (no full box border); **`InputStateV2`** drives default / hover / focus / error / disabled border and text colors from tokens.
- **Left / right slots**: Optional `ReactNode` icons or actions in absolutely positioned `Block` regions; horizontal padding on the input is derived from **measured slot widths** + gap so text does not sit under icons.
- **Built-in clear**: When **`allowClear`** is true (default), there is no custom **`rightSlot`**, and **`value`** is non-empty, a default **clear** affordance is shown on the right (Phosphor **`XIcon`** unless **`clearIcon`** is provided). Clicking the right slot container runs **`onClear`** if passed; otherwise **`onChange`** is invoked with a **synthetic** event whose `target.value` is `''`.
- **Custom right slot**: If **`rightSlot`** is set, it replaces the built-in clear region; the clear click handler on the wrapper only applies when using the built-in clear (no custom `rightSlot`).
- **States**: **`error`** (boolean) affects `aria-invalid` and error styling; **`disabled`** disables the native input and applies disabled tokens; native **`required`** and other safe HTML input attributes pass through **`rest`** (after **`filterBlockedProps`**).
- **Focus styling on slots**: Left/right slot wrappers scale slightly and change opacity when the input is focused (internal `isFocused`).
- **Theme**: Responsive tokens via **`useResponsiveTokens('SEARCH_INPUT_V2')`**; **`getSearchInputV2Tokens`** in `SearchInputV2.tokens.ts` selects **light** vs **dark** factories (`SearchInputV2.light.tokens.ts` / `SearchInputV2.dark.tokens.ts`) from `ThemeProvider`.
- **Ref forwarding**: Consumer **`ref`** attaches to the underlying **`PrimitiveInput`** / `<input>`.
- **No built-in label row**: Unlike `TextInputV2`, there is no `InputLabelsV2` — provide an external label or **`aria-label`** / **`aria-labelledby`** for accessibility.

## Anatomy

```
┌──────────────────────────────────────────────────────────────────┐
│  position="relative" Block (data-searchinput, data-status)       │
│  ┌─────────────┐                              ┌──────────────┐   │
│  │ left slot   │   PrimitiveInput             │ right slot   │   │
│  │ (absolute)  │   role="searchbox"           │ (absolute)   │   │
│  └─────────────┘   bottom border + padding    └──────────────┘   │
│                    inline padding ← slot widths + gap            │
└──────────────────────────────────────────────────────────────────┘
```

- **Wrapper**: `Block` — `data-searchinput={placeholder}`, `data-status` enabled/disabled.
- **Slots**: `Block` with `data-element="left-slot"` / `"right-slot"`, `ref` for width measurement, `applyIconStyles` for icon color/size from tokens.
- **Field**: `PrimitiveInput` — `paddingInlineStart` / `paddingInlineEnd` / `paddingY`, `borderBottom` / `_hover` / `_focus` / `_disabled`, `placeholderStyles` opacity tied to focus.

_(Optional: add `SearchInputV2Anatomy.png` beside this doc when a diagram is available.)_

## Props & Types

Declared in `SearchInputV2.types.ts`; HTML attributes from **`Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'style' | 'className'>`**.

```typescript
type SearchInputV2Props = {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    error?: boolean
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    allowClear?: boolean
    onClear?: () => void
    clearIcon?: React.ReactNode
    disabled?: boolean
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className'
>
```

**Notable inherited props** (non-exhaustive): **`id`**, **`name`**, **`placeholder`**, **`required`**, **`autoComplete`**, **`aria-label`**, **`aria-labelledby`**, **`data-*`**. **`className`** / **`style`** are omitted from the type; **`filterBlockedProps`** strips **`className`** and **`style`** from spreadable rest.

- **`allowClear`**: Default **`true`**. When **`false`**, the built-in clear control is never shown (unless you supply a **`rightSlot`** yourself).
- **`onClear`**: Optional; if omitted, clearing uses **`onChange`** with a minimal synthetic event (empty string).
- **`error`**: Boolean only — there is **no** built-in error message line; pair with external copy if needed.

## Token type

Tokens are **responsive** per breakpoint (`sm`, `lg`). Each breakpoint maps to `SearchInputV2TokensType`:

```typescript
type SearchInputV2TokensType = {
    gap: CSSObject['gap']
    label: { fontSize; fontWeight; color: { [InputStateV2]: color } }
    subLabel: { … }
    hintText: { … }
    errorMessage: { fontSize; fontWeight; color }
    required: { color }
    inputContainer: {
        paddingTop | paddingRight | paddingBottom | paddingLeft: { [InputSizeV2]: … }
        borderRadius
        borderBottom: { [InputStateV2]: … }
        outline
        boxShadow
        color: { [InputStateV2]: … }
        placeholderColor
        fontSize
        fontWeight
    }
    icon: {
        color: { [InputStateV2]: … }
        width
    }
}
```

- Resolution: **`getSearchInputV2Tokens(foundationTokens, theme)`** — **`Theme.DARK`** / `'dark'` uses **`getSearchInputV2DarkTokens`**; otherwise **`getSearchInputV2LightTokens`**.
- Label / sublabel / hint / error message keys exist for token completeness and potential future composition; the current component UI is **input + slots** only.

## Logic & utilities (`utils.ts`)

| Export            | Purpose                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `applyIconStyles` | `cloneElement` on slot children; sets `color`, `width`, `height` from tokens and disabled/error |
| `toPixels`        | Parses `px` strings or numbers for layout math                                                  |

## Implementation notes

### 1. Slot width and padding

**Decision**: `useEffect` runs when **`leftSlot`** or **`effectiveRightSlot`** changes; it reads **`offsetWidth`** from the slot refs and sets state used to compute **`paddingInlineStart`** / **`paddingInlineEnd`**.

**Rationale**: Keeps text inset aligned with icon width when slot content changes.

### 2. Built-in clear vs `rightSlot`

**Decision**: **`effectiveRightSlot`** prefers **`rightSlot`**; else, if **`showClearButton`** (`allowClear` && non-empty **`value`**), uses **`clearIcon`** or default **`XIcon`**.

**Rationale**: Custom **`rightSlot`** wins; clear click handling on the right **`Block`** is only wired when **`showClearButton && !rightSlot`**.

### 3. Synthetic clear event

**Decision**: When **`onClear`** is absent, **`onChange`** receives a cast **`ChangeEvent`**-shaped object with **`target.value`** / **`currentTarget.value`** set to `''`.

**Rationale**: Lets parent state clear without a separate callback; callers should not rely on a full DOM event object for clear-only paths.

### 4. `filterBlockedProps` and spread order

**Decision**: **`onFocus`** / **`onBlur`** are destructured and merged so internal focus state updates run; **`{...filteredRest}`** is spread on **`PrimitiveInput`** after those handlers so consumer **`id`**, **`required`**, **`aria-*`**, etc. still apply.

### 5. Disabled

**Decision**: **`disabled`** is passed to **`PrimitiveInput`** with **`_disabled`** styles (cursor, border, color) so the field is not interactive and matches token disabled appearance.

## Accessibility

- Prefer **`aria-label`** or an external visible label associated via **`id`** when there is no floating label component.
- Set **`aria-invalid`** implicitly via the **`error`** prop (`true` → `"true"`).
- Decorative slot icons: **`aria-hidden="true"`**; interactive controls in slots need **`aria-label`** (or visible text).
- **`role="searchbox"`** is set on the input for assistive tech.

## Testing & Storybook

- **Unit tests**: `packages/blend/__tests__/components/SearchInputV2/SearchInputV2.test.tsx`
- **Accessibility (axe + behaviors)**: `packages/blend/__tests__/components/SearchInputV2/SearchInputV2.accessibility.test.tsx`
- **Storybook**: `apps/storybook/stories/components/SearchInput/V2/SearchInputV2.stories.tsx` under **Components → Inputs → SearchInputV2**

## Related

- **Primitives**: `PrimitiveInput`, `Block`
- **Legacy `SearchInput`** (non-V2): `packages/blend/lib/components/Inputs/SearchInput` — token key **`SEARCH_INPUT`** and different layout; prefer **`SearchInputV2`** for Inputs V2 token and theme alignment
- **Site demo**: `apps/site/src/demos/SearchInputV2Demo.tsx`

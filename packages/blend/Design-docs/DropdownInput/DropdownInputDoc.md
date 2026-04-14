# DropdownInputV2 Component Documentation

## Requirements

Create a composite field that pairs a **free-text input** with an **inline single-select dropdown** (for example country code + phone number, currency + amount, TLD + email local part).

The component should support:

- **Two controlled regions**: `input` (`value`, `onChange` with string) and `dropDown` (`value`, `onSelect`, grouped `items`)
- **Placement**: Dropdown on the **leading** or **trailing** edge (`DropdownPosition.LEFT` | `RIGHT`) with padding that reserves space for the inline `SingleSelectV2` (`NO_CONTAINER` variant)
- **Sizes**: Shared `InputSizeV2` (`sm`, `md`, `lg`) with optional overrides on `input.size` / `dropDown.size` (`resolveInputSize`, `resolveSelectSize`)
- **Labels**: Primary label, optional sublabel, required indicator, optional help icon (`helpIconHintText`)
- **States**: Default, hover, focus, error, disabled — shared field chrome; dropdown uses `SingleSelectV2` with search enabled
- **Validation**: `error: { show, message }` and `InputFooterV2` below the field
- **Responsive labels**: On small breakpoint with large size, static labels hide and **floating label** appears (same breakpoint/size rule as `TextInputV2`)
- **Accessibility**: Native `<input>` for text; `aria-invalid`, `aria-required`, `aria-describedby` for hint/error; dropdown trigger named via `dropdownName` / `dropDown.label` / field `label` (`getSingleSelectAriaLabel`)
- **Disabled selection**: If the **selected** option is marked `disabled` in `SingleSelectV2GroupType`, the text field is disabled (`isSelectedOptionDisabled`)
- **Menu sizing**: Optional `maxMenuHeight`, `minMenuWidth`, `maxMenuWidth` passed to `SingleSelectV2`
- **Ref forwarding**: Consumer `ref` targets the **text** `<input>` only
- **Theme**: Responsive tokens via `useResponsiveTokens('DROPDOWN_INPUT_V2')` (light/dark), aligned with `TEXT_INPUTV2` for placeholder/floating label pieces

## Anatomy

**Default (`dropdownPosition === LEFT`)** — dropdown sits at the start of the field; the text input’s inline padding grows on the left to clear the trigger.

```
┌──────────────────────────────────────────────────────────────────┐
│  [Top: Label, Sublabel, Required *, Help icon]                   │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────┐ │  [Floating label OR placeholder]  typed text   │
│  │ V2 inline  │ │                                                │
│  └────────────┘ │                                                │
├──────────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                             │
└──────────────────────────────────────────────────────────────────┘
```

**Right placement** — the inline block is anchored to the **end** edge; `paddingInlineEnd` on the text input reserves space for the trigger.

- **Top container**: `InputLabelsV2` (or floating label path on `sm` + `lg`)
- **Field row**: Absolutely positioned wrapper around `SingleSelectV2` + `PrimitiveInput` sharing one visual border/background from tokens
- **Bottom container**: `InputFooterV2` (`hintText`, `error.show` / `error.message`)

## Props & Types

```typescript
import type { InputHTMLAttributes } from 'react'

enum DropdownPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

type DropdownInputV2Props = {
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: { show: boolean; message: string }
    required?: boolean
    name?: string
    hintText?: string
    disabled?: boolean
    size?: InputSizeV2
    id?: string
    dropdownPosition?: DropdownPosition
    /** Accessible name for the dropdown (defaults from name / dropDown.label / label) */
    dropdownName?: string
    onDropdownOpen?: () => void
    onDropdownClose?: () => void
    maxMenuHeight?: number
    minMenuWidth?: number
    maxMenuWidth?: number
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    dropDown?: {
        onSelect?: (value: string) => void
        size?: SingleSelectV2Size
        items?: SingleSelectV2GroupType[]
        value?: string
        placeholder?: string
        label?: string
    }
    input?: {
        value?: string
        onChange?: (value: string) => void
        placeholder?: string
        size?: InputSizeV2
        label?: string
    }
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'value'
>
```

- **`input.onChange`**: Receives the **string** value (not a change event); matches other V2 inputs that wrap `PrimitiveInput` with a simplified API.
- **`Omit`**: Prevents clashing `size` / `value` / `onChange` with the split `input` / `dropDown` model; native attributes such as `autoComplete`, `type`, `inputMode` can still be passed on the root and flow to `PrimitiveInput` via `filterBlockedProps(rest)`.

Merged defaults for partial `input` / `dropDown` live in `utils.ts` (`mergeInput`, `mergeDropDown`).

## Final Token Type

Tokens are **responsive** per breakpoint. Each breakpoint exposes `DropdownInputV2TokensType`:

```typescript
type DropdownInputV2TokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        gap: CSSObject['gap']
        fontSize: { [key in InputSizeV2]: CSSObject['fontSize'] }
        fontWeight: { [key in InputSizeV2]: CSSObject['fontWeight'] }
        color: { [key in InputStateV2]: CSSObject['color'] }
        borderRadius?: { [key in InputSizeV2]: CSSObject['borderRadius'] }
        boxShadow: CSSObject['boxShadow']
        paddingTop: { [key in InputSizeV2]: CSSObject['padding'] }
        paddingBottom: { [key in InputSizeV2]: CSSObject['padding'] }
        paddingLeft: { [key in InputSizeV2]: CSSObject['padding'] }
        paddingRight: { [key in InputSizeV2]: CSSObject['padding'] }
        border: { [key in InputStateV2]: CSSObject['border'] }
        backgroundColor: { [key in InputStateV2]: CSSObject['backgroundColor'] }
        lineHeight: { [key in InputSizeV2]: CSSObject['lineHeight'] }
    }
    bottomContainer: InputFooterV2Tokens
}
```

**Token hook**: `getDropdownInputV2Tokens(foundationToken, theme)` selects light vs dark (`DropdownInputV2.light.tokens.ts` / `.dark.tokens.ts`). Dark theme is aligned with **TextInputV2** field treatment for consistency across inputs.

## Design Decisions

### 1. Split `input` and `dropDown` objects

**Decision**: Keep text state and list state separate instead of flat `value` + `dropDownValue` only.

**Rationale**: Matches mental model (two controls, one shell), allows independent `size` on `SingleSelectV2` vs field, and keeps typings close to `SingleSelectV2` and `PrimitiveInput` responsibilities.

### 2. Layout metrics and measured dropdown width

**Decision**: `getDropdownInputLayoutMetrics()` computes `paddingLeft` / `paddingRight` from `dropdownPosition`, token padding, `gap`, and **`dropdownWidth`** measured from a ref on the dropdown container (`useEffect` on value/items/select size).

**Rationale**: Inline trigger width can change with selection label, font size, or options; measuring keeps typed text from sliding under the chevron or label.

### 3. Floating label top padding uses base vertical padding

**Decision**: `floatingLabelTopPadding` uses the **base** token padding (`paddingY` / top from tokens), not the scaled `paddingTop` from `getVerticalInputPadding` when floating.

**Rationale**: Same approach as **TextInputV2** so the label anchor stays consistent with the design grid when focus/value changes vertical padding.

### 4. Error drives `hasError` and footer together

**Decision**: `hasError = Boolean(error?.show)` for `aria-invalid`, `getBorderInteractionVariants`, and `getInputState`; `InputFooterV2` receives `error.show` and `error.message`.

**Rationale**: Avoids treating the presence of a default `error` object as an error; matches TextInputV2 semantics.

### 5. Disabled selected option disables the text field

**Decision**: If the current `dropDown.value` maps to an item with `disabled: true`, `PrimitiveInput` is disabled even when `disabled` is false on the root.

**Rationale**: Prevents editing free text when the paired selection is not a valid/enabled choice (product rule: fix selection first).

### 6. `SingleSelectV2` embedded with search and no container chrome

**Decision**: `variant={NO_CONTAINER}`, `inline`, `search.show: true`, `error={{ show: false }}` on the inner select so only the shell shows validation.

**Rationale**: The composite field owns error/hint; the dropdown is a picker strip inside the same border.

### 7. Menu alignment vs dropdown side

**Decision**: `getSingleSelectMenuPosition(dropdownPosition, paddingX)` adjusts `SingleSelectV2Alignment` and offsets so the popover aligns with the correct edge under the inline trigger.

**Rationale**: Left vs right placement should not open the menu off-screen or disconnected from the trigger.

### 8. Blocking `className` and `style`

**Decision**: `filterBlockedProps(rest)` on `PrimitiveInput` strips `className` / `style`.

**Rationale**: Same as TextInputV2 — token-driven layout and focus ring stay intact.

### 9. Ref targets the text input only

**Decision**: `forwardRef` attaches to the **text** `PrimitiveInput`, not the dropdown button.

**Rationale**: Form libraries and `focus()` helpers expect the text field; the select remains a separate tab stop (`button`).

## Related

- **Storybook**: `apps/storybook/stories/components/DropdownInputV2/DropdownInputV2.stories.tsx`
- **Site demo**: `apps/site/src/demos/DropdownInputV2Demo.tsx`
- **Tests**: `packages/blend/__tests__/components/DropdownInputV2/DropdownInputV2.test.tsx`, `DropdownInputV2.accessibility.test.tsx`

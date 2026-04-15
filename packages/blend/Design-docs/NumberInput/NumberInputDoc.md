# NumberInputV2 Component Documentation

## Requirements

Create a numeric field that supports:

- **Controlled value**: `value: number | null` with `onChange`; empty input maps to `null`
- **Labels**: `label: { text, subtext? }`, optional help tooltip string (`helpIconText`)
- **Sizes**: Small (`sm`), Medium (`md`), Large (`lg`) via `InputSizeV2`
- **States**: Default, hover, focus, error, disabled — borders and backgrounds from tokens
- **Validation**: External `error: { show, message? }` for footer + label error styling when **both** `show` and `message` are set; internal range errors while typing (min/max)
- **Help**: `hintText` under the field; optional label help icon tooltip
- **Numeric behavior**: `min`, `max`, `step`; integrated **stepper** (up/down); **Arrow Up/Down** on the field; `preventNegative` to disallow negatives
- **Optional unit**: `unit` string (e.g. `kg`, `%`) shown in a **unit strip** (`NumberInputV2Unit`). When a non-empty unit is present, **steppers are hidden** and keyboard arrows still adjust the value. **Whitespace-only** `unit` is treated as empty (steppers show; no strip).
- **Unit placement**: `unitDirection` — `NumberInputV2Direction.LEFT` | `.RIGHT` (default **right**), controlling whether the strip leads or trails the value.
- **Optional slots**: `slot={{ left, right }}` — extra **React nodes** (often icons) inside the field edges when **`unit` is set**; horizontal padding is measured (`ResizeObserver` + layout) so text does not overlap adornments.
- **Responsive labels**: On small viewports with large size, static labels hide and a **floating label** is used (same breakpoint pattern as TextInputV2)
- **Accessibility**: Native `<input type="text" inputMode="decimal">` with `role="spinbutton"`, `aria-valuenow` / `aria-valuemin` / `aria-valuemax`, `aria-required`, `aria-invalid`, `aria-describedby` for hint/error
- **Ref forwarding**: Consumer `ref` targets the underlying `<input>` via `setExternalRef` (shared with TextInputV2)
- **Theme**: Light/dark tokens via `useResponsiveTokens('NUMBER_INPUT_V2')`

## Anatomy

**Default (no unit):** input row with steppers.

```
┌─────────────────────────────────────────────────────────────┐
│  [Top: Label, Subtext, Required *, Help icon]               │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┬───┬───┐           │
│  │  [Floating label or placeholder]     │ ▲ │   │  ← input + stepper │
│  │  (numeric text field)                 │ ▼ │   │                    │
│  └───────────────────────────────────────┴───┴───┘           │
├─────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                         │
└─────────────────────────────────────────────────────────────┘
```

**With `unit` (and optional `slot`):** unit strip + optional left/right adornments; **no** stepper buttons. Layout is `position: relative` with absolutely positioned unit and slot regions; `PrimitiveInput` receives computed horizontal padding from token baselines + measured widths.

- **Top container**: Shared `InputLabelsV2` pattern with TextInputV2 (label, sublabel, required, help icon)
- **Input row**: `PrimitiveInput` (text + numeric sanitization); either `NumberInputV2Stepper` **or** unit strip + slots depending on props
- **Unit**: `NumberInputV2Unit` (forwardRef to a `Block`); paired padding math lives in `utils.ts` (`getNumberInputV2PaddingLeft` / `getNumberInputV2PaddingRight`)
- **Bottom container**: `InputFooterV2` for hint and error; IDs power `aria-describedby`
- **Floating label**: When `breakPointLabel === 'sm'` and `size === 'lg'`, same floating behavior as TextInputV2

## Props & Types

```typescript
enum InputSizeV2 {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

enum NumberInputV2Direction {
    LEFT = 'left',
    RIGHT = 'right',
}

type NumberInputV2Props = {
    slot?: {
        left: React.ReactNode
        right: React.ReactNode
    }
    value: number | null
    unit?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    min?: number
    max?: number
    step?: number
    error?: {
        show: boolean
        message?: string
    }
    size?: InputSizeV2
    label?: {
        text: string
        subtext?: string
    }
    unitDirection?: NumberInputV2Direction
    helpIconText?: string
    hintText?: string
    name?: string
    preventNegative?: boolean
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'value' | 'onBlur' | 'onFocus' | 'slot'
>
```

- **`value` / `onChange`**: `onChange` receives a synthetic event; `e.target.value` is a string (empty string when cleared). Callers typically parse to `number | null`.
- **`unit` / `unitDirection`**: Visual unit strip; direction controls DOM order and which horizontal padding side includes the measured unit width.
- **`slot`**: Adornments **only render when `unit` is non-empty** (after trim). The HTML attribute `slot` is **omitted** from `InputHTMLAttributes` so it does not collide with this object prop (native `slot` is a string).
- **Omit `size` | `style` | `className`**: Size is design-system `InputSizeV2`; `filterBlockedProps` strips `className` / `style` on the primitive input.
- **`helpIconText`**: Plain string for the label tooltip (TextInputV2 uses `{ text, onClick? }`; NumberInputV2 keeps a string for parity with simpler use cases).

## Token overview

Tokens are loaded with `useResponsiveTokens<NumberInputV2TokensType>('NUMBER_INPUT_V2')`. Structure aligns with other Inputs V2:

- **`gap`**: Vertical stack gap
- **`topContainer`**: `InputLabelsV2` tokens (label, sublabel, required, help icon)
- **`inputContainer`**: Placeholder, typography, padding (`x` / `y`), border, background, line height, **`stepperButton`** (width, backgrounds, icon colors), **`unit`** (padding, borders, typography for the strip), **`slot`** (margins / sizing hooks for left and right adornments)
- **`bottomContainer`**: Hint and error message typography

Light/dark implementations live in `NumberInputV2.light.tokens.ts` and `NumberInputV2.dark.tokens.ts`.

## Design Decisions

### 1. `type="text"` + numeric sanitization (not `type="number"`)

**Decision**: Use a text input with `inputMode="decimal"` and `sanitizeNumberInput()` / `clampValueOnBlur()` in `utils.ts`.

**Rationale**: Consistent control over formatting, minus sign handling, and blur clamping; avoids browser-specific spinner UI duplicating the custom stepper.

### 2. External error styling requires `show` **and** `message`

**Decision**: `hasError` for label and field chrome is `internalError || Boolean(error?.show && error?.message)`.

**Rationale**: Avoid treating the default `error` object as truthy (objects are always truthy in boolean checks). Footer can still use `error.show` for layout; invalid styling follows the same rule as the message pipeline.

### 3. Effective value when `preventNegative` is true

**Decision**: `getEffectiveNumericValue()` maps negative controlled values to `0` (then min/max clamp) for display, ARIA, and stepping so the field never presents a negative when negatives are disallowed.

**Rationale**: Parent may briefly pass `-1`; UI should reflect non-negative semantics and steppers should not start from a negative base.

### 4. Ref forwarding

**Decision**: `forwardRef<HTMLInputElement>` with a ref callback that calls `setExternalRef` from `TextInputV2/utils` (same helper as TextInputV2).

**Rationale**: One shared pattern for callback refs and object refs; consumer focuses or measures the real DOM input.

### 5. Stepper and tab order

**Decision**: Increase and decrease are `PrimitiveButton`s with `aria-label` (`Increase {label}` / `Decrease {label}`). They participate in the normal tab sequence **after** the input **when steppers are visible** (no unit strip).

**Rationale**: Keyboard users can tab through input → up → down → next control. When decrease is **disabled** (e.g. value at `min`), it is not tab-focusable; tests account for this. When **`unit`** is set, steppers are removed and tab order skips straight to the next focusable control.

### 6. Blocking `className` and `style`

**Decision**: `...filterBlockedProps(rest)` on the primitive input.

**Rationale**: Same as TextInputV2 — tokens own appearance; avoids broken padding, focus ring, or stepper alignment.

### 7. Internal vs external range errors

**Decision**: While typing, values outside `min`/`max` set internal error state and `getRangeErrorMessage()`; external `error` is for form-level messages. `aria-describedby` includes the error region when there is a message to show (external or internal).

**Rationale**: Immediate feedback on out-of-range input without replacing parent validation.

### 8. Placeholder with floating label

**Decision**: When small screen + large size, placeholder is suppressed on the input (floating label only), matching TextInputV2.

### 9. Unit strip and measured padding

**Decision**: The unit `Block` and slot wrappers use `ResizeObserver` (via `subscribeElementOffsetWidth` in `utils.ts`) so padding updates when copy, theme, or breakpoint changes size.

**Rationale**: Avoids stale layout when `unit` text or slot content width changes without a full prop identity change.

### 10. Slots depend on `unit`

**Decision**: `slot.left` / `slot.right` render only when `showUnit` is true (trimmed `unit` non-empty).

**Rationale**: Keeps one layout model: adornments are for “unit + value” fields; empty `unit` keeps the stepper UX.

---

## Related

- Implementation: `packages/blend/lib/components/InputsV2/NumberInputV2/`
- Storybook: `Components/Inputs/NumberInputV2`
- Tests: `packages/blend/__tests__/components/NumberInputV2/`

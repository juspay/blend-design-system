# UnitInput Component Documentation

## Requirements

Create a scalable **numeric unit** input that supports:

- **Controlled value**: `value` as `number | undefined` with `onChange` receiving a standard `ChangeEvent<HTMLInputElement>`
- **Unit adornment**: Required `unit` string (e.g. `px`, `%`, `USD`) shown in a dedicated strip; placement via `unitPosition` (`left` | `right`, default `right`)
- **Labels**: Primary `label`, optional `sublabel`, optional `helpIconHintText` (tooltip)
- **Sizes**: `sm`, `md`, `lg` via `UnitInputSize` (default `MEDIUM` / `md`)
- **States**: Default, hover, focus, error, disabled — borders and backgrounds from tokens
- **Validation**: `error` boolean plus optional `errorMessage`; native `min`, `max`, `step` forwarded to the input; required indicator (asterisk) and `aria-required` when `required`
- **Help**: `hintText` below the field; error and hint IDs wired for association patterns used by `InputFooter`
- **Slots**: `leftSlot` and `rightSlot` as `React.ReactNode`, absolutely positioned; padding on the field is derived from measured slot + unit widths
- **Responsive behavior**: On small breakpoint with **large** size, static labels hide and an inline **floating** label is shown inside the input row
- **Feedback**: Optional **error shake** on the input wrapper when `error` becomes true (`useErrorShake`)
- **Accessibility**: Native `type="number"` input (typically exposed as a spinbutton in the accessibility tree), `aria-invalid`, `aria-required`; footer shows error copy when provided
- **Theme**: Responsive tokens via `useResponsiveTokens('UNIT_INPUT')`; foundation-backed definitions in `getUnitInputTokens(foundationToken)` for light/dark breakpoints (`sm` | `md` | `lg`)

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  [Top: Label, sublabel, Required *, Help icon]              │  ← hidden on sm + lg (floating path)
├─────────────────────────────────────────────────────────────┤
│  [Unit LEFT] │ [LeftSlot] │  [number input]  │ [RightSlot] │ [Unit RIGHT]
├─────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                       │
└─────────────────────────────────────────────────────────────┘
```

- **Top row**: `InputLabels` — label, sublabel in parentheses, required asterisk, optional help icon (when not in small + large floating mode)
- **Field row**: Wrapper with optional shake animation; unit strip flush to left or right edge; optional slots; `PrimitiveInput` with dynamic horizontal padding so text does not overlap unit or slots
- **Bottom**: `InputFooter` — `error` + `errorMessage`, and/or `hintText`, using `errorId` / `hintId` derived from the input id

## Props & Types

```typescript
enum UnitInputSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

enum UnitPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

type UnitInputProps = {
    value: number | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    step?: number
    error?: boolean
    errorMessage?: string
    required?: boolean
    size?: UnitInputSize
    label?: string
    sublabel?: string
    helpIconHintText?: string
    hintText?: string
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    unit: string
    unitPosition?: UnitPosition
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className'
>
```

- **`unit`**: Required; displayed in the unit strip and drives layout measurement for inline padding.
- **Omit `size` | `style` | `className`**: `size` is the design-system enum; `style` / `className` are excluded from the public contract to keep styling token-driven.
- **Spread `...rest`**: Remaining native attributes are passed to `PrimitiveInput` after explicit props ( consumers should rely on tokens for styling).

## Token type

Tokens are **responsive** per breakpoint. Each breakpoint provides a full `UnitInputTokensType`:

```typescript
type UnitInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: { [key in UnitInputState]: CSSObject['color'] }
    }
    subLabel: {
        /* same color/state shape */
    }
    helpIcon: {
        width: CSSObject['width']
        color: { [key in UnitInputState]: CSSObject['color'] }
    }
    hintText: {
        /* … */
    }
    errorMessage: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    required: { color: CSSObject['color'] }
    inputContainer: {
        fontSize: { [key in UnitInputSize]: CSSObject['fontSize'] }
        fontWeight: { [key in UnitInputSize]: CSSObject['fontWeight'] }
        color: { [key in UnitInputState]: CSSObject['color'] }
        borderRadius: { [key in UnitInputSize]: CSSObject['borderRadius'] }
        boxShadow: CSSObject['boxShadow']
        padding: {
            x: { [key in UnitInputSize]: CSSObject['padding'] }
            y: { [key in UnitInputSize]: CSSObject['padding'] }
        }
        border: { [key in UnitInputState]: CSSObject['border'] }
        backgroundColor: {
            [key in UnitInputState]: CSSObject['backgroundColor']
        }
        unit: {
            fontSize: { [key in UnitInputSize]: CSSObject['fontSize'] }
            fontWeight: { [key in UnitInputSize]: CSSObject['fontWeight'] }
            color: { [key in UnitInputState]: CSSObject['color'] }
            padding: { [key in UnitInputSize]: CSSObject['padding'] }
            backgroundColor: {
                [key in UnitInputState]: CSSObject['backgroundColor']
            }
        }
    }
}

type ResponsiveUnitInputTokens = {
    [key in keyof BreakpointType]: UnitInputTokensType
}
```

**Hook**: `useResponsiveTokens<UnitInputTokensType>('UNIT_INPUT')` returns the token object for the active breakpoint. **Registration**: tokens are composed with `getUnitInputTokens` in theme init (see `initComponentTokens` / theme context).

## Design decisions

### 1. Boolean `error` + separate `errorMessage`

**Decision**: Use `error?: boolean` and `errorMessage?: string` instead of a single object.

**Rationale**: Matches existing `InputFooter` usage and keeps the API minimal for boolean validation gates; message remains optional for icon-only error styling.

```tsx
<InputFooter
    error={error}
    errorMessage={errorMessage}
    hintText={hintText}
    errorId={errorId}
    hintId={hintId}
/>
```

### 2. Native `number` input

**Decision**: Render `PrimitiveInput` with `type="number"` and pass through `min`, `max`, `step`.

**Rationale**: Browser-native increment/decrement UI and validation for numeric entry; value stays aligned with `number | undefined` at the React layer.

### 3. Measured padding for slots and unit

**Decision**: Use refs on the left slot, right slot, and unit container; `useEffect` reads `offsetWidth` and recomputes `paddingInlineStart` / `paddingInlineEnd`.

**Rationale**: Slot content width is unknown (icons, text, buttons); the unit strip width varies by label string and size. Measuring avoids clipping and avoids magic numbers.

```tsx
useEffect(() => {
    // leftSlotRef, rightSlotRef, unitRef → setLeftSlotWidth, setRightSlotWidth, setUnitWidth
}, [leftSlot, rightSlot, unit])
```

### 4. Error shake on the field wrapper

**Decision**: Wrap the input row in a styled `Wrapper` that applies `errorShakeAnimation` when `useErrorShake(error)` is true.

**Rationale**: Draws attention to validation failure without relying only on color; animation is scoped to the field, not the whole form.

```tsx
<Wrapper style={getErrorShakeStyle(shouldShake)}>...</Wrapper>
```

### 5. Floating label only on small viewport + large size

**Decision**: Hide top `InputLabels` when `isSmallScreen && size === LARGE`; show `FloatingLabels` positioned over the input when `label` is set.

**Rationale**: Same space-saving pattern as other inputs: on narrow screens with the largest control size, reserve vertical space by collapsing the label row into a floating label. Placeholder is suppressed in that mode (`placeholder=""`) to avoid duplicate hints.

### 6. Unit strip positioning

**Decision**: `RightUnitSlot` / `LeftUnitSlot` are absolutely positioned; border radius is adjusted so the strip appears flush with the correct end of the field.

**Rationale**: Keeps a single text field while visually grouping the unit with the control; slot offsets account for `unitPosition` so left slot stays clear of a left-aligned unit.

### 7. Stable ids for footer messaging

**Decision**: `inputId` comes from `rest.id` or `useId()`; `errorId` / `hintId` are suffixed from `inputId`.

**Rationale**: Supports linking hints and errors to the field in documentation and future `aria-describedby` enhancements while keeping ids unique in composed forms.

### 8. Data attributes for testing and analytics

**Decision**: Root `Block` sets `data-unitinput`, `data-status` (`enabled` | `disabled`), and `data-component-field-wrapper` (`field-${name}`).

**Rationale**: Enables stable selectors in tests and field-level instrumentation without exposing styling hooks.

---

**Related**: For the V2 variant (text-based numeric field, `inputMode="numeric"`, range messaging helpers, and `UNIT_INPUT_V2` tokens), see `UnitInputV2` under `lib/components/InputsV2/UnitInputV2/`.

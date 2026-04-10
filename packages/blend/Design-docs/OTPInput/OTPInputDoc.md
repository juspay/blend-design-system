# OTPInputV2 Component Documentation

## Requirements

Create a one-time password (OTP) field that supports:

- **Value API**: Full code exposed as a single string via `value` and `onChange(value: string)` (not a DOM event), without implying fully controlled behavior
- **Configurable length**: Number of digit cells via `length` (implementation clamps to a safe range; see decisions below)
- **Digits-only entry**: Each cell accepts at most one numeric character; paste fills from the start of the code
- **Keyboard UX**: Auto-advance after digit entry; **Backspace** on an empty cell moves focus to the previous cell; **ArrowLeft** / **ArrowRight** move between cells
- **Labels**: Primary label, optional `sublabel` (shown in parentheses next to the label), optional help hint on the label (`helpIconHintText` → `InputLabelsV2`)
- **States**: Default, hover, focus, error, disabled — borders, background, and focus ring driven by tokens (`InputStateV2` for cells)
- **Validation**: `error` boolean and optional `errorMessage`; required indicator (asterisk) on the label row
- **Help**: Hint text below the group (`InputFooterV2`)
- **Accessibility**: Multiple native inputs in a **`role="group"`** container; per-cell `aria-label`; `aria-describedby` for hint and/or error; `aria-invalid` / `aria-required` on cells
- **Ref forwarding**: Consumer `ref` is attached to the **first** cell only (see decisions)
- **Theme**: Light/dark responsive tokens via `useResponsiveTokens('OTP_INPUTV2')`
- **No per-cell placeholder**: Use label, hint, and `aria-label` for instructions (placeholders are omitted from the public API)

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Top: Label, (sublabel), Required *, Help icon]                    │
├─────────────────────────────────────────────────────────────────────┤
│  [ ○ ] [ ○ ] [ ○ ] [ ○ ] [ ○ ] [ ○ ]   ← one PrimitiveInput per digit │
│       role="group" + aria-label on the row                          │
├─────────────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                                │
└─────────────────────────────────────────────────────────────────────┘
```

- **Top container**: `InputLabelsV2` — label, sublabel in parentheses, required asterisk, optional help icon + tooltip (`helpIconHintText` is passed as `helpIconText` into labels)
- **Digit row**: A `Block` with `role="group"`, `aria-label` derived from label/sublabel/required, and `aria-describedby` pointing at hint/error IDs when present. Each digit is a **`PrimitiveInput`** (styled native `<input>`) with `maxLength={1}`, centered text, and token-driven width/height/border/focus ring
- **Bottom container**: `InputFooterV2` — hint and/or error; element IDs feed `aria-describedby` on **each** cell

_(Optional: add `OTPInputAnatomy.png` beside this doc when a diagram is available.)_

## Props & Types

```typescript
type OTPInputV2Props = {
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    hintText?: string
    value?: string
    length?: number
    autoFocus?: boolean
    onChange?: (value: string) => void
    form?: string
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'placeholder'
>
```

- **`onChange`**: Emits the **full OTP string** (all cells concatenated), not a `ChangeEvent`.
- **`value`**: String of digits; internally split into a fixed-length array of single-character cells. While **enabled**, local state is driven by typing; when **`disabled`**, state mirrors `value` from props (see decisions).
- **`length`**: Desired number of cells; clamped in implementation (`slotLength`) to avoid invalid or excessive DOM.
- **Omit `placeholder`**: Per-cell placeholders are not supported; avoids noisy UI and duplicate instructions (labels + `aria-label` are sufficient).
- **Omit `style` | `className`**: Same pattern as other Inputs V2 — styling is token-driven; `filterBlockedProps` strips `className` and `style` from spreadable rest.

## Final Token Type

Tokens are **responsive** per breakpoint (`sm`, `lg`). Each breakpoint maps to `OTPInputV2TokensType`:

```typescript
type OTPInputV2TokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        gap: CSSObject['gap']
        input: {
            height: CSSObject['height']
            width: CSSObject['width']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: { [key in InputStateV2]: CSSObject['color'] }
            borderRadius: CSSObject['borderRadius']
            boxShadow: CSSObject['boxShadow']
            border: { [key in InputStateV2]: CSSObject['border'] }
            backgroundColor: {
                [key in InputStateV2]: CSSObject['backgroundColor']
            }
        }
    }
    bottomContainer: InputFooterV2Tokens
}
```

- **`InputStateV2`** drives cell colors/borders for default, hover, focus, error, and disabled (mapped in the component from `error`, `disabled`, and focus styling helpers such as `FOCUS_RING_STYLES` from `TextInputV2/utils` for the focus ring).
- Theme resolution: `getOTPInputV2Tokens` in `OTPInputV2.tokens.ts` selects light vs dark token factories.

## Implementation Notes

### 1. Internal state vs `value` when enabled

**Decision**: While the component is **enabled**, OTP digits are held in local React state initialized from `value`. When **`disabled`**, an effect syncs state from `value` so read-only displays stay aligned with the parent.

**Rationale**: Matches common OTP UX (fast typing without forcing the parent to re-render on every keystroke). If the parent must reset the code while enabled, use a **remount key** or a fully controlled pattern at the app level.

### 2. Safe `length` (`slotLength`)

**Decision**: Compute `slotLength = Math.max(1, Math.min(length, 32))` (or equivalent) before building cell arrays.

**Rationale**: Prevents zero/negative lengths and caps DOM size for pathological props.

### 3. `filterBlockedProps` and `rest` only on the first cell

**Decision**: Spread `filterBlockedProps(restWithoutKeyDown)` on **`index === 0`** only. Destructure `onKeyDown` from `rest` and compose it with the internal handler.

**Rationale**: Spreading the same `data-*`, `autoFocus`, or `id` onto every cell duplicated attributes and could break behavior. The first cell is the natural target for SMS/Web OTP attributes if passed via `rest`. Composing `onKeyDown` ensures Enter/backspace/arrow behavior is not replaced by consumer handlers.

```tsx
const { onKeyDown: restOnKeyDown, ...restWithoutKeyDown } = rest
const filteredRest = filterBlockedProps(restWithoutKeyDown)
// ...
<PrimitiveInput
  {...(index === 0 ? filteredRest : {})}
  onKeyDown={(e) => {
    handleKeyDown(index, e)
    restOnKeyDown?.(e)
  }}
/>
```

### 4. Ref forwarding to the first cell

**Decision**: Use `setExternalRef` (shared helper) so the forwarded ref points at the **first** `PrimitiveInput`’s DOM node.

**Rationale**: Consumers need a stable element for `.focus()` and integration with form libraries; the first cell is the conventional entry point.

### 5. Paste from any cell

**Decision**: Attach the same `onPaste` handler to every cell; pasted text is normalized (digits only, truncated to `slotLength`) and distributed from the first positions.

**Rationale**: Users may paste after focusing any box; behavior stays consistent.

### 6. Shared focus ring with TextInputV2

**Decision**: Reuse `FOCUS_RING_STYLES` and `TRANSITION` from `TextInputV2/utils` for focused cells.

**Rationale**: Visual consistency across Inputs V2. Dark theme may later swap these for theme-specific focus tokens.

### 7. Hint vs error in the footer

**Decision**: `InputFooterV2` shows hint text only when **not** in error; when `error` and `errorMessage` are set, the error message is shown and hint copy is suppressed in the footer (while `aria-describedby` on cells prioritizes the error id when appropriate).

**Rationale**: Avoid conflicting instructions; error takes precedence for both sighted users and assistive tech.

## Testing & Storybook

- **Unit tests**: `packages/blend/__tests__/components/OTPInputV2/OTPInputV2.test.tsx`
- **Accessibility (axe + behaviors)**: `packages/blend/__tests__/components/OTPInputV2/OTPInputV2.accessibility.test.tsx`
- **Storybook**: `apps/storybook/stories/components/OTPInputV2/OTPInputV2.stories.tsx` under **Components → Inputs → OTPInputV2**

## Related

- **Labels / footer primitives**: `InputLabelsV2`, `InputFooterV2` (`packages/blend/lib/components/InputsV2/utils/…`)
- **Legacy `OTPInput`** (non-V2): separate component under `Inputs/OTPInput` — different props and styling; prefer **`OTPInputV2`** for new work aligned with Inputs V2 tokens

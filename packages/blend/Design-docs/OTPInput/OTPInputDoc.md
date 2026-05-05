# OTPInputV2 Component Documentation

## Requirements

Create a one-time password (OTP) field that supports:

- **Value API**: Full code exposed as a single string via `value` and `onChange(value: string)` (not a DOM event). Internal state stays aligned when **`value`** or **`length`** (`slotLength`) changes via effects (see Implementation Notes).
- **Configurable length**: Number of digit cells via `length`, clamped to a safe range (`clampOtpSlotLength` in `otpInputV2Utils.ts`; defaults to **6**, min **1**, max **32**).
- **Digits-only entry**: Each cell accepts at most one numeric character per keystroke; multi-character input (IME / SMS autofill) is merged from the active cell with `mergeDigitRunIntoOtp` / `processOtpCellValueChange`. Typing a digit in a **filled** cell replaces it and advances focus.
- **Paste**: From any cell; clipboard text is digit-only, truncated to `slotLength`, applied from the start of the row (`parsePastedOtpText`, `otpCharsToPaddedArray`, `getOtpPasteFocusIndex`).
- **Keyboard UX**: Auto-advance after a valid digit; **Backspace** on an empty cell moves focus to the previous cell; **ArrowLeft** / **ArrowRight** (and legacy **Left** / **Right**) move between cells (`getOtpKeyNavigation` calls `preventDefault` when handling arrows).
- **Labels**: Primary label, optional `sublabel` (parentheses in `InputLabelsV2`), optional help on the label (`helpIconHintText` → `helpIconText`). Label row uses **`InputStateV2`** so **error** styles the label row via tokens.
- **States**: Default, hover, focus, error, disabled — cell borders, background, and text use token keys derived from `error` and `disabled`; focus ring uses **`FOCUS_RING_STYLES`** / **`TRANSITION`** from `TextInputV2/utils`.
- **Validation**: `error` and optional `errorMessage`; **`required`** shows the asterisk on the label and sets **native `required` on every cell** plus `aria-required` for form validity parity with other Inputs V2.
- **Help**: Hint and/or error in `InputFooterV2` (hint hidden when in error; see footer decision below).
- **Mobile & autofill**: Each cell uses `type="text"`, **`inputMode="numeric"`**, **`pattern="[0-9]"`**; the **first** cell sets **`autoComplete="one-time-code"`** when useful for WebOTP/SMS. Additional `…rest` attributes are spread only onto the **first** cell (see below).
- **Accessibility**: Multiple native inputs in a **`role="group"`** container with stable **`id={groupId}`**; IDs from **`generateAccessibilityIds(baseId)`** in `InputsV2/utils/utils.ts` where **`baseId`** is `id` prop or React **`useId()`**; **`InputLabelsV2`** uses **`firstInputId`** (`${baseId}-0`) for the label association. Per-cell **`aria-label`** (`buildOtpCellAriaLabel`), group **`aria-label`** (`buildOtpGroupAriaLabel`), **`aria-describedby`** (`buildOtpAriaDescribedBy`), **`aria-invalid`**, **`aria-required`**. Click/focus runs **`moveCaretToEnd`** so the caret sits after the single character.
- **Ref forwarding**: Consumer **`ref`** is attached to the **first** cell only via **`setExternalRef`**.
- **Theme**: Light/dark responsive tokens via **`useResponsiveTokens('OTP_INPUTV2')`**.
- **No per-cell placeholder**: Omitted from the public API; use label, hint, and `aria-label`.

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Top: Label, (sublabel), Required *, Help icon]                    │
├─────────────────────────────────────────────────────────────────────┤
│  [ ○ ] [ ○ ] [ ○ ] [ ○ ] [ ○ ] [ ○ ]   ← one PrimitiveInput per digit │
│       role="group" + id + aria-label + aria-describedby            │
├─────────────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                                │
└─────────────────────────────────────────────────────────────────────┘
```

- **Top container**: `InputLabelsV2` — `inputId={firstInputId}` links label to the first cell id prefix.
- **Digit row**: `Block` with `role="group"`, `id={groupId}`, `aria-label` / `aria-describedby`. Each cell is **`PrimitiveInput`**, `maxLength={1}`, centered.
- **Bottom container**: `InputFooterV2` — hint/error ids match **`buildOtpAriaDescribedBy`** on each cell.

_(Optional: add `OTPInputAnatomy.png` beside this doc when a diagram is available.)_

## Props & Types

Declared in `OTPInputV2.types.ts`; HTML attributes come from **`Omit<React.InputHTMLAttributes<HTMLInputElement>, …>`** (see below).

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

**Notable inherited props** (non-exhaustive): **`id`** (prefix for `${id}-0`, `${id}-error`, `${id}-group`, …; if omitted, `useId()` supplies the base), **`name`**, **`required`**, **`disabled`**, and other safe input attributes. **`className`** / **`style`** / **`placeholder`** are omitted from the type; **`filterBlockedProps`** also strips **`className`** and **`style`** from spreadable rest.

- **`onChange`**: Emits the **full OTP string** (all cells concatenated), not a `ChangeEvent`.
- **`value`**: Digit string; padded/truncated to `slotLength`. See **Internal state vs `value`**.
- **`length`**: Desired cell count; clamped by **`clampOtpSlotLength`** (default **6**, **1**–**32**).
- **`form`**: Passed to cells (same form association for all).
- **Omit `placeholder`**: Per-cell placeholders are not supported.

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
            border: { [key in InputStateV2]: CSSObject['border'] }
            backgroundColor: {
                [key in InputStateV2]: CSSObject['backgroundColor']
            }
        }
    }
    bottomContainer: InputFooterV2Tokens
}
```

- **`InputStateV2`** drives cell colors/borders; the component maps `disabled` / `error` to visual states and uses **`FOCUS_RING_STYLES`** for the focus ring.
- Theme resolution: **`getOTPInputV2Tokens`** in `OTPInputV2.tokens.ts` selects light vs dark token factories.

## Logic module (`otpInputV2Utils.ts`)

Pure helpers live next to the component:

| Export                                             | Purpose                                                                       |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `otpCharsToPaddedArray`                            | Pad/truncate string to `length` cells                                         |
| `OTP_SLOT_MIN` / `OTP_SLOT_MAX`                    | Bounds used by `clampOtpSlotLength`                                           |
| `clampOtpSlotLength`                               | Safe `slotLength` from `length` prop                                          |
| `mergeDigitRunIntoOtp`                             | Multi-digit insert from a cell index (IME/autofill)                           |
| `processOtpCellValueChange`                        | Single `onChange` path: clear, multi-char, or one digit + optional focus move |
| `buildOtpAriaDescribedBy`                          | Hint/error ids for `aria-describedby`                                         |
| `buildOtpGroupAriaLabel` / `buildOtpCellAriaLabel` | Group and per-cell accessible names                                           |
| `parsePastedOtpText` / `getOtpPasteFocusIndex`     | Paste normalization and focus after paste                                     |
| `moveCaretToEnd`                                   | Selection after click/focus on single-char fields                             |
| `getOtpKeyNavigation`                              | Backspace and arrow focus moves                                               |

Shared with other Inputs V2: **`setExternalRef`**, **`generateAccessibilityIds`** (`packages/blend/lib/components/InputsV2/utils/utils.ts`).

## Implementation Notes

### 1. Internal state vs `value`

**Current behavior**: A `useEffect` depends on **`[value, slotLength]`**. When either changes, internal `otp` is replaced with `otpCharsToPaddedArray(value || '', slotLength)` if the joined string actually changed (avoids redundant `setState`).

**Secondary effect**: A `useEffect` on **`[slotLength]`** trims/pads when the array length no longer matches after a length change.

**Rationale**: Keeps the UI aligned when the parent resets or updates `value` (e.g. form reset, programmatic fill). For forcing a full reset without prop change while enabled, a **key** on the component is still a reliable pattern.

### 2. Safe `length` (`slotLength`)

**Decision**: `slotLength = clampOtpSlotLength(length)` → **`Math.max(1, Math.min(length ?? 6, 32))`**.

**Rationale**: Avoids invalid lengths and caps DOM size.

### 3. `filterBlockedProps` and `rest` only on the first cell

**Decision**: Destructure **`onKeyDown`**, **`onFocus`**, and **`onClick`** from **`rest`**, apply **`filterBlockedProps`** to the remainder, and spread on **`index === 0`** only. Compose **`onKeyDown`**, **`onFocus`**, and **`onClick`** so internal behavior runs first, then consumer handlers (consumer focus/click only fire for the **first** cell where those are forwarded).

**Rationale**: Avoids duplicating `id`, `data-*`, `autoFocus`, etc. on every cell; first cell carries WebOTP-friendly attributes from `rest`.

### 4. Ref forwarding to the first cell

**Decision**: **`setExternalRef`** attaches the forwarded ref to the **first** `PrimitiveInput` DOM node.

### 5. Paste from any cell

**Decision**: Same **`onPaste`** on every cell; normalized digits fill from the start of the OTP string.

### 6. Shared focus ring with TextInputV2

**Decision**: Reuse **`FOCUS_RING_STYLES`** and **`TRANSITION`** from `TextInputV2/utils`.

### 7. Hint vs error in the footer

**Decision**: **`InputFooterV2`** shows hint only when not in error; when **`error`** and **`errorMessage`** are set, error wins in the footer. **`buildOtpAriaDescribedBy`** aligns `aria-describedby` (hint id omitted when `error` is true so hint is not announced with the error).

## Testing & Storybook

- **Unit tests**: `packages/blend/__tests__/components/OTPInputV2/OTPInputV2.test.tsx`
- **Accessibility (axe + behaviors)**: `packages/blend/__tests__/components/OTPInputV2/OTPInputV2.accessibility.test.tsx`
- **Storybook**: `apps/storybook/stories/components/OTPInputV2/OTPInputV2.stories.tsx` under **Components → Inputs → OTPInputV2**

## Related

- **Labels / footer primitives**: `InputLabelsV2`, `InputFooterV2` (`packages/blend/lib/components/InputsV2/utils/…`)
- **Legacy `OTPInput`** (non-V2): `Inputs/OTPInput` — different API and styling; prefer **`OTPInputV2`** for Inputs V2 alignment

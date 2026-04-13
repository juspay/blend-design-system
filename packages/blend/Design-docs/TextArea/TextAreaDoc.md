# TextAreaV2 Component Documentation

## Requirements

Create a scalable multiline text field that supports:

- **Controlled value**: Single source of truth via `value` and `onChange`
- **Labels**: Optional primary label, optional `sublabel`; on **small** viewports, optional **`FloatingLabelsV2`** when `label` is set (same row as the field, token-driven)
- **States**: Default, hover, focus, error, disabled — borders and backgrounds from `inputContainer` tokens
- **Validation**: `error: { show, message? }` like **`TextInputV2`**; required asterisk via labels / floating label
- **Help**: Hint text below the field (`InputFooterV2`); optional help on the label row (`helpIconHintText` → `InputLabelsV2`)
- **Layout**: `rows` / `cols`, CSS **`resize`**, HTML **`wrap`** (`soft` / `hard`) via inherited attributes
- **Responsive layout**: On **`breakPointLabel === 'sm'`**, static **`InputLabelsV2`** is hidden; if `label` is set, **`FloatingLabelsV2`** is shown; placeholder is cleared on small screens; vertical padding increases top / clears bottom when the field is focused or has text (room for the floating label)
- **Accessibility**: Stable ids from **`generateAccessibilityIds(textareaId)`** (`textareaId` = `id` prop or **`useId()`**); `aria-required`, `aria-invalid`, `aria-describedby` for hint/error; focus ring shared with **`TextInputV2`** (`FOCUS_RING_STYLES`, `TRANSITION`)
- **Ref forwarding**: Consumer `ref` to **`HTMLTextAreaElement`** via **`setExternalRef`**
- **Theme**: Light/dark responsive tokens via **`useResponsiveTokens('TEXT_AREA_V2')`**

**Sizing**: Optional **`size`** (`InputSizeV2`, default **`MD`**) drives **`inputContainer.padding`**, placeholder weights/sizes, and **`FloatingLabelsV2`**. Static **`InputLabelsV2`** and **`InputFooterV2`** currently use fixed **`InputSizeV2.SM`** in the implementation. There are **no** left/right slots.

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  [Top: Label, SubLabel, Required *, Help icon]              │  ← lg breakpoint: InputLabelsV2
├─────────────────────────────────────────────────────────────┤
│  (sm + label: FloatingLabelsV2 over PrimitiveTextarea)      │
│                    Native <textarea>                          │
├─────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                         │
└─────────────────────────────────────────────────────────────┘
```

- **Large breakpoint**: **`InputLabelsV2`** (`topContainer` tokens) when `!isSmallScreen`
- **Small breakpoint + `label`**: **`FloatingLabelsV2`** absolutely positioned; **`PrimitiveTextarea`** gets extra top padding when focused or non-empty
- **Field**: **`PrimitiveTextarea`** — border, background, placeholder styles, **`FOCUS_RING_STYLES`** on focus
- **Bottom**: **`InputFooterV2`** — hint and/or error; ids align with **`aria-describedby`**

## Props & Types

See **`TextAreaV2.types.ts`**. Declared fields plus inherited **`React.TextareaHTMLAttributes`** (with omissions below).

```typescript
export type TextAreaV2Props = {
    size?: InputSizeV2
    value: string
    placeholder: string
    disabled?: boolean
    autoFocus?: boolean
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    rows?: number
    cols?: number
    label?: string
    sublabel?: string
    hintText?: string
    helpIconHintText?: string
    helpIconText?: string
    required?: boolean
    error?: {
        show: boolean
        message?: string
    }
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'style' | 'className' | 'onFocus' | 'onBlur'
>
```

- **`error`**: Same shape as **`TextInputV2`** — **`show`** gates validation UI; **`message`** feeds the footer and **`aria-describedby`** when present
- **`placeholder`**: Required in the type; on **`sm`** the component passes an empty string so the floating label is not duplicated by placeholder text
- **`wrap`**: Comes from inherited **`TextareaHTMLAttributes`** — use HTML values **`soft`** / **`hard`** for form behavior (not CSS `white-space`; use styling elsewhere if you need `pre` / `pre-wrap`)
- **Omit `style` | `className`**: **`filterBlockedProps`** strips these from spreadable rest
- **`onFocus` / `onBlur`**: Omitted from attributes because the component wraps them to track focus for **`labelState`**, then forwards to consumer handlers

Native attributes such as `name`, `id`, `autoComplete`, `maxLength`, and `readOnly` remain available on the spread.

## Token type

Tokens are **responsive** per breakpoint (`sm`, `lg` on **`BreakpointType`**). Each breakpoint resolves to **`TextAreaTokensType`** (`TextAreaV2.tokens.ts`):

```typescript
type TextAreaTokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        gap: CSSObject['gap']
        placeholder: {
            transition: CSSObject['transition']
            color: { [key in InputStateV2]: CSSObject['color'] }
            fontSize: { [key in InputSizeV2]: CSSObject['fontSize'] }
            fontWeight: { [key in InputSizeV2]: CSSObject['fontWeight'] }
            lineHeight: { [key in InputSizeV2]: CSSObject['lineHeight'] }
        }
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        padding: {
            top: { [key in InputSizeV2]: CSSObject['padding'] }
            right: { [key in InputSizeV2]: CSSObject['padding'] }
            bottom: { [key in InputSizeV2]: CSSObject['padding'] }
            left: { [key in InputSizeV2]: CSSObject['padding'] }
        }
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        border: { [key in InputStateV2]: CSSObject['border'] }
        color: { [key in InputStateV2]: CSSObject['color'] }
        backgroundColor: { [key in InputStateV2]: CSSObject['backgroundColor'] }
    }
    bottomContainer: InputFooterV2Tokens
}
```

Theme selection: **`getTextAreaV2Tokens`** in **`TextAreaV2.tokens.ts`** (light/dark in **`TextAreaV2.light.tokens.ts`** / **`TextAreaV2.dark.tokens.ts`**).

**Registration**: Component key **`TEXT_AREA_V2`** is wired in theme initialization alongside other Inputs V2 components.

## Design decisions

### 1. Error as `{ show, message? }` (aligned with TextInputV2)

**Decision**: Use **`error?: { show: boolean; message?: string }`**, default **`{ show: false, message: '' }`**.

**Rationale**: Consistent with **`TextInputV2`** and **`InputFooterV2`**, which consume **`error.show`** and **`errorMessage`** separately in the current implementation.

### 2. No slots

**Decision**: No left/right slots.

**Rationale**: Multiline fields prioritize content width; avoids slot measurement for padding.

### 3. `InputSizeV2` on the field

**Decision**: Optional **`size`** (default **`MD`**) selects padding and placeholder typography from **`inputContainer.padding`** and **`placeholder`** maps. Label row and footer use **`SM`** in the current component.

**Rationale**: Allows density tuning while keeping label/footer typography aligned with other inputs.

### 4. Small viewport: static labels off, floating label + padding

**Decision**: When **`isSmallScreen`**, **`InputLabelsV2`** is not rendered. If **`label`** is set, **`FloatingLabelsV2`** is shown. Placeholder is **`''`**. When the user focuses or the value is non-empty, top padding increases by **14px** and bottom padding goes to **0** to make room for the floated label.

**Rationale**: Saves vertical space; floating label reuses **`TextInputV2`** floating patterns.

### 5. Stable ids and `aria-describedby`

**Decision**: **`generateAccessibilityIds(textareaId)`** produces **`hintId`** / **`errorId`**. **`aria-describedby`** includes the hint id when **`hintText`** is set and **`!error.show`**; includes the error id when **`error.show`** and **`error.message`**.

**Rationale**: Matches footer visibility and WCAG description patterns.

### 6. `aria-invalid`

**Decision**: **`aria-invalid={error.show ? 'true' : 'false'}`**.

**Rationale**: Explicit true/false for assistive tech.

### 7. Ref forwarding

**Decision**: **`setExternalRef`** from **`InputsV2/utils/utils.ts`**.

**Rationale**: Same as **`TextInputV2`** for callback and object refs.

### 8. `onKeyDown` composition

**Decision**: Destructure **`onKeyDown`** from **`rest`**, **`filterBlockedProps`** on the remainder, invoke consumer **`onKeyDown`** from the textarea handler.

**Rationale**: Keeps blocked-prop filtering while allowing key handlers.

### 9. Error overrides hover and focus surfaces

**Decision**: When **`error.show`**, border and background token keys stay on **error** for default, hover, and focus.

**Rationale**: Validation state remains visible until cleared.

### 10. Shared focus ring and transition

**Decision**: **`FOCUS_RING_STYLES`** (box shadow + focus background tint) and **`TRANSITION`** from **`TextInputV2/utils`**.

**Rationale**: Visual parity with single-line inputs.

### 11. Blocking `className` and `style`

**Decision**: Spread only **`filterBlockedProps(restWithoutKeyDown)`** onto **`PrimitiveTextarea`**.

**Rationale**: Preserves token contract and focus treatment.

## Testing

- **Unit tests**: `packages/blend/__tests__/components/TextAreaV2/TextAreaV2.test.tsx`
- **Accessibility**: `packages/blend/__tests__/components/TextAreaV2/TextAreaV2.accessibility.test.tsx`

## Related

- **Labels / footer**: `InputLabelsV2`, `InputFooterV2`, `FloatingLabelsV2` under `packages/blend/lib/components/InputsV2/utils/…`
- **Legacy `TextArea` (non-V2)**: separate component under `Inputs/TextArea` — prefer **`TextAreaV2`** for Inputs V2 tokens

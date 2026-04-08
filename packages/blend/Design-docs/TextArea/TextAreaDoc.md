# TextAreaV2 Component Documentation

## Requirements

Create a scalable multiline text field that supports:

- **Controlled value**: Single source of truth via `value` and `onChange`
- **Labels**: Optional primary label, optional `sublabel` (e.g. context under the label)
- **States**: Default, hover, focus, error, disabled — with correct borders and backgrounds
- **Validation**: `error` flag with optional `errorMessage`; required indicator (asterisk) via labels
- **Help**: Hint text below the field; optional help icon with tooltip (`helpIconHintText`)
- **Layout**: `rows` / `cols`, `resize` behavior, optional `wrap` for white-space control
- **Responsive behavior**: On small viewports (`breakPointLabel === 'sm'`), static labels above the field are hidden and placeholder is suppressed; vertical padding adjusts when the field is focused or has a value
- **Accessibility**: Native `<textarea>`, `aria-required`, `aria-invalid`, `aria-describedby` for hint/error, shared focus ring with `TextInputV2`
- **Ref forwarding**: Consumer `ref` to the underlying `HTMLTextAreaElement` via `setExternalRef`
- **Theme**: Light/dark tokens via `useResponsiveTokens('TEXT_AREA_V2')`

Unlike `TextInputV2`, there are **no size variants** (`sm` / `md` / `lg`) and **no left/right slots** — typography and padding come from a single `inputContainer` token scale per breakpoint.

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  [Top container: Label, SubLabel, Required *, Help icon]    │  ← hidden on small breakpoint
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Native <textarea>                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                        │
└─────────────────────────────────────────────────────────────┘
```

- **Top container** (`InputLabelsV2` + `topContainer` tokens): Label, sublabel, required asterisk, optional help icon; rendered only when **not** on the small breakpoint
- **Field**: `PrimitiveTextarea` with token-driven border, background, placeholder, focus ring (`FOCUS_RING_STYLES` / `TRANSITION` shared with `TextInputV2/utils`)
- **Bottom container** (`InputFooterV2` + `bottomContainer` tokens): Hint and/or error; element IDs feed `aria-describedby` on the textarea

## Props & Types

```typescript
import type { CSSObject } from 'styled-components'

export type TextAreaV2Props = {
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
    error?: boolean
    errorMessage?: string
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'
    wrap?: CSSObject['whiteSpace']
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'style' | 'className' | 'onFocus' | 'onBlur'
>
```

- **`placeholder`**: Required in the type so the field always has an explicit placeholder string for non–small-screen layouts; on the small breakpoint the component passes an empty placeholder to the textarea
- **Omit `style` | `className`**: Styling is token-driven; `filterBlockedProps` strips these from spread props
- **`onFocus` / `onBlur`**: Omitted from `TextareaHTMLAttributes` because the component wraps them to track focus for label state and then forwards to optional consumer handlers

Native attributes such as `name`, `id`, `autoComplete`, `maxLength`, and `readOnly` are supported via the remaining `TextareaHTMLAttributes`.

## Token type

Tokens are **responsive** per breakpoint (`sm`, `lg` keys on `BreakpointType`). Each breakpoint resolves to `TextAreaTokensType`:

```typescript
type TextAreaTokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        border: { [key in InputStateV2]: CSSObject['border'] }
        color: { [key in InputStateV2]: CSSObject['color'] }
        backgroundColor: { [key in InputStateV2]: CSSObject['backgroundColor'] }
        placeholder: {
            color: CSSObject['color']
            transition: CSSObject['transition']
            fontWeight: CSSObject['fontWeight']
        }
    }
    bottomContainer: InputFooterV2Tokens
}

type ResponsiveTextAreaTokens = {
    [key in keyof BreakpointType]: TextAreaTokensType
}
```

Theme selection: `getTextAreaV2Tokens(foundationToken, theme)` in `TextAreaV2.tokens.ts` (light/dark implementations in `TextAreaV2.light.tokens.ts` / `TextAreaV2.dark.tokens.ts`).

**Registration**: The component key `TEXT_AREA_V2` is wired in theme initialization (`ThemeContext`, `initComponentTokens`, `useComponentToken`) alongside other Inputs V2 components. Legacy `TEXT_AREA` remains for the older `TextArea` implementation.

## Design decisions

### 1. Error as `error` + `errorMessage` (not an object)

**Decision**: Use `error?: boolean` and `errorMessage?: string` instead of `TextInputV2`’s `error?: { show, message }`.

**Rationale**: Keeps the textarea API small and matches `InputFooterV2`, which already takes `error` and `errorMessage` as separate props. Validation UI stays consistent with other inputs while avoiding an extra nested object for a simpler field.

### 2. No slots

**Decision**: Do not support left/right slots.

**Rationale**: Multiline fields are used for longer content; icon rows are less common than on single-line inputs. Reduces layout complexity and avoids measuring slot width for padding.

### 3. Single visual scale (no `InputSizeV2` on the field)

**Decision**: Labels use `InputSizeV2.SM` for `InputLabelsV2` / `InputFooterV2` for consistency with the system, but the textarea itself does not expose `sm` / `md` / `lg` sizes.

**Rationale**: One readable line height and padding model per breakpoint is enough for multiline content; token files encode spacing and type once per `inputContainer`.

### 4. Small breakpoint: hide labels, clear placeholder, adjust padding

**Decision**: When `breakPointLabel === 'sm'`, do not render `InputLabelsV2`, pass `placeholder=""`, and increase top padding (and reduce bottom padding) when the user has focused the control or entered text.

**Rationale**: Saves vertical space on narrow viewports. Consumers who need a visible label on small screens should add external copy, `aria-label`, or a heading — the built-in label stack is omitted in this layout.

### 5. `aria-describedby` composition

**Decision**: Build `aria-describedby` from stable IDs (`hintId`, `errorId` derived from `textareaId`): include the hint ID when `hintText` is set and `error` is false; include the error ID when `error` and `errorMessage` are set.

**Rationale**: Aligns with WCAG 3.3.1 / 3.3.2 — one primary description path avoids duplicate announcements; error messages use `role="alert"` and `aria-live="polite"` in `InputFooterV2`.

### 6. `aria-invalid` always a string

**Decision**: Set `aria-invalid={error ? 'true' : 'false'}` on the textarea.

**Rationale**: Keeps the attribute present for assistive tech; `"false"` explicitly clears invalid state when there is no error.

### 7. Ref forwarding via `setExternalRef`

**Decision**: Use the same `setExternalRef` helper as `TextInputV2` so both callback refs and object refs work.

**Rationale**: Matches form libraries and imperative focus patterns without a separate ref API for textareas.

### 8. `onKeyDown` composition

**Decision**: Destructure `onKeyDown` from `rest`, apply `filterBlockedProps` to the remainder, and invoke `restOnKeyDown` from the textarea’s `onKeyDown` handler.

**Rationale**: Preserves internal extensibility while ensuring consumers can still handle keys without losing blocked-prop filtering.

### 9. Error overrides hover and focus borders

**Decision**: When `error` is true, map border and background token keys to the error variants for default, hover, and focus.

**Rationale**: Same principle as `TextInputV2` — validation state stays visible until resolved.

### 10. Shared focus ring and transition

**Decision**: Import `FOCUS_RING_STYLES`, `TRANSITION`, and `setExternalRef` from `TextInputV2/utils`.

**Rationale**: Visual parity between single-line and multiline inputs in the same form.

### 11. Blocking `className` and `style`

**Decision**: Spread only `filterBlockedProps(restWithoutKeyDown)` onto `PrimitiveTextarea`.

**Rationale**: Same as `TextInputV2` — prevents ad hoc styles from breaking padding, focus ring, or theme contract.

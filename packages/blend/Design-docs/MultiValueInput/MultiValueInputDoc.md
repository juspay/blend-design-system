# MultiValueInputV2 Component Documentation

## Requirements

Create a multi-value (tag) input that supports:

- **Controlled draft value**: Current text in the field via `value` and `onChange` (string, not an event)
- **Controlled tags**: Committed chip strings and chip styling via **`tags`**: `{ value: string[]; size: TagSize; shape: TagShape; variant: TagVariant }`. **`onTagAdd`** and **`onTagRemove`** are **top-level** optional callbacks; the parent updates `tags.value` when they run.
- **Commit interaction**: **Enter** adds the trimmed draft when it is non-empty, not a duplicate of `tags.value`, and **`onTagAdd` is provided** (otherwise native Enter behavior, e.g. form submit, is not blocked). **Backspace** with an empty draft removes the last tag via **`onTagRemove`** when `tags.value.length > 0`.
- **Labels**: Primary label, optional `sublabel` (shown in parentheses next to the label)
- **Sizes**: Small (`sm`), Medium (`md`), Large (`lg`)
- **States**: Default, hover, focus, error, disabled — borders, background, and focus ring driven by tokens (`InputStateV2`)
- **Validation**: `error` boolean and optional `errorMessage`; required indicator (asterisk)
- **Help**: Hint text below the field; optional help hint on the label (`helpIconHintText` → `InputLabelsV2` tooltip)
- **Slots**: Optional `leftSlot` and `rightSlot` as `ReactNode` (fixed slot dimensions from tokens; content area offset with `offSet`)
- **Accessibility**: Native `<input>`, `aria-required`, `aria-invalid`, `aria-describedby` for hint and/or error; remove controls use `aria-label="Remove {tag}"`
- **Theme**: Light/dark responsive tokens via `useResponsiveTokens('MULTI_VALUE_INPUT_V2')`

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Top: Label, (sublabel), Required *, Help icon]                    │
├─────────────────────────────────────────────────────────────────────┤
│  [LeftSlot] │ [Tag][×] [Tag][×] ... [  native input (grows)  ] │ [RightSlot] │
├─────────────────────────────────────────────────────────────────────┤
│  [Bottom: Hint text / Error message]                                │
└─────────────────────────────────────────────────────────────────────┘
```

- **Top container**: `InputLabelsV2` — label, sublabel in parentheses, required asterisk, optional help icon + tooltip
- **Field shell**: Single bordered region; inner row is flex-wrap: **tags** (each is `Tag` + remove `PrimitiveButton` with icon), then **`PrimitiveInput`** for the draft
- **Bottom container**: `InputFooterV2` — hint and/or error; element IDs feed `aria-describedby` on the input

_(Optional: add `MultiValueInputAnatomy.png` beside this doc when a diagram is available.)_

## Props & Types

```typescript
// Shared enums (inputV2.types, Tags/types)
enum InputSizeV2 {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}
// TagSize, TagShape, TagVariant — see `../../Tags/types` (e.g. TagSize.XS, TagShape.ROUNDED, TagVariant.SUBTLE)

type MultiValueInputV2Props = {
    value?: string
    label?: string
    sublabel?: string
    helpIconHintText?: string
    error?: boolean
    errorMessage?: string
    hintText?: string
    disabled?: boolean
    tags?: {
        value: string[]
        size: TagSize
        shape: TagShape
        variant: TagVariant
    }
    onChange?: (value: string) => void
    onTagAdd?: (tag: string) => void
    onTagRemove?: (tag: string) => void
    size?: InputSizeV2
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'onChange' | 'value' | 'onFocus' | 'onBlur'
>
```

- **`tags`**: Holds **committed** chip strings in `value` plus **`Tag`** presentation (`size`, `shape`, `variant`). It does **not** include callbacks; those live on **`onTagAdd`** / **`onTagRemove`**.
- **`onChange`**: Emits the **string** value of the draft input (not `ChangeEvent`), so parents update `value` without reading `event.target`.
- **Omit `size`**: Component uses `InputSizeV2`, not the HTML `size` attribute.
- **Omit `style` | `className`**: Styling is token-driven; types exclude these on the public contract.
- **No ref forwarding** in the current implementation (unlike `TextInputV2`); consumers rely on `id` / focus management if needed.

## Final Token Type

Tokens are **responsive** per breakpoint (`sm`, `md`, `lg`). Each breakpoint maps to `MultiValueInputV2TokensType`:

```typescript
type MultiValueInputV2TokensType = {
    gap: CSSObject['gap']
    borderRadius: CSSObject['borderRadius']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        offSet: number
        fontSize: { [key in InputSizeV2]: CSSObject['fontSize'] }
        fontWeight: { [key in InputSizeV2]: CSSObject['fontWeight'] }
        gap: CSSObject['gap']
        borderRadius?: CSSObject['borderRadius']
        boxShadow: { [key in InputStateV2]: CSSObject['boxShadow'] }
        padding: {
            x: { [key in InputSizeV2]: CSSObject['padding'] }
            y: { [key in InputSizeV2]: CSSObject['padding'] }
        }
        border: { [key in InputStateV2]: CSSObject['border'] }
        color: { [key in InputStateV2]: CSSObject['color'] }
        placeholderColor: CSSObject['color']
        backgroundColor: { [key in InputStateV2]: CSSObject['backgroundColor'] }
        closeButton: { size: CSSObject['width'] }
        leftSlot: { width: CSSObject['width']; height: CSSObject['height'] }
        rightSlot: { width: CSSObject['width']; height: CSSObject['height'] }
        slotAlignTop: {
            withTags: CSSObject['top']
            withoutTags: CSSObject['top']
        }
    }
    bottomContainer: InputFooterV2Tokens
}

type ResponsiveMultiValueInputV2Tokens = {
    [key in keyof BreakpointType]: MultiValueInputV2TokensType
}
```

**Theme entry**: `getMultiValueInputV2Tokens(foundationToken, theme)` selects light vs dark token maps; `ThemeContext` registers `MULTI_VALUE_INPUT_V2` for overrides.

## Design Decisions

### 1. Error as `boolean` + `errorMessage` (not an object)

**Decision**: Use `error?: boolean` and `errorMessage?: string` instead of `TextInputV2`’s `error?: { show, message }`.

**Rationale**: Keeps the multi-value API small and explicit; `InputFooterV2` still receives `error` and `errorMessage` separately. Aligns with boolean props elsewhere for simple forms.

### 2. Two layers of state: `value` (draft) and `tags.value` (committed)

**Decision**: The native input shows the **draft** string; committed strings live in **`tags.value`**; chip look-and-feel uses **`tags.size` / `tags.shape` / `tags.variant`**. **`onTagAdd`** and **`onTagRemove`** are top-level props so parents can update `tags` (and clear `value` after add) without nesting callbacks inside `tags`.

**Rationale**: Matches common “chip input” mental model: type → Enter → chip appears and field clears. Decoupling draft from committed values avoids inferring tags from a delimiter-separated string.

### 3. Enter commits; duplicates and empty strings ignored

**Decision**: `addTag` trims the draft, skips empty strings, and skips values already in **`tags.value`** (`!tags.value.includes(trimmedValue)`). **`preventDefault` on Enter** runs only when a tag would actually be added (**`onTagAdd` present** and addable after trim/duplicate checks).

**Rationale**: Prevents duplicate chips and accidental empty commits; trimming avoids `"  a  "` vs `"a"` duplicates; avoids blocking form submit when nothing is committed.

### 4. Backspace removes last tag only when draft is empty

**Decision**: If `value === ''` and **`tags.value.length > 0`**, Backspace calls **`onTagRemove`** for the last tag in `tags.value`.

**Rationale**: Matches common email/tag UX: delete chips from the end without placing the caret inside a chip.

### 5. Shell styling uses `InputStateV2` (including disabled)

**Decision**: Border, background, and `boxShadow` for the outer field use token maps keyed by `default` | `hover` | `focus` | `error` | `disabled`. When `disabled` is true, disabled tokens apply so the container matches the disabled input.

**Rationale**: Visual consistency with other InputsV2; focus ring and error ring come from `boxShadow.focus` / `boxShadow.error` instead of hard-coded colors.

### 6. `onFocus` / `onBlur` on `PrimitiveInput`, not the wrapper

**Decision**: Forward `onFocus` and `onBlur` from the consumer on the actual `<input>`, combined with internal `setIsFocused` for styling.

**Rationale**: Event target and bubbling match expectations for form libraries and screen readers; avoids relying on focus bubbling to a non-focusable container.

### 7. `aria-describedby`: hint vs error exclusivity in IDs

**Decision**: Build `aria-describedby` from:

- `hintId` when `hintText` is set **and** `error` is false
- `errorId` when `error` is true **and** `errorMessage` is set

**Rationale**: Matches `InputFooterV2` behavior (hint hidden when `error` is true). Screen readers get the relevant description without duplicate/conflicting messages in the same association list.

### 8. Slots as `ReactNode` with token-based geometry

**Decision**: Left/right slots are not `{ slot, maxHeight }` objects; width/height come from `inputContainer.leftSlot` / `rightSlot` tokens. Inner content uses `ContentContainer` horizontal padding via `offSet` when a slot is present.

**Rationale**: Simpler API than `TextInputV2` slot objects; multi-value layout is chip row + input, so slot size is standardized per theme.

### 9. Container click focuses the input

**Decision**: The outer field shell has `onClick` that focuses the internal input ref.

**Rationale**: Clicking padding or near chips still puts focus in the text field for typing.

### 10. Tag removal: button + keyboard on remove control

**Decision**: Each tag’s remove control is a `PrimitiveButton` with `aria-label={`Remove ${tag}`}`; click and Enter/Space on the button remove the tag and refocus the input.

**Rationale**: WCAG 4.1.2 name/role; keyboard users can reach remove controls in tab order.

### 11. Stable IDs with `useId`

**Decision**: `inputId` is `providedId ?? useId()`; `errorId` / `hintId` are derived for `aria-describedby` and footer nodes.

**Rationale**: Avoids ID collisions when multiple instances exist on one page (WCAG 4.1.2).

### 12. Data attributes for tests and analytics

**Decision**: Root wrapper sets `data-multi-value-input={label || 'multi-value-input'}` and `data-status={disabled ? 'disabled' : 'enabled'}`.

**Rationale**: Consistent with other InputsV2 components for automation and Storybook.

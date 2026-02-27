# KeyValuePair Component Documentation

## Requirements

Create a flexible, accessible Key/Value pair component that supports:

- Semantic relationship between key and value (programmatically determinable)
- Vertical and horizontal layouts
- Three sizes for value text (Small, Medium, Large)
- Slots: `keySlot`, `valueLeftSlot`, `valueRightSlot` (decorative or interactive)
- Text overflow strategies: `truncate`, `wrap`, `wrap-clamp` with optional tooltip
- Responsive tokenization and theme (light/dark)
- Proper ARIA usage and keyboard accessibility where applicable

## Anatomy

```
┌────────────────────────────────────────────────────────────┐
│ Key slot  │ Key (term)             │   Value (definition)  │
│ (optional)│                        │  leftSlot  Value  rightSlot │
└────────────────────────────────────────────────────────────┘
```

- Container: flex wrapper that changes direction for vertical/horizontal layouts
- Key: semantic element with role="term" and an id used by the value
- Value: semantic element with role="definition" and aria-labelledby pointing to the key id
- Slots: optional elements placed around the key/value; decorative icons should be aria-hidden

## Props & Types

```typescript
export type KeyValuePairV2Props = {
    keyString: string
    value?: string
    size?: KeyValuePairV2Size
    keySlot?: React.ReactNode
    valueLeftSlot?: React.ReactNode
    valueRightSlot?: React.ReactNode
    keyValuePairState?: KeyValuePairV2StateType
    maxWidth?: string
    textOverflow?: 'truncate' | 'wrap' | 'wrap-clamp'
    maxLines?: number
    showTooltipOnTruncate?: boolean
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'style'>
```

Notes:

- `keyString` is required and used to form accessible labeling.
- `value` may be empty; component must handle gracefully.
- Slots may contain interactive elements (buttons/links); consumers are responsible for accessibility of those elements (aria-labels, sizes).

## Final Token Type

```typescript
export type KeyValuePairV2TokensType = {
    gap: { vertical: CSSObject['gap']; horizontal: CSSObject['gap'] }
    key: {
        color: CSSObject['color']
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        gap: CSSObject['gap']
    }
    value: {
        color: CSSObject['color']
        fontSize: { [key in KeyValuePairV2Size]: CSSObject['fontSize'] }
        fontWeight: CSSObject['fontWeight']
        gap: CSSObject['gap']
        slot: { color: CSSObject['color']; maxHeight?: CSSObject['maxHeight'] }
    }
}
```

Token pattern: `component.[target].cssProp.[size|variant].value`

## Design Decisions

### 1. Semantic Accessibility

Decision: Use `role="term"` for the key and `role="definition"` for the value, linking the value to the key using `aria-labelledby` (value references key id).

Rationale: Ensures screen readers can determine the relationship without relying on specific HTML structures (dl/dt/dd), and enables flexible DOM layouts.

### 2. Token-Driven Styling & Responsiveness

Decision: All visual styles come from responsive tokens. Utilities must accept tokens from the component rather than capturing them at module load.

Rationale: Allows theme switches and responsive breakpoints to update component styles at runtime. Passing tokens into helper utilities ensures up-to-date styles.

### 3. Text Overflow Handling

Decision: Support three overflow modes:

- `truncate`: single-line ellipsis with optional tooltip for full text
- `wrap`: natural wrapping
- `wrap-clamp`: multi-line clamp using -webkit-line-clamp and optional tooltip

Rationale: Provides predictable layout behavior while preserving accessibility via tooltips when content is hidden.

### 4. Slots API (Decorative vs Interactive)

Decision: Provide `keySlot`, `valueLeftSlot`, and `valueRightSlot`. Decorative icons should have `aria-hidden="true"`. Interactive elements in slots (buttons/links) must include accessible names.

Rationale: Keeps component flexible for real-world use cases while delegating the accessibility details of interactive slot content to consumers.

### 5. Minimal Focus & Keyboard Behavior

Decision: The KeyValuePair component itself is non-interactive by default (role="group"). Interactive content in slots controls their own keyboard behavior.

Rationale: Avoids surprising keyboard targets when KeyValuePair is used purely for display.

## Examples

```tsx
<KeyValuePairV2
    keyString="Email"
    value="john.doe@example.com"
    valueLeftSlot={<MailIcon aria-hidden="true" />}
    textOverflow="truncate"
    maxWidth="220px"
/>
```

## Accessibility Checklist

- Uses `role="group"` on container with `aria-label` combining key and value (optional)
- Key has a stable id; value uses `aria-labelledby` to reference it
- Decorative icons are `aria-hidden="true"`
- Interactive slot elements must provide accessible names and meet target-size requirements
- Text truncation exposes full content via tooltip for screen readers and sighted users

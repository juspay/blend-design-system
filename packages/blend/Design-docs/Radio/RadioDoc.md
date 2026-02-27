# RadioV2 Component Documentation

## Requirements

- Toggle state: support checked / unchecked with smooth indicator animation
- Label & SubLabel: primary label with optional secondary description
- Text truncation: configurable max lengths with tooltip for overflowed text
- Icon slot: optional decorative icon next to the label
- Sizes: Small (`sm`) and Medium (`md`)
- States: default, hover, disabled, error
- Accessibility: full ARIA support (role, name, state, description)
- Theme support: light and dark token variants
- Required indicator: visual asterisk with proper ARIA attributes
- Support both controlled (`checked`) and uncontrolled (`defaultChecked`) modes

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────────────────────────────┐   │
│  │    Radio    │  │  Label Text [Icon]                  │   │
│  │    Button   │  │  Sub Label Text                     │   │
│  └─────────────┘  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

- Input: native `<input type="radio">` visually styled via `StyledRadioV2Root`
- Indicator: circular ring + filled center when active
- Label: clickable label associated with the input via `htmlFor` / `aria-labelledby`
- Slot: optional icon element rendered next to the label (kept accessible)
- SubLabel: descriptive text linked with `aria-describedby`

    > Note: Anatomy follows the same layout and content structure as `SwitchV2` — the main difference is the control itself:

- Instead of a sliding track + thumb (Switch), RadioV2 uses a circular indicator (ring + center dot) to represent selection.
- The surrounding content (label, subLabel, slot) and accessibility/linking approach are identical to SwitchV2 to provide consistent UX across selector components.

## Usage Example

```tsx
import { RadioV2 } from '@juspay/blend-design-system'
import { SelectorV2Size } from '@juspay/blend-design-system/SelectorV2'
;<RadioV2
    label="Option A"
    subLabel="Extra info"
    size={SelectorV2Size.MD}
    checked={isSelected}
    onChange={(e) => setSelected(e.target.checked)}
    slot={{ slot: <Icon />, maxHeight: 16 }}
    maxLength={{ label: 40, subLabel: 80 }}
/>
```

## Props & Types

```typescript
export type RadioV2Props = {
    id?: string
    value?: string
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    required?: boolean
    error?: boolean
    size?: SelectorV2Size
    label?: string
    subLabel?: string
    slot?: { slot: ReactElement; maxHeight?: CSSObject['maxHeight'] }
    name?: string
    maxLength?: { label?: number; subLabel?: number }
}
```

Notes:

- `checked` (controlled) and `defaultChecked` (uncontrolled) are mutually exclusive; the component ensures only one is forwarded to the input.
- `children` may be used by consumers for inline content, but the component prevents passing `children` into the native input element (inputs cannot have children).

## Token Shape (summary)

Representative token areas that style RadioV2:

```typescript
type RadioV2TokensType = {
    gap: CSSObject['gap']
    group: { gap: CSSObject['gap'] }
    radio: {
        indicator: {
            [k in RadioV2IndicatorState]: {
                backgroundColor: Record<
                    RadioV2State,
                    CSSObject['backgroundColor']
                >
                borderColor: Record<RadioV2State, CSSObject['borderColor']>
            }
        }
        activeIndicator: {
            active: {
                backgroundColor: Record<
                    Exclude<RadioV2State, 'hover' | 'error'>,
                    CSSObject['backgroundColor']
                >
            }
        }
        height: Record<SelectorV2Size, CSSObject['height']>
        borderWidth: Record<RadioV2IndicatorState, Record<RadioV2State, number>>
    }
    content: {
        gap: CSSObject['gap']
        label: {
            gap: CSSObject['gap']
            color: Record<SelectorV2InteractionState, CSSObject['color']>
            fontSize: Record<SelectorV2Size, CSSObject['fontSize']>
            fontWeight: Record<SelectorV2Size, CSSObject['fontWeight']>
            lineHeight: Record<SelectorV2Size, CSSObject['lineHeight']>
            slot: {
                maxHeight: Record<SelectorV2Size, CSSObject['maxHeight']>
            }
        }
        subLabel: {
            color: Record<SelectorV2InteractionState, CSSObject['color']>
            fontSize: Record<SelectorV2Size, CSSObject['fontSize']>
            fontWeight: Record<SelectorV2Size, CSSObject['fontWeight']>
            lineHeight: Record<SelectorV2Size, CSSObject['lineHeight']>
        }
        required: { color: CSSObject['color'] }
    }
}
```

## Design Decisions

### 1. Native input for semantics

Use a real `<input type="radio">` for correct browser and assistive technology behavior. Visual styling and animations are layered on top while preserving native semantics (role, value, focus).

### 2. Controlled vs Uncontrolled

Support both controlled (`checked`) and uncontrolled (`defaultChecked`) modes. To avoid React warnings we only forward either `checked` or `defaultChecked` to the input (never both).

### 3. Shared selector components

`SelectorsLabel` and `SelectorsSubLabel` are shared between Switch/Checkbox/Radio to centralize truncation, tooltip, and accessibility behaviors.

### 4. Accessibility

- `aria-checked`, `aria-required`, `aria-invalid`, `aria-disabled` are applied on the input when appropriate.
- `aria-labelledby` points to the label id when `label` is provided.
- `aria-describedby` merges any custom `aria-describedby` with the subLabel id when present.
- Keyboard support: native radio behavior + group-level keyboard handling when used inside `RadioGroupV2`.

### 5. Prevent forwarding children into input

Inputs are void elements; `children` must not be forwarded. The component explicitly strips `children` from the props spread before applying them to the input element.

### 6. Tokens & Theming

Tokens are responsive and theme-aware (light/dark). The token shape separates indicator, active indicator, sizing, and content styles so theme engineers can override each area independently.

## Example: RadioGroup usage

```tsx
<RadioGroupV2 name="choices" value={value} onChange={setValue}>
    <RadioV2 label="A" value="a" />
    <RadioV2 label="B" value="b" />
</RadioGroupV2>
```

## Testing & Accessibility

- Component has unit and accessibility tests verifying role, aria-checked transitions, keyboard activation, and labeling/linking behavior. See `__tests__/components/RadioV2/`.

## Implementation notes

- Keep `StyledRadioV2Root` focused on presentation; accessibility attributes are applied on the native input in the component.
- When adding new token keys, follow the pattern: `component.[target].CSSProp.[size].[variant/state].value`.

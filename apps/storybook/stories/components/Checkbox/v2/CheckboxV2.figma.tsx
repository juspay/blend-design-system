import React from 'react'
import { figma } from '@figma/code-connect'
import { CheckboxV2, SelectorV2Size } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CHECKBOXV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - label (Figma string) → label (Code)
 *      [V1 mapped this Figma property to `value`; V2's prop is `label`]
 *    - subtext (Figma string) → subLabel (Code)
 *      [V1 used `subtext`; V2's prop is `subLabel`]
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size (SelectorV2Size enum: SM/MD/LG)
 *    - disabled → disabled
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma variant) → checked (Code) + disabled (Code)
 *      V2 `checked` accepts `boolean | 'indeterminate'`.
 *      - state='default' → checked=false
 *      - state='checked' → checked=true
 *      - state='intermediate' → checked='indeterminate'
 *      - state='disabled' → checked=false (disabled surfaced via separate boolean)
 *    - hasSlot (Figma boolean) + slot (Figma instance) → slot (Code object)
 *      V2 `slot` is `{ slot: ReactElement; maxHeight? }`, so the Figma instance
 *      is wrapped in the example: `slot={slot ? { slot } : undefined}`
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - hasContent: Automatically determined by presence of label/subLabel/slot
 *    - hasSlot: Handled by the slot prop itself
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - defaultChecked: Initial state, managed by parent state
 *    - required: Not represented in Figma design
 *    - error: Not represented in Figma design
 *    - onCheckedChange: Functional callback prop
 *    - maxLength: Truncation config for label/subLabel
 *    - id, name: Form identifiers
 *
 * Note: CheckboxV2CheckedState enum (CHECKED/UNCHECKED/INDETERMINATE) exists for
 * token lookups, but the `checked` prop is typed as `boolean | 'indeterminate'`,
 * so the string literal 'indeterminate' is used directly here.
 */

figma.connect(
    CheckboxV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-677129&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping — SelectorV2Size (SM/MD/LG)
            size: figma.enum('size', {
                sm: SelectorV2Size.SM,
                md: SelectorV2Size.MD,
                small: SelectorV2Size.SM,
                medium: SelectorV2Size.MD,
                Small: SelectorV2Size.SM,
                Medium: SelectorV2Size.MD,
            }),

            // State → checked mapping (V2 checked: boolean | 'indeterminate')
            checked: figma.enum('state', {
                default: false,
                checked: true,
                intermediate: 'indeterminate',
                disabled: false,
            }),

            // Disabled is a separate boolean property in Figma
            disabled: figma.boolean('disabled'),

            // Renamed: label (Figma) → label (Code) [V1 mapped this to `value`]
            label: figma.string('label'),

            // Renamed: subtext (Figma) → subLabel (Code) [V1 used `subtext`]
            subLabel: figma.string('subtext'),

            // Slot mapping — V2 slot is an object { slot: ReactElement }
            slot: figma.boolean('hasSlot', {
                true: { slot: figma.instance('slot') },
                false: undefined,
            }),

            // Note: The following props are not mapped as they don't exist in Figma:
            // - defaultChecked (initial state handling)
            // - required (not in Figma design)
            // - error (not in Figma design)
            // - onCheckedChange (functional prop)
            // - maxLength (truncation config)
            // - id, name (form identifiers)
        },

        example: ({ size, checked, disabled, label, subLabel, slot }) => (
            <CheckboxV2
                size={size}
                checked={checked}
                disabled={disabled}
                label={label}
                subLabel={subLabel}
                slot={slot}
            />
        ),

        imports: [
            "import { CheckboxV2, SelectorV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/SelectorV2/CheckboxV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-checkboxv2--docs',
            },
        ],
    }
)

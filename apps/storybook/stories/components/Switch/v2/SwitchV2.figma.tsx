import React from 'react'
import { figma } from '@figma/code-connect'
import { SwitchV2, SelectorV2Size } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SWITCHV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - subtext (Figma string) → subLabel (Code)
 *      [V1 used `subtext`; V2's prop is `subLabel`]
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size (SelectorV2Size enum: SM/MD/LG)
 *    - disabled → disabled
 *    - label → label
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma variant) → checked (Code boolean)
 *      Only state='checked' maps to checked=true; all other states map to false.
 *      - state='checked' → checked=true
 *      - state='default' → checked=false
 *      - state='hover' → checked=false (interaction state, not a code prop)
 *      - state='active' → checked=false
 *      - state='focussed' → checked=false
 *      - state='disabled' → checked=false (disabled handled by separate boolean)
 *    - hasSlot (Figma boolean) + slot (Figma instance) → slot (Code object)
 *      V2 `slot` is `{ slot: ReactElement; maxHeight? }`, so the Figma instance
 *      is wrapped in the example: `slot={slot ? { slot } : undefined}`
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/active/focussed are interaction states, not code props
 *    - hasContent: Automatically determined by presence of label/subLabel/slot
 *    - hasSubtext: Handled by the subLabel prop itself
 *    - hasSlot: Handled by the slot prop itself
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - id: Form identifier
 *    - defaultChecked: Initial state handling
 *    - required: Not represented in Figma design
 *    - error: Not represented in Figma design
 *    - name: Form-related, not needed in Figma
 *    - onCheckedChange: Functional callback prop
 *    - maxLength: Truncation config for label/subLabel
 */

figma.connect(
    SwitchV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-677334&t=2L1Yl830ZKZjFcrt-4',
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

            // State → checked mapping (only checked=true matters)
            checked: figma.enum('state', {
                checked: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),

            // Direct mapping: disabled
            disabled: figma.boolean('disabled'),

            // Direct string mappings
            label: figma.string('label'),

            // Renamed: subtext (Figma) → subLabel (Code) [V1 used `subtext`]
            subLabel: figma.string('subtext'),

            // Slot mapping — V2 slot is an object { slot: ReactElement }
            slot: figma.boolean('hasSlot', {
                true: { slot: figma.instance('slot') },
                false: undefined,
            }),

            // Note: The following props are not mapped as they don't exist in Figma:
            // - id (form identifier)
            // - defaultChecked (initial state)
            // - required (form validation)
            // - error (error state)
            // - name (form field name)
            // - onCheckedChange (event handler)
            // - maxLength (truncation config)
        },

        example: ({ size, checked, disabled, label, subLabel, slot }) => (
            <SwitchV2
                size={size}
                checked={checked}
                disabled={disabled}
                label={label}
                subLabel={subLabel}
                slot={slot}
            />
        ),

        imports: [
            "import { SwitchV2, SelectorV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/SelectorV2/SwitchV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-switchv2--docs',
            },
        ],
    }
)

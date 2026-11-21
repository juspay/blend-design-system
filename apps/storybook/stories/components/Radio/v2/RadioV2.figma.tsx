import React from 'react'
import { figma } from '@figma/code-connect'
import { RadioV2, SelectorV2Size } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR RADIOV2 COMPONENT
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
 *
 * 3. SPECIAL MAPPINGS:
 *    - enable (Figma boolean) → checked (Code boolean)
 *      [V1 renamed `enable` → `checked`; V2 keeps the prop name `checked`]
 *    - hasSlot (Figma boolean) + slot (Figma instance) → slot (Code object)
 *      V2 `slot` is `{ slot: ReactElement; maxHeight? }`, so the Figma instance
 *      is wrapped in the example: `slot={slot ? { slot } : undefined}`
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: Interaction state, not needed in code
 *    - hasContent: Automatically determined by presence of label/subLabel/slot
 *    - hasSubtext: Handled by the subLabel prop itself
 *    - hasSlot: Handled by the slot prop itself
 *    - label: Text layer inside the Figma instance, not exposed as a string
 *      property (hardcoded in design; developers should replace with content)
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - label: Label text — not exposed as a Figma string property
 *    - id: Form identifier
 *    - defaultChecked: Initial state handling
 *    - required: Not represented in Figma design
 *    - error: Not represented in Figma design
 *    - name: Form field name
 *    - onCheckedChange: Functional callback prop
 *    - maxLength: Truncation config for label/subLabel
 */

figma.connect(
    RadioV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-677515&t=2L1Yl830ZKZjFcrt-4',
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
                SM: SelectorV2Size.SM,
                MD: SelectorV2Size.MD,
            }),

            // Renamed mapping: enable (Figma) → checked (Code)
            checked: figma.boolean('enable'),

            // Direct mapping: disabled
            disabled: figma.boolean('disabled'),

            // Renamed: subtext (Figma) → subLabel (Code) [V1 used `subtext`]
            subLabel: figma.string('subtext'),

            // Slot mapping — V2 slot is an object { slot: ReactElement }
            slot: figma.boolean('hasSlot', {
                true: { slot: figma.instance('slot') },
                false: undefined,
            }),

            // Note: The following props are not mapped as they don't exist in Figma:
            // - label (label text — not available as a Figma string property)
            // - id (form identifier)
            // - defaultChecked (initial state)
            // - required (form validation)
            // - error (error state)
            // - name (form field name)
            // - onCheckedChange (event handler)
            // - maxLength (truncation config)
        },

        example: ({ size, checked, disabled, subLabel, slot }) => (
            <RadioV2
                size={size}
                checked={checked}
                disabled={disabled}
                subLabel={subLabel}
                slot={slot}
            />
        ),

        imports: [
            "import { RadioV2, SelectorV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/SelectorV2/RadioV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-radiov2--docs',
            },
        ],
    }
)

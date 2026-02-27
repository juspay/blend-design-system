import React from 'react'
import { figma } from '@figma/code-connect'
import { Checkbox, CheckboxSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CHECKBOX COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. STATE vs CHECKED:
 *    - Figma: Uses 'state' variant (default, checked, intermediate, disabled)
 *    - Code: Uses 'checked' prop (false, true, 'indeterminate') + 'disabled' prop
 *    - Mapping:
 *      - state='default' → checked=false
 *      - state='checked' → checked=true
 *      - state='intermediate' → checked='indeterminate'
 *      - state='disabled' → disabled=true (checked state handled separately)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size
 *    - value → value
 *    - subtext → subtext
 *    - disabled → disabled
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - hasContent: Automatically determined by presence of children/subtext/slot
 *    - hasSlot: Handled by the slot prop itself
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - defaultChecked: Not needed in Figma (initial state)
 *    - required: Not represented in Figma design
 *    - error: Not represented in Figma design
 *    - children: Text content handled differently in Figma
 *    - onCheckedChange: Functional prop
 */

figma.connect(
    Checkbox,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-677129&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping - trying different possible mappings
            // If size is a variant or uses different values in Figma
            size: figma.enum('size', {
                sm: CheckboxSize.SMALL,
                md: CheckboxSize.MEDIUM,
                small: CheckboxSize.SMALL,
                medium: CheckboxSize.MEDIUM,
                Small: CheckboxSize.SMALL,
                Medium: CheckboxSize.MEDIUM,
            }),

            // State to checked mapping
            // Figma uses 'state' for checked status
            checked: figma.enum('state', {
                default: false,
                checked: true,
                intermediate: 'indeterminate',
                disabled: false, // When disabled, default to unchecked unless combined with other state
            }),

            // Disabled is a separate boolean property in Figma
            disabled: figma.boolean('disabled'),

            // Mapping based on actual Figma properties
            value: figma.string('label'), // label prop in Figma maps to value in code
            subtext: figma.string('subtext'),

            // Slot mapping - Figma uses hasSlot boolean, code uses actual slot content
            slot: figma.boolean('hasSlot', {
                true: figma.instance('slot'),
                false: undefined,
            }),

            // Note: The following props are not mapped as they don't exist in Figma:
            // - children (label text - not available as a prop in Figma)
            // - defaultChecked (initial state handling)
            // - required (not in Figma design)
            // - error (not in Figma design)
            // - onCheckedChange (functional prop)
        },

        example: ({ size, checked, disabled, value, subtext, slot }) => (
            <Checkbox
                size={size}
                checked={checked}
                disabled={disabled}
                value={value}
                subtext={subtext}
                slot={slot}
            />
        ),

        imports: ["import { Checkbox } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Checkbox',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-checkbox--docs',
            },
        ],
    }
)

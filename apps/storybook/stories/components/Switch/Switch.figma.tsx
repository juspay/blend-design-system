import React from 'react'
import { figma } from '@figma/code-connect'
import { Switch, SwitchSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SWITCH COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - size → size
 *    - checked → checked
 *    - disabled → disabled
 *    - subtext → subtext
 *    - label → label
 *
 * 2. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: Interaction state, not needed in code
 *    - hasContent: Automatically determined by presence of label/subtext/slot
 *    - hasSubtext: Handled by the subtext prop itself
 *
 * 3. SPECIAL MAPPINGS:
 *    - hasSlot → slot (boolean to instance mapping)
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - id: Not needed in Figma design
 *    - defaultChecked: Initial state handling
 *    - required: Not represented in Figma design
 *    - error: Not represented in Figma design
 *    - name: Form-related, not needed in Figma
 *    - value: Form-related, not needed in Figma
 *    - onChange: Functional prop
 */

figma.connect(
    Switch,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=10045-7581&t=gedfNFz548Qsi2Fl-4',
    {
        props: {
            // Size mapping - trying different possible mappings
            // If size is a variant or uses different values in Figma
            size: figma.enum('size', {
                sm: SwitchSize.SMALL,
                md: SwitchSize.MEDIUM,
                small: SwitchSize.SMALL,
                medium: SwitchSize.MEDIUM,
                Small: SwitchSize.SMALL,
                Medium: SwitchSize.MEDIUM,
            }),

            // Direct boolean mappings
            checked: figma.boolean('checked'),
            disabled: figma.boolean('disabled'),

            // Direct string mappings
            subtext: figma.string('subtext'),
            label: figma.string('label'),

            // Slot mapping - Figma uses hasSlot boolean, code uses actual slot content
            slot: figma.boolean('hasSlot', {
                true: figma.instance('slot'),
                false: undefined,
            }),

            // Note: The following props are not mapped as they don't exist in Figma:
            // - id (form identifier)
            // - defaultChecked (initial state)
            // - required (form validation)
            // - error (error state)
            // - name (form field name)
            // - value (form field value)
            // - onChange (event handler)
        },

        example: ({ size, checked, disabled, subtext, label, slot }) => (
            <Switch
                size={size}
                checked={checked}
                disabled={disabled}
                subtext={subtext}
                label={label}
                slot={slot}
            />
        ),

        imports: ["import { Switch } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Switch',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-switch--docs',
            },
        ],
    }
)

import React from 'react'
import { figma } from '@figma/code-connect'
import { Radio, RadioSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR RADIO COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - size → size
 *    - checked → checked
 *    - disabled → disabled
 *    - value → value
 *    - subtext → subtext
 *
 * 2. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: Interaction state, not needed in code
 *    - hasContent: Automatically determined by presence of value/subtext/slot
 *    - hasSubtext: Handled by the subtext prop itself
 *    - hasSlot: Handled by the slot prop itself
 *
 * 3. SPECIAL MAPPINGS:
 *    - hasSlot → slot (boolean to instance mapping)
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - id: Not needed in Figma design
 *    - defaultChecked: Initial state handling
 *    - required: Not represented in Figma design
 *    - error: Not represented in Figma design
 *    - children: Label content handled differently in Figma
 *    - name: Form-related, not needed in Figma
 *    - onChange: Functional prop
 */

figma.connect(
    Radio,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-677515&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping - trying different possible mappings to avoid size issues
            size: figma.enum('size', {
                sm: RadioSize.SMALL,
                md: RadioSize.MEDIUM,
                small: RadioSize.SMALL,
                medium: RadioSize.MEDIUM,
                Small: RadioSize.SMALL,
                Medium: RadioSize.MEDIUM,
                SM: RadioSize.SMALL,
                MD: RadioSize.MEDIUM,
            }),

            // Mappings based on actual Figma properties
            checked: figma.boolean('enable'), // enable prop in Figma maps to checked in code
            disabled: figma.boolean('disabled'),

            // Note: value prop doesn't exist in Figma, removing this mapping
            // value: figma.string('value'),
            subtext: figma.string('subtext'),

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
            // - children (label text)
            // - name (form field name)
            // - onChange (event handler)
        },

        example: ({ size, checked, disabled, subtext, slot }) => (
            <Radio
                size={size}
                checked={checked}
                disabled={disabled}
                subtext={subtext}
                slot={slot}
            />
        ),

        imports: ["import { Radio } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Radio',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-radio--docs',
            },
        ],
    }
)

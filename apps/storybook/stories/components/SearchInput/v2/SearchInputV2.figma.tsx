import React from 'react'
import { figma } from '@figma/code-connect'
import { SearchInputV2 } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SEARCHINPUTV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - (none — all Figma properties map directly or via the special mappings below)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - placeholder → placeholder (V1 wrongly mapped Figma placeholder to value; V2 fixes this)
 *    - leftSlot → leftSlot (via showLeftSlot boolean)
 *    - rightSlot → rightSlot (via showRightSlot boolean)
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → error + disabled (Code)
 *      - state=error → error=true
 *      - state=disabled → disabled=true
 *      - state=default/hover/active/focussed → handled automatically by CSS interactions
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/active/focussed are interaction states, not code props
 *    - showLeftSlot: Left slot is shown automatically when leftSlot prop is provided
 *    - showRightSlot: Right slot is shown automatically when rightSlot prop is provided
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled input value, managed by parent state
 *    - onChange: Callback for handling input changes
 *    - allowClear: Shows the clear button when a value exists (defaults to true)
 *    - onClear: Callback fired when the clear button is pressed
 *    - clearIcon: Custom clear icon ReactNode
 *    - onFocus, onBlur: Focus/blur event handlers
 *    - Note: required is not supported by SearchInputV2
 */

figma.connect(
    SearchInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-516575&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Direct mapping: placeholder (V1 wrongly mapped this to value)
            placeholder: figma.string('placeholder'),

            // Slot mappings
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),

            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),

            // Special mapping: state=error → error=true
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),

            // Special mapping: state=disabled → disabled=true
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),

            // onChange handler
            onChange: () => {},
        },

        example: ({
            placeholder,
            leftSlot,
            rightSlot,
            error,
            disabled,
            onChange,
        }) => (
            <SearchInputV2
                placeholder={placeholder}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                disabled={disabled}
                value=""
                onChange={onChange}
            />
        ),

        imports: [
            "import { SearchInputV2 } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/SearchInputV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-searchinputv2--docs',
            },
        ],
    }
)

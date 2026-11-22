import React from 'react'
import { figma } from '@figma/code-connect'
import {
    DropdownInput,
    DropdownPosition,
    TextInputSize,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR DROPDOWNINPUT COMPONENT (V1)
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - mandatory (Figma) → required (Code)
 *    - dropdownPosition (Figma) → dropdownPosition (Code, enum typed)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size (Figma sm/md/lg → TextInputSize.SMALL/MEDIUM/LARGE)
 *    - label → label
 *    - sublabel → sublabel
 *    - hintText → hintText
 *    - placeholder → placeholder
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → error + disabled (Code)
 *      - state=error → error=true
 *      - state=disabled → disabled=true
 *      - state=default/hover/focus → handled automatically by CSS interactions
 *    - dropdownPosition (Figma) → dropdownPosition (Code, DropdownPosition enum)
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/focus are interaction states, not code props
 *    - showInfo: Help icon is shown automatically when helpIconHintText is provided
 *    - showLabel: Label is shown automatically when label prop is provided
 *    - showSubLabel: Sublabel is shown automatically when sublabel prop is provided
 *    - showHint: Hint is shown automatically when hintText prop is provided
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled input value, managed by parent state
 *    - onChange: Callback for handling input changes
 *    - dropDownValue: Controlled dropdown selection
 *    - dropDownPlaceholder: Placeholder for the dropdown
 *    - onDropDownChange: Callback for dropdown selection changes
 *    - dropDownItems: Menu items (SelectMenuGroupType[])
 *    - dropdownName: Accessible name for the dropdown
 *    - onDropdownOpen/Close: Dropdown open/close callbacks
 *    - maxMenuHeight, minMenuWidth, maxMenuWidth: Menu dimension constraints
 */

figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=29491-10209',
    {
        props: {
            // Size mapping: Figma sm/md/lg → TextInputSize.SMALL/MEDIUM/LARGE
            size: figma.enum('size', {
                sm: TextInputSize.SMALL,
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),

            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            // Renamed mapping: mandatory (Figma) → required (Code)
            required: figma.boolean('mandatory'),

            // Direct mapping: dropdownPosition (Figma) → DropdownPosition (Code)
            dropdownPosition: figma.enum('dropdownPosition', {
                left: DropdownPosition.LEFT,
                right: DropdownPosition.RIGHT,
            }),

            // Special mapping: state=error → error=true (V1 has boolean error)
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                focus: false,
                focused: false,
                filled: false,
                disabled: false,
            }),

            // Special mapping: state=disabled → disabled=true
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                focus: false,
                focused: false,
                filled: false,
                error: false,
            }),
        },

        example: ({
            size,
            label,
            sublabel,
            hintText,
            placeholder,
            required,
            dropdownPosition,
            error,
            disabled,
        }) => (
            <DropdownInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                dropdownPosition={dropdownPosition}
                error={error}
                disabled={disabled}
                value=""
                onChange={() => {}}
                dropDownValue="US"
                dropDownPlaceholder="Select country"
                onDropDownChange={() => {}}
                dropDownItems={[
                    {
                        items: [
                            { label: 'US', value: 'US' },
                            { label: 'IN', value: 'IN' },
                        ],
                    },
                ]}
            />
        ),

        imports: [
            "import { DropdownInput, DropdownPosition, TextInputSize } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/DropdownInput',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-dropdowninput--docs',
            },
        ],
    }
)

figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=29491-10650',
    {
        props: {
            // Size mapping: mobile has only md/lg (no sm)
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),

            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            required: figma.boolean('mandatory'),

            dropdownPosition: figma.enum('dropdownPosition', {
                left: DropdownPosition.LEFT,
                right: DropdownPosition.RIGHT,
            }),

            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                focus: false,
                focused: false,
                filled: false,
                disabled: false,
            }),

            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                focus: false,
                focused: false,
                filled: false,
                error: false,
            }),
        },

        example: ({
            size,
            label,
            sublabel,
            hintText,
            placeholder,
            required,
            dropdownPosition,
            error,
            disabled,
        }) => (
            <DropdownInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                dropdownPosition={dropdownPosition}
                error={error}
                disabled={disabled}
                value=""
                onChange={() => {}}
                dropDownValue="US"
                dropDownPlaceholder="Select country"
                onDropDownChange={() => {}}
                dropDownItems={[
                    {
                        items: [
                            { label: 'US', value: 'US' },
                            { label: 'IN', value: 'IN' },
                        ],
                    },
                ]}
            />
        ),

        imports: [
            "import { DropdownInput, DropdownPosition, TextInputSize } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/DropdownInput',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-dropdowninput--docs',
            },
        ],
    }
)

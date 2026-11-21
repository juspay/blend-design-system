import React from 'react'
import { figma } from '@figma/code-connect'
import { NumberInputV2, InputSizeV2 } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR NUMBERINPUTV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - label + sublabel (Figma) → label.text + label.subtext (Code) — V2 groups them into one object
 *    - showLeftSlot/leftSlot + showRightSlot/rightSlot (Figma) → slot.left + slot.right (Code)
 *      (slots were not available in V1; V2 exposes them through a single slot object)
 *    - mandatory (Figma) → required (Code) — not supported in V1, supported in V2
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size (Figma md/lg → InputSizeV2.MD/LG; code also supports InputSizeV2.SM)
 *    - hintText → hintText
 *    - placeholder → placeholder (V1 wrongly mapped Figma placeholder to value; V2 fixes this)
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → error + disabled (Code)
 *      - state=error → error={ show: true }
 *      - state=disabled → disabled=true
 *      - state=default/hover/active/focussed → handled automatically by CSS interactions
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/active/focussed are interaction states, not code props
 *    - showStepper: Stepper buttons are always rendered by V2
 *    - showInfo: Help icon is shown automatically when helpIconText is provided
 *    - showLabel: Determined by presence of label.text
 *    - showSublabel: Determined by presence of label.subtext
 *    - showHint: Hint is shown automatically when hintText prop is provided
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled numeric value (number | null), managed by parent state
 *    - onChange: Required callback for handling input changes
 *    - error.message: Error message text rendered when error.show is true
 *    - unit: Unit label rendered beside the value
 *    - unitDirection: NumberInputV2Direction.LEFT/RIGHT — side the unit renders on
 *      (controls unit placement, not the stepper; steppers are built-in)
 *    - min, max, step: Numeric range and stepping constraints
 *    - preventNegative: Rejects negative values
 *    - helpIconText: Tooltip text for the help icon
 *    - name and other standard HTML input attributes
 */

figma.connect(
    NumberInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-515591&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping: Figma md/lg → InputSizeV2.MD/LG (code also supports SM)
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),

            // Direct string mappings
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            // Renamed mapping: label/sublabel (Figma) → label.text/label.subtext (Code)
            label: figma.string('label'),
            subtext: figma.string('sublabel'),

            // Renamed mapping: mandatory (Figma) → required (Code)
            required: figma.boolean('mandatory'),

            // Special mapping: state=error → error={ show: true }
            error: figma.enum('state', {
                error: { show: true },
                default: { show: false },
                hover: { show: false },
                active: { show: false },
                focussed: { show: false },
                disabled: { show: false },
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

            // Required onChange handler
            onChange: () => {},
        },

        example: ({
            size,
            label,
            subtext,
            hintText,
            placeholder,
            required,
            error,
            disabled,
            onChange,
        }) => (
            <NumberInputV2
                size={size}
                label={{ text: label, subtext: subtext }}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                error={error}
                value={null}
                onChange={onChange}
            />
        ),

        imports: [
            "import { NumberInputV2, InputSizeV2 } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/NumberInputV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-numberinputv2--docs',
            },
        ],
    }
)

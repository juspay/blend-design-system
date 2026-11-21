import React from 'react'
import { figma } from '@figma/code-connect'
import { OTPInputV2 } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR OTPINPUTV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - mandatory (Figma) → required (Code) — not supported in V1, supported in V2
 *    - digits (Figma) → length (Code) — not supported in V1 (hardcoded to 6);
 *      V2 supports configurable digit counts (1–32, default 6)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - label → label
 *    - sublabel → sublabel (still lowercase in OTPInputV2, unlike TextInputV2's subLabel)
 *    - hintText → hintText
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → error + disabled (Code)
 *      - state=error → error=true
 *      - state=disabled → disabled=true
 *      - state=default/hover/active/focussed → handled automatically by CSS interactions
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/active/focussed are interaction states, not code props
 *    - showInfo: Help icon is shown automatically when helpIconHintText is provided
 *    - showLabel: Label is shown automatically when label prop is provided
 *    - showSublabel: Sublabel is shown automatically when sublabel prop is provided
 *    - showHint: Hint is shown automatically when hintText prop is provided
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Current OTP value as a string, managed by parent state
 *    - onChange: Callback receiving the joined OTP string
 *    - errorMessage: Error message text rendered when error is true
 *    - helpIconHintText: Tooltip text for the help icon
 *    - autoFocus: Auto focus on mount
 *    - form: Form ID for form association
 *    - name and other standard HTML input attributes (except placeholder)
 */

figma.connect(
    OTPInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29491-12419&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),

            // Renamed mapping: mandatory (Figma) → required (Code)
            required: figma.boolean('mandatory'),

            // Renamed mapping: digits (Figma) → length (Code)
            // Digit-count variants map to the configurable V2 length prop (default 6)
            length: figma.enum('digits', {
                '4': 4,
                '6': 6,
                '8': 8,
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
            label,
            sublabel,
            hintText,
            required,
            length,
            error,
            disabled,
            onChange,
        }) => (
            <OTPInputV2
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                required={required}
                length={length}
                error={error}
                disabled={disabled}
                value=""
                onChange={onChange}
            />
        ),

        imports: ["import { OTPInputV2 } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/OTPInputV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-otpinputv2--docs',
            },
        ],
    }
)

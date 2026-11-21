import React from 'react'
import { figma } from '@figma/code-connect'
import { TextAreaV2 } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TEXTAREAV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - mandatory (Figma) → required (Code)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - label → label
 *    - sublabel → sublabel (still lowercase in TextAreaV2, unlike TextInputV2's subLabel)
 *    - hintText → hintText
 *    - placeholder → placeholder
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → error + disabled (Code)
 *      - state=error → error={ show: true }
 *      - state=disabled → disabled=true
 *      - state=default/hover/active/focussed → handled automatically by CSS interactions
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/active/focussed are interaction states, not code props
 *    - showInfo: Not available in current implementation
 *    - showLabel: Label is shown automatically when label prop is provided
 *    - showSublabel: Sublabel is shown automatically when sublabel prop is provided
 *    - showHint: Hint is shown automatically when hintText prop is provided
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled textarea value, managed by parent state
 *    - onChange: Required callback for handling changes
 *    - size: InputSizeV2 (SM/MD/LG) — not exposed as a Figma variant
 *    - rows: Number of visible text lines
 *    - error.message: Error message text rendered when error.show is true
 *    - helpIconText: Tooltip text for the help icon
 *    - resize: Controls textarea resize behavior
 *    - autoFocus: Auto focus on mount
 *    - All standard HTML textarea attributes (except size, style, className, cols)
 */

figma.connect(
    TextAreaV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-516369&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            // Renamed mapping: mandatory (Figma) → required (Code)
            required: figma.boolean('mandatory'),

            // Special mapping: state=error → error={ show: true }
            error: figma.enum('state', {
                error: { show: true },
                default: { show: false },
                hover: { show: false },
                focused: { show: false },
                filled: { show: false },
                disabled: { show: false },
            }),

            // Special mapping: state=disabled → disabled=true
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                focused: false,
                filled: false,
                error: false,
            }),

            // Required onChange handler
            onChange: () => {},
        },

        example: ({
            label,
            sublabel,
            hintText,
            placeholder,
            required,
            error,
            disabled,
            onChange,
        }) => (
            <TextAreaV2
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                error={error}
                value=""
                onChange={onChange}
            />
        ),

        imports: ["import { TextAreaV2 } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/TextAreaV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-textareav2--docs',
            },
        ],
    }
)

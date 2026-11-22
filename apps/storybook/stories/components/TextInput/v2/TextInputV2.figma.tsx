import React from 'react'
import { figma } from '@figma/code-connect'
import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TEXTINPUTV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - sublabel (Figma) → subLabel (Code)
 *    - mandatory (Figma) → required (Code)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size (Figma md/lg → InputSizeV2.MD/LG; code also supports InputSizeV2.SM)
 *    - label → label
 *    - hintText → hintText
 *    - placeholder → placeholder (V1 wrongly mapped Figma placeholder to value; V2 fixes this)
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → error + disabled (Code)
 *      - state=error → error={ show: true }
 *      - state=disabled → disabled=true
 *      - state=default/hover/active/focussed → handled automatically by CSS interactions
 *    - showLeftSlot/leftSlot (Figma) → leftSlot (Code), wrapped into a { slot } object
 *    - showRightSlot/rightSlot (Figma) → rightSlot (Code), wrapped into a { slot } object
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/active/focussed are interaction states, not code props
 *    - showInfo: Help icon is shown automatically when helpIconText is provided
 *    - showLabel: Label is shown automatically when label prop is provided
 *    - showSubLabel: Sublabel is shown automatically when subLabel prop is provided
 *    - showHint: Hint is shown automatically when hintText prop is provided
 *    - showLeftSlot/showRightSlot: Slots are shown automatically when provided
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled input value, managed by parent state
 *    - onChange: Callback for handling input changes
 *    - error.message: Error message text rendered when error.show is true
 *    - helpIconText: Tooltip text for the help icon (renamed from helpIconHintText in V1)
 *    - passwordToggle: Built-in show/hide password toggle button
 *    - maxLength, name, id and other standard HTML input attributes
 */

figma.connect(
    TextInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-513588&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping: Figma md/lg → InputSizeV2.MD/LG (code also supports SM)
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),

            // Direct string mappings
            label: figma.string('label'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            // Renamed mapping: sublabel (Figma) → subLabel (Code)
            subLabel: figma.string('sublabel'),

            // Renamed mapping: mandatory (Figma) → required (Code)
            required: figma.boolean('mandatory'),

            // Slot mappings: Figma instances wrapped into V2 { slot } objects
            leftSlot: figma.boolean('showLeftSlot', {
                true: { slot: figma.instance('leftSlot') },
                false: undefined,
            }),

            rightSlot: figma.boolean('showRightSlot', {
                true: { slot: figma.instance('rightSlot') },
                false: undefined,
            }),

            // Special mapping: state=error → error={ show: true }
            // V2 error is { show: boolean, message?: string } | undefined
            error: figma.enum('state', {
                error: { show: true },
                default: undefined,
                hover: undefined,
                focused: undefined,
                filled: undefined,
                disabled: undefined,
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
            size,
            label,
            subLabel,
            hintText,
            placeholder,
            required,
            leftSlot,
            rightSlot,
            error,
            disabled,
            onChange,
        }) => (
            <TextInputV2
                size={size}
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                error={error}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                value=""
                onChange={onChange}
            />
        ),

        imports: [
            "import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/TextInputV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-textinputv2--docs',
            },
        ],
    }
)

figma.connect(
    TextInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=29491-9873',
    {
        props: {
            size: figma.enum('size', {
                sm: InputSizeV2.SM,
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),
            label: figma.string('label'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            subLabel: figma.string('sublabel'),
            required: figma.boolean('mandatory'),
            leftSlot: figma.boolean('showLeftSlot', {
                true: { slot: figma.instance('leftSlot') },
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: { slot: figma.instance('rightSlot') },
                false: undefined,
            }),
            error: figma.enum('state', {
                error: { show: true },
                default: undefined,
                hover: undefined,
                focused: undefined,
                filled: undefined,
                disabled: undefined,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                focused: false,
                filled: false,
                error: false,
            }),
            onChange: () => {},
        },
        example: ({
            size,
            label,
            subLabel,
            hintText,
            placeholder,
            required,
            leftSlot,
            rightSlot,
            error,
            disabled,
            onChange,
        }) => (
            <TextInputV2
                size={size}
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                error={error}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                value=""
                onChange={onChange}
            />
        ),
        imports: [
            "import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'",
        ],
    }
)

figma.connect(
    TextInputV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=29491-10044',
    {
        props: {
            size: figma.enum('size', {
                md: InputSizeV2.MD,
                lg: InputSizeV2.LG,
            }),
            label: figma.string('label'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            subLabel: figma.string('sublabel'),
            required: figma.boolean('mandatory'),
            leftSlot: figma.boolean('showLeftSlot', {
                true: { slot: figma.instance('leftSlot') },
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: { slot: figma.instance('rightSlot') },
                false: undefined,
            }),
            error: figma.enum('state', {
                error: { show: true },
                default: undefined,
                hover: undefined,
                focused: undefined,
                filled: undefined,
                disabled: undefined,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                focused: false,
                filled: false,
                error: false,
            }),
            onChange: () => {},
        },
        example: ({
            size,
            label,
            subLabel,
            hintText,
            placeholder,
            required,
            leftSlot,
            rightSlot,
            error,
            disabled,
            onChange,
        }) => (
            <TextInputV2
                size={size}
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                error={error}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                value=""
                onChange={onChange}
            />
        ),
        imports: [
            "import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'",
        ],
    }
)

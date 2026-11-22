import React from 'react'
import { figma } from '@figma/code-connect'
import {
    UnitInput,
    UnitInputSize,
    UnitPosition,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR UNITINPUT COMPONENT (V1)
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - mandatory (Figma) → required (Code)
 *    - unitText (Figma) → unit (Code)
 *    - unitPosition (Figma) → unitPosition (Code, enum typed)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - size → size (Figma sm/md/lg → UnitInputSize.SMALL/MEDIUM/LARGE)
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
 *    - showLeftSlot/leftSlot (Figma) → leftSlot (Code, direct ReactNode)
 *    - showRightSlot/rightSlot (Figma) → rightSlot (Code, direct ReactNode)
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: hover/focus are interaction states, not code props
 *    - showInfo: Help icon is shown automatically when helpIconHintText is provided
 *    - showLabel: Label is shown automatically when label prop is provided
 *    - showSubLabel: Sublabel is shown automatically when sublabel prop is provided
 *    - showHint: Hint is shown automatically when hintText prop is provided
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled numeric value (number | undefined), managed by parent state
 *    - onChange: Required callback for handling input changes
 *    - step: Numeric stepping increment
 *    - helpIconHintText: Tooltip text for the help icon
 *    - onFocus/onBlur: Focus/blur callbacks
 */

figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=29491-11103',
    {
        props: {
            // Size mapping: Figma sm/md/lg → UnitInputSize.SMALL/MEDIUM/LARGE
            size: figma.enum('size', {
                sm: UnitInputSize.SMALL,
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),

            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            // Renamed mapping: mandatory (Figma) → required (Code)
            required: figma.boolean('mandatory'),

            // Renamed mapping: unitText (Figma) → unit (Code)
            unit: figma.string('unitText'),

            // Direct mapping: unitPosition (Figma) → UnitPosition (Code)
            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),

            // Slot mappings: Figma instances → direct ReactNode props
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),

            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
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
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
            disabled,
        }) => (
            <UnitInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                disabled={disabled}
                value={0}
                onChange={() => {}}
            />
        ),

        imports: [
            "import { UnitInput, UnitInputSize, UnitPosition } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/UnitInput',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-unitinput--docs',
            },
        ],
    }
)

figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=29491-11492',
    {
        props: {
            // Size mapping: mobile has only md/lg (no sm)
            size: figma.enum('size', {
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),

            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            required: figma.boolean('mandatory'),

            unit: figma.string('unitText'),

            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),

            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),

            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
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
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
            disabled,
        }) => (
            <UnitInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                required={required}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                disabled={disabled}
                value={0}
                onChange={() => {}}
            />
        ),

        imports: [
            "import { UnitInput, UnitInputSize, UnitPosition } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/UnitInput',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-unitinput--docs',
            },
        ],
    }
)

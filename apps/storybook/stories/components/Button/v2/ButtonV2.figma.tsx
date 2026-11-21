import React from 'react'
import { figma } from '@figma/code-connect'
import {
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR BUTTONV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS (V1 → V2):
 *    - hasLeftIcon/leftIcon (Figma) → leftSlot (Code)
 *      V1 Button exposed leadingIcon/trailingIcon props; V2 ButtonV2 wraps
 *      the icon in a ButtonSlot object: { slot: ReactNode, maxHeight? }
 *    - hasRightIcon/rightIcon (Figma) → rightSlot (Code)
 *      Same shape change as leftSlot.
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - text → text
 *    - buttonType → buttonType
 *    - size → size
 *    - subType → subType
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → disabled (Code)
 *      - state=disabled → disabled=true
 *      - state=default/hover/active/focussed → disabled=false (default)
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - plainIcon: Exists in Figma subType but has no code equivalent
 *    - hover/active/focussed states: Visual only in Figma, hover/focus are
 *      handled by the component itself
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - loading: Boolean prop for loading state
 *    - skeleton: Skeleton configuration (showSkeleton, skeletonVariant)
 *    - buttonGroupPosition: For button group styling
 *    - justifyContent: For content alignment
 *    - width/minWidth/maxWidth: Dimension controls
 *    - state: Programmatic state override (ButtonV2State)
 *    - onClick: Functional prop
 */

figma.connect(
    ButtonV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-271911&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // Direct text mapping
            text: figma.string('text'),

            // Button type mapping - direct correlation
            buttonType: figma.enum('buttonType', {
                primary: ButtonV2Type.PRIMARY,
                secondary: ButtonV2Type.SECONDARY,
                danger: ButtonV2Type.DANGER,
                success: ButtonV2Type.SUCCESS,
            }),

            // Size mapping - Figma uses lowercase, code uses uppercase enum
            size: figma.enum('size', {
                sm: ButtonV2Size.SMALL,
                md: ButtonV2Size.MEDIUM,
                lg: ButtonV2Size.LARGE,
            }),

            // SubType mapping - NOTE: 'plainIcon' maps to DEFAULT as there is no direct code equivalent
            subType: figma.enum('subType', {
                default: ButtonV2SubType.DEFAULT,
                iconOnly: ButtonV2SubType.ICON_ONLY,
                plainIcon: ButtonV2SubType.DEFAULT,
                link: ButtonV2SubType.INLINE,
            }),

            // State to disabled mapping - Figma uses variant, code uses boolean
            disabled: figma.enum('state', {
                disabled: true, // Only disabled state maps to true
                default: false, // All other states map to false
                hover: false, // Hover is visual only in Figma
                active: false, // Active is visual only in Figma
                focussed: false, // Focus is visual only in Figma
            }),

            // Icon mappings - Figma uses boolean + instance, code needs a ButtonSlot object
            leftSlot: figma.boolean('hasLeftIcon', {
                true: { slot: figma.instance('leftIcon') }, // When true, wrap the icon instance in a slot object
                false: undefined, // When false, no icon
            }),

            rightSlot: figma.boolean('hasRightIcon', {
                true: { slot: figma.instance('rightIcon') }, // When true, wrap the icon instance in a slot object
                false: undefined, // When false, no icon
            }),

            // Note: loading is not in Figma yet
            // Note: skeleton is not in Figma yet
            // Note: buttonGroupPosition is not needed in Figma (layout concern)
            // Note: justifyContent is not needed in Figma (layout concern)
        },

        example: ({
            text,
            buttonType,
            size,
            subType,
            disabled,
            leftSlot,
            rightSlot,
        }) => (
            <ButtonV2
                text={text}
                buttonType={buttonType}
                size={size}
                subType={subType}
                disabled={disabled}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
            />
        ),

        imports: [
            "import { ButtonV2, ButtonV2Type, ButtonV2Size, ButtonV2SubType } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/ButtonV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-button-buttonv2--docs',
            },
        ],
    }
)

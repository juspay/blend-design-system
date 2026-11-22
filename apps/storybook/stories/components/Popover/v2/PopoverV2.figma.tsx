import React from 'react'
import { figma } from '@figma/code-connect'
import {
    PopoverV2,
    PopoverV2Size,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR POPOVERV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - size (Figma) → size (Code), enum changed: PopoverSize → PopoverV2Size
 *      - sm → PopoverV2Size.SM
 *      - md → PopoverV2Size.MD
 *      NOTE: V2 adds PopoverV2Size.LG, which has no Figma variant to map from.
 *    - close (Figma) → showCloseButton (Code)
 *
 * 2. DIRECT MAPPINGS:
 *    - heading (Figma TEXT) → heading (Code)
 *    - description (Figma TEXT) → description (Code)
 *
 * 3. SPECIAL MAPPINGS:
 *    - actions (Figma boolean): Gates whether action buttons render at all;
 *      when false, neither primaryAction nor secondaryAction is passed.
 *      primaryAction/secondaryAction have no Figma counterpart — they are
 *      passed directly in code when needed.
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - actions: Visibility toggle for the footer; in code this is implied by
 *      whether primaryAction/secondaryAction are passed.
 *    - hasHeading: Implied by whether heading text is passed in code.
 *    - slot: Figma design-only composition helper.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - trigger: The element that opens the popover (required).
 *    - children: Popover body content (required).
 *    - primaryAction/secondaryAction: Footer action buttons.
 *    - side: Placement (PopoverV2Side.TOP/RIGHT/BOTTOM/LEFT).
 *    - align: Alignment (PopoverV2Align.START/CENTER/END).
 *    - open, onOpenChange: Controlled open state.
 *    - sideOffset, alignOffset: Positioning offsets.
 *    - asModal, avoidCollisions, useDrawerOnMobile, shadow, skeleton,
 *      width/maxWidth/minWidth/height/minHeight/maxHeight.
 *
 * Note: The popover requires a trigger element and content in code.
 * These are provided as example implementations.
 */

// Base connection
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping (enum changed from PopoverSize to PopoverV2Size)
            size: figma.enum('size', {
                sm: PopoverV2Size.SM,
                md: PopoverV2Size.MD,
            }),

            // Renamed mapping: close (Figma) → showCloseButton (Code)
            showCloseButton: figma.boolean('close'),

            // Direct string mappings (heading and description are Figma TEXT properties)
            heading: figma.string('heading'),
            description: figma.string('description'),
        },

        example: ({ size, showCloseButton, heading, description }) => (
            <PopoverV2
                trigger={<Button text="Open Popover" />}
                size={size}
                showCloseButton={showCloseButton}
                heading={heading}
                description={description}
            >
                <div>
                    <p>Your popover content</p>
                </div>
            </PopoverV2>
        ),

        imports: [
            "import { PopoverV2, PopoverV2Size, Button, ButtonType } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/PopoverV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-popoverv2--docs',
            },
        ],
    }
)

// Variant with no actions
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { actions: false },
        props: {
            size: figma.enum('size', {
                sm: PopoverV2Size.SM,
                md: PopoverV2Size.MD,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <PopoverV2
                trigger={
                    <Button text="Info" buttonType={ButtonType.SECONDARY} />
                }
                size={size}
                showCloseButton={showCloseButton}
                heading="Information"
                description="This popover has no action buttons."
            >
                <div>
                    <p>Content without actions</p>
                </div>
            </PopoverV2>
        ),
    }
)

// Small size variant with close button and no actions
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'sm', close: true, actions: false },
        example: () => (
            <PopoverV2
                trigger={<Button text="Help" />}
                size={PopoverV2Size.SM}
                showCloseButton={true}
                heading="Quick Tip"
            >
                <div>
                    <p>This is a helpful tip in a small popover.</p>
                </div>
            </PopoverV2>
        ),
    }
)

// New Popovers page (Blend Design System) connection — frame 23346:4511
// Properties: size (sm/md), close, actions, primary, secondary, slot
// No TEXT props for heading/description (hardcoded in design, inlined in example)
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=23346-4511',
    {
        props: {
            // Size mapping: Figma sm/md → PopoverV2Size.SM/MD (LG is code-only)
            size: figma.enum('size', {
                sm: PopoverV2Size.SM,
                md: PopoverV2Size.MD,
            }),

            // Renamed mapping: close (Figma) → showCloseButton (Code)
            showCloseButton: figma.boolean('close'),

            // Action buttons gated by primary/secondary booleans in Figma
            primaryAction: figma.boolean('primary', {
                true: { text: 'Accept', buttonType: ButtonType.PRIMARY },
                false: undefined,
            }),

            secondaryAction: figma.boolean('secondary', {
                true: { text: 'Reject', buttonType: ButtonType.SECONDARY },
                false: undefined,
            }),
        },

        example: ({
            size,
            showCloseButton,
            primaryAction,
            secondaryAction,
        }) => (
            <PopoverV2
                trigger={<Button text="Open Popover" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Heading"
                description="This is a popover. It displays additional content or actions when triggered by the user."
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
            >
                <div>
                    <p>Your popover content</p>
                </div>
            </PopoverV2>
        ),

        imports: [
            "import { PopoverV2, PopoverV2Size, Button, ButtonType } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/PopoverV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-popoverv2--docs',
            },
        ],
    }
)

/**
 * Example of PopoverV2 with additional features not in Figma:
 *
 * <PopoverV2
 *   trigger={<Button text="Advanced" />}
 *   size={PopoverV2Size.MD}
 *   side={PopoverV2Side.BOTTOM}
 *   align={PopoverV2Align.START}
 *   asModal={true}
 *   onOpenChange={(open) => console.log('Popover is', open ? 'open' : 'closed')}
 *   width={400}
 * >
 *   <div>Custom content</div>
 * </PopoverV2>
 */

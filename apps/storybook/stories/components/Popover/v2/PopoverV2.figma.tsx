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
 *    - primary (Figma) → primaryAction (Code) — boolean gates an action object
 *    - secondary (Figma) → secondaryAction (Code) — boolean gates an action object
 *
 * 2. DIRECT MAPPINGS:
 *    (none — all Figma props require transformation)
 *
 * 3. SPECIAL MAPPINGS:
 *    - primary (Figma boolean) → primaryAction (Code object): When true, a
 *      ButtonV2-style action object is provided. PopoverV2 actions use V1
 *      Button props (PopoverV2ActionType), so the label field is `text` and the
 *      variant is `buttonType: ButtonType`.
 *    - secondary (Figma boolean) → secondaryAction (Code object): same pattern.
 *    - actions (Figma boolean): Gates whether action buttons render at all;
 *      when false, neither primaryAction nor secondaryAction is passed.
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - actions: Visibility toggle for the footer; in code this is implied by
 *      whether primaryAction/secondaryAction are passed.
 *    - slot: Figma design-only composition helper.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - trigger: The element that opens the popover (required).
 *    - children: Popover body content (required).
 *    - heading: Optional header title text.
 *    - description: Optional header description text.
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

            // Action visibility (Figma-only gate)
            actions: figma.boolean('actions'),

            // Primary action gate
            primary: figma.boolean('primary'),

            // Secondary action gate
            secondary: figma.boolean('secondary'),
        },

        example: ({ size, showCloseButton, actions, primary, secondary }) => {
            // Build action props based on Figma settings
            const actionProps: {
                primaryAction?: { text: string; onClick: () => void }
                secondaryAction?: {
                    text: string
                    onClick: () => void
                    buttonType: ButtonType
                }
            } = {}

            if (actions) {
                if (primary) {
                    actionProps.primaryAction = {
                        text: 'Confirm',
                        onClick: () => {},
                    }
                }
                if (secondary) {
                    actionProps.secondaryAction = {
                        text: 'Cancel',
                        onClick: () => {},
                        buttonType: ButtonType.SECONDARY,
                    }
                }
            }

            return (
                <PopoverV2
                    trigger={<Button text="Open Popover" />}
                    size={size}
                    showCloseButton={showCloseButton}
                    heading="Popover Title"
                    description="This is a popover description that provides more context."
                    {...actionProps}
                >
                    <div>
                        <p>Your popover content</p>
                    </div>
                </PopoverV2>
            )
        },

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

// Variant with actions enabled but no buttons selected
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { actions: true, primary: false, secondary: false },
        props: {
            size: figma.enum('size', {
                sm: PopoverV2Size.SM,
                md: PopoverV2Size.MD,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <PopoverV2
                trigger={<Button text="Open Popover" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Popover Title"
                description="This is a popover description that provides more context."
            >
                <div>
                    <p>Your popover content</p>
                </div>
            </PopoverV2>
        ),
    }
)

// Variant with primary action only
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { actions: true, primary: true, secondary: false },
        props: {
            size: figma.enum('size', {
                sm: PopoverV2Size.SM,
                md: PopoverV2Size.MD,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <PopoverV2
                trigger={<Button text="Show Options" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Confirm Action"
                description="Are you sure you want to proceed?"
                primaryAction={{
                    text: 'Confirm',
                    onClick: () => {},
                }}
            >
                <div>
                    <p>Additional details about the action</p>
                </div>
            </PopoverV2>
        ),
    }
)

// Variant with secondary action only
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { actions: true, primary: false, secondary: true },
        props: {
            size: figma.enum('size', {
                sm: PopoverV2Size.SM,
                md: PopoverV2Size.MD,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <PopoverV2
                trigger={<Button text="View Details" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Additional Information"
                description="Here are some details you might find useful."
                secondaryAction={{
                    text: 'Dismiss',
                    onClick: () => {},
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <div>
                    <p>Detailed information content</p>
                </div>
            </PopoverV2>
        ),
    }
)

// Variant with both actions
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { actions: true, primary: true, secondary: true },
        props: {
            size: figma.enum('size', {
                sm: PopoverV2Size.SM,
                md: PopoverV2Size.MD,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <PopoverV2
                trigger={<Button text="Edit Settings" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Edit Preferences"
                description="Make changes to your settings below."
                primaryAction={{
                    text: 'Save Changes',
                    onClick: () => {},
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => {},
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <div>
                    <label>
                        <input type="checkbox" /> Enable notifications
                    </label>
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

// Small size variant with close button and actions
figma.connect(
    PopoverV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-671615&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'sm', close: true, actions: true },
        props: {
            primary: figma.boolean('primary'),
            secondary: figma.boolean('secondary'),
        },
        example: ({ primary = false, secondary = false }) => {
            const actionProps: {
                primaryAction?: { text: string; onClick: () => void }
                secondaryAction?: {
                    text: string
                    onClick: () => void
                    buttonType: ButtonType
                }
            } = {}

            if (primary) {
                actionProps.primaryAction = {
                    text: 'OK',
                    onClick: () => {},
                }
            }
            if (secondary) {
                actionProps.secondaryAction = {
                    text: 'Cancel',
                    onClick: () => {},
                    buttonType: ButtonType.SECONDARY,
                }
            }

            return (
                <PopoverV2
                    trigger={<Button text="Help" />}
                    size={PopoverV2Size.SM}
                    showCloseButton={true}
                    heading="Quick Tip"
                    {...actionProps}
                >
                    <div>
                        <p>This is a helpful tip in a small popover.</p>
                    </div>
                </PopoverV2>
            )
        },
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

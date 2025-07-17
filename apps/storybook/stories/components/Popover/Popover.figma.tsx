import React from 'react'
import { figma } from '@figma/code-connect'
import {
    Popover,
    PopoverSize,
    ButtonV2,
    ButtonTypeV2,
    ButtonSizeV2,
} from 'blend-v1'

/**
 * FIGMA CODE CONNECT FOR POPOVER COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - size → size
 *
 * 2. SPECIAL MAPPINGS:
 *    - close (Figma) → showCloseButton (Code)
 *    - primary (Figma) → primaryAction (Code)
 *    - secondary (Figma) → secondaryAction (Code)
 *    - actions (Figma) → When false, don't pass primaryAction/secondaryAction
 *    - slot (Figma) → Not used in code (Figma-only for design)
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - trigger: The element that triggers the popover
 *    - children: The popover content
 *    - heading: Optional heading text
 *    - description: Optional description text
 *    - onOpenChange, open, asModal, side, align, etc.
 *
 * Note: The popover requires a trigger element and content in code.
 * These are provided as example implementations.
 */

figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        props: {
            // Size mapping
            size: figma.enum('size', {
                sm: PopoverSize.SMALL,
                md: PopoverSize.MEDIUM,
            }),

            // Close button mapping
            showCloseButton: figma.boolean('close'),

            // Action visibility
            actions: figma.boolean('actions'),

            // Primary action mapping
            primary: figma.boolean('primary'),

            // Secondary action mapping
            secondary: figma.boolean('secondary'),
        },

        example: ({ size, showCloseButton, actions, primary, secondary }) => {
            // Build action props based on Figma settings
            const actionProps: any = {}

            if (actions) {
                if (primary) {
                    actionProps.primaryAction = {
                        children: 'Primary Action',
                        onClick: () => console.log('Primary clicked'),
                    }
                }
                if (secondary) {
                    actionProps.secondaryAction = {
                        children: 'Secondary Action',
                        onClick: () => console.log('Secondary clicked'),
                    }
                }
            }

            return (
                <Popover
                    trigger={<ButtonV2 text="Open Popover" />}
                    size={size}
                    showCloseButton={showCloseButton}
                    heading="Popover Title"
                    description="This is a popover description that provides more context."
                    {...actionProps}
                >
                    <div>
                        {/* Popover content goes here */}
                        <p>Your popover content</p>
                    </div>
                </Popover>
            )
        },

        imports: ["import { Popover, ButtonV2 } from 'blend-v1'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Popover',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-popover--docs',
            },
        ],
    }
)

// Variant with no actions
figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        variant: { actions: false },
        props: {
            size: figma.enum('size', {
                sm: PopoverSize.SMALL,
                md: PopoverSize.MEDIUM,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <Popover
                trigger={
                    <ButtonV2 text="Info" buttonType={ButtonTypeV2.SECONDARY} />
                }
                size={size}
                showCloseButton={showCloseButton}
                heading="Information"
                description="This popover has no action buttons."
            >
                <div>
                    <p>Content without actions</p>
                </div>
            </Popover>
        ),
    }
)

// Variant with actions enabled but no buttons selected
figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        variant: { actions: true, primary: false, secondary: false },
        props: {
            size: figma.enum('size', {
                sm: PopoverSize.SMALL,
                md: PopoverSize.MEDIUM,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <Popover
                trigger={<ButtonV2 text="Open Popover" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Popover Title"
                description="This is a popover description that provides more context."
            >
                <div>
                    <p>Your popover content</p>
                </div>
            </Popover>
        ),
    }
)

// Variant with primary action only
figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        variant: { actions: true, primary: true, secondary: false },
        props: {
            size: figma.enum('size', {
                sm: PopoverSize.SMALL,
                md: PopoverSize.MEDIUM,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <Popover
                trigger={<ButtonV2 text="Show Options" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Confirm Action"
                description="Are you sure you want to proceed?"
                primaryAction={{
                    children: 'Confirm',
                    onClick: () => console.log('Confirmed'),
                }}
            >
                <div>
                    <p>Additional details about the action</p>
                </div>
            </Popover>
        ),
    }
)

// Variant with secondary action only
figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        variant: { actions: true, primary: false, secondary: true },
        props: {
            size: figma.enum('size', {
                sm: PopoverSize.SMALL,
                md: PopoverSize.MEDIUM,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <Popover
                trigger={<ButtonV2 text="View Details" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Additional Information"
                description="Here are some details you might find useful."
                secondaryAction={{
                    children: 'Dismiss',
                    buttonType: ButtonTypeV2.SECONDARY,
                    onClick: () => console.log('Dismissed'),
                }}
            >
                <div>
                    <p>Detailed information content</p>
                </div>
            </Popover>
        ),
    }
)

// Variant with both actions
figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        variant: { actions: true, primary: true, secondary: true },
        props: {
            size: figma.enum('size', {
                sm: PopoverSize.SMALL,
                md: PopoverSize.MEDIUM,
            }),
            showCloseButton: figma.boolean('close'),
        },
        example: ({ size, showCloseButton }) => (
            <Popover
                trigger={<ButtonV2 text="Edit Settings" />}
                size={size}
                showCloseButton={showCloseButton}
                heading="Edit Preferences"
                description="Make changes to your settings below."
                primaryAction={{
                    children: 'Save Changes',
                    onClick: () => console.log('Saved'),
                }}
                secondaryAction={{
                    children: 'Cancel',
                    buttonType: ButtonTypeV2.SECONDARY,
                    onClick: () => console.log('Cancelled'),
                }}
            >
                <div>
                    {/* Form or settings content */}
                    <label>
                        <input type="checkbox" /> Enable notifications
                    </label>
                </div>
            </Popover>
        ),
    }
)

// Small size variant with close button and no actions
figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        variant: { size: 'sm', close: true, actions: false },
        example: () => (
            <Popover
                trigger={<ButtonV2 text="Help" size={ButtonSizeV2.SMALL} />}
                size={PopoverSize.SMALL}
                showCloseButton={true}
                heading="Quick Tip"
            >
                <div>
                    <p>This is a helpful tip in a small popover.</p>
                </div>
            </Popover>
        ),
    }
)

// Small size variant with close button and actions
figma.connect(
    Popover,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3971-365&t=syQLBedyuJq8TAlu-11',
    {
        variant: { size: 'sm', close: true, actions: true },
        props: {
            primary: figma.boolean('primary'),
            secondary: figma.boolean('secondary'),
        },
        example: ({ primary = false, secondary = false }) => {
            const actionProps: any = {}

            if (primary) {
                actionProps.primaryAction = {
                    children: 'OK',
                    size: ButtonSizeV2.SMALL,
                }
            }
            if (secondary) {
                actionProps.secondaryAction = {
                    children: 'Cancel',
                    size: ButtonSizeV2.SMALL,
                    buttonType: ButtonTypeV2.SECONDARY,
                }
            }

            return (
                <Popover
                    trigger={<ButtonV2 text="Help" size={ButtonSizeV2.SMALL} />}
                    size={PopoverSize.SMALL}
                    showCloseButton={true}
                    heading="Quick Tip"
                    {...actionProps}
                >
                    <div>
                        <p>This is a helpful tip in a small popover.</p>
                    </div>
                </Popover>
            )
        },
    }
)

/**
 * Example of Popover with additional features not in Figma:
 *
 * <Popover
 *   trigger={<ButtonV2 text="Advanced" />}
 *   size={PopoverSize.MEDIUM}
 *   side="bottom"
 *   align="start"
 *   asModal={true}
 *   onOpenChange={(open) => console.log('Popover is', open ? 'open' : 'closed')}
 *   width={400}
 * >
 *   <div>Custom content</div>
 * </Popover>
 */

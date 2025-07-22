import React from 'react'
import { figma } from '@figma/code-connect'
import {
    Tooltip,
    TooltipSize,
    TooltipSide,
    TooltipAlign,
    TooltipSlotDirection,
    Button,
    ButtonSize,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TOOLTIP COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - size → size
 *    - slotDirection → slotDirection
 *    - slot → slot
 *
 * 2. SPECIAL MAPPINGS:
 *    - arrow (Figma) → Maps to both side and align props in code
 *      The arrow prop determines tooltip positioning
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - children: The trigger element for the tooltip
 *    - content: The tooltip content
 *    - open: Controlled open state
 *    - showArrow: Whether to show the arrow (derived from arrow prop)
 *    - delayDuration: Delay before showing tooltip
 *    - offset: Distance from trigger element
 *
 * Note: The tooltip requires a trigger element (children) and content in code.
 */

// Helper function to map arrow values to side and align
const getTooltipPosition = (arrow: string) => {
    // Map Figma arrow values to side and align
    switch (arrow) {
        case 'topLeft':
            return {
                side: TooltipSide.TOP,
                align: TooltipAlign.START,
                showArrow: true,
            }
        case 'topCenter':
            return {
                side: TooltipSide.TOP,
                align: TooltipAlign.CENTER,
                showArrow: true,
            }
        case 'topRight':
            return {
                side: TooltipSide.TOP,
                align: TooltipAlign.END,
                showArrow: true,
            }
        case 'right':
            return {
                side: TooltipSide.RIGHT,
                align: TooltipAlign.CENTER,
                showArrow: true,
            }
        case 'bottomLeft':
            return {
                side: TooltipSide.BOTTOM,
                align: TooltipAlign.START,
                showArrow: true,
            }
        case 'bottomCenter':
            return {
                side: TooltipSide.BOTTOM,
                align: TooltipAlign.CENTER,
                showArrow: true,
            }
        case 'bottomRight':
            return {
                side: TooltipSide.BOTTOM,
                align: TooltipAlign.END,
                showArrow: true,
            }
        case 'left':
            return {
                side: TooltipSide.LEFT,
                align: TooltipAlign.CENTER,
                showArrow: true,
            }
        case 'none':
            return {
                side: TooltipSide.TOP,
                align: TooltipAlign.CENTER,
                showArrow: false,
            }
        default:
            return {
                side: TooltipSide.TOP,
                align: TooltipAlign.CENTER,
                showArrow: true,
            }
    }
}

figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        props: {
            // Size mapping
            size: figma.enum('size', {
                sm: TooltipSize.SMALL,
                md: TooltipSize.LARGE,
            }),

            // Arrow mapping - maps to side, align, and showArrow
            arrow: figma.string('arrow'),

            // Slot direction mapping
            slotDirection: figma.enum('slotDirection', {
                left: TooltipSlotDirection.LEFT,
                right: TooltipSlotDirection.RIGHT,
            }),

            // Slot content
            slot: figma.instance('slot'),
        },

        example: ({ size, arrow, slotDirection, slot }) => {
            const position = getTooltipPosition(arrow || 'top')

            return (
                <Tooltip
                    content="This is a helpful tooltip"
                    size={size}
                    side={position.side}
                    align={position.align}
                    showArrow={position.showArrow}
                    slotDirection={slotDirection}
                    slot={slot}
                >
                    <Button text="Hover me" />
                </Tooltip>
            )
        },

        imports: [
            "import { Tooltip, Button } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Tooltip',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-tooltip--docs',
            },
        ],
    }
)

// Small size variant
figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        variant: { size: 'sm' },
        props: {
            arrow: figma.string('arrow'),
            slotDirection: figma.enum('slotDirection', {
                left: TooltipSlotDirection.LEFT,
                right: TooltipSlotDirection.RIGHT,
            }),
            slot: figma.instance('slot'),
        },
        example: ({ arrow, slotDirection, slot }) => {
            const position = getTooltipPosition(arrow || 'top')

            return (
                <Tooltip
                    content="Small tooltip"
                    size={TooltipSize.SMALL}
                    side={position.side}
                    align={position.align}
                    showArrow={position.showArrow}
                    slotDirection={slotDirection}
                    slot={slot}
                >
                    <Button text="Small trigger" size={ButtonSize.SMALL} />
                </Tooltip>
            )
        },
    }
)

// Medium size variant
figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        variant: { size: 'md' },
        props: {
            arrow: figma.string('arrow'),
            slotDirection: figma.enum('slotDirection', {
                left: TooltipSlotDirection.LEFT,
                right: TooltipSlotDirection.RIGHT,
            }),
            slot: figma.instance('slot'),
        },
        example: ({ arrow, slotDirection, slot }) => {
            const position = getTooltipPosition(arrow || 'top')

            return (
                <Tooltip
                    content="This is a large tooltip with more detailed information"
                    size={TooltipSize.LARGE}
                    side={position.side}
                    align={position.align}
                    showArrow={position.showArrow}
                    slotDirection={slotDirection}
                    slot={slot}
                >
                    <Button text="Large trigger" size={ButtonSize.LARGE} />
                </Tooltip>
            )
        },
    }
)

// Variant with slot on the left
figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        variant: { slotDirection: 'left' },
        props: {
            size: figma.enum('size', {
                sm: TooltipSize.SMALL,
                md: TooltipSize.LARGE,
            }),
            arrow: figma.string('arrow'),
            slot: figma.instance('slot'),
        },
        example: ({ size, arrow, slot }) => {
            const position = getTooltipPosition(arrow || 'top')

            return (
                <Tooltip
                    content="Tooltip with left slot"
                    size={size}
                    side={position.side}
                    align={position.align}
                    showArrow={position.showArrow}
                    slotDirection={TooltipSlotDirection.LEFT}
                    slot={slot}
                >
                    <Button text="Hover for info" />
                </Tooltip>
            )
        },
    }
)

// Variant with slot on the right
figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        variant: { slotDirection: 'right' },
        props: {
            size: figma.enum('size', {
                sm: TooltipSize.SMALL,
                md: TooltipSize.LARGE,
            }),
            arrow: figma.string('arrow'),
            slot: figma.instance('slot'),
        },
        example: ({ size, arrow, slot }) => {
            const position = getTooltipPosition(arrow || 'top')

            return (
                <Tooltip
                    content="Tooltip with right slot"
                    size={size}
                    side={position.side}
                    align={position.align}
                    showArrow={position.showArrow}
                    slotDirection={TooltipSlotDirection.RIGHT}
                    slot={slot}
                >
                    <Button text="Hover for info" />
                </Tooltip>
            )
        },
    }
)

// Top position variants
figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        variant: { arrow: 'topCenter' },
        props: {
            size: figma.enum('size', {
                sm: TooltipSize.SMALL,
                md: TooltipSize.LARGE,
            }),
            slotDirection: figma.enum('slotDirection', {
                left: TooltipSlotDirection.LEFT,
                right: TooltipSlotDirection.RIGHT,
            }),
            slot: figma.instance('slot'),
        },
        example: ({ size, slotDirection, slot }) => (
            <Tooltip
                content="Top positioned tooltip"
                size={size}
                side={TooltipSide.TOP}
                align={TooltipAlign.CENTER}
                showArrow={true}
                slotDirection={slotDirection}
                slot={slot}
            >
                <Button text="Top tooltip" />
            </Tooltip>
        ),
    }
)

// Bottom position variants
figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        variant: { arrow: 'bottomCenter' },
        props: {
            size: figma.enum('size', {
                sm: TooltipSize.SMALL,
                md: TooltipSize.LARGE,
            }),
            slotDirection: figma.enum('slotDirection', {
                left: TooltipSlotDirection.LEFT,
                right: TooltipSlotDirection.RIGHT,
            }),
            slot: figma.instance('slot'),
        },
        example: ({ size, slotDirection, slot }) => (
            <Tooltip
                content="Bottom positioned tooltip"
                size={size}
                side={TooltipSide.BOTTOM}
                align={TooltipAlign.CENTER}
                showArrow={true}
                slotDirection={slotDirection}
                slot={slot}
            >
                <Button text="Bottom tooltip" />
            </Tooltip>
        ),
    }
)

// No arrow variant
figma.connect(
    Tooltip,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3650-871&t=syQLBedyuJq8TAlu-11',
    {
        variant: { arrow: 'none' },
        props: {
            size: figma.enum('size', {
                sm: TooltipSize.SMALL,
                md: TooltipSize.LARGE,
            }),
            slotDirection: figma.enum('slotDirection', {
                left: TooltipSlotDirection.LEFT,
                right: TooltipSlotDirection.RIGHT,
            }),
            slot: figma.instance('slot'),
        },
        example: ({ size, slotDirection, slot }) => (
            <Tooltip
                content="Tooltip without arrow"
                size={size}
                side={TooltipSide.TOP}
                align={TooltipAlign.CENTER}
                showArrow={false}
                slotDirection={slotDirection}
                slot={slot}
            >
                <Button text="No arrow" />
            </Tooltip>
        ),
    }
)

/**
 * Example of Tooltip with additional features not in Figma:
 *
 * <Tooltip
 *   content="Delayed tooltip"
 *   delayDuration={1000} // 1 second delay
 *   offset={10} // 10px offset from trigger
 *   open={isOpen} // Controlled state
 * >
 *   <Button text="Advanced tooltip" />
 * </Tooltip>
 */

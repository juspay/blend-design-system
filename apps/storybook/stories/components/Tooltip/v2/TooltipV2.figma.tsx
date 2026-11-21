import React from 'react'
import { figma } from '@figma/code-connect'
import {
    TooltipV2,
    TooltipV2Size,
    TooltipV2Side,
    TooltipV2Align,
    TooltipV2SlotDirection,
    ButtonV2,
    ButtonV2Size,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TOOLTIPV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. DIRECT MAPPINGS:
 *    - size → size (TooltipV2Size enum: SM/MD/LG)
 *    - slotDirection → slotDirection (TooltipV2SlotDirection: LEFT/RIGHT)
 *    - slot → slot (V2 `slot` is a plain ReactNode, mapped directly from the
 *      Figma instance — unlike the SelectorV2 components which wrap it in an
 *      object)
 *
 * 2. SPECIAL MAPPINGS:
 *    - arrow (Figma string) → decomposed into three V2 props via a helper:
 *        - side (TooltipV2Side: TOP/RIGHT/LEFT/BOTTOM)
 *        - align (TooltipV2Align: START/CENTER/END)
 *        - showArrow (boolean)
 *      The Figma `arrow` variant encodes both position and whether an arrow is
 *      shown (e.g. 'topLeft', 'bottomCenter', 'none'). `getTooltipPosition`
 *      maps each value to the corresponding side/align/showArrow triple.
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - None beyond the above; all Figma properties have a code counterpart.
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - children: The trigger element for the tooltip (provided in example)
 *    - content: The tooltip text content (provided in example)
 *    - open: Controlled open state
 *    - delayDuration: Delay before showing tooltip (default 300ms)
 *    - offset: Distance from trigger element (default 5)
 *    - fullWidth: Whether tooltip fills available width
 *    - disableInteractive: Disables hoverable content
 *    - maxWidth: Maximum width constraint
 *
 * Note: V1 mapped Figma `md` → TooltipSize.LARGE (the V1 enum had no MEDIUM).
 * V2 introduces TooltipV2Size.MD, so Figma `md` now maps to TooltipV2Size.MD.
 */

// Helper function to map Figma arrow values to V2 side, align, and showArrow.
// Ported from the V1 Tooltip.figma.tsx, updated to use V2 enums.
const getTooltipPosition = (arrow: string) => {
    switch (arrow) {
        case 'topLeft':
            return {
                side: TooltipV2Side.TOP,
                align: TooltipV2Align.START,
                showArrow: true,
            }
        case 'topCenter':
            return {
                side: TooltipV2Side.TOP,
                align: TooltipV2Align.CENTER,
                showArrow: true,
            }
        case 'topRight':
            return {
                side: TooltipV2Side.TOP,
                align: TooltipV2Align.END,
                showArrow: true,
            }
        case 'right':
            return {
                side: TooltipV2Side.RIGHT,
                align: TooltipV2Align.CENTER,
                showArrow: true,
            }
        case 'bottomLeft':
            return {
                side: TooltipV2Side.BOTTOM,
                align: TooltipV2Align.START,
                showArrow: true,
            }
        case 'bottomCenter':
            return {
                side: TooltipV2Side.BOTTOM,
                align: TooltipV2Align.CENTER,
                showArrow: true,
            }
        case 'bottomRight':
            return {
                side: TooltipV2Side.BOTTOM,
                align: TooltipV2Align.END,
                showArrow: true,
            }
        case 'left':
            return {
                side: TooltipV2Side.LEFT,
                align: TooltipV2Align.CENTER,
                showArrow: true,
            }
        case 'none':
            return {
                side: TooltipV2Side.TOP,
                align: TooltipV2Align.CENTER,
                showArrow: false,
            }
        default:
            return {
                side: TooltipV2Side.TOP,
                align: TooltipV2Align.CENTER,
                showArrow: true,
            }
    }
}

figma.connect(
    TooltipV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-751580&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping — TooltipV2Size (SM/MD/LG)
            // V2 introduces MD; V1 mapped `md` → LARGE because V1 had no MEDIUM.
            size: figma.enum('size', {
                sm: TooltipV2Size.SM,
                md: TooltipV2Size.MD,
            }),

            // Arrow mapping — decomposed into side/align/showArrow via helper
            arrow: figma.string('arrow'),

            // Slot direction mapping — TooltipV2SlotDirection (LEFT/RIGHT)
            slotDirection: figma.enum('slotDirection', {
                left: TooltipV2SlotDirection.LEFT,
                right: TooltipV2SlotDirection.RIGHT,
            }),

            // Slot content — V2 slot is a plain ReactNode (no object wrapping)
            slot: figma.instance('slot'),
        },

        example: ({ size, arrow, slotDirection, slot }) => {
            const position = getTooltipPosition(arrow || 'topCenter')

            return (
                <TooltipV2
                    content="This is a helpful tooltip"
                    size={size}
                    side={position.side}
                    align={position.align}
                    showArrow={position.showArrow}
                    slotDirection={slotDirection}
                    slot={slot}
                >
                    <ButtonV2 text="Hover me" size={ButtonV2Size.MEDIUM} />
                </TooltipV2>
            )
        },

        imports: [
            "import { TooltipV2, TooltipV2Size, TooltipV2Side, TooltipV2Align, TooltipV2SlotDirection, ButtonV2, ButtonV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/TooltipV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-tooltipv2--docs',
            },
        ],
    }
)

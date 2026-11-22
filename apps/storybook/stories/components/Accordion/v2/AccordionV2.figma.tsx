import React from 'react'
import { figma } from '@figma/code-connect'
import {
    AccordionV2,
    AccordionV2Item,
    AccordionV2Type,
    AccordionV2ChevronPosition,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR ACCORDIONV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - type (Figma) → accordionType (Code)
 *    - action (Figma) → defaultValue (Code)
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - chevronPosition → chevronPosition
 *
 * 3. SPECIAL MAPPINGS:
 *    - state (Figma) → isDisabled (Code)
 *      - state=disabled → isDisabled=true
 *      - state=default/hover → isDisabled=false (default)
 *    - action (Figma) → defaultValue (Code)
 *      - action=expanded → defaultValue="item-1" (item open)
 *      - action=collapsed → defaultValue=undefined (no item open)
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - display: Platform target (always "web"), handled by library
 *    - variant: Content structure (textOnly/withTable/withForm), controlled by children
 *    - position: Layout position, handled by parent layout
 *    - state: hover is an interaction state, not a code prop
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled value, managed by parent state
 *    - isMultiple: Allows multiple items open simultaneously
 *    - onValueChange: Callback for value changes
 *    - leftSlot, rightSlot, subtextSlot: ReactNode content slots
 *    - width, maxWidth, minWidth: Dimension controls
 *
 * Note: title and subtext are text layers inside a nested Figma instance
 * and are not exposed as component properties. They are hardcoded here
 * as sensible defaults; developers should replace them with actual content.
 */

figma.connect(
    AccordionV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=30350-53913&t=2cYf4ifoTTJzxg2D-4',
    {
        props: {
            // Renamed mapping: type (Figma) → accordionType (Code)
            accordionType: figma.enum('type', {
                border: AccordionV2Type.BORDER,
                noBorder: AccordionV2Type.NO_BORDER,
            }),

            // Renamed mapping: action (Figma) → defaultValue (Code)
            // expanded = item open, collapsed = no item open
            defaultValue: figma.enum('action', {
                expanded: 'item-1',
                collapsed: undefined,
            }),

            // Direct mapping: chevronPosition
            chevronPosition: figma.enum('chevronPosition', {
                left: AccordionV2ChevronPosition.LEFT,
                right: AccordionV2ChevronPosition.RIGHT,
            }),

            // Special mapping: state → isDisabled (only disabled matters)
            isDisabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
            }),
        },

        example: ({
            accordionType,
            defaultValue,
            chevronPosition,
            isDisabled,
        }) => (
            <AccordionV2
                accordionType={accordionType}
                defaultValue={defaultValue}
            >
                <AccordionV2Item
                    value="item-1"
                    title="Title Text Here"
                    subtext="Some text about the accordion content will go here."
                    chevronPosition={chevronPosition}
                    isDisabled={isDisabled}
                >
                    Content goes here
                </AccordionV2Item>
            </AccordionV2>
        ),

        imports: [
            "import { AccordionV2, AccordionV2Item, AccordionV2Type, AccordionV2ChevronPosition } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/AccordionV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-accordionv2--docs',
            },
        ],
    }
)

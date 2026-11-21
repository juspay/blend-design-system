import React from 'react'
import { figma } from '@figma/code-connect'
import { CardV2, CardV2Orientation } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CARDV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. COMPOUND VARIANT MAPPING:
 *    The Figma `varient` (VARIANT) property is a layout preset that
 *    controls multiple code props simultaneously:
 *    - withHeaderFill → orientation: VERTICAL (header has filled
 *      background — a Figma-only visual distinction; code uses tokens)
 *    - withVerticleImage → orientation: VERTICAL (image on top)
 *    - withHorizontalImage → orientation: HORIZONTAL (image on side)
 *    - withoutHeaderFill → orientation: VERTICAL (default)
 *    - centerAlign → orientation: VERTICAL + centered: true
 *    - horizontalSlot → orientation: HORIZONTAL
 *    - verticalSlot → orientation: VERTICAL
 *
 * 2. CONDITIONAL TEXT (BOOLEAN-gated):
 *    - Subheader (TEXT) is only rendered when hasSubheader (BOOLEAN)
 *      is true. In code, subtitle=undefined hides it.
 *    - bodyTitle (TEXT) is only rendered when hasTag (BOOLEAN) is
 *      true. In code, eyebrow=undefined hides it.
 *
 * 3. INSTANCE SWAP SLOTS:
 *    - headerSlot1 (INSTANCE_SWAP) → leadingSlot, gated by
 *      hasHeaderSlot1 (BOOLEAN)
 *    - headerSlot2 (INSTANCE_SWAP) → trailingSlot, gated by
 *      hasHeaderSlot2 (BOOLEAN)
 *
 * 4. ACTION MAPPING:
 *    - hasAction (BOOLEAN) → actions prop. When true, a sample
 *      ButtonV2Props action object is provided. When false,
 *      actions=undefined.
 *
 * 5. FIGMA-ONLY PROPERTIES (not mapped):
 *    - hasBodySlot1 / hasBodySlot2: Control body content visibility
 *      in Figma; no direct code equivalent (body content is passed
 *      as children or description).
 *    - hasHeaderSlot / headerSlot: An additional header slot in
 *      Figma without a code equivalent (code only has leadingSlot
 *      and trailingSlot).
 *    - CardV2Variant (outlined/elevated/ghost): The Figma component
 *      does not expose a variant property for card surface style;
 *      code defaults to OUTLINED.
 *    - CardV2Padding: Not exposed in Figma; code defaults to
 *      COMFORTABLE.
 *    - interactive, selected, skeleton: Not exposed in Figma.
 */

figma.connect(
    CardV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-316572',
    {
        props: {
            // Compound variant mapping: varient → orientation
            orientation: figma.enum('varient', {
                withHeaderFill: CardV2Orientation.VERTICAL,
                withVerticleImage: CardV2Orientation.VERTICAL,
                withHorizontalImage: CardV2Orientation.HORIZONTAL,
                withoutHeaderFill: CardV2Orientation.VERTICAL,
                centerAlign: CardV2Orientation.VERTICAL,
                horizontalSlot: CardV2Orientation.HORIZONTAL,
                verticalSlot: CardV2Orientation.VERTICAL,
            }),

            // Compound variant mapping: varient → centered
            centered: figma.enum('varient', {
                withHeaderFill: false,
                withVerticleImage: false,
                withHorizontalImage: false,
                withoutHeaderFill: false,
                centerAlign: true,
                horizontalSlot: false,
                verticalSlot: false,
            }),

            // Direct text mappings
            title: figma.string('Header Title'),
            description: figma.string('Content'),

            // Conditional text — only shown when the boolean toggle is true
            subtitle: figma.boolean('hasSubheader', {
                true: figma.string('Subheader'),
                false: undefined,
            }),

            eyebrow: figma.boolean('hasTag', {
                true: figma.string('bodyTitle'),
                false: undefined,
            }),

            // Instance swap slots — gated by boolean toggles
            leadingSlot: figma.boolean('hasHeaderSlot1', {
                true: figma.instance('headerSlot1'),
                false: undefined,
            }),

            trailingSlot: figma.boolean('hasHeaderSlot2', {
                true: figma.instance('headerSlot2'),
                false: undefined,
            }),

            // Action mapping — sample button when hasAction is true
            actions: figma.boolean('hasAction', {
                true: {
                    text: 'Action',
                    onClick: () => {},
                },
                false: undefined,
            }),
        },

        example: ({
            orientation,
            centered,
            title,
            description,
            subtitle,
            eyebrow,
            leadingSlot,
            trailingSlot,
            actions,
        }) => (
            <CardV2
                orientation={orientation}
                centered={centered}
                title={title}
                description={description}
                subtitle={subtitle}
                eyebrow={eyebrow}
                leadingSlot={leadingSlot}
                trailingSlot={trailingSlot}
                actions={actions}
            />
        ),

        imports: [
            "import { CardV2, CardV2Orientation } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/CardV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-cardv2--docs',
            },
        ],
    }
)

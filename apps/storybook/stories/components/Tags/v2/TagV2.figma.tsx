import React from 'react'
import { figma } from '@figma/code-connect'
import {
    TagV2,
    TagV2Type,
    TagV2SubType,
    TagV2Color,
    TagV2Size,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TAGV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - variant (Figma) → type (Code)
 *      Figma values noFill/attentive/subtle map to TagV2Type members.
 *    - shape (Figma) → subType (Code)
 *      Figma values rounded/squarical map to TagV2SubType members.
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - text → text
 *    - size → size (xs/sm/md/lg → TagV2Size)
 *    - color → color (neutral/primary/success/error/warning/purple → TagV2Color)
 *
 * 3. BOOLEAN TO OBJECT-SLOT MAPPINGS:
 *    - hasLeftSlot (Figma) → leftSlot (Code)
 *    - hasRightSlot (Figma) → rightSlot (Code)
 *      V1 accepted a bare ReactElement; V2 wraps the slot in an object:
 *      { slot: ReactElement, maxHeight?: CSSValue }. The example wraps the
 *      figma.instance output in { slot } before passing it to TagV2.
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - hasLabel: Whether a label is shown. In code this is implicit — if `text`
 *      is provided, the label renders; omit `text` for a label-less tag.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - skeleton: { showSkeleton, skeletonVariant } loading state.
 *    - tagGroupPosition: 'center' | 'left' | 'right' layout concern.
 *    - onClick: Click handler (makes the tag interactive / role="button").
 */

figma.connect(
    TagV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-744952&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Direct text mapping
            text: figma.string('text'),

            // Renamed mapping: variant (Figma) → type (Code)
            type: figma.enum('variant', {
                noFill: TagV2Type.NO_FILL,
                attentive: TagV2Type.ATTENTIVE,
                subtle: TagV2Type.SUBTLE,
            }),

            // Renamed mapping: shape (Figma) → subType (Code)
            subType: figma.enum('shape', {
                rounded: TagV2SubType.ROUNDED,
                squarical: TagV2SubType.SQUARICAL,
            }),

            // Direct mapping: size
            size: figma.enum('size', {
                xs: TagV2Size.XS,
                sm: TagV2Size.SM,
                md: TagV2Size.MD,
                lg: TagV2Size.LG,
            }),

            // Direct mapping: color
            color: figma.enum('color', {
                neutral: TagV2Color.NEUTRAL,
                primary: TagV2Color.PRIMARY,
                success: TagV2Color.SUCCESS,
                error: TagV2Color.ERROR,
                warning: TagV2Color.WARNING,
                purple: TagV2Color.PURPLE,
            }),

            // Slot mappings: Figma boolean flags gate figma.instance children.
            // V2 expects each slot as { slot: ReactElement }, so the object
            // wrapping is done here in the prop mapping rather than in the
            // example function (the Code Connect parser requires direct prop
            // references in example).
            leftSlot: figma.boolean('hasLeftSlot', {
                true: { slot: figma.instance('leftSlot') },
                false: undefined,
            }),

            rightSlot: figma.boolean('hasRightSlot', {
                true: { slot: figma.instance('rightSlot') },
                false: undefined,
            }),

            // Note: hasLabel is handled implicitly — if text is provided, the
            // label renders. skeleton, tagGroupPosition and onClick are code-only.
        },

        example: ({
            text,
            type,
            subType,
            size,
            color,
            leftSlot,
            rightSlot,
        }) => (
            <TagV2
                text={text}
                type={type}
                subType={subType}
                size={size}
                color={color}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
            />
        ),

        imports: [
            "import { TagV2, TagV2Type, TagV2SubType, TagV2Color, TagV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/TagV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-tagsv2--docs',
            },
        ],
    }
)

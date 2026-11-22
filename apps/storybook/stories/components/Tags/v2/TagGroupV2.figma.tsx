import React from 'react'
import { figma } from '@figma/code-connect'
import {
    TagGroupV2,
    TagV2,
    TagV2Type,
    TagV2SubType,
    TagV2Color,
    TagV2Size,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TAGGROUPV2 (SPLIT TAG)
 *
 * The Figma "SplitTags" component set at 18805:745529 renders two joined
 * TagV2 instances side-by-side: a no-fill label on the left and an attentive
 * value on the right. In code this maps to TagGroupV2 with `stacked` (flush
 * layout) and two TagV2 children.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * 1. SHARED VARIANT MAPPINGS (applied to both child tags):
 *    - shape (Figma) → subType (Code): rounded/squarical → TagV2SubType
 *    - size (Figma) → size (Code): xs/sm/md/lg → TagV2Size
 *    - color (Figma) → color (Code): neutral/primary/success/error/warning/purple → TagV2Color
 *
 * 2. FIXED CHILD TAG CONFIGURATION:
 *    - Left tag (label): type=NO_FILL, tagGroupPosition='left', text='Label'
 *    - Right tag (value): type=ATTENTIVE, tagGroupPosition='right', text='Value'
 *    These mirror the V1 SplitTag defaults (primary=NO_FILL, secondary=ATTENTIVE).
 *
 * 3. FIGMA-ONLY PROPERTIES (not exposed at the component-set level):
 *    - The nested Tags instances have their own text, hasLabel, hasLeftSlot,
 *      hasRightSlot, variant, etc., but these are not surfaced as top-level
 *      variant properties on the SplitTags component set.
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - gap: spacing between tags (omitted; stacked handles flush layout).
 *    - skeleton, leftSlot, rightSlot on individual TagV2 children.
 */

figma.connect(
    TagGroupV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-745529',
    {
        props: {
            subType: figma.enum('shape', {
                rounded: TagV2SubType.ROUNDED,
                squarical: TagV2SubType.SQUARICAL,
            }),

            size: figma.enum('size', {
                xs: TagV2Size.XS,
                sm: TagV2Size.SM,
                md: TagV2Size.MD,
                lg: TagV2Size.LG,
            }),

            color: figma.enum('color', {
                neutral: TagV2Color.NEUTRAL,
                primary: TagV2Color.PRIMARY,
                success: TagV2Color.SUCCESS,
                error: TagV2Color.ERROR,
                warning: TagV2Color.WARNING,
                purple: TagV2Color.PURPLE,
            }),
        },

        example: ({ subType, size, color }) => (
            <TagGroupV2 stacked>
                <TagV2
                    text="Label"
                    type={TagV2Type.NO_FILL}
                    subType={subType}
                    size={size}
                    color={color}
                    tagGroupPosition="left"
                />
                <TagV2
                    text="Value"
                    type={TagV2Type.ATTENTIVE}
                    subType={subType}
                    size={size}
                    color={color}
                    tagGroupPosition="right"
                />
            </TagGroupV2>
        ),

        imports: [
            "import { TagGroupV2, TagV2, TagV2Type, TagV2SubType, TagV2Color, TagV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/TagGroupV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-tagsv2--docs',
            },
        ],
    }
)

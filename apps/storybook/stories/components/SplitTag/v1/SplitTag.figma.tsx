import React from 'react'
import { figma } from '@figma/code-connect'
import {
    SplitTag,
    TagSize,
    TagShape,
    TagColor,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SPLITTAG COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - shape → shape
 *    - size → size
 *
 * 2. RENAMED MAPPINGS:
 *    - color (Figma) → style (Code)
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - primaryTag: Complex object prop containing tag configuration
 *    - secondaryTag: Complex object prop containing tag configuration
 *    - leadingSlot: React node for leading content
 *    - trailingSlot: React node for trailing content
 *
 * 4. FIGMA-ONLY PROPERTIES (not in code):
 *    - None identified
 *
 * 5. IMPLEMENTATION NOTES:
 *    - In Figma, the SplitTag is a single component with all props
 *    - In code, SplitTag is a wrapper that combines two Tag components
 *    - The primaryTag always uses TagVariant.NO_FILL
 *    - The secondaryTag always uses TagVariant.ATTENTIVE
 *    - Color customization happens through the individual tag props
 *    - Developers need to manually add text and icon content
 */

figma.connect(
    SplitTag,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-745529&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Direct mappings - same in both Figma and code
            shape: figma.enum('shape', {
                rounded: TagShape.ROUNDED,
                squarical: TagShape.SQUARICAL,
            }),

            size: figma.enum('size', {
                xs: TagSize.XS,
                sm: TagSize.SM,
                md: TagSize.MD,
                lg: TagSize.LG,
            }),

            // Renamed mapping - color (Figma) → style (Code)
            style: figma.enum('color', {
                primary: TagColor.PRIMARY,
                success: TagColor.SUCCESS,
                error: TagColor.ERROR,
                warning: TagColor.WARNING,
                purple: TagColor.PURPLE,
                neutral: TagColor.NEUTRAL,
            }),
        },

        example: ({ shape, size, style }) => {
            // Code-only props that are not controlled by Figma
            const primaryTag = {
                text: 'Label',
                color: TagColor.NEUTRAL, // Primary tag is always neutral
            }

            const secondaryTag = {
                text: 'Value',
                color: style, // Secondary tag uses the mapped color/style
            }

            return (
                <SplitTag
                    shape={shape}
                    size={size}
                    primaryTag={primaryTag}
                    secondaryTag={secondaryTag}
                    // leadingSlot and trailingSlot are not in Figma
                />
            )
        },

        imports: [
            "import { SplitTag, TagColor } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Tags',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-tags--docs',
            },
        ],
    }
)

/**
 * Example of SplitTag with additional features not in Figma:
 *
 * // With leading and trailing slots
 * <SplitTag
 *   shape={TagShape.ROUNDED}
 *   size={TagSize.MD}
 *   primaryTag={{ text: 'Status', color: TagColor.NEUTRAL }}
 *   secondaryTag={{ text: 'Active', color: TagColor.SUCCESS }}
 *   leadingSlot={<Icon name="status" />}
 *   trailingSlot={<Icon name="chevron-down" />}
 * />
 *
 * DEVELOPER NOTES:
 *
 * When using this component:
 * 1. The primaryTag is always neutral colored (left side)
 * 2. The secondaryTag uses the color/style from Figma (right side)
 * 3. leadingSlot and trailingSlot are not controlled by Figma
 * 4. Text content should be customized based on your use case
 */

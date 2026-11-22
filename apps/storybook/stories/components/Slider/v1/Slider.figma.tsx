import React from 'react'
import { figma } from '@figma/code-connect'
import { Slider, SliderSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SLIDER COMPONENT (V1)
 *
 * The Slider page has a component set at 18805:798503 with variants:
 *   label=<bool>, leftValue=<n>, rightValue=<n>, size=<sm|md>
 *
 * Component properties mapped via Figma:
 *   size (variant sm/md) -> SliderSize.SMALL / SliderSize.MEDIUM
 *   label (boolean) -> showValueLabels
 *
 * CODE-ONLY PROPS (not in Figma):
 *   variant, valueFormat, labelPosition, min, max, step, disabled,
 *   orientation, onValueChange, value controlled)
 *   defaultValue: hardcoded to [0, 50] as a representative example
 *     (leftValue/rightValue in Figma can't be merged into a single array)
 */

figma.connect(
    Slider,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-798503',
    {
        props: {
            size: figma.enum('size', {
                sm: SliderSize.SMALL,
                md: SliderSize.MEDIUM,
            }),

            showValueLabels: figma.boolean('label'),
        },

        example: ({ size, showValueLabels }) => (
            <Slider
                size={size}
                defaultValue={[0, 50]}
                showValueLabels={showValueLabels}
            />
        ),

        imports: [
            "import { Slider, SliderSize } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Slider',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-slider--docs',
            },
        ],
    }
)

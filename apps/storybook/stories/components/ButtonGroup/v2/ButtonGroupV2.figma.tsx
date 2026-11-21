import React from 'react'
import { figma } from '@figma/code-connect'
import {
    ButtonGroupV2,
    ButtonV2,
    ButtonV2Size,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR BUTTON GROUP V2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - stack (Figma) → stacked (Code)
 *
 * 2. SPECIAL MAPPINGS:
 *    - number (Figma) → children (Code)
 *      Figma exposes a 'number' variant ('2'-'5') controlling how many button
 *      slots are rendered; code takes real ButtonV2 children, so each variant
 *      maps to a static array of N ButtonV2 elements.
 *    - size (Figma) applies to every button in the group; ButtonGroupV2 has
 *      no size prop of its own, so size is applied to each child ButtonV2.
 *
 * 3. FIGMA-ONLY PROPERTIES (not in code):
 *    - number: Determines the number of buttons to render (2-5)
 *    - size: Button size that applies to all buttons in the group
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - children: The actual ButtonV2 components to render
 *    - gap: Spacing between buttons
 *
 * Note: The 'size' prop in Figma corresponds to the individual button sizes,
 * but ButtonGroupV2 itself doesn't have a size prop in code. The size is
 * applied to each individual ButtonV2 component within the group.
 */

figma.connect(
    ButtonGroupV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-274946&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // Renamed mapping: stack (Figma) → stacked (Code)
            stacked: figma.boolean('stack'),

            // Generate children based on number and size from Figma
            children: figma.enum('number', {
                '2': figma.enum('size', {
                    small: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.SMALL}
                        />,
                    ],
                    medium: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.MEDIUM}
                        />,
                    ],
                    large: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.LARGE}
                        />,
                    ],
                }),
                '3': figma.enum('size', {
                    small: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.SMALL}
                        />,
                    ],
                    medium: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.MEDIUM}
                        />,
                    ],
                    large: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.LARGE}
                        />,
                    ],
                }),
                '4': figma.enum('size', {
                    small: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={3}
                            text="Button 4"
                            size={ButtonV2Size.SMALL}
                        />,
                    ],
                    medium: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={3}
                            text="Button 4"
                            size={ButtonV2Size.MEDIUM}
                        />,
                    ],
                    large: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={3}
                            text="Button 4"
                            size={ButtonV2Size.LARGE}
                        />,
                    ],
                }),
                '5': figma.enum('size', {
                    small: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={3}
                            text="Button 4"
                            size={ButtonV2Size.SMALL}
                        />,
                        <ButtonV2
                            key={4}
                            text="Button 5"
                            size={ButtonV2Size.SMALL}
                        />,
                    ],
                    medium: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={3}
                            text="Button 4"
                            size={ButtonV2Size.MEDIUM}
                        />,
                        <ButtonV2
                            key={4}
                            text="Button 5"
                            size={ButtonV2Size.MEDIUM}
                        />,
                    ],
                    large: [
                        <ButtonV2
                            key={0}
                            text="Button 1"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={1}
                            text="Button 2"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={2}
                            text="Button 3"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={3}
                            text="Button 4"
                            size={ButtonV2Size.LARGE}
                        />,
                        <ButtonV2
                            key={4}
                            text="Button 5"
                            size={ButtonV2Size.LARGE}
                        />,
                    ],
                }),
            }),
        },

        example: ({ stacked, children }) => (
            <ButtonGroupV2 stacked={stacked}>{children}</ButtonGroupV2>
        ),

        imports: [
            "import { ButtonGroupV2, ButtonV2, ButtonV2Size } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/ButtonV2/ButtonGroupV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-button-buttonv2--docs',
            },
        ],
    }
)

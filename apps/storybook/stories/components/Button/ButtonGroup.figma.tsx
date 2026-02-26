import React from 'react'
import {
    ButtonGroup,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import { figma } from '@figma/code-connect'

/**
 * FIGMA CODE CONNECT FOR BUTTON GROUP COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - stack (Figma) → stacked (Code)
 *
 * 2. FIGMA-ONLY PROPERTIES (not in code):
 *    - number: Determines the number of buttons to render (2-5)
 *    - size: Button size that applies to all buttons in the group
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - children: The actual Button components to render
 *
 * Note: The 'size' prop in Figma corresponds to the individual button sizes,
 * but ButtonGroup itself doesn't have a size prop in code. The size is applied
 * to each individual Button component within the group.
 */

figma.connect(
    ButtonGroup,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-274946&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // Renamed mapping: stack (Figma) → stacked (Code)
            stacked: figma.boolean('stack'),

            // Generate children based on number and size from Figma
            children: figma.enum('number', {
                '2': figma.enum('size', {
                    small: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.SMALL}
                        />,
                    ],
                    medium: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.MEDIUM}
                        />,
                    ],
                    large: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.LARGE}
                        />,
                    ],
                }),
                '3': figma.enum('size', {
                    small: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.SMALL}
                        />,
                    ],
                    medium: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.MEDIUM}
                        />,
                    ],
                    large: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.LARGE}
                        />,
                    ],
                }),
                '4': figma.enum('size', {
                    small: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={3}
                            text="Button 4"
                            size={ButtonSize.SMALL}
                        />,
                    ],
                    medium: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={3}
                            text="Button 4"
                            size={ButtonSize.MEDIUM}
                        />,
                    ],
                    large: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={3}
                            text="Button 4"
                            size={ButtonSize.LARGE}
                        />,
                    ],
                }),
                '5': figma.enum('size', {
                    small: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={3}
                            text="Button 4"
                            size={ButtonSize.SMALL}
                        />,
                        <Button
                            key={4}
                            text="Button 5"
                            size={ButtonSize.SMALL}
                        />,
                    ],
                    medium: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={3}
                            text="Button 4"
                            size={ButtonSize.MEDIUM}
                        />,
                        <Button
                            key={4}
                            text="Button 5"
                            size={ButtonSize.MEDIUM}
                        />,
                    ],
                    large: [
                        <Button
                            key={0}
                            text="Button 1"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={1}
                            text="Button 2"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={2}
                            text="Button 3"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={3}
                            text="Button 4"
                            size={ButtonSize.LARGE}
                        />,
                        <Button
                            key={4}
                            text="Button 5"
                            size={ButtonSize.LARGE}
                        />,
                    ],
                }),
            }),
        },

        example: ({ stacked, children }) => (
            <ButtonGroup stacked={stacked}>{children}</ButtonGroup>
        ),

        imports: [
            "import { ButtonGroup, Button, ButtonSize } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Button',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-button--docs',
            },
        ],
    }
)

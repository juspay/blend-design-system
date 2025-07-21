import React from 'react'
import { ButtonGroupV2, Button, ButtonType } from 'blend-v1'
import figma from '@figma/code-connect'

/**
 * ButtonGroupV2 Figma Code Connect
 *
 * Props mapping:
 * - number (Figma only): Determines number of buttons to render
 * - size (Figma only): Will be added to code in future
 * - stacked (both): Boolean prop for stacked/horizontal layout
 */

figma.connect(
    ButtonGroupV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=6692-3066',
    {
        props: {
            // stacked prop maps directly
            stacked: figma.boolean('stacked'),

            // number prop is used to generate children
            children: figma.enum('number', {
                '2': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                ],
                '3': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                ],
                '4': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                    <Button key={3} text="Button 4" />,
                ],
                '5': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                    <Button key={3} text="Button 4" />,
                    <Button key={4} text="Button 5" />,
                ],
            }),

            // size prop is noted but not used in current implementation
            // Will be implemented when size prop is added to ButtonGroupV2
            // size: figma.enum("size", {
            //   "small": "small",
            //   "medium": "medium",
            //   "large": "large",
            // }),
        },

        example: ({ stacked, children }) => (
            <ButtonGroupV2 stacked={stacked}>{children}</ButtonGroupV2>
        ),
    }
)

// Variant for horizontal button group (stacked = false)
figma.connect(
    ButtonGroupV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=6692-3066',
    {
        variant: { stacked: 'false' },
        props: {
            children: figma.enum('number', {
                '2': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                ],
                '3': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                ],
                '4': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                    <Button key={3} text="Button 4" />,
                ],
                '5': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                    <Button key={3} text="Button 4" />,
                    <Button key={4} text="Button 5" />,
                ],
            }),
        },
        example: ({ children }) => (
            <ButtonGroupV2 stacked={false}>{children}</ButtonGroupV2>
        ),
    }
)

// Variant for stacked button group (stacked = true)
figma.connect(
    ButtonGroupV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=6692-3066',
    {
        variant: { stacked: 'true' },
        props: {
            children: figma.enum('number', {
                '2': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                ],
                '3': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                ],
                '4': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                    <Button key={3} text="Button 4" />,
                ],
                '5': [
                    <Button key={0} text="Button 1" />,
                    <Button key={1} text="Button 2" />,
                    <Button key={2} text="Button 3" />,
                    <Button key={3} text="Button 4" />,
                    <Button key={4} text="Button 5" />,
                ],
            }),
        },
        example: ({ children }) => (
            <ButtonGroupV2 stacked={true}>{children}</ButtonGroupV2>
        ),
    }
)

// Common patterns with specific number of buttons
// 2-button group
figma.connect(
    ButtonGroupV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=6692-3066',
    {
        variant: { number: '2' },
        props: {
            stacked: figma.boolean('stacked'),
        },
        example: ({ stacked }) => (
            <ButtonGroupV2 stacked={stacked}>
                <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                <Button text="Save" buttonType={ButtonType.PRIMARY} />
            </ButtonGroupV2>
        ),
    }
)

// 3-button group
figma.connect(
    ButtonGroupV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=6692-3066',
    {
        variant: { number: '3' },
        props: {
            stacked: figma.boolean('stacked'),
        },
        example: ({ stacked }) => (
            <ButtonGroupV2 stacked={stacked}>
                <Button text="Previous" buttonType={ButtonType.SECONDARY} />
                <Button text="Current" buttonType={ButtonType.PRIMARY} />
                <Button text="Next" buttonType={ButtonType.SECONDARY} />
            </ButtonGroupV2>
        ),
    }
)

// Future implementation when size prop is added to ButtonGroupV2
// This is commented out but shows how it would be implemented
/*
figma.connect(ButtonGroupV2, "https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=14667-1234", {
  variant: { size: figma.enum("size") },
  props: {
    stacked: figma.boolean("stacked"),
    size: figma.enum("size", {
      "small": "small",
      "medium": "medium", 
      "large": "large",
    }),
    children: figma.enum("number", {
      "2": (size) => [
        <Button key={0} text="Button 1" size={size} />,
        <Button key={1} text="Button 2" size={size} />
      ],
      "3": (size) => [
        <Button key={0} text="Button 1" size={size} />,
        <Button key={1} text="Button 2" size={size} />,
        <Button key={2} text="Button 3" size={size} />
      ],
    }),
  },
  example: ({ stacked, size, children }) => (
    <ButtonGroupV2 stacked={stacked}>
      {children(size)}
    </ButtonGroupV2>
  ),
});
*/

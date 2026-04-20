import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FOUNDATION_THEME } from '@juspay/blend-design-system'

// Foundation theme tokens
const tokens = FOUNDATION_THEME

const meta: Meta = {
    title: 'Foundations/Design Tokens',
    parameters: {
        layout: 'padded',
        docsSubtitle:
            'Foundation tokens are the core design values that power the Blend Design System.',
        docs: {
            description: {
                component: `
## What are Design Tokens?

Foundation tokens are the core design values that power the Blend Design System. These tokens ensure consistency across all components and provide a centralized way to manage design decisions.

## What are Design Tokens?

Design tokens are named entities that store visual design attributes. They are used in place of hard-coded values in order to maintain a scalable and consistent visual system for UI development.

## Token Categories

- **Colors**: Primary, secondary, semantic colors and grays
- **Typography**: Font families, weights, sizes, and line heights
- **Spacing**: Consistent spacing scale for margins, padding, and gaps
- **Shadows**: Elevation system with predefined shadow styles
- **Border Radius**: Consistent corner radius values
- **Border Width**: Standard border thickness values
- **Opacity**: Transparency levels for various UI states

## Usage in Code

\`\`\`typescript
import { foundationToken } from '@juspay/blend-design-system'

// Using color tokens
backgroundColor: foundationToken.colors.primary[500]

// Using spacing tokens
padding: foundationToken.spacing[16]

// Using typography tokens
fontSize: foundationToken.fontSize.bodyLG
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj

// Color Palette showcase
export const ColorPalette: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-semibold mb-2">Color Palette</h2>

            {Object.entries(tokens.colors).map(([colorName, shades]) => (
                <div key={colorName} className="mb-6">
                    <h3 className="text-lg font-medium mb-3 capitalize text-gray-700">
                        {colorName}
                    </h3>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 mb-4">
                        {Object.entries(shades).map(([shade, value]) => (
                            <div
                                key={shade}
                                className="flex flex-col items-center p-2 border border-gray-200 rounded-lg bg-white"
                            >
                                <div
                                    className="w-20 h-10 rounded border border-gray-200 mb-2"
                                    style={{ backgroundColor: value }}
                                />
                                <div className="text-xs font-medium text-gray-700 text-center">
                                    {shade}
                                </div>
                                <div className="text-[10px] text-gray-500 font-mono text-center">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    ),
}

// Typography System
export const TypographySystem: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-semibold mb-2">Typography System</h2>

            {/* Font Families */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                    Font Families
                </h3>
                <div className="flex flex-col gap-3">
                    {Object.entries(tokens.font.family).map(
                        ([familyName, familyValue]) => (
                            <div
                                key={familyName}
                                className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg bg-white"
                            >
                                <div className="min-w-[100px] text-sm font-medium text-gray-700 capitalize">
                                    {familyName}
                                </div>
                                <div className="text-xs text-gray-500 font-mono min-w-[200px]">
                                    {familyValue}
                                </div>
                                <div
                                    className="text-lg text-gray-900"
                                    style={{ fontFamily: familyValue }}
                                >
                                    The quick brown fox jumps over the lazy dog
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Font Weights */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                    Font Weights
                </h3>
                <div className="flex flex-col gap-3">
                    {Object.entries(tokens.font.weight).map(
                        ([weightName, weightValue]) => (
                            <div
                                key={weightName}
                                className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg bg-white"
                            >
                                <div className="min-w-[80px] text-sm font-medium text-gray-700">
                                    {weightName}
                                </div>
                                <div className="text-xs text-gray-500 font-mono min-w-[60px]">
                                    {weightValue}
                                </div>
                                <div
                                    className="text-lg text-gray-900"
                                    style={{ fontWeight: weightValue }}
                                >
                                    The quick brown fox jumps over the lazy dog
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Letter Spacing */}
            <div className="mb-8">
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                    Letter Spacing
                </h3>
                <div className="flex flex-col gap-3">
                    {Object.entries(tokens.font.letterSpacing).map(
                        ([spacingName, spacingValue]) => (
                            <div
                                key={spacingName}
                                className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg bg-white"
                            >
                                <div className="min-w-[120px] text-sm font-medium text-gray-700 capitalize">
                                    {spacingName}
                                </div>
                                <div className="text-xs text-gray-500 font-mono min-w-[60px]">
                                    {spacingValue}px
                                </div>
                                <div
                                    className="text-lg text-gray-900"
                                    style={{
                                        letterSpacing: `${spacingValue}px`,
                                    }}
                                >
                                    The quick brown fox jumps over the lazy dog
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Typography Scales */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Typography Scales
                </h3>

                {/* Display Scale */}
                <div className="mb-8">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                        Display Scale
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Used for large marketing headers, hero sections, and
                        prominent displays
                    </p>
                    <div className="flex flex-col gap-4">
                        {Object.entries(tokens.font.size.display).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    className="p-5 border border-gray-200 rounded-lg bg-white"
                                >
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <div className="text-xs font-medium text-gray-700 min-w-[80px]">
                                            display.{sizeName}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-mono">
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        className="text-gray-900"
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily:
                                                tokens.font.family.display,
                                        }}
                                    >
                                        Display Heading
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Heading Scale */}
                <div className="mb-8">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                        Heading Scale
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Used for section headers, page titles, and content
                        hierarchy
                    </p>
                    <div className="flex flex-col gap-4">
                        {Object.entries(tokens.font.size.heading).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    className="p-4 border border-gray-200 rounded-lg bg-white"
                                >
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <div className="text-xs font-medium text-gray-700 min-w-[80px]">
                                            heading.{sizeName}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-mono">
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        className="text-gray-900"
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily:
                                                tokens.font.family.heading,
                                            fontWeight: tokens.font.weight[600],
                                        }}
                                    >
                                        Section Heading
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Body Scale */}
                <div className="mb-8">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                        Body Scale
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Used for body text, descriptions, and readable content
                    </p>
                    <div className="flex flex-col gap-4">
                        {Object.entries(tokens.font.size.body).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    className="p-4 border border-gray-200 rounded-lg bg-white"
                                >
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <div className="text-xs font-medium text-gray-700 min-w-[60px]">
                                            body.{sizeName}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-mono">
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        className="text-gray-900"
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily: tokens.font.family.body,
                                        }}
                                    >
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Code Scale */}
                <div className="mb-8">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                        Code Scale
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Used for code blocks, technical documentation, and
                        monospace content
                    </p>
                    <div className="flex flex-col gap-4">
                        {Object.entries(tokens.font.size.code).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    className="p-4 border border-gray-200 rounded-lg bg-slate-50"
                                >
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <div className="text-xs font-medium text-gray-700 min-w-[60px]">
                                            code.{sizeName}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-mono">
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        className="text-gray-800 bg-slate-100 px-3 py-2 rounded border border-slate-200"
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily: tokens.font.family.mono,
                                        }}
                                    >
                                        const greeting = "Hello, World!";{'\n'}
                                        console.log(greeting);
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    ),
}

// Unit Scale (Spacing)
export const UnitScale: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-2">
                Unit Scale (Spacing)
            </h2>

            <div className="flex flex-col gap-3">
                {Object.entries(tokens.unit).map(([unitName, unitValue]) => (
                    <div
                        key={unitName}
                        className="flex items-center gap-6 px-4 py-3 border border-gray-200 rounded-lg bg-white"
                    >
                        <div className="min-w-[80px] text-sm font-medium text-gray-700">
                            {unitName}
                        </div>
                        <div className="text-xs text-gray-500 font-mono min-w-[60px]">
                            {unitValue}
                        </div>
                        <div
                            className="h-6 bg-blue-500 rounded-sm"
                            style={{
                                width:
                                    unitValue === 'auto' ? '100px' : unitValue,
                                minWidth: '2px',
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    ),
}

// Shadow Scale
export const ShadowScale: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-2">Shadow Scale</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
                {Object.entries(tokens.shadows).map(
                    ([shadowName, shadowValue]) => (
                        <div
                            key={shadowName}
                            className="p-6 bg-white rounded-lg text-center"
                            style={{ boxShadow: shadowValue }}
                        >
                            <div className="text-sm font-medium text-gray-700 mb-2">
                                {shadowName}
                            </div>
                            <div className="text-[11px] text-gray-500 font-mono break-all leading-snug">
                                {shadowValue}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    ),
}

// Border Radius Scale
export const BorderRadiusScale: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-2">Border Radius Scale</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                {Object.entries(tokens.border.radius).map(
                    ([radiusName, radiusValue]) => (
                        <div
                            key={radiusName}
                            className="p-5 bg-gray-100 border-2 border-blue-500 text-center"
                            style={{ borderRadius: radiusValue }}
                        >
                            <div className="text-sm font-medium text-gray-700 mb-1">
                                {radiusName}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">
                                {radiusValue}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    ),
}

// Opacity Scale
export const OpacityScale: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-2">Opacity Scale</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
                {Object.entries(tokens.opacity).map(
                    ([opacityName, opacityValue]) => (
                        <div
                            key={opacityName}
                            className="relative p-5 bg-gray-100 rounded-lg text-center overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 bg-blue-500"
                                style={{ opacity: opacityValue }}
                            />
                            <div className="relative z-10 text-sm font-medium text-gray-700 mb-1">
                                {opacityName}
                            </div>
                            <div className="relative z-10 text-xs text-gray-500 font-mono">
                                {opacityValue}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    ),
}

// Border Width Scale
export const BorderWidthScale: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-2">Border Width Scale</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                {Object.entries(tokens.border.width).map(
                    ([widthName, widthValue]) => (
                        <div
                            key={widthName}
                            className="p-5 bg-white rounded-lg text-center"
                            style={{ border: `${widthValue} solid #3b82f6` }}
                        >
                            <div className="text-sm font-medium text-gray-700 mb-1">
                                {widthName}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">
                                {widthValue}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    ),
}

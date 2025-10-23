import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FOUNDATION_THEME } from '@juspay/blend-design-system'

// Foundation theme tokens
const tokens = FOUNDATION_THEME

const meta: Meta = {
    title: 'Foundations/Design Tokens',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Foundation Design Tokens

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h2
                style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
            >
                Color Palette
            </h2>

            {Object.entries(tokens.colors).map(([colorName, shades]) => (
                <div key={colorName} style={{ marginBottom: '24px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            marginBottom: '12px',
                            textTransform: 'capitalize',
                            color: '#374151',
                        }}
                    >
                        {colorName}
                    </h3>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: '8px',
                            marginBottom: '16px',
                        }}
                    >
                        {Object.entries(shades).map(([shade, value]) => (
                            <div
                                key={shade}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '8px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <div
                                    style={{
                                        width: '80px',
                                        height: '40px',
                                        backgroundColor: value,
                                        borderRadius: '4px',
                                        border: '1px solid #e5e7eb',
                                        marginBottom: '8px',
                                    }}
                                />
                                <div
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        color: '#374151',
                                        textAlign: 'center',
                                    }}
                                >
                                    {shade}
                                </div>
                                <div
                                    style={{
                                        fontSize: '10px',
                                        color: '#6b7280',
                                        fontFamily: 'monospace',
                                        textAlign: 'center',
                                    }}
                                >
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h2
                style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
            >
                Typography System
            </h2>

            {/* Font Families */}
            <div style={{ marginBottom: '24px' }}>
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        marginBottom: '12px',
                        color: '#374151',
                    }}
                >
                    Font Families
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {Object.entries(tokens.font.family).map(
                        ([familyName, familyValue]) => (
                            <div
                                key={familyName}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '24px',
                                    padding: '16px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <div
                                    style={{
                                        minWidth: '100px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#374151',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {familyName}
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: '#6b7280',
                                        fontFamily: 'monospace',
                                        minWidth: '200px',
                                    }}
                                >
                                    {familyValue}
                                </div>
                                <div
                                    style={{
                                        fontSize: '18px',
                                        fontFamily: familyValue,
                                        color: '#111827',
                                    }}
                                >
                                    The quick brown fox jumps over the lazy dog
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Font Weights */}
            <div style={{ marginBottom: '24px' }}>
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        marginBottom: '12px',
                        color: '#374151',
                    }}
                >
                    Font Weights
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {Object.entries(tokens.font.weight).map(
                        ([weightName, weightValue]) => (
                            <div
                                key={weightName}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '24px',
                                    padding: '16px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <div
                                    style={{
                                        minWidth: '80px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#374151',
                                    }}
                                >
                                    {weightName}
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: '#6b7280',
                                        fontFamily: 'monospace',
                                        minWidth: '60px',
                                    }}
                                >
                                    {weightValue}
                                </div>
                                <div
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: weightValue,
                                        color: '#111827',
                                    }}
                                >
                                    The quick brown fox jumps over the lazy dog
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Letter Spacing */}
            <div style={{ marginBottom: '32px' }}>
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        marginBottom: '12px',
                        color: '#374151',
                    }}
                >
                    Letter Spacing
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {Object.entries(tokens.font.letterSpacing).map(
                        ([spacingName, spacingValue]) => (
                            <div
                                key={spacingName}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '24px',
                                    padding: '16px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <div
                                    style={{
                                        minWidth: '120px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#374151',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {spacingName}
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: '#6b7280',
                                        fontFamily: 'monospace',
                                        minWidth: '60px',
                                    }}
                                >
                                    {spacingValue}px
                                </div>
                                <div
                                    style={{
                                        fontSize: '18px',
                                        letterSpacing: `${spacingValue}px`,
                                        color: '#111827',
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
            <div style={{ marginBottom: '40px' }}>
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        marginBottom: '16px',
                        color: '#111827',
                    }}
                >
                    Typography Scales
                </h3>

                {/* Display Scale */}
                <div style={{ marginBottom: '32px' }}>
                    <h4
                        style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            marginBottom: '12px',
                            color: '#374151',
                        }}
                    >
                        Display Scale
                    </h4>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        Used for large marketing headers, hero sections, and
                        prominent displays
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        {Object.entries(tokens.font.size.display).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    style={{
                                        padding: '20px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: '16px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#374151',
                                                minWidth: '80px',
                                            }}
                                        >
                                            display.{sizeName}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '10px',
                                                color: '#6b7280',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily:
                                                tokens.font.family.display,
                                            color: '#111827',
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
                <div style={{ marginBottom: '32px' }}>
                    <h4
                        style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            marginBottom: '12px',
                            color: '#374151',
                        }}
                    >
                        Heading Scale
                    </h4>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        Used for section headers, page titles, and content
                        hierarchy
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        {Object.entries(tokens.font.size.heading).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    style={{
                                        padding: '16px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: '16px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#374151',
                                                minWidth: '80px',
                                            }}
                                        >
                                            heading.{sizeName}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '10px',
                                                color: '#6b7280',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily:
                                                tokens.font.family.heading,
                                            fontWeight: tokens.font.weight[600],
                                            color: '#111827',
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
                <div style={{ marginBottom: '32px' }}>
                    <h4
                        style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            marginBottom: '12px',
                            color: '#374151',
                        }}
                    >
                        Body Scale
                    </h4>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        Used for body text, descriptions, and readable content
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        {Object.entries(tokens.font.size.body).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    style={{
                                        padding: '16px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: '16px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#374151',
                                                minWidth: '60px',
                                            }}
                                        >
                                            body.{sizeName}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '10px',
                                                color: '#6b7280',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily: tokens.font.family.body,
                                            color: '#111827',
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
                <div style={{ marginBottom: '32px' }}>
                    <h4
                        style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            marginBottom: '12px',
                            color: '#374151',
                        }}
                    >
                        Code Scale
                    </h4>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        Used for code blocks, technical documentation, and
                        monospace content
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        {Object.entries(tokens.font.size.code).map(
                            ([sizeName, sizeProps]) => (
                                <div
                                    key={sizeName}
                                    style={{
                                        padding: '16px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        backgroundColor: '#f8fafc',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: '16px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#374151',
                                                minWidth: '60px',
                                            }}
                                        >
                                            code.{sizeName}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '10px',
                                                color: '#6b7280',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {sizeProps.fontSize}px /{' '}
                                            {sizeProps.lineHeight}px
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: `${sizeProps.fontSize}px`,
                                            lineHeight: `${sizeProps.lineHeight}px`,
                                            letterSpacing: `${sizeProps.letterSpacing}px`,
                                            fontFamily: tokens.font.family.mono,
                                            color: '#1f2937',
                                            backgroundColor: '#f1f5f9',
                                            padding: '8px 12px',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2
                style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
            >
                Unit Scale (Spacing)
            </h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                {Object.entries(tokens.unit).map(([unitName, unitValue]) => (
                    <div
                        key={unitName}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            padding: '12px 16px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <div
                            style={{
                                minWidth: '80px',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#374151',
                            }}
                        >
                            {unitName}
                        </div>
                        <div
                            style={{
                                fontSize: '12px',
                                color: '#6b7280',
                                fontFamily: 'monospace',
                                minWidth: '60px',
                            }}
                        >
                            {unitValue}
                        </div>
                        <div
                            style={{
                                height: '24px',
                                backgroundColor: '#3b82f6',
                                width:
                                    unitValue === 'auto' ? '100px' : unitValue,
                                borderRadius: '2px',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2
                style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
            >
                Shadow Scale
            </h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '20px',
                }}
            >
                {Object.entries(tokens.shadows).map(
                    ([shadowName, shadowValue]) => (
                        <div
                            key={shadowName}
                            style={{
                                padding: '24px',
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                boxShadow: shadowValue,
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#374151',
                                    marginBottom: '8px',
                                }}
                            >
                                {shadowName}
                            </div>
                            <div
                                style={{
                                    fontSize: '11px',
                                    color: '#6b7280',
                                    fontFamily: 'monospace',
                                    wordBreak: 'break-all',
                                    lineHeight: '1.4',
                                }}
                            >
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2
                style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
            >
                Border Radius Scale
            </h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '16px',
                }}
            >
                {Object.entries(tokens.border.radius).map(
                    ([radiusName, radiusValue]) => (
                        <div
                            key={radiusName}
                            style={{
                                padding: '20px',
                                backgroundColor: '#f3f4f6',
                                border: '2px solid #3b82f6',
                                borderRadius: radiusValue,
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#374151',
                                    marginBottom: '4px',
                                }}
                            >
                                {radiusName}
                            </div>
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#6b7280',
                                    fontFamily: 'monospace',
                                }}
                            >
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2
                style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
            >
                Opacity Scale
            </h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '16px',
                }}
            >
                {Object.entries(tokens.opacity).map(
                    ([opacityName, opacityValue]) => (
                        <div
                            key={opacityName}
                            style={{
                                position: 'relative',
                                padding: '20px',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '8px',
                                textAlign: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: '#3b82f6',
                                    opacity: opacityValue,
                                }}
                            />
                            <div
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#374151',
                                    marginBottom: '4px',
                                }}
                            >
                                {opacityName}
                            </div>
                            <div
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    fontSize: '12px',
                                    color: '#6b7280',
                                    fontFamily: 'monospace',
                                }}
                            >
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2
                style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
            >
                Border Width Scale
            </h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '16px',
                }}
            >
                {Object.entries(tokens.border.width).map(
                    ([widthName, widthValue]) => (
                        <div
                            key={widthName}
                            style={{
                                padding: '20px',
                                backgroundColor: '#ffffff',
                                border: `${widthValue} solid #3b82f6`,
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#374151',
                                    marginBottom: '4px',
                                }}
                            >
                                {widthName}
                            </div>
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#6b7280',
                                    fontFamily: 'monospace',
                                }}
                            >
                                {widthValue}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    ),
}

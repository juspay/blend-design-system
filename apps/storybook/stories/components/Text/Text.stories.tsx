import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import Text from '@juspay/blend-design-system/components/Text/Text'

const meta: Meta<typeof Text> = {
    title: 'Components/Text',
    component: Text,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A semantic text component with predefined typography variants based on the design system's type scale.

## Features
- Predefined typography variants (body, display, heading, code)
- Automatic semantic HTML tag mapping
- Support for custom semantic tags
- Font weight and color customization
- Text truncation support
- Token-based typography system

## Usage

\`\`\`tsx
import Text from '@juspay/blend-design-system/components/Text/Text';

<Text variant="heading.lg">
  Large Heading
</Text>

<Text variant="body.md" color="#666">
  Body text with custom color
</Text>
\`\`\`

## Accessibility
- Automatically uses semantic HTML tags based on variant
- Custom semantic tags can be specified with the \`as\` prop
- Maintains proper heading hierarchy
- Respects text color contrast requirements
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'body.xs',
                'body.sm',
                'body.md',
                'body.lg',
                'display.sm',
                'display.md',
                'display.lg',
                'display.xl',
                'heading.sm',
                'heading.md',
                'heading.lg',
                'heading.xl',
                'heading.2xl',
                'code.sm',
                'code.md',
                'code.lg',
            ],
            description:
                'Typography variant determining font size, line height, and semantic tag',
            table: {
                type: { summary: 'VariantType' },
                category: 'Appearance',
            },
        },
        as: {
            control: 'select',
            options: [
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'span',
                'code',
                'q',
                'small',
                'label',
            ],
            description:
                'Override the semantic HTML tag. Useful for maintaining visual style while changing markup',
            table: {
                type: { summary: 'SemanticTagType' },
                category: 'Semantics',
            },
        },
        children: {
            control: 'text',
            description: 'Text content to display',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Content',
            },
        },
        color: {
            control: 'color',
            description: 'Text color (CSS color value)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'inherit' },
                category: 'Appearance',
            },
        },
        fontWeight: {
            control: 'select',
            options: [
                'normal',
                'medium',
                'semibold',
                'bold',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
            ],
            description: 'Font weight override',
            table: {
                type: { summary: 'string | number' },
                category: 'Appearance',
            },
        },
        truncate: {
            control: 'boolean',
            description: 'Enable text truncation with ellipsis',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        style: {
            control: 'object',
            description: 'Additional CSS styles',
            table: {
                type: { summary: 'React.CSSProperties' },
                category: 'Styling',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

// Default story
export const Default: Story = {
    args: {
        variant: 'body.md',
        children: 'The quick brown fox jumps over the lazy dog',
    },
}

// Body Variants
export const BodyVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text variant="body.xs">
                Body Extra Small - The quick brown fox jumps over the lazy dog
            </Text>
            <Text variant="body.sm">
                Body Small - The quick brown fox jumps over the lazy dog
            </Text>
            <Text variant="body.md">
                Body Medium - The quick brown fox jumps over the lazy dog
            </Text>
            <Text variant="body.lg">
                Body Large - The quick brown fox jumps over the lazy dog
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Four body text sizes for different content densities and reading distances.',
            },
        },
    },
}

// Display Variants
export const DisplayVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Text variant="display.sm">Display Small</Text>
            <Text variant="display.md">Display Medium</Text>
            <Text variant="display.lg">Display Large</Text>
            <Text variant="display.xl">Display Extra Large</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Display text variants for hero sections and prominent headings. Automatically renders as h1 tags.',
            },
        },
    },
}

// Heading Variants
export const HeadingVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Text variant="heading.2xl">Heading 2XL (h1)</Text>
            <Text variant="heading.xl">Heading XL (h2)</Text>
            <Text variant="heading.lg">Heading Large (h3)</Text>
            <Text variant="heading.md">Heading Medium (h4)</Text>
            <Text variant="heading.sm">Heading Small (h5)</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Heading variants with automatic semantic tag mapping (h1-h5) for proper document structure.',
            },
        },
    },
}

// Code Variants
export const CodeVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Text variant="code.sm">const greeting = "Hello World";</Text>
            <Text variant="code.md">const greeting = "Hello World";</Text>
            <Text variant="code.lg">const greeting = "Hello World";</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Code text variants for inline code snippets with monospace font.',
            },
        },
    },
}

// Colors
export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Text variant="body.md" color="#000000">
                Black text
            </Text>
            <Text variant="body.md" color="#6B7280">
                Gray text
            </Text>
            <Text variant="body.md" color="#3B82F6">
                Blue text
            </Text>
            <Text variant="body.md" color="#10B981">
                Green text
            </Text>
            <Text variant="body.md" color="#EF4444">
                Red text
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Text color can be customized using the color prop with any valid CSS color value.',
            },
        },
    },
}

// Font Weights
export const FontWeights: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Text variant="body.md" fontWeight="normal">
                Normal weight (400)
            </Text>
            <Text variant="body.md" fontWeight="medium">
                Medium weight (500)
            </Text>
            <Text variant="body.md" fontWeight="semibold">
                Semibold weight (600)
            </Text>
            <Text variant="body.md" fontWeight="bold">
                Bold weight (700)
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Font weight can be customized for emphasis and hierarchy.',
            },
        },
    },
}

// Truncation
export const Truncation: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <div style={{ marginBottom: '8px', fontWeight: 600 }}>
                    Normal (no truncation)
                </div>
                <div
                    style={{
                        maxWidth: '300px',
                        border: '1px solid #e5e7eb',
                        padding: '12px',
                        borderRadius: '8px',
                    }}
                >
                    <Text variant="body.md">
                        This is a very long text that will wrap normally across
                        multiple lines when the container is too narrow to fit
                        it all on one line.
                    </Text>
                </div>
            </div>
            <div>
                <div style={{ marginBottom: '8px', fontWeight: 600 }}>
                    With truncation
                </div>
                <div
                    style={{
                        maxWidth: '300px',
                        border: '1px solid #e5e7eb',
                        padding: '12px',
                        borderRadius: '8px',
                    }}
                >
                    <Text variant="body.md" truncate>
                        This is a very long text that will be truncated with an
                        ellipsis when the container is too narrow to fit it all
                        on one line.
                    </Text>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The truncate prop enables text overflow with ellipsis for single-line text.',
            },
        },
    },
}

// Semantic Tags
export const SemanticTags: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Text variant="heading.lg" as="h1">
                Heading variant as h1
            </Text>
            <Text variant="body.md" as="label">
                Body variant as label
            </Text>
            <Text variant="code.md" as="code">
                Code variant as code tag
            </Text>
            <Text variant="body.sm" as="span">
                Body variant as span (inline)
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Override the default semantic HTML tag while maintaining visual style using the as prop.',
            },
        },
    },
}

// Without Variant (Primitive Mode)
export const WithoutVariant: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Text fontSize={24} fontWeight="bold" color="#1F2937">
                Custom font size and weight
            </Text>
            <Text fontSize={16} color="#6B7280">
                Custom styling without variant
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'When no variant is provided, Text acts as a primitive component accepting direct font properties.',
            },
        },
    },
}

// Use Cases
export const UseCases: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <Text variant="heading.2xl" style={{ marginBottom: '8px' }}>
                    Article Title
                </Text>
                <Text variant="body.sm" color="#6B7280">
                    By John Doe • 5 min read
                </Text>
                <Text variant="body.md" style={{ marginTop: '16px' }}>
                    This is a sample article demonstrating different text
                    variants working together to create a clear content
                    hierarchy.
                </Text>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                <Text variant="heading.lg" style={{ marginBottom: '16px' }}>
                    Product Card
                </Text>
                <Text variant="heading.md" style={{ marginBottom: '8px' }}>
                    Premium Headphones
                </Text>
                <Text
                    variant="body.md"
                    color="#6B7280"
                    style={{ marginBottom: '12px' }}
                >
                    High-quality wireless headphones with active noise
                    cancellation
                </Text>
                <Text variant="heading.xl" fontWeight="bold" color="#10B981">
                    $299.99
                </Text>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Real-world examples showing how different text variants work together in common UI patterns.',
            },
        },
    },
}

// Interactive Playground
export const Interactive: Story = {
    args: {
        variant: 'body.md',
        children: 'Customize me using the controls!',
        color: '#000000',
        fontWeight: 'normal',
        truncate: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all Text props using the controls panel.',
            },
        },
    },
}

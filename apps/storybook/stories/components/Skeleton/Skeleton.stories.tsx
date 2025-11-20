import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState, useEffect } from 'react'
import {
    Skeleton,
    SkeletonAvatar,
    SkeletonCard,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'

const meta: Meta<typeof Skeleton> = {
    title: 'Components/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A versatile skeleton loader component for indicating loading states and improving perceived performance.

## Features
- Three animation variants (pulse, wave, shimmer)
- Multiple shapes (rectangle, circle, rounded)
- Specialized variants (SkeletonAvatar, SkeletonCard)
- Customizable dimensions and styling
- Loading state management
- Token-based styling system
- Accessibility support with ARIA attributes

## Variants
- **Skeleton**: Basic skeleton with custom dimensions and shapes
- **SkeletonAvatar**: Pre-styled for avatar placeholders
- **SkeletonCard**: Container with multiple skeleton elements

## Usage

\`\`\`tsx
import { Skeleton, SkeletonAvatar } from '@juspay/blend-design-system';

// Basic skeleton
<Skeleton
  width="200px"
  height="20px"
  variant="pulse"
  loading={true}
>
  <YourContent />
</Skeleton>

// Avatar skeleton
<SkeletonAvatar
  size="md"
  shape="circle"
  loading={true}
/>
\`\`\`

## Accessibility
- ARIA live regions for screen reader announcements
- Proper loading state communication
- Semantic HTML structure
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['pulse', 'wave', 'shimmer'],
            description:
                'Animation variant for the skeleton. PULSE for opacity fade, WAVE for sliding effect, SHIMMER for gradient sweep.',
            table: {
                type: { summary: "'pulse' | 'wave' | 'shimmer'" },
                defaultValue: { summary: 'pulse' },
                category: 'Appearance',
            },
        },
        shape: {
            control: 'select',
            options: ['rectangle', 'circle', 'rounded'],
            description:
                'Shape of the skeleton. RECTANGLE for sharp corners, CIRCLE for perfect round, ROUNDED for soft corners.',
            table: {
                type: { summary: "'rectangle' | 'circle' | 'rounded'" },
                defaultValue: { summary: 'rectangle' },
                category: 'Appearance',
            },
        },
        loading: {
            control: 'boolean',
            description:
                'Whether to show skeleton (true) or actual content (false).',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'State',
            },
        },
        animate: {
            control: 'boolean',
            description: 'Whether to animate the skeleton.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Appearance',
            },
        },
        width: {
            control: 'text',
            description: 'Width of the skeleton (CSS value or number in px).',
            table: {
                type: { summary: 'string | number' },
                category: 'Layout',
            },
        },
        height: {
            control: 'text',
            description: 'Height of the skeleton (CSS value or number in px).',
            table: {
                type: { summary: 'string | number' },
                category: 'Layout',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

// Default
export const Default: Story = {
    args: {
        width: '200px',
        height: '20px',
        variant: 'pulse',
        shape: 'rectangle',
        loading: true,
        animate: true,
    },
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Animation Variants
export const AnimationVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Pulse
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Gentle opacity fade animation
                </p>
                <Skeleton width="100%" height="40px" variant="pulse" />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Wave
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Sliding wave effect across the skeleton
                </p>
                <Skeleton width="100%" height="40px" variant="wave" />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Shimmer
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Gradient sweep animation
                </p>
                <Skeleton width="100%" height="40px" variant="shimmer" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Three animation variants: pulse (opacity fade), wave (sliding effect), and shimmer (gradient sweep).',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Shapes
export const Shapes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <Skeleton width="100px" height="100px" shape="rectangle" />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Rectangle
                </p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Skeleton width="100px" height="100px" shape="rounded" />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Rounded
                </p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Skeleton width="100px" height="100px" shape="circle" />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Circle
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different shapes for various UI elements: rectangle (sharp corners), rounded (soft corners), circle (perfect round).',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Avatar Skeletons
export const AvatarSkeletons: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <SkeletonAvatar size="sm" shape="circle" />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    Small Circle
                </p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <SkeletonAvatar size="md" shape="circle" />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    Medium Circle
                </p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <SkeletonAvatar size="lg" shape="circle" />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    Large Circle
                </p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <SkeletonAvatar size="md" shape="square" />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    Medium Square
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Pre-styled avatar skeletons in multiple sizes and shapes. Perfect for user profile placeholders.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Loading State Toggle
export const LoadingStateToggle: Story = {
    render: () => {
        const [loading, setLoading] = useState(true)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Button
                    text={loading ? 'Show Content' : 'Show Skeleton'}
                    buttonType={ButtonType.PRIMARY}
                    onClick={() => setLoading(!loading)}
                    size="md"
                />

                <Skeleton
                    width="100%"
                    height="100px"
                    variant="wave"
                    loading={loading}
                >
                    <div
                        style={{
                            padding: '16px',
                            background: '#f0f9ff',
                            borderRadius: '8px',
                            border: '1px solid #bfdbfe',
                        }}
                    >
                        <h3 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>
                            Content Loaded!
                        </h3>
                        <p style={{ margin: 0, color: '#1e40af' }}>
                            This content was hidden behind the skeleton while
                            loading.
                        </p>
                    </div>
                </Skeleton>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Toggle between skeleton and actual content. When loading=true, shows skeleton; when loading=false, shows children.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Card Skeleton
export const CardSkeleton: Story = {
    render: () => (
        <div style={{ maxWidth: '400px' }}>
            <SkeletonCard padding="16px">
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '16px',
                    }}
                >
                    <SkeletonAvatar size="md" shape="circle" />
                    <div style={{ flex: 1 }}>
                        <Skeleton
                            width="60%"
                            height="16px"
                            marginBottom="8px"
                        />
                        <Skeleton width="40%" height="14px" />
                    </div>
                </div>

                <Skeleton width="100%" height="200px" marginBottom="16px" />

                <Skeleton width="100%" height="12px" marginBottom="8px" />
                <Skeleton width="90%" height="12px" marginBottom="8px" />
                <Skeleton width="70%" height="12px" />
            </SkeletonCard>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Composite card skeleton with avatar, image, and text placeholders. Perfect for social media posts, blog cards, or product listings.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Text Skeletons
export const TextSkeletons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Heading
                </h4>
                <Skeleton width="60%" height="32px" variant="pulse" />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Paragraph
                </h4>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    <Skeleton width="100%" height="16px" variant="wave" />
                    <Skeleton width="95%" height="16px" variant="wave" />
                    <Skeleton width="80%" height="16px" variant="wave" />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    List Items
                </h4>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton
                                width="24px"
                                height="24px"
                                shape="circle"
                            />
                            <Skeleton width="200px" height="16px" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Text skeleton patterns for headings, paragraphs, and list items with appropriate sizing and spacing.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Simulated Loading
export const SimulatedLoading: Story = {
    render: () => {
        const [loading, setLoading] = useState(true)
        const [data, setData] = useState<string | null>(null)

        const loadData = () => {
            setLoading(true)
            setData(null)

            setTimeout(() => {
                setData('Data loaded successfully!')
                setLoading(false)
            }, 2000)
        }

        useEffect(() => {
            loadData()
        }, [])

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Button
                    text="Reload Data"
                    buttonType={ButtonType.SECONDARY}
                    onClick={loadData}
                />

                <div
                    style={{
                        maxWidth: '400px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                    }}
                >
                    <Skeleton
                        width="100%"
                        height="120px"
                        variant="shimmer"
                        loading={loading}
                    >
                        <div
                            style={{
                                padding: '16px',
                                background: '#f0fdf4',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#16a34a',
                                    margin: 0,
                                }}
                            >
                                {data}
                            </p>
                        </div>
                    </Skeleton>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Simulated data loading with 2-second delay. Shows skeleton while loading, then displays content. Click "Reload Data" to see the transition again.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Use Cases
export const UseCases: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Profile Card Loading
                </h4>
                <div
                    style={{
                        maxWidth: '300px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <SkeletonAvatar size="lg" shape="circle" />
                        <Skeleton width="150px" height="20px" />
                        <Skeleton width="100px" height="14px" />
                    </div>
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Table Row Loading
                </h4>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '60px 1fr 100px 80px',
                                gap: '16px',
                                alignItems: 'center',
                                padding: '12px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                            }}
                        >
                            <Skeleton
                                width="40px"
                                height="40px"
                                shape="circle"
                            />
                            <Skeleton width="100%" height="16px" />
                            <Skeleton width="100%" height="16px" />
                            <Skeleton width="100%" height="16px" />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Form Loading
                </h4>
                <div
                    style={{
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Skeleton width="100px" height="14px" />
                    <Skeleton width="100%" height="40px" shape="rounded" />
                    <Skeleton width="100px" height="14px" />
                    <Skeleton width="100%" height="40px" shape="rounded" />
                    <Skeleton width="120px" height="40px" shape="rounded" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common use cases: profile cards, table rows, and form inputs. Demonstrates how to compose skeletons for complex layouts.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Live Regions
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Skeleton components include ARIA live regions to announce
                    loading states to screen readers. When content finishes
                    loading, screen readers will announce the change.
                </p>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Color Contrast
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Skeleton backgrounds maintain sufficient contrast with the
                    page background to be visible to users with low vision.
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Skeleton width="100px" height="100px" variant="pulse" />
                    <Skeleton width="100px" height="100px" variant="wave" />
                    <Skeleton width="100px" height="100px" variant="shimmer" />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Reduced Motion
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Animations respect the user's prefers-reduced-motion
                    setting. Users who prefer reduced motion will see static
                    skeletons without animation.
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility features including ARIA live regions, color contrast, and reduced motion support. Complies with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                ],
            },
        },
    },
}

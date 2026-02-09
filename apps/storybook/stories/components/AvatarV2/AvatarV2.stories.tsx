import type { Meta, StoryObj } from '@storybook/react'
import {
    AvatarV2,
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
} from '../../../../../packages/blend/lib/components/AvatarV2'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { Mail, Settings } from 'lucide-react'

const meta: Meta<typeof AvatarV2> = {
    title: 'Components/AvatarV2',
    component: AvatarV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Avatar component for displaying user images, initials, or icons.

## Features
- Image display with automatic fallback
- Automatic initials generation from text
- Multiple sizes (XS, SM, MD, LG, XL, XXL)
- Multiple shapes (Circle, Rounded, Square)
- Status indicators (Online, Offline, Away, Busy)
- Loading skeleton state
- Leading/trailing slots for additional content
- Full keyboard navigation support
- Accessible by default
- Dark/light theme support

## Usage

\`\`\`tsx
import { AvatarV2, AvatarV2Size, AvatarV2Status } from '@juspay/blend-design-system';

<AvatarV2 src="/avatar.jpg" alt="John Doe" />
<AvatarV2 alt="Jane Smith" status={{ type: AvatarV2Status.ONLINE }} />
<AvatarV2 size={AvatarV2Size.LG} shape={AvatarV2Shape.ROUNDED} />
\`\`\`
                `,
            },
        },
    },
    args: {
        size: AvatarV2Size.MD,
        shape: AvatarV2Shape.CIRCLE,
        alt: 'User Avatar',
    },
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(AvatarV2Size),
            description: 'Size of the avatar',
        },
        shape: {
            control: 'select',
            options: Object.values(AvatarV2Shape),
            description: 'Shape of the avatar',
        },
        src: {
            control: 'text',
            description: 'Image source URL',
        },
        alt: {
            control: 'text',
            description:
                'Alt text for the image (used for accessibility and fallback initials)',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the avatar is disabled',
        },
        backgroundColor: {
            control: 'color',
            description: 'Custom background color for fallback',
        },
        status: {
            control: 'object',
            description: 'Status indicator configuration',
        },
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AvatarV2>

export const Default: Story = {}

export const WithSlots: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <AvatarV2 alt="John Doe" leadingSlot={<Mail size={16} />} />
            <AvatarV2 alt="Jane Smith" trailingSlot={<Settings size={16} />} />
            <AvatarV2
                alt="Bob Johnson"
                leadingSlot={<Mail size={16} />}
                trailingSlot={<Settings size={16} />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatars with leading and trailing slots.',
            },
        },
    },
}

export const Visual: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
                <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
                    All Sizes with Status
                </h3>
                <div
                    style={{
                        display: 'flex',
                        gap: 24,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {Object.values(AvatarV2Size).map((size) => (
                        <AvatarV2
                            key={size}
                            alt={`Size ${size}`}
                            size={size}
                            status={{ type: AvatarV2Status.ONLINE }}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
                    All Shapes
                </h3>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    {Object.values(AvatarV2Shape).map((shape) => (
                        <AvatarV2
                            key={shape}
                            alt={`Shape ${shape}`}
                            shape={shape}
                            status={{ type: AvatarV2Status.ONLINE }}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
                    All Status Types
                </h3>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    {Object.values(AvatarV2Status)
                        .filter((status) => status !== AvatarV2Status.NONE)
                        .map((status) => (
                            <AvatarV2
                                key={status}
                                alt={`Status ${status}`}
                                status={{ type: status }}
                            />
                        ))}
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Visual examples for visual regression testing.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 300,
        },
    },
}

export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                maxWidth: 600,
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Keyboard Navigation
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Interactive avatars support keyboard navigation. Tab to
                    focus, then press Enter or Space to activate.
                </p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <AvatarV2 alt="Keyboard Accessible" onClick={() => {}} />
                    <AvatarV2 alt="Press Enter" onClick={() => {}} />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Screen Reader Support
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Avatars have proper ARIA attributes including aria-label
                    with status information for screen readers.
                </p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <AvatarV2
                        alt="John Doe"
                        status={{ type: AvatarV2Status.ONLINE }}
                    />
                    <AvatarV2
                        alt="Jane Smith"
                        status={{ type: AvatarV2Status.AWAY }}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Disabled State
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Disabled avatars are properly marked and cannot be
                    interacted with via keyboard or mouse.
                </p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <AvatarV2 alt="Enabled Avatar" onClick={() => {}} />
                    <AvatarV2
                        alt="Disabled Avatar"
                        onClick={() => {}}
                        disabled
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        a11y: getA11yConfig('interactive'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
        docs: {
            description: {
                story: `
Accessibility examples demonstrating:

- Keyboard navigation (Tab, Enter, Space)
- ARIA attributes (aria-label, aria-live)
- Screen reader support
- Disabled state handling

Use with Storybook a11y panel and screen readers (VoiceOver, NVDA) to validate behavior.
                `,
            },
        },
    },
}

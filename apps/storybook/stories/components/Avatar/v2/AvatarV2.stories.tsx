import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { fn } from '@storybook/test'
import { expect, userEvent, within } from '@storybook/test'
import {
    AvatarV2,
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition,
} from '../../../../../../packages/blend/lib/components/AvatarV2'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { Mail, Settings } from 'lucide-react'

const meta: Meta<typeof AvatarV2> = {
    title: 'Components/AvatarV2',
    component: AvatarV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Avatar component for displaying user images, initials, or icons.',
        docs: {
            description: {
                component: `
## Features
- Image display with automatic fallback
- Automatic initials generation from text
- Multiple sizes (SM, REGULAR, MD, LG, XL)
- Multiple shapes (CIRCULAR, ROUNDED)
- Status indicators (Online, Offline, Away, Busy)
- Loading skeleton state
- Left/right slots for additional content
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
        shape: AvatarV2Shape.CIRCULAR,
        alt: 'User Avatar',
        onClick: fn(),
        onImageError: fn(),
        onImageLoad: fn(),
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
        fallbackText: {
            control: 'text',
            description:
                'Custom fallback text (overrides auto-generated initials)',
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
        leftSlot: {
            control: false,
            description: 'Left slot content (ReactElement)',
        },
        rightSlot: {
            control: false,
            description: 'Right slot content (ReactElement)',
        },
        skeleton: {
            control: 'object',
            description: 'Skeleton loading state configuration',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler for interactive avatars',
        },
        onImageError: {
            action: 'image-error',
            description: 'Error handler when image fails to load',
        },
        onImageLoad: {
            action: 'image-loaded',
            description: 'Load handler when image successfully loads',
        },
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AvatarV2>

export const Default: Story = {}

export const WithSlots: Story = {
    render: () => (
        <div className="flex gap-4 items-center">
            <AvatarV2 alt="John Doe" leftSlot={<Mail size={16} />} />
            <AvatarV2 alt="Jane Smith" rightSlot={<Settings size={16} />} />
            <AvatarV2
                alt="Bob Johnson"
                leftSlot={<Mail size={16} />}
                rightSlot={<Settings size={16} />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Avatars with left and right slots.',
            },
        },
    },
}

export const Visual: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    All Sizes with Status
                </h3>
                <div className="flex gap-6 items-center flex-wrap">
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
                <h3 className="mb-4 text-base font-semibold">All Shapes</h3>
                <div className="flex gap-6 items-center">
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
                <h3 className="mb-4 text-base font-semibold">
                    All Status Types
                </h3>
                <div className="flex gap-6 items-center">
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
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Status Positions
                </h3>
                <div className="flex gap-6 items-center">
                    {Object.values(AvatarV2StatusPosition).map((position) => (
                        <AvatarV2
                            key={position}
                            alt={`Position ${position}`}
                            status={{
                                type: AvatarV2Status.ONLINE,
                                position,
                            }}
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

export const Interactive: Story = {
    args: {
        alt: 'Clickable Avatar',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const avatar = canvas.getByRole('img', { name: /clickable avatar/i })

        // Test mouse click
        await userEvent.click(avatar)
        await expect(args.onClick).toHaveBeenCalledTimes(1)

        // Test keyboard interaction - Tab to focus
        avatar.focus()
        await expect(avatar).toHaveFocus()

        // Test Enter key
        await userEvent.keyboard('{Enter}')
        await expect(args.onClick).toHaveBeenCalledTimes(2)

        // Test Space key
        await userEvent.keyboard(' ')
        await expect(args.onClick).toHaveBeenCalledTimes(3)
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive avatar with click handler. Click the avatar or use keyboard (Tab + Enter/Space) to see the interaction. Check the Actions panel to see logged events.',
            },
        },
    },
}

export const WithImageHandlers: Story = {
    args: {
        src: 'https://via.placeholder.com/64',
        alt: 'Test Avatar',
        onImageError: fn(),
        onImageLoad: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar with image load and error handlers. Check the Actions panel to see when image loads or errors occur.',
            },
        },
    },
}

export const DisabledInteractive: Story = {
    args: {
        alt: 'Disabled Avatar',
        disabled: true,
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const avatar = canvas.getByRole('img', { name: /disabled avatar/i })

        const tabIndex = avatar.getAttribute('tabIndex')
        await expect(tabIndex).toBe('-1')

        await userEvent.click(avatar)
        await expect(args.onClick).not.toHaveBeenCalled()
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled avatar that cannot be interacted with. Click events and keyboard navigation are disabled. Check the Actions panel to verify onClick is not called.',
            },
        },
    },
}

export const Accessibility: Story = {
    render: () => (
        <div className="flex flex-col gap-6 max-w-150">
            <div>
                <h3 className="mb-2 text-base font-bold">
                    Keyboard Navigation
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                    Interactive avatars support keyboard navigation. Tab to
                    focus, then press Enter or Space to activate.
                </p>
                <div className="flex gap-4 items-center">
                    <AvatarV2 alt="Keyboard Accessible" onClick={fn()} />
                    <AvatarV2 alt="Press Enter" onClick={fn()} />
                </div>
            </div>

            <div>
                <h3 className="mb-2 text-base font-bold">
                    Screen Reader Support
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                    Avatars have proper ARIA attributes including aria-label
                    with status information for screen readers.
                </p>
                <div className="flex gap-4 items-center">
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
                <h3 className="mb-2 text-base font-bold">Disabled State</h3>
                <p className="mb-3 text-sm text-gray-500">
                    Disabled avatars are properly marked and cannot be
                    interacted with via keyboard or mouse.
                </p>
                <div className="flex gap-4 items-center">
                    <AvatarV2 alt="Enabled Avatar" onClick={fn()} />
                    <AvatarV2 alt="Disabled Avatar" onClick={fn()} disabled />
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

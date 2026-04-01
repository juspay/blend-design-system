import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { fn } from '@storybook/test'
import { expect, userEvent, within } from '@storybook/test'
import { Home, Settings, HelpCircle, Users, Plus, Bell } from 'lucide-react'
import { SidebarV2 } from '../../../../../packages/blend/lib/components/SidebarV2'
import type {
    SecondarySidebarInfo,
    SidebarV2Props,
} from '../../../../../packages/blend/lib/components/SidebarV2'
import type { DirectoryData } from '../../../../../packages/blend/lib/components/Directory/types'
import ThemeProvider from '../../../../../packages/blend/lib/context/ThemeProvider'
import { Theme } from '../../../../../packages/blend/lib/context'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { Button } from '../../../../../packages/blend/lib/components/Button'

const sampleData: DirectoryData[] = [
    {
        label: 'General',
        isCollapsible: false,
        items: [
            {
                label: 'Home',
                leftSlot: <Home aria-hidden="true" />,
                showOnMobile: true,
                onClick: fn(),
            },
            {
                label: 'Team',
                leftSlot: <Users aria-hidden="true" />,
                showOnMobile: true,
                items: [
                    { label: 'Members', onClick: fn(), showOnMobile: true },
                    { label: 'Invites', onClick: fn(), showOnMobile: true },
                ],
            },
            {
                label: 'Settings with a very long label that should truncate',
                leftSlot: <Settings aria-hidden="true" />,
                showOnMobile: true,
                onClick: fn(),
            },
        ],
    },
]

const buildSecondarySidebar = (
    selected: string,
    onSelect: (value: string) => void
): SecondarySidebarInfo => ({
    selected,
    onSelect,
    items: [
        { label: 'Tenant A', value: 'tenant-a', icon: <Home aria-hidden /> },
        { label: 'Tenant B', value: 'tenant-b', icon: <Users aria-hidden /> },
    ],
    footerSlot: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button type="button" onClick={fn()}>
                <HelpCircle aria-hidden />
            </button>
            <button type="button" onClick={fn()}>
                <Settings aria-hidden />
            </button>
        </div>
    ),
})

const meta: Meta<typeof SidebarV2> = {
    title: 'Components/SidebarV2',
    component: SidebarV2,
    parameters: {
        layout: 'fullscreen',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
SidebarV2 provides a token-driven, responsive sidebar layout with optional secondary rail, integrated TopbarV2, and mobile bottom navigation.

## Features
- Controlled/uncontrolled expand state
- Optional secondary sidebar rail via \`secondarySidebar\`
- Mobile navigation dock derived from \`DirectoryData[].items[].showOnMobile\`
- Safe handling of \`data={null}\` (renders empty nav)
- Single-line truncation with TooltipV2 for long labels
- Full keyboard navigation support
- Accessible by default
- Dark/light theme support

## Usage

\`\`\`tsx
import { SidebarV2 } from '@juspay/blend-design-system';

<SidebarV2
  data={directoryData}
  secondarySidebar={secondarySidebarConfig}
>
  <MainContent />
</SidebarV2>
\`\`\`
                `,
            },
        },
    },
    args: {
        height: '100dvh',
        data: sampleData,
        sidebarCollapseKey: '/',
        defaultIsExpanded: true,
        showPrimaryActionButton: true,
        primaryActionButtonProps: { onClick: fn(), 'aria-label': 'Create' },
        onSidebarStateChange: fn(),
    } satisfies Partial<SidebarV2Props>,
    argTypes: {
        data: {
            control: 'object',
            description: 'Directory data rendered as navigation.',
        },
        secondarySidebar: {
            control: false,
            description:
                'Secondary rail configuration (items + footerSlot). Use stories below for examples.',
        },
        isExpanded: {
            control: 'boolean',
            description: 'Controlled expanded state (when provided).',
        },
        defaultIsExpanded: {
            control: 'boolean',
            description: 'Uncontrolled initial expanded state.',
        },
        onExpandedChange: {
            action: 'expanded-change',
            description: 'Called when expanded state changes.',
        },
    },
    decorators: [
        (Story) => (
            <ThemeProvider theme={Theme.LIGHT}>
                <div style={{ height: '100dvh' }}>
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SidebarV2>

export const Default: Story = {
    args: {
        secondarySidebar: buildSecondarySidebar('tenant-a', fn()),
    },
    render: (args) => (
        <SidebarV2 {...args}>
            <div style={{ padding: 16 }}>Main content</div>
        </SidebarV2>
    ),
}

export const CollapsedIconOnly: Story = {
    args: {
        secondarySidebar: buildSecondarySidebar('tenant-a', fn()),
        defaultIsExpanded: false,
    },
    render: (args) => (
        <SidebarV2 {...args}>
            <div style={{ padding: 16 }}>Main content</div>
        </SidebarV2>
    ),
}

export const ControlledExpanded: Story = {
    args: {
        secondarySidebar: buildSecondarySidebar('tenant-a', fn()),
    },
    render: (args) => {
        const [isExpanded, setIsExpanded] = useState(true)
        return (
            <SidebarV2
                {...args}
                isExpanded={isExpanded}
                onExpandedChange={setIsExpanded}
            >
                <div style={{ padding: 16 }}>
                    <button
                        type="button"
                        onClick={() => setIsExpanded((v) => !v)}
                    >
                        Toggle expanded
                    </button>
                </div>
            </SidebarV2>
        )
    },
}

export const NullData: Story = {
    args: {
        data: null,
        secondarySidebar: buildSecondarySidebar('tenant-a', fn()),
    },
    render: (args) => (
        <SidebarV2 {...args}>
            <div style={{ padding: 16 }}>Main content</div>
        </SidebarV2>
    ),
}

export const Visual: Story = {
    render: function VisualRender() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 32,
                    padding: 24,
                }}
            >
                <div>
                    <h3
                        style={{
                            marginBottom: 16,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Expanded vs Collapsed
                    </h3>
                    <div style={{ display: 'flex', gap: 24, height: 300 }}>
                        <div
                            style={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                        >
                            <SidebarV2
                                height="100%"
                                data={sampleData}
                                defaultIsExpanded={true}
                                secondarySidebar={buildSecondarySidebar(
                                    'tenant-a',
                                    fn()
                                )}
                            >
                                <div style={{ padding: 16 }}>Expanded</div>
                            </SidebarV2>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                        >
                            <SidebarV2
                                height="100%"
                                data={sampleData}
                                defaultIsExpanded={false}
                                secondarySidebar={buildSecondarySidebar(
                                    'tenant-a',
                                    fn()
                                )}
                            >
                                <div style={{ padding: 16 }}>Collapsed</div>
                            </SidebarV2>
                        </div>
                    </div>
                </div>

                <div>
                    <h3
                        style={{
                            marginBottom: 16,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        With and without Secondary Sidebar
                    </h3>
                    <div style={{ display: 'flex', gap: 24, height: 300 }}>
                        <div
                            style={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                        >
                            <SidebarV2
                                height="100%"
                                data={sampleData}
                                defaultIsExpanded={true}
                                secondarySidebar={buildSecondarySidebar(
                                    'tenant-a',
                                    fn()
                                )}
                            >
                                <div style={{ padding: 16 }}>
                                    With Secondary
                                </div>
                            </SidebarV2>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                        >
                            <SidebarV2
                                height="100%"
                                data={sampleData}
                                defaultIsExpanded={true}
                            >
                                <div style={{ padding: 16 }}>
                                    Without Secondary
                                </div>
                            </SidebarV2>
                        </div>
                    </div>
                </div>

                <div>
                    <h3
                        style={{
                            marginBottom: 16,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Different Height Configurations
                    </h3>
                    <div style={{ display: 'flex', gap: 24, height: 200 }}>
                        <div
                            style={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                        >
                            <SidebarV2
                                height="100%"
                                data={sampleData}
                                defaultIsExpanded={true}
                            >
                                <div style={{ padding: 16 }}>Full height</div>
                            </SidebarV2>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Visual reference showing different SidebarV2 configurations including expanded/collapsed states and secondary sidebar variations.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 400,
        },
    },
}

export const Interactive: Story = {
    render: function InteractiveRender(args) {
        const [isExpanded, setIsExpanded] = useState(true)
        const [activeItem, setActiveItem] = useState<string | null>(null)

        const interactiveData: DirectoryData[] = [
            {
                label: 'Actions',
                isCollapsible: false,
                items: [
                    {
                        label: 'Home',
                        leftSlot: <Home aria-hidden="true" />,
                        showOnMobile: true,
                        onClick: () => setActiveItem('Home'),
                    },
                    {
                        label: 'Settings',
                        leftSlot: <Settings aria-hidden="true" />,
                        showOnMobile: true,
                        onClick: () => setActiveItem('Settings'),
                    },
                ],
            },
        ]

        return (
            <SidebarV2
                {...args}
                data={interactiveData}
                isExpanded={isExpanded}
                onExpandedChange={setIsExpanded}
                activeItem={activeItem}
                onActiveItemChange={setActiveItem}
            >
                <div style={{ padding: 24 }}>
                    <h3>Interactive Sidebar</h3>
                    <p>Click items in the sidebar to see state changes.</p>
                    <div
                        style={{
                            marginTop: 16,
                            padding: 16,
                            background: '#f5f5f5',
                            borderRadius: 8,
                        }}
                    >
                        <p>
                            <strong>Current State:</strong>
                        </p>
                        <p>Expanded: {isExpanded ? 'Yes' : 'No'}</p>
                        <p>Active Item: {activeItem || 'None'}</p>
                    </div>
                    <Button
                        style={{ marginTop: 16 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        Toggle Sidebar
                    </Button>
                </div>
            </SidebarV2>
        )
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)

        // Find and click the collapse button
        const toggleButton = canvas.getByRole('button', { name: /collapse/i })
        await userEvent.click(toggleButton)

        // Verify onExpandedChange was called
        await expect(args.onExpandedChange).toHaveBeenCalled()

        // Find and click a menu item
        const homeItem = await canvas.findByText('Home')
        await userEvent.click(homeItem)
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive sidebar with state management. Click items to see active state changes, or use the toggle button to expand/collapse.',
            },
        },
    },
}

export const Accessibility: Story = {
    render: () => (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 24 }}>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Keyboard Navigation
                </h3>
                <p style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
                    SidebarV2 supports full keyboard navigation. Use Tab to
                    navigate, Enter/Space to activate items, and Arrow keys for
                    menu navigation.
                </p>
                <div
                    style={{
                        height: 300,
                        border: '1px solid #e0e0e0',
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}
                >
                    <SidebarV2
                        height="100%"
                        data={sampleData}
                        defaultIsExpanded={true}
                        secondarySidebar={buildSecondarySidebar(
                            'tenant-a',
                            fn()
                        )}
                    >
                        <div style={{ padding: 16 }}>
                            Try navigating with keyboard!
                        </div>
                    </SidebarV2>
                </div>
            </div>

            <div style={{ marginBottom: 24 }}>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Screen Reader Support
                </h3>
                <p style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
                    Proper ARIA attributes including aria-expanded, aria-label,
                    and aria-controls for sidebar sections.
                </p>
                <div
                    style={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}
                >
                    <SidebarV2
                        height="100%"
                        data={sampleData}
                        defaultIsExpanded={true}
                    >
                        <div style={{ padding: 16 }}>
                            Screen reader accessible content
                        </div>
                    </SidebarV2>
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
                    Collapsed State Accessibility
                </h3>
                <p style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
                    When collapsed, tooltips provide accessible labels for
                    icon-only items.
                </p>
                <div
                    style={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}
                >
                    <SidebarV2
                        height="100%"
                        data={sampleData}
                        defaultIsExpanded={false}
                    >
                        <div style={{ padding: 16 }}>
                            Collapsed with tooltips
                        </div>
                    </SidebarV2>
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

- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- ARIA attributes (aria-expanded, aria-label, aria-controls)
- Screen reader support
- Tooltip accessibility in icon-only mode
- Focus management

Use with Storybook a11y panel and screen readers (VoiceOver, NVDA) to validate behavior.
                `,
            },
        },
    },
}

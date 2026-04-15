import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { fn } from '@storybook/test'
import { expect, userEvent, within, waitFor } from '@storybook/test'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
    TabsV2Variant,
    TabsV2Size,
} from '../../../../../packages/blend/lib/components/TabsV2'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { Home, Settings, User, Info } from 'lucide-react'

const meta: Meta<typeof TabsV2> = {
    title: 'Components/TabsV2',
    component: TabsV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('navigation'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Tabs component for organizing content into separate views.

## Features
- Multiple variants: UNDERLINE, BOXED, FLOATING, PILLS
- Two sizes: MD and LG
- Sticky header support with theme-aware background
- Closeable tabs with X button
- Left/right icon slots
- Skeleton loading state
- Full keyboard navigation (Arrow keys, Tab, Enter/Space)
- Accessible by default with ARIA attributes
- Light/dark theme support
- Responsive tokens

## Usage

\`\`\`tsx
import { TabsV2, TabsV2List, TabsV2Trigger, TabsV2Content } from '@juspay/blend-design-system';

<TabsV2 defaultValue="tab1">
    <TabsV2List>
        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
    </TabsV2List>
    <TabsV2Content value="tab1">Content 1</TabsV2Content>
    <TabsV2Content value="tab2">Content 2</TabsV2Content>
</TabsV2>
\`\`\`
                `,
            },
        },
    },
    args: {
        variant: TabsV2Variant.UNDERLINE,
        size: TabsV2Size.MD,
        expanded: false,
        fitContent: false,
        disabled: false,
        showSkeleton: false,
        skeletonVariant: 'pulse',
        stickyHeader: false,
        offsetTop: 0,
        onValueChange: fn(),
    },
    argTypes: {
        variant: {
            control: 'select',
            options: Object.values(TabsV2Variant),
            description: 'Visual style of the tabs',
        },
        size: {
            control: 'select',
            options: Object.values(TabsV2Size),
            description: 'Size of the tabs (MD or LG)',
        },
        expanded: {
            control: 'boolean',
            description: 'Expand tabs to fill available width',
        },
        fitContent: {
            control: 'boolean',
            description: 'Shrink tabs to fit their content width',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable all tabs',
        },
        showSkeleton: {
            control: 'boolean',
            description: 'Show skeleton loading state',
        },
        skeletonVariant: {
            control: 'select',
            options: ['pulse', 'shimmer', 'wave'],
            description: 'Skeleton animation variant',
        },
        stickyHeader: {
            control: 'boolean',
            description: 'Make tabs list sticky',
        },
        offsetTop: {
            control: 'number',
            description: 'Offset from top when sticky (in pixels)',
        },
        value: {
            control: 'text',
            description: 'Controlled value of the active tab',
        },
        defaultValue: {
            control: 'text',
            description: 'Default value for uncontrolled tabs',
        },
        onValueChange: {
            action: 'valueChanged',
            description: 'Callback when tab changes',
        },
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TabsV2>

// Basic story with default configuration
export const Default: Story = {
    render: (args) => (
        <div className="w-[500px]">
            <TabsV2 {...args} defaultValue="tab1">
                <TabsV2List>
                    <TabsV2Trigger value="tab1">Overview</TabsV2Trigger>
                    <TabsV2Trigger value="tab2">Details</TabsV2Trigger>
                    <TabsV2Trigger value="tab3">Settings</TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">
                    <div className="p-4">
                        <h3>Overview Content</h3>
                        <p>This is the overview tab content.</p>
                    </div>
                </TabsV2Content>
                <TabsV2Content value="tab2">
                    <div className="p-4">
                        <h3>Details Content</h3>
                        <p>This is the details tab content.</p>
                    </div>
                </TabsV2Content>
                <TabsV2Content value="tab3">
                    <div className="p-4">
                        <h3>Settings Content</h3>
                        <p>This is the settings tab content.</p>
                    </div>
                </TabsV2Content>
            </TabsV2>
        </div>
    ),
}

// All variants showcase
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-8 w-[600px]">
            {Object.values(TabsV2Variant).map((variant) => (
                <div key={variant}>
                    <h3 className="mb-3 text-sm font-semibold capitalize">
                        {variant} Variant
                    </h3>
                    <TabsV2 defaultValue="tab1" variant={variant}>
                        <TabsV2List>
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                            <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                            <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                        </TabsV2List>
                        <TabsV2Content value="tab1">
                            <div className="p-3">Content 1</div>
                        </TabsV2Content>
                        <TabsV2Content value="tab2">
                            <div className="p-3">Content 2</div>
                        </TabsV2Content>
                        <TabsV2Content value="tab3">
                            <div className="p-3">Content 3</div>
                        </TabsV2Content>
                    </TabsV2>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All four tab variants: UNDERLINE, BOXED, FLOATING, and PILLS.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 400,
        },
    },
}

// Size comparison
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-8 w-[600px]">
            {Object.values(TabsV2Size).map((size) => (
                <div key={size}>
                    <h3 className="mb-3 text-sm font-semibold">
                        Size: {size.toUpperCase()}
                    </h3>
                    <TabsV2 defaultValue="tab1" size={size}>
                        <TabsV2List>
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                            <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                            <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                        </TabsV2List>
                        <TabsV2Content value="tab1">
                            <div className="p-3">Content 1</div>
                        </TabsV2Content>
                        <TabsV2Content value="tab2">
                            <div className="p-3">Content 2</div>
                        </TabsV2Content>
                        <TabsV2Content value="tab3">
                            <div className="p-3">Content 3</div>
                        </TabsV2Content>
                    </TabsV2>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparison of MD and LG tab sizes.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 400,
        },
    },
}

export const WithIcons: Story = {
    render: () => (
        <div className="w-[500px]">
            <TabsV2 defaultValue="tab1">
                <TabsV2List>
                    <TabsV2Trigger value="tab1" leftSlot={<Home size={16} />}>
                        Home
                    </TabsV2Trigger>
                    <TabsV2Trigger value="tab2" leftSlot={<User size={16} />}>
                        Profile
                    </TabsV2Trigger>
                    <TabsV2Trigger
                        value="tab3"
                        leftSlot={<Settings size={16} />}
                    >
                        Settings
                    </TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">
                    <div className="p-4">Home content</div>
                </TabsV2Content>
                <TabsV2Content value="tab2">
                    <div className="p-4">Profile content</div>
                </TabsV2Content>
                <TabsV2Content value="tab3">
                    <div className="p-4">Settings content</div>
                </TabsV2Content>
            </TabsV2>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tabs with icons in the left slot using the leftSlot prop.',
            },
        },
    },
}

export const ClosableTabs: Story = {
    render: function ClosableTabsRender() {
        const [tabs, setTabs] = React.useState([
            { value: 'tab1', label: 'Document 1' },
            { value: 'tab2', label: 'Document 2' },
            { value: 'tab3', label: 'Document 3' },
        ])

        const handleClose = (value: string) => {
            setTabs((prev) => prev.filter((tab) => tab.value !== value))
        }

        return (
            <div className="w-[500px]">
                <TabsV2 defaultValue={tabs[0]?.value}>
                    <TabsV2List>
                        {tabs.map((tab) => (
                            <TabsV2Trigger
                                key={tab.value}
                                value={tab.value}
                                closable
                                onClose={() => handleClose(tab.value)}
                            >
                                {tab.label}
                            </TabsV2Trigger>
                        ))}
                    </TabsV2List>
                    {tabs.map((tab) => (
                        <TabsV2Content key={tab.value} value={tab.value}>
                            <div className="p-4">
                                <h3>{tab.label}</h3>
                                <p>Content for {tab.label}</p>
                            </div>
                        </TabsV2Content>
                    ))}
                </TabsV2>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Tabs with close buttons. Click the X to remove a tab.',
            },
        },
    },
}

// Expanded tabs
export const Expanded: Story = {
    render: () => (
        <div className="w-[600px]">
            <TabsV2 defaultValue="tab1" expanded>
                <TabsV2List>
                    <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">
                    <div className="p-4">Content 1</div>
                </TabsV2Content>
                <TabsV2Content value="tab2">
                    <div className="p-4">Content 2</div>
                </TabsV2Content>
                <TabsV2Content value="tab3">
                    <div className="p-4">Content 3</div>
                </TabsV2Content>
            </TabsV2>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tabs expanded to fill the full width with equal spacing.',
            },
        },
    },
}

// Disabled state
export const Disabled: Story = {
    render: () => (
        <div className="w-[500px]">
            <TabsV2 defaultValue="tab1" disabled>
                <TabsV2List>
                    <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">
                    <div className="p-4">Content 1</div>
                </TabsV2Content>
                <TabsV2Content value="tab2">
                    <div className="p-4">Content 2</div>
                </TabsV2Content>
                <TabsV2Content value="tab3">
                    <div className="p-4">Content 3</div>
                </TabsV2Content>
            </TabsV2>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All tabs disabled using the disabled prop on TabsV2.',
            },
        },
    },
}

// Individual disabled tabs
export const PartiallyDisabled: Story = {
    render: () => (
        <div className="w-[500px]">
            <TabsV2 defaultValue="tab1">
                <TabsV2List>
                    <TabsV2Trigger value="tab1">Enabled</TabsV2Trigger>
                    <TabsV2Trigger value="tab2" disabled>
                        Disabled
                    </TabsV2Trigger>
                    <TabsV2Trigger value="tab3">Enabled</TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">
                    <div className="p-4">Tab 1 content</div>
                </TabsV2Content>
                <TabsV2Content value="tab2">
                    <div className="p-4">Tab 2 content (disabled)</div>
                </TabsV2Content>
                <TabsV2Content value="tab3">
                    <div className="p-4">Tab 3 content</div>
                </TabsV2Content>
            </TabsV2>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Individual tabs can be disabled using the disabled prop on TabsV2Trigger.',
            },
        },
    },
}

// Skeleton loading
export const Skeleton: Story = {
    render: () => (
        <div className="w-[500px]">
            <TabsV2 defaultValue="tab1" showSkeleton>
                <TabsV2List>
                    <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">
                    <div className="p-4">Content 1</div>
                </TabsV2Content>
            </TabsV2>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Skeleton loading state with pulse animation.',
            },
        },
    },
}

// Interactive story with testing
export const Interactive: Story = {
    render: (args) => (
        <div className="w-[500px]">
            <TabsV2 {...args} defaultValue="tab1">
                <TabsV2List>
                    <TabsV2Trigger value="tab1">First Tab</TabsV2Trigger>
                    <TabsV2Trigger value="tab2">Second Tab</TabsV2Trigger>
                    <TabsV2Trigger value="tab3">Third Tab</TabsV2Trigger>
                </TabsV2List>
                <TabsV2Content value="tab1">
                    <div className="p-4">
                        <p>This is the first tab content.</p>
                    </div>
                </TabsV2Content>
                <TabsV2Content value="tab2">
                    <div className="p-4">
                        <p>This is the second tab content.</p>
                    </div>
                </TabsV2Content>
                <TabsV2Content value="tab3">
                    <div className="p-4">
                        <p>This is the third tab content.</p>
                    </div>
                </TabsV2Content>
            </TabsV2>
        </div>
    ),
    args: {
        onValueChange: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)

        // Test clicking tab 2
        const tab2 = canvas.getByRole('tab', { name: /second tab/i })
        await userEvent.click(tab2)
        await expect(args.onValueChange).toHaveBeenCalledWith('tab2')

        // Test keyboard navigation - Tab to focus
        const tab1 = canvas.getByRole('tab', { name: /first tab/i })
        tab1.focus()
        await expect(tab1).toHaveFocus()

        // Test Arrow Right key
        await userEvent.keyboard('{ArrowRight}')
        await waitFor(() => {
            expect(
                canvas.getByRole('tab', { name: /second tab/i })
            ).toHaveFocus()
        })

        // Test Enter key to activate
        await userEvent.keyboard('{Enter}')
        await expect(args.onValueChange).toHaveBeenCalledWith('tab2')
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive tabs with keyboard navigation support. Try clicking tabs or using Arrow keys + Enter/Space.',
            },
        },
    },
}

// Close button interaction test
export const CloseButtonInteraction: Story = {
    render: function CloseButtonRender() {
        const [tabs, setTabs] = React.useState([
            { value: 'tab1', label: 'Tab 1' },
            { value: 'tab2', label: 'Tab 2' },
        ])

        const handleClose = (value: string) => {
            setTabs((prev) => prev.filter((tab) => tab.value !== value))
        }

        return (
            <div className="w-[400px]">
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        {tabs.map((tab) => (
                            <TabsV2Trigger
                                key={tab.value}
                                value={tab.value}
                                closable
                                onClose={() => handleClose(tab.value)}
                            >
                                {tab.label}
                            </TabsV2Trigger>
                        ))}
                    </TabsV2List>
                    {tabs.map((tab) => (
                        <TabsV2Content key={tab.value} value={tab.value}>
                            <div className="p-4">{tab.label} content</div>
                        </TabsV2Content>
                    ))}
                </TabsV2>
            </div>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        // Test clicking close button
        const closeButton = canvas.getByRole('button', { name: /close tab 1/i })
        await userEvent.click(closeButton)

        // Tab 1 should be removed
        await waitFor(() => {
            expect(
                canvas.queryByRole('tab', { name: /tab 1/i })
            ).not.toBeInTheDocument()
        })

        // Tab 2 should still exist
        expect(canvas.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument()
    },
    parameters: {
        docs: {
            description: {
                story: 'Test close button functionality. Click the X to close a tab.',
            },
        },
    },
}

// Visual regression test
export const Visual: Story = {
    render: () => (
        <div className="flex flex-col gap-8 w-[700px]">
            <div>
                <h3 className="mb-3 text-sm font-semibold">All Variants</h3>
                <div className="flex flex-col gap-6">
                    {Object.values(TabsV2Variant).map((variant) => (
                        <TabsV2
                            key={variant}
                            defaultValue="tab1"
                            variant={variant}
                        >
                            <TabsV2List>
                                <TabsV2Trigger value="tab1">
                                    Tab 1
                                </TabsV2Trigger>
                                <TabsV2Trigger value="tab2">
                                    Tab 2
                                </TabsV2Trigger>
                                <TabsV2Trigger value="tab3">
                                    Tab 3
                                </TabsV2Trigger>
                            </TabsV2List>
                            <TabsV2Content value="tab1">
                                <div className="p-2">Content</div>
                            </TabsV2Content>
                        </TabsV2>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-semibold">With Icons</h3>
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            leftSlot={<Home size={16} />}
                        >
                            Home
                        </TabsV2Trigger>
                        <TabsV2Trigger
                            value="tab2"
                            leftSlot={<User size={16} />}
                        >
                            Profile
                        </TabsV2Trigger>
                        <TabsV2Trigger
                            value="tab3"
                            leftSlot={<Settings size={16} />}
                        >
                            Settings
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div className="p-2">Home</div>
                    </TabsV2Content>
                </TabsV2>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-semibold">Disabled State</h3>
                <TabsV2 defaultValue="tab1" disabled>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div className="p-2">Content</div>
                    </TabsV2Content>
                </TabsV2>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-semibold">Closable</h3>
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable>
                            Document 1
                        </TabsV2Trigger>
                        <TabsV2Trigger value="tab2" closable>
                            Document 2
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div className="p-2">Content</div>
                    </TabsV2Content>
                </TabsV2>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Visual regression test covering all variants, states, and configurations.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}

// Accessibility-focused story
export const Accessibility: Story = {
    render: () => (
        <div className="flex flex-col gap-8 w-[600px]">
            <div>
                <h3 className="mb-3 text-base font-semibold">
                    Keyboard Navigation
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                    Use Tab to focus the tab list, then Arrow keys to navigate
                    between tabs. Press Enter or Space to activate a tab.
                </p>
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                        <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div className="p-3">Content 1</div>
                    </TabsV2Content>
                    <TabsV2Content value="tab2">
                        <div className="p-3">Content 2</div>
                    </TabsV2Content>
                    <TabsV2Content value="tab3">
                        <div className="p-3">Content 3</div>
                    </TabsV2Content>
                </TabsV2>
            </div>

            <div>
                <h3 className="mb-3 text-base font-semibold">
                    ARIA Attributes
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                    Tabs have proper ARIA attributes: role=&quot;tab&quot;,
                    aria-selected, aria-controls, and tab panels have
                    role=&quot;tabpanel&quot;.
                </p>
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            leftSlot={<Info size={16} />}
                        >
                            Accessible Tab
                        </TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Another Tab</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div className="p-3">
                            This content is linked via aria-controls.
                        </div>
                    </TabsV2Content>
                    <TabsV2Content value="tab2">
                        <div className="p-3">More content</div>
                    </TabsV2Content>
                </TabsV2>
            </div>

            <div>
                <h3 className="mb-3 text-base font-semibold">Disabled State</h3>
                <p className="mb-3 text-sm text-gray-500">
                    Disabled tabs are not focusable and have
                    aria-disabled=&quot;true&quot;.
                </p>
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Enabled</TabsV2Trigger>
                        <TabsV2Trigger value="tab2" disabled>
                            Disabled
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div className="p-3">Enabled content</div>
                    </TabsV2Content>
                </TabsV2>
            </div>
        </div>
    ),
    parameters: {
        a11y: getA11yConfig('navigation'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
        docs: {
            description: {
                story: `
Accessibility features demonstrated:

- Keyboard navigation (Tab, Arrow keys, Enter, Space)
- ARIA attributes (role, aria-selected, aria-controls, aria-disabled)
- Focus management
- Disabled state handling
- Screen reader support

Use with Storybook a11y panel and screen readers to validate behavior.
                `,
            },
        },
    },
}

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Activity,
    Bell,
    CreditCard,
    House,
    Search,
    Settings,
    Sparkles,
} from 'lucide-react'
import { SidebarV3 } from '../../../../../packages/blend/lib/components/SidebarV3'
import { FOUNDATION_THEME } from '../../../../../packages/blend/lib/tokens'
import type { DirectoryData } from '../../../../../packages/blend/lib/components/Directory/types'
import ThemeProvider from '../../../../../packages/blend/lib/context/ThemeProvider'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const data: DirectoryData[] = [
    {
        items: [
            {
                id: 'home',
                label: 'Home',
                leftSlot: <House size={16} />,
                href: '#home',
                showOnMobile: true,
            },
            {
                id: 'connectors',
                label: 'Connectors',
                leftSlot: <Settings size={16} />,
                href: '#connectors',
            },
            {
                id: 'analytics',
                label: 'Analytics',
                leftSlot: <Activity size={16} />,
                items: [
                    {
                        id: 'transactions',
                        label: 'Transactions',
                        href: '#transactions',
                    },
                    { id: 'refunds', label: 'Refunds', href: '#refunds' },
                ],
            },
        ],
    },
    {
        label: 'Products',
        items: [
            {
                id: 'payments',
                label: 'Payments',
                leftSlot: <CreditCard size={16} />,
                items: [
                    { id: 'orders', label: 'Orders', href: '#orders' },
                    {
                        id: 'subscriptions',
                        label: 'Subscriptions',
                        href: '#subscriptions',
                    },
                ],
            },
        ],
    },
]

const strip = (
    <>
        <strong
            aria-label="Juspay"
            style={{ marginLeft: FOUNDATION_THEME.unit[6] }}
        >
            Juspay
        </strong>
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginRight: FOUNDATION_THEME.unit[6],
            }}
        >
            <button type="button" aria-label="System health">
                <Activity size={16} />
            </button>
            <button type="button" aria-label="Settings">
                <Settings size={16} />
            </button>
            <button type="button" aria-label="Notifications">
                <Bell size={16} />
            </button>
            <button
                type="button"
                style={{ display: 'flex', gap: 6, alignItems: 'center' }}
            >
                <Sparkles size={16} /> Ask Genius
            </button>
        </div>
    </>
)

const search = (
    <button
        type="button"
        style={{ width: '100%', textAlign: 'left', padding: 12 }}
    >
        <Search size={16} /> Quick search… ⌘K
    </button>
)

const meta: Meta<typeof SidebarV3> = {
    title: 'Components/SidebarV3',
    component: SidebarV3,
    parameters: {
        layout: 'fullscreen',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Euler D frame with app supplied navigation and controls.',
        docs: {
            description: {
                component: `
## Usage
Pass navigation through \`data\`, account controls through \`topStrip\`, and an app search trigger through \`sidebarSearch\`.

## Features
- Rounded application surface below a token controlled strip
- Nested Directory navigation and V2 mobile navigation
- Controlled or uncontrolled expansion and selection

## Accessibility and verification
Use keyboard Tab, Enter, and arrow keys to inspect navigation. Check collapsed, nested, mobile, and reduced motion states in Storybook's accessibility and viewport panels. App supplied slots must provide accessible names and handlers.
`,
            },
        },
    },
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
    args: {
        data,
        topStrip: strip,
        sidebarSearch: search,
        merchantInfo: {
            items: [{ label: 'Integrating merchant', value: 'integrating' }],
            selected: 'integrating',
            onSelect: () => {},
        },
        defaultExpandedItems: ['analytics'],
        showHierarchyLines: true,
        children: (
            <main style={{ padding: 24 }}>
                <h1>Dashboard</h1>
                <p>Signed-off D-shaped reference content.</p>
            </main>
        ),
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarV3>

export const Default: Story = {}
export const SignedOffD: Story = {}
export const Collapsed: Story = { args: { defaultIsExpanded: false } }
export const NestedSelected: Story = {
    args: {
        activeItem: 'analytics/transactions',
        defaultExpandedItems: ['analytics'],
    },
}
export const LongMerchantLabel: Story = {
    args: {
        merchantInfo: {
            items: [
                {
                    label: 'A merchant with a very long account name for truncation',
                    value: 'long',
                },
            ],
            selected: 'long',
            onSelect: () => {},
        },
    },
}
export const Mobile: Story = {
    parameters: { viewport: { defaultViewport: 'mobile1' } },
}
export const Dark: Story = {
    decorators: [
        (Story) => (
            <ThemeProvider theme="dark">
                <Story />
            </ThemeProvider>
        ),
    ],
}

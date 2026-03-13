import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { fn } from '@storybook/test'
import { expect, userEvent, within } from '@storybook/test'
import {
    MenuV2,
    type MenuV2GroupType,
    MenuV2Alignment,
    MenuV2Side,
} from '../../../../../packages/blend/lib/components/MenuV2'
import { Button } from '../../../../../packages/blend/lib/components/Button'
import { ButtonType } from '../../../../../packages/blend/lib/components/Button/types'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const basicItems: MenuV2GroupType[] = [
    {
        label: 'Account',
        items: [
            { label: 'Profile' },
            { label: 'Settings' },
            { label: 'Sign out' },
        ],
    },
]

const itemsWithSubmenu: MenuV2GroupType[] = [
    {
        label: 'Locations',
        showSeparator: true,
        items: [
            {
                label: 'United States',
                subMenu: [
                    { label: 'California' },
                    { label: 'New York' },
                    { label: 'Texas' },
                ],
            },
            {
                label: 'Europe',
                subMenu: [
                    { label: 'United Kingdom' },
                    { label: 'Germany' },
                    { label: 'France' },
                ],
            },
        ],
    },
]

const searchableItems: MenuV2GroupType[] = [
    {
        label: 'Cities',
        items: [
            { label: 'Mostar' },
            { label: 'Moscow' },
            { label: 'Mumbai' },
            { label: 'Madrid' },
        ],
    },
]

const meta: Meta<typeof MenuV2> = {
    title: 'Components/MenuV2',
    component: MenuV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('navigation'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Context-free menu built on Radix Dropdown with Blend tokens.

## Features
- Token-driven theming (light/dark)
- Grouped items with optional separators
- Nested sub-menus
- Optional search inside the menu
- Controlled or uncontrolled open state

## Usage

\`\`\`tsx
import { MenuV2 } from '@juspay/blend-design-system';

<MenuV2
  trigger={<Button>Open menu</Button>}
  items={[{ label: 'Account', items: [{ label: 'Profile' }] }]}
/>
\`\`\`
                `,
            },
        },
    },
    args: {
        trigger: <Button buttonType={ButtonType.SECONDARY}>Open menu</Button>,
        items: basicItems,
        enableSearch: false,
        searchPlaceholder: 'Search menu items...',
        maxHeight: 320,
        minWidth: 200,
        maxWidth: 280,
        onOpenChange: fn(),
    },
    argTypes: {
        trigger: {
            control: false,
            description:
                'React element used as the trigger (rendered via Radix `asChild`)',
        },
        items: {
            control: false,
            description: 'Menu groups and items configuration',
        },
        enableSearch: {
            control: 'boolean',
            description: 'Show a search input pinned at the top of the menu',
        },
        searchPlaceholder: {
            control: 'text',
            description: 'Placeholder for the search input',
        },
        maxHeight: {
            control: 'number',
            description: 'Maximum height of the menu content (px)',
        },
        minWidth: {
            control: 'number',
            description: 'Minimum width of the menu content (px)',
        },
        maxWidth: {
            control: 'number',
            description: 'Maximum width of the menu content (px)',
        },
        alignment: {
            control: 'inline-radio',
            options: ['start', 'center', 'end'],
            description: 'Horizontal alignment relative to trigger',
        },
        side: {
            control: 'inline-radio',
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Side where the menu appears relative to trigger',
        },
        onOpenChange: {
            action: 'openChange',
            description: 'Called when menu opens or closes',
        },
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MenuV2>

export const Basic: Story = {}

export const WithSearch: Story = {
    args: {
        items: searchableItems,
        enableSearch: true,
        searchPlaceholder: 'Search cities...',
    },
}

export const WithSubmenu: Story = {
    args: {
        items: itemsWithSubmenu,
        trigger: (
            <Button buttonType={ButtonType.SECONDARY}>
                Open menu (submenu)
            </Button>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Menu showing nested sub-menus (e.g. United States → California).',
            },
        },
    },
}

export const Visual: Story = {
    render: function VisualRender() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div>
                    <h3
                        style={{
                            marginBottom: 16,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Default vs with search
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            gap: 24,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <MenuV2
                            trigger={
                                <Button buttonType={ButtonType.SECONDARY}>
                                    Basic menu
                                </Button>
                            }
                            items={basicItems}
                        />
                        <MenuV2
                            trigger={
                                <Button buttonType={ButtonType.SECONDARY}>
                                    Searchable menu
                                </Button>
                            }
                            items={searchableItems}
                            enableSearch
                            searchPlaceholder="Search cities..."
                        />
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
                        Alignment & side
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            gap: 24,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <MenuV2
                            trigger={
                                <Button buttonType={ButtonType.SECONDARY}>
                                    Bottom / center
                                </Button>
                            }
                            items={basicItems}
                            side={MenuV2Side.BOTTOM}
                            alignment={MenuV2Alignment.CENTER}
                        />
                        <MenuV2
                            trigger={
                                <Button buttonType={ButtonType.SECONDARY}>
                                    Top / start
                                </Button>
                            }
                            items={basicItems}
                            side={MenuV2Side.TOP}
                            alignment={MenuV2Alignment.START}
                        />
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Visual reference for search and positioning variants.',
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
        const [selected, setSelected] = React.useState<string | null>(null)

        const items: MenuV2GroupType[] = [
            {
                label: 'Actions',
                items: [
                    {
                        label: 'Primary Action',
                        onClick: () => setSelected('Primary Action'),
                    },
                    {
                        label: 'Secondary Action',
                        onClick: () => setSelected('Secondary Action'),
                    },
                ],
            },
        ]

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <MenuV2
                    {...args}
                    items={items}
                    trigger={
                        <Button buttonType={ButtonType.SECONDARY}>
                            {selected
                                ? `Last: ${selected}`
                                : 'Open interactive menu'}
                        </Button>
                    }
                />
                <div style={{ fontSize: 12, color: '#666' }}>
                    Last selected: <strong>{selected ?? 'none'}</strong>
                </div>
            </div>
        )
    },
    args: {
        onOpenChange: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', {
            name: /open interactive menu/i,
        })

        await userEvent.click(trigger)
        const option = await canvas.findByRole('menuitem', {
            name: /primary action/i,
        })
        await userEvent.click(option)

        await expect(args.onOpenChange).toHaveBeenCalled()
    },
    parameters: {
        docs: {
            description: {
                story: 'Open the menu and choose an action. The button label and Actions panel show the result.',
            },
        },
    },
}

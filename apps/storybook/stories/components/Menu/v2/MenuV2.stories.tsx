import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { fn } from '@storybook/test'
import { expect, userEvent, within } from '@storybook/test'
import {
    MenuV2,
    type MenuV2GroupType,
    type MenuV2ItemType,
    MenuV2Alignment,
    MenuV2Side,
} from '../../../../../../packages/blend/lib/components/MenuV2'
import { Button } from '../../../../../../packages/blend/lib/components/Button'
import { ButtonType } from '../../../../../../packages/blend/lib/components/Button/types'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const basicItems: MenuV2GroupType[] = [
    {
        label: 'Account',
        items: [
            { label: { text: 'Profile' } },
            { label: { text: 'Settings' } },
            { label: { text: 'Sign out' } },
        ],
    },
]

const itemsWithSubmenu: MenuV2GroupType[] = [
    {
        label: 'Locations',
        showSeparator: true,
        items: [
            {
                label: { text: 'United States' },
                subMenu: [
                    { label: { text: 'California' } },
                    { label: { text: 'New York' } },
                    { label: { text: 'Texas' } },
                ],
            },
            {
                label: { text: 'Europe' },
                subMenu: [
                    { label: { text: 'United Kingdom' } },
                    { label: { text: 'Germany' } },
                    { label: { text: 'France' } },
                ],
            },
        ],
    },
]

const searchableItems: MenuV2GroupType[] = [
    {
        label: 'Cities',
        items: [
            { label: { text: 'Mostar' } },
            { label: { text: 'Moscow' } },
            { label: { text: 'Mumbai' } },
            { label: { text: 'Madrid' } },
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
        docsSubtitle:
            'Context-free menu built on Radix Dropdown with Blend tokens.',
        docs: {
            description: {
                component: `

## Usage

\`\`\`tsx
import { MenuV2 } from '@juspay/blend-design-system';

<MenuV2
  trigger={<Button>Open menu</Button>}
  items={[{ label: 'Account', items: [{ label: 'Profile' }] }]}
/>
\`\`\`

## Features
- Token-driven theming (light/dark)
- Grouped items with optional separators
- Nested sub-menus
- Optional search inside the menu
- Search results ranked by relevance (exact → prefix → substring) by default; override via \`searchSortFn\`
- \`onEnter\` callback for command-palette-style "confirm search" behavior
- Controlled or uncontrolled open state
- Controlled item selection via \`selected\` + \`selectionStyle\` (\`checkmark\` | \`highlight\`)
- \`closeOnSelect\` (default \`true\`) for multi-select menus that stay open

                `,
            },
        },
    },
    args: {
        trigger: <Button buttonType={ButtonType.SECONDARY}>Open menu</Button>,
        items: basicItems,
        enableSearch: false,
        searchPlaceholder: 'Search menu items...',
        dimensions: {
            maxHeight: 320,
            minWidth: 200,
            maxWidth: 280,
        },
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
        dimensions: {
            control: 'object',
            description: 'Dimensions of the menu content',
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
        searchSortFn: {
            control: false,
            description:
                'Custom sort function `(items, searchText) => items`. Overrides the default exact → prefix → substring ranking.',
        },
        onEnter: {
            action: 'enter',
            description:
                'Fired when Enter is pressed while the search input is focused. Receives `(searchText, filteredGroups)`.',
        },
        selectionStyle: {
            control: 'inline-radio',
            options: ['checkmark', 'highlight'],
            description:
                'How selected items are indicated. Group-level `selectionStyle` overrides this.',
        },
        closeOnSelect: {
            control: 'boolean',
            description:
                'When false, selecting an item keeps the menu open (multi-select). Defaults to true.',
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
            <div className="flex flex-col gap-8">
                <div>
                    <h3 className="mb-4 text-base font-semibold">
                        Default vs with search
                    </h3>
                    <div className="flex gap-6 items-center flex-wrap">
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
                    <h3 className="mb-4 text-base font-semibold">
                        Alignment & side
                    </h3>
                    <div className="flex gap-6 items-center flex-wrap">
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
                        label: { text: 'Primary Action' },
                        onClick: () => setSelected('Primary Action'),
                    },
                    {
                        label: { text: 'Secondary Action' },
                        onClick: () => setSelected('Secondary Action'),
                    },
                ],
            },
        ]

        return (
            <div className="flex flex-col gap-3">
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
                <div className="text-xs text-gray-600">
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

const rankedItems: MenuV2GroupType[] = [
    {
        label: 'Results',
        items: [
            { label: { text: 'Advanced Search Tools' } },
            { label: { text: 'Search' } },
            { label: { text: 'Search Settings' } },
            { label: { text: 'Deep Search' } },
        ],
    },
]

export const WithSearchRanking: Story = {
    render: function WithSearchRankingRender() {
        return (
            <div className="flex flex-col gap-3">
                <MenuV2
                    trigger={
                        <Button buttonType={ButtonType.SECONDARY}>
                            Ranked search
                        </Button>
                    }
                    items={rankedItems}
                    enableSearch
                    searchPlaceholder="Type 'search' to see ranking..."
                />
                <p className="text-xs text-gray-600">
                    Type <code>search</code> in the box. Results are ordered
                    exact match → prefix match → substring match. The item
                    declared last (“Search”) jumps to the top.
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `Search results are ranked by relevance using a stable tiered sort:
**exact match → prefix match → substring match**.

This is the default behavior — no prop required. Items at the same tier
preserve their original declaration order (stable sort).`,
            },
        },
    },
}

export const WithCustomSearchSort: Story = {
    render: function WithCustomSearchSortRender() {
        // Reverse-alphabetical custom sort overrides the default ranking
        const customSort = (
            items: MenuV2ItemType[],
            _searchText: string
        ): MenuV2ItemType[] =>
            [...items].sort((a, b) => b.label.text.localeCompare(a.label.text))

        return (
            <div className="flex flex-col gap-3">
                <MenuV2
                    trigger={
                        <Button buttonType={ButtonType.SECONDARY}>
                            Custom sort
                        </Button>
                    }
                    items={rankedItems}
                    enableSearch
                    searchPlaceholder="Custom reverse-alpha sort..."
                    searchSortFn={customSort}
                />
                <p className="text-xs text-gray-600">
                    A custom <code>searchSortFn</code> fully overrides the
                    default ranking. Here results are sorted reverse-
                    alphabetically regardless of match tier.
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `Pass a \`searchSortFn: (items, searchText) => items\` to fully control result ordering. The default tiered ranking is skipped entirely when this prop is supplied.`,
            },
        },
    },
}

export const WithSearchEnter: Story = {
    render: function WithSearchEnterRender() {
        const [lastEnter, setLastEnter] = React.useState<string>('none')

        return (
            <div className="flex flex-col gap-3">
                <MenuV2
                    trigger={
                        <Button buttonType={ButtonType.SECONDARY}>
                            Search + Enter
                        </Button>
                    }
                    items={rankedItems}
                    enableSearch
                    searchPlaceholder="Type, then press Enter..."
                    onEnter={(query, filteredGroups) => {
                        const top = filteredGroups[0]?.items[0]
                        setLastEnter(
                            top
                                ? `query="${query}" → top="${top.label.text}"`
                                : `query="${query}" → no results`
                        )
                    }}
                />
                <div className="text-xs text-gray-600">
                    Last Enter: <strong>{lastEnter}</strong>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `When the user presses **Enter** while focused on the search input, \`onEnter(searchText, filteredGroups)\` fires — letting the consumer act on the query or the top-ranked result (e.g. command-palette-style navigation).`,
            },
        },
    },
}

const submenuSearchItems: MenuV2GroupType[] = [
    {
        label: 'Locations',
        items: [
            {
                label: { text: 'United States' },
                enableSubMenuSearch: true,
                subMenuSearchPlaceholder: 'Search states...',
                onSubMenuSearchEnter: (query, results) => {
                    // eslint-disable-next-line no-console
                    console.log(
                        `Sub-menu Enter: query="${query}", top="${results[0]?.label.text ?? 'none'}"`
                    )
                },
                subMenu: [
                    { label: { text: 'California' } },
                    { label: { text: 'New York' } },
                    { label: { text: 'Texas' } },
                    { label: { text: 'Washington' } },
                ],
            },
        ],
    },
]

export const WithSubmenuSearchRanking: Story = {
    render: function WithSubmenuSearchRankingRender() {
        return (
            <div className="flex flex-col gap-3">
                <MenuV2
                    trigger={
                        <Button buttonType={ButtonType.SECONDARY}>
                            Submenu search
                        </Button>
                    }
                    items={submenuSearchItems}
                />
                <p className="text-xs text-gray-600">
                    Open the menu, hover <strong>United States</strong> to
                    reveal its sub-menu search. Typing in the sub-menu search
                    applies the same exact → prefix → substring ranking, and
                    pressing Enter fires <code>onSubMenuSearchEnter</code>.
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `Per-item sub-menu search also ranks results by relevance. Set \`enableSubMenuSearch\` on the parent item and (optionally) \`onSubMenuSearchEnter\` to handle Enter while the sub-menu search input is focused.`,
            },
        },
    },
}

export const SingleSelectCheckmark: Story = {
    render: function SingleSelectCheckmarkRender() {
        const [sortBy, setSortBy] = React.useState('name-asc')

        const options: { id: string; label: string }[] = [
            { id: 'name-asc', label: 'Name (A–Z)' },
            { id: 'name-desc', label: 'Name (Z–A)' },
            { id: 'date-newest', label: 'Date (newest)' },
            { id: 'date-oldest', label: 'Date (oldest)' },
        ]

        const items: MenuV2GroupType[] = [
            {
                label: 'Sort by',
                items: options.map((option) => ({
                    id: option.id,
                    label: { text: option.label },
                    selected: sortBy === option.id,
                    onClick: () => setSortBy(option.id),
                })),
            },
        ]

        return (
            <div className="flex flex-col gap-3">
                <MenuV2
                    trigger={
                        <Button buttonType={ButtonType.SECONDARY}>
                            Sort: {options.find((o) => o.id === sortBy)?.label}
                        </Button>
                    }
                    items={items}
                    selectionStyle="checkmark"
                />
                <p className="text-xs text-gray-600">
                    Single-select sort picker. Selected item shows a trailing
                    checkmark; choosing an option closes the menu (
                    <code>closeOnSelect</code> default). Items use{' '}
                    <code>role=&quot;menuitemradio&quot;</code> with{' '}
                    <code>aria-checked</code>.
                </p>
            </div>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: /sort:/i })

        await userEvent.click(trigger)

        const nameDesc = await canvas.findByRole('menuitemradio', {
            name: /name \(z–a\)/i,
        })
        await expect(nameDesc).toHaveAttribute('aria-checked', 'false')

        const nameAsc = canvas.getByRole('menuitemradio', {
            name: /name \(a–z\)/i,
        })
        await expect(nameAsc).toHaveAttribute('aria-checked', 'true')

        await userEvent.keyboard('{ArrowDown}')
        await expect(nameDesc).toHaveFocus()

        await userEvent.keyboard('{Enter}')
        await expect(trigger).toHaveTextContent(/name \(z–a\)/i)
    },
    parameters: {
        docs: {
            description: {
                story: `Controlled single-select menu with \`selectionStyle="checkmark"\`. Pass \`selected\` on each item; the consumer owns selection state. Keyboard ↑/↓ navigates; Enter/Space activates.`,
            },
        },
    },
}

export const MultiSelectHighlight: Story = {
    render: function MultiSelectHighlightRender() {
        const [views, setViews] = React.useState<string[]>(['grid', 'preview'])

        const options: { id: string; label: string }[] = [
            { id: 'list', label: 'List' },
            { id: 'grid', label: 'Grid' },
            { id: 'preview', label: 'Preview pane' },
            { id: 'sidebar', label: 'Sidebar' },
        ]

        const toggle = (id: string) => {
            setViews((prev) =>
                prev.includes(id)
                    ? prev.filter((value) => value !== id)
                    : [...prev, id]
            )
        }

        const items: MenuV2GroupType[] = [
            {
                label: 'Visible panels',
                items: options.map((option) => ({
                    id: option.id,
                    label: { text: option.label },
                    selected: views.includes(option.id),
                    onClick: () => toggle(option.id),
                })),
            },
        ]

        return (
            <div className="flex flex-col gap-3">
                <MenuV2
                    trigger={
                        <Button buttonType={ButtonType.SECONDARY}>
                            View options
                        </Button>
                    }
                    items={items}
                    selectionStyle="highlight"
                    closeOnSelect={false}
                />
                <p className="text-xs text-gray-600">
                    Multi-select view switcher with{' '}
                    <code>selectionStyle=&quot;highlight&quot;</code> and{' '}
                    <code>closeOnSelect: false</code>. Selected items use the
                    token <code>selected</code> background; the menu stays open
                    across clicks. Items use{' '}
                    <code>role=&quot;menuitemcheckbox&quot;</code> with{' '}
                    <code>aria-checked</code>.
                </p>
                <div className="text-xs text-gray-600">
                    Active:{' '}
                    <strong>
                        {views.length > 0 ? views.join(', ') : 'none'}
                    </strong>
                </div>
            </div>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: /view options/i })

        await userEvent.click(trigger)

        const list = await canvas.findByRole('menuitemcheckbox', {
            name: /^list$/i,
        })
        const grid = canvas.getByRole('menuitemcheckbox', { name: /^grid$/i })

        await expect(list).toHaveAttribute('aria-checked', 'false')
        await expect(grid).toHaveAttribute('aria-checked', 'true')

        await userEvent.click(list)
        await expect(
            await canvas.findByRole('menuitemcheckbox', { name: /^list$/i })
        ).toHaveAttribute('aria-checked', 'true')
        // Menu stays open for multi-select
        await expect(
            canvas.getByRole('menuitemcheckbox', { name: /^grid$/i })
        ).toBeInTheDocument()

        const focusedGrid = canvas.getByRole('menuitemcheckbox', {
            name: /^grid$/i,
        })
        await userEvent.keyboard('{ArrowDown}')
        await expect(focusedGrid).toHaveFocus()
    },
    parameters: {
        docs: {
            description: {
                story: `Controlled multi-select menu with \`selectionStyle="highlight"\` and \`closeOnSelect={false}\`. Selection state is fully owned by the consumer.`,
            },
        },
    },
}

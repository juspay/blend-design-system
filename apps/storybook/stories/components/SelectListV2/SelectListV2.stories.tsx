import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    SelectListV2,
    DrawerV2,
    DrawerV2Body,
    DrawerV2Content,
    DrawerV2Footer,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
    ButtonV2,
    ButtonV2Type,
    type SingleSelectV2GroupType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { User, Bot, Star } from 'lucide-react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import { useMockAsyncSearch } from '../selectAsyncSearchStory'

const flatItems: SingleSelectV2GroupType[] = [
    {
        items: [
            { label: 'Open', value: 'open' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Resolved', value: 'resolved' },
            { label: 'Closed', value: 'closed' },
        ],
    },
]

const groupedItems: SingleSelectV2GroupType[] = [
    {
        groupLabel: 'Team',
        showSeparator: true,
        items: [
            {
                label: 'Alicia Keys',
                value: 'alicia',
                subLabel: 'alicia@company.com',
                slot1: <User size={16} />,
            },
            {
                label: 'Brian Chen',
                value: 'brian',
                subLabel: 'brian@company.com',
                slot1: <User size={16} />,
                disabled: true,
            },
            {
                label: 'Carla Diaz',
                value: 'carla',
                subLabel: 'carla@company.com',
                slot1: <User size={16} />,
                slot2: <Star size={16} />,
                tooltip: 'Out of office until Friday',
            },
        ],
    },
    {
        groupLabel: 'Bots',
        items: [
            {
                label: 'Support Bot',
                value: 'support-bot',
                subLabel: 'automation',
                slot1: <Bot size={16} />,
            },
        ],
    },
]

const virtualizedItems: SingleSelectV2GroupType[] = [
    {
        items: Array.from({ length: 5000 }, (_, i) => ({
            label: `Item ${i + 1}`,
            value: `item-${i + 1}`,
        })),
    },
]

const meta: Meta<typeof SelectListV2> = {
    title: 'Components/SelectListV2',
    component: SelectListV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Always-visible, triggerless single-select list — the inline counterpart to SingleSelectV2.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { SelectListV2 } from '@juspay/blend-design-system';

const [selected, setSelected] = useState<string>('');

<SelectListV2
  label="Status"
  items={items}
  selected={selected}
  onSelect={setSelected}
/>
\`\`\`

\`SelectListV2\` renders the same \`SingleSelectV2GroupType\` item model as
\`SingleSelectV2\`, but inline instead of behind a trigger and popover — for
filter panels, "customize columns" panels, and modal/drawer bodies that show
every option at once.

## Semantics
- Renders \`role="listbox"\`; rows are \`role="option"\` with \`aria-selected\`,
  \`aria-setsize\` and \`aria-posinset\`.
- Selection is shown with a checkmark, not a radio indicator — \`radiogroup\`
  mandates selection-follows-focus and composes badly with search, grouping
  and virtualization.
- Keyboard follows the APG roving-tabindex pattern: exactly one tab stop for
  the whole list. Arrow/Home/End move the active option (skipping disabled
  rows); Enter/Space select — selection never follows focus. Printable
  characters route to the search input when search is enabled; ArrowDown
  from the search input enters the list.
- \`subMenu\` items are not supported here and are rejected with a dev
  console error.

## Features
- **Single Selection**: checkmark semantics, one item selected at a time
- **Search & Filtering**: off by default, enable via \`search={{ show: true }}\`
- **Virtualization**: auto-enabled above 20 options; use \`enableVirtualization\` to override
- **Infinite Scroll**: \`hasMore\` + \`onEndReached\`; pass \`isLoadingMore\` while fetching so pages and search results re-arm safely
- **Accessibility**: full keyboard navigation and screen reader support
`,
            },
        },
    },
    tags: ['autodocs'],
    args: {
        label: 'Status',
        items: flatItems,
        selected: '',
        onSelect: () => {},
    },
}

export default meta
type Story = StoryObj<typeof SelectListV2>

export const Default: Story = {
    render: () => {
        const [selected, setSelected] = useState('')

        return (
            <SelectListV2
                label="Status"
                items={flatItems}
                selected={selected}
                onSelect={setSelected}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'A flat, ungrouped list with checkmark selection.',
            },
        },
    },
}

export const Grouped: Story = {
    render: () => {
        const [selected, setSelected] = useState('')

        return (
            <SelectListV2
                label="Assign to"
                items={groupedItems}
                selected={selected}
                onSelect={setSelected}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Group labels with a separator between groups, subLabels, leading/trailing slot icons, a disabled item, and a tooltip on an item.',
            },
        },
    },
}

export const Searchable: Story = {
    render: () => {
        const [selected, setSelected] = useState('')

        return (
            <SelectListV2
                label="Status"
                items={flatItems}
                selected={selected}
                onSelect={setSelected}
                search={{ show: true, placeholder: 'Search status...' }}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Search is off by default; enabling it via `search={{ show: true }}` filters the list inline as you type.',
            },
        },
    },
}

const ControlledSearchExample = () => {
    const [selected, setSelected] = useState('')
    const search = useMockAsyncSearch()

    return (
        <SelectListV2
            label="Find a person"
            items={search.items}
            selected={selected}
            onSelect={setSelected}
            search={search}
        />
    )
}

export const ControlledSearch: Story = {
    render: () => <ControlledSearchExample />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        expect(canvas.getByText('Start typing to search')).toBeInTheDocument()

        const searchInput = canvas.getByPlaceholderText('Search options...')
        await userEvent.type(searchInput, 'alan')
        expect(canvas.getByText('Searching…')).toBeInTheDocument()

        await waitFor(
            () => expect(canvas.getByText('Alan Turing')).toBeInTheDocument(),
            { timeout: 3000 }
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled search: the consumer owns `searchText`/`onSearchChange` and supplies already-filtered items, debouncing a mock API request. Since the list has no trigger/popover, results filter inline as you type.',
            },
        },
    },
}

export const Virtualized: Story = {
    render: () => {
        const [selected, setSelected] = useState('')

        return (
            <SelectListV2
                label="Choose an item"
                items={virtualizedItems}
                selected={selected}
                onSelect={setSelected}
                enableVirtualization
                maxHeight={320}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Virtualized rendering for a 5000-item list, capped to a 320px viewport. Only the visible rows (plus overscan) are mounted.',
            },
        },
    },
}

const PAGE_SIZE = 40
const TOTAL_ITEMS = 200

const buildPage = (start: number, end: number) =>
    Array.from({ length: end - start }, (_, i) => ({
        label: `Item ${start + i + 1}`,
        value: `item-${start + i + 1}`,
    }))

const InfiniteScrollExample = () => {
    const [selected, setSelected] = useState('')
    const [loadedCount, setLoadedCount] = useState(PAGE_SIZE)

    const items: SingleSelectV2GroupType[] = [
        { items: buildPage(0, loadedCount) },
    ]

    return (
        <SelectListV2
            label="Choose an item"
            items={items}
            selected={selected}
            onSelect={setSelected}
            enableVirtualization
            maxHeight={320}
            hasMore={loadedCount < TOTAL_ITEMS}
            onEndReached={() =>
                setLoadedCount((count) =>
                    Math.min(count + PAGE_SIZE, TOTAL_ITEMS)
                )
            }
            loadingComponent={
                <div
                    style={{
                        padding: 12,
                        textAlign: 'center',
                        fontSize: 13,
                        color: '#6b7280',
                    }}
                >
                    Loading more…
                </div>
            }
        />
    )
}

export const InfiniteScroll: Story = {
    render: () => <InfiniteScrollExample />,
    parameters: {
        docs: {
            description: {
                story: 'Pages in more items as the viewport nears the end (`hasMore` + `onEndReached`), rendering `loadingComponent` while more remain. Both virtualized and non-virtualized lists re-arm pagination as new items arrive; pass `isLoadingMore` while an async page is in flight.',
            },
        },
    },
}

export const DisabledAndSkeleton: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ width: 220 }}>
                <SelectListV2
                    label="Disabled"
                    items={flatItems}
                    selected="open"
                    onSelect={() => {}}
                    disabled
                />
            </div>
            <div style={{ width: 220 }}>
                <SelectListV2
                    label="Loading"
                    items={flatItems}
                    selected=""
                    onSelect={() => {}}
                    skeleton={{ show: true, count: 5 }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '`disabled` disables every row and the search input. `skeleton` replaces the whole body with placeholder rows (`aria-busy="true"`, zero tab stops) while data loads.',
            },
        },
    },
}

const InsideDrawerExample = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState('open')

    return (
        <>
            <ButtonV2
                text="Filter by status"
                buttonType={ButtonV2Type.PRIMARY}
                onClick={() => setIsOpen(true)}
            />
            <DrawerV2 open={isOpen} onOpenChange={setIsOpen} direction="right">
                <DrawerV2Portal>
                    <DrawerV2Overlay className="fixed inset-0 z-50 bg-black/40" />
                    <DrawerV2Content className="fixed inset-y-0 right-0 z-50 flex h-full w-[320px] flex-col bg-white p-6 shadow-xl">
                        <DrawerV2Title className="mb-4 text-lg font-semibold">
                            Filter by status
                        </DrawerV2Title>
                        <DrawerV2Body className="flex-1 overflow-y-auto">
                            <SelectListV2
                                label="Status"
                                items={flatItems}
                                selected={selected}
                                onSelect={setSelected}
                            />
                        </DrawerV2Body>
                        <DrawerV2Footer className="mt-4">
                            <ButtonV2
                                text="Done"
                                buttonType={ButtonV2Type.SECONDARY}
                                onClick={() => setIsOpen(false)}
                            />
                        </DrawerV2Footer>
                    </DrawerV2Content>
                </DrawerV2Portal>
            </DrawerV2>
        </>
    )
}

export const InsideDrawer: Story = {
    render: () => <InsideDrawerExample />,
    parameters: {
        docs: {
            description: {
                story: 'The motivating use case: SelectListV2 as the body of a DrawerV2 filter rail, rather than a dropdown. Click "Filter by status" to open the drawer.',
            },
        },
    },
}

export const KeyboardNavigation: Story = {
    render: () => {
        const [selected, setSelected] = useState('')

        return (
            <SelectListV2
                label="Status"
                items={flatItems}
                selected={selected}
                onSelect={setSelected}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        expect(canvas.getByRole('listbox')).toBeInTheDocument()

        const options = canvas.getAllByRole('option')
        const tabStops = options.filter(
            (option) => option.getAttribute('tabindex') === '0'
        )
        expect(tabStops).toHaveLength(1)

        await userEvent.tab()
        expect(document.activeElement).toBe(tabStops[0])

        await userEvent.keyboard('{ArrowDown}{ArrowDown}')
        const activeOption = document.activeElement as HTMLElement
        expect(activeOption).toHaveAttribute('role', 'option')
        expect(activeOption).toHaveAttribute('aria-selected', 'false')

        await userEvent.keyboard('{Enter}')
        expect(activeOption).toHaveAttribute('aria-selected', 'true')
    },
    parameters: {
        docs: {
            description: {
                story: 'APG roving-tabindex keyboard model: exactly one tab stop for the whole list, ArrowDown moves the active option without selecting it, and Enter selects the active option.',
            },
        },
    },
}

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    MultiSelectListV2,
    SelectV2Size,
    SelectV2Variant,
    DrawerV2,
    DrawerV2Body,
    DrawerV2Content,
    DrawerV2Footer,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
    ButtonV2,
    ButtonV2Type,
    type MultiSelectV2GroupType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { Type, Mail, Hash, DollarSign, Calendar } from 'lucide-react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import { useMockAsyncSearch } from '../selectAsyncSearchStory'

const flatItems: MultiSelectV2GroupType[] = [
    {
        items: [
            { label: 'Name', value: 'name' },
            { label: 'Email', value: 'email' },
            { label: 'Status', value: 'status' },
            { label: 'Revenue', value: 'revenue' },
        ],
    },
]

const groupedItems: MultiSelectV2GroupType[] = [
    {
        groupLabel: 'Identity',
        showSeparator: true,
        items: [
            {
                label: 'Name',
                value: 'name',
                subLabel: 'Full name',
                slot1: <Type size={16} />,
                disabled: true,
                tooltip: 'Required column, cannot be hidden',
            },
            {
                label: 'Email',
                value: 'email',
                subLabel: 'Primary email address',
                slot1: <Mail size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Metrics',
        items: [
            {
                label: 'Revenue',
                value: 'revenue',
                subLabel: 'Total revenue (USD)',
                slot1: <Hash size={16} />,
                slot2: <DollarSign size={16} />,
            },
            {
                label: 'Last Active',
                value: 'last-active',
                subLabel: 'Last login date',
                slot1: <Calendar size={16} />,
            },
        ],
    },
]

const virtualizedItems: MultiSelectV2GroupType[] = [
    {
        items: Array.from({ length: 5000 }, (_, i) => ({
            label: `Column ${i + 1}`,
            value: `column-${i + 1}`,
        })),
    },
]

const maxSelectionItems: MultiSelectV2GroupType[] = [
    {
        items: [
            { label: 'Name', value: 'name', alwaysSelected: true },
            { label: 'Email', value: 'email' },
            { label: 'Status', value: 'status' },
            { label: 'Revenue', value: 'revenue' },
            { label: 'Signups', value: 'signups' },
        ],
    },
]

const meta: Meta<typeof MultiSelectListV2> = {
    title: 'Components/MultiSelectListV2',
    component: MultiSelectListV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Always-visible, triggerless multi-select list — the inline counterpart to MultiSelectV2.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { MultiSelectListV2 } from '@juspay/blend-design-system';

const [selectedValues, setSelectedValues] = useState<string[]>([]);

<MultiSelectListV2
  label="Columns"
  items={items}
  selectedValues={selectedValues}
  onSelectionChange={setSelectedValues}
  enableSelectAll
/>
\`\`\`

\`MultiSelectListV2\` renders the same \`MultiSelectV2GroupType\` item model as
\`MultiSelectV2\`, but inline instead of behind a trigger and popover — for
"customize columns" panels, filter rails, and modal/drawer bodies that show
every option at once. Prefer \`onSelectionChange\`, which fires once per user
gesture with the complete resulting selection. \`onChange\` is the legacy
per-item toggle callback and remains supported for compatibility.

## Semantics
- Renders \`role="listbox"\` with \`aria-multiselectable\`; rows are
  \`role="option"\` with \`aria-selected\`, \`aria-setsize\` and
  \`aria-posinset\`.
- Keyboard follows the APG roving-tabindex pattern: exactly one tab stop for
  the whole list. Arrow/Home/End move the active option (skipping disabled
  rows); Enter/Space toggle — selection never follows focus. Printable
  characters route to the search input when search is enabled; ArrowDown
  from the search input enters the list.
- \`subMenu\` items are not supported here and are rejected with a dev
  console error.

## Features
- **Multiple Selection**: checkbox semantics
- **Search & Filtering**: off by default, enable via \`search={{ show: true }}\`
- **Select All / Clear All**: optional header controls, both scoped to what
  search currently shows
- **Max Selections**: cap the number of selectable items
- **Virtualization**: for large datasets
- **Infinite Scroll**: \`hasMore\` + \`onEndReached\` (requires \`enableVirtualization\`)
- **Accessibility**: full keyboard navigation and screen reader support
`,
            },
        },
    },
    tags: ['autodocs'],
    args: {
        label: 'Columns',
        items: flatItems,
        selectedValues: [],
        onSelectionChange: () => {},
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Label for the list (also names the listbox)',
        },
        selectedValues: {
            control: 'object',
            description: 'Array of selected option values',
        },
        size: {
            control: 'select',
            options: Object.values(SelectV2Size),
            description: 'Row size',
        },
        variant: {
            control: 'select',
            options: Object.values(SelectV2Variant),
            description: 'Container or no-container chrome',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables every row, the search input, and select-all',
        },
        enableSelectAll: {
            control: 'boolean',
            description: 'Show the Select All row',
        },
        maxSelections: {
            control: 'number',
            description: 'Caps the number of selectable items',
        },
        items: {
            control: false,
            description: 'Grouped options',
        },
        onChange: {
            action: 'change',
            description:
                'Legacy: per-item toggle callback. Prefer onSelectionChange.',
        },
        onSelectionChange: {
            action: 'selectionChange',
            description:
                'Recommended: full post-gesture selection, fired once per user gesture.',
        },
    },
}

export default meta
type Story = StoryObj<typeof MultiSelectListV2>

export const Default: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <MultiSelectListV2
                label="Columns"
                items={flatItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'A flat, ungrouped list with checkbox selection.',
            },
        },
    },
}

export const Grouped: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>(['name'])

        return (
            <MultiSelectListV2
                label="Customize columns"
                items={groupedItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
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
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <MultiSelectListV2
                label="Columns"
                items={flatItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
                search={{ show: true, placeholder: 'Search columns...' }}
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
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const search = useMockAsyncSearch()

    return (
        <MultiSelectListV2
            label="Find people"
            items={search.items}
            selectedValues={selectedValues}
            onSelectionChange={setSelectedValues}
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

export const WithSelectAll: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <MultiSelectListV2
                label="Columns"
                items={flatItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
                enableSelectAll
                selectAllText="Select All"
                showClearAll
                clearAllText="Clear all"
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'A Select All row plus an explicit Clear All action, both rendered above the scrollable list. Select All only covers what is currently visible (e.g. filtered by search).',
            },
        },
    },
}

export const MaxSelections: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>(['name'])

        return (
            <MultiSelectListV2
                label="Columns (max 3)"
                items={maxSelectionItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
                maxSelections={3}
                enableSelectAll
                selectAllText="Select All"
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: '`maxSelections={3}` disables the remaining unselected rows once 3 values are selected. "Name" is `alwaysSelected`: it renders checked-and-disabled from the start, is excluded from Select All\'s scope, and (since it is included in the initial `selectedValues`) still counts toward the cap.',
            },
        },
    },
}

export const Virtualized: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <MultiSelectListV2
                label="Columns"
                items={virtualizedItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
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
        label: `Column ${start + i + 1}`,
        value: `column-${start + i + 1}`,
    }))

const InfiniteScrollExample = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [loadedCount, setLoadedCount] = useState(PAGE_SIZE)

    const items: MultiSelectV2GroupType[] = [
        { items: buildPage(0, loadedCount) },
    ]

    return (
        <MultiSelectListV2
            label="Columns"
            items={items}
            selectedValues={selectedValues}
            onSelectionChange={setSelectedValues}
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
                story: 'Pages in more items as the virtualized viewport nears the end (`hasMore` + `onEndReached`), rendering `loadingComponent` while more remain. Infinite scroll only takes effect when `enableVirtualization` is set — the non-virtualized render path has no scroll-tracking to drive it.',
            },
        },
    },
}

export const DisabledAndSkeleton: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ width: 220 }}>
                <MultiSelectListV2
                    label="Disabled"
                    items={flatItems}
                    selectedValues={['name']}
                    onSelectionChange={() => {}}
                    disabled
                />
            </div>
            <div style={{ width: 220 }}>
                <MultiSelectListV2
                    label="Loading"
                    items={flatItems}
                    selectedValues={[]}
                    onSelectionChange={() => {}}
                    skeleton={{ show: true, count: 5 }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '`disabled` disables every row, the search input, and select-all. `skeleton` replaces the whole body with placeholder rows (`aria-busy="true"`, zero tab stops) while data loads.',
            },
        },
    },
}

const InsideDrawerExample = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>([
        'name',
        'email',
    ])

    return (
        <>
            <ButtonV2
                text="Customize columns"
                buttonType={ButtonV2Type.PRIMARY}
                onClick={() => setIsOpen(true)}
            />
            <DrawerV2 open={isOpen} onOpenChange={setIsOpen} direction="right">
                <DrawerV2Portal>
                    <DrawerV2Overlay className="fixed inset-0 z-50 bg-black/40" />
                    <DrawerV2Content className="fixed inset-y-0 right-0 z-50 flex h-full w-[320px] flex-col bg-white p-6 shadow-xl">
                        <DrawerV2Title className="mb-4 text-lg font-semibold">
                            Customize columns
                        </DrawerV2Title>
                        <DrawerV2Body className="flex-1 overflow-y-auto">
                            <MultiSelectListV2
                                label="Columns"
                                items={groupedItems}
                                selectedValues={selectedValues}
                                onSelectionChange={setSelectedValues}
                                enableSelectAll
                                showClearAll
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
                story: 'The motivating use case: MultiSelectListV2 as the body of a "customize columns" DrawerV2, rather than a dropdown. Click "Customize columns" to open the drawer.',
            },
        },
    },
}

export const KeyboardNavigation: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <MultiSelectListV2
                label="Columns"
                items={flatItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const listbox = canvas.getByRole('listbox')
        expect(listbox).toHaveAttribute('aria-multiselectable', 'true')

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
                story: 'APG roving-tabindex keyboard model: exactly one tab stop for the whole list, ArrowDown moves the active option without toggling it, and Enter toggles the active option.',
            },
        },
    },
}

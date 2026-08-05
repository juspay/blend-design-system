import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { fn } from '@storybook/test'
import { expect, userEvent, within } from '@storybook/test'
import {
    MultiSelectV2,
    MultiSelectV2Size,
    MultiSelectV2Variant,
    MultiSelectV2SelectionTagType,
    type MultiSelectV2GroupType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import {
    createControlledAsyncSearchPlay,
    mockAsyncSearchItems,
    useMockAsyncSearch,
} from '../../selectAsyncSearchStory'

const defaultItems: MultiSelectV2GroupType[] = [
    {
        groupLabel: 'Fruits',
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' },
            { label: 'Date', value: 'date' },
            { label: 'Elderberry', value: 'elderberry' },
        ],
    },
    {
        groupLabel: 'Vegetables',
        showSeparator: true,
        items: [
            { label: 'Asparagus', value: 'asparagus' },
            { label: 'Broccoli', value: 'broccoli' },
            { label: 'Carrot', value: 'carrot' },
        ],
    },
]

const itemsWithSubMenu: MultiSelectV2GroupType[] = [
    {
        items: [
            {
                label: 'Parent Option',
                value: 'parent',
                subMenu: [
                    { label: 'Child A', value: 'child-a' },
                    { label: 'Child B', value: 'child-b' },
                ],
            },
        ],
    },
]

const meta: Meta<typeof MultiSelectV2> = {
    title: 'Components/MultiSelectV2',
    component: MultiSelectV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Multi-select dropdown for choosing multiple options from grouped lists.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { MultiSelectV2, MultiSelectV2Size, MultiSelectV2SelectionTagType } from '@juspay/blend-design-system';

const [selected, setSelected] = useState<string[]>([]);

<MultiSelectV2
  label="Choose items"
  placeholder="Select options"
  items={[{ items: [{ label: 'A', value: 'a' }] }]}
  selectedValues={selected}
  onSelectionChange={setSelected}
/>
\`\`\`

\`MultiSelectV2\` is controlled: pass the returned array back through
\`selectedValues\`. Prefer \`onSelectionChange\`, which fires once per user
gesture with the complete resulting selection. \`onChange\` is the legacy
per-item toggle callback and remains supported for compatibility.

## Features
- Multiple selection with count or text display
- Search and filter
- Select All / Clear
- Grouped items with optional separators
- Sub-menus for nested options
- Action buttons (Apply / secondary)
- Virtualization for large lists
- Mobile drawer mode
- Full keyboard and screen reader support
                `,
            },
        },
    },
    args: {
        label: 'Select options',
        placeholder: 'Select options',
        items: defaultItems,
        selectedValues: [],
        onChange: fn(),
        onSelectionChange: fn(),
        size: MultiSelectV2Size.MD,
        variant: MultiSelectV2Variant.CONTAINER,
        selectionTagType: MultiSelectV2SelectionTagType.COUNT,
        search: { show: true, placeholder: 'Search options...' },
        enableSelectAll: false,
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Label for the field (used for accessibility)',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder when nothing is selected',
        },
        selectedValues: {
            control: 'object',
            description: 'Array of selected option values',
        },
        size: {
            control: 'select',
            options: Object.values(MultiSelectV2Size),
            description: 'Trigger size',
        },
        variant: {
            control: 'select',
            options: Object.values(MultiSelectV2Variant),
            description: 'Container or no-container variant',
        },
        selectionTagType: {
            control: 'select',
            options: Object.values(MultiSelectV2SelectionTagType),
            description: 'Show selected as count or comma-separated text',
        },
        enableSelectAll: {
            control: 'boolean',
            description: 'Show Select All row',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the control',
        },
        error: {
            control: 'boolean',
            description: 'Error state',
        },
        required: {
            control: 'boolean',
            description: 'Required field',
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
        onOpenChange: {
            action: 'openChange',
            description: 'Called when menu opens or closes',
        },
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MultiSelectV2>

export const Default: Story = {}

export const WithSelection: Story = {
    args: {
        selectedValues: ['apple', 'banana'],
        selectionTagType: MultiSelectV2SelectionTagType.TEXT,
    },
}

export const Visual: Story = {
    render: function VisualRender() {
        return (
            <div className="flex flex-col gap-8">
                <div>
                    <h3 className="mb-4 text-base font-semibold">All sizes</h3>
                    <div className="flex flex-wrap items-start gap-6">
                        {Object.values(MultiSelectV2Size).map((size) => (
                            <MultiSelectV2
                                key={size}
                                label={`Size ${size}`}
                                placeholder={size}
                                items={defaultItems}
                                selectedValues={[]}
                                onChange={() => {}}
                                size={size}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-base font-semibold">Variants</h3>
                    <div className="flex items-center gap-6">
                        <MultiSelectV2
                            label="Container"
                            placeholder="Container"
                            items={defaultItems}
                            selectedValues={[]}
                            onChange={() => {}}
                            variant={MultiSelectV2Variant.CONTAINER}
                        />
                        <MultiSelectV2
                            label="No container"
                            placeholder="No container"
                            items={defaultItems}
                            selectedValues={[]}
                            onChange={() => {}}
                            variant={MultiSelectV2Variant.NO_CONTAINER}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-base font-semibold">
                        Selection display: Count vs Text
                    </h3>
                    <div className="flex items-center gap-6">
                        <MultiSelectV2
                            label="Count"
                            placeholder="Count"
                            items={defaultItems}
                            selectedValues={['apple', 'banana']}
                            onChange={() => {}}
                            selectionTagType={
                                MultiSelectV2SelectionTagType.COUNT
                            }
                        />
                        <MultiSelectV2
                            label="Text"
                            placeholder="Text"
                            items={defaultItems}
                            selectedValues={['apple', 'banana']}
                            onChange={() => {}}
                            selectionTagType={
                                MultiSelectV2SelectionTagType.TEXT
                            }
                        />
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-base font-semibold">States</h3>
                    <div className="flex flex-wrap items-center gap-6">
                        <MultiSelectV2
                            label="Disabled"
                            placeholder="Disabled"
                            items={defaultItems}
                            selectedValues={[]}
                            onChange={() => {}}
                            disabled
                        />
                        <MultiSelectV2
                            label="Error"
                            placeholder="Error"
                            items={defaultItems}
                            selectedValues={[]}
                            onChange={() => {}}
                            error={{
                                show: true,
                                message: 'This field is required',
                            }}
                        />
                        <MultiSelectV2
                            label="Required"
                            placeholder="Required"
                            items={defaultItems}
                            selectedValues={[]}
                            onChange={() => {}}
                            required
                        />
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Visual variants for sizes, container styles, selection display, and states.',
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
        const [selected, setSelected] = useState<string[]>(
            args.selectedValues ?? []
        )
        return (
            <MultiSelectV2
                {...args}
                selectedValues={selected}
                onSelectionChange={(values) => {
                    args.onSelectionChange?.(values)
                    setSelected(values)
                }}
            />
        )
    },
    args: {
        label: 'Interactive MultiSelect',
        placeholder: 'Choose items',
        enableSelectAll: true,
        selectAllText: 'Select All',
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('combobox', {
            name: /interactive multiselect/i,
        })

        await userEvent.click(trigger)
        await expect(canvas.getByRole('listbox')).toBeInTheDocument()

        const option = canvas.getByRole('option', { name: /apple/i })
        await userEvent.click(option)
        await expect(args.onSelectionChange).toHaveBeenCalled()

        await userEvent.click(trigger)
        await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    },
    parameters: {
        docs: {
            description: {
                story: 'Open the dropdown, select an option, and close. Check the Actions panel for the recommended onSelectionChange callback.',
            },
        },
    },
}

export const WithSelectAllAndActions: Story = {
    render: function WithActionsRender() {
        const [selected, setSelected] = useState<string[]>([])
        return (
            <MultiSelectV2
                label="With actions"
                placeholder="Select then Apply"
                items={defaultItems}
                selectedValues={selected}
                onSelectionChange={setSelected}
                enableSelectAll
                selectAllText="Select All"
                primaryAction={{
                    text: 'Apply',
                    onClick: (vals) => {
                        console.log('Applied', vals)
                    },
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => {},
                }}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Select All row and primary/secondary action buttons in the menu footer.',
            },
        },
    },
}

export const ReactHookFormIntegration: Story = {
    render: function ReactHookFormIntegrationRender() {
        const { control, handleSubmit, watch } = useForm<{
            selections: string[]
        }>({
            defaultValues: { selections: [] },
        })
        const selections = watch('selections')

        return (
            <form
                onSubmit={handleSubmit((values) => console.log(values))}
                className="flex w-96 flex-col gap-4"
            >
                <Controller
                    name="selections"
                    control={control}
                    render={({ field }) => (
                        <MultiSelectV2
                            label="Favorite produce"
                            placeholder="Choose options"
                            items={defaultItems}
                            selectedValues={field.value ?? []}
                            onSelectionChange={field.onChange}
                            enableSelectAll
                        />
                    )}
                />
                <div aria-live="polite">
                    Selected: {selections.join(', ') || 'None'}
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'React Hook Form integration using only the recommended onSelectionChange callback—no reducer, adapter, debounce, or legacy onChange.',
            },
        },
    },
}

export const WithSubMenu: Story = {
    args: {
        label: 'With submenu',
        placeholder: 'Open to see parent → child',
        items: itemsWithSubMenu,
    },
    parameters: {
        docs: {
            description: {
                story: 'Items with nested sub-menus.',
            },
        },
    },
}

export const Accessibility: Story = {
    render: () => (
        <div className="flex flex-col gap-6 max-w-[400px]">
            <div>
                <h3 className="mb-2 text-base font-semibold">
                    Keyboard &amp; screen reader
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                    Use Tab to focus the trigger, Enter/Space to open. Arrow
                    keys to move, Enter to toggle. Escape to close.
                </p>
                <MultiSelectV2
                    label="Accessible multi-select"
                    placeholder="Select options"
                    items={defaultItems}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                />
            </div>
            <div>
                <h3 className="mb-2 text-base font-semibold">
                    With error and required
                </h3>
                <MultiSelectV2
                    label="Required field"
                    placeholder="Required"
                    items={defaultItems}
                    selectedValues={[]}
                    onChange={() => {}}
                    required
                    error={{
                        show: true,
                        message: 'Please select at least one option',
                    }}
                />
            </div>
        </div>
    ),
    parameters: {
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 300 },
        docs: {
            description: {
                story: 'Keyboard navigation and ARIA (combobox, listbox, aria-multiselectable). Use the a11y addon to verify.',
            },
        },
    },
}

export const WithMenuFooter: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <MultiSelectV2
                label="Choose items"
                placeholder="Select options"
                items={defaultItems}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
                search={{ show: true }}
                menuFooter={
                    <div
                        style={{
                            padding: '12px 16px',
                            borderTop: '1px solid #e5e7eb',
                        }}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                alert('Open the "Create new" modal here')
                            }
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: 'transparent',
                                border: '1px dashed #d1d5db',
                                borderRadius: 8,
                                cursor: 'pointer',
                                color: '#374151',
                                fontWeight: 500,
                            }}
                        >
                            + Create new item
                        </button>
                    </div>
                }
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Renders custom content (e.g. a "Create new" button) pinned at the bottom of the menu via the `menuFooter` prop. The footer is not selectable and stays visible even when the list is empty.',
            },
        },
    },
}

const ControlledAsyncSearchExample = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const search = useMockAsyncSearch()

    return (
        <MultiSelectV2
            label="Find people"
            placeholder="Select people"
            items={search.items}
            selectedValues={selectedValues}
            onSelectionChange={setSelectedValues}
            search={search}
        />
    )
}

export const ControlledAsyncSearch: Story = {
    render: () => <ControlledAsyncSearchExample />,
    play: createControlledAsyncSearchPlay(
        'combobox',
        /find people/i,
        /find people/i
    ),
    parameters: {
        docs: {
            description: {
                story: 'Controlled search debounces a mock API request. The consumer owns the query and supplies already-filtered items.',
            },
        },
    },
}

export const ControlledSearchLoading: Story = {
    args: {
        label: 'Find people',
        placeholder: 'Select people',
        items: mockAsyncSearchItems,
        selectedValues: [],
        search: { searchText: 'ada', isSearchLoading: true },
    },
}

export const ControlledSearchEmpty: Story = {
    args: {
        label: 'Find people',
        placeholder: 'Select people',
        items: [],
        selectedValues: [],
        search: {
            searchText: '',
            emptyStateText: 'Start typing to search',
        },
    },
}

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    SingleSelectV2,
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type SingleSelectV2GroupType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { useMockAsyncSearch } from '../../selectAsyncSearchStory'

const defaultItems: SingleSelectV2GroupType[] = [
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

const meta: Meta<typeof SingleSelectV2> = {
    title: 'Components/SingleSelectV2',
    component: SingleSelectV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Single-select dropdown for choosing one option from grouped lists.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { SingleSelectV2, SingleSelectV2Size, SingleSelectV2Variant } from '@juspay/blend-design-system';

const [selected, setSelected] = useState<string>('');

<SingleSelectV2
  label="Choose a fruit"
  placeholder="Select an option"
  items={items}
  selected={selected}
  onSelect={setSelected}
  search={{ show: true }}
/>
\`\`\`

## Features
- **Single Selection**: Select one item from grouped lists
- **Search & Filtering**: Built-in search functionality
- **Virtualization**: Support for large datasets
- **Custom Footer**: Render arbitrary content (e.g. a "Create new" button) pinned at the bottom of the menu via \`menuFooter\`
- **Accessibility**: Full keyboard navigation and screen reader support
`,
            },
        },
    },
    tags: ['autodocs'],
    args: {
        label: 'Choose a fruit',
        placeholder: 'Select an option',
        items: defaultItems,
        selected: '',
        onSelect: () => {},
    },
}

export default meta
type Story = StoryObj<typeof SingleSelectV2>

export const Default: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>('')

        return (
            <SingleSelectV2
                label="Choose a fruit"
                placeholder="Select an option"
                items={defaultItems}
                selected={selected}
                onSelect={setSelected}
                search={{ show: true }}
            />
        )
    },
}

export const WithMenuFooter: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>('')

        return (
            <SingleSelectV2
                label="Choose a fruit"
                placeholder="Select an option"
                items={defaultItems}
                selected={selected}
                onSelect={setSelected}
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

export const WithMenuFooterEmptyList: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>('')

        return (
            <SingleSelectV2
                label="Choose a fruit"
                placeholder="Select an option"
                items={[]}
                selected={selected}
                onSelect={setSelected}
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
                story: 'The `menuFooter` stays reachable even when there are zero items, so a "Create new" action is always accessible.',
            },
        },
    },
}

const ControlledAsyncSearchExample = () => {
    const [selected, setSelected] = useState('')
    const search = useMockAsyncSearch()

    return (
        <SingleSelectV2
            label="Find a person"
            placeholder="Select a person"
            items={search.items}
            selected={selected}
            onSelect={setSelected}
            search={search}
        />
    )
}

export const ControlledAsyncSearch: Story = {
    render: () => <ControlledAsyncSearchExample />,
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
        label: 'Find a person',
        placeholder: 'Select a person',
        items: [],
        selected: '',
        onSelect: () => {},
        search: { searchText: 'ada', isSearchLoading: true },
    },
}

export const ControlledSearchEmpty: Story = {
    args: {
        label: 'Find a person',
        placeholder: 'Select a person',
        items: [],
        selected: '',
        onSelect: () => {},
        search: {
            searchText: '',
            emptyStateText: 'Start typing to search',
        },
    },
}

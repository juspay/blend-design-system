import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { SearchInput } from '@juspay/blend-design-system'
import { Search, X, Filter, MapPin, Calendar } from 'lucide-react'

const meta: Meta<typeof SearchInput> = {
    title: 'Components/Inputs/SearchInput',
    component: SearchInput,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A specialized search input component optimized for search functionality with customizable slots for search icons and filter controls.

## Features
- Optimized for search use cases
- Left and right slot content for icons and actions
- Error state handling
- Clear button functionality
- Filter integration support
- Disabled state support
- Form integration ready
- Accessible design with proper search semantics

## Usage

\`\`\`tsx
import { SearchInput } from '@juspay/blend-design-system';

<SearchInput
  placeholder="Search products..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  leftSlot={<Search size={16} />}
  rightSlot={searchQuery && (
    <button onClick={() => setSearchQuery('')}>
      <X size={16} />
    </button>
  )}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current value of the search input',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'search-changed',
            description: 'Callback fired when the search input value changes',
            table: {
                type: {
                    summary: '(e: React.ChangeEvent<HTMLInputElement>) => void',
                },
                category: 'Core',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when input is empty',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the input is in error state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the input is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for form submission',
            table: {
                type: { summary: 'string' },
                category: 'Form',
            },
        },
        leftSlot: {
            control: false,
            description:
                'Content displayed on the left side of the input (typically search icon)',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Slots',
            },
        },
        rightSlot: {
            control: false,
            description:
                'Content displayed on the right side of the input (typically clear or filter button)',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Slots',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchInput>

// Default story
export const Default: Story = {
    render: function DefaultSearchInput(args) {
        const [value, setValue] = useState('')

        return (
            <SearchInput
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
    args: {
        placeholder: 'Search...',
        disabled: false,
        error: false,
    },
}

// With search icon
export const WithSearchIcon: Story = {
    render: () => {
        const [value, setValue] = useState('')

        return (
            <SearchInput
                placeholder="Search products..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                leftSlot={<Search size={16} />}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SearchInput with a search icon in the left slot.',
            },
        },
    },
}

// With clear functionality
export const WithClearButton: Story = {
    render: () => {
        const [value, setValue] = useState('sample search query')

        return (
            <SearchInput
                placeholder="Search with clear button..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                leftSlot={<Search size={16} />}
                rightSlot={
                    value && (
                        <button
                            type="button"
                            onClick={() => setValue('')}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <X size={16} />
                        </button>
                    )
                }
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SearchInput with a clear button that appears when there is content.',
            },
        },
    },
}

// Search with filters
export const WithFilters: Story = {
    render: () => {
        const [value, setValue] = useState('')
        const [showFilters, setShowFilters] = useState(false)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <SearchInput
                    placeholder="Search with filters..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    leftSlot={<Search size={16} />}
                    rightSlot={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {value && (
                                <button
                                    type="button"
                                    onClick={() => setValue('')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: showFilters ? '#0066cc' : 'inherit',
                                }}
                            >
                                <Filter size={16} />
                            </button>
                        </div>
                    }
                />
                {showFilters && (
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px',
                            fontSize: '14px',
                        }}
                    >
                        Filter options would appear here
                    </div>
                )}
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SearchInput with filter toggle and clear functionality.',
            },
        },
    },
}

// Different search contexts
export const SearchContexts: Story = {
    render: () => {
        const [values, setValues] = useState({
            general: '',
            location: '',
            date: '',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <SearchInput
                    placeholder="Search everything..."
                    value={values.general}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            general: e.target.value,
                        }))
                    }
                    leftSlot={<Search size={16} />}
                    rightSlot={
                        values.general && (
                            <button
                                type="button"
                                onClick={() =>
                                    setValues((prev) => ({
                                        ...prev,
                                        general: '',
                                    }))
                                }
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <X size={16} />
                            </button>
                        )
                    }
                />
                <SearchInput
                    placeholder="Search locations..."
                    value={values.location}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            location: e.target.value,
                        }))
                    }
                    leftSlot={<MapPin size={16} />}
                    rightSlot={
                        values.location && (
                            <button
                                type="button"
                                onClick={() =>
                                    setValues((prev) => ({
                                        ...prev,
                                        location: '',
                                    }))
                                }
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <X size={16} />
                            </button>
                        )
                    }
                />
                <SearchInput
                    placeholder="Search dates..."
                    value={values.date}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, date: e.target.value }))
                    }
                    leftSlot={<Calendar size={16} />}
                    rightSlot={
                        values.date && (
                            <button
                                type="button"
                                onClick={() =>
                                    setValues((prev) => ({ ...prev, date: '' }))
                                }
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <X size={16} />
                            </button>
                        )
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SearchInput configured for different search contexts with appropriate icons.',
            },
        },
    },
}

// Error state
export const ErrorState: Story = {
    render: () => {
        const [value, setValue] = useState('invalid search query')

        return (
            <SearchInput
                placeholder="Search with validation..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                leftSlot={<Search size={16} />}
                error
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SearchInput in error state.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <SearchInput
                placeholder="This search is disabled"
                value=""
                onChange={() => {}}
                leftSlot={<Search size={16} />}
                disabled
            />
            <SearchInput
                placeholder="Search..."
                value="Disabled with content"
                onChange={() => {}}
                leftSlot={<Search size={16} />}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'SearchInput in disabled state, both empty and with content.',
            },
        },
    },
}

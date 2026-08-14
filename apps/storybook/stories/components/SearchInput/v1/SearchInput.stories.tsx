import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { SearchInput } from '@juspay/blend-design-system/deprecated/search-input'
import { Search, X, Filter, MapPin, Calendar } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const meta: Meta<typeof SearchInput> = {
    title: 'Components/Inputs/SearchInput',
    component: SearchInput,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for interactive form controls
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A specialized search input component optimized for search functionality with customizable slots for search icons and filter controls.',
        docs: {
            description: {
                component: `

## Usage

\`\`\`tsx
import { SearchInput } from '@juspay/blend-design-system/deprecated/search-input';

<SearchInput
  placeholder="Search products..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  leftSlot={<Search size={16} aria-hidden="true" />}
  rightSlot={searchQuery && (
    <button 
      onClick={() => setSearchQuery('')}
      aria-label="Clear search"
      type="button"
    >
      <X size={16} />
    </button>
  )}
/>
\`\`\`

## Features
- Optimized for search use cases
- Left and right slot content for icons and actions
- Error state handling
- Clear button functionality
- Filter integration support
- Disabled state support
- Form integration ready
- Accessible design with proper search semantics

## Accessibility

- Uses native \`<input type="text">\` for proper semantics (can be enhanced with \`type="search"\` if needed)
- Placeholder text provides context, but should be supplemented with visible labels or aria-label for screen readers
- Error state is visually indicated via border color changes
- Focus styles are keyboard-friendly with clear visual indicators
- Left/right slot icons are decorative by default and should have \`aria-hidden="true"\` when not interactive
- Clear buttons and filter controls should have proper \`aria-label\` attributes for accessibility
- Disabled state prevents interaction and is communicated programmatically

**WCAG Compliance Target**: 2.2 Level AA (designed to support WCAG 2.0, 2.1, and 2.2 for search input components)

**Intended coverage:**
- **Perceivable**: Search input is visible and can be programmatically identified. Icons and controls have accessible names.
- **Operable**: Fully keyboard operable (Tab / Shift+Tab focus, typing, Enter for form submission). Clear buttons and filters are keyboard accessible.
- **Understandable**: Clear placeholder text and visual feedback. Error states are clearly indicated.
- **Robust**: Built with semantic HTML and ARIA-friendly props for screen readers.

**Verification:**
- **Storybook a11y addon**: Use the Accessibility panel to check for violations (expected 0 for A/AA)
- **jest-axe tests**: Add \`SearchInput.accessibility.test.tsx\` (mirroring TextInput/NumberInput) and run:
\`\`\`bash
pnpm test SearchInput.accessibility
\`\`\`
- **Manual tests**: Verify with screen readers (VoiceOver/NVDA), keyboard-only navigation, and contrast tools
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
                            className="bg-transparent border-0 cursor-pointer flex items-center"
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
            <div className="flex flex-col gap-3">
                <SearchInput
                    placeholder="Search with filters..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    leftSlot={<Search size={16} />}
                    rightSlot={
                        <div className="flex items-center gap-2">
                            {value && (
                                <button
                                    type="button"
                                    onClick={() => setValue('')}
                                    className="bg-transparent border-0 cursor-pointer flex items-center"
                                >
                                    <X size={16} />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`bg-transparent border-0 cursor-pointer flex items-center ${showFilters ? 'text-blue-600' : ''}`}
                            >
                                <Filter size={16} />
                            </button>
                        </div>
                    }
                />
                {showFilters && (
                    <div className="p-3 bg-gray-100 rounded text-sm">
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
            <div className="flex flex-col gap-5">
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
                                className="bg-transparent border-0 cursor-pointer"
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
                                className="bg-transparent border-0 cursor-pointer"
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
                                className="bg-transparent border-0 cursor-pointer"
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
        <div className="flex flex-col gap-5">
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

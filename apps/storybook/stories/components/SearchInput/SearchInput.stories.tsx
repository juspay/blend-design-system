import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { SearchInput } from '@juspay/blend-design-system'
import { Search, X, Filter, MapPin, Calendar } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof SearchInput> = {
    title: 'Components/Inputs/SearchInput',
    component: SearchInput,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for interactive form controls
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
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

## Usage

\`\`\`tsx
import { SearchInput } from '@juspay/blend-design-system';

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

// Accessibility-focused examples
export const Accessibility: Story = {
    render: () => {
        const [searchQuery, setSearchQuery] = useState('')
        const [locationSearch, setLocationSearch] = useState('')
        const [errorSearch, setErrorSearch] = useState('invalid')

        const searchError =
            errorSearch.length > 0 && errorSearch.length < 3
                ? 'Search query must be at least 3 characters'
                : ''

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    maxWidth: '800px',
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Basic Search with Accessible Icons
                    </h3>
                    <SearchInput
                        placeholder="Search products, services, or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        leftSlot={<Search size={16} aria-hidden="true" />}
                        rightSlot={
                            searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <X size={16} aria-hidden="true" />
                                </button>
                            )
                        }
                        name="search"
                    />
                    <p
                        style={{
                            marginTop: '8px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        <strong>Accessibility notes:</strong> Search icon has
                        aria-hidden="true" as it's decorative. Clear button has
                        aria-label for screen readers. Input has name attribute
                        for form submission.
                    </p>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Search with Contextual Icons
                    </h3>
                    <SearchInput
                        placeholder="Search locations..."
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        leftSlot={<MapPin size={16} aria-hidden="true" />}
                        rightSlot={
                            locationSearch && (
                                <button
                                    type="button"
                                    onClick={() => setLocationSearch('')}
                                    aria-label="Clear location search"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <X size={16} aria-hidden="true" />
                                </button>
                            )
                        }
                        name="location-search"
                    />
                    <p
                        style={{
                            marginTop: '8px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        <strong>Accessibility notes:</strong> MapPin icon
                        provides visual context but is marked as decorative.
                        Placeholder text clearly indicates the search purpose.
                    </p>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Error State and Validation
                    </h3>
                    <SearchInput
                        placeholder="Search with validation..."
                        value={errorSearch}
                        onChange={(e) => setErrorSearch(e.target.value)}
                        leftSlot={<Search size={16} aria-hidden="true" />}
                        error={!!searchError}
                        name="validated-search"
                    />
                    {searchError && (
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '14px',
                                color: '#E7000B',
                            }}
                            role="alert"
                            aria-live="polite"
                        >
                            {searchError}
                        </p>
                    )}
                    <p
                        style={{
                            marginTop: '8px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        <strong>Accessibility notes:</strong> Error state is
                        visually indicated via border color. Error message uses
                        role="alert" and aria-live="polite" for screen reader
                        announcements.
                    </p>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Disabled State
                    </h3>
                    <SearchInput
                        placeholder="This search is disabled"
                        value=""
                        onChange={() => {}}
                        leftSlot={<Search size={16} aria-hidden="true" />}
                        disabled
                        name="disabled-search"
                    />
                    <p
                        style={{
                            marginTop: '8px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        <strong>Accessibility notes:</strong> Disabled fields
                        are not focusable and do not submit values. Disabled
                        state is communicated programmatically to assistive
                        technologies.
                    </p>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Keyboard and Screen Reader Friendly
                    </h3>
                    <SearchInput
                        placeholder="Try keyboard navigation: Tab to focus, type to search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        leftSlot={<Search size={16} aria-hidden="true" />}
                        rightSlot={
                            searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search query"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <X size={16} aria-hidden="true" />
                                </button>
                            )
                        }
                        name="keyboard-search"
                    />
                    <p
                        style={{
                            marginTop: '8px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        <strong>Accessibility notes:</strong> All interactive
                        elements (input and clear button) are keyboard
                        accessible. Focus indicators are clearly visible. Clear
                        button has descriptive aria-label.
                    </p>
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating proper icon handling, error messaging, disabled state, keyboard navigation, and screen reader support for search inputs.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to icon accessibility (aria-hidden), button labels (aria-label), and error messaging.

2. **jest-axe tests**:
   - Add \`SearchInput.accessibility.test.tsx\` mirroring TextInput's tests and run:
   \`\`\`bash
   pnpm test SearchInput.accessibility
   \`\`\`
   - Validate WCAG 2.0, 2.1, and 2.2 A and AA success criteria for search inputs (keyboard support, icon accessibility, error handling).

3. **Manual testing**:
   - Navigate using keyboard only (Tab / Shift+Tab, Enter for form submission, Space/Enter on clear button).
   - Use a screen reader (VoiceOver/NVDA) to confirm placeholder text, clear button labels, and error messages are announced.
   - Verify color contrast of text, borders, and focus styles using contrast tools.
   - Test that decorative icons (with aria-hidden="true") are not announced by screen readers.
                `,
            },
        },
        a11y: {
            ...getA11yConfig('form'),
        },
    },
}

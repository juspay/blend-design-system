import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'
import { Search, X, Filter, MapPin } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { SearchInputV2 } from '../../../../../../packages/blend/lib/components/InputsV2/SearchInputV2'

const noop = (): void => {}

const stack = (maxWidth = 480) =>
    ({
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth,
    }) as const

const visualGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 24,
    alignItems: 'start',
} as const

const meta: Meta<typeof SearchInputV2> = {
    title: 'Components/Inputs/SearchInputV2',
    component: SearchInputV2,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Search field (V2) with bottom border styling, optional left/right slots, built-in clear, and responsive light/dark tokens.',
        docs: {
            description: {
                component: `
Single-line search input with \`role="searchbox"\`, icon slots, and underline-style focus.

## Story groups
- **Default**: controls + controlled state
- **Visual**: static grid for Chromatic / design review
- **Interactive**: typing + Storybook \`play\` test
- **Accessibility**: reference layout for manual and addon checks

## Features
- **Left / right slots** for icons or actions (width measured for text padding)
- **Clear**: default \`X\` when \`allowClear\` and value is non-empty; override with \`rightSlot\`, \`clearIcon\`, or \`onClear\`
- **States**: \`disabled\`, \`error\` (boolean)
- **Theming**: \`SEARCH_INPUT_V2\` tokens (light / dark via ThemeProvider)

## Accessibility
- Native text input with \`role="searchbox"\`
- \`aria-invalid\` when \`error\` is true
- Decorative slot icons: add \`aria-hidden\` where appropriate; interactive controls need \`aria-label\`

## Usage

\`\`\`tsx
import { SearchInputV2 } from '@juspay/blend-design-system/...';
import { Search } from 'lucide-react';

<SearchInputV2
  placeholder="Search…"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  leftSlot={<Search size={16} aria-hidden />}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Controlled value',
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        placeholder: {
            control: { type: 'text' },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Enter' },
                category: 'Content',
            },
        },
        name: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        disabled: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'State' },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Error styling on the field',
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        allowClear: {
            control: { type: 'boolean' },
            description:
                'When true and no custom rightSlot, shows clear control when value is non-empty',
            table: { type: { summary: 'boolean' }, category: 'Behavior' },
        },
        leftSlot: {
            control: false,
            description: 'Left icon or node',
            table: { type: { summary: 'React.ReactNode' }, category: 'Slots' },
        },
        rightSlot: {
            control: false,
            description: 'Right icon or action (disables default clear)',
            table: { type: { summary: 'React.ReactNode' }, category: 'Slots' },
        },
        clearIcon: {
            control: false,
            table: { type: { summary: 'React.ReactNode' }, category: 'Slots' },
        },
        onChange: {
            action: 'changed',
            table: {
                type: {
                    summary: '(e: React.ChangeEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onClear: {
            action: 'cleared',
            table: { type: { summary: '() => void' }, category: 'Events' },
        },
        onFocus: {
            action: 'focused',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onBlur: {
            action: 'blurred',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchInputV2>

export const Default: Story = {
    render: function DefaultSearchInputV2(args) {
        const [value, setValue] = useState('')
        return (
            <div style={{ maxWidth: 400 }}>
                <SearchInputV2
                    {...args}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        args.onChange?.(e)
                    }}
                    leftSlot={<Search size={16} aria-hidden />}
                />
            </div>
        )
    },
    args: {
        placeholder: 'Search…',
        allowClear: true,
    },
}

// —— Visual (Chromatic / static variants) ——————————————————————

/** Representative states for visual regression and design review. */
export const VisualStates: Story = {
    name: 'Visual — state grid',
    render: function VisualStatesStory() {
        return (
            <div style={visualGrid}>
                <div>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 8,
                        }}
                    >
                        Default (empty)
                    </p>
                    <SearchInputV2
                        value=""
                        onChange={noop}
                        placeholder="Search…"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </div>
                <div>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 8,
                        }}
                    >
                        With value
                    </p>
                    <SearchInputV2
                        value="Tokyo"
                        onChange={noop}
                        placeholder="Search…"
                        leftSlot={<MapPin size={16} aria-hidden />}
                    />
                </div>
                <div>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 8,
                        }}
                    >
                        Named (empty)
                    </p>
                    <SearchInputV2
                        name="visual-named"
                        value=""
                        onChange={noop}
                        placeholder="Search…"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </div>
                <div>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 8,
                        }}
                    >
                        Error
                    </p>
                    <SearchInputV2
                        error
                        value=""
                        onChange={noop}
                        placeholder="Error"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </div>
                <div>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 8,
                        }}
                    >
                        Disabled
                    </p>
                    <SearchInputV2
                        disabled
                        value="Locked"
                        onChange={noop}
                        placeholder="Search…"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </div>
                <div>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 8,
                        }}
                    >
                        Built-in clear
                    </p>
                    <SearchInputV2
                        allowClear
                        value="clear me"
                        onChange={noop}
                        placeholder="Search…"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Static snapshot of common states for Chromatic and design review: empty, value, named empty, error, disabled, built-in clear.',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}

// —— Interactive ————————————————————————————————————————————————

/** Typing updates value; play test types into the searchbox and asserts value. */
export const InteractiveTyping: Story = {
    name: 'Interactive — typing',
    render: function InteractiveTypingStory() {
        const [value, setValue] = useState('')
        return (
            <div style={stack(480)}>
                <p
                    style={{
                        margin: 0,
                        fontSize: 13,
                        color: 'var(--color-text-muted, #64748b)',
                    }}
                >
                    Focus the field and type. Use <strong>Tab</strong> to move
                    focus; built-in clear appears when <code>allowClear</code>{' '}
                    and the value is non-empty.
                </p>
                <SearchInputV2
                    id="interactive-search-typing"
                    aria-label="Demo search"
                    placeholder="Type to filter…"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    allowClear
                    leftSlot={<Search size={16} aria-hidden />}
                />
                <p
                    aria-live="polite"
                    style={{ margin: 0, fontSize: 13, fontWeight: 600 }}
                >
                    Value: &quot;{value}&quot;
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Manual try: type in the field. The interaction test types `ab` and checks the searchbox value.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByRole('searchbox', { name: /demo search/i })
        await userEvent.click(input)
        await userEvent.keyboard('ab')
        await expect(input).toHaveValue('ab')
    },
}

// —— Accessibility (reference) ————————————————————————————————

export const Accessibility: Story = {
    name: 'Accessibility — reference',
    render: function AccessibilityStory() {
        const [catalogVal, setCatalogVal] = useState('')
        const [errVal, setErrVal] = useState('bad')
        const [clearVal, setClearVal] = useState('typed')
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    padding: 24,
                    maxWidth: 560,
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: 12,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Named search (aria-label)
                    </h3>
                    <SearchInputV2
                        aria-label="Product catalog search"
                        name="catalog-q"
                        value={catalogVal}
                        onChange={(e) => setCatalogVal(e.target.value)}
                        placeholder="Search products…"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: 12,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Error (aria-invalid)
                    </h3>
                    <SearchInputV2
                        aria-label="Search with error styling"
                        error
                        value={errVal}
                        onChange={(e) => setErrVal(e.target.value)}
                        placeholder="Fix your query"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: 12,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Disabled
                    </h3>
                    <SearchInputV2
                        aria-label="Disabled search"
                        disabled
                        value="Read-only value"
                        onChange={noop}
                        placeholder="Unavailable"
                        leftSlot={<Search size={16} aria-hidden />}
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: 12,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Right slot with accessible control
                    </h3>
                    <p
                        style={{
                            margin: '0 0 8px',
                            fontSize: 13,
                            color: 'var(--color-text-muted, #64748b)',
                        }}
                    >
                        Custom actions should expose an accessible name (
                        <code>aria-label</code> on buttons).
                    </p>
                    <SearchInputV2
                        aria-label="Search with filter action"
                        value={clearVal}
                        onChange={(e) => setClearVal(e.target.value)}
                        placeholder="Search…"
                        leftSlot={<Search size={16} aria-hidden />}
                        rightSlot={
                            <button
                                type="button"
                                aria-label="Open filters"
                                style={{
                                    display: 'inline-flex',
                                    padding: 0,
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                            >
                                <Filter size={16} aria-hidden />
                            </button>
                        }
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Reference layout for accessibility review of SearchInputV2:

- **searchbox**: use \`aria-label\` when there is no visible label; pair with \`placeholder\` for context
- **error**: \`aria-invalid="true"\` when \`error\` is set
- **disabled**: input is not editable; value still exposed to AT as appropriate
- **Slots**: decorative icons use \`aria-hidden\`; interactive controls need \`aria-label\` (or visible text)

**Verification**
1. Open the **Accessibility** addon — no violations for these examples.
2. Navigate with **Tab**; confirm focus order and visible focus styles on the field.
3. Use a screen reader to verify search field name and invalid state when \`error\` is true.
`,
            },
        },
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}

// —— Variants ————————————————————————————————————————————————————

export const WithLeftAndRightIcons: Story = {
    name: 'Left + right slots',
    render: function WithSlots() {
        const [value, setValue] = useState('query')
        return (
            <div style={{ maxWidth: 400 }}>
                <SearchInputV2
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search and filter"
                    leftSlot={<Search size={16} aria-hidden />}
                    rightSlot={<Filter size={16} aria-hidden />}
                />
            </div>
        )
    },
}

export const BuiltInClear: Story = {
    name: 'Built-in clear (allowClear)',
    render: function BuiltInClearStory() {
        const [value, setValue] = useState('clear me')
        return (
            <div style={{ maxWidth: 400 }}>
                <SearchInputV2
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type to show clear"
                    allowClear
                    leftSlot={<Search size={16} aria-hidden />}
                />
            </div>
        )
    },
}

export const ErrorState: Story = {
    render: function ErrorStateStory() {
        const [value, setValue] = useState('invalid')
        return (
            <div style={{ maxWidth: 400 }}>
                <SearchInputV2
                    error
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Error styling"
                    leftSlot={<Search size={16} aria-hidden />}
                />
            </div>
        )
    },
}

export const Disabled: Story = {
    render: function DisabledStory() {
        return (
            <div style={{ maxWidth: 400 }}>
                <SearchInputV2
                    disabled
                    value="Cannot edit"
                    onChange={() => {}}
                    placeholder="Disabled"
                    leftSlot={<Search size={16} aria-hidden />}
                />
            </div>
        )
    },
}

export const NoIcons: Story = {
    name: 'No slots',
    render: function NoIconsStory() {
        const [value, setValue] = useState('')
        return (
            <div style={{ maxWidth: 400 }}>
                <SearchInputV2
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Plain search"
                    allowClear
                />
            </div>
        )
    },
}

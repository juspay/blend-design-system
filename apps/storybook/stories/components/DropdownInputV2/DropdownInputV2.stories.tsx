import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import {
    DropdownInputV2,
    DropdownPosition,
} from '../../../../../packages/blend/lib/components/InputsV2/DropdownInputV2'
import { InputSizeV2 } from '../../../../../packages/blend/lib/components/InputsV2/inputV2.types'
import type { SingleSelectV2GroupType } from '../../../../../packages/blend/lib/components/SingleSelectV2/singleSelectV2.types'

const countryItems: SingleSelectV2GroupType[] = [
    {
        groupLabel: 'Popular',
        items: [
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'UK', disabled: true },
            { label: 'Canada', value: 'CA' },
        ],
    },
    {
        groupLabel: 'More',
        items: [
            { label: 'Australia', value: 'AU' },
            { label: 'Germany', value: 'DE' },
            { label: 'Japan', value: 'JP' },
        ],
    },
]

const currencyItems: SingleSelectV2GroupType[] = [
    {
        groupLabel: 'Currencies',
        items: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP', disabled: true },
        ],
    },
]

const noop = (): void => {}

const stack = (maxWidth = 420) =>
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

const meta: Meta<typeof DropdownInputV2> = {
    title: 'Components/Inputs/DropdownInputV2',
    component: DropdownInputV2,
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
        docs: {
            description: {
                component: `
Composite field (V2) that pairs a text input with a \`SingleSelectV2\` dropdown: country codes, currencies, domains, etc.

## Story groups
- **Default**: Controls + live state (primary playground)
- **VisualStates**: Static tiles for Chromatic / design review
- **Sizes**: All \`InputSizeV2\` values
- **ConstrainedMenu**: \`maxMenuHeight\` / \`minMenuWidth\` / \`maxMenuWidth\`
- **Interactive**: Keyboard and \`play\` interaction tests
- **Accessibility**: Reference layout for a11y review (addon + manual)

## Features
- **Input** via \`input={{ value, onChange, placeholder, size? }}\` — \`onChange\` receives the string value
- **Dropdown** via \`dropDown={{ items, value, onSelect, placeholder, label, size? }}\`
- Sizes: \`sm\`, \`md\`, \`lg\` (\`InputSizeV2\`); top-level \`size\` or per-slot sizes
- \`dropdownPosition\`: \`left\` or \`right\` relative to the field
- Error: \`error: { show, message }\`; hint text; required; disabled
- Optional menu sizing: \`maxMenuHeight\`, \`minMenuWidth\`, \`maxMenuWidth\`
- \`forwardRef\` → native text \`<input>\`

## Accessibility

- Text input and dropdown are labeled; footer links hint and error via \`aria-describedby\`
- When the selected option is \`disabled\`, the text input is disabled for consistency
- **WCAG target**: 2.1 Level AA (supports 2.2)

**Verification**
- **Storybook a11y addon**: Accessibility panel — expect no A/AA violations for these stories
- **Manual**: Keyboard (Tab, type, open menu), screen reader for label and errors

\`\`\`tsx
import {
  DropdownInputV2,
  DropdownPosition,
  InputSizeV2,
} from '@juspay/blend-design-system/…';

<DropdownInputV2
  label="Phone"
  size={InputSizeV2.MD}
  dropdownPosition={DropdownPosition.LEFT}
  input={{
    value: phone,
    onChange: setPhone,
    placeholder: '555-0100',
  }}
  dropDown={{
    items: countryGroups,
    value: country,
    onSelect: setCountry,
    placeholder: 'Code',
    label: 'Country',
  }}
/>
\`\`\`
`,
            },
        },
    },
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Label above the field',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label under the main label',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Tooltip for the label help icon',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint below the field',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        required: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        disabled: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'State' },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(InputSizeV2),
            description:
                'Overall size (overridable via input.size / dropDown.size)',
            table: {
                type: { summary: 'InputSizeV2' },
                defaultValue: { summary: 'md' },
                category: 'Appearance',
            },
        },
        error: {
            control: { type: 'object' },
            description: 'Error state: { show: boolean, message: string }',
            table: { type: { summary: 'object' }, category: 'Validation' },
        },
        dropdownPosition: {
            control: { type: 'select' },
            options: Object.values(DropdownPosition),
            table: {
                type: { summary: 'DropdownPosition' },
                defaultValue: { summary: 'left' },
                category: 'Dropdown',
            },
        },
        input: {
            control: false,
            description:
                '{ value?, onChange?, placeholder?, size?, label? } — onChange(value: string)',
            table: { type: { summary: 'object' }, category: 'Input' },
        },
        dropDown: {
            control: false,
            description:
                '{ items?, value?, onSelect?, placeholder?, label?, size? }',
            table: { type: { summary: 'object' }, category: 'Dropdown' },
        },
        maxMenuHeight: {
            control: { type: 'number' },
            table: { type: { summary: 'number' }, category: 'Dropdown' },
        },
        minMenuWidth: {
            control: { type: 'number' },
            table: { type: { summary: 'number' }, category: 'Dropdown' },
        },
        maxMenuWidth: {
            control: { type: 'number' },
            table: { type: { summary: 'number' }, category: 'Dropdown' },
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
        onDropdownOpen: {
            action: 'dropdown-open',
            table: { type: { summary: '() => void' }, category: 'Events' },
        },
        onDropdownClose: {
            action: 'dropdown-close',
            table: { type: { summary: '() => void' }, category: 'Events' },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownInputV2>

// —— Core (controls) ————————————————————————————————————————————

export const Default: Story = {
    render: function DefaultDropdownInputV2(args) {
        const [value, setValue] = useState('')
        const [dropdownValue, setDropdownValue] = useState('US')
        return (
            <DropdownInputV2
                {...args}
                input={{
                    ...args.input,
                    value,
                    onChange: setValue,
                    placeholder: args.input?.placeholder ?? 'Enter city',
                }}
                dropDown={{
                    ...args.dropDown,
                    items: countryItems,
                    value: dropdownValue,
                    onSelect: setDropdownValue,
                    placeholder: args.dropDown?.placeholder ?? 'Country',
                    label: args.dropDown?.label ?? 'Region',
                }}
            />
        )
    },
    args: {
        label: 'Location',
        size: InputSizeV2.MD,
        disabled: false,
        required: false,
        dropdownPosition: DropdownPosition.LEFT,
        error: { show: false, message: '' },
        input: { placeholder: 'Enter city' },
        dropDown: { placeholder: 'Country', label: 'Region' },
    },
}

// —— Visual (Chromatic / static variants) ——————————————————————

/** Representative states for visual regression and design review. */
export const VisualStates: Story = {
    render: function VisualStatesStory() {
        return (
            <div style={visualGrid}>
                <DropdownInputV2
                    label="Empty"
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: 'US',
                        onSelect: noop,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
                <DropdownInputV2
                    label="With value"
                    input={{
                        value: 'Seattle',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: 'US',
                        onSelect: noop,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
                <DropdownInputV2
                    label="Required + hint"
                    required
                    hintText="Select a country, then enter the city."
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: 'US',
                        onSelect: noop,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
                <DropdownInputV2
                    label="Error"
                    error={{
                        show: true,
                        message: 'Please correct this field.',
                    }}
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: 'US',
                        onSelect: noop,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
                <DropdownInputV2
                    label="Disabled"
                    disabled
                    input={{
                        value: 'Berlin',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: 'DE',
                        onSelect: noop,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
                <DropdownInputV2
                    label="Dropdown on right"
                    dropdownPosition={DropdownPosition.RIGHT}
                    input={{
                        value: '',
                        onChange: noop,
                        placeholder: '0.00',
                    }}
                    dropDown={{
                        items: currencyItems,
                        value: 'USD',
                        onSelect: noop,
                        placeholder: 'Currency',
                        label: 'CCY',
                    }}
                />
                <DropdownInputV2
                    label="Selected option disabled"
                    hintText="UK is disabled; text field is disabled until you change selection."
                    input={{
                        value: 'Cannot type',
                        onChange: noop,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: 'UK',
                        onSelect: noop,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
            </div>
        )
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Static snapshot of common states (empty, filled, required + hint, error, disabled, right position, disabled menu item selected).',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}

// —— Variants ———————————————————————————————————————————————————

export const Sizes: Story = {
    render: function SizesStory() {
        const [sm, setSm] = useState({ text: '', code: 'US' })
        const [md, setMd] = useState({ text: '', code: 'US' })
        const [lg, setLg] = useState({ text: '', code: 'US' })
        return (
            <div style={stack(480)}>
                <DropdownInputV2
                    label="Small"
                    size={InputSizeV2.SM}
                    input={{
                        value: sm.text,
                        onChange: (v) => setSm((s) => ({ ...s, text: v })),
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: sm.code,
                        onSelect: (v) => setSm((s) => ({ ...s, code: v })),
                        placeholder: 'Code',
                        label: 'Country',
                    }}
                />
                <DropdownInputV2
                    label="Medium"
                    size={InputSizeV2.MD}
                    input={{
                        value: md.text,
                        onChange: (v) => setMd((s) => ({ ...s, text: v })),
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: md.code,
                        onSelect: (v) => setMd((s) => ({ ...s, code: v })),
                        placeholder: 'Code',
                        label: 'Country',
                    }}
                />
                <DropdownInputV2
                    label="Large"
                    size={InputSizeV2.LG}
                    input={{
                        value: lg.text,
                        onChange: (v) => setLg((s) => ({ ...s, text: v })),
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: lg.code,
                        onSelect: (v) => setLg((s) => ({ ...s, code: v })),
                        placeholder: 'Code',
                        label: 'Country',
                    }}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'All three `InputSizeV2` sizes.',
            },
        },
    },
}

export const ConstrainedMenu: Story = {
    render: function ConstrainedMenuStory() {
        const [value, setValue] = useState('')
        const [dropdownValue, setDropdownValue] = useState('US')
        return (
            <DropdownInputV2
                label="Tall list, narrow menu"
                maxMenuHeight={200}
                minMenuWidth={160}
                maxMenuWidth={220}
                input={{
                    value,
                    onChange: setValue,
                    placeholder: 'City',
                }}
                dropDown={{
                    items: countryItems,
                    value: dropdownValue,
                    onSelect: setDropdownValue,
                    placeholder: 'Country',
                    label: 'Country',
                }}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: '`maxMenuHeight`, `minMenuWidth`, and `maxMenuWidth` constrain the dropdown panel.',
            },
        },
    },
}

// —— Interactive —————————————————————————————————————————————————

/** Type in the text field; interaction test focuses the textbox and types text. */
export const InteractiveTyping: Story = {
    render: function InteractiveTypingStory() {
        const [value, setValue] = useState('')
        const [dropdownValue, setDropdownValue] = useState('US')
        return (
            <div style={stack(480)}>
                <p
                    style={{
                        margin: 0,
                        fontSize: 13,
                        color: 'var(--color-text-muted, #64748b)',
                    }}
                >
                    Click the text field and type. Current value:{' '}
                    <output style={{ fontWeight: 600, color: 'inherit' }}>
                        {value || '(empty)'}
                    </output>
                </p>
                <DropdownInputV2
                    id="interactive-dropdown-input"
                    label="City"
                    hintText="Tab past the dropdown trigger, or click the input."
                    input={{
                        value,
                        onChange: setValue,
                        placeholder: 'Enter city',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: dropdownValue,
                        onSelect: setDropdownValue,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Focus the text input and type. The `play` function focuses the textbox and enters sample text.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByRole('textbox')
        await userEvent.click(input)
        await userEvent.keyboard('Test')
        await expect(input).toHaveValue('Test')
    },
}

export const WithForwardedRef: Story = {
    render: function WithForwardedRefStory() {
        const [value, setValue] = useState('')
        const [dropdownValue, setDropdownValue] = useState('US')
        const inputRef = React.useRef<HTMLInputElement>(null)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <DropdownInputV2
                    ref={inputRef}
                    label="Focus target"
                    input={{
                        value,
                        onChange: setValue,
                        placeholder: 'City',
                    }}
                    dropDown={{
                        items: countryItems,
                        value: dropdownValue,
                        onSelect: setDropdownValue,
                        placeholder: 'Country',
                        label: 'Country',
                    }}
                />
                <button type="button" onClick={() => inputRef.current?.focus()}>
                    Focus text input
                </button>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: '`ref` is attached to the underlying text `<input>` (not the dropdown trigger).',
            },
        },
    },
}

// —— Accessibility (reference) ——————————————————————————————————

export const Accessibility: Story = {
    render: function AccessibilityStory() {
        const [city, setCity] = useState('')
        const [country, setCountry] = useState('US')
        const [errCity, setErrCity] = useState('')
        const [errCountry, setErrCountry] = useState('US')
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
                        Label, required, and hint
                    </h3>
                    <DropdownInputV2
                        label="Shipping address"
                        sublabel="Country and city"
                        hintText="We use this for delivery estimates."
                        required
                        input={{
                            value: city,
                            onChange: setCity,
                            placeholder: 'City',
                        }}
                        dropDown={{
                            items: countryItems,
                            value: country,
                            onSelect: setCountry,
                            placeholder: 'Country',
                            label: 'Ship to',
                        }}
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
                        External error
                    </h3>
                    <DropdownInputV2
                        label="Validated field"
                        error={{
                            show: true,
                            message: 'Select a country and enter a valid city.',
                        }}
                        input={{
                            value: errCity,
                            onChange: setErrCity,
                            placeholder: 'City',
                        }}
                        dropDown={{
                            items: countryItems,
                            value: errCountry,
                            onSelect: setErrCountry,
                            placeholder: 'Country',
                            label: 'Country',
                        }}
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
                    <DropdownInputV2
                        label="Locked"
                        disabled
                        input={{
                            value: 'Portland',
                            onChange: noop,
                            placeholder: 'City',
                        }}
                        dropDown={{
                            items: countryItems,
                            value: 'US',
                            onSelect: noop,
                            placeholder: 'Country',
                            label: 'Country',
                        }}
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Reference layout for accessibility review of DropdownInputV2:

- **Labels**: Associated with the text input via \`id\`; sublabel and required where applicable
- **Dropdown trigger**: Separate focusable control with \`aria-label\` derived from \`dropDown.label\` / field \`label\` / \`dropdownName\`
- **Hints & errors**: Linked with \`aria-describedby\` on the text field; invalid state uses \`aria-invalid\`
- **Disabled option**: When the selected item is \`disabled\`, the text input is disabled until selection changes
- **Keyboard**: Tab order follows DOM (dropdown trigger before text when \`dropdownPosition\` is left)

**Verification**
1. Open the **Accessibility** addon — no violations for these examples.
2. Navigate with **Tab** only; confirm focus order and visible focus on both trigger and text field.
3. Use a screen reader to verify label, value, hint, and error announcements.
`,
            },
        },
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}

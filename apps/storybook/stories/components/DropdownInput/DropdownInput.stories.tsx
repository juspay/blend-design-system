import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    DropdownInput,
    DropdownPosition,
    TextInputSize,
} from '@juspay/blend-design-system'
import { Globe, MapPin, Phone } from 'lucide-react'

// Sample dropdown data
const countryData = [
    {
        groupLabel: 'Popular',
        items: [
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'UK' },
            { label: 'Canada', value: 'CA' },
        ],
    },
    {
        groupLabel: 'All Countries',
        items: [
            { label: 'Australia', value: 'AU' },
            { label: 'France', value: 'FR' },
            { label: 'Germany', value: 'DE' },
            { label: 'India', value: 'IN' },
            { label: 'Japan', value: 'JP' },
        ],
    },
]

const currencyData = [
    {
        groupLabel: 'Major Currencies',
        items: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
        ],
    },
]

const phoneCodeData = [
    {
        groupLabel: 'Country Codes',
        items: [
            { label: '+1', value: '+1' },
            { label: '+44', value: '+44' },
            { label: '+91', value: '+91' },
        ],
    },
]

const meta: Meta<typeof DropdownInput> = {
    title: 'Components/Inputs/DropdownInput',
    component: DropdownInput,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A combination input component that pairs a text input with a dropdown selector, commonly used for forms requiring both typed input and selection from predefined options.

## Features
- Three sizes (Small, Medium, Large)
- Text input with dropdown selection
- Configurable dropdown position (left or right)
- Error state handling with custom messages
- Required field indication
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Searchable dropdown options
- Grouped dropdown options
- Custom slot content for icons
- Menu size constraints (height, width)
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Usage

\`\`\`tsx
import { DropdownInput, DropdownPosition, TextInputSize } from '@juspay/blend-design-system';

<DropdownInput
  label="Phone Number"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  dropDownValue={countryCode}
  onDropDownChange={setCountryCode}
  dropDownItems={countryCodeOptions}
  dropdownPosition={DropdownPosition.LEFT}
  size={TextInputSize.MEDIUM}
  placeholder="Enter phone number"
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current value of the text input',
            table: {
                type: { summary: 'string' },
                category: 'Input',
            },
        },
        onChange: {
            action: 'input-changed',
            description: 'Callback fired when the text input value changes',
            table: {
                type: {
                    summary: '(e: React.ChangeEvent<HTMLInputElement>) => void',
                },
                category: 'Input',
            },
        },
        dropDownValue: {
            control: { type: 'text' },
            description: 'Current selected value of the dropdown',
            table: {
                type: { summary: 'string' },
                category: 'Dropdown',
            },
        },
        onDropDownChange: {
            action: 'dropdown-changed',
            description: 'Callback fired when the dropdown selection changes',
            table: {
                type: { summary: '(value: string) => void' },
                category: 'Dropdown',
            },
        },
        dropDownItems: {
            control: false,
            description: 'Array of grouped dropdown options',
            table: {
                type: { summary: 'SelectMenuGroupType[]' },
                category: 'Dropdown',
            },
        },
        dropdownPosition: {
            control: { type: 'select' },
            options: Object.values(DropdownPosition),
            description: 'Position of the dropdown relative to the input',
            table: {
                type: { summary: 'DropdownPosition' },
                defaultValue: { summary: 'DropdownPosition.RIGHT' },
                category: 'Dropdown',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(TextInputSize),
            description: 'Size variant of the input component',
            table: {
                type: { summary: 'TextInputSize' },
                defaultValue: { summary: 'TextInputSize.MEDIUM' },
                category: 'Appearance',
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the input',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label text displayed below the main label',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint text displayed below the input',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Tooltip text for the help icon',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
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
        errorMessage: {
            control: { type: 'text' },
            description: 'Error message displayed when in error state',
            table: {
                type: { summary: 'string' },
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
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when input is empty',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        dropdownName: {
            control: { type: 'text' },
            description: 'Name attribute for the dropdown',
            table: {
                type: { summary: 'string' },
                category: 'Form',
            },
        },
        maxMenuHeight: {
            control: { type: 'number', min: 100, max: 500 },
            description: 'Maximum height of the dropdown menu',
            table: {
                type: { summary: 'number' },
                category: 'Menu Layout',
            },
        },
        minMenuWidth: {
            control: { type: 'number', min: 100, max: 400 },
            description: 'Minimum width of the dropdown menu',
            table: {
                type: { summary: 'number' },
                category: 'Menu Layout',
            },
        },
        maxMenuWidth: {
            control: { type: 'number', min: 200, max: 600 },
            description: 'Maximum width of the dropdown menu',
            table: {
                type: { summary: 'number' },
                category: 'Menu Layout',
            },
        },
        slot: {
            control: false,
            description: 'Custom slot content for icons or other elements',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Slots',
            },
        },
        onDropdownOpen: {
            action: 'dropdown-opened',
            description: 'Callback fired when the dropdown opens',
            table: {
                type: { summary: '() => void' },
                category: 'Events',
            },
        },
        onDropdownClose: {
            action: 'dropdown-closed',
            description: 'Callback fired when the dropdown closes',
            table: {
                type: { summary: '() => void' },
                category: 'Events',
            },
        },
        onFocus: {
            action: 'focused',
            description: 'Callback fired when the input receives focus',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onBlur: {
            action: 'blurred',
            description: 'Callback fired when the input loses focus',
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
type Story = StoryObj<typeof DropdownInput>

// Default story
export const Default: Story = {
    render: function DefaultDropdownInput(args) {
        const [inputValue, setInputValue] = useState('')
        const [dropdownValue, setDropdownValue] = useState('')

        return (
            <DropdownInput
                {...args}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                dropDownValue={dropdownValue}
                onDropDownChange={setDropdownValue}
                dropDownItems={countryData}
            />
        )
    },
    args: {
        label: 'Country and City',
        placeholder: 'Enter city name',
        dropdownPosition: DropdownPosition.LEFT,
        size: TextInputSize.MEDIUM,
        disabled: false,
        error: false,
    },
}

// Phone number input
export const PhoneNumberInput: Story = {
    render: () => {
        const [phoneNumber, setPhoneNumber] = useState('')
        const [countryCode, setCountryCode] = useState('+1')

        return (
            <DropdownInput
                label="Phone Number"
                sublabel="Enter your phone number with country code"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                dropDownValue={countryCode}
                onDropDownChange={setCountryCode}
                dropDownItems={phoneCodeData}
                dropdownPosition={DropdownPosition.LEFT}
                placeholder="Enter phone number"
                slot={<Phone size={16} />}
                type="tel"
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DropdownInput configured for phone number entry with country code selection.',
            },
        },
    },
}

// Price input with currency
export const PriceInput: Story = {
    render: () => {
        const [price, setPrice] = useState('')
        const [currency, setCurrency] = useState('USD')

        return (
            <DropdownInput
                label="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                dropDownValue={currency}
                onDropDownChange={setCurrency}
                dropDownItems={currencyData}
                dropdownPosition={DropdownPosition.LEFT}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                slot={<Globe size={16} />}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DropdownInput for price entry with currency selection.',
            },
        },
    },
}

// Different sizes
export const Sizes: Story = {
    render: () => {
        const [values, setValues] = useState({
            small: { input: '', dropdown: '' },
            medium: { input: '', dropdown: '' },
            large: { input: '', dropdown: '' },
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <DropdownInput
                    label="Small Size"
                    size={TextInputSize.SMALL}
                    value={values.small.input}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            small: { ...prev.small, input: e.target.value },
                        }))
                    }
                    dropDownValue={values.small.dropdown}
                    onDropDownChange={(value) =>
                        setValues((prev) => ({
                            ...prev,
                            small: { ...prev.small, dropdown: value },
                        }))
                    }
                    dropDownItems={countryData}
                    placeholder="Small input"
                />
                <DropdownInput
                    label="Medium Size"
                    size={TextInputSize.MEDIUM}
                    value={values.medium.input}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            medium: { ...prev.medium, input: e.target.value },
                        }))
                    }
                    dropDownValue={values.medium.dropdown}
                    onDropDownChange={(value) =>
                        setValues((prev) => ({
                            ...prev,
                            medium: { ...prev.medium, dropdown: value },
                        }))
                    }
                    dropDownItems={countryData}
                    placeholder="Medium input"
                />
                <DropdownInput
                    label="Large Size"
                    size={TextInputSize.LARGE}
                    value={values.large.input}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            large: { ...prev.large, input: e.target.value },
                        }))
                    }
                    dropDownValue={values.large.dropdown}
                    onDropDownChange={(value) =>
                        setValues((prev) => ({
                            ...prev,
                            large: { ...prev.large, dropdown: value },
                        }))
                    }
                    dropDownItems={countryData}
                    placeholder="Large input"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DropdownInput in different sizes: Small, Medium, and Large.',
            },
        },
    },
}

// Dropdown positions
export const DropdownPositions: Story = {
    render: () => {
        const [values, setValues] = useState({
            left: { input: '', dropdown: '+1' },
            right: { input: '', dropdown: 'USD' },
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <DropdownInput
                    label="Dropdown on Left"
                    value={values.left.input}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            left: { ...prev.left, input: e.target.value },
                        }))
                    }
                    dropDownValue={values.left.dropdown}
                    onDropDownChange={(value) =>
                        setValues((prev) => ({
                            ...prev,
                            left: { ...prev.left, dropdown: value },
                        }))
                    }
                    dropDownItems={phoneCodeData}
                    dropdownPosition={DropdownPosition.LEFT}
                    placeholder="Phone number"
                />
                <DropdownInput
                    label="Dropdown on Right"
                    value={values.right.input}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            right: { ...prev.right, input: e.target.value },
                        }))
                    }
                    dropDownValue={values.right.dropdown}
                    onDropDownChange={(value) =>
                        setValues((prev) => ({
                            ...prev,
                            right: { ...prev.right, dropdown: value },
                        }))
                    }
                    dropDownItems={currencyData}
                    dropdownPosition={DropdownPosition.RIGHT}
                    placeholder="Amount"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DropdownInput with different dropdown positions: left and right.',
            },
        },
    },
}

// Error states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            required: { input: '', dropdown: '' },
            invalid: { input: 'invalid-email', dropdown: 'US' },
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <DropdownInput
                    label="Required Field"
                    value={values.required.input}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            required: {
                                ...prev.required,
                                input: e.target.value,
                            },
                        }))
                    }
                    dropDownValue={values.required.dropdown}
                    onDropDownChange={(value) =>
                        setValues((prev) => ({
                            ...prev,
                            required: { ...prev.required, dropdown: value },
                        }))
                    }
                    dropDownItems={countryData}
                    error={
                        values.required.input === '' ||
                        values.required.dropdown === ''
                    }
                    errorMessage="Both country and city are required"
                    placeholder="Enter city"
                />
                <DropdownInput
                    label="Invalid Format"
                    value={values.invalid.input}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            invalid: { ...prev.invalid, input: e.target.value },
                        }))
                    }
                    dropDownValue={values.invalid.dropdown}
                    onDropDownChange={(value) =>
                        setValues((prev) => ({
                            ...prev,
                            invalid: { ...prev.invalid, dropdown: value },
                        }))
                    }
                    dropDownItems={countryData}
                    error
                    errorMessage="Please enter a valid city name"
                    placeholder="Enter valid city"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DropdownInput showing different error states: required and invalid format.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DropdownInput
                label="Disabled Empty"
                value=""
                onChange={() => {}}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropDownItems={countryData}
                placeholder="This input is disabled"
                disabled
            />
            <DropdownInput
                label="Disabled With Value"
                value="New York"
                onChange={() => {}}
                dropDownValue="US"
                onDropDownChange={() => {}}
                dropDownItems={countryData}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'DropdownInput in disabled state, both empty and with content.',
            },
        },
    },
}

// With comprehensive labels
export const WithLabelsAndHints: Story = {
    render: () => {
        const [inputValue, setInputValue] = useState('')
        const [dropdownValue, setDropdownValue] = useState('')

        return (
            <DropdownInput
                label="Shipping Address"
                sublabel="Select country and enter city details"
                hintText="We ship to major cities worldwide"
                helpIconHintText="Shipping costs will be calculated based on your location"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                dropDownValue={dropdownValue}
                onDropDownChange={setDropdownValue}
                dropDownItems={countryData}
                placeholder="Enter city name"
                slot={<MapPin size={16} />}
                required
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DropdownInput with comprehensive labeling: main label, sublabel, hint text, and help tooltip.',
            },
        },
    },
}

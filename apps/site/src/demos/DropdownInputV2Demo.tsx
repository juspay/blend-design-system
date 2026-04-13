import DropdownInputV2 from '../../../../packages/blend/lib/components/InputsV2/DropdownInputV2/DropdownInputV2'
import { TextInputSize } from '../../../../packages/blend/lib/components/Inputs/TextInput/types'
import type { SelectMenuGroupType } from '../../../../packages/blend/lib/components/Select/types'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { useState } from 'react'

const DropdownInputV2Demo = () => {
    // Individual playground state
    const [playgroundLabel, setPlaygroundLabel] = useState('Your Label')
    const [playgroundSublabel, setPlaygroundSublabel] =
        useState('Your Sublabel')
    const [playgroundHintText, setPlaygroundHintText] = useState(
        'This helps us provide location-specific services'
    )
    const [playgroundErrorMessage, setPlaygroundErrorMessage] = useState(
        'Please select a valid country and enter a city'
    )
    const [playgroundHelpText, setPlaygroundHelpText] = useState(
        'Select from the dropdown and type in the input'
    )
    const [playgroundSize, setPlaygroundSize] = useState<TextInputSize>(
        TextInputSize.LARGE
    )
    const [playgroundValue, setPlaygroundValue] = useState('')
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [showSublabel, setShowSublabel] = useState(true)
    const [showHintText, setShowHintText] = useState(true)
    const [showErrorMessage, setShowErrorMessage] = useState(true)
    const [showHelpText, setShowHelpText] = useState(true)

    // Different example states
    const [currencyValue, setCurrencyValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [locationValue, setLocationValue] = useState('')
    const [timeValue, setTimeValue] = useState('')

    // States for different sections
    const [mediumValue, setMediumValue] = useState('')
    const [largeValue, setLargeValue] = useState('')
    const [defaultValue, setDefaultValue] = useState('')
    const [errorValue, setErrorValue] = useState('')

    // Dropdown options for playground
    const playgroundDropdownOptions: SelectMenuGroupType[] = [
        {
            groupLabel: 'Popular Countries',
            items: [
                {
                    label: 'tansaction success rate ',
                    value: 'US',
                    isDisabled: false,
                },
                { label: 'United Kingdom', value: 'UK', isDisabled: true },
                { label: 'Canada', value: 'CA', isDisabled: false },
                { label: 'Germany', value: 'DE', isDisabled: false },
                { label: 'France', value: 'FR', isDisabled: false },
            ],
            showSeparator: true,
        },
        {
            groupLabel: 'Other Countries',
            items: [
                { label: 'Australia', value: 'AU', isDisabled: true },
                { label: 'Japan', value: 'JP', isDisabled: false },
                { label: 'India', value: 'IN', isDisabled: false },
                { label: 'Brazil', value: 'BR', isDisabled: false },
                { label: 'South Africa', value: 'ZA', isDisabled: false },
            ],
        },
    ]

    // Currency options
    const currencyOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'USD - US Dollar', value: 'USD' },
                { label: 'EUR - Euro', value: 'EUR' },
                { label: 'GBP - British Pound', value: 'GBP' },
                { label: 'JPY - Japanese Yen', value: 'JPY' },
                { label: 'CAD - Canadian Dollar', value: 'CAD' },
            ],
        },
    ]

    // Phone country codes
    const phoneOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: '+1 (US/CA)', value: '+1' },
                { label: '+44 (UK)', value: '+44' },
                { label: '+49 (DE)', value: '+49' },
                { label: '+33 (FR)', value: '+33' },
                { label: '+81 (JP)', value: '+81' },
                { label: '+91 (IN)', value: '+91' },
            ],
        },
    ]

    // Email domains
    const emailOptions: SelectMenuGroupType[] = [
        {
            groupLabel: 'Popular',
            items: [
                { label: 'gmail.com', value: 'gmail.com' },
                { label: 'outlook.com', value: 'outlook.com' },
                { label: 'yahoo.com', value: 'yahoo.com' },
            ],
            showSeparator: true,
        },
        {
            groupLabel: 'Business',
            items: [
                { label: 'company.com', value: 'company.com' },
                { label: 'business.org', value: 'business.org' },
            ],
        },
    ]

    // Country options
    const countryOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'United States', value: 'US' },
                { label: 'United Kingdom', value: 'UK' },
                { label: 'Canada', value: 'CA' },
                { label: 'Germany', value: 'DE' },
                { label: 'France', value: 'FR' },
                { label: 'Australia', value: 'AU' },
                { label: 'Japan', value: 'JP' },
            ],
        },
    ]

    // Time options
    const timeOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'AM', value: 'AM' },
                { label: 'PM', value: 'PM' },
            ],
        },
    ]

    // Basic options for states section
    const basicOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
            ],
        },
    ]
    // Basic options for states section with disabled items
    const basicOptionsWithDisabledItems: SelectMenuGroupType[] = [
        {
            items: [
                {
                    label: 'Disabled option',
                    value: 'option1',
                    isDisabled: true,
                },
                {
                    label: 'Enabled option',
                    value: 'option2',
                    isDisabled: false,
                },
                {
                    label: 'Enabled option',
                    value: 'option3',
                    isDisabled: false,
                },
            ],
        },
    ]

    // Size options for select
    const sizeOptions = [
        { value: TextInputSize.MEDIUM, label: 'Medium' },
        { value: TextInputSize.LARGE, label: 'Large' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Individual DropdownInput Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">DropdownInput Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Label"
                            value={playgroundLabel}
                            onChange={(e) => setPlaygroundLabel(e.target.value)}
                            placeholder="Enter label"
                        />

                        <TextInput
                            label="Sublabel"
                            value={playgroundSublabel}
                            onChange={(e) =>
                                setPlaygroundSublabel(e.target.value)
                            }
                            placeholder="Enter sublabel"
                            disabled={!showSublabel}
                        />

                        <TextInput
                            label="Hint Text"
                            value={playgroundHintText}
                            onChange={(e) =>
                                setPlaygroundHintText(e.target.value)
                            }
                            placeholder="Enter hint text"
                            disabled={!showHintText}
                        />

                        <TextInput
                            label="Error Message"
                            value={playgroundErrorMessage}
                            onChange={(e) =>
                                setPlaygroundErrorMessage(e.target.value)
                            }
                            placeholder="Enter error message"
                            disabled={!showErrorMessage || !playgroundError}
                        />

                        <TextInput
                            label="Help Text"
                            value={playgroundHelpText}
                            onChange={(e) =>
                                setPlaygroundHelpText(e.target.value)
                            }
                            placeholder="Enter help text"
                            disabled={!showHelpText}
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as TextInputSize)
                            }
                            placeholder="Select size"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Error"
                            checked={playgroundError}
                            onChange={() =>
                                setPlaygroundError(!playgroundError)
                            }
                        />
                        <Switch
                            label="Required"
                            checked={playgroundRequired}
                            onChange={() =>
                                setPlaygroundRequired(!playgroundRequired)
                            }
                        />
                        <Switch
                            label="Show Sublabel"
                            checked={showSublabel}
                            onChange={() => setShowSublabel(!showSublabel)}
                        />
                        <Switch
                            label="Show Hint Text"
                            checked={showHintText}
                            onChange={() => setShowHintText(!showHintText)}
                        />
                        <Switch
                            label="Show Error Message"
                            checked={showErrorMessage}
                            onChange={() =>
                                setShowErrorMessage(!showErrorMessage)
                            }
                        />
                        <Switch
                            label="Show Help Text"
                            checked={showHelpText}
                            onChange={() => setShowHelpText(!showHelpText)}
                        />
                    </div>

                    <div className="min-h-32 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-gray-50 p-8">
                        <div className="w-full max-w-md">
                            <DropdownInputV2
                                data-id={'Enter city name'}
                                data-input-name={playgroundValue}
                                name={playgroundValue}
                                onBlur={() => {
                                    console.log('blur')
                                }}
                                onFocus={() => {
                                    console.log('focus')
                                }}
                                label={playgroundLabel}
                                sublabel={
                                    showSublabel
                                        ? playgroundSublabel
                                        : undefined
                                }
                                hintText={
                                    showHintText
                                        ? playgroundHintText
                                        : undefined
                                }
                                errorMessage={
                                    showErrorMessage && playgroundError
                                        ? playgroundErrorMessage
                                        : undefined
                                }
                                helpIconHintText={
                                    showHelpText
                                        ? playgroundHelpText
                                        : undefined
                                }
                                disabled={playgroundDisabled}
                                error={playgroundError}
                                required={playgroundRequired}
                                value={playgroundValue}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Medium</h3>
                        <DropdownInputV2
                            label="Medium Size"
                            value={mediumValue}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Large</h3>
                        <DropdownInputV2
                            label="Large Size"
                            value={largeValue}
                        />
                    </div>
                </div>
            </div>

            {/* States */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Default</h3>
                        <DropdownInputV2
                            label="Default State"
                            value={defaultValue}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Error</h3>
                        <DropdownInputV2
                            label="Error State"
                            error={true}
                            errorMessage="This field has an error"
                            value={errorValue}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Disabled</h3>
                        <DropdownInputV2
                            label="Disabled State"
                            disabled={true}
                            value="Disabled input"
                        />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Disabled with disabled items
                        </h3>
                        <DropdownInputV2
                            label="Disabled items state"
                            disabled={false}
                            value="Disabled input"
                        />
                    </div>
                </div>
            </div>

            {/* Real-world Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Real-world Examples</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Financial Inputs
                            </h3>
                            <DropdownInputV2
                                label="Amount"
                                sublabel="Enter the transaction amount"
                                value={currencyValue}
                                placeholder="0.00"
                                hintText="Select currency and enter amount"
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Contact Information
                            </h3>
                            <DropdownInputV2
                                label="Phone Number"
                                sublabel="Your primary contact number"
                                value={phoneValue}
                                placeholder="123-456-7890"
                                required={true}
                            />

                            <DropdownInputV2
                                label="Email Address"
                                sublabel="Choose domain or enter custom"
                                value={emailValue}
                                placeholder="username"
                                hintText="Enter username part only"
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Location & Time
                            </h3>
                            <DropdownInputV2
                                label="Location"
                                sublabel="Country and city"
                                value={locationValue}
                                placeholder="Enter city name"
                                helpIconHintText="Select country first, then enter city"
                            />

                            <DropdownInputV2
                                label="Meeting Time"
                                sublabel="Enter time with AM/PM"
                                value={timeValue}
                                placeholder="12:00"
                                hintText="Enter time in 12-hour format"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Advanced Examples</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Complex Dropdowns
                        </h3>
                        <DropdownInputV2
                            label="Project Settings"
                            sublabel="Configure project parameters"
                            value=""
                            required={true}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Form Integration
                        </h3>
                        <DropdownInputV2
                            label="Custom Field"
                            sublabel="Field type and value"
                            error={false}
                            errorMessage="Please provide valid data"
                            required={true}
                            helpIconHintText="Choose the field type then enter the corresponding value"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropdownInputV2Demo

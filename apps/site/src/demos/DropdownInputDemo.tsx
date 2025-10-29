import DropdownInput from '../../../../packages/blend/lib/components/Inputs/DropdownInput/DropdownInput'
import { TextInputSize } from '../../../../packages/blend/lib/components/Inputs/TextInput/types'
import type { SelectMenuGroupType } from '../../../../packages/blend/lib/components/Select/types'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { DropdownPosition } from '../../../../packages/blend/lib/main'

const DropdownInputDemo = () => {
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
    const [playgroundDropdownValue, setPlaygroundDropdownValue] = useState('')
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [showSublabel, setShowSublabel] = useState(true)
    const [showHintText, setShowHintText] = useState(true)
    const [showErrorMessage, setShowErrorMessage] = useState(true)
    const [showHelpText, setShowHelpText] = useState(true)

    // Different example states
    const [currencyValue, setCurrencyValue] = useState('')
    const [currencyDropdown, setCurrencyDropdown] = useState('USD')
    const [phoneValue, setPhoneValue] = useState('')
    const [phoneDropdown, setPhoneDropdown] = useState('+1')
    const [emailValue, setEmailValue] = useState('')
    const [emailDropdown, setEmailDropdown] = useState('gmail.com')
    const [locationValue, setLocationValue] = useState('')
    const [locationDropdown, setLocationDropdown] = useState('US')
    const [timeValue, setTimeValue] = useState('')
    const [timeDropdown, setTimeDropdown] = useState('AM')

    // States for different sections
    const [mediumValue, setMediumValue] = useState('')
    const [mediumDropdown, setMediumDropdown] = useState('')
    const [largeValue, setLargeValue] = useState('')
    const [largeDropdown, setLargeDropdown] = useState('')

    const [defaultValue, setDefaultValue] = useState('')
    const [defaultDropdown, setDefaultDropdown] = useState('')
    const [errorValue, setErrorValue] = useState('')
    const [errorDropdown, setErrorDropdown] = useState('')

    // Dropdown options for playground
    const playgroundDropdownOptions: SelectMenuGroupType[] = [
        {
            groupLabel: 'Popular Countries',
            items: [
                {
                    label: 'tansaction success rate ',
                    value: 'US',
                },
                { label: 'United Kingdom', value: 'UK' },
                { label: 'Canada', value: 'CA' },
                { label: 'Germany', value: 'DE' },
                { label: 'France', value: 'FR' },
            ],
            showSeparator: true,
        },
        {
            groupLabel: 'Other Countries',
            items: [
                { label: 'Australia', value: 'AU' },
                { label: 'Japan', value: 'JP' },
                { label: 'India', value: 'IN' },
                { label: 'Brazil', value: 'BR' },
                { label: 'South Africa', value: 'ZA' },
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
                            <DropdownInput
                                data-id={'Enter city name'}
                                data-input-name={playgroundValue}
                                name={playgroundValue}
                                dropdownPosition={DropdownPosition.LEFT}
                                // slot={<User size={12} />}
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
                                size={playgroundSize}
                                disabled={playgroundDisabled}
                                error={playgroundError}
                                required={playgroundRequired}
                                value={playgroundValue}
                                onChange={(e) => {
                                    setPlaygroundValue(e.target.value)
                                    addSnackbar({
                                        header: `Input value: ${e.target.value}`,
                                    })
                                }}
                                dropDownValue={playgroundDropdownValue}
                                onDropDownChange={(value) => {
                                    setPlaygroundDropdownValue(value)
                                    addSnackbar({
                                        header: `Dropdown selected: ${value}`,
                                    })
                                }}
                                dropDownItems={playgroundDropdownOptions}
                                placeholder="Enter city name"
                                dropdownName="playgroundDropdown"
                                onDropdownOpen={() => {
                                    console.log('focus is on dropdown')
                                }}
                                onDropdownClose={() => {
                                    console.log('focus is not on dropdown')
                                }}
                                maxMenuHeight={200}
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
                        <DropdownInput
                            label="Medium Size"
                            size={TextInputSize.MEDIUM}
                            value={mediumValue}
                            onChange={(e) => {
                                setMediumValue(e.target.value)
                                addSnackbar({
                                    header: `Medium input: ${e.target.value}`,
                                })
                            }}
                            dropDownValue={mediumDropdown}
                            onDropDownChange={(value) => {
                                setMediumDropdown(value)
                                addSnackbar({
                                    header: `Medium dropdown: ${value}`,
                                })
                            }}
                            dropDownItems={basicOptions}
                            placeholder="Enter value"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Large</h3>
                        <DropdownInput
                            label="Large Size"
                            size={TextInputSize.LARGE}
                            value={largeValue}
                            onChange={(e) => {
                                setLargeValue(e.target.value)
                                addSnackbar({
                                    header: `Large input: ${e.target.value}`,
                                })
                            }}
                            dropDownValue={largeDropdown}
                            onDropDownChange={(value) => {
                                setLargeDropdown(value)
                                addSnackbar({
                                    header: `Large dropdown: ${value}`,
                                })
                            }}
                            dropDownItems={basicOptions}
                            placeholder="Enter value"
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
                        <DropdownInput
                            label="Default State"
                            value={defaultValue}
                            onChange={(e) => {
                                setDefaultValue(e.target.value)
                                addSnackbar({
                                    header: `Default: ${e.target.value}`,
                                })
                            }}
                            dropDownValue={defaultDropdown}
                            onDropDownChange={(value) => {
                                setDefaultDropdown(value)
                                addSnackbar({
                                    header: `Default dropdown: ${value}`,
                                })
                            }}
                            dropDownItems={basicOptions}
                            placeholder="Enter value"
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Error</h3>
                        <DropdownInput
                            label="Error State"
                            error={true}
                            errorMessage="This field has an error"
                            value={errorValue}
                            onChange={(e) => {
                                setErrorValue(e.target.value)
                                addSnackbar({
                                    header: `Error input: ${e.target.value}`,
                                })
                            }}
                            dropDownValue={errorDropdown}
                            onDropDownChange={(value) => {
                                setErrorDropdown(value)
                                addSnackbar({
                                    header: `Error dropdown: ${value}`,
                                })
                            }}
                            dropDownItems={basicOptions}
                            placeholder="Enter value"
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Disabled</h3>
                        <DropdownInput
                            label="Disabled State"
                            disabled={true}
                            value="Disabled input"
                            onChange={() => {}}
                            dropDownValue="option1"
                            onDropDownChange={() => {}}
                            dropDownItems={basicOptions}
                            placeholder="Disabled"
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
                            <DropdownInput
                                label="Amount"
                                sublabel="Enter the transaction amount"
                                value={currencyValue}
                                onChange={(e) => {
                                    setCurrencyValue(e.target.value)
                                    addSnackbar({
                                        header: `Amount: ${currencyDropdown} ${e.target.value}`,
                                    })
                                }}
                                dropDownValue={currencyDropdown}
                                onDropDownChange={(value) => {
                                    setCurrencyDropdown(value)
                                    addSnackbar({
                                        header: `Currency changed to: ${value}`,
                                    })
                                }}
                                dropDownItems={currencyOptions}
                                placeholder="0.00"
                                hintText="Select currency and enter amount"
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Contact Information
                            </h3>
                            <DropdownInput
                                label="Phone Number"
                                sublabel="Your primary contact number"
                                value={phoneValue}
                                onChange={(e) => {
                                    setPhoneValue(e.target.value)
                                    addSnackbar({
                                        header: `Phone: ${phoneDropdown} ${e.target.value}`,
                                    })
                                }}
                                dropDownValue={phoneDropdown}
                                onDropDownChange={(value) => {
                                    setPhoneDropdown(value)
                                    addSnackbar({
                                        header: `Country code: ${value}`,
                                    })
                                }}
                                dropDownItems={phoneOptions}
                                placeholder="123-456-7890"
                                required={true}
                                onDropdownOpen={() => {
                                    addSnackbar({
                                        header: 'Phone country code dropdown opened',
                                    })
                                }}
                                onDropdownClose={() => {
                                    addSnackbar({
                                        header: 'Phone country code dropdown closed',
                                    })
                                }}
                            />

                            <DropdownInput
                                label="Email Address"
                                sublabel="Choose domain or enter custom"
                                value={emailValue}
                                onChange={(e) => {
                                    setEmailValue(e.target.value)
                                    addSnackbar({
                                        header: `Email: ${e.target.value}@${emailDropdown}`,
                                    })
                                }}
                                dropDownValue={emailDropdown}
                                onDropDownChange={(value) => {
                                    setEmailDropdown(value)
                                    addSnackbar({
                                        header: `Domain: ${value}`,
                                    })
                                }}
                                dropDownItems={emailOptions}
                                placeholder="username"
                                hintText="Enter username part only"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Location & Time
                            </h3>
                            <DropdownInput
                                label="Location"
                                sublabel="Country and city"
                                value={locationValue}
                                onChange={(e) => {
                                    setLocationValue(e.target.value)
                                    addSnackbar({
                                        header: `Location: ${e.target.value}, ${locationDropdown}`,
                                    })
                                }}
                                dropDownValue={locationDropdown}
                                onDropDownChange={(value) => {
                                    setLocationDropdown(value)
                                    addSnackbar({
                                        header: `Country: ${value}`,
                                    })
                                }}
                                dropDownItems={countryOptions}
                                placeholder="Enter city name"
                                helpIconHintText="Select country first, then enter city"
                            />

                            <DropdownInput
                                label="Meeting Time"
                                sublabel="Enter time with AM/PM"
                                value={timeValue}
                                onChange={(e) => {
                                    setTimeValue(e.target.value)
                                    addSnackbar({
                                        header: `Time: ${e.target.value} ${timeDropdown}`,
                                    })
                                }}
                                dropDownValue={timeDropdown}
                                onDropDownChange={(value) => {
                                    setTimeDropdown(value)
                                    addSnackbar({
                                        header: `Period: ${value}`,
                                    })
                                }}
                                dropDownItems={timeOptions}
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
                        <DropdownInput
                            label="Project Settings"
                            sublabel="Configure project parameters"
                            value=""
                            onChange={() => {}}
                            dropDownValue=""
                            onDropDownChange={(value) => {
                                addSnackbar({
                                    header: `Setting: ${value}`,
                                })
                            }}
                            dropDownItems={[
                                {
                                    groupLabel: 'Basic Settings',
                                    items: [
                                        {
                                            label: 'Public',
                                            value: 'public',
                                            subLabel: 'Visible to everyone',
                                        },
                                        {
                                            label: 'Private',
                                            value: 'private',
                                            subLabel: 'Only visible to team',
                                        },
                                    ],
                                    showSeparator: true,
                                },
                                {
                                    groupLabel: 'Advanced',
                                    items: [
                                        {
                                            label: 'Premium',
                                            value: 'premium',
                                            subLabel: 'Enhanced features',
                                        },
                                    ],
                                },
                            ]}
                            placeholder="Enter configuration value"
                            hintText="Select a setting type and enter custom value"
                            size={TextInputSize.LARGE}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Form Integration
                        </h3>
                        <DropdownInput
                            label="Custom Field"
                            sublabel="Field type and value"
                            error={false}
                            errorMessage="Please provide valid data"
                            value=""
                            onChange={() => {}}
                            dropDownValue=""
                            onDropDownChange={(value) => {
                                addSnackbar({
                                    header: `Field type: ${value}`,
                                })
                            }}
                            dropDownItems={[
                                {
                                    items: [
                                        {
                                            label: 'Text Field',
                                            value: 'text',
                                        },
                                        {
                                            label: 'Number Field',
                                            value: 'number',
                                        },
                                        {
                                            label: 'Category',
                                            value: 'category',
                                        },
                                        {
                                            label: 'Address',
                                            value: 'address',
                                        },
                                    ],
                                },
                            ]}
                            placeholder="Enter field value"
                            helpIconHintText="Choose the field type then enter the corresponding value"
                            required={true}
                            size={TextInputSize.LARGE}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropdownInputDemo

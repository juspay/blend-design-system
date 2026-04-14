import DropdownInputV2 from '../../../../packages/blend/lib/components/InputsV2/DropdownInputV2/DropdownInputV2'
import { DropdownPosition } from '../../../../packages/blend/lib/components/InputsV2/DropdownInputV2/DropdownInputV2.types'
import { InputSizeV2 } from '../../../../packages/blend/lib/components/InputsV2/inputV2.types'
import type { SingleSelectV2GroupType } from '../../../../packages/blend/lib/components/SingleSelectV2/singleSelectV2.types'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { useState } from 'react'

const DropdownInputV2Demo = () => {
    const { theme } = useTheme()
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
    const [playgroundSize, setPlaygroundSize] = useState<InputSizeV2>(
        InputSizeV2.MD
    )
    const [playgroundValue, setPlaygroundValue] = useState('')
    const [playgroundDropdownValue, setPlaygroundDropdownValue] = useState('US')
    const [playgroundDropdownPosition, setPlaygroundDropdownPosition] =
        useState<DropdownPosition>(DropdownPosition.LEFT)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [showSublabel, setShowSublabel] = useState(true)
    const [showHintText, setShowHintText] = useState(true)
    const [showErrorMessage, setShowErrorMessage] = useState(true)
    const [showHelpText, setShowHelpText] = useState(true)

    // Real-world example state
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

    // States section
    const [mediumValue, setMediumValue] = useState('')
    const [mediumDropdown, setMediumDropdown] = useState('option1')
    const [largeValue, setLargeValue] = useState('')
    const [largeDropdown, setLargeDropdown] = useState('option1')
    const [defaultValue, setDefaultValue] = useState('')
    const [defaultDropdown, setDefaultDropdown] = useState('option1')
    const [errorValue, setErrorValue] = useState('')
    const [errorDropdown, setErrorDropdown] = useState('option1')
    const [disabledItemsValue, setDisabledItemsValue] = useState('')
    const [disabledItemsDropdown, setDisabledItemsDropdown] =
        useState('option2')

    const [positionLeftValue, setPositionLeftValue] = useState('')
    const [positionLeftDropdown, setPositionLeftDropdown] = useState('USD')
    const [positionRightValue, setPositionRightValue] = useState('')
    const [positionRightDropdown, setPositionRightDropdown] = useState('USD')

    const playgroundDropdownOptions: SingleSelectV2GroupType[] = [
        {
            groupLabel: 'Popular Countries',
            items: [
                {
                    label: 'United States',
                    value: 'US',
                    disabled: false,
                },
                { label: 'United Kingdom', value: 'UK', disabled: true },
                { label: 'Canada', value: 'CA', disabled: false },
                { label: 'Germany', value: 'DE', disabled: false },
                { label: 'France', value: 'FR', disabled: false },
            ],
            showSeparator: true,
        },
        {
            groupLabel: 'Other Countries',
            items: [
                { label: 'Australia', value: 'AU', disabled: true },
                { label: 'Japan', value: 'JP', disabled: false },
                { label: 'India', value: 'IN', disabled: false },
                { label: 'Brazil', value: 'BR', disabled: false },
                { label: 'South Africa', value: 'ZA', disabled: false },
            ],
        },
    ]

    const currencyOptions: SingleSelectV2GroupType[] = [
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

    const phoneOptions: SingleSelectV2GroupType[] = [
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

    const emailOptions: SingleSelectV2GroupType[] = [
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

    const countryOptions: SingleSelectV2GroupType[] = [
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

    const timeOptions: SingleSelectV2GroupType[] = [
        {
            items: [
                { label: 'AM', value: 'AM' },
                { label: 'PM', value: 'PM' },
            ],
        },
    ]

    const basicOptions: SingleSelectV2GroupType[] = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
            ],
        },
    ]

    const basicOptionsWithDisabledItems: SingleSelectV2GroupType[] = [
        {
            items: [
                {
                    label: 'Disabled option',
                    value: 'option1',
                    disabled: true,
                },
                {
                    label: 'Enabled option',
                    value: 'option2',
                    disabled: false,
                },
                {
                    label: 'Enabled option',
                    value: 'option3',
                    disabled: false,
                },
            ],
        },
    ]

    const sizeSelectItems = [
        { value: InputSizeV2.SM, label: 'Small' },
        { value: InputSizeV2.MD, label: 'Medium' },
        { value: InputSizeV2.LG, label: 'Large' },
    ]

    const dropdownPositionSelectItems = [
        { value: DropdownPosition.LEFT, label: 'Left (default)' },
        { value: DropdownPosition.RIGHT, label: 'Right' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Individual DropdownInput Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    DropdownInputV2 Playground
                </h2>
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
                            items={[{ items: sizeSelectItems }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as InputSizeV2)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Dropdown position"
                            items={[{ items: dropdownPositionSelectItems }]}
                            selected={playgroundDropdownPosition}
                            onSelect={(value) =>
                                setPlaygroundDropdownPosition(
                                    value as DropdownPosition
                                )
                            }
                            placeholder="Select position"
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

                    <div
                        className={`min-h-32 rounded-2xl w-full flex justify-center items-center outline-1 p-8 ${
                            theme === Theme.DARK
                                ? 'bg-gray-950 outline-gray-700'
                                : 'bg-gray-50 outline-gray-200'
                        }`}
                    >
                        <div className="w-full max-w-md">
                            <DropdownInputV2
                                data-id="dropdown-input-v2-playground"
                                name="demo-city"
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
                                helpIconHintText={
                                    showHelpText
                                        ? playgroundHelpText
                                        : undefined
                                }
                                disabled={playgroundDisabled}
                                error={{
                                    show: playgroundError,
                                    message: playgroundErrorMessage,
                                }}
                                required={playgroundRequired}
                                size={playgroundSize}
                                dropdownPosition={playgroundDropdownPosition}
                                input={{
                                    value: playgroundValue,
                                    onChange: setPlaygroundValue,
                                    placeholder: 'Enter city name',
                                }}
                                dropDown={{
                                    label: 'Country',
                                    items: playgroundDropdownOptions,
                                    value: playgroundDropdownValue,
                                    onSelect: setPlaygroundDropdownValue,
                                    placeholder: 'Country',
                                }}
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
                            size={InputSizeV2.MD}
                            input={{
                                value: mediumValue,
                                onChange: setMediumValue,
                                placeholder: 'Text',
                            }}
                            dropDown={{
                                items: basicOptions,
                                value: mediumDropdown,
                                onSelect: setMediumDropdown,
                                placeholder: 'Select',
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Large</h3>
                        <DropdownInputV2
                            label="Large Size"
                            size={InputSizeV2.LG}
                            input={{
                                value: largeValue,
                                onChange: setLargeValue,
                                placeholder: 'Text',
                            }}
                            dropDown={{
                                items: basicOptions,
                                value: largeDropdown,
                                onSelect: setLargeDropdown,
                                placeholder: 'Select',
                            }}
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
                            input={{
                                value: defaultValue,
                                onChange: setDefaultValue,
                                placeholder: 'Type here',
                            }}
                            dropDown={{
                                items: basicOptions,
                                value: defaultDropdown,
                                onSelect: setDefaultDropdown,
                                placeholder: 'Select',
                            }}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Error</h3>
                        <DropdownInputV2
                            label="Error State"
                            error={{
                                show: true,
                                message: 'This field has an error',
                            }}
                            input={{
                                value: errorValue,
                                onChange: setErrorValue,
                                placeholder: 'Type here',
                            }}
                            dropDown={{
                                items: basicOptions,
                                value: errorDropdown,
                                onSelect: setErrorDropdown,
                                placeholder: 'Select',
                            }}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Disabled</h3>
                        <DropdownInputV2
                            label="Disabled State"
                            disabled={true}
                            input={{
                                value: 'Disabled input',
                                onChange: () => {},
                                placeholder: 'Type here',
                            }}
                            dropDown={{
                                items: basicOptions,
                                value: 'option1',
                                onSelect: () => {},
                                placeholder: 'Select',
                            }}
                        />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Disabled with disabled items
                        </h3>
                        <DropdownInputV2
                            label="Disabled items state"
                            input={{
                                value: disabledItemsValue,
                                onChange: setDisabledItemsValue,
                                placeholder: 'Select enabled option first',
                            }}
                            dropDown={{
                                items: basicOptionsWithDisabledItems,
                                value: disabledItemsDropdown,
                                onSelect: setDisabledItemsDropdown,
                                placeholder: 'Select',
                            }}
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
                                hintText="Select currency and enter amount"
                                input={{
                                    value: currencyValue,
                                    onChange: setCurrencyValue,
                                    placeholder: '0.00',
                                }}
                                dropDown={{
                                    label: 'Currency',
                                    items: currencyOptions,
                                    value: currencyDropdown,
                                    onSelect: setCurrencyDropdown,
                                    placeholder: 'Currency',
                                }}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Contact Information
                            </h3>
                            <DropdownInputV2
                                label="Phone Number"
                                sublabel="Your primary contact number"
                                required={true}
                                input={{
                                    value: phoneValue,
                                    onChange: setPhoneValue,
                                    placeholder: '123-456-7890',
                                }}
                                dropDown={{
                                    label: 'Code',
                                    items: phoneOptions,
                                    value: phoneDropdown,
                                    onSelect: setPhoneDropdown,
                                    placeholder: 'Code',
                                }}
                            />

                            <DropdownInputV2
                                label="Email Address"
                                sublabel="Choose domain or enter custom"
                                hintText="Enter username part only"
                                required={true}
                                input={{
                                    value: emailValue,
                                    onChange: setEmailValue,
                                    placeholder: 'username',
                                }}
                                dropDown={{
                                    label: 'Domain',
                                    items: emailOptions,
                                    value: emailDropdown,
                                    onSelect: setEmailDropdown,
                                    placeholder: 'Domain',
                                }}
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
                                helpIconHintText="Select country first, then enter city"
                                input={{
                                    value: locationValue,
                                    onChange: setLocationValue,
                                    placeholder: 'Enter city name',
                                }}
                                dropDown={{
                                    label: 'Country',
                                    items: countryOptions,
                                    value: locationDropdown,
                                    onSelect: setLocationDropdown,
                                    placeholder: 'Country',
                                }}
                            />

                            <DropdownInputV2
                                label="Meeting Time"
                                sublabel="Enter time with AM/PM"
                                hintText="Enter time in 12-hour format"
                                input={{
                                    value: timeValue,
                                    onChange: setTimeValue,
                                    placeholder: '12:00',
                                }}
                                dropDown={{
                                    label: 'Period',
                                    items: timeOptions,
                                    value: timeDropdown,
                                    onSelect: setTimeDropdown,
                                    placeholder: 'AM/PM',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown on left vs right */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Dropdown position</h2>
                <p
                    className={`text-sm max-w-3xl ${
                        theme === Theme.DARK ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    Use{' '}
                    <code className="font-mono text-xs">dropdownPosition</code>{' '}
                    to place the inline select on the leading or trailing edge
                    of the field (default is left).
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Left (default)
                        </h3>
                        <DropdownInputV2
                            label="Amount"
                            sublabel="Currency on the left"
                            dropdownPosition={DropdownPosition.LEFT}
                            input={{
                                value: positionLeftValue,
                                onChange: setPositionLeftValue,
                                placeholder: '0.00',
                            }}
                            dropDown={{
                                label: 'Currency',
                                items: currencyOptions,
                                value: positionLeftDropdown,
                                onSelect: setPositionLeftDropdown,
                                placeholder: 'Currency',
                            }}
                        />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Right</h3>
                        <DropdownInputV2
                            label="Amount"
                            sublabel="Currency on the right"
                            dropdownPosition={DropdownPosition.RIGHT}
                            input={{
                                value: positionRightValue,
                                onChange: setPositionRightValue,
                                placeholder: '0.00',
                            }}
                            dropDown={{
                                label: 'Currency',
                                items: currencyOptions,
                                value: positionRightDropdown,
                                onSelect: setPositionRightDropdown,
                                placeholder: 'Currency',
                            }}
                        />
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
                            required={true}
                            input={{
                                value: '',
                                onChange: () => {},
                                placeholder: 'Value',
                            }}
                            dropDown={{
                                items: basicOptions,
                                value: 'option1',
                                onSelect: () => {},
                                placeholder: 'Setting',
                            }}
                            size={InputSizeV2.LG}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Form Integration
                        </h3>
                        <DropdownInputV2
                            label="Custom Field"
                            sublabel="Field type and value"
                            error={{ show: false, message: '' }}
                            required={true}
                            helpIconHintText="Choose the field type then enter the corresponding value"
                            input={{
                                value: '',
                                onChange: () => {},
                                placeholder: 'Enter value',
                            }}
                            dropDown={{
                                items: basicOptions,
                                value: 'option1',
                                onSelect: () => {},
                                placeholder: 'Field type',
                            }}
                            size={InputSizeV2.LG}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropdownInputV2Demo

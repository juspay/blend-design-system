import { useState } from 'react'
import { DropdownInput, DropdownPosition, TextInputSize } from '../../../Inputs'

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

const DropdownInputLightHouse = () => {
    const [phoneNumber, setPhoneNumber] = useState('5551234567')
    const [countryCode, setCountryCode] = useState('+1')
    const [address, setAddress] = useState('123 Main St')
    const [country, setCountry] = useState('US')
    const [currency, setCurrency] = useState('USD')

    return (
        <div className="flex flex-col gap-4">
            {/* Basic DropdownInput */}
            <DropdownInput
                label="Phone Number"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                dropdownPosition={DropdownPosition.LEFT}
                dropDownItems={phoneCodeData}
                dropDownValue={countryCode}
                onDropDownChange={(value) => setCountryCode(value)}
                dropdownName="Country Code"
            />

            {/* Pre-filled value */}
            <DropdownInput
                label="Street Address"
                placeholder="Enter your street address"
                sublabel="Include apartment or unit number"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                dropdownPosition={DropdownPosition.RIGHT}
                dropDownItems={countryData}
                dropDownValue={country}
                onDropDownChange={(value) => setCountry(value)}
                dropdownName="Country"
                hintText="Select your country from the dropdown"
                required
            />

            {/* Currency field */}
            <DropdownInput
                label="Currency"
                placeholder="Enter amount"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                dropdownPosition={DropdownPosition.LEFT}
                dropDownItems={currencyData}
                dropDownValue={currency}
                onDropDownChange={(value) => setCurrency(value)}
                dropdownName="Currency"
                hintText="Select currency and enter amount"
            />

            {/* Error state */}
            <DropdownInput
                label="Phone Number (Error Example)"
                placeholder="Enter phone number"
                value="123"
                onChange={() => {}}
                dropdownPosition={DropdownPosition.LEFT}
                dropDownItems={phoneCodeData}
                dropDownValue="+1"
                onDropDownChange={() => {}}
                dropdownName="Country Code"
                error
                errorMessage="Please enter a valid phone number (at least 10 digits)"
            />

            {/* Disabled state */}
            <DropdownInput
                label="Disabled DropdownInput"
                value="Disabled value"
                onChange={() => {}}
                disabled
                dropDownItems={countryData}
                dropDownValue="US"
                onDropDownChange={() => {}}
                dropdownName="Country"
                hintText="This field is disabled"
            />

            {/* Required field */}
            <DropdownInput
                label="Required Field"
                placeholder="Enter value"
                value={undefined}
                onChange={() => {}}
                required
                dropDownItems={currencyData}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropdownName="Currency"
                hintText="This field is required"
            />

            {/* Different sizes */}
            <DropdownInput
                label="Small Size"
                placeholder="Small input"
                size={TextInputSize.SMALL}
                value=""
                onChange={() => {}}
                dropDownItems={currencyData}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropdownName="Currency"
            />
            <DropdownInput
                label="Medium Size"
                placeholder="Medium input"
                size={TextInputSize.MEDIUM}
                value=""
                onChange={() => {}}
                dropDownItems={currencyData}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropdownName="Currency"
            />
            <DropdownInput
                label="Large Size"
                placeholder="Large input"
                size={TextInputSize.LARGE}
                value=""
                onChange={() => {}}
                dropDownItems={currencyData}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropdownName="Currency"
            />

            {/* Different dropdown positions */}
            <DropdownInput
                label="Dropdown on Left"
                placeholder="Enter value"
                value=""
                onChange={() => {}}
                dropdownPosition={DropdownPosition.LEFT}
                dropDownItems={phoneCodeData}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropdownName="Code"
            />
            <DropdownInput
                label="Dropdown on Right"
                placeholder="Enter value"
                value=""
                onChange={() => {}}
                dropdownPosition={DropdownPosition.RIGHT}
                dropDownItems={currencyData}
                dropDownValue=""
                onDropDownChange={() => {}}
                dropdownName="Currency"
            />
        </div>
    )
}

export default DropdownInputLightHouse

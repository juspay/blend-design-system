'use client'
import { DropdownInput } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const DropdownInputPreview = () => {
    const tsCode = `import { DropdownInput, DropdownPosition } from "@juspay/blend-design-system";

function MyComponent() {
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  
  const currencyOptions = [
    {
      group: 'Currencies',
      items: [
        { id: 'USD', label: 'USD', value: 'USD' },
        { id: 'EUR', label: 'EUR', value: 'EUR' },
        { id: 'GBP', label: 'GBP', value: 'GBP' }
      ]
    }
  ];
  
  return (
    <DropdownInput
      label="Amount"
      placeholder="Enter amount"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      dropDownValue={currency}
      onDropDownChange={setCurrency}
      dropDownItems={currencyOptions}
      dropdownPosition={DropdownPosition.RIGHT}
      hintText="Select currency and enter amount"
    />
  );
}`

    const reCode = `@react.component
let make = () => {
  let (value, setValue) = React.useState(() => "")
  let (currency, setCurrency) = React.useState(() => "USD")
  
  let currencyOptions = [
    {
      "group": "Currencies",
      "items": [
        {"id": "USD", "label": "USD", "value": "USD"},
        {"id": "EUR", "label": "EUR", "value": "EUR"},
        {"id": "GBP", "label": "GBP", "value": "GBP"}
      ]
    }
  ]
  
  <DropdownInputBinding
    label="Amount"
    placeholder="Enter amount"
    value
    onChange={e => {
      let value = ReactEvent.Form.target(e)["value"]
      setValue(_ => value)
    }}
    dropDownValue=currency
    onDropDownChange={value => setCurrency(_ => value)}
    dropDownItems=currencyOptions
    dropdownPosition=#right
    hintText="Select currency and enter amount"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~label: string=?,
  ~sublabel: string=?,
  ~helpIconHintText: string=?,
  ~error: bool=?,
  ~errorMessage: string=?,
  ~hintText: string=?,
  ~value: string=?,
  ~onChange: ReactEvent.Form.t => unit=?,
  ~slot: React.element=?,
  ~size: [#sm | #md | #lg]=?,
  ~dropDownValue: string=?,
  ~onDropDownChange: string => unit=?,
  ~dropDownItems: array<{
    "group": string,
    "items": array<{
      "id": string,
      "label": string,
      "value": string
    }>
  }>,
  ~dropdownName: string=?,
  ~onDropdownOpen: unit => unit=?,
  ~onDropdownClose: unit => unit=?,
  ~onBlur: ReactEvent.Focus.t => unit=?,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~maxDropdownHeight: int=?,
  ~dropdownPosition: [#left | #right]=?,
  ~disabled: bool=?,
  ~placeholder: string=?,
  ~required: bool=?,
  ~name: string=?,
) => React.element = "DropdownInput"`

    const [value, setValue] = useState('')
    const [currency, setCurrency] = useState('USD')

    const currencyOptions = [
        {
            group: 'Popular Currencies',
            items: [
                { id: 'USD', label: 'USD', value: 'USD' },
                { id: 'EUR', label: 'EUR', value: 'EUR' },
                { id: 'GBP', label: 'GBP', value: 'GBP' },
                { id: 'JPY', label: 'JPY', value: 'JPY' },
            ],
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <DropdownInput
                    label="Price"
                    placeholder="0.00"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    dropDownValue={currency}
                    onDropDownChange={(value) => setCurrency(value)}
                    dropDownItems={currencyOptions}
                    dropdownPosition="right"
                    hintText="Enter price and select currency"
                />
            </div>
        </ComponentPreview>
    )
}

export default DropdownInputPreview

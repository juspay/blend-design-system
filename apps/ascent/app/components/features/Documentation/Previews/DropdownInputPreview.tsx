'use client'
import { DropdownInput, DropdownPosition } from '@juspay/blend-design-system'
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
        <ComponentPreview ts={tsCode}>
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
                    dropdownPosition={DropdownPosition.RIGHT}
                    hintText="Enter price and select currency"
                />
            </div>
        </ComponentPreview>
    )
}

export default DropdownInputPreview

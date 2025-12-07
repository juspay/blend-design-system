'use client'
import { NumberInput } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const NumberInputPreview = () => {
    const tsCode = `import { NumberInput } from "@juspay/blend-design-system";

function MyComponent() {
  const [quantity, setQuantity] = useState<number | undefined>(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value === '' ? undefined : Number(value));
  };
  
  return (
    <NumberInput
      label="Quantity"
      placeholder="Enter quantity"
      value={quantity}
      onChange={handleChange}
      min={0}
      max={100}
      step={1}
      hintText="Select quantity between 0 and 100"
    />
  );
}`

    const [quantity, setQuantity] = useState<number | undefined>(5)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuantity(value === '' ? undefined : Number(value))
    }

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
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                }}
            >
                <style>
                    {`
                    .number-input-preview input {
                        color: #374151 !important;
                    }
                    .number-input-preview input::placeholder {
                        color: #9CA3AF !important;
                    }
                `}
                </style>
                <div className="number-input-preview">
                    <NumberInput
                        label="Quantity"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={handleChange}
                        min={0}
                        max={20}
                        step={1}
                        hintText="Use arrows or type a number"
                    />
                </div>
            </div>
        </ComponentPreview>
    )
}

export default NumberInputPreview

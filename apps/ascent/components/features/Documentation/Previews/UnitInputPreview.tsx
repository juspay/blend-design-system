'use client'
import {
    UnitInput,
    UnitInputSize,
    UnitPosition,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const UnitInputPreview = () => {
    const tsCode = `import { UnitInput, UnitInputSize, UnitPosition } from "@juspay/blend-design-system";

function MyComponent() {
  const [weight, setWeight] = useState<number | undefined>(undefined);
  
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value ? parseFloat(e.target.value) : undefined);
  };
  
  return (
    <UnitInput
      label="Weight"
      placeholder="Enter weight"
      value={weight}
      onChange={handleWeightChange}
      unit="kg"
      unitPosition={UnitPosition.RIGHT}
      size={UnitInputSize.MEDIUM}
      min={0}
      max={1000}
      step={0.1}
      hintText="Enter weight in kilograms"
    />
  );
}`

    const [weight, setWeight] = useState<number | undefined>(undefined)

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value ? parseFloat(e.target.value) : undefined)
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
                    .unit-input-preview input {
                        color: #374151 !important;
                    }
                    .unit-input-preview input::placeholder {
                        color: #9CA3AF !important;
                    }
                `}
                </style>

                <div className="unit-input-preview">
                    <UnitInput
                        label="Weight"
                        placeholder="Enter weight"
                        value={weight}
                        onChange={handleWeightChange}
                        unit="kg"
                        unitPosition={UnitPosition.RIGHT}
                        size={UnitInputSize.MEDIUM}
                        min={0}
                        max={1000}
                        step={0.1}
                        hintText="Enter weight in kilograms"
                    />
                </div>

                {weight !== undefined && (
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: '#166534',
                        }}
                    >
                        ✓ Weight entered: {weight} kg
                    </div>
                )}
            </div>
        </ComponentPreview>
    )
}

export default UnitInputPreview

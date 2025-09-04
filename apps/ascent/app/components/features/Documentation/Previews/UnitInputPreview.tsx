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

    const reCode = `@react.component
let make = () => {
  let (weight, setWeight) = React.useState(() => None)
  
  let handleWeightChange = evt => {
    let value = ReactEvent.Form.target(evt)["value"]
    let floatValue = value == "" ? None : Some(Belt.Float.fromString(value))
    setWeight(_ => floatValue)
  }
  
  <UnitInputBinding
    label="Weight"
    placeholder="Enter weight"
    value=?weight
    onChange=handleWeightChange
    unit="kg"
    unitPosition="right"
    size="medium"
    min=0.0
    max=1000.0
    step=0.1
    hintText="Enter weight in kilograms"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: float=?,
  ~onChange: ReactEvent.Form.t => unit,
  ~min: float=?,
  ~max: float=?,
  ~step: float=?,
  ~error: bool=?,
  ~errorMessage: string=?,
  ~required: bool=?,
  ~disabled: bool=?,
  ~size: string=?,
  ~placeholder: string=?,
  ~sublabel: string=?,
  ~helpIconHintText: string=?,
  ~label: string=?,
  ~hintText: string=?,
  ~leftSlot: React.element=?,
  ~rightSlot: React.element=?,
  ~unit: string,
  ~unitPosition: string=?,
  ~name: string=?,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~onBlur: ReactEvent.Focus.t => unit=?,
) => React.element = "UnitInput"`

    const [weight, setWeight] = useState<number | undefined>(undefined)

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value ? parseFloat(e.target.value) : undefined)
    }

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

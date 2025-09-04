'use client'
import { TextInput } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TextInputPreview = () => {
    const tsCode = `import { TextInput } from "@juspay/blend-design-system";

function MyComponent() {
  const [value, setValue] = useState('');
  
  return (
    <TextInput
      label="Full Name"
      placeholder="Enter your full name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      hintText="This will be used for your profile"
    />
  );
}`

    const reCode = `@react.component
let make = () => {
  let (value, setValue) = React.useState(() => "")
  
  <TextInputBinding
    label="Full Name"
    placeholder="Enter your full name"
    value
    onChange={e => {
      let value = ReactEvent.Form.target(e)["value"]
      setValue(_ => value)
    }}
    hintText="This will be used for your profile"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~label: string=?,
  ~sublabel: string=?,
  ~hintText: string=?,
  ~helpIconHintText: string=?,
  ~error: bool=?,
  ~errorMessage: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~leftSlot: React.element=?,
  ~rightSlot: React.element=?,
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~onBlur: ReactEvent.Focus.t => unit=?,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~disabled: bool=?,
  ~placeholder: string=?,
  ~required: bool=?,
  ~name: string=?,
) => React.element = "TextInput"`

    const [basicValue, setBasicValue] = useState('')
    const [errorValue, setErrorValue] = useState('')

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
                <TextInput
                    label="Email Address"
                    placeholder="Enter your email"
                    value={basicValue}
                    onChange={(e) => setBasicValue(e.target.value)}
                    hintText="We'll never share your email"
                />

                <TextInput
                    label="Password"
                    placeholder="Enter password"
                    value={errorValue}
                    onChange={(e) => setErrorValue(e.target.value)}
                    error={true}
                    errorMessage="Password must be at least 8 characters"
                />
            </div>
        </ComponentPreview>
    )
}

export default TextInputPreview

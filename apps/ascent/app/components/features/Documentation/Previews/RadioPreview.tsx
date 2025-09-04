'use client'
import { Radio, RadioGroup, RadioSize } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const RadioPreview = () => {
    const [selectedOption, setSelectedOption] = useState('option1')

    const tsCode = `import { Radio, RadioGroup, RadioSize } from "@juspay/blend-design-system";

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <RadioGroup
      name="options"
      value={selectedOption}
      onChange={setSelectedOption}
      label="Select an option"
    >
      <Radio value="option1" size={RadioSize.MEDIUM}>
        Option 1
      </Radio>
      <Radio value="option2" size={RadioSize.MEDIUM}>
        Option 2
      </Radio>
      <Radio value="option3" size={RadioSize.MEDIUM}>
        Option 3
      </Radio>
    </RadioGroup>
  );
}`

    const reCode = `type radioSize = [#sm | #md]

@react.component
let make = (
  ~id: option<string>=?,
  ~value: option<string>=?,
  ~checked: option<bool>=?,
  ~defaultChecked: option<bool>=?,
  ~onChange: option<bool => unit>=?,
  ~disabled: option<bool>=?,
  ~required: option<bool>=?,
  ~error: option<bool>=?,
  ~size: option<radioSize>=?,
  ~children: option<React.element>=?,
  ~subtext: option<string>=?,
  ~slot: option<React.element>=?,
  ~name: option<string>=?,
) => {
  <RadioBinding
    ?id
    ?value
    ?checked
    ?defaultChecked
    ?onChange
    ?disabled
    ?required
    ?error
    ?size
    ?children
    ?subtext
    ?slot
    ?name
  />
}

@react.component
let makeGroup = (
  ~id: option<string>=?,
  ~label: option<string>=?,
  ~name: string,
  ~defaultValue: option<string>=?,
  ~value: option<string>=?,
  ~children: React.element,
  ~onChange: option<string => unit>=?,
  ~disabled: option<bool>=?,
) => {
  <RadioGroupBinding
    ?id
    ?label
    name
    ?defaultValue
    ?value
    children
    ?onChange
    ?disabled
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~id: string=?,
  ~value: string=?,
  ~checked: bool=?,
  ~defaultChecked: bool=?,
  ~onChange: bool => unit=?,
  ~disabled: bool=?,
  ~required: bool=?,
  ~error: bool=?,
  ~size: [#sm | #md]=?,
  ~children: React.element=?,
  ~subtext: string=?,
  ~slot: React.element=?,
  ~name: string=?,
) => React.element = "Radio"

@module("@juspay/blend-design-system") @react.component
external makeGroup: (
  ~id: string=?,
  ~label: string=?,
  ~name: string,
  ~defaultValue: string=?,
  ~value: string=?,
  ~children: React.element,
  ~onChange: string => unit=?,
  ~disabled: bool=?,
) => React.element = "RadioGroup"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <RadioGroup
                name="options"
                value={selectedOption}
                onChange={setSelectedOption}
                label="Select an option"
            >
                <Radio value="option1" size={RadioSize.MEDIUM}>
                    Option 1
                </Radio>
                <Radio value="option2" size={RadioSize.MEDIUM}>
                    Option 2
                </Radio>
                <Radio value="option3" size={RadioSize.MEDIUM}>
                    Option 3
                </Radio>
            </RadioGroup>
        </ComponentPreview>
    )
}

export default RadioPreview

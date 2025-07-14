'use client'
import { Radio, RadioGroup, RadioSize } from 'blend-v1'
import React, { useState } from 'react'
import ComponentPreview from './ComponentPreview'

const RadioPreview = () => {
    const [selectedOption, setSelectedOption] = useState('option1')
    const [selectedSize, setSelectedSize] = useState('small')
    const [selectedTheme, setSelectedTheme] = useState('light')
    const [selectedPlan, setSelectedPlan] = useState('basic')

    const tsCode = `import { Radio, RadioGroup, RadioSize } from "blend-v1";

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

    const bindingCode = `@module("blend-v1") @react.component
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

@module("blend-v1") @react.component
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
            <div className="m-4 min-w-100 space-y-8">
                {/* Basic Radio Group */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Basic Radio Group
                    </h3>
                    <RadioGroup
                        name="basic-options"
                        value={selectedOption}
                        onChange={setSelectedOption}
                        label="Select an option"
                    >
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                        <Radio value="option3">Option 3</Radio>
                    </RadioGroup>
                </div>

                {/* Radio with Subtext */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Radio with Subtext
                    </h3>
                    <RadioGroup
                        name="subtext-options"
                        value={selectedSize}
                        onChange={setSelectedSize}
                        label="Choose your size"
                    >
                        <Radio value="small" subtext="Perfect for small spaces">
                            Small
                        </Radio>
                        <Radio
                            value="medium"
                            subtext="Standard size for most use cases"
                        >
                            Medium
                        </Radio>
                        <Radio value="large" subtext="Ideal for large displays">
                            Large
                        </Radio>
                    </RadioGroup>
                </div>

                {/* Radio with Slots */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Radio with Slots
                    </h3>
                    <RadioGroup
                        name="slot-options"
                        value={selectedTheme}
                        onChange={setSelectedTheme}
                        label="Choose your theme"
                    >
                        <Radio
                            value="light"
                            slot={<span className="text-yellow-500">☀️</span>}
                        >
                            Light Theme
                        </Radio>
                        <Radio
                            value="dark"
                            slot={<span className="text-blue-500">🌙</span>}
                        >
                            Dark Theme
                        </Radio>
                        <Radio
                            value="auto"
                            slot={<span className="text-green-500">🔄</span>}
                            subtext="Follows system preference"
                        >
                            Auto Theme
                        </Radio>
                    </RadioGroup>
                </div>

                {/* Different Sizes */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Radio Sizes</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">Small Size</h4>
                            <RadioGroup
                                name="small-size"
                                value={selectedOption}
                                onChange={setSelectedOption}
                            >
                                <Radio value="option1" size={RadioSize.SMALL}>
                                    Small Option 1
                                </Radio>
                                <Radio value="option2" size={RadioSize.SMALL}>
                                    Small Option 2
                                </Radio>
                            </RadioGroup>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">
                                Medium Size (Default)
                            </h4>
                            <RadioGroup
                                name="medium-size"
                                value={selectedOption}
                                onChange={setSelectedOption}
                            >
                                <Radio value="option1" size={RadioSize.MEDIUM}>
                                    Medium Option 1
                                </Radio>
                                <Radio value="option2" size={RadioSize.MEDIUM}>
                                    Medium Option 2
                                </Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                {/* Radio States */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Radio States</h3>
                    <RadioGroup
                        name="states"
                        value={selectedOption}
                        onChange={setSelectedOption}
                    >
                        <Radio value="normal">Normal state</Radio>
                        <Radio value="required" required={true}>
                            Required field
                        </Radio>
                        <Radio value="disabled" disabled={true}>
                            Disabled option
                        </Radio>
                        <Radio value="error" error={true}>
                            Error state
                        </Radio>
                    </RadioGroup>
                </div>

                {/* Complex Form Example */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Complex Form Example
                    </h3>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">
                            Subscription Plan
                        </h4>

                        <RadioGroup
                            name="subscription-plan"
                            value={selectedPlan}
                            onChange={setSelectedPlan}
                            label="Choose your plan"
                        >
                            <Radio
                                value="basic"
                                subtext="Perfect for individuals and small projects"
                                slot={
                                    <span className="text-green-500 text-sm">
                                        Free
                                    </span>
                                }
                            >
                                Basic Plan
                            </Radio>

                            <Radio
                                value="pro"
                                subtext="Advanced features for growing teams"
                                slot={
                                    <span className="text-blue-500 text-sm">
                                        $9/mo
                                    </span>
                                }
                            >
                                Pro Plan
                            </Radio>

                            <Radio
                                value="enterprise"
                                subtext="Custom solutions for large organizations"
                                slot={
                                    <span className="text-purple-500 text-sm">
                                        Custom
                                    </span>
                                }
                            >
                                Enterprise Plan
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

                {/* Disabled Radio Group */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Disabled Radio Group
                    </h3>
                    <RadioGroup
                        name="disabled-group"
                        value={selectedOption}
                        onChange={setSelectedOption}
                        label="Disabled Options"
                        disabled={true}
                    >
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                        <Radio value="option3">Option 3</Radio>
                    </RadioGroup>
                </div>

                {/* Individual Radio Controls */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Individual Radio Controls
                    </h3>
                    <div className="space-y-4">
                        <Radio
                            value="individual1"
                            name="individual"
                            checked={selectedOption === 'individual1'}
                            onChange={(checked) =>
                                checked && setSelectedOption('individual1')
                            }
                        >
                            Individual Radio 1
                        </Radio>

                        <Radio
                            value="individual2"
                            name="individual"
                            checked={selectedOption === 'individual2'}
                            onChange={(checked) =>
                                checked && setSelectedOption('individual2')
                            }
                            subtext="This is an individual radio control"
                        >
                            Individual Radio 2
                        </Radio>
                    </div>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default RadioPreview

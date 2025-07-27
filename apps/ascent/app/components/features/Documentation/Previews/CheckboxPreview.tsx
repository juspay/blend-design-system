'use client'
import { Checkbox, CheckboxSize } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from './ComponentPreview'

const CheckboxPreview = () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)
    const [checked9, setChecked9] = useState(false)
    const [checked10, setChecked10] = useState(false)
    const [checked11, setChecked11] = useState(false)
    const [checked12, setChecked12] = useState(false)
    const [checked13, setChecked13] = useState(false)
    const [checked14, setChecked14] = useState(false)
    const [checked15, setChecked15] = useState(false)
    const [checked16, setChecked16] = useState(false)

    const tsCode = `import { Checkbox, CheckboxSize } from "@juspay/blend-design-system";

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      size={CheckboxSize.MEDIUM}
      required={true}
    >
      Accept terms and conditions
    </Checkbox>
  );
}`

    const reCode = `type checkboxSize = [#sm | #md]

@react.component
let make = (
  ~id: option<string>=?,
  ~value: option<string>=?,
  ~checked: option<bool>=?,
  ~defaultChecked: option<bool>=?,
  ~onCheckedChange: option<bool => unit>=?,
  ~disabled: option<bool>=?,
  ~required: option<bool>=?,
  ~error: option<bool>=?,
  ~size: option<checkboxSize>=?,
  ~children: option<React.element>=?,
  ~subtext: option<string>=?,
  ~slot: option<React.element>=?,
) => {
  <CheckboxBinding
    ?id
    ?value
    ?checked
    ?defaultChecked
    ?onCheckedChange
    ?disabled
    ?required
    ?error
    ?size
    ?children
    ?subtext
    ?slot
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~id: string=?,
  ~value: string=?,
  ~checked: bool=?,
  ~defaultChecked: bool=?,
  ~onCheckedChange: bool => unit=?,
  ~disabled: bool=?,
  ~required: bool=?,
  ~error: bool=?,
  ~size: [#sm | #md]=?,
  ~children: React.element=?,
  ~subtext: string=?,
  ~slot: React.element=?,
) => React.element = "Checkbox"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="m-4 min-w-100 space-y-8">
                {/* Basic Checkboxes */}
                <div>
                    <h3 className="text-lg text-black font-semibold mb-4">
                        Basic Checkboxes
                    </h3>
                    <div className="space-y-4">
                        <Checkbox
                            checked={checked1}
                            onCheckedChange={(checked) =>
                                setChecked1(checked === true)
                            }
                        >
                            Basic checkbox
                        </Checkbox>

                        <Checkbox
                            checked={checked2}
                            onCheckedChange={(checked) =>
                                setChecked2(checked === true)
                            }
                            size={CheckboxSize.SMALL}
                        >
                            Small checkbox
                        </Checkbox>

                        <Checkbox
                            checked={checked3}
                            onCheckedChange={(checked) =>
                                setChecked3(checked === true)
                            }
                            required={true}
                        >
                            Required checkbox
                        </Checkbox>
                    </div>
                </div>

                {/* Checkbox with Subtext */}
                <div>
                    <h3 className="text-lg text-black font-semibold mb-4">
                        Checkbox with Subtext
                    </h3>
                    <div className="space-y-4">
                        <Checkbox
                            checked={checked9}
                            onCheckedChange={(checked) =>
                                setChecked9(checked === true)
                            }
                            subtext="Additional information about this option"
                        >
                            Option with description
                        </Checkbox>

                        <Checkbox
                            checked={checked10}
                            onCheckedChange={(checked) =>
                                setChecked10(checked === true)
                            }
                            subtext="This option is required for the form to be valid"
                            required={true}
                        >
                            Required option with description
                        </Checkbox>

                        <Checkbox
                            checked={checked11}
                            onCheckedChange={(checked) =>
                                setChecked11(checked === true)
                            }
                            subtext="This option is currently unavailable"
                            disabled={true}
                        >
                            Disabled option with description
                        </Checkbox>
                    </div>
                </div>

                {/* Checkbox with Slot */}
                <div>
                    <h3 className="text-lg text-black font-semibold mb-4">
                        Checkbox with Slot
                    </h3>
                    <div className="space-y-4">
                        <Checkbox
                            checked={checked12}
                            onCheckedChange={(checked) =>
                                setChecked12(checked === true)
                            }
                            slot={
                                <span className="text-blue-500 text-sm">
                                    New
                                </span>
                            }
                        >
                            Option with badge
                        </Checkbox>

                        <Checkbox
                            checked={checked13}
                            onCheckedChange={(checked) =>
                                setChecked13(checked === true)
                            }
                            slot={
                                <span className="text-green-500 text-sm">
                                    ✓
                                </span>
                            }
                        >
                            Option with icon
                        </Checkbox>

                        <Checkbox
                            checked={checked14}
                            onCheckedChange={(checked) =>
                                setChecked14(checked === true)
                            }
                            slot={
                                <span className="text-orange-500 text-sm">
                                    Pro
                                </span>
                            }
                            subtext="Premium feature available"
                        >
                            Premium option
                        </Checkbox>
                    </div>
                </div>

                {/* Checkbox Sizes */}
                <div>
                    <h3 className="text-lg text-black font-semibold mb-4">
                        Checkbox Sizes
                    </h3>
                    <div className="space-y-4">
                        <Checkbox
                            checked={checked15}
                            onCheckedChange={(checked) =>
                                setChecked15(checked === true)
                            }
                            size={CheckboxSize.SMALL}
                        >
                            Small checkbox
                        </Checkbox>

                        <Checkbox
                            checked={checked16}
                            onCheckedChange={(checked) =>
                                setChecked16(checked === true)
                            }
                            size={CheckboxSize.MEDIUM}
                        >
                            Medium checkbox (default)
                        </Checkbox>
                    </div>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default CheckboxPreview

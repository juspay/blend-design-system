'use client'
import { Checkbox, CheckboxSize } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const CheckboxPreview = () => {
    const [checked, setChecked] = useState(false)

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
            <Checkbox
                checked={checked}
                onCheckedChange={(checked) => setChecked(checked === true)}
                size={CheckboxSize.MEDIUM}
                required={true}
            >
                Accept terms and conditions
            </Checkbox>
        </ComponentPreview>
    )
}

export default CheckboxPreview

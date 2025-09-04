'use client'
import { Switch, SwitchSize } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SwitchPreview = () => {
    const [isEnabled, setIsEnabled] = useState(false)

    const tsCode = `import { Switch, SwitchGroup, SwitchSize } from "@juspay/blend-design-system";

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      checked={isEnabled}
      onChange={setIsEnabled}
      label="Enable notifications"
      size={SwitchSize.MEDIUM}
    />
  );
}`

    const reCode = `type switchSize = [#sm | #md]

@react.component
let make = (
  ~id: option<string>=?,
  ~checked: option<bool>=?,
  ~defaultChecked: option<bool>=?,
  ~onChange: option<bool => unit>=?,
  ~disabled: option<bool>=?,
  ~required: option<bool>=?,
  ~error: option<bool>=?,
  ~size: option<switchSize>=?,
  ~label: option<React.element>=?,
  ~subtext: option<React.element>=?,
  ~slot: option<React.element>=?,
  ~name: option<string>=?,
  ~value: option<string>=?,
) => {
  <SwitchBinding
    ?id
    ?checked
    ?defaultChecked
    ?onChange
    ?disabled
    ?required
    ?error
    ?size
    ?label
    ?subtext
    ?slot
    ?name
    ?value
  />
}

@react.component
let makeGroup = (
  ~id: option<string>=?,
  ~label: option<string>=?,
  ~name: option<string>=?,
  ~children: React.element,
  ~disabled: option<bool>=?,
  ~value: option<array<string>>=?,
  ~defaultValue: option<array<string>>=?,
  ~onChange: option<array<string> => unit>=?,
) => {
  <SwitchGroupBinding
    ?id
    ?label
    ?name
    children
    ?disabled
    ?value
    ?defaultValue
    ?onChange
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~id: string=?,
  ~checked: bool=?,
  ~defaultChecked: bool=?,
  ~onChange: bool => unit=?,
  ~disabled: bool=?,
  ~required: bool=?,
  ~error: bool=?,
  ~size: [#sm | #md]=?,
  ~label: React.element=?,
  ~subtext: React.element=?,
  ~slot: React.element=?,
  ~name: string=?,
  ~value: string=?,
) => React.element = "Switch"

@module("@juspay/blend-design-system") @react.component
external makeGroup: (
  ~id: string=?,
  ~label: string=?,
  ~name: string=?,
  ~children: React.element,
  ~disabled: bool=?,
  ~value: array<string>=?,
  ~defaultValue: array<string>=?,
  ~onChange: array<string> => unit=?,
) => React.element = "SwitchGroup"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <Switch
                checked={isEnabled}
                onChange={setIsEnabled}
                label="Enable notifications"
                size={SwitchSize.MEDIUM}
            />
        </ComponentPreview>
    )
}

export default SwitchPreview

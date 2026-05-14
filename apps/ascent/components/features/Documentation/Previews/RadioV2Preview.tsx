'use client'
import { RadioV2, SelectorV2Size } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const RadioV2Preview = () => {
    const [selected, setSelected] = useState('option1')

    const tsCode = `import {
    RadioV2,
    SelectorV2Size,
} from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [selected, setSelected] = useState('option1')

    return (
        <RadioV2
            checked={selected === 'option1'}
            onCheckedChange={() => setSelected('option1')}
            size={SelectorV2Size.MD}
            label="Standard Shipping"
            subLabel="Delivery in 5-7 business days"
        />
    )
}`

    const reCode = `type selectorV2Size = [#sm | #md | #lg]

@react.component
let make = () => {
  let (selected, setSelected) = React.useState(() => "option1")

  <RadioV2Binding
    checked={selected === "option1"}
    onCheckedChange={_ => setSelected(_ => "option1")}
    size=#md
    label="Standard Shipping"
    subLabel="Delivery in 5-7 business days"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~checked: bool=?,
  ~onCheckedChange: ReactEvent.Form.t => unit=?,
  ~size: [#sm | #md | #lg]=?,
  ~label: string=?,
  ~subLabel: string=?,
  ~required: bool=?,
  ~error: bool=?,
  ~disabled: bool=?,
  ~slot: {slot: React.element, maxHeight: string}=?,
  ~maxLength: {label: int, subLabel: int}=?,
) => React.element = "RadioV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <RadioV2
                checked={selected === 'option1'}
                onCheckedChange={() => setSelected('option1')}
                size={SelectorV2Size.MD}
                label="Standard Shipping"
                subLabel="Delivery in 5-7 business days"
            />
        </ComponentPreview>
    )
}

export default RadioV2Preview

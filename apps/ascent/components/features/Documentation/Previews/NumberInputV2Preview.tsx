'use client'

import React, { useState } from 'react'
import { NumberInputV2, InputSizeV2 } from '@juspay/blend-design-system'

import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const NumberInputV2Preview = () => {
    const tsCode = `import { NumberInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [value, setValue] = useState(0)

    return (
        <NumberInputV2
            label={{ text: 'Quantity' }}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            min={0}
            max={100}
            step={1}
            size={InputSizeV2.MD}
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (value, setValue) = React.useState(() => 0)

  <NumberInputV2Binding
    label={{"text": "Quantity"}}
    value={value}
    onChange={e =>
      setValue(
        Belt.Int.fromString(
          ReactEvent.Form.target(e)["value"],
        )->Belt.Option.getWithDefault(0),
      )
    }
    min={0}
    max={100}
    step={1}
    size=#md
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: int,
  ~onChange: ReactEvent.Form.t => unit,
  ~label: {"text": string, "subtext"?: string}=?,
  ~size: [#sm | #md | #lg]=?,
  ~min: int=?,
  ~max: int=?,
  ~step: int=?,
  ~placeholder: string=?,
  ~error: {show: bool, message?: string}=?,
  ~slot: {left?: React.element, right?: React.element}=?,
  ~unit: string=?,
  ~unitDirection: [#left | #right]=?,
  ~preventNegative: bool=?,
  ~name: string=?,
  ~onBlur: ReactEvent.Focus.t => unit=?,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~helpIconText: string=?,
  ~hintText: string=?,
) => React.element = "NumberInputV2"`

    const [value, setValue] = useState(0)

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <NumberInputV2
                    label={{ text: 'Quantity' }}
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    min={0}
                    max={100}
                    step={1}
                    size={InputSizeV2.MD}
                />
            </div>
        </ComponentPreview>
    )
}

export default NumberInputV2Preview

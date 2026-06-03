'use client'
import { TextAreaV2, InputSizeV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TextAreaV2Preview = () => {
    const tsCode = `import { TextAreaV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [value, setValue] = useState('')

    return (
        <TextAreaV2
            label="Description"
            placeholder="Enter a detailed description..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size={InputSizeV2.MD}
            rows={4}
            resize="vertical"
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (value, setValue) = React.useState(() => "")

  <TextAreaV2Binding
    label="Description"
    placeholder="Enter a detailed description..."
    value={value}
    onChange={e => setValue(ReactEvent.Form.target(e)["value"])}
    size=#md
    rows={4}
    resize=#vertical
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~placeholder: string,
  ~label: string=?,
  ~sublabel: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~rows: int=?,
  ~resize: [#none | #both | #horizontal | #vertical | #block | #inline]=?,
  ~error: {show: bool, message?: string}=?,
  ~disabled: bool=?,
  ~autoFocus: bool=?,
  ~required: bool=?,
  ~hintText: string=?,
  ~helpIconText: string=?,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~onBlur: ReactEvent.Focus.t => unit=?,
) => React.element = "TextAreaV2"`

    const [value, setValue] = useState('')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <TextAreaV2
                    label="Description"
                    placeholder="Enter a detailed description..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size={InputSizeV2.MD}
                    rows={4}
                    resize="vertical"
                />
            </div>
        </ComponentPreview>
    )
}

export default TextAreaV2Preview

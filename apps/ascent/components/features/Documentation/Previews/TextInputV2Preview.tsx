'use client'
import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TextInputV2Preview = () => {
    const tsCode = `import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [value, setValue] = useState('')

    return (
        <TextInputV2
            label="Email Address"
            placeholder="Enter your email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size={InputSizeV2.MD}
            hintText="We'll never share your email"
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (value, setValue) = React.useState(() => "")

  <TextInputV2Binding
    label="Email Address"
    placeholder="Enter your email"
    value={value}
    onChange={e => setValue(ReactEvent.Form.target(e)["value"])}
    size=#md
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~placeholder: string=?,
  ~label: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~hintText: string=?,
  ~error: {show: bool, message?: string}=?,
) => React.element = "TextInputV2"`

    const [value, setValue] = useState('')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <TextInputV2
                    label="Email Address"
                    placeholder="Enter your email"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size={InputSizeV2.MD}
                    hintText="We'll never share your email"
                />
            </div>
        </ComponentPreview>
    )
}

export default TextInputV2Preview

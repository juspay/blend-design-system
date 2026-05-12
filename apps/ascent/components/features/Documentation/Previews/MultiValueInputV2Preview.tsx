'use client'

import React, { useState } from 'react'
import { MultiValueInputV2, InputSizeV2 } from '@juspay/blend-design-system'

import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const MultiValueInputV2Preview = () => {
    const tsCode = `import { MultiValueInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [value, setValue] = useState('react,typescript')

    return (
        <MultiValueInputV2
            label="Tags"
            placeholder="Add tags..."
            value={value}
            onChange={setValue}
            size={InputSizeV2.MD}
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (value, setValue) = React.useState(() => "react,typescript")

  <MultiValueInputV2Binding
    label="Tags"
    placeholder="Add tags..."
    value={value}
    onChange={setValue}
    size=#md
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: string => unit,
  ~label: string=?,
  ~placeholder: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~separator: string=?,
  ~maxValues: int=?,
) => React.element = "MultiValueInputV2"`

    const [value, setValue] = useState('react,typescript')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <MultiValueInputV2
                    label="Tags"
                    placeholder="Add tags..."
                    value={value}
                    onChange={setValue}
                    size={InputSizeV2.MD}
                />
            </div>
        </ComponentPreview>
    )
}

export default MultiValueInputV2Preview

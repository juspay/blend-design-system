'use client'
import { MultiValueInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const MultiValueInputV2Preview = () => {
    const tsCode = `import { MultiValueInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [values, setValues] = useState(['react', 'typescript'])

    return (
        <MultiValueInputV2
            label="Tags"
            placeholder="Add tags..."
            values={values}
            onChange={setValues}
            size={InputSizeV2.MD}
            separator=','
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (values, setValues) = React.useState(() => ["react", "typescript"])

  <MultiValueInputV2Binding
    label="Tags"
    placeholder="Add tags..."
    values={values}
    onChange={setValues}
    size=#md
    separator=","
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~values: array<string>,
  ~onChange: array<string> => unit,
  ~label: string=?,
  ~placeholder: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~separator: string=?,
  ~maxValues: int=?,
) => React.element = "MultiValueInputV2"`

    const [values, setValues] = useState(['react', 'typescript'])

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
                    values={values}
                    onChange={setValues}
                    size={InputSizeV2.MD}
                    separator=","
                />
            </div>
        </ComponentPreview>
    )
}

export default MultiValueInputV2Preview

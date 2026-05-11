'use client'
import { SingleSelectV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SingleSelectV2Preview = () => {
    const tsCode = `import { SingleSelectV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [selected, setSelected] = useState('')
    const items = [
        {
            groupLabel: 'Fruits',
            items: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
            ],
        },
    ]

    return (
        <SingleSelectV2
            label="Select Fruit"
            placeholder="Choose a fruit..."
            selected={selected}
            onSelect={setSelected}
            items={items}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let (selected, setSelected) = React.useState(() => "")
  let items = [
    {
      groupLabel: "Fruits",
      items: [
        {label: "Apple", value: "apple"},
        {label: "Banana", value: "banana"}
      ]
    }
  ]

  <SingleSelectV2Binding
    label="Select Fruit"
    placeholder="Choose a fruit..."
    selected={selected}
    onSelect={setSelected}
    items={items}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~selected: string,
  ~onSelect: string => unit,
  ~items: array<'a>,
  ~placeholder: string,
  ~label: string=?,
  ~search: {show: bool, placeholder?: string}=?,
) => React.element = "SingleSelectV2"`

    const [selected, setSelected] = useState('')
    const items = [
        {
            groupLabel: 'Fruits',
            items: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Cherry', value: 'cherry' },
            ],
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <SingleSelectV2
                    label="Select Fruit"
                    placeholder="Choose a fruit..."
                    selected={selected}
                    onSelect={setSelected}
                    items={items}
                />
            </div>
        </ComponentPreview>
    )
}

export default SingleSelectV2Preview

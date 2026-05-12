'use client'

import React, { useState } from 'react'
import {
    MultiSelectV2,
    MultiSelectV2SelectionTagType,
} from '@juspay/blend-design-system'

import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const MultiSelectV2Preview = () => {
    const tsCode = `import { MultiSelectV2, MultiSelectV2SelectionTagType } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [selected, setSelected] = useState(['react'])

    const items = [
        {
            groupLabel: 'Frontend',
            items: [
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Angular', value: 'angular' },
            ],
        },
    ]

    return (
        <MultiSelectV2
            label="Technologies"
            placeholder="Select technologies..."
            selectedValues={selected}
            items={items}
            selectionTagType={MultiSelectV2SelectionTagType.TEXT}
            onChange={(value) =>
                setSelected(Array.isArray(value) ? value : [value])
            }
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let (selected, setSelected) = React.useState(() => ["react"])

  let items = [
    {
      groupLabel: "Frontend",
      items: [
        {label: "React", value: "react"},
        {label: "Vue", value: "vue"},
        {label: "Angular", value: "angular"},
      ],
    },
  ]

  <MultiSelectV2Binding
    label="Technologies"
    placeholder="Select technologies..."
    selectedValues={selected}
    items={items}
    selectionTagType=#text
    onChange={value =>
      setSelected(
        Belt.Array.isArray(value)
          ? Obj.magic(value)
          : [Obj.magic(value)]
      )
    }
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~selectedValues: array<string>,
  ~onChange: string | array<string> => unit,
  ~items: array<'a>,
  ~label: string=?,
  ~placeholder: string=?,
  ~selectionTagType: [#count | #text]=?,
  ~enableSelectAll: bool=?,
) => React.element = "MultiSelectV2"`

    const [selected, setSelected] = useState<string[]>(['react'])

    const items = [
        {
            groupLabel: 'Frontend',
            items: [
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Angular', value: 'angular' },
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
                <MultiSelectV2
                    label="Technologies"
                    placeholder="Select technologies..."
                    selectedValues={selected}
                    items={items}
                    selectionTagType={MultiSelectV2SelectionTagType.TEXT}
                    onChange={(value) =>
                        setSelected(Array.isArray(value) ? value : [value])
                    }
                />
            </div>
        </ComponentPreview>
    )
}

export default MultiSelectV2Preview

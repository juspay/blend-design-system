'use client'

import React, { useState } from 'react'
import { MultiValueInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import {
    TagSize,
    TagShape,
    TagVariant,
} from '@juspay/blend-design-system/deprecated/tag'

import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const MultiValueInputV2Preview = () => {
    const tsCode = `import {
    MultiValueInputV2,
    InputSizeV2,
    TagSize,
    TagShape,
    TagVariant
} from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [value, setValue] = useState('')
    const [tags, setTags] = useState(['react', 'typescript'])

    const handleTagAdd = (tag: string) => {
        setTags([...tags, tag])
        setValue('')
    }

    const handleTagRemove = (tag: string) => {
        setTags(tags.filter(t => t !== tag))
    }

    return (
        <MultiValueInputV2
            label="Technologies"
            sublabel="Add your tech stack"
            placeholder="Type and press Enter..."
            value={value}
            onChange={setValue}
            size={InputSizeV2.MD}
            tags={{
                value: tags,
                size: TagSize.XS,
                shape: TagShape.ROUNDED,
                variant: TagVariant.SUBTLE
            }}
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagRemove}
            hintText="Press Enter to add a tag"
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (value, setValue) = React.useState(() => "")
  let (tags, setTags) = React.useState(() => ["react", "typescript"])

  let handleTagAdd = (tag) => {
    setTags(prev => Array.concat(prev, [tag]))
    setValue(_ => "")
  }

  let handleTagRemove = (tag) => {
    setTags(prev => Array.filter(t => t !== tag, prev))
  }

  <MultiValueInputV2Binding
    label="Technologies"
    sublabel="Add your tech stack"
    placeholder="Type and press Enter..."
    value={value}
    onChange={setValue}
    size=#md
    tags={{
      value: tags,
      size: #xs,
      shape: #rounded,
      variant: #subtle
    }}
    onTagAdd={handleTagAdd}
    onTagRemove={handleTagRemove}
    hintText="Press Enter to add a tag"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: string => unit,
  ~label: string=?,
  ~sublabel: string=?,
  ~placeholder: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~tags: {
    value: array<string>,
    size: [#xs | #sm | #md | #lg],
    shape: [#rounded | #square | #pill],
    variant: [#solid | #subtle | #outline]
  }=?,
  ~onTagAdd: string => unit=?,
  ~onTagRemove: string => unit=?,
  ~disabled: bool=?,
  ~error: bool=?,
  ~errorMessage: string=?,
  ~hintText: string=?,
) => React.element = "MultiValueInputV2"`

    const [value, setValue] = useState('')
    const [tags, setTags] = useState(['react', 'typescript'])

    const handleTagAdd = (tag: string) => {
        setTags([...tags, tag])
        setValue('')
    }

    const handleTagRemove = (tag: string) => {
        setTags(tags.filter((t) => t !== tag))
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <MultiValueInputV2
                    label="Technologies"
                    sublabel="Add your tech stack"
                    placeholder="Type and press Enter..."
                    value={value}
                    onChange={setValue}
                    size={InputSizeV2.MD}
                    tags={{
                        value: tags,
                        size: TagSize.XS,
                        shape: TagShape.ROUNDED,
                        variant: TagVariant.SUBTLE,
                    }}
                    onTagAdd={handleTagAdd}
                    onTagRemove={handleTagRemove}
                    hintText="Press Enter to add a tag"
                />
            </div>
        </ComponentPreview>
    )
}

export default MultiValueInputV2Preview

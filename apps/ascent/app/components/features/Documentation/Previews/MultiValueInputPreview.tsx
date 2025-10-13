'use client'
import { MultiValueInput } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const MultiValueInputPreview = () => {
    const tsCode = `import { MultiValueInput } from "@juspay/blend-design-system";

function MyComponent() {
  const [tags, setTags] = useState(['react', 'typescript']);
  
  const handleTagAdd = (tag: string) => {
    setTags(prev => [...prev, tag]);
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <MultiValueInput
      label="Skills"
      placeholder="Type a skill and press Enter"
      tags={tags}
      onTagAdd={handleTagAdd}
      onTagRemove={handleTagRemove}
      hintText="Add your technical skills"
    />
  );
}`

    const reCode = `@react.component
let make = () => {
  let (tags, setTags) = React.useState(() => ["react", "typescript"])
  
  let handleTagAdd = tag => {
    setTags(prev => Array.concat(prev, [tag]))
  }
  
  let handleTagRemove = tagToRemove => {
    setTags(prev => Array.filter(prev, tag => tag !== tagToRemove))
  }
  
  <MultiValueInputBinding
    label="Skills"
    placeholder="Type a skill and press Enter"
    tags
    onTagAdd=handleTagAdd
    onTagRemove=handleTagRemove
    hintText="Add your technical skills"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~label: string=?,
  ~sublabel: string=?,
  ~helpIconHintText: string=?,
  ~error: bool=?,
  ~errorMessage: string=?,
  ~hintText: string=?,
  ~disabled: bool=?,
  ~tags: array<string>=?,
  ~onTagAdd: string => unit=?,
  ~onTagRemove: string => unit=?,
  ~size: [#sm | #md | #lg]=?,
  ~required: bool=?,
  ~placeholder: string=?,
  ~name: string=?,
) => React.element = "MultiValueInput"`

    const [tags, setTags] = useState(['React'])

    const handleTagAdd = (tag: string) => {
        setTags((prev) => [...prev, tag])
    }

    const handleTagRemove = (tagToRemove: string) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    minHeight: '120px',
                }}
            >
                <style>
                    {`
                    .multi-value-input-preview input {
                        color: #374151 !important;
                    }
                    .multi-value-input-preview input::placeholder {
                        color: #9CA3AF !important;
                    }
                `}
                </style>
                <div className="multi-value-input-preview">
                    <MultiValueInput
                        label="Technologies"
                        placeholder="Type and press Enter to add"
                        tags={tags}
                        onTagAdd={handleTagAdd}
                        onTagRemove={handleTagRemove}
                        hintText="Add technologies you work with"
                    />
                </div>
            </div>
        </ComponentPreview>
    )
}

export default MultiValueInputPreview

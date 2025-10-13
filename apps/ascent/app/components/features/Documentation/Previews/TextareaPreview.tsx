'use client'
import { TextArea } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TextareaPreview = () => {
    const tsCode = `import { TextArea } from "@juspay/blend-design-system";

function MyComponent() {
  const [description, setDescription] = useState('');
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  
  return (
    <TextArea
      label="Description"
      placeholder="Enter your description..."
      value={description}
      onChange={handleDescriptionChange}
      rows={4}
      hintText="Provide a detailed description"
      required
    />
  );
}`

    const reCode = `@react.component
let make = () => {
  let (description, setDescription) = React.useState(() => "")
  
  let handleDescriptionChange = evt => {
    let value = ReactEvent.Form.target(evt)["value"]
    setDescription(_ => value)
  }
  
  <TextAreaBinding
    label="Description"
    placeholder="Enter your description..."
    value=description
    onChange=handleDescriptionChange
    rows=4
    hintText="Provide a detailed description"
    required=true
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~placeholder: string,
  ~disabled: bool=?,
  ~autoFocus: bool=?,
  ~onChange: ReactEvent.Form.t => unit,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~onBlur: ReactEvent.Focus.t => unit=?,
  ~rows: int=?,
  ~cols: int=?,
  ~label: string=?,
  ~sublabel: string=?,
  ~hintText: string=?,
  ~helpIconHintText: string=?,
  ~required: bool=?,
  ~error: bool=?,
  ~errorMessage: string=?,
  ~resize: string=?,
  ~wrap: string=?,
) => React.element = "TextArea"`

    const [description, setDescription] = useState('')

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(e.target.value)
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
                }}
            >
                <style>
                    {`
                    .textarea-preview textarea {
                        color: #374151 !important;
                    }
                    .textarea-preview textarea::placeholder {
                        color: #9CA3AF !important;
                    }
                `}
                </style>

                <div className="textarea-preview">
                    <TextArea
                        label="Description"
                        placeholder="Enter your description..."
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={4}
                        hintText="Provide a detailed description"
                    />
                </div>

                {description && (
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: '#166534',
                        }}
                    >
                        ✓ Text entered: {description.length} characters
                    </div>
                )}
            </div>
        </ComponentPreview>
    )
}

export default TextareaPreview

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

    const [description, setDescription] = useState('')

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(e.target.value)
    }

    return (
        <ComponentPreview ts={tsCode}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: 'var(--surface)',
                    borderRadius: '8px',
                }}
            >
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
                            backgroundColor: 'var(--success-bg)',
                            border: '1px solid var(--success-border)',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: 'var(--success-foreground)',
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

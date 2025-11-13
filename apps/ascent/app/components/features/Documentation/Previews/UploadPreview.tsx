'use client'
import { Upload } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const UploadPreview = () => {
    const tsCode = `import { Upload, UploadState } from 'blend-v1'

function MyComponent() {
    const handleDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        console.log('Accepted files:', acceptedFiles)
        console.log('Rejected files:', fileRejections)
    }

    return (
        <Upload
            label="Upload File"
            subLabel="Max size 5MB"
            multiple={false}
            accept={['.pdf', '.doc', '.docx']}
            maxSize={5 * 1024 * 1024}
            onDrop={handleDrop}
        />
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <Upload
                label="Upload File"
                subLabel="Max size 5MB"
                description="Drag and drop files here or click to browse"
            />
        </ComponentPreview>
    )
}

export default UploadPreview

'use client'

import {
    UploadErrorReason,
    UploadFileV2,
    UploadV2,
    UploadV2State,
} from '@juspay/blend-design-system'
import React, { useMemo, useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const UploadV2Preview = () => {
    const [files, setFiles] = useState<UploadFileV2[]>([])

    const sampleFiles = useMemo<UploadFileV2[]>(
        () => [
            {
                file: new File(['sample'], 'settlement-report.csv', {
                    type: 'text/csv',
                }),
                isValid: true,
            },
            {
                file: new File(['large'], 'large-export.csv', {
                    type: 'text/csv',
                }),
                isValid: false,
                errorReason: UploadErrorReason.OVERSIZED,
            },
        ],
        []
    )

    const tsCode = `import {
    UploadErrorReason,
    UploadFileV2,
    UploadV2,
    UploadV2State,
} from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [files, setFiles] = useState<UploadFileV2[]>([])

    return (
        <UploadV2
            label="Upload settlement file"
            subLabel="CSV only"
            description=".csv only | Max size 8 MB"
            acceptedFileTypes={['.csv']}
            maxSize={8 * 1024 * 1024}
            maxFiles={2}
            files={files}
            onChange={setFiles}
            state={UploadV2State.IDLE}
            uploadHeaderText="Choose a file or drag & drop it here"
        />
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div className="grid w-full gap-6 md:grid-cols-2">
                <UploadV2
                    label="Upload settlement file"
                    subLabel="CSV only"
                    description=".csv only | Max size 8 MB"
                    acceptedFileTypes={['.csv']}
                    maxSize={8 * 1024 * 1024}
                    maxFiles={2}
                    files={files}
                    onChange={setFiles}
                    state={UploadV2State.IDLE}
                    uploadHeaderText="Choose a file or drag & drop it here"
                />
                <UploadV2
                    label="Validation state"
                    subLabel="Mixed results"
                    description="Shows accepted and rejected files"
                    acceptedFileTypes={['.csv']}
                    files={sampleFiles}
                    state={UploadV2State.ERROR}
                    maxSize={8 * 1024 * 1024}
                    maxFiles={2}
                    uploadHeaderText="Review uploaded files"
                />
            </div>
        </ComponentPreview>
    )
}

export default UploadV2Preview

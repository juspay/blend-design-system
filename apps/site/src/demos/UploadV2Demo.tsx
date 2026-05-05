import { useState } from 'react'
import UploadV2 from '../../../../packages/blend/lib/components/InputsV2/UploadV2/UploadV2'
import type { UploadFileV2 } from '../../../../packages/blend/lib/components/InputsV2/UploadV2/UploadV2.types'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { UploadState } from '../../../../packages/blend/lib/components/InputsV2/UploadV2/UploadV2.types'
import { Upload as UploadIcon, CheckCircle, AlertCircle } from 'lucide-react'

const UploadV2Demo = () => {
    // Playground state
    const [playgroundMultiple, setPlaygroundMultiple] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundCustomSlot, setPlaygroundCustomSlot] = useState(true)
    const [playgroundHelpIconText, setPlaygroundHelpIconText] = useState(
        'Upload your files here. Supported formats include CSV files up to 8MB in size.'
    )
    // UploadV2 files state
    const [uploadV2Files, setUploadV2Files] = useState<UploadFileV2[]>([])
    const successDummyFiles: UploadFileV2[] = [
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: true,
        },
    ]
    const errorDummyFiles: UploadFileV2[] = [
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: false,
            errorReason: 'maxFiles',
        },
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: false,
            errorReason: 'maxFiles',
        },
    ]
    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">UploadV2 Playground</h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Switch
                            label="Multiple Files"
                            checked={playgroundMultiple}
                            onChange={() =>
                                setPlaygroundMultiple(!playgroundMultiple)
                            }
                        />
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Required"
                            checked={playgroundRequired}
                            onChange={() =>
                                setPlaygroundRequired(!playgroundRequired)
                            }
                        />
                        <Switch
                            label="Custom Slot"
                            checked={playgroundCustomSlot}
                            onChange={() =>
                                setPlaygroundCustomSlot(!playgroundCustomSlot)
                            }
                        />
                        <Switch
                            label="Help Icon Text"
                            checked={!!playgroundHelpIconText}
                            onChange={() =>
                                setPlaygroundHelpIconText((prev) =>
                                    prev
                                        ? ''
                                        : 'Upload your files here. Supported formats include CSV files up to 8MB in size.'
                                )
                            }
                        />
                    </div>

                    <h2 className="text-2xl font-bold">UploadV2 Idle State</h2>
                    <UploadV2
                        label="Upload Files"
                        subLabel="Max 10MB"
                        helpIconText={playgroundHelpIconText}
                        required={playgroundRequired}
                        acceptedFileTypes={[
                            '.csv',
                            '.txt',
                            '.pdf',
                            '.doc',
                            '.docx',
                            '.xls',
                            '.xlsx',
                            '.ppt',
                            '.pptx',
                            '.jpg',
                            '.jpeg',
                            '.png',
                            '.gif',
                            '.mp4',
                            '.avi',
                            '.mov',
                            '.mp3',
                            '.wav',
                        ]}
                        slot={
                            playgroundCustomSlot ? (
                                <UploadIcon size={32} color="#6366f1" />
                            ) : undefined
                        }
                        state={UploadState.IDLE}
                        multiple={playgroundMultiple}
                        disabled={playgroundDisabled}
                        files={uploadV2Files}
                        onChange={(files) => {
                            console.log('files', files)
                            setUploadV2Files(files)
                        }}
                        maxSize={8 * 1024 * 1024}
                        maxFiles={2}
                        description=".csv only | Max size 8 MB"
                        uploadHeaderText="Choose a file or drag & drop it here"
                    />
                    <h2 className="text-2xl font-bold">UploadV2 Error State</h2>
                    <UploadV2
                        label="Upload Files"
                        subLabel="Max 10MB"
                        helpIconText={playgroundHelpIconText}
                        required={playgroundRequired}
                        acceptedFileTypes={[
                            '.csv',
                            '.txt',
                            '.pdf',
                            '.doc',
                            '.docx',
                            '.xls',
                            '.xlsx',
                            '.ppt',
                            '.pptx',
                            '.jpg',
                            '.jpeg',
                            '.png',
                            '.gif',
                            '.mp4',
                            '.avi',
                            '.mov',
                            '.mp3',
                            '.wav',
                        ]}
                        slot={
                            playgroundCustomSlot ? (
                                <AlertCircle size={32} color="#ef4444" />
                            ) : undefined
                        }
                        multiple={playgroundMultiple}
                        disabled={playgroundDisabled}
                        files={errorDummyFiles}
                        onChange={(files) => {
                            setUploadV2Files(files)
                        }}
                        state={UploadState.ERROR}
                        // errorText="File type not supported"
                        maxSize={8 * 1024 * 1024}
                        maxFiles={2}
                        description=".csv only | Max size 8 MB"
                        uploadHeaderText="Uploading sample_file.csv..."
                    />
                    <h2 className="text-2xl font-bold">
                        UploadV2 Success State
                    </h2>

                    <UploadV2
                        label="Upload Files"
                        subLabel="Max 10MB"
                        helpIconText={playgroundHelpIconText}
                        required={playgroundRequired}
                        acceptedFileTypes={[
                            '.csv',
                            '.txt',
                            '.pdf',
                            '.doc',
                            '.docx',
                            '.xls',
                            '.xlsx',
                            '.ppt',
                            '.pptx',
                            '.jpg',
                            '.jpeg',
                            '.png',
                            '.gif',
                            '.mp4',
                            '.avi',
                            '.mov',
                            '.mp3',
                            '.wav',
                        ]}
                        slot={
                            playgroundCustomSlot ? (
                                <CheckCircle size={32} color="#10b981" />
                            ) : undefined
                        }
                        multiple={playgroundMultiple}
                        disabled={playgroundDisabled}
                        files={successDummyFiles}
                        onChange={(files) => {
                            setUploadV2Files(files)
                        }}
                        state={UploadState.SUCCESS}
                        // errorText="File type not supported"
                        maxSize={8 * 1024 * 1024}
                        maxFiles={2}
                        description=" Test files uploaded successfully"
                        progressBarValue={50}
                        uploadHeaderText="File uploaded successfully"
                    />

                    <h2 className="text-2xl font-bold">
                        UploadV2 with Progress Bar
                    </h2>
                    <UploadV2
                        label="Upload Files"
                        subLabel="Max 10MB"
                        helpIconText={playgroundHelpIconText}
                        required={playgroundRequired}
                        acceptedFileTypes={[
                            '.csv',
                            '.txt',
                            '.pdf',
                            '.doc',
                            '.docx',
                            '.xls',
                            '.xlsx',
                            '.ppt',
                            '.pptx',
                            '.jpg',
                            '.jpeg',
                            '.png',
                            '.gif',
                            '.mp4',
                            '.avi',
                            '.mov',
                            '.mp3',
                            '.wav',
                        ]}
                        slot={
                            playgroundCustomSlot ? (
                                <UploadIcon size={32} color="#6366f1" />
                            ) : undefined
                        }
                        multiple={playgroundMultiple}
                        disabled={playgroundDisabled}
                        files={uploadV2Files}
                        onChange={(files) => {
                            setUploadV2Files(files)
                        }}
                        state={UploadState.UPLOADING}
                        // errorText="File type not supported"
                        maxSize={8 * 1024 * 1024}
                        maxFiles={2}
                        description=".csv only | Max size 8 MB"
                        uploadHeaderText="Uploading sample_file.csv..."
                        progressBarValue={50}
                    />
                </div>
            </div>
        </div>
    )
}

export default UploadV2Demo

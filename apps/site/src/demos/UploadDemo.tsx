import { useState } from 'react'
import {
    Upload,
    UploadState,
} from '../../../../packages/blend/lib/components/Upload'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import {
    Upload as UploadIcon,
    Image,
    FileText,
    CheckCircle,
    AlertCircle,
    Video,
    Music,
} from 'lucide-react'

const UploadDemo = () => {
    // Playground state
    const [playgroundMultiple, setPlaygroundMultiple] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundCustomSlot, setPlaygroundCustomSlot] = useState(false)
    const [playgroundHelpIcon, setPlaygroundHelpIcon] = useState(false)
    const [playgroundProgressSpeed, setPlaygroundProgressSpeed] = useState(200)

    // Simple state for reset buttons
    const [resetKey, setResetKey] = useState(0)

    const renderCustomSlot = () => <UploadIcon size={32} color="#6366f1" />

    return (
        <div className="p-8 space-y-12">
            {/* Global Reset Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setResetKey((prev) => prev + 1)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Reset All Demos
                </button>
            </div>

            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
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
                            label="Help Icon"
                            checked={playgroundHelpIcon}
                            onChange={() =>
                                setPlaygroundHelpIcon(!playgroundHelpIcon)
                            }
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium">
                            Progress Speed (ms):
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="1000"
                            step="50"
                            value={playgroundProgressSpeed}
                            onChange={(e) =>
                                setPlaygroundProgressSpeed(
                                    Number(e.target.value)
                                )
                            }
                            className="w-32"
                        />
                        <span className="text-sm text-gray-600">
                            {playgroundProgressSpeed}ms
                        </span>
                    </div>

                    <div className="min-h-[200px] rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
                        <Upload
                            label="Upload Files"
                            subLabel="Max 10MB"
                            helpIconHintText={
                                playgroundHelpIcon
                                    ? 'Upload your files here. Supported formats include CSV files up to 8MB in size.'
                                    : undefined
                            }
                            multiple={playgroundMultiple}
                            disabled={playgroundDisabled}
                            required={playgroundRequired}
                            description=".csv only | Max size 8 MB"
                            accept={[
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
                            maxSize={8 * 1024 * 1024} // 8MB
                            style={{ width: '480px' }}
                            maxFiles={5}
                        >
                            {playgroundCustomSlot
                                ? renderCustomSlot()
                                : undefined}
                        </Upload>
                    </div>
                </div>
            </div>

            {/* Label Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Label Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            With Label & Required
                        </h3>
                        <Upload
                            label="Profile Picture"
                            required={true}
                            helpIconHintText="Upload your profile picture. Supported formats: JPG, PNG, GIF up to 5MB."
                            description="Images only"
                            accept={['image/*']}
                            maxSize={5 * 1024 * 1024}
                        >
                            <Image size={32} color="#10b981" />
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            With Label & Sub Label
                        </h3>
                        <Upload
                            label="Documents"
                            subLabel="Optional"
                            helpIconHintText="Upload your documents in PDF format. Maximum file size is 10MB."
                            description="PDF files only"
                            accept={['application/pdf']}
                            maxSize={10 * 1024 * 1024}
                        >
                            <FileText size={32} color="#ef4444" />
                        </Upload>
                    </div>
                </div>
            </div>

            {/* Multiple Files Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Multiple Files Upload</h2>
                <div className="space-y-4">
                    <p className="text-gray-600">
                        This demo shows multiple file upload with automatic
                        duplicate prevention and error handling:
                    </p>

                    <div className="max-w-md">
                        <Upload
                            key={`multiple-${resetKey}`}
                            label="Multiple File Upload"
                            subLabel="Required"
                            required={true}
                            multiple={true}
                            description="Any file type | Max 5 files"
                            maxFiles={5}
                            style={{ width: '480px' }}
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>

                    {/* Reset button */}
                    <button
                        onClick={() => setResetKey((prev) => prev + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Reset Multiple Upload Demo
                    </button>
                </div>
            </div>

            {/* Upload States Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Upload States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Idle State */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Idle State</h3>
                        <Upload
                            label="Upload Document"
                            description="Choose a file or drag & drop it here"
                            state={UploadState.IDLE}
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>

                    {/* Uploading State */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Uploading State</h3>
                        <Upload
                            label="Upload Document"
                            description="Please wait while uploading"
                            state={UploadState.UPLOADING}
                            uploadingFiles={[
                                {
                                    id: 'demo-1',
                                    file: new File([''], 'sample_file.csv', {
                                        type: 'text/csv',
                                    }),
                                    progress: 65,
                                    status: UploadState.UPLOADING,
                                },
                            ]}
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>

                    {/* Success State */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Success State</h3>
                        <Upload
                            label="Upload Document"
                            state={UploadState.SUCCESS}
                            uploadedFiles={[
                                {
                                    id: 'demo-success',
                                    file: new File([''], 'uploaded_file.csv', {
                                        type: 'text/csv',
                                    }),
                                    status: 'success',
                                },
                            ]}
                            onReplaceFile={() => {}}
                        >
                            <CheckCircle size={32} color="#10b981" />
                        </Upload>
                    </div>

                    {/* Error State */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Error State</h3>
                        <Upload
                            label="Upload Document"
                            state={UploadState.ERROR}
                            failedFiles={[
                                {
                                    id: 'demo-error',
                                    file: new File([''], 'failed_file.txt', {
                                        type: 'text/plain',
                                    }),
                                    status: 'error',
                                    error: 'File type not supported',
                                },
                            ]}
                            errorText="File type not supported"
                        >
                            <AlertCircle size={32} color="#ef4444" />
                        </Upload>
                    </div>
                </div>
            </div>

            {/* Different File Types */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">File Type Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Images Only (JPG, PNG, GIF)
                        </h3>
                        <Upload
                            key={`image-${resetKey}`}
                            label="Image Upload"
                            description="JPG, PNG, GIF only"
                            accept={['.jpg', '.jpeg', '.png', '.gif']}
                            maxSize={5 * 1024 * 1024}
                        >
                            <Image size={32} color="#10b981" />
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Videos Only (MP4, AVI, MOV)
                        </h3>
                        <Upload
                            key={`video-${resetKey}`}
                            label="Video Upload"
                            description="MP4, AVI, MOV only"
                            accept={['.mp4', '.avi', '.mov']}
                            maxSize={50 * 1024 * 1024}
                        >
                            <Video size={32} color="#8b5cf6" />
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Audio Files (MP3, WAV)
                        </h3>
                        <Upload
                            key={`audio-${resetKey}`}
                            label="Audio Upload"
                            description="MP3, WAV only"
                            accept={['.mp3', '.wav']}
                            maxSize={20 * 1024 * 1024}
                        >
                            <Music size={32} color="#f59e0b" />
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">PDFs Only</h3>
                        <Upload
                            key={`pdf-${resetKey}`}
                            label="PDF Upload"
                            description="PDFs only"
                            accept={['application/pdf']}
                            maxSize={10 * 1024 * 1024}
                        >
                            <FileText size={32} color="#ef4444" />
                        </Upload>
                    </div>
                </div>
            </div>

            {/* Disabled State */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Disabled State</h2>
                <div className="max-w-md">
                    <Upload
                        label="Disabled Upload"
                        description="This upload is disabled"
                        disabled={true}
                    >
                        <UploadIcon size={32} color="#6366f1" />
                    </Upload>
                </div>
            </div>
        </div>
    )
}

export default UploadDemo

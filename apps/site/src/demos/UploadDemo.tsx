import { useState } from 'react'
import {
    Upload,
    UploadState,
} from '../../../../packages/blend/lib/components/Upload'
import type { UploadFormValue } from '../../../../packages/blend/lib/components/Upload/types'
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

                    <div className="min-h-50 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
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
                            progressSpeed={playgroundProgressSpeed}
                        >
                            {playgroundCustomSlot
                                ? renderCustomSlot()
                                : undefined}
                        </Upload>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        The progress speed controls how fast the progress
                        animation completes (in milliseconds). This is useful
                        for matching the visual feedback to your backend
                        processing time.
                    </p>
                </div>
            </div>

            {/* Real-World API Upload Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Real-World API Upload Demo
                </h2>
                <p className="text-gray-600">
                    This demo shows how to upload files to a real API endpoint.
                    File objects contain the actual file content and can be
                    uploaded using FormData.
                </p>
                <ApiUploadExample />
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

            {/* Form Integration Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Form Integration</h2>
                <p className="text-gray-600">
                    Examples showing how Upload component integrates with forms,
                    capturing all file metadata (files, filenames, filemimes).
                </p>

                {/* State Management Example */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        State Management & Error Handling
                    </h3>
                    <p className="text-sm text-gray-600">
                        This example demonstrates:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>
                                onDropRejected callback is always called for
                                rejected files
                            </li>
                            <li>
                                Failed files can be removed using the cross icon
                            </li>
                            <li>
                                onChange clears value when all files are
                                rejected (single file mode)
                            </li>
                            <li>
                                onStateChange provides state information for
                                external submit button control
                            </li>
                        </ul>
                    </p>
                    <StateManagementExample />
                </div>

                {/* Single File Form Integration */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Single File Upload with Form Integration
                    </h3>
                    <p className="text-sm text-gray-600">
                        For single file uploads, the form value is:
                        <code className="block mt-2 p-2 bg-gray-100 rounded text-xs">
                            {`File | null`}
                        </code>
                        Extract metadata:{' '}
                        <code className="text-xs">file?.name</code>,{' '}
                        <code className="text-xs">file?.type</code>
                    </p>
                    <SingleFileFormExample />
                </div>

                {/* Multiple Files Form Integration */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Multiple Files Upload with Form Integration
                    </h3>
                    <p className="text-sm text-gray-600">
                        For multiple file uploads, the form value is:
                        <code className="block mt-2 p-2 bg-gray-100 rounded text-xs">
                            {`File[]`}
                        </code>
                        Extract metadata:{' '}
                        <code className="text-xs">
                            files.map(f =&gt; f.name)
                        </code>
                        ,{' '}
                        <code className="text-xs">
                            files.map(f =&gt; f.type)
                        </code>
                    </p>
                    <MultipleFilesFormExample />
                </div>
            </div>
        </div>
    )
}

// Single File Form Integration Example
const SingleFileFormExample = () => {
    const [file, setFile] = useState<File | null>(null)

    const handleChange = (value: UploadFormValue) => {
        const fileValue = Array.isArray(value) ? value[0] || null : value
        setFile(fileValue)
        console.log('Single File Form Value:', fileValue)
    }

    // Extract metadata from File object
    const filename = file?.name || null
    const filemime = file?.type || null

    return (
        <div className="space-y-4">
            <div className="max-w-md">
                <Upload
                    label="Upload Single File"
                    description="PDF files only, max 5MB"
                    accept={['.pdf']}
                    maxSize={5 * 1024 * 1024}
                    value={file}
                    onChange={handleChange}
                >
                    <FileText size={32} color="#6366f1" />
                </Upload>
            </div>

            {/* Form State Display */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Form State:</h4>
                <pre className="text-xs overflow-auto">
                    {JSON.stringify(
                        {
                            file: file
                                ? {
                                      name: file.name,
                                      size: file.size,
                                      type: file.type,
                                  }
                                : null,
                            filename,
                            filemime,
                        },
                        null,
                        2
                    )}
                </pre>
            </div>
        </div>
    )
}

// Multiple Files Form Integration Example
const MultipleFilesFormExample = () => {
    const [files, setFiles] = useState<File[]>([])

    const handleChange = (value: UploadFormValue) => {
        const filesValue = Array.isArray(value) ? value : value ? [value] : []
        setFiles(filesValue)
        console.log('Multiple Files Form Value:', filesValue)
    }

    // Extract metadata from File objects
    const filenames = files.map((f) => f.name)
    const filemimes = files.map((f) => f.type)

    return (
        <div className="space-y-4">
            <div className="max-w-md">
                <Upload
                    label="Upload Multiple Files"
                    description="Upload up to 5 files"
                    multiple={true}
                    maxFiles={5}
                    value={files}
                    onChange={handleChange}
                >
                    <UploadIcon size={32} color="#6366f1" />
                </Upload>
            </div>

            {/* Form State Display */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Form State:</h4>
                <div className="space-y-2">
                    <div>
                        <strong>Files Count:</strong> {files.length}
                    </div>
                    <div>
                        <strong>Filenames:</strong>{' '}
                        {filenames.length > 0 ? filenames.join(', ') : 'None'}
                    </div>
                    <div>
                        <strong>File MIME Types:</strong>{' '}
                        {filemimes.length > 0 ? filemimes.join(', ') : 'None'}
                    </div>
                </div>
                <pre className="text-xs overflow-auto mt-4">
                    {JSON.stringify(
                        {
                            files: files.map((f) => ({
                                name: f.name,
                                size: f.size,
                                type: f.type,
                            })),
                            filenames,
                            filemimes,
                        },
                        null,
                        2
                    )}
                </pre>
            </div>
        </div>
    )
}

// Real-World API Upload Example
const ApiUploadExample = () => {
    const [files, setFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [uploadResults, setUploadResults] = useState<
        Array<{
            file: File
            success: boolean
            response?: any
            error?: string
        }>
    >([])

    const handleChange = (value: UploadFormValue) => {
        const filesValue = Array.isArray(value) ? value : value ? [value] : []
        setFiles(filesValue)
        setUploadResults([]) // Clear previous results when new files are selected
    }

    // Helper function to get file extension
    const getFileExtension = (filename: string): string => {
        return filename.split('.').pop() || ''
    }

    // Upload file to API
    const uploadFileToApi = async (file: File): Promise<any> => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(
            'https://api.escuelajs.co/api/v1/files/upload',
            {
                method: 'POST',
                body: formData,
            }
        )

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`)
        }

        return response.json()
    }

    // Handle upload button click
    const handleUpload = async () => {
        if (files.length === 0) return

        setUploading(true)
        setUploadResults([])

        const results = await Promise.allSettled(
            files.map(async (file) => {
                try {
                    const response = await uploadFileToApi(file)
                    return {
                        file,
                        success: true,
                        response,
                    }
                } catch (error) {
                    return {
                        file,
                        success: false,
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Unknown error',
                    }
                }
            })
        )

        const uploadResults = results.map((result) => {
            if (result.status === 'fulfilled') {
                return result.value
            } else {
                return {
                    file: files[results.indexOf(result)],
                    success: false,
                    error: result.reason?.message || 'Upload failed',
                }
            }
        })

        setUploadResults(uploadResults)
        setUploading(false)
    }

    // File details for display
    const fileDetails = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        extension: getFileExtension(file.name),
        file: file, // The actual File object containing the content
    }))

    return (
        <div className="space-y-6">
            <div className="max-w-2xl">
                <Upload
                    label="Select Files to Upload"
                    description="Select files and click Upload to send them to the API"
                    multiple={true}
                    maxFiles={5}
                    value={files}
                    onChange={handleChange}
                    accept={['*']}
                >
                    <UploadIcon size={32} color="#6366f1" />
                </Upload>
            </div>

            {/* File Details Display */}
            {files.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                            Selected Files ({files.length})
                        </h3>
                        <button
                            onClick={handleUpload}
                            disabled={uploading || files.length === 0}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {uploading ? 'Uploading...' : 'Upload to API'}
                        </button>
                    </div>

                    <div className="space-y-3">
                        {fileDetails.map((fileDetail, index) => {
                            const uploadResult = uploadResults[index]
                            return (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg ${
                                        uploadResult?.success
                                            ? 'border-green-500 bg-green-50'
                                            : uploadResult?.success === false
                                              ? 'border-red-500 bg-red-50'
                                              : 'border-gray-200 bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="font-semibold text-sm mb-2">
                                                {fileDetail.name}
                                            </div>
                                            <div className="text-xs space-y-1 text-gray-600">
                                                <div>
                                                    <strong>Size:</strong>{' '}
                                                    {(
                                                        fileDetail.size / 1024
                                                    ).toFixed(2)}{' '}
                                                    KB
                                                </div>
                                                <div>
                                                    <strong>Type:</strong>{' '}
                                                    {fileDetail.type ||
                                                        'Unknown'}
                                                </div>
                                                <div>
                                                    <strong>Extension:</strong>{' '}
                                                    {fileDetail.extension}
                                                </div>
                                                <div className="mt-2 text-xs text-gray-500">
                                                    <strong>
                                                        File Object:
                                                    </strong>{' '}
                                                    {fileDetail.file instanceof
                                                    File
                                                        ? '✓ Available (contains file content)'
                                                        : '✗ Not available'}
                                                </div>
                                            </div>
                                        </div>
                                        {uploadResult && (
                                            <div className="ml-4">
                                                {uploadResult.success ? (
                                                    <CheckCircle
                                                        size={20}
                                                        color="#10b981"
                                                    />
                                                ) : (
                                                    <AlertCircle
                                                        size={20}
                                                        color="#ef4444"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {uploadResult && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            {uploadResult.success ? (
                                                <div className="text-xs">
                                                    <div className="text-green-700 font-semibold mb-1">
                                                        ✓ Upload Successful
                                                    </div>
                                                    <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
                                                        {JSON.stringify(
                                                            uploadResult.response,
                                                            null,
                                                            2
                                                        )}
                                                    </pre>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-red-700">
                                                    <div className="font-semibold mb-1">
                                                        ✗ Upload Failed
                                                    </div>
                                                    <div>
                                                        {uploadResult.error}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* JSON Output Example */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm">
                            File Details JSON (as you would use in your app):
                        </h4>
                        <pre className="text-xs overflow-auto max-h-64 bg-white p-3 rounded border">
                            {JSON.stringify(
                                fileDetails.map((fd) => ({
                                    name: fd.name,
                                    size: fd.size,
                                    type: fd.type,
                                    extension: fd.extension,
                                    file:
                                        fd.file instanceof File ? 'File' : null,
                                })),
                                null,
                                2
                            )}
                        </pre>
                        <p className="text-xs text-gray-600 mt-2">
                            Note: The File object contains the actual file
                            content and can be uploaded using FormData. In
                            production, you would use the File object directly
                            for API uploads.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

// State Management Example
const StateManagementExample = () => {
    const [file, setFile] = useState<File | null>(null)
    const [rejectedFiles, setRejectedFiles] = useState<
        Array<{ file: File; errors: Array<{ code: string; message: string }> }>
    >([])
    const [uploadState, setUploadState] = useState<{
        state: string
        hasError: boolean
        hasSuccess: boolean
        hasUploading: boolean
        errorFiles: any[]
        successfulFiles: any[]
    } | null>(null)
    const [logs, setLogs] = useState<string[]>([])

    const addLog = (message: string) => {
        setLogs((prev) => [
            ...prev,
            `${new Date().toLocaleTimeString()}: ${message}`,
        ])
    }

    const handleChange = (value: UploadFormValue) => {
        const fileValue = Array.isArray(value) ? value[0] || null : value
        setFile(fileValue)
        addLog(
            `onChange called: ${fileValue ? fileValue.name : 'null (cleared)'}`
        )
    }

    const handleDropRejected = (
        rejections: Array<{
            file: File
            errors: Array<{ code: string; message: string }>
        }>
    ) => {
        setRejectedFiles(rejections)
        addLog(
            `onDropRejected called with ${rejections.length} rejected file(s): ${rejections.map((r) => r.file.name).join(', ')}`
        )
        rejections.forEach((rejection) => {
            rejection.errors.forEach((error) => {
                addLog(`  - ${rejection.file.name}: ${error.message}`)
            })
        })
    }

    const handleStateChange = (stateInfo: {
        state: string
        hasError: boolean
        hasSuccess: boolean
        hasUploading: boolean
        errorFiles: any[]
        successfulFiles: any[]
    }) => {
        setUploadState(stateInfo)
        addLog(
            `onStateChange: state=${stateInfo.state}, hasError=${stateInfo.hasError}, hasSuccess=${stateInfo.hasSuccess}`
        )
    }

    const handleSubmit = () => {
        if (uploadState?.hasError) {
            alert('Cannot submit: Upload has errors')
        } else if (uploadState?.hasSuccess && file) {
            alert(`Submitting file: ${file.name}`)
        } else {
            alert('No file to submit')
        }
    }

    return (
        <div className="space-y-4">
            <div className="max-w-md">
                <Upload
                    label="Test State Management"
                    description="Try uploading valid and invalid files"
                    accept={['.pdf', '.txt']}
                    maxSize={5 * 1024 * 1024}
                    value={file}
                    onChange={handleChange}
                    onDropRejected={handleDropRejected}
                    onStateChange={handleStateChange}
                >
                    <FileText size={32} color="#6366f1" />
                </Upload>
            </div>

            {/* State Display */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Current State:</h4>
                {uploadState ? (
                    <div className="text-xs space-y-1">
                        <div>
                            <strong>State:</strong> {uploadState.state}
                        </div>
                        <div>
                            <strong>Has Error:</strong>{' '}
                            {uploadState.hasError ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <strong>Has Success:</strong>{' '}
                            {uploadState.hasSuccess ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <strong>Error Files:</strong>{' '}
                            {uploadState.errorFiles.length}
                        </div>
                        <div>
                            <strong>Successful Files:</strong>{' '}
                            {uploadState.successfulFiles.length}
                        </div>
                    </div>
                ) : (
                    <div className="text-xs text-gray-500">No state yet</div>
                )}
            </div>

            {/* Submit Button (controlled by state) */}
            <div>
                <button
                    onClick={handleSubmit}
                    disabled={
                        !uploadState?.hasSuccess ||
                        uploadState?.hasError ||
                        !file
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {uploadState?.hasError
                        ? 'Cannot Submit (Has Errors)'
                        : uploadState?.hasSuccess && file
                          ? `Submit: ${file.name}`
                          : 'No File to Submit'}
                </button>
            </div>

            {/* Rejected Files Display */}
            {rejectedFiles.length > 0 && (
                <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-red-800">
                        Rejected Files ({rejectedFiles.length}):
                    </h4>
                    <div className="text-xs space-y-1">
                        {rejectedFiles.map((rejection, idx) => (
                            <div key={idx} className="text-red-700">
                                <strong>{rejection.file.name}:</strong>{' '}
                                {rejection.errors
                                    .map((e) => e.message)
                                    .join(', ')}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Event Logs */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm">Event Logs:</h4>
                    <button
                        onClick={() => setLogs([])}
                        className="text-xs text-blue-600 hover:text-blue-800"
                    >
                        Clear Logs
                    </button>
                </div>
                <div className="text-xs space-y-1 max-h-48 overflow-y-auto font-mono bg-white p-2 rounded">
                    {logs.length > 0 ? (
                        logs.map((log, idx) => (
                            <div key={idx} className="text-gray-700">
                                {log}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">No events yet</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UploadDemo

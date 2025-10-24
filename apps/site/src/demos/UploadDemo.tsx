import { useState } from 'react'
import {
    Upload,
    UploadState,
    FileRejection,
    UploadFile,
    UploadedFileWithStatus,
} from '../../../../packages/blend/lib/components/Upload'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import {
    Upload as UploadIcon,
    Image,
    FileText,
    CheckCircle,
    AlertCircle,
} from 'lucide-react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const UploadDemo = () => {
    // Playground state
    const [playgroundMultiple, setPlaygroundMultiple] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundCustomSlot, setPlaygroundCustomSlot] = useState(false)

    // Upload state demo
    const [componentState, setComponentState] = useState<UploadState>(
        UploadState.IDLE
    )
    const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<
        UploadedFileWithStatus[]
    >([])
    const [failedFiles, setFailedFiles] = useState<UploadedFileWithStatus[]>([])

    // Multiple file demo state
    const [multipleUploadState, setMultipleUploadState] = useState<UploadState>(
        UploadState.IDLE
    )
    const [multipleUploadingFiles, setMultipleUploadingFiles] = useState<
        UploadFile[]
    >([])
    const [multipleUploadedFiles, setMultipleUploadedFiles] = useState<
        UploadedFileWithStatus[]
    >([])
    const [multipleFailedFiles, setMultipleFailedFiles] = useState<
        UploadedFileWithStatus[]
    >([])

    const generateFileId = () => Math.random().toString(36).substr(2, 9)

    const handleFilesAccepted = (files: File[]) => {
        // Simulate upload for first file
        const file = files[0]
        if (file) {
            const uploadFile: UploadFile = {
                id: generateFileId(),
                file,
                progress: 0,
                status: UploadState.UPLOADING,
            }

            setUploadingFiles([uploadFile])
            setComponentState(UploadState.UPLOADING)

            const interval = setInterval(() => {
                setUploadingFiles((prev) =>
                    prev.map((f) => {
                        if (f.id === uploadFile.id) {
                            const newProgress = f.progress + Math.random() * 15
                            if (newProgress >= 100) {
                                clearInterval(interval)
                                setTimeout(() => {
                                    setUploadingFiles([])
                                    setUploadedFiles([
                                        {
                                            id: uploadFile.id,
                                            file,
                                            status: 'success',
                                        },
                                    ])
                                    setComponentState(UploadState.SUCCESS)
                                    addSnackbar({
                                        header: 'Upload Complete!',
                                        description: `${file.name} has been uploaded successfully.`,
                                    })
                                }, 500)
                                return {
                                    ...f,
                                    progress: 100,
                                    status: UploadState.SUCCESS,
                                }
                            }
                            return { ...f, progress: newProgress }
                        }
                        return f
                    })
                )
            }, 200)
        }

        addSnackbar({
            header: 'Files Selected',
            description: `Selected ${files.length} file(s): ${files.map((f) => f.name).join(', ')}`,
        })
    }

    const handleMultipleFilesAccepted = (files: File[]) => {
        setMultipleUploadState(UploadState.UPLOADING)

        const uploadingFiles = files.map((file) => ({
            id: generateFileId(),
            file,
            progress: 0,
            status: UploadState.UPLOADING,
        }))

        setMultipleUploadingFiles(uploadingFiles)

        // Simulate different outcomes for different files
        uploadingFiles.forEach((uploadFile, index) => {
            const interval = setInterval(() => {
                setMultipleUploadingFiles((prev) =>
                    prev.map((f) => {
                        if (f.id === uploadFile.id) {
                            const newProgress = f.progress + Math.random() * 20
                            if (newProgress >= 100) {
                                clearInterval(interval)

                                // Simulate some failures (every 3rd file fails)
                                const isError = index % 3 === 2

                                setTimeout(() => {
                                    setMultipleUploadingFiles((prev) =>
                                        prev.filter(
                                            (f) => f.id !== uploadFile.id
                                        )
                                    )

                                    if (isError) {
                                        setMultipleFailedFiles((prev) => [
                                            ...prev,
                                            {
                                                id: uploadFile.id,
                                                file: uploadFile.file,
                                                status: 'error',
                                                error: 'File type not supported',
                                            },
                                        ])
                                    } else {
                                        setMultipleUploadedFiles((prev) => [
                                            ...prev,
                                            {
                                                id: uploadFile.id,
                                                file: uploadFile.file,
                                                status: 'success',
                                            },
                                        ])
                                    }

                                    // Check if all files are processed
                                    const allProcessed = uploadingFiles.every(
                                        (_, i) => i <= index
                                    )
                                    if (allProcessed) {
                                        const hasErrors = uploadingFiles.some(
                                            (_, i) => i % 3 === 2
                                        )
                                        setMultipleUploadState(
                                            hasErrors
                                                ? UploadState.ERROR
                                                : UploadState.SUCCESS
                                        )
                                    }
                                }, 500)

                                return {
                                    ...f,
                                    progress: 100,
                                    status: isError
                                        ? UploadState.ERROR
                                        : UploadState.SUCCESS,
                                }
                            }
                            return { ...f, progress: newProgress }
                        }
                        return f
                    })
                )
            }, 300)
        })
    }

    const handleFilesRejected = (rejections: FileRejection[]) => {
        rejections.forEach((rejection) => {
            addSnackbar({
                header: 'File Rejected',
                description: `${rejection.file.name}: ${rejection.errors[0]?.message}`,
            })
        })
    }

    const handleDrop = (
        acceptedFiles: File[],
        rejectedFiles: FileRejection[]
    ) => {
        if (acceptedFiles.length > 0) {
            handleFilesAccepted(acceptedFiles)
        }
        if (rejectedFiles.length > 0) {
            handleFilesRejected(rejectedFiles)
        }
    }

    const handleMultipleDrop = (
        acceptedFiles: File[],
        rejectedFiles: FileRejection[]
    ) => {
        if (acceptedFiles.length > 0) {
            handleMultipleFilesAccepted(acceptedFiles)
        }
        if (rejectedFiles.length > 0) {
            handleFilesRejected(rejectedFiles)
        }
    }

    const handleFileRemove = (fileId: string) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
        setFailedFiles((prev) => prev.filter((f) => f.id !== fileId))
        setMultipleUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
        setMultipleFailedFiles((prev) => prev.filter((f) => f.id !== fileId))
    }

    const handleReplaceFile = () => {
        setComponentState(UploadState.IDLE)
        setUploadedFiles([])
        setFailedFiles([])
    }

    const renderCustomSlot = () => <UploadIcon size={32} color="#6366f1" />

    return (
        <div className="p-8 space-y-12">
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
                    </div>

                    <div className="min-h-[200px] rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
                        <Upload
                            label="Upload Files"
                            subLabel="Max 10MB"
                            multiple={playgroundMultiple}
                            disabled={playgroundDisabled}
                            required={playgroundRequired}
                            description=".csv only | Max size 8 MB"
                            accept={['.csv']}
                            maxSize={8 * 1024 * 1024} // 8MB
                            state={componentState}
                            uploadingFiles={uploadingFiles}
                            uploadedFiles={uploadedFiles}
                            failedFiles={failedFiles}
                            onDrop={handleDrop}
                            onFileRemove={handleFileRemove}
                            onReplaceFile={handleReplaceFile}
                            style={{ width: '480px' }}
                        >
                            {playgroundCustomSlot
                                ? renderCustomSlot()
                                : undefined}
                        </Upload>
                    </div>

                    {/* Reset Upload State Button */}
                    {(componentState !== UploadState.IDLE ||
                        uploadingFiles.length > 0 ||
                        uploadedFiles.length > 0) && (
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    setComponentState(UploadState.IDLE)
                                    setUploadingFiles([])
                                    setUploadedFiles([])
                                    setFailedFiles([])
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Reset Upload State
                            </button>
                        </div>
                    )}
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
                            description="Images only"
                            accept={['image/*']}
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
                            description="PDF files only"
                            accept={['application/pdf']}
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
                        This demo shows multiple file upload with success and
                        error states:
                    </p>

                    <div className="max-w-md">
                        <Upload
                            label="Multiple File Upload"
                            subLabel="Required"
                            required={true}
                            multiple={true}
                            description="Any file type | Max 5 files"
                            maxFiles={5}
                            state={multipleUploadState}
                            uploadingFiles={multipleUploadingFiles}
                            uploadedFiles={multipleUploadedFiles}
                            failedFiles={multipleFailedFiles}
                            onDrop={handleMultipleDrop}
                            onFileRemove={handleFileRemove}
                            style={{ width: '480px' }}
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>

                    {/* Reset button */}
                    <button
                        onClick={() => {
                            setMultipleUploadState(UploadState.IDLE)
                            setMultipleUploadingFiles([])
                            setMultipleUploadedFiles([])
                            setMultipleFailedFiles([])
                        }}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Any File</h3>
                        <Upload
                            label="Any File Upload"
                            description="Any file type allowed"
                            onDropAccepted={(files) =>
                                addSnackbar({
                                    header: 'Files Selected',
                                    description: `${files.length} file(s) selected`,
                                })
                            }
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Images Only</h3>
                        <Upload
                            label="Image Upload"
                            description="Images only"
                            accept={['image/*']}
                            onDropAccepted={(files) =>
                                addSnackbar({
                                    header: 'Images Selected',
                                    description: `${files.length} image(s) selected`,
                                })
                            }
                            onDropRejected={(rejections) =>
                                addSnackbar({
                                    header: 'Invalid File',
                                    description:
                                        rejections[0]?.errors[0]?.message ||
                                        'Invalid file type',
                                })
                            }
                        >
                            <Image size={32} color="#10b981" />
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">PDFs Only</h3>
                        <Upload
                            label="PDF Upload"
                            description="PDFs only"
                            accept={['application/pdf']}
                            onDropAccepted={(files) =>
                                addSnackbar({
                                    header: 'PDFs Selected',
                                    description: `${files.length} PDF(s) selected`,
                                })
                            }
                            onDropRejected={(rejections) =>
                                addSnackbar({
                                    header: 'Invalid File',
                                    description:
                                        rejections[0]?.errors[0]?.message ||
                                        'Only PDF files allowed',
                                })
                            }
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
                        onDropAccepted={() =>
                            addSnackbar({
                                header: 'Should not trigger',
                                description: 'This should not happen',
                            })
                        }
                    >
                        <UploadIcon size={32} color="#6366f1" />
                    </Upload>
                </div>
            </div>
        </div>
    )
}

export default UploadDemo

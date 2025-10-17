import { useState } from 'react'
import {
    Upload,
    UploadSize,
    UploadState,
    FileRejection,
    UploadFile,
} from '../../../../packages/blend/lib/components/Upload'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { Upload as UploadIcon, Image, FileText } from 'lucide-react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const UploadDemo = () => {
    // Playground state
    const [playgroundSize, setPlaygroundSize] = useState<UploadSize>(
        UploadSize.MEDIUM
    )
    const [playgroundMultiple, setPlaygroundMultiple] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundCustomSlot, setPlaygroundCustomSlot] = useState(false)

    // Selected files for display
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])

    // Upload state demo
    const [componentState, setComponentState] = useState<UploadState>(
        UploadState.IDLE
    )
    const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

    // Options for selects
    const sizeOptions = [
        { value: UploadSize.SMALL, label: 'Small' },
        { value: UploadSize.MEDIUM, label: 'Medium' },
        { value: UploadSize.LARGE, label: 'Large' },
    ]

    const handleFilesAccepted = (files: File[]) => {
        setSelectedFiles((prev) => [...prev, ...files])

        // Simulate upload for first file
        const file = files[0]
        if (file) {
            const uploadFile: UploadFile = {
                id: Math.random().toString(36).substr(2, 9),
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
                                    setUploadedFiles([file])
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

    const renderCustomSlot = () => <UploadIcon size={32} color="#6366f1" />

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as UploadSize)
                            }
                            placeholder="Select size"
                        />
                    </div>

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
                            label="Custom Slot"
                            checked={playgroundCustomSlot}
                            onChange={() =>
                                setPlaygroundCustomSlot(!playgroundCustomSlot)
                            }
                        />
                    </div>

                    <div className="min-h-[200px] rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
                        <Upload
                            size={playgroundSize}
                            multiple={playgroundMultiple}
                            disabled={playgroundDisabled}
                            description=".csv only | Max size 8 MB"
                            accept={['.csv']}
                            maxSize={8 * 1024 * 1024} // 8MB
                            state={componentState}
                            uploadingFiles={uploadingFiles}
                            uploadedFiles={uploadedFiles}
                            onDrop={handleDrop}
                            onDropAccepted={handleFilesAccepted}
                            onDropRejected={handleFilesRejected}
                        >
                            {playgroundCustomSlot
                                ? renderCustomSlot()
                                : undefined}
                        </Upload>
                    </div>

                    {/* Selected Files Display */}
                    {selectedFiles.length > 0 && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium mb-2">
                                Selected Files:
                            </h3>
                            <ul className="space-y-1">
                                {selectedFiles.map((file, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600"
                                    >
                                        {file.name} (
                                        {Math.round(file.size / 1024)} KB)
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setSelectedFiles([])}
                                className="mt-2 text-sm text-red-600 hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}

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
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Reset Upload State
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.values(UploadSize).map((size) => (
                        <div key={size} className="space-y-3">
                            <h3 className="text-sm font-medium uppercase">
                                {size}
                            </h3>
                            <Upload
                                size={size}
                                description=".csv only | Max size 8 MB"
                                accept={['.csv']}
                                maxSize={8 * 1024 * 1024}
                                onDropAccepted={(files) =>
                                    addSnackbar({
                                        header: `${size} Upload`,
                                        description: `Selected ${files.length} file(s)`,
                                    })
                                }
                            >
                                <UploadIcon size={32} color="#6366f1" />
                            </Upload>
                        </div>
                    ))}
                </div>
            </div>

            {/* Different File Types */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">File Type Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Any File</h3>
                        <Upload
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

            {/* Multiple Files */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Multiple Files</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Single File</h3>
                        <Upload
                            description="Single file only"
                            multiple={false}
                            onDropAccepted={(files) =>
                                addSnackbar({
                                    header: 'File Selected',
                                    description: `Selected: ${files[0]?.name}`,
                                })
                            }
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Multiple Files</h3>
                        <Upload
                            description="Multiple files allowed"
                            multiple={true}
                            onDropAccepted={(files) =>
                                addSnackbar({
                                    header: 'Files Selected',
                                    description: `Selected ${files.length} file(s)`,
                                })
                            }
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>
                </div>
            </div>

            {/* Upload States Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Upload States with Progress
                </h2>
                <div className="space-y-4">
                    <p className="text-gray-600">
                        This demo shows the upload component with simulated
                        upload progress:
                    </p>

                    <div className="max-w-md">
                        <Upload
                            description=".csv only | Max size 8 MB"
                            accept={['.csv']}
                            maxSize={8 * 1024 * 1024}
                            state={componentState}
                            uploadingFiles={uploadingFiles}
                            uploadedFiles={uploadedFiles}
                            onDropAccepted={(files) => {
                                // Simulate upload for first file
                                const file = files[0]
                                if (file) {
                                    const uploadFile: UploadFile = {
                                        id: Math.random()
                                            .toString(36)
                                            .substr(2, 9),
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
                                                    const newProgress =
                                                        f.progress +
                                                        Math.random() * 15
                                                    if (newProgress >= 100) {
                                                        clearInterval(interval)
                                                        setTimeout(() => {
                                                            setUploadingFiles(
                                                                []
                                                            )
                                                            setUploadedFiles([
                                                                file,
                                                            ])
                                                            setComponentState(
                                                                UploadState.SUCCESS
                                                            )
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
                                                    return {
                                                        ...f,
                                                        progress: newProgress,
                                                    }
                                                }
                                                return f
                                            })
                                        )
                                    }, 200)
                                }
                            }}
                        >
                            <UploadIcon size={32} color="#6366f1" />
                        </Upload>
                    </div>

                    {/* Reset button */}
                    <button
                        onClick={() => {
                            setComponentState(UploadState.IDLE)
                            setUploadingFiles([])
                            setUploadedFiles([])
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Reset Demo
                    </button>
                </div>
            </div>

            {/* Disabled State */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Disabled State</h2>
                <div className="max-w-md">
                    <Upload
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

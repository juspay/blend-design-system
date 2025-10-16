import { useState } from 'react'
import {
    Upload,
    UploadSize,
    UploadState,
    UploadFile,
} from '../../../../packages/blend/lib/components/Upload'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import { Upload as UploadIcon, File, Image, FileText, X } from 'lucide-react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'

const UploadDemo = () => {
    // Playground state
    const [playgroundSize, setPlaygroundSize] = useState<UploadSize>(
        UploadSize.MEDIUM
    )
    const [playgroundState, setPlaygroundState] = useState<UploadState>(
        UploadState.IDLE
    )
    const [playgroundMultiple, setPlaygroundMultiple] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundCustomSlot, setPlaygroundCustomSlot] = useState(false)
    const [playgroundMaxFileSize, setPlaygroundMaxFileSize] =
        useState('5000000')
    const [playgroundAcceptedTypes, setPlaygroundAcceptedTypes] = useState(
        'image/*,application/pdf'
    )

    // Upload files state for demo
    const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

    // Options for selects
    const sizeOptions = [
        { value: UploadSize.SMALL, label: 'Small' },
        { value: UploadSize.MEDIUM, label: 'Medium' },
        { value: UploadSize.LARGE, label: 'Large' },
    ]

    const stateOptions = [
        { value: UploadState.IDLE, label: 'Idle' },
        { value: UploadState.UPLOADING, label: 'Uploading' },
        { value: UploadState.SUCCESS, label: 'Success' },
        { value: UploadState.ERROR, label: 'Error' },
    ]

    // Simulate file upload progress
    const simulateUpload = (file: File) => {
        const uploadFile: UploadFile = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            progress: 0,
            status: UploadState.UPLOADING,
        }

        setUploadingFiles((prev) => [...prev, uploadFile])

        const interval = setInterval(() => {
            setUploadingFiles((prev) =>
                prev.map((f) => {
                    if (f.id === uploadFile.id) {
                        const newProgress = f.progress + Math.random() * 30
                        if (newProgress >= 100) {
                            clearInterval(interval)
                            setTimeout(() => {
                                setUploadingFiles((prev) =>
                                    prev.filter(
                                        (uploadingFile) =>
                                            uploadingFile.id !== uploadFile.id
                                    )
                                )
                                setUploadedFiles((prev) => [...prev, file])
                                addSnackbar({
                                    header: 'Upload Complete!',
                                    description: `${file.name} has been uploaded successfully.`,
                                })
                            }, 1000)
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
        }, 500)
    }

    const handleFileSelect = (files: File[]) => {
        addSnackbar({
            header: 'Files Selected',
            description: `Selected ${files.length} file(s): ${files.map((f) => f.name).join(', ')}`,
        })

        // Simulate upload for demo
        files.forEach(simulateUpload)
    }

    const removeUploadingFile = (id: string) => {
        setUploadingFiles((prev) => prev.filter((file) => file.id !== id))
        addSnackbar({
            header: 'Upload Cancelled',
            description: 'File upload has been cancelled.',
        })
    }

    const renderCustomSlot = () => (
        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="12px"
        >
            <UploadIcon size={32} color="#6366f1" />
            <Text as="span" fontWeight={600} textAlign="center">
                Drop your files here
            </Text>
            <Text as="span" color="#6b7280" textAlign="center">
                or click to browse from your device
            </Text>
        </Block>
    )

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

                        <SingleSelect
                            label="State"
                            items={[{ items: stateOptions }]}
                            selected={playgroundState}
                            onSelect={(value) =>
                                setPlaygroundState(value as UploadState)
                            }
                            placeholder="Select state"
                        />

                        <TextInput
                            label="Max File Size (bytes)"
                            value={playgroundMaxFileSize}
                            onChange={(e) =>
                                setPlaygroundMaxFileSize(e.target.value)
                            }
                            placeholder="5000000"
                        />

                        <TextInput
                            label="Accepted File Types"
                            value={playgroundAcceptedTypes}
                            onChange={(e) =>
                                setPlaygroundAcceptedTypes(e.target.value)
                            }
                            placeholder="image/*,application/pdf"
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
                            state={playgroundState}
                            multiple={playgroundMultiple}
                            disabled={playgroundDisabled}
                            acceptedFileTypes={playgroundAcceptedTypes
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean)}
                            maxFileSize={
                                parseInt(playgroundMaxFileSize) || undefined
                            }
                            description=".csv only | Max size 8 MB"
                            onFileSelect={handleFileSelect}
                            uploadingFiles={uploadingFiles}
                            uploadedFiles={uploadedFiles}
                        >
                            {playgroundCustomSlot
                                ? renderCustomSlot()
                                : undefined}
                        </Upload>
                    </div>

                    {uploadingFiles.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-semibold">Active Uploads:</h4>
                            {uploadingFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center gap-3 p-3 border rounded-lg"
                                >
                                    <File size={16} />
                                    <span className="flex-1">
                                        {file.file.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {Math.round(file.progress)}%
                                    </span>
                                    <Button
                                        buttonType={ButtonType.DANGER}
                                        size={ButtonSize.SMALL}
                                        onClick={() =>
                                            removeUploadingFile(file.id)
                                        }
                                        leadingIcon={<X size={12} />}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* States */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.values(UploadState).map((state) => (
                        <div key={state} className="space-y-3">
                            <h3 className="text-sm font-medium uppercase">
                                {state}
                            </h3>
                            <Upload
                                state={state}
                                onFileSelect={(files) =>
                                    addSnackbar({
                                        header: `${state} Upload`,
                                        description: `Selected ${files.length} file(s) in ${state} state`,
                                    })
                                }
                            />
                        </div>
                    ))}
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
                                onFileSelect={(files) =>
                                    addSnackbar({
                                        header: `${size} Upload`,
                                        description: `Selected ${files.length} file(s) with ${size} size`,
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* File Type Restrictions */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">File Type Restrictions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Images Only</h3>
                        <Upload
                            acceptedFileTypes={['image/*']}
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'Images Selected',
                                    description: `Selected ${files.length} image(s)`,
                                })
                            }
                        >
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap="8px"
                            >
                                <Image size={24} color="#10b981" />
                                <Text as="span" textAlign="center">
                                    Drop images here
                                </Text>
                            </Block>
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">PDFs Only</h3>
                        <Upload
                            acceptedFileTypes={['application/pdf']}
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'PDFs Selected',
                                    description: `Selected ${files.length} PDF(s)`,
                                })
                            }
                        >
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap="8px"
                            >
                                <FileText size={24} color="#ef4444" />
                                <Text as="span" textAlign="center">
                                    Drop PDFs here
                                </Text>
                            </Block>
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Any File</h3>
                        <Upload
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'Files Selected',
                                    description: `Selected ${files.length} file(s)`,
                                })
                            }
                        >
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap="8px"
                            >
                                <File size={24} color="#6366f1" />
                                <Text as="span" textAlign="center">
                                    Drop any file here
                                </Text>
                            </Block>
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
                            multiple={false}
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'Single File Selected',
                                    description: `Selected: ${files[0]?.name}`,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Multiple Files</h3>
                        <Upload
                            multiple={true}
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'Multiple Files Selected',
                                    description: `Selected ${files.length} files: ${files.map((f) => f.name).join(', ')}`,
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Custom Slot Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Custom Slot Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Icon with Text</h3>
                        <Upload
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'Files Uploaded',
                                    description: `${files.length} files selected`,
                                })
                            }
                        >
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap="12px"
                            >
                                <UploadIcon size={28} color="#6366f1" />
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    gap="4px"
                                >
                                    <Text as="span" fontWeight={600}>
                                        Upload Files
                                    </Text>
                                    <Text
                                        as="span"
                                        color="#6b7280"
                                        fontSize="14px"
                                    >
                                        Drag & drop or click to select
                                    </Text>
                                </Block>
                            </Block>
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Detailed Instructions
                        </h3>
                        <Upload
                            size={UploadSize.LARGE}
                            acceptedFileTypes={['image/*']}
                            maxFileSize={5000000}
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'Images Uploaded',
                                    description: `${files.length} images selected`,
                                })
                            }
                        >
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap="16px"
                            >
                                <Image size={40} color="#10b981" />
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    gap="8px"
                                >
                                    <Text
                                        as="span"
                                        fontWeight={600}
                                        fontSize="16px"
                                    >
                                        Upload Images
                                    </Text>
                                    <Text
                                        as="span"
                                        color="#6b7280"
                                        textAlign="center"
                                    >
                                        PNG, JPG, GIF up to 5MB
                                    </Text>
                                    <Text
                                        as="span"
                                        color="#9ca3af"
                                        fontSize="12px"
                                        textAlign="center"
                                    >
                                        Drag and drop your files here or click
                                        to browse
                                    </Text>
                                </Block>
                            </Block>
                        </Upload>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Minimal Design</h3>
                        <Upload
                            size={UploadSize.SMALL}
                            onFileSelect={(files) =>
                                addSnackbar({
                                    header: 'Files Selected',
                                    description: `${files.length} files ready`,
                                })
                            }
                        >
                            <Block display="flex" alignItems="center" gap="8px">
                                <File size={16} color="#6b7280" />
                                <Text as="span" color="#6b7280">
                                    Choose file
                                </Text>
                            </Block>
                        </Upload>
                    </div>
                </div>
            </div>

            {/* Disabled State */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Disabled State</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.values(UploadSize).map((size) => (
                        <div key={size} className="space-y-3">
                            <h3 className="text-sm font-medium">
                                Disabled {size}
                            </h3>
                            <Upload
                                size={size}
                                disabled={true}
                                onFileSelect={() =>
                                    addSnackbar({
                                        header: 'Upload Disabled',
                                        description: 'This upload is disabled',
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UploadDemo

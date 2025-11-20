import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { Upload, Button, ButtonType } from '@juspay/blend-design-system'
import {
    UploadState,
    UploadFile,
    UploadedFileWithStatus,
    FileRejection,
} from '@juspay/blend-design-system/components/Upload/types'
import { Upload as UploadIcon, File, Image, FileText } from 'lucide-react'

const meta: Meta<typeof Upload> = {
    title: 'Components/Upload',
    component: Upload,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A comprehensive file upload component with drag-and-drop support, validation, and multiple upload states.

## Features
- Single and multiple file upload
- Drag and drop support
- File type validation
- File size validation
- Custom validation rules
- Upload progress tracking
- Success/Error states
- File removal and replacement
- Token-based styling system
- Full accessibility support

## States
- **IDLE**: Default state, ready for file selection
- **UPLOADING**: Files are being uploaded with progress
- **SUCCESS**: Files uploaded successfully
- **ERROR**: Upload failed with error message
- **MIXED**: Some files succeeded, some failed (multiple uploads)

## Usage

\`\`\`tsx
import { Upload } from '@juspay/blend-design-system';

// Basic upload
<Upload
  label="Upload Files"
  description="Drag and drop files here or click to browse"
  onDrop={(acceptedFiles, rejections) => {
    // Handle file upload
  }}
/>

// Controlled upload with state
<Upload
  label="Upload Images"
  accept={['image/jpeg', 'image/png']}
  maxSize={5 * 1024 * 1024}
  state={uploadState}
  uploadingFiles={uploadingFiles}
  uploadedFiles={uploadedFiles}
  onDrop={handleDrop}
  onFileRemove={handleRemove}
/>
\`\`\`

## Accessibility
- Keyboard accessible file selection
- ARIA labels for screen readers
- Focus management
- Error announcements
- Proper file input labeling
        `,
            },
        },
    },
    argTypes: {
        multiple: {
            control: 'boolean',
            description: 'Allow multiple file uploads',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Configuration',
            },
        },
        accept: {
            control: 'object',
            description:
                'Array of accepted MIME types (e.g., ["image/png", "image/jpeg"])',
            table: {
                type: { summary: 'string[]' },
                defaultValue: { summary: '[]' },
                category: 'Validation',
            },
        },
        maxSize: {
            control: 'number',
            description: 'Maximum file size in bytes',
            table: {
                type: { summary: 'number' },
                category: 'Validation',
            },
        },
        maxFiles: {
            control: 'number',
            description: 'Maximum number of files allowed',
            table: {
                type: { summary: 'number' },
                category: 'Validation',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the upload component',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        required: {
            control: 'boolean',
            description: 'Mark the upload as required',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Configuration',
            },
        },
        label: {
            control: 'text',
            description: 'Label text for the upload field',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        subLabel: {
            control: 'text',
            description: 'Secondary label text shown in parentheses',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        description: {
            control: 'text',
            description: 'Description or instructions for file upload',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        errorText: {
            control: 'text',
            description: 'Error message to display when upload fails',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        helpIconHintText: {
            control: 'text',
            description: 'Tooltip text for help icon',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        state: {
            control: 'select',
            options: ['idle', 'uploading', 'success', 'error'],
            description: 'Current upload state',
            table: {
                type: { summary: 'UploadState' },
                category: 'State',
            },
        },
        onDrop: {
            action: 'dropped',
            description: 'Callback when files are dropped/selected',
            table: {
                type: {
                    summary:
                        '(acceptedFiles: File[], rejections: FileRejection[]) => void',
                },
                category: 'Events',
            },
        },
        onDropAccepted: {
            action: 'accepted',
            description: 'Callback when valid files are selected',
            table: {
                type: { summary: '(files: File[]) => void' },
                category: 'Events',
            },
        },
        onDropRejected: {
            action: 'rejected',
            description: 'Callback when invalid files are rejected',
            table: {
                type: { summary: '(rejections: FileRejection[]) => void' },
                category: 'Events',
            },
        },
        onFileRemove: {
            action: 'removed',
            description: 'Callback when a file is removed',
            table: {
                type: { summary: '(fileId: string) => void' },
                category: 'Events',
            },
        },
        onReplaceFile: {
            action: 'replaced',
            description: 'Callback when file is replaced',
            table: {
                type: { summary: '() => void' },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Upload>

// Default
export const Default: Story = {
    args: {
        label: 'Upload Files',
        description: 'Drag and drop files here or click to browse',
    },
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Single File Upload
export const SingleFileUpload: Story = {
    render: () => {
        const [state, setState] = useState<UploadState>(UploadState.IDLE)
        const [uploadedFiles, setUploadedFiles] = useState<
            UploadedFileWithStatus[]
        >([])

        const handleDrop = (
            acceptedFiles: File[],
            rejections: FileRejection[]
        ) => {
            if (acceptedFiles.length > 0) {
                setState(UploadState.UPLOADING)

                // Simulate upload
                setTimeout(() => {
                    setState(UploadState.SUCCESS)
                    setUploadedFiles([
                        {
                            file: acceptedFiles[0],
                            id: `file-${Date.now()}`,
                            status: 'success',
                        },
                    ])
                }, 1500)
            } else if (rejections.length > 0) {
                setState(UploadState.ERROR)
            }
        }

        const handleReplaceFile = () => {
            setState(UploadState.IDLE)
            setUploadedFiles([])
        }

        return (
            <Upload
                label="Upload Document"
                description="Click to browse or drag and drop a file here"
                state={state}
                uploadedFiles={uploadedFiles}
                onDrop={handleDrop}
                onReplaceFile={handleReplaceFile}
            >
                <div style={{ textAlign: 'center' }}>
                    <UploadIcon
                        size={32}
                        style={{ marginBottom: '8px', opacity: 0.6 }}
                    />
                </div>
            </Upload>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Single file upload with success state and file replacement. Simulates upload with 1.5 second delay.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Multiple File Upload
export const MultipleFileUpload: Story = {
    render: () => {
        const [state, setState] = useState<UploadState>(UploadState.IDLE)
        const [uploadedFiles, setUploadedFiles] = useState<
            UploadedFileWithStatus[]
        >([])

        const handleDrop = (
            acceptedFiles: File[],
            rejections: FileRejection[]
        ) => {
            if (acceptedFiles.length > 0) {
                setState(UploadState.UPLOADING)

                // Simulate upload
                setTimeout(() => {
                    setState(UploadState.SUCCESS)
                    setUploadedFiles(
                        acceptedFiles.map((file, index) => ({
                            file,
                            id: `file-${Date.now()}-${index}`,
                            status: 'success' as const,
                        }))
                    )
                }, 2000)
            }
        }

        const handleFileRemove = (fileId: string) => {
            setUploadedFiles((prev) => {
                const updated = prev.filter((f) => f.id !== fileId)
                if (updated.length === 0) {
                    setState(UploadState.IDLE)
                }
                return updated
            })
        }

        return (
            <Upload
                multiple
                maxFiles={5}
                label="Upload Multiple Files"
                description="Select up to 5 files"
                state={state}
                uploadedFiles={uploadedFiles}
                onDrop={handleDrop}
                onFileRemove={handleFileRemove}
            >
                <div style={{ textAlign: 'center' }}>
                    <File
                        size={32}
                        style={{ marginBottom: '8px', opacity: 0.6 }}
                    />
                </div>
            </Upload>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Multiple file upload with a maximum of 5 files. Shows all uploaded files with individual remove buttons.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// File Type Validation
export const FileTypeValidation: Story = {
    render: () => {
        const [state, setState] = useState<UploadState>(UploadState.IDLE)
        const [uploadedFiles, setUploadedFiles] = useState<
            UploadedFileWithStatus[]
        >([])
        const [failedFiles, setFailedFiles] = useState<
            UploadedFileWithStatus[]
        >([])

        const handleDrop = (
            acceptedFiles: File[],
            rejections: FileRejection[]
        ) => {
            if (acceptedFiles.length > 0) {
                setState(UploadState.UPLOADING)

                setTimeout(() => {
                    setState(UploadState.SUCCESS)
                    setUploadedFiles(
                        acceptedFiles.map((file, index) => ({
                            file,
                            id: `file-${Date.now()}-${index}`,
                            status: 'success' as const,
                        }))
                    )
                }, 1500)
            }

            if (rejections.length > 0) {
                setState(UploadState.ERROR)
                setFailedFiles(
                    rejections.map((rejection, index) => ({
                        file: rejection.file,
                        id: `failed-${Date.now()}-${index}`,
                        status: 'error' as const,
                        error:
                            rejection.errors[0]?.message || 'Invalid file type',
                    }))
                )
            }
        }

        const handleFileRemove = () => {
            setState(UploadState.IDLE)
            setUploadedFiles([])
            setFailedFiles([])
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Upload
                    accept={['image/jpeg', 'image/png', 'image/gif']}
                    label="Upload Images Only"
                    subLabel="JPG, PNG, GIF"
                    description="Only image files (JPG, PNG, GIF) are accepted"
                    state={state}
                    uploadedFiles={uploadedFiles}
                    failedFiles={failedFiles}
                    onDrop={handleDrop}
                    onFileRemove={handleFileRemove}
                    errorText="Invalid file type. Please upload JPG, PNG, or GIF images only."
                >
                    <div style={{ textAlign: 'center' }}>
                        <Image
                            size={32}
                            style={{ marginBottom: '8px', opacity: 0.6 }}
                        />
                    </div>
                </Upload>

                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Try uploading both valid (images) and invalid (PDFs, text
                    files) files to see validation in action.
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Upload with file type validation. Only accepts JPG, PNG, and GIF images. Invalid files trigger error state.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// File Size Validation
export const FileSizeValidation: Story = {
    render: () => {
        const maxSize = 2 * 1024 * 1024 // 2MB
        const [state, setState] = useState<UploadState>(UploadState.IDLE)
        const [uploadedFiles, setUploadedFiles] = useState<
            UploadedFileWithStatus[]
        >([])

        const handleDrop = (
            acceptedFiles: File[],
            rejections: FileRejection[]
        ) => {
            if (acceptedFiles.length > 0) {
                setState(UploadState.UPLOADING)

                setTimeout(() => {
                    setState(UploadState.SUCCESS)
                    setUploadedFiles(
                        acceptedFiles.map((file, index) => ({
                            file,
                            id: `file-${Date.now()}-${index}`,
                            status: 'success' as const,
                        }))
                    )
                }, 1500)
            } else if (rejections.length > 0) {
                setState(UploadState.ERROR)
            }
        }

        const handleFileRemove = () => {
            setState(UploadState.IDLE)
            setUploadedFiles([])
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Upload
                    maxSize={maxSize}
                    label="Upload File"
                    subLabel="Max 2MB"
                    description="File size must be less than 2MB"
                    state={state}
                    uploadedFiles={uploadedFiles}
                    onDrop={handleDrop}
                    onFileRemove={handleFileRemove}
                    errorText="File size exceeds 2MB limit"
                >
                    <div style={{ textAlign: 'center' }}>
                        <FileText
                            size={32}
                            style={{ marginBottom: '8px', opacity: 0.6 }}
                        />
                    </div>
                </Upload>

                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Maximum file size: {(maxSize / (1024 * 1024)).toFixed(2)} MB
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Upload with file size validation. Files larger than 2MB are rejected with error message.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Required Upload
export const RequiredUpload: Story = {
    render: () => (
        <Upload
            required
            label="Upload Required Document"
            subLabel="Mandatory"
            description="This field is required"
            helpIconHintText="Upload a PDF or Word document for verification"
            accept={['application/pdf', 'application/msword']}
        >
            <div style={{ textAlign: 'center' }}>
                <FileText
                    size={32}
                    style={{ marginBottom: '8px', opacity: 0.6 }}
                />
            </div>
        </Upload>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Required upload field with asterisk indicator, sub-label, and help icon tooltip.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Disabled State
export const DisabledState: Story = {
    render: () => (
        <Upload
            disabled
            label="Upload Disabled"
            description="File upload is currently disabled"
        >
            <div style={{ textAlign: 'center' }}>
                <UploadIcon
                    size={32}
                    style={{ marginBottom: '8px', opacity: 0.3 }}
                />
            </div>
        </Upload>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Disabled upload component. Prevents file selection and drag-and-drop.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Uploading State
export const UploadingState: Story = {
    render: () => {
        const [state, setState] = useState<UploadState>(UploadState.IDLE)
        const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([])

        const handleDrop = (acceptedFiles: File[]) => {
            setState(UploadState.UPLOADING)

            const newUploadingFiles: UploadFile[] = acceptedFiles.map(
                (file, index) => ({
                    file,
                    progress: 0,
                    status: UploadState.UPLOADING,
                    id: `file-${Date.now()}-${index}`,
                })
            )

            setUploadingFiles(newUploadingFiles)

            // Simulate progress
            const interval = setInterval(() => {
                setUploadingFiles((prev) => {
                    const updated = prev.map((f) => ({
                        ...f,
                        progress: Math.min(f.progress + 10, 100),
                    }))

                    if (updated[0]?.progress === 100) {
                        clearInterval(interval)
                        setState(UploadState.SUCCESS)
                    }

                    return updated
                })
            }, 300)
        }

        return (
            <Upload
                label="Upload with Progress"
                description="See upload progress in real-time"
                state={state}
                uploadingFiles={uploadingFiles}
                onDropAccepted={handleDrop}
            >
                <div style={{ textAlign: 'center' }}>
                    <UploadIcon
                        size={32}
                        style={{ marginBottom: '8px', opacity: 0.6 }}
                    />
                </div>
            </Upload>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Upload with progress tracking. Shows progress bar during file upload simulation.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Mixed State (Success and Error)
export const MixedState: Story = {
    render: () => {
        const [state, setState] = useState<UploadState>(UploadState.IDLE)
        const [uploadedFiles, setUploadedFiles] = useState<
            UploadedFileWithStatus[]
        >([])
        const [failedFiles, setFailedFiles] = useState<
            UploadedFileWithStatus[]
        >([])

        const simulateMixedUpload = () => {
            setState(UploadState.UPLOADING)

            setTimeout(() => {
                // Simulate some successful and some failed uploads
                setUploadedFiles([
                    {
                        file: new File(['content'], 'document1.pdf', {
                            type: 'application/pdf',
                        }),
                        id: 'success-1',
                        status: 'success',
                    },
                    {
                        file: new File(['content'], 'image1.jpg', {
                            type: 'image/jpeg',
                        }),
                        id: 'success-2',
                        status: 'success',
                    },
                ])

                setFailedFiles([
                    {
                        file: new File(['content'], 'large-file.zip', {
                            type: 'application/zip',
                        }),
                        id: 'error-1',
                        status: 'error',
                        error: 'File size exceeds limit',
                    },
                ])

                setState(UploadState.SUCCESS)
            }, 2000)
        }

        const handleFileRemove = (fileId: string) => {
            setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
            setFailedFiles((prev) => prev.filter((f) => f.id !== fileId))
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Button
                    text="Simulate Mixed Upload"
                    buttonType={ButtonType.PRIMARY}
                    onClick={simulateMixedUpload}
                />

                <Upload
                    multiple
                    label="Upload Files (Mixed Results)"
                    description="Some files may succeed while others fail"
                    state={state}
                    uploadedFiles={uploadedFiles}
                    failedFiles={failedFiles}
                    onFileRemove={handleFileRemove}
                    maxFiles={10}
                >
                    <div style={{ textAlign: 'center' }}>
                        <UploadIcon
                            size={32}
                            style={{ marginBottom: '8px', opacity: 0.6 }}
                        />
                    </div>
                </Upload>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Upload showing mixed results when multiple files are uploaded. Some succeed while others fail.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Custom Validation
export const CustomValidation: Story = {
    render: () => {
        const [state, setState] = useState<UploadState>(UploadState.IDLE)
        const [uploadedFiles, setUploadedFiles] = useState<
            UploadedFileWithStatus[]
        >([])
        const [failedFiles, setFailedFiles] = useState<
            UploadedFileWithStatus[]
        >([])

        const customValidator = (file: File) => {
            // Custom rule: filename cannot contain spaces
            if (file.name.includes(' ')) {
                return {
                    code: 'invalid-filename',
                    message: 'Filename cannot contain spaces',
                }
            }

            // Custom rule: must be at least 1KB
            if (file.size < 1024) {
                return {
                    code: 'file-too-small',
                    message: 'File must be at least 1KB',
                }
            }

            return null
        }

        const handleDrop = (
            acceptedFiles: File[],
            rejections: FileRejection[]
        ) => {
            if (acceptedFiles.length > 0) {
                setState(UploadState.SUCCESS)
                setUploadedFiles(
                    acceptedFiles.map((file, index) => ({
                        file,
                        id: `file-${Date.now()}-${index}`,
                        status: 'success' as const,
                    }))
                )
            }

            if (rejections.length > 0) {
                setState(UploadState.ERROR)
                setFailedFiles(
                    rejections.map((rejection, index) => ({
                        file: rejection.file,
                        id: `failed-${Date.now()}-${index}`,
                        status: 'error' as const,
                        error:
                            rejection.errors[0]?.message || 'Validation failed',
                    }))
                )
            }
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Upload
                    label="Upload with Custom Validation"
                    description="Filename cannot contain spaces and file must be at least 1KB"
                    validator={customValidator}
                    state={state}
                    uploadedFiles={uploadedFiles}
                    failedFiles={failedFiles}
                    onDrop={handleDrop}
                >
                    <div style={{ textAlign: 'center' }}>
                        <FileText
                            size={32}
                            style={{ marginBottom: '8px', opacity: 0.6 }}
                        />
                    </div>
                </Upload>

                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Custom validation rules:
                    <br />• Filename cannot contain spaces
                    <br />• File size must be at least 1KB
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Upload with custom validation function. Demonstrates advanced validation beyond file type and size.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    - <strong>Click or Space/Enter:</strong> Opens file browser
                    <br />- <strong>Tab:</strong> Navigate to/from the upload
                    area
                    <br />- Hidden file input is properly labeled for screen
                    readers
                </p>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Labels
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Upload components include proper labeling, error messaging,
                    and state announcements for screen readers.
                </p>

                <Upload
                    required
                    label="Accessible Upload"
                    subLabel="Required field"
                    description="Upload your document here"
                    helpIconHintText="Accepted formats: PDF, DOC, DOCX"
                    accept={['application/pdf', 'application/msword']}
                >
                    <div style={{ textAlign: 'center' }}>
                        <FileText
                            size={32}
                            style={{ marginBottom: '8px', opacity: 0.6 }}
                        />
                    </div>
                </Upload>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Drag and Drop
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Drag and drop is an enhancement. Keyboard users can still
                    access file selection through the standard file input
                    dialog.
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility features including keyboard navigation, ARIA labels, and screen reader support. Complies with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'label', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                ],
            },
        },
    },
}

// Interactive Playground
export const Interactive: Story = {
    args: {
        label: 'Upload Files',
        description: 'Customize using the controls panel',
        multiple: false,
        disabled: false,
        required: false,
        maxFiles: 5,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with Upload props using the controls panel.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

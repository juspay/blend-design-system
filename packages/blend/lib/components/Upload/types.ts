import React from 'react'

export enum UploadState {
    IDLE = 'idle',
    UPLOADING = 'uploading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type FileRejection = {
    file: File
    errors: Array<{
        code: string
        message: string
    }>
}

export type UploadFile = {
    file: File
    progress: number
    status: UploadState
    id: string
    error?: string
}

export type UploadedFileWithStatus = {
    file: File
    id: string
    status: 'success' | 'error'
    error?: string
}

/**
 * Form value type for Upload component
 * - Single file: File | null
 * - Multiple files: File[]
 * Users can extract filenames and filemimes from File objects:
 * - filenames: files.map(f => f.name)
 * - filemimes: files.map(f => f.type)
 */
export type UploadFormValue = File | File[] | null

export type UploadProps = {
    // Basic configuration
    multiple?: boolean
    accept?: string[]
    maxSize?: number // in bytes
    maxFiles?: number
    disabled?: boolean
    required?: boolean

    // Labels and content
    label?: string
    subLabel?: string
    helpIconHintText?: string
    children?: React.ReactNode
    description?: string
    className?: string
    errorText?: string

    // Upload state management
    state?: UploadState
    uploadingFiles?: UploadFile[]
    uploadedFiles?: UploadedFileWithStatus[]
    failedFiles?: UploadedFileWithStatus[]

    // Upload configuration
    enforceFileTypeConsistency?: boolean // Enforce same file type for multiple uploads
    progressSpeed?: number // Duration in ms for progress animation (default: 200)

    value?: UploadFormValue
    onChange?: (value: UploadFormValue) => void
    onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void
    onDropAccepted?: (files: File[]) => void
    onDropRejected?: (fileRejections: FileRejection[]) => void
    onFileRemove?: (fileId: string) => void
    onReplaceFile?: () => void

    // Visual state - controlled by consumer
    isDragActive?: boolean
    isDragAccept?: boolean
    isDragReject?: boolean

    // Validation
    validator?: (file: File) => FileRejection['errors'][0] | null
    actionSlot?: React.ReactNode
} & Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onDrop' | 'onDragOver' | 'onDragLeave' | 'onChange'
>

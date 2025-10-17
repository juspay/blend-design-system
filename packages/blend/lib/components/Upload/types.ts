import React from 'react'

export enum UploadState {
    IDLE = 'idle',
    UPLOADING = 'uploading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export enum UploadSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
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
}

export type UploadProps = {
    // Basic configuration
    size?: UploadSize
    multiple?: boolean
    accept?: string[]
    maxSize?: number // in bytes
    maxFiles?: number
    disabled?: boolean

    // Content and styling
    children?: React.ReactNode
    description?: string
    className?: string

    // Upload state management
    state?: UploadState
    uploadingFiles?: UploadFile[]
    uploadedFiles?: File[]

    // Callbacks - file selection and upload management
    onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void
    onDropAccepted?: (files: File[]) => void
    onDropRejected?: (fileRejections: FileRejection[]) => void

    // Visual state - controlled by consumer
    isDragActive?: boolean
    isDragAccept?: boolean
    isDragReject?: boolean

    // Validation
    validator?: (file: File) => FileRejection['errors'][0] | null
} & Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onDrop' | 'onDragOver' | 'onDragLeave'
>

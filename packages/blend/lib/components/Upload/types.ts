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

export type UploadFile = {
    file: File
    progress: number
    status: UploadState
    id: string
}

export type UploadProps = {
    size?: UploadSize
    state?: UploadState
    multiple?: boolean
    acceptedFileTypes?: string[]
    maxFileSize?: number // in bytes
    description?: string // Custom description text for file constraints
    onFileSelect?: (files: File[]) => void
    onUploadProgress?: (fileId: string, progress: number) => void
    onUploadComplete?: (fileId: string, success: boolean) => void
    uploadingFiles?: UploadFile[]
    uploadedFiles?: File[] // Files that have been successfully uploaded
    className?: string
    children?: React.ReactNode
    disabled?: boolean
} & Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onDrop' | 'onDragOver' | 'onDragLeave'
>

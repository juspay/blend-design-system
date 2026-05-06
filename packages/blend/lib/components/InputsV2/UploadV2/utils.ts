import { useState } from 'react'
import { UploadFileV2 } from './UploadV2.types'

export const FILE_NAME_TAG_MAX_LEN = 15

export const createClickHandler =
    (disabled: boolean, fileInputRef: React.RefObject<HTMLInputElement>) =>
    () => {
        if (disabled) return
        fileInputRef.current?.click()
    }

export const useUploadState = () => {
    const [internalDragState, setInternalDragState] = useState({
        isDragActive: false,
        isDragAccept: false,
        isDragReject: false,
    })
    const [, setDragCounter] = useState(0)

    return {
        internalDragState,
        setInternalDragState,
        setDragCounter,
    }
}

export const createDragHandlers = (
    disabled: boolean,
    setDragCounter: (fn: (prev: number) => number) => void,
    updateDragStateFn: (isDragActive: boolean, files?: File[]) => void,
    processFilesFn: (files: FileList) => void
) => {
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return

        setDragCounter((prev) => {
            const newCounter = prev + 1
            if (newCounter === 1 && e.dataTransfer.items) {
                const files = Array.from(e.dataTransfer.items)
                    .filter((item) => item.kind === 'file')
                    .map((item) => item.getAsFile())
                    .filter(Boolean) as File[]
                updateDragStateFn(true, files)
            }
            return newCounter
        })
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return

        setDragCounter((prev) => {
            const newCounter = prev - 1
            if (newCounter === 0) {
                updateDragStateFn(false)
            }
            return newCounter
        })
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return

        setDragCounter(() => 0)
        updateDragStateFn(false)

        if (e.dataTransfer.files) {
            processFilesFn(e.dataTransfer.files)
        }
    }

    return {
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    }
}

export const truncateFileNameForTag = (name: string): string =>
    name.length > FILE_NAME_TAG_MAX_LEN
        ? `${name.slice(0, FILE_NAME_TAG_MAX_LEN)}…`
        : name

export const getFileId = (uploadFile: UploadFileV2, index: number) =>
    uploadFile.id ??
    `${uploadFile.file.name}-${uploadFile.file.size}-${uploadFile.file.lastModified}-${index}`

const KNOWN_UPLOAD_ERROR_REASONS = [
    'oversized',
    'maxFiles',
    'invalidType',
] as const
type KnownUploadErrorReason = (typeof KNOWN_UPLOAD_ERROR_REASONS)[number]

export const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes >= 1024 * 1024) {
        const sizeInMb = sizeInBytes / (1024 * 1024)
        return `${Number(sizeInMb.toFixed(2))} MB`
    }
    if (sizeInBytes >= 1024) {
        const sizeInKb = sizeInBytes / 1024
        return `${Number(sizeInKb.toFixed(2))} KB`
    }
    return `${sizeInBytes} B`
}

export const isKnownUploadErrorReason = (
    reason: unknown
): reason is KnownUploadErrorReason =>
    KNOWN_UPLOAD_ERROR_REASONS.includes(reason as KnownUploadErrorReason)

export const normalizeUploadErrorReason = (reason: unknown) =>
    isKnownUploadErrorReason(reason) ? reason : undefined

export const getValidationMessage = (
    reason?: unknown,
    maxSize?: number,
    maxFiles?: number
) => {
    switch (normalizeUploadErrorReason(reason)) {
        case 'oversized':
            return maxSize
                ? `File is too large. Max size is ${formatFileSize(maxSize)}`
                : 'File is too large'
        case 'maxFiles':
            return maxFiles
                ? `File limit exceeded. Maximum ${maxFiles} files allowed`
                : 'File limit exceeded'
        case 'invalidType':
            return 'Invalid file type'
        default:
            return 'Invalid file'
    }
}

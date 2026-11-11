import { useState } from 'react'
import { UploadFileV2 } from './UploadV2.types'
import { UPLOAD_V2_MESSAGES } from '../../../i18n/catalog/uploadV2.messages'
import { resolveMessage } from '../../../i18n/resolve'
import type { BlendI18nHandle } from '../../../i18n/types'

export const FILE_NAME_TAG_MAX_LEN = 24

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

export const isFileTypeAccepted = (file: File, acceptedFileTypes: string[]) => {
    if (acceptedFileTypes.length === 0) return true

    const fileName = file.name.toLowerCase()
    const fileType = file.type.toLowerCase()

    return acceptedFileTypes.some((acceptedType) => {
        const normalizedAcceptedType = acceptedType.trim().toLowerCase()
        if (!normalizedAcceptedType) return false

        if (normalizedAcceptedType.startsWith('.')) {
            return fileName.endsWith(normalizedAcceptedType)
        }

        if (normalizedAcceptedType.endsWith('/*')) {
            const acceptedGroup = normalizedAcceptedType.slice(0, -1)
            return fileType.startsWith(acceptedGroup)
        }

        return fileType === normalizedAcceptedType
    })
}

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

/**
 * Human-readable validation message for an upload error reason.
 *
 * Takes an optional `i18n` handle rather than reading context, because this is
 * a pure, React-free helper. Callers inside components forward the value from
 * `useMessages`; a one-argument call still returns English, unchanged.
 *
 * The handle is read whole (`i18n?.translate`) rather than destructured:
 * `tsconfig.json` sets `noUnusedParameters`, so an unused `locale` binding
 * would not compile.
 */
export const getValidationMessage = (
    reason?: unknown,
    maxSize?: number,
    maxFiles?: number,
    i18n?: BlendI18nHandle
) => {
    const resolve = (key: string, vars?: Record<string, string>) =>
        resolveMessage(UPLOAD_V2_MESSAGES, key, {
            vars,
            translate: i18n?.translate,
        })

    switch (normalizeUploadErrorReason(reason)) {
        case 'oversized':
            return maxSize
                ? resolve('upload-v2.error.oversized-max', {
                      maxSize: formatFileSize(maxSize),
                  })
                : resolve('upload-v2.error.oversized')
        case 'maxFiles':
            return maxFiles
                ? resolve('upload-v2.error.max-files-limit', {
                      maxFiles: String(maxFiles),
                  })
                : resolve('upload-v2.error.max-files')
        case 'invalidType':
            return resolve('upload-v2.error.invalid-type')
        default:
            return resolve('upload-v2.error.invalid-file')
    }
}

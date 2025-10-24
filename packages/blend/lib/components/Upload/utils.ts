import { useState } from 'react'
import type { FileRejection, UploadFile } from './types'
import { UploadState } from './types'

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

export const getVisualState = (
    disabled: boolean,
    isDragReject: boolean,
    isDragAccept: boolean,
    isDragActive: boolean
): string => {
    if (disabled) return 'error'
    if (isDragReject) return 'error'
    if (isDragAccept) return 'success'
    if (isDragActive) return 'uploading'
    return 'idle'
}

export const validateFile =
    (
        accept: string[],
        maxSize?: number,
        validator?: (file: File) => FileRejection['errors'][0] | null
    ) =>
    (file: File): FileRejection['errors'] => {
        const errors: FileRejection['errors'] = []

        if (accept.length > 0) {
            const isAccepted = accept.some((acceptedType) => {
                if (acceptedType.startsWith('.')) {
                    return file.name
                        .toLowerCase()
                        .endsWith(acceptedType.toLowerCase())
                }
                return file.type.match(acceptedType.replace(/\*/g, '.*'))
            })
            if (!isAccepted) {
                errors.push({
                    code: 'file-invalid-type',
                    message: `File type not accepted. Accepted types: ${accept.join(', ')}`,
                })
            }
        }

        if (maxSize && file.size > maxSize) {
            errors.push({
                code: 'file-too-large',
                message: `File is too large. Maximum size: ${Math.round(maxSize / (1024 * 1024))} MB`,
            })
        }

        if (validator) {
            const customError = validator(file)
            if (customError) {
                errors.push(customError)
            }
        }

        return errors
    }

export const processFiles =
    (
        disabled: boolean,
        validateFileFn: (file: File) => FileRejection['errors'],
        maxFiles?: number,
        onDrop?: (
            acceptedFiles: File[],
            rejectedFiles: FileRejection[]
        ) => void,
        onDropAccepted?: (files: File[]) => void,
        onDropRejected?: (rejections: FileRejection[]) => void
    ) =>
    (files: FileList) => {
        if (disabled) return

        const fileArray = Array.from(files)
        let filesToProcess = fileArray

        if (maxFiles && fileArray.length > maxFiles) {
            filesToProcess = fileArray.slice(0, maxFiles)
        }

        const acceptedFiles: File[] = []
        const rejectedFiles: FileRejection[] = []

        filesToProcess.forEach((file) => {
            const errors = validateFileFn(file)
            if (errors.length === 0) {
                acceptedFiles.push(file)
            } else {
                rejectedFiles.push({ file, errors })
            }
        })

        if (onDrop) {
            onDrop(acceptedFiles, rejectedFiles)
        } else {
            if (acceptedFiles.length > 0) {
                onDropAccepted?.(acceptedFiles)
            }
            if (rejectedFiles.length > 0) {
                onDropRejected?.(rejectedFiles)
            }
        }
    }

export const updateDragState =
    (
        controlledIsDragActive?: boolean,
        validateFileFn?: (file: File) => FileRejection['errors'],
        setInternalDragState?: (state: {
            isDragActive: boolean
            isDragAccept: boolean
            isDragReject: boolean
        }) => void
    ) =>
    (isDragActive: boolean, files?: File[]) => {
        if (
            controlledIsDragActive !== undefined ||
            !setInternalDragState ||
            !validateFileFn
        )
            return

        let isDragAccept = false
        let isDragReject = false

        if (isDragActive && files) {
            const hasValidFiles = files.some(
                (file) => validateFileFn(file).length === 0
            )
            const hasInvalidFiles = files.some(
                (file) => validateFileFn(file).length > 0
            )

            isDragAccept = hasValidFiles && !hasInvalidFiles
            isDragReject = hasInvalidFiles
        }

        setInternalDragState({ isDragActive, isDragAccept, isDragReject })
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

export const createClickHandler =
    (disabled: boolean, fileInputRef: React.RefObject<HTMLInputElement>) =>
    () => {
        if (disabled) return
        fileInputRef.current?.click()
    }

export const createFileInputChangeHandler =
    (processFilesFn: (files: FileList) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFilesFn(e.target.files)
        }
        e.target.value = ''
    }

export const getUploadContent = (
    uploadingFiles: UploadFile[],
    uploadedFiles: {
        id: string
        file: File
        status: 'success' | 'error'
        error?: string
    }[],
    failedFiles: {
        id: string
        file: File
        status: 'success' | 'error'
        error?: string
    }[],
    state: UploadState,
    multiple?: boolean
) => {
    const hasUploadingFiles =
        uploadingFiles.length > 0 &&
        uploadingFiles.some((f) => f.status === UploadState.UPLOADING)

    const uploadingFile = uploadingFiles.find(
        (f) => f.status === UploadState.UPLOADING
    )

    const successfulFiles =
        uploadedFiles?.filter((f) => f.status === 'success') || []
    const errorFiles = failedFiles?.filter((f) => f.status === 'error') || []

    const hasSuccessfulFiles = successfulFiles.length > 0
    const hasErrorFiles = errorFiles.length > 0

    return {
        hasUploadingFiles,
        uploadingFile,
        successfulFiles,
        errorFiles,
        hasSuccessfulFiles,
        hasErrorFiles,
        isSuccess: state === UploadState.SUCCESS && hasSuccessfulFiles,
        isError: state === UploadState.ERROR && hasErrorFiles,
        multiple: multiple || false,
    }
}

export const getMainTitle = (
    isDragActive: boolean,
    isDragAccept: boolean
): string => {
    if (isDragActive) {
        return isDragAccept ? 'Drop files here' : 'Invalid file type'
    }
    return 'Choose a file or drag & drop it here'
}

export const getUploadStateTitle = (
    state: UploadState,
    multiple: boolean,
    hasSuccessfulFiles: boolean,
    hasErrorFiles: boolean,
    fileName?: string
): string => {
    switch (state) {
        case UploadState.UPLOADING:
            return fileName
                ? `Uploading '${fileName}'...`
                : 'Uploading files...'
        case UploadState.SUCCESS:
            if (multiple && hasSuccessfulFiles) {
                return 'Files successfully added'
            }
            return 'File successfully added'
        case UploadState.ERROR:
            if (multiple && hasErrorFiles) {
                return 'Failed to upload multiple files'
            }
            return 'File upload failed'
        default:
            return getMainTitle(false, false)
    }
}

export const getUploadStateDescription = (
    state: UploadState,
    multiple: boolean,
    successfulFiles: { id: string; file: File; status: string }[],
    errorFiles: { id: string; file: File; status: string }[],
    userDescription?: string,
    fileName?: string
): string => {
    switch (state) {
        case UploadState.UPLOADING:
            return userDescription || 'Please wait while uploading your file'
        case UploadState.SUCCESS:
            if (multiple && successfulFiles.length > 0) {
                return "We've successfully uploaded the following files"
            }
            return fileName || 'File uploaded successfully'
        case UploadState.ERROR:
            if (multiple && errorFiles.length > 0) {
                return `${errorFiles.length} files failed`
            }
            return 'Upload failed. Please try again.'
        default:
            return userDescription || ''
    }
}

export const getVisualUploadState = (
    disabled: boolean,
    isDragReject: boolean,
    isDragAccept: boolean,
    isDragActive: boolean,
    state: UploadState
): string => {
    if (disabled) return 'error'
    if (isDragActive) {
        if (isDragReject) return 'error'
        if (isDragAccept) return 'dragActive'
        return 'dragActive'
    }
    return state
}

export const truncateFileList = (
    files: { id: string; file: File; status: string }[]
): {
    displayFiles: { id: string; file: File; status: string }[]
    truncatedCount: number
} => {
    const maxFiles = 2 * 2 // Assume 2 files per row
    if (files.length <= maxFiles) {
        return { displayFiles: files, truncatedCount: 0 }
    }
    return {
        displayFiles: files.slice(0, maxFiles),
        truncatedCount: files.length - maxFiles,
    }
}

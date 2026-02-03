import React, { useState } from 'react'
import type { FileRejection, UploadFile, UploadedFileWithStatus } from './types'
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
        const filesToProcess = fileArray

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
    files: UploadedFileWithStatus[]
): {
    displayFiles: UploadedFileWithStatus[]
    truncatedCount: number
} => {
    const displayLimit = 4
    if (files.length <= displayLimit) {
        return { displayFiles: files, truncatedCount: 0 }
    }
    return {
        displayFiles: files.slice(0, displayLimit),
        truncatedCount: files.length - displayLimit,
    }
}

export const createEnhancedValidator =
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

        // Custom validation
        if (validator) {
            const customError = validator(file)
            if (customError) {
                errors.push(customError)
            }
        }

        return errors
    }

// Check for duplicate files
export const createEnhancedProcessFiles =
    (
        uploadingFiles: UploadFile[],
        uploadedFiles: UploadedFileWithStatus[],
        failedFiles: UploadedFileWithStatus[]
    ) =>
    (files: File[]): { unique: File[]; duplicates: File[] } => {
        const existingFileKeys = new Set([
            ...uploadingFiles.map(
                (f) => `${f.file.name}-${f.file.size}-${f.file.lastModified}`
            ),
            ...uploadedFiles.map(
                (f) => `${f.file.name}-${f.file.size}-${f.file.lastModified}`
            ),
            ...failedFiles.map(
                (f) => `${f.file.name}-${f.file.size}-${f.file.lastModified}`
            ),
        ])

        const unique: File[] = []
        const duplicates: File[] = []
        const processedKeys = new Set<string>()

        files.forEach((file) => {
            const fileKey = `${file.name}-${file.size}-${file.lastModified}`
            if (existingFileKeys.has(fileKey) || processedKeys.has(fileKey)) {
                duplicates.push(file)
            } else {
                unique.push(file)
                processedKeys.add(fileKey)
            }
        })

        return { unique, duplicates }
    }

export const generateFileId = (): string => {
    return Math.random().toString(36).substr(2, 9)
}

export const createFileKey = (file: File): string => {
    return `${file.name}-${file.size}-${file.lastModified}`
}

export const filterDuplicateFiles = (
    newFiles: File[],
    existingFiles: { file: File }[]
): { unique: File[]; duplicates: File[] } => {
    const existingFileKeys = new Set(
        existingFiles.map((f) => createFileKey(f.file))
    )

    const unique: File[] = []
    const duplicates: File[] = []
    const processedKeys = new Set<string>()

    newFiles.forEach((file) => {
        const fileKey = createFileKey(file)
        if (existingFileKeys.has(fileKey) || processedKeys.has(fileKey)) {
            duplicates.push(file)
        } else {
            unique.push(file)
            processedKeys.add(fileKey)
        }
    })

    return { unique, duplicates }
}

export const createDuplicateRejections = (files: File[]): FileRejection[] => {
    return files.map((file) => ({
        file,
        errors: [
            {
                code: 'file-duplicate',
                message: `File "${file.name}" is already uploaded or being processed`,
            },
        ],
    }))
}

export const simulateFileUpload = (
    uploadFile: UploadFile,
    onProgressUpdate: (id: string, progress: number) => void,
    progressInterval: number = 200
): (() => void) => {
    const interval = setInterval(() => {
        onProgressUpdate(uploadFile.id, Math.random() * 15)
    }, progressInterval)

    return () => clearInterval(interval)
}

export const createEnhancedProcessFilesFn =
    (
        disabled: boolean,
        validateFileFn: (file: File) => FileRejection['errors'],
        checkDuplicatesFn: (files: File[]) => {
            unique: File[]
            duplicates: File[]
        },
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

        const { unique: uniqueAcceptedFiles, duplicates } =
            checkDuplicatesFn(acceptedFiles)

        if (duplicates.length > 0) {
            const duplicateRejections: FileRejection[] = duplicates.map(
                (file) => ({
                    file,
                    errors: [
                        {
                            code: 'file-duplicate',
                            message: `File "${file.name}" is already uploaded or being processed`,
                        },
                    ],
                })
            )
            rejectedFiles.push(...duplicateRejections)
        }

        if (maxFiles && fileArray.length > maxFiles) {
            const extraFiles = fileArray.slice(maxFiles)
            const extraRejections: FileRejection[] = extraFiles.map((file) => ({
                file,
                errors: [
                    {
                        code: 'file-too-many',
                        message: `Maximum ${maxFiles} files allowed. "${file.name}" is the ${fileArray.indexOf(file) + 1}th file.`,
                    },
                ],
            }))
            rejectedFiles.push(...extraRejections)
        }

        if (onDrop) {
            onDrop(uniqueAcceptedFiles, rejectedFiles)
        } else {
            if (uniqueAcceptedFiles.length > 0) {
                onDropAccepted?.(uniqueAcceptedFiles)
            }
            if (rejectedFiles.length > 0) {
                onDropRejected?.(rejectedFiles)
            }
        }
    }

// Advanced upload simulation and state management
export const createUploadManager = () => {
    const runningUploads = new Map<string, () => void>()

    const startUpload = (
        uploadFile: UploadFile,
        onProgress: (id: string, progress: number) => void,
        onComplete: (id: string) => void,
        progressInterval: number = 200
    ): (() => void) => {
        let currentProgress = uploadFile.progress || 0

        const interval = setInterval(() => {
            if (currentProgress >= 100) {
                clearInterval(interval)
                runningUploads.delete(uploadFile.id)
                setTimeout(() => onComplete(uploadFile.id), 500)
                return
            }

            const increment = Math.random() * 15
            currentProgress = Math.min(100, currentProgress + increment)
            onProgress(uploadFile.id, currentProgress)
        }, progressInterval)

        const cleanup = () => {
            clearInterval(interval)
            runningUploads.delete(uploadFile.id)
        }

        runningUploads.set(uploadFile.id, cleanup)
        return cleanup
    }

    const cancelUpload = (uploadId: string) => {
        const cleanup = runningUploads.get(uploadId)
        if (cleanup) {
            cleanup()
        }
    }

    const cancelAllUploads = () => {
        runningUploads.forEach((cleanup) => cleanup())
        runningUploads.clear()
    }

    return {
        startUpload,
        cancelUpload,
        cancelAllUploads,
        hasActiveUploads: () => runningUploads.size > 0,
    }
}

// Enhanced file drop handler with complex state management
export const createComplexDropHandler = (
    multiple: boolean,
    maxFiles: number | undefined,
    disabled: boolean,
    uploadingFiles: UploadFile[],
    uploadedFiles: UploadedFileWithStatus[],
    failedFiles: UploadedFileWithStatus[],
    setInternalState: (state: UploadState) => void,
    setInternalUploadingFiles: React.Dispatch<
        React.SetStateAction<UploadFile[]>
    >,
    setInternalUploadedFiles: React.Dispatch<
        React.SetStateAction<UploadedFileWithStatus[]>
    >,
    setInternalFailedFiles: React.Dispatch<
        React.SetStateAction<UploadedFileWithStatus[]>
    >,
    uploadManager: ReturnType<typeof createUploadManager>,
    progressSpeed: number = 200
) => {
    return (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (disabled) return

        if (acceptedFiles.length > 0) {
            setInternalState(UploadState.UPLOADING)

            const existingFileKeys = multiple
                ? new Set([
                      ...uploadingFiles.map((f) => createFileKey(f.file)),
                      ...uploadedFiles.map((f) => createFileKey(f.file)),
                      ...failedFiles.map((f) => createFileKey(f.file)),
                  ])
                : new Set()

            const currentTotalFiles =
                uploadingFiles.length + uploadedFiles.length

            const filesToUpload: File[] = []
            const filesToReject: File[] = []

            acceptedFiles.forEach((file) => {
                const fileKey = createFileKey(file)
                if (multiple && existingFileKeys.has(fileKey)) {
                    // Duplicate file - add to rejections
                    rejectedFiles.push({
                        file,
                        errors: [
                            {
                                code: 'file-duplicate',
                                message: `File "${file.name}" is already uploaded or being processed`,
                            },
                        ],
                    })
                } else {
                    // Check if adding this file would exceed maxFiles
                    const wouldExceedLimit =
                        multiple &&
                        maxFiles &&
                        currentTotalFiles + filesToUpload.length >= maxFiles

                    if (wouldExceedLimit) {
                        rejectedFiles.push({
                            file,
                            errors: [
                                {
                                    code: 'file-too-many',
                                    message: `Maximum ${maxFiles} files allowed. Cannot add "${file.name}".`,
                                },
                            ],
                        })
                        filesToReject.push(file)
                    } else {
                        filesToUpload.push(file)
                    }
                    existingFileKeys.add(fileKey)
                }
            })

            if (filesToReject.length > 0) {
                const rejectedFilesWithStatus = filesToReject.map((file) => ({
                    id: generateFileId(),
                    file,
                    status: 'error' as const,
                    error: `Maximum ${maxFiles} files allowed. Cannot add "${file.name}".`,
                }))

                setInternalFailedFiles((prev) => {
                    const updatedFailedFiles = [...prev]

                    rejectedFilesWithStatus.forEach((newFile) => {
                        const fileKey = createFileKey(newFile.file)
                        const alreadyExists = updatedFailedFiles.some(
                            (f) => createFileKey(f.file) === fileKey
                        )

                        if (!alreadyExists) {
                            updatedFailedFiles.push(newFile)
                        }
                    })

                    return updatedFailedFiles
                })
            }

            if (filesToUpload.length > 0) {
                const newUploadingFiles = filesToUpload.map((file) => ({
                    id: generateFileId(),
                    file,
                    progress: 0,
                    status: UploadState.UPLOADING,
                }))

                // For single files, replace all existing files; for multiple, add to existing
                if (multiple) {
                    setInternalUploadingFiles((prev) => [
                        ...prev,
                        ...newUploadingFiles,
                    ])
                } else {
                    setInternalUploadingFiles(newUploadingFiles)
                    setInternalUploadedFiles([])
                    setInternalFailedFiles([])
                }

                newUploadingFiles.forEach((uploadFile) => {
                    uploadManager.startUpload(
                        uploadFile,
                        (id, progress) => {
                            setInternalUploadingFiles((prev) =>
                                prev.map((f) =>
                                    f.id === id ? { ...f, progress } : f
                                )
                            )
                        },
                        (id) => {
                            setInternalUploadingFiles((prev) =>
                                prev.filter((f) => f.id !== id)
                            )
                            setInternalUploadedFiles((prev) => {
                                const fileKey = createFileKey(uploadFile.file)
                                const alreadyExists = prev.some(
                                    (f) => createFileKey(f.file) === fileKey
                                )

                                if (alreadyExists) {
                                    return prev
                                }

                                return [
                                    ...prev,
                                    {
                                        id: uploadFile.id,
                                        file: uploadFile.file,
                                        status: 'success',
                                    },
                                ]
                            })

                            setInternalUploadingFiles((current) => {
                                const remaining = current.filter(
                                    (f) => f.id !== id
                                )
                                if (remaining.length === 0) {
                                    setTimeout(() => {
                                        setInternalFailedFiles(
                                            (failedFiles) => {
                                                if (failedFiles.length > 0) {
                                                    setInternalState(
                                                        UploadState.ERROR
                                                    )
                                                } else {
                                                    setInternalState(
                                                        UploadState.SUCCESS
                                                    )
                                                }
                                                return failedFiles
                                            }
                                        )
                                    }, 100)
                                }
                                return remaining
                            })
                        },
                        progressSpeed
                    )
                })
            }
        }

        if (rejectedFiles.length > 0) {
            const rejectedFilesWithStatus = rejectedFiles.map((rejection) => ({
                id: generateFileId(),
                file: rejection.file,
                status: 'error' as const,
                error: rejection.errors[0]?.message || 'File rejected',
            }))

            setInternalFailedFiles((prev) => {
                const updatedFailedFiles = [...prev]

                rejectedFilesWithStatus.forEach((newFile) => {
                    const fileKey = createFileKey(newFile.file)
                    const alreadyExists = updatedFailedFiles.some(
                        (f) => createFileKey(f.file) === fileKey
                    )

                    if (!alreadyExists) {
                        updatedFailedFiles.push(newFile)
                    }
                })

                return updatedFailedFiles
            })
            setInternalState(UploadState.ERROR)
        }
    }
}

// Enhanced file removal handler
export const createFileRemovalHandler = (
    setInternalUploadedFiles: React.Dispatch<
        React.SetStateAction<UploadedFileWithStatus[]>
    >,
    setInternalFailedFiles: React.Dispatch<
        React.SetStateAction<UploadedFileWithStatus[]>
    >,
    setInternalState: (state: UploadState) => void
) => {
    return (fileId: string) => {
        setInternalUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
        setInternalFailedFiles((prev) => {
            const updatedFailedFiles = prev.filter((f) => f.id !== fileId)

            setTimeout(() => {
                setInternalUploadedFiles((currentUploaded) => {
                    if (
                        currentUploaded.length > 0 &&
                        updatedFailedFiles.length === 0
                    ) {
                        setInternalState(UploadState.SUCCESS)
                    } else if (
                        currentUploaded.length === 0 &&
                        updatedFailedFiles.length === 0
                    ) {
                        setInternalState(UploadState.IDLE)
                    } else if (updatedFailedFiles.length > 0) {
                        setInternalState(UploadState.ERROR)
                    }
                    return currentUploaded
                })
            }, 0)

            return updatedFailedFiles
        })
    }
}

// File replacement handler
export const createFileReplacementHandler = (
    setInternalState: (state: UploadState) => void,
    setInternalUploadedFiles: React.Dispatch<
        React.SetStateAction<UploadedFileWithStatus[]>
    >,
    setInternalFailedFiles: React.Dispatch<
        React.SetStateAction<UploadedFileWithStatus[]>
    >
) => {
    return () => {
        setInternalState(UploadState.IDLE)
        setInternalUploadedFiles([])
        setInternalFailedFiles([])
    }
}

// /**
//  * Converts bytes to MB
//  * @param bytes - Size in bytes
//  * @returns Size in MB (rounded)
//  */
export const getMbfromKb = (bytes: number) => {
    return Math.round(bytes / (1024 * 1024))
}

import React, { useRef, useState, useCallback } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Button, ButtonType, ButtonSize } from '../Button'
import { ProgressBar, ProgressBarSize } from '../ProgressBar'
import Tag from '../Tags/Tags'
import { TagColor, TagVariant, TagShape } from '../Tags/types'
import { UploadState } from './types'
import type {
    UploadProps,
    UploadedFileWithStatus,
    UploadFile,
    FileRejection,
} from './types'
import type { UploadTokenType } from './upload.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Repeat2, X, HelpCircle } from 'lucide-react'
import {
    useUploadState,
    updateDragState,
    createDragHandlers,
    createClickHandler,
    createFileInputChangeHandler,
    getUploadContent,
    getVisualUploadState,
    truncateFileList,
    createEnhancedValidator,
    processFiles,
    generateFileId,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import { Tooltip, TooltipSize } from '../Tooltip'

const FileListDisplay: React.FC<{
    files: UploadedFileWithStatus[]
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}> = ({ files, onFileRemove, uploadTokens }) => {
    const sortedFiles = [...files].sort((a, b) => {
        if (a.status === 'error' && b.status !== 'error') return -1
        if (a.status !== 'error' && b.status === 'error') return 1
        return 0
    })

    const { displayFiles, truncatedCount } = truncateFileList(sortedFiles)

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={uploadTokens.container.content.slot.gap}
        >
            <Block
                display="flex"
                flexWrap="wrap"
                gap={FOUNDATION_THEME.unit[10]}
            >
                {displayFiles.map((file) => (
                    <Tag
                        key={file.id}
                        text={file.file.name}
                        variant={TagVariant.SUBTLE}
                        color={
                            file.status === 'error'
                                ? TagColor.ERROR
                                : TagColor.NEUTRAL
                        }
                        shape={TagShape.ROUNDED}
                        rightSlot={
                            onFileRemove ? (
                                <X
                                    size={12}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onFileRemove(file.id)
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : undefined
                        }
                    />
                ))}
            </Block>
            {truncatedCount > 0 && (
                <Text
                    fontSize={
                        uploadTokens.container.content.text.subtitle.fontSize
                    }
                    fontWeight={
                        uploadTokens.container.content.text.subtitle.fontWeight
                    }
                    color={uploadTokens.container.content.text.subtitle.color}
                >
                    +{truncatedCount} more files
                </Text>
            )}
        </Block>
    )
}

const UploadingState: React.FC<{
    uploadingFile: { file: File; progress: number }
    children?: React.ReactNode
    description?: string
    uploadTokens: UploadTokenType
}> = ({ uploadingFile, children, description, uploadTokens }) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens.container.content.slot.gap}
    >
        {children && (
            <Block
                width={uploadTokens.container.content.slot.width}
                height={uploadTokens.container.content.slot.width}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={uploadTokens.container.content.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.title.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.title.fontWeight
                }
                color={uploadTokens.container.content.text.title.color}
                textAlign="center"
            >
                Uploading{' '}
                <Text
                    as="span"
                    fontSize={
                        uploadTokens.container.content.text.title.fontSize
                    }
                    fontWeight={
                        uploadTokens.container.content.text.title.fontWeight
                    }
                    color={FOUNDATION_THEME.colors.primary[600]}
                >
                    '{uploadingFile.file.name}'
                </Text>
                ...
            </Text>

            {description && (
                <Text
                    as="span"
                    fontSize={
                        uploadTokens.container.content.text.subtitle.fontSize
                    }
                    fontWeight={
                        uploadTokens.container.content.text.subtitle.fontWeight
                    }
                    color={uploadTokens.container.content.text.subtitle.color}
                    textAlign="center"
                >
                    {description}
                </Text>
            )}
        </Block>

        <Block width="100%" gap={uploadTokens.container.content.actionable.gap}>
            <ProgressBar
                value={uploadingFile.progress}
                size={ProgressBarSize.SMALL}
                showLabel={false}
            />
        </Block>
    </Block>
)

const SuccessState: React.FC<{
    successfulFiles: UploadedFileWithStatus[]
    multiple: boolean
    children?: React.ReactNode
    onReplaceFile?: () => void
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}> = ({
    successfulFiles,
    multiple,
    children,
    onReplaceFile,
    onFileRemove,
    uploadTokens,
    maxFiles,
}) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens.container.content.slot.gap}
    >
        {children && (
            <Block
                width={uploadTokens.container.content.slot.width}
                height={uploadTokens.container.content.slot.width}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={uploadTokens.container.content.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.title.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.title.fontWeight
                }
                color={uploadTokens.container.content.text.title.color}
                textAlign="center"
            >
                {multiple
                    ? 'Files successfully added'
                    : 'File successfully added'}
            </Text>

            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.subtitle.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.subtitle.fontWeight
                }
                color={uploadTokens.container.content.text.subtitle.color}
                textAlign="center"
            >
                {multiple
                    ? "We've successfully uploaded the following files"
                    : successfulFiles[0]?.file.name || ''}
            </Text>
        </Block>

        <Block gap={uploadTokens.container.content.actionable.gap}>
            {multiple ? (
                <FileListDisplay
                    files={successfulFiles}
                    onFileRemove={onFileRemove}
                    uploadTokens={uploadTokens}
                    maxFiles={maxFiles}
                />
            ) : (
                onReplaceFile && (
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        leadingIcon={<Repeat2 />}
                        text="Replace file"
                        onClick={onReplaceFile}
                    />
                )
            )}
        </Block>
    </Block>
)

const MixedState: React.FC<{
    successfulFiles: UploadedFileWithStatus[]
    errorFiles: UploadedFileWithStatus[]
    children?: React.ReactNode
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}> = ({
    successfulFiles,
    errorFiles,
    children,
    onFileRemove,
    uploadTokens,
    maxFiles,
}) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens.container.content.slot.gap}
    >
        {children && (
            <Block
                width={uploadTokens.container.content.slot.width}
                height={uploadTokens.container.content.slot.width}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={uploadTokens.container.content.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.title.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.title.fontWeight
                }
                color={uploadTokens.container.content.text.title.color}
                textAlign="center"
            >
                Files uploaded
            </Text>

            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.subtitle.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.subtitle.fontWeight
                }
                color={uploadTokens.container.content.text.subtitle.color}
                textAlign="center"
            >
                {successfulFiles.length} succeeded, {errorFiles.length} failed
            </Text>
        </Block>

        <Block gap={uploadTokens.container.content.actionable.gap}>
            <FileListDisplay
                files={[...successfulFiles, ...errorFiles]}
                onFileRemove={onFileRemove}
                uploadTokens={uploadTokens}
                maxFiles={maxFiles}
            />
        </Block>
    </Block>
)

const ErrorState: React.FC<{
    errorFiles: UploadedFileWithStatus[]
    multiple: boolean
    children?: React.ReactNode
    errorText?: string
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}> = ({
    errorFiles,
    multiple,
    children,
    errorText,
    onFileRemove,
    uploadTokens,
    maxFiles,
}) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens.container.content.slot.gap}
    >
        {children && (
            <Block
                width={uploadTokens.container.content.slot.width}
                height={uploadTokens.container.content.slot.width}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={uploadTokens.container.content.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.title.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.title.fontWeight
                }
                color={uploadTokens.container.content.text.title.color}
                textAlign="center"
            >
                {multiple
                    ? 'Failed to upload multiple files'
                    : 'File upload failed'}
            </Text>

            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.subtitle.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.subtitle.fontWeight
                }
                color={uploadTokens.container.content.text.subtitle.color}
                textAlign="center"
            >
                {multiple
                    ? `${errorFiles.length} files failed`
                    : errorFiles[0]?.error ||
                      'Upload failed. Please try again.'}
            </Text>
        </Block>

        <Block gap={FOUNDATION_THEME.unit[10]}>
            {multiple ? (
                <FileListDisplay
                    files={errorFiles}
                    onFileRemove={onFileRemove}
                    uploadTokens={uploadTokens}
                    maxFiles={maxFiles}
                />
            ) : (
                (errorText || errorFiles[0]?.error) && (
                    <Text
                        fontSize={
                            uploadTokens.container.content.actionable.errorText
                                .fontSize
                        }
                        fontWeight={
                            uploadTokens.container.content.actionable.errorText
                                .fontWeight
                        }
                        color={
                            uploadTokens.container.content.actionable.errorText
                                .color
                        }
                        textAlign="center"
                    >
                        {errorText || errorFiles[0]?.error}
                    </Text>
                )
            )}
        </Block>
    </Block>
)

const DefaultState: React.FC<{
    children?: React.ReactNode
    description?: string
    disabled: boolean
    uploadTokens: UploadTokenType
}> = ({ children, description, disabled, uploadTokens }) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens.container.content.slot.gap}
    >
        {children && (
            <Block
                width={uploadTokens.container.content.slot.width}
                height={uploadTokens.container.content.slot.width}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={uploadTokens.container.content.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.container.content.text.title.fontSize}
                fontWeight={
                    uploadTokens.container.content.text.title.fontWeight
                }
                color={uploadTokens.container.content.text.title.color}
                textAlign="center"
            >
                Choose a file or drag & drop it here
            </Text>

            {description && (
                <Text
                    as="span"
                    fontSize={
                        uploadTokens.container.content.text.subtitle.fontSize
                    }
                    fontWeight={
                        uploadTokens.container.content.text.subtitle.fontWeight
                    }
                    color={uploadTokens.container.content.text.subtitle.color}
                    textAlign="center"
                >
                    {description}
                </Text>
            )}
        </Block>

        <Block gap={uploadTokens.container.content.actionable.gap}>
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                text="Browse Files"
                disabled={disabled}
            />
        </Block>
    </Block>
)

const Upload: React.FC<UploadProps> = ({
    multiple = false,
    accept = [],
    maxSize,
    maxFiles = multiple ? undefined : 1,
    disabled = false,
    required = false,
    label,
    subLabel,
    helpIconHintText,
    children,
    description,
    className,
    errorText,
    state: externalState,
    uploadingFiles: externalUploadingFiles,
    uploadedFiles: externalUploadedFiles,
    failedFiles: externalFailedFiles,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileRemove,
    onReplaceFile,
    isDragActive: controlledIsDragActive,
    isDragAccept: controlledIsDragAccept,
    isDragReject: controlledIsDragReject,
    validator,
    ...rest
}) => {
    const uploadTokens = useResponsiveTokens<UploadTokenType>('UPLOAD')
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Internal state management
    const [internalState, setInternalState] = useState<UploadState>(
        UploadState.IDLE
    )
    const [internalUploadingFiles, setInternalUploadingFiles] = useState<
        UploadFile[]
    >([])
    const [internalUploadedFiles, setInternalUploadedFiles] = useState<
        UploadedFileWithStatus[]
    >([])
    const [internalFailedFiles, setInternalFailedFiles] = useState<
        UploadedFileWithStatus[]
    >([])

    // Use external state if provided, otherwise use internal state
    const state = externalState ?? internalState
    const uploadingFiles = externalUploadingFiles ?? internalUploadingFiles
    const uploadedFiles = externalUploadedFiles ?? internalUploadedFiles
    const failedFiles = externalFailedFiles ?? internalFailedFiles

    const { internalDragState, setInternalDragState, setDragCounter } =
        useUploadState()

    const isDragActive =
        controlledIsDragActive ?? internalDragState.isDragActive
    const isDragAccept =
        controlledIsDragAccept ?? internalDragState.isDragAccept
    const isDragReject =
        controlledIsDragReject ?? internalDragState.isDragReject

    const visualState = getVisualUploadState(
        disabled,
        isDragReject,
        isDragAccept,
        isDragActive,
        state
    )

    const validateFile = useCallback(
        createEnhancedValidator(accept, maxSize, validator),
        [accept, maxSize, validator]
    )

    // Simple duplicate checking helper
    const createFileKey = (file: File) =>
        `${file.name}-${file.size}-${file.lastModified}`

    const handleInternalDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
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

                const uniqueFiles: File[] = []
                const duplicateFiles: File[] = []
                const maxFilesExceededFiles: File[] = []

                acceptedFiles.forEach((file) => {
                    const fileKey = createFileKey(file)
                    if (multiple && existingFileKeys.has(fileKey)) {
                        duplicateFiles.push(file)
                    } else {
                        if (
                            multiple &&
                            maxFiles &&
                            currentTotalFiles + uniqueFiles.length >= maxFiles
                        ) {
                            maxFilesExceededFiles.push(file)
                        } else {
                            uniqueFiles.push(file)
                            existingFileKeys.add(fileKey)
                        }
                    }
                })

                if (duplicateFiles.length > 0) {
                    const duplicateRejections = duplicateFiles.map((file) => ({
                        file,
                        errors: [
                            {
                                code: 'file-duplicate',
                                message: `File "${file.name}" is already uploaded or being processed`,
                            },
                        ],
                    }))
                    rejectedFiles.push(...duplicateRejections)
                }

                if (maxFilesExceededFiles.length > 0) {
                    const maxFilesRejections = maxFilesExceededFiles.map(
                        (file) => ({
                            file,
                            errors: [
                                {
                                    code: 'file-too-many',
                                    message: `Maximum ${maxFiles} files allowed. Cannot add "${file.name}".`,
                                },
                            ],
                        })
                    )
                    rejectedFiles.push(...maxFilesRejections)
                }

                if (uniqueFiles.length > 0) {
                    const newUploadingFiles = uniqueFiles.map((file) => ({
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
                        const interval = setInterval(() => {
                            setInternalUploadingFiles((prev) =>
                                prev.map((f) => {
                                    if (f.id === uploadFile.id) {
                                        const newProgress =
                                            f.progress + Math.random() * 15
                                        if (newProgress >= 100) {
                                            clearInterval(interval)
                                            setTimeout(() => {
                                                // Remove from uploading
                                                setInternalUploadingFiles(
                                                    (prev) =>
                                                        prev.filter(
                                                            (f) =>
                                                                f.id !==
                                                                uploadFile.id
                                                        )
                                                )

                                                setInternalUploadedFiles(
                                                    (prev) => {
                                                        const fileKey =
                                                            createFileKey(
                                                                uploadFile.file
                                                            )
                                                        const alreadyExists =
                                                            prev.some(
                                                                (f) =>
                                                                    createFileKey(
                                                                        f.file
                                                                    ) ===
                                                                    fileKey
                                                            )

                                                        if (alreadyExists) {
                                                            return prev // Don't add duplicate
                                                        }

                                                        return [
                                                            ...prev,
                                                            {
                                                                id: uploadFile.id,
                                                                file: uploadFile.file,
                                                                status: 'success',
                                                            },
                                                        ]
                                                    }
                                                )

                                                setInternalUploadingFiles(
                                                    (current) => {
                                                        const remaining =
                                                            current.filter(
                                                                (f) =>
                                                                    f.id !==
                                                                    uploadFile.id
                                                            )
                                                        if (
                                                            remaining.length ===
                                                            0
                                                        ) {
                                                            setTimeout(() => {
                                                                setInternalFailedFiles(
                                                                    (
                                                                        failedFiles
                                                                    ) => {
                                                                        if (
                                                                            failedFiles.length >
                                                                            0
                                                                        ) {
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
                                                    }
                                                )
                                            }, 500)
                                            return { ...f, progress: 100 }
                                        }
                                        return { ...f, progress: newProgress }
                                    }
                                    return f
                                })
                            )
                        }, 200)
                    })
                }
            }

            if (rejectedFiles.length > 0) {
                const rejectedFilesWithStatus = rejectedFiles.map(
                    (rejection) => ({
                        id: generateFileId(),
                        file: rejection.file,
                        status: 'error' as const,
                        error: rejection.errors[0]?.message || 'File rejected',
                    })
                )

                setInternalFailedFiles((prev) => [
                    ...prev,
                    ...rejectedFilesWithStatus,
                ])
                setInternalState(UploadState.ERROR)
            }
        },
        [disabled, multiple, uploadingFiles, uploadedFiles, failedFiles]
    )

    const handleInternalFileRemove = useCallback((fileId: string) => {
        setInternalUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
        setInternalFailedFiles((prev) => prev.filter((f) => f.id !== fileId))
    }, [])

    const handleInternalReplaceFile = useCallback(() => {
        setInternalState(UploadState.IDLE)
        setInternalUploadedFiles([])
        setInternalFailedFiles([])
    }, [])

    const finalOnDrop = onDrop || handleInternalDrop
    const finalOnFileRemove = onFileRemove || handleInternalFileRemove
    const finalOnReplaceFile = onReplaceFile || handleInternalReplaceFile

    const processFilesFn = useCallback(
        processFiles(
            disabled,
            validateFile,
            maxFiles,
            finalOnDrop,
            onDropAccepted,
            onDropRejected
        ),
        [
            disabled,
            validateFile,
            maxFiles,
            finalOnDrop,
            onDropAccepted,
            onDropRejected,
        ]
    )

    const updateDragStateFn = updateDragState(
        controlledIsDragActive,
        validateFile,
        setInternalDragState
    )
    const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop } =
        createDragHandlers(
            disabled,
            setDragCounter,
            updateDragStateFn,
            processFilesFn
        )
    const handleClick = createClickHandler(
        disabled,
        fileInputRef as React.RefObject<HTMLInputElement>
    )
    const handleFileInputChange = createFileInputChangeHandler(processFilesFn)

    const uploadContent = getUploadContent(
        uploadingFiles,
        uploadedFiles,
        failedFiles,
        state,
        multiple
    )

    const renderContent = () => {
        if (uploadContent.hasUploadingFiles && uploadContent.uploadingFile) {
            return (
                <UploadingState
                    uploadingFile={uploadContent.uploadingFile}
                    children={children}
                    description={description}
                    uploadTokens={uploadTokens}
                />
            )
        }

        if (
            multiple &&
            uploadContent.hasSuccessfulFiles &&
            uploadContent.hasErrorFiles
        ) {
            return (
                <MixedState
                    successfulFiles={uploadContent.successfulFiles}
                    errorFiles={uploadContent.errorFiles}
                    children={children}
                    onFileRemove={finalOnFileRemove}
                    uploadTokens={uploadTokens}
                    maxFiles={maxFiles}
                />
            )
        }

        if (uploadContent.isSuccess && uploadContent.hasSuccessfulFiles) {
            return (
                <SuccessState
                    successfulFiles={uploadContent.successfulFiles}
                    multiple={uploadContent.multiple}
                    children={children}
                    onReplaceFile={finalOnReplaceFile}
                    onFileRemove={finalOnFileRemove}
                    uploadTokens={uploadTokens}
                    maxFiles={maxFiles}
                />
            )
        }

        if (uploadContent.isError && uploadContent.hasErrorFiles) {
            return (
                <ErrorState
                    errorFiles={uploadContent.errorFiles}
                    multiple={uploadContent.multiple}
                    children={children}
                    errorText={errorText}
                    onFileRemove={finalOnFileRemove}
                    uploadTokens={uploadTokens}
                    maxFiles={maxFiles}
                />
            )
        }

        return (
            <DefaultState
                children={children}
                description={description}
                disabled={disabled}
                uploadTokens={uploadTokens}
            />
        )
    }

    return (
        <Block className={className} {...rest}>
            {label && (
                <Block
                    display="flex"
                    alignItems="center"
                    gap={uploadTokens.header.required.gap}
                    marginBottom={uploadTokens.header.label.marginBottom}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={uploadTokens.header.label.gap}
                    >
                        <Text
                            fontSize={uploadTokens.header.label.text.fontSize}
                            fontWeight={
                                uploadTokens.header.label.text.fontWeight
                            }
                            color={uploadTokens.header.label.text.color}
                        >
                            {label}
                        </Text>
                        {required && (
                            <Text
                                fontSize={
                                    uploadTokens.header.label.text.fontSize
                                }
                                fontWeight={
                                    uploadTokens.header.label.text.fontWeight
                                }
                                color={uploadTokens.header.required.text.color}
                            >
                                *
                            </Text>
                        )}
                    </Block>

                    {subLabel && (
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={uploadTokens.header.subLabel.gap}
                        >
                            <Text
                                fontSize={
                                    uploadTokens.header.subLabel.text.fontSize
                                }
                                fontWeight={
                                    uploadTokens.header.subLabel.text.fontWeight
                                }
                                color={uploadTokens.header.subLabel.text.color}
                            >
                                ({subLabel})
                            </Text>

                            {helpIconHintText && (
                                <Block contentCentered size={16}>
                                    <Tooltip
                                        content={helpIconHintText}
                                        size={TooltipSize.SMALL}
                                    >
                                        <HelpCircle
                                            size={
                                                uploadTokens.header.helpIcon
                                                    .width
                                            }
                                            color={
                                                uploadTokens.header.helpIcon
                                                    .color
                                            }
                                        />
                                    </Tooltip>
                                </Block>
                            )}
                        </Block>
                    )}
                </Block>
            )}

            <Block
                display="flex"
                flexDirection="column"
                border={
                    uploadTokens.container.border[
                        visualState as keyof typeof uploadTokens.container.border
                    ]
                }
                borderRadius={uploadTokens.container.borderRadius}
                backgroundColor={
                    uploadTokens.container.backgroundColor[
                        visualState as keyof typeof uploadTokens.container.backgroundColor
                    ]
                }
                padding={uploadTokens.container.padding}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                style={{ transition: 'all 0.2s ease-in-out' }}
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {renderContent()}

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={multiple}
                    accept={accept.join(',')}
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />
            </Block>
        </Block>
    )
}

Upload.displayName = 'Upload'

export default Upload

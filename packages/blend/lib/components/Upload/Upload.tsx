import React, { useRef, useState, useCallback, useMemo } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Tooltip, TooltipSize } from '../Tooltip'
import { HelpCircle } from 'lucide-react'
import { UploadState } from './types'
import type {
    UploadProps,
    UploadedFileWithStatus,
    UploadFile,
    FileRejection,
} from './types'
import type { UploadTokenType } from './upload.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    useUploadState,
    updateDragState,
    createDragHandlers,
    createClickHandler,
    createFileInputChangeHandler,
    getUploadContent,
    getVisualUploadState,
    createEnhancedValidator,
    createUploadManager,
    createComplexDropHandler,
    createFileRemovalHandler,
    createFileReplacementHandler,
} from './utils'
import {
    UploadingState,
    SuccessState,
    MixedState,
    ErrorState,
    DefaultState,
} from './components'

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

    const validateFile = useMemo(
        () => createEnhancedValidator(accept, maxSize, validator),
        [accept, maxSize, validator]
    )

    const uploadManager = useMemo(() => createUploadManager(), [])

    const handleInternalDrop = useMemo(
        () =>
            createComplexDropHandler(
                multiple,
                maxFiles,
                disabled,
                uploadingFiles,
                uploadedFiles,
                failedFiles,
                setInternalState,
                setInternalUploadingFiles,
                setInternalUploadedFiles,
                setInternalFailedFiles,
                uploadManager
            ),
        [
            multiple,
            maxFiles,
            disabled,
            validateFile,
            uploadingFiles,
            uploadedFiles,
            failedFiles,
            uploadManager,
        ]
    )

    const handleInternalFileRemove = useMemo(
        () =>
            createFileRemovalHandler(
                setInternalUploadedFiles,
                setInternalFailedFiles,
                setInternalState
            ),
        []
    )

    const handleInternalReplaceFile = useMemo(
        () =>
            createFileReplacementHandler(
                setInternalState,
                setInternalUploadedFiles,
                setInternalFailedFiles
            ),
        []
    )

    const finalOnDrop = onDrop || handleInternalDrop
    const finalOnFileRemove = onFileRemove || handleInternalFileRemove
    const finalOnReplaceFile = onReplaceFile || handleInternalReplaceFile

    const processFilesFn = useCallback(
        (files: FileList) => {
            if (disabled) return

            const fileArray = Array.from(files)
            const acceptedFiles: File[] = []
            const rejectedFiles: FileRejection[] = []

            fileArray.forEach((file) => {
                const errors = validateFile(file)
                if (errors.length === 0) {
                    acceptedFiles.push(file)
                } else {
                    rejectedFiles.push({ file, errors })
                }
            })

            if (finalOnDrop) {
                finalOnDrop(acceptedFiles, rejectedFiles)
            } else {
                if (acceptedFiles.length > 0) {
                    onDropAccepted?.(acceptedFiles)
                }
                if (rejectedFiles.length > 0) {
                    onDropRejected?.(rejectedFiles)
                }
            }
        },
        [disabled, validateFile, finalOnDrop, onDropAccepted, onDropRejected]
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
                                <Block
                                    data-element="help-icon"
                                    contentCentered
                                    size={16}
                                >
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
                data-upload={label ?? ''}
                data-status={disabled ? 'disabled' : 'enabled'}
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

import React, { useRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Button, ButtonType, ButtonSize } from '../Button'
import { ProgressBar, ProgressBarSize } from '../ProgressBar'
import Tag from '../Tags/Tags'
import { TagColor, TagVariant, TagShape } from '../Tags/types'
import { UploadState } from './types'
import type { UploadProps, UploadedFileWithStatus } from './types'
import type { UploadTokenType } from './upload.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Repeat2, X } from 'lucide-react'
import {
    useUploadState,
    validateFile,
    processFiles,
    updateDragState,
    createDragHandlers,
    createClickHandler,
    createFileInputChangeHandler,
    getUploadContent,
    getVisualUploadState,
    truncateFileList,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'

const FileListDisplay: React.FC<{
    files: UploadedFileWithStatus[]
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
}> = ({ files, onFileRemove, uploadTokens }) => {
    const { displayFiles, truncatedCount } = truncateFileList(files)

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
                color={uploadTokens.container.content.text.subtitle.color}
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
                    color={uploadTokens.container.content.text.title.color}
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
}> = ({
    successfulFiles,
    multiple,
    children,
    onReplaceFile,
    onFileRemove,
    uploadTokens,
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
                color={uploadTokens.container.content.text.subtitle.color}
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

const ErrorState: React.FC<{
    errorFiles: UploadedFileWithStatus[]
    multiple: boolean
    children?: React.ReactNode
    errorText?: string
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
}> = ({
    errorFiles,
    multiple,
    children,
    errorText,
    onFileRemove,
    uploadTokens,
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
                color={
                    uploadTokens.container.content.actionable.errorText.color
                }
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
                    : 'Upload failed. Please try again.'}
            </Text>
        </Block>

        <Block gap={FOUNDATION_THEME.unit[10]}>
            {multiple ? (
                <FileListDisplay
                    files={errorFiles}
                    onFileRemove={onFileRemove}
                    uploadTokens={uploadTokens}
                />
            ) : (
                errorText && (
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
                        {errorText}
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
                color={uploadTokens.container.content.text.subtitle.color}
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
    children,
    description,
    className,
    errorText,
    state = UploadState.IDLE,
    uploadingFiles = [],
    uploadedFiles = [],
    failedFiles = [],
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

    const validateFileFn = validateFile(accept, maxSize, validator)
    const processFilesFn = processFiles(
        disabled,
        validateFileFn,
        maxFiles,
        onDrop,
        onDropAccepted,
        onDropRejected
    )
    const updateDragStateFn = updateDragState(
        controlledIsDragActive,
        validateFileFn,
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

        if (uploadContent.isSuccess && uploadContent.hasSuccessfulFiles) {
            return (
                <SuccessState
                    successfulFiles={uploadContent.successfulFiles}
                    multiple={uploadContent.multiple}
                    children={children}
                    onReplaceFile={onReplaceFile}
                    onFileRemove={onFileRemove}
                    uploadTokens={uploadTokens}
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
                    onFileRemove={onFileRemove}
                    uploadTokens={uploadTokens}
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
            {/* Label Section */}
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
                        <Text
                            fontSize={
                                uploadTokens.header.subLabel.text.fontSize
                            }
                            fontWeight={
                                uploadTokens.header.subLabel.text.fontWeight
                            }
                            color={uploadTokens.header.subLabel.text.color}
                        >
                            {subLabel}
                        </Text>
                    )}
                </Block>
            )}

            {/* Upload Container */}
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

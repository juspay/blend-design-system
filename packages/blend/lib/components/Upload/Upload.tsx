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
    getMainTitle,
    getVisualUploadState,
    truncateFileList,
} from './utils'

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
            gap={uploadTokens.fileList.gap}
            marginTop={uploadTokens.fileList.marginTop}
        >
            <Block
                display="flex"
                flexWrap="wrap"
                gap={uploadTokens.fileList.gap}
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
                    fontSize={uploadTokens.text.description.fontSize}
                    fontWeight={uploadTokens.text.description.fontWeight}
                    color={uploadTokens.text.description.color.idle}
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
        gap={uploadTokens.container.gap}
    >
        {children && (
            <Block
                width={uploadTokens.slot.width}
                height={uploadTokens.slot.width}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Text
            as="span"
            fontSize={uploadTokens.text.title.fontSize}
            fontWeight={uploadTokens.text.title.fontWeight}
            color={uploadTokens.text.title.color.idle}
            textAlign="center"
        >
            Uploading{' '}
            <Text
                as="span"
                fontSize={uploadTokens.text.filename.fontSize}
                fontWeight={uploadTokens.text.filename.fontWeight}
                color={uploadTokens.text.filename.primaryColor}
            >
                '{uploadingFile.file.name}'
            </Text>
            ...
        </Text>

        {description && (
            <Text
                as="span"
                fontSize={uploadTokens.text.description.fontSize}
                fontWeight={uploadTokens.text.description.fontWeight}
                color={uploadTokens.text.description.color.uploading}
                textAlign="center"
            >
                {description}
            </Text>
        )}

        <Block width="100%">
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
        gap={uploadTokens.container.gap}
    >
        {children && (
            <Block
                width={uploadTokens.slot.width}
                height={uploadTokens.slot.width}
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
            gap={uploadTokens.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.text.title.fontSize}
                fontWeight={uploadTokens.text.title.fontWeight}
                color={uploadTokens.text.title.color.success}
                textAlign="center"
            >
                {multiple
                    ? 'Files successfully added'
                    : 'File successfully added'}
            </Text>

            <Text
                as="span"
                fontSize={uploadTokens.text.description.fontSize}
                fontWeight={uploadTokens.text.description.fontWeight}
                color={uploadTokens.text.description.color.success}
                textAlign="center"
            >
                {multiple
                    ? "We've successfully uploaded the following files"
                    : successfulFiles[0]?.file.name || ''}
            </Text>
        </Block>

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
        gap={uploadTokens.container.gap}
    >
        {children && (
            <Block
                width={uploadTokens.slot.width}
                height={uploadTokens.slot.width}
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
            gap={uploadTokens.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.text.title.fontSize}
                fontWeight={uploadTokens.text.title.fontWeight}
                color={uploadTokens.text.title.color.error}
                textAlign="center"
            >
                {multiple
                    ? 'Failed to upload multiple files'
                    : 'File upload failed'}
            </Text>

            <Text
                as="span"
                fontSize={uploadTokens.text.description.fontSize}
                fontWeight={uploadTokens.text.description.fontWeight}
                color={uploadTokens.text.description.color.error}
                textAlign="center"
            >
                {multiple
                    ? `${errorFiles.length} files failed`
                    : 'Upload failed. Please try again.'}
            </Text>
        </Block>

        {multiple ? (
            <FileListDisplay
                files={errorFiles}
                onFileRemove={onFileRemove}
                uploadTokens={uploadTokens}
            />
        ) : (
            errorText && (
                <Text
                    fontSize={uploadTokens.text.error.fontSize}
                    fontWeight={uploadTokens.text.error.fontWeight}
                    color={uploadTokens.text.error.color}
                    textAlign="center"
                >
                    {errorText}
                </Text>
            )
        )}
    </Block>
)

const DefaultState: React.FC<{
    children?: React.ReactNode
    description?: string
    isDragActive: boolean
    isDragAccept: boolean
    disabled: boolean
    uploadTokens: UploadTokenType
}> = ({
    children,
    description,
    isDragActive,
    isDragAccept,
    disabled,
    uploadTokens,
}) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens.container.gap}
    >
        {children && (
            <Block
                width={uploadTokens.slot.width}
                height={uploadTokens.slot.width}
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
            gap={uploadTokens.text.gap}
        >
            <Text
                as="span"
                fontSize={uploadTokens.text.title.fontSize}
                fontWeight={uploadTokens.text.title.fontWeight}
                color={uploadTokens.text.title.color.idle}
                textAlign="center"
            >
                {getMainTitle(isDragActive, isDragAccept)}
            </Text>

            {description && !isDragActive && (
                <Text
                    as="span"
                    fontSize={uploadTokens.text.description.fontSize}
                    fontWeight={uploadTokens.text.description.fontWeight}
                    color={uploadTokens.text.description.color.idle}
                    textAlign="center"
                >
                    {description}
                </Text>
            )}
        </Block>

        {!isDragActive && (
            <Button
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                text="Browse Files"
                disabled={disabled}
            />
        )}
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
                isDragActive={isDragActive}
                isDragAccept={isDragAccept}
                disabled={disabled}
                uploadTokens={uploadTokens}
            />
        )
    }

    return (
        <Block className={className} padding={uploadTokens.padding} {...rest}>
            {/* Label Section */}
            {label && (
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    marginBottom={uploadTokens.label.marginBottom}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={uploadTokens.label.gap}
                    >
                        <Text
                            fontSize={uploadTokens.label.text.fontSize}
                            fontWeight={uploadTokens.label.text.fontWeight}
                            color={uploadTokens.label.text.color}
                        >
                            {label}
                        </Text>
                        {required && (
                            <Text
                                fontSize={uploadTokens.label.text.fontSize}
                                fontWeight={uploadTokens.label.text.fontWeight}
                                color={uploadTokens.required.text.color}
                            >
                                *
                            </Text>
                        )}
                    </Block>
                    {subLabel && (
                        <Text
                            fontSize={uploadTokens.subLabel.text.fontSize}
                            fontWeight={uploadTokens.subLabel.text.fontWeight}
                            color={uploadTokens.subLabel.text.color}
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

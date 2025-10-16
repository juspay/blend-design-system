import React, { useCallback, useRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ProgressBar, ProgressBarSize } from '../ProgressBar'
import { Button, ButtonType, ButtonSize } from '../Button'
import { UploadSize, UploadState } from './types'
import type { UploadProps } from './types'
import type { UploadTokenType } from './upload.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const Upload: React.FC<UploadProps> = ({
    size = UploadSize.MEDIUM,
    state = UploadState.IDLE,
    multiple = false,
    acceptedFileTypes = [],
    maxFileSize,
    description,
    onFileSelect,
    onUploadProgress, // eslint-disable-line @typescript-eslint/no-unused-vars
    onUploadComplete, // eslint-disable-line @typescript-eslint/no-unused-vars
    uploadingFiles = [],
    uploadedFiles = [],
    className,
    children,
    disabled = false,
    ...rest
}) => {
    const uploadTokens = useResponsiveTokens<UploadTokenType>('UPLOAD')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [_dragCounter, setDragCounter] = useState(0) // eslint-disable-line @typescript-eslint/no-unused-vars

    const currentState = disabled ? UploadState.ERROR : state

    // Map UploadSize to ProgressBarSize
    const getProgressBarSize = (uploadSize: UploadSize): ProgressBarSize => {
        switch (uploadSize) {
            case UploadSize.SMALL:
                return ProgressBarSize.SMALL
            case UploadSize.MEDIUM:
                return ProgressBarSize.MEDIUM
            case UploadSize.LARGE:
                return ProgressBarSize.LARGE
            default:
                return ProgressBarSize.MEDIUM
        }
    }

    const handleFileSelect = useCallback(
        (files: FileList) => {
            if (disabled) return

            const validFiles: File[] = []
            const fileArray = Array.from(files)

            for (const file of fileArray) {
                // Check file type if specified
                if (
                    acceptedFileTypes.length > 0 &&
                    !acceptedFileTypes.some((type) =>
                        file.type.match(type.replace('*', '.*'))
                    )
                ) {
                    continue
                }

                // Check file size if specified
                if (maxFileSize && file.size > maxFileSize) {
                    continue
                }

                validFiles.push(file)

                // If not multiple, only take the first valid file
                if (!multiple) {
                    break
                }
            }

            if (validFiles.length > 0 && onFileSelect) {
                onFileSelect(validFiles)
            }
        },
        [acceptedFileTypes, maxFileSize, multiple, onFileSelect, disabled]
    )

    const handleDragEnter = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return

            setDragCounter((prev) => {
                const newCounter = prev + 1
                if (
                    newCounter === 1 &&
                    e.dataTransfer.items &&
                    e.dataTransfer.items.length > 0
                ) {
                    setIsDragOver(true)
                }
                return newCounter
            })
        },
        [disabled]
    )

    const handleDragLeave = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return

            setDragCounter((prev) => {
                const newCounter = prev - 1
                if (newCounter === 0) {
                    setIsDragOver(false)
                }
                return newCounter
            })
        },
        [disabled]
    )

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return
        },
        [disabled]
    )

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return

            setIsDragOver(false)
            setDragCounter(0)

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFileSelect(e.dataTransfer.files)
            }
        },
        [handleFileSelect, disabled]
    )

    const hasUploadingFiles =
        uploadingFiles.length > 0 &&
        uploadingFiles.some((f) => f.status === UploadState.UPLOADING)

    const handleClick = useCallback(() => {
        if (
            disabled ||
            currentState === UploadState.UPLOADING ||
            hasUploadingFiles
        )
            return
        fileInputRef.current?.click()
    }, [disabled, currentState, hasUploadingFiles])

    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFileSelect(e.target.files)
            }
            // Reset the input value to allow selecting the same file again
            e.target.value = ''
        },
        [handleFileSelect]
    )

    const renderSlotContent = () => {
        return (
            <Block
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={uploadTokens?.slot?.gap?.[size] || '16px'}
            >
                {/* Custom slot content if provided */}
                {children}

                {/* Show uploaded files if any */}
                {uploadedFiles.length > 0 && (
                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap="8px"
                        marginBottom="16px"
                    >
                        <Text
                            as="span"
                            fontSize="16px"
                            fontWeight={600}
                            color="#374151"
                            textAlign="center"
                        >
                            Uploaded Files:
                        </Text>
                        {uploadedFiles.map((file, index) => (
                            <Text
                                key={index}
                                as="span"
                                fontSize="14px"
                                fontWeight={500}
                                color="#059669"
                                textAlign="center"
                            >
                                {file.name}
                            </Text>
                        ))}
                    </Block>
                )}

                {/* If uploading, show upload progress */}
                {hasUploadingFiles && (
                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap="12px"
                        width="100%"
                    >
                        {uploadingFiles
                            .filter((f) => f.status === UploadState.UPLOADING)
                            .map((uploadingFile) => (
                                <Block
                                    key={uploadingFile.id}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    gap="12px"
                                    width="100%"
                                >
                                    {/* Uploading filename with only filename in primary color */}
                                    <Text
                                        as="span"
                                        fontSize="16px"
                                        fontWeight={600}
                                        color="#374151"
                                        textAlign="center"
                                    >
                                        Uploading{' '}
                                        <Text
                                            as="span"
                                            fontSize="16px"
                                            fontWeight={600}
                                            color="#DC2626"
                                            textAlign="center"
                                        >
                                            '{uploadingFile.file.name}'
                                        </Text>
                                        ...
                                    </Text>

                                    {/* Description text */}
                                    <Text
                                        as="span"
                                        fontSize="14px"
                                        fontWeight={400}
                                        color="#6B7280"
                                        textAlign="center"
                                    >
                                        Please wait while you're uploading your
                                        file
                                    </Text>

                                    {/* Progress bar */}
                                    <Block marginTop="20px" width="100%">
                                        <ProgressBar
                                            value={uploadingFile.progress}
                                            size={getProgressBarSize(size)}
                                            showLabel={true}
                                        />
                                    </Block>
                                </Block>
                            ))}
                    </Block>
                )}

                {/* Always show the main title when not uploading */}
                {!hasUploadingFiles && (
                    <>
                        <Text
                            as="span"
                            fontSize="18px"
                            fontWeight={600}
                            color="#374151"
                            textAlign="center"
                        >
                            Choose a file or drag & drop it here
                        </Text>

                        {/* Custom description or default file constraints */}
                        <Text
                            as="span"
                            fontSize="14px"
                            fontWeight={400}
                            color="#6B7280"
                            textAlign="center"
                        >
                            {description || (
                                <>
                                    {acceptedFileTypes.length > 0 &&
                                        acceptedFileTypes.join(', ')}
                                    {acceptedFileTypes.length > 0 &&
                                        maxFileSize &&
                                        ' | '}
                                    {maxFileSize &&
                                        `Max size ${Math.round(maxFileSize / (1024 * 1024))} MB`}
                                </>
                            )}
                        </Text>

                        {/* Browse Files button - only show when not uploading */}
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            text="Browse Files"
                            onClick={() => {
                                fileInputRef.current?.click()
                            }}
                            disabled={disabled}
                        />
                    </>
                )}
            </Block>
        )
    }

    const displayState = isDragOver ? UploadState.UPLOADING : currentState

    return (
        <Block className={className} {...rest}>
            <Block
                display="flex"
                flexDirection="column"
                border={
                    uploadTokens?.container?.border?.[displayState] ||
                    '1px dashed #d1d5db'
                }
                borderRadius={
                    uploadTokens?.container?.borderRadius?.[size] || '12px'
                }
                backgroundColor={
                    uploadTokens?.container?.backgroundColor?.[displayState] ||
                    '#ffffff'
                }
                padding={uploadTokens?.container?.padding?.[size] || '32px'}
                cursor={
                    uploadTokens?.container?.cursor?.[displayState] || 'pointer'
                }
                style={{
                    transition:
                        uploadTokens?.transition || 'all 0.2s ease-in-out',
                }}
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {renderSlotContent()}

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={multiple}
                    accept={acceptedFileTypes.join(',')}
                    onChange={handleFileInputChange}
                    style={{
                        display: 'none',
                    }}
                />
            </Block>
        </Block>
    )
}

Upload.displayName = 'Upload'

export default Upload

import React, { useRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Button, ButtonType, ButtonSize } from '../Button'
import { ProgressBar, ProgressBarSize } from '../ProgressBar'
import { UploadSize, UploadState } from './types'
import type { UploadProps } from './types'
import type { UploadTokenType } from './upload.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    useUploadState,
    getVisualState,
    validateFile,
    processFiles,
    updateDragState,
    createDragHandlers,
    createClickHandler,
    createFileInputChangeHandler,
    getUploadContent,
    getMainTitle,
} from './utils'

const UploadingState: React.FC<{
    uploadingFile: { file: File; progress: number }
    children?: React.ReactNode
    size: UploadSize
    uploadTokens: UploadTokenType
}> = ({ uploadingFile, children, size, uploadTokens }) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens?.slot?.gap?.[size]}
    >
        {children && (
            <Block
                width="32px"
                height="32px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Text
            as="span"
            fontSize={uploadTokens?.text?.title?.fontSize?.[size]}
            fontWeight={uploadTokens?.text?.title?.fontWeight?.[size]}
            color={uploadTokens?.text?.filename?.color?.[UploadState.IDLE]}
            textAlign="center"
        >
            Uploading{' '}
            <Text
                as="span"
                fontSize={uploadTokens?.text?.title?.fontSize?.[size]}
                fontWeight={uploadTokens?.text?.title?.fontWeight?.[size]}
                color={
                    uploadTokens?.text?.title?.color?.[UploadState.UPLOADING]
                }
            >
                '{uploadingFile.file.name}'
            </Text>
            ...
        </Text>

        <Text
            as="span"
            fontSize={uploadTokens?.text?.description?.fontSize?.[size]}
            fontWeight={uploadTokens?.text?.description?.fontWeight?.[size]}
            color={
                uploadTokens?.text?.description?.color?.[UploadState.UPLOADING]
            }
            textAlign="center"
        >
            Please wait while you're uploading your file
        </Text>

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
    uploadedFile: File
    children?: React.ReactNode
    size: UploadSize
    uploadTokens: UploadTokenType
}> = ({ uploadedFile, children, size, uploadTokens }) => (
    <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={uploadTokens?.slot?.gap?.[size]}
    >
        {children && (
            <Block
                width="32px"
                height="32px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Text
            as="span"
            fontSize={uploadTokens?.text?.title?.fontSize?.[size]}
            fontWeight={uploadTokens?.text?.title?.fontWeight?.[size]}
            color={uploadTokens?.text?.title?.color?.[UploadState.SUCCESS]}
            textAlign="center"
        >
            Uploaded '{uploadedFile.name}'
        </Text>
    </Block>
)

const DefaultState: React.FC<{
    children?: React.ReactNode
    size: UploadSize
    state: UploadState
    description?: string
    isDragActive: boolean
    isDragAccept: boolean
    disabled: boolean
    uploadTokens: UploadTokenType
}> = ({
    children,
    size,
    state,
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
        gap={uploadTokens?.slot?.gap?.[size]}
    >
        {children && (
            <Block
                width="32px"
                height="32px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </Block>
        )}

        <Text
            as="span"
            fontSize={uploadTokens?.text?.title?.fontSize?.[size]}
            fontWeight={uploadTokens?.text?.title?.fontWeight?.[size]}
            color={uploadTokens?.text?.filename?.color?.[state]}
            textAlign="center"
        >
            {getMainTitle(isDragActive, isDragAccept)}
        </Text>

        {description && !isDragActive && (
            <Text
                as="span"
                fontSize={uploadTokens?.text?.description?.fontSize?.[size]}
                fontWeight={uploadTokens?.text?.description?.fontWeight?.[size]}
                color={uploadTokens?.text?.description?.color?.[state]}
                textAlign="center"
            >
                {description}
            </Text>
        )}

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
    size = UploadSize.MEDIUM,
    multiple = false,
    accept = [],
    maxSize,
    maxFiles = multiple ? undefined : 1,
    disabled = false,
    children,
    description,
    className,
    state = UploadState.IDLE,
    uploadingFiles = [],
    uploadedFiles = [],
    onDrop,
    onDropAccepted,
    onDropRejected,
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

    const visualState = getVisualState(
        disabled,
        isDragReject,
        isDragAccept,
        isDragActive
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

    const { hasUploadingFiles, uploadingFile, uploadedFile, isSuccess } =
        getUploadContent(uploadingFiles, uploadedFiles, state)

    const renderContent = () => {
        if (hasUploadingFiles && uploadingFile) {
            return (
                <UploadingState
                    uploadingFile={uploadingFile}
                    children={children}
                    size={size}
                    uploadTokens={uploadTokens}
                />
            )
        }

        if (isSuccess && uploadedFile) {
            return (
                <SuccessState
                    uploadedFile={uploadedFile}
                    children={children}
                    size={size}
                    uploadTokens={uploadTokens}
                />
            )
        }

        return (
            <DefaultState
                children={children}
                size={size}
                state={state}
                description={description}
                isDragActive={isDragActive}
                isDragAccept={isDragAccept}
                disabled={disabled}
                uploadTokens={uploadTokens}
            />
        )
    }

    return (
        <Block className={className} {...rest}>
            <Block
                display="flex"
                flexDirection="column"
                border={
                    uploadTokens?.container?.border?.[
                        visualState as keyof typeof uploadTokens.container.border
                    ]
                }
                borderRadius={uploadTokens?.container?.borderRadius?.[size]}
                backgroundColor={
                    uploadTokens?.container?.backgroundColor?.[
                        visualState as keyof typeof uploadTokens.container.backgroundColor
                    ]
                }
                padding={uploadTokens?.container?.padding?.[size]}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                style={{ transition: uploadTokens?.transition }}
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

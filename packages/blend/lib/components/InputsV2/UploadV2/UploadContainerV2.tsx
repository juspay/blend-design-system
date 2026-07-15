import React, { useMemo, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import { ButtonV2, ButtonV2Size, ButtonV2Type } from '../../ButtonV2'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { CaretDownIcon, CaretUpIcon, SwapIcon } from '@phosphor-icons/react'
import Text from '../../Text/Text'
import type { UploadV2TokensType } from './UploadV2.tokens.types'
import {
    TagV2,
    TagV2Color,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
} from '../../TagV2'
import { XIcon } from '@phosphor-icons/react'
import TooltipV2 from '../../TooltipV2/TooltipV2'
import PopoverV2 from '../../PopoverV2/PopoverV2'
import { PopoverV2Align, PopoverV2Side } from '../../PopoverV2/popoverV2.types'
import {
    getFileId,
    getValidationMessage,
    normalizeUploadErrorReason,
    truncateFileNameForTag,
} from './utils'
import { UploadDragState, UploadFileV2, UploadState } from './UploadV2.types'
import {
    ProgressBarV2,
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '../../ProgressBarV2'

const UploadContainerV2 = ({
    description,
    descriptionId,
    slot,
    disabled,
    onClick,
    tokens,
    files,
    onFileRemove,
    multiple,
    state,
    errorText = '',
    errorId,
    progressBarValue,
    progressBarMaxWidth,
    uploadHeaderText,
    dragState,
    maxSize,
    maxFiles,
}: {
    description: string
    descriptionId?: string
    slot: React.ReactNode
    disabled: boolean
    onClick: () => void
    tokens: UploadV2TokensType
    files: UploadFileV2[]
    onFileRemove: (fileId: string) => void
    multiple: boolean
    state: UploadState
    errorText: string
    errorId?: string
    progressBarValue: number
    progressBarMaxWidth: string
    uploadHeaderText: string
    dragState: UploadDragState
    maxSize?: number
    maxFiles?: number
}) => {
    const [isOverflowPopoverOpen, setIsOverflowPopoverOpen] = useState(false)
    const isUploading = state === UploadState.UPLOADING
    const isSuccess = state === UploadState.SUCCESS
    const isInteractionBlocked = isUploading || isSuccess
    const { uploadContainer } = tokens
    const showEmptyDescription = files.length === 0 && !isUploading
    const showSingleFileInfo = files.length > 0 && !multiple && !isUploading
    const showBrowseButton = files.length === 0 && !isUploading
    const showReplaceButton = files.length > 0 && !multiple && !isUploading
    const showMultiFileTags = files.length > 0 && multiple && !isUploading
    const validFileCount = files.filter((file) => file.isValid).length
    const invalidFileCount = files.length - validFileCount
    const showFilledMultiFileCopy = showMultiFileTags
    const headerText = showFilledMultiFileCopy
        ? invalidFileCount > 0
            ? 'Files uploaded'
            : 'Files successfully added'
        : uploadHeaderText
    const filledMultiFileDescription =
        invalidFileCount > 0
            ? `${validFileCount} succeeded, ${invalidFileCount} failed`
            : "We've successfully uploaded the following files"
    const isDragEnter = dragState === UploadDragState.DRAG_ENTER
    const isDragOver = dragState === UploadDragState.DRAG_OVER
    const isDrop = dragState === UploadDragState.DROP
    const isDragActive = isDragEnter || isDragOver || isDrop
    const sortedFiles = useMemo(
        () =>
            [...files].sort((a, b) => {
                if (!a.isValid && b.isValid) return -1
                if (a.isValid && !b.isValid) return 1
                return 0
            }),
        [files]
    )
    const visibleFiles = sortedFiles.slice(0, 4)
    const overflowFiles = sortedFiles.slice(4)

    const renderFileTag = (uploadFile: UploadFileV2, index: number) => {
        const fileId = getFileId(uploadFile, index)
        const fileColor =
            state === UploadState.SUCCESS
                ? TagV2Color.SUCCESS
                : uploadFile.isValid
                  ? TagV2Color.NEUTRAL
                  : TagV2Color.ERROR
        const tooltipContent = uploadFile.isValid
            ? uploadFile.file.name
            : `${uploadFile.file.name} - ${getValidationMessage(
                  uploadFile.errorReason,
                  maxSize,
                  maxFiles
              )}`

        return (
            <TooltipV2 content={tooltipContent} key={fileId}>
                <TagV2
                    aria-label={`Remove ${uploadFile.file.name}`}
                    rightSlot={{ slot: <XIcon size={14} /> }}
                    text={truncateFileNameForTag(uploadFile.file.name)}
                    size={TagV2Size.SM}
                    type={TagV2Type.SUBTLE}
                    subType={TagV2SubType.ROUNDED}
                    color={fileColor}
                    onClick={(e) => {
                        if (disabled || isInteractionBlocked) return
                        e.stopPropagation()
                        onFileRemove?.(fileId)
                    }}
                />
            </TooltipV2>
        )
    }

    const renderOverflowFileRow = (uploadFile: UploadFileV2, index: number) => {
        const fileId = getFileId(uploadFile, index)

        return (
            <Block
                key={fileId}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={uploadContainer.gap}
                width="100%"
            >
                <Text
                    fontSize={uploadContainer.header.description.fontSize}
                    fontWeight={uploadContainer.header.description.fontWeight}
                    color={uploadContainer.header.title.color}
                    truncate
                >
                    {uploadFile.file.name}
                </Text>
                <Block
                    display="flex"
                    alignItems="center"
                    gap={uploadContainer.gap}
                    flexShrink={0}
                >
                    {!uploadFile.isValid && (
                        <TagV2
                            text="Failed"
                            size={TagV2Size.SM}
                            type={TagV2Type.SUBTLE}
                            subType={TagV2SubType.ROUNDED}
                            color={TagV2Color.ERROR}
                        />
                    )}
                    <PrimitiveButton
                        aria-label={`Remove ${uploadFile.file.name}`}
                        onClick={(e) => {
                            if (disabled || isInteractionBlocked) return
                            e.stopPropagation()
                            onFileRemove?.(fileId)
                        }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="transparent"
                        border="none"
                        padding="0"
                        cursor={
                            disabled || isInteractionBlocked
                                ? 'not-allowed'
                                : 'pointer'
                        }
                    >
                        <XIcon size={18} />
                    </PrimitiveButton>
                </Block>
            </Block>
        )
    }

    return (
        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={uploadContainer.gap}
            paddingTop={uploadContainer.paddingTop}
            paddingBottom={uploadContainer.paddingBottom}
            paddingLeft={uploadContainer.paddingLeft}
            paddingRight={uploadContainer.paddingRight}
            borderRadius={uploadContainer.borderRadius}
            border={
                isDragActive
                    ? uploadContainer.border[dragState]
                    : uploadContainer.border[state]
            }
            backgroundColor={
                isDragActive
                    ? uploadContainer.backgroundColor[dragState]
                    : uploadContainer.backgroundColor[state]
            }
        >
            {slot && !showFilledMultiFileCopy && <Block>{slot}</Block>}
            <Block
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={uploadContainer.header.gap}
            >
                <Text
                    fontSize={uploadContainer.header.title.fontSize}
                    fontWeight={uploadContainer.header.title.fontWeight}
                    color={uploadContainer.header.title.color}
                    textAlign="center"
                >
                    {headerText}
                </Text>
                {(showEmptyDescription || showFilledMultiFileCopy) && (
                    <Text
                        id={showEmptyDescription ? descriptionId : undefined}
                        fontSize={uploadContainer.header.description.fontSize}
                        fontWeight={
                            uploadContainer.header.description.fontWeight
                        }
                        color={uploadContainer.header.description.color}
                        textAlign="center"
                    >
                        {showFilledMultiFileCopy
                            ? filledMultiFileDescription
                            : description}
                    </Text>
                )}
                {showSingleFileInfo && (
                    <Text
                        fontSize={uploadContainer.header.description.fontSize}
                        fontWeight={
                            uploadContainer.header.description.fontWeight
                        }
                        color={uploadContainer.header.description.color}
                        textAlign="center"
                    >
                        {'Selected file: ' + files[0].file.name}
                    </Text>
                )}
                {isUploading && (
                    <Block width="100%" maxWidth={progressBarMaxWidth}>
                        <Text
                            fontSize={
                                uploadContainer.header.description.fontSize
                            }
                            fontWeight={
                                uploadContainer.header.description.fontWeight
                            }
                            color={uploadContainer.header.title.color}
                            textAlign="center"
                        >
                            {'Please wait while uploading'}
                        </Text>
                    </Block>
                )}
            </Block>
            {isUploading && (
                <Block width="100%" maxWidth={progressBarMaxWidth}>
                    <ProgressBarV2
                        value={progressBarValue}
                        size={ProgressBarV2Size.SM}
                        variant={ProgressBarV2Variant.LINEAR}
                        appearance={ProgressBarV2Appearance.SOLID}
                        showLabel={true}
                    />
                </Block>
            )}
            {showBrowseButton && !isInteractionBlocked && (
                <ButtonV2
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.MEDIUM}
                    text="Browse Files"
                    disabled={disabled}
                    onClick={(e) => {
                        e.stopPropagation()
                        onClick()
                    }}
                />
            )}
            {showReplaceButton && !isInteractionBlocked && (
                <ButtonV2
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.MEDIUM}
                    text="Replace File"
                    disabled={disabled}
                    onClick={(e) => {
                        e.stopPropagation()
                        onClick()
                    }}
                    leftSlot={{ slot: <SwapIcon size={16} /> }}
                />
            )}

            {/* for multiple files, show a list of files */}

            {showMultiFileTags && (
                <Block
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    flexWrap="wrap"
                    gap="10px"
                    width="100%"
                >
                    {visibleFiles.map((uploadFile) =>
                        renderFileTag(uploadFile, files.indexOf(uploadFile))
                    )}
                    {overflowFiles.length > 0 && (
                        <PopoverV2
                            open={isOverflowPopoverOpen}
                            onOpenChange={setIsOverflowPopoverOpen}
                            trigger={
                                <PrimitiveButton
                                    aria-label={`Show ${overflowFiles.length} more files`}
                                    onClick={(e) => e.stopPropagation()}
                                    display="flex"
                                    backgroundColor="transparent"
                                    border="none"
                                    padding="0"
                                    cursor="pointer"
                                    width="fit-content"
                                >
                                    <TagV2
                                        text={`+ ${overflowFiles.length}`}
                                        size={TagV2Size.SM}
                                        type={TagV2Type.SUBTLE}
                                        subType={TagV2SubType.ROUNDED}
                                        color={TagV2Color.NEUTRAL}
                                        rightSlot={{
                                            slot: isOverflowPopoverOpen ? (
                                                <CaretUpIcon size={16} />
                                            ) : (
                                                <CaretDownIcon size={16} />
                                            ),
                                        }}
                                    />
                                </PrimitiveButton>
                            }
                            minWidth={240}
                            maxWidth={340}
                            maxHeight={280}
                            showCloseButton={false}
                            asModal={true}
                            side={PopoverV2Side.BOTTOM}
                            align={PopoverV2Align.CENTER}
                        >
                            <Block
                                display="flex"
                                flexDirection="column"
                                gap={uploadContainer.gap}
                                padding={uploadContainer.gap}
                                overflow="auto"
                            >
                                {overflowFiles.map((uploadFile) =>
                                    renderOverflowFileRow(
                                        uploadFile,
                                        files.indexOf(uploadFile)
                                    )
                                )}
                            </Block>
                        </PopoverV2>
                    )}
                </Block>
            )}
            {state === UploadState.ERROR && !errorText && !multiple && (
                <Text
                    id={errorId}
                    role="alert"
                    aria-live="polite"
                    fontSize={uploadContainer.header.errorText.fontSize}
                    fontWeight={uploadContainer.header.errorText.fontWeight}
                    color={uploadContainer.header.errorText.color}
                >
                    {(() => {
                        const invalidFiles = files.filter((f) => !f.isValid)
                        const hasOversized = invalidFiles.some(
                            (f) =>
                                normalizeUploadErrorReason(f.errorReason) ===
                                'oversized'
                        )
                        const hasMaxFiles = invalidFiles.some(
                            (f) =>
                                normalizeUploadErrorReason(f.errorReason) ===
                                'maxFiles'
                        )
                        const hasInvalidType = invalidFiles.some(
                            (f) =>
                                normalizeUploadErrorReason(f.errorReason) ===
                                'invalidType'
                        )
                        const errors: string[] = []
                        if (hasOversized)
                            errors.push(
                                getValidationMessage(
                                    'oversized',
                                    maxSize,
                                    maxFiles
                                )
                            )
                        if (hasMaxFiles)
                            errors.push(
                                getValidationMessage(
                                    'maxFiles',
                                    maxSize,
                                    maxFiles
                                )
                            )
                        if (hasInvalidType)
                            errors.push(
                                getValidationMessage(
                                    'invalidType',
                                    maxSize,
                                    maxFiles
                                )
                            )
                        return errors.length > 0
                            ? `${errors.join(', ')}`
                            : getValidationMessage(undefined, maxSize, maxFiles)
                    })()}
                </Text>
            )}
            {errorText && (
                <Text
                    id={errorId}
                    role="alert"
                    aria-live="polite"
                    fontSize={uploadContainer.header.errorText.fontSize}
                    fontWeight={uploadContainer.header.errorText.fontWeight}
                    color={uploadContainer.header.errorText.color}
                >
                    {errorText}
                </Text>
            )}
        </Block>
    )
}

export default UploadContainerV2

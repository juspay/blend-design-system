import React from 'react'
import Block from '../../Primitives/Block/Block'
import { ButtonV2, ButtonV2Size, ButtonV2Type } from '../../ButtonV2'
import { SwapIcon } from '@phosphor-icons/react/dist/ssr/Swap'
import Text from '../../Text/Text'
import { UploadV2TokensType } from './UploadV2.tokens'
import {
    TagV2,
    TagV2Color,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
} from '../../TagV2'
import { XIcon } from '@phosphor-icons/react'
import TooltipV2 from '../../TooltipV2/TooltipV2'
import { truncateFileNameForTag } from './utils'
import { UploadDragState, UploadFileV2, UploadState } from './UploadV2.types'
import {
    ProgressBarV2,
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '../../ProgressBarV2'

const getValidationMessage = (reason?: UploadFileV2['errorReason']) => {
    switch (reason) {
        case 'oversized':
            return 'File is too large'
        case 'maxFiles':
            return 'File limit exceeded'
        case 'invalidType':
            return 'Invalid file type'
        default:
            return 'Invalid file'
    }
}

const UploadContainerV2 = ({
    description,
    slot,
    disabled,
    onClick,
    tokens,
    files,
    onFileRemove,
    multiple,
    state,
    errorText = '',
    progressBarValue,
    progressBarMaxWidth,
    uploadHeaderText,
    dragState,
}: {
    description: string
    slot: React.ReactNode
    disabled: boolean
    onClick: () => void
    tokens: UploadV2TokensType
    files: UploadFileV2[]
    onFileRemove: (fileName: string) => void
    multiple: boolean
    state: UploadState
    errorText: string
    progressBarValue: number
    progressBarMaxWidth: string
    uploadHeaderText: string
    dragState: UploadDragState
}) => {
    const isUploading = state === UploadState.UPLOADING
    const isSuccess = state === UploadState.SUCCESS
    const isInteractionBlocked = isUploading || isSuccess
    const { uploadContainer } = tokens
    const showEmptyDescription = files.length === 0 && !isUploading
    const showSingleFileInfo = files.length > 0 && !multiple && !isUploading
    const showBrowseButton = files.length === 0 && !isUploading
    const showReplaceButton = files.length > 0 && !multiple && !isUploading
    const showMultiFileTags = files.length > 0 && multiple && !isUploading
    const isDragEnter = dragState === UploadDragState.DRAG_ENTER
    const isDragLeave = dragState === UploadDragState.DRAG_LEAVE
    const isDragOver = dragState === UploadDragState.DRAG_OVER
    const isDrop = dragState === UploadDragState.DROP
    const isDragActive = isDragEnter || isDragOver || isDrop

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
            {slot && <Block>{slot}</Block>}
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
                    {uploadHeaderText}
                </Text>
                {showEmptyDescription && (
                    <Text
                        fontSize={uploadContainer.header.description.fontSize}
                        fontWeight={
                            uploadContainer.header.description.fontWeight
                        }
                        color={uploadContainer.header.description.color}
                        textAlign="center"
                    >
                        {description}
                    </Text>
                )}
                {showSingleFileInfo && state !== UploadState.SUCCESS && (
                    <Text
                        fontSize={uploadContainer.header.description.fontSize}
                        fontWeight={
                            uploadContainer.header.description.fontWeight
                        }
                        color={
                            files[0].isValid
                                ? uploadContainer.header.description.color
                                : uploadContainer.header.title.color
                        }
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

            {showMultiFileTags && !isInteractionBlocked && (
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={uploadContainer.fileTag.gap}
                    width={uploadContainer.fileTag.maxWidth}
                >
                    {files.map((uploadFile) => {
                        const fileColor = uploadFile.isValid
                            ? TagV2Color.PRIMARY
                            : TagV2Color.ERROR
                        const tooltipContent = uploadFile.isValid
                            ? uploadFile.file.name
                            : `${uploadFile.file.name} - ${getValidationMessage(
                                  uploadFile.errorReason
                              )}`
                        return (
                            <TooltipV2
                                content={tooltipContent}
                                key={uploadFile.file.name}
                            >
                                <TagV2
                                    rightSlot={{ slot: <XIcon size={16} /> }}
                                    text={truncateFileNameForTag(
                                        uploadFile.file.name
                                    )}
                                    size={TagV2Size.MD}
                                    type={TagV2Type.SUBTLE}
                                    subType={TagV2SubType.ROUNDED}
                                    color={fileColor}
                                    onClick={(e) => {
                                        if (disabled) return
                                        e.stopPropagation()
                                        onFileRemove?.(uploadFile.file.name)
                                    }}
                                />
                            </TooltipV2>
                        )
                    })}
                </Block>
            )}
            {state === UploadState.ERROR && !errorText && !multiple && (
                <Text
                    fontSize={uploadContainer.header.errorText.fontSize}
                    fontWeight={uploadContainer.header.errorText.fontWeight}
                    color={uploadContainer.header.errorText.color}
                >
                    {(() => {
                        const invalidFiles = files.filter((f) => !f.isValid)
                        const hasOversized = invalidFiles.some(
                            (f) => f.errorReason === 'oversized'
                        )
                        const hasMaxFiles = invalidFiles.some(
                            (f) => f.errorReason === 'maxFiles'
                        )
                        const hasInvalidType = invalidFiles.some(
                            (f) => f.errorReason === 'invalidType'
                        )
                        const errors: string[] = []
                        if (hasOversized)
                            errors.push(getValidationMessage('oversized'))
                        if (hasMaxFiles)
                            errors.push(getValidationMessage('maxFiles'))
                        if (hasInvalidType)
                            errors.push(getValidationMessage('invalidType'))
                        return errors.length > 0
                            ? `${errors.join(', ')}`
                            : getValidationMessage()
                    })()}
                </Text>
            )}
            {errorText && (
                <Text
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

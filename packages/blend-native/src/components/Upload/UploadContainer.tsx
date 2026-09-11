import { useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ChevronDown, ChevronUp, Repeat2, X } from 'lucide-react-native'
import {
    ButtonV2Size,
    ButtonV2Type,
    TagV2Color,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
    UploadState,
    type UploadV2TokensType,
} from '@juspay/blend-design-system/node'
import { Block } from '../../primitives/Block'
import { Text } from '../../primitives/Text'
import { Button } from '../Button'
import { Tag } from '../Tag'
import { Tooltip } from '../Tooltip'
import { Popover } from '../Popover'
import { ProgressBar } from '../ProgressBar'
import type { UploadFileNativeItem } from './upload.types'
import {
    getAggregatedErrorMessage,
    getFileId,
    getValidationMessage,
    truncateFileNameForTag,
} from './upload.utils'

/** Web's `progressBarMaxWidth` default; there is no native prop for it. */
const PROGRESS_MAX_WIDTH = 300

/**
 * The presentational drop zone — a port of web's `UploadContainerV2`.
 *
 * Everything visual resolves from the `uploadContainer` token group passed
 * down by `Upload`; this component owns no tokens and no state derivation,
 * only the overflow popover's open flag.
 *
 * Divergences from web, all documented in the plan:
 *
 * - The drop zone is a `Pressable` firing `onBrowse` — no drag handlers, no
 *   hidden file input.
 * - File tags wrap the native `Tooltip` (long-press) instead of `TooltipV2`.
 * - The `+N` overflow surface is the native `Popover` — a BottomSheet on
 *   phones (`sm`), the established native Popover behaviour.
 */
export type UploadContainerProps = {
    tokens: UploadV2TokensType
    files: UploadFileNativeItem[]
    onFileRemove: (fileId: string) => void
    onBrowse?: () => void
    multiple: boolean
    state: UploadState
    disabled: boolean
    description: string
    slot?: React.ReactNode
    errorText?: string
    progressBarValue?: number
    uploadHeaderText: string
    maxSize?: number
    maxFiles?: number
    testID?: string
}

export function UploadContainer({
    tokens,
    files,
    onFileRemove,
    onBrowse,
    multiple,
    state,
    disabled,
    description = '',
    slot,
    errorText,
    progressBarValue = 0,
    uploadHeaderText,
    maxSize,
    maxFiles,
    testID,
}: UploadContainerProps) {
    const [isOverflowPopoverOpen] = useState(false)
    const { uploadContainer } = tokens
    const isUploading = state === UploadState.UPLOADING
    const isSuccess = state === UploadState.SUCCESS
    const isInteractionBlocked = isUploading || isSuccess

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

    // Invalid files first, exactly web's sort; the first four render as
    // tags, the rest collapse behind the `+N` overflow trigger.
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

    const handleBrowse = () => {
        if (disabled || isInteractionBlocked) return
        onBrowse?.()
    }

    const renderFileTag = (uploadFile: UploadFileNativeItem, index: number) => {
        const fileId = getFileId(uploadFile, index)
        const fileColor = isSuccess
            ? TagV2Color.SUCCESS
            : uploadFile.isValid
              ? TagV2Color.NEUTRAL
              : TagV2Color.ERROR
        const tooltipContent = uploadFile.isValid
            ? uploadFile.name
            : `${uploadFile.name} - ${getValidationMessage(
                  uploadFile.errorReason,
                  maxSize,
                  maxFiles
              )}`

        return (
            <Tooltip
                key={fileId}
                content={tooltipContent}
                testID={testID ? `${testID}-file-tooltip` : undefined}
            >
                <Tag
                    accessibilityLabel={`Remove ${uploadFile.name}`}
                    rightSlot={{ slot: <X size={14} /> }}
                    text={truncateFileNameForTag(uploadFile.name)}
                    size={TagV2Size.SM}
                    type={TagV2Type.SUBTLE}
                    subType={TagV2SubType.ROUNDED}
                    color={fileColor}
                    onPress={() => {
                        if (disabled || isInteractionBlocked) return
                        onFileRemove(fileId)
                    }}
                    testID={testID ? `${testID}-file-tag` : undefined}
                />
            </Tooltip>
        )
    }

    const renderOverflowFileRow = (
        uploadFile: UploadFileNativeItem,
        index: number
    ) => {
        const fileId = getFileId(uploadFile, index)
        return (
            <Block
                key={fileId}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                gap={uploadContainer.gap as string | number}
                width="100%"
            >
                <Text
                    fontSize={uploadContainer.header.description.fontSize}
                    fontWeight={uploadContainer.header.description.fontWeight}
                    color={String(uploadContainer.header.title.color)}
                    numberOfLines={1}
                    style={{ flexShrink: 1 }}
                >
                    {uploadFile.name}
                </Text>
                <Block
                    flexDirection="row"
                    alignItems="center"
                    gap={uploadContainer.gap as string | number}
                    style={{ flexShrink: 0 }}
                >
                    {!uploadFile.isValid && (
                        <Tag
                            text="Failed"
                            size={TagV2Size.SM}
                            type={TagV2Type.SUBTLE}
                            subType={TagV2SubType.ROUNDED}
                            color={TagV2Color.ERROR}
                        />
                    )}
                    <Pressable
                        accessibilityLabel={`Remove ${uploadFile.name}`}
                        onPress={() => {
                            if (disabled || isInteractionBlocked) return
                            onFileRemove(fileId)
                        }}
                        hitSlop={8}
                        testID={
                            testID ? `${testID}-overflow-remove` : undefined
                        }
                    >
                        <X size={18} />
                    </Pressable>
                </Block>
            </Block>
        )
    }

    return (
        <Pressable
            onPress={handleBrowse}
            disabled={disabled || isInteractionBlocked}
            accessibilityRole="button"
            accessibilityLabel={uploadHeaderText}
            accessibilityState={{ disabled: disabled || isInteractionBlocked }}
            testID={testID ? `${testID}-dropzone` : undefined}
            style={{
                borderWidth: 0,
            }}
        >
            <Block
                flexDirection="column"
                alignItems="center"
                gap={uploadContainer.gap as string | number}
                paddingTop={uploadContainer.paddingTop as string | number}
                paddingBottom={uploadContainer.paddingBottom as string | number}
                paddingLeft={uploadContainer.paddingLeft as string | number}
                paddingRight={uploadContainer.paddingRight as string | number}
                borderRadius={uploadContainer.borderRadius as string | number}
                border={String(uploadContainer.border[state])}
                backgroundColor={String(uploadContainer.backgroundColor[state])}
                width="100%"
            >
                {slot && !showFilledMultiFileCopy && <View>{slot}</View>}
                <Block
                    flexDirection="column"
                    alignItems="center"
                    gap={uploadContainer.header.gap as string | number}
                >
                    <Text
                        fontSize={uploadContainer.header.title.fontSize}
                        fontWeight={uploadContainer.header.title.fontWeight}
                        color={String(uploadContainer.header.title.color)}
                        textAlign="center"
                    >
                        {headerText}
                    </Text>
                    {(showEmptyDescription || showFilledMultiFileCopy) && (
                        <Text
                            fontSize={
                                uploadContainer.header.description.fontSize
                            }
                            fontWeight={
                                uploadContainer.header.description.fontWeight
                            }
                            color={String(
                                uploadContainer.header.description.color
                            )}
                            textAlign="center"
                        >
                            {showFilledMultiFileCopy
                                ? filledMultiFileDescription
                                : description}
                        </Text>
                    )}
                    {showSingleFileInfo && (
                        <Text
                            fontSize={
                                uploadContainer.header.description.fontSize
                            }
                            fontWeight={
                                uploadContainer.header.description.fontWeight
                            }
                            color={String(
                                uploadContainer.header.description.color
                            )}
                            textAlign="center"
                        >
                            {'Selected file: ' + files[0].name}
                        </Text>
                    )}
                    {isUploading && (
                        <Block width="100%" maxWidth={PROGRESS_MAX_WIDTH}>
                            <Text
                                fontSize={
                                    uploadContainer.header.description.fontSize
                                }
                                fontWeight={
                                    uploadContainer.header.description
                                        .fontWeight
                                }
                                color={String(
                                    uploadContainer.header.title.color
                                )}
                                textAlign="center"
                            >
                                {'Please wait while uploading'}
                            </Text>
                        </Block>
                    )}
                </Block>
                {isUploading && (
                    <Block width="100%" maxWidth={PROGRESS_MAX_WIDTH}>
                        <ProgressBar
                            value={progressBarValue}
                            showLabel={true}
                        />
                    </Block>
                )}
                {showBrowseButton && !isInteractionBlocked && (
                    <Button
                        buttonType={ButtonV2Type.SECONDARY}
                        size={ButtonV2Size.MEDIUM}
                        text="Browse Files"
                        disabled={disabled}
                        onPress={handleBrowse}
                        testID={testID ? `${testID}-browse` : undefined}
                    />
                )}
                {showReplaceButton && !isInteractionBlocked && (
                    <Button
                        buttonType={ButtonV2Type.SECONDARY}
                        size={ButtonV2Size.MEDIUM}
                        text="Replace File"
                        disabled={disabled}
                        onPress={handleBrowse}
                        leftSlot={{ slot: <Repeat2 size={16} /> }}
                        testID={testID ? `${testID}-replace` : undefined}
                    />
                )}

                {showMultiFileTags && (
                    <Block
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        gap="10px"
                        width="100%"
                        style={{ flexWrap: 'wrap' }}
                    >
                        {visibleFiles.map((uploadFile) =>
                            renderFileTag(uploadFile, files.indexOf(uploadFile))
                        )}
                        {overflowFiles.length > 0 && (
                            <Popover
                                trigger={
                                    <Tag
                                        accessibilityLabel={`Show ${overflowFiles.length} more files`}
                                        text={`+ ${overflowFiles.length}`}
                                        size={TagV2Size.SM}
                                        type={TagV2Type.SUBTLE}
                                        subType={TagV2SubType.ROUNDED}
                                        color={TagV2Color.NEUTRAL}
                                        rightSlot={{
                                            slot: isOverflowPopoverOpen ? (
                                                <ChevronUp size={16} />
                                            ) : (
                                                <ChevronDown size={16} />
                                            ),
                                        }}
                                        testID={
                                            testID
                                                ? `${testID}-overflow-trigger`
                                                : undefined
                                        }
                                    />
                                }
                                minWidth={240}
                                maxWidth={340}
                                maxHeight={280}
                                showCloseButton={false}
                                testID={
                                    testID ? `${testID}-overflow` : undefined
                                }
                            >
                                <Block
                                    flexDirection="column"
                                    gap={uploadContainer.gap as string | number}
                                    paddingTop={
                                        uploadContainer.gap as string | number
                                    }
                                    paddingBottom={
                                        uploadContainer.gap as string | number
                                    }
                                    paddingLeft={
                                        uploadContainer.gap as string | number
                                    }
                                    paddingRight={
                                        uploadContainer.gap as string | number
                                    }
                                    style={{ overflow: 'scroll' }}
                                >
                                    {overflowFiles.map((uploadFile) =>
                                        renderOverflowFileRow(
                                            uploadFile,
                                            files.indexOf(uploadFile)
                                        )
                                    )}
                                </Block>
                            </Popover>
                        )}
                    </Block>
                )}
                {state === UploadState.ERROR && !errorText && !multiple && (
                    <Text
                        accessibilityLiveRegion="polite"
                        fontSize={uploadContainer.header.errorText.fontSize}
                        fontWeight={uploadContainer.header.errorText.fontWeight}
                        color={String(uploadContainer.header.errorText.color)}
                        textAlign="center"
                    >
                        {getAggregatedErrorMessage(files, maxSize, maxFiles)}
                    </Text>
                )}
                {errorText && (
                    <Text
                        accessibilityLiveRegion="polite"
                        fontSize={uploadContainer.header.errorText.fontSize}
                        fontWeight={uploadContainer.header.errorText.fontWeight}
                        color={String(uploadContainer.header.errorText.color)}
                        textAlign="center"
                    >
                        {errorText}
                    </Text>
                )}
            </Block>
        </Pressable>
    )
}

UploadContainer.displayName = 'UploadContainer'

export default UploadContainer

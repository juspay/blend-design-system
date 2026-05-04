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
import { UploadFileV2, UploadState } from './UploadV2.types'

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
}) => {
    const { uploadContainer } = tokens
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
            border={uploadContainer.border[state]}
            backgroundColor={uploadContainer.backgroundColor[state]}
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
                >
                    {'Choose a file or drag & drop it here'}
                </Text>
                {files.length === 0 && (
                    <Text
                        fontSize={uploadContainer.header.description.fontSize}
                        fontWeight={
                            uploadContainer.header.description.fontWeight
                        }
                        color={uploadContainer.header.description.color}
                    >
                        {description}
                    </Text>
                )}
                {files.length > 0 && !multiple && (
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
                    >
                        {'Selected file: ' + files[0].file.name}
                    </Text>
                )}
            </Block>
            {files.length === 0 && (
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
            {files.length > 0 && !multiple && (
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

            {files.length > 0 && multiple && (
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
                        return (
                            <TooltipV2
                                content={uploadFile.file.name}
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
            {state === UploadState.ERROR && (
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
                        const errors: string[] = []
                        if (hasOversized)
                            errors.push('Some files exceed size limit')
                        if (hasMaxFiles) errors.push('File limit exceeded')
                        return errors.length > 0
                            ? `${errors.join(', ')}`
                            : 'Error: Invalid file(s)'
                    })()}
                </Text>
            )}
        </Block>
    )
}

export default UploadContainerV2

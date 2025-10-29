import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { Button, ButtonType, ButtonSize } from '../../Button'
import { Repeat2 } from 'lucide-react'
import type { UploadedFileWithStatus } from '../types'
import type { UploadTokenType } from '../upload.tokens'
import FileListDisplay from './FileListDisplay'

type SuccessStateProps = {
    successfulFiles: UploadedFileWithStatus[]
    multiple: boolean
    children?: React.ReactNode
    onReplaceFile?: () => void
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}

const SuccessState: React.FC<SuccessStateProps> = ({
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

SuccessState.displayName = 'SuccessState'

export default SuccessState

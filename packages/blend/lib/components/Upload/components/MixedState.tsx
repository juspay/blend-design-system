import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import type { UploadedFileWithStatus } from '../types'
import type { UploadTokenType } from '../upload.tokens'
import FileListDisplay from './FileListDisplay'

type MixedStateProps = {
    successfulFiles: UploadedFileWithStatus[]
    errorFiles: UploadedFileWithStatus[]
    children?: React.ReactNode
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}

const MixedState: React.FC<MixedStateProps> = ({
    successfulFiles,
    errorFiles,
    children,
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
            data-element="content"
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
                Files uploaded
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
                {successfulFiles.length} succeeded, {errorFiles.length} failed
            </Text>
        </Block>

        <Block gap={uploadTokens.container.content.actionable.gap}>
            <FileListDisplay
                files={[...successfulFiles, ...errorFiles]}
                onFileRemove={onFileRemove}
                uploadTokens={uploadTokens}
                maxFiles={maxFiles}
            />
        </Block>
    </Block>
)

MixedState.displayName = 'MixedState'

export default MixedState

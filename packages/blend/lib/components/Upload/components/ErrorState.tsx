import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import type { UploadedFileWithStatus } from '../types'
import type { UploadTokenType } from '../upload.tokens'
import FileListDisplay from './FileListDisplay'
import { FOUNDATION_THEME } from '../../../tokens'

type ErrorStateProps = {
    errorFiles: UploadedFileWithStatus[]
    multiple: boolean
    children?: React.ReactNode
    errorText?: string
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}

const ErrorState: React.FC<ErrorStateProps> = ({
    errorFiles,
    multiple,
    children,
    errorText,
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
                    : errorFiles[0]?.file?.name ||
                      'Upload failed. Please try again.'}
            </Text>
        </Block>

        <Block gap={FOUNDATION_THEME.unit[10]}>
            {multiple ? (
                <FileListDisplay
                    files={errorFiles}
                    onFileRemove={onFileRemove}
                    uploadTokens={uploadTokens}
                    maxFiles={maxFiles}
                />
            ) : (
                (errorText || errorFiles[0]?.error) && (
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
                        {errorText || errorFiles[0]?.error}
                    </Text>
                )
            )}
        </Block>
    </Block>
)

ErrorState.displayName = 'ErrorState'

export default ErrorState

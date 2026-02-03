import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { Tag, Tooltip } from '../../../main'
import { TagColor, TagVariant, TagShape } from '../../Tags/types'
import { X } from 'lucide-react'
import type { UploadedFileWithStatus } from '../types'
import type { UploadTokenType } from '../upload.tokens'
import { truncateFileList } from '../utils'
import { FOUNDATION_THEME } from '../../../tokens'

type FileListDisplayProps = {
    files: UploadedFileWithStatus[]
    onFileRemove?: (fileId: string) => void
    uploadTokens: UploadTokenType
    maxFiles?: number
}

const FileListDisplay: React.FC<FileListDisplayProps> = ({
    files,
    onFileRemove,
    uploadTokens,
}) => {
    const sortedFiles = [...files].sort((a, b) => {
        if (a.status === 'error' && b.status !== 'error') return -1
        if (a.status !== 'error' && b.status === 'error') return 1
        return 0
    })

    const { displayFiles, truncatedCount } = truncateFileList(sortedFiles)

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={uploadTokens.container.content.slot.gap}
            data-element="files-uploaded"
        >
            <Block
                display="flex"
                flexWrap="wrap"
                gap={FOUNDATION_THEME.unit[10]}
                justifyContent="center"
            >
                {displayFiles.map((file) => (
                    <Tooltip
                        key={file.id}
                        content={
                            file.status === 'error' && file.error
                                ? file.error
                                : file.file.name
                        }
                    >
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
                                        aria-label={`Remove ${file.file.name}`}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' ||
                                                e.key === ' '
                                            ) {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                onFileRemove(file.id)
                                            }
                                        }}
                                    />
                                ) : undefined
                            }
                        />
                    </Tooltip>
                ))}
            </Block>
            {truncatedCount > 0 && (
                <Text
                    fontSize={
                        uploadTokens.container.content.text.subtitle.fontSize
                    }
                    fontWeight={
                        uploadTokens.container.content.text.subtitle.fontWeight
                    }
                    color={uploadTokens.container.content.text.subtitle.color}
                >
                    +{truncatedCount} more files
                </Text>
            )}
        </Block>
    )
}

FileListDisplay.displayName = 'FileListDisplay'

export default FileListDisplay

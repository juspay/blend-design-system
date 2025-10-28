import React from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import Tag from '../../Tags/Tags'
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
        >
            <Block
                display="flex"
                flexWrap="wrap"
                gap={FOUNDATION_THEME.unit[10]}
            >
                {displayFiles.map((file) => (
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
                                />
                            ) : undefined
                        }
                    />
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

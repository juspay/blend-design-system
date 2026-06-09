import React, { useState } from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { Tag, Tooltip, Popover } from '../../../main'
import { TagColor, TagVariant, TagShape } from '../../Tags/types'
import { X, ChevronUp, ChevronDown } from 'lucide-react'
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
    const [isOpen, setIsOpen] = useState(false)

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
                {truncatedCount > 0 && (
                    <Popover
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        trigger={
                            <Tag
                                text={`+ ${truncatedCount}`}
                                variant={TagVariant.SUBTLE}
                                color={TagColor.NEUTRAL}
                                shape={TagShape.ROUNDED}
                                rightSlot={
                                    isOpen ? (
                                        <ChevronUp size={14} />
                                    ) : (
                                        <ChevronDown size={14} />
                                    )
                                }
                                onClick={(e) => e.stopPropagation()}
                                cursor="pointer"
                            />
                        }
                        minWidth={240}
                        maxWidth={300}
                        maxHeight={220}
                        showCloseButton={false}
                        asModal={true}
                    >
                        <Block
                            display="flex"
                            flexDirection="column"
                            gap={FOUNDATION_THEME.unit[8]}
                            padding={FOUNDATION_THEME.unit[12]}
                            overflow="auto"
                        >
                            {sortedFiles
                                .slice(displayFiles.length)
                                .map((file) => (
                                    <Block
                                        key={file.id}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        gap={FOUNDATION_THEME.unit[12]}
                                    >
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            gap={FOUNDATION_THEME.unit[8]}
                                            minWidth={0}
                                            flexGrow={1}
                                        >
                                            <Tooltip
                                                content={
                                                    file.status === 'error' &&
                                                    file.error
                                                        ? file.error
                                                        : file.file.name
                                                }
                                                fullWidth
                                            >
                                                <Block
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={
                                                        FOUNDATION_THEME.unit[8]
                                                    }
                                                    minWidth={0}
                                                    flexGrow={1}
                                                    width="0"
                                                    overflow="hidden"
                                                >
                                                    <Text
                                                        fontSize={
                                                            uploadTokens
                                                                .container
                                                                .content.text
                                                                .subtitle
                                                                .fontSize
                                                        }
                                                        fontWeight={
                                                            uploadTokens
                                                                .container
                                                                .content.text
                                                                .subtitle
                                                                .fontWeight
                                                        }
                                                        color={
                                                            uploadTokens
                                                                .container
                                                                .content.text
                                                                .subtitle.color
                                                        }
                                                        truncate={true}
                                                    >
                                                        {file.file.name}
                                                    </Text>
                                                </Block>
                                            </Tooltip>
                                        </Block>
                                        {(file.status === 'error' ||
                                            file.error) && (
                                            <Block
                                                padding={`${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[8]}`}
                                                borderRadius={
                                                    FOUNDATION_THEME.unit[4]
                                                }
                                                backgroundColor={
                                                    FOUNDATION_THEME.colors
                                                        .red[50]
                                                }
                                            >
                                                <Text
                                                    fontSize={12}
                                                    fontWeight={500}
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .red[600]
                                                    }
                                                >
                                                    Failed
                                                </Text>
                                            </Block>
                                        )}
                                        {onFileRemove && (
                                            <X
                                                size={14}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onFileRemove(file.id)
                                                }}
                                                style={{
                                                    cursor: 'pointer',
                                                    flexShrink: 0,
                                                }}
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
                                        )}
                                    </Block>
                                ))}
                        </Block>
                    </Popover>
                )}
            </Block>
        </Block>
    )
}

FileListDisplay.displayName = 'FileListDisplay'

export default FileListDisplay

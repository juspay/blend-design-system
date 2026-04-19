import Block from '../../Primitives/Block/Block'
import { InputStateV2 } from '../inputV2.types'
import ChatInputTagV2 from './ChatInputTagV2'
import { ChatInputV2TokensType } from './ChatInputV2.tokens'
import { AttachedFile } from './ChatInputV2.types'
import { truncateFileNameForTag } from './utils'

type AttachmentDropdownV2Props = {
    tags: AttachedFile[]
    onFileRemove: (fileId: string) => void
    tokens: ChatInputV2TokensType
    onFileClick: (file: AttachedFile) => void
}

const AttachmentDropdownV2 = ({
    tags,
    onFileRemove,
    onFileClick,
    tokens,
}: AttachmentDropdownV2Props) => {
    return (
        <Block
            backgroundColor={
                tokens.container.attachedFilesContainer.overflowMenu
                    .backgroundColor[InputStateV2.DEFAULT]
            }
            borderRadius={
                tokens.container.attachedFilesContainer.overflowMenu
                    .borderRadius
            }
            padding={
                tokens.container.attachedFilesContainer.overflowMenu.padding
            }
            display="flex"
            flexDirection="column"
            gap={tokens.container.attachedFilesContainer.overflowMenu.gap}
            position="absolute"
            zIndex={1000}
            top={tokens.container.attachedFilesContainer.overflowMenu.top}
            right={tokens.container.attachedFilesContainer.overflowMenu.right}
            maxHeight={
                tokens.container.attachedFilesContainer.overflowMenu.maxHeight
            }
            overflowY="auto"
        >
            {tags &&
                tags.map((tag) => (
                    <ChatInputTagV2
                        key={tag.id}
                        text={truncateFileNameForTag(tag.name)}
                        tokens={tokens.container.tagContainer}
                        onRemove={(e) => {
                            e.stopPropagation()
                            onFileRemove(tag.id)
                        }}
                        onFileClick={(e) => {
                            e.stopPropagation()
                            onFileClick(tag)
                        }}
                    />
                ))}
        </Block>
    )
}

export default AttachmentDropdownV2

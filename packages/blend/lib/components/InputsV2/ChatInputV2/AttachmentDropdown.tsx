import Block from '../../Primitives/Block/Block'
import TagV2 from '../../TagV2/TagV2'
import { TagV2Color, TagV2Size } from '../../TagV2/TagV2.types'
import { InputStateV2 } from '../inputV2.types'
import { ChatInputV2TokensType } from './ChatInputV2.tokens'
import { AttachedFile } from './ChatInputV2.types'
import { truncateFileNameForTag } from './utils'
import { XIcon } from '@phosphor-icons/react'

type AttachmentDropdownV2Props = {
    tags: AttachedFile[]
    onFileRemove?: (fileId: string) => void
    tokens: ChatInputV2TokensType
}

const AttachmentDropdownV2 = ({
    tags,
    onFileRemove,
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
            top={tokens.container.attachedFilesContainer.overflowMenu.top}
            right={tokens.container.attachedFilesContainer.overflowMenu.right}
        >
            {tags.map((tag) => (
                <TagV2
                    key={tag.id}
                    color={TagV2Color.NEUTRAL}
                    size={TagV2Size.LG}
                    text={truncateFileNameForTag(tag.name)}
                    rightSlot={{
                        slot: <XIcon size={12} />,
                        maxHeight: '100%',
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        onFileRemove?.(tag.id)
                    }}
                />
            ))}
        </Block>
    )
}

export default AttachmentDropdownV2

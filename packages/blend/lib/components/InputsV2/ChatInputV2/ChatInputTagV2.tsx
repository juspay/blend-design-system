import Block from '../../Primitives/Block/Block'
import {
    XIcon,
    FileTextIcon,
    FilePdfIcon,
    FileCsvIcon,
    FileImageIcon,
    FileIcon,
} from '@phosphor-icons/react'
import { ChatInputV2TokensType } from './ChatInputV2.tokens'
import { ChatInputV2AttachedFile } from './ChatInputV2.types'
import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
} from '../../ButtonV2'

type ChatInputTagV2Props = {
    text: string
    tokens: ChatInputV2TokensType['container']['tagContainer']
    /** Fired after the remove control handles `stopPropagation` (button). */
    onRemove: () => void
    /** Fired after the file-name control handles `preventDefault` / `stopPropagation` (button). */
    onFileClick: () => void
    file: ChatInputV2AttachedFile
}

const ChatInputTagV2 = ({
    file,
    text,
    tokens,
    onRemove,
    onFileClick,
}: ChatInputTagV2Props) => {
    const getFileTypeIcon = (fileType: ChatInputV2AttachedFile['type']) => {
        switch (fileType) {
            case 'image':
                return <FileImageIcon size={16} color={tokens.text.color} />
            case 'pdf':
                return <FilePdfIcon size={16} color={tokens.text.color} />
            case 'csv':
                return <FileCsvIcon size={16} color={tokens.text.color} />
            case 'text':
                return <FileTextIcon size={16} color={tokens.text.color} />
            default:
                return <FileIcon size={16} color={tokens.text.color} />
        }
    }
    return (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={tokens.gap}
            borderRadius={tokens.borderRadius}
            backgroundColor={tokens.backgroundColor}
            border={tokens.border}
            paddingTop={tokens.paddingTop}
            paddingRight={tokens.paddingRight}
            paddingBottom={tokens.paddingBottom}
            paddingLeft={tokens.paddingLeft}
        >
            <Block>{getFileTypeIcon(file.type)}</Block>
            <ButtonV2
                text={text}
                size={ButtonV2Size.SMALL}
                buttonType={ButtonV2Type.SECONDARY}
                subType={ButtonV2SubType.INLINE}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onFileClick()
                }}
            />
            <ButtonV2
                size={ButtonV2Size.SMALL}
                buttonType={ButtonV2Type.SECONDARY}
                subType={ButtonV2SubType.INLINE}
                aria-label={`Remove ${file.name}`}
                onClick={(e) => {
                    e.stopPropagation()
                    onRemove()
                }}
                leftSlot={{
                    slot: <XIcon size={16} color={tokens.text.color} />,
                }}
            />
        </Block>
    )
}

export default ChatInputTagV2

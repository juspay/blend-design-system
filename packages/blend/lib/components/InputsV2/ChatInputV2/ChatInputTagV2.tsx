import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { XIcon } from '@phosphor-icons/react'
import { ChatInputV2TokensType } from './ChatInputV2.tokens'

type ChatInputTagV2Props = {
    text: string
    tokens: ChatInputV2TokensType['container']['tagContainer']
    onRemove: (e: React.MouseEvent<HTMLDivElement>) => void
    onFileClick: (e: React.MouseEvent<HTMLDivElement>) => void
    key: string
}

const ChatInputTagV2 = ({
    text,
    tokens,
    onRemove,
    onFileClick,
    key,
}: ChatInputTagV2Props) => {
    return (
        <Block
            key={key}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={tokens.gap}
            borderRadius={tokens.borderRadius}
            padding={tokens.padding}
            backgroundColor={tokens.backgroundColor}
            border={tokens.border}
        >
            <Block onClick={onFileClick} cursor="pointer">
                <Text
                    color={tokens.text.color}
                    fontSize={tokens.text.fontSize}
                    fontWeight={tokens.text.fontWeight}
                >
                    {text}
                </Text>
            </Block>
            <Block onClick={onRemove} cursor="pointer">
                <XIcon size={16} color={tokens.text.color} />
            </Block>
        </Block>
    )
}

export default ChatInputTagV2

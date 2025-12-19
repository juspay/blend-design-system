import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'

type MobileChatInputProps = {
    value: string
    onChange?: (value: string) => void
}

const MobileChatInput: React.FC<MobileChatInputProps> = ({
    value,
    onChange,
}) => {
    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        onChange?.(e.target.value)
    }
    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={3}
            justifyContent="space-between"
        >
            <Block
                border={'1px solid #e0e0e0'}
                borderRadius={'100px'}
                width="fit-content"
                padding={'5px'}
            >
                files
            </Block>
            <Block display="flex" flexDirection="row" gap={2}>
                <PrimitiveButton>attach file</PrimitiveButton>
                <Block
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                    borderRadius={'100px'}
                    border={'1px solid #e0e0e0'}
                    height="fit-content"
                    padding={'5px 10px'}
                >
                    <textarea
                        value={value}
                        onChange={handleTextareaChange}
                        rows={1}
                        style={{
                            width: '100%',
                            height: '44px',
                            minHeight: '44px',
                            maxHeight: '100px',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            boxSizing: 'border-box',
                            // overflow: 'hidden',
                            verticalAlign: 'middle',
                        }}
                    />
                    <PrimitiveButton>send</PrimitiveButton>
                </Block>
            </Block>
        </Block>
    )
}

export default MobileChatInput

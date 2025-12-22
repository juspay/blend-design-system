import { Paperclip, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import { Button, ButtonSize, ButtonSubType, ButtonType } from '../Button'
import { Tag, TagColor, TagVariant } from '../Tags'

type MobileChatInputProps = {
    value: string
    onChange?: (value: string) => void
}

const MobileChatInput: React.FC<MobileChatInputProps> = ({
    value,
    onChange,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const LINE_HEIGHT = 20

    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        onChange?.(e.target.value)
    }

    const [showFiles, setShowFiles] = useState(false)

    useEffect(() => {
        const el = textareaRef.current
        if (!el) return

        el.style.height = 'auto'
        el.style.height = `${Math.min(el.scrollHeight, 100)}px`
        if (el.scrollHeight > 44) {
            el.style.borderRadius = '20px'
            el.style.paddingTop = '16px'
            el.style.paddingBottom = '16px'
        }
    }, [value])

    return (
        <Block padding={10} display="flex" flexDirection="column" gap={10}>
            {showFiles && (
                <Block display="flex" gap={2}>
                    <Tag
                        text="File 1"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="File 2"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="File 3"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.NEUTRAL}
                    />
                </Block>
            )}
            <Block display="flex" width="100%" gap={8} position="relative">
                <Block>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Paperclip size={14} />}
                        onClick={() => setShowFiles(!showFiles)}
                        aria-label="Attach files"
                    />
                </Block>
                <Block
                    display="flex"
                    flexDirection="row"
                    position="relative"
                    width="100%"
                    gap={2}
                >
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={value}
                        onChange={handleTextareaChange}
                        placeholder="Type your message here..."
                        style={{
                            width: '100%',
                            height: `${44}px`,
                            borderRadius: '100px',
                            border: '1px solid #e0e0e0',
                            resize: 'none',
                            paddingRight: '44px',
                            paddingLeft: '16px',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                            lineHeight: `${LINE_HEIGHT}px`,
                            overflow: 'hidden',
                            transition:
                                'height 0.15s ease-out, padding 0.15s ease-out',
                            boxSizing: 'border-box',
                        }}
                    />

                    <Block
                        position="absolute"
                        top="50%"
                        bottom={0}
                        right={0}
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={<Send size={14} />}
                            aria-label="Attach files"
                        />
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

export default MobileChatInput

import { Paperclip } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import PrimitiveTextarea from '../Primitives/PrimitiveTextArea'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { FOUNDATION_THEME } from '../../tokens'
import { ChatInputTokensType } from './chatInput.tokens'
import { AttachedFile, MenuProps } from '../../main'
import AttachmentFile from './AttachmentFile'
import { truncatePlaceholder } from './utils'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const HiddenScrollbarTextarea = styled(PrimitiveTextarea)`
    /* Hide scrollbar for Firefox */
    scrollbar-width: none;

    /* Hide scrollbar for Chrome, Safari, and Edge */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE and Edge */
    -ms-overflow-style: none;
`

type MobileChatInputProps = {
    value: string
    onChange?: (value: string) => void
    slot1?: React.ReactNode
    slot2?: React.ReactNode
    placeholder?: string
    attachedFiles?: AttachedFile[]
    handleAttachClick?: () => void
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: AttachedFile) => void
    overflowMenuProps?: Partial<MenuProps>
}

const MobileChatInput: React.FC<MobileChatInputProps> = ({
    value,
    onChange,
    slot1,
    slot2,
    placeholder,
    attachedFiles,
    handleAttachClick,
    onFileRemove,
    onFileClick,
    overflowMenuProps,
}) => {
    const containerRef = useRef<HTMLDivElement>(null!)
    const tokens = useResponsiveTokens<ChatInputTokensType>('CHAT_INPUT')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [truncatedPlaceholder, setTruncatedPlaceholder] = useState<
        string | undefined
    >(placeholder)

    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        onChange?.(e.target.value)
    }

    // Update truncated placeholder when textarea resizes
    useEffect(() => {
        const el = textareaRef.current
        if (!el) return

        const updatePlaceholder = () => {
            setTruncatedPlaceholder(truncatePlaceholder(el, placeholder))
        }

        updatePlaceholder()
        const resizeObserver = new ResizeObserver(updatePlaceholder)
        resizeObserver.observe(el)

        return () => resizeObserver.disconnect()
    }, [placeholder])

    useEffect(() => {
        const el = textareaRef.current

        if (!el) return

        el.style.height = 'auto'
        const maxHeight = parseFloat(String(tokens.maxHeight).replace('px', ''))
        el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`

        const defaultHeight = parseFloat(
            String(tokens.minHeight).replace('px', '')
        )
        if (el.scrollHeight > defaultHeight) {
            el.style.borderRadius = tokens.borderRadius.focus as string
        } else {
            el.style.borderRadius = tokens.borderRadius.default as string
        }
    }, [value, tokens])

    const attachmentButtonDimensions = useMemo(() => {
        // Button is fixed at 44px (FOUNDATION_THEME.unit[44]) as defined in PrimitiveButton
        const buttonWidth = FOUNDATION_THEME.unit[44]
        // Gap between button and textarea (using unit[8] from tokens)
        const gap = FOUNDATION_THEME.unit[8]
        const total = `calc(${buttonWidth} + ${gap})`

        return {
            buttonWidth,
            gap,
            total,
        }
    }, [])

    return (
        <Block
            padding={10}
            display="flex"
            flexDirection="column"
            gap={10}
            ref={containerRef}
        >
            {attachedFiles && attachedFiles.length > 0 && (
                <Block
                    display="flex"
                    gap={attachmentButtonDimensions.gap}
                    marginLeft={attachmentButtonDimensions.total}
                >
                    <AttachmentFile
                        attachedFiles={attachedFiles}
                        onFileRemove={onFileRemove}
                        onFileClick={onFileClick}
                        overflowMenuProps={overflowMenuProps}
                        containerRef={containerRef}
                    />
                </Block>
            )}
            {slot2}
            <Block
                display="flex"
                width="100%"
                gap={tokens.gap}
                position="relative"
                alignItems="stretch"
            >
                <Block alignSelf="stretch" display="flex" alignItems="end">
                    <PrimitiveButton
                        width={FOUNDATION_THEME.unit[44]}
                        height={tokens.minHeight}
                        onClick={handleAttachClick}
                        aria-label="Attach files"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="50%"
                        background="transparent"
                        border="1px solid #E1E4EA"
                        color="#000"
                        cursor="pointer"
                        transition="all 0.3s ease"
                    >
                        <Paperclip size={14} />
                    </PrimitiveButton>
                </Block>
                <Block
                    display="flex"
                    flexDirection="row"
                    position="relative"
                    width="100%"
                    gap={2}
                >
                    <HiddenScrollbarTextarea
                        ref={textareaRef}
                        rows={1}
                        value={value}
                        onChange={handleTextareaChange}
                        placeholder={truncatedPlaceholder}
                        width="100%"
                        backgroundColor={tokens.backgroundColor.default}
                        color={tokens.text.color.default}
                        fontSize={tokens.text.fontSize.default}
                        borderRadius={
                            isFocused
                                ? tokens.borderRadius.focus
                                : tokens.borderRadius.default
                        }
                        border={
                            isFocused
                                ? tokens.border.focus
                                : tokens.border.default
                        }
                        resize={tokens.resize}
                        paddingRight={
                            slot1 ? attachmentButtonDimensions.total : 0
                        }
                        paddingLeft={tokens.paddingLeft}
                        paddingTop={tokens.paddingTop}
                        paddingBottom={tokens.paddingBottom}
                        overflow={tokens.overflow}
                        placeholderStyles={{
                            color: tokens.text.color.default,
                        }}
                        style={{
                            lineHeight: tokens.text.lineHeight.default,
                        }}
                        onFocus={(e) => {
                            setIsFocused(true)
                            e.currentTarget.style.borderRadius = tokens
                                .borderRadius.focus as string
                            e.currentTarget.style.border = tokens.border
                                .focus as string
                        }}
                        onBlur={(e) => {
                            setIsFocused(false)
                            e.currentTarget.style.border = tokens.border
                                .default as string
                        }}
                    />

                    <Block
                        position="absolute"
                        bottom={FOUNDATION_THEME.unit[5]}
                        right={FOUNDATION_THEME.unit[4]}
                        width={FOUNDATION_THEME.unit[36]}
                        height={FOUNDATION_THEME.unit[36]}
                        borderRadius={tokens.borderRadius.default}
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {slot1}
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

export default MobileChatInput

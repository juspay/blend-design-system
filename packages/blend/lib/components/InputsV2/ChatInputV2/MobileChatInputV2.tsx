import { Paperclip } from 'lucide-react'
import {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
} from 'react'
import styled from 'styled-components'
import Block from '../../Primitives/Block/Block'
import PrimitiveTextarea from '../../Primitives/PrimitiveTextArea'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import ChatInputV2AttachmentRow from './ChatInputV2AttachmentRow'
import {
    assignForwardedRef,
    removePxFromValue,
    truncatePlaceholder,
} from './utils'
import { useComponentToken } from '../../../context/useComponentToken'
import { ChatInputV2MobileTokensType } from './ChatInputV2Mobile.tokens'
import { InputStateV2 } from '../inputV2.types'
import { MobileChatInputV2Props } from './ChatInputV2.types'

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

const MobileChatInputV2 = forwardRef<HTMLDivElement, MobileChatInputV2Props>(
    function MobileChatInputV2(
        {
            webTokens,
            value,
            onChange,
            topContent,
            secondaryAction,
            placeholder,
            attachedFiles,
            handleAttachClick,
            onFileRemove,
            onFileClick = () => {},
            disabled = false,
            onSecondaryActionClick,
            id,
            onEnter = () => {},
        },
        ref
    ) {
        const mobileTokens = useComponentToken(
            'CHAT_INPUTV2_MOBILE'
        ) as ChatInputV2MobileTokensType
        const containerRef = useRef<HTMLDivElement | null>(null)

        const setContainerNode = useCallback(
            (node: HTMLDivElement | null) => {
                containerRef.current = node
                assignForwardedRef(node, ref)
            },
            [ref]
        )
        const textareaRef = useRef<HTMLTextAreaElement>(null)
        const [truncatedPlaceholder, setTruncatedPlaceholder] = useState<
            string | undefined
        >(placeholder)

        const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
            el.style.height = `${Math.min(el.scrollHeight, removePxFromValue(mobileTokens.inputContainer.maxHeight ?? 0))}px`

            if (
                el.scrollHeight >
                removePxFromValue(mobileTokens.inputContainer.minHeight ?? 0)
            ) {
                el.style.borderRadius = mobileTokens.inputContainer
                    .borderRadius[InputStateV2.FOCUS] as string
            } else {
                el.style.borderRadius = mobileTokens.inputContainer
                    .borderRadius[InputStateV2.DEFAULT] as string
            }
        }, [value, mobileTokens.inputContainer])

        const attachmentButtonDimensions = useMemo(() => {
            const buttonWidth = `${mobileTokens.attachmentButtonDimensions.width}`
            const gap = mobileTokens.gap
            const total = `calc(${buttonWidth} + ${gap})`

            return {
                buttonWidth,
                gap,
                total,
            }
        }, [mobileTokens.attachmentButtonDimensions.width, mobileTokens.gap])

        /** Reserve space for the absolutely positioned secondary action (right + width from tokens). */
        const textareaPaddingRight = useMemo(() => {
            if (!secondaryAction) return 0
            const { right, width } = mobileTokens.secondaryAction
            const rightCss =
                typeof right === 'number' ? `${right}px` : String(right)
            const widthCss =
                typeof width === 'number' ? `${width}px` : String(width)
            return `calc(${rightCss} + ${widthCss})`
        }, [secondaryAction, mobileTokens.secondaryAction])

        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={mobileTokens.gap}
                ref={setContainerNode}
            >
                {attachedFiles && attachedFiles.length > 0 && (
                    <Block
                        display="flex"
                        gap={mobileTokens.gap}
                        marginLeft={attachmentButtonDimensions.total}
                    >
                        <ChatInputV2AttachmentRow
                            attachedFiles={attachedFiles}
                            onFileRemove={onFileRemove || (() => {})}
                            onFileClick={onFileClick}
                            outerContainerRef={containerRef}
                            gap={`${mobileTokens.gap}`}
                            tokens={webTokens}
                        />
                    </Block>
                )}
                {topContent}

                <Block
                    display="flex"
                    width="100%"
                    gap={`${mobileTokens.gap}`}
                    position="relative"
                    alignItems="stretch"
                >
                    <Block
                        alignSelf="stretch"
                        display="flex"
                        alignItems="end"
                        justifyContent="center"
                    >
                        <PrimitiveButton
                            disabled={disabled}
                            width={
                                mobileTokens.attachmentButtonDimensions.width
                            }
                            height={
                                mobileTokens.attachmentButtonDimensions.height
                            }
                            onClick={handleAttachClick}
                            aria-label="Attach files"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={
                                mobileTokens.attachmentButtonDimensions
                                    .borderRadius
                            }
                            border={
                                mobileTokens.attachmentButtonDimensions.border
                            }
                            backgroundColor={
                                mobileTokens.attachmentButtonDimensions
                                    .backgroundColor[InputStateV2.DEFAULT]
                            }
                            _disabled={{
                                backgroundColor:
                                    mobileTokens.attachmentButtonDimensions
                                        .backgroundColor[InputStateV2.DISABLED],
                                border: mobileTokens.attachmentButtonDimensions
                                    .border,
                            }}
                            color={
                                mobileTokens.attachmentButtonDimensions.color
                            }
                        >
                            <Paperclip size={16} />
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
                            backgroundColor={
                                mobileTokens.inputContainer.backgroundColor
                            }
                            disabled={disabled}
                            id={id}
                            name="chat-input"
                            ref={textareaRef}
                            rows={1}
                            value={value}
                            onChange={handleTextareaChange}
                            placeholder={truncatedPlaceholder}
                            width="100%"
                            color={mobileTokens.inputContainer.color}
                            fontSize={mobileTokens.inputContainer.fontSize}
                            fontWeight={mobileTokens.inputContainer.fontWeight}
                            border={
                                mobileTokens.inputContainer.border[
                                    InputStateV2.DEFAULT
                                ]
                            }
                            resize="none"
                            paddingRight={textareaPaddingRight}
                            paddingLeft={
                                mobileTokens.inputContainer.paddingLeft
                            }
                            paddingTop={mobileTokens.inputContainer.paddingTop}
                            paddingBottom={
                                mobileTokens.inputContainer.paddingBottom
                            }
                            overflow="auto"
                            placeholderStyles={{
                                color: mobileTokens.inputContainer.placeholder
                                    .color,
                            }}
                            borderRadius={
                                mobileTokens.inputContainer.borderRadius[
                                    InputStateV2.DEFAULT
                                ]
                            }
                            style={{
                                lineHeight:
                                    mobileTokens.inputContainer.lineHeight,
                            }}
                            _focus={{
                                border: mobileTokens.inputContainer.border[
                                    InputStateV2.FOCUS
                                ] as string,
                                boxShadow: mobileTokens.inputContainer
                                    .boxShadow[InputStateV2.FOCUS] as string,
                            }}
                            _disabled={{
                                cursor: 'not-allowed',
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    onEnter()
                                }
                            }}
                        />

                        {secondaryAction && (
                            <PrimitiveButton
                                disabled={disabled}
                                aria-label="Secondary action"
                                position="absolute"
                                bottom={mobileTokens.secondaryAction.bottom}
                                right={mobileTokens.secondaryAction.right}
                                width={mobileTokens.secondaryAction.width}
                                height={mobileTokens.secondaryAction.height}
                                borderRadius={
                                    mobileTokens.secondaryAction.borderRadius
                                }
                                backgroundColor={
                                    mobileTokens.secondaryAction
                                        .backgroundColor[InputStateV2.DEFAULT]
                                }
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                onClick={
                                    disabled
                                        ? undefined
                                        : onSecondaryActionClick
                                }
                                color={mobileTokens.secondaryAction.color}
                            >
                                {secondaryAction}
                            </PrimitiveButton>
                        )}
                    </Block>
                </Block>
            </Block>
        )
    }
)

MobileChatInputV2.displayName = 'MobileChatInputV2'

export default MobileChatInputV2

import {
    forwardRef,
    useCallback,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import Block from '../../Primitives/Block/Block'
import { ChatInputV2Props } from './ChatInputV2.types'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { ChatInputV2TokensType } from './ChatInputV2.tokens'
import { InputStateV2 } from '../inputV2.types'
import PrimitiveTextarea from '../../Primitives/PrimitiveTextArea'
import ButtonV2 from '../../ButtonV2/ButtonV2'
import {
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
} from '../../ButtonV2/buttonV2.types'
import Text from '../../Text/Text'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { PaperclipIcon } from '@phosphor-icons/react'
import ChatInputV2AttachmentRow from './ChatInputV2AttachmentRow'
import {
    applyChatInputV2TextareaAutoHeight,
    assignForwardedRef,
    handleChatInputV2FileInputChange,
    resolveChatInputV2TextareaMaxHeightPx,
} from './utils'

const ChatInputV2 = forwardRef<HTMLDivElement, ChatInputV2Props>(
    (
        {
            slot1,
            slot2,
            onSlot2Click = () => {},
            placeholder = 'Type a message...',
            onChange,
            onAttachFiles = () => {},
            onFileRemove = () => {},
            attachedFiles = [],
            value = '',
            topQueries = [],
            onTopQuerySelect = () => {},
            topQueriesMaxHeight = 200,
            textareaMaxHeight,
            disabled = false,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const textareaRef = useRef<HTMLTextAreaElement>(null)
        const fileInputRef = useRef<HTMLInputElement>(null)
        const generatedId = useId()
        const chatInputId = `chat-input-${generatedId}`
        const chatInputV2Tokens =
            useResponsiveTokens<ChatInputV2TokensType>('CHAT_INPUTV2')
        const [inputState, setInputState] = useState<InputStateV2>(
            InputStateV2.DEFAULT
        )
        const showTopQueries = inputState === InputStateV2.FOCUS
        const handleAttachClick = useCallback(() => {
            if (disabled) return
            fileInputRef.current?.click()
        }, [disabled])

        const setContainerNode = useCallback(
            (node: HTMLDivElement | null) => {
                containerRef.current = node
                assignForwardedRef(node, ref)
            },
            [ref]
        )

        const textareaMaxHeightPx = useMemo(
            () =>
                resolveChatInputV2TextareaMaxHeightPx(
                    textareaMaxHeight,
                    chatInputV2Tokens.container.inputContainer.input.maxHeight
                ),
            [textareaMaxHeight, chatInputV2Tokens]
        )

        const syncTextareaHeight = useCallback(() => {
            applyChatInputV2TextareaAutoHeight(
                textareaRef.current,
                textareaMaxHeightPx
            )
        }, [textareaMaxHeightPx])

        useLayoutEffect(() => {
            syncTextareaHeight()
        }, [value, syncTextareaHeight])

        return (
            <Block
                ref={setContainerNode}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                border={
                    chatInputV2Tokens.container.border[InputStateV2.DEFAULT]
                }
                borderRadius={chatInputV2Tokens.container.borderRadius}
                backgroundColor={
                    chatInputV2Tokens.container.backgroundColor[
                        InputStateV2.DEFAULT
                    ]
                }
                paddingTop={chatInputV2Tokens.container.paddingTop}
                paddingRight={chatInputV2Tokens.container.paddingRight}
                paddingBottom={chatInputV2Tokens.container.paddingBottom}
                paddingLeft={chatInputV2Tokens.container.paddingLeft}
                gap={chatInputV2Tokens.container.gap}
            >
                <ChatInputV2AttachmentRow
                    tokens={chatInputV2Tokens}
                    attachedFiles={attachedFiles}
                    onFileRemove={onFileRemove}
                    outerContainerRef={containerRef}
                    gap={
                        chatInputV2Tokens.container.attachedFilesContainer
                            .gap ?? 8
                    }
                />
                <Block width="100%">{slot1}</Block>
                <PrimitiveInput
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={(e) =>
                        handleChatInputV2FileInputChange(
                            e,
                            attachedFiles,
                            onAttachFiles
                        )
                    }
                    multiple
                    accept="image/*,.pdf,.csv,.txt,.doc,.docx"
                    aria-label="Attach files"
                />
                {/* Input Container */}
                <Block
                    backgroundColor={
                        chatInputV2Tokens.container.inputContainer
                            .backgroundColor
                    }
                    borderRadius={
                        chatInputV2Tokens.container.inputContainer.borderRadius
                    }
                    width="100%"
                    outline={
                        chatInputV2Tokens.container.inputContainer.outline[
                            inputState
                        ]
                    }
                    boxShadow={
                        chatInputV2Tokens.container.inputContainer.boxShadow[
                            inputState
                        ]
                    }
                >
                    {/* Input */}
                    <PrimitiveTextarea
                        placeholderStyles={{
                            color: chatInputV2Tokens.container.inputContainer
                                .input.placeholder as string,
                        }}
                        color={
                            chatInputV2Tokens.container.inputContainer.input
                                .color
                        }
                        ref={textareaRef}
                        disabled={disabled}
                        id={chatInputId}
                        name="chat-input"
                        value={value}
                        resize="none"
                        rows={1}
                        placeholder={placeholder}
                        onChange={(e) => {
                            onChange(e.target.value)
                        }}
                        paddingTop={
                            chatInputV2Tokens.container.inputContainer.input
                                .paddingTop
                        }
                        paddingRight={
                            chatInputV2Tokens.container.inputContainer.input
                                .paddingRight
                        }
                        paddingLeft={
                            chatInputV2Tokens.container.inputContainer.input
                                .paddingLeft
                        }
                        minHeight={
                            chatInputV2Tokens.container.inputContainer.input
                                .minHeight
                        }
                        maxHeight={
                            chatInputV2Tokens.container.inputContainer.input
                                .maxHeight
                        }
                        overflowY="auto"
                        width="100%"
                        onFocus={() => {
                            setInputState(InputStateV2.FOCUS)
                        }}
                        onBlur={() => {
                            setInputState(InputStateV2.DEFAULT)
                        }}
                        aria-disabled={disabled}
                    />
                    {/* Slot Container */}
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        paddingRight={
                            chatInputV2Tokens.container.inputContainer
                                .slotContainer.paddingRight
                        }
                        paddingBottom={
                            chatInputV2Tokens.container.inputContainer
                                .slotContainer.paddingBottom
                        }
                        paddingLeft={
                            chatInputV2Tokens.container.inputContainer
                                .slotContainer.paddingLeft
                        }
                    >
                        <ButtonV2
                            size={ButtonV2Size.SMALL}
                            buttonType={ButtonV2Type.SECONDARY}
                            subType={ButtonV2SubType.ICON_ONLY}
                            leftSlot={{ slot: <PaperclipIcon size={16} /> }}
                            onClick={handleAttachClick}
                            disabled={disabled}
                        />

                        <ButtonV2
                            size={ButtonV2Size.SMALL}
                            buttonType={ButtonV2Type.PRIMARY}
                            subType={ButtonV2SubType.ICON_ONLY}
                            rightSlot={{ slot: slot2 }}
                            onClick={() => {
                                onSlot2Click()
                            }}
                            disabled={disabled}
                        />
                    </Block>

                    {/* Top Queries container */}
                    <Block
                        width="100%"
                        maxHeight={
                            showTopQueries ? `${topQueriesMaxHeight}px` : '0'
                        }
                        opacity={showTopQueries ? 1 : 0}
                        overflow="hidden"
                        pointerEvents={showTopQueries ? 'auto' : 'none'}
                        aria-hidden={!showTopQueries}
                        transition="max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease"
                        overflowY="auto"
                    >
                        <Block
                            position="sticky"
                            top={0}
                            borderTop={
                                chatInputV2Tokens.container.inputContainer
                                    .topQueriesContainer.borderTop
                            }
                            backgroundColor={
                                chatInputV2Tokens.container.inputContainer
                                    .topQueriesContainer.header.backgroundColor
                            }
                            paddingTop={
                                chatInputV2Tokens.container.inputContainer
                                    .topQueriesContainer.header.paddingTop
                            }
                            paddingRight={
                                chatInputV2Tokens.container.inputContainer
                                    .topQueriesContainer.header.paddingRight
                            }
                            paddingBottom={
                                chatInputV2Tokens.container.inputContainer
                                    .topQueriesContainer.header.paddingBottom
                            }
                            paddingLeft={
                                chatInputV2Tokens.container.inputContainer
                                    .topQueriesContainer.header.paddingLeft
                            }
                        >
                            <Text
                                color={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.header.color
                                }
                                fontSize={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.header.fontSize
                                }
                                fontWeight={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.header.fontWeight
                                }
                                textTransform={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.header
                                        .textTransform
                                }
                            >
                                Top Queries
                            </Text>
                        </Block>

                        {topQueries.map((query) => (
                            <Block
                                key={query.id}
                                _hover={{
                                    backgroundColor: chatInputV2Tokens.container
                                        .inputContainer.topQueriesContainer.item
                                        .backgroundColor.hover as string,
                                }}
                                paddingTop={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.item.paddingTop
                                }
                                paddingBottom={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.item.paddingBottom
                                }
                                paddingRight={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.item.paddingRight
                                }
                                paddingLeft={
                                    chatInputV2Tokens.container.inputContainer
                                        .topQueriesContainer.item.paddingLeft
                                }
                            >
                                <Text
                                    style={{ cursor: 'pointer' }}
                                    color={
                                        chatInputV2Tokens.container
                                            .inputContainer.topQueriesContainer
                                            .item.color[inputState]
                                    }
                                    fontSize={
                                        chatInputV2Tokens.container
                                            .inputContainer.topQueriesContainer
                                            .item.fontSize
                                    }
                                    fontWeight={
                                        chatInputV2Tokens.container
                                            .inputContainer.topQueriesContainer
                                            .item.fontWeight
                                    }
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                    }}
                                    onClick={() => {
                                        onTopQuerySelect(query)
                                        setInputState(InputStateV2.DEFAULT)
                                    }}
                                >
                                    {query.text}
                                </Text>
                            </Block>
                        ))}
                    </Block>
                </Block>
            </Block>
        )
    }
)

ChatInputV2.displayName = 'ChatInputV2'

export default ChatInputV2

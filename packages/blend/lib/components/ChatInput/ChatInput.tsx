import React, {
    useState,
    useRef,
    useCallback,
    useMemo,
    forwardRef,
} from 'react'
import { ChatInputProps, AttachedFile, TopQuery } from './types'
import Block from '../Primitives/Block/Block'
import Tag from '../Tags/Tags'
import { TagColor, TagSize, TagVariant } from '../Tags/types'
import { Menu } from '../Menu'
import Button from '../Button/Button'
import { ButtonType, ButtonSize } from '../Button/types'
import Text from '../Text/Text'
import { Paperclip, Mic, X, Plus } from 'lucide-react'
import {
    getFileIcon,
    createOverflowMenuItems,
    handleAutoResize,
    shouldSendOnEnter,
    isValidMessageLength,
} from './utils'

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
    (
        {
            value = '',
            onChange,
            onSend,
            onAttachFiles,
            onVoiceRecord,
            onFileRemove,
            onFileClick,
            placeholder = 'Type a message...',
            disabled = false,
            maxLength,
            autoResize = true,
            attachedFiles = [],
            maxVisibleFiles = 3,
            topQueries = [],
            onTopQuerySelect,
            topQueriesMaxHeight = 200,
            attachButtonIcon,
            voiceButtonIcon,
            overflowMenuProps,
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedBy,
        },
        ref
    ) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null)
        const fileInputRef = useRef<HTMLInputElement>(null)
        const [overflowMenuOpen, setOverflowMenuOpen] = useState(false)

        // Use the passed ref or our internal ref
        const textareaElement =
            (ref as React.RefObject<HTMLTextAreaElement>) || textareaRef

        const visibleFiles = useMemo(() => {
            return attachedFiles.slice(0, maxVisibleFiles)
        }, [attachedFiles, maxVisibleFiles])

        const hiddenFiles = useMemo(() => {
            return attachedFiles.slice(maxVisibleFiles)
        }, [attachedFiles, maxVisibleFiles])

        const hasOverflow = hiddenFiles.length > 0

        const handleTextareaChange = useCallback(
            (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const newValue = e.target.value
                if (!isValidMessageLength(newValue, maxLength)) return

                onChange?.(newValue)
                handleAutoResize(textareaElement.current, autoResize)
            },
            [onChange, maxLength, autoResize, textareaElement]
        )

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (shouldSendOnEnter(e.key, e.shiftKey)) {
                    e.preventDefault()
                    if (onSend && value.trim()) {
                        onSend(value, attachedFiles)
                    }
                }
            },
            [onSend, value, attachedFiles]
        )

        const handleAttachClick = useCallback(() => {
            if (disabled) return
            fileInputRef.current?.click()
        }, [disabled])

        const handleFileInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const files = Array.from(e.target.files || [])
                if (files.length > 0) {
                    onAttachFiles?.(files)
                }
                // Reset the input value to allow selecting the same file again
                e.target.value = ''
            },
            [onAttachFiles]
        )

        const handleVoiceClick = useCallback(() => {
            if (disabled) return
            onVoiceRecord?.()
        }, [disabled, onVoiceRecord])

        const handleFileRemove = useCallback(
            (fileId: string) => {
                onFileRemove?.(fileId)
            },
            [onFileRemove]
        )

        const handleFileClick = useCallback(
            (file: AttachedFile) => {
                onFileClick?.(file)
            },
            [onFileClick]
        )

        const handleTopQueryClick = useCallback(
            (query: TopQuery) => {
                onTopQuerySelect?.(query)
            },
            [onTopQuerySelect]
        )

        const overflowMenuItems = useMemo(() => {
            return createOverflowMenuItems(
                hiddenFiles,
                handleFileRemove,
                handleFileClick
            )
        }, [hiddenFiles, handleFileRemove, handleFileClick])

        return (
            <Block
                display="flex"
                flexDirection="column"
                width="100%"
                backgroundColor={disabled ? '#f9fafb' : '#ffffff'}
                border="1px solid #e5e7eb"
                borderRadius="12px"
                padding="12px 12px 8px 12px"
                minHeight="52px"
                position="relative"
                transition="background-color 0.2s ease"
                cursor={disabled ? 'not-allowed' : 'default'}
                _hover={{
                    backgroundColor: disabled ? '#f9fafb' : '#f9fafb',
                }}
            >
                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    accept="image/*,.pdf,.csv,.txt,.doc,.docx"
                />

                {/* Files container */}
                {attachedFiles.length > 0 && (
                    <Block
                        display="flex"
                        flexWrap="wrap"
                        gap="8px"
                        padding="0 0 8px 0"
                        maxHeight="140px"
                        overflowY="auto"
                    >
                        {visibleFiles.map((file) => (
                            <Tag
                                key={file.id}
                                text={file.name}
                                variant={TagVariant.SUBTLE}
                                color={TagColor.NEUTRAL}
                                size={TagSize.SM}
                                leftSlot={getFileIcon(file.type)}
                                rightSlot={
                                    <X
                                        size={12}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleFileRemove(file.id)
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    />
                                }
                                onClick={() => handleFileClick(file)}
                            />
                        ))}

                        {hasOverflow && (
                            <Menu
                                trigger={
                                    <button
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            backgroundColor: '#f3f4f6',
                                            color: '#4b5563',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '4px',
                                            padding: '6px 10px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                '#e5e7eb'
                                            e.currentTarget.style.color =
                                                '#374151'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                '#f3f4f6'
                                            e.currentTarget.style.color =
                                                '#4b5563'
                                        }}
                                    >
                                        <Plus size={14} />
                                        {hiddenFiles.length} more
                                    </button>
                                }
                                items={[
                                    {
                                        items: overflowMenuItems,
                                    },
                                ]}
                                open={overflowMenuOpen}
                                onOpenChange={setOverflowMenuOpen}
                                {...overflowMenuProps}
                            />
                        )}
                    </Block>
                )}

                {/* Textarea */}
                <textarea
                    ref={textareaElement}
                    value={value}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedBy}
                    rows={1}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#111827',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        padding: '0',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        fontFamily: 'inherit',
                        width: '100%',
                        minHeight: '24px',
                        overflowY: 'auto',
                        cursor: disabled ? 'not-allowed' : 'text',
                    }}
                />

                {/* Bottom actions */}
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding="0"
                    gap="16px"
                    marginTop="16px"
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        leadingIcon={
                            attachButtonIcon || <Paperclip size={20} />
                        }
                        onClick={handleAttachClick}
                        disabled={disabled}
                        aria-label="Attach files"
                    />

                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        leadingIcon={voiceButtonIcon || <Mic size={20} />}
                        onClick={handleVoiceClick}
                        disabled={disabled}
                        aria-label="Record voice message"
                    />
                </Block>

                {/* Top Queries */}
                {topQueries && topQueries.length > 0 && (
                    <Block
                        borderTop="1px solid #e5e7eb"
                        marginTop="16px"
                        paddingTop="0"
                        display="flex"
                        flexDirection="column"
                        maxHeight={
                            topQueriesMaxHeight
                                ? `${topQueriesMaxHeight}px`
                                : undefined
                        }
                    >
                        <Block
                            backgroundColor="#ffffff"
                            flexShrink="0"
                            padding="16px 8px 6px 8px"
                        >
                            <Text
                                color="#9ca3af"
                                fontSize="12px"
                                fontWeight="400"
                                margin="0"
                                textTransform="uppercase"
                            >
                                Top Queries
                            </Text>
                        </Block>
                        <Block
                            overflowY="auto"
                            maxHeight={
                                topQueriesMaxHeight
                                    ? `${topQueriesMaxHeight - 40}px`
                                    : undefined
                            }
                        >
                            {topQueries.map((query) => (
                                <button
                                    key={query.id}
                                    onClick={() => handleTopQueryClick(query)}
                                    disabled={disabled}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        color: '#4b5563',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        padding: '6px 8px',
                                        cursor: disabled
                                            ? 'not-allowed'
                                            : 'pointer',
                                        transition: 'all 0.2s ease',
                                        opacity: disabled ? '0.5' : '1',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!disabled) {
                                            e.currentTarget.style.backgroundColor =
                                                '#f9fafb'
                                            e.currentTarget.style.color =
                                                '#374151'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            'transparent'
                                        e.currentTarget.style.color = '#4b5563'
                                    }}
                                >
                                    {query.text}
                                </button>
                            ))}
                        </Block>
                    </Block>
                )}
            </Block>
        )
    }
)

ChatInput.displayName = 'ChatInput'

export default ChatInput

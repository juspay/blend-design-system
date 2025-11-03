import React, {
    useState,
    useRef,
    useCallback,
    useMemo,
    forwardRef,
} from 'react'
import { ChatInputProps, AttachedFile, TopQuery } from './types'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Tag from '../Tags/Tags'
import { TagColor, TagSize, TagVariant } from '../Tags/types'
import { Menu } from '../Menu'
import Button from '../Button/Button'
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'
import Text from '../Text/Text'
import { Paperclip, Mic, X, Plus } from 'lucide-react'
import { getChatInputTokens } from './chatInput.tokens'
import { FOUNDATION_THEME } from '../../tokens'
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
        const tokens = getChatInputTokens(FOUNDATION_THEME).sm
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
                backgroundColor={
                    disabled
                        ? tokens.container.backgroundColor.disabled
                        : attachedFiles.length > 0
                          ? FOUNDATION_THEME.colors.gray[50]
                          : tokens.container.backgroundColor.default
                }
                border={tokens.container.border}
                borderRadius={tokens.container.borderRadius}
                paddingTop={tokens.container.paddingTop}
                paddingRight={tokens.container.paddingRight}
                paddingBottom={tokens.container.paddingBottom}
                paddingLeft={tokens.container.paddingLeft}
                gap={tokens.container.gap}
                minHeight={tokens.container.minHeight}
                position="relative"
                transition={tokens.container.transition}
                cursor={disabled ? 'not-allowed' : 'default'}
                boxShadow={tokens.container.boxShadow.default}
                _hover={{
                    backgroundColor: disabled
                        ? tokens.container.backgroundColor.disabled
                        : tokens.container.backgroundColor.hover,
                    boxShadow: disabled
                        ? tokens.container.boxShadow.default
                        : tokens.container.boxShadow.hover,
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
                        gap={tokens.filesContainer.gap}
                        maxHeight={tokens.filesContainer.maxHeight}
                        overflowY={tokens.filesContainer.overflowY}
                    >
                        {visibleFiles.map((file) => (
                            <Tag
                                key={file.id}
                                text={file.name}
                                variant={TagVariant.SUBTLE}
                                color={TagColor.NEUTRAL}
                                size={TagSize.XS}
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
                                    <PrimitiveButton
                                        display="flex"
                                        alignItems="center"
                                        gap={tokens.overflowTag.gap}
                                        backgroundColor={
                                            tokens.overflowTag.backgroundColor
                                                .default as string
                                        }
                                        color={
                                            tokens.overflowTag.color
                                                .default as string
                                        }
                                        paddingX={tokens.overflowTag.paddingX}
                                        paddingY={tokens.overflowTag.paddingY}
                                        fontSize={tokens.overflowTag.fontSize}
                                        fontWeight={
                                            tokens.overflowTag.fontWeight
                                        }
                                        cursor={tokens.overflowTag.cursor}
                                        _hover={{
                                            backgroundColor:
                                                tokens.container.backgroundColor
                                                    .hover,
                                        }}
                                    >
                                        <Plus size={14} />
                                        {hiddenFiles.length} more
                                    </PrimitiveButton>
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

                {attachedFiles.length > 0 ? (
                    <Block
                        backgroundColor={
                            tokens.attachmentContainer.backgroundColor
                        }
                        borderRadius={tokens.attachmentContainer.borderRadius}
                        padding={tokens.attachmentContainer.padding}
                    >
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
                                backgroundColor:
                                    tokens.textarea.backgroundColor,
                                color: tokens.textarea.color,
                                fontSize: tokens.textarea.fontSize,
                                lineHeight: tokens.textarea.lineHeight,
                                padding: `${tokens.textarea.paddingY} ${tokens.textarea.paddingX}`,
                                border: tokens.textarea.border,
                                borderRadius: tokens.textarea.borderRadius,
                                outline: 'none',
                                resize: tokens.textarea.resize,
                                fontFamily: tokens.textarea.fontFamily,
                                width: '100%',
                                minHeight: tokens.textarea.minHeight,
                                maxHeight: tokens.textarea.maxHeight,
                                overflowY: tokens.textarea.overflowY,
                                cursor: disabled ? 'not-allowed' : 'text',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.parentElement!.parentElement!.style.boxShadow =
                                    tokens.container.boxShadow.focus as string
                            }}
                            onBlur={(e) => {
                                e.currentTarget.parentElement!.parentElement!.style.boxShadow =
                                    tokens.container.boxShadow.default as string
                            }}
                        />
                        <Block
                            display="flex"
                            alignItems="center"
                            justifyContent={tokens.bottomActions.justifyContent}
                            paddingX={tokens.bottomActions.paddingX}
                            paddingY={tokens.bottomActions.paddingY}
                            gap={tokens.bottomActions.gap}
                            marginTop={tokens.bottomActions.gap}
                        >
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                subType={ButtonSubType.ICON_ONLY}
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
                                subType={ButtonSubType.ICON_ONLY}
                                leadingIcon={
                                    voiceButtonIcon || <Mic size={20} />
                                }
                                onClick={handleVoiceClick}
                                disabled={disabled}
                                aria-label="Record voice message"
                            />
                        </Block>
                    </Block>
                ) : (
                    <>
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
                                backgroundColor:
                                    tokens.textarea.backgroundColor,
                                color: tokens.textarea.color,
                                fontSize: tokens.textarea.fontSize,
                                lineHeight: tokens.textarea.lineHeight,
                                padding: `${tokens.textarea.paddingY} ${tokens.textarea.paddingX}`,
                                border: tokens.textarea.border,
                                borderRadius: tokens.textarea.borderRadius,
                                outline: 'none',
                                resize: tokens.textarea.resize,
                                fontFamily: tokens.textarea.fontFamily,
                                width: '100%',
                                minHeight: tokens.textarea.minHeight,
                                maxHeight: tokens.textarea.maxHeight,
                                overflowY: tokens.textarea.overflowY,
                                cursor: disabled ? 'not-allowed' : 'text',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.parentElement!.style.boxShadow =
                                    tokens.container.boxShadow.focus as string
                            }}
                            onBlur={(e) => {
                                e.currentTarget.parentElement!.style.boxShadow =
                                    tokens.container.boxShadow.default as string
                            }}
                        />
                        <Block
                            display="flex"
                            alignItems="center"
                            justifyContent={tokens.bottomActions.justifyContent}
                            paddingX={tokens.bottomActions.paddingX}
                            paddingY={tokens.bottomActions.paddingY}
                            gap={tokens.bottomActions.gap}
                        >
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                subType={ButtonSubType.ICON_ONLY}
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
                                subType={ButtonSubType.ICON_ONLY}
                                leadingIcon={
                                    voiceButtonIcon || <Mic size={20} />
                                }
                                onClick={handleVoiceClick}
                                disabled={disabled}
                                aria-label="Record voice message"
                            />
                        </Block>
                    </>
                )}

                {topQueries && topQueries.length > 0 && (
                    <Block
                        borderTop={tokens.topQueries.container.borderTop}
                        paddingTop={tokens.topQueries.container.paddingTop}
                        display="flex"
                        flexDirection="column"
                        maxHeight={
                            topQueriesMaxHeight
                                ? `${topQueriesMaxHeight}px`
                                : undefined
                        }
                    >
                        <Block
                            backgroundColor={
                                tokens.topQueries.header.backgroundColor
                            }
                            flexShrink={tokens.topQueries.header.flexShrink}
                            paddingX={tokens.topQueries.header.paddingX}
                            paddingY={tokens.topQueries.header.paddingY}
                        >
                            <Text
                                color={tokens.topQueries.header.color}
                                fontSize={tokens.topQueries.header.fontSize}
                                fontWeight={tokens.topQueries.header.fontWeight}
                                textTransform={
                                    tokens.topQueries.header.textTransform
                                }
                            >
                                Top Queries
                            </Text>
                        </Block>
                        <Block
                            overflowY={
                                tokens.topQueries.scrollContainer.overflowY
                            }
                            maxHeight={
                                topQueriesMaxHeight
                                    ? `${topQueriesMaxHeight - tokens.topQueries.scrollContainer.maxHeightOffset}px`
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
                                        background: disabled
                                            ? (tokens.topQueries.item
                                                  .backgroundColor
                                                  .disabled as string)
                                            : (tokens.topQueries.item
                                                  .backgroundColor
                                                  .default as string),
                                        border: tokens.topQueries.item.border,
                                        color: disabled
                                            ? (tokens.topQueries.item.color
                                                  .disabled as string)
                                            : (tokens.topQueries.item.color
                                                  .default as string),
                                        fontSize:
                                            tokens.topQueries.item.fontSize,
                                        fontWeight:
                                            tokens.topQueries.item.fontWeight,
                                        padding: `${tokens.topQueries.item.paddingY} ${tokens.topQueries.item.paddingX}`,
                                        cursor: disabled
                                            ? 'not-allowed'
                                            : tokens.topQueries.item.cursor,
                                        transition:
                                            tokens.topQueries.item.transition,
                                        opacity: disabled
                                            ? tokens.topQueries.item.opacity
                                                  .disabled
                                            : tokens.topQueries.item.opacity
                                                  .default,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!disabled) {
                                            e.currentTarget.style.backgroundColor =
                                                tokens.topQueries.item
                                                    .backgroundColor
                                                    .hover as string
                                            e.currentTarget.style.color = tokens
                                                .topQueries.item.color
                                                .hover as string
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            tokens.topQueries.item
                                                .backgroundColor
                                                .default as string
                                        e.currentTarget.style.color = tokens
                                            .topQueries.item.color
                                            .default as string
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

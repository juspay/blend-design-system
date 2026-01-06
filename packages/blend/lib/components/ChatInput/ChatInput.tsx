import React, {
    useState,
    useRef,
    useCallback,
    useMemo,
    forwardRef,
    useEffect,
    useId,
} from 'react'
import { ChatInputProps, AttachedFile, TopQuery } from './types'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Button from '../Button/Button'
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'
import Text from '../Text/Text'
import { Paperclip, FileMinus, Image, FileText } from 'lucide-react'
import { ChatInputTokensType } from './chatInput.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import {
    handleAutoResize,
    isValidMessageLength,
    filterDuplicateFiles,
} from './utils'
import PrimitiveInput from '../Primitives/PrimitiveInput/PrimitiveInput'
import { addSnackbar, SnackbarVariant } from '../Snackbar'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import MobileChatInput from './MobileChatInput'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import PrimitiveTextarea from '../Primitives/PrimitiveTextArea'
import AttachmentFile from './AttachmentFile'

export const getDocIcon = (fileType: AttachedFile['type']): React.ReactNode => {
    switch (fileType) {
        case 'image':
            return <Image color={FOUNDATION_THEME.colors.gray[600]} size={12} />
        case 'pdf':
            return (
                <FileMinus
                    color={FOUNDATION_THEME.colors.gray[600]}
                    size={12}
                />
            )
        case 'csv':
            return (
                <FileMinus
                    color={FOUNDATION_THEME.colors.gray[600]}
                    size={12}
                />
            )
        case 'text':
            return (
                <FileText color={FOUNDATION_THEME.colors.gray[600]} size={12} />
            )
        default:
            return (
                <FileMinus
                    color={FOUNDATION_THEME.colors.gray[600]}
                    size={12}
                />
            )
    }
    return '📎'
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
    (
        {
            value = '',
            slot1,
            onChange,
            onAttachFiles,
            onFileRemove,
            onFileClick,
            placeholder = 'Type a message...',
            disabled = false,
            maxLength,
            autoResize = true,
            attachedFiles = [],
            topQueries = [],
            onTopQuerySelect,
            topQueriesMaxHeight = 200,
            attachButtonIcon,
            overflowMenuProps,
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedBy,
            ...textAreaProps
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<ChatInputTokensType>('CHAT_INPUT')
        const textareaRef = useRef<HTMLTextAreaElement>(null)
        const fileInputRef = useRef<HTMLInputElement>(null)
        const containerRef = useRef<HTMLDivElement>(null!)
        const [isTextareaFocused, setIsTextareaFocused] = useState(false)
        const [focusedQueryIndex, setFocusedQueryIndex] = useState<number>(-1)

        const generatedId = useId()
        const chatInputId = `chat-input-${generatedId}`
        const topQueriesId = `chat-input-queries-${generatedId}`
        const characterCountId = `chat-input-count-${generatedId}`
        const fileInputLabelId = `chat-input-file-label-${generatedId}`

        const textareaElement =
            (ref as React.RefObject<HTMLTextAreaElement>) || textareaRef

        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < BREAKPOINTS.lg

        const handleTextareaChange = useCallback(
            (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const newValue = e.target.value
                if (!isValidMessageLength(newValue, maxLength)) return

                onChange?.(newValue)
                handleAutoResize(textareaElement.current, autoResize)
            },
            [onChange, maxLength, autoResize, textareaElement]
        )

        const handleAttachClick = useCallback(() => {
            if (disabled) return
            fileInputRef.current?.click()
        }, [disabled])

        const handleFileInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const files = Array.from(e.target.files || [])
                if (files.length > 0) {
                    // Filter out duplicate files
                    const { newFiles, duplicateFiles } = filterDuplicateFiles(
                        files,
                        attachedFiles
                    )

                    // Show snackbar if duplicates were found
                    if (duplicateFiles.length > 0) {
                        const duplicateCount = duplicateFiles.length
                        const message =
                            duplicateCount === 1
                                ? `File "${duplicateFiles[0]}" is already attached`
                                : `${duplicateCount} duplicate file(s) were not added`

                        addSnackbar({
                            header: 'Duplicate File',
                            description: message,
                            variant: SnackbarVariant.WARNING,
                            duration: 3000,
                        })
                    }

                    // Only call onAttachFiles with non-duplicate files
                    if (newFiles.length > 0) {
                        onAttachFiles?.(newFiles)
                    }
                }
                // Reset the input value to allow selecting the same file again
                e.target.value = ''
            },
            [onAttachFiles, attachedFiles]
        )

        const handleTopQueryClick = useCallback(
            (query: TopQuery) => {
                onTopQuerySelect?.(query)
                setIsTextareaFocused(false)
                setFocusedQueryIndex(-1)
            },
            [onTopQuerySelect]
        )

        const handleTopQueryKeyDown = useCallback(
            (e: React.KeyboardEvent, query: TopQuery) => {
                if (disabled) return

                switch (e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault()
                        handleTopQueryClick(query)
                        break
                    case 'ArrowDown':
                        e.preventDefault()
                        setFocusedQueryIndex((prev) =>
                            prev < topQueries.length - 1 ? prev + 1 : prev
                        )
                        break
                    case 'ArrowUp':
                        e.preventDefault()
                        setFocusedQueryIndex((prev) =>
                            prev > 0 ? prev - 1 : -1
                        )
                        break
                    case 'Escape':
                        e.preventDefault()
                        setIsTextareaFocused(false)
                        setFocusedQueryIndex(-1)
                        textareaElement.current?.focus()
                        break
                    case 'Home':
                        e.preventDefault()
                        setFocusedQueryIndex(0)
                        break
                    case 'End':
                        e.preventDefault()
                        setFocusedQueryIndex(topQueries.length - 1)
                        break
                }
            },
            [disabled, topQueries.length, handleTopQueryClick, textareaElement]
        )

        useEffect(() => {
            if (focusedQueryIndex >= 0 && topQueries.length > 0) {
                const queryElement = document.querySelector(
                    `[data-query-index="${focusedQueryIndex}"]`
                ) as HTMLElement
                queryElement?.focus()
            } else if (topQueries.length === 0) {
                setFocusedQueryIndex(-1)
            }
        }, [focusedQueryIndex, topQueries.length])

        const textareaAriaDescribedBy = useMemo(() => {
            const parts = [
                ariaDescribedBy,
                maxLength && characterCountId,
            ].filter(Boolean)
            return parts.length > 0 ? parts.join(' ') : undefined
        }, [ariaDescribedBy, maxLength, characterCountId])

        const hiddenFileInput = (
            <PrimitiveInput
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
                accept="image/*,.pdf,.csv,.txt,.doc,.docx"
                aria-label="Attach files"
                id={fileInputLabelId}
            />
        )

        if (isMobile) {
            return (
                <>
                    {hiddenFileInput}
                    <MobileChatInput
                        value={value}
                        onChange={onChange || (() => {})}
                        slot1={slot1}
                        placeholder={placeholder}
                        attachedFiles={attachedFiles}
                        handleAttachClick={handleAttachClick}
                        onFileRemove={onFileRemove}
                        onFileClick={onFileClick}
                        overflowMenuProps={overflowMenuProps}
                        // containerRef={containerRef}
                    />
                </>
            )
        }

        return (
            <Block
                data-chatinput={placeholder || 'Message input'}
                data-status={disabled ? 'disabled' : 'enabled'}
                ref={containerRef}
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
                border={tokens.container.border.default}
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
            >
                {hiddenFileInput}
                {/* Files container */}
                {attachedFiles.length > 0 && (
                    <AttachmentFile
                        attachedFiles={attachedFiles}
                        onFileRemove={onFileRemove}
                        onFileClick={onFileClick}
                        overflowMenuProps={overflowMenuProps}
                        containerRef={containerRef}
                    />
                )}
                <Block
                    backgroundColor={
                        attachedFiles.length > 0
                            ? tokens.attachmentContainer.backgroundColor
                            : 'transparent'
                    }
                    borderRadius={
                        attachedFiles.length > 0
                            ? tokens.attachmentContainer.borderRadius
                            : 0
                    }
                    padding={
                        attachedFiles.length > 0
                            ? tokens.attachmentContainer.padding
                            : 0
                    }
                >
                    <PrimitiveTextarea
                        ref={textareaElement}
                        value={value}
                        onChange={handleTextareaChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        maxLength={maxLength}
                        aria-label={ariaLabel || 'Message input'}
                        aria-describedby={textareaAriaDescribedBy}
                        aria-invalid={
                            maxLength && value.length > maxLength
                                ? true
                                : undefined
                        }
                        id={chatInputId}
                        rows={1}
                        backgroundColor={tokens.textarea.backgroundColor}
                        color={tokens.textarea.color}
                        fontSize={tokens.textarea.fontSize}
                        paddingX={tokens.textarea.paddingX}
                        paddingY={tokens.textarea.paddingY}
                        border={tokens.textarea.border}
                        borderRadius={tokens.textarea.borderRadius}
                        outline="none"
                        resize={tokens.textarea.resize}
                        fontFamily={tokens.textarea.fontFamily}
                        width="100%"
                        minHeight={tokens.textarea.minHeight}
                        maxHeight={tokens.textarea.maxHeight}
                        overflowY={tokens.textarea.overflowY}
                        cursor={disabled ? 'not-allowed' : 'text'}
                        style={{ lineHeight: tokens.textarea.lineHeight }}
                        onFocus={(e) => {
                            setIsTextareaFocused(true)
                            const container =
                                e.currentTarget.parentElement!.parentElement!
                            container.style.boxShadow = tokens.container
                                .boxShadow.focus as string
                            container.style.border = tokens.container.border
                                .focus as string
                        }}
                        onBlur={(e) => {
                            setIsTextareaFocused(false)
                            const container =
                                e.currentTarget.parentElement!.parentElement!
                            container.style.boxShadow = tokens.container
                                .boxShadow.default as string
                            container.style.border = tokens.container.border
                                .default as string
                        }}
                        {...textAreaProps}
                    />
                    <Block
                        data-element="chat-input-actions"
                        display="flex"
                        alignItems="center"
                        justifyContent={tokens.bottomActions.justifyContent}
                        paddingX={tokens.bottomActions.paddingX}
                        paddingY={tokens.bottomActions.paddingY}
                        gap={tokens.bottomActions.gap}
                        marginTop={tokens.bottomActions.gap}
                        role="toolbar"
                        aria-label="Chat input actions"
                    >
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={
                                attachButtonIcon || <Paperclip size={14} />
                            }
                            onClick={handleAttachClick}
                            disabled={disabled}
                            aria-label="Attach files"
                            aria-describedby={fileInputLabelId}
                        />

                        {slot1}
                    </Block>
                </Block>

                {topQueries && topQueries.length > 0 && isTextareaFocused && (
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
                        role="region"
                        aria-label="Suggested queries"
                        id={topQueriesId}
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
                                id={`${topQueriesId}-label`}
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
                            role="listbox"
                            aria-labelledby={`${topQueriesId}-label`}
                        >
                            {topQueries.map((query, index) => {
                                const isFocused = focusedQueryIndex === index
                                const itemTokens = tokens.topQueries.item
                                return (
                                    <PrimitiveButton
                                        key={query.id}
                                        data-query-index={index}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleTopQueryClick(query)
                                        }}
                                        onKeyDown={(e) =>
                                            handleTopQueryKeyDown(e, query)
                                        }
                                        disabled={disabled}
                                        tabIndex={isFocused ? 0 : -1}
                                        role="option"
                                        aria-selected={isFocused}
                                        aria-label={`Query: ${query.text}`}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            background: disabled
                                                ? (itemTokens.backgroundColor
                                                      .disabled as string)
                                                : (itemTokens.backgroundColor
                                                      .default as string),
                                            border: itemTokens.border,
                                            color: disabled
                                                ? (itemTokens.color
                                                      .disabled as string)
                                                : (itemTokens.color
                                                      .default as string),
                                            fontSize: itemTokens.fontSize,
                                            fontWeight: itemTokens.fontWeight,
                                            padding: `${itemTokens.paddingY} ${itemTokens.paddingX}`,
                                            cursor: disabled
                                                ? 'not-allowed'
                                                : itemTokens.cursor,
                                            transition: itemTokens.transition,
                                            opacity: disabled
                                                ? itemTokens.opacity.disabled
                                                : itemTokens.opacity.default,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!disabled) {
                                                e.currentTarget.style.backgroundColor =
                                                    itemTokens.backgroundColor
                                                        .hover as string
                                                e.currentTarget.style.color =
                                                    itemTokens.color
                                                        .hover as string
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                itemTokens.backgroundColor
                                                    .default as string
                                            e.currentTarget.style.color =
                                                itemTokens.color
                                                    .default as string
                                        }}
                                    >
                                        {query.text}
                                    </PrimitiveButton>
                                )
                            })}
                        </Block>
                    </Block>
                )}
            </Block>
        )
    }
)

ChatInput.displayName = 'ChatInput'

export default ChatInput

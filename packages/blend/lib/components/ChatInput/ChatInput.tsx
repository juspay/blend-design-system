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
import { Tag } from '../../main'
import { TagColor, TagSize, TagVariant } from '../Tags/types'
import { Menu } from '../Menu'
import Button from '../Button/Button'
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'
import Text from '../Text/Text'
import { Paperclip, X, Plus, FileMinus, Image, FileText } from 'lucide-react'
import { getChatInputTokens } from './chatInput.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import {
    createOverflowMenuItems,
    handleAutoResize,
    isValidMessageLength,
    filterDuplicateFiles,
} from './utils'
import { capitalizeFirstLetter } from '../../global-utils/GlobalUtils'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { useDebounce } from '../../hooks/useDebounce'
import PrimitiveInput from '../Primitives/PrimitiveInput/PrimitiveInput'
import { addSnackbar, SnackbarVariant } from '../Snackbar'
import { Tooltip } from '../Tooltip/Tooltip'

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
        const tokens = getChatInputTokens(FOUNDATION_THEME).sm
        const textareaRef = useRef<HTMLTextAreaElement>(null)
        const fileInputRef = useRef<HTMLInputElement>(null)
        const filesContainerRef = useRef<HTMLDivElement>(null)
        const containerRef = useRef<HTMLDivElement>(null!)
        const lastWidth = useRef<number>(0)
        const isExpanding = useRef<boolean>(false)
        const [overflowMenuOpen, setOverflowMenuOpen] = useState(false)
        const [isTextareaFocused, setIsTextareaFocused] = useState(false)
        const [cutOffIndex, setCutOffIndex] = useState<number>(
            attachedFiles.length
        )
        const [focusedQueryIndex, setFocusedQueryIndex] = useState<number>(-1)

        const generatedId = useId()
        const chatInputId = `chat-input-${generatedId}`
        const filesRegionId = `chat-input-files-${generatedId}`
        const topQueriesId = `chat-input-queries-${generatedId}`
        const characterCountId = `chat-input-count-${generatedId}`
        const fileInputLabelId = `chat-input-file-label-${generatedId}`

        const textareaElement =
            (ref as React.RefObject<HTMLTextAreaElement>) || textareaRef

        // Dynamic overflow calculation
        const handleResize = useCallback(() => {
            if (!filesContainerRef.current || attachedFiles.length === 0) return

            const container = filesContainerRef.current
            const containerRect = container.getBoundingClientRect()
            const containerWidth = containerRect.width

            const BUFFER = 30
            const MORE_BUTTON_ESTIMATED_WIDTH = 100
            const GAP_SIZE = 8 // from tokens.filesContainer.gap

            const fileItems = Array.from(container.children).filter(
                (child) => !child.classList.contains('overflow-menu-trigger')
            )

            if (
                isExpanding.current &&
                fileItems.length < attachedFiles.length
            ) {
                setCutOffIndex(attachedFiles.length)
                isExpanding.current = false

                setTimeout(() => {
                    handleResize()
                }, 50)
                return
            }

            let totalWidth = 0
            let optimalCutoff = 0

            for (
                let i = 0;
                i < Math.min(fileItems.length, attachedFiles.length);
                i++
            ) {
                const itemWidth = (
                    fileItems[i] as HTMLElement
                ).getBoundingClientRect().width

                const totalGaps = i > 0 ? i * GAP_SIZE : 0

                const remainingItems = attachedFiles.length - (i + 1)
                const needsMoreButton = remainingItems > 0
                const requiredSpace =
                    totalWidth +
                    itemWidth +
                    totalGaps +
                    (needsMoreButton
                        ? MORE_BUTTON_ESTIMATED_WIDTH + GAP_SIZE
                        : 0) +
                    BUFFER

                if (requiredSpace <= containerWidth) {
                    totalWidth += itemWidth
                    optimalCutoff = i + 1
                } else {
                    break
                }
            }

            const newCutoff = Math.max(
                1,
                Math.min(optimalCutoff, attachedFiles.length)
            )
            setCutOffIndex(newCutoff)
        }, [attachedFiles.length])

        const debouncedResize = useDebounce(handleResize, 150)

        // Watch for container width changes
        useResizeObserver(containerRef, ({ width }) => {
            if (width && Math.abs(width - lastWidth.current) > 10) {
                if (width > lastWidth.current + 20) {
                    isExpanding.current = true
                }

                lastWidth.current = width
                debouncedResize()
            }
        })

        // Reset cutoff when files change
        useEffect(() => {
            setCutOffIndex(attachedFiles.length)
            isExpanding.current = false

            const timeoutId = setTimeout(() => {
                handleResize()
            }, 150)

            return () => clearTimeout(timeoutId)
        }, [attachedFiles.length, handleResize])

        const visibleFiles = useMemo(() => {
            return attachedFiles.slice(0, cutOffIndex)
        }, [attachedFiles, cutOffIndex])

        const hiddenFiles = useMemo(() => {
            return attachedFiles.slice(cutOffIndex)
        }, [attachedFiles, cutOffIndex])

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

        const overflowMenuItems = useMemo(() => {
            return createOverflowMenuItems(
                hiddenFiles,
                onFileRemove || (() => {}),
                onFileClick || (() => {})
            )
        }, [hiddenFiles, onFileRemove, onFileClick])

        return (
            <Block
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
                {/* Hidden file input */}
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
                {/* Files container */}
                {attachedFiles.length > 0 && (
                    <Block
                        ref={filesContainerRef}
                        display="flex"
                        gap={tokens.filesContainer.gap}
                        maxHeight={tokens.filesContainer.maxHeight}
                        overflowY={tokens.filesContainer.overflowY}
                        role="region"
                        aria-label={`${attachedFiles.length} file${
                            attachedFiles.length !== 1 ? 's' : ''
                        } attached`}
                        id={filesRegionId}
                    >
                        {visibleFiles.map((file) => {
                            const fileName =
                                file.name || capitalizeFirstLetter(file.type)
                            return (
                                <Tooltip key={file.id} content={file.name}>
                                    <Tag
                                        key={file.id}
                                        text={capitalizeFirstLetter(file.type)}
                                        variant={TagVariant.SUBTLE}
                                        color={TagColor.NEUTRAL}
                                        size={TagSize.XS}
                                        leftSlot={getDocIcon(file.type)}
                                        rightSlot={
                                            <X
                                                size={12}
                                                aria-hidden="true"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onFileRemove?.(file.id)
                                                }}
                                                aria-label={`Remove ${fileName} file`}
                                            />
                                        }
                                        onClick={(e) => {
                                            const target =
                                                e.target as HTMLElement
                                            if (
                                                target.closest(
                                                    '[aria-label*="Remove"]'
                                                )
                                            ) {
                                                return
                                            }
                                            onFileClick?.(file)
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Delete' ||
                                                e.key === 'Backspace'
                                            ) {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                onFileRemove?.(file.id)
                                            }
                                        }}
                                        aria-label={`${fileName} file, press Delete to remove, click to view`}
                                    />
                                </Tooltip>
                            )
                        })}

                        {hasOverflow && (
                            <Block className="overflow-menu-trigger">
                                <Menu
                                    trigger={
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                            subType={ButtonSubType.INLINE}
                                            leadingIcon={<Plus size={14} />}
                                            text={`${hiddenFiles.length} more`}
                                            aria-label={`Show ${hiddenFiles.length} more attached file${
                                                hiddenFiles.length !== 1
                                                    ? 's'
                                                    : ''
                                            }`}
                                        >
                                            <Plus size={14} />
                                            {hiddenFiles.length} more
                                        </Button>
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
                            </Block>
                        )}
                    </Block>
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
                    <textarea
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
                        style={{
                            backgroundColor: tokens.textarea.backgroundColor,
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

import React, {
    useState,
    useRef,
    useCallback,
    useMemo,
    forwardRef,
    useEffect,
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
import { Paperclip, X, Plus, FileMinus, Image, FileText } from 'lucide-react'
import { getChatInputTokens } from './chatInput.tokens'
import { FOUNDATION_THEME } from '../../tokens'
import {
    createOverflowMenuItems,
    handleAutoResize,
    isValidMessageLength,
} from './utils'
import { capitalizeFirstLetter } from '../../global-utils/GlobalUtils'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { useDebounce } from '../../hooks/useDebounce'
import PrimitiveInput from '../Primitives/PrimitiveInput/PrimitiveInput'

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

        // Use the passed ref or our internal ref
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
                    onAttachFiles?.(files)
                }
                // Reset the input value to allow selecting the same file again
                e.target.value = ''
            },
            [onAttachFiles]
        )

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
                />
                {/* Files container */}
                {attachedFiles.length > 0 && (
                    <Block
                        ref={filesContainerRef}
                        display="flex"
                        gap={tokens.filesContainer.gap}
                        maxHeight={tokens.filesContainer.maxHeight}
                        overflowY={tokens.filesContainer.overflowY}
                    >
                        {visibleFiles.map((file) => (
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
                            <Block className="overflow-menu-trigger">
                                <Menu
                                    trigger={
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                            subType={ButtonSubType.INLINE}
                                            leadingIcon={<Plus size={14} />}
                                            text={`${hiddenFiles.length} more`}
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
                        aria-label={ariaLabel}
                        aria-describedby={ariaDescribedBy}
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
                                <PrimitiveButton
                                    key={query.id}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        handleTopQueryClick(query)
                                    }}
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
                                </PrimitiveButton>
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

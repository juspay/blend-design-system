import React, {
    useRef,
    useMemo,
    useState,
    useId,
    useCallback,
    useEffect,
} from 'react'
import { AttachedFile } from './types'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { Paperclip, X, Plus } from 'lucide-react'
import { Tag } from '../../main'
import { TagColor, TagSize, TagVariant } from '../Tags/types'
import { Menu } from '../Menu'
import Button from '../Button/Button'
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'
import { Tooltip } from '../Tooltip/Tooltip'
import { getDocIcon } from './ChatInput'
import { capitalizeFirstLetter } from '../../global-utils/GlobalUtils'
import {
    computeChatInputFileOverflowCutoff,
    createOverflowMenuItems,
    truncateTextareaPlaceholder,
} from './utils'
import { getChatInputTokens } from './chatInput.tokens'
import { getMobileChatInputTokens } from './mobileChatInput.token'
import { FOUNDATION_THEME } from '../../tokens'
import type { MenuProps } from '../Menu/types'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { useDebounce } from '../../hooks/useDebounce'

type MobileChatInputProps = {
    slot1?: React.ReactNode
    value: string
    onChange?: (value: string) => void
    onAttachFileClick?: () => void
    attachButtonIcon?: React.ReactNode
    disabled?: boolean
    attachedFiles?: AttachedFile[]
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: AttachedFile) => void
    overflowMenuProps?: Partial<MenuProps>
    placeholder?: string
}

const MobileChatInput = ({
    slot1,
    value,
    onChange,
    onAttachFileClick,
    attachButtonIcon,
    disabled,
    attachedFiles = [],
    onFileRemove,
    onFileClick,
    overflowMenuProps,
    placeholder,
}: MobileChatInputProps) => {
    const tokens = getChatInputTokens(FOUNDATION_THEME).sm
    const mobileTokens = getMobileChatInputTokens(FOUNDATION_THEME).sm
    const textareaMobileTokens = mobileTokens.textareaMobile
    const textareaCollapsedBorderRadius = textareaMobileTokens.borderRadius
        .default as string
    const textareaExpandedBorderRadius = textareaMobileTokens.borderRadius
        .focus as string
    const textareaCollapsedHeight =
        parseFloat(textareaMobileTokens.height.default as string) || 44

    // Calculate attachment button width and gap from tokens
    const attachmentButtonDimensions = useMemo(() => {
        // Button uses FOUNDATION_THEME.unit[12] for padding
        const buttonPadding = FOUNDATION_THEME.unit[12]
        const paddingValue =
            parseFloat(String(buttonPadding).replace('px', '')) || 12
        // Icon size is 16px (Paperclip size={16})
        const iconSize = 16
        // Button width = icon size + padding left + padding right
        const buttonWidth = `${iconSize + paddingValue * 2}px`
        // Gap between button and textarea (currently hardcoded as 8, using unit[8] from tokens)
        const gap = FOUNDATION_THEME.unit[8]
        const total = `calc(${buttonWidth} + ${gap})`

        return {
            buttonWidth,
            gap,
            total,
        }
    }, [])

    const filesContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null!)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const textareaContainerRef = useRef<HTMLDivElement>(null)
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const initialBottomRef = useRef<number | null>(null)
    const lastWidth = useRef<number>(0)
    const isExpanding = useRef<boolean>(false)
    const [truncatedPlaceholder, setTruncatedPlaceholder] = useState<string>('')
    const [overflowMenuOpen, setOverflowMenuOpen] = useState(false)
    const [cutOffIndex, setCutOffIndex] = useState<number>(attachedFiles.length)
    const [isCalculating, setIsCalculating] = useState(true)
    const generatedId = useId()
    const filesRegionId = `chat-input-files-${generatedId}`

    // Dynamic overflow calculation based on available width
    const handleResize = useCallback(() => {
        if (!filesContainerRef.current || attachedFiles.length === 0) return

        const BUFFER = 30
        const MORE_BUTTON_ESTIMATED_WIDTH = 100
        const GAP_SIZE = 8 // from tokens.filesContainer.gap

        const { cutoff: newCutoff, itemCount } =
            computeChatInputFileOverflowCutoff({
                container: filesContainerRef.current,
                attachedFilesLength: attachedFiles.length,
                gapSize: GAP_SIZE,
                buffer: BUFFER,
                moreButtonEstimatedWidth: MORE_BUTTON_ESTIMATED_WIDTH,
                overflowTriggerClassName: 'overflow-menu-trigger',
            })

        if (isExpanding.current && itemCount < attachedFiles.length) {
            setCutOffIndex(attachedFiles.length)
            isExpanding.current = false

            setTimeout(() => {
                handleResize()
            }, 50)
            return
        }

        setCutOffIndex(newCutoff)
        setIsCalculating(false)
    }, [attachedFiles.length])

    const debouncedResize = useDebounce(handleResize, 150)

    // Watch for container width changes - watch the parent container to detect available width changes
    useResizeObserver(containerRef, ({ width }) => {
        if (width && Math.abs(width - lastWidth.current) > 10) {
            if (width > lastWidth.current + 20) {
                isExpanding.current = true
            }

            lastWidth.current = width
            debouncedResize()
        }
    })

    // Reset cutoff when files change and calculate immediately
    useEffect(() => {
        if (attachedFiles.length === 0) {
            setCutOffIndex(0)
            setIsCalculating(false)
            return
        }

        setCutOffIndex(attachedFiles.length) // Show all initially but hide overflow
        setIsCalculating(true)
        isExpanding.current = false

        // Use requestAnimationFrame to calculate after DOM is ready
        const rafId = requestAnimationFrame(() => {
            // Use double RAF to ensure layout is complete
            requestAnimationFrame(() => {
                handleResize()
            })
        })

        return () => cancelAnimationFrame(rafId)
    }, [attachedFiles.length, handleResize])

    const visibleFiles = useMemo(() => {
        return attachedFiles.slice(0, cutOffIndex)
    }, [attachedFiles, cutOffIndex])

    const hiddenFiles = useMemo(() => {
        return attachedFiles.slice(cutOffIndex)
    }, [attachedFiles, cutOffIndex])

    const hasOverflow = hiddenFiles.length > 0

    const overflowMenuItems = useMemo(() => {
        return createOverflowMenuItems(
            hiddenFiles,
            onFileRemove || (() => {}),
            onFileClick || (() => {})
        )
    }, [hiddenFiles, onFileRemove, onFileClick])

    // Optimized function to update textarea and files container positioning
    const updateTextareaAndFilesPosition = useCallback(() => {
        if (!textareaRef.current || !textareaContainerRef.current) return

        const textarea = textareaRef.current
        const container = textareaContainerRef.current
        const MIN_HEIGHT = 44
        const MAX_HEIGHT = 100
        const hasContent = value && value.trim() !== ''

        // Calculate initial bottom position if not set (only once on mount)
        if (initialBottomRef.current === null) {
            // Get position while textarea is still in static/default state
            const textareaRect = textarea.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            initialBottomRef.current =
                containerRect.bottom - textareaRect.bottom
        }

        // Always position textarea absolutely to prevent position jumps
        textarea.style.position = 'absolute'
        textarea.style.bottom =
            initialBottomRef.current !== null
                ? `${initialBottomRef.current}px`
                : '0px'
        textarea.style.left = '0'
        textarea.style.right = '0'
        textarea.style.width = '100%'
        textarea.style.paddingRight = slot1 ? '40px' : '0'
        textarea.style.zIndex = '0'

        // Calculate new height
        // First, set height to minimum to check if content overflows
        textarea.style.height = `${MIN_HEIGHT}px`
        textarea.style.overflowY = 'hidden'

        // Force a reflow to get accurate scrollHeight
        void textarea.offsetHeight

        // Check if content overflows at minimum height
        const scrollHeightAtMin = textarea.scrollHeight
        const isOverflowing = scrollHeightAtMin > MIN_HEIGHT

        let newHeight = MIN_HEIGHT

        // Only grow if content actually overflows
        if (hasContent && isOverflowing) {
            // Now set to auto to get the full content height
            textarea.style.height = 'auto'
            const fullScrollHeight = textarea.scrollHeight
            newHeight = Math.min(fullScrollHeight, MAX_HEIGHT)
            textarea.style.height = `${newHeight}px`
            textarea.style.overflowY =
                fullScrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
        } else {
            // Keep at minimum height
            textarea.style.height = `${MIN_HEIGHT}px`
            textarea.style.overflowY = 'hidden'
        }

        // Border radius should reflect the current (collapsed vs expanded) height
        textarea.style.borderRadius =
            newHeight > MIN_HEIGHT
                ? textareaExpandedBorderRadius
                : textareaCollapsedBorderRadius

        // Position files container absolutely above textarea (only if files exist)
        if (filesContainerRef.current && attachedFiles.length > 0) {
            const filesContainer = filesContainerRef.current
            const GAP = 1 // Gap between files and textarea
            filesContainer.style.position = 'absolute'
            filesContainer.style.bottom =
                initialBottomRef.current !== null
                    ? `${initialBottomRef.current + newHeight + GAP}px`
                    : `${newHeight + GAP}px`
            filesContainer.style.left = '0'
            filesContainer.style.right = '0'
            filesContainer.style.zIndex = '999'
        }
    }, [
        value,
        attachedFiles.length,
        slot1,
        textareaCollapsedBorderRadius,
        textareaExpandedBorderRadius,
    ])

    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        onChange?.(e.target.value)
    }

    const textareaId = `mobile-chat-input-textarea-${generatedId}`
    const placeholderText = placeholder || 'Type your message'

    // Function to truncate placeholder based on available width
    const truncatePlaceholder = useCallback(() => {
        if (!textareaRef.current) return

        const EXTRA_OFFSET = slot1 ? 36 : 0 // Extra space to subtract only if slot1 is present
        const truncated = truncateTextareaPlaceholder({
            textarea: textareaRef.current,
            placeholderText,
            extraOffset: EXTRA_OFFSET,
        })
        setTruncatedPlaceholder(truncated)
    }, [placeholderText, slot1])

    // Calculate initial bottom position on mount and set absolute positioning immediately
    useEffect(() => {
        if (
            textareaRef.current &&
            textareaContainerRef.current &&
            initialBottomRef.current === null
        ) {
            const textarea = textareaRef.current
            const container = textareaContainerRef.current

            // Calculate bottom position while in default state
            const textareaRect = textarea.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            initialBottomRef.current =
                containerRect.bottom - textareaRect.bottom

            // Immediately set absolute positioning to prevent jumps when typing starts
            textarea.style.position = 'absolute'
            textarea.style.bottom = `${initialBottomRef.current}px`
            textarea.style.left = '0'
            textarea.style.right = '0'
            textarea.style.width = '100%'
            textarea.style.paddingRight = slot1 ? '40px' : '0'
            textarea.style.zIndex = '0'
        }
    }, [slot1])

    // Truncate placeholder on mount and when textarea width changes
    useEffect(() => {
        // Use setTimeout to ensure textarea is rendered and has dimensions
        const timeoutId = setTimeout(() => {
            truncatePlaceholder()
        }, 0)

        const handleResize = () => {
            truncatePlaceholder()
        }

        window.addEventListener('resize', handleResize)
        const resizeObserver = new ResizeObserver(() => {
            truncatePlaceholder()
        })

        if (textareaRef.current) {
            resizeObserver.observe(textareaRef.current)
        }

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('resize', handleResize)
            resizeObserver.disconnect()
        }
    }, [truncatePlaceholder])

    // Update textarea and files container positioning when value changes
    useEffect(() => {
        updateTextareaAndFilesPosition()
    }, [value, updateTextareaAndFilesPosition])

    return (
        <Block>
            <style>
                {`
                    #${textareaId}::placeholder {
                        color: ${textareaMobileTokens.placeholder.color};
                    }
                    /* Hide scrollbar for textarea */
                    #${textareaId} {
                        scrollbar-width: none; /* Firefox */
                        -ms-overflow-style: none; /* IE and Edge */
                    }
                    #${textareaId}::-webkit-scrollbar {
                        display: none; /* Chrome, Safari, Opera */
                    }
                `}
            </style>
            <Block
                ref={inputWrapperRef}
                position="relative"
                style={{ minHeight: '44px' }}
            >
                {attachedFiles.length > 0 && (
                    <Block
                        ref={filesContainerRef}
                        display="flex"
                        alignItems="center"
                        gap={8}
                        style={{
                            width: '100%',
                            // Prevent scrollbar flash during calculation
                            overflowX: isCalculating ? 'hidden' : 'visible',
                            overflowY: isCalculating ? 'hidden' : undefined,
                            transition: 'bottom 0.3s ease',
                        }}
                    >
                        <Block
                            paddingLeft={attachmentButtonDimensions.total}
                            marginBottom={attachmentButtonDimensions.gap}
                            display="flex"
                            gap={tokens.filesContainer.gap}
                            maxHeight={tokens.filesContainer.maxHeight}
                            role="region"
                            aria-label={`${attachedFiles.length} file${
                                attachedFiles.length !== 1 ? 's' : ''
                            } attached`}
                            id={filesRegionId}
                            style={{
                                flex: 1,
                                minWidth: 0,
                            }}
                            overflowY={
                                !isCalculating
                                    ? tokens.filesContainer.overflowY
                                    : undefined
                            }
                        >
                            {visibleFiles.map((file) => {
                                const fileName =
                                    file.name ||
                                    capitalizeFirstLetter(file.type)
                                return (
                                    <Tooltip key={file.id} content={file.name}>
                                        <Tag
                                            key={file.id}
                                            text={capitalizeFirstLetter(
                                                file.type
                                            )}
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
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
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
                    </Block>
                )}
                <Block display="flex" alignItems="center" gap={8}>
                    <PrimitiveButton
                        disabled={disabled}
                        borderRadius={FOUNDATION_THEME.unit[100]}
                        border={`1px solid #E1E4EA`}
                        padding={FOUNDATION_THEME.unit[12]}
                        onClick={onAttachFileClick}
                    >
                        {attachButtonIcon || <Paperclip size={16} />}
                    </PrimitiveButton>
                    <Block style={{ flex: 1 }}>
                        <Block
                            ref={textareaContainerRef}
                            position="relative"
                            width="100%"
                            style={{ minHeight: '44px' }}
                        >
                            <textarea
                                ref={textareaRef}
                                id={textareaId}
                                value={value}
                                onChange={handleTextareaChange}
                                placeholder={
                                    truncatedPlaceholder || placeholderText
                                }
                                disabled={disabled}
                                style={{
                                    width: '100%',
                                    paddingRight: slot1 ? '40px' : '0',
                                    backgroundColor:
                                        textareaMobileTokens.backgroundColor as string,
                                    color: textareaMobileTokens.color as string,
                                    fontSize:
                                        textareaMobileTokens.fontSize as string,
                                    lineHeight:
                                        textareaMobileTokens.lineHeight as string,
                                    padding:
                                        textareaMobileTokens.padding as string,
                                    border: textareaMobileTokens.border
                                        .default as string,
                                    borderRadius: textareaMobileTokens
                                        .borderRadius.default as string,
                                    height: textareaMobileTokens.height
                                        .default as string,
                                    minHeight: textareaMobileTokens.height
                                        .default as string,
                                    maxHeight: textareaMobileTokens.height
                                        .focus as string,
                                    overflowY: 'hidden',
                                    verticalAlign:
                                        textareaMobileTokens.verticalAlign as string,
                                    outline: 'none',
                                    resize: 'none',
                                    transition:
                                        'border-radius 0.3s ease, border 0.3s ease',
                                    zIndex: 0,
                                }}
                                onFocus={(e) => {
                                    // Calculate bottom position if not already set
                                    if (
                                        initialBottomRef.current === null &&
                                        textareaContainerRef.current
                                    ) {
                                        const textareaRect =
                                            e.currentTarget.getBoundingClientRect()
                                        const containerRect =
                                            textareaContainerRef.current.getBoundingClientRect()
                                        initialBottomRef.current =
                                            containerRect.bottom -
                                            textareaRect.bottom
                                    }

                                    e.currentTarget.style.outline = 'none'
                                    const isExpanded =
                                        e.currentTarget.scrollHeight >
                                        textareaCollapsedHeight
                                    e.currentTarget.style.borderRadius =
                                        isExpanded
                                            ? textareaExpandedBorderRadius
                                            : textareaCollapsedBorderRadius
                                    e.currentTarget.style.border =
                                        textareaMobileTokens.border
                                            .focus as string
                                    e.currentTarget.style.boxShadow = '#EFF6FF'
                                    e.currentTarget.style.paddingRight = slot1
                                        ? '40px'
                                        : '0'

                                    // If there's content, position absolutely for upward growth
                                    if (value && value.trim() !== '') {
                                        e.currentTarget.style.position =
                                            'absolute'
                                        e.currentTarget.style.bottom =
                                            initialBottomRef.current !== null
                                                ? `${initialBottomRef.current}px`
                                                : '0px'
                                        e.currentTarget.style.left = '0'
                                        e.currentTarget.style.right = '0'
                                        e.currentTarget.style.width = '100%'
                                        e.currentTarget.style.paddingRight =
                                            slot1 ? '40px' : '0'
                                        e.currentTarget.style.zIndex = '0'
                                    }
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.outline = 'none'
                                    e.currentTarget.style.paddingRight = slot1
                                        ? '40px'
                                        : '0'
                                    // If empty, reset to static positioning
                                    if (!value || value.trim() === '') {
                                        e.currentTarget.style.position =
                                            'static'
                                        e.currentTarget.style.bottom = 'auto'
                                        e.currentTarget.style.left = 'auto'
                                        e.currentTarget.style.right = 'auto'
                                        e.currentTarget.style.width = '100%'
                                        e.currentTarget.style.paddingRight =
                                            slot1 ? '40px' : '0'
                                        e.currentTarget.style.zIndex = '0'
                                    }
                                    // e.currentTarget.style.borderRadius = textareaMobileTokens.borderRadius.default as string
                                    e.currentTarget.style.border =
                                        textareaMobileTokens.border
                                            .default as string
                                }}
                            />
                            {slot1 && (
                                <Block
                                    position="absolute"
                                    bottom="-12px"
                                    right="4px"
                                    style={{
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Block
                                        style={{
                                            pointerEvents: 'auto',
                                            borderRadius: '100px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {slot1}
                                    </Block>
                                </Block>
                            )}
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

export default MobileChatInput

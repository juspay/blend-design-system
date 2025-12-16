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
import { createOverflowMenuItems } from './utils'
import { getChatInputTokens } from './chatInput.tokens'
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
}: MobileChatInputProps) => {
    const tokens = getChatInputTokens(FOUNDATION_THEME).sm
    const textareaMobileTokens = tokens.textareaMobile
    const filesContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null!)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const textareaContainerRef = useRef<HTMLDivElement>(null)
    const initialBottomRef = useRef<number | null>(null)
    const lastWidth = useRef<number>(0)
    const isExpanding = useRef<boolean>(false)
    const [overflowMenuOpen, setOverflowMenuOpen] = useState(false)
    const [cutOffIndex, setCutOffIndex] = useState<number>(attachedFiles.length)
    const [isCalculating, setIsCalculating] = useState(true)
    const generatedId = useId()
    const filesRegionId = `chat-input-files-${generatedId}`

    // Dynamic overflow calculation based on available width
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

        if (isExpanding.current && fileItems.length < attachedFiles.length) {
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
                (needsMoreButton ? MORE_BUTTON_ESTIMATED_WIDTH + GAP_SIZE : 0) +
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

    // const handleTextInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     onChange?.(e.target.value)
    // }

    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        onChange?.(e.target.value)
        // Auto-resize textarea based on content with upward growth
        if (textareaRef.current && textareaContainerRef.current) {
            const textarea = textareaRef.current
            const container = textareaContainerRef.current
            const MIN_HEIGHT = 44
            const MAX_HEIGHT = 100
            const value = e.target.value

            // Calculate initial bottom position if not set
            if (initialBottomRef.current === null) {
                const textareaRect = textarea.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()
                initialBottomRef.current =
                    containerRect.bottom - textareaRect.bottom
            }

            // If empty, set to minimum height and reset position
            if (!value || value.trim() === '') {
                textarea.style.height = `${MIN_HEIGHT}px`
                textarea.style.overflowY = 'hidden'
                textarea.style.position = 'static'
                textarea.style.bottom = 'auto'
                return
            }

            // Position absolutely for upward growth
            textarea.style.position = 'absolute'
            textarea.style.bottom =
                initialBottomRef.current !== null
                    ? `${initialBottomRef.current}px`
                    : '0px'
            textarea.style.left = '0'
            textarea.style.right = '0'
            textarea.style.width = '100%'
            textarea.style.zIndex = '1000'

            textarea.style.height = 'auto'
            const scrollHeight = textarea.scrollHeight
            const newHeight = Math.max(
                MIN_HEIGHT,
                Math.min(scrollHeight, MAX_HEIGHT)
            )
            textarea.style.height = `${newHeight}px`
            textarea.style.overflowY =
                scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
        }
    }

    const textareaId = `mobile-chat-input-textarea-${generatedId}`

    // Calculate initial bottom position for upward growth
    useEffect(() => {
        if (
            textareaRef.current &&
            textareaContainerRef.current &&
            initialBottomRef.current === null
        ) {
            const textareaRect = textareaRef.current.getBoundingClientRect()
            const containerRect =
                textareaContainerRef.current.getBoundingClientRect()
            initialBottomRef.current =
                containerRect.bottom - textareaRect.bottom
        }
    }, [])

    // Auto-resize textarea on mount and when value changes
    useEffect(() => {
        if (textareaRef.current && textareaContainerRef.current) {
            const textarea = textareaRef.current
            const container = textareaContainerRef.current
            const MIN_HEIGHT = 44
            const MAX_HEIGHT = 100

            // Calculate initial bottom position if not set
            if (initialBottomRef.current === null) {
                const textareaRect = textarea.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()
                initialBottomRef.current =
                    containerRect.bottom - textareaRect.bottom
            }

            // If empty, set to minimum height and reset position
            if (!value || value.trim() === '') {
                textarea.style.height = `${MIN_HEIGHT}px`
                textarea.style.overflowY = 'hidden'
                textarea.style.position = 'static'
                textarea.style.bottom = 'auto'
                return
            }

            // Position absolutely for upward growth
            textarea.style.position = 'absolute'
            textarea.style.bottom =
                initialBottomRef.current !== null
                    ? `${initialBottomRef.current}px`
                    : '0px'
            textarea.style.left = '0'
            textarea.style.right = '0'
            textarea.style.width = '100%'
            textarea.style.zIndex = '1000'

            textarea.style.height = 'auto'
            const scrollHeight = textarea.scrollHeight
            const newHeight = Math.max(
                MIN_HEIGHT,
                Math.min(scrollHeight, MAX_HEIGHT)
            )
            textarea.style.height = `${newHeight}px`
            textarea.style.overflowY =
                scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
        }
    }, [value])

    return (
        <Block>
            <style>
                {`
                    #${textareaId}::placeholder {
                        color: ${textareaMobileTokens.placeholder.color};
                    }
                `}
            </style>
            <Block
                ref={containerRef}
                display="flex"
                alignItems="center"
                gap={8}
            >
                <Block style={{ visibility: 'hidden' }}>
                    <PrimitiveButton
                        disabled={disabled}
                        borderRadius={100}
                        border={`1px solid #E1E4EA`}
                        padding={12}
                        onClick={onAttachFileClick}
                    >
                        {attachButtonIcon || <Paperclip size={16} />}
                    </PrimitiveButton>
                </Block>
                {attachedFiles.length > 0 && (
                    <Block
                        ref={filesContainerRef}
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
                            // Prevent scrollbar flash during calculation
                            overflowX: isCalculating ? 'hidden' : 'visible',
                            overflowY: isCalculating ? 'hidden' : undefined,
                        }}
                        overflowY={
                            !isCalculating
                                ? tokens.filesContainer.overflowY
                                : undefined
                        }
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
            </Block>
            <Block display="flex" alignItems="center" gap={8}>
                <PrimitiveButton
                    disabled={disabled}
                    borderRadius={100}
                    border={`1px solid #E1E4EA`}
                    padding={12}
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
                            placeholder="Type your message"
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
                                padding: textareaMobileTokens.padding as string,
                                border: textareaMobileTokens.border
                                    .default as string,
                                borderRadius: textareaMobileTokens.borderRadius
                                    .default as string,
                                height: '44px',
                                minHeight: '44px',
                                maxHeight: '100px',
                                overflowY: 'hidden',
                                verticalAlign:
                                    textareaMobileTokens.verticalAlign as string,
                                outline: 'none',
                                resize: 'none',
                                transition:
                                    'border-radius 0.3s ease, border 0.3s ease',
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
                                e.currentTarget.style.borderRadius =
                                    textareaMobileTokens.borderRadius
                                        .focus as string
                                e.currentTarget.style.border =
                                    textareaMobileTokens.border.focus as string

                                // If there's content, position absolutely for upward growth
                                if (value && value.trim() !== '') {
                                    e.currentTarget.style.position = 'absolute'
                                    e.currentTarget.style.bottom =
                                        initialBottomRef.current !== null
                                            ? `${initialBottomRef.current}px`
                                            : '0px'
                                    e.currentTarget.style.left = '0'
                                    e.currentTarget.style.right = '0'
                                    e.currentTarget.style.width = '100%'
                                    e.currentTarget.style.zIndex = '1000'
                                }
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.outline = 'none'
                                // If empty, reset to static positioning
                                if (!value || value.trim() === '') {
                                    e.currentTarget.style.position = 'static'
                                    e.currentTarget.style.bottom = 'auto'
                                    e.currentTarget.style.left = 'auto'
                                    e.currentTarget.style.right = 'auto'
                                    e.currentTarget.style.width = '100%'
                                    e.currentTarget.style.zIndex = 'auto'
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
                                right="6px"
                                style={{
                                    transform: 'translateY(-50%)',
                                    pointerEvents: 'none',
                                }}
                            >
                                <Block style={{ pointerEvents: 'auto' }}>
                                    {slot1}
                                </Block>
                            </Block>
                        )}
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

export default MobileChatInput

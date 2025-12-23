import React, {
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import {
    AttachedFile,
    Button,
    ButtonSize,
    ButtonSubType,
    ButtonType,
    MenuProps,
    Tag,
    TagColor,
    TagSize,
    TagVariant,
    Tooltip,
    Menu,
} from '../../main'
import Block from '../Primitives/Block/Block'
import { capitalizeFirstLetter } from '../../global-utils/GlobalUtils'
import { getDocIcon } from './ChatInput'
import { Plus, X } from 'lucide-react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChatInputTokensType } from './chatInput.tokens'
import { createOverflowMenuItems } from './utils'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { useDebounce } from '../../hooks/useDebounce'

type AttachmentFileProps = {
    attachedFiles: AttachedFile[]
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: AttachedFile) => void
    overflowMenuProps?: Partial<MenuProps>
    containerRef?: React.RefObject<HTMLDivElement | null>
}

const AttachmentFile = ({
    attachedFiles,
    onFileRemove,
    onFileClick,
    overflowMenuProps,
    containerRef,
}: AttachmentFileProps) => {
    const [cutOffIndex, setCutOffIndex] = useState<number>(attachedFiles.length)
    const [overflowMenuOpen, setOverflowMenuOpen] = useState(false)
    const tokens = useResponsiveTokens<ChatInputTokensType>('CHAT_INPUT')
    const isExpanding = useRef<boolean>(false)
    const filesContainerRef = useRef<HTMLDivElement>(null)
    const generatedId = useId()
    const filesRegionId = `chat-input-files-${generatedId}`
    const lastWidth = useRef<number>(0)

    const visibleFiles = useMemo(() => {
        return attachedFiles.slice(0, cutOffIndex)
    }, [attachedFiles, cutOffIndex])
    const hiddenFiles = useMemo(() => {
        return attachedFiles.slice(cutOffIndex)
    }, [attachedFiles, cutOffIndex])

    const overflowMenuItems = useMemo(() => {
        return createOverflowMenuItems(
            hiddenFiles,
            onFileRemove || (() => {}),
            onFileClick || (() => {})
        )
    }, [hiddenFiles, onFileRemove, onFileClick])

    const hasOverflow = hiddenFiles.length > 0

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
    }, [attachedFiles.length])

    const debouncedResize = useDebounce(handleResize, 150)
    // Reset cutoff when files change
    useEffect(() => {
        setCutOffIndex(attachedFiles.length)
        isExpanding.current = false

        const timeoutId = setTimeout(() => {
            handleResize()
        }, 150)

        return () => clearTimeout(timeoutId)
    }, [attachedFiles.length, handleResize])

    // Watch for container width changes
    useResizeObserver(
        containerRef as React.RefObject<HTMLElement>,
        ({ width }) => {
            if (!lastWidth || !width) return

            const currentWidth = lastWidth.current ?? 0
            if (Math.abs(width - currentWidth) > 10) {
                if (width > currentWidth + 20) {
                    isExpanding.current = true
                }

                lastWidth.current = width
                debouncedResize()
            }
        }
    )
    return (
        attachedFiles.length > 0 && (
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
                                    const target = e.target as HTMLElement
                                    if (
                                        target.closest('[aria-label*="Remove"]')
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
                                        hiddenFiles.length !== 1 ? 's' : ''
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
        )
    )
}

export default AttachmentFile

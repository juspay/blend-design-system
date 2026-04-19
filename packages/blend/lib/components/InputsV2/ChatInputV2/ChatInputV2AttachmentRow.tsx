import {
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type RefObject,
} from 'react'
import Block from '../../Primitives/Block/Block'
import TooltipV2 from '../../TooltipV2/TooltipV2'
import Text from '../../Text/Text'
import type { AttachedFile } from './ChatInputV2.types'
import { useResizeObserver } from '../../../hooks/useResizeObserver'
import type { CSSObject } from 'styled-components'
import AttachmentDropdownV2 from './AttachmentDropdown'
import type { ChatInputV2TokensType } from './ChatInputV2.tokens'
import ChatInputTagV2 from './ChatInputTagV2'
import {
    computeAttachmentRowCutoff,
    isOuterWidthExpanding,
    isSignificantOuterWidthChange,
    OVERFLOW_MENU_TRIGGER_CLASS,
    reduceCutoffForFileCountChange,
    shouldExpandCutoffToMeasureAllChips,
    sliceOverflowAttachedFiles,
    sliceVisibleAttachedFiles,
    truncateFileNameForTag,
} from './utils'

export type ChatInputV2AttachmentRowProps = {
    attachedFiles: AttachedFile[]
    onFileRemove: (fileId: string) => void
    onFileClick: (file: AttachedFile) => void
    outerContainerRef: RefObject<HTMLElement | null>
    gap: NonNullable<CSSObject['gap']>
    tokens: ChatInputV2TokensType
}

export default function ChatInputV2AttachmentRow({
    tokens,
    attachedFiles,
    onFileRemove,
    onFileClick,
    outerContainerRef,
    gap,
}: ChatInputV2AttachmentRowProps) {
    const [cutOffIndex, setCutOffIndex] = useState(attachedFiles.length)
    const [overflowMenuOpen, setOverflowMenuOpen] = useState(false)
    const isExpanding = useRef(false)
    const filesContainerRef = useRef<HTMLDivElement>(null)
    const lastWidthRef = useRef(0)
    const prevAttachedCountRef = useRef(attachedFiles.length)
    const layoutResizeRafRef = useRef<number | undefined>(undefined)
    const generatedId = useId()
    const filesRegionId = `chat-input-v2-files-${generatedId}`

    const visibleFiles = useMemo(
        () => sliceVisibleAttachedFiles(attachedFiles, cutOffIndex),
        [attachedFiles, cutOffIndex]
    )
    const hiddenFiles = useMemo(
        () => sliceOverflowAttachedFiles(attachedFiles, cutOffIndex),
        [attachedFiles, cutOffIndex]
    )
    const hasOverflow = hiddenFiles.length > 0

    const handleResize = useCallback(() => {
        const container = filesContainerRef.current
        if (!container || attachedFiles.length === 0) return

        const fileChipCount = Array.from(container.children).filter(
            (c) => !c.classList.contains(OVERFLOW_MENU_TRIGGER_CLASS)
        ).length

        if (
            shouldExpandCutoffToMeasureAllChips(
                isExpanding.current,
                fileChipCount,
                attachedFiles.length
            )
        ) {
            setCutOffIndex(attachedFiles.length)
            isExpanding.current = false
            requestAnimationFrame(() => handleResize())
            return
        }

        setCutOffIndex(
            computeAttachmentRowCutoff({
                filesContainer: container,
                attachedFileCount: attachedFiles.length,
            })
        )
    }, [attachedFiles.length])

    const scheduleHandleResize = useCallback(() => {
        if (layoutResizeRafRef.current !== undefined) return
        layoutResizeRafRef.current = requestAnimationFrame(() => {
            layoutResizeRafRef.current = undefined
            handleResize()
        })
    }, [handleResize])

    useLayoutEffect(() => {
        const prev = prevAttachedCountRef.current
        const next = attachedFiles.length
        prevAttachedCountRef.current = next

        const updater = reduceCutoffForFileCountChange(prev, next)
        setCutOffIndex((c) => updater(c))

        isExpanding.current = false

        const id = requestAnimationFrame(() => handleResize())
        return () => cancelAnimationFrame(id)
    }, [attachedFiles.length, handleResize])

    const onOuterResize = useCallback(
        ({ width }: DOMRectReadOnly) => {
            const prev = lastWidthRef.current
            if (!isSignificantOuterWidthChange(prev, width)) return

            if (isOuterWidthExpanding(prev, width)) {
                isExpanding.current = true
            }
            lastWidthRef.current = width
            scheduleHandleResize()
        },
        [scheduleHandleResize]
    )

    useResizeObserver(
        outerContainerRef as RefObject<HTMLElement>,
        onOuterResize
    )

    useEffect(() => {
        return () => {
            if (layoutResizeRafRef.current !== undefined) {
                cancelAnimationFrame(layoutResizeRafRef.current)
            }
        }
    }, [])

    if (attachedFiles.length === 0) return null

    return (
        <Block
            ref={filesContainerRef}
            display="flex"
            alignItems="center"
            flexWrap="nowrap"
            gap={gap}
            width="100%"
            role="region"
            aria-label={`${attachedFiles.length} file${
                attachedFiles.length !== 1 ? 's' : ''
            } attached`}
            id={filesRegionId}
        >
            {visibleFiles.map((file) => (
                <TooltipV2 key={file.id} content={file.name}>
                    <ChatInputTagV2
                        key={file.id}
                        text={truncateFileNameForTag(file.name)}
                        tokens={tokens.container.tagContainer}
                        onRemove={(e) => {
                            e.stopPropagation()
                            onFileRemove(file.id)
                        }}
                        onFileClick={(e) => {
                            e.stopPropagation()
                            onFileClick(file)
                        }}
                    />
                </TooltipV2>
            ))}

            {hasOverflow && (
                <Block
                    className={OVERFLOW_MENU_TRIGGER_CLASS}
                    position="relative"
                >
                    <Text
                        style={{ cursor: 'pointer' }}
                        as="span"
                        onClick={() =>
                            setOverflowMenuOpen((prevOpen) => !prevOpen)
                        }
                        color={tokens.container.attachedFilesContainer.color}
                        fontSize={
                            tokens.container.attachedFilesContainer.fontSize
                        }
                        fontWeight={
                            tokens.container.attachedFilesContainer.fontWeight
                        }
                    >
                        +{hiddenFiles.length} more
                    </Text>
                    {overflowMenuOpen && (
                        <AttachmentDropdownV2
                            tokens={tokens}
                            tags={hiddenFiles}
                            onFileRemove={onFileRemove}
                            onFileClick={onFileClick}
                            key={filesRegionId}
                        />
                    )}
                </Block>
            )}
        </Block>
    )
}

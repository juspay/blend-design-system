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
import type { AttachedFile } from './ChatInputV2.types'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { useResizeObserver } from '../../../hooks/useResizeObserver'
import type { CSSObject } from 'styled-components'
import AttachmentDropdownV2 from './AttachmentDropdown'
import type { ChatInputV2TokensType } from './ChatInputV2.tokens'
import ChatInputTagV2 from './ChatInputTagV2'
import {
    ATTACHMENT_ROW_GAP_PX,
    computeAttachmentRowCutoff,
    isOuterWidthExpanding,
    isSignificantOuterWidthChange,
    OVERFLOW_MENU_TRIGGER_CLASS,
    reduceCutoffForFileCountChange,
    removePxFromValue,
    shouldExpandCutoffToMeasureAllChips,
    sliceOverflowAttachedFiles,
    sliceVisibleAttachedFiles,
    truncateFileNameForTag,
} from './utils'
import { ButtonV2 } from '../../ButtonV2'
import {
    ButtonV2Size,
    ButtonV2Type,
    ButtonV2SubType,
} from '../../ButtonV2/buttonV2.types'
import { PlusIcon } from '@phosphor-icons/react'

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
    const overflowListId = `${filesRegionId}-overflow-list`
    const overflowMenuContainerRef = useRef<HTMLDivElement>(null)

    const visibleFiles = useMemo(
        () => sliceVisibleAttachedFiles(attachedFiles, cutOffIndex),
        [attachedFiles, cutOffIndex]
    )
    const hiddenFiles = useMemo(
        () => sliceOverflowAttachedFiles(attachedFiles, cutOffIndex),
        [attachedFiles, cutOffIndex]
    )
    const hasOverflow = hiddenFiles.length > 0

    const rowGapPx = useMemo(() => {
        const n = removePxFromValue(gap as string | number)
        return Number.isFinite(n) && n >= 0 ? n : ATTACHMENT_ROW_GAP_PX
    }, [gap])

    const handleResize = useCallback(() => {
        const container = filesContainerRef.current
        if (!container || attachedFiles.length === 0) {
            isExpanding.current = false
            return
        }

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

        isExpanding.current = false
        setCutOffIndex(
            computeAttachmentRowCutoff({
                filesContainer: container,
                attachedFileCount: attachedFiles.length,
                rowGapPx,
            })
        )
    }, [attachedFiles.length, rowGapPx])

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

        // After a removal, rendered chips can still be fewer than `attachedFiles.length`
        // until we expand — `computeAttachmentRowCutoff` only measures existing nodes.
        // Reuse the same “show all, then re-measure” pass as for widening the viewport.
        isExpanding.current = next < prev && next > 0

        const id = requestAnimationFrame(() => handleResize())
        return () => cancelAnimationFrame(id)
    }, [attachedFiles.length, handleResize])

    const closeOverflowMenu = useCallback(() => {
        setOverflowMenuOpen(false)
    }, [])

    useClickOutside(overflowMenuContainerRef, closeOverflowMenu)

    useEffect(() => {
        if (!overflowMenuOpen) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                setOverflowMenuOpen(false)
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [overflowMenuOpen])

    useEffect(() => {
        if (!hasOverflow) setOverflowMenuOpen(false)
    }, [hasOverflow])

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
                        file={file}
                        text={truncateFileNameForTag(file.name)}
                        tokens={tokens.container.tagContainer}
                        onRemove={() => onFileRemove(file.id)}
                        onFileClick={() => onFileClick(file)}
                    />
                </TooltipV2>
            ))}

            {hasOverflow && (
                <Block
                    ref={overflowMenuContainerRef}
                    className={OVERFLOW_MENU_TRIGGER_CLASS}
                    position="relative"
                >
                    <ButtonV2
                        type="button"
                        text={`${hiddenFiles.length} more`}
                        aria-label={`Show ${hiddenFiles.length} more attached file${
                            hiddenFiles.length !== 1 ? 's' : ''
                        }`}
                        aria-haspopup="true"
                        aria-expanded={overflowMenuOpen}
                        aria-controls={
                            overflowMenuOpen ? overflowListId : undefined
                        }
                        size={ButtonV2Size.SMALL}
                        buttonType={ButtonV2Type.SECONDARY}
                        subType={ButtonV2SubType.INLINE}
                        leftSlot={{ slot: <PlusIcon size={16} /> }}
                        onClick={() =>
                            setOverflowMenuOpen((prevOpen) => !prevOpen)
                        }
                    />
                    {overflowMenuOpen && (
                        <AttachmentDropdownV2
                            id={overflowListId}
                            tokens={tokens}
                            files={hiddenFiles}
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

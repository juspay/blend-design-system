import type { ChangeEvent, MutableRefObject, Ref } from 'react'
import { filterDuplicateFiles } from '../../ChatInput/utils'
import { addSnackbarV2 } from '../../SnackbarV2'
import { SnackbarV2Variant } from '../../SnackbarV2/snackbarV2.types'
import type { AttachedFile } from './ChatInputV2.types'

export const FILE_NAME_TAG_MAX_LEN = 8

export const truncateFileNameForTag = (name: string): string =>
    name.length > FILE_NAME_TAG_MAX_LEN
        ? `${name.slice(0, FILE_NAME_TAG_MAX_LEN)}…`
        : name

/** Layout buffer and “+ N more” reserve — mirrors `AttachmentFile` in ChatInput. */
export const ATTACHMENT_ROW_BUFFER_PX = 30
export const ATTACHMENT_ROW_MORE_BUTTON_RESERVE_PX = 100
export const ATTACHMENT_ROW_GAP_PX = 8

export const OVERFLOW_MENU_TRIGGER_CLASS = 'overflow-menu-trigger'

/** Outer container resize: ignore tiny fluctuations; treat meaningful width change as ≥10px. */
export function isSignificantOuterWidthChange(
    previousWidth: number,
    nextWidth: number
): boolean {
    return Math.abs(nextWidth - previousWidth) > 10
}

/** Wider viewport → allow re-measuring with more chips visible (see `isExpanding` in row). */
export function isOuterWidthExpanding(
    previousWidth: number,
    nextWidth: number
): boolean {
    return nextWidth > previousWidth + 20
}

/**
 * After `attachedFiles.length` changes, update visible cutoff without flashing all chips on remove
 * or jumping to full list on add.
 */
export function reduceCutoffForFileCountChange(
    previousFileCount: number,
    nextFileCount: number
): (currentCutoff: number) => number {
    return (current) => {
        if (nextFileCount > previousFileCount) {
            return Math.min(
                current + (nextFileCount - previousFileCount),
                nextFileCount
            )
        }
        if (nextFileCount < previousFileCount) {
            return Math.min(current, nextFileCount)
        }
        return current
    }
}

export function shouldExpandCutoffToMeasureAllChips(
    isExpanding: boolean,
    renderedChipCount: number,
    attachedFileCount: number
): boolean {
    return isExpanding && renderedChipCount < attachedFileCount
}

type ComputeCutoffArgs = {
    filesContainer: HTMLElement
    attachedFileCount: number
}

/**
 * Walk visible chip DOM nodes and compute how many files can stay inline before “+ N more”.
 */
export function computeAttachmentRowCutoff({
    filesContainer,
    attachedFileCount,
}: ComputeCutoffArgs): number {
    if (attachedFileCount === 0) return 0

    const containerWidth = filesContainer.getBoundingClientRect().width

    const fileItems = Array.from(filesContainer.children).filter(
        (child) => !child.classList.contains(OVERFLOW_MENU_TRIGGER_CLASS)
    )

    let totalWidth = 0
    let optimalCutoff = 0

    for (let i = 0; i < Math.min(fileItems.length, attachedFileCount); i++) {
        const itemWidth = (fileItems[i] as HTMLElement).getBoundingClientRect()
            .width
        const totalGaps = i > 0 ? i * ATTACHMENT_ROW_GAP_PX : 0
        const remainingItems = attachedFileCount - (i + 1)
        const needsMoreButton = remainingItems > 0
        const requiredSpace =
            totalWidth +
            itemWidth +
            totalGaps +
            (needsMoreButton
                ? ATTACHMENT_ROW_MORE_BUTTON_RESERVE_PX + ATTACHMENT_ROW_GAP_PX
                : 0) +
            ATTACHMENT_ROW_BUFFER_PX

        if (requiredSpace <= containerWidth) {
            totalWidth += itemWidth
            optimalCutoff = i + 1
        } else {
            break
        }
    }

    let newCutoff = Math.max(1, Math.min(optimalCutoff, attachedFileCount))

    if (attachedFileCount - newCutoff === 1) {
        newCutoff = attachedFileCount
    }

    return newCutoff
}

export function sliceVisibleAttachedFiles(
    attachedFiles: AttachedFile[],
    cutOffIndex: number
): AttachedFile[] {
    return attachedFiles.slice(0, cutOffIndex)
}

export function sliceOverflowAttachedFiles(
    attachedFiles: AttachedFile[],
    cutOffIndex: number
): AttachedFile[] {
    return attachedFiles.slice(cutOffIndex)
}

const CHAT_INPUT_V2_TEXTAREA_MAX_HEIGHT_FALLBACK_PX = 200
const DUPLICATE_FILE_SNACKBAR_MS = 3000

/** Max height in px: explicit prop wins; otherwise parse token `maxHeight` (defaults to 200). */
export function resolveChatInputV2TextareaMaxHeightPx(
    textareaMaxHeightProp: number | undefined,
    tokenMaxHeight: unknown
): number {
    if (textareaMaxHeightProp != null) return textareaMaxHeightProp
    if (tokenMaxHeight == null)
        return CHAT_INPUT_V2_TEXTAREA_MAX_HEIGHT_FALLBACK_PX
    const n = parseFloat(String(tokenMaxHeight))
    return Number.isFinite(n)
        ? n
        : CHAT_INPUT_V2_TEXTAREA_MAX_HEIGHT_FALLBACK_PX
}

/** ChatGPT-style auto-grow: clamp scroll height to `maxHeightPx`. */
export function applyChatInputV2TextareaAutoHeight(
    el: HTMLTextAreaElement | null,
    maxHeightPx: number
): void {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, maxHeightPx)}px`
}

export function notifyChatInputV2DuplicateFiles(
    duplicateFileNames: string[]
): void {
    if (duplicateFileNames.length === 0) return
    const duplicateCount = duplicateFileNames.length
    const message =
        duplicateCount === 1
            ? `File "${duplicateFileNames[0]}" is already attached`
            : `${duplicateCount} duplicate file(s) were not added`
    addSnackbarV2({
        header: 'Duplicate File',
        description: message,
        variant: SnackbarV2Variant.WARNING,
        duration: DUPLICATE_FILE_SNACKBAR_MS,
    })
}

/** Hidden file input: filters duplicates vs `attachedFiles`, shows SnackbarV2, forwards new files. Resets input value. */
export function handleChatInputV2FileInputChange(
    e: ChangeEvent<HTMLInputElement>,
    attachedFiles: AttachedFile[],
    onAttachFiles: (files: File[]) => void
): void {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (files.length === 0) return

    const { newFiles, duplicateFiles } = filterDuplicateFiles(
        files,
        attachedFiles
    )

    if (duplicateFiles.length > 0) {
        notifyChatInputV2DuplicateFiles(duplicateFiles)
    }

    if (newFiles.length > 0) {
        onAttachFiles(newFiles)
    }
}

export function assignForwardedRef<T>(
    node: T | null,
    ref: Ref<T | null> | null | undefined
): void {
    if (typeof ref === 'function') {
        ref(node)
    } else if (ref != null) {
        ;(ref as MutableRefObject<T | null>).current = node
    }
}

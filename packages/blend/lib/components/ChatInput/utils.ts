import { AttachedFile } from './types'
import { MenuItemType } from '../Menu/types'
import { X } from 'lucide-react'
import React from 'react'
import { getDocIcon } from './ChatInput'
import { capitalizeFirstLetter } from '../../global-utils/GlobalUtils'

/**
 * Determine the file type from a File object
 */
export const getFileType = (file: File): AttachedFile['type'] => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type === 'application/pdf') return 'pdf'
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) return 'csv'
    if (file.type.startsWith('text/')) return 'text'
    return 'other'
}

/**
 * Create menu items for overflow files
 */
export const createOverflowMenuItems = (
    hiddenFiles: AttachedFile[],
    onFileRemove: (fileId: string) => void,
    onFileClick: (file: AttachedFile) => void
): MenuItemType[] => {
    return hiddenFiles.map((file) => ({
        label: capitalizeFirstLetter(file.type),
        slot1: getDocIcon(file.type),
        slot4: React.createElement(X, {
            size: 14,
            onClick: (e: React.MouseEvent) => {
                e.stopPropagation()
                onFileRemove(file.id)
            },
            style: { cursor: 'pointer' },
        }),
        onClick: () => onFileClick(file),
    }))
}

/**
 * Handle textarea auto-resize functionality
 */
export const handleAutoResize = (
    element: HTMLTextAreaElement | null,
    autoResize: boolean
): void => {
    if (autoResize && element) {
        element.style.height = 'auto'
        element.style.height = `${element.scrollHeight}px`
    }
}

/**
 * Validate message length against maxLength
 */
export const isValidMessageLength = (
    message: string,
    maxLength?: number
): boolean => {
    if (!maxLength) return true
    return message.length <= maxLength
}

/**
 * Convert File objects to AttachedFile objects
 */
export const convertFilesToAttachedFiles = (files: File[]): AttachedFile[] => {
    return files.map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        type: getFileType(file),
        size: file.size,
    }))
}

/**
 * Filter out duplicate files by comparing name and size with existing attached files
 * @param files - Array of File objects to check
 * @param attachedFiles - Array of already attached files
 * @returns Object containing newFiles (non-duplicates) and duplicateFiles (array of duplicate file names)
 */
export const filterDuplicateFiles = (
    files: File[],
    attachedFiles: AttachedFile[]
): {
    newFiles: File[]
    duplicateFiles: string[]
} => {
    const newFiles: File[] = []
    const duplicateFiles: string[] = []

    files.forEach((file) => {
        const isDuplicate = attachedFiles.some(
            (attachedFile) =>
                attachedFile.name === file.name &&
                attachedFile.size === file.size
        )

        if (isDuplicate) {
            duplicateFiles.push(file.name)
        } else {
            newFiles.push(file)
        }
    })

    return { newFiles, duplicateFiles }
}

/**
 * Compute how many attached file "chips" can fit in the available width before showing overflow.
 *
 * Used by `MobileChatInput.tsx` where the file chips are rendered inline and we need to decide
 * the cutoff index (visible vs hidden files) based on the rendered chip widths.
 */
export const computeChatInputFileOverflowCutoff = (params: {
    container: HTMLElement
    attachedFilesLength: number
    gapSize: number
    buffer: number
    moreButtonEstimatedWidth: number
    overflowTriggerClassName?: string
}): { cutoff: number; itemCount: number } => {
    const {
        container,
        attachedFilesLength,
        gapSize,
        buffer,
        moreButtonEstimatedWidth,
        overflowTriggerClassName = 'overflow-menu-trigger',
    } = params

    const containerWidth = container.getBoundingClientRect().width
    const fileItems = Array.from(container.children).filter(
        (child) => !child.classList.contains(overflowTriggerClassName)
    ) as HTMLElement[]

    let totalWidth = 0
    let optimalCutoff = 0

    for (let i = 0; i < Math.min(fileItems.length, attachedFilesLength); i++) {
        const itemWidth = fileItems[i].getBoundingClientRect().width
        const totalGaps = i > 0 ? i * gapSize : 0

        const remainingItems = attachedFilesLength - (i + 1)
        const needsMoreButton = remainingItems > 0
        const requiredSpace =
            totalWidth +
            itemWidth +
            totalGaps +
            (needsMoreButton ? moreButtonEstimatedWidth + gapSize : 0) +
            buffer

        if (requiredSpace <= containerWidth) {
            totalWidth += itemWidth
            optimalCutoff = i + 1
        } else {
            break
        }
    }

    const cutoff = Math.max(1, Math.min(optimalCutoff, attachedFilesLength))
    return { cutoff, itemCount: fileItems.length }
}

/**
 * Truncate a textarea placeholder string to fit the available width.
 *
 * Note: This function uses DOM measurement (window.getComputedStyle + a temporary span).
 * Call it from effects/callbacks where `window` and `document` are available.
 */
export const truncateTextareaPlaceholder = (params: {
    textarea: HTMLTextAreaElement
    placeholderText: string
    extraOffset?: number
}): string => {
    const { textarea, placeholderText, extraOffset = 0 } = params
    if (!placeholderText) return ''

    const style = window.getComputedStyle(textarea)
    const paddingLeft = parseFloat(style.paddingLeft) || 0
    const paddingRight = parseFloat(style.paddingRight) || 0
    const availableWidth =
        textarea.offsetWidth - paddingLeft - paddingRight - extraOffset

    const measureElement = document.createElement('span')
    measureElement.style.visibility = 'hidden'
    measureElement.style.position = 'absolute'
    measureElement.style.whiteSpace = 'nowrap'
    measureElement.style.fontSize = style.fontSize
    measureElement.style.fontFamily = style.fontFamily
    measureElement.style.fontWeight = style.fontWeight
    measureElement.style.letterSpacing = style.letterSpacing

    document.body.appendChild(measureElement)

    try {
        // Measure full placeholder
        measureElement.textContent = placeholderText
        const fullWidth = measureElement.offsetWidth

        if (fullWidth <= availableWidth) return placeholderText

        // Binary search for the right truncation point
        let left = 0
        let right = placeholderText.length
        let truncated = placeholderText

        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            const testText = placeholderText.substring(0, mid) + '...'
            measureElement.textContent = testText
            const testWidth = measureElement.offsetWidth

            if (testWidth <= availableWidth) {
                truncated = testText
                left = mid + 1
            } else {
                right = mid - 1
            }
        }

        return truncated
    } finally {
        document.body.removeChild(measureElement)
    }
}

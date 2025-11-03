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
 * Check if Enter key should trigger send
 */
export const shouldSendOnEnter = (
    key: string,
    shiftKey: boolean,
    metaKey: boolean,
    ctrlKey: boolean
): boolean => {
    return key === 'Enter' && !shiftKey && !metaKey && !ctrlKey
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

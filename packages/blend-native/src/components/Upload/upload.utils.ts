import {
    UploadErrorReason,
    UploadState,
    type UploadErrorReasonValue,
} from '@juspay/blend-design-system/node'
import type { UploadFileNativeItem } from './upload.types'

/**
 * Pure helpers for the native `Upload`, ported from web's
 * `InputsV2/UploadV2/utils.ts`. DOM-bound pieces (`createClickHandler`,
 * `useUploadState`, `createDragHandlers`) are deliberately not ported —
 * there is no file input and no drag-and-drop on RN.
 */

export const FILE_NAME_TAG_MAX_LEN = 24

export const truncateFileNameForTag = (name: string): string =>
    name.length > FILE_NAME_TAG_MAX_LEN
        ? `${name.slice(0, FILE_NAME_TAG_MAX_LEN)}…`
        : name

/**
 * Web's `getFileId` reads `file.lastModified`, which a DOM `File` has and a
 * picker result does not. Native falls back to `Date.now()` plus the index,
 * keeping the same "unique per batch" guarantee.
 */
export const getFileId = (
    uploadFile: UploadFileNativeItem,
    index: number
): string =>
    uploadFile.id ??
    `${uploadFile.name}-${uploadFile.size}-${Date.now()}-${index}`

/**
 * Web's `isFileTypeAccepted` operating on `{name, type}` instead of a DOM
 * `File` — the exact shape `UploadFileNativeItem` carries. Extension
 * (`.pdf`), group (`image/*`) and exact-mime (`application/pdf`) rules are
 * identical, as is the empty-list-accepts-everything behaviour.
 */
export const isFileTypeAccepted = (
    file: { name: string; type?: string },
    acceptedFileTypes: string[]
): boolean => {
    if (acceptedFileTypes.length === 0) return true

    const fileName = file.name.toLowerCase()
    const fileType = (file.type ?? '').toLowerCase()

    return acceptedFileTypes.some((acceptedType) => {
        const normalizedAcceptedType = acceptedType.trim().toLowerCase()
        if (!normalizedAcceptedType) return false

        if (normalizedAcceptedType.startsWith('.')) {
            return fileName.endsWith(normalizedAcceptedType)
        }

        if (normalizedAcceptedType.endsWith('/*')) {
            const acceptedGroup = normalizedAcceptedType.slice(0, -1)
            return fileType.startsWith(acceptedGroup)
        }

        return fileType === normalizedAcceptedType
    })
}

export const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes >= 1024 * 1024) {
        const sizeInMb = sizeInBytes / (1024 * 1024)
        return `${Number(sizeInMb.toFixed(2))} MB`
    }
    if (sizeInBytes >= 1024) {
        const sizeInKb = sizeInBytes / 1024
        return `${Number(sizeInKb.toFixed(2))} KB`
    }
    return `${sizeInBytes} B`
}

const KNOWN_UPLOAD_ERROR_REASONS = [
    'oversized',
    'maxFiles',
    'invalidType',
] as const
type KnownUploadErrorReason = (typeof KNOWN_UPLOAD_ERROR_REASONS)[number]

export const isKnownUploadErrorReason = (
    reason: unknown
): reason is KnownUploadErrorReason =>
    KNOWN_UPLOAD_ERROR_REASONS.includes(reason as KnownUploadErrorReason)

export const normalizeUploadErrorReason = (reason: unknown) =>
    isKnownUploadErrorReason(reason) ? reason : undefined

export const getValidationMessage = (
    reason?: unknown,
    maxSize?: number,
    maxFiles?: number
): string => {
    switch (normalizeUploadErrorReason(reason)) {
        case 'oversized':
            return maxSize
                ? `File is too large. Max size is ${formatFileSize(maxSize)}`
                : 'File is too large'
        case 'maxFiles':
            return maxFiles
                ? `File limit exceeded. Maximum ${maxFiles} files allowed`
                : 'File limit exceeded'
        case 'invalidType':
            return 'Invalid file type'
        default:
            return 'Invalid file'
    }
}

/**
 * The validation half of web's inline `validateFiles`, extracted so apps can
 * fulfill the native API contract: `onChange` hands back
 * `UploadFileNativeItem`s already marked, but the app is the one producing
 * items from a picker, so it must run this before appending.
 *
 * Marks each item with `isValid`/`errorReason` in web's precedence order —
 * maxFiles (index ≥ remaining slots), invalid type, oversized — and returns
 * new copies; the input array is never mutated.
 *
 * `remainingSlots` semantics match web: `maxFiles` limits a multi-upload
 * against the files already present (`existingCount`); when `multiple` is
 * false the limit is 1 with no credit for existing files (a single-file
 * upload replaces, it does not append).
 */
export type ValidateUploadFilesOptions = {
    acceptedTypes?: string[]
    maxSize?: number
    maxFiles?: number
    multiple?: boolean
    existingCount?: number
}

export const validateUploadFiles = (
    items: UploadFileNativeItem[],
    {
        acceptedTypes = [],
        maxSize = 0,
        maxFiles,
        multiple = true,
        existingCount = 0,
    }: ValidateUploadFilesOptions = {}
): UploadFileNativeItem[] => {
    const limit = maxFiles ?? (multiple ? undefined : 1)
    const remainingSlots =
        limit !== undefined && multiple
            ? limit - existingCount
            : (limit ?? Infinity)

    return items.map((item, index) => {
        const base = {
            ...item,
            id: item.id ?? `${item.name}-${item.size}-${Date.now()}-${index}`,
        }

        if (limit !== undefined && index >= remainingSlots) {
            return {
                ...base,
                isValid: false,
                errorReason: UploadErrorReason.MAX_FILES,
            }
        }

        if (!isFileTypeAccepted(item, acceptedTypes)) {
            return {
                ...base,
                isValid: false,
                errorReason: UploadErrorReason.INVALID_TYPE,
            }
        }

        if (maxSize && item.size > maxSize) {
            return {
                ...base,
                isValid: false,
                errorReason: UploadErrorReason.OVERSIZED,
            }
        }

        return { ...base, isValid: true }
    })
}

/**
 * Native state derivation — deliberately NOT the shared `getFieldState`:
 * invalid files force ERROR even when the prop `state` is IDLE, which is
 * web's `displayUploadState` resolution.
 */
export const getUploadDisplayState = (
    state: UploadState = UploadState.IDLE,
    disabled?: boolean,
    hasInvalidFiles?: boolean
): UploadState => {
    if (disabled || state === UploadState.DISABLED) return UploadState.DISABLED
    if (hasInvalidFiles) return UploadState.ERROR
    return state
}

/**
 * The single-file error aggregation web renders inside the container when
 * `state===ERROR && !errorText && !multiple`: collect the distinct reasons
 * across invalid files, in the fixed oversized → maxFiles → invalidType
 * order, and join their messages. Returns the generic message when there
 * are no invalid files.
 */
export const getAggregatedErrorMessage = (
    files: UploadFileNativeItem[],
    maxSize?: number,
    maxFiles?: number
): string => {
    const reasons = new Set<UploadErrorReasonValue>()
    for (const file of files) {
        const reason = normalizeUploadErrorReason(file.errorReason)
        if (reason) reasons.add(reason)
    }
    const errors: string[] = []
    if (reasons.has(UploadErrorReason.OVERSIZED))
        errors.push(getValidationMessage('oversized', maxSize, maxFiles))
    if (reasons.has(UploadErrorReason.MAX_FILES))
        errors.push(getValidationMessage('maxFiles', maxSize, maxFiles))
    if (reasons.has(UploadErrorReason.INVALID_TYPE))
        errors.push(getValidationMessage('invalidType', maxSize, maxFiles))
    return errors.length > 0
        ? errors.join(', ')
        : getValidationMessage(undefined, maxSize, maxFiles)
}

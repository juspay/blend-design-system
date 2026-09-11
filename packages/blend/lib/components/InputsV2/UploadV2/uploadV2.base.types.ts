import { InputSizeV2 } from '../inputV2.types'

export enum UploadState {
    IDLE = 'idle',
    UPLOADING = 'uploading',
    SUCCESS = 'success',
    ERROR = 'error',

    DISABLED = 'disabled',
}

export const UploadErrorReason = {
    OVERSIZED: 'oversized',
    MAX_FILES: 'maxFiles',
    INVALID_TYPE: 'invalidType',
} as const

export type UploadErrorReasonValue =
    (typeof UploadErrorReason)[keyof typeof UploadErrorReason]

export type UploadFileBase = {
    id?: string
    name: string
    size: number
    isValid: boolean
    errorReason?: UploadErrorReasonValue
}

export type UploadBaseProps = {
    label?: string
    subLabel?: string
    description?: string
    size?: InputSizeV2
    required?: boolean
    multiple?: boolean
    /** File types to accept (e.g., ['.jpg', '.png', 'image/*', '.pdf']) */
    acceptedFileTypes?: string[]
    disabled?: boolean
    slot?: React.ReactNode
    files?: UploadFileBase[]
    /** Callback when files are selected or changed */
    onChange?: (files: UploadFileBase[]) => void
    state?: UploadState
    error?: {
        show: boolean
        message?: string
    }
    errorText?: string
    hintText?: string
    maxSize?: number
    maxFiles?: number
    progressBarValue?: number
    uploadHeaderText?: string
}

import { InputSizeV2 } from '../inputV2.types'

export enum UploadState {
    IDLE = 'idle',
    UPLOADING = 'uploading',
    SUCCESS = 'success',
    ERROR = 'error',
    DRAG_ENTER = 'drag_enter',
    DRAG_LEAVE = 'drag_leave',
    DRAG_OVER = 'drag_over',
    DROP = 'drop',
    DISABLED = 'disabled',
}

export type UploadFileV2 = {
    file: File
    isValid: boolean
    errorReason?: 'oversized' | 'maxFiles' | 'invalidType'
}

export type UploadV2Props = {
    label?: string
    subLabel?: string
    description?: string
    size?: InputSizeV2
    helpIconText?: string
    inputId?: string
    required?: boolean
    multiple?: boolean
    /** File types to accept (e.g., ['.jpg', '.png', 'image/*', '.pdf']) */
    acceptedFileTypes?: string[]
    disabled?: boolean
    slot?: React.ReactNode
    files?: UploadFileV2[]
    /** Callback when files are selected or changed */
    onChange?: (files: UploadFileV2[]) => void
    state?: UploadState
    errorText?: string
    maxSize?: number
    maxFiles?: number
    progressBarValue?: number
    progressBarMaxWidth?: string
    uploadHeaderText?: string
}

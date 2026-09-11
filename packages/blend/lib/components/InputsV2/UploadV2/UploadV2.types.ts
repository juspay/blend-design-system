import { InputSizeV2 } from '../inputV2.types'
import type { UploadErrorReasonValue } from './uploadV2.base.types'
import { UploadState } from './uploadV2.base.types'

export { UploadState, UploadErrorReason } from './uploadV2.base.types'
export type {
    UploadErrorReasonValue,
    UploadFileBase,
    UploadBaseProps,
} from './uploadV2.base.types'

export enum UploadDragState {
    DRAG_ENTER = 'drag_enter',
    DRAG_LEAVE = 'drag_leave',
    DRAG_OVER = 'drag_over',
    DROP = 'drop',
}

export type UploadFileV2 = {
    id?: string
    file: File
    isValid: boolean
    errorReason?: UploadErrorReasonValue
}

export type UploadV2Props = {
    id?: string
    name?: string
    label?: string
    subLabel?: string
    description?: string
    size?: InputSizeV2
    helpIconText?: string
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
    error?: {
        show: boolean
        message?: string
    }
    errorText?: string
    hintText?: string
    maxSize?: number
    maxFiles?: number
    progressBarValue?: number
    progressBarMaxWidth?: string
    uploadHeaderText?: string
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'multiple' | 'slot' | 'onChange'
>

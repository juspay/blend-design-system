import type { ReactNode, TextareaHTMLAttributes } from 'react'
import type { MenuProps } from '../Menu/types'

export type AttachedFile = {
    id: string
    name: string
    type: 'image' | 'pdf' | 'csv' | 'text' | 'other'
    size?: number
    url?: string
    preview?: string
}

export type TopQuery = {
    id: string
    text: string
}

export type ChatInputProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'value'
> & {
    value?: string
    slot1?: ReactNode
    onChange?: (value: string) => void
    onSend?: (message: string, files: AttachedFile[]) => void
    onAttachFiles?: (files: File[]) => void
    onVoiceRecord?: () => void
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: AttachedFile) => void

    placeholder?: string
    disabled?: boolean
    maxLength?: number
    autoResize?: boolean

    attachedFiles?: AttachedFile[]

    // Top queries
    topQueries?: TopQuery[]
    onTopQuerySelect?: (query: TopQuery) => void
    topQueriesMaxHeight?: number

    // Button customization
    attachButtonIcon?: ReactNode
    voiceButtonIcon?: ReactNode
    sendButtonIcon?: ReactNode

    // Menu props for overflow files
    overflowMenuProps?: Partial<MenuProps>
}

export type ChatInputTokens = {
    container: {
        backgroundColor: string
        border: string
        borderRadius: string
        padding: string
        gap: string
        minHeight: string
        maxHeight: string
    }

    textarea: {
        backgroundColor: string
        color: string
        fontSize: string
        lineHeight: string
        padding: string
        border: string
        borderRadius: string
        placeholder: {
            color: string
        }
        resize: string
        fontFamily: string
    }

    filesContainer: {
        gap: string
        padding: string
        maxHeight: string
        overflowBehavior: string
    }

    bottomActions: {
        padding: string
        gap: string
        justifyContent: string
    }

    actionButton: {
        size: string
        padding: string
        borderRadius: string
        backgroundColor: {
            default: string
            hover: string
            active: string
            disabled: string
        }
        color: {
            default: string
            hover: string
            active: string
            disabled: string
        }
        border: string
    }

    overflowTag: {
        backgroundColor: string
        color: string
        border: string
        borderRadius: string
        padding: string
        fontSize: string
        fontWeight: string
        cursor: string
    }
}

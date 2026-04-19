import { ReactNode } from 'react'
import { ChatInputV2TokensType } from './ChatInputV2.tokens'
import { MenuProps } from '../../../main'
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
export type ChatInputV2Props = {
    value?: string
    topQueries?: TopQuery[]
    onTopQuerySelect?: (query: TopQuery) => void
    placeholder?: string
    onChange: (value: string) => void
    slot1?: ReactNode
    slot2?: ReactNode
    onSlot2Click?: () => void
    topQueriesMaxHeight?: number
    /** Max textarea height in px (ChatGPT-style auto-grow). Defaults to token `input.maxHeight`. */
    textareaMaxHeight?: number
    disabled?: boolean
    attachedFiles?: AttachedFile[]
    /** New files from the hidden file input (append in parent state). */
    onAttachFiles?: (files: File[]) => void
    /** Remove by id — use this for chip dismiss; do not use `onAttachFiles` to “replace” the list. */
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: AttachedFile) => void
    onEnter?: () => void
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'style' | 'className' | 'onFocus' | 'onBlur' | 'cols' | 'onChange'
>

export type MobileChatInputV2Props = {
    disabled?: boolean
    value: string
    onChange?: (value: string) => void
    slot1?: React.ReactNode
    slot2?: React.ReactNode
    placeholder?: string
    attachedFiles?: AttachedFile[]
    handleAttachClick?: () => void
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: AttachedFile) => void
    overflowMenuProps?: Partial<MenuProps>
    onSlot2Click?: () => void
    id?: string
    webTokens: ChatInputV2TokensType
    onEnter?: () => void
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'style' | 'className' | 'onFocus' | 'onBlur' | 'cols' | 'onChange'
>

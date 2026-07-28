import type { ReactNode, TextareaHTMLAttributes } from 'react'
import { ChatInputV2TokensType } from './ChatInputV2.tokens'
export type ChatInputV2AttachedFile = {
    id: string
    name: string
    type: 'image' | 'pdf' | 'csv' | 'text' | 'other'
    size?: number
    url?: string
    preview?: string
}
export type ChatInputV2TopQuery = {
    id: string
    text: string
}
export type ChatInputV2Props = {
    value?: string
    topQueries?: ChatInputV2TopQuery[]
    onTopQuerySelect?: (query: ChatInputV2TopQuery) => void
    placeholder?: string
    onChange: (value: string) => void
    /** Renders full-width above the field row (e.g. context, filters, banners). */
    topContent?: ReactNode
    /** Renders in the secondary control area (e.g. voice / send) next to the attach control (desktop) or the textarea end (mobile). */
    secondaryAction?: ReactNode
    onSecondaryActionClick?: () => void
    topQueriesMaxHeight?: number
    /** Max textarea height in px (ChatGPT-style auto-grow). Defaults to token `input.maxHeight`. */
    textareaMaxHeight?: number
    disabled?: boolean
    attachedFiles?: ChatInputV2AttachedFile[]
    /** New files from the hidden file input (append in parent state). */
    onAttachFiles?: (files: File[]) => void
    /** Remove by id — use this for chip dismiss; do not use `onAttachFiles` to “replace” the list. */
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: ChatInputV2AttachedFile) => void
    onEnter?: () => void
} & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'style' | 'className' | 'onFocus' | 'onBlur' | 'cols' | 'onChange'
>

export type MobileChatInputV2Props = {
    disabled?: boolean
    value: string
    onChange?: (value: string) => void
    topContent?: ReactNode
    secondaryAction?: ReactNode
    placeholder?: string
    attachedFiles?: ChatInputV2AttachedFile[]
    handleAttachClick?: () => void
    onFileRemove?: (fileId: string) => void
    /** Invoked when a chip label is activated (inline or overflow); forwarded to `ChatInputV2AttachmentRow`. */
    onFileClick?: (file: ChatInputV2AttachedFile) => void
    onSecondaryActionClick?: () => void
    id?: string
    webTokens: ChatInputV2TokensType
    onEnter?: () => void
} & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'className' | 'onFocus' | 'onBlur' | 'cols' | 'onChange'
>

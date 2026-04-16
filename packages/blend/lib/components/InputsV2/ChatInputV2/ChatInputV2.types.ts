import { ReactNode } from 'react'
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
}

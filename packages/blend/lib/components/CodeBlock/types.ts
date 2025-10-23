import type { ReactNode } from 'react'

export enum CodeBlockVariant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
    DIFF = 'diff',
}

export enum DiffLineType {
    ADDED = 'added',
    REMOVED = 'removed',
    UNCHANGED = 'unchanged',
}

export interface DiffLine {
    content: string
    type: DiffLineType
}

export type CodeBlockProps = {
    code: string
    variant?: CodeBlockVariant
    showLineNumbers?: boolean
    showHeader?: boolean
    header?: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    diffLines?: DiffLine[]
}

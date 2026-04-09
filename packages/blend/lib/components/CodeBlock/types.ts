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

export type SupportedLanguage =
    | 'javascript'
    | 'typescript'
    | 'jsx'
    | 'tsx'
    | 'json'
    | 'css'
    | 'html'
    | 'markdown'
    | 'yaml'
    | 'python'
    | 'rust'
    | 'haskell'

export type DiffViewSegment =
    | { type: 'lines'; start: number; end: number }
    | { type: 'collapsed'; start: number; end: number }

export type CodeBlockProps = {
    code: string
    variant?: CodeBlockVariant
    showLineNumbers?: boolean
    showHeader?: boolean
    header?: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    diffLines?: DiffLine[]
    showCopyButton?: boolean
    autoFormat?: boolean
    language?: SupportedLanguage
    /**
     * When true (default), unchanged lines outside the context window around
     * edits are hidden behind an expand control (GitHub-style). Only applies
     * when variant is DIFF and diffLines is set.
     */
    isDiffUnchangedCollapsed?: boolean
    /**
     * How many unchanged lines to show above and below each change when
     * isDiffUnchangedCollapsed is true. Defaults to 3.
     */
    diffContextLines?: number
    /**
     * Lines revealed per click when expanding a collapsed gap from the start
     * or end (GitHub-style). Defaults to 20.
     */
    diffExpandChunk?: number
    /**
     * Maximum height for the code content area. When content exceeds this height,
     * the code area scrolls while the header remains fixed.
     * Accepts CSS values like '300px', '20rem', '50vh', etc.
     */
    maxHeight?: string
}

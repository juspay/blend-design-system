import type { ReactNode } from 'react'

export enum CodeEditorVariant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
}

/**
 * A Monaco language ID (e.g. `javascript`, `typescript`, `json`, `sql`,
 * `python`, `plaintext`). Typed as `string` to mirror Monaco itself: Monaco
 * types its own editor `language` option as `string` and does not export a
 * static union of built-in IDs — the set is only enumerable at runtime via
 * `monaco.languages.getLanguages()`. A hand-maintained union would inevitably
 * drift from what Monaco actually supports, so we deliberately match the
 * library. Decoupled from `CodeBlock`'s `SupportedLanguage`, which is scoped to
 * CodeBlock's hand-rolled tokenizer rather than Monaco.
 *
 * Note: the editor maps the aliases `jsx`/`tsx` onto Monaco's
 * `javascript`/`typescript` tokenizers (Monaco has no distinct JSX/TSX IDs).
 */
export type CodeEditorLanguage = string

export type CodeEditorProps = {
    value: string
    onChange?: (value: string) => void
    variant?: CodeEditorVariant
    showLineNumbers?: boolean
    showHeader?: boolean
    header?: string
    /**
     * Custom content to display on the left side of the header, before the header text.
     * If provided, replaces the default FileCode icon.
     */
    headerLeftSlot?: ReactNode
    /**
     * Custom content to display on the right side of the header, after the header text.
     * Uses the same gap as the left icon.
     */
    headerRightSlot?: ReactNode
    /**
     * When false, hides the default left FileCode icon.
     * Has no effect if headerLeftSlot is provided.
     * Defaults to true.
     */
    showLeftIcon?: boolean
    showCopyButton?: boolean
    language?: CodeEditorLanguage
    placeholder?: string
    readOnly?: boolean
    disabled?: boolean
    minHeight?: string | number
    maxHeight?: string | number
    height?: string | number
    className?: string
    onBlur?: () => void
    onFocus?: () => void
    /**
     * When true, automatically focuses the editor when it mounts.
     * When false or undefined, the editor will not auto-focus.
     * Defaults to false.
     */
    autoFocus?: boolean
}

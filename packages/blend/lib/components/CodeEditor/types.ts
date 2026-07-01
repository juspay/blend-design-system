import type { ReactNode } from 'react'

export enum CodeEditorVariant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
}

/**
 * Curated set of language IDs that Monaco renders well and that are common in
 * practice. This list exists purely for editor autocomplete — it is NOT a
 * runtime constraint. Monaco does not export a static union of its built-in
 * language IDs (they are only enumerable at runtime via
 * `monaco.languages.getLanguages()`), so `CodeEditorLanguage` also accepts any
 * other string via `(string & {})` for languages Monaco supports beyond this
 * list.
 */
export type KnownCodeEditorLanguage =
    | 'javascript'
    | 'typescript'
    | 'jsx'
    | 'tsx'
    | 'json'
    | 'css'
    | 'scss'
    | 'less'
    | 'html'
    | 'xml'
    | 'markdown'
    | 'yaml'
    | 'toml'
    | 'ini'
    | 'graphql'
    | 'sql'
    | 'python'
    | 'rust'
    | 'go'
    | 'java'
    | 'kotlin'
    | 'swift'
    | 'c'
    | 'cpp'
    | 'csharp'
    | 'php'
    | 'ruby'
    | 'shell'
    | 'bash'
    | 'dockerfile'
    | 'plaintext'
    | 'text'

/**
 * Language accepted by {@link CodeEditorProps.language}. Provides autocomplete
 * for {@link KnownCodeEditorLanguage} while still accepting any Monaco language
 * ID as a string. Decoupled from `CodeBlock`'s `SupportedLanguage`, which is
 * scoped to CodeBlock's hand-rolled tokenizer rather than Monaco.
 */
export type CodeEditorLanguage = KnownCodeEditorLanguage | (string & {})

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

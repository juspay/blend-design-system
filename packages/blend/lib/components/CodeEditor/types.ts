import type { ReactNode } from 'react'

export enum CodeEditorVariant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
}

/**
 * Common Monaco language IDs, provided purely for IDE autocomplete on the
 * `language` prop — NOT a runtime constraint. Every entry is verified against
 * the language IDs monaco-editor actually registers (Monaco does not export a
 * static union of its built-in IDs; they are only enumerable at runtime via
 * `monaco.languages.getLanguages()`). Note Monaco's plain-text ID is
 * `plaintext` and shell scripts are `shell` (there is no `bash` ID). Monaco
 * also has no distinct `jsx`/`tsx` IDs — those still work through the open
 * string arm of {@link CodeEditorLanguage}: the editor maps them onto the
 * `javascript`/`typescript` tokenizers.
 */
export type KnownCodeEditorLanguage =
    | 'javascript'
    | 'typescript'
    | 'json'
    | 'css'
    | 'scss'
    | 'less'
    | 'html'
    | 'xml'
    | 'markdown'
    | 'yaml'
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
    | 'powershell'
    | 'dockerfile'
    | 'plaintext'

/**
 * Language accepted by {@link CodeEditorProps.language}: autocomplete for
 * {@link KnownCodeEditorLanguage}, while `(string & {})` keeps the prop open
 * to every other Monaco language ID (the component forwards to Monaco, whose
 * own `language` option is a plain `string`). Decoupled from `CodeBlock`'s
 * `SupportedLanguage`, which is scoped to CodeBlock's hand-rolled tokenizer
 * rather than Monaco.
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

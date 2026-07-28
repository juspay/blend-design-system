import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Editor, { DiffEditor, OnMount, DiffOnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'
import Block from '../../Primitives/Block/Block'
import type { CodeEditorV2Tokens } from '../codeEditorV2.tokens'
import { createEditorTheme } from './monacoTheme'
import { MonacoEditorWrapperProps } from '../codeEditorV2.types'
import {
    EDITOR_FOCUS_DELAY_MS,
    configureLanguageDefaults,
    getContainerDimensions,
    getDiffEditorOptions,
    getEditorMetrics,
    getInitialEditorOptions,
    getMountEditorOptions,
    getPlaceholderPosition,
    getUpdateEditorOptions,
    blurMonacoEditorDom,
    syncDiffEditorPaneViewMode,
    toCssValue,
} from '../utils'
import { CSSObject } from 'styled-components'

// ---------------------------------------------------------------------------
// Language mapping
// ---------------------------------------------------------------------------

// Monaco registers only `javascript`/`typescript` (VS Code's
// `javascriptreact`/`typescriptreact` IDs are not registered, so they would
// fall back to plaintext with no highlighting). Monaco's JS/TS tokenizers
// handle JSX/TSX syntax fine, so map the ergonomic aliases onto them.
const LANGUAGE_MAP: Record<string, string> = {
    jsx: 'javascript',
    tsx: 'typescript',
}

const mapLanguage = (lang: string) => LANGUAGE_MAP[lang] ?? lang

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function EditorLoading({
    minHeight,
    tokens,
}: {
    minHeight: CSSObject['minHeight']
    tokens: CodeEditorV2Tokens
}) {
    return (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            style={{ minHeight: toCssValue(minHeight) }}
            color={tokens.body.syntax.comment.color}
            fontSize={tokens.body.code.fontSize}
        >
            Loading editor...
        </Block>
    )
}

function EditorPlaceholder({
    placeholder,
    position,
    tokens,
}: {
    placeholder: string
    position: { top: string; left: string }
    tokens: CodeEditorV2Tokens
}) {
    return (
        <Block
            position="absolute"
            top={position.top}
            left={position.left}
            color={tokens.body.syntax.comment.color}
            style={{
                pointerEvents: 'none',
                fontSize: tokens.body.code.fontSize,
                fontFamily: tokens.body.code.fontFamily,
                opacity: 0.6,
            }}
        >
            {placeholder}
        </Block>
    )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MonacoEditorWrapper({
    value,
    language,
    onChange,
    readOnly,
    disabled,
    placeholder,
    showLineNumbers,
    minHeight,
    maxHeight,
    height,
    tokens,
    onFocus,
    onBlur,
    autoFocus = false,
    diff = false,
    originalValue = '',
    renderSideBySide = true,
    isDiffUnchangedCollapsed = true,
    diffContextLines = 3,
    diffExpandChunk = 20,
}: MonacoEditorWrapperProps) {
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
    const monacoRef = useRef<typeof import('monaco-editor') | null>(null)
    const diffModifiedOnChangeDisposableRef = useRef<Monaco.IDisposable | null>(
        null
    )
    const onChangeRef = useRef(onChange)
    const readOnlyRef = useRef(readOnly)
    const disabledRef = useRef(disabled)
    const [isEditorReady, setIsEditorReady] = useState(false)

    onChangeRef.current = onChange
    readOnlyRef.current = readOnly
    disabledRef.current = disabled

    const viewOnly = readOnly || disabled

    const monacoLanguage = useMemo(() => mapLanguage(language), [language])
    const editorTheme = useMemo(() => createEditorTheme(tokens), [tokens])
    const metrics = useMemo(
        () => getEditorMetrics(tokens, showLineNumbers),
        [tokens, showLineNumbers]
    )
    const containerStyle = useMemo(
        () => getContainerDimensions(height, minHeight, maxHeight),
        [height, minHeight, maxHeight]
    )
    const placeholderPosition = useMemo(
        () => getPlaceholderPosition(metrics, showLineNumbers),
        [metrics, showLineNumbers]
    )

    useEffect(() => {
        if (!editorRef.current) return
        editorRef.current.updateOptions(
            getUpdateEditorOptions(metrics, showLineNumbers, readOnly, disabled)
        )
    }, [metrics, showLineNumbers, readOnly, disabled])

    useEffect(() => {
        if (diff || !isEditorReady || !editorRef.current || !viewOnly) return
        blurMonacoEditorDom(editorRef.current)
    }, [diff, viewOnly, isEditorReady])

    const handleMount: OnMount = (editor, monaco) => {
        editorRef.current = editor
        monacoRef.current = monaco
        setIsEditorReady(true)

        editor.updateOptions(
            getMountEditorOptions(
                metrics,
                tokens,
                showLineNumbers,
                readOnly,
                disabled
            )
        )

        editor.onDidFocusEditorText(() => {
            if (readOnlyRef.current || disabledRef.current) {
                blurMonacoEditorDom(editor)
                return
            }
            onFocus?.()
        })
        editor.onDidBlurEditorText(() => onBlur?.())

        if (autoFocus && !disabled && !readOnly) {
            setTimeout(() => editor.focus(), EDITOR_FOCUS_DELAY_MS)
        }
    }

    const diffContainerRef = useRef<HTMLDivElement | null>(null)
    const diffEditorRef = useRef<Monaco.editor.IStandaloneDiffEditor | null>(
        null
    )

    const handleDiffMount: DiffOnMount = (diffEditor, monaco) => {
        monacoRef.current = monaco
        diffEditorRef.current = diffEditor
        setIsEditorReady(true)

        diffModifiedOnChangeDisposableRef.current?.dispose()
        diffModifiedOnChangeDisposableRef.current = null

        const modified = diffEditor.getModifiedEditor()
        diffModifiedOnChangeDisposableRef.current =
            modified.onDidChangeModelContent(() => {
                if (readOnlyRef.current || disabledRef.current) return
                const cb = onChangeRef.current
                if (!cb) return
                cb(modified.getValue())
            })

        syncDiffEditorPaneViewMode(diffEditor, readOnly, disabled)

        for (const ed of [
            diffEditor.getOriginalEditor(),
            diffEditor.getModifiedEditor(),
        ]) {
            ed.onDidFocusEditorText(() => {
                if (readOnlyRef.current || disabledRef.current) {
                    blurMonacoEditorDom(ed)
                }
            })
        }
    }

    useEffect(() => {
        if (!diff) {
            diffEditorRef.current = null
            return
        }
        const d = diffEditorRef.current
        if (d) syncDiffEditorPaneViewMode(d, readOnly, disabled)
    }, [diff, readOnly, disabled])

    useEffect(() => {
        return () => {
            diffModifiedOnChangeDisposableRef.current?.dispose()
            diffModifiedOnChangeDisposableRef.current = null
        }
    }, [diff])

    useEffect(() => {
        if (!diff || !diffContainerRef.current) return

        const el = diffContainerRef.current
        const handleWheel = (e: WheelEvent) => {
            const scrollable = el.querySelector(
                '.monaco-scrollable-element'
            ) as HTMLElement | null
            if (!scrollable) return

            const { scrollTop, scrollHeight, clientHeight } = scrollable
            const atTop = scrollTop <= 0 && e.deltaY < 0
            const atBottom =
                scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0

            if (atTop || atBottom) {
                return
            }
            e.stopPropagation()
        }

        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [diff, isEditorReady])

    const handleChange = useCallback(
        (newValue: string | undefined) => {
            if (readOnlyRef.current || disabledRef.current) return
            if (newValue !== undefined) onChange?.(newValue)
        },
        [onChange]
    )

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') e.stopPropagation()
    }, [])

    const beforeMount = useCallback(
        (monaco: typeof import('monaco-editor')) => {
            monacoRef.current = monaco
            try {
                configureLanguageDefaults(monaco)
                monaco.editor.defineTheme(tokens.theme, editorTheme)
                monaco.editor.setTheme(tokens.theme)
            } catch (err) {
                console.warn('Failed to initialise Monaco theme:', err)
            }
        },
        [editorTheme, tokens.theme]
    )

    // Keep Monaco theme in sync when tokens/theme change after mount
    useEffect(() => {
        if (!monacoRef.current) return
        try {
            monacoRef.current.editor.defineTheme(tokens.theme, editorTheme)
            monacoRef.current.editor.setTheme(tokens.theme)
        } catch (err) {
            console.warn('Failed to update Monaco theme:', err)
        }
    }, [editorTheme, tokens.theme])

    const initialOptions = useMemo(
        () =>
            getInitialEditorOptions(
                metrics,
                tokens,
                showLineNumbers,
                readOnly,
                disabled
            ),
        [metrics, tokens, showLineNumbers, readOnly, disabled]
    )

    const diffOptions = useMemo(
        () =>
            getDiffEditorOptions(
                metrics,
                tokens,
                showLineNumbers,
                renderSideBySide,
                readOnly,
                disabled,
                isDiffUnchangedCollapsed,
                diffContextLines,
                diffExpandChunk
            ),
        [
            metrics,
            tokens,
            showLineNumbers,
            renderSideBySide,
            readOnly,
            disabled,
            isDiffUnchangedCollapsed,
            diffContextLines,
            diffExpandChunk,
        ]
    )

    return (
        <Block
            data-element="monaco-editor-wrapper"
            position="relative"
            width="100%"
            backgroundColor={tokens.body.backgroundColor}
            style={{ ...containerStyle, overflow: 'visible' }}
            onKeyDown={handleKeyDown}
        >
            {diff ? (
                <div ref={diffContainerRef}>
                    <DiffEditor
                        original={originalValue}
                        modified={value}
                        language={monacoLanguage}
                        height={
                            containerStyle.height ?? containerStyle.minHeight
                        }
                        beforeMount={beforeMount}
                        onMount={handleDiffMount}
                        options={diffOptions}
                        loading={
                            <EditorLoading
                                minHeight={minHeight}
                                tokens={tokens}
                            />
                        }
                    />
                </div>
            ) : (
                <>
                    <Editor
                        value={value}
                        language={monacoLanguage}
                        onChange={handleChange}
                        onMount={handleMount}
                        beforeMount={beforeMount}
                        options={initialOptions}
                        loading={
                            <EditorLoading
                                minHeight={minHeight}
                                tokens={tokens}
                            />
                        }
                    />

                    {!value && placeholder && isEditorReady && (
                        <EditorPlaceholder
                            placeholder={placeholder}
                            position={placeholderPosition}
                            tokens={tokens}
                        />
                    )}
                </>
            )}
        </Block>
    )
}

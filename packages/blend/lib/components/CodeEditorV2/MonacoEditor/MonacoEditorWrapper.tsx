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
    toCssValue,
} from '../utils'
import './monaco-editor.css'

// ---------------------------------------------------------------------------
// Language mapping
// ---------------------------------------------------------------------------

const LANGUAGE_MAP: Record<string, string> = {
    jsx: 'javascriptreact',
    tsx: 'typescriptreact',
}

const mapLanguage = (lang: string) => LANGUAGE_MAP[lang] ?? lang

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function EditorLoading({
    minHeight,
    tokens,
}: {
    minHeight: string | number
    tokens: CodeEditorV2Tokens
}) {
    return (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            style={{ minHeight: toCssValue(minHeight) }}
            color={tokens.body.syntax.comment}
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
            color={tokens.body.syntax.comment}
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
}: MonacoEditorWrapperProps) {
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
    const monacoRef = useRef<typeof import('monaco-editor') | null>(null)
    const [isEditorReady, setIsEditorReady] = useState(false)

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

        editor.onDidFocusEditorText(() => onFocus?.())
        editor.onDidBlurEditorText(() => onBlur?.())

        if (autoFocus && !disabled && !readOnly) {
            setTimeout(() => editor.focus(), EDITOR_FOCUS_DELAY_MS)
        }
    }

    const diffContainerRef = useRef<HTMLDivElement | null>(null)

    const handleDiffMount: DiffOnMount = (diffEditor, monaco) => {
        monacoRef.current = monaco
        setIsEditorReady(true)

        const scrollbarOverride = {
            scrollbar: { alwaysConsumeMouseWheel: false },
        }
        diffEditor.getOriginalEditor().updateOptions(scrollbarOverride)
        diffEditor.getModifiedEditor().updateOptions(scrollbarOverride)
    }

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
        [editorTheme]
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
    }, [editorTheme])

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
                disabled
            ),
        [metrics, tokens, showLineNumbers, renderSideBySide, readOnly, disabled]
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

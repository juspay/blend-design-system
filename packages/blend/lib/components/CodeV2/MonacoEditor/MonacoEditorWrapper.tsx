import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'
import Block from '../../Primitives/Block/Block'
import type { CodeV2Tokens } from '../tokens'
import { createEditorTheme } from './monacoTheme'
import { MonacoEditorWrapperProps } from '../types'
import {
    BLEND_EDITOR_THEME_NAME,
    EDITOR_FOCUS_DELAY_MS,
    buildShortcutKeybindings,
    configureLanguageDefaults,
    getContainerDimensions,
    getEditorMarginStyles,
    getEditorMetrics,
    getInitialEditorOptions,
    getMountEditorOptions,
    getPlaceholderPosition,
    getUpdateEditorOptions,
    toCssValue,
} from './monacoEditorUtils'
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
    tokens: CodeV2Tokens
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
    tokens: CodeV2Tokens
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
}: MonacoEditorWrapperProps) {
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
    const monacoRef = useRef<typeof import('monaco-editor') | null>(null)
    const shortcutDisposables = useRef<Monaco.IDisposable[]>([])
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
    const marginStyles = useMemo(
        () => getEditorMarginStyles(showLineNumbers, metrics.codePaddingLeft),
        [showLineNumbers, metrics.codePaddingLeft]
    )

    const disposeShortcuts = useCallback(() => {
        shortcutDisposables.current.forEach((d) => d?.dispose?.())
        shortcutDisposables.current = []
    }, [])

    const registerShortcuts = useCallback(() => {
        const editor = editorRef.current
        const monaco = monacoRef.current
        if (!editor || !monaco) return

        disposeShortcuts()
        const configs = buildShortcutKeybindings(monaco).filter(
            (s) => !s.requiresWriteAccess || (!readOnly && !disabled)
        )
        shortcutDisposables.current = configs.map((s) =>
            editor.addAction({
                id: s.id,
                label: s.label,
                keybindings: s.keybindings,
                precondition: undefined,
                keybindingContext: undefined,
                run: () => editor.trigger('shortcut', s.actionId, undefined),
            })
        )
    }, [disposeShortcuts, disabled, readOnly])

    useEffect(() => {
        if (!editorRef.current) return
        editorRef.current.updateOptions(
            getUpdateEditorOptions(metrics, showLineNumbers, readOnly, disabled)
        )
    }, [metrics, showLineNumbers, readOnly, disabled])

    useEffect(() => {
        if (!isEditorReady) return
        registerShortcuts()
        return disposeShortcuts
    }, [disposeShortcuts, isEditorReady, registerShortcuts])

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
                monaco.editor.defineTheme(BLEND_EDITOR_THEME_NAME, editorTheme)
            } catch (err) {
                console.warn('Failed to initialise Monaco theme:', err)
            }
        },
        [editorTheme]
    )

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

    return (
        <Block
            position="relative"
            width="100%"
            backgroundColor={tokens.body.backgroundColor}
            style={{ ...containerStyle, overflow: 'auto' }}
            onKeyDown={handleKeyDown}
        >
            <style>{marginStyles}</style>

            <Editor
                value={value}
                language={monacoLanguage}
                onChange={handleChange}
                onMount={handleMount}
                theme={BLEND_EDITOR_THEME_NAME}
                beforeMount={beforeMount}
                options={initialOptions}
                loading={
                    <EditorLoading minHeight={minHeight} tokens={tokens} />
                }
            />

            {!value && placeholder && isEditorReady && (
                <EditorPlaceholder
                    placeholder={placeholder}
                    position={placeholderPosition}
                    tokens={tokens}
                />
            )}
        </Block>
    )
}

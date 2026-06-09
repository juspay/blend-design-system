import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeBlockTokenType } from '../CodeBlock/codeBlock.token'
import { CodeEditorVariant, type CodeEditorProps } from './types'
import { shouldShowLineNumbers, getContainerStyles } from './utils'
import { CodeEditorHeader } from './CodeEditorHeader'
import { MonacoEditorWrapper } from './MonacoEditorWrapper'

const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>(
    (
        {
            value,
            onChange,
            variant = CodeEditorVariant.DEFAULT,
            showLineNumbers,
            showHeader = true,
            header = 'Editor',
            headerLeftSlot,
            headerRightSlot,
            showLeftIcon = true,
            showCopyButton = true,
            language = 'javascript',
            placeholder,
            readOnly = false,
            disabled = false,
            minHeight = '300px',
            maxHeight,
            height,
            className,
            onBlur,
            onFocus,
            autoFocus = false,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CodeBlockTokenType>('CODE_BLOCK')
        const [isCopied, setIsCopied] = useState(false)
        const copyFeedbackTimeoutRef = useRef<ReturnType<
            typeof setTimeout
        > | null>(null)

        useEffect(() => {
            return () => {
                if (copyFeedbackTimeoutRef.current !== null) {
                    clearTimeout(copyFeedbackTimeoutRef.current)
                }
            }
        }, [])

        const copyToClipboard = useCallback(() => {
            navigator.clipboard.writeText(value)
            setIsCopied(true)

            if (copyFeedbackTimeoutRef.current !== null) {
                clearTimeout(copyFeedbackTimeoutRef.current)
            }

            copyFeedbackTimeoutRef.current = setTimeout(() => {
                setIsCopied(false)
                copyFeedbackTimeoutRef.current = null
            }, 2000)
        }, [value])

        // Determine if line numbers should be shown
        const shouldShowLineNumbersValue = shouldShowLineNumbers(
            showLineNumbers,
            variant
        )

        const containerStyles = getContainerStyles(minHeight, maxHeight)

        return (
            <Block
                ref={ref}
                position="relative"
                width="100%"
                borderRadius={tokens.borderRadius}
                border={tokens.border}
                overflow="hidden"
                backgroundColor={tokens.backgroundColor}
                boxShadow={tokens.boxShadow}
                className={className}
                style={containerStyles}
                data-codeeditor={header}
            >
                {showHeader && (
                    <CodeEditorHeader
                        header={header}
                        headerLeftSlot={headerLeftSlot}
                        headerRightSlot={headerRightSlot}
                        showLeftIcon={showLeftIcon}
                        showCopyButton={showCopyButton}
                        isCopied={isCopied}
                        onCopy={copyToClipboard}
                        tokens={tokens}
                    />
                )}

                <MonacoEditorWrapper
                    value={value}
                    language={language}
                    onChange={onChange}
                    readOnly={readOnly}
                    disabled={disabled}
                    placeholder={placeholder}
                    showLineNumbers={shouldShowLineNumbersValue}
                    minHeight={minHeight}
                    maxHeight={maxHeight}
                    height={height}
                    tokens={tokens}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    autoFocus={autoFocus}
                />
            </Block>
        )
    }
)

CodeEditor.displayName = 'CodeEditor'

export default CodeEditor

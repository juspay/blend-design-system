import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeEditorV2Tokens } from './codeEditorV2.tokens'
import { CodeEditorV2Variant } from './codeEditorV2.types'
import { CodeEditorV2Props } from './codeEditorV2.types'
import {
    copyToClipboardWithTemporaryFeedback,
    shouldShowLineNumbers,
    getContainerStyles,
} from './utils'
import { CodeEditorV2Header } from './CodeEditorV2Header'
import { MonacoEditorWrapper } from './MonacoEditor/MonacoEditorWrapper'

const CodeEditorV2 = forwardRef<HTMLDivElement, CodeEditorV2Props>(
    (
        {
            value,
            onChange,
            variant = CodeEditorV2Variant.DEFAULT,
            showLineNumbers,
            showHeader = true,
            header = 'Editor',
            headerSlot,
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
            diff = false,
            originalValue,
            renderSideBySide = true,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CodeEditorV2Tokens>('CODEEDITORV2')
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

        // Determine if line numbers should be shown
        const shouldShowLineNumbersValue = shouldShowLineNumbers(
            showLineNumbers,
            variant
        )

        const copyToClipboard = useCallback(() => {
            copyToClipboardWithTemporaryFeedback(
                value,
                setIsCopied,
                copyFeedbackTimeoutRef
            )
        }, [value])
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
                    <CodeEditorV2Header
                        header={header}
                        headerLeftSlot={headerSlot?.left}
                        headerRightSlot={headerSlot?.right}
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
                    diff={diff}
                    originalValue={originalValue}
                    renderSideBySide={renderSideBySide}
                />
            </Block>
        )
    }
)

CodeEditorV2.displayName = 'CodeEditorV2'

export default CodeEditorV2

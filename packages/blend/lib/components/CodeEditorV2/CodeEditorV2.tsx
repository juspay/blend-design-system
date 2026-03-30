import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeEditorV2Tokens } from './codeEditorV2.tokens'
import { CodeEditorV2Variant } from './codeEditorV2.types'
import type { CodeEditorV2Props } from './codeEditorV2.types'
import {
    copyToClipboardWithTemporaryFeedback,
    isDiffEditorMode,
    shouldShowLineNumbers,
    getContainerStyles,
} from './utils'
import { CodeEditorV2Header } from './CodeEditorV2Header'
import { MonacoEditorWrapper } from './MonacoEditor/MonacoEditorWrapper'
import { filterBlockedProps } from '../../utils/prop-helpers'

const DEFAULT_HEADER: NonNullable<CodeEditorV2Props['header']> = {
    showHeader: true,
    title: 'Editor',
    leftSlot: null,
    rightSlot: null,
    showCopyButton: true,
}

const CodeEditorV2 = forwardRef<HTMLDivElement, CodeEditorV2Props>(
    (
        {
            value,
            onChange,
            variant = CodeEditorV2Variant.DEFAULT,
            showLineNumbers,
            header: headerProp,
            language = 'javascript',
            placeholder,
            readOnly = false,
            disabled = false,
            minHeight = '300px',
            maxHeight,
            height,
            width,
            maxWidth,
            minWidth,
            onBlur,
            onFocus,
            autoFocus = false,
            diff = false,
            originalValue,
            renderSideBySide = true,
            ...rest
        },
        ref
    ) => {
        const filteredRest = filterBlockedProps(rest)
        const header = { ...DEFAULT_HEADER, ...headerProp }
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
        const isDiff = isDiffEditorMode(diff, variant)

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
                {...filteredRest}
                ref={ref}
                position="relative"
                width={width ?? '100%'}
                maxWidth={maxWidth}
                minWidth={minWidth}
                borderRadius={tokens.borderRadius}
                border={tokens.border}
                overflow="hidden"
                backgroundColor={tokens.backgroundColor}
                boxShadow={tokens.boxShadow}
                style={containerStyles}
                data-codeeditor={header.title ?? DEFAULT_HEADER.title}
            >
                {header.showHeader && (
                    <CodeEditorV2Header
                        title={header.title}
                        leftSlot={header.leftSlot}
                        rightSlot={header.rightSlot}
                        showCopyButton={header.showCopyButton ?? true}
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
                    diff={isDiff}
                    originalValue={originalValue}
                    renderSideBySide={renderSideBySide}
                />
            </Block>
        )
    }
)

CodeEditorV2.displayName = 'CodeEditorV2'

export default CodeEditorV2

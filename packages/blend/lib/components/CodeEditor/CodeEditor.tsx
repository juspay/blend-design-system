import { forwardRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeBlockTokenType } from '../CodeBlock/codeBlock.token'
import { CodeEditorVariant, type CodeEditorProps } from './types'
import { createCopyToClipboard } from '../CodeBlock/utils'
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
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CodeBlockTokenType>('CODE_BLOCK')
        const [isCopied, setIsCopied] = useState(false)

        // Determine if line numbers should be shown
        const shouldShowLineNumbersValue = shouldShowLineNumbers(
            showLineNumbers,
            variant
        )

        // Handlers
        const copyToClipboard = createCopyToClipboard(value, setIsCopied)
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
            >
                {showHeader && (
                    <CodeEditorHeader
                        header={header}
                        headerLeftSlot={headerLeftSlot}
                        headerRightSlot={headerRightSlot}
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
                />
            </Block>
        )
    }
)

CodeEditor.displayName = 'CodeEditor'

export default CodeEditor

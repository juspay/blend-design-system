import { forwardRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { CodeV2Tokens } from '../codeV2.tokens'
import { CodeV2Variant } from '../codeV2.types'
import { CodeEditorV2Props } from '../codeV2.types'
import { createCopyToClipboard } from '../utils'
import { shouldShowLineNumbers, getContainerStyles } from '../utils'
import { CodeV2Header } from '../CodeV2Header'
import { MonacoEditorWrapper } from '../MonacoEditor/MonacoEditorWrapper'

const CodeEditorV2 = forwardRef<HTMLDivElement, CodeEditorV2Props>(
    (
        {
            value,
            onChange,
            variant = CodeV2Variant.DEFAULT,
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
        const tokens = useResponsiveTokens<CodeV2Tokens>('CODEEDITORV2')
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
                data-codeeditor={header}
            >
                {showHeader && (
                    <CodeV2Header
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

CodeEditorV2.displayName = 'CodeEditorV2'

export default CodeEditorV2

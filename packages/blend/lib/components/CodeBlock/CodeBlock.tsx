import { forwardRef, useState } from 'react'
import { Check, Copy, FileCode } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeBlockTokenType } from './codeBlock.token'
import { CodeBlockVariant, DiffLineType, type CodeBlockProps } from './types'
import {
    tokenizeLine,
    getDiffLineBackground,
    getTokenColor,
    getDiffGutterStyle,
    shouldShowLineNumbers as shouldShowLineNumbersUtil,
    createCopyToClipboard,
    processLines,
    type SyntaxToken,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'

// Reusable Line Number Gutter Component
type LineNumberGutterProps = {
    lineIndex: number
    width: string | number | undefined
    color: string | undefined
    style?: React.CSSProperties
}

const LineNumberGutter: React.FC<LineNumberGutterProps> = ({
    lineIndex,
    width,
    color,
    style,
}) => (
    <Block
        width={width}
        padding={FOUNDATION_THEME.unit[0] + ' ' + FOUNDATION_THEME.unit[10]}
        color={color}
        style={{
            userSelect: 'none',
            ...style,
        }}
        flexShrink="0"
        textAlign="right"
        alignSelf="stretch"
    >
        {lineIndex + 1}
    </Block>
)

// Reusable Tokenized Code Content Component
type TokenizedCodeLineProps = {
    tokens: SyntaxToken[]
    getTokenColor: (type: string) => string
    paddingTop?: string | number
    paddingBottom?: string | number
    paddingLeft?: string | number
    paddingRight?: string | number
}

const TokenizedCodeLine: React.FC<TokenizedCodeLineProps> = ({
    tokens,
    getTokenColor,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
}) => (
    <code
        style={{
            flex: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            paddingTop:
                typeof paddingTop === 'number' ? `${paddingTop}px` : paddingTop,
            paddingBottom:
                typeof paddingBottom === 'number'
                    ? `${paddingBottom}px`
                    : paddingBottom,
            paddingLeft:
                typeof paddingLeft === 'number'
                    ? `${paddingLeft}px`
                    : paddingLeft,
            paddingRight:
                typeof paddingRight === 'number'
                    ? `${paddingRight}px`
                    : paddingRight,
        }}
    >
        {tokens.map((token, tokenIndex) => (
            <Block key={tokenIndex} as="span" color={getTokenColor(token.type)}>
                {token.value}
            </Block>
        ))}
    </code>
)

// Reusable Code Line Wrapper Component
type CodeLineWrapperProps = {
    children: React.ReactNode
    style?: React.CSSProperties
}

const CodeLineWrapper: React.FC<CodeLineWrapperProps> = ({
    children,
    style,
}) => (
    <Block display="flex" alignItems="flex-start" style={style}>
        {children}
    </Block>
)

// Reusable Pre Element Component
type PreElementProps = {
    children: React.ReactNode
    fontFamily: string | undefined
    fontSize: string | number | undefined
    lineHeight: string | number | undefined
}

const PreElement: React.FC<PreElementProps> = ({
    children,
    fontFamily,
    fontSize,
    lineHeight,
}) => (
    <pre
        style={{
            margin: 0,
            fontFamily: fontFamily || 'monospace',
            fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
            lineHeight:
                typeof lineHeight === 'number'
                    ? lineHeight.toString()
                    : lineHeight || '1.5',
        }}
    >
        {children}
    </pre>
)

const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
    (
        {
            code,
            variant = CodeBlockVariant.DEFAULT,
            showLineNumbers,
            showHeader = true,
            header = 'Header',
            headerLeftSlot,
            headerRightSlot,
            diffLines,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CodeBlockTokenType>('CODE_BLOCK')
        const [isCopied, setIsCopied] = useState(false)

        // Determine if line numbers should be shown based on variant or explicit prop
        const shouldShowLineNumbers = shouldShowLineNumbersUtil(
            showLineNumbers,
            variant
        )

        // Use diffLines if variant is diff, otherwise use code
        const isDiffMode =
            variant === CodeBlockVariant.DIFF && Boolean(diffLines)
        const lines = processLines(isDiffMode, diffLines, code)

        const copyToClipboard = createCopyToClipboard(code, setIsCopied)

        // Use utility functions
        const tokenizeLineLocal = (line: string) => tokenizeLine(line)
        const getTokenColorLocal = (type: string) =>
            getTokenColor(type, tokens.body.syntax)
        const getDiffGutterStyleLocal = (lineType?: DiffLineType) =>
            getDiffGutterStyle(lineType, isDiffMode, tokens.body.gutter)
        const getDiffLineBackgroundLocal = (lineType?: DiffLineType) =>
            getDiffLineBackground(
                lineType,
                isDiffMode,
                tokens.body.highlightedLine
            )

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
            >
                {/* Header */}
                {showHeader && (
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        padding={`${tokens.header.padding.y} ${tokens.header.padding.x}`}
                        backgroundColor={tokens.header.backgroundColor}
                        borderBottom={tokens.header.borderBottom}
                        gap={tokens.header.gap}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={tokens.header.gap}
                            style={{ flex: 1 }}
                        >
                            {headerLeftSlot || (
                                <FileCode style={{ flexShrink: 0 }} />
                            )}
                            <Block
                                as="span"
                                fontSize={tokens.header.text.fontSize}
                                fontWeight={tokens.header.text.fontWeight}
                                lineHeight={tokens.header.text.lineHeight}
                                color={tokens.header.text.color}
                            >
                                {header}
                            </Block>
                            {headerRightSlot && (
                                <Block
                                    style={{ flexShrink: 0 }}
                                    display="flex"
                                    alignItems="center"
                                >
                                    {headerRightSlot}
                                </Block>
                            )}
                        </Block>
                        <Button
                            onClick={copyToClipboard}
                            buttonType={ButtonType.SECONDARY}
                            subType={ButtonSubType.ICON_ONLY}
                            size={ButtonSize.SMALL}
                            leadingIcon={
                                isCopied ? (
                                    <Check size={16} />
                                ) : (
                                    <Copy size={16} />
                                )
                            }
                        />
                    </Block>
                )}

                {/* Code content */}
                <Block
                    padding={
                        isDiffMode
                            ? '0'
                            : `${tokens.body.padding.y} ${tokens.body.padding.x}`
                    }
                    backgroundColor={tokens.body.backgroundColor}
                    overflow={isDiffMode ? 'hidden' : 'auto'}
                >
                    {isDiffMode ? (
                        // Side-by-side diff layout
                        <Block
                            display="flex"
                            gap="0"
                            width="100%"
                            height="100%"
                        >
                            {/* Left side - Old code (removed) */}
                            <Block
                                style={{ flex: 1 }}
                                minWidth="0"
                                borderRight={tokens.border}
                                padding={`${tokens.body.padding.y} ${tokens.body.padding.x}`}
                                alignSelf="stretch"
                                backgroundColor={tokens.backgroundColor}
                            >
                                <PreElement
                                    fontFamily={tokens.body.code.fontFamily}
                                    fontSize={tokens.body.code.fontSize}
                                    lineHeight={tokens.body.code.lineHeight}
                                >
                                    {diffLines
                                        ?.filter(
                                            (line) =>
                                                line.type ===
                                                    DiffLineType.REMOVED ||
                                                line.type ===
                                                    DiffLineType.UNCHANGED
                                        )
                                        .map((line, lineIndex) => (
                                            <CodeLineWrapper
                                                key={lineIndex}
                                                style={getDiffLineBackgroundLocal(
                                                    line.type
                                                )}
                                            >
                                                {shouldShowLineNumbers && (
                                                    <LineNumberGutter
                                                        lineIndex={lineIndex}
                                                        width={
                                                            tokens.body.gutter
                                                                .width
                                                        }
                                                        color={
                                                            tokens.body.gutter
                                                                .color
                                                        }
                                                        style={getDiffGutterStyleLocal(
                                                            line.type
                                                        )}
                                                    />
                                                )}
                                                <TokenizedCodeLine
                                                    tokens={tokenizeLineLocal(
                                                        line.content
                                                    )}
                                                    getTokenColor={
                                                        getTokenColorLocal
                                                    }
                                                    paddingTop={
                                                        tokens.body.code.padding
                                                            .y
                                                    }
                                                    paddingBottom={
                                                        tokens.body.code.padding
                                                            .y
                                                    }
                                                    paddingLeft={
                                                        tokens.body.code.padding
                                                            .x.left
                                                    }
                                                    paddingRight={
                                                        tokens.body.code.padding
                                                            .x.right
                                                    }
                                                />
                                            </CodeLineWrapper>
                                        ))}
                                </PreElement>
                            </Block>

                            {/* Right side - New code (added) */}
                            <Block
                                style={{ flex: 1 }}
                                minWidth="0"
                                padding={`${tokens.body.padding.y} ${tokens.body.padding.x}`}
                                alignSelf="stretch"
                                backgroundColor={tokens.backgroundColor}
                            >
                                <PreElement
                                    fontFamily={tokens.body.code.fontFamily}
                                    fontSize={tokens.body.code.fontSize}
                                    lineHeight={tokens.body.code.lineHeight}
                                >
                                    {diffLines
                                        ?.filter(
                                            (line) =>
                                                line.type ===
                                                    DiffLineType.ADDED ||
                                                line.type ===
                                                    DiffLineType.UNCHANGED
                                        )
                                        .map((line, lineIndex) => (
                                            <CodeLineWrapper
                                                key={lineIndex}
                                                style={getDiffLineBackgroundLocal(
                                                    line.type
                                                )}
                                            >
                                                {shouldShowLineNumbers && (
                                                    <LineNumberGutter
                                                        lineIndex={lineIndex}
                                                        width={
                                                            tokens.body.gutter
                                                                .width
                                                        }
                                                        color={
                                                            tokens.body.gutter
                                                                .color
                                                        }
                                                        style={getDiffGutterStyleLocal(
                                                            line.type
                                                        )}
                                                    />
                                                )}
                                                <TokenizedCodeLine
                                                    tokens={tokenizeLineLocal(
                                                        line.content
                                                    )}
                                                    getTokenColor={
                                                        getTokenColorLocal
                                                    }
                                                    paddingTop={
                                                        tokens.body.code.padding
                                                            .y
                                                    }
                                                    paddingBottom={
                                                        tokens.body.code.padding
                                                            .y
                                                    }
                                                    paddingLeft={
                                                        tokens.body.code.padding
                                                            .x.left
                                                    }
                                                    paddingRight={
                                                        tokens.body.code.padding
                                                            .x.right
                                                    }
                                                />
                                            </CodeLineWrapper>
                                        ))}
                                </PreElement>
                            </Block>
                        </Block>
                    ) : (
                        // Standard single column layout
                        <PreElement
                            fontFamily={tokens.body.code.fontFamily}
                            fontSize={tokens.body.code.fontSize}
                            lineHeight={tokens.body.code.lineHeight}
                        >
                            {lines?.map((line, lineIndex) => {
                                const lineType =
                                    isDiffMode && diffLines
                                        ? diffLines[lineIndex]?.type
                                        : undefined

                                return (
                                    <CodeLineWrapper
                                        key={lineIndex}
                                        style={getDiffLineBackgroundLocal(
                                            lineType
                                        )}
                                    >
                                        {shouldShowLineNumbers && (
                                            <LineNumberGutter
                                                lineIndex={lineIndex}
                                                width={tokens.body.gutter.width}
                                                color={tokens.body.gutter.color}
                                                style={getDiffGutterStyleLocal(
                                                    lineType
                                                )}
                                            />
                                        )}
                                        <TokenizedCodeLine
                                            tokens={tokenizeLineLocal(line)}
                                            getTokenColor={getTokenColorLocal}
                                            paddingTop={
                                                tokens.body.code.padding.y
                                            }
                                            paddingBottom={
                                                tokens.body.code.padding.y
                                            }
                                            paddingLeft={
                                                tokens.body.code.padding.x.left
                                            }
                                            paddingRight={
                                                tokens.body.code.padding.x.right
                                            }
                                        />
                                    </CodeLineWrapper>
                                )
                            })}
                        </PreElement>
                    )}
                </Block>
            </Block>
        )
    }
)

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock

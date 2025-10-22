import { forwardRef, useState } from 'react'
import { Check, Copy, FileCode, Minus, Plus } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeBlockTokenType } from './codeBlock.token'
import { CodeBlockVariant, DiffLineType, type CodeBlockProps } from './types'
import {
    tokenizeLine,
    getTokenColor,
    getDiffGutterStyle,
    getDiffLineBackground,
    shouldShowLineNumbers as shouldShowLineNumbersUtil,
    createCopyToClipboard,
    processLines,
} from './utils'

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
            getTokenColor(type, tokens.syntax)
        const getDiffGutterStyleLocal = (lineType?: DiffLineType) =>
            getDiffGutterStyle(lineType, isDiffMode, tokens.gutter)
        const getDiffLineBackgroundLocal = (lineType?: DiffLineType) =>
            getDiffLineBackground(lineType, isDiffMode, tokens.line)

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
                        padding={tokens.header.padding}
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
                                <FileCode
                                    size={tokens.header.icon.size}
                                    color={tokens.header.icon.color}
                                    style={{ flexShrink: 0 }}
                                />
                            )}
                            <Block
                                as="span"
                                fontSize={tokens.header.text.fontSize}
                                fontWeight={tokens.header.text.fontWeight}
                                lineHeight={tokens.header.text.lineHeight}
                                color={tokens.header.text.color}
                                style={{
                                    fontFamily: tokens.header.text.fontFamily,
                                }}
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
                    padding={isDiffMode ? '0' : tokens.content.padding}
                    backgroundColor={tokens.content.backgroundColor}
                    overflow={isDiffMode ? 'hidden' : tokens.content.overflow}
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
                                borderRight={`1px solid ${tokens.diff.borderColor}`}
                                padding={tokens.diff.padding}
                                alignSelf="stretch"
                                backgroundColor={tokens.diff.oldBackground}
                            >
                                <pre
                                    style={{
                                        margin: 0,
                                        fontFamily: tokens.code.fontFamily,
                                        fontSize: tokens.code.fontSize,
                                        lineHeight: tokens.code.lineHeight,
                                    }}
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
                                            <Block
                                                key={lineIndex}
                                                display="flex"
                                                alignItems="flex-start"
                                                paddingRight={
                                                    tokens.line.paddingRight
                                                }
                                                paddingLeft={
                                                    shouldShowLineNumbers
                                                        ? '0'
                                                        : tokens.line
                                                              .paddingLeft
                                                }
                                                style={getDiffLineBackgroundLocal(
                                                    line.type
                                                )}
                                            >
                                                {shouldShowLineNumbers && (
                                                    <Block
                                                        width={
                                                            tokens.gutter.width
                                                        }
                                                        padding={
                                                            tokens.gutter
                                                                .padding
                                                        }
                                                        color={
                                                            tokens.gutter.color
                                                        }
                                                        style={{
                                                            userSelect: 'none',
                                                            ...getDiffGutterStyleLocal(
                                                                line.type
                                                            ),
                                                        }}
                                                        flexShrink="0"
                                                        textAlign={
                                                            tokens.gutter
                                                                .textAlign
                                                        }
                                                        alignSelf="stretch"
                                                    >
                                                        {lineIndex + 1}
                                                    </Block>
                                                )}
                                                {line.type ===
                                                    DiffLineType.REMOVED && (
                                                    <Block
                                                        flexShrink="0"
                                                        display="flex"
                                                        alignItems="flex-start"
                                                        paddingTop={
                                                            tokens.diff.icon
                                                                .paddingTop
                                                        }
                                                    >
                                                        <Minus
                                                            size={
                                                                tokens.diff.icon
                                                                    .size
                                                            }
                                                            color={
                                                                tokens.diff.icon
                                                                    .removed
                                                                    .color
                                                            }
                                                        />
                                                    </Block>
                                                )}
                                                <code
                                                    style={{
                                                        flex: 1,
                                                        whiteSpace: 'pre-wrap',
                                                        wordBreak: 'break-word',
                                                        paddingLeft:
                                                            line.type ===
                                                            DiffLineType.REMOVED
                                                                ? tokens.code
                                                                      .paddingLeftWithIcon
                                                                : tokens.code
                                                                      .paddingLeft,
                                                    }}
                                                >
                                                    {tokenizeLineLocal(
                                                        line.content
                                                    ).map(
                                                        (token, tokenIndex) => (
                                                            <Block
                                                                key={tokenIndex}
                                                                as="span"
                                                                color={getTokenColorLocal(
                                                                    token.type
                                                                )}
                                                            >
                                                                {token.value}
                                                            </Block>
                                                        )
                                                    )}
                                                </code>
                                            </Block>
                                        ))}
                                </pre>
                            </Block>

                            {/* Right side - New code (added) */}
                            <Block
                                style={{ flex: 1 }}
                                minWidth="0"
                                padding={tokens.diff.padding}
                                alignSelf="stretch"
                                backgroundColor={tokens.diff.newBackground}
                            >
                                <pre
                                    style={{
                                        margin: 0,
                                        fontFamily: tokens.code.fontFamily,
                                        fontSize: tokens.code.fontSize,
                                        lineHeight: tokens.code.lineHeight,
                                    }}
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
                                            <Block
                                                key={lineIndex}
                                                display="flex"
                                                alignItems="flex-start"
                                                paddingRight={
                                                    tokens.line.paddingRight
                                                }
                                                paddingLeft={
                                                    shouldShowLineNumbers
                                                        ? '0'
                                                        : tokens.line
                                                              .paddingLeft
                                                }
                                                style={getDiffLineBackgroundLocal(
                                                    line.type
                                                )}
                                            >
                                                {shouldShowLineNumbers && (
                                                    <Block
                                                        width={
                                                            tokens.gutter.width
                                                        }
                                                        padding={
                                                            tokens.gutter
                                                                .padding
                                                        }
                                                        color={
                                                            tokens.gutter.color
                                                        }
                                                        style={{
                                                            userSelect: 'none',
                                                            ...getDiffGutterStyleLocal(
                                                                line.type
                                                            ),
                                                        }}
                                                        flexShrink="0"
                                                        textAlign={
                                                            tokens.gutter
                                                                .textAlign
                                                        }
                                                        alignSelf="stretch"
                                                    >
                                                        {lineIndex + 1}
                                                    </Block>
                                                )}
                                                {line.type ===
                                                    DiffLineType.ADDED && (
                                                    <Block
                                                        flexShrink="0"
                                                        display="flex"
                                                        alignItems="flex-start"
                                                        paddingTop={
                                                            tokens.diff.icon
                                                                .paddingTop
                                                        }
                                                    >
                                                        <Plus
                                                            size={
                                                                tokens.diff.icon
                                                                    .size
                                                            }
                                                            color={
                                                                tokens.diff.icon
                                                                    .added.color
                                                            }
                                                        />
                                                    </Block>
                                                )}
                                                <code
                                                    style={{
                                                        flex: 1,
                                                        whiteSpace: 'pre-wrap',
                                                        wordBreak: 'break-word',
                                                        paddingLeft:
                                                            line.type ===
                                                            DiffLineType.ADDED
                                                                ? tokens.code
                                                                      .paddingLeftWithIcon
                                                                : tokens.code
                                                                      .paddingLeft,
                                                    }}
                                                >
                                                    {tokenizeLineLocal(
                                                        line.content
                                                    ).map(
                                                        (token, tokenIndex) => (
                                                            <Block
                                                                key={tokenIndex}
                                                                as="span"
                                                                color={getTokenColorLocal(
                                                                    token.type
                                                                )}
                                                            >
                                                                {token.value}
                                                            </Block>
                                                        )
                                                    )}
                                                </code>
                                            </Block>
                                        ))}
                                </pre>
                            </Block>
                        </Block>
                    ) : (
                        // Standard single column layout
                        <pre
                            style={{
                                margin: 0,
                                fontFamily: tokens.code.fontFamily,
                                fontSize: tokens.code.fontSize,
                                lineHeight: tokens.code.lineHeight,
                            }}
                        >
                            {lines?.map((line, lineIndex) => {
                                const lineType =
                                    isDiffMode && diffLines
                                        ? diffLines[lineIndex]?.type
                                        : undefined

                                return (
                                    <Block
                                        key={lineIndex}
                                        display="flex"
                                        alignItems="flex-start"
                                        paddingRight={tokens.line.paddingRight}
                                        paddingLeft={
                                            shouldShowLineNumbers
                                                ? '0'
                                                : tokens.line.paddingLeft
                                        }
                                        style={getDiffLineBackgroundLocal(
                                            lineType
                                        )}
                                    >
                                        {shouldShowLineNumbers && (
                                            <Block
                                                width={tokens.gutter.width}
                                                padding={tokens.gutter.padding}
                                                color={tokens.gutter.color}
                                                style={{
                                                    userSelect: 'none',
                                                    ...getDiffGutterStyleLocal(
                                                        lineType
                                                    ),
                                                }}
                                                flexShrink="0"
                                                textAlign={
                                                    tokens.gutter.textAlign
                                                }
                                                alignSelf="stretch"
                                            >
                                                {lineIndex + 1}
                                            </Block>
                                        )}
                                        <code
                                            style={{
                                                flex: 1,
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                paddingLeft:
                                                    tokens.code.paddingLeft,
                                            }}
                                        >
                                            {tokenizeLineLocal(line).map(
                                                (token, tokenIndex) => (
                                                    <Block
                                                        key={tokenIndex}
                                                        as="span"
                                                        color={getTokenColorLocal(
                                                            token.type
                                                        )}
                                                    >
                                                        {token.value}
                                                    </Block>
                                                )
                                            )}
                                        </code>
                                    </Block>
                                )
                            })}
                        </pre>
                    )}
                </Block>
            </Block>
        )
    }
)

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock

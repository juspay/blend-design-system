import {
    forwardRef,
    useState,
    useId,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from 'react'
import { Check, Copy, FileCode } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeBlockTokenType } from './codeBlock.token'
import { CodeBlockVariant, DiffLineType, type CodeBlockProps } from './types'
import CodeBlockDiffView from './CodeBlockDiffView/CodeBlockDiffView'
import {
    PreElement,
    CodeLineWrapper,
    LineNumberGutter,
    TokenizedCodeLine,
    type DiffRowRenderContext,
} from './CodeBlockLineParts'
import {
    tokenizeLine,
    getDiffLineBackground,
    getTokenColor,
    getDiffGutterStyle,
    shouldShowLineNumbers as shouldShowLineNumbersUtil,
    processLines,
    formatCode,
    buildDiffViewSegments,
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
            showCopyButton = true,
            autoFormat = false,
            language,
            isDiffUnchangedCollapsed = true,
            diffContextLines = 3,
            diffExpandChunk = 20,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CodeBlockTokenType>('CODE_BLOCK')
        const [isCopied, setIsCopied] = useState(false)
        const codeBlockId = useId().replace(/:/g, '-')
        const codeContentId = `${codeBlockId}-code`
        const headerId = `${codeBlockId}-header`
        const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

        // Format code if autoFormat is enabled
        const formattedCode = autoFormat ? formatCode(code, language) : code

        // Determine if line numbers should be shown based on variant or explicit prop
        const shouldShowLineNumbers = shouldShowLineNumbersUtil(
            showLineNumbers,
            variant
        )

        // Use diffLines if variant is diff, otherwise use formatted code
        const isDiffMode =
            variant === CodeBlockVariant.DIFF && Boolean(diffLines)
        const lines = processLines(isDiffMode, diffLines, formattedCode)

        const diffViewSegments = useMemo(() => {
            if (!isDiffMode || !diffLines?.length) {
                return []
            }
            return buildDiffViewSegments(
                diffLines,
                diffContextLines,
                isDiffUnchangedCollapsed
            )
        }, [isDiffMode, diffLines, diffContextLines, isDiffUnchangedCollapsed])

        const copyToClipboard = useCallback(() => {
            navigator.clipboard.writeText(formattedCode)
            setIsCopied(true)

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                setIsCopied(false)
                timeoutRef.current = null
            }, 2000)
        }, [formattedCode])

        useEffect(() => {
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                    timeoutRef.current = null
                }
            }
        }, [])

        // Screen reader announcement for copy status
        useEffect(() => {
            if (isCopied) {
                // Announce copy success to screen readers
                const announcement = document.createElement('div')
                announcement.setAttribute('role', 'status')
                announcement.setAttribute('aria-live', 'polite')
                announcement.setAttribute('aria-atomic', 'true')
                announcement.style.position = 'absolute'
                announcement.style.left = '-10000px'
                announcement.style.width = '1px'
                announcement.style.height = '1px'
                announcement.style.overflow = 'hidden'
                announcement.textContent = `Code from ${header || 'code block'} copied to clipboard`
                document.body.appendChild(announcement)

                // Reset after 2 seconds
                const timer = setTimeout(() => {
                    setIsCopied(false)
                    if (document.body.contains(announcement)) {
                        document.body.removeChild(announcement)
                    }
                }, 2000)

                return () => {
                    clearTimeout(timer)
                    if (document.body.contains(announcement)) {
                        document.body.removeChild(announcement)
                    }
                }
            }
        }, [isCopied, header])

        // Generate accessible label for code block
        const codeBlockLabel = header ? `Code block: ${header}` : 'Code block'
        const codeBlockDescription = language
            ? `${codeBlockLabel}, ${language} language`
            : codeBlockLabel

        // Use utility functions
        const tokenizeLineLocal = (line: string) => tokenizeLine(line, language)
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

        const diffRowCtx = useMemo<DiffRowRenderContext>(
            () => ({
                shouldShowLineNumbers,
                tokens,
                tokenizeLine: (line: string) => tokenizeLine(line, language),
                getTokenColor: (type: string) =>
                    getTokenColor(type, tokens.body.syntax),
                getDiffGutterStyle: (lineType?: DiffLineType) =>
                    getDiffGutterStyle(
                        lineType,
                        isDiffMode,
                        tokens.body.gutter
                    ),
                getDiffLineBackground: (lineType?: DiffLineType) =>
                    getDiffLineBackground(
                        lineType,
                        isDiffMode,
                        tokens.body.highlightedLine
                    ),
            }),
            [shouldShowLineNumbers, tokens, language, isDiffMode]
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
                role="region"
                aria-label={codeBlockDescription}
                data-codeblock={header}
            >
                {/* Header */}
                {showHeader && (
                    <Block
                        id={headerId}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        padding={`${tokens.header.padding.y} ${tokens.header.padding.x}`}
                        backgroundColor={tokens.header.backgroundColor}
                        borderBottom={tokens.header.borderBottom}
                        gap={tokens.header.gap}
                        role="group"
                        aria-label={`Code block header: ${header}`}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={tokens.header.gap}
                            style={{ flex: 1 }}
                        >
                            {headerLeftSlot || (
                                <FileCode
                                    style={{ flexShrink: 0 }}
                                    aria-hidden="true"
                                />
                            )}
                            <h2
                                id={`${headerId}-title`}
                                data-element="codeblock-title"
                                data-id={header}
                                style={{
                                    margin: 0,
                                    fontSize: tokens.header.text.fontSize,
                                    fontWeight: tokens.header.text.fontWeight,
                                    lineHeight: tokens.header.text.lineHeight,
                                    color: tokens.header.text.color,
                                }}
                            >
                                {header}
                            </h2>
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

                        {showCopyButton && (
                            <Button
                                data-element="copy-button"
                                type="button"
                                onClick={copyToClipboard}
                                buttonType={ButtonType.SECONDARY}
                                subType={ButtonSubType.ICON_ONLY}
                                size={ButtonSize.SMALL}
                                aria-label={
                                    isCopied
                                        ? `Code from ${header || 'code block'} copied to clipboard`
                                        : `Copy code from ${header || 'code block'}`
                                }
                                leadingIcon={
                                    isCopied ? (
                                        <Check size={16} aria-hidden="true" />
                                    ) : (
                                        <Copy size={16} aria-hidden="true" />
                                    )
                                }
                            />
                        )}
                    </Block>
                )}

                {/* Code content */}
                <Block
                    id={codeContentId}
                    padding={
                        isDiffMode
                            ? '0'
                            : `${tokens.body.padding.y} ${tokens.body.padding.x}`
                    }
                    backgroundColor={tokens.body.backgroundColor}
                    overflow="auto"
                >
                    {isDiffMode && diffLines?.length ? (
                        <CodeBlockDiffView
                            diffLines={diffLines}
                            diffViewSegments={diffViewSegments}
                            codeContentId={codeContentId}
                            tokens={tokens}
                            rowCtx={diffRowCtx}
                            diffExpandChunk={diffExpandChunk}
                        />
                    ) : !isDiffMode ? (
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
                                        lineIndex={lineIndex}
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
                    ) : null}
                </Block>
            </Block>
        )
    }
)

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock

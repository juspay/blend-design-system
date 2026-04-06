import type { CSSProperties, ReactNode } from 'react'
import type { CodeBlockTokenType } from './codeBlock.token'
import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { DiffLineType, type DiffLine } from './types'
import type { SyntaxToken } from './utils'

export type LineCounter = { left: number; right: number }

export const EmptyGutterCell: React.FC<{
    width: string | number | undefined
}> = ({ width }) => (
    <Block
        width={width}
        padding={FOUNDATION_THEME.unit[0] + ' ' + FOUNDATION_THEME.unit[10]}
        flexShrink="0"
        alignSelf="stretch"
        role="presentation"
        aria-hidden="true"
    />
)

type LineNumberGutterProps = {
    lineIndex: number
    width: string | number | undefined
    color: string | undefined
    style?: React.CSSProperties
}

export const LineNumberGutter: React.FC<LineNumberGutterProps> = ({
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
        role="presentation"
        aria-hidden="true"
    >
        {lineIndex + 1}
    </Block>
)

export type TokenizedCodeLineProps = {
    tokens: SyntaxToken[]
    getTokenColor: (type: string) => string
    paddingTop?: string | number
    paddingBottom?: string | number
    paddingLeft?: string | number
    paddingRight?: string | number
    whiteSpace?: 'pre-wrap' | 'pre'
}

export const TokenizedCodeLine: React.FC<TokenizedCodeLineProps> = ({
    tokens,
    getTokenColor,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    whiteSpace = 'pre-wrap',
}) => (
    <code
        data-element="codeblock-line-code"
        data-id={tokens.map((token) => token.value).join('')}
        style={{
            flex: 1,
            whiteSpace,
            wordBreak: whiteSpace === 'pre' ? 'normal' : 'break-word',
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
            lineHeight: '18px',
        }}
    >
        {tokens.map((token, tokenIndex) => (
            <Block key={tokenIndex} as="span" color={getTokenColor(token.type)}>
                {token.value}
            </Block>
        ))}
    </code>
)

export type CodeLineWrapperProps = {
    children: ReactNode
    style?: React.CSSProperties
    lineIndex?: number
}

export const CodeLineWrapper: React.FC<CodeLineWrapperProps> = ({
    children,
    style,
    lineIndex,
}) => (
    <Block
        data-element="codeblock-line"
        data-numeric={
            lineIndex !== undefined ? (lineIndex + 1).toString() : undefined
        }
        display="flex"
        alignItems="flex-start"
        style={style}
    >
        {children}
    </Block>
)

export type PreElementProps = {
    children: ReactNode
    fontFamily: string | undefined
    fontSize: string | number | undefined
    lineHeight: string | number | undefined
    id?: string
}

export const PreElement: React.FC<PreElementProps> = ({
    children,
    fontFamily,
    fontSize,
    lineHeight,
    id,
}) => (
    <pre
        id={id}
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

export type DiffRowRenderContext = {
    shouldShowLineNumbers: boolean
    tokens: CodeBlockTokenType
    tokenizeLine: (line: string) => SyntaxToken[]
    getTokenColor: (type: string) => string
    getDiffGutterStyle: (lineType?: DiffLineType) => CSSProperties
    getDiffLineBackground: (lineType?: DiffLineType) => CSSProperties
}

/**
 * One full-width row: left pane + right pane in a single flex row so both
 * sides always share the same row height.
 */
export const renderDiffUnifiedRowPair = (
    leftLine: DiffLine | undefined,
    rightLine: DiffLine | undefined,
    rowKey: string,
    counters: LineCounter,
    ctx: DiffRowRenderContext,
    tokens: CodeBlockTokenType
): ReactNode => {
    const showLeft = Boolean(leftLine)
    const showRight = Boolean(rightLine)
    const leftContent = leftLine?.content ?? ''
    const rightContent = rightLine?.content ?? ''

    const leftBgType = leftLine?.type
    const rightBgType = rightLine?.type

    let leftGutterIndex = 0
    if (showLeft) {
        leftGutterIndex = counters.left
        counters.left += 1
    }

    let rightGutterIndex = 0
    if (showRight) {
        rightGutterIndex = counters.right
        counters.right += 1
    }

    const leftColumnStyle: CSSProperties = {
        backgroundColor: tokens.backgroundColor,
        ...ctx.getDiffLineBackground(leftBgType),
    }

    const rightColumnStyle: CSSProperties = {
        backgroundColor: tokens.backgroundColor,
        ...ctx.getDiffLineBackground(rightBgType),
    }

    return (
        <Block
            key={rowKey}
            data-element="codeblock-diff-row"
            display="flex"
            width="100%"
            alignItems="stretch"
        >
            <Block
                display="flex"
                alignItems="flex-start"
                borderRight={tokens.border}
                style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    ...leftColumnStyle,
                }}
            >
                {ctx.shouldShowLineNumbers &&
                    (showLeft ? (
                        <LineNumberGutter
                            lineIndex={leftGutterIndex}
                            width={tokens.body.gutter.width}
                            color={tokens.body.gutter.color}
                            style={ctx.getDiffGutterStyle(leftLine?.type)}
                        />
                    ) : (
                        <EmptyGutterCell width={tokens.body.gutter.width} />
                    ))}
                <Block
                    style={{
                        flex: '1 1 0%',
                        minWidth: 0,
                    }}
                >
                    <TokenizedCodeLine
                        tokens={ctx.tokenizeLine(leftContent)}
                        getTokenColor={ctx.getTokenColor}
                        paddingTop={tokens.body.code.padding.y}
                        paddingBottom={tokens.body.code.padding.y}
                        paddingLeft={tokens.body.code.padding.x.left}
                        paddingRight={tokens.body.code.padding.x.right}
                        whiteSpace="pre-wrap"
                    />
                </Block>
            </Block>
            <Block
                display="flex"
                alignItems="flex-start"
                style={{
                    flex: '1 1 0%',
                    minWidth: 0,
                    ...rightColumnStyle,
                }}
            >
                {ctx.shouldShowLineNumbers &&
                    (showRight ? (
                        <LineNumberGutter
                            lineIndex={rightGutterIndex}
                            width={tokens.body.gutter.width}
                            color={tokens.body.gutter.color}
                            style={ctx.getDiffGutterStyle(rightLine?.type)}
                        />
                    ) : (
                        <EmptyGutterCell width={tokens.body.gutter.width} />
                    ))}
                <Block
                    style={{
                        flex: '1 1 0%',
                        minWidth: 0,
                    }}
                >
                    <TokenizedCodeLine
                        tokens={ctx.tokenizeLine(rightContent)}
                        getTokenColor={ctx.getTokenColor}
                        paddingTop={tokens.body.code.padding.y}
                        paddingBottom={tokens.body.code.padding.y}
                        paddingLeft={tokens.body.code.padding.x.left}
                        paddingRight={tokens.body.code.padding.x.right}
                        whiteSpace="pre-wrap"
                    />
                </Block>
            </Block>
        </Block>
    )
}

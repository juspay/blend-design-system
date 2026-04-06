import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type CSSProperties,
    type ReactNode,
} from 'react'
import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Block from '../../Primitives/Block/Block'
import {
    renderDiffUnifiedRowPair,
    type LineCounter,
} from '../CodeBlockLineParts'
import {
    getGapHiddenLineCount,
    getGapLineTotal,
    isGapFullyExpanded,
} from './utils'
import { getDiffCollapsedRangeKey } from '../utils'
import type { CodeBlockDiffViewProps } from './types'
import type { DiffGapExpansionState } from './types'
import { DiffLineType } from '../types'

const lineBlockMotion: CSSProperties = {
    transition: 'opacity 0.2s ease-out',
}

const expandBarMotion: CSSProperties = {
    transition: 'background-color 0.15s ease, opacity 0.15s ease',
}

const ExpandButton = styled.button<{
    $color?: string | number
    $padding?: string | number
    $borderRadius?: string | number
    $hoverBackgroundColor?: string | number
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: ${(props) => props.$color ?? 'inherit'};
    padding: ${(props) => props.$padding || '2px 6px'};
    border-radius: ${(props) => props.$borderRadius || '4px'};
    cursor: pointer;
    flex-shrink: 0;
    transition:
        background-color 0.15s ease,
        opacity 0.15s ease;

    &:hover:not(:disabled) {
        background-color: ${(props) =>
            props.$hoverBackgroundColor || 'rgba(0,0,0,0.05)'};
    }

    &:disabled {
        cursor: not-allowed;
    }
`

const CodeBlockDiffView = ({
    diffLines,
    diffViewSegments,
    codeContentId,
    tokens,
    rowCtx,
    diffExpandChunk,
}: CodeBlockDiffViewProps) => {
    const [gapExpansionByKey, setGapExpansionByKey] = useState<
        Map<string, DiffGapExpansionState>
    >(() => new Map())

    useEffect(() => {
        setGapExpansionByKey(new Map())
    }, [diffLines])

    const expandTowardFileStart = useCallback(
        (gapStart: number, gapEnd: number, gapKey: string) => {
            setGapExpansionByKey((prev) => {
                const next = new Map(prev)
                const cur = next.get(gapKey) ?? {
                    revealedFromTop: 0,
                    revealedFromBottom: 0,
                }
                const total = getGapLineTotal(gapStart, gapEnd)
                const room =
                    total - cur.revealedFromTop - cur.revealedFromBottom
                const add = Math.min(diffExpandChunk, room)
                if (add <= 0) {
                    return prev
                }
                next.set(gapKey, {
                    revealedFromTop: cur.revealedFromTop + add,
                    revealedFromBottom: cur.revealedFromBottom,
                })
                return next
            })
        },
        [diffExpandChunk]
    )

    const expandTowardFileEnd = useCallback(
        (gapStart: number, gapEnd: number, gapKey: string) => {
            setGapExpansionByKey((prev) => {
                const next = new Map(prev)
                const cur = next.get(gapKey) ?? {
                    revealedFromTop: 0,
                    revealedFromBottom: 0,
                }
                const total = getGapLineTotal(gapStart, gapEnd)
                const room =
                    total - cur.revealedFromTop - cur.revealedFromBottom
                const add = Math.min(diffExpandChunk, room)
                if (add <= 0) {
                    return prev
                }
                next.set(gapKey, {
                    revealedFromTop: cur.revealedFromTop,
                    revealedFromBottom: cur.revealedFromBottom + add,
                })
                return next
            })
        },
        [diffExpandChunk]
    )

    const expandGapFull = useCallback(
        (gapStart: number, gapEnd: number, gapKey: string) => {
            setGapExpansionByKey((prev) => {
                const next = new Map(prev)
                const total = getGapLineTotal(gapStart, gapEnd)
                next.set(gapKey, {
                    revealedFromTop: total,
                    revealedFromBottom: 0,
                })
                return next
            })
        },
        []
    )

    const renderColumnPair = useCallback(
        (
            start: number,
            end: number,
            segmentKey: string,
            lineCounters: LineCounter
        ) => {
            const rows: ReactNode[] = []

            let i = start
            while (i <= end) {
                const line = diffLines[i]

                if (line.type === DiffLineType.UNCHANGED) {
                    rows.push(
                        renderDiffUnifiedRowPair(
                            line,
                            line,
                            `${segmentKey}-same-${i}`,
                            lineCounters,
                            rowCtx,
                            tokens
                        )
                    )
                    i += 1
                    continue
                }

                const removedLines: typeof diffLines = []
                const addedLines: typeof diffLines = []
                const changeBlockStart = i

                while (
                    i <= end &&
                    diffLines[i].type !== DiffLineType.UNCHANGED
                ) {
                    if (diffLines[i].type === DiffLineType.REMOVED) {
                        removedLines.push(diffLines[i])
                    } else {
                        addedLines.push(diffLines[i])
                    }
                    i += 1
                }

                const pairedRows = Math.max(
                    removedLines.length,
                    addedLines.length
                )
                for (let rowIdx = 0; rowIdx < pairedRows; rowIdx++) {
                    rows.push(
                        renderDiffUnifiedRowPair(
                            removedLines[rowIdx],
                            addedLines[rowIdx],
                            `${segmentKey}-chg-${changeBlockStart}-${rowIdx}`,
                            lineCounters,
                            rowCtx,
                            tokens
                        )
                    )
                }
            }
            const fontSize =
                typeof tokens.body.code.fontSize === 'number'
                    ? `${tokens.body.code.fontSize}px`
                    : tokens.body.code.fontSize
            return (
                <Block
                    key={segmentKey}
                    width="100%"
                    style={lineBlockMotion}
                    padding={`0 ${tokens.body.padding.x}`}
                    backgroundColor={tokens.backgroundColor}
                    role="group"
                    aria-label="Side-by-side diff: removed code on the left, added on the right"
                >
                    <pre
                        id={`${codeContentId}-diff-${segmentKey}`}
                        style={{
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            whiteSpace: 'normal',
                            fontFamily: tokens.body.code.fontFamily,
                            fontSize,
                            lineHeight:
                                typeof tokens.body.code.lineHeight === 'number'
                                    ? `${tokens.body.code.lineHeight}px`
                                    : tokens.body.code.lineHeight,
                        }}
                    >
                        {rows}
                    </pre>
                </Block>
            )
        },
        [codeContentId, diffLines, rowCtx, tokens]
    )

    const renderCollapsedGap = useCallback(
        (
            gapStart: number,
            gapEnd: number,
            lineCounters: LineCounter,
            segmentIndex: number
        ) => {
            const gapKey = getDiffCollapsedRangeKey(gapStart, gapEnd)
            const expansion = gapExpansionByKey.get(gapKey)
            const hiddenCount = getGapHiddenLineCount(
                gapStart,
                gapEnd,
                expansion
            )

            if (isGapFullyExpanded(gapStart, gapEnd, expansion)) {
                return (
                    <Block
                        key={`gap-full-${gapKey}-${segmentIndex}`}
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        style={lineBlockMotion}
                    >
                        {renderColumnPair(
                            gapStart,
                            gapEnd,
                            `gap-expanded-${gapKey}`,
                            lineCounters
                        )}
                    </Block>
                )
            }

            const topShown = expansion?.revealedFromTop ?? 0
            const bottomShown = expansion?.revealedFromBottom ?? 0

            return (
                <Block
                    key={`gap-partial-${gapKey}-${segmentIndex}`}
                    display="flex"
                    flexDirection="column"
                    width="100%"
                >
                    {topShown > 0 &&
                        renderColumnPair(
                            gapStart,
                            gapStart + topShown - 1,
                            `gap-top-${gapKey}`,
                            lineCounters
                        )}

                    {hiddenCount > 0 && (
                        <Block
                            display="flex"
                            alignItems="center"
                            width="100%"
                            padding={tokens.body.expandContext.padding}
                            borderTop={tokens.body.expandContext.borderTop}
                            borderBottom={
                                tokens.body.expandContext.borderBottom
                            }
                            backgroundColor={
                                tokens.body.expandContext.backgroundColor
                            }
                            style={expandBarMotion}
                            role="separator"
                            aria-label="Collapsed lines. Use controls to load more context."
                        >
                            <ExpandButton
                                type="button"
                                onClick={() =>
                                    expandTowardFileStart(
                                        gapStart,
                                        gapEnd,
                                        gapKey
                                    )
                                }
                                disabled={hiddenCount === 0}
                                aria-label="Load more lines from above"
                                $color={tokens.body.expandContext.color}
                                $padding={
                                    tokens.body.expandContext.button.padding
                                }
                                $borderRadius={
                                    tokens.body.expandContext.button
                                        .borderRadius as string
                                }
                                $hoverBackgroundColor={
                                    tokens.body.expandContext.button
                                        .hoverBackgroundColor as string
                                }
                                style={{
                                    opacity:
                                        hiddenCount === 0
                                            ? tokens.body.expandContext.button
                                                  .disabledOpacity
                                            : tokens.body.expandContext.button
                                                  .opacity,
                                }}
                            >
                                <ChevronDown
                                    size={
                                        tokens.body.expandContext.button
                                            .iconSize
                                    }
                                    aria-hidden="true"
                                />
                            </ExpandButton>
                            <Block
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                minWidth="0"
                                style={{ flex: '1 1 0%' }}
                            >
                                <ExpandButton
                                    type="button"
                                    onClick={() =>
                                        expandGapFull(gapStart, gapEnd, gapKey)
                                    }
                                    aria-label="Expand full collapsed section"
                                    $color={tokens.body.expandContext.color}
                                    $padding={
                                        tokens.body.expandContext.button
                                            .dotsPadding
                                    }
                                    $borderRadius={
                                        tokens.body.expandContext.button
                                            .borderRadius as string
                                    }
                                    $hoverBackgroundColor={
                                        tokens.body.expandContext.button
                                            .hoverBackgroundColor as string
                                    }
                                    style={{
                                        opacity: 0.8,
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            fontSize:
                                                tokens.body.expandContext
                                                    .fontSize,
                                            letterSpacing:
                                                tokens.body.expandContext
                                                    .letterSpacing,
                                            lineHeight: 1,
                                        }}
                                    >
                                        ···
                                    </span>
                                </ExpandButton>
                            </Block>
                            <ExpandButton
                                type="button"
                                onClick={() =>
                                    expandTowardFileEnd(
                                        gapStart,
                                        gapEnd,
                                        gapKey
                                    )
                                }
                                disabled={hiddenCount === 0}
                                aria-label="Load more lines from below"
                                $color={tokens.body.expandContext.color}
                                $padding={
                                    tokens.body.expandContext.button.padding
                                }
                                $borderRadius={
                                    tokens.body.expandContext.button
                                        .borderRadius as string
                                }
                                $hoverBackgroundColor={
                                    tokens.body.expandContext.button
                                        .hoverBackgroundColor as string
                                }
                                style={{
                                    opacity:
                                        hiddenCount === 0
                                            ? tokens.body.expandContext.button
                                                  .disabledOpacity
                                            : tokens.body.expandContext.button
                                                  .opacity,
                                }}
                            >
                                <ChevronUp
                                    size={
                                        tokens.body.expandContext.button
                                            .iconSize
                                    }
                                    aria-hidden="true"
                                />
                            </ExpandButton>
                        </Block>
                    )}

                    {bottomShown > 0 &&
                        renderColumnPair(
                            gapEnd - bottomShown + 1,
                            gapEnd,
                            `gap-bottom-${gapKey}`,
                            lineCounters
                        )}
                </Block>
            )
        },
        [
            expandGapFull,
            expandTowardFileEnd,
            expandTowardFileStart,
            gapExpansionByKey,
            renderColumnPair,
            tokens,
        ]
    )

    const body = useMemo(() => {
        const lineCounters: LineCounter = { left: 0, right: 0 }
        return diffViewSegments.map((segment, segIdx) => {
            if (segment.type === 'lines') {
                return renderColumnPair(
                    segment.start,
                    segment.end,
                    `lines-${segment.start}-${segment.end}-${segIdx}`,
                    lineCounters
                )
            }
            return renderCollapsedGap(
                segment.start,
                segment.end,
                lineCounters,
                segIdx
            )
        })
    }, [diffViewSegments, renderColumnPair, renderCollapsedGap])

    return (
        <Block
            display="flex"
            flexDirection="column"
            width="100%"
            height="100%"
            style={{ minWidth: 'fit-content' }}
            padding={`${tokens.body.padding.y} 0`}
        >
            {body}
        </Block>
    )
}

CodeBlockDiffView.displayName = 'CodeBlockDiffView'

export default CodeBlockDiffView

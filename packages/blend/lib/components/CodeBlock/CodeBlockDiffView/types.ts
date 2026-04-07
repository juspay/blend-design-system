import type { CodeBlockTokenType } from '../codeBlock.token'
import type { DiffLine, DiffViewSegment } from '../types'
import type { DiffRowRenderContext } from '../CodeBlockLineParts'

export type DiffGapExpansionState = {
    revealedFromTop: number
    revealedFromBottom: number
}

export interface CodeBlockDiffViewProps {
    diffLines: DiffLine[]
    diffViewSegments: DiffViewSegment[]
    codeContentId: string
    tokens: CodeBlockTokenType
    rowCtx: DiffRowRenderContext
    /** Lines to reveal per click when expanding from the top or bottom of a gap */
    diffExpandChunk: number
}

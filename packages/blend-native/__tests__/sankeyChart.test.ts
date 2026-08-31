import { describe, it, expect } from 'vitest'
import {
    computeColumns,
    computeNodeValue,
    computeSankeyLayout,
    buildRibbonPath,
    getFocusSet,
} from '../src/components/SankeyChart/sankeyChart.utils'
import type {
    SankeyNode,
    SankeyLink,
} from '../src/components/SankeyChart/sankeyChart.types'

const NODES: SankeyNode[] = [
    { id: 'start', label: 'Start' },
    { id: 'success', label: 'Success' },
    { id: 'failure', label: 'Failure' },
    { id: 'end', label: 'End' },
]

const LINKS: SankeyLink[] = [
    { source: 'start', target: 'success', value: 70 },
    { source: 'start', target: 'failure', value: 30 },
    { source: 'success', target: 'end', value: 70 },
    { source: 'failure', target: 'end', value: 30 },
]

describe('computeColumns', () => {
    it('assigns root nodes to column 0', () => {
        const cols = computeColumns(NODES, LINKS)
        expect(cols.get('start')).toBe(0)
    })

    it('propagates columns through topology', () => {
        const cols = computeColumns(NODES, LINKS)
        expect(cols.get('success')).toBe(1)
        expect(cols.get('failure')).toBe(1)
        expect(cols.get('end')).toBe(2)
    })

    it('respects explicit column overrides', () => {
        const nodes: SankeyNode[] = [{ id: 'a', column: 5 }, { id: 'b' }]
        const links: SankeyLink[] = [{ source: 'a', target: 'b', value: 10 }]
        const cols = computeColumns(nodes, links)
        expect(cols.get('a')).toBe(5)
        expect(cols.get('b')).toBe(6)
    })

    it('handles isolated nodes (no links) as column 0', () => {
        const nodes: SankeyNode[] = [{ id: 'lonely' }]
        const cols = computeColumns(nodes, [])
        expect(cols.get('lonely')).toBe(0)
    })
})

describe('computeNodeValue', () => {
    it('returns max of in/out sums', () => {
        // start: out=100, in=0 → 100
        expect(computeNodeValue('start', LINKS)).toBe(100)
        // end: in=100, out=0 → 100
        expect(computeNodeValue('end', LINKS)).toBe(100)
        // success: in=70, out=70 → 70
        expect(computeNodeValue('success', LINKS)).toBe(70)
    })

    it('returns 0 for a node with no links', () => {
        expect(computeNodeValue('lonely', [])).toBe(0)
    })
})

describe('computeSankeyLayout', () => {
    it('positions nodes in the correct columns', () => {
        const { positionedNodes } = computeSankeyLayout(NODES, LINKS, {
            canvasHeight: 400,
        })
        const start = positionedNodes.find((n) => n.id === 'start')!
        const success = positionedNodes.find((n) => n.id === 'success')!
        const end = positionedNodes.find((n) => n.id === 'end')!

        expect(start.columnIndex).toBe(0)
        expect(success.columnIndex).toBe(1)
        expect(end.columnIndex).toBe(2)
    })

    it('enforces minimum node height of 4pt', () => {
        const nodes: SankeyNode[] = [{ id: 'a' }, { id: 'b' }]
        const links: SankeyLink[] = [{ source: 'a', target: 'b', value: 0.001 }]
        const { positionedNodes } = computeSankeyLayout(nodes, links, {
            canvasHeight: 400,
        })
        for (const node of positionedNodes) {
            expect(node.height).toBeGreaterThanOrEqual(4)
        }
    })

    it('sorts nodes within a column by descending value', () => {
        const nodes: SankeyNode[] = [
            { id: 'big' },
            { id: 'small' },
            { id: 'medium' },
            { id: 'target' },
        ]
        const links: SankeyLink[] = [
            { source: 'big', target: 'target', value: 100 },
            { source: 'small', target: 'target', value: 10 },
            { source: 'medium', target: 'target', value: 50 },
        ]
        const { positionedNodes } = computeSankeyLayout(nodes, links, {
            canvasHeight: 400,
        })
        const col0Nodes = positionedNodes
            .filter((n) => n.columnIndex === 0)
            .map((n) => n.id)
        // big (100) > medium (50) > small (10)
        expect(col0Nodes).toEqual(['big', 'medium', 'small'])
    })

    it('returns empty arrays for empty input', () => {
        const result = computeSankeyLayout([], [], { canvasHeight: 400 })
        expect(result.positionedNodes).toEqual([])
        expect(result.positionedLinks).toEqual([])
    })

    it('drops links to nonexistent nodes', () => {
        const nodes: SankeyNode[] = [{ id: 'a' }]
        const links: SankeyLink[] = [
            { source: 'a', target: 'nonexistent', value: 10 },
        ]
        const { positionedLinks } = computeSankeyLayout(nodes, links, {
            canvasHeight: 400,
        })
        expect(positionedLinks).toHaveLength(0)
    })

    it('produces link endpoints within node height bounds', () => {
        const { positionedNodes, positionedLinks } = computeSankeyLayout(
            NODES,
            LINKS,
            { canvasHeight: 400 }
        )
        for (const link of positionedLinks) {
            const src = positionedNodes[link.sourceIndex]
            const tgt = positionedNodes[link.targetIndex]
            expect(link.sourceY0).toBeGreaterThanOrEqual(src.y)
            expect(link.sourceY1).toBeLessThanOrEqual(src.y + src.height)
            expect(link.targetY0).toBeGreaterThanOrEqual(tgt.y)
            expect(link.targetY1).toBeLessThanOrEqual(tgt.y + tgt.height)
        }
    })
})

describe('buildRibbonPath', () => {
    it('produces a valid SVG path string starting with M', () => {
        const path = buildRibbonPath(0, 10, 20, 100, 30, 40, 0.5)
        expect(path.startsWith('M ')).toBe(true)
        expect(path.endsWith('Z')).toBe(true)
    })

    it('produces a straight path when curveFactor is 0', () => {
        const path = buildRibbonPath(0, 10, 20, 100, 10, 20, 0)
        // With curveFactor 0, control points are at the same x as endpoints
        expect(path).toContain('C 0 10, 100 10, 100 10')
    })
})

describe('getFocusSet', () => {
    it('includes the focused node and its neighbors', () => {
        const focus = getFocusSet('start', LINKS)
        expect(focus.has('start')).toBe(true)
        expect(focus.has('success')).toBe(true)
        expect(focus.has('failure')).toBe(true)
        expect(focus.has('end')).toBe(false)
    })

    it('includes link keys for connected links', () => {
        const focus = getFocusSet('start', LINKS)
        expect(focus.has('start→success')).toBe(true)
        expect(focus.has('start→failure')).toBe(true)
        expect(focus.has('success→end')).toBe(false)
    })

    it('includes both in and out connections for middle nodes', () => {
        const focus = getFocusSet('success', LINKS)
        expect(focus.has('start')).toBe(true)
        expect(focus.has('success')).toBe(true)
        expect(focus.has('end')).toBe(true)
    })
})

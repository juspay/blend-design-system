import { paletteColor } from '../Chart/chart.types'
import type {
    SankeyNode,
    SankeyLink,
    PositionedNode,
    PositionedLink,
} from './sankeyChart.types'

/**
 * Assign nodes to columns. If a node has an explicit `column` override, use
 * it; otherwise compute from topology — source nodes get column 0, targets
 * get max(source column) + 1.
 */
export function computeColumns(
    nodes: SankeyNode[],
    links: SankeyLink[]
): Map<string, number> {
    const columns = new Map<string, number>()

    // Seed from explicit overrides.
    for (const node of nodes) {
        if (node.column !== undefined) {
            columns.set(node.id, node.column)
        }
    }

    // Root nodes (no incoming links, no explicit column) get column 0.
    // This must happen before the topological pass so sources are seeded.
    for (const node of nodes) {
        if (!columns.has(node.id)) {
            const hasIncoming = links.some((l) => l.target === node.id)
            if (!hasIncoming) {
                columns.set(node.id, 0)
            }
        }
    }

    // Topological pass: propagate from sources.
    // Iterate until stable (handles multi-hop chains).
    let changed = true
    let iterations = 0
    const maxIterations = nodes.length + 1
    while (changed && iterations < maxIterations) {
        changed = false
        iterations++
        for (const link of links) {
            const srcCol = columns.get(link.source)
            if (srcCol === undefined) continue
            const tgtCol = columns.get(link.target)
            const newCol = srcCol + 1
            if (tgtCol === undefined || tgtCol < newCol) {
                columns.set(link.target, newCol)
                changed = true
            }
        }
    }

    // Fallback: any still-unassigned node gets column 0.
    for (const node of nodes) {
        if (!columns.has(node.id)) {
            columns.set(node.id, 0)
        }
    }

    return columns
}

/** Total value flowing through a node (max of sum-in, sum-out). */
export function computeNodeValue(nodeId: string, links: SankeyLink[]): number {
    const inValue = links
        .filter((l) => l.target === nodeId)
        .reduce((sum, l) => sum + l.value, 0)
    const outValue = links
        .filter((l) => l.source === nodeId)
        .reduce((sum, l) => sum + l.value, 0)
    return Math.max(inValue, outValue, 0)
}

/**
 * Deterministic Sankey layout.
 *
 * Nodes are sorted within a column by descending total value (so wide ribbons
 * don't collide with narrow ones). Link endpoints are stacked within each
 * node's height band, proportional to link value.
 *
 * Returns positioned nodes and links ready for SVG rendering.
 */
export function computeSankeyLayout(
    nodes: SankeyNode[],
    links: SankeyLink[],
    opts: {
        canvasHeight: number
        nodeWidth?: number
        nodeGap?: number
    }
): { positionedNodes: PositionedNode[]; positionedLinks: PositionedLink[] } {
    const { canvasHeight, nodeGap = 12 } = opts

    if (nodes.length === 0 || links.length === 0) {
        return { positionedNodes: [], positionedLinks: [] }
    }

    const columns = computeColumns(nodes, links)

    // Group nodes by column.
    const maxColumn = Math.max(...columns.values())
    const nodesByColumn: SankeyNode[][] = Array.from(
        { length: maxColumn + 1 },
        () => []
    )
    for (const node of nodes) {
        const col = columns.get(node.id) ?? 0
        nodesByColumn[col]?.push(node)
    }

    // Compute total value per node, then sort each column by descending value.
    const nodeValues = new Map<string, number>()
    for (const node of nodes) {
        nodeValues.set(node.id, computeNodeValue(node.id, links))
    }

    for (const col of nodesByColumn) {
        col.sort(
            (a, b) => (nodeValues.get(b.id) ?? 0) - (nodeValues.get(a.id) ?? 0)
        )
    }

    // Compute total value per column (sum of node values, not link values).
    const columnTotals = nodesByColumn.map((col) =>
        col.reduce((sum, n) => sum + (nodeValues.get(n.id) ?? 0), 0)
    )

    // Max column total drives the scale. All columns share the same scale
    // so node heights are comparable across columns.
    const maxColumnTotal = Math.max(...columnTotals, 1)

    // Available height for nodes (subtract gaps).
    const positionNodes = (): PositionedNode[] => {
        const result: PositionedNode[] = []
        for (let colIdx = 0; colIdx < nodesByColumn.length; colIdx++) {
            const colNodes = nodesByColumn[colIdx]
            const totalGaps = Math.max(0, colNodes.length - 1) * nodeGap
            const availableHeight = canvasHeight - totalGaps
            const scale = availableHeight / maxColumnTotal

            let y = 0
            for (const node of colNodes) {
                const value = nodeValues.get(node.id) ?? 0
                const nodeHeight = Math.max(value * scale, 4) // min 4pt
                const colorIdx = nodes.indexOf(node)
                result.push({
                    ...node,
                    columnIndex: colIdx,
                    y,
                    height: nodeHeight,
                    totalValue: value,
                    color: node.color ?? paletteColor(colorIdx),
                })
                y += nodeHeight + nodeGap
            }
        }
        return result
    }

    const positionedNodes = positionNodes()

    // Build a lookup: nodeId → positioned index.
    const nodeIndex = new Map<string, number>()
    positionedNodes.forEach((pn, i) => nodeIndex.set(pn.id, i))

    // Position link endpoints within each node's height band.
    // For each node, stack outgoing links top-to-bottom by value (descending).
    // Same for incoming links.
    const positionedLinks: PositionedLink[] = []

    for (const link of links) {
        const srcIdx = nodeIndex.get(link.source)
        const tgtIdx = nodeIndex.get(link.target)
        if (srcIdx === undefined || tgtIdx === undefined) continue

        const srcNode = positionedNodes[srcIdx]
        const tgtNode = positionedNodes[tgtIdx]

        // Stack outgoing links at the source node.
        const srcOutgoing = links
            .filter((l) => l.source === link.source)
            .sort((a, b) => b.value - a.value)
        const srcOffset = srcOutgoing.indexOf(link)
        const srcBefore = srcOutgoing
            .slice(0, srcOffset)
            .reduce((sum, l) => sum + l.value, 0)
        const srcTotal = srcOutgoing.reduce((sum, l) => sum + l.value, 0)
        const srcScale = srcNode.height / Math.max(srcTotal, 1)
        const sourceY0 = srcNode.y + srcBefore * srcScale
        const sourceY1 = srcNode.y + (srcBefore + link.value) * srcScale

        // Stack incoming links at the target node.
        const tgtIncoming = links
            .filter((l) => l.target === link.target)
            .sort((a, b) => b.value - a.value)
        const tgtOffset = tgtIncoming.indexOf(link)
        const tgtBefore = tgtIncoming
            .slice(0, tgtOffset)
            .reduce((sum, l) => sum + l.value, 0)
        const tgtTotal = tgtIncoming.reduce((sum, l) => sum + l.value, 0)
        const tgtScale = tgtNode.height / Math.max(tgtTotal, 1)
        const targetY0 = tgtNode.y + tgtBefore * tgtScale
        const targetY1 = tgtNode.y + (tgtBefore + link.value) * tgtScale

        positionedLinks.push({
            ...link,
            sourceIndex: srcIdx,
            targetIndex: tgtIdx,
            sourceY0,
            sourceY1,
            targetY0,
            targetY1,
            resolvedColor: link.color ?? srcNode.color ?? paletteColor(srcIdx),
        })
    }

    return { positionedNodes, positionedLinks }
}

/**
 * Build an SVG cubic-bezier path for a Sankey ribbon.
 *
 * The ribbon connects the right edge of the source node to the left edge of
 * the target node. `curveFactor` controls how far the control points are
 * pulled horizontally — 0.5 gives the classic S-curve.
 */
export function buildRibbonPath(
    sourceX: number,
    sourceY0: number,
    sourceY1: number,
    targetX: number,
    targetY0: number,
    targetY1: number,
    curveFactor: number
): string {
    const dx = Math.abs(targetX - sourceX)
    const ctrlOffset = dx * curveFactor

    const c1s = sourceX + ctrlOffset
    const c1e = targetX - ctrlOffset

    return (
        `M ${sourceX} ${sourceY0} ` +
        `C ${c1s} ${sourceY0}, ${c1e} ${targetY0}, ${targetX} ${targetY0} ` +
        `L ${targetX} ${targetY1} ` +
        `C ${c1e} ${targetY1}, ${c1s} ${sourceY1}, ${sourceX} ${sourceY1} ` +
        `Z`
    )
}

/**
 * Get the IDs of links and nodes connected to a focused node.
 * - `flow` = both in and out links + their endpoints
 * - `in`   = only incoming links + their source endpoints
 * - `out`  = only outgoing links + their target endpoints
 */
export function getFocusSet(
    focusedNodeId: string,
    links: SankeyLink[],
    behavior: 'flow' | 'in' | 'out' = 'flow'
): Set<string> {
    const result = new Set<string>()
    result.add(focusedNodeId)

    for (const link of links) {
        const isIn = link.target === focusedNodeId
        const isOut = link.source === focusedNodeId
        const matches =
            behavior === 'flow'
                ? isIn || isOut
                : behavior === 'in'
                  ? isIn
                  : isOut // 'out'
        if (matches) {
            result.add(`${link.source}→${link.target}`)
            result.add(link.source)
            result.add(link.target)
        }
    }

    return result
}

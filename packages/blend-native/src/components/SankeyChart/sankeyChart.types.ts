import type { StyleProp, ViewStyle } from 'react-native'
import type { SkeletonVariant } from '../Skeleton/Skeleton'

export type SankeyNode = {
    /** Unique id referenced by links. */
    id: string
    /**
     * Optional column override (0, 1, 2, ...). Without it, computed from
     * topological sort. Set this when you have a product-meaningful column
     * layout ('Start' | 'Step 1' | 'Step 2' | 'End').
     */
    column?: number
    /** Display name. Renders next to the node; longer names truncate. */
    label?: string
    /** Color override. Defaults per-column palette or per-node cycle. */
    color?: string
}

export type SankeyLink = {
    /** Source node id. */
    source: string
    /** Target node id. */
    target: string
    /** Ribbon width is proportional to `value`. */
    value: number
    /** Color override; defaults to the source node's color. */
    color?: string
}

export type SankeyChartProps = {
    nodes: SankeyNode[]
    links: SankeyLink[]
    /** Canvas height. Default 400. Width is measured via onLayout. */
    height?: number
    /** Node width in points. Default 16. */
    nodeWidth?: number
    /** Gap between nodes within a column, in points. Default 12. */
    nodeGap?: number
    /** Ribbon corner curvature (0 = straight, 1 = max curve). Default 0.5. */
    curveFactor?: number
    /** Highlight on tap: 'flow' | 'in' | 'out' | 'none'. Default 'flow'. */
    focusBehavior?: 'flow' | 'in' | 'out' | 'none'
    /** Callback for a node/ribbon press. */
    onPress?: (target: { kind: 'node' | 'link'; id: string }) => void
    /** Selected id (controlled focus). */
    selectedId?: string
    /** Empty state. */
    noData?: { title?: string; subtitle?: string }
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}

/** A node positioned by the layout step. */
export type PositionedNode = SankeyNode & {
    /** Column index (0-based). */
    columnIndex: number
    /** Y position of the node's top edge, in points. */
    y: number
    /** Node height in points. */
    height: number
    /** Total value flowing through this node (max of in/out). */
    totalValue: number
}

/** A link positioned by the layout step. */
export type PositionedLink = SankeyLink & {
    /** Source node's positioned index. */
    sourceIndex: number
    /** Target node's positioned index. */
    targetIndex: number
    /** Y offset of the link's top edge at the source node. */
    sourceY0: number
    sourceY1: number
    /** Y offset of the link's top/bottom edges at the target node. */
    targetY0: number
    targetY1: number
    /** Resolved color. */
    resolvedColor: string
}

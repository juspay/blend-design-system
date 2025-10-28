import type { Node, Edge, NodeProps, EdgeProps, Connection } from 'reactflow'
import type { ReactNode } from 'react'

// Re-export React Flow types for convenience
export type { Node, Edge, NodeProps, EdgeProps, Connection }

// Node type variants
export enum NodeType {
    DEFAULT = 'default',
    INPUT = 'input',
    OUTPUT = 'output',
    CUSTOM = 'custom',
}

// Edge type variants
export enum EdgeType {
    DEFAULT = 'default',
    STRAIGHT = 'straight',
    STEP = 'step',
    SMOOTHSTEP = 'smoothstep',
    SIMPLEBEZIER = 'simplebezier',
}

// Custom node data type
export type BaseNodeData = {
    label?: string
    description?: string
    icon?: ReactNode
    status?: 'default' | 'success' | 'error' | 'warning'
    [key: string]: unknown
}

// Custom edge data type
export type BaseEdgeData = {
    label?: string
    animated?: boolean
    [key: string]: unknown
}

// Blend-specific node types
export type BlendNode = Node<BaseNodeData>
export type BlendEdge = Edge<BaseEdgeData>

// WorkflowCanvas component props
export type WorkflowCanvasProps = {
    nodes: BlendNode[]
    edges: BlendEdge[]
    onNodesChange?: (nodes: BlendNode[]) => void
    onEdgesChange?: (edges: BlendEdge[]) => void
    onConnect?: (connection: Connection) => void
    onNodeClick?: (event: React.MouseEvent, node: BlendNode) => void
    onEdgeClick?: (event: React.MouseEvent, edge: BlendEdge) => void
    onNodeDoubleClick?: (event: React.MouseEvent, node: BlendNode) => void
    onPaneClick?: (event: React.MouseEvent) => void
    height?: string | number
    width?: string | number
    fitView?: boolean
    showControls?: boolean
    controlsPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    showMinimap?: boolean
    showBackground?: boolean
    panOnScroll?: boolean
    zoomOnScroll?: boolean
    nodesDraggable?: boolean
    nodesConnectable?: boolean
    elementsSelectable?: boolean
    minZoom?: number
    maxZoom?: number
    defaultZoom?: number
    children?: ReactNode
}

// Custom node component props
export type CustomNodeProps = NodeProps<BaseNodeData> & {
    selected: boolean
}

// Custom edge component props
export type CustomEdgeProps = EdgeProps<BaseEdgeData> & {
    selected?: boolean
}

// Control button types
export enum ControlButton {
    ZOOM_IN = 'zoom-in',
    ZOOM_OUT = 'zoom-out',
    FIT_VIEW = 'fit-view',
    INTERACTIVE = 'interactive',
    LOCK = 'lock',
}

// Workflow controls props
export type WorkflowControlsProps = {
    showZoom?: boolean
    showFitView?: boolean
    showInteractive?: boolean
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

import { useCallback, useMemo } from 'react'
import ReactFlow, {
    Background,
    BackgroundVariant,
    MiniMap,
    ReactFlowProvider,
    applyNodeChanges,
    applyEdgeChanges,
    type NodeChange,
    type EdgeChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import type { WorkflowCanvasProps } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { WorkflowTokensType } from './workflow.tokens'
import DefaultNode from './nodes/DefaultNode'
import DefaultEdge from './edges/DefaultEdge'
import WorkflowControls from './WorkflowControls'
import './WorkflowCanvas.css'
import Block from '../Primitives/Block/Block'

const WorkflowCanvasInner = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onEdgeClick,
    onNodeDoubleClick,
    onPaneClick,
    nodeTypes: customNodeTypes,
    edgeTypes: customEdgeTypes,
    height = 600,
    width = '100%',
    fitView = true,
    showControls = true,
    controlsPosition = 'top-right',
    showMinimap = false,
    minimapPosition = 'bottom-right',
    showBackground = true,
    panOnScroll = true,
    zoomOnScroll = true,
    nodesDraggable = true,
    nodesConnectable = true,
    elementsSelectable = true,
    minZoom = 0.1,
    maxZoom = 2,
    defaultZoom = 1,
    children,
}: WorkflowCanvasProps) => {
    const tokens = useResponsiveTokens<WorkflowTokensType>('WORKFLOW_CANVAS')

    const nodeTypes = useMemo(
        () => ({
            default: DefaultNode,
            ...customNodeTypes,
        }),
        [customNodeTypes]
    )

    const edgeTypes = useMemo(
        () => ({
            default: DefaultEdge,
            ...customEdgeTypes,
        }),
        [customEdgeTypes]
    )

    const handleNodesChange = useCallback(
        (changes: NodeChange[]) => {
            if (onNodesChange) {
                const updatedNodes = applyNodeChanges(changes, nodes)
                onNodesChange(updatedNodes)
            }
        },
        [nodes, onNodesChange]
    )

    const handleEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            if (onEdgesChange) {
                const updatedEdges = applyEdgeChanges(changes, edges)
                onEdgesChange(updatedEdges)
            }
        },
        [edges, onEdgesChange]
    )

    return (
        <Block
            className="blend-workflow-canvas"
            // className="blend-workflow-canvas"
            width={typeof width === 'number' ? `${width}px` : width}
            height={typeof height === 'number' ? `${height}px` : height}
            backgroundColor={tokens.canvas.backgroundColor}
            borderRadius={tokens.node.default.borderRadius}
            overflow="hidden"
            position="relative"
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                onNodeDoubleClick={onNodeDoubleClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView={fitView}
                panOnScroll={panOnScroll}
                zoomOnScroll={zoomOnScroll}
                nodesDraggable={nodesDraggable}
                nodesConnectable={nodesConnectable}
                elementsSelectable={elementsSelectable}
                minZoom={minZoom}
                maxZoom={maxZoom}
                defaultViewport={{ x: 0, y: 0, zoom: defaultZoom }}
                proOptions={{ hideAttribution: true }}
            >
                {showBackground && (
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={
                            typeof tokens.canvas.dotGap === 'string'
                                ? parseInt(tokens.canvas.dotGap)
                                : (tokens.canvas.dotGap as number)
                        }
                        size={tokens.canvas.dotSize}
                        color={tokens.canvas.dotColor as string}
                    />
                )}
                {showMinimap && (
                    <MiniMap
                        position={minimapPosition}
                        nodeColor={tokens.minimap.nodeColor as string}
                        nodeStrokeColor={
                            tokens.minimap.nodeStrokeColor as string
                        }
                        nodeBorderRadius={
                            parseInt(
                                tokens.minimap.nodeBorderRadius as string
                            ) || 2
                        }
                        maskColor={tokens.minimap.maskColor as string}
                        style={{
                            backgroundColor: tokens.minimap
                                .backgroundColor as string,
                            border: tokens.minimap.border as string,
                            borderRadius: tokens.minimap.borderRadius as string,
                            width: 200,
                            height: 150,
                        }}
                        zoomable
                        pannable
                    />
                )}
                {showControls && (
                    <WorkflowControls position={controlsPosition} />
                )}
                {children}
            </ReactFlow>
        </Block>
    )
}

/**
 * WorkflowCanvas component for building visual workflow builders
 *
 * A powerful workflow canvas component built on top of ReactFlow, providing
 * a complete solution for creating node-based workflow editors with support
 * for custom nodes, edges, controls, and theming.
 *
 * @component
 * @param {WorkflowCanvasProps} props - Canvas configuration and event handlers
 * @returns {JSX.Element} The workflow canvas wrapped in ReactFlowProvider
 *
 * @example
 * See the full demo at `apps/site/src/demos/WorkflowCanvasDemo.tsx`
 *
 * @public
 */
const WorkflowCanvas = (props: WorkflowCanvasProps) => {
    return (
        <ReactFlowProvider>
            <WorkflowCanvasInner {...props} />
        </ReactFlowProvider>
    )
}

export default WorkflowCanvas

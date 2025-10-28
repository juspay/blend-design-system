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
import styled from 'styled-components'
import type { WorkflowCanvasProps } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { WorkflowTokensType } from './workflow.tokens'
import DefaultNode from './nodes/DefaultNode'
import InputNode from './nodes/InputNode'
import OutputNode from './nodes/OutputNode'
import DefaultEdge from './edges/DefaultEdge'
import WorkflowControls from './WorkflowControls'
import './WorkflowCanvas.css'

const WorkflowContainer = styled.div<{
    $tokens: WorkflowTokensType
    $height: string | number
    $width: string | number
}>`
    width: ${(props) =>
        typeof props.$width === 'number' ? `${props.$width}px` : props.$width};
    height: ${(props) =>
        typeof props.$height === 'number'
            ? `${props.$height}px`
            : props.$height};
    background-color: ${(props) => props.$tokens.canvas.backgroundColor};
    border-radius: ${(props) => props.$tokens.node.default.borderRadius};
    overflow: hidden;
    position: relative;
`

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
    height = 600,
    width = '100%',
    fitView = true,
    showControls = true,
    controlsPosition = 'top-right',
    showMinimap = false,
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
            input: InputNode,
            output: OutputNode,
        }),
        []
    )

    const edgeTypes = useMemo(
        () => ({
            default: DefaultEdge,
        }),
        []
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
        <WorkflowContainer
            className="blend-workflow-canvas"
            $tokens={tokens}
            $height={height}
            $width={width}
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
                        }}
                    />
                )}
                {showControls && (
                    <WorkflowControls position={controlsPosition} />
                )}
                {children}
            </ReactFlow>
        </WorkflowContainer>
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

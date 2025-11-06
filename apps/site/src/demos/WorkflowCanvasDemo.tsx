import { useState, useCallback } from 'react'
import {
    WorkflowCanvas,
    type BlendNode,
    type BlendEdge,
    type NodeProps,
    type EdgeProps,
    type Connection,
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    Handle,
    Position,
    ThemeProvider,
    Menu,
    MenuGroupType,
} from '../../../../packages/blend/lib/main'
import { FileText, MoreVertical, Check, ListRestart } from 'lucide-react'

// Status configurations for different node states
const STATUS_CONFIGS = {
    inProgress: {
        label: 'In-Progress',
        badgeBackground: '#eff6ff',
        badgeTextColor: '#2563eb',
        indicatorColor: '#3b82f6',
        borderColor: '#3b82f6',
        shadowColor: 'rgba(59, 130, 246, 0.15)',
        handleColor: '#3b82f6',
        handleBorderColor: '#2563eb',
        icon: null, // Will use dot
    },
    completed: {
        label: 'Completed',
        badgeBackground: '#f0fdf4',
        badgeTextColor: '#16a34a',
        indicatorColor: '#22c55e',
        borderColor: '#22c55e',
        shadowColor: 'rgba(34, 197, 94, 0.15)',
        handleColor: '#22c55e',
        handleBorderColor: '#16a34a',
        icon: 'check', // Will use checkmark
    },
    failed: {
        label: 'Error',
        badgeBackground: '#fef2f2',
        badgeTextColor: '#dc2626',
        indicatorColor: '#ef4444',
        borderColor: '#ef4444',
        shadowColor: 'rgba(239, 68, 68, 0.15)',
        handleColor: '#ef4444',
        handleBorderColor: '#dc2626',
        icon: null,
    },
    warning: {
        label: 'Warning',
        badgeBackground: '#fffbeb',
        badgeTextColor: '#d97706',
        indicatorColor: '#f59e0b',
        borderColor: '#f59e0b',
        shadowColor: 'rgba(245, 158, 11, 0.15)',
        handleColor: '#f59e0b',
        handleBorderColor: '#d97706',
        icon: null,
    },
}

const basicMenuItems: MenuGroupType[] = [
    {
        items: [
            {
                label: 'Restart',
                slot1: <ListRestart size={16} />,
                onClick: () => console.log('Restart clicked'),
            },
        ],
    },
]

type StatusType = keyof typeof STATUS_CONFIGS

// Reusable Status Node Component
const StatusNode = ({ data, selected }: NodeProps) => {
    const statusType = ((data.statusType as string) ||
        'inProgress') as StatusType
    const config = STATUS_CONFIGS[statusType]

    return (
        <div
            style={{
                position: 'relative',
                minWidth: '280px',
                minHeight: '120px',
            }}
        >
            {/* Input handle (top) */}
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={true}
                style={{
                    width: '12px',
                    height: '12px',
                    background: config.handleColor,
                    border: `2px solid ${config.handleBorderColor}`,
                    cursor: 'crosshair',
                }}
            />

            <div
                style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: '#ffffff',
                    border: selected
                        ? `2px solid ${config.borderColor}`
                        : '1px solid #e5e7eb',
                    boxShadow: selected
                        ? `0 4px 12px ${config.shadowColor}`
                        : '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                    cursor: 'grab',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <FileText size={18} color="#6b7280" />
                        <div
                            style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#111827',
                            }}
                        >
                            {data.label || 'Task Name'}
                        </div>
                    </div>
                    <Menu
                        trigger={
                            <MoreVertical
                                cursor="pointer"
                                size={16}
                                color="#9ca3af"
                            />
                        }
                        items={basicMenuItems}
                    />
                </div>

                {/* Status Badge */}
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: config.badgeBackground,
                        marginBottom: '12px',
                    }}
                >
                    {config.icon === 'check' ? (
                        <Check
                            size={12}
                            color={config.indicatorColor}
                            strokeWidth={3}
                        />
                    ) : (
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: config.indicatorColor,
                            }}
                        />
                    )}
                    <span
                        style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: config.badgeTextColor,
                        }}
                    >
                        {(data.customStatus as string) || config.label}
                    </span>
                </div>

                {/* Footer Info */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '8px',
                        borderTop: '1px solid #f3f4f6',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '12px',
                            color: '#6b7280',
                        }}
                    >
                        <span>{data.tokens || '400'} Tokens</span>
                        <span>|</span>
                        <span>{data.time || '0.0'} Sec</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <Check
                            size={14}
                            color={config.indicatorColor}
                            strokeWidth={2.5}
                        />
                        <span
                            style={{
                                fontSize: '12px',
                                color: config.badgeTextColor,
                                fontWeight: 500,
                            }}
                        >
                            {data.count || '3'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Output handle (bottom) */}
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={true}
                style={{
                    width: '12px',
                    height: '12px',
                    background: config.handleColor,
                    border: `2px solid ${config.handleBorderColor}`,
                    cursor: 'crosshair',
                }}
            />
        </div>
    )
}

// Custom Edge Component Example
const CustomAnimatedEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data,
    selected,
}: EdgeProps) => {
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    })

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: selected ? '#ff6b6b' : '#f59e0b',
                    strokeWidth: selected ? 3 : 2,
                    strokeDasharray: '5,5',
                    animation: 'dashdraw 0.5s linear infinite',
                }}
            />
            {data?.label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            background: '#f59e0b',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            pointerEvents: 'all',
                        }}
                    >
                        {data.label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    )
}

// Define custom types outside component to prevent re-renders
const customNodeTypes = {
    statusNode: StatusNode,
}

const customEdgeTypes = {
    customAnimated: CustomAnimatedEdge,
}

const WorkflowCanvasDemo = () => {
    const [nodes, setNodes] = useState<BlendNode[]>([
        // Root node (Level 0)
        {
            id: '1',
            type: 'statusNode',
            position: { x: 500, y: 50 },
            data: {
                label: 'Problem Expansion',
                statusType: 'completed',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        // Level 1 - Three branches from root
        {
            id: '2',
            type: 'statusNode',
            position: { x: 100, y: 300 },
            data: {
                label: 'Xyne Motion Context',
                statusType: 'failed',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        {
            id: '3',
            type: 'statusNode',
            position: { x: 500, y: 300 },
            data: {
                label: 'RCA & Validation',
                statusType: 'completed',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        {
            id: '4',
            type: 'statusNode',
            position: { x: 900, y: 300 },
            data: {
                label: 'Impact Analysis',
                statusType: 'warning',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        // Level 2 - Children of node 2 (left branch)
        {
            id: '5',
            type: 'statusNode',
            position: { x: 0, y: 550 },
            data: {
                label: 'XML Finish',
                statusType: 'completed',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        {
            id: '6',
            type: 'statusNode',
            position: { x: 250, y: 550 },
            data: {
                label: 'COF Valuation',
                statusType: 'completed',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        // Level 2 - Children of node 3 (middle branch)
        {
            id: '7',
            type: 'statusNode',
            position: { x: 500, y: 550 },
            data: {
                label: 'CODE Finalization',
                statusType: 'completed',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        // Level 2 - Children of node 4 (right branch)
        {
            id: '8',
            type: 'statusNode',
            position: { x: 800, y: 550 },
            data: {
                label: 'Data Processing',
                statusType: 'inProgress',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
        {
            id: '9',
            type: 'statusNode',
            position: { x: 1050, y: 550 },
            data: {
                label: 'Final Review',
                statusType: 'warning',
                tokens: '400',
                time: '0.0',
                count: '1',
            },
        },
    ])

    const [edges, setEdges] = useState<BlendEdge[]>([
        // Root to Level 1 (3 branches)
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            type: 'customAnimated',
            data: { label: 'Branch 1' },
        },
        {
            id: 'e1-3',
            source: '1',
            target: '3',
        },
        {
            id: 'e1-4',
            source: '1',
            target: '4',
        },
        // Level 1 to Level 2 - Left branch (node 2)
        {
            id: 'e2-5',
            source: '2',
            target: '5',
        },
        {
            id: 'e2-6',
            source: '2',
            target: '6',
        },
        // Level 1 to Level 2 - Middle branch (node 3)
        {
            id: 'e3-7',
            source: '3',
            target: '7',
        },
        // Level 1 to Level 2 - Right branch (node 4)
        {
            id: 'e4-8',
            source: '4',
            target: '8',
        },
        {
            id: 'e4-9',
            source: '4',
            target: '9',
        },
    ])

    const handleNodesChange = useCallback((updatedNodes: BlendNode[]) => {
        setNodes(updatedNodes)
    }, [])

    const handleEdgesChange = useCallback((updatedEdges: BlendEdge[]) => {
        setEdges(updatedEdges)
    }, [])

    const handleConnect = useCallback((connection: Connection) => {
        if (!connection.source || !connection.target) return

        const newEdge: BlendEdge = {
            id: `e${connection.source}-${connection.target}`,
            source: connection.source,
            target: connection.target,
            data: { label: 'connected' },
        }
        setEdges((eds) => [...eds, newEdge])
    }, [])

    return (
        <div style={{ width: '100%', height: '100%', paddingBottom: '32px' }}>
            <ThemeProvider>
                <WorkflowCanvas
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={handleNodesChange}
                    onEdgesChange={handleEdgesChange}
                    onConnect={handleConnect}
                    nodeTypes={customNodeTypes}
                    edgeTypes={customEdgeTypes}
                    fitView={true}
                    showControls={true}
                    showMinimap={true}
                    height={'90vh'}
                    // minimapPosition="bottom-left"
                    // fitView={true}
                    // showControls={true}
                    // showMinimap={false}
                    showBackground={true}
                    nodesDraggable={true}
                    nodesConnectable={true}
                    elementsSelectable={true}
                />
            </ThemeProvider>
        </div>
    )
}

export default WorkflowCanvasDemo

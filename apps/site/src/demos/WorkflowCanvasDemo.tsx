import { useState, useCallback } from 'react'
import {
    WorkflowCanvas,
    type BlendNode,
    type BlendEdge,
    ThemeProvider,
} from '../../../../packages/blend/lib/main'
import {
    Zap,
    Filter,
    Settings,
    Database,
    Mail,
    CheckCircle,
    XCircle,
} from 'lucide-react'

const WorkflowCanvasDemo = () => {
    const [nodes, setNodes] = useState<BlendNode[]>([
        {
            id: '1',
            type: 'input',
            position: { x: 50, y: 200 },
            data: {
                label: 'Webhook Trigger',
                description: 'HTTP POST',
                icon: <Zap size={20} />,
            },
        },
        {
            id: '2',
            type: 'default',
            position: { x: 300, y: 120 },
            data: {
                label: 'Validate Request',
                description: 'Check payload',
                icon: <Filter size={20} />,
            },
        },
        {
            id: '3',
            type: 'default',
            position: { x: 300, y: 280 },
            data: {
                label: 'Transform Data',
                description: 'Map fields',
                icon: <Settings size={20} />,
            },
        },
        {
            id: '4',
            type: 'default',
            position: { x: 550, y: 120 },
            data: {
                label: 'Save to DB',
                description: 'PostgreSQL',
                icon: <Database size={20} />,
            },
        },
        {
            id: '5',
            type: 'default',
            position: { x: 550, y: 280 },
            data: {
                label: 'Send Email',
                description: 'Notify user',
                icon: <Mail size={20} />,
            },
        },
        {
            id: '6',
            type: 'output',
            position: { x: 800, y: 120 },
            data: {
                label: 'Completed',
                description: '200 OK',
                icon: <CheckCircle size={20} />,
            },
        },
        {
            id: '7',
            type: 'output',
            position: { x: 800, y: 280 },
            data: {
                label: 'Failed',
                description: '500 Error',
                icon: <XCircle size={20} />,
            },
        },
    ])

    const [edges, setEdges] = useState<BlendEdge[]>([
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            data: { label: 'validated' },
        },
        {
            id: 'e1-3',
            source: '1',
            target: '3',
            data: { label: 'transformed' },
        },
        {
            id: 'e2-4',
            source: '2',
            target: '4',
            data: { label: 'saved' },
        },
        {
            id: 'e3-5',
            source: '3',
            target: '5',
            data: { label: 'sent' },
        },
        {
            id: 'e4-6',
            source: '4',
            target: '6',
            data: { label: 'success' },
        },
        {
            id: 'e5-7',
            source: '5',
            target: '7',
            data: { label: 'failed' },
        },
    ])

    const handleNodesChange = useCallback((updatedNodes: BlendNode[]) => {
        setNodes(updatedNodes)
    }, [])

    const handleEdgesChange = useCallback((updatedEdges: BlendEdge[]) => {
        setEdges(updatedEdges)
    }, [])

    const handleConnect = useCallback((connection: any) => {
        const newEdge: BlendEdge = {
            id: `e${connection.source}-${connection.target}`,
            source: connection.source,
            target: connection.target,
            data: { label: 'connected' },
        }
        setEdges((eds) => [...eds, newEdge])
    }, [])

    return (
        <ThemeProvider>
            <div
                style={{ width: '100%', height: '100%', paddingBottom: '32px' }}
            >
                <WorkflowCanvas
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={handleNodesChange}
                    onEdgesChange={handleEdgesChange}
                    onConnect={handleConnect}
                    height={750}
                    fitView={true}
                    showControls={true}
                    showMinimap={true}
                    showBackground={true}
                    nodesDraggable={true}
                    nodesConnectable={true}
                    elementsSelectable={true}
                />
            </div>
        </ThemeProvider>
    )
}

export default WorkflowCanvasDemo

import React from 'react'
import { Sankey, Tooltip } from 'recharts'
import { SankeyProps } from './types'

interface SankeyChartProps extends SankeyProps {
    chartName?: string
    colors?: string[]
}

const SankeyChart: React.FC<SankeyChartProps> = ({
    data,
    width,
    height = 400,
}) => {
    // Handle empty data
    if (!data || data.length === 0 || data[0].nodes.length === 0) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '28px',
                    height: `${height}px`,
                    width: width || '100%',
                }}
                data-chart="No-Data"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#374151',
                            marginBottom: '4px',
                        }}
                    >
                        No data available
                    </div>
                    <div
                        style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#6B7280',
                        }}
                    >
                        Data will appear here once available
                    </div>
                </div>
            </div>
        )
    }

    // Transform data to Recharts Sankey format
    const sankeyData = data[0] // Sankey expects single dataset

    // Create a map from node id to index for Recharts
    const nodeMap = new Map<string, number>()
    sankeyData.nodes.forEach((node, index) => {
        const nodeId = node.id || node.name || index.toString()
        nodeMap.set(nodeId, index)
    })

    // Recharts Sankey expects nodes and links in specific format
    // source and target should be node indices (numbers)
    const rechartsData = {
        nodes: sankeyData.nodes.map((node) => ({
            name: node.name || node.id,
        })),
        links: sankeyData.links.map((link) => {
            const sourceId =
                typeof link.source === 'string'
                    ? link.source
                    : (link.source as { id: string })?.id
            const targetId =
                typeof link.target === 'string'
                    ? link.target
                    : (link.target as { id: string })?.id

            const sourceIndex = nodeMap.get(sourceId || '') || 0
            const targetIndex = nodeMap.get(targetId || '') || 0

            return {
                source: sourceIndex,
                target: targetIndex,
                value: link.value || 1,
            }
        }),
    }

    // Custom tooltip for Sankey - simplified to avoid Blend dependencies
    const CustomTooltip = ({
        active,
        payload,
    }: {
        active?: boolean
        payload?: Array<{ payload?: { name?: string; value?: number } }>
    }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div
                        style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#374151',
                        }}
                    >
                        {data?.name || `Value: ${data?.value}`}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                        {`Value: ${data?.value || 0}`}
                    </div>
                </div>
            )
        }
        return null
    }

    // Calculate numeric width for Sankey component
    const numericWidth = typeof width === 'number' ? width : 800

    return (
        <div style={{ width: width || '100%', height }}>
            <Sankey
                width={numericWidth}
                height={height}
                data={rechartsData}
                nodeWidth={10}
                nodePadding={40}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                iterations={32}
                style={{
                    fontSize: '12px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                }}
            >
                <Tooltip content={<CustomTooltip />} />
            </Sankey>
        </div>
    )
}

SankeyChart.displayName = 'SankeyChart'

export default SankeyChart

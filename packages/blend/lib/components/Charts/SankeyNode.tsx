import React from 'react'
import { Rectangle, Layer } from 'recharts'
import { SankeyNodeProps } from './types'

const SankeyNode: React.FC<SankeyNodeProps> = ({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    index = 0,
    payload,
    containerWidth = 960,
}) => {
    const isOut = x + width + 6 > containerWidth
    const maxLabelLength = 25 // Truncate long labels

    // Truncate label if too long
    const truncateLabel = (label: string, maxLength: number) => {
        if (label.length <= maxLength) return label
        return label.substring(0, maxLength - 3) + '...'
    }

    const nodeName = truncateLabel(payload?.name || '', maxLabelLength)

    return (
        <Layer key={`CustomNode${index}`}>
            <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#5192ca"
                fillOpacity="1"
            />
            <text
                textAnchor={isOut ? 'end' : 'start'}
                x={isOut ? x - 8 : x + width + 8}
                y={y + height / 2}
                fontSize="11"
                fill="#333"
                fontWeight="500"
                style={{ userSelect: 'none' }}
            >
                {nodeName}
            </text>
            <text
                textAnchor={isOut ? 'end' : 'start'}
                x={isOut ? x - 8 : x + width + 8}
                y={y + height / 2 + 12}
                fontSize="10"
                fill="#666"
                fontWeight="400"
                style={{ userSelect: 'none' }}
            >
                {payload?.value ? `${payload.value}k` : ''}
            </text>
        </Layer>
    )
}

export default SankeyNode

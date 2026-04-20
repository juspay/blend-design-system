import React from 'react'
import { Rectangle, Layer } from 'recharts'
import { SankeyNodeProps, SankeyTooltipData } from './types'
import { DEFAULT_COLORS } from './utils'

type PayloadWithColor = {
    name?: string
    value?: number
    color?: string
}

const SankeyNode: React.FC<SankeyNodeProps> = ({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    index = 0,
    payload,
    containerWidth = 960,
    nodeColors = [],
    onMouseEnter,
    onMouseLeave,
}) => {
    const isOut = x + width + 150 > containerWidth
    const maxLabelLength = 25

    const truncateLabel = (label: string, maxLength: number) => {
        if (label.length <= maxLength) return label
        return label.substring(0, maxLength - 3) + '...'
    }

    const nodeName = truncateLabel(payload?.name || '', maxLabelLength)

    const typedPayload = payload as PayloadWithColor | undefined
    const nodeColorValue = nodeColors[index]

    // Extract color string from either string or object format
    const getColorString = (
        value: string | { key: string; color: string } | undefined
    ): string | undefined => {
        if (typeof value === 'string') return value
        if (typeof value === 'object' && value !== null && 'color' in value) {
            return value.color
        }
        return undefined
    }

    const defaultColorObj = DEFAULT_COLORS[index % DEFAULT_COLORS.length]
    const defaultColorString = defaultColorObj.color

    const nodeColor: string =
        getColorString(nodeColorValue) ||
        typedPayload?.color ||
        defaultColorString

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (onMouseEnter && payload) {
            const tooltipData: SankeyTooltipData = {
                payload: {
                    name: payload.name,
                    value: (payload as PayloadWithColor).value,
                },
            }
            onMouseEnter(tooltipData, e)
        }
    }

    const handleMouseLeave = () => {
        if (onMouseLeave) {
            onMouseLeave()
        }
    }

    return (
        <Layer key={`CustomNode${index}`}>
            <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                fill={nodeColor}
                fillOpacity="1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
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

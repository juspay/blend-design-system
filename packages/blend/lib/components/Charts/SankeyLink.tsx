import React, { useState } from 'react'
import { Layer } from 'recharts'
import { SankeyLinkProps, SankeyTooltipData } from './types'

type PayloadWithColor = {
    source?: number | string
    target?: number | string
    value?: number
    color?: string
    hoverColor?: string
    sourceName?: string
    targetName?: string
}

const SankeyLink: React.FC<SankeyLinkProps> = ({
    sourceX = 0,
    targetX = 0,
    sourceY = 0,
    targetY = 0,
    sourceControlX = 0,
    targetControlX = 0,
    linkWidth = 0,
    index = 0,
    payload,
    linkColors = [],
    onMouseEnter,
    onMouseLeave,
}) => {
    const typedPayload = payload as PayloadWithColor | undefined
    const linkColorValue = linkColors[index || 0]
    const linkColorString =
        typeof linkColorValue === 'string'
            ? linkColorValue
            : typeof linkColorValue === 'object' && linkColorValue?.color
              ? linkColorValue.color
              : undefined
    const defaultFill =
        linkColorString || typedPayload?.color || 'url(#linkGradient)'
    const [fill, setFill] = useState<string>(defaultFill)

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (typedPayload?.hoverColor) {
            setFill(typedPayload.hoverColor)
        }

        if (onMouseEnter && payload) {
            const tooltipData: SankeyTooltipData = {
                payload: {
                    source: typedPayload?.source,
                    target: typedPayload?.target,
                    value: typedPayload?.value,
                    sourceName: typedPayload?.sourceName,
                    targetName: typedPayload?.targetName,
                    color: typedPayload?.color,
                },
            }
            onMouseEnter(tooltipData, e)
        }
    }

    const handleMouseLeave = () => {
        setFill(defaultFill)

        if (onMouseLeave) {
            onMouseLeave()
        }
    }

    return (
        <Layer key={`CustomLink${index}`}>
            <path
                d={`
            M${sourceX},${sourceY + linkWidth / 2}
            C${sourceControlX},${sourceY + linkWidth / 2}
              ${targetControlX},${targetY + linkWidth / 2}
              ${targetX},${targetY + linkWidth / 2}
            L${targetX},${targetY - linkWidth / 2}
            C${targetControlX},${targetY - linkWidth / 2}
              ${sourceControlX},${sourceY - linkWidth / 2}
              ${sourceX},${sourceY - linkWidth / 2}
            Z
          `}
                fill={fill}
                strokeWidth="0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
            />
        </Layer>
    )
}

SankeyLink.displayName = 'SankeyLink'

export default SankeyLink

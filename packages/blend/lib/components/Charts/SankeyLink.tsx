import React, { useState } from 'react'
import { Layer } from 'recharts'
import { SankeyLinkProps } from './types'

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
}) => {
    const defaultFill =
        linkColors[index || 0] ||
        (payload as any)?.color ||
        'url(#linkGradient)'
    const [fill, setFill] = useState<string>(defaultFill)

    const handleMouseEnter = () => {
        setFill('rgba(0, 136, 254, 0.5)')
    }

    const handleMouseLeave = () => {
        setFill(defaultFill)
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
            />
        </Layer>
    )
}

SankeyLink.displayName = 'SankeyLink'

export default SankeyLink

import { Component } from 'react'
import { Layer } from 'recharts'
import { SankeyLinkProps } from './types'

interface SankeyLinkState {
    fill: string
}

class SankeyLink extends Component<SankeyLinkProps, SankeyLinkState> {
    static displayName = 'SankeyLinkDemo'

    state: SankeyLinkState = {
        fill: 'url(#linkGradient)',
    }

    render() {
        const {
            sourceX = 0,
            targetX = 0,
            sourceY = 0,
            targetY = 0,
            sourceControlX = 0,
            targetControlX = 0,
            linkWidth = 0,
            index = 0,
        } = this.props
        const { fill } = this.state

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
                    onMouseEnter={() => {
                        this.setState({ fill: 'rgba(0, 136, 254, 0.5)' })
                    }}
                    onMouseLeave={() => {
                        this.setState({ fill: 'url(#linkGradient)' })
                    }}
                />
            </Layer>
        )
    }
}

export default SankeyLink

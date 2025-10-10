import React, { useRef } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChartTokensType } from './chart.tokens'

export interface ChartContainerProps {
    children: React.ReactNode
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
    children,
}: ChartContainerProps) => {
    const chartTokens = useResponsiveTokens<ChartTokensType>('CHARTS')
    const chartContainerRef = useRef<HTMLDivElement>(null!)

    return (
        <Block
            ref={chartContainerRef}
            width="100%"
            height="100%"
            border={chartTokens.border}
            borderRadius={chartTokens.borderRadius}
            backgroundColor={chartTokens.content.backgroundColor}
        >
            {children}
        </Block>
    )
}

export default ChartContainer

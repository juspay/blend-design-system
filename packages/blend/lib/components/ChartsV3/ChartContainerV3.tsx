import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import type { ChartV3TokensType } from './chartV3.tokens'
import type { ChartV3ContainerProps } from './chartV3.types'

const ChartContainerV3 = ({ children }: ChartV3ContainerProps) => {
    const chartTokens = useResponsiveTokens<ChartV3TokensType>('CHARTSV3')
    return (
        <Block
            as="section"
            role="group"
            aria-roledescription="Chart container"
            data-chart="Chart-Container"
            display="flex"
            flexDirection="column"
            border={chartTokens.border}
            backgroundColor={chartTokens.backgroundColor}
            borderRadius={chartTokens.borderRadius}
            boxShadow={chartTokens.boxShadow}
            width="100%"
            overflow="hidden"
        >
            {children}
        </Block>
    )
}

export default ChartContainerV3

ChartContainerV3.displayName = 'ChartContainerV3'

import { ChartV2ContainerProps } from './chartV2.types'
import { ChartV2TokensType } from './chartV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'

const ChartContainerV2 = ({ children }: ChartV2ContainerProps) => {
    const chartTokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
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

export default ChartContainerV2

ChartContainerV2.displayName = 'ChartContainerV2'

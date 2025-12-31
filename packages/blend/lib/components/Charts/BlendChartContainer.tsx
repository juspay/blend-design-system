import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { BlendChartContainerProps } from './BlendChart.types'

const BlendChartContainer = ({ children }: BlendChartContainerProps) => {
    return (
        <Block
            flexDirection="column"
            borderRadius={FOUNDATION_THEME.unit[12]}
            border={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
            boxShadow={FOUNDATION_THEME.shadows.sm}
            width="100%"
            height="100%"
            overflow="hidden"
        >
            {children}
        </Block>
    )
}

BlendChartContainer.displayName = 'BlendChartContainer'

export default BlendChartContainer

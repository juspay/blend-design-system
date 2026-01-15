import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'
import { BlendChartHeaderProps } from './BlendChart.types'

const BlendChartHeader = ({ children }: BlendChartHeaderProps) => {
    return (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="end"
            gap={FOUNDATION_THEME.unit[16]}
            paddingX={FOUNDATION_THEME.unit[16]}
            paddingY={FOUNDATION_THEME.unit[8]}
            backgroundColor={FOUNDATION_THEME.colors.gray[25]}
            borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
        >
            <Block display="flex" flexGrow={1} flexShrink={0} flexBasis="auto">
                {children}
            </Block>
        </Block>
    )
}

BlendChartHeader.displayName = 'BlendChartHeader'

export default BlendChartHeader

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import { ChartV2TokensType } from './chartV2.tokens'
import { ChartV2HeaderProps } from './chartV2.types'

const ChartHeaderV2 = ({ children }: ChartV2HeaderProps) => {
    const tokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
    return (
        <Block
            display="flex"
            alignItems="center"
            paddingTop={tokens.header.padding.top}
            paddingRight={tokens.header.padding.right}
            paddingBottom={tokens.header.padding.bottom}
            paddingLeft={tokens.header.padding.left}
            backgroundColor={tokens.header.backgroundColor}
            borderBottom={tokens.header.borderBottom}
            data-element="chart-header"
        >
            {children}
        </Block>
    )
}

export default ChartHeaderV2

ChartHeaderV2.displayName = 'ChartHeaderV2'

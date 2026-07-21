import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import type { ChartV3TokensType } from './chartV3.tokens'
import type { ChartV3HeaderProps } from './chartV3.types'

const ChartHeaderV3 = ({ children }: ChartV3HeaderProps) => {
    const tokens = useResponsiveTokens<ChartV3TokensType>('CHARTSV3')
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

export default ChartHeaderV3

ChartHeaderV3.displayName = 'ChartHeaderV3'

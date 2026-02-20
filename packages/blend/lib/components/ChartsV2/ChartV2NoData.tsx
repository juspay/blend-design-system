import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Button } from '../Button'
import type { ChartV2NoDataProps } from './chartV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ChartV2TokensType } from './chartV2.tokens'

const ChartV2NoData = ({
    title,
    subtitle,
    slot,
    button,
}: ChartV2NoDataProps) => {
    const tokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
    const chartTokens = tokens.chart

    return (
        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={16}
            gap={8}
            backgroundColor={chartTokens.backgroundColor}
        >
            {title && (
                <Text variant="heading.sm" as="h4">
                    {title}
                </Text>
            )}
            {subtitle && (
                <Text variant="body.sm" color="#6b7280">
                    {subtitle}
                </Text>
            )}
            {slot}
            {button && <Button {...button} />}
        </Block>
    )
}

export default ChartV2NoData

ChartV2NoData.displayName = 'ChartV2NoData'

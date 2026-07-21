import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Button } from '../Button'
import type { ChartV3NoDataProps } from './chartV3.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ChartV3TokensType } from './chartV3.tokens'

const ChartV3NoData = ({
    title,
    subtitle,
    slot,
    button,
}: ChartV3NoDataProps) => {
    const tokens = useResponsiveTokens<ChartV3TokensType>('CHARTSV3')
    const chartTokens = tokens.chart

    return (
        <Block
            data-chart="No-Data"
            role="status"
            aria-live="polite"
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

export default ChartV3NoData

ChartV3NoData.displayName = 'ChartV3NoData'

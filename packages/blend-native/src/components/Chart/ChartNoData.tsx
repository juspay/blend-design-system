import { View } from 'react-native'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import Text from '../../primitives/Text'
import type { ChartNoDataProps } from './chart.types'

/**
 * Empty state for `Chart` — mirrors web's `ChartV2NoData`.
 */
function ChartNoData({ title, subtitle, slot }: ChartNoDataProps) {
    const tokens = useNativeTokens<ChartV2TokensType>('CHARTSV2')

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: 16,
                backgroundColor: String(tokens.chart.backgroundColor),
            }}
            accessibilityRole="text"
        >
            {title ? (
                /* Matches web's `heading.sm` variant: 18/600/24. */
                <Text
                    fontSize={18}
                    fontWeight={600}
                    lineHeight={24}
                    color={String(tokens.chart.xAxis.title.color)}
                >
                    {title}
                </Text>
            ) : null}
            {subtitle ? (
                /* Matches web's `body.sm` variant: 12/400/18. */
                <Text
                    fontSize={12}
                    fontWeight={400}
                    lineHeight={18}
                    color={String(tokens.chart.xAxis.labels.color)}
                >
                    {subtitle}
                </Text>
            ) : null}
            {slot}
        </View>
    )
}

ChartNoData.displayName = 'ChartNoData'
export default ChartNoData

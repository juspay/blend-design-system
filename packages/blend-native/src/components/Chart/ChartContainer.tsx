import { forwardRef } from 'react'
import type { View as RNView } from 'react-native'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import Block from '../../primitives/Block'
import type { ChartContainerProps } from './chart.types'

/**
 * Bordered card wrapper for chart components. Mirrors web's `ChartContainerV2`.
 */
const ChartContainer = forwardRef<RNView, ChartContainerProps>(
    function ChartContainer({ children, style }, ref) {
        const tokens = useNativeTokens<ChartV2TokensType>('CHARTSV2')

        return (
            <Block
                ref={ref}
                flexDirection="column"
                backgroundColor={String(tokens.backgroundColor)}
                border={String(tokens.border)}
                borderRadius={tokens.borderRadius as string}
                boxShadow={String(tokens.boxShadow)}
                width="100%"
                overflow="hidden"
                accessibilityLabel="Chart container"
                style={style}
            >
                {children}
            </Block>
        )
    }
)

ChartContainer.displayName = 'ChartContainer'
export default ChartContainer

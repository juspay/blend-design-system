import { forwardRef } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { parseDimension, parseBorder } from '../../adapters/cssStringAdapter'
import type { ChartHeaderProps } from './chart.types'

/**
 * Header bar for `Chart` — mirrors web's `ChartHeaderV2`.
 */
const ChartHeader = forwardRef<RNView, ChartHeaderProps>(function ChartHeader(
    { children, style },
    ref
) {
    const tokens = useNativeTokens<ChartV2TokensType>('CHARTSV2')
    const parsedBorder = parseBorder(String(tokens.header.borderBottom))

    return (
        <View
            ref={ref}
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: parseDimension(
                        tokens.header.padding.top as string
                    ),
                    paddingRight: parseDimension(
                        tokens.header.padding.right as string
                    ),
                    paddingBottom: parseDimension(
                        tokens.header.padding.bottom as string
                    ),
                    paddingLeft: parseDimension(
                        tokens.header.padding.left as string
                    ),
                    backgroundColor: String(tokens.header.backgroundColor),
                    ...(parsedBorder
                        ? {
                              borderBottomWidth: parsedBorder.borderWidth,
                              borderBottomColor: parsedBorder.borderColor,
                          }
                        : {}),
                },
                style,
            ]}
        >
            {children}
        </View>
    )
})

ChartHeader.displayName = 'ChartHeader'
export default ChartHeader

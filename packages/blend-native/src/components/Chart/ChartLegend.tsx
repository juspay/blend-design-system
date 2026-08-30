import { memo } from 'react'
import { View, Pressable } from 'react-native'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import type { ChartLegendProps } from './chart.types'

/**
 * Legend list for `Chart` — mirrors web's `ChartLegendV2`.
 *
 * Renders a horizontal row of tappable legend items, each with a color
 * swatch and optional value. Tapping toggles visibility (the parent
 * controls hidden state via `onToggle`).
 */
function ChartLegendImpl({
    items,
    onToggle,
    layout = 'horizontal',
    style,
}: ChartLegendProps) {
    const tokens = useNativeTokens<ChartV2TokensType>('CHARTSV2')
    const lt = tokens.legends

    if (!items || items.length === 0) return null

    const swatchW =
        parseDimension(lt.legendItem.shape.width as string | number) ?? 12
    const swatchH =
        parseDimension(lt.legendItem.shape.height as string | number) ?? 12
    const swatchR =
        parseDimension(lt.legendItem.shape.borderRadius as string | number) ?? 2
    const itemGap = parseDimension(lt.legendItem.gap as string | number) ?? 6
    const listGap = parseDimension(lt.gap as string | number) ?? 12
    const textGap =
        parseDimension(lt.legendItem.text.gap as string | number) ?? 4

    return (
        <View
            style={[
                {
                    flexDirection: layout === 'horizontal' ? 'row' : 'column',
                    flexWrap: layout === 'horizontal' ? 'wrap' : 'nowrap',
                    gap: listGap,
                    paddingTop: 8,
                },
                style,
            ]}
        >
            {items.map((item) => {
                const opacity = item.visible ? 1 : 0.4
                return (
                    <Pressable
                        key={item.key}
                        onPress={
                            onToggle ? () => onToggle(item.key) : undefined
                        }
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: itemGap,
                            opacity,
                        }}
                    >
                        <View
                            style={{
                                width: swatchW,
                                height: swatchH,
                                borderRadius: swatchR,
                                backgroundColor: item.color,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: textGap,
                            }}
                        >
                            <Text
                                fontSize={
                                    lt.legendItem.text.name.fontSize as
                                        | string
                                        | number
                                }
                                fontWeight={
                                    lt.legendItem.text.name.fontWeight as
                                        | string
                                        | number
                                }
                                color={String(lt.legendItem.text.name.color)}
                                lineHeight={
                                    lt.legendItem.text.name.lineHeight as
                                        | string
                                        | number
                                }
                            >
                                {item.name}
                            </Text>
                            {item.value !== undefined && (
                                <Text
                                    fontSize={
                                        lt.legendItem.text.value.fontSize as
                                            | string
                                            | number
                                    }
                                    fontWeight={
                                        lt.legendItem.text.value.fontWeight as
                                            | string
                                            | number
                                    }
                                    color={String(
                                        lt.legendItem.text.value.color
                                    )}
                                    lineHeight={
                                        lt.legendItem.text.value.lineHeight as
                                            | string
                                            | number
                                    }
                                >
                                    {String(item.value)}
                                </Text>
                            )}
                        </View>
                    </Pressable>
                )
            })}
        </View>
    )
}

export const ChartLegend = memo(ChartLegendImpl)
ChartLegend.displayName = 'ChartLegend'
export default ChartLegend

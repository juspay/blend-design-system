import { memo } from 'react'
import { View, Pressable } from 'react-native'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import type { ChartLegendProps } from './chart.types'

/**
 * Web hardcodes the legend swatch radius to 4 (`ChartV2Legend.tsx`) instead
 * of the token's `border.radius[12]` — 12 on a 12×12 swatch would be a full
 * circle. Native matches the hardcoded 4 for the same reason.
 */
const SWATCH_RADIUS = 4

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
    const itemGap = parseDimension(lt.legendItem.gap as string | number) ?? 6
    const listGap = parseDimension(lt.gap as string | number) ?? 12
    const textGap =
        parseDimension(lt.legendItem.text.gap as string | number) ?? 4
    const separatorColor = String(lt.legendItem.text.separator.color)
    const separatorWidth = parseDimension(
        lt.legendItem.text.separator.width as string | number
    )
    const separatorHeight = parseDimension(
        lt.legendItem.text.separator.height as string | number
    )

    return (
        <View
            style={[
                {
                    flexDirection: layout === 'horizontal' ? 'row' : 'column',
                    flexWrap: layout === 'horizontal' ? 'wrap' : 'nowrap',
                    gap: listGap,
                },
                style,
            ]}
        >
            {items.map((item) => {
                // Web: `!visible ? 0.5 : isDimmed ? 0.3 : 1`. The hover-dim
                // state (0.3) has no touch equivalent, so only hidden applies.
                const opacity = item.visible ? 1 : 0.5
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
                                borderRadius: SWATCH_RADIUS,
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
                                <View
                                    aria-hidden
                                    style={{
                                        width: separatorWidth ?? 1,
                                        height: separatorHeight ?? 9,
                                        backgroundColor: separatorColor,
                                        marginHorizontal: 2,
                                    }}
                                />
                            )}
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

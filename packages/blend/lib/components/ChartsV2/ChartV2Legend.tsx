import type { ChartV2LegendProps } from './chartV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChartV2TokensType } from './chartV2.tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Text from '../Text/Text'
import Seperator from '../common/Seperator'
import { useChartLegend } from './useChartLegend'

const ChartV2Legend = ({
    chartRef,
    chartRefs,
    customLegendItems,
    renderItem,
    layout = 'horizontal',
}: ChartV2LegendProps) => {
    const { legends } = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
    const { chart, allItems, hoveredItem, setHoveredItem, handleClick } =
        useChartLegend(chartRef, chartRefs)

    if (!chart || !allItems.length) return null

    const isVertical = layout === 'vertical'

    return (
        <Block
            as="div"
            display="flex"
            flexDirection={isVertical ? 'column' : 'row'}
            flexWrap="wrap"
            gap={legends.gap}
            alignItems={isVertical ? 'stretch' : 'center'}
            role="list"
            aria-label="Chart legend"
        >
            {allItems.map((item, i) => {
                const key = item.name ?? ''
                const custom = customLegendItems?.find((c) => c.key === key)
                const name = custom?.name ?? key
                const value = custom?.value
                const hasValue = value != null && value !== ''
                const color =
                    custom?.color ??
                    (item as { color?: string }).color ??
                    '#888'
                const visible = Boolean(item.visible)
                const isDimmed = hoveredItem !== null && hoveredItem !== item
                const opacity = !visible ? 0.5 : isDimmed ? 0.3 : 1

                const handlers = {
                    onClick: () => handleClick(item, i),
                    onMouseEnter: () => setHoveredItem(item),
                    onMouseLeave: () => setHoveredItem(null),
                }

                if (renderItem) {
                    return (
                        <Block
                            as="span"
                            key={`${key}-${i}`}
                            role="listitem"
                            opacity={opacity}
                            transition="opacity 0.2s ease"
                            {...handlers}
                        >
                            {renderItem({
                                item,
                                name,
                                visible,
                                color,
                                value,
                                onClick: handlers.onClick,
                            })}
                        </Block>
                    )
                }

                return (
                    <PrimitiveButton
                        key={`${key}-${i}`}
                        display="inline-flex"
                        alignItems="center"
                        gap={legends.legendItem.gap}
                        backgroundColor="transparent"
                        border="none"
                        cursor="pointer"
                        color="inherit"
                        opacity={opacity}
                        transition="opacity 0.2s ease"
                        role="listitem"
                        {...handlers}
                    >
                        <Block
                            as="span"
                            width={12}
                            height={12}
                            borderRadius={4}
                            flexShrink={0}
                            backgroundColor={color}
                            opacity={isDimmed ? 0.3 : 1}
                            transition="opacity 0.2s ease"
                            aria-hidden
                        />
                        <Block
                            as="span"
                            display="inline-flex"
                            alignItems="center"
                            gap={legends.legendItem.text.gap}
                        >
                            <Text
                                data-legend="label"
                                fontSize={legends.legendItem.text.name.fontSize}
                                fontWeight={
                                    legends.legendItem.text.name.fontWeight
                                }
                                color={legends.legendItem.text.name.color}
                                lineHeight={`${legends.legendItem.text.name.lineHeight}px`}
                            >
                                {name}
                            </Text>
                            {hasValue && (
                                <>
                                    <Seperator
                                        color={
                                            legends.legendItem.text.separator
                                                .color
                                        }
                                        height={
                                            legends.legendItem.text.separator
                                                .height
                                        }
                                        width={
                                            legends.legendItem.text.separator
                                                .width
                                        }
                                    />
                                    <Text
                                        data-legend="value"
                                        fontSize={
                                            legends.legendItem.text.value
                                                .fontSize
                                        }
                                        fontWeight={
                                            legends.legendItem.text.value
                                                .fontWeight
                                        }
                                        color={
                                            legends.legendItem.text.value.color
                                        }
                                        lineHeight={`${legends.legendItem.text.value.lineHeight}px`}
                                    >
                                        {value}
                                    </Text>
                                </>
                            )}
                        </Block>
                    </PrimitiveButton>
                )
            })}
        </Block>
    )
}

ChartV2Legend.displayName = 'ChartV2Legend'

export default ChartV2Legend

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
            gap={isVertical ? 8 : 16}
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
                        gap={8}
                        padding={0}
                        margin={0}
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
                            gap={4}
                        >
                            <Text
                                data-legend="label"
                                fontSize={legends.name.fontSize}
                                fontWeight={legends.name.fontWeight}
                                color={legends.name.color}
                                lineHeight={`${legends.name.lineHeight}px`}
                            >
                                {name}
                            </Text>
                            {hasValue && (
                                <>
                                    <Seperator
                                        color={legends.separator.color}
                                        height="9px"
                                        width="1px"
                                    />
                                    <Text
                                        data-legend="value"
                                        fontSize={legends.value.fontSize}
                                        fontWeight={legends.value.fontWeight}
                                        color={legends.value.color}
                                        lineHeight={`${legends.value.lineHeight}px`}
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

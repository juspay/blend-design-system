import type { ChartV3LegendProps } from './chartV3.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ChartV3TokensType } from './chartV3.tokens'
import { useChartV3Legend } from './useChartV3Legend'

const ChartV3Legend = ({
    chartRef,
    chartRefs,
    customLegendItems,
    renderItem,
    layout = 'horizontal',
}: ChartV3LegendProps) => {
    const { legends } = useResponsiveTokens<ChartV3TokensType>('CHARTSV3')
    const { chart, allItems, hoveredItem, setHoveredItem, handleClick } =
        useChartV3Legend(chartRef, chartRefs)

    if (!chart || !allItems.length) return null

    const isVertical = layout === 'vertical'

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                flexWrap: 'wrap',
                gap: legends.gap,
                alignItems: isVertical ? 'stretch' : 'center',
            }}
            role="list"
            aria-label="Chart legend"
        >
            {allItems.map((item, i) => {
                const key = item.key
                const custom = customLegendItems?.find((c) => c.key === key)
                const name = custom?.name ?? item.name
                const value = custom?.value ?? item.value
                const hasValue = value != null && value !== ''
                const color = custom?.color ?? item.color ?? '#888'
                const visible = item.selected
                const isDimmed = hoveredItem !== null && hoveredItem !== item
                const opacity = !visible ? 0.5 : isDimmed ? 0.3 : 1

                const handlers = {
                    onClick: () => handleClick(item, i),
                    onMouseEnter: () => setHoveredItem(item),
                    onMouseLeave: () => setHoveredItem(null),
                }

                if (renderItem) {
                    return (
                        <span
                            key={`${key}-${i}`}
                            data-element="chart-legend"
                            data-id={key}
                            role="listitem"
                            style={{
                                opacity,
                                transition: 'opacity 0.2s ease',
                            }}
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
                        </span>
                    )
                }

                return (
                    <button
                        key={`${key}-${i}`}
                        data-element="chart-legend"
                        data-id={key}
                        type="button"
                        role="listitem"
                        aria-pressed={visible}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: legends.legendItem.gap,
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'inherit',
                            opacity,
                            transition: 'opacity 0.2s ease',
                            padding: 0,
                        }}
                        {...handlers}
                    >
                        <span
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 4,
                                flexShrink: 0,
                                backgroundColor: color,
                                opacity: isDimmed ? 0.3 : 1,
                                transition: 'opacity 0.2s ease',
                            }}
                            aria-hidden
                            data-element="chart-legend-color"
                            data-id={color}
                        />
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: legends.legendItem.text.gap,
                            }}
                        >
                            <span
                                data-legend="label"
                                data-element="chart-legend-text"
                                data-id={key}
                                style={{
                                    fontSize:
                                        legends.legendItem.text.name.fontSize,
                                    fontWeight:
                                        legends.legendItem.text.name.fontWeight,
                                    color: legends.legendItem.text.name.color,
                                    lineHeight: `${legends.legendItem.text.name.lineHeight}px`,
                                }}
                            >
                                {name}
                            </span>
                            {hasValue && (
                                <>
                                    <span
                                        aria-hidden="true"
                                        role="separator"
                                        style={{
                                            backgroundColor:
                                                legends.legendItem.text
                                                    .separator.color,
                                            height: legends.legendItem.text
                                                .separator.height,
                                            width: legends.legendItem.text
                                                .separator.width,
                                        }}
                                    />
                                    <span
                                        data-legend="value"
                                        style={{
                                            fontSize:
                                                legends.legendItem.text.value
                                                    .fontSize,
                                            fontWeight:
                                                legends.legendItem.text.value
                                                    .fontWeight,
                                            color: legends.legendItem.text.value
                                                .color,
                                            lineHeight: `${legends.legendItem.text.value.lineHeight}px`,
                                        }}
                                    >
                                        {value}
                                    </span>
                                </>
                            )}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

ChartV3Legend.displayName = 'ChartV3Legend'

export default ChartV3Legend

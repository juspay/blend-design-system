# ChartV3 Component Documentation

## Purpose

`ChartV3` is the Apache ECharts migration target for Blend charts. It is not a Highcharts compatibility wrapper. Consumers pass native ECharts options and use ECharts instance APIs for events, actions, and imperative chart control.

## Migration Position

- `ChartsV2` remains the Highcharts-backed compatibility layer.
- `ChartsV3` is ECharts-native and should be used for new chart work.
- Highcharts option objects should be migrated to ECharts option objects at call sites.
- External legend behavior is implemented through ECharts `getOption`, `dispatchAction`, and legend events.

## Supported Current Use Cases

- Line, bar, stacked bar, area, scatter, pie, donut, and mixed charts.
- Sankey charts using ECharts `series.type = "sankey"`.
- Outage/x-range style charts using ECharts `series.type = "custom"` with `renderItem`.
- Datetime or category axes through ECharts axis options.
- Custom tooltips and event handlers through ECharts option/events.
- Skeleton, no-data, container, header, fullscreen, and external legend helpers.

## Core API

```typescript
export type ChartV3Options = EChartsOption

export type ChartV3Props = {
    options?: ChartV3Options
    theme?: string | object
    renderer?: 'canvas' | 'svg'
    settings?: SetOptionOpts
    skeleton?: ChartV3SkeletonProps
    noData?: ChartV3NoDataProps | false
    height?: CSSProperties['height']
    width?: CSSProperties['width']
    onChartReady?: (chart: ChartV3) => void
    onEvents?: Record<string, ChartV3EventHandler>
}
```

## Highcharts To ECharts Mapping

| Highcharts V2                                 | ECharts V3                                             |
| --------------------------------------------- | ------------------------------------------------------ |
| `chart.type = "line"` / series `type: "line"` | series `type: "line"`                                  |
| `type: "column"`                              | series `type: "bar"`                                   |
| `type: "bar"`                                 | series `type: "bar"` with categorical axis orientation |
| `plotOptions.column.stacking`                 | series `stack`                                         |
| `type: "area"`                                | series `type: "line"` with `areaStyle`                 |
| `type: "pie"` with `innerSize`                | series `type: "pie"` with `radius: ["x%", "y%"]`       |
| `type: "sankey"` and `keys`                   | series `type: "sankey"` with `data` and `links`        |
| `type: "xrange"`                              | series `type: "custom"` with `renderItem`              |
| `tooltip.formatter`                           | ECharts `tooltip.formatter`                            |
| `HighchartsReactRefObject.chart`              | `ChartV3ReactRefObject.chart` / `getChart()`           |
| `setVisible`, `setState`, `redraw`            | `dispatchAction`, `setOption`, `resize`                |

## Notes

Apache ECharts is Apache-2.0 licensed, so it avoids the Highcharts commercial license requirement. The migration still requires call-site option conversion because the option models are different.

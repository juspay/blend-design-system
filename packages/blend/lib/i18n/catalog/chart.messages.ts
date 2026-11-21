/**
 * Strings for Charts, ChartsV2, StatCard and StatCardV2.
 *
 * Chart data (series names, axis labels, point names) is the consumer's and
 * is interpolated as given. `data-chart`, `data-state` and the Highcharts
 * class names stay English.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const CHART_MESSAGES = {
    'chart.a11y.header': 'Chart header',
    'chart.a11y.container': 'Chart container',
    'chart.a11y.legend': 'Chart legend',
    'chart.a11y.enter-fullscreen': 'Enter fullscreen view',
    'chart.a11y.exit-fullscreen': 'Exit fullscreen view',
    'chart.a11y.collapse': 'Collapse chart',
    'chart.a11y.expand': 'Expand chart',
    'chart.a11y.toggle-series': 'Toggle {name} series visibility',
    'chart.a11y.reset-legend': 'Reset all legend filters',
    'chart.action.show-legend': 'Show Legend',
    'chart.action.hide-legend': 'Hide Legend',
    'chart.label.more-series.one': '+ {count} more',
    'chart.label.more-series.other': '+ {count} more',
    'chart.label.funnel-drop-off': '{value} · {percentage} drop-off',
    'chart.label.sankey-flow': 'Flow',
    'chart.label.sankey-from': 'From:',
    'chart.label.sankey-to': 'To:',
    'chart.label.sankey-value': 'Value:',
    'chart.label.sankey-node': 'Node {id}',
    'chart.label.data-point': 'Data Point',
    'chart.empty.no-data': 'No data available',
    'chart.empty.no-data-subtitle': 'Data will appear here once available',
    'chart.error.invalid-sankey': 'Invalid Sankey data format',
    'chart.error.invalid-sankey-hint': 'Please provide nodes and links',
    'chart.error.unsupported-type': 'Unsupported chart type',
    'chart.error.fullscreen': 'Error entering fullscreen:{error}',

    'stat-card.a11y.help': 'Help for {title}',
    'stat-card.a11y.chart': '{title} chart',
    'stat-card.a11y.chart-unnamed': 'Data chart',
    'stat-card.a11y.change-increase': 'increased by {value}%',
    'stat-card.a11y.change-decrease': 'decreased by {value}%',
    // One whole sentence per trend rather than a `{trend}` word: the trend's
    // form agrees with the rest of the sentence in many languages.
    'stat-card.a11y.chart-trend-increasing.one':
        '{title} chart showing {count} data point with increasing trend',
    'stat-card.a11y.chart-trend-increasing.other':
        '{title} chart showing {count} data points with increasing trend',
    'stat-card.a11y.chart-trend-decreasing.one':
        '{title} chart showing {count} data point with decreasing trend',
    'stat-card.a11y.chart-trend-decreasing.other':
        '{title} chart showing {count} data points with decreasing trend',
    'stat-card.a11y.chart-trend-stable.one':
        '{title} chart showing {count} data point with stable trend',
    'stat-card.a11y.chart-trend-stable.other':
        '{title} chart showing {count} data points with stable trend',
} as const

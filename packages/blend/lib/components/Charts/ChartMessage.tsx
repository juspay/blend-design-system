import { useMessages } from '../../i18n/useMessages'
import { CHART_MESSAGES } from '../../i18n/catalog/chart.messages'

/**
 * `renderChart` is a plain function, not a component, so it cannot call
 * `useMessages`. Its few fixed strings render through this one-line
 * component instead, which resolves to a bare text node, so the DOM is the
 * same as the literal it replaces.
 */
const ChartMessage = ({
    id,
}: {
    id:
        | 'chart.empty.no-data'
        | 'chart.empty.no-data-subtitle'
        | 'chart.error.invalid-sankey'
        | 'chart.error.invalid-sankey-hint'
        | 'chart.error.unsupported-type'
}) => {
    const { m } = useMessages(CHART_MESSAGES)
    return <>{m(id)}</>
}

export default ChartMessage

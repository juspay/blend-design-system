import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import ChartV2 from '../../../lib/components/ChartsV2/ChartV2'
import ChartLegends from '../../../lib/components/Charts/ChartLegend'

vi.mock('highcharts-react-official', () => ({
    __esModule: true,
    HighchartsReact: () => null,
    default: () => null,
}))

const FRENCH: Record<string, string> = {
    'chart.empty.no-data': 'Aucune donnée disponible',
    'chart.empty.no-data-subtitle':
        'Les données apparaîtront ici dès qu’elles seront disponibles',
    'chart.a11y.toggle-series': 'Afficher ou masquer la série {name}',
}
const t = (key: string) => FRENCH[key]

const EMPTY_OPTIONS = { series: [{ type: 'line' as const, data: [] }] }

const legendProps = {
    chartContainerRef: React.createRef<HTMLDivElement>(),
    keys: ['Paid out', 'Failed'],
    colors: [
        { key: 'Paid out', color: '#00A63E' },
        { key: 'Failed', color: '#E5484D' },
    ],
    handleLegendClick: vi.fn(),
    handleLegendEnter: vi.fn(),
    handleLegendLeave: vi.fn(),
    selectedKeys: [],
    setSelectedKeys: vi.fn(),
    hoveredKey: null,
    activeKeys: [],
}

describe('Charts locale', () => {
    it('renders the English ChartV2 empty state with no provider locale', () => {
        render(<ChartV2 options={EMPTY_OPTIONS} />)

        expect(screen.getByText('No data available')).toBeInTheDocument()
        expect(
            screen.getByText('Data will appear here once available')
        ).toBeInTheDocument()
    })

    it('translates the default ChartV2 empty state', () => {
        render(<ChartV2 options={EMPTY_OPTIONS} />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(screen.getByText('Aucune donnée disponible')).toBeInTheDocument()
    })

    it('keeps an explicit noData over the translation', () => {
        render(
            <ChartV2
                options={EMPTY_OPTIONS}
                noData={{ title: 'Nothing yet' }}
            />,
            { providerProps: { locale: 'fr-FR', t } }
        )

        expect(screen.getByText('Nothing yet')).toBeInTheDocument()
        expect(screen.queryByText('Aucune donnée disponible')).toBeNull()
    })

    it('translates the legend toggle names and keeps the series name', async () => {
        render(<ChartLegends {...legendProps} showAllLegends />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(
            await screen.findByLabelText(
                'Afficher ou masquer la série Paid out'
            )
        ).toBeInTheDocument()
    })
})

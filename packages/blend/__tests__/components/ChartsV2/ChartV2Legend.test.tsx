import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '../../test-utils'
import ChartV2Legend from '../../../lib/components/ChartsV2/ChartV2Legend'
import { ChartV2ReactRefObject } from '../../../lib/components/ChartsV2/chartV2.types'

// Shared mock for tokens
vi.mock('../../../lib/hooks/useResponsiveTokens', () => ({
    useResponsiveTokens: vi.fn(() => ({
        legends: {
            gap: 8,
            legendItem: {
                gap: 4,
                shape: {
                    width: 12,
                    height: 12,
                    borderRadius: 4,
                },
                text: {
                    gap: 4,
                    name: {
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: 18,
                        color: '#111827',
                    },
                    value: {
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: 18,
                        color: '#6b7280',
                    },
                    separator: {
                        color: '#6b7280',
                        width: 1,
                        height: 12,
                    },
                },
            },
        },
    })),
}))

const mockUseChartLegendImpl = vi.fn()

vi.mock('../../../lib/components/ChartsV2/useChartLegend', () => ({
    useChartLegend: (...args: unknown[]) => mockUseChartLegendImpl(...args),
}))

afterEach(() => {
    vi.clearAllMocks()
})

describe('ChartV2Legend', () => {
    it('returns null when there is no chart or items', () => {
        mockUseChartLegendImpl.mockReturnValueOnce({
            chart: null,
            allItems: [],
            hoveredItem: null,
            setHoveredItem: vi.fn(),
            handleClick: vi.fn(),
        })

        const { container } = render(
            <ChartV2Legend
                chartRef={
                    null as unknown as React.RefObject<ChartV2ReactRefObject>
                }
            />
        )

        expect(container).toBeEmptyDOMElement()
    })

    it('renders interactive legend buttons from items and customLegendItems', () => {
        const itemA = { name: 'Overall', color: '#0ea5e9', visible: true }
        const itemB = { name: 'goindigo', color: '#ef4444', visible: true }

        const setHoveredItem = vi.fn()
        const handleClick = vi.fn()

        mockUseChartLegendImpl.mockReturnValueOnce({
            chart: {},
            allItems: [itemA, itemB],
            hoveredItem: null,
            setHoveredItem,
            handleClick,
        })

        render(
            <ChartV2Legend
                chartRef={
                    null as unknown as React.RefObject<ChartV2ReactRefObject>
                }
                customLegendItems={[
                    {
                        key: 'Overall',
                        name: 'Overall',
                        color: '#0ea5e9',
                        value: 54,
                    },
                    {
                        key: 'goindigo',
                        name: 'goindigo',
                        color: '#ef4444',
                        value: 10,
                    },
                ]}
            />
        )

        const list = screen.getByRole('list', { name: 'Chart legend' })
        const items = screen.getAllByRole('listitem')
        expect(list).toBeInTheDocument()
        expect(items).toHaveLength(2)

        expect(
            screen.getByText('Overall', { selector: '[data-legend="label"]' })
        ).toBeInTheDocument()
        expect(
            screen.getByText('goindigo', {
                selector: '[data-legend="label"]',
            })
        ).toBeInTheDocument()

        expect(
            screen.getByText('54', { selector: '[data-legend="value"]' })
        ).toBeInTheDocument()
        expect(
            screen.getByText('10', { selector: '[data-legend="value"]' })
        ).toBeInTheDocument()
    })

    it('supports custom renderItem and vertical layout', () => {
        const itemA = { name: 'Overall', color: '#0ea5e9', visible: true }
        const itemB = { name: 'goindigo', color: '#ef4444', visible: true }

        mockUseChartLegendImpl.mockReturnValueOnce({
            chart: {},
            allItems: [itemA, itemB],
            hoveredItem: null,
            setHoveredItem: vi.fn(),
            handleClick: vi.fn(),
        })

        render(
            <ChartV2Legend
                chartRef={
                    null as unknown as React.RefObject<ChartV2ReactRefObject>
                }
                layout="vertical"
                renderItem={({ name, value }) => (
                    <div data-testid="custom-item">
                        {name}-{value ?? ''}
                    </div>
                )}
                customLegendItems={[
                    {
                        key: 'Overall',
                        name: 'Overall',
                        color: '#0ea5e9',
                        value: 54,
                    },
                    {
                        key: 'goindigo',
                        name: 'goindigo',
                        color: '#ef4444',
                        value: 10,
                    },
                ]}
            />
        )

        const list = screen.getByRole('list', { name: 'Chart legend' })
        expect(list).toBeInTheDocument()
        expect(screen.getAllByTestId('custom-item')).toHaveLength(2)
    })
})

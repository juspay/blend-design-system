import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import ChartLegends from '../../../lib/components/Charts/ChartLegend'

const legendProps = {
    chartContainerRef: React.createRef<HTMLDivElement>(),
    keys: ['Paid out', 'Payout in progress', 'Failed', 'Refunded'],
    colors: [
        { key: 'Paid out', color: '#00A63E' },
        { key: 'Payout in progress', color: '#D98A00' },
        { key: 'Failed', color: '#E5484D' },
        { key: 'Refunded', color: '#8B5CF6' },
    ],
    handleLegendClick: vi.fn(),
    handleLegendEnter: vi.fn(),
    handleLegendLeave: vi.fn(),
    selectedKeys: [],
    setSelectedKeys: vi.fn(),
    hoveredKey: null,
    activeKeys: [],
}

describe('ChartLegends', () => {
    it('shows every legend item without the overflow menu when showAllLegends is true', async () => {
        render(<ChartLegends {...legendProps} showAllLegends />)

        await waitFor(() => {
            expect(screen.getByText('Paid out')).toBeInTheDocument()
            expect(screen.getByText('Payout in progress')).toBeInTheDocument()
            expect(screen.getByText('Failed')).toBeInTheDocument()
            expect(screen.getByText('Refunded')).toBeInTheDocument()
        })

        expect(screen.queryByText(/\+ \d+ more/)).not.toBeInTheDocument()
    })
})

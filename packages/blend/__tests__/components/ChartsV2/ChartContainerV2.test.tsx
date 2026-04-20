import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../test-utils'
import ChartContainerV2 from '../../../lib/components/ChartsV2/ChartContainerV2'

// Stub tokens so we don’t depend on the full theme
vi.mock('../../../lib/hooks/useResponsiveTokens', () => ({
    useResponsiveTokens: vi.fn(() => ({
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    })),
}))

describe('ChartContainerV2', () => {
    it('renders a section with chart container semantics and passes through children', () => {
        const { getByTestId } = render(
            <ChartContainerV2>
                <div data-testid="inner">content</div>
            </ChartContainerV2>
        )

        const inner = getByTestId('inner')
        const container = inner.parentElement

        expect(container).not.toBeNull()
        if (!container) return

        expect(container.tagName.toLowerCase()).toBe('section')
        expect(container).toHaveAttribute('role', 'group')
        expect(container).toHaveAttribute(
            'aria-roledescription',
            'Chart container'
        )
        expect(container).toHaveAttribute('data-chart', 'Chart-Container')
    })
})

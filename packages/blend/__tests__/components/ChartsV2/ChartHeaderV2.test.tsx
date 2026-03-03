import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../test-utils'
import ChartHeaderV2 from '../../../lib/components/ChartsV2/ChartHeaderV2'

// Stub tokens so we don't depend on real theme config
vi.mock('../../../lib/hooks/useResponsiveTokens', () => ({
    useResponsiveTokens: vi.fn(() => ({
        header: {
            padding: {
                top: 8,
                right: 16,
                bottom: 8,
                left: 16,
            },
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
        },
    })),
}))

describe('ChartHeaderV2', () => {
    it('renders children inside a header slot with correct data attribute', () => {
        const { getByTestId } = render(
            <ChartHeaderV2>
                <div data-testid="header-child">Header</div>
            </ChartHeaderV2>
        )

        const child = getByTestId('header-child')
        const header = child.parentElement
        expect(header).not.toBeNull()
        if (!header) return

        expect(header).toHaveAttribute('data-element', 'chart-header')
    })
})

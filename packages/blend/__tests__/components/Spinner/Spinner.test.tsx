import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import Spinner from '../../../lib/components/Spinner'

describe('Spinner', () => {
    it('renders a status with a visually hidden default label', () => {
        const { container } = render(<Spinner />)

        expect(
            screen.getByRole('status', { name: 'Loading' })
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-spinner-indicator]')
        ).toHaveAttribute('aria-hidden', 'true')
        expect(screen.getByText('Loading')).toBeInTheDocument()
    })

    it('supports token-backed size and semantic color props', () => {
        const { container, rerender } = render(
            <Spinner size="lg" color="primary" label="Fetching records" />
        )

        const spinner = container.querySelector('[data-spinner]')
        expect(spinner).toHaveAttribute('data-spinner-size', 'lg')
        expect(spinner).toHaveAttribute('data-spinner-color', 'primary')
        expect(
            screen.getByRole('status', { name: 'Fetching records' })
        ).toBeInTheDocument()

        rerender(<Spinner color="inverse" />)
        expect(
            container.querySelector('[data-spinner-color="inverse"]')
        ).toBeInTheDocument()
    })

    it('centers over a relative parent when overlay is enabled', () => {
        const { container } = render(
            <div style={{ position: 'relative', height: 120 }}>
                <Spinner overlay />
            </div>
        )

        const spinner = container.querySelector('[data-spinner]')
        expect(spinner).toHaveStyle({
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
        })
        expect(spinner).toHaveAttribute('data-spinner-overlay', 'true')
    })

    it('renders a static indicator for reduced motion', () => {
        const originalMatchMedia = window.matchMedia
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }))

        const { container } = render(<Spinner />)

        expect(
            container.querySelector('animateTransform')
        ).not.toBeInTheDocument()
        window.matchMedia = originalMatchMedia
    })
})

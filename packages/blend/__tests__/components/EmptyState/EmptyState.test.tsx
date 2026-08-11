import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import EmptyState from '../../../lib/components/EmptyState'

describe('EmptyState', () => {
    it('renders a labeled section with heading semantics', () => {
        render(
            <EmptyState
                title="Nothing here yet"
                description="Create an item to get started."
                illustration={<span data-testid="illustration">✦</span>}
            />
        )

        expect(
            screen.getByRole('heading', { level: 2, name: 'Nothing here yet' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('region', { name: 'Nothing here yet' })
        ).toBeInTheDocument()
        expect(
            screen.getByText('Create an item to get started.')
        ).toBeInTheDocument()
        expect(screen.getByTestId('illustration')).toBeInTheDocument()
    })

    it('renders object actions as buttons and preserves action slots', async () => {
        const primary = vi.fn()
        const secondary = vi.fn()
        const { user } = render(
            <EmptyState
                title="No results"
                primaryAction={{ label: 'Create', onClick: primary }}
                secondaryAction={
                    <button type="button" onClick={secondary}>
                        Import
                    </button>
                }
            />
        )

        await user.click(screen.getByRole('button', { name: 'Create' }))
        await user.click(screen.getByRole('button', { name: 'Import' }))
        expect(primary).toHaveBeenCalledTimes(1)
        expect(secondary).toHaveBeenCalledTimes(1)
    })

    it('does not render an empty action row for conditional slots', () => {
        const { container } = render(
            <EmptyState title="No results" primaryAction={false} />
        )

        expect(
            container.querySelector('[data-element="actions"]')
        ).not.toBeInTheDocument()
    })

    it.each(['sm', 'md', 'lg'] as const)('supports %s size', (size) => {
        const { container } = render(<EmptyState title="Empty" size={size} />)
        const emptyState = container.querySelector('[data-empty-state]')
        expect(emptyState).toHaveAttribute('data-empty-state-size', size)
        expect(emptyState).toHaveStyle({
            minHeight: { sm: '144px', md: '200px', lg: '280px' }[size],
        })
    })
})

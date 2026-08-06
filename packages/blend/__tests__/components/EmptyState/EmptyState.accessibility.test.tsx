import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'jest-axe'
import { render, screen } from '../../test-utils'
import EmptyState from '../../../lib/components/EmptyState'

describe('EmptyState Accessibility', () => {
    it('uses a level-two heading and passes axe', async () => {
        const { container } = render(
            <EmptyState
                title="No saved searches"
                description="Save a search to find it quickly next time."
            />
        )

        expect(
            screen.getByRole('heading', { level: 2, name: 'No saved searches' })
        ).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })
})

import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'jest-axe'
import { render, screen } from '../../test-utils'
import Spinner from '../../../lib/components/Spinner'

describe('Spinner Accessibility', () => {
    it('exposes an accessible status and passes axe', async () => {
        const { container } = render(<Spinner label="Loading results" />)

        expect(
            screen.getByRole('status', { name: 'Loading results' })
        ).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })
})

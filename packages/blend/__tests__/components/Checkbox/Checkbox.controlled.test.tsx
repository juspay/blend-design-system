import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import { Checkbox } from '../../../lib/components/Checkbox'

describe('Checkbox controlled vs uncontrolled', () => {
    it('toggles visually when only onCheckedChange is provided', () => {
        const handleChange = vi.fn()

        render(<Checkbox onCheckedChange={handleChange}>Uncontrolled</Checkbox>)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()

        fireEvent.click(checkbox)

        expect(handleChange).toHaveBeenCalledWith(true)
        expect(checkbox).toBeChecked()
        expect(checkbox).toHaveAttribute('data-state', 'checked')

        fireEvent.click(checkbox)

        expect(handleChange).toHaveBeenCalledWith(false)
        expect(checkbox).not.toBeChecked()
        expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    })

    it('respects defaultChecked in uncontrolled mode', () => {
        render(<Checkbox defaultChecked>Default checked</Checkbox>)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()

        fireEvent.click(checkbox)
        expect(checkbox).not.toBeChecked()
    })

    it('does not toggle visually when controlled without updating checked', () => {
        const handleChange = vi.fn()

        render(
            <Checkbox checked={false} onCheckedChange={handleChange}>
                Controlled
            </Checkbox>
        )

        const checkbox = screen.getByRole('checkbox')
        fireEvent.click(checkbox)

        expect(handleChange).toHaveBeenCalledWith(true)
        expect(checkbox).not.toBeChecked()
    })
})

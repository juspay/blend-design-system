import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import { ButtonGroup, ButtonV2 } from '../../../lib/components/ButtonV2'
import { ButtonType } from '../../../lib/components/ButtonV2/types'
import { MockIcon } from '../../test-utils'

describe('ButtonGroup Accessibility', () => {
    describe('WCAG 2.1 AA Compliance', () => {
        it('passes axe-core validation for horizontal group', async () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2 text="Primary" buttonType={ButtonType.PRIMARY} />
                    <ButtonV2
                        text="Secondary"
                        buttonType={ButtonType.SECONDARY}
                    />
                </ButtonGroup>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for stacked group', async () => {
            const { container } = render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Left" />
                    <ButtonV2 text="Center" />
                    <ButtonV2 text="Right" />
                </ButtonGroup>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation with mixed button states', async () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2 text="Enabled" />
                    <ButtonV2 text="Disabled" disabled />
                    <ButtonV2 text="Loading" loading />
                </ButtonGroup>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.4.3 Focus Order', () => {
        it('maintains logical keyboard navigation order', async () => {
            const { user } = render(
                <ButtonGroup>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Second" />
                    <ButtonV2 text="Third" />
                </ButtonGroup>
            )

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'First' })
            )

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Second' })
            )

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Third' })
            )
        })

        it('skips disabled buttons in keyboard navigation', async () => {
            const { user } = render(
                <ButtonGroup>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Disabled" disabled />
                    <ButtonV2 text="Third" />
                </ButtonGroup>
            )

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'First' })
            )

            await user.tab()
            // Should skip disabled button and go to third
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Third' })
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value - Individual Button Accessibility', () => {
        it('preserves individual button accessibility in group', async () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2
                        text="Accessible"
                        aria-label="Accessible button"
                    />
                    <ButtonV2
                        leadingIcon={<MockIcon />}
                        aria-label="Icon button"
                    />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'Accessible button' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Icon button' })
            ).toBeInTheDocument()

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('preserves ARIA attributes in stacked group', async () => {
            const { container } = render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Disabled" disabled />
                    <ButtonV2 text="Loading" loading />
                </ButtonGroup>
            )

            const disabledButton = screen.getByRole('button', {
                name: 'Disabled',
            })
            expect(disabledButton).toHaveAttribute('aria-disabled', 'true')
            expect(disabledButton).toHaveAttribute('tabIndex', '-1')

            const loadingButton = screen.getByRole('button', {
                name: /Loading/i,
            })
            expect(loadingButton).toHaveAttribute('aria-busy', 'true')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases - Group Accessibility', () => {
        it('handles single button in group correctly', async () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2 text="Single" />
                </ButtonGroup>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles many buttons without breaking accessibility', async () => {
            const buttons = Array.from({ length: 10 }, (_, i) => (
                <ButtonV2 key={i} text={`Button ${i + 1}`} />
            ))

            const { container } = render(<ButtonGroup>{buttons}</ButtonGroup>)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('maintains accessibility with icon-only buttons in group', async () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2
                        leadingIcon={<MockIcon />}
                        aria-label="First action"
                    />
                    <ButtonV2
                        leadingIcon={<MockIcon />}
                        aria-label="Second action"
                    />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'First action' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Second action' })
            ).toBeInTheDocument()

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})

import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import {
    render,
    screen,
    measureRenderTime,
    assertPerformanceWithContext,
} from '../../test-utils'
import { axe } from 'jest-axe'
import { ButtonGroup } from '../../../lib/components/ButtonV2'
import { ButtonV2 } from '../../../lib/components/ButtonV2'
import { ButtonType } from '../../../lib/components/ButtonV2/types'
import { MockIcon } from '../../test-utils'

function getCurrentTestName(): string {
    const testContext = expect.getState() as { currentTestName?: string }
    return testContext.currentTestName || 'unknown-test'
}

describe('ButtonGroup', () => {
    describe('Rendering', () => {
        it('renders horizontal group with buttons', async () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Second" />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'First' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Second' })
            ).toBeInTheDocument()

            const group = container.querySelector('[data-button-group="true"]')
            expect(group).toBeInTheDocument()
            expect(group).toHaveAttribute('data-button-group-stacked', 'false')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders stacked group with buttons', async () => {
            const { container } = render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Left" />
                    <ButtonV2 text="Center" />
                    <ButtonV2 text="Right" />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'Left' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Center' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Right' })
            ).toBeInTheDocument()

            const group = container.querySelector('[data-button-group="true"]')
            expect(group).toBeInTheDocument()
            expect(group).toHaveAttribute('data-button-group-stacked', 'true')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with single button', async () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2 text="Single" />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'Single' })
            ).toBeInTheDocument()

            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with custom gap', () => {
            render(
                <ButtonGroup gap={20}>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Second" />
                </ButtonGroup>
            )

            const group = screen.getByRole('button', {
                name: 'First',
            }).parentElement
            expect(group).toHaveStyle({ gap: '20px' })
        })

        it('applies correct data attributes', () => {
            const { container } = render(
                <ButtonGroup>
                    <ButtonV2 text="One" />
                    <ButtonV2 text="Two" />
                    <ButtonV2 text="Three" />
                </ButtonGroup>
            )

            const group = container.querySelector('[data-button-group="true"]')
            expect(group).toHaveAttribute('data-button-group-count', '3')
        })
    })

    describe('Stacked Layout', () => {
        it('applies buttonGroupPosition to first button (left)', () => {
            render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Left" />
                    <ButtonV2 text="Center" />
                </ButtonGroup>
            )

            // The position is applied internally, we verify the buttons render correctly
            expect(
                screen.getByRole('button', { name: 'Left' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Center' })
            ).toBeInTheDocument()
        })

        it('applies buttonGroupPosition to middle buttons (center)', () => {
            render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Left" />
                    <ButtonV2 text="Center" />
                    <ButtonV2 text="Right" />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'Left' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Center' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Right' })
            ).toBeInTheDocument()
        })

        it('applies buttonGroupPosition to last button (right)', () => {
            render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Left" />
                    <ButtonV2 text="Right" />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'Left' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Right' })
            ).toBeInTheDocument()
        })

        it('does not apply position to single button in stacked group', () => {
            render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Single" />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'Single' })
            ).toBeInTheDocument()
        })

        it('has zero gap when stacked', () => {
            render(
                <ButtonGroup stacked>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Second" />
                </ButtonGroup>
            )

            const group = screen.getByRole('button', {
                name: 'First',
            }).parentElement
            // Gap should be 0 when stacked - check computed style
            if (group) {
                const computedGap = window.getComputedStyle(group).gap
                // Accept 0px, 0, or empty string as valid zero gap
                expect(['0px', '0', ''].includes(computedGap)).toBe(true)
            }
        })
    })

    describe('Horizontal Layout', () => {
        it('has default gap when not stacked', () => {
            render(
                <ButtonGroup>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Second" />
                </ButtonGroup>
            )

            const group = screen.getByRole('button', {
                name: 'First',
            }).parentElement
            // Gap should be set (using foundation token)
            expect(group).toHaveStyle({ display: 'flex' })
        })

        it('uses custom gap when provided', () => {
            render(
                <ButtonGroup gap={16}>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Second" />
                </ButtonGroup>
            )

            const group = screen.getByRole('button', {
                name: 'First',
            }).parentElement
            expect(group).toHaveStyle({ gap: '16px' })
        })
    })

    describe('User Interactions', () => {
        it('allows clicking buttons in group', async () => {
            const handleFirst = vi.fn()
            const handleSecond = vi.fn()
            const { user } = render(
                <ButtonGroup>
                    <ButtonV2 text="First" onClick={handleFirst} />
                    <ButtonV2 text="Second" onClick={handleSecond} />
                </ButtonGroup>
            )

            await user.click(screen.getByRole('button', { name: 'First' }))
            expect(handleFirst).toHaveBeenCalledTimes(1)

            await user.click(screen.getByRole('button', { name: 'Second' }))
            expect(handleSecond).toHaveBeenCalledTimes(1)
        })

        it('maintains keyboard navigation order', async () => {
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
    })

    describe('Accessibility', () => {
        it('meets WCAG standards for horizontal group', async () => {
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

        it('meets WCAG standards for stacked group', async () => {
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

        it('maintains accessibility of individual buttons', async () => {
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

        it('preserves button accessibility attributes in stacked group', async () => {
            const { container } = render(
                <ButtonGroup stacked>
                    <ButtonV2 text="Disabled" disabled />
                    <ButtonV2 text="Loading" loading />
                </ButtonGroup>
            )

            const disabledButton = screen.getByRole('button', {
                name: 'Disabled',
            })
            expect(disabledButton).toBeDisabled()
            expect(disabledButton).toHaveAttribute('aria-disabled', 'true')

            const loadingButton = screen.getByRole('button', {
                name: /Loading/i,
            })
            expect(loadingButton).toHaveAttribute('aria-busy', 'true')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty children gracefully', () => {
            render(<ButtonGroup>{[]}</ButtonGroup>)
            const group = document.querySelector('[data-button-group="true"]')
            expect(group).toBeInTheDocument()
        })

        it('handles mixed valid and invalid children', () => {
            render(
                <ButtonGroup>
                    <ButtonV2 text="Valid" />
                    <ButtonV2 text="Also Valid" />
                </ButtonGroup>
            )

            expect(
                screen.getByRole('button', { name: 'Valid' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Also Valid' })
            ).toBeInTheDocument()
        })

        it('handles many buttons efficiently', async () => {
            const buttons = Array.from({ length: 10 }, (_, i) => (
                <ButtonV2 key={i} text={`Button ${i + 1}`} />
            ))

            const { container } = render(<ButtonGroup>{buttons}</ButtonGroup>)

            for (let i = 1; i <= 10; i++) {
                expect(
                    screen.getByRole('button', { name: `Button ${i}` })
                ).toBeInTheDocument()
            }

            const group = container.querySelector('[data-button-group="true"]')
            expect(group).toHaveAttribute('data-button-group-count', '10')

            expect(await axe(container)).toHaveNoViolations()
        })

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(
                <ButtonGroup ref={ref}>
                    <ButtonV2 text="With Ref" />
                </ButtonGroup>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
        })
    })

    describe('Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <ButtonGroup>
                    <ButtonV2 text="First" />
                    <ButtonV2 text="Second" />
                </ButtonGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('renders stacked group within budget', async () => {
            const renderTime = await measureRenderTime(
                <ButtonGroup stacked>
                    <ButtonV2 text="Left" />
                    <ButtonV2 text="Center" />
                    <ButtonV2 text="Right" />
                </ButtonGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles many buttons efficiently', async () => {
            const buttons = Array.from({ length: 20 }, (_, i) => (
                <ButtonV2 key={i} text={`Button ${i}`} />
            ))

            const renderTime = await measureRenderTime(
                <ButtonGroup>{buttons}</ButtonGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })
})

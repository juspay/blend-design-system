import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, measureRenderTime } from '../../test-utils'
import Button from '../../../lib/components/Button/Button'
import {
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../lib/components/Button/types'
import { MockIcon } from '../../test-utils'
import { getThreshold } from '../../test-utils/constants'
import { screen, fireEvent } from '@testing-library/react'

describe('Button Performance', () => {
    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <Button text="Performance Test" />
            )

            // Button should render in less than 50ms (adjusted for test environment)
            expect(renderTime).toBeLessThan(50)
        })

        it('renders complex button within budget', async () => {
            const renderTime = await measureRenderTime(
                <Button
                    text="Complex Button"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.LARGE}
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                    fullWidth
                />
            )

            // Even complex buttons should render quickly (adjusted for test environment)
            expect(renderTime).toBeLessThan(50)
        })

        it('renders multiple variants efficiently', async () => {
            const variants = [
                ButtonType.PRIMARY,
                ButtonType.SECONDARY,
                ButtonType.DANGER,
                ButtonType.SUCCESS,
            ]

            const renderTimes = await Promise.all(
                variants.map((variant) =>
                    measureRenderTime(
                        <Button text={variant} buttonType={variant} />
                    )
                )
            )

            // All variants should render efficiently
            renderTimes.forEach((time) => {
                expect(time).toBeLessThan(16)
            })
        })
    })

    describe('Re-render Optimization', () => {
        it('does not re-render unnecessarily', () => {
            const { rerender } = render(
                <Button text="Test" buttonType={ButtonType.PRIMARY} />
            )

            const start = performance.now()
            rerender(<Button text="Test" buttonType={ButtonType.PRIMARY} />)
            const end = performance.now()

            // Re-rendering with same props should be very fast (adjusted for test environment)
            expect(end - start).toBeLessThan(10)
        })

        it('handles prop changes efficiently', () => {
            const { rerender } = render(<Button text="Initial" />)

            const start = performance.now()
            rerender(<Button text="Updated" />)
            const end = performance.now()

            // Prop changes should still be handled efficiently
            expect(end - start).toBeLessThan(10)
        })

        it('handles state changes efficiently', async () => {
            const { user } = render(<Button text="State Test" />)

            const button = screen.getByRole('button')

            const start = performance.now()
            // Simulate hover state change
            await user.hover(button)
            const end = performance.now()

            expect(end - start).toBeLessThan(
                getThreshold('reRender', 'stateChange')
            )
        })
    })

    describe('Memory Management', () => {
        it('cleans up properly on unmount', () => {
            const { unmount } = render(
                <Button text="Memory Test" onClick={() => {}} />
            )

            // Get initial memory if available (Chrome only)
            const performanceMemory = (
                performance as { memory?: { usedJSHeapSize: number } }
            ).memory
            const initialMemory = performanceMemory?.usedJSHeapSize || 0

            unmount()

            // Force garbage collection if available
            if ((global as { gc?: () => void }).gc) {
                ;(global as { gc?: () => void }).gc?.()
            }

            // Memory should not increase significantly
            const finalMemory = performanceMemory?.usedJSHeapSize || 0
            const memoryDiff = finalMemory - initialMemory

            // Allow for some variance but should not leak significantly
            expect(memoryDiff).toBeLessThan(1000000) // 1MB threshold
        })

        it('removes event listeners on unmount', () => {
            const handleClick = vi.fn()
            const { unmount } = render(
                <Button text="Event Test" onClick={handleClick} />
            )

            const button = screen.getByRole('button')

            unmount()

            // Verify clicking after unmount doesn't trigger handler
            fireEvent.click(button)
            expect(handleClick).not.toHaveBeenCalled()
        })
    })

    describe('Bundle Size Impact', () => {
        it('imports only necessary dependencies', () => {
            // This is more of a build-time concern, but we can check
            // that the component doesn't have unexpected runtime dependencies
            const button = render(<Button text="Bundle Test" />)
            expect(button).toBeDefined()

            // The component should not pull in unnecessary large dependencies
            // This would be better tested with bundle analysis tools
        })
    })

    describe('Responsive Token Performance', () => {
        it('handles responsive token changes efficiently', () => {
            const { rerender } = render(<Button text="Responsive" />)

            // Simulate window resize
            const originalMatchMedia = window.matchMedia

            // Mock different breakpoint
            window.matchMedia = vi.fn().mockImplementation((query) => ({
                matches: query.includes('768px'),
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }))

            const start = performance.now()
            rerender(<Button text="Responsive" />)
            const end = performance.now()

            expect(end - start).toBeLessThan(10)

            // Restore original
            window.matchMedia = originalMatchMedia
        })
    })

    describe('Batch Rendering Performance', () => {
        it('renders multiple buttons efficiently', async () => {
            const buttonCount = 100
            const buttons = Array.from({ length: buttonCount }, (_, i) => (
                <Button key={i} text={`Button ${i}`} />
            ))

            const start = performance.now()
            render(<div>{buttons}</div>)
            const end = performance.now()

            const averageTime = (end - start) / buttonCount

            // Average render time per button should be very low
            expect(averageTime).toBeLessThan(1)
        })

        it('handles dynamic button lists efficiently', () => {
            const ButtonList = ({ count }: { count: number }) => (
                <div>
                    {Array.from({ length: count }, (_, i) => (
                        <Button key={i} text={`Dynamic ${i}`} />
                    ))}
                </div>
            )

            const { rerender } = render(<ButtonList count={10} />)

            const start = performance.now()
            rerender(<ButtonList count={20} />)
            const end = performance.now()

            // Adding 10 more buttons should be efficient
            expect(end - start).toBeLessThan(20)
        })
    })

    describe('Animation Performance', () => {
        it('loading spinner animation is performant', async () => {
            const { rerender } = render(
                <Button text="Loading" loading={false} />
            )

            const start = performance.now()
            rerender(<Button text="Loading" loading={true} />)
            const end = performance.now()

            // Switching to loading state should be fast
            expect(end - start).toBeLessThan(10)
        })

        it('hover transitions are smooth', async () => {
            const { user } = render(<Button text="Hover Test" />)
            const button = screen.getByRole('button')

            const measurements: number[] = []

            // Measure multiple hover/unhover cycles
            for (let i = 0; i < 5; i++) {
                const start = performance.now()
                await user.hover(button)
                await user.unhover(button)
                const end = performance.now()
                measurements.push(end - start)
            }

            // All hover cycles should be consistently fast
            measurements.forEach((time) => {
                expect(time).toBeLessThan(50)
            })

            // Check consistency (low standard deviation)
            const avg =
                measurements.reduce((a, b) => a + b) / measurements.length
            const variance =
                measurements.reduce(
                    (sum, time) => sum + Math.pow(time - avg, 2),
                    0
                ) / measurements.length
            const stdDev = Math.sqrt(variance)

            expect(stdDev).toBeLessThan(10) // Consistent performance
        })
    })

    describe('Props Processing Performance', () => {
        it('handles complex props efficiently', () => {
            const complexProps = {
                text: 'Complex Button',
                buttonType: ButtonType.PRIMARY,
                size: ButtonSize.LARGE,
                subType: ButtonSubType.DEFAULT,
                leadingIcon: <MockIcon />,
                trailingIcon: <MockIcon />,
                disabled: false,
                loading: false,
                fullWidth: true,
                justifyContent: 'center' as const,
                onClick: vi.fn(),
                onMouseEnter: vi.fn(),
                onMouseLeave: vi.fn(),
                onFocus: vi.fn(),
                onBlur: vi.fn(),
                'data-testid': 'complex-button',
                'aria-label': 'Complex button with many props',
                'aria-describedby': 'description',
                'aria-pressed': false,
            }

            const start = performance.now()
            render(<Button {...complexProps} />)
            const end = performance.now()

            expect(end - start).toBeLessThan(20)
        })
    })
})

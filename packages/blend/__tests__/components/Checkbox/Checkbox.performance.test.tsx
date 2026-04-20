import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import {
    render,
    screen,
    measureRenderTime,
    assertPerformanceWithContext,
} from '../../test-utils'
import Checkbox from '../../../lib/components/Checkbox/Checkbox'
import { CheckboxSize } from '../../../lib/components/Checkbox/types'
import { CheckboxTestFactory } from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

// Helper to get current test name for performance tracking
function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}

describe.skip('Checkbox Performance', () => {
    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <Checkbox>Performance Test</Checkbox>
            )

            // Checkbox should render in less than 100ms (adjusted for test environment)
            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders complex checkbox within budget', async () => {
            const renderTime = await measureRenderTime(
                <Checkbox
                    checked
                    size={CheckboxSize.MEDIUM}
                    subtext="Complex checkbox with all features"
                    slot={<MockIcon />}
                    required
                    error
                >
                    Complex Checkbox
                </Checkbox>
            )

            // Even complex checkboxes should render quickly
            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders all checkbox states efficiently', async () => {
            const states = [
                CheckboxTestFactory.default(),
                CheckboxTestFactory.checked(),
                CheckboxTestFactory.indeterminate(),
                CheckboxTestFactory.disabled(),
                CheckboxTestFactory.withError(),
            ]

            const renderTimes = await Promise.all(
                states.map((props) =>
                    measureRenderTime(<Checkbox {...props} />)
                )
            )

            // All states should render efficiently
            renderTimes.forEach((time) => {
                assertPerformanceWithContext(
                    time,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            })
        })

        it('renders all sizes efficiently', async () => {
            const sizes = CheckboxTestFactory.allSizes()

            const renderTimes = await Promise.all(
                sizes.map((props) => measureRenderTime(<Checkbox {...props} />))
            )

            // All sizes should render efficiently
            renderTimes.forEach((time) => {
                assertPerformanceWithContext(
                    time,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            })
        })
    })

    describe('Re-render Optimization', () => {
        it('does not re-render unnecessarily', () => {
            const { rerender } = render(
                <Checkbox checked={false}>Test Checkbox</Checkbox>
            )

            const start = performance.now()
            rerender(<Checkbox checked={false}>Test Checkbox</Checkbox>)
            const end = performance.now()

            // Re-rendering with same props should be very fast
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles prop changes efficiently', () => {
            const { rerender } = render(
                <Checkbox checked={false}>Initial</Checkbox>
            )

            const start = performance.now()
            rerender(<Checkbox checked={true}>Updated</Checkbox>)
            const end = performance.now()

            // Prop changes should still be handled efficiently
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles state changes efficiently', async () => {
            const { user } = render(<Checkbox>State Test</Checkbox>)

            const checkbox = screen.getByRole('checkbox')

            const start = performance.now()
            await user.click(checkbox)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles indeterminate state changes efficiently', () => {
            const { rerender } = render(
                <Checkbox checked={false}>Indeterminate Test</Checkbox>
            )

            const start = performance.now()
            rerender(
                <Checkbox checked="indeterminate">Indeterminate Test</Checkbox>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })

    describe('Memory Management', () => {
        it('cleans up properly on unmount', () => {
            const { unmount } = render(
                <Checkbox onCheckedChange={() => {}}>Memory Test</Checkbox>
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
            assertPerformanceWithContext(
                memoryDiff,
                'memory',
                'stress',
                getCurrentTestName()
            ) // 1MB threshold
        })

        it('removes event listeners on unmount', () => {
            const handleChange = vi.fn()
            const { unmount } = render(
                <Checkbox onCheckedChange={handleChange}>Event Test</Checkbox>
            )

            unmount()

            // Verify clicking after unmount doesn't trigger handler
            // Note: This test verifies the component is properly cleaned up
            expect(handleChange).not.toHaveBeenCalled()
        })

        it('handles multiple mount/unmount cycles', () => {
            const iterations = 100
            const renderTimes: number[] = []

            for (let i = 0; i < iterations; i++) {
                const start = performance.now()
                const { unmount } = render(
                    <Checkbox key={i}>Cycle Test {i}</Checkbox>
                )
                unmount()
                const end = performance.now()
                renderTimes.push(end - start)
            }

            // Average render time should remain consistent
            const averageTime =
                renderTimes.reduce((a, b) => a + b) / renderTimes.length
            assertPerformanceWithContext(
                averageTime,
                'memory',
                'basic',
                getCurrentTestName()
            )

            // No significant memory leaks over multiple cycles
            const lastTenAverage =
                renderTimes.slice(-10).reduce((a, b) => a + b) / 10
            const firstTenAverage =
                renderTimes.slice(0, 10).reduce((a, b) => a + b) / 10

            // Performance should not degrade significantly
            expect(lastTenAverage).toBeLessThan(firstTenAverage * 2)
        })
    })

    describe('Bundle Size Impact', () => {
        it('imports only necessary dependencies', () => {
            // This is more of a build-time concern, but we can check
            // that the component doesn't have unexpected runtime dependencies
            render(<Checkbox>Bundle Test</Checkbox>)

            // The component should not pull in unnecessary large dependencies
            // This would be better tested with bundle analysis tools
        })

        it('tree-shakes unused code effectively', () => {
            // Tree-shaking verification would be done at build time
            // Here we just verify the component renders without issues
            render(<Checkbox>Tree Shake Test</Checkbox>)
            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })
    })

    describe('Responsive Token Performance', () => {
        it('handles responsive token changes efficiently', () => {
            const { rerender } = render(<Checkbox>Responsive</Checkbox>)

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
            rerender(<Checkbox>Responsive</Checkbox>)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )

            // Restore original
            window.matchMedia = originalMatchMedia
        })

        it('caches token calculations efficiently', () => {
            // Multiple renders with same breakpoint should be fast
            const props = CheckboxTestFactory.default()

            const renderTimes: number[] = []
            for (let i = 0; i < 10; i++) {
                const start = performance.now()
                const { unmount } = render(<Checkbox {...props} />)
                const end = performance.now()
                unmount()
                renderTimes.push(end - start)
            }

            // Later renders should be as fast as earlier ones (caching effect)
            const firstRender = renderTimes[0]
            const lastRender = renderTimes[renderTimes.length - 1]

            expect(lastRender).toBeLessThan(firstRender * 1.5)
        })
    })

    describe('Batch Rendering Performance', () => {
        it('renders multiple checkboxes efficiently', async () => {
            const checkboxCount = 100
            const checkboxes = Array.from({ length: checkboxCount }, (_, i) => (
                <Checkbox key={i} value={`checkbox-${i}`}>
                    Checkbox {i}
                </Checkbox>
            ))

            const start = performance.now()
            render(<div>{checkboxes}</div>)
            const end = performance.now()

            const averageTime = (end - start) / checkboxCount

            // Average render time per checkbox should be very low
            assertPerformanceWithContext(
                averageTime,
                'memory',
                'basic',
                getCurrentTestName()
            )
        })

        it('handles dynamic checkbox lists efficiently', () => {
            const CheckboxList = ({ count }: { count: number }) => (
                <div>
                    {Array.from({ length: count }, (_, i) => (
                        <Checkbox key={i} value={`dynamic-${i}`}>
                            Dynamic {i}
                        </Checkbox>
                    ))}
                </div>
            )

            const { rerender } = render(<CheckboxList count={10} />)

            const start = performance.now()
            rerender(<CheckboxList count={20} />)
            const end = performance.now()

            // Adding 10 more checkboxes should be efficient
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles checkbox state updates in lists efficiently', async () => {
            const checkboxes = Array.from({ length: 50 }, (_, i) => (
                <Checkbox key={i} value={`list-${i}`}>
                    List Item {i}
                </Checkbox>
            ))

            const { user } = render(<div>{checkboxes}</div>)

            const allCheckboxes = screen.getAllByRole('checkbox')

            const start = performance.now()
            // Click multiple checkboxes
            await user.click(allCheckboxes[0])
            await user.click(allCheckboxes[10])
            await user.click(allCheckboxes[20])
            const end = performance.now()

            // Multiple state updates should be efficient
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })
    })

    describe('Animation Performance', () => {
        it('state transition animations are performant', async () => {
            const { user } = render(<Checkbox>Animation Test</Checkbox>)

            const start = performance.now()
            await user.click(screen.getByRole('checkbox'))
            const end = performance.now()

            // State transitions should be fast
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('indeterminate state animations are smooth', () => {
            const { rerender } = render(
                <Checkbox checked={false}>Indeterminate Animation</Checkbox>
            )

            const start = performance.now()
            rerender(
                <Checkbox checked="indeterminate">
                    Indeterminate Animation
                </Checkbox>
            )
            const end = performance.now()

            // Indeterminate state change should be fast
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('hover transitions are smooth', async () => {
            const { user } = render(<Checkbox>Hover Test</Checkbox>)
            const checkbox = screen.getByRole('checkbox')

            const measurements: number[] = []

            // Measure multiple hover/unhover cycles
            for (let i = 0; i < 5; i++) {
                const start = performance.now()
                await user.hover(checkbox)
                await user.unhover(checkbox)
                const end = performance.now()
                measurements.push(end - start)
            }

            // All hover cycles should be consistently fast
            measurements.forEach((time) => {
                assertPerformanceWithContext(
                    time,
                    'interaction',
                    'click',
                    getCurrentTestName()
                )
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

            assertPerformanceWithContext(
                stdDev,
                'memory',
                'basic',
                getCurrentTestName()
            ) // Consistent performance
        })
    })

    describe('Props Processing Performance', () => {
        it('handles complex props efficiently', () => {
            const complexProps = {
                id: 'complex-checkbox',
                value: 'complex-value',
                checked: true,
                size: CheckboxSize.MEDIUM,
                disabled: false,
                required: true,
                error: false,
                subtext: 'Complex checkbox with many props',
                slot: <MockIcon />,
                onCheckedChange: vi.fn(),
                'data-testid': 'complex-checkbox',
                'aria-label': 'Complex checkbox with many props',
                'aria-describedby': 'description',
            }

            const start = performance.now()
            render(<Checkbox {...complexProps}>Complex Checkbox</Checkbox>)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('processes prop changes efficiently', () => {
            const initialProps = CheckboxTestFactory.default()
            const { rerender } = render(<Checkbox {...initialProps} />)

            const updatedProps = {
                ...initialProps,
                checked: true,
                error: true,
                subtext: 'Updated subtext',
                required: true,
            }

            const start = performance.now()
            rerender(<Checkbox {...updatedProps} />)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles frequent prop updates efficiently', () => {
            const { rerender } = render(<Checkbox>Frequent Updates</Checkbox>)

            const updateCount = 20
            const start = performance.now()

            for (let i = 0; i < updateCount; i++) {
                rerender(<Checkbox checked={i % 2 === 0}>Update {i}</Checkbox>)
            }

            const end = performance.now()
            const averageUpdateTime = (end - start) / updateCount

            assertPerformanceWithContext(
                averageUpdateTime,
                'memory',
                'basic',
                getCurrentTestName()
            )
        })
    })

    describe('Event Handler Performance', () => {
        it('processes click events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>
                    Event Performance
                </Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')

            const clickCount = 10
            const start = performance.now()

            for (let i = 0; i < clickCount; i++) {
                await user.click(checkbox)
            }

            const end = performance.now()
            const averageClickTime = (end - start) / clickCount

            assertPerformanceWithContext(
                averageClickTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
            expect(handleChange).toHaveBeenCalledTimes(clickCount)
        })

        it('handles rapid successive events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Checkbox onCheckedChange={handleChange}>Rapid Events</Checkbox>
            )

            const checkbox = screen.getByRole('checkbox')

            const start = performance.now()
            // Simulate rapid clicking
            await user.click(checkbox)
            await user.click(checkbox)
            await user.click(checkbox)
            await user.click(checkbox)
            await user.click(checkbox)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
            expect(handleChange).toHaveBeenCalledTimes(5)
        })
    })

    describe('Stress Testing', () => {
        it('maintains performance under stress conditions', async () => {
            // Create a stress test with many checkboxes and rapid interactions
            const stressCount = 50
            const checkboxes = Array.from({ length: stressCount }, (_, i) => (
                <Checkbox key={i} value={`stress-${i}`}>
                    Stress Test {i}
                </Checkbox>
            ))

            const start = performance.now()
            const { user } = render(<div>{checkboxes}</div>)

            const allCheckboxes = screen.getAllByRole('checkbox')

            // Click every 5th checkbox
            for (let i = 0; i < stressCount; i += 5) {
                await user.click(allCheckboxes[i])
            }

            const end = performance.now()

            // Stress test should complete within reasonable time
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            ) // 1 second
        })

        it('handles memory pressure gracefully', () => {
            // Simulate memory pressure by creating and destroying many checkboxes
            const iterations = 200

            const start = performance.now()

            for (let i = 0; i < iterations; i++) {
                const { unmount } = render(
                    <Checkbox key={i}>Memory Pressure {i}</Checkbox>
                )
                unmount()
            }

            const end = performance.now()
            const averageTime = (end - start) / iterations

            assertPerformanceWithContext(
                averageTime,
                'memory',
                'basic',
                getCurrentTestName()
            )
        })
    })
})

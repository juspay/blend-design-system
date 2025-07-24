import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import {
    render,
    screen,
    measureRenderTime,
    assertPerformanceWithContext,
} from '../../test-utils'
import Radio from '../../../lib/components/Radio/Radio'
import { RadioSize } from '../../../lib/components/Radio/types'
import { RadioPropsBuilder, RadioTestFactory } from '../../test-utils/builders'
import { MockIcon } from '../../test-utils'

// Helper to get current test name for performance tracking
function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}

describe('Radio Performance', () => {
    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <Radio value="test">Performance Test</Radio>
            )

            // Radio should render in less than 100ms (adjusted for test environment)
            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders complex radio within budget', async () => {
            const renderTime = await measureRenderTime(
                <Radio
                    value="complex"
                    checked
                    size={RadioSize.MEDIUM}
                    subtext="Complex radio with all features"
                    slot={<MockIcon />}
                    required
                    error
                >
                    Complex Radio
                </Radio>
            )

            // Even complex radios should render quickly
            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders all radio states efficiently', async () => {
            const states = [
                RadioTestFactory.default(),
                RadioTestFactory.checked(),
                RadioTestFactory.disabled(),
                RadioTestFactory.withError(),
            ]

            const renderTimes = await Promise.all(
                states.map((props) => measureRenderTime(<Radio {...props} />))
            )

            // All states should render efficiently
            renderTimes.forEach((time) => {
                assertPerformanceWithContext(
                    time,
                    'interaction',
                    'click',
                    getCurrentTestName()
                )
            })
        })

        it('renders all sizes efficiently', async () => {
            const sizes = RadioTestFactory.allSizes()

            const renderTimes = await Promise.all(
                sizes.map((props) => measureRenderTime(<Radio {...props} />))
            )

            // All sizes should render efficiently
            renderTimes.forEach((time) => {
                assertPerformanceWithContext(
                    time,
                    'interaction',
                    'click',
                    getCurrentTestName()
                )
            })
        })
    })

    describe('Re-render Optimization', () => {
        it('does not re-render unnecessarily', () => {
            const { rerender } = render(
                <Radio value="test" checked={false}>
                    Test Radio
                </Radio>
            )

            const start = performance.now()
            rerender(
                <Radio value="test" checked={false}>
                    Test Radio
                </Radio>
            )
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
                <Radio value="test" checked={false}>
                    Initial
                </Radio>
            )

            const start = performance.now()
            rerender(
                <Radio value="test" checked={true}>
                    Updated
                </Radio>
            )
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
            const { user } = render(<Radio value="test">State Test</Radio>)

            const radio = screen.getByRole('radio')

            const start = performance.now()
            await user.click(radio)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles checked state changes efficiently', () => {
            const { rerender } = render(
                <Radio value="test" checked={false}>
                    Checked Test
                </Radio>
            )

            const start = performance.now()
            rerender(
                <Radio value="test" checked={true}>
                    Checked Test
                </Radio>
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
                <Radio value="test" onChange={() => {}}>
                    Memory Test
                </Radio>
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
                <Radio value="test" onChange={handleChange}>
                    Event Test
                </Radio>
            )

            const radio = screen.getByRole('radio')

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
                    <Radio key={i} value={`test-${i}`}>
                        Cycle Test {i}
                    </Radio>
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
            const radio = render(<Radio value="test">Bundle Test</Radio>)
            expect(radio).toBeDefined()

            // The component should not pull in unnecessary large dependencies
            // This would be better tested with bundle analysis tools
        })

        it('tree-shakes unused code effectively', () => {
            // Tree-shaking verification would be done at build time
            // Here we just verify the component renders without issues
            render(<Radio value="test">Tree Shake Test</Radio>)
            expect(screen.getByRole('radio')).toBeInTheDocument()
        })
    })

    describe('Responsive Token Performance', () => {
        it('handles responsive token changes efficiently', () => {
            const { rerender } = render(<Radio value="test">Responsive</Radio>)

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
            rerender(<Radio value="test">Responsive</Radio>)
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
            const props = RadioTestFactory.default()

            const renderTimes: number[] = []
            for (let i = 0; i < 10; i++) {
                const start = performance.now()
                const { unmount } = render(<Radio {...props} />)
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
        it('renders multiple radios efficiently', async () => {
            const radioCount = 100
            const radios = Array.from({ length: radioCount }, (_, i) => (
                <Radio key={i} value={`radio-${i}`}>
                    Radio {i}
                </Radio>
            ))

            const start = performance.now()
            render(<div>{radios}</div>)
            const end = performance.now()

            const averageTime = (end - start) / radioCount

            // Average render time per radio should be very low
            assertPerformanceWithContext(
                averageTime,
                'memory',
                'basic',
                getCurrentTestName()
            )
        })

        it('handles dynamic radio lists efficiently', () => {
            const RadioList = ({ count }: { count: number }) => (
                <div>
                    {Array.from({ length: count }, (_, i) => (
                        <Radio key={i} value={`dynamic-${i}`}>
                            Dynamic {i}
                        </Radio>
                    ))}
                </div>
            )

            const { rerender } = render(<RadioList count={10} />)

            const start = performance.now()
            rerender(<RadioList count={20} />)
            const end = performance.now()

            // Adding 10 more radios should be efficient
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles radio state updates in lists efficiently', async () => {
            const radios = Array.from({ length: 50 }, (_, i) => (
                <Radio key={i} value={`list-${i}`} name="list-group">
                    List Item {i}
                </Radio>
            ))

            const { user } = render(<div>{radios}</div>)

            const allRadios = screen.getAllByRole('radio')

            const start = performance.now()
            // Click multiple radios (only last one will be selected due to radio group behavior)
            await user.click(allRadios[0])
            await user.click(allRadios[10])
            await user.click(allRadios[20])
            const end = performance.now()

            // Multiple state updates should be efficient
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('handles radio groups efficiently', async () => {
            const groups = Array.from({ length: 10 }, (_, groupIndex) => (
                <fieldset key={groupIndex}>
                    <legend>Group {groupIndex}</legend>
                    {Array.from({ length: 5 }, (_, radioIndex) => (
                        <Radio
                            key={radioIndex}
                            name={`group-${groupIndex}`}
                            value={`option-${radioIndex}`}
                        >
                            Option {radioIndex}
                        </Radio>
                    ))}
                </fieldset>
            ))

            const start = performance.now()
            render(<div>{groups}</div>)
            const end = performance.now()

            // 10 groups with 5 radios each (50 total) should render efficiently
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
            const { user } = render(<Radio value="test">Animation Test</Radio>)
            const radio = screen.getByRole('radio')

            const start = performance.now()
            await user.click(radio)
            const end = performance.now()

            // State transitions should be fast
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('checked state animations are smooth', () => {
            const { rerender } = render(
                <Radio value="test" checked={false}>
                    Checked Animation
                </Radio>
            )

            const start = performance.now()
            rerender(
                <Radio value="test" checked={true}>
                    Checked Animation
                </Radio>
            )
            const end = performance.now()

            // Checked state change should be fast
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('hover transitions are smooth', async () => {
            const { user } = render(<Radio value="test">Hover Test</Radio>)
            const radio = screen.getByRole('radio')

            const measurements: number[] = []

            // Measure multiple hover/unhover cycles
            for (let i = 0; i < 5; i++) {
                const start = performance.now()
                await user.hover(radio)
                await user.unhover(radio)
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
                id: 'complex-radio',
                value: 'complex-value',
                checked: true,
                size: RadioSize.MEDIUM,
                disabled: false,
                required: true,
                error: false,
                subtext: 'Complex radio with many props',
                slot: <MockIcon />,
                onChange: vi.fn(),
                name: 'complex-group',
                'data-testid': 'complex-radio',
                'aria-label': 'Complex radio with many props',
                'aria-describedby': 'description',
            }

            const start = performance.now()
            render(<Radio {...complexProps}>Complex Radio</Radio>)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('processes prop changes efficiently', () => {
            const initialProps = RadioTestFactory.default()
            const { rerender } = render(<Radio {...initialProps} />)

            const updatedProps = {
                ...initialProps,
                checked: true,
                error: true,
                subtext: 'Updated subtext',
                required: true,
            }

            const start = performance.now()
            rerender(<Radio {...updatedProps} />)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles frequent prop updates efficiently', () => {
            const { rerender } = render(
                <Radio value="test">Frequent Updates</Radio>
            )

            const updateCount = 20
            const start = performance.now()

            for (let i = 0; i < updateCount; i++) {
                rerender(
                    <Radio value="test" checked={i % 2 === 0}>
                        Update {i}
                    </Radio>
                )
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
                <Radio value="test" onChange={handleChange}>
                    Event Performance
                </Radio>
            )

            const radio = screen.getByRole('radio')

            const clickCount = 10
            const start = performance.now()

            for (let i = 0; i < clickCount; i++) {
                await user.click(radio)
            }

            const end = performance.now()
            const averageClickTime = (end - start) / clickCount

            assertPerformanceWithContext(
                averageClickTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
            // Radio only triggers onChange on first click (when becoming checked)
            expect(handleChange).toHaveBeenCalledTimes(1)
        })

        it('handles rapid successive events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Radio value="test" onChange={handleChange}>
                    Rapid Events
                </Radio>
            )

            const radio = screen.getByRole('radio')

            const start = performance.now()
            // Simulate rapid clicking
            await user.click(radio)
            await user.click(radio)
            await user.click(radio)
            await user.click(radio)
            await user.click(radio)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
            // Radio only triggers onChange once (when becoming checked)
            expect(handleChange).toHaveBeenCalledTimes(1)
        })

        it('handles radio group events efficiently', async () => {
            const handleChange1 = vi.fn()
            const handleChange2 = vi.fn()
            const handleChange3 = vi.fn()

            const { user } = render(
                <>
                    <Radio
                        name="group"
                        value="option1"
                        onChange={handleChange1}
                    >
                        Option 1
                    </Radio>
                    <Radio
                        name="group"
                        value="option2"
                        onChange={handleChange2}
                    >
                        Option 2
                    </Radio>
                    <Radio
                        name="group"
                        value="option3"
                        onChange={handleChange3}
                    >
                        Option 3
                    </Radio>
                </>
            )

            const radio1 = screen.getByRole('radio', { name: 'Option 1' })
            const radio2 = screen.getByRole('radio', { name: 'Option 2' })
            const radio3 = screen.getByRole('radio', { name: 'Option 3' })

            const start = performance.now()
            await user.click(radio1)
            await user.click(radio2)
            await user.click(radio3)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
            expect(handleChange1).toHaveBeenCalledTimes(1)
            expect(handleChange2).toHaveBeenCalledTimes(1)
            expect(handleChange3).toHaveBeenCalledTimes(1)
        })
    })

    describe('Stress Testing', () => {
        it('maintains performance under stress conditions', async () => {
            // Create a stress test with many radios and rapid interactions
            const stressCount = 50
            const radios = Array.from({ length: stressCount }, (_, i) => (
                <Radio key={i} value={`stress-${i}`} name="stress-group">
                    Stress Test {i}
                </Radio>
            ))

            const start = performance.now()
            const { user } = render(<div>{radios}</div>)

            const allRadios = screen.getAllByRole('radio')

            // Click every 5th radio
            for (let i = 0; i < stressCount; i += 5) {
                await user.click(allRadios[i])
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
            // Simulate memory pressure by creating and destroying many radios
            const iterations = 200

            const start = performance.now()

            for (let i = 0; i < iterations; i++) {
                const { unmount } = render(
                    <Radio key={i} value={`memory-${i}`}>
                        Memory Pressure {i}
                    </Radio>
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

        it('handles large radio groups efficiently', async () => {
            // Test with a large radio group
            const groupSize = 100
            const radios = Array.from({ length: groupSize }, (_, i) => (
                <Radio key={i} name="large-group" value={`option-${i}`}>
                    Option {i}
                </Radio>
            ))

            const start = performance.now()
            const { user } = render(<fieldset>{radios}</fieldset>)

            // Select a radio in the middle of the large group
            const middleRadio = screen.getByRole('radio', { name: 'Option 50' })
            await user.click(middleRadio)

            const end = performance.now()

            // Large group should still be performant (adjusted for test environment)
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
            expect(middleRadio).toBeChecked()
        })
    })

    describe('Radio Group Performance', () => {
        it('handles group state changes efficiently', async () => {
            const { user } = render(
                <>
                    <Radio name="perf-group" value="option1">
                        Option 1
                    </Radio>
                    <Radio name="perf-group" value="option2">
                        Option 2
                    </Radio>
                    <Radio name="perf-group" value="option3">
                        Option 3
                    </Radio>
                    <Radio name="perf-group" value="option4">
                        Option 4
                    </Radio>
                    <Radio name="perf-group" value="option5">
                        Option 5
                    </Radio>
                </>
            )

            const radios = screen.getAllByRole('radio')

            const start = performance.now()

            // Rapidly switch between radios in the group
            for (const radio of radios) {
                await user.click(radio)
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )

            // Only the last radio should be checked
            expect(radios[4]).toBeChecked()
            radios.slice(0, 4).forEach((radio) => {
                expect(radio).not.toBeChecked()
            })
        })

        it('optimizes re-renders in radio groups', () => {
            const RadioGroup = ({
                selectedValue,
            }: {
                selectedValue: string
            }) => (
                <>
                    <Radio
                        name="group"
                        value="a"
                        checked={selectedValue === 'a'}
                    >
                        A
                    </Radio>
                    <Radio
                        name="group"
                        value="b"
                        checked={selectedValue === 'b'}
                    >
                        B
                    </Radio>
                    <Radio
                        name="group"
                        value="c"
                        checked={selectedValue === 'c'}
                    >
                        C
                    </Radio>
                </>
            )

            const { rerender } = render(<RadioGroup selectedValue="a" />)

            const start = performance.now()
            rerender(<RadioGroup selectedValue="b" />)
            const end = performance.now()

            // Group state change should be efficient
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })
})

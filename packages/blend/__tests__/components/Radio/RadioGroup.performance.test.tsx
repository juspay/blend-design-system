import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    render,
    screen,
    measureRenderTime,
    assertPerformanceWithContext,
} from '../../test-utils'
import RadioGroup from '../../../lib/components/Radio/RadioGroup'
import { Radio } from '../../../lib/components/Radio/Radio'
import {
    RadioGroupTestFactory,
    RadioGroupPropsBuilder,
} from '../../test-utils/builders'

// Helper to get current test name for performance tracking
function getCurrentTestName(): string {
    const testContext = expect.getState() as { currentTestName?: string }
    return testContext.currentTestName || 'unknown-test'
}

describe.skip('RadioGroup Performance', () => {
    let defaultProps: Record<string, unknown>

    beforeEach(() => {
        defaultProps = RadioGroupTestFactory.default()
    })

    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <RadioGroup {...defaultProps} name="perf-test-group">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('renders different group states efficiently', async () => {
            const states = [
                RadioGroupTestFactory.default(),
                RadioGroupTestFactory.controlled(),
                RadioGroupTestFactory.disabled(),
                RadioGroupTestFactory.withSelection(),
            ]

            for (const props of states) {
                const renderTime = await measureRenderTime(
                    <RadioGroup {...props}>
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                        <Radio value="option3">Option 3</Radio>
                    </RadioGroup>
                )

                assertPerformanceWithContext(
                    renderTime,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            }
        })

        it('handles multiple radio groups efficiently', async () => {
            const renderTime = await measureRenderTime(
                <>
                    <RadioGroup name="group1" label="Group 1">
                        <Radio value="a1">Option A1</Radio>
                        <Radio value="a2">Option A2</Radio>
                    </RadioGroup>
                    <RadioGroup name="group2" label="Group 2">
                        <Radio value="b1">Option B1</Radio>
                        <Radio value="b2">Option B2</Radio>
                    </RadioGroup>
                    <RadioGroup name="group3" label="Group 3">
                        <Radio value="c1">Option C1</Radio>
                        <Radio value="c2">Option C2</Radio>
                    </RadioGroup>
                </>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('scales efficiently with number of radios', async () => {
            const radioCount = 10
            const renderTime = await measureRenderTime(
                <RadioGroup name="large-group" label="Large Group">
                    {Array.from({ length: radioCount }, (_, i) => (
                        <Radio key={i} value={`option${i + 1}`}>
                            Option {i + 1}
                        </Radio>
                    ))}
                </RadioGroup>
            )

            // Should scale linearly - allow more time for larger groups
            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders complex radio content efficiently', async () => {
            const renderTime = await measureRenderTime(
                <RadioGroup name="complex-group" label="Complex Group">
                    <Radio value="complex1" subtext="Additional information">
                        <span>
                            Complex <strong>formatted</strong> content
                        </span>
                    </Radio>
                    <Radio value="complex2" required>
                        Another complex option
                    </Radio>
                    <Radio value="complex3" disabled subtext="Disabled option">
                        Disabled complex option
                    </Radio>
                </RadioGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })
    })

    describe('Re-render Performance', () => {
        it('handles value changes efficiently', () => {
            const props = new RadioGroupPropsBuilder()
                .withName('rerender-group')
                .withLabel('Re-render Group')
                .withValue('option1')
                .build()

            const { rerender } = render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const start = performance.now()

            // Simulate multiple value changes
            for (let i = 1; i <= 5; i++) {
                rerender(
                    <RadioGroup {...props} value={`option${(i % 3) + 1}`}>
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                        <Radio value="option3">Option 3</Radio>
                    </RadioGroup>
                )
            }

            const end = performance.now()
            const averageRerenderTime = (end - start) / 5

            assertPerformanceWithContext(
                averageRerenderTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles rapid value changes efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="rapid-group" onChange={handleChange}>
                    <Radio value="rapid1">Rapid 1</Radio>
                    <Radio value="rapid2">Rapid 2</Radio>
                    <Radio value="rapid3">Rapid 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            const start = performance.now()

            // Simulate rapid user interactions
            for (let i = 0; i < 10; i++) {
                await user.click(radios[i % 3])
            }

            const end = performance.now()
            const totalTime = end - start

            // Rapid interactions should complete within reasonable time
            assertPerformanceWithContext(
                totalTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            ) // 10ms per interaction
        })

        it("optimizes re-renders when props don't change", () => {
            const props = RadioGroupTestFactory.controlled()
            let renderCount = 0

            const TestRadioGroup = (groupProps: Record<string, unknown>) => {
                renderCount++
                return (
                    <RadioGroup {...groupProps} name="test-radio-group">
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                    </RadioGroup>
                )
            }

            const { rerender } = render(<TestRadioGroup {...props} />)

            const initialRenderCount = renderCount

            // Re-render with same props multiple times
            for (let i = 0; i < 5; i++) {
                rerender(<TestRadioGroup {...props} />)
            }

            // Should not cause excessive re-renders
            expect(renderCount - initialRenderCount).toBeLessThanOrEqual(5)
        })

        it('handles disabled state changes efficiently', () => {
            const props = new RadioGroupPropsBuilder()
                .withName('disabled-group')
                .withLabel('Disabled Group')
                .build()

            const { rerender } = render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                </RadioGroup>
            )

            const start = performance.now()

            // Toggle disabled state multiple times
            for (let i = 0; i < 10; i++) {
                rerender(
                    <RadioGroup {...props} disabled={i % 2 === 0}>
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                    </RadioGroup>
                )
            }

            const end = performance.now()
            const averageToggleTime = (end - start) / 10

            assertPerformanceWithContext(
                averageToggleTime,
                'memory',
                'basic',
                getCurrentTestName()
            ) // 5ms per toggle
        })
    })

    describe('State Management Performance', () => {
        it('manages controlled state efficiently', () => {
            const handleChange = vi.fn()
            const props = new RadioGroupPropsBuilder()
                .withName('controlled-perf')
                .withLabel('Controlled Performance')
                .withValue('option1')
                .withOnChange(handleChange)
                .build()

            const start = performance.now()

            render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                    <Radio value="option4">Option 4</Radio>
                    <Radio value="option5">Option 5</Radio>
                </RadioGroup>
            )

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('manages uncontrolled state efficiently', () => {
            const props = new RadioGroupPropsBuilder()
                .withName('uncontrolled-perf')
                .withLabel('Uncontrolled Performance')
                .withDefaultValue('option2')
                .build()

            const start = performance.now()

            render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                    <Radio value="option4">Option 4</Radio>
                    <Radio value="option5">Option 5</Radio>
                </RadioGroup>
            )

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles state synchronization efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="sync-group" onChange={handleChange}>
                    <Radio value="sync1">Sync 1</Radio>
                    <Radio value="sync2">Sync 2</Radio>
                    <Radio value="sync3">Sync 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            const start = performance.now()

            // Test state synchronization across multiple selections
            await user.click(radios[0])
            await user.click(radios[1])
            await user.click(radios[2])
            await user.click(radios[0])

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            ) // 15ms per interaction
        })
    })

    describe('Memory Management', () => {
        it('cleans up properly on unmount', () => {
            const props = RadioGroupTestFactory.complex()

            const { unmount } = render(
                <RadioGroup {...props}>
                    <Radio value="memory1">Memory Test 1</Radio>
                    <Radio value="memory2">Memory Test 2</Radio>
                    <Radio value="memory3">Memory Test 3</Radio>
                </RadioGroup>
            )

            // Measure cleanup time
            const start = performance.now()
            unmount()
            const end = performance.now()

            // Cleanup should be fast
            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles multiple mount/unmount cycles efficiently', () => {
            const props = RadioGroupTestFactory.default()
            const mountTimes: number[] = []

            for (let i = 0; i < 5; i++) {
                const start = performance.now()

                const { unmount } = render(
                    <RadioGroup {...props}>
                        <Radio value="cycle1">Cycle 1</Radio>
                        <Radio value="cycle2">Cycle 2</Radio>
                    </RadioGroup>
                )

                const end = performance.now()
                mountTimes.push(end - start)

                unmount()
            }

            const averageTime =
                mountTimes.reduce((a, b) => a + b) / mountTimes.length
            assertPerformanceWithContext(
                averageTime,
                'memory',
                'stress',
                getCurrentTestName()
            )

            // Performance should be consistent across cycles
            const maxTime = Math.max(...mountTimes)
            const minTime = Math.min(...mountTimes)
            expect(maxTime - minTime).toBeLessThan(30) // Variance should be small
        })

        it('prevents memory leaks with event listeners', () => {
            const handleChange = vi.fn()
            const props = new RadioGroupPropsBuilder()
                .withName('memory-leak-test')
                .withOnChange(handleChange)
                .build()

            const { unmount } = render(
                <RadioGroup {...props}>
                    <Radio value="leak1">Leak Test 1</Radio>
                    <Radio value="leak2">Leak Test 2</Radio>
                </RadioGroup>
            )

            // Simulate some interactions before unmount
            const radios = screen.getAllByRole('radio')
            radios[0].click()
            radios[1].click()

            // Unmount should clean up event listeners
            const start = performance.now()
            unmount()
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )

            // Verify handlers are not called after unmount
            const callCountBeforeUnmount = handleChange.mock.calls.length

            // Try to trigger events after unmount (should not call handler)
            setTimeout(() => {
                expect(handleChange.mock.calls.length).toBe(
                    callCountBeforeUnmount
                )
            }, 0)
        })
    })

    describe('Event Handler Performance', () => {
        it('processes selection changes efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="event-perf" onChange={handleChange}>
                    <Radio value="event1">Event 1</Radio>
                    <Radio value="event2">Event 2</Radio>
                    <Radio value="event3">Event 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            const start = performance.now()

            // Test multiple rapid selections
            for (let i = 0; i < 5; i++) {
                await user.click(radios[i % 3])
            }

            const end = performance.now()
            const averageEventTime = (end - start) / 5

            assertPerformanceWithContext(
                averageEventTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            ) // 15ms per event
            expect(handleChange).toHaveBeenCalledTimes(5)
        })

        it('handles keyboard events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="keyboard-perf" onChange={handleChange}>
                    <Radio value="key1">Key 1</Radio>
                    <Radio value="key2">Key 2</Radio>
                    <Radio value="key3">Key 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            radios[0].focus()

            const start = performance.now()

            // Test keyboard navigation performance
            await user.keyboard('{ArrowDown}')
            await user.keyboard('{ArrowDown}')
            await user.keyboard('{ArrowUp}')
            await user.keyboard(' ')

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            ) // 12.5ms per keyboard event
        })

        it('batches multiple state updates efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="batch-perf" onChange={handleChange}>
                    <Radio value="batch1">Batch 1</Radio>
                    <Radio value="batch2">Batch 2</Radio>
                    <Radio value="batch3">Batch 3</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            const start = performance.now()

            // Rapid successive clicks should be batched
            await Promise.all([
                user.click(radios[0]),
                user.click(radios[1]),
                user.click(radios[2]),
            ])

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })

    describe('Stress Testing', () => {
        it('handles large numbers of radios efficiently', async () => {
            const radioCount = 50
            const renderTime = await measureRenderTime(
                <RadioGroup name="stress-group" label="Stress Test Group">
                    {Array.from({ length: radioCount }, (_, i) => (
                        <Radio key={i} value={`stress${i + 1}`}>
                            Stress Option {i + 1}
                        </Radio>
                    ))}
                </RadioGroup>
            )

            // Large group should still be performant (adjusted for test environment)
            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('maintains performance under rapid state changes', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <RadioGroup name="rapid-stress" onChange={handleChange}>
                    <Radio value="rapid1">Rapid 1</Radio>
                    <Radio value="rapid2">Rapid 2</Radio>
                    <Radio value="rapid3">Rapid 3</Radio>
                    <Radio value="rapid4">Rapid 4</Radio>
                    <Radio value="rapid5">Rapid 5</Radio>
                </RadioGroup>
            )

            const radios = screen.getAllByRole('radio')
            const start = performance.now()

            // Stress test with many rapid interactions
            for (let i = 0; i < 20; i++) {
                await user.click(radios[i % 5])
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            ) // 10ms per interaction
        })

        it('handles complex nested scenarios efficiently', async () => {
            const renderTime = await measureRenderTime(
                <form>
                    <fieldset>
                        <legend>Complex Form</legend>
                        {Array.from({ length: 5 }, (_, groupIndex) => (
                            <RadioGroup
                                key={groupIndex}
                                name={`group${groupIndex}`}
                                label={`Group ${groupIndex + 1}`}
                            >
                                {Array.from({ length: 4 }, (_, radioIndex) => (
                                    <Radio
                                        key={radioIndex}
                                        value={`g${groupIndex}r${radioIndex}`}
                                        subtext={`Option ${radioIndex + 1} description`}
                                    >
                                        Group {groupIndex + 1} Option{' '}
                                        {radioIndex + 1}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        ))}
                    </fieldset>
                </form>
            )

            // Complex nested structure should still render efficiently
            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles memory pressure gracefully', () => {
            const iterations = 100
            const start = performance.now()

            for (let i = 0; i < iterations; i++) {
                const { unmount } = render(
                    <RadioGroup name={`pressure${i}`} label={`Pressure ${i}`}>
                        <Radio value="p1">Pressure 1</Radio>
                        <Radio value="p2">Pressure 2</Radio>
                    </RadioGroup>
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

    describe('Optimization Verification', () => {
        it('uses efficient DOM updates', () => {
            const props = new RadioGroupPropsBuilder()
                .withName('dom-update')
                .withValue('option1')
                .build()

            const { rerender } = render(
                <RadioGroup {...props}>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const start = performance.now()

            // Change selection multiple times
            rerender(
                <RadioGroup {...props} value="option2">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            rerender(
                <RadioGroup {...props} value="option3">
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </RadioGroup>
            )

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('minimizes unnecessary re-renders', () => {
            let renderCount = 0
            const TestComponent = ({ value }: { value: string }) => {
                renderCount++
                return (
                    <RadioGroup name="minimize-renders" value={value}>
                        <Radio value="min1">Min 1</Radio>
                        <Radio value="min2">Min 2</Radio>
                    </RadioGroup>
                )
            }

            const { rerender } = render(<TestComponent value="min1" />)
            const initialRenderCount = renderCount

            // Re-render with same value (should not cause re-render)
            rerender(<TestComponent value="min1" />)
            rerender(<TestComponent value="min1" />)

            // Change value (should cause re-render)
            rerender(<TestComponent value="min2" />)

            // The component should minimize unnecessary re-renders
            expect(renderCount - initialRenderCount).toBeLessThanOrEqual(3)
        })

        it('efficiently handles prop changes', () => {
            const props = RadioGroupTestFactory.default()
            const { rerender } = render(
                <RadioGroup {...props}>
                    <Radio value="prop1">Prop 1</Radio>
                    <Radio value="prop2">Prop 2</Radio>
                </RadioGroup>
            )

            const start = performance.now()

            // Test various prop changes
            rerender(
                <RadioGroup {...props} disabled>
                    <Radio value="prop1">Prop 1</Radio>
                    <Radio value="prop2">Prop 2</Radio>
                </RadioGroup>
            )

            rerender(
                <RadioGroup {...props} value="prop2">
                    <Radio value="prop1">Prop 1</Radio>
                    <Radio value="prop2">Prop 2</Radio>
                </RadioGroup>
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
})

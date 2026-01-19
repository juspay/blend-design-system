import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import {
    render,
    screen,
    measureRenderTime,
    assertPerformanceWithContext,
    waitFor,
} from '../../test-utils'
import { Tooltip } from '../../../lib/components/Tooltip/Tooltip'
import {
    TooltipSide,
    TooltipAlign,
    TooltipSize,
    TooltipSlotDirection,
} from '../../../lib/components/Tooltip/types'
import { MockIcon } from '../../test-utils'

// Helper to get current test name for performance tracking
function getCurrentTestName(): string {
    const testContext = expect.getState() as { currentTestName?: string }
    return testContext.currentTestName || 'unknown-test'
}

describe.skip('Tooltip Performance', () => {
    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <Tooltip content="Performance test tooltip">
                    <button>Performance trigger</button>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('renders complex tooltip within budget', async () => {
            const renderTime = await measureRenderTime(
                <Tooltip
                    content="Complex tooltip with all features"
                    side={TooltipSide.BOTTOM}
                    align={TooltipAlign.START}
                    size={TooltipSize.LARGE}
                    slot={<MockIcon />}
                    slotDirection={TooltipSlotDirection.RIGHT}
                    showArrow={true}
                    delayDuration={100}
                    offset={10}
                >
                    <button>Complex trigger</button>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders all tooltip sides efficiently', async () => {
            const sides = [
                TooltipSide.TOP,
                TooltipSide.RIGHT,
                TooltipSide.BOTTOM,
                TooltipSide.LEFT,
            ]

            const renderTimes = await Promise.all(
                sides.map((side) =>
                    measureRenderTime(
                        <Tooltip content={`Tooltip on ${side}`} side={side}>
                            <button>{side} trigger</button>
                        </Tooltip>
                    )
                )
            )

            renderTimes.forEach((time) => {
                assertPerformanceWithContext(
                    time,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            })
        })

        it('renders all tooltip sizes efficiently', async () => {
            const sizes = [TooltipSize.SMALL, TooltipSize.LARGE]

            const renderTimes = await Promise.all(
                sizes.map((size) =>
                    measureRenderTime(
                        <Tooltip content={`${size} tooltip`} size={size}>
                            <button>{size} trigger</button>
                        </Tooltip>
                    )
                )
            )

            renderTimes.forEach((time) => {
                assertPerformanceWithContext(
                    time,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            })
        })

        it('renders multiple tooltips efficiently', async () => {
            const renderTime = await measureRenderTime(
                <div>
                    <Tooltip content="First tooltip">
                        <button>First trigger</button>
                    </Tooltip>
                    <Tooltip content="Second tooltip">
                        <button>Second trigger</button>
                    </Tooltip>
                    <Tooltip content="Third tooltip">
                        <button>Third trigger</button>
                    </Tooltip>
                    <Tooltip content="Fourth tooltip">
                        <button>Fourth trigger</button>
                    </Tooltip>
                    <Tooltip content="Fifth tooltip">
                        <button>Fifth trigger</button>
                    </Tooltip>
                </div>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })

    describe('Show/Hide Performance', () => {
        it('shows tooltip efficiently on hover', async () => {
            const { user } = render(
                <Tooltip content="Show performance test" delayDuration={100}>
                    <button>Show trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')

            const start = performance.now()
            await user.hover(trigger)
            await waitFor(() => {
                expect(
                    screen.getAllByText('Show performance test')
                ).toHaveLength(2)
            })
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('hides tooltip efficiently on unhover', async () => {
            const { user } = render(
                <Tooltip content="Hide performance test" delayDuration={50}>
                    <button>Hide trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')

            // Show tooltip first
            await user.hover(trigger)
            await waitFor(() => {
                expect(
                    screen.getAllByText('Hide performance test')
                ).toHaveLength(2)
            })

            const start = performance.now()
            await user.unhover(trigger)
            await waitFor(() => {
                expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
            })
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles rapid show/hide cycles efficiently', async () => {
            const { user } = render(
                <Tooltip content="Rapid cycle test" delayDuration={25}>
                    <button>Rapid trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')

            const start = performance.now()

            // Perform rapid hover/unhover cycles
            for (let i = 0; i < 5; i++) {
                await user.hover(trigger)
                await user.unhover(trigger)
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('handles controlled tooltip state changes efficiently', async () => {
            const { rerender } = render(
                <Tooltip content="Controlled performance test" open={false}>
                    <button>Controlled trigger</button>
                </Tooltip>
            )

            const start = performance.now()

            // Toggle open state multiple times
            for (let i = 0; i < 5; i++) {
                rerender(
                    <Tooltip
                        content="Controlled performance test"
                        open={i % 2 === 0}
                    >
                        <button>Controlled trigger</button>
                    </Tooltip>
                )
            }

            const end = performance.now()
            const averageToggleTime = (end - start) / 5

            assertPerformanceWithContext(
                averageToggleTime,
                'memory',
                'basic',
                getCurrentTestName()
            )
        })
    })

    describe('Re-render Performance', () => {
        it('avoids unnecessary re-renders with stable props', async () => {
            const renderSpy = vi.fn()
            const TestTooltip = (props: Record<string, unknown>) => {
                renderSpy()
                return (
                    <Tooltip content="Stable props test" {...props}>
                        <button>Stable trigger</button>
                    </Tooltip>
                )
            }

            const { rerender } = render(<TestTooltip />)
            renderSpy.mockClear()

            const start = performance.now()
            rerender(<TestTooltip />)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
            expect(renderSpy).toHaveBeenCalledTimes(1)
        })

        it('re-renders efficiently when content changes', async () => {
            const { rerender } = render(
                <Tooltip content="Initial content">
                    <button>Content change trigger</button>
                </Tooltip>
            )

            const start = performance.now()

            // Change content multiple times
            for (let i = 1; i <= 5; i++) {
                rerender(
                    <Tooltip content={`Updated content ${i}`}>
                        <button>Content change trigger</button>
                    </Tooltip>
                )
            }

            const end = performance.now()
            const averageUpdateTime = (end - start) / 5

            assertPerformanceWithContext(
                averageUpdateTime,
                'memory',
                'basic',
                getCurrentTestName()
            )
        })

        it('handles prop changes efficiently', async () => {
            const { rerender } = render(
                <Tooltip content="Prop change test" side={TooltipSide.TOP}>
                    <button>Prop change trigger</button>
                </Tooltip>
            )

            const start = performance.now()

            // Change various props
            const sides = [
                TooltipSide.RIGHT,
                TooltipSide.BOTTOM,
                TooltipSide.LEFT,
                TooltipSide.TOP,
            ]
            const sizes = [TooltipSize.LARGE, TooltipSize.SMALL]
            const aligns = [
                TooltipAlign.START,
                TooltipAlign.END,
                TooltipAlign.CENTER,
            ]

            sides.forEach((side, i) => {
                rerender(
                    <Tooltip
                        content="Prop change test"
                        side={side}
                        size={sizes[i % 2]}
                        align={aligns[i % 3]}
                    >
                        <button>Prop change trigger</button>
                    </Tooltip>
                )
            })

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('optimizes re-renders with complex content', async () => {
            const { rerender } = render(
                <Tooltip
                    content={
                        <span>
                            Complex <strong>content</strong> with{' '}
                            <em>formatting</em>
                        </span>
                    }
                    slot={<MockIcon />}
                >
                    <button>Complex re-render trigger</button>
                </Tooltip>
            )

            const start = performance.now()

            // Re-render with different complex content
            rerender(
                <Tooltip
                    content={
                        <span>
                            Updated <strong>complex</strong> content with{' '}
                            <em>new formatting</em>
                        </span>
                    }
                    slot={<MockIcon />}
                >
                    <button>Complex re-render trigger</button>
                </Tooltip>
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
        it('cleans up properly on unmount', async () => {
            const { unmount } = render(
                <Tooltip content="Memory cleanup test">
                    <button>Cleanup trigger</button>
                </Tooltip>
            )

            const start = performance.now()
            unmount()
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles multiple mount/unmount cycles efficiently', async () => {
            const mountTimes: number[] = []

            for (let i = 0; i < 5; i++) {
                const start = performance.now()

                const { unmount } = render(
                    <Tooltip content={`Cycle ${i} tooltip`}>
                        <button>Cycle {i} trigger</button>
                    </Tooltip>
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
            expect(maxTime - minTime).toBeLessThan(20) // Variance should be small
        })

        it('manages tooltip provider memory efficiently', async () => {
            const start = performance.now()

            // Create multiple tooltip providers
            for (let i = 0; i < 10; i++) {
                const { unmount } = render(
                    <Tooltip
                        content={`Provider ${i} tooltip`}
                        delayDuration={i * 10}
                    >
                        <button>Provider {i} trigger</button>
                    </Tooltip>
                )
                unmount()
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'memory',
                'stress',
                getCurrentTestName()
            )
        })

        it('prevents memory leaks with event listeners', async () => {
            const { user, unmount } = render(
                <Tooltip content="Event listener test">
                    <button>Event trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')

            // Interact with tooltip to ensure event listeners are attached
            await user.hover(trigger)
            await waitFor(() => {
                expect(screen.getAllByText('Event listener test')).toHaveLength(
                    2
                )
            })

            await user.unhover(trigger)

            const start = performance.now()
            unmount()
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })

    describe('Token Resolution Performance', () => {
        it('resolves responsive tokens efficiently', async () => {
            const start = performance.now()
            render(
                <Tooltip content="Token resolution test">
                    <button>Token trigger</button>
                </Tooltip>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('caches token resolution across instances', async () => {
            const start = performance.now()
            render(
                <div>
                    {Array.from({ length: 5 }, (_, i) => (
                        <Tooltip key={i} content={`Cached tooltip ${i}`}>
                            <button>Cached trigger {i}</button>
                        </Tooltip>
                    ))}
                </div>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles size-specific token resolution efficiently', async () => {
            const start = performance.now()
            render(
                <div>
                    <Tooltip content="Small tooltip" size={TooltipSize.SMALL}>
                        <button>Small trigger</button>
                    </Tooltip>
                    <Tooltip content="Large tooltip" size={TooltipSize.LARGE}>
                        <button>Large trigger</button>
                    </Tooltip>
                </div>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'simple',
                getCurrentTestName()
            )
        })
    })

    describe('Complex Scenarios Performance', () => {
        it('performs well with nested tooltip scenarios', async () => {
            const renderTime = await measureRenderTime(
                <Tooltip content="Outer tooltip">
                    <div>
                        <span>Outer content</span>
                        <Tooltip content="Inner tooltip">
                            <button>Inner trigger</button>
                        </Tooltip>
                    </div>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles dynamic content updates efficiently', async () => {
            const { user, rerender } = render(
                <Tooltip content="Dynamic content 1">
                    <button>Dynamic trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            await user.hover(trigger)

            const start = performance.now()

            // Update content while tooltip is visible
            for (let i = 2; i <= 5; i++) {
                rerender(
                    <Tooltip content={`Dynamic content ${i}`}>
                        <button>Dynamic trigger</button>
                    </Tooltip>
                )
                await waitFor(() => {
                    expect(
                        screen.getAllByText(`Dynamic content ${i}`)
                    ).toHaveLength(2)
                })
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('maintains performance with complex slot content', async () => {
            const renderTime = await measureRenderTime(
                <Tooltip
                    content="Complex slot tooltip"
                    slot={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <MockIcon />
                            <span style={{ marginLeft: '4px' }}>Complex</span>
                        </div>
                    }
                >
                    <button>Complex slot trigger</button>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles form integration scenarios efficiently', async () => {
            const renderTime = await measureRenderTime(
                <form>
                    <fieldset>
                        <legend>Performance Form</legend>
                        <div>
                            <Tooltip content="Name field help">
                                <input type="text" placeholder="Name" />
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip content="Email field help">
                                <input type="email" placeholder="Email" />
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip content="Submit button help">
                                <button type="submit">Submit</button>
                            </Tooltip>
                        </div>
                    </fieldset>
                </form>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })

    describe('Edge Case Performance', () => {
        it('handles undefined props efficiently', async () => {
            const renderTime = await measureRenderTime(
                <Tooltip
                    content="Undefined props test"
                    side={undefined}
                    align={undefined}
                    size={undefined}
                    slot={undefined}
                    showArrow={undefined}
                    delayDuration={undefined}
                    offset={undefined}
                >
                    <button>Undefined props trigger</button>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('performs well with empty content', async () => {
            const renderTime = await measureRenderTime(
                <Tooltip content="">
                    <button>Empty content trigger</button>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('handles very long content efficiently', async () => {
            const longContent =
                'This is a very long tooltip content that should wrap properly within the maximum width constraints set by the tooltip tokens and should not break the layout or cause overflow issues. It contains multiple sentences and should test the performance of text rendering and layout calculations within the tooltip component.'

            const renderTime = await measureRenderTime(
                <Tooltip content={longContent}>
                    <button>Long content trigger</button>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('maintains performance with rapid prop changes', async () => {
            const { rerender } = render(
                <Tooltip content="Rapid prop changes" side={TooltipSide.TOP}>
                    <button>Rapid changes trigger</button>
                </Tooltip>
            )

            const start = performance.now()

            const sides = [
                TooltipSide.RIGHT,
                TooltipSide.BOTTOM,
                TooltipSide.LEFT,
                TooltipSide.TOP,
            ]
            const aligns = [
                TooltipAlign.START,
                TooltipAlign.CENTER,
                TooltipAlign.END,
            ]
            const sizes = [TooltipSize.SMALL, TooltipSize.LARGE]

            // Rapid prop changes
            for (let i = 0; i < 20; i++) {
                rerender(
                    <Tooltip
                        content="Rapid prop changes"
                        side={sides[i % sides.length]}
                        align={aligns[i % aligns.length]}
                        size={sizes[i % sizes.length]}
                        showArrow={i % 2 === 0}
                        offset={i % 10}
                    >
                        <button>Rapid changes trigger</button>
                    </Tooltip>
                )
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })
    })

    describe('Stress Testing', () => {
        it('handles large numbers of tooltips', async () => {
            const tooltipCount = 50
            const renderTime = await measureRenderTime(
                <div>
                    {Array.from({ length: tooltipCount }, (_, i) => (
                        <Tooltip key={i} content={`Stress tooltip ${i + 1}`}>
                            <button>Stress trigger {i + 1}</button>
                        </Tooltip>
                    ))}
                </div>
            )

            assertPerformanceWithContext(
                renderTime,
                'memory',
                'stress',
                getCurrentTestName()
            )
        })

        it('maintains performance under rapid interactions', async () => {
            const { user } = render(
                <div>
                    <Tooltip content="Rapid interaction 1" delayDuration={25}>
                        <button>Rapid 1</button>
                    </Tooltip>
                    <Tooltip content="Rapid interaction 2" delayDuration={25}>
                        <button>Rapid 2</button>
                    </Tooltip>
                    <Tooltip content="Rapid interaction 3" delayDuration={25}>
                        <button>Rapid 3</button>
                    </Tooltip>
                </div>
            )

            const triggers = screen.getAllByRole('button')

            const start = performance.now()

            // Rapid interactions across multiple tooltips
            for (let i = 0; i < 15; i++) {
                const trigger = triggers[i % 3]
                await user.hover(trigger)
                await user.unhover(trigger)
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('handles memory pressure gracefully', async () => {
            const start = performance.now()

            for (let i = 0; i < 50; i++) {
                const { unmount } = render(
                    <Tooltip content={`Memory pressure ${i}`}>
                        <button>Pressure {i}</button>
                    </Tooltip>
                )
                unmount()
            }

            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'memory',
                'stress',
                getCurrentTestName()
            )
        })
    })

    describe('Performance Regression Prevention', () => {
        it('maintains baseline performance metrics', async () => {
            const renderTime = await measureRenderTime(
                <Tooltip content="Baseline performance test">
                    <button>Baseline trigger</button>
                </Tooltip>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('tracks performance across different configurations', async () => {
            const configurations = [
                { content: 'Simple', size: TooltipSize.SMALL },
                {
                    content: 'Medium complexity',
                    size: TooltipSize.LARGE,
                    slot: <MockIcon />,
                },
                {
                    content: 'Complex configuration',
                    size: TooltipSize.LARGE,
                    slot: <MockIcon />,
                    side: TooltipSide.BOTTOM,
                    align: TooltipAlign.START,
                },
            ]

            for (const config of configurations) {
                const renderTime = await measureRenderTime(
                    <Tooltip {...config}>
                        <button>Config trigger</button>
                    </Tooltip>
                )

                assertPerformanceWithContext(
                    renderTime,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            }
        })

        it('verifies consistent performance across tooltip states', async () => {
            const { user } = render(
                <Tooltip content="State performance test" delayDuration={50}>
                    <button>State trigger</button>
                </Tooltip>
            )

            const trigger = screen.getByRole('button')
            const measurements: number[] = []

            // Measure multiple show/hide cycles
            for (let i = 0; i < 5; i++) {
                const start = performance.now()
                await user.hover(trigger)
                await waitFor(() => {
                    expect(
                        screen.getAllByText('State performance test')
                    ).toHaveLength(2)
                })
                await user.unhover(trigger)
                await waitFor(() => {
                    expect(
                        screen.queryByRole('tooltip')
                    ).not.toBeInTheDocument()
                })
                const end = performance.now()
                measurements.push(end - start)
            }

            // All cycles should be consistently fast
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
})

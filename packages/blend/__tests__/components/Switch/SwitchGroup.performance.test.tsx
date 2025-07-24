import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import SwitchGroup from '../../../lib/components/Switch/SwitchGroup'
import { Switch } from '../../../lib/components/Switch/Switch'
import { SwitchGroupTestFactory } from '../../test-utils/builders'
import { assertPerformanceWithinBudget } from '../../test-utils/assertions'
import { PERFORMANCE_THRESHOLDS } from '../../test-utils/constants'

// Simple performance measurement utility
const measureComponentPerformance = async (
    fn: () => void | Promise<void>
): Promise<number> => {
    const start = performance.now()
    await fn()
    const end = performance.now()
    return end - start
}

describe('SwitchGroup Performance', () => {
    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup name="perf-group" label="Performance Group">
                        <Switch label="Option 1" value="option1" />
                        <Switch label="Option 2" value="option2" />
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })

        it('renders complex group within budget', async () => {
            const props = SwitchGroupTestFactory.complex()
            const renderTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup {...props}>
                        <Switch
                            label="Complex Option 1"
                            value="option1"
                            subtext="Additional info"
                        />
                        <Switch
                            label="Complex Option 2"
                            value="option2"
                            required
                        />
                        <Switch
                            label="Complex Option 3"
                            value="option3"
                            disabled
                        />
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.complex
            )
        })

        it('renders multiple switch groups efficiently', async () => {
            const renderTime = await measureComponentPerformance(() => {
                render(
                    <>
                        {Array.from({ length: 5 }, (_, i) => (
                            <SwitchGroup
                                key={i}
                                name={`group-${i}`}
                                label={`Group ${i}`}
                            >
                                <Switch label="Option 1" value="option1" />
                                <Switch label="Option 2" value="option2" />
                            </SwitchGroup>
                        ))}
                    </>
                )
            })

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.complex * 2
            )
        })

        it('handles large numbers of switches efficiently', async () => {
            const renderTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup name="large-group" label="Large Group">
                        {Array.from({ length: 20 }, (_, i) => (
                            <Switch
                                key={i}
                                label={`Option ${i + 1}`}
                                value={`option${i + 1}`}
                            />
                        ))}
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.complex * 3
            )
        })

        it('renders different group states efficiently', async () => {
            const states = [
                SwitchGroupTestFactory.default(),
                SwitchGroupTestFactory.controlled(),
                SwitchGroupTestFactory.disabled(),
                SwitchGroupTestFactory.multipleSelected(),
            ]

            const renderTime = await measureComponentPerformance(() => {
                states.forEach((props, index) => {
                    const { unmount } = render(
                        <SwitchGroup key={index} {...props}>
                            <Switch label="Option 1" value="option1" />
                            <Switch label="Option 2" value="option2" />
                        </SwitchGroup>
                    )
                    unmount()
                })
            })

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.complex
            )
        })
    })

    describe('Re-render Performance', () => {
        it('avoids unnecessary re-renders with stable props', () => {
            const renderSpy = vi.fn()
            const TestSwitchGroup = (props: any) => {
                renderSpy()
                return (
                    <SwitchGroup {...props}>
                        <Switch label="Option 1" value="option1" />
                        <Switch label="Option 2" value="option2" />
                    </SwitchGroup>
                )
            }

            const { rerender } = render(
                <TestSwitchGroup
                    name="stable-group"
                    label="Stable Group"
                    value={['option1']}
                />
            )

            renderSpy.mockClear()

            // Re-render with same props
            rerender(
                <TestSwitchGroup
                    name="stable-group"
                    label="Stable Group"
                    value={['option1']}
                />
            )

            // Should not cause unnecessary re-renders
            expect(renderSpy).toHaveBeenCalledTimes(1)
        })

        it('re-renders efficiently when value changes', async () => {
            const { rerender } = render(
                <SwitchGroup
                    name="changing-group"
                    label="Changing Group"
                    value={['option1']}
                >
                    <Switch label="Option 1" value="option1" />
                    <Switch label="Option 2" value="option2" />
                </SwitchGroup>
            )

            const rerenderTime = await measureComponentPerformance(() => {
                rerender(
                    <SwitchGroup
                        name="changing-group"
                        label="Changing Group"
                        value={['option2']}
                    >
                        <Switch label="Option 1" value="option1" />
                        <Switch label="Option 2" value="option2" />
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                rerenderTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange
            )
        })

        it('handles rapid value changes efficiently', async () => {
            const { rerender } = render(
                <SwitchGroup name="rapid-group" label="Rapid Group" value={[]}>
                    <Switch label="Option 1" value="option1" />
                    <Switch label="Option 2" value="option2" />
                    <Switch label="Option 3" value="option3" />
                </SwitchGroup>
            )

            const rapidRerenderTime = await measureComponentPerformance(() => {
                const values = [
                    ['option1'],
                    ['option1', 'option2'],
                    ['option2'],
                    ['option2', 'option3'],
                    ['option3'],
                    [],
                ]

                values.forEach((value) => {
                    rerender(
                        <SwitchGroup
                            name="rapid-group"
                            label="Rapid Group"
                            value={value}
                        >
                            <Switch label="Option 1" value="option1" />
                            <Switch label="Option 2" value="option2" />
                            <Switch label="Option 3" value="option3" />
                        </SwitchGroup>
                    )
                })
            })

            assertPerformanceWithinBudget(
                rapidRerenderTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange * 6
            )
        })

        it('optimizes re-renders with complex content', async () => {
            const complexProps = SwitchGroupTestFactory.complex()
            const { rerender } = render(
                <SwitchGroup {...complexProps}>
                    <Switch
                        label="Complex Option 1"
                        value="option1"
                        subtext="Info 1"
                    />
                    <Switch
                        label="Complex Option 2"
                        value="option2"
                        subtext="Info 2"
                    />
                </SwitchGroup>
            )

            const rerenderTime = await measureComponentPerformance(() => {
                rerender(
                    <SwitchGroup {...complexProps} value={['option1']}>
                        <Switch
                            label="Complex Option 1"
                            value="option1"
                            subtext="Info 1"
                        />
                        <Switch
                            label="Complex Option 2"
                            value="option2"
                            subtext="Info 2"
                        />
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                rerenderTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange
            )
        })
    })

    describe('Event Handler Performance', () => {
        it('handles switch interactions efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup name="interaction-group" onChange={handleChange}>
                    <Switch label="Performance Switch 1" value="perf1" />
                    <Switch label="Performance Switch 2" value="perf2" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const interactionTime = await measureComponentPerformance(
                async () => {
                    await user.click(switches[0])
                }
            )

            assertPerformanceWithinBudget(
                interactionTime,
                PERFORMANCE_THRESHOLDS.animation.hover
            )
            expect(handleChange).toHaveBeenCalledWith(['perf1'])
        })

        it('handles keyboard events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup name="keyboard-group" onChange={handleChange}>
                    <Switch label="Keyboard Switch 1" value="key1" />
                    <Switch label="Keyboard Switch 2" value="key2" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')
            switches[0].focus()

            const keyboardTime = await measureComponentPerformance(async () => {
                await user.keyboard(' ')
            })

            assertPerformanceWithinBudget(
                keyboardTime,
                PERFORMANCE_THRESHOLDS.animation.hover
            )
            expect(handleChange).toHaveBeenCalledWith(['key1'])
        })

        it('handles rapid interactions efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup
                    name="rapid-interaction-group"
                    onChange={handleChange}
                >
                    <Switch label="Rapid Switch 1" value="rapid1" />
                    <Switch label="Rapid Switch 2" value="rapid2" />
                    <Switch label="Rapid Switch 3" value="rapid3" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const rapidInteractionTime = await measureComponentPerformance(
                async () => {
                    for (let i = 0; i < 3; i++) {
                        await user.click(switches[i])
                    }
                }
            )

            assertPerformanceWithinBudget(
                rapidInteractionTime,
                PERFORMANCE_THRESHOLDS.animation.hover * 3
            )
            expect(handleChange).toHaveBeenCalledTimes(3)
        })

        it('maintains performance with complex onChange handlers', async () => {
            const complexHandler = vi.fn((values) => {
                // Simulate complex logic
                for (let i = 0; i < 100; i++) {
                    Math.random()
                }
                return values
            })

            const { user } = render(
                <SwitchGroup
                    name="complex-handler-group"
                    onChange={complexHandler}
                >
                    <Switch label="Complex Handler Switch" value="complex" />
                </SwitchGroup>
            )

            const switchElement = screen.getByRole('switch')

            const handlerTime = await measureComponentPerformance(async () => {
                await user.click(switchElement)
            })

            // Should still be reasonably fast even with complex handler
            assertPerformanceWithinBudget(
                handlerTime,
                PERFORMANCE_THRESHOLDS.animation.hover * 2
            )
        })
    })

    describe('State Management Performance', () => {
        it('manages controlled state efficiently', async () => {
            const { rerender } = render(
                <SwitchGroup name="controlled-perf" value={[]}>
                    <Switch label="Controlled 1" value="ctrl1" />
                    <Switch label="Controlled 2" value="ctrl2" />
                    <Switch label="Controlled 3" value="ctrl3" />
                </SwitchGroup>
            )

            const stateManagementTime = await measureComponentPerformance(
                () => {
                    // Simulate multiple state updates
                    const stateSequence = [
                        ['ctrl1'],
                        ['ctrl1', 'ctrl2'],
                        ['ctrl1', 'ctrl2', 'ctrl3'],
                        ['ctrl2', 'ctrl3'],
                        ['ctrl3'],
                        [],
                    ]

                    stateSequence.forEach((value) => {
                        rerender(
                            <SwitchGroup name="controlled-perf" value={value}>
                                <Switch label="Controlled 1" value="ctrl1" />
                                <Switch label="Controlled 2" value="ctrl2" />
                                <Switch label="Controlled 3" value="ctrl3" />
                            </SwitchGroup>
                        )
                    })
                }
            )

            assertPerformanceWithinBudget(
                stateManagementTime,
                PERFORMANCE_THRESHOLDS.reRender.stateChange * 6
            )
        })

        it('manages uncontrolled state efficiently', async () => {
            const { user } = render(
                <SwitchGroup name="uncontrolled-perf" defaultValue={[]}>
                    <Switch label="Uncontrolled 1" value="unctrl1" />
                    <Switch label="Uncontrolled 2" value="unctrl2" />
                    <Switch label="Uncontrolled 3" value="unctrl3" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const uncontrolledStateTime = await measureComponentPerformance(
                async () => {
                    // Multiple state changes through user interaction
                    for (const switchElement of switches) {
                        await user.click(switchElement)
                    }
                }
            )

            assertPerformanceWithinBudget(
                uncontrolledStateTime,
                PERFORMANCE_THRESHOLDS.reRender.stateChange * 3
            )
        })

        it('handles state synchronization efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup name="sync-group" onChange={handleChange}>
                    <Switch label="Sync 1" value="sync1" />
                    <Switch label="Sync 2" value="sync2" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const syncTime = await measureComponentPerformance(async () => {
                // Rapid state changes that require synchronization
                await user.click(switches[0])
                await user.click(switches[1])
                await user.click(switches[0]) // Toggle off
            })

            assertPerformanceWithinBudget(
                syncTime,
                PERFORMANCE_THRESHOLDS.reRender.stateChange * 3
            )
            expect(handleChange).toHaveBeenCalledTimes(3)
        })
    })

    describe('Memory Performance', () => {
        it('cleans up properly on unmount', () => {
            const { unmount } = render(
                <SwitchGroup name="cleanup-group" label="Cleanup Group">
                    <Switch label="Cleanup Switch 1" value="cleanup1" />
                    <Switch label="Cleanup Switch 2" value="cleanup2" />
                </SwitchGroup>
            )

            // Verify component unmounts without errors
            expect(() => unmount()).not.toThrow()
        })

        it('handles multiple mount/unmount cycles efficiently', async () => {
            const mountUnmountTime = await measureComponentPerformance(() => {
                for (let i = 0; i < 10; i++) {
                    const { unmount } = render(
                        <SwitchGroup
                            name={`cycle-group-${i}`}
                            label={`Cycle Group ${i}`}
                        >
                            <Switch label="Cycle Switch 1" value="cycle1" />
                            <Switch label="Cycle Switch 2" value="cycle2" />
                        </SwitchGroup>
                    )
                    unmount()
                }
            })

            assertPerformanceWithinBudget(
                mountUnmountTime,
                PERFORMANCE_THRESHOLDS.render.complex * 10
            )
        })

        it('manages child component lifecycle efficiently', async () => {
            const DynamicSwitchGroup = ({ count }: { count: number }) => (
                <SwitchGroup name="dynamic-lifecycle" label="Dynamic Lifecycle">
                    {Array.from({ length: count }, (_, i) => (
                        <Switch
                            key={i}
                            label={`Dynamic ${i + 1}`}
                            value={`dynamic${i + 1}`}
                        />
                    ))}
                </SwitchGroup>
            )

            const { rerender } = render(<DynamicSwitchGroup count={3} />)

            const lifecycleTime = await measureComponentPerformance(() => {
                rerender(<DynamicSwitchGroup count={6} />)
                rerender(<DynamicSwitchGroup count={2} />)
                rerender(<DynamicSwitchGroup count={5} />)
            })

            assertPerformanceWithinBudget(
                lifecycleTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange * 3
            )
        })
    })

    describe('Token Resolution Performance', () => {
        it('resolves responsive tokens efficiently', async () => {
            const tokenResolutionTime = await measureComponentPerformance(
                () => {
                    render(
                        <SwitchGroup
                            name="token-group"
                            label="Token Resolution Group"
                        >
                            <Switch label="Token Switch 1" value="token1" />
                            <Switch label="Token Switch 2" value="token2" />
                        </SwitchGroup>
                    )
                }
            )

            assertPerformanceWithinBudget(
                tokenResolutionTime,
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })

        it('caches token resolution across instances', async () => {
            const multiInstanceTime = await measureComponentPerformance(() => {
                render(
                    <>
                        {Array.from({ length: 5 }, (_, i) => (
                            <SwitchGroup
                                key={i}
                                name={`cached-group-${i}`}
                                label={`Cached Group ${i}`}
                            >
                                <Switch label="Cached Switch" value="cached" />
                            </SwitchGroup>
                        ))}
                    </>
                )
            })

            // Multiple instances should benefit from token caching
            assertPerformanceWithinBudget(
                multiInstanceTime,
                PERFORMANCE_THRESHOLDS.render.complex
            )
        })
    })

    describe('Complex Scenarios Performance', () => {
        it('performs well in form contexts', async () => {
            const formRenderTime = await measureComponentPerformance(() => {
                render(
                    <form>
                        <fieldset>
                            <legend>Performance Form</legend>
                            {Array.from({ length: 3 }, (_, i) => (
                                <SwitchGroup
                                    key={i}
                                    name={`form-group-${i}`}
                                    label={`Form Group ${i}`}
                                >
                                    <Switch
                                        label="Form Switch 1"
                                        value="form1"
                                    />
                                    <Switch
                                        label="Form Switch 2"
                                        value="form2"
                                    />
                                </SwitchGroup>
                            ))}
                        </fieldset>
                    </form>
                )
            })

            assertPerformanceWithinBudget(
                formRenderTime,
                PERFORMANCE_THRESHOLDS.render.complex
            )
        })

        it('handles nested group structures efficiently', async () => {
            const nestedRenderTime = await measureComponentPerformance(() => {
                render(
                    <div>
                        <SwitchGroup name="parent-group" label="Parent Group">
                            <Switch label="Parent Switch 1" value="parent1" />
                            <Switch label="Parent Switch 2" value="parent2" />
                        </SwitchGroup>
                        <div>
                            <SwitchGroup name="child-group" label="Child Group">
                                <Switch label="Child Switch 1" value="child1" />
                                <Switch label="Child Switch 2" value="child2" />
                            </SwitchGroup>
                        </div>
                    </div>
                )
            })

            assertPerformanceWithinBudget(
                nestedRenderTime,
                PERFORMANCE_THRESHOLDS.render.complex
            )
        })

        it('maintains performance with complex switch content', async () => {
            const complexContentTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup
                        name="complex-content-group"
                        label="Complex Content Group"
                    >
                        <Switch
                            label={
                                <div>
                                    <strong>Complex Label</strong>
                                    <span> with multiple elements</span>
                                </div>
                            }
                            value="complex1"
                            subtext="Complex subtext with additional information"
                        />
                        <Switch
                            label="Another complex switch"
                            value="complex2"
                            subtext="More complex content"
                            required
                        />
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                complexContentTime,
                PERFORMANCE_THRESHOLDS.render.complex
            )
        })
    })

    describe('Edge Case Performance', () => {
        it('handles undefined props efficiently', async () => {
            const undefinedPropsTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup
                        name="undefined-group"
                        value={undefined}
                        onChange={undefined}
                        disabled={undefined}
                    >
                        <Switch
                            label="Undefined Props Switch"
                            value="undefined"
                        />
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                undefinedPropsTime,
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })

        it('performs well with empty children', async () => {
            const emptyChildrenTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup name="empty-group" label="Empty Group">
                        {null}
                        {undefined}
                        {false}
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                emptyChildrenTime,
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })

        it('handles mixed content types efficiently', async () => {
            const mixedContentTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup name="mixed-group" label="Mixed Content Group">
                        <Switch label="Valid Switch" value="valid" />
                        <div>Non-switch content</div>
                        <Switch label="Another Switch" value="another" />
                        <span>More non-switch content</span>
                    </SwitchGroup>
                )
            })

            assertPerformanceWithinBudget(
                mixedContentTime,
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })
    })

    describe('Stress Testing', () => {
        it('handles large numbers of switch groups', async () => {
            const stressTestTime = await measureComponentPerformance(() => {
                render(
                    <>
                        {Array.from({ length: 10 }, (_, i) => (
                            <SwitchGroup
                                key={i}
                                name={`stress-group-${i}`}
                                label={`Stress Group ${i}`}
                            >
                                <Switch
                                    label="Stress Switch 1"
                                    value="stress1"
                                />
                                <Switch
                                    label="Stress Switch 2"
                                    value="stress2"
                                />
                            </SwitchGroup>
                        ))}
                    </>
                )
            })

            assertPerformanceWithinBudget(
                stressTestTime,
                PERFORMANCE_THRESHOLDS.render.complex * 3
            )
        })

        it('maintains performance under rapid state changes', async () => {
            const { user } = render(
                <SwitchGroup name="rapid-state-group" defaultValue={[]}>
                    <Switch label="Rapid State Switch 1" value="rapid1" />
                    <Switch label="Rapid State Switch 2" value="rapid2" />
                    <Switch label="Rapid State Switch 3" value="rapid3" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const rapidStateTime = await measureComponentPerformance(
                async () => {
                    for (let i = 0; i < 10; i++) {
                        await user.click(switches[i % switches.length])
                    }
                }
            )

            assertPerformanceWithinBudget(
                rapidStateTime,
                PERFORMANCE_THRESHOLDS.reRender.stateChange * 10
            )
        })

        it('handles memory pressure gracefully', async () => {
            // Simulate memory pressure by creating and destroying many components
            const memoryPressureTime = await measureComponentPerformance(() => {
                for (let i = 0; i < 20; i++) {
                    const { unmount } = render(
                        <SwitchGroup
                            name={`memory-group-${i}`}
                            label={`Memory Group ${i}`}
                        >
                            <Switch label="Memory Switch 1" value="mem1" />
                            <Switch label="Memory Switch 2" value="mem2" />
                        </SwitchGroup>
                    )
                    unmount()
                }
            })

            assertPerformanceWithinBudget(
                memoryPressureTime,
                PERFORMANCE_THRESHOLDS.render.complex * 10
            )
        })
    })

    describe('Performance Regression Prevention', () => {
        it('maintains baseline performance metrics', async () => {
            const baselineTime = await measureComponentPerformance(() => {
                render(
                    <SwitchGroup name="baseline-group" label="Baseline Group">
                        <Switch label="Baseline Switch" value="baseline" />
                    </SwitchGroup>
                )
            })

            // This test serves as a baseline for performance regression detection
            expect(baselineTime).toBeLessThan(
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })

        it('tracks performance across different configurations', async () => {
            const configurations = [
                { name: 'simple', props: SwitchGroupTestFactory.default() },
                {
                    name: 'controlled',
                    props: SwitchGroupTestFactory.controlled(),
                },
                { name: 'disabled', props: SwitchGroupTestFactory.disabled() },
                {
                    name: 'multiple',
                    props: SwitchGroupTestFactory.multipleSelected(),
                },
            ]

            for (const config of configurations) {
                const renderTime = await measureComponentPerformance(() => {
                    render(
                        <SwitchGroup {...config.props}>
                            <Switch label="Config Switch 1" value="config1" />
                            <Switch label="Config Switch 2" value="config2" />
                        </SwitchGroup>
                    )
                })

                assertPerformanceWithinBudget(
                    renderTime,
                    PERFORMANCE_THRESHOLDS.render.simple
                )
            }
        })
    })
})

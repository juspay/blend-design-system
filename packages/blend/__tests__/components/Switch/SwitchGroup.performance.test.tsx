import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    render,
    screen,
    measureRenderTime,
    assertPerformanceWithContext,
} from '../../test-utils'
import SwitchGroup from '../../../lib/components/Switch/SwitchGroup'
import { Switch } from '../../../lib/components/Switch/Switch'
import { SwitchGroupTestFactory } from '../../test-utils/builders'

// Helper to get current test name for performance tracking
function getCurrentTestName(): string {
    const testContext = expect.getState() as { currentTestName?: string }
    return testContext.currentTestName || 'unknown-test'
}

describe('SwitchGroup Performance', () => {
    let defaultProps: Record<string, unknown>

    beforeEach(() => {
        defaultProps = SwitchGroupTestFactory.default()
    })

    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(
                <SwitchGroup {...defaultProps}>
                    <Switch value="option1" label="Option 1" />
                    <Switch value="option2" label="Option 2" />
                </SwitchGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('renders complex group within budget', async () => {
            const complexProps = SwitchGroupTestFactory.complex()
            const renderTime = await measureRenderTime(
                <SwitchGroup {...complexProps}>
                    <Switch
                        value="complex1"
                        label="Complex Option 1"
                        subtext="Description 1"
                    />
                    <Switch
                        value="complex2"
                        label="Complex Option 2"
                        subtext="Description 2"
                    />
                    <Switch
                        value="complex3"
                        label="Complex Option 3"
                        subtext="Description 3"
                    />
                </SwitchGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders multiple switch groups efficiently', async () => {
            const renderTime = await measureRenderTime(
                <>
                    <SwitchGroup label="Group 1">
                        <Switch value="g1o1" label="Group 1 Option 1" />
                        <Switch value="g1o2" label="Group 1 Option 2" />
                    </SwitchGroup>
                    <SwitchGroup label="Group 2">
                        <Switch value="g2o1" label="Group 2 Option 1" />
                        <Switch value="g2o2" label="Group 2 Option 2" />
                    </SwitchGroup>
                    <SwitchGroup label="Group 3">
                        <Switch value="g3o1" label="Group 3 Option 1" />
                        <Switch value="g3o2" label="Group 3 Option 2" />
                    </SwitchGroup>
                </>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles large numbers of switches efficiently', async () => {
            const renderTime = await measureRenderTime(
                <SwitchGroup label="Large Group">
                    {Array.from({ length: 10 }, (_, i) => (
                        <Switch
                            key={i}
                            value={`large${i + 1}`}
                            label={`Large Option ${i + 1}`}
                        />
                    ))}
                </SwitchGroup>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders different group states efficiently', async () => {
            const renderTime = await measureRenderTime(
                <>
                    <SwitchGroup label="Default Group">
                        <Switch value="default1" label="Default 1" />
                        <Switch value="default2" label="Default 2" />
                    </SwitchGroup>
                    <SwitchGroup label="Disabled Group" disabled>
                        <Switch value="disabled1" label="Disabled 1" />
                        <Switch value="disabled2" label="Disabled 2" />
                    </SwitchGroup>
                    <SwitchGroup label="Error Group">
                        <Switch value="error1" label="Error 1" />
                        <Switch value="error2" label="Error 2" />
                    </SwitchGroup>
                </>
            )

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })

    describe('Re-render Performance', () => {
        it('avoids unnecessary re-renders with stable props', async () => {
            const renderSpy = vi.fn()
            const TestSwitchGroup = (props: Record<string, unknown>) => {
                renderSpy()
                return (
                    <SwitchGroup {...props}>
                        <Switch value="stable1" label="Stable 1" />
                        <Switch value="stable2" label="Stable 2" />
                    </SwitchGroup>
                )
            }

            const { rerender } = render(
                <TestSwitchGroup label="Stable Group" value={[]} />
            )

            renderSpy.mockClear()

            const start = performance.now()
            rerender(<TestSwitchGroup label="Stable Group" value={[]} />)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
            expect(renderSpy).toHaveBeenCalledTimes(1)
        })

        it('re-renders efficiently when value changes', async () => {
            const { rerender } = render(
                <SwitchGroup label="Value Change Group" value={[]}>
                    <Switch value="change1" label="Change 1" />
                    <Switch value="change2" label="Change 2" />
                </SwitchGroup>
            )

            const start = performance.now()
            rerender(
                <SwitchGroup label="Value Change Group" value={['change1']}>
                    <Switch value="change1" label="Change 1" />
                    <Switch value="change2" label="Change 2" />
                </SwitchGroup>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles rapid value changes efficiently', async () => {
            const { rerender } = render(
                <SwitchGroup label="Rapid Group" value={[]}>
                    <Switch value="rapid1" label="Rapid 1" />
                    <Switch value="rapid2" label="Rapid 2" />
                    <Switch value="rapid3" label="Rapid 3" />
                </SwitchGroup>
            )

            const start = performance.now()
            const values = [
                [],
                ['rapid1'],
                ['rapid1', 'rapid2'],
                ['rapid2'],
                ['rapid2', 'rapid3'],
                ['rapid3'],
                [],
            ]

            values.forEach((value) => {
                rerender(
                    <SwitchGroup label="Rapid Group" value={value}>
                        <Switch value="rapid1" label="Rapid 1" />
                        <Switch value="rapid2" label="Rapid 2" />
                        <Switch value="rapid3" label="Rapid 3" />
                    </SwitchGroup>
                )
            })
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('optimizes re-renders with complex content', async () => {
            const complexProps = SwitchGroupTestFactory.complex()
            const { rerender } = render(
                <SwitchGroup {...complexProps} value={[]}>
                    <Switch
                        value="complex1"
                        label="Complex 1"
                        subtext="Description 1"
                    />
                    <Switch
                        value="complex2"
                        label="Complex 2"
                        subtext="Description 2"
                    />
                </SwitchGroup>
            )

            const start = performance.now()
            rerender(
                <SwitchGroup {...complexProps} value={['complex1']}>
                    <Switch
                        value="complex1"
                        label="Complex 1"
                        subtext="Description 1"
                    />
                    <Switch
                        value="complex2"
                        label="Complex 2"
                        subtext="Description 2"
                    />
                </SwitchGroup>
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

    describe('Event Handler Performance', () => {
        it('handles switch interactions efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup
                    name="event-group"
                    label="Event Group"
                    onChange={handleChange}
                >
                    <Switch value="event1" label="Event 1" />
                    <Switch value="event2" label="Event 2" />
                    <Switch value="event3" label="Event 3" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const start = performance.now()
            await user.click(switches[0])
            await user.click(switches[1])
            await user.click(switches[2])
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
            expect(handleChange).toHaveBeenCalledTimes(3)
        })

        it('handles keyboard events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup label="Keyboard Group" onChange={handleChange}>
                    <Switch value="key1" label="Key 1" />
                    <Switch value="key2" label="Key 2" />
                    <Switch value="key3" label="Key 3" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')
            switches[0].focus()

            const start = performance.now()
            await user.keyboard(' ')
            await user.tab()
            await user.keyboard(' ')
            await user.tab()
            await user.keyboard(' ')
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('handles rapid interactions efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup
                    label="Rapid Interaction Group"
                    onChange={handleChange}
                >
                    <Switch value="rapid1" label="Rapid 1" />
                    <Switch value="rapid2" label="Rapid 2" />
                    <Switch value="rapid3" label="Rapid 3" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const start = performance.now()
            for (let i = 0; i < 10; i++) {
                await user.click(switches[i % 3])
            }
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
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
                    label="Complex Handler Group"
                    onChange={complexHandler}
                >
                    <Switch value="complex1" label="Complex 1" />
                    <Switch value="complex2" label="Complex 2" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const start = performance.now()
            await user.click(switches[0])
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })

    describe('State Management Performance', () => {
        it('manages controlled state efficiently', async () => {
            const handleChange = vi.fn()
            const controlledProps = SwitchGroupTestFactory.controlled()

            const start = performance.now()
            render(
                <SwitchGroup {...controlledProps} onChange={handleChange}>
                    <Switch value="controlled1" label="Controlled 1" />
                    <Switch value="controlled2" label="Controlled 2" />
                    <Switch value="controlled3" label="Controlled 3" />
                    <Switch value="controlled4" label="Controlled 4" />
                    <Switch value="controlled5" label="Controlled 5" />
                </SwitchGroup>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('manages uncontrolled state efficiently', async () => {
            const uncontrolledProps = SwitchGroupTestFactory.uncontrolled()

            const start = performance.now()
            render(
                <SwitchGroup {...uncontrolledProps}>
                    <Switch value="uncontrolled1" label="Uncontrolled 1" />
                    <Switch value="uncontrolled2" label="Uncontrolled 2" />
                    <Switch value="uncontrolled3" label="Uncontrolled 3" />
                    <Switch value="uncontrolled4" label="Uncontrolled 4" />
                    <Switch value="uncontrolled5" label="Uncontrolled 5" />
                </SwitchGroup>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles state synchronization efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SwitchGroup label="Sync Group" onChange={handleChange}>
                    <Switch value="sync1" label="Sync 1" />
                    <Switch value="sync2" label="Sync 2" />
                    <Switch value="sync3" label="Sync 3" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const start = performance.now()
            await user.click(switches[0])
            await user.click(switches[1])
            await user.click(switches[0]) // Toggle off
            await user.click(switches[2])
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })
    })

    describe('Memory Performance', () => {
        it('cleans up properly on unmount', async () => {
            const { unmount } = render(
                <SwitchGroup label="Cleanup Group">
                    <Switch value="cleanup1" label="Cleanup 1" />
                    <Switch value="cleanup2" label="Cleanup 2" />
                    <Switch value="cleanup3" label="Cleanup 3" />
                </SwitchGroup>
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
            const start = performance.now()
            for (let i = 0; i < 5; i++) {
                const { unmount } = render(
                    <SwitchGroup label={`Lifecycle Group ${i}`}>
                        <Switch value="lifecycle1" label="Lifecycle 1" />
                        <Switch value="lifecycle2" label="Lifecycle 2" />
                    </SwitchGroup>
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

        it('manages child component lifecycle efficiently', async () => {
            const DynamicSwitchGroup = ({ count }: { count: number }) => (
                <SwitchGroup label="Dynamic Group">
                    {Array.from({ length: count }, (_, i) => (
                        <Switch
                            key={i}
                            value={`dynamic${i}`}
                            label={`Dynamic ${i}`}
                        />
                    ))}
                </SwitchGroup>
            )

            const { rerender } = render(<DynamicSwitchGroup count={2} />)

            const start = performance.now()
            rerender(<DynamicSwitchGroup count={5} />)
            rerender(<DynamicSwitchGroup count={3} />)
            rerender(<DynamicSwitchGroup count={7} />)
            rerender(<DynamicSwitchGroup count={1} />)
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })
    })

    describe('Token Resolution Performance', () => {
        it('resolves responsive tokens efficiently', async () => {
            const start = performance.now()
            render(
                <SwitchGroup label="Token Resolution Group">
                    <Switch value="token1" label="Token 1" />
                    <Switch value="token2" label="Token 2" />
                </SwitchGroup>
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
                <>
                    {Array.from({ length: 3 }, (_, groupIndex) => (
                        <SwitchGroup
                            key={groupIndex}
                            label={`Cached Group ${groupIndex}`}
                        >
                            {Array.from({ length: 2 }, (_, switchIndex) => (
                                <Switch
                                    key={switchIndex}
                                    value={`cached${groupIndex}${switchIndex}`}
                                    label={`Cached ${groupIndex}-${switchIndex}`}
                                />
                            ))}
                        </SwitchGroup>
                    ))}
                </>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })

    describe('Complex Scenarios Performance', () => {
        it('performs well in form contexts', async () => {
            const start = performance.now()
            render(
                <form>
                    <fieldset>
                        <legend>Performance Form</legend>
                        <SwitchGroup label="Form Group 1">
                            <Switch value="form1" label="Form Switch 1" />
                            <Switch value="form2" label="Form Switch 2" />
                        </SwitchGroup>
                        <SwitchGroup label="Form Group 2">
                            <Switch value="form3" label="Form Switch 3" />
                            <Switch value="form4" label="Form Switch 4" />
                        </SwitchGroup>
                    </fieldset>
                </form>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles nested group structures efficiently', async () => {
            const start = performance.now()
            render(
                <div>
                    <SwitchGroup label="Parent Group">
                        <Switch value="parent1" label="Parent 1" />
                        <div>
                            <SwitchGroup label="Nested Group">
                                <Switch value="nested1" label="Nested 1" />
                                <Switch value="nested2" label="Nested 2" />
                            </SwitchGroup>
                        </div>
                        <Switch value="parent2" label="Parent 2" />
                    </SwitchGroup>
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

        it('maintains performance with complex switch content', async () => {
            const start = performance.now()
            render(
                <SwitchGroup label="Complex Content Group">
                    <Switch
                        value="complex1"
                        label={
                            <div>
                                <strong>Complex Label 1</strong>
                                <span> with formatting</span>
                            </div>
                        }
                        subtext="Complex description with details"
                    />
                    <Switch
                        value="complex2"
                        label={
                            <div>
                                <strong>Complex Label 2</strong>
                                <em> with emphasis</em>
                            </div>
                        }
                        subtext="Another complex description"
                    />
                </SwitchGroup>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })

    describe('Edge Case Performance', () => {
        it('handles undefined props efficiently', async () => {
            const start = performance.now()
            render(
                <SwitchGroup
                    label="Undefined Props Group"
                    value={undefined}
                    onChange={undefined}
                    disabled={undefined}
                >
                    <Switch value="undefined1" label="Undefined 1" />
                    <Switch value="undefined2" label="Undefined 2" />
                </SwitchGroup>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('performs well with empty children', async () => {
            const start = performance.now()
            render(
                <SwitchGroup label="Empty Children Group">
                    <div></div>
                </SwitchGroup>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('handles mixed content types efficiently', async () => {
            const start = performance.now()
            render(
                <SwitchGroup label="Mixed Content Group">
                    <Switch value="mixed1" label="Mixed 1" />
                    <div>Some text content</div>
                    <Switch value="mixed2" label="Mixed 2" />
                    {null}
                    <Switch value="mixed3" label="Mixed 3" />
                    {/* Conditional rendering example - normally would be a variable */}
                    {null}
                </SwitchGroup>
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

    describe('Stress Testing', () => {
        it('handles large numbers of switch groups', async () => {
            const start = performance.now()
            render(
                <>
                    {Array.from({ length: 5 }, (_, groupIndex) => (
                        <SwitchGroup
                            key={groupIndex}
                            label={`Stress Group ${groupIndex}`}
                        >
                            {Array.from({ length: 4 }, (_, switchIndex) => (
                                <Switch
                                    key={switchIndex}
                                    value={`stress${groupIndex}${switchIndex}`}
                                    label={`Stress ${groupIndex}-${switchIndex}`}
                                />
                            ))}
                        </SwitchGroup>
                    ))}
                </>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'memory',
                'stress',
                getCurrentTestName()
            )
        })

        it('maintains performance under rapid state changes', async () => {
            const { user } = render(
                <SwitchGroup label="Rapid State Group">
                    <Switch value="rapid1" label="Rapid 1" />
                    <Switch value="rapid2" label="Rapid 2" />
                    <Switch value="rapid3" label="Rapid 3" />
                    <Switch value="rapid4" label="Rapid 4" />
                    <Switch value="rapid5" label="Rapid 5" />
                </SwitchGroup>
            )

            const switches = screen.getAllByRole('switch')

            const start = performance.now()
            for (let i = 0; i < 15; i++) {
                await user.click(switches[i % 5])
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
            for (let i = 0; i < 10; i++) {
                const { unmount } = render(
                    <SwitchGroup label={`Memory Pressure Group ${i}`}>
                        <Switch value="pressure1" label="Pressure 1" />
                        <Switch value="pressure2" label="Pressure 2" />
                        <Switch value="pressure3" label="Pressure 3" />
                    </SwitchGroup>
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
            const start = performance.now()
            render(
                <SwitchGroup label="Baseline Group">
                    <Switch value="baseline1" label="Baseline 1" />
                    <Switch value="baseline2" label="Baseline 2" />
                </SwitchGroup>
            )
            const end = performance.now()

            assertPerformanceWithContext(
                end - start,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('tracks performance across different configurations', async () => {
            const configurations = [
                { label: 'Simple', children: 2 },
                { label: 'Medium', children: 5 },
                { label: 'Large', children: 8 },
            ]

            for (const config of configurations) {
                const start = performance.now()
                render(
                    <SwitchGroup label={config.label}>
                        {Array.from({ length: config.children }, (_, i) => (
                            <Switch
                                key={i}
                                value={`config${i}`}
                                label={`Config ${i}`}
                            />
                        ))}
                    </SwitchGroup>
                )
                const end = performance.now()

                assertPerformanceWithContext(
                    end - start,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            }
        })
    })
})

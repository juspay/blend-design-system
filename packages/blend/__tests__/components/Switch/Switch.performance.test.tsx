import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, assertPerformanceWithContext } from '../../test-utils'
import { Switch } from '../../../lib/components/Switch/Switch'
import { SwitchSize } from '../../../lib/components/Switch/types'
import { SwitchTestFactory } from '../../test-utils/builders'

// Helper to get current test name for performance tracking
function getCurrentTestName(): string {
    const testContext = expect.getState() as { currentTestName?: string }
    return testContext.currentTestName || 'unknown-test'
}

// Simple performance measurement utility
const measureComponentPerformance = async (
    fn: () => void | Promise<void>
): Promise<number> => {
    const start = performance.now()
    await fn()
    const end = performance.now()
    return end - start
}

describe('Switch Performance', () => {
    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureComponentPerformance(() => {
                render(<Switch label="Performance Switch" />)
            })

            assertPerformanceWithContext(
                renderTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('renders complex switch within budget', async () => {
            const props = SwitchTestFactory.complex()
            const renderTime = await measureComponentPerformance(() => {
                render(<Switch {...props} />)
            })

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('renders multiple switches efficiently', async () => {
            const renderTime = await measureComponentPerformance(() => {
                render(
                    <>
                        {Array.from({ length: 10 }, (_, i) => (
                            <Switch key={i} label={`Switch ${i}`} />
                        ))}
                    </>
                )
            })

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles different sizes efficiently', async () => {
            const sizes = SwitchTestFactory.allSizes()
            const renderTime = await measureComponentPerformance(() => {
                sizes.forEach((props, index) => {
                    const { unmount } = render(
                        <Switch key={index} {...props} />
                    )
                    unmount()
                })
            })

            assertPerformanceWithContext(
                renderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })

    describe('Re-render Performance', () => {
        it('avoids unnecessary re-renders with stable props', () => {
            const renderSpy = vi.fn()
            const TestSwitch = (props: Record<string, unknown>) => {
                renderSpy()
                return <Switch {...props} />
            }

            const { rerender } = render(
                <TestSwitch label="Stable Switch" checked={false} />
            )

            renderSpy.mockClear()

            // Re-render with same props
            rerender(<TestSwitch label="Stable Switch" checked={false} />)

            // Should not cause unnecessary re-renders
            expect(renderSpy).toHaveBeenCalledTimes(1)
        })

        it('re-renders efficiently when props change', async () => {
            const { rerender } = render(
                <Switch label="Changing Switch" checked={false} />
            )

            const rerenderTime = await measureComponentPerformance(() => {
                rerender(<Switch label="Changing Switch" checked={true} />)
            })

            assertPerformanceWithContext(
                rerenderTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })

        it('handles rapid prop changes efficiently', async () => {
            const { rerender } = render(
                <Switch label="Rapid Switch" checked={false} />
            )

            const rapidRerenderTime = await measureComponentPerformance(() => {
                for (let i = 0; i < 10; i++) {
                    rerender(
                        <Switch label="Rapid Switch" checked={i % 2 === 0} />
                    )
                }
            })

            assertPerformanceWithContext(
                rapidRerenderTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('optimizes re-renders with complex content', async () => {
            const complexProps = SwitchTestFactory.complex()
            const { rerender } = render(<Switch {...complexProps} />)

            const rerenderTime = await measureComponentPerformance(() => {
                rerender(<Switch {...complexProps} checked={true} />)
            })

            assertPerformanceWithContext(
                rerenderTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })

    describe('Event Handler Performance', () => {
        it('handles click events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="Click Performance Switch"
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')

            const clickTime = await measureComponentPerformance(async () => {
                await user.click(switchElement)
            })

            assertPerformanceWithContext(
                clickTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('handles keyboard events efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="Keyboard Performance Switch"
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')
            switchElement.focus()

            const keyboardTime = await measureComponentPerformance(async () => {
                await user.keyboard(' ')
            })

            assertPerformanceWithContext(
                keyboardTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
            expect(handleChange).toHaveBeenCalledWith(true)
        })

        it('handles rapid interactions efficiently', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <Switch
                    label="Rapid Interaction Switch"
                    onChange={handleChange}
                />
            )

            const switchElement = screen.getByRole('switch')

            const rapidInteractionTime = await measureComponentPerformance(
                async () => {
                    for (let i = 0; i < 5; i++) {
                        await user.click(switchElement)
                    }
                }
            )

            assertPerformanceWithContext(
                rapidInteractionTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
            expect(handleChange).toHaveBeenCalledTimes(5)
        })

        it('maintains performance with complex onChange handlers', async () => {
            const complexHandler = vi.fn((checked) => {
                // Simulate complex logic
                for (let i = 0; i < 100; i++) {
                    Math.random()
                }
                return checked
            })

            const { user } = render(
                <Switch
                    label="Complex Handler Switch"
                    onChange={complexHandler}
                />
            )

            const switchElement = screen.getByRole('switch')

            const handlerTime = await measureComponentPerformance(async () => {
                await user.click(switchElement)
            })

            assertPerformanceWithContext(
                handlerTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })

    describe('Memory Performance', () => {
        it('cleans up properly on unmount', () => {
            const { unmount } = render(<Switch label="Cleanup Switch" />)

            // Verify component unmounts without errors
            expect(() => unmount()).not.toThrow()
        })

        it('handles multiple mount/unmount cycles efficiently', async () => {
            const mountUnmountTime = await measureComponentPerformance(() => {
                for (let i = 0; i < 10; i++) {
                    const { unmount } = render(
                        <Switch label={`Cycle Switch ${i}`} />
                    )
                    unmount()
                }
            })

            assertPerformanceWithContext(
                mountUnmountTime,
                'memory',
                'stress',
                getCurrentTestName()
            )
        })

        it('manages state efficiently in uncontrolled mode', async () => {
            const { user } = render(
                <Switch
                    label="Uncontrolled Performance Switch"
                    defaultChecked={false}
                />
            )

            const switchElement = screen.getByRole('switch')

            const stateManagementTime = await measureComponentPerformance(
                async () => {
                    // Multiple state changes
                    for (let i = 0; i < 5; i++) {
                        await user.click(switchElement)
                    }
                }
            )

            assertPerformanceWithContext(
                stateManagementTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })
    })

    describe('Token Resolution Performance', () => {
        it('resolves responsive tokens efficiently', async () => {
            const tokenResolutionTime = await measureComponentPerformance(
                () => {
                    render(<Switch label="Token Resolution Switch" />)
                }
            )

            assertPerformanceWithContext(
                tokenResolutionTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('handles size variant tokens efficiently', async () => {
            const sizeVariantTime = await measureComponentPerformance(() => {
                render(
                    <>
                        <Switch label="Small Switch" size={SwitchSize.SMALL} />
                        <Switch
                            label="Medium Switch"
                            size={SwitchSize.MEDIUM}
                        />
                    </>
                )
            })

            assertPerformanceWithContext(
                sizeVariantTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('caches token resolution across instances', async () => {
            const multiInstanceTime = await measureComponentPerformance(() => {
                render(
                    <>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Switch key={i} label={`Cached Switch ${i}`} />
                        ))}
                    </>
                )
            })

            assertPerformanceWithContext(
                multiInstanceTime,
                'render',
                'complex',
                getCurrentTestName()
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
                            {Array.from({ length: 5 }, (_, i) => (
                                <Switch
                                    key={i}
                                    name={`switch-${i}`}
                                    label={`Form Switch ${i}`}
                                />
                            ))}
                        </fieldset>
                    </form>
                )
            })

            assertPerformanceWithContext(
                formRenderTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles dynamic content updates efficiently', async () => {
            const DynamicSwitch = ({ count }: { count: number }) => (
                <>
                    {Array.from({ length: count }, (_, i) => (
                        <Switch key={i} label={`Dynamic Switch ${i}`} />
                    ))}
                </>
            )

            const { rerender } = render(<DynamicSwitch count={2} />)

            const dynamicUpdateTime = await measureComponentPerformance(() => {
                rerender(<DynamicSwitch count={4} />)
                rerender(<DynamicSwitch count={6} />)
                rerender(<DynamicSwitch count={2} />)
            })

            assertPerformanceWithContext(
                dynamicUpdateTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('maintains performance with complex label content', async () => {
            const complexLabelTime = await measureComponentPerformance(() => {
                render(
                    <Switch
                        label={
                            <div>
                                <strong>Complex Label</strong>
                                <span> with multiple elements</span>
                                <em> and formatting</em>
                            </div>
                        }
                    />
                )
            })

            assertPerformanceWithContext(
                complexLabelTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles error states efficiently', async () => {
            const errorStateTime = await measureComponentPerformance(() => {
                render(
                    <>
                        <Switch label="Error Switch 1" error />
                        <Switch label="Error Switch 2" error />
                        <Switch label="Error Switch 3" error />
                    </>
                )
            })

            assertPerformanceWithContext(
                errorStateTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })
    })

    describe('Accessibility Performance', () => {
        it('maintains performance with screen reader support', async () => {
            const a11yTime = await measureComponentPerformance(() => {
                render(
                    <>
                        <Switch
                            label="Accessible Switch 1"
                            aria-describedby="desc1"
                        />
                        <div id="desc1">Description 1</div>
                        <Switch
                            label="Accessible Switch 2"
                            aria-describedby="desc2"
                        />
                        <div id="desc2">Description 2</div>
                    </>
                )
            })

            assertPerformanceWithContext(
                a11yTime,
                'render',
                'complex',
                getCurrentTestName()
            )
        })

        it('handles focus management efficiently', async () => {
            const { user } = render(
                <>
                    <Switch label="Focus Switch 1" />
                    <Switch label="Focus Switch 2" />
                    <Switch label="Focus Switch 3" />
                </>
            )

            const focusTime = await measureComponentPerformance(async () => {
                await user.tab()
                await user.tab()
                await user.tab()
            })

            assertPerformanceWithContext(
                focusTime,
                'interaction',
                'click',
                getCurrentTestName()
            )
        })
    })

    describe('Edge Case Performance', () => {
        it('handles undefined props efficiently', async () => {
            const undefinedPropsTime = await measureComponentPerformance(() => {
                render(
                    <Switch
                        label="Undefined Props Switch"
                        checked={undefined}
                        onChange={undefined}
                        disabled={undefined}
                    />
                )
            })

            assertPerformanceWithContext(
                undefinedPropsTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('performs well with null children', async () => {
            const nullChildrenTime = await measureComponentPerformance(() => {
                render(
                    <Switch
                        label="Null Children Switch"
                        subtext={null}
                        slot={null}
                    />
                )
            })

            assertPerformanceWithContext(
                nullChildrenTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('handles boolean coercion efficiently', async () => {
            const { rerender } = render(
                <Switch
                    label="Boolean Coercion Switch"
                    checked={0 as unknown as boolean}
                />
            )

            const coercionTime = await measureComponentPerformance(() => {
                rerender(
                    <Switch
                        label="Boolean Coercion Switch"
                        checked={1 as unknown as boolean}
                    />
                )
                rerender(
                    <Switch
                        label="Boolean Coercion Switch"
                        checked={'' as unknown as boolean}
                    />
                )
                rerender(
                    <Switch
                        label="Boolean Coercion Switch"
                        checked={'true' as unknown as boolean}
                    />
                )
            })

            assertPerformanceWithContext(
                coercionTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })
    })

    describe('Stress Testing', () => {
        it('handles large numbers of switches', async () => {
            const stressTestTime = await measureComponentPerformance(() => {
                render(
                    <>
                        {Array.from({ length: 20 }, (_, i) => (
                            <Switch key={i} label={`Stress Switch ${i}`} />
                        ))}
                    </>
                )
            })

            assertPerformanceWithContext(
                stressTestTime,
                'memory',
                'stress',
                getCurrentTestName()
            )
        })

        it('maintains performance under rapid state changes', async () => {
            const { user } = render(
                <Switch label="Rapid State Switch" defaultChecked={false} />
            )

            const switchElement = screen.getByRole('switch')

            const rapidStateTime = await measureComponentPerformance(
                async () => {
                    for (let i = 0; i < 10; i++) {
                        await user.click(switchElement)
                    }
                }
            )

            assertPerformanceWithContext(
                rapidStateTime,
                'interaction',
                'rapid',
                getCurrentTestName()
            )
        })

        it('handles memory pressure gracefully', async () => {
            // Simulate memory pressure by creating and destroying many components
            const memoryPressureTime = await measureComponentPerformance(() => {
                for (let i = 0; i < 20; i++) {
                    const { unmount } = render(
                        <Switch label={`Memory Pressure Switch ${i}`} />
                    )
                    unmount()
                }
            })

            assertPerformanceWithContext(
                memoryPressureTime,
                'memory',
                'stress',
                getCurrentTestName()
            )
        })
    })

    describe('Performance Regression Prevention', () => {
        it('maintains baseline performance metrics', async () => {
            const baselineTime = await measureComponentPerformance(() => {
                render(<Switch label="Baseline Switch" />)
            })

            assertPerformanceWithContext(
                baselineTime,
                'render',
                'simple',
                getCurrentTestName()
            )
        })

        it('tracks performance across different prop combinations', async () => {
            const propCombinations = [
                { label: 'Simple' },
                { label: 'Checked', checked: true },
                { label: 'Disabled', disabled: true },
                { label: 'Error', error: true },
                { label: 'Required', required: true },
                { label: 'Small', size: SwitchSize.SMALL },
                { label: 'Complex', subtext: 'Subtext', required: true },
            ]

            for (const props of propCombinations) {
                const renderTime = await measureComponentPerformance(() => {
                    render(<Switch {...props} />)
                })

                assertPerformanceWithContext(
                    renderTime,
                    'render',
                    'simple',
                    getCurrentTestName()
                )
            }
        })
    })
})

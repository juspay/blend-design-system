import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { Switch } from '../../../lib/components/Switch/Switch'
import { SwitchSize } from '../../../lib/components/Switch/types'
import { SwitchTestFactory } from '../../test-utils/builders'
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

describe('Switch Performance', () => {
    describe('Render Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureComponentPerformance(() => {
                render(<Switch label="Performance Switch" />)
            })

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })

        it('renders complex switch within budget', async () => {
            const props = SwitchTestFactory.complex()
            const renderTime = await measureComponentPerformance(() => {
                render(<Switch {...props} />)
            })

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.complex
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

            // Use batch threshold for multiple components
            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.complex * 2
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

            assertPerformanceWithinBudget(
                renderTime,
                PERFORMANCE_THRESHOLDS.render.complex
            )
        })
    })

    describe('Re-render Performance', () => {
        it('avoids unnecessary re-renders with stable props', () => {
            const renderSpy = vi.fn()
            const TestSwitch = (props: any) => {
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

            assertPerformanceWithinBudget(
                rerenderTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange
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

            assertPerformanceWithinBudget(
                rapidRerenderTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange * 10
            )
        })

        it('optimizes re-renders with complex content', async () => {
            const complexProps = SwitchTestFactory.complex()
            const { rerender } = render(<Switch {...complexProps} />)

            const rerenderTime = await measureComponentPerformance(() => {
                rerender(<Switch {...complexProps} checked={true} />)
            })

            assertPerformanceWithinBudget(
                rerenderTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange
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

            assertPerformanceWithinBudget(
                clickTime,
                PERFORMANCE_THRESHOLDS.animation.hover
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

            assertPerformanceWithinBudget(
                keyboardTime,
                PERFORMANCE_THRESHOLDS.animation.hover
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

            assertPerformanceWithinBudget(
                rapidInteractionTime,
                PERFORMANCE_THRESHOLDS.animation.hover * 5
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

            // Should still be reasonably fast even with complex handler
            assertPerformanceWithinBudget(
                handlerTime,
                PERFORMANCE_THRESHOLDS.animation.hover * 2
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

            assertPerformanceWithinBudget(
                mountUnmountTime,
                PERFORMANCE_THRESHOLDS.render.complex * 10
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

            assertPerformanceWithinBudget(
                stateManagementTime,
                PERFORMANCE_THRESHOLDS.reRender.stateChange * 5
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

            assertPerformanceWithinBudget(
                tokenResolutionTime,
                PERFORMANCE_THRESHOLDS.render.simple
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

            assertPerformanceWithinBudget(
                sizeVariantTime,
                PERFORMANCE_THRESHOLDS.render.complex
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

            assertPerformanceWithinBudget(
                formRenderTime,
                PERFORMANCE_THRESHOLDS.render.complex
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

            assertPerformanceWithinBudget(
                dynamicUpdateTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange * 3
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

            assertPerformanceWithinBudget(
                complexLabelTime,
                PERFORMANCE_THRESHOLDS.render.complex
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

            assertPerformanceWithinBudget(
                errorStateTime,
                PERFORMANCE_THRESHOLDS.render.complex
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

            assertPerformanceWithinBudget(
                a11yTime,
                PERFORMANCE_THRESHOLDS.render.complex
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

            assertPerformanceWithinBudget(
                focusTime,
                PERFORMANCE_THRESHOLDS.animation.hover
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

            assertPerformanceWithinBudget(
                undefinedPropsTime,
                PERFORMANCE_THRESHOLDS.render.simple
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

            assertPerformanceWithinBudget(
                nullChildrenTime,
                PERFORMANCE_THRESHOLDS.render.simple
            )
        })

        it('handles boolean coercion efficiently', async () => {
            const { rerender } = render(
                <Switch label="Boolean Coercion Switch" checked={0 as any} />
            )

            const coercionTime = await measureComponentPerformance(() => {
                rerender(
                    <Switch
                        label="Boolean Coercion Switch"
                        checked={1 as any}
                    />
                )
                rerender(
                    <Switch
                        label="Boolean Coercion Switch"
                        checked={'' as any}
                    />
                )
                rerender(
                    <Switch
                        label="Boolean Coercion Switch"
                        checked={'true' as any}
                    />
                )
            })

            assertPerformanceWithinBudget(
                coercionTime,
                PERFORMANCE_THRESHOLDS.reRender.propChange * 3
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

            assertPerformanceWithinBudget(
                stressTestTime,
                PERFORMANCE_THRESHOLDS.render.complex * 5
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
                        <Switch label={`Memory Pressure Switch ${i}`} />
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
                render(<Switch label="Baseline Switch" />)
            })

            // This test serves as a baseline for performance regression detection
            expect(baselineTime).toBeLessThan(
                PERFORMANCE_THRESHOLDS.render.simple
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

                assertPerformanceWithinBudget(
                    renderTime,
                    PERFORMANCE_THRESHOLDS.render.simple
                )
            }
        })
    })
})

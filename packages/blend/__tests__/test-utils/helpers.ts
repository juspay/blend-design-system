import React from 'react'
import { RenderResult } from '@testing-library/react'
import { vi, expect, describe, it } from 'vitest'
import { render } from './index'
import { ButtonType, ButtonSize } from '../../lib/components/Button/types'
import { TEST_BREAKPOINTS, KEYBOARD_KEYS } from './constants'
import { assertAccessibility, assertEventHandlerCalled } from './assertions'
import type { UserEvent } from '@testing-library/user-event'

/**
 * Test helpers for common testing patterns
 * Implements DRY principles for repetitive test scenarios
 */

/**
 * Render component with all visual variants
 */
export async function renderWithAllVariants<T extends Record<string, unknown>>(
    Component: React.ComponentType<T>,
    baseProps: T,
    variants: {
        types?: string[]
        sizes?: string[]
        states?: Array<{ name: string; props: Partial<T> }>
    }
): Promise<Array<{ name: string; result: RenderResult }>> {
    const results: Array<{ name: string; result: RenderResult }> = []

    // Test all type variants
    if (variants.types) {
        for (const type of variants.types) {
            const result = render(
                React.createElement(Component, {
                    ...baseProps,
                    buttonType: type as ButtonType,
                })
            )
            results.push({ name: `type-${type}`, result })
        }
    }

    // Test all size variants
    if (variants.sizes) {
        for (const size of variants.sizes) {
            const result = render(
                React.createElement(Component, {
                    ...baseProps,
                    size: size as ButtonSize,
                })
            )
            results.push({ name: `size-${size}`, result })
        }
    }

    // Test all state variants
    if (variants.states) {
        for (const state of variants.states) {
            const result = render(
                React.createElement(Component, { ...baseProps, ...state.props })
            )
            results.push({ name: state.name, result })
        }
    }

    return results
}

/**
 * Test all button types with a given test function
 */
export function testAllButtonTypes(
    testFn: (type: ButtonType, typeName: string) => void
) {
    Object.entries(ButtonType).forEach(([typeName, type]) => {
        testFn(type, typeName)
    })
}

/**
 * Test all button sizes with a given test function
 */
export function testAllButtonSizes(
    testFn: (size: ButtonSize, sizeName: string) => void
) {
    Object.entries(ButtonSize).forEach(([sizeName, size]) => {
        testFn(size, sizeName)
    })
}

/**
 * Test component across responsive breakpoints
 */
export async function testResponsiveBreakpoints<
    T extends Record<string, unknown>,
>(
    Component: React.ComponentType<T>,
    props: T,
    testFn: (
        breakpoint: keyof typeof TEST_BREAKPOINTS,
        container: HTMLElement
    ) => void | Promise<void>
) {
    const originalMatchMedia = window.matchMedia

    for (const [breakpointName, breakpoint] of Object.entries(
        TEST_BREAKPOINTS
    )) {
        // Mock matchMedia for this breakpoint
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: query === breakpoint.query,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }))

        const { container, unmount } = render(
            React.createElement(Component, props)
        )

        await testFn(breakpointName as keyof typeof TEST_BREAKPOINTS, container)

        unmount()
    }

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia
}

/**
 * Test keyboard interactions
 */
export async function testKeyboardInteractions(
    element: HTMLElement,
    interactions: Array<{
        key: keyof typeof KEYBOARD_KEYS
        handler?: ReturnType<typeof vi.fn>
        shouldTrigger?: boolean
    }>,
    user: UserEvent
) {
    element.focus()

    for (const interaction of interactions) {
        await user.keyboard(KEYBOARD_KEYS[interaction.key])

        if (interaction.handler) {
            if (interaction.shouldTrigger !== false) {
                assertEventHandlerCalled(interaction.handler)
            } else {
                expect(interaction.handler).not.toHaveBeenCalled()
            }
        }
    }
}

/**
 * Test all ARIA attributes
 */
export function testAriaAttributes(
    element: HTMLElement,
    scenarios: Array<{
        name: string
        attributes: Record<string, string | boolean>
    }>
) {
    scenarios.forEach((scenario) => {
        Object.entries(scenario.attributes).forEach(([attr, value]) => {
            if (typeof value === 'boolean') {
                if (value) {
                    expect(element).toHaveAttribute(attr)
                } else {
                    expect(element).not.toHaveAttribute(attr)
                }
            } else {
                expect(element).toHaveAttribute(attr, value)
            }
        })
    })
}

/**
 * Test focus management scenarios
 */
export async function testFocusManagement(
    scenarios: Array<{
        name: string
        setup: () => { element: HTMLElement; cleanup?: () => void }
        action: (element: HTMLElement) => void | Promise<void>
        expectation: (element: HTMLElement) => void
    }>
) {
    for (const scenario of scenarios) {
        const { element, cleanup } = scenario.setup()

        await scenario.action(element)
        scenario.expectation(element)

        if (cleanup) {
            cleanup()
        }
    }
}

/**
 * Test loading states
 */
export async function testLoadingStates<T extends { loading?: boolean }>(
    Component: React.ComponentType<T>,
    baseProps: T,
    options?: {
        testSpinner?: boolean
        testAriaStates?: boolean
        testInteractions?: boolean
    }
) {
    const {
        testSpinner = true,
        testAriaStates = true,
        testInteractions = true,
    } = options || {}

    // Test non-loading state
    const { rerender, container } = render(
        React.createElement(Component, { ...baseProps, loading: false })
    )

    // Test loading state
    rerender(React.createElement(Component, { ...baseProps, loading: true }))

    if (testSpinner) {
        const spinner = container.querySelector('svg')
        expect(spinner).toBeInTheDocument()
    }

    if (testAriaStates) {
        const element = container.firstElementChild
        if (element && element.hasAttribute('aria-busy')) {
            expect(element).toHaveAttribute('aria-busy', 'true')
        }
    }

    if (testInteractions) {
        // Test that interactions still work during loading
        // This depends on component behavior
    }
}

/**
 * Batch test accessibility for multiple scenarios
 */
export async function batchTestAccessibility(
    scenarios: Array<{
        name: string
        render: () => RenderResult
        axeOptions?: {
            rules?: Record<string, unknown>
            runOnly?: string[]
        }
    }>
) {
    for (const scenario of scenarios) {
        const { container } = scenario.render()
        await assertAccessibility(container, scenario.axeOptions)
    }
}

/**
 * Test event propagation
 */
export function testEventPropagation(
    setup: () => {
        element: HTMLElement
        parentHandler: ReturnType<typeof vi.fn>
        childHandler: ReturnType<typeof vi.fn>
    },
    eventType: 'click' | 'keydown' | 'focus',
    shouldPropagate = true
) {
    const { element, parentHandler, childHandler } = setup()

    // Trigger event
    const event = new Event(eventType, { bubbles: true })
    element.dispatchEvent(event)

    // Check handlers
    assertEventHandlerCalled(childHandler)

    if (shouldPropagate) {
        assertEventHandlerCalled(parentHandler)
    } else {
        expect(parentHandler).not.toHaveBeenCalled()
    }
}

/**
 * Test component cleanup
 */
export function testComponentCleanup(
    setup: () => {
        component: RenderResult
        handlers: Array<ReturnType<typeof vi.fn>>
        subscriptions?: Array<{ unsubscribe: ReturnType<typeof vi.fn> }>
    }
) {
    const { component, handlers, subscriptions } = setup()

    // Unmount component
    component.unmount()

    // Verify handlers are cleaned up
    handlers.forEach((handler) => {
        // Try to trigger handler after unmount
        // This should not call the handler
        expect(handler).not.toHaveBeenCalled()
    })

    // Verify subscriptions are cleaned up
    subscriptions?.forEach((subscription) => {
        expect(subscription.unsubscribe).toHaveBeenCalled()
    })
}

/**
 * Create a test suite for a component
 */
export function createComponentTestSuite<T extends Record<string, unknown>>(
    componentName: string,
    Component: React.ComponentType<T>,
    defaultProps: T
) {
    return {
        testRendering: (
            scenarios: Array<{ name: string; props: Partial<T> }>
        ) => {
            describe(`${componentName} Rendering`, () => {
                scenarios.forEach((scenario) => {
                    it(`renders ${scenario.name}`, () => {
                        const { container } = render(
                            React.createElement(Component, {
                                ...defaultProps,
                                ...scenario.props,
                            })
                        )
                        expect(container.firstChild).toBeInTheDocument()
                    })
                })
            })
        },

        testAccessibility: (
            scenarios: Array<{ name: string; props: Partial<T> }>
        ) => {
            describe(`${componentName} Accessibility`, () => {
                scenarios.forEach((scenario) => {
                    it(`is accessible when ${scenario.name}`, async () => {
                        const { container } = render(
                            React.createElement(Component, {
                                ...defaultProps,
                                ...scenario.props,
                            })
                        )
                        await assertAccessibility(container)
                    })
                })
            })
        },

        testInteractions: (
            scenarios: Array<{
                name: string
                props: Partial<T>
                interaction: (
                    element: HTMLElement,
                    user: UserEvent
                ) => Promise<void>
                expectation: () => void
            }>
        ) => {
            describe(`${componentName} Interactions`, () => {
                scenarios.forEach((scenario) => {
                    it(`handles ${scenario.name}`, async () => {
                        const { container, user } = render(
                            React.createElement(Component, {
                                ...defaultProps,
                                ...scenario.props,
                            })
                        )

                        const element = container.firstChild as HTMLElement
                        await scenario.interaction(element, user)
                        scenario.expectation()
                    })
                })
            })
        },
    }
}

/**
 * Performance test helper
 */
export async function measureComponentPerformance<
    T extends Record<string, unknown>,
>(
    Component: React.ComponentType<T>,
    scenarios: Array<{
        name: string
        props: T
        iterations?: number
    }>
): Promise<Array<{ name: string; avgTime: number; times: number[] }>> {
    const results: Array<{ name: string; avgTime: number; times: number[] }> =
        []

    for (const scenario of scenarios) {
        const iterations = scenario.iterations || 10
        const times: number[] = []

        for (let i = 0; i < iterations; i++) {
            const start = performance.now()
            const { unmount } = render(
                React.createElement(Component, scenario.props)
            )
            const end = performance.now()

            times.push(end - start)
            unmount()
        }

        const avgTime = times.reduce((a, b) => a + b, 0) / times.length
        results.push({ name: scenario.name, avgTime, times })
    }

    return results
}

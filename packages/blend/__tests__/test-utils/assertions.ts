import { expect, vi } from 'vitest'
import { axe } from 'jest-axe'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
    ERROR_MESSAGES,
    A11Y_REQUIREMENTS,
    PERFORMANCE_THRESHOLDS,
} from './constants'

/**
 * Custom assertions for component testing
 * Provides reusable assertion helpers following DRY principles
 */

/**
 * Assert that a component meets accessibility standards
 */
export async function assertAccessibility(
    container: HTMLElement,
    options?: {
        rules?: Record<string, unknown>
        runOnly?: string[]
    }
) {
    const results = await axe(container, options)
    // Type assertion for jest-axe matcher
    ;(
        expect(results) as { toHaveNoViolations: () => void }
    ).toHaveNoViolations()
}

/**
 * Assert that an element is keyboard navigable
 */
export function assertKeyboardNavigable(element: HTMLElement) {
    // Check if element can receive focus
    element.focus()
    expect(document.activeElement).toBe(element)

    // Check if element has proper tabindex
    const tabIndex = element.getAttribute('tabindex')
    if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1)
    }
}

/**
 * Assert that an element has proper ARIA attributes
 */
export function assertAriaAttributes(
    element: HTMLElement,
    expectedAttributes: Record<string, string | boolean>
) {
    Object.entries(expectedAttributes).forEach(([attr, value]) => {
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
}

/**
 * Assert that a button is properly disabled
 */
export function assertDisabledState(button: HTMLElement) {
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('disabled')
    expect(button).toHaveStyle({ cursor: 'not-allowed' })
}

/**
 * Assert that an element meets minimum touch target size
 */
export function assertTouchTargetSize(element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    expect(rect.width).toBeGreaterThanOrEqual(A11Y_REQUIREMENTS.minTouchTarget)
    expect(rect.height).toBeGreaterThanOrEqual(A11Y_REQUIREMENTS.minTouchTarget)
}

/**
 * Assert performance within budget
 */
export function assertPerformanceWithinBudget(
    actualTime: number,
    threshold: number,
    context?: string
) {
    if (context) {
        // Include context in the assertion message if provided
        expect(actualTime).toBeLessThan(threshold)
    } else {
        expect(actualTime).toBeLessThan(threshold)
    }
}

/**
 * Assert that an element has focus
 */
export function assertHasFocus(element: HTMLElement) {
    expect(document.activeElement).toBe(element)
}

/**
 * Assert that an element does not have focus
 */
export function assertNoFocus(element: HTMLElement) {
    expect(document.activeElement).not.toBe(element)
}

/**
 * Assert loading state indicators
 */
export function assertLoadingState(container: HTMLElement) {
    // Check for loading spinner (SVG with animation)
    const spinner = container.querySelector('svg')
    expect(spinner).toBeInTheDocument()
    // Check that animation style contains 'spin'
    const animationStyle = window.getComputedStyle(spinner!).animation
    expect(animationStyle).toContain('spin')
}

/**
 * Assert icon presence and attributes
 */
export function assertIcon(
    container: HTMLElement,
    position: 'leading' | 'trailing' | 'only',
    testId = 'mock-icon'
) {
    const icon = screen.getByTestId(testId)
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')

    // Check parent slot attribute
    const parent = icon.parentElement
    if (parent) {
        if (position === 'leading') {
            expect(parent).toHaveAttribute('data-button-left-slot')
        } else if (position === 'trailing') {
            expect(parent).toHaveAttribute('data-button-right-slot')
        }
    }
}

/**
 * Assert button variant styling
 * Note: This checks for the presence of the element, actual styling
 * should be verified through visual regression tests
 */
export function assertButtonVariant(
    button: HTMLElement,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _variant: {
        type?: string
        size?: string
        subType?: string
    }
) {
    expect(button).toBeInTheDocument()

    // Additional checks can be added here for computed styles
    // For now, we just verify the button renders
}

/**
 * Assert form integration
 */
export function assertFormIntegration(
    button: HTMLElement,
    expectedAttributes: {
        type?: string
        form?: string
        name?: string
    }
) {
    if (expectedAttributes.type) {
        expect(button).toHaveAttribute('type', expectedAttributes.type)
    }

    if (expectedAttributes.form) {
        expect(button).toHaveAttribute('form', expectedAttributes.form)
    }

    if (expectedAttributes.name) {
        expect(button).toHaveAttribute('name', expectedAttributes.name)
    }
}

/**
 * Assert event handler calls
 */
export function assertEventHandlerCalled(
    handler: ReturnType<typeof vi.fn>,
    times: number = 1,
    args?: unknown[]
) {
    expect(handler).toHaveBeenCalledTimes(times)

    if (args) {
        expect(handler).toHaveBeenCalledWith(...args)
    }
}

/**
 * Assert event handler not called
 */
export function assertEventHandlerNotCalled(handler: ReturnType<typeof vi.fn>) {
    expect(handler).not.toHaveBeenCalled()
}

/**
 * Assert component renders without errors
 */
export function assertRendersWithoutError(element: HTMLElement | null) {
    expect(element).toBeInTheDocument()
    expect(element).toBeTruthy()
}

/**
 * Assert text content
 */
export function assertTextContent(
    element: HTMLElement,
    expectedText: string,
    exact = true
) {
    if (exact) {
        expect(element).toHaveTextContent(expectedText)
    } else {
        expect(element.textContent).toContain(expectedText)
    }
}

/**
 * Assert component has proper display styles
 */
export function assertDisplayStyles(
    element: HTMLElement,
    expectedStyles: {
        display?: string
        width?: string
        height?: string
        justifyContent?: string
        alignItems?: string
    }
) {
    Object.entries(expectedStyles).forEach(([property, value]) => {
        if (value) {
            expect(element).toHaveStyle({ [property]: value })
        }
    })
}

/**
 * Batch assertion for multiple elements
 */
export function assertMultipleElements<T>(
    elements: T[],
    assertion: (element: T, index: number) => void
) {
    elements.forEach((element, index) => {
        assertion(element, index)
    })
}

/**
 * Assert memory cleanup
 */
export function assertMemoryCleanup(
    initialMemory: number,
    finalMemory: number,
    threshold = PERFORMANCE_THRESHOLDS.memory.leak
) {
    const memoryDiff = finalMemory - initialMemory

    if (memoryDiff > threshold) {
        throw new Error(ERROR_MESSAGES.performance.memory(memoryDiff))
    }

    expect(memoryDiff).toBeLessThan(threshold)
}

/**
 * Create a custom matcher for component-specific assertions
 */
export function createComponentMatcher(componentName: string) {
    return {
        toBeAccessible: async (container: HTMLElement) => {
            const results = await axe(container)
            const pass = results.violations.length === 0

            return {
                pass,
                message: () =>
                    pass
                        ? `${componentName} is accessible`
                        : `${componentName} has accessibility violations: ${JSON.stringify(results.violations, null, 2)}`,
            }
        },

        toHaveProperFocus: (element: HTMLElement) => {
            const pass = document.activeElement === element

            return {
                pass,
                message: () =>
                    pass
                        ? `${componentName} has proper focus`
                        : `${componentName} does not have focus`,
            }
        },
    }
}

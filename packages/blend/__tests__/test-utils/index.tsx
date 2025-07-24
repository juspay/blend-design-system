import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import ThemeProvider from '../../lib/context/ThemeProvider'
import userEvent from '@testing-library/user-event'

// Mock providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider>{children}</ThemeProvider>
}

// Custom render function
const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => {
    const user = userEvent.setup()
    const utils = render(ui, { wrapper: AllTheProviders, ...options })

    return {
        user,
        ...utils,
    }
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
export { userEvent }

// Test data generators
export const generateButtonTestId = (variant: string, size: string) =>
    `button-${variant}-${size}`

// Mock icon component for testing
export const MockIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} data-testid="mock-icon" aria-hidden="true">
        <rect width={size} height={size} />
    </svg>
)

// Performance testing utilities
export const measureRenderTime = async (
    component: React.ReactElement
): Promise<number> => {
    const start = performance.now()
    const { unmount } = customRender(component)
    const end = performance.now()
    unmount()
    return end - start
}

// Accessibility testing utilities
export const hasProperAriaAttributes = (element: HTMLElement): boolean => {
    const role = element.getAttribute('role')
    const ariaLabel = element.getAttribute('aria-label')
    const ariaDescribedBy = element.getAttribute('aria-describedby')

    return !!(role || ariaLabel || ariaDescribedBy)
}

// Export all test utilities
export * from './builders'
export * from './constants'
// export * from './assertions'
export * from './helpers'

// Re-export specific items from assertions to avoid potential circular dependency
export {
    assertAccessibility,
    assertKeyboardNavigable,
    assertAriaAttributes,
    assertDisabledState,
    assertTouchTargetSize,
    assertPerformanceWithinBudget,
    assertHasFocus,
    assertNoFocus,
    assertLoadingState,
    assertIcon,
    assertButtonVariant,
    assertFormIntegration,
    assertEventHandlerCalled,
    assertEventHandlerNotCalled,
    assertRendersWithoutError,
    assertTextContent,
    assertDisplayStyles,
    assertMultipleElements,
    assertMemoryCleanup,
    createComponentMatcher,
} from './assertions'

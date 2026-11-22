import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import ThemeProvider from '../../lib/context/ThemeProvider'
import userEvent from '@testing-library/user-event'
import type { Theme } from '../../lib/context/theme.enum'
import type {
    BlendFirstDayOfWeek,
    BlendLocale,
    BlendTranslate,
} from '../../lib/i18n/types'

/**
 * Props a test may set on the wrapping `ThemeProvider`.
 *
 * Mirrors the provider's own optional props. Declared structurally rather than
 * as `Partial<ComponentProps<typeof ThemeProvider>>` so `children` cannot be
 * passed here by accident.
 */
export type TestProviderProps = {
    theme?: Theme | string
    locale?: BlendLocale
    t?: BlendTranslate
    firstDayOfWeek?: BlendFirstDayOfWeek
}

// Mock providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider>{children}</ThemeProvider>
}

const makeWrapper =
    (providerProps: TestProviderProps) =>
    ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider {...providerProps}>{children}</ThemeProvider>
    )

// Custom render function
const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'> & {
        providerProps?: TestProviderProps
    }
) => {
    const user = userEvent.setup()

    // The wrapper stays configurable rather than swappable: `wrapper` is still
    // omitted from the options type, so a caller can set provider props
    // without being able to replace the provider itself. `AllTheProviders` is
    // reused verbatim when no props are given, so every existing `render(ui)`
    // call site keeps the identical wrapper component.
    const { providerProps, ...renderOptions } = options ?? {}
    const utils = render(ui, {
        wrapper: providerProps ? makeWrapper(providerProps) : AllTheProviders,
        ...renderOptions,
    })

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
export * from './assertions'
export * from './helpers'
export * from './performance'

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

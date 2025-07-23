import '@testing-library/jest-dom'
import 'jest-styled-components'
import { cleanup } from '@testing-library/react'
import { afterEach, vi, beforeAll, afterAll, expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
import './__tests__/test-utils/jest-axe.d.ts'

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations)

// Cleanup after each test
afterEach(() => {
    cleanup()
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

// Suppress console errors in tests unless explicitly testing them
const originalError = console.error
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Warning: ReactDOM.render')
        ) {
            return
        }
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})

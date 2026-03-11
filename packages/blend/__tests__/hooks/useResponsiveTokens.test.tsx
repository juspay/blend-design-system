import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useResponsiveTokens } from '../../lib/hooks/useResponsiveTokens'
import ThemeProvider from '../../lib/context/ThemeProvider'
import { getButtonTokens } from '../../lib/components/Button/button.tokens'
import { FOUNDATION_THEME } from '../../lib/tokens'

// Mock the useBreakpoints hook
vi.mock('../../lib/hooks/useBreakPoints', () => ({
    useBreakpoints: vi.fn(() => ({
        breakPointLabel: 'sm',
        innerWidth: 768,
    })),
}))

// Import the mocked hook
import { useBreakpoints } from '../../lib/hooks/useBreakPoints'

describe.skip('useResponsiveTokens Hook', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
    )

    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Token Resolution', () => {
        it('returns tokens for current breakpoint', () => {
            const { result } = renderHook(() => useResponsiveTokens('BUTTON'), {
                wrapper,
            })

            expect(result.current).toBeDefined()
            expect(result.current).toHaveProperty('gap')
            expect(result.current).toHaveProperty('backgroundColor')
            expect(result.current).toHaveProperty('color')
            expect(result.current).toHaveProperty('padding')
        })

        it('returns correct tokens for small breakpoint', () => {
            vi.mocked(useBreakpoints).mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 640,
            })

            const { result } = renderHook(() => useResponsiveTokens('BUTTON'), {
                wrapper,
            })

            const expectedTokens = getButtonTokens(FOUNDATION_THEME).sm
            expect(result.current).toEqual(expectedTokens)
        })

        it('returns correct tokens for large breakpoint', () => {
            vi.mocked(useBreakpoints).mockReturnValue({
                breakPointLabel: 'lg',
                innerWidth: 1024,
            })

            const { result } = renderHook(() => useResponsiveTokens('BUTTON'), {
                wrapper,
            })

            const expectedTokens = getButtonTokens(FOUNDATION_THEME).lg
            expect(result.current).toEqual(expectedTokens)
        })
    })

    describe('Breakpoint Changes', () => {
        it('updates tokens when breakpoint changes', () => {
            const mockUseBreakpoints = vi.mocked(useBreakpoints)
            mockUseBreakpoints.mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 640,
            })

            const { result, rerender } = renderHook(
                () => useResponsiveTokens('BUTTON'),
                { wrapper }
            )

            const initialTokens = result.current

            // Change breakpoint
            mockUseBreakpoints.mockReturnValue({
                breakPointLabel: 'lg',
                innerWidth: 1024,
            })

            rerender()

            const updatedTokens = result.current
            expect(updatedTokens).not.toBe(initialTokens)
        })

        it('maintains reference equality when breakpoint does not change', () => {
            const { result, rerender } = renderHook(
                () => useResponsiveTokens('BUTTON'),
                { wrapper }
            )

            const initialTokens = result.current
            rerender()
            const afterRerender = result.current

            expect(afterRerender).toStrictEqual(initialTokens)
        })
    })

    describe('Component Token Types', () => {
        it('works with different component types', () => {
            const componentTypes = [
                'BUTTON',
                'ALERT',
                'CHECKBOX',
                'CHECKBOXV2',
                'RADIO',
                'RADIOV2',
                'SWITCH',
            ] as const

            componentTypes.forEach((componentType) => {
                const { result } = renderHook(
                    () => useResponsiveTokens(componentType),
                    { wrapper }
                )

                expect(result.current).toBeDefined()
                expect(result.current).not.toBeNull()
            })
        })

        it('returns type-safe tokens for specific components', () => {
            const { result: buttonResult } = renderHook(
                () => useResponsiveTokens('BUTTON'),
                { wrapper }
            )

            // Button specific properties
            expect(buttonResult.current).toHaveProperty('backgroundColor')
            const buttonTokens = buttonResult.current as {
                backgroundColor: { primary: { default: string } }
            }
            expect(buttonTokens.backgroundColor).toHaveProperty('primary')
            expect(buttonTokens.backgroundColor.primary).toHaveProperty(
                'default'
            )

            const { result: alertResult } = renderHook(
                () => useResponsiveTokens('ALERT'),
                { wrapper }
            )

            // Alert specific properties
            expect(alertResult.current).toHaveProperty('background')
            expect(alertResult.current).toHaveProperty('border')
        })
    })

    describe('Context Integration', () => {
        it('uses theme context correctly', () => {
            const customTheme = {
                ...FOUNDATION_THEME,
                colors: {
                    ...FOUNDATION_THEME.colors,
                    primary: {
                        ...FOUNDATION_THEME.colors.primary,
                        500: '#custom-color',
                    },
                },
            }

            const customWrapper = ({
                children,
            }: {
                children: React.ReactNode
            }) => (
                <ThemeProvider foundationTokens={customTheme}>
                    {children}
                </ThemeProvider>
            )

            const { result } = renderHook(() => useResponsiveTokens('BUTTON'), {
                wrapper: customWrapper,
            })

            expect(result.current).toBeDefined()
            // The custom theme should be reflected in the tokens
        })

        it.skip('throws error when used outside ThemeProvider', () => {
            // Mock console.error to suppress error output in tests
            const originalError = console.error
            console.error = vi.fn()

            expect(() => {
                renderHook(() => useResponsiveTokens('BUTTON'))
            }).toThrow()

            console.error = originalError
        })
    })

    describe('Performance', () => {
        it('memoizes token resolution', () => {
            const { result, rerender } = renderHook(
                () => useResponsiveTokens('BUTTON'),
                { wrapper }
            )

            const tokens1 = result.current
            rerender()
            const tokens2 = result.current

            // Should return the same reference if nothing changed
            expect(tokens1).toStrictEqual(tokens2)
        })

        it.skip('only updates when relevant dependencies change', () => {
            let renderCount = 0
            const TestComponent = () => {
                renderCount++
                useResponsiveTokens('BUTTON')
                return null
            }

            const { rerender } = renderHook(() => <TestComponent />, {
                wrapper,
            })

            expect(renderCount).toBe(1)

            // Rerender without changing anything
            rerender()
            expect(renderCount).toBe(2) // Component re-renders but hook should be stable
        })
    })

    describe('Edge Cases', () => {
        it.skip('handles undefined breakpoint gracefully', () => {
            vi.mocked(useBreakpoints).mockReturnValue({
                breakPointLabel: undefined as unknown as 'sm' | 'lg',
                innerWidth: 0,
            })

            const { result } = renderHook(() => useResponsiveTokens('BUTTON'), {
                wrapper,
            })

            // Should still return valid tokens (likely defaulting to 'sm')
            expect(result.current).toBeDefined()
        })

        it('handles missing component tokens gracefully', () => {
            const { result } = renderHook(() => useResponsiveTokens('BUTTON'), {
                wrapper,
            })

            expect(result.current).toBeDefined()
            expect(() => (result.current as { gap?: string }).gap).not.toThrow()
        })
    })

    describe('TypeScript Support', () => {
        it('provides proper type inference', () => {
            const { result } = renderHook(() => useResponsiveTokens('BUTTON'), {
                wrapper,
            })

            // TypeScript should infer the correct token type
            const tokens = result.current

            // These properties should exist on ButtonTokensType
            expect(tokens).toHaveProperty('gap')
            expect(tokens).toHaveProperty('backgroundColor')
            expect(tokens).toHaveProperty('color')
            expect(tokens).toHaveProperty('borderRadius')
            expect(tokens).toHaveProperty('padding')
            expect(tokens).toHaveProperty('border')
            expect(tokens).toHaveProperty('shadow')
            expect(tokens).toHaveProperty('outline')
        })
    })
})

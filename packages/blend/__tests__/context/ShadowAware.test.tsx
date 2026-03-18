import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import ShadowAware, { useShadowRoot } from '../../lib/context/ShadowAware'
import ThemeProvider from '../../lib/context/ThemeProvider'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: blue;
    color: white;
    padding: 10px 20px;
`

describe('ShadowAware', () => {
    describe('Rendering', () => {
        it('renders children with target prop', () => {
            const host = document.createElement('div')
            const shadowRoot = host.attachShadow({ mode: 'open' })
            const target = document.createElement('div')
            shadowRoot.appendChild(target)

            const { container } = render(
                <ShadowAware target={target}>
                    <button>Test Button</button>
                </ShadowAware>,
                { container: target }
            )

            expect(container.querySelector('button')?.textContent).toBe(
                'Test Button'
            )
        })

        it('renders children with ThemeProvider integration', () => {
            const host = document.createElement('div')
            const shadowRoot = host.attachShadow({ mode: 'open' })
            const target = document.createElement('div')
            shadowRoot.appendChild(target)

            const { container } = render(
                <ThemeProvider target={target}>
                    <button>Themed Button</button>
                </ThemeProvider>,
                { container: target }
            )

            expect(container.querySelector('button')?.textContent).toBe(
                'Themed Button'
            )
        })
    })

    describe('useShadowRoot hook', () => {
        it('returns null when not inside ShadowAware', () => {
            const TestComponent = () => {
                const { shadowRoot, target } = useShadowRoot()
                return (
                    <span data-testid="shadow-root">
                        {shadowRoot ? 'has-shadow' : 'no-shadow'}-
                        {target ? 'has-target' : 'no-target'}
                    </span>
                )
            }

            const { getByTestId } = render(<TestComponent />)

            expect(getByTestId('shadow-root').textContent).toBe(
                'no-shadow-no-target'
            )
        })

        it('returns shadowRoot and target when inside ShadowAware', () => {
            const host = document.createElement('div')
            const shadowRoot = host.attachShadow({ mode: 'open' })
            const target = document.createElement('div')
            shadowRoot.appendChild(target)

            const TestComponent = () => {
                const { shadowRoot: contextShadowRoot, target: contextTarget } =
                    useShadowRoot()
                return (
                    <span data-testid="shadow-root">
                        {contextShadowRoot ? 'has-shadow' : 'no-shadow'}-
                        {contextTarget ? 'has-target' : 'no-target'}
                    </span>
                )
            }

            const { container } = render(
                <ShadowAware target={target}>
                    <TestComponent />
                </ShadowAware>,
                { container: target }
            )

            expect(
                container.querySelector('[data-testid="shadow-root"]')
                    ?.textContent
            ).toBe('has-shadow-has-target')
        })
    })

    describe('Style Injection', () => {
        it('renders styled components inside shadow DOM context', () => {
            const host = document.createElement('div')
            const shadowRoot = host.attachShadow({ mode: 'open' })
            const target = document.createElement('div')
            shadowRoot.appendChild(target)

            const { container } = render(
                <ThemeProvider target={target}>
                    <StyledButton>Styled</StyledButton>
                </ThemeProvider>,
                { container: target }
            )

            // Verify the styled button renders inside the shadow DOM target
            const button = container.querySelector('button')
            expect(button).not.toBeNull()
            expect(button?.textContent).toBe('Styled')
        })
    })

    describe('Edge Cases', () => {
        it('warns when target is not inside shadow root', () => {
            const consoleSpy = vi.spyOn(console, 'warn')
            const target = document.createElement('div')
            document.body.appendChild(target)

            render(
                <ShadowAware target={target}>
                    <button>Test</button>
                </ShadowAware>,
                { container: target }
            )

            expect(consoleSpy).toHaveBeenCalledWith(
                '[ShadowAware] Target element is NOT inside a ShadowRoot!'
            )
            consoleSpy.mockRestore()
        })

        it('handles multiple children', () => {
            const host = document.createElement('div')
            const shadowRoot = host.attachShadow({ mode: 'open' })
            const target = document.createElement('div')
            shadowRoot.appendChild(target)

            const { container } = render(
                <ShadowAware target={target}>
                    <button>First</button>
                    <button>Second</button>
                </ShadowAware>,
                { container: target }
            )

            const buttons = container.querySelectorAll('button')
            expect(buttons[0]?.textContent).toBe('First')
            expect(buttons[1]?.textContent).toBe('Second')
        })
    })

    describe('Backward Compatibility', () => {
        it('works without target prop in ThemeProvider (default behavior)', () => {
            const { getByText } = render(
                <ThemeProvider>
                    <StyledButton>Default Behavior</StyledButton>
                </ThemeProvider>
            )

            expect(getByText('Default Behavior')).toBeInTheDocument()
        })

        it('does not affect existing components when target is not provided', () => {
            const { container } = render(
                <ThemeProvider>
                    <StyledButton>Unaffected</StyledButton>
                </ThemeProvider>
            )

            expect(container.querySelector('button')).toBeInTheDocument()
        })
    })
})

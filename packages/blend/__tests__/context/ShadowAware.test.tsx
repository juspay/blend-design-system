import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
        it('renders children without shadowRoot prop', () => {
            render(
                <ShadowAware>
                    <button>Test Button</button>
                </ShadowAware>
            )

            expect(screen.getByText('Test Button')).toBeInTheDocument()
        })

        it('renders children with ThemeProvider integration', () => {
            render(
                <ThemeProvider>
                    <ShadowAware>
                        <button>Themed Button</button>
                    </ShadowAware>
                </ThemeProvider>
            )

            expect(screen.getByText('Themed Button')).toBeInTheDocument()
        })
    })

    describe('useShadowRoot hook', () => {
        it('returns null when not inside ShadowAware', () => {
            const TestComponent = () => {
                const { shadowRoot } = useShadowRoot()
                return (
                    <span data-testid="shadow-root">
                        {shadowRoot ? 'has-shadow' : 'no-shadow'}
                    </span>
                )
            }

            render(<TestComponent />)

            expect(screen.getByTestId('shadow-root')).toHaveTextContent(
                'no-shadow'
            )
        })

        it('returns null when shadowRoot prop is not provided', () => {
            const TestComponent = () => {
                const { shadowRoot } = useShadowRoot()
                return (
                    <span data-testid="shadow-root">
                        {shadowRoot ? 'has-shadow' : 'no-shadow'}
                    </span>
                )
            }

            render(
                <ShadowAware>
                    <TestComponent />
                </ShadowAware>
            )

            expect(screen.getByTestId('shadow-root')).toHaveTextContent(
                'no-shadow'
            )
        })

        it('returns shadowRoot when provided', () => {
            const host = document.createElement('div')
            const shadowRoot = host.attachShadow({ mode: 'open' })

            const TestComponent = () => {
                const { shadowRoot: contextShadowRoot } = useShadowRoot()
                return (
                    <span data-testid="shadow-root">
                        {contextShadowRoot ? 'has-shadow' : 'no-shadow'}
                    </span>
                )
            }

            const container = document.createElement('div')
            shadowRoot.appendChild(container)

            const { getByTestId } = render(
                <ShadowAware shadowRoot={shadowRoot}>
                    <TestComponent />
                </ShadowAware>,
                { container }
            )

            expect(getByTestId('shadow-root')).toHaveTextContent('has-shadow')
        })
    })

    describe('Style Injection', () => {
        it('injects styles into shadowRoot when provided', () => {
            const host = document.createElement('div')
            const shadowRoot = host.attachShadow({ mode: 'open' })

            const container = document.createElement('div')
            shadowRoot.appendChild(container)

            render(
                <ThemeProvider>
                    <ShadowAware shadowRoot={shadowRoot}>
                        <StyledButton>Styled</StyledButton>
                    </ShadowAware>
                </ThemeProvider>,
                { container }
            )

            const styledElements = shadowRoot.querySelectorAll('[data-styled]')
            expect(styledElements.length).toBeGreaterThan(0)
        })
    })

    describe('Edge Cases', () => {
        it('handles null children gracefully', () => {
            render(<ShadowAware>{null}</ShadowAware>)

            expect(document.body).toBeInTheDocument()
        })

        it('handles undefined shadowRoot gracefully', () => {
            render(
                <ShadowAware shadowRoot={undefined}>
                    <button>Test</button>
                </ShadowAware>
            )

            expect(screen.getByText('Test')).toBeInTheDocument()
        })

        it('handles multiple children', () => {
            render(
                <ShadowAware>
                    <button>First</button>
                    <button>Second</button>
                </ShadowAware>
            )

            expect(screen.getByText('First')).toBeInTheDocument()
            expect(screen.getByText('Second')).toBeInTheDocument()
        })
    })

    describe('Backward Compatibility', () => {
        it('works without ShadowAware wrapper (default behavior)', () => {
            render(
                <ThemeProvider>
                    <StyledButton>Default Behavior</StyledButton>
                </ThemeProvider>
            )

            expect(screen.getByText('Default Behavior')).toBeInTheDocument()
        })

        it('does not affect existing components when shadowRoot is not provided', () => {
            const { container } = render(
                <ThemeProvider>
                    <ShadowAware>
                        <StyledButton>Unaffected</StyledButton>
                    </ShadowAware>
                </ThemeProvider>
            )

            expect(container.querySelector('button')).toBeInTheDocument()
        })
    })
})

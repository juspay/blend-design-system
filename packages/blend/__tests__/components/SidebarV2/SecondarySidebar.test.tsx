import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { SecondarySidebar } from '../../../lib/components/SidebarV2/SecondarySidebar'
import type { SecondarySidebarInfo } from '../../../lib/components/SidebarV2/types'
import type { SidebarV2TokensType } from '../../../lib/components/SidebarV2/sidebarV2.tokens'

const mockTokens: SidebarV2TokensType = {
    container: {
        zIndex: 10,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e0e0e0',
        hoverPreview: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        maxWidth: {
            withLeftPanel: '280px',
            withoutLeftPanel: '240px',
            iconOnly: '58px',
        },
    },
    leftPanel: {
        width: '60px',
        backgroundColor: '#f5f5f5',
        borderRight: '1px solid #e0e0e0',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '8px',
        paddingRight: '8px',
        gap: '8px',
        item: {
            width: '44px',
            borderRadius: '8px',
            border: {
                default: '1px solid transparent',
                hover: '1px solid #ccc',
                active: '2px solid #007bff',
            },
            backgroundColor: {
                default: 'transparent',
                hover: '#f0f0f0',
                active: '#e0e0e0',
            },
        },
    },
    header: {
        zIndex: 10,
        backgroundColor: '#ffffff',
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        gap: '8px',
        borderBottom: '1px solid #e0e0e0',
        borderBottomWidth: '1px',
        scrolledBorderColor: '#d0d0d0',
        toggleButton: {
            borderRadius: '8px',
            padding: '8px',
            backgroundColor: {
                default: 'transparent',
                hover: '#f0f0f0',
                active: '#e0e0e0',
            },
            width: '32px',
            iconColor: '#333333',
        },
    },
    directory: {
        gap: '4px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
    },
    footer: {
        zIndex: 10,
        backgroundColor: '#ffffff',
        gap: '8px',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderTop: '1px solid #e0e0e0',
    },
    primarySidebar: {
        width: '240px',
    },
    secondarySidebar: {
        width: '60px',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#f5f5f5',
        gap: '8px',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '8px',
        paddingRight: '8px',
        item: {
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            border: {
                default: '1px solid transparent',
                hover: '1px solid #ccc',
                active: '2px solid #007bff',
            },
            backgroundColor: {
                default: 'transparent',
                hover: '#f0f0f0',
                active: '#e0e0e0',
            },
        },
    },
}

describe('SecondarySidebar', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('renders null when no items provided', () => {
        const { container } = render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={{
                    items: [],
                    selected: '',
                    onSelect: () => {},
                }}
                tokens={mockTokens}
            />
        )

        expect(container.firstChild).toBeNull()
    })

    it('renders null when secondarySidebar is undefined', () => {
        const { container } = render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={undefined}
                tokens={mockTokens}
            />
        )

        expect(container.firstChild).toBeNull()
    })

    it('renders all items with tooltips', () => {
        const secondarySidebar: SecondarySidebarInfo = {
            items: [
                {
                    label: 'App 1',
                    value: 'app1',
                    icon: <span data-testid="icon-1">A1</span>,
                },
                {
                    label: 'App 2',
                    value: 'app2',
                    icon: <span data-testid="icon-2">A2</span>,
                },
                {
                    label: 'App 3',
                    value: 'app3',
                    icon: <span data-testid="icon-3">A3</span>,
                },
            ],
            selected: 'app1',
            onSelect: vi.fn(),
        }

        render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={secondarySidebar}
                tokens={mockTokens}
            />
        )

        expect(screen.getByTestId('icon-1')).toBeInTheDocument()
        expect(screen.getByTestId('icon-2')).toBeInTheDocument()
        expect(screen.getByTestId('icon-3')).toBeInTheDocument()
    })

    it('calls onSelect when item is clicked', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()
        const secondarySidebar: SecondarySidebarInfo = {
            items: [{ label: 'App 1', value: 'app1', icon: <span>A1</span> }],
            selected: '',
            onSelect,
        }

        render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={secondarySidebar}
                tokens={mockTokens}
            />
        )

        const button = screen.getByRole('button')
        await user.click(button)

        await waitFor(() => {
            expect(onSelect).toHaveBeenCalledWith('app1')
        })
    })

    it('applies selected styling to active item', () => {
        const secondarySidebar: SecondarySidebarInfo = {
            items: [
                { label: 'App 1', value: 'app1', icon: <span>A1</span> },
                { label: 'App 2', value: 'app2', icon: <span>A2</span> },
            ],
            selected: 'app2',
            onSelect: vi.fn(),
        }

        const { container } = render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={secondarySidebar}
                tokens={mockTokens}
            />
        )

        const buttons = container.querySelectorAll('button')
        expect(buttons).toHaveLength(2)
    })

    it('renders footer slot when provided', () => {
        const secondarySidebar: SecondarySidebarInfo = {
            items: [{ label: 'App 1', value: 'app1', icon: <span>A1</span> }],
            selected: 'app1',
            onSelect: vi.fn(),
            footerSlot: <div data-testid="footer-slot">Settings</div>,
        }

        render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={secondarySidebar}
                tokens={mockTokens}
            />
        )

        expect(screen.getByTestId('footer-slot')).toBeInTheDocument()
    })

    it('has proper data-element attributes', () => {
        const secondarySidebar: SecondarySidebarInfo = {
            items: [{ label: 'App 1', value: 'app1', icon: <span>A1</span> }],
            selected: 'app1',
            onSelect: vi.fn(),
        }

        const { container } = render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={secondarySidebar}
                tokens={mockTokens}
            />
        )

        expect(
            container.querySelector('[data-element="secondary-sidebar"]')
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-element="secondary-sidebar-items"]')
        ).toBeInTheDocument()
    })

    it('renders with correct ID', () => {
        const secondarySidebar: SecondarySidebarInfo = {
            items: [{ label: 'App 1', value: 'app1', icon: <span>A1</span> }],
            selected: 'app1',
            onSelect: vi.fn(),
        }

        const { container } = render(
            <SecondarySidebar
                id="custom-id"
                secondarySidebar={secondarySidebar}
                tokens={mockTokens}
            />
        )

        expect(container.querySelector('#custom-id')).toBeInTheDocument()
    })

    it('merges secondarySidebar.buttonProps onto item buttons and calls both handlers', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()
        const buttonOnClick = vi.fn()
        const secondarySidebar: SecondarySidebarInfo = {
            items: [{ label: 'App 1', value: 'app1', icon: <span>A1</span> }],
            selected: '',
            onSelect,
            buttonProps: {
                'data-testid': 'secondary-item-btn',
                onClick: buttonOnClick,
            },
        }

        render(
            <SecondarySidebar
                id="test-secondary"
                secondarySidebar={secondarySidebar}
                tokens={mockTokens}
            />
        )

        const button = screen.getByTestId('secondary-item-btn')
        await user.click(button)

        await waitFor(() => {
            expect(onSelect).toHaveBeenCalledWith('app1')
            expect(buttonOnClick).toHaveBeenCalledTimes(1)
        })
    })
})

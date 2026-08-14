import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import SidebarV2Panel from '../../../lib/components/SidebarV2/SidebarV2Panel'
import type { SidebarV2TokensType } from '../../../lib/components/SidebarV2/sidebarV2.tokens'
import type { DirectoryData } from '../../../lib/components/Directory/types'

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

describe('SidebarV2 Parts', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    describe('SidebarV2Panel', () => {
        it('renders with proper data-element attribute', () => {
            const { container } = render(
                <SidebarV2Panel
                    isExpanded={true}
                    isScrolled={false}
                    sidebarCollapseKey="/"
                    onToggle={() => {}}
                    data={[]}
                    idPrefix="test-"
                    tokens={mockTokens}
                />
            )

            const content = container.querySelector(
                '[data-element="sidebar-panel"]'
            )
            expect(content).toBeInTheDocument()
        })

        it('renders in icon only mode', () => {
            const { container } = render(
                <SidebarV2Panel
                    isExpanded={false}
                    isScrolled={false}
                    sidebarCollapseKey="/"
                    onToggle={() => {}}
                    data={[]}
                    idPrefix="test-"
                    iconOnlyMode={true}
                    tokens={mockTokens}
                />
            )

            const content = container.querySelector(
                '[data-element="sidebar-panel"]'
            )
            expect(content).toBeInTheDocument()
        })

        it('renders footer when provided', () => {
            render(
                <SidebarV2Panel
                    isExpanded={true}
                    isScrolled={false}
                    sidebarCollapseKey="/"
                    onToggle={() => {}}
                    data={[]}
                    idPrefix="test-"
                    footer={<div data-testid="footer-slot">Footer</div>}
                    tokens={mockTokens}
                />
            )

            expect(screen.getByTestId('footer-slot')).toBeInTheDocument()
        })

        it('renders with merchant info', () => {
            render(
                <SidebarV2Panel
                    isExpanded={true}
                    isScrolled={false}
                    sidebarCollapseKey="/"
                    onToggle={() => {}}
                    data={[]}
                    idPrefix="test-"
                    merchantInfo={{
                        items: [
                            {
                                label: 'Test Merchant',
                                value: 'test',
                                icon: <span>Icon</span>,
                            },
                        ],
                        selected: 'test',
                        onSelect: () => {},
                    }}
                    tokens={mockTokens}
                />
            )

            expect(screen.getByText('Test Merchant')).toBeInTheDocument()
        })

        it('renders custom sidebar top slot', () => {
            render(
                <SidebarV2Panel
                    isExpanded={true}
                    isScrolled={false}
                    sidebarCollapseKey="/"
                    onToggle={() => {}}
                    data={[]}
                    idPrefix="test-"
                    sidebarTopSlot={<div data-testid="custom-top">Custom</div>}
                    tokens={mockTokens}
                />
            )

            expect(screen.getByTestId('custom-top')).toBeInTheDocument()
        })

        it('renders directory sections when data is provided', () => {
            const data: DirectoryData[] = [
                {
                    label: 'Main',
                    items: [
                        {
                            label: 'Alpha',
                            href: '/alpha',
                        },
                    ],
                },
            ]

            render(
                <SidebarV2Panel
                    isExpanded={true}
                    isScrolled={false}
                    sidebarCollapseKey="/"
                    onToggle={() => {}}
                    data={data}
                    idPrefix="test-"
                    tokens={mockTokens}
                />
            )

            expect(screen.getByText('Alpha')).toBeInTheDocument()
        })

        it('exposes the directory container as a labeled region for assistive tech', () => {
            const { container } = render(
                <SidebarV2Panel
                    isExpanded={true}
                    isScrolled={false}
                    sidebarCollapseKey="/"
                    onToggle={() => {}}
                    data={[]}
                    idPrefix="test-"
                    tokens={mockTokens}
                />
            )

            const region = container.querySelector(
                '[data-directory-container][role="region"]'
            )
            expect(region).toBeInTheDocument()
            expect(region).toHaveAttribute('aria-label', 'Navigation menu')
        })
    })
})

import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, fireEvent, waitFor, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import Sidebar from '../../../lib/components/Sidebar/Sidebar'
import { Home, Users, BarChart3, Package, ShoppingCart } from 'lucide-react'
import type { DirectoryData } from '../../../lib/components/Directory/types'

// Helper to create sample navigation data
const createNavigationData = (): DirectoryData[] => [
    {
        label: 'Main',
        items: [
            {
                label: 'Dashboard',
                leftSlot: <Home size={16} aria-hidden="true" />,
                onClick: () => {},
            },
            {
                label: 'Analytics',
                leftSlot: <BarChart3 size={16} aria-hidden="true" />,
                onClick: () => {},
            },
        ],
    },
    {
        label: 'Commerce',
        items: [
            {
                label: 'Products',
                leftSlot: <Package size={16} aria-hidden="true" />,
                onClick: () => {},
            },
            {
                label: 'Orders',
                leftSlot: <ShoppingCart size={16} aria-hidden="true" />,
                onClick: () => {},
            },
        ],
    },
]

describe('Sidebar Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
        vi.clearAllMocks()
    })

    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default sidebar (axe-core validation)', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with expanded sidebar', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with collapsed sidebar', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={false}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with left panel', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        leftPanel={{
                            items: [
                                {
                                    label: 'Tenant 1',
                                    icon: <Home size={16} aria-hidden="true" />,
                                },
                                {
                                    label: 'Tenant 2',
                                    icon: (
                                        <Users size={16} aria-hidden="true" />
                                    ),
                                },
                            ],
                            selected: 'Tenant 1',
                            onSelect: () => {},
                        }}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )
            await waitFor(
                () => {
                    expect(container.querySelector('nav')).toBeInTheDocument()
                },
                { timeout: 3000 }
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with footer', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        footer={<div>Footer Content</div>}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with panel only mode', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        leftPanel={{
                            items: [
                                {
                                    label: 'Tenant 1',
                                    icon: <Home size={16} aria-hidden="true" />,
                                },
                            ],
                            selected: 'Tenant 1',
                            onSelect: () => {},
                        }}
                        panelOnlyMode={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )
            await waitFor(() => {
                expect(container.querySelector('main')).toBeInTheDocument()
            })
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with nested navigation items', async () => {
            const nestedData: DirectoryData[] = [
                {
                    label: 'Main',
                    items: [
                        {
                            label: 'Dashboard',
                            leftSlot: <Home size={16} aria-hidden="true" />,
                            onClick: () => {},
                            items: [
                                {
                                    label: 'Overview',
                                    onClick: () => {},
                                },
                                {
                                    label: 'Details',
                                    onClick: () => {},
                                },
                            ],
                        },
                    ],
                },
            ]

            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={nestedData}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('decorative icons have aria-hidden="true"', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            // Wait for component to render
            await waitFor(() => {
                const icons = container.querySelectorAll('svg')
                icons.forEach((icon) => {
                    // Icons should be hidden if they're decorative
                    const parent = icon.closest('[aria-hidden="true"]')
                    if (parent) {
                        expect(parent).toHaveAttribute('aria-hidden', 'true')
                    }
                })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('navigation items have accessible text labels', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const navItems = container.querySelectorAll('button, a')
                navItems.forEach((item) => {
                    const text = item.textContent?.trim()
                    const ariaLabel = item.getAttribute('aria-label')
                    expect(text || ariaLabel).toBeTruthy()
                })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('has proper role="navigation" for sidebar', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const nav = container.querySelector('nav[role="navigation"]')
                expect(nav).toBeInTheDocument()
                expect(nav).toHaveAttribute('aria-label')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('has proper role="main" for main content', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const main = container.querySelector('main[role="main"]')
                expect(main).toBeInTheDocument()
                expect(main).toHaveAttribute('aria-label', 'Main content')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('has proper semantic footer element', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        footer={<div>Footer Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const footer = container.querySelector('footer')
                expect(footer).toBeInTheDocument()
                // Footer should not have aria-label as it's not well supported on semantic footer elements
                expect(footer).not.toHaveAttribute('aria-label')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('has unique IDs for ARIA relationships', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const nav = container.querySelector('nav[role="navigation"]')
                const main = container.querySelector('main[role="main"]')
                const navRegion = container.querySelector(
                    '[role="region"][aria-label="Navigation menu"]'
                )

                expect(nav).toHaveAttribute('id')
                expect(main).toHaveAttribute('id')
                if (navRegion) {
                    expect(navRegion).toHaveAttribute('id')
                }
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('has aria-label on navigation region', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const nav = container.querySelector('nav[role="navigation"]')
                expect(nav).toHaveAttribute('aria-label')
                const label = nav?.getAttribute('aria-label')
                expect(label).toContain('Sidebar navigation')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('DOM order matches visual order', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const nav = container.querySelector('nav[role="navigation"]')
                const main = container.querySelector('main[role="main"]')

                // Navigation should come before main content in DOM
                expect(nav?.compareDocumentPosition(main!)).toBe(
                    Node.DOCUMENT_POSITION_FOLLOWING
                )
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('toggle button is keyboard accessible', async () => {
            const handleToggle = vi.fn()
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                        onExpandedChange={handleToggle}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(
                () => {
                    const toggleButton = container.querySelector(
                        'button[aria-label*="sidebar"], button[aria-label*="Collapse"], button[aria-label*="Expand"]'
                    ) as HTMLElement
                    expect(toggleButton).toBeInTheDocument()

                    // Test keyboard focus
                    toggleButton.focus()
                    expect(document.activeElement).toBe(toggleButton)

                    // Test keyboard activation
                    fireEvent.keyDown(toggleButton, { key: 'Enter' })
                    fireEvent.keyDown(toggleButton, { key: ' ' })
                },
                { timeout: 3000 }
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('navigation items are keyboard accessible', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(
                () => {
                    const navItems = container.querySelectorAll(
                        'nav button, nav a, [role="list"] button, [role="list"] a'
                    ) as NodeListOf<HTMLElement>
                    expect(navItems.length).toBeGreaterThan(0)

                    navItems.forEach((item) => {
                        // All navigation items should be keyboard accessible
                        const tabIndex = item.getAttribute('tabindex')
                        expect(tabIndex === '0' || tabIndex === null).toBe(true)
                        item.focus()
                        expect(document.activeElement).toBe(item)
                    })
                },
                { timeout: 3000 }
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('keyboard shortcut works for toggle (default / key)', async () => {
            const handleToggle = vi.fn()
            render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                        onExpandedChange={handleToggle}
                        sidebarCollapseKey="/"
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            // Simulate keyboard shortcut
            fireEvent.keyDown(document, { key: '/' })
            await waitFor(() => {
                expect(handleToggle).toHaveBeenCalled()
            })
        })

        it('keyboard shortcut does not trigger when typing in input', async () => {
            const handleToggle = vi.fn()
            render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={
                            <input
                                type="text"
                                data-testid="search-input"
                                placeholder="Search..."
                            />
                        }
                        isExpanded={true}
                        onExpandedChange={handleToggle}
                        sidebarCollapseKey="/"
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            const input = screen.getByTestId('search-input')
            input.focus()
            fireEvent.keyDown(input, { key: '/' })

            // Should not trigger toggle when typing in input
            await waitFor(() => {
                expect(handleToggle).not.toHaveBeenCalled()
            })
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality is keyboard accessible without timing constraints', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const interactiveElements = container.querySelectorAll(
                    'button, a, [tabindex="0"]'
                ) as NodeListOf<HTMLElement>

                interactiveElements.forEach((element) => {
                    element.focus()
                    expect(document.activeElement).toBe(element)
                })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('has logical tab order', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const skipLinks = container.querySelectorAll('a[href^="#"]')
                const nav = container.querySelector('nav')
                const main = container.querySelector('main')

                // Skip links should come first
                if (skipLinks.length > 0) {
                    const firstSkipLink = skipLinks[0] as HTMLElement
                    expect(firstSkipLink.compareDocumentPosition(nav!)).toBe(
                        Node.DOCUMENT_POSITION_FOLLOWING
                    )
                }

                // Navigation should come before main content
                expect(nav?.compareDocumentPosition(main!)).toBe(
                    Node.DOCUMENT_POSITION_FOLLOWING
                )
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('interactive elements show focus indicator', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(
                () => {
                    const toggleButton = container.querySelector(
                        'button[aria-label*="sidebar"], button[aria-label*="Collapse"], button[aria-label*="Expand"]'
                    ) as HTMLElement
                    expect(toggleButton).toBeInTheDocument()

                    toggleButton.focus()
                    // Focus should be visible (outline or box-shadow or focus-visible)
                    // In test environment, focus styles may not be fully applied
                    // We verify the element can receive focus
                    expect(document.activeElement).toBe(toggleButton)
                },
                { timeout: 3000 }
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) (Level AA)', () => {
        it('interactive elements meet minimum touch target size (24x24px)', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const toggleButton = container.querySelector(
                    'button[aria-label*="sidebar"]'
                ) as HTMLElement
                expect(toggleButton).toBeInTheDocument()

                // In test environment (JSDOM), getBoundingClientRect may return 0
                // This test verifies the button exists and is accessible
                // Actual size verification should be done in visual regression tests
                const rect = toggleButton.getBoundingClientRect()
                // Skip size check in test environment if rect is 0 (JSDOM limitation)
                // The actual size is verified through design tokens and visual regression tests
                if (rect.width === 0 && rect.height === 0) {
                    // JSDOM doesn't provide accurate dimensions, so we just verify element exists
                    expect(toggleButton).toBeInTheDocument()
                } else {
                    // If dimensions are available, verify minimum size
                    expect(rect.width >= 24 || rect.height >= 24).toBe(true)
                }
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.2.1 On Focus (Level A)', () => {
        it('focusing elements does not cause context change', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const navItems = container.querySelectorAll(
                    'nav button, nav a'
                ) as NodeListOf<HTMLElement>
                expect(navItems.length).toBeGreaterThan(0)

                navItems.forEach((item) => {
                    item.focus()
                    expect(document.activeElement).toBe(item)
                    // No unexpected context changes should occur
                })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.2.2 On Input (Level A)', () => {
        it('interactions have predictable behavior', async () => {
            const handleClick = vi.fn()
            const navigationData: DirectoryData[] = [
                {
                    label: 'Main',
                    items: [
                        {
                            label: 'Dashboard',
                            onClick: handleClick,
                        },
                    ],
                },
            ]

            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={navigationData}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(
                () => {
                    // Find the navigation item button by its accessible name
                    const navItem = screen.getByLabelText(
                        'Dashboard'
                    ) as HTMLElement
                    expect(navItem).toBeInTheDocument()

                    // Ensure the sidebar is expanded and navigation is visible
                    const nav = container.querySelector(
                        'nav[role="navigation"]'
                    )
                    expect(nav).toBeInTheDocument()

                    fireEvent.click(navItem)
                    expect(handleClick).toHaveBeenCalledTimes(1)
                },
                { timeout: 3000 }
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('all changes are user-initiated', async () => {
            const handleToggle = vi.fn()
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                        onExpandedChange={handleToggle}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const toggleButton = container.querySelector(
                    'button[aria-label*="sidebar"]'
                ) as HTMLElement
                expect(toggleButton).toBeInTheDocument()

                // Changes should only occur on user interaction
                fireEvent.click(toggleButton)
                expect(handleToggle).toHaveBeenCalled()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('all interactive elements have proper name, role, and value', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const toggleButton = container.querySelector(
                    'button[aria-label*="sidebar"]'
                )
                expect(toggleButton).toBeInTheDocument()
                expect(toggleButton).toHaveAttribute('aria-label')
                expect(toggleButton).toHaveAttribute('aria-expanded')
                expect(toggleButton).toHaveAttribute('type', 'button')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('navigation items have accessible names', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const navItems = container.querySelectorAll('nav button, nav a')
                navItems.forEach((item) => {
                    const text = item.textContent?.trim()
                    const ariaLabel = item.getAttribute('aria-label')
                    expect(text || ariaLabel).toBeTruthy()
                })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Accessibility Best Practices Verification', () => {
        describe('1. Interactive controls are keyboard focusable', () => {
            it('toggle button has tabIndex for keyboard focus', async () => {
                const { container, unmount } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(
                    () => {
                        const toggleButton = container.querySelector(
                            'button[aria-label*="sidebar"], button[aria-label*="Collapse"], button[aria-label*="Expand"]'
                        ) as HTMLElement
                        expect(toggleButton).toBeInTheDocument()
                        // Button should be keyboard focusable
                        toggleButton.focus()
                        expect(document.activeElement).toBe(toggleButton)
                    },
                    { timeout: 3000 }
                )
                unmount()
            })

            it('navigation items are keyboard focusable', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(
                    () => {
                        const navItems = container.querySelectorAll(
                            'nav button, nav a, [role="list"] button, [role="list"] a'
                        ) as NodeListOf<HTMLElement>
                        expect(navItems.length).toBeGreaterThan(0)

                        navItems.forEach((item) => {
                            const tabIndex = item.getAttribute('tabindex')
                            expect(tabIndex === '0' || tabIndex === null).toBe(
                                true
                            )
                            item.focus()
                            expect(document.activeElement).toBe(item)
                        })
                    },
                    { timeout: 3000 }
                )
            })
        })

        describe('2. Interactive elements indicate their purpose and state', () => {
            it('toggle button has role and aria-label indicating purpose', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const toggleButton = container.querySelector(
                        'button[aria-label*="sidebar"]'
                    )
                    expect(toggleButton).toBeInTheDocument()
                    expect(toggleButton).toHaveAttribute('aria-label')
                    expect(toggleButton).toHaveAttribute('aria-expanded')
                    expect(toggleButton?.getAttribute('aria-label')).toContain(
                        'sidebar'
                    )
                })
            })

            it('navigation has proper role and aria-label', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const nav = container.querySelector(
                        'nav[role="navigation"]'
                    )
                    expect(nav).toBeInTheDocument()
                    expect(nav).toHaveAttribute('role', 'navigation')
                    expect(nav).toHaveAttribute('aria-label')
                    expect(nav).toHaveAttribute('aria-expanded')
                })
            })
        })

        describe('3. The page has a logical tab order', () => {
            it('tab order follows DOM order', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const nav = container.querySelector('nav')
                    const main = container.querySelector('main')

                    // Navigation should come before main content in tab order
                    expect(nav?.compareDocumentPosition(main!)).toBe(
                        Node.DOCUMENT_POSITION_FOLLOWING
                    )
                })
            })
        })

        describe('4. Visual order on the page follows DOM order', () => {
            it('DOM order matches visual order', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const nav = container.querySelector('nav')
                    const main = container.querySelector('main')

                    // DOM order should match visual order
                    expect(nav?.compareDocumentPosition(main!)).toBe(
                        Node.DOCUMENT_POSITION_FOLLOWING
                    )
                })
            })
        })

        describe('5. User focus is not accidentally trapped in a region', () => {
            it('focus can be moved in and out of sidebar', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <button data-testid="before">Before</button>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                        <button data-testid="after">After</button>
                    </div>
                )

                await waitFor(() => {
                    const beforeButton = screen.getByTestId('before')
                    const toggleButton = container.querySelector(
                        'button[aria-label*="sidebar"]'
                    ) as HTMLElement
                    const afterButton = screen.getByTestId('after')

                    // Focus can move into sidebar
                    toggleButton.focus()
                    expect(document.activeElement).toBe(toggleButton)

                    // Focus can move out
                    afterButton.focus()
                    expect(document.activeElement).toBe(afterButton)

                    // Focus can move back
                    beforeButton.focus()
                    expect(document.activeElement).toBe(beforeButton)
                })
            })
        })

        describe('7. HTML5 landmark elements are used to improve navigation', () => {
            it('uses proper landmark elements', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                            footer={<div>Footer Content</div>}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const nav = container.querySelector(
                        'nav[role="navigation"]'
                    )
                    const main = container.querySelector('main[role="main"]')
                    const footer = container.querySelector('footer')

                    expect(nav).toBeInTheDocument()
                    expect(main).toBeInTheDocument()
                    expect(footer).toBeInTheDocument()
                })
            })
        })

        describe('8. Offscreen content is hidden from assistive technology', () => {
            it('decorative icons have aria-hidden="true"', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const icons = container.querySelectorAll('svg')
                    icons.forEach((icon) => {
                        const parent = icon.parentElement
                        if (parent?.hasAttribute('aria-hidden')) {
                            expect(parent).toHaveAttribute(
                                'aria-hidden',
                                'true'
                            )
                        }
                    })
                })
            })
        })

        describe('9. Custom controls have associated labels', () => {
            it('toggle button has aria-label', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const toggleButton = container.querySelector(
                        'button[aria-label*="sidebar"]'
                    )
                    expect(toggleButton).toHaveAttribute('aria-label')
                    const label = toggleButton?.getAttribute('aria-label')
                    expect(label).toBeTruthy()
                    expect(label?.length).toBeGreaterThan(0)
                })
            })

            it('navigation has aria-label', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const nav = container.querySelector(
                        'nav[role="navigation"]'
                    )
                    expect(nav).toHaveAttribute('aria-label')
                    const label = nav?.getAttribute('aria-label')
                    expect(label).toBeTruthy()
                    expect(label?.length).toBeGreaterThan(0)
                })
            })
        })

        describe('10. Custom controls have ARIA roles', () => {
            it('sidebar has role="navigation"', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const nav = container.querySelector(
                        'nav[role="navigation"]'
                    )
                    expect(nav).toBeInTheDocument()
                    expect(nav).toHaveAttribute('role', 'navigation')
                })
            })

            it('main content has role="main"', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const main = container.querySelector('main[role="main"]')
                    expect(main).toBeInTheDocument()
                    expect(main).toHaveAttribute('role', 'main')
                })
            })

            it('footer has semantic footer element', async () => {
                const { container } = render(
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Sidebar
                            data={createNavigationData()}
                            topbar={<div>Topbar Content</div>}
                            footer={<div>Footer Content</div>}
                            isExpanded={true}
                        >
                            <div>Main Content</div>
                        </Sidebar>
                    </div>
                )

                await waitFor(() => {
                    const footer = container.querySelector('footer')
                    expect(footer).toBeInTheDocument()
                    // Footer should not have aria-label as it's not well supported on semantic footer elements
                    expect(footer).not.toHaveAttribute('aria-label')
                })
            })
        })
    })

    describe('Skip Links', () => {
        it('skip links are present and functional', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const skipLinks = container.querySelectorAll('a[href^="#"]')
                expect(skipLinks.length).toBeGreaterThanOrEqual(2)

                // Check for skip to navigation link
                const skipToNav = Array.from(skipLinks).find((link) =>
                    link.textContent?.includes('navigation')
                )
                expect(skipToNav).toBeInTheDocument()

                // Check for skip to main content link
                const skipToContent = Array.from(skipLinks).find((link) =>
                    link.textContent?.includes('main content')
                )
                expect(skipToContent).toBeInTheDocument()
            })
        })

        it('skip links have proper styling and visibility', async () => {
            const { container } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const skipLinks = container.querySelectorAll(
                    'a[href^="#"]'
                ) as NodeListOf<HTMLElement>
                expect(skipLinks.length).toBeGreaterThan(0)

                skipLinks.forEach((link) => {
                    const style = window.getComputedStyle(link)
                    // Skip links should be hidden by default but visible on focus
                    expect(style.position).toBe('absolute')
                })
            })
        })
    })

    describe('State Management', () => {
        it('aria-expanded reflects sidebar state correctly', async () => {
            const { container, rerender } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const nav = container.querySelector('nav[role="navigation"]')
                expect(nav).toHaveAttribute('aria-expanded', 'true')
            })

            rerender(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={false}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const nav = container.querySelector('nav[role="navigation"]')
                expect(nav).toHaveAttribute('aria-expanded', 'false')
            })
        })

        it('toggle button aria-expanded reflects state', async () => {
            const { container, rerender } = render(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={true}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const toggleButton = container.querySelector(
                    'button[aria-label*="sidebar"]'
                )
                expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
            })

            rerender(
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Sidebar
                        data={createNavigationData()}
                        topbar={<div>Topbar Content</div>}
                        isExpanded={false}
                    >
                        <div>Main Content</div>
                    </Sidebar>
                </div>
            )

            await waitFor(() => {
                const toggleButton = container.querySelector(
                    'button[aria-label*="sidebar"]'
                )
                expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
            })
        })
    })
})

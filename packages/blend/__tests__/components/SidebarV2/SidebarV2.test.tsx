import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import SidebarV2 from '../../../lib/components/SidebarV2/SidebarV2'
import type { DirectoryData } from '../../../lib/components/Directory/types'
import type { SecondarySidebarInfo } from '../../../lib/components/SidebarV2/types'
import { SidebarV2StateChange } from '../../../lib/components/SidebarV2/types'

const createMockDirectoryData = (): DirectoryData[] => [
    {
        label: 'Main',
        items: [
            {
                label: 'Home',
                href: '/home',
                showOnMobile: true,
            },
            {
                label: 'Dashboard',
                href: '/dashboard',
                showOnMobile: true,
            },
        ],
    },
    {
        label: 'Settings',
        items: [
            {
                label: 'Profile',
                href: '/profile',
                showOnMobile: false,
            },
            {
                label: 'Preferences',
                href: '/preferences',
                showOnMobile: true,
            },
        ],
    },
]

const createMockSecondarySidebar = (): SecondarySidebarInfo => ({
    items: [
        {
            label: 'App 1',
            value: 'app1',
            icon: <span data-testid="app1-icon">A1</span>,
        },
        {
            label: 'App 2',
            value: 'app2',
            icon: <span data-testid="app2-icon">A2</span>,
        },
    ],
    selected: 'app1',
    onSelect: vi.fn(),
})

describe('SidebarV2', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver

        // Reset window size to desktop
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1200,
        })
        window.dispatchEvent(new Event('resize'))
    })

    it('renders with default expanded state', () => {
        const { container } = render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div data-testid="main-content">Content</div>
            </SidebarV2>
        )

        expect(
            container.querySelector('[data-sidebar="sidebar"]')
        ).toBeInTheDocument()
        expect(screen.getByRole('main')).toBeInTheDocument()
        expect(screen.getByTestId('main-content')).toBeInTheDocument()
    })

    it('toggles expansion when clicking toggle button', async () => {
        const user = userEvent.setup()
        const onExpandedChange = vi.fn()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                onExpandedChange={onExpandedChange}
            >
                <div>Content</div>
            </SidebarV2>
        )

        const toggleButton = screen.getByRole('button', {
            name: /collapse sidebar/i,
        })

        await user.click(toggleButton)

        await waitFor(() => {
            expect(onExpandedChange).toHaveBeenCalledWith(false)
        })
    })

    it('supports controlled expansion state', async () => {
        const user = userEvent.setup()
        const onExpandedChange = vi.fn()

        const ControlledSidebar = () => {
            const [isExpanded, setIsExpanded] = React.useState(true)

            return (
                <SidebarV2
                    data={createMockDirectoryData()}
                    isExpanded={isExpanded}
                    onExpandedChange={(expanded) => {
                        setIsExpanded(expanded)
                        onExpandedChange(expanded)
                    }}
                >
                    <div>Content</div>
                </SidebarV2>
            )
        }

        render(<ControlledSidebar />)

        const toggleButton = screen.getByRole('button', {
            name: /collapse sidebar/i,
        })

        await user.click(toggleButton)

        await waitFor(() => {
            expect(onExpandedChange).toHaveBeenCalledWith(false)
        })

        expect(
            screen.getByRole('button', {
                name: /expand sidebar/i,
            })
        ).toBeInTheDocument()
    })

    it('renders secondary sidebar when provided', () => {
        const secondarySidebar = createMockSecondarySidebar()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                secondarySidebar={secondarySidebar}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(screen.getByTestId('app1-icon')).toBeInTheDocument()
        expect(screen.getByTestId('app2-icon')).toBeInTheDocument()
    })

    it('calls secondary sidebar onSelect when item is clicked', async () => {
        const user = userEvent.setup()
        const secondarySidebar = createMockSecondarySidebar()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                secondarySidebar={secondarySidebar}
            >
                <div>Content</div>
            </SidebarV2>
        )

        const app2Button = screen.getByTestId('app2-icon').closest('button')
        if (app2Button) {
            await user.click(app2Button)
        }

        await waitFor(() => {
            expect(secondarySidebar.onSelect).toHaveBeenCalledWith('app2')
        })
    })

    it('renders custom topbar slot', () => {
        const { container } = render(
            <SidebarV2
                data={createMockDirectoryData()}
                topbar={<div data-testid="custom-topbar">Custom Topbar</div>}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(
            container.querySelector('[data-topbar="topbar"]')
        ).toBeInTheDocument()
        expect(screen.getByTestId('custom-topbar')).toBeInTheDocument()
    })

    it('renders sidebar top slot', () => {
        render(
            <SidebarV2
                data={createMockDirectoryData()}
                sidebarTopSlot={
                    <div data-testid="sidebar-top">Sidebar Top</div>
                }
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(screen.getByTestId('sidebar-top')).toBeInTheDocument()
    })

    it('renders footer when provided', () => {
        render(
            <SidebarV2
                data={createMockDirectoryData()}
                footer={<div data-testid="footer-content">Footer</div>}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(screen.getByTestId('footer-content')).toBeInTheDocument()
    })

    it('supports active item selection', async () => {
        const onActiveItemChange = vi.fn()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                onActiveItemChange={onActiveItemChange}
                defaultActiveItem="home"
            >
                <div>Content</div>
            </SidebarV2>
        )

        // Verify that the Directory component receives the active item prop
        const directorySection = document.querySelector(
            '[data-directory-container]'
        )
        expect(directorySection).toBeInTheDocument()
    })

    it('calls onSidebarStateChange when state changes', async () => {
        const user = userEvent.setup()
        const onSidebarStateChange = vi.fn()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                onSidebarStateChange={onSidebarStateChange}
            >
                <div>Content</div>
            </SidebarV2>
        )

        // Initial state should be called
        await waitFor(() => {
            expect(onSidebarStateChange).toHaveBeenCalledWith(
                SidebarV2StateChange.EXPANDED
            )
        })

        const toggleButton = screen.getByRole('button', {
            name: /collapse sidebar/i,
        })
        await user.click(toggleButton)

        await waitFor(() => {
            expect(onSidebarStateChange).toHaveBeenCalledWith(
                SidebarV2StateChange.COLLAPSED
            )
        })
    })

    it('renders with custom height', () => {
        const { container } = render(
            <SidebarV2 data={createMockDirectoryData()} height="800px">
                <div>Content</div>
            </SidebarV2>
        )

        const sidebar = container.querySelector('[data-sidebar="sidebar"]')
        expect(sidebar).toBeInTheDocument()
    })

    it('handles merchant info in sidebar and topbar', () => {
        const merchantInfo = {
            items: [
                { label: 'Merchant 1', value: 'm1', icon: <span>M1</span> },
                { label: 'Merchant 2', value: 'm2', icon: <span>M2</span> },
            ],
            selected: 'm1',
            onSelect: vi.fn(),
        }

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                merchantInfo={merchantInfo}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(screen.getAllByText('Merchant 1').length).toBeGreaterThan(0)
        expect(
            screen.getByRole('button', { name: /select merchant/i })
        ).toBeInTheDocument()
    })

    it('does not render topbar rightActions when topbar is omitted', () => {
        const { container } = render(
            <SidebarV2
                data={createMockDirectoryData()}
                rightActions={<button>Action Button</button>}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(
            container.querySelector('[data-sidebar="sidebar"]')
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: 'Action Button' })
        ).not.toBeInTheDocument()
    })

    it('omits the directory panel when data is null and the sidebar is expanded', () => {
        const { container } = render(
            <SidebarV2 data={null} defaultIsExpanded>
                <div data-testid="main-content">Content</div>
            </SidebarV2>
        )

        expect(
            container.querySelector('[data-sidebar="sidebar"]')
        ).toBeInTheDocument()
        expect(screen.getByTestId('main-content')).toBeInTheDocument()
        expect(
            container.querySelector('[data-directory-container]')
        ).not.toBeInTheDocument()
    })

    it('omits the directory panel when data is empty and the sidebar is expanded', () => {
        const { container } = render(
            <SidebarV2 data={[]} defaultIsExpanded>
                <div>Content</div>
            </SidebarV2>
        )

        expect(
            container.querySelector('[data-sidebar="sidebar"]')
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-directory-container]')
        ).not.toBeInTheDocument()
    })

    it('still renders the secondary rail when data is empty but secondarySidebar is set', () => {
        const secondarySidebar = createMockSecondarySidebar()

        render(
            <SidebarV2
                data={[]}
                defaultIsExpanded
                secondarySidebar={secondarySidebar}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(screen.getByTestId('app1-icon')).toBeInTheDocument()
        expect(screen.getByTestId('app2-icon')).toBeInTheDocument()
    })
})

describe('SidebarV2 Mobile Navigation', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver

        // Set mobile viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        })
        window.dispatchEvent(new Event('resize'))
    })

    it('renders with mobile viewport', () => {
        render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        // Component should render without errors
        expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('does not render bottom app navigation when there are no mobile directory items', () => {
        render(
            <SidebarV2 data={[]}>
                <div>Content</div>
            </SidebarV2>
        )

        expect(
            screen.queryByRole('navigation', { name: /app navigation/i })
        ).not.toBeInTheDocument()
    })

    it('renders bottom mobile navigation when items are marked showOnMobile', () => {
        render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        expect(
            screen.getByRole('navigation', { name: /app navigation/i })
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Preferences' })
        ).toBeInTheDocument()
    })

    it('renders topbar rightActions on mobile when topbar is provided', () => {
        render(
            <SidebarV2
                data={createMockDirectoryData()}
                topbar={<span>Page title</span>}
                rightActions={<button>Action Button</button>}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(
            screen.getByRole('button', { name: 'Action Button' })
        ).toBeInTheDocument()
    })

    it('renders mobile primary action using v2 mobile-only props', () => {
        render(
            <SidebarV2
                data={createMockDirectoryData()}
                showMobilePrimaryActionButton
                mobilePrimaryActionButtonProps={{
                    'aria-label': 'Compose',
                    onClick: vi.fn(),
                }}
            >
                <div>Content</div>
            </SidebarV2>
        )

        expect(
            screen.getByRole('button', { name: 'Compose' })
        ).toBeInTheDocument()
    })
})

describe('SidebarV2 Keyboard Navigation', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('does not toggle when typing in input', async () => {
        const user = userEvent.setup()
        const onExpandedChange = vi.fn()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                onExpandedChange={onExpandedChange}
                sidebarCollapseKey="/"
            >
                <input data-testid="test-input" />
            </SidebarV2>
        )

        const input = screen.getByTestId('test-input')
        await user.click(input)
        await user.keyboard('/')

        // Should not have been called when input is focused
        expect(onExpandedChange).not.toHaveBeenCalled()
    })
})

describe('SidebarV2 Collapsed Behavior', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('keeps the sidebar collapsed when the directory is hovered', async () => {
        const user = userEvent.setup()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                defaultIsExpanded={false}
            >
                <div>Content</div>
            </SidebarV2>
        )

        // Find the directory container and hover it
        const directoryContainer = document.querySelector(
            '[data-directory-container]'
        )
        if (directoryContainer) {
            await user.hover(directoryContainer)
        }

        // The hover preview is disabled by default.
        expect(directoryContainer).toBeInTheDocument()
        expect(
            document.querySelectorAll('[data-directory-container]')
        ).toHaveLength(1)
    })

    it('opens the hover preview only when intermediate state is enabled', async () => {
        const user = userEvent.setup()
        const onSidebarStateChange = vi.fn()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                defaultIsExpanded={false}
                enableIntermediateState
                onSidebarStateChange={onSidebarStateChange}
            >
                <div>Content</div>
            </SidebarV2>
        )

        const directoryContainer = document.querySelector(
            '[data-directory-container]'
        )
        if (directoryContainer) {
            await user.hover(directoryContainer)
        }

        expect(onSidebarStateChange).toHaveBeenLastCalledWith('intermediate')
    })

    it('keeps the secondary rail mounted but visually collapsed', () => {
        const secondarySidebar = createMockSecondarySidebar()

        const { container } = render(
            <SidebarV2
                data={createMockDirectoryData()}
                secondarySidebar={secondarySidebar}
                defaultIsExpanded={false}
            >
                <div>Content</div>
            </SidebarV2>
        )

        const secondaryRail = container.querySelector(
            '[data-element="secondary-sidebar"]'
        )
        expect(secondaryRail).toHaveAttribute('aria-hidden', 'true')
        expect(secondaryRail).toHaveAttribute('inert')
        expect(secondaryRail).toHaveStyle({
            width: '0px',
            overflow: 'hidden',
        })
    })
})

describe('SidebarV2 Scroll Behavior', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('handles scroll effects when content is scrollable', async () => {
        // Create large directory data to ensure scrollability
        const largeData: DirectoryData[] = Array.from(
            { length: 20 },
            (_, i) => ({
                label: `Section ${i}`,
                items: Array.from({ length: 10 }, (_, j) => ({
                    label: `Item ${i}-${j}`,
                    href: `/item-${i}-${j}`,
                })),
            })
        )

        render(
            <SidebarV2 data={largeData}>
                <div>Content</div>
            </SidebarV2>
        )

        const directoryContainer = document.querySelector(
            '[data-directory-container]'
        )
        expect(directoryContainer).toBeInTheDocument()

        // Verify the scroll listener is set up by checking the container exists
        // and is in the document after the effect runs
        await waitFor(
            () => {
                expect(directoryContainer).toBeInTheDocument()
                // The directory container should exist and be ready for scroll events
                expect(
                    directoryContainer?.getAttribute('data-directory-container')
                ).toBeDefined()
            },
            { timeout: 100 }
        )
    })

    it('handles resize events', async () => {
        render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        // Trigger resize event
        window.dispatchEvent(new Event('resize'))

        // Wait for the resize handler and verify component is still rendered
        await waitFor(
            () => {
                const sidebar = document.querySelector(
                    '[data-sidebar="sidebar"]'
                )
                expect(sidebar).toBeInTheDocument()
                expect(screen.getByRole('main')).toBeInTheDocument()
            },
            { timeout: 100 }
        )
    })
})

describe('SidebarV2 Controlled Mode on Mobile', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver

        // Set mobile viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        })
        window.dispatchEvent(new Event('resize'))
    })

    afterEach(() => {
        // Reset to desktop viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1200,
        })
    })

    it('collapses sidebar when switching to mobile in controlled mode', async () => {
        const onExpandedChange = vi.fn()

        render(
            <SidebarV2
                data={createMockDirectoryData()}
                isExpanded={true}
                onExpandedChange={onExpandedChange}
            >
                <div>Content</div>
            </SidebarV2>
        )

        // In controlled mode on mobile, should call onExpandedChange with false
        await waitFor(() => {
            expect(onExpandedChange).toHaveBeenCalledWith(false)
        })
    })
})

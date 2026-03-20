import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, MockIcon } from '../../test-utils'
import Breadcrumb from '../../../lib/components/BreadcrumbV2/BreadcrumbV2'

const SAMPLE_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Cameras', href: '/products/electronics/cameras' },
]

describe('BreadcrumbV2 Component', () => {
    it('renders breadcrumb items and container attributes', () => {
        render(<Breadcrumb items={SAMPLE_ITEMS} />)

        // labels present
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Products')).toBeInTheDocument()
        expect(screen.getByText('Electronics')).toBeInTheDocument()
        expect(screen.getByText('Cameras')).toBeInTheDocument()

        // container data attributes
        expect(
            document.querySelector('[data-breadcrumb="breadcrumb"]')
        ).toBeInTheDocument()
        expect(
            document.querySelector('[data-status="enabled-notselected"]')
        ).toBeInTheDocument()
    })

    it('shows overflow ellipsis button when items exceed MAX_ITEMS', () => {
        const manyItems = [
            { label: 'Home', href: '/' },
            { label: 'One', href: '/1' },
            { label: 'Two', href: '/2' },
            { label: 'Three', href: '/3' },
            { label: 'Four', href: '/4' },
            { label: 'Five', href: '/5' },
            { label: 'Six', href: '/6' },
        ]

        render(<Breadcrumb items={manyItems} />)

        // Expect the ellipsis button showing number of hidden items (menuItems length)
        // For 7 items, menuItems length should be 3 => "Show 3 more breadcrumb items"
        expect(
            screen.getByLabelText('Show 3 more breadcrumb items')
        ).toBeInTheDocument()
        expect(
            document.querySelector('[data-status="enabled-selected"]')
        ).toBeInTheDocument()
    })

    it('marks single item as current page', () => {
        render(<Breadcrumb items={[{ label: 'Only', href: '/' }]} />)

        const activeLink = screen.getByLabelText('Current page: Only')
        expect(activeLink).toBeInTheDocument()
        expect(activeLink).toHaveAttribute('aria-current', 'page')
    })

    it('returns null when items is empty and no composable children', () => {
        const { container } = render(<Breadcrumb items={[]} />)
        expect(
            container.querySelector('nav[aria-label="Breadcrumb navigation"]')
        ).not.toBeInTheDocument()
    })

    it('returns null when no props provided', () => {
        const { container } = render(<Breadcrumb />)
        expect(
            container.querySelector('nav[aria-label="Breadcrumb navigation"]')
        ).not.toBeInTheDocument()
    })

    it('renders skeleton when skeleton.show is true', () => {
        render(
            <Breadcrumb
                items={[{ label: 'Loading', href: '/' }]}
                skeleton={{ show: true, variant: 'pulse' }}
            />
        )
        expect(
            document.querySelector('[data-element="breadcrumb-v2-skeleton"]')
        ).toBeInTheDocument()
    })

    it('renders skeleton per item; non-active skeleton shows trailing separator', () => {
        const { container } = render(
            <Breadcrumb
                items={[
                    { label: 'First', href: '/first' },
                    { label: 'Last', href: '/last' },
                ]}
                skeleton={{ show: true, variant: 'pulse' }}
            />
        )
        const skeletons = container.querySelectorAll(
            '[data-element="breadcrumb-v2-skeleton"]'
        )
        expect(skeletons.length).toBe(2)
        // First segment is not active with 2+ items → BreadcrumbV2Skeleton renders "/"
        expect(container.textContent).toMatch(/\//)
    })

    it('renders left and right slots on items', () => {
        render(
            <Breadcrumb
                items={[
                    {
                        label: 'With slots',
                        href: '/slots',
                        leftSlot: <MockIcon />,
                        rightSlot: <span data-testid="right-slot">★</span>,
                    },
                ]}
            />
        )
        expect(
            document.querySelector('[data-element="leading-icon"]')
        ).toBeInTheDocument()
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        expect(
            document.querySelector('[data-element="trailing-icon"]')
        ).toBeInTheDocument()
        expect(screen.getByTestId('right-slot')).toBeInTheDocument()
    })

    it('calls onClick when navigating a non-active item', async () => {
        const onClick = vi.fn()
        const { user } = render(
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    {
                        label: 'Settings',
                        href: '/settings',
                        onClick,
                    },
                    // Last segment is current page; Settings must not be last or it becomes active
                    { label: 'Profile', href: '/profile' },
                ]}
            />
        )
        await user.click(screen.getByLabelText('Navigate to Settings'))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    describe('composable (compound) API', () => {
        it('renders Item, Page, StartIcon, and EndIcon', () => {
            render(
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <Breadcrumb.StartIcon>
                            <MockIcon />
                        </Breadcrumb.StartIcon>
                        <Breadcrumb.Page>Home</Breadcrumb.Page>
                        <Breadcrumb.EndIcon>
                            <span data-testid="chev">›</span>
                        </Breadcrumb.EndIcon>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/docs">
                        <Breadcrumb.Page>Docs</Breadcrumb.Page>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item isActive>
                        <Breadcrumb.Page>Components</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb>
            )

            expect(screen.getByText('Home')).toBeInTheDocument()
            expect(screen.getByText('Docs')).toBeInTheDocument()
            expect(screen.getByText('Components')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.getByTestId('chev')).toBeInTheDocument()
            // Non-string children use generic label in compound Item
            expect(
                screen.getByLabelText('Current page: Breadcrumb item')
            ).toBeInTheDocument()
        })

        it('marks last Item active by default when isActive omitted', () => {
            render(
                <Breadcrumb>
                    <Breadcrumb.Item href="/a">
                        <Breadcrumb.Page>A</Breadcrumb.Page>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/b">
                        <Breadcrumb.Page>B</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb>
            )
            expect(
                screen.getByLabelText('Current page: Breadcrumb item')
            ).toBeInTheDocument()
            expect(
                screen.getByLabelText('Navigate to breadcrumb item')
            ).toBeInTheDocument()
        })

        it('shows overflow ellipsis when more than MAX_ITEMS Item children', () => {
            render(
                <Breadcrumb>
                    <Breadcrumb.Item href="/0">
                        <Breadcrumb.Page>L0</Breadcrumb.Page>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/1">
                        <Breadcrumb.Page>L1</Breadcrumb.Page>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/2">
                        <Breadcrumb.Page>L2</Breadcrumb.Page>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/3">
                        <Breadcrumb.Page>L3</Breadcrumb.Page>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/4">
                        <Breadcrumb.Page>L4</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb>
            )
            expect(
                screen.getByLabelText('Show 1 more breadcrumb items')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-status="enabled-selected"]')
            ).toBeInTheDocument()
        })

        it('calls onClick on compound Item', async () => {
            const onClick = vi.fn()
            const { user } = render(
                <Breadcrumb>
                    <Breadcrumb.Item href="/x" onClick={onClick}>
                        <Breadcrumb.Page>Click me</Breadcrumb.Page>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item isActive>
                        <Breadcrumb.Page>Current</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb>
            )
            await user.click(
                screen.getByLabelText('Navigate to breadcrumb item')
            )
            expect(onClick).toHaveBeenCalledTimes(1)
        })
    })
})

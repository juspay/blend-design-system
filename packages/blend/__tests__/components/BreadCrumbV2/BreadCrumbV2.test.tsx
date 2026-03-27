import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, MockIcon } from '../../test-utils'
import Breadcrumb from '../../../lib/components/BreadcrumbV2/BreadcrumbV2'

const SAMPLE_SEGMENTS = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Cameras', href: '/products/electronics/cameras' },
]

function BreadcrumbFromSegments({
    segments,
}: {
    segments: { label: string; href: string }[]
}) {
    return (
        <Breadcrumb>
            {segments.map((seg, i) => (
                <Breadcrumb.Item
                    key={seg.href}
                    href={seg.href}
                    isActive={i === segments.length - 1}
                >
                    <Breadcrumb.Page>{seg.label}</Breadcrumb.Page>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}

describe('BreadcrumbV2 Component', () => {
    it('renders breadcrumb items and container attributes', () => {
        render(<BreadcrumbFromSegments segments={SAMPLE_SEGMENTS} />)

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Products')).toBeInTheDocument()
        expect(screen.getByText('Electronics')).toBeInTheDocument()
        expect(screen.getByText('Cameras')).toBeInTheDocument()

        expect(
            document.querySelector('[data-breadcrumb="breadcrumb"]')
        ).toBeInTheDocument()
        expect(
            document.querySelector('[data-status="enabled-notselected"]')
        ).toBeInTheDocument()
    })

    it('shows overflow ellipsis button when items exceed maxItems (default 4)', () => {
        const manySegments = [
            { label: 'Home', href: '/' },
            { label: 'One', href: '/1' },
            { label: 'Two', href: '/2' },
            { label: 'Three', href: '/3' },
            { label: 'Four', href: '/4' },
            { label: 'Five', href: '/5' },
            { label: 'Six', href: '/6' },
        ]

        render(<BreadcrumbFromSegments segments={manySegments} />)

        expect(
            screen.getByLabelText('Show 3 more breadcrumb items')
        ).toBeInTheDocument()
        expect(
            document.querySelector('[data-status="enabled-selected"]')
        ).toBeInTheDocument()
    })

    it('marks single item as current page', () => {
        render(
            <Breadcrumb>
                <Breadcrumb.Item href="/" isActive>
                    <Breadcrumb.Page>Only</Breadcrumb.Page>
                </Breadcrumb.Item>
            </Breadcrumb>
        )

        const activeLink = screen.getByLabelText('Current page: Only')
        expect(activeLink).toBeInTheDocument()
        expect(activeLink).toHaveAttribute('aria-current', 'page')
    })

    it('returns null when no Item children', () => {
        const { container } = render(
            <Breadcrumb>
                <span>not an item</span>
            </Breadcrumb>
        )
        expect(
            container.querySelector('nav[aria-label="Breadcrumb navigation"]')
        ).not.toBeInTheDocument()
    })

    it('returns null when no children', () => {
        const { container } = render(<Breadcrumb />)
        expect(
            container.querySelector('nav[aria-label="Breadcrumb navigation"]')
        ).not.toBeInTheDocument()
    })

    it('renders multiple Icon slots by composition order', () => {
        render(
            <Breadcrumb>
                <Breadcrumb.Item href="/slots" isActive>
                    <Breadcrumb.Icon>
                        <MockIcon />
                    </Breadcrumb.Icon>
                    <Breadcrumb.Page>With slots</Breadcrumb.Page>
                    <Breadcrumb.Icon>
                        <span data-testid="right-slot">★</span>
                    </Breadcrumb.Icon>
                </Breadcrumb.Item>
            </Breadcrumb>
        )
        const iconHosts = document.querySelectorAll(
            '[data-element="breadcrumb-icon"]'
        )
        expect(iconHosts.length).toBe(2)
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        expect(screen.getByTestId('right-slot')).toBeInTheDocument()
    })

    it('calls onClick when navigating a non-active item', async () => {
        const onClick = vi.fn()
        const { user } = render(
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Breadcrumb.Page>Home</Breadcrumb.Page>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/settings" onClick={onClick}>
                    <Breadcrumb.Page>Settings</Breadcrumb.Page>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>
                    <Breadcrumb.Page>Profile</Breadcrumb.Page>
                </Breadcrumb.Item>
            </Breadcrumb>
        )
        await user.click(screen.getByLabelText('Navigate to Settings'))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('renders Item, Page, and Icon', () => {
        render(
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Breadcrumb.Icon>
                        <MockIcon />
                    </Breadcrumb.Icon>
                    <Breadcrumb.Page>Home</Breadcrumb.Page>
                    <Breadcrumb.Icon>
                        <span data-testid="chev">›</span>
                    </Breadcrumb.Icon>
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

    it('shows overflow ellipsis when more than maxItems Item children (default 4)', () => {
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
        await user.click(screen.getByLabelText('Navigate to breadcrumb item'))
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})

import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
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
})

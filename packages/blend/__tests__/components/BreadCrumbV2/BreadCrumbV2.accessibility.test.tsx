import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '../../test-utils'
import { axe } from 'jest-axe'
import Breadcrumb from '../../../lib/components/BreadcrumbV2/BreadcrumbV2'

const SAMPLE_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Cameras', href: '/products/electronics/cameras' },
]

describe('BreadcrumbV2 Accessibility', () => {
    it('has no accessibility violations for default breadcrumb', async () => {
        const { container } = render(<Breadcrumb items={SAMPLE_ITEMS} />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations for overflow state', async () => {
        const manyItems = [
            { label: 'Home', href: '/' },
            { label: 'One', href: '/1' },
            { label: 'Two', href: '/2' },
            { label: 'Three', href: '/3' },
            { label: 'Four', href: '/4' },
            { label: 'Five', href: '/5' },
            { label: 'Six', href: '/6' },
        ]
        const { container } = render(<Breadcrumb items={manyItems} />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('has accessible name and role for nav landmark', () => {
        render(<Breadcrumb items={SAMPLE_ITEMS} />)
        const nav = document.querySelector(
            'nav[aria-label="Breadcrumb navigation"]'
        )
        expect(nav).toBeInTheDocument()
    })
})

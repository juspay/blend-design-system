import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '../../test-utils'
import { axe } from 'jest-axe'
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

describe('BreadcrumbV2 Accessibility', () => {
    it('has no accessibility violations for default breadcrumb', async () => {
        const { container } = render(
            <BreadcrumbFromSegments segments={SAMPLE_SEGMENTS} />
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations for overflow state', async () => {
        const manySegments = [
            { label: 'Home', href: '/' },
            { label: 'One', href: '/1' },
            { label: 'Two', href: '/2' },
            { label: 'Three', href: '/3' },
            { label: 'Four', href: '/4' },
            { label: 'Five', href: '/5' },
            { label: 'Six', href: '/6' },
        ]
        const { container } = render(
            <BreadcrumbFromSegments segments={manySegments} />
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('has accessible name and role for nav landmark', () => {
        render(<BreadcrumbFromSegments segments={SAMPLE_SEGMENTS} />)
        const nav = document.querySelector(
            'nav[aria-label="Breadcrumb navigation"]'
        )
        expect(nav).toBeInTheDocument()
    })

    it('has no accessibility violations for composable API', async () => {
        const { container } = render(
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Breadcrumb.Page>Home</Breadcrumb.Page>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/docs">
                    <Breadcrumb.Page>Docs</Breadcrumb.Page>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>
                    <Breadcrumb.Page>Components</Breadcrumb.Page>
                </Breadcrumb.Item>
            </Breadcrumb>
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})

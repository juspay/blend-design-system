'use client'
import { BreadcrumbV2 } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const BreadcrumbV2Preview = () => {
    const tsCode = `import { BreadcrumbV2 } from '@juspay/blend-design-system'

function MyComponent() {
    const items = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops', href: '/products/electronics/laptops' },
    ]

    return <BreadcrumbV2 items={items} maxItems={3} />
}`

    const reCode = `type breadcrumbItem = {
  id?: string,
  label: string,
  href: string,
  leftSlot?: React.element,
  rightSlot?: React.element,
}

@react.component
let make = () => {
  let items = [
    {label: "Home", href: "/"},
    {label: "Products", href: "/products"},
    {label: "Electronics", href: "/products/electronics"},
    {label: "Laptops", href: "/products/electronics/laptops"}
  ]

  <BreadcrumbV2 items={items} maxItems={3} />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~items: array<{id?: string, label: string, href: string, leftSlot?: React.element, rightSlot?: React.element, onClick?: ReactEvent.Mouse.t => unit}>=?,
  ~maxItems: int=?,
  ~children: React.element=?,
) => React.element = "BreadcrumbV2"`

    const items = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops', href: '/products/electronics/laptops' },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full">
                <BreadcrumbV2 items={items} maxItems={3} />
            </div>
        </ComponentPreview>
    )
}

export default BreadcrumbV2Preview

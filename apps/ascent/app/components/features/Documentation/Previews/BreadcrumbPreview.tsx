'use client'

import { Breadcrumb, BreadcrumbItemType } from '@juspay/blend-design-system'
import { HomeIcon, FolderIcon } from 'lucide-react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const tsCode = `import { Breadcrumb, BreadcrumbItemType } from 'blend-v1'
import { HomeIcon, FolderIcon } from 'lucide-react'

function MyComponent() {
    const breadcrumbItems: BreadcrumbItemType[] = [
        { 
            label: 'Home', 
            href: '/',
            leftSlot: <HomeIcon size={14} />
        },
        { 
            label: 'Documents', 
            href: '/documents',
            leftSlot: <FolderIcon size={14} />
        },
        { 
            label: 'Projects', 
            href: '/documents/projects' 
        },
    ]

    return <Breadcrumb items={breadcrumbItems} />
}`

const BreadcrumbPreview = () => {
    const breadcrumbItems: BreadcrumbItemType[] = [
        {
            label: 'Home',
            href: '/',
            leftSlot: <HomeIcon size={14} />,
        },
        {
            label: 'Documents',
            href: '/documents',
            leftSlot: <FolderIcon size={14} />,
        },
        {
            label: 'Projects',
            href: '/documents/projects',
        },
    ]

    const longPathItems: BreadcrumbItemType[] = [
        { label: 'Home', href: '/' },
        { label: 'E-commerce', href: '/ecommerce' },
        { label: 'Products', href: '/ecommerce/products' },
        { label: 'Electronics', href: '/ecommerce/products/electronics' },
        {
            label: 'Computers',
            href: '/ecommerce/products/electronics/computers',
        },
        {
            label: 'Laptops',
            href: '/ecommerce/products/electronics/computers/laptops',
        },
    ]

    return (
        <ComponentPreview ts={tsCode}>
            <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Basic Breadcrumb with Icons
                    </h4>
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Long Path (Overflow Handling)
                    </h4>
                    <Breadcrumb items={longPathItems} />
                </div>
            </div>
        </ComponentPreview>
    )
}

export default BreadcrumbPreview

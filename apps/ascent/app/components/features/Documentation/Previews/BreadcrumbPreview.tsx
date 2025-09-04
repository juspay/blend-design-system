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

const reCode = `@module("blend-v1") external breadcrumb: React.component<{
  "items": array<breadcrumbItemType>
}> = "Breadcrumb"

@module("lucide-react") external homeIcon: React.component<{
  "size": int
}> = "HomeIcon"

@module("lucide-react") external folderIcon: React.component<{
  "size": int
}> = "FolderIcon"

let make = () => {
  let breadcrumbItems = [
    {
      "label": "Home",
      "href": "/",
      "leftSlot": React.createElement(homeIcon, {"size": 14})
    },
    {
      "label": "Documents", 
      "href": "/documents",
      "leftSlot": React.createElement(folderIcon, {"size": 14})
    },
    {
      "label": "Projects",
      "href": "/documents/projects"
    }
  ]

  React.createElement(breadcrumb, {"items": breadcrumbItems})
}`

const bindingCode = `type breadcrumbItemType = {
  "label": string,
  "href": string,
  "leftSlot"?: React.element,
  "rightSlot"?: React.element
}

@module("blend-v1") external breadcrumb: React.component<{
  "items": array<breadcrumbItemType>
}> = "Breadcrumb"`

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
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
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

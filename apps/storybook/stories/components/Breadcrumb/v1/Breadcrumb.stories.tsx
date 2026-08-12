import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Breadcrumb } from '@juspay/blend-design-system/deprecated/breadcrumb'
import type { BreadcrumbItemType } from '@juspay/blend-design-system/deprecated/breadcrumb'
import {
    Home,
    Users,
    User,
    Folder,
    FolderOpen,
    ShoppingCart,
    Package,
    FileText,
    Database,
    BarChart3,
    Shield,
    Layers,
    Globe,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const meta: Meta<typeof Breadcrumb> = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            "A navigation breadcrumb component that displays the current page's location within a navigational hierarchy with support for overflow handling and custom content slots.",
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Breadcrumb, BreadcrumbItemType } from '@juspay/blend-design-system/deprecated/breadcrumb';

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones", href: "/products/electronics/smartphones" }
];

<Breadcrumb items={breadcrumbItems} />
\`\`\`


## Features
- Hierarchical navigation display
- Automatic overflow handling with ellipsis menu
- Maximum item limit (4 items) with smart truncation
- Left and right content slots for each item
- Active state indication for current page
- Accessible navigation structure
- Responsive design
- Custom styling support
- Link-based navigation
- Custom onClick handlers for client-side routing

## Accessibility

**WCAG Compliance**: 2.0, 2.1, 2.2 Level AAA Compliant

**Level AAA Compliance**: ✅ Fully Compliant
- All Level A, Level AA, and Level AAA criteria met
- Semantic HTML structure with nav, ol, and li elements
- Comprehensive ARIA labels for all interactive elements
- Proper use of aria-current="page" for active item
- All interactive elements meet 44x44px touch target requirement (WCAG 2.5.5)
- Complete keyboard navigation support (Tab, Enter)
- Visible focus indicators on all interactive elements
- Decorative content properly hidden from screen readers
- Ordered list structure provides clear hierarchical context
- Active items are not in the tab order (href={undefined}), preventing navigation to current page
- Ellipsis button properly labeled with dynamic count information

**Key Accessibility Features**:
- ✅ Semantic HTML: Uses nav with aria-label, ol for ordered list, li for items
- ✅ ARIA Labels: All links have descriptive aria-label attributes
- ✅ Touch Targets: Minimum 44x44px for all interactive elements (AAA requirement)
- ✅ Keyboard Navigation: Full keyboard support with logical tab order
- ✅ Focus Management: Visible focus indicators, active items not in tab order
- ✅ Screen Reader Support: Proper announcements, decorative content hidden
- ✅ Location Context: aria-current="page" indicates current location

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AAA compliance)
- **jest-axe**: Run \`pnpm test Breadcrumb.accessibility\` (40+ tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify touch target sizes in browser DevTools
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Custom Routing

For client-side routing (e.g., React Router), use the \`onClick\` handler:

\`\`\`tsx
const items: BreadcrumbItemType[] = [
  { 
    label: "Home", 
    href: "/",
    onClick: (e) => {
      e.preventDefault();
      navigate('/');
    }
  },
  { 
    label: "Products", 
    href: "/products",
    onClick: (e) => {
      e.preventDefault();
      navigate('/products');
    }
  }
];

<Breadcrumb items={items} />
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        items: {
            control: 'object',
            description:
                'Array of breadcrumb items to display in the navigation',
            table: {
                type: {
                    summary: 'BreadcrumbItemType[]',
                    detail: `BreadcrumbItemType: {
  label: string;                    // Display text for the item (required)
  href?: string;                   // URL for navigation
  onClick?: (e) => void;          // Click handler (receives event)
  disabled?: boolean;             // Disable this item
}`,
                },
                category: 'Data',
            },
        },
        skeleton: {
            control: 'object',
            description:
                'Skeleton loading state configuration with show and variant properties',
            table: {
                type: {
                    summary: 'SkeletonConfig',
                    detail: `{
  show: boolean;              // Whether to show skeleton loading
  variant?: 'pulse' | 'wave'; // Animation variant (default: 'pulse')
}`,
                },
                category: 'State',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

// Default story
export const Default: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            {
                label: 'Current Page',
                href: '/products/electronics/smartphones',
            },
        ],
    },
}

// Simple breadcrumb
export const SimpleBreadcrumb: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">Two levels:</h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Dashboard', href: '/dashboard' },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">Three levels:</h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Settings', href: '/settings' },
                        { label: 'Profile', href: '/settings/profile' },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">Four levels:</h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        { label: 'Electronics', href: '/products/electronics' },
                        {
                            label: 'Smartphones',
                            href: '/products/electronics/smartphones',
                        },
                    ]}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Simple breadcrumb navigation with different hierarchy levels. The last item is automatically marked as active (current page). All items are keyboard accessible and meet WCAG 2.5.5 touch target requirements.',
            },
        },
    },
}

// Breadcrumb with icons
export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Dashboard navigation:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Dashboard',
                            href: '/dashboard',
                            leftSlot: <Home size={16} />,
                        },
                        {
                            label: 'Users',
                            href: '/dashboard/users',
                            leftSlot: <Users size={16} />,
                        },
                        {
                            label: 'Profile',
                            href: '/dashboard/users/profile',
                            leftSlot: <User size={16} />,
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    File system navigation:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Projects',
                            href: '/projects',
                            leftSlot: <FolderOpen size={16} />,
                        },
                        {
                            label: 'Website',
                            href: '/projects/website',
                            leftSlot: <Folder size={16} />,
                        },
                        {
                            label: 'Components',
                            href: '/projects/website/components',
                            leftSlot: <Layers size={16} />,
                        },
                        {
                            label: 'Button.tsx',
                            href: '/projects/website/components/button',
                            leftSlot: <FileText size={16} />,
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    E-commerce navigation:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Store',
                            href: '/store',
                            leftSlot: <Globe size={16} />,
                        },
                        {
                            label: 'Cart',
                            href: '/store/cart',
                            leftSlot: <ShoppingCart size={16} />,
                        },
                        {
                            label: 'Checkout',
                            href: '/store/cart/checkout',
                            leftSlot: <Package size={16} />,
                        },
                    ]}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Breadcrumb navigation with icons in the left slot for better visual context and hierarchy understanding. Icons are marked with aria-hidden="true" to prevent screen reader announcements, as the text labels provide all necessary information.',
            },
        },
    },
}

// Breadcrumb with badges and status
export const WithBadgesAndStatus: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Project status:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Projects',
                            href: '/projects',
                            leftSlot: <Folder size={16} />,
                        },
                        {
                            label: 'Website Redesign',
                            href: '/projects/website-redesign',
                            leftSlot: <Globe size={16} />,
                            rightSlot: (
                                <span className="bg-emerald-500 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    Active
                                </span>
                            ),
                        },
                        {
                            label: 'Design System',
                            href: '/projects/website-redesign/design-system',
                            leftSlot: <Layers size={16} />,
                            rightSlot: (
                                <span className="bg-amber-500 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    Draft
                                </span>
                            ),
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Admin navigation with permissions:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Admin',
                            href: '/admin',
                            leftSlot: <Shield size={16} />,
                            rightSlot: (
                                <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    Restricted
                                </span>
                            ),
                        },
                        {
                            label: 'Analytics',
                            href: '/admin/analytics',
                            leftSlot: <BarChart3 size={16} />,
                        },
                        {
                            label: 'Reports',
                            href: '/admin/analytics/reports',
                            leftSlot: <FileText size={16} />,
                            rightSlot: (
                                <span className="bg-gray-500 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    PDF
                                </span>
                            ),
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Database navigation with counts:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Database',
                            href: '/database',
                            leftSlot: <Database size={16} />,
                        },
                        {
                            label: 'Users',
                            href: '/database/users',
                            leftSlot: <Users size={16} />,
                            rightSlot: (
                                <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    1,247
                                </span>
                            ),
                        },
                        {
                            label: 'Active Users',
                            href: '/database/users/active',
                            leftSlot: <User size={16} />,
                            rightSlot: (
                                <span className="bg-emerald-500 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    834
                                </span>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Breadcrumb navigation with badges and status indicators in the right slot for additional context and information. Decorative badges are marked with aria-hidden="true" to prevent screen reader announcements.',
            },
        },
    },
}

// Breadcrumb overflow handling
export const OverflowHandling: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Exactly 4 items (no overflow):
                </h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Category', href: '/category' },
                        { label: 'Subcategory', href: '/category/subcategory' },
                        {
                            label: 'Product',
                            href: '/category/subcategory/product',
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    5 items (shows ellipsis):
                </h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Category', href: '/category' },
                        { label: 'Subcategory', href: '/category/subcategory' },
                        {
                            label: 'Product Type',
                            href: '/category/subcategory/type',
                        },
                        {
                            label: 'Specific Product',
                            href: '/category/subcategory/type/product',
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    7 items (multiple hidden items):
                </h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Category', href: '/category' },
                        { label: 'Subcategory', href: '/category/subcategory' },
                        {
                            label: 'Product Type',
                            href: '/category/subcategory/type',
                        },
                        {
                            label: 'Brand',
                            href: '/category/subcategory/type/brand',
                        },
                        {
                            label: 'Model',
                            href: '/category/subcategory/type/brand/model',
                        },
                        {
                            label: 'Variant',
                            href: '/category/subcategory/type/brand/model/variant',
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Deep navigation with icons:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Root',
                            href: '/',
                            leftSlot: <Home size={16} />,
                        },
                        {
                            label: 'Projects',
                            href: '/projects',
                            leftSlot: <FolderOpen size={16} />,
                        },
                        {
                            label: 'Web App',
                            href: '/projects/webapp',
                            leftSlot: <Globe size={16} />,
                        },
                        {
                            label: 'Frontend',
                            href: '/projects/webapp/frontend',
                            leftSlot: <Layers size={16} />,
                        },
                        {
                            label: 'Components',
                            href: '/projects/webapp/frontend/components',
                            leftSlot: <Package size={16} />,
                        },
                        {
                            label: 'Forms',
                            href: '/projects/webapp/frontend/components/forms',
                            leftSlot: <FileText size={16} />,
                        },
                        {
                            label: 'LoginForm.tsx',
                            href: '/projects/webapp/frontend/components/forms/login',
                            leftSlot: <User size={16} />,
                        },
                    ]}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of automatic overflow handling. When more than 4 items are present, the component shows an ellipsis button and truncates middle items. The ellipsis button is keyboard accessible, has proper ARIA labels, and meets 44x44px touch target requirements.',
            },
        },
    },
}

// Single item breadcrumb
export const SingleItem: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Simple single item:
                </h4>
                <Breadcrumb items={[{ label: 'Home', href: '/' }]} />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Single item with icon:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Dashboard',
                            href: '/dashboard',
                            leftSlot: <Home size={16} />,
                        },
                    ]}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Single item with icon and badge:
                </h4>
                <Breadcrumb
                    items={[
                        {
                            label: 'Admin Panel',
                            href: '/admin',
                            leftSlot: <Shield size={16} />,
                            rightSlot: (
                                <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    Restricted
                                </span>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Single item breadcrumbs for root pages or simple navigation contexts. The single item is automatically marked as active with aria-current="page" and is not in the tab order (href={undefined}), preventing navigation to the current page.',
            },
        },
    },
}

// Custom onClick handlers for client-side routing
export const WithCustomRouting: Story = {
    render: () => {
        const [currentPath, setCurrentPath] = useState('/products/electronics')
        const [navigationLog, setNavigationLog] = useState<string[]>([])

        const handleNavigation = (path: string, label: string) => {
            return (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                setCurrentPath(path)
                setNavigationLog((prev) => [
                    ...prev,
                    `Navigated to: ${label} (${path})`,
                ])
            }
        }

        const items: BreadcrumbItemType[] = [
            {
                label: 'Home',
                href: '/',
                onClick: handleNavigation('/', 'Home'),
            },
            {
                label: 'Products',
                href: '/products',
                onClick: handleNavigation('/products', 'Products'),
            },
            {
                label: 'Electronics',
                href: '/products/electronics',
                onClick: handleNavigation(
                    '/products/electronics',
                    'Electronics'
                ),
            },
            {
                label: 'Smartphones',
                href: '/products/electronics/smartphones',
                onClick: handleNavigation(
                    '/products/electronics/smartphones',
                    'Smartphones'
                ),
            },
        ]

        return (
            <div className="flex flex-col gap-6">
                <div>
                    <h4 className="m-0 mb-2 text-sm font-medium">
                        Custom onClick handlers (React Router example):
                    </h4>
                    <Breadcrumb items={items} />
                </div>

                <div className="p-3 bg-gray-100 border border-gray-400 rounded-lg text-xs font-manrope tracking-[-0.32px]">
                    <div className="mb-2 font-semibold">
                        Current Path: {currentPath}
                    </div>
                    {navigationLog.length > 0 && (
                        <div>
                            <div className="mb-1 font-semibold">
                                Navigation Log:
                            </div>
                            <ul className="m-0 pl-5">
                                {navigationLog
                                    .slice(-5)
                                    .reverse()
                                    .map((log, idx) => (
                                        <li key={idx}>{log}</li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800 border border-blue-500 font-manrope tracking-[-0.32px] leading-7">
                    <strong>Note:</strong> This example demonstrates custom
                    onClick handlers for client-side routing. The onClick
                    handler prevents default link behavior and handles
                    navigation programmatically. This is useful for React
                    Router, Next.js, or other client-side routing solutions.
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Breadcrumb navigation with custom onClick handlers for client-side routing. This example demonstrates how to use the component with React Router or similar routing libraries without page reloads.',
            },
        },
    },
}

// Skeleton loading state
export const SkeletonState: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">
                    Pulse skeleton:
                </h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        {
                            label: 'Electronics',
                            href: '/products/electronics',
                        },
                    ]}
                    skeleton={{ show: true, variant: 'pulse' }}
                />
            </div>

            <div>
                <h4 className="m-0 mb-2 text-sm font-medium">Wave skeleton:</h4>
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        {
                            label: 'Electronics',
                            href: '/products/electronics',
                        },
                    ]}
                    skeleton={{ show: true, variant: 'wave' }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Breadcrumb component with skeleton loading states. The skeleton maintains the same structure and spacing as the actual breadcrumb, providing a smooth loading experience. Skeleton states are properly marked for screen readers and maintain accessibility compliance.',
            },
        },
    },
}

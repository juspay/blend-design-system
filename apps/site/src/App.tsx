import { Breadcrumb } from '../../../packages/blend/lib/main'
import type { BreadcrumbItemType } from '../../../packages/blend/lib/main'
import {
    Home,
    Users,
    User,
    Folder,
    FolderOpen,
    Package,
    FileText,
    Database,
    BarChart3,
    Shield,
    Layers,
    Globe,
} from 'lucide-react'

function App() {
    const basicBreadcrumbItems: BreadcrumbItemType[] = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
    ]

    const breadcrumbWithIcons: BreadcrumbItemType[] = [
        {
            label: 'Home',
            href: '/',
            leftSlot: <Home size={16} />,
        },
        {
            label: 'Products',
            href: '/products',
            leftSlot: <Package size={16} />,
        },
        {
            label: 'Electronics',
            href: '/products/electronics',
            leftSlot: <Globe size={16} />,
        },
    ]

    const breadcrumbWithBadges: BreadcrumbItemType[] = [
        {
            label: 'Home',
            href: '/',
            leftSlot: <Home size={16} />,
        },
        {
            label: 'Products',
            href: '/products',
            leftSlot: <Package size={16} />,
            rightSlot: (
                <span
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '500',
                    }}
                >
                    New
                </span>
            ),
        },
        {
            label: 'Electronics',
            href: '/products/electronics',
        },
    ]

    const breadcrumbWithOverflow: BreadcrumbItemType[] = [
        { label: 'Home', href: '/' },
        { label: 'Category 1', href: '/cat1' },
        { label: 'Category 2', href: '/cat2' },
        { label: 'Category 3', href: '/cat3' },
        { label: 'Category 4', href: '/cat4' },
        { label: 'Category 5', href: '/cat5' },
        { label: 'Category 6', href: '/cat6' },
        { label: 'Current Page', href: '/current' },
    ]

    const singleItemBreadcrumb: BreadcrumbItemType[] = [
        { label: 'Home', href: '/' },
    ]

    const fileSystemBreadcrumb: BreadcrumbItemType[] = [
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
    ]

    const adminBreadcrumb: BreadcrumbItemType[] = [
        {
            label: 'Admin',
            href: '/admin',
            leftSlot: <Shield size={16} />,
            rightSlot: (
                <span
                    style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '500',
                    }}
                >
                    Secure
                </span>
            ),
        },
        {
            label: 'Users',
            href: '/admin/users',
            leftSlot: <Users size={16} />,
        },
        {
            label: 'Profile',
            href: '/admin/users/profile',
            leftSlot: <User size={16} />,
        },
    ]

    const ecommerceBreadcrumb: BreadcrumbItemType[] = [
        {
            label: 'Store',
            href: '/store',
            leftSlot: <Home size={16} />,
        },
        {
            label: 'Electronics',
            href: '/store/electronics',
            leftSlot: <Package size={16} />,
        },
        {
            label: 'Smartphones',
            href: '/store/electronics/smartphones',
            leftSlot: <Globe size={16} />,
        },
        {
            label: 'iPhone 15 Pro',
            href: '/store/electronics/smartphones/iphone-15-pro',
            rightSlot: (
                <span
                    style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '500',
                    }}
                >
                    In Stock
                </span>
            ),
        },
    ]

    return (
        <>
            <Breadcrumb items={basicBreadcrumbItems} />
            <Breadcrumb items={singleItemBreadcrumb} />
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Dashboard', href: '/dashboard' },
                ]}
            />
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Settings', href: '/settings' },
                    { label: 'Profile', href: '/settings/profile' },
                ]}
            />
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
            <Breadcrumb items={breadcrumbWithIcons} />
            <Breadcrumb items={breadcrumbWithBadges} />
            <Breadcrumb items={breadcrumbWithOverflow} />
            <Breadcrumb items={fileSystemBreadcrumb} />
            <Breadcrumb items={adminBreadcrumb} />
            <Breadcrumb items={ecommerceBreadcrumb} />
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
                            <span
                                style={{
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: '500',
                                }}
                            >
                                1,247
                            </span>
                        ),
                    },
                    {
                        label: 'Active Users',
                        href: '/database/users/active',
                        leftSlot: <User size={16} />,
                    },
                ]}
            />
            <Breadcrumb
                items={[
                    {
                        label: 'Docs',
                        href: '/docs',
                        leftSlot: <FileText size={16} />,
                    },
                    {
                        label: 'Components',
                        href: '/docs/components',
                        leftSlot: <Layers size={16} />,
                    },
                    {
                        label: 'Form Controls',
                        href: '/docs/components/forms',
                        leftSlot: <Package size={16} />,
                    },
                    {
                        label: 'Button',
                        href: '/docs/components/forms/button',
                        rightSlot: (
                            <span
                                style={{
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: '500',
                                }}
                            >
                                v2.1
                            </span>
                        ),
                    },
                ]}
            />
            <Breadcrumb
                items={[
                    {
                        label: 'Admin',
                        href: '/admin',
                        leftSlot: <Shield size={16} />,
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
                            <span
                                style={{
                                    backgroundColor: '#6b7280',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: '500',
                                }}
                            >
                                PDF
                            </span>
                        ),
                    },
                ]}
            />
            <Breadcrumb
                items={basicBreadcrumbItems}
                skeleton={{ show: true, variant: 'pulse' }}
            />
            <Breadcrumb
                items={basicBreadcrumbItems}
                skeleton={{ show: true, variant: 'wave' }}
            />
        </>
    )
}

export default App

import { Breadcrumb } from '../../../Breadcrumb'
import { Home, Settings, User, FileText } from 'lucide-react'

const BreadcrumbLightHouse = () => {
    return (
        <>
            {/* Basic Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current Page', href: '/products/item' },
                ]}
            />

            {/* Single Item Breadcrumb */}
            <Breadcrumb items={[{ label: 'Home', href: '/' }]} />

            {/* Two Items Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current Page', href: '/current' },
                ]}
            />

            {/* Three Items Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current Page', href: '/products/item' },
                ]}
            />

            {/* Four Items Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Category', href: '/products/category' },
                    { label: 'Current Page', href: '/products/category/item' },
                ]}
            />

            {/* With Left Slot */}
            <Breadcrumb
                items={[
                    {
                        label: 'Home',
                        href: '/',
                        leftSlot: <Home size={16} />,
                    },
                    {
                        label: 'Products',
                        href: '/products',
                        leftSlot: <FileText size={16} />,
                    },
                    {
                        label: 'Current Page',
                        href: '/products/item',
                        leftSlot: <Settings size={16} />,
                    },
                ]}
            />

            {/* With Right Slot */}
            <Breadcrumb
                items={[
                    {
                        label: 'Home',
                        href: '/',
                        rightSlot: <Home size={16} />,
                    },
                    {
                        label: 'Products',
                        href: '/products',
                        rightSlot: <FileText size={16} />,
                    },
                    {
                        label: 'Current Page',
                        href: '/products/item',
                        rightSlot: <Settings size={16} />,
                    },
                ]}
            />

            {/* With Both Slots */}
            <Breadcrumb
                items={[
                    {
                        label: 'Home',
                        href: '/',
                        leftSlot: <Home size={16} />,
                        rightSlot: <User size={16} />,
                    },
                    {
                        label: 'Products',
                        href: '/products',
                        leftSlot: <FileText size={16} />,
                        rightSlot: <Settings size={16} />,
                    },
                    {
                        label: 'Current Page',
                        href: '/products/item',
                    },
                ]}
            />

            {/* Long Breadcrumb (triggers menu) */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Level 1', href: '/level1' },
                    { label: 'Level 2', href: '/level1/level2' },
                    { label: 'Level 3', href: '/level1/level2/level3' },
                    { label: 'Level 4', href: '/level1/level2/level3/level4' },
                    {
                        label: 'Level 5',
                        href: '/level1/level2/level3/level4/level5',
                    },
                    {
                        label: 'Current Page',
                        href: '/level1/level2/level3/level4/level5/current',
                    },
                ]}
            />

            {/* Long Breadcrumb with Slots */}
            <Breadcrumb
                items={[
                    {
                        label: 'Home',
                        href: '/',
                        leftSlot: <Home size={16} />,
                    },
                    {
                        label: 'Level 1',
                        href: '/level1',
                        leftSlot: <FileText size={16} />,
                    },
                    {
                        label: 'Level 2',
                        href: '/level1/level2',
                        leftSlot: <Settings size={16} />,
                    },
                    {
                        label: 'Level 3',
                        href: '/level1/level2/level3',
                        leftSlot: <User size={16} />,
                    },
                    {
                        label: 'Level 4',
                        href: '/level1/level2/level3/level4',
                        leftSlot: <Home size={16} />,
                    },
                    {
                        label: 'Level 5',
                        href: '/level1/level2/level3/level4/level5',
                        leftSlot: <FileText size={16} />,
                    },
                    {
                        label: 'Current Page',
                        href: '/level1/level2/level3/level4/level5/current',
                        leftSlot: <Settings size={16} />,
                    },
                ]}
            />

            {/* With onClick Handler */}
            <Breadcrumb
                items={[
                    {
                        label: 'Home',
                        href: '/',
                        onClick: (e) => {
                            e.preventDefault()
                            console.log('Home clicked')
                        },
                    },
                    {
                        label: 'Products',
                        href: '/products',
                        onClick: (e) => {
                            e.preventDefault()
                            console.log('Products clicked')
                        },
                    },
                    {
                        label: 'Current Page',
                        href: '/products/item',
                        onClick: (e) => {
                            e.preventDefault()
                            console.log('Current page clicked')
                        },
                    },
                ]}
            />

            {/* With Skeleton */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current Page', href: '/products/item' },
                ]}
                skeleton={{
                    show: true,
                    variant: 'pulse',
                }}
            />

            {/* Complex Breadcrumb */}
            <Breadcrumb
                items={[
                    {
                        label: 'Dashboard',
                        href: '/dashboard',
                        leftSlot: <Home size={16} />,
                    },
                    {
                        label: 'Settings',
                        href: '/dashboard/settings',
                        leftSlot: <Settings size={16} />,
                        rightSlot: <User size={16} />,
                    },
                    {
                        label: 'Profile',
                        href: '/dashboard/settings/profile',
                        leftSlot: <User size={16} />,
                    },
                    {
                        label: 'Edit Profile',
                        href: '/dashboard/settings/profile/edit',
                    },
                ]}
            />
        </>
    )
}

export default BreadcrumbLightHouse

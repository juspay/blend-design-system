/**
 * Sidebar with React Router DOM Integration Demo
 *
 * This demo shows how to integrate the Sidebar component with React Router DOM
 * for URL-based navigation and active state management.
 *
 * Prerequisites:
 * npm install react-router-dom
 * Note: React Router v7 includes its own TypeScript types, so @types/react-router-dom is not needed
 */

import { useMemo } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import {
    Home,
    Settings,
    User,
    BarChart2,
    FileText,
    ShoppingCart,
    CreditCard,
    Users,
    Bell,
} from 'lucide-react'
import { Sidebar } from '../../../../packages/blend/lib/components/Sidebar'
import type { DirectoryData } from '../../../../packages/blend/lib/components/Directory/types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'

// Placeholder page components
const DashboardPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Dashboard</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Welcome to the Dashboard page
        </Text>
    </Block>
)

const AnalyticsPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Analytics</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Analytics page content
        </Text>
    </Block>
)

const OrdersPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Orders</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Orders page content
        </Text>
    </Block>
)

const PaymentsPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Payments</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Payments page content
        </Text>
    </Block>
)

const CustomersPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Customers</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Customers page content
        </Text>
    </Block>
)

const NotificationsPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Notifications</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Notifications page content
        </Text>
    </Block>
)

const DocumentsPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Documents</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Documents page content
        </Text>
    </Block>
)

const SettingsPage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Settings</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Settings page content
        </Text>
    </Block>
)

const ProfilePage = () => (
    <Block padding={32}>
        <Text variant="heading.lg">Profile</Text>
        <Text variant="body.md" style={{ marginTop: 16 }}>
            Profile page content
        </Text>
    </Block>
)

// Main component that uses routing
const SidebarWithRouter = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // Map URL paths to item paths for active state
    const pathToItemPath = (pathname: string): string | null => {
        // Remove leading slash and normalize
        const path = pathname.replace(/^\//, '') || 'dashboard'

        // Map URL paths to item paths
        const pathMap: Record<string, string> = {
            dashboard: 'Dashboard',
            analytics: 'Analytics',
            orders: 'Orders',
            'orders/pending': 'Orders/Pending',
            'orders/completed': 'Orders/Completed',
            payments: 'Payments',
            customers: 'Customers',
            notifications: 'Notifications',
            documents: 'Documents',
            settings: 'Settings',
            profile: 'Profile',
        }

        return pathMap[path] || null
    }

    // Get current active item from URL
    const activeItem = useMemo(() => {
        return pathToItemPath(location.pathname)
    }, [location.pathname])

    // Handle active item change (when user clicks sidebar item)
    const handleActiveItemChange = (item: string | null) => {
        if (!item) return

        // Map item paths back to URL paths
        const itemToPath: Record<string, string> = {
            Dashboard: '/dashboard',
            Analytics: '/analytics',
            Orders: '/orders',
            'Orders/Pending': '/orders/pending',
            'Orders/Completed': '/orders/completed',
            Payments: '/payments',
            Customers: '/customers',
            Notifications: '/notifications',
            Documents: '/documents',
            Settings: '/settings',
            Profile: '/profile',
        }

        const path = itemToPath[item]
        if (path) {
            navigate(path)
        }
    }

    // Navigation data with routing integration
    const directoryData: DirectoryData[] = [
        {
            label: 'Main',
            isCollapsible: false,
            items: [
                {
                    label: 'Dashboard',
                    leftSlot: (
                        <Home style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/dashboard'),
                },
                {
                    label: 'Analytics',
                    leftSlot: (
                        <BarChart2 style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/analytics'),
                },
            ],
        },
        {
            label: 'Business',
            items: [
                {
                    label: 'Orders',
                    leftSlot: (
                        <ShoppingCart
                            style={{ width: '16px', height: '16px' }}
                        />
                    ),
                    items: [
                        {
                            label: 'Pending',
                            onClick: () => navigate('/orders/pending'),
                        },
                        {
                            label: 'Completed',
                            onClick: () => navigate('/orders/completed'),
                        },
                    ],
                },
                {
                    label: 'Payments',
                    leftSlot: (
                        <CreditCard style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/payments'),
                },
                {
                    label: 'Customers',
                    leftSlot: (
                        <Users style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/customers'),
                },
            ],
        },
        {
            label: 'Account',
            items: [
                {
                    label: 'Notifications',
                    leftSlot: (
                        <Bell style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/notifications'),
                },
                {
                    label: 'Documents',
                    leftSlot: (
                        <FileText style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/documents'),
                },
                {
                    label: 'Settings',
                    leftSlot: (
                        <Settings style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/settings'),
                },
                {
                    label: 'Profile',
                    leftSlot: (
                        <User style={{ width: '16px', height: '16px' }} />
                    ),
                    onClick: () => navigate('/profile'),
                },
            ],
        },
    ]

    return (
        <Sidebar
            data={directoryData}
            topbar={
                <Block
                    padding={16}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text variant="heading.md">My Application</Text>
                    <Text variant="body.sm" color="gray">
                        Current route: {location.pathname}
                    </Text>
                </Block>
            }
            activeItem={activeItem}
            onActiveItemChange={handleActiveItemChange}
            footer={
                <Block padding={16}>
                    <Text variant="body.sm" color="gray">
                        Sidebar with React Router DOM
                    </Text>
                </Block>
            }
        >
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/pending" element={<OrdersPage />} />
                <Route path="/orders/completed" element={<OrdersPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Sidebar>
    )
}

// Main demo component with Router setup
const SidebarRouterDemo = () => {
    return (
        <BrowserRouter>
            <div style={{ width: '100%', height: '100vh' }}>
                <SidebarWithRouter />
            </div>
        </BrowserRouter>
    )
}

export default SidebarRouterDemo

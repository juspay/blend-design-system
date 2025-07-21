import { figma } from '@figma/code-connect'
import { Sidebar } from 'blend-v1'
import {
    Home,
    Settings,
    Users,
    FileText,
    BarChart,
    CreditCard,
} from 'lucide-react'

/**
 * FIGMA CODE CONNECT FOR SIDEBAR COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - The Figma component represents the visual sidebar structure
 *
 * 2. CODE-ONLY PROPERTIES:
 *    - tenants: Array of tenant information
 *    - merchants: Array of merchant information
 *    - data: Directory data for navigation structure
 *    - topbar: React node for topbar content
 *    - children: Main content area
 *    - activeTenant: Currently selected tenant
 *    - setActiveTenant: Tenant selection handler
 *    - activeMerchant: Currently selected merchant
 *    - setActiveMerchant: Merchant selection handler
 *    - footer: Optional footer content
 */

// Base Sidebar connection
figma.connect(
    Sidebar,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=8210-129639&t=O53E5LTqGyp5e0cp-4',
    {
        props: {
            // Note: The Sidebar Figma component doesn't expose properties
            // All props are code-only and configured in the implementation
        },

        example: () => (
            <Sidebar
                tenants={[
                    {
                        label: 'Juspay',
                        icon: (
                            <div className="w-8 h-8 bg-blue-500 rounded-full" />
                        ),
                        id: 'juspay',
                    },
                    {
                        label: 'Hyperswitch',
                        icon: (
                            <div className="w-8 h-8 bg-green-500 rounded-full" />
                        ),
                        id: 'hyperswitch',
                    },
                ]}
                merchants={[
                    {
                        label: 'Production',
                        icon: <BarChart className="w-4 h-4" />,
                        id: 'prod',
                    },
                    {
                        label: 'Sandbox',
                        icon: <FileText className="w-4 h-4" />,
                        id: 'sandbox',
                    },
                ]}
                data={[
                    {
                        label: 'Dashboard',
                        items: [
                            {
                                label: 'Home',
                                leftSlot: <Home className="w-4 h-4" />,
                                onClick: () => console.log('Navigate to Home'),
                            },
                            {
                                label: 'Analytics',
                                leftSlot: <BarChart className="w-4 h-4" />,
                                onClick: () =>
                                    console.log('Navigate to Analytics'),
                            },
                        ],
                    },
                    {
                        label: 'Management',
                        items: [
                            {
                                label: 'Users',
                                leftSlot: <Users className="w-4 h-4" />,
                                onClick: () => console.log('Navigate to Users'),
                            },
                            {
                                label: 'Roles',
                                leftSlot: <Settings className="w-4 h-4" />,
                                onClick: () => console.log('Navigate to Roles'),
                            },
                        ],
                    },
                    {
                        label: 'Payments',
                        items: [
                            {
                                label: 'Transactions',
                                leftSlot: <CreditCard className="w-4 h-4" />,
                                rightSlot: (
                                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                                        New
                                    </span>
                                ),
                                onClick: () =>
                                    console.log('Navigate to Transactions'),
                            },
                            {
                                label: 'Refunds',
                                leftSlot: <FileText className="w-4 h-4" />,
                                onClick: () =>
                                    console.log('Navigate to Refunds'),
                            },
                        ],
                    },
                ]}
                topbar={
                    <div className="flex items-center justify-between p-4 border-b">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                }
                activeTenant="juspay"
                setActiveTenant={(tenant) => console.log('Set tenant:', tenant)}
                activeMerchant="prod"
                setActiveMerchant={(merchant) =>
                    console.log('Set merchant:', merchant)
                }
                footer={
                    <div className="p-4 border-t">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full" />
                            <div>
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-gray-500">
                                    john@example.com
                                </p>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Welcome to Dashboard
                    </h2>
                    <p className="text-gray-600">
                        Select an option from the sidebar to get started.
                    </p>
                </div>
            </Sidebar>
        ),

        imports: [
            "import { Sidebar } from 'blend-v1'",
            "import { Home, Settings, Users, FileText, BarChart, CreditCard } from 'lucide-react'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Sidebar',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-sidebar--docs',
            },
        ],
    }
)

/**
 * Example of Sidebar usage in code:
 *
 * // Basic Sidebar
 * const tenants = [
 *   { label: 'Company A', icon: <CompanyIcon />, id: 'company-a' },
 *   { label: 'Company B', icon: <CompanyIcon />, id: 'company-b' },
 * ];
 *
 * const merchants = [
 *   { label: 'Production', icon: <ProdIcon />, id: 'prod' },
 *   { label: 'Staging', icon: <StageIcon />, id: 'stage' },
 * ];
 *
 * const navigationData = [
 *   {
 *     label: 'Main',
 *     items: [
 *       {
 *         label: 'Dashboard',
 *         leftSlot: <DashboardIcon />,
 *         onClick: () => navigate('/dashboard'),
 *       },
 *     ],
 *   },
 * ];
 *
 * <Sidebar
 *   tenants={tenants}
 *   merchants={merchants}
 *   data={navigationData}
 *   topbar={<TopBar />}
 *   activeTenant={activeTenant}
 *   setActiveTenant={setActiveTenant}
 *   activeMerchant={activeMerchant}
 *   setActiveMerchant={setActiveMerchant}
 * >
 *   <MainContent />
 * </Sidebar>
 *
 * // With Nested Navigation
 * const navigationWithNested = [
 *   {
 *     label: 'Analytics',
 *     items: [
 *       {
 *         label: 'Reports',
 *         items: [
 *           {
 *             label: 'Sales Report',
 *             leftSlot: <ChartIcon />,
 *             onClick: () => navigate('/reports/sales'),
 *           },
 *           {
 *             label: 'User Report',
 *             leftSlot: <UsersIcon />,
 *             onClick: () => navigate('/reports/users'),
 *           },
 *         ],
 *       },
 *       {
 *         label: 'Live Dashboard',
 *         leftSlot: <ActivityIcon />,
 *         rightSlot: <Badge>Live</Badge>,
 *         onClick: () => navigate('/live'),
 *       },
 *     ],
 *   },
 * ];
 *
 * // With Footer
 * <Sidebar
 *   tenants={tenants}
 *   merchants={merchants}
 *   data={navigationData}
 *   topbar={<TopBar />}
 *   footer={
 *     <UserProfile
 *       user={currentUser}
 *       onLogout={handleLogout}
 *     />
 *   }
 * >
 *   <MainContent />
 * </Sidebar>
 *
 * // With Custom Styling
 * <Sidebar
 *   tenants={tenants}
 *   merchants={merchants}
 *   data={navigationData}
 *   topbar={
 *     <div className="custom-topbar">
 *       <Logo />
 *       <SearchBar />
 *       <NotificationBell />
 *     </div>
 *   }
 *   activeTenant={activeTenant}
 *   setActiveTenant={setActiveTenant}
 *   activeMerchant={activeMerchant}
 *   setActiveMerchant={setActiveMerchant}
 * >
 *   <div className="custom-content">
 *     {children}
 *   </div>
 * </Sidebar>
 */

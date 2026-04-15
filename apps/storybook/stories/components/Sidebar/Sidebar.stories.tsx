import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Sidebar,
    Button,
    ButtonType,
    ButtonSize,
    Avatar,
    AvatarSize,
    AvatarShape,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import {
    Home,
    Users,
    Settings,
    FileText,
    BarChart3,
    CreditCard,
    Package,
    ShoppingCart,
    Building,
    DollarSign,
    Bell,
    Search,
    LogOut,
    ChevronRight,
    Cpu,
} from 'lucide-react'

// Type definitions for Directory data
interface DirectoryData {
    label?: string
    items?: NavbarItem[]
    isCollapsible?: boolean
    defaultOpen?: boolean
}

interface NavbarItem {
    label: string
    items?: NavbarItem[]
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    onClick?: () => void
    href?: string
}

const meta: Meta<typeof Sidebar> = {
    title: 'Components/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A comprehensive sidebar navigation component with collapsible sections, integrated directory navigation, customizable panels, and responsive design.',
        docs: {
            description: {
                component: `
### Basic Usage

\`\`\`tsx
import { Sidebar } from '@juspay/blend-design-system';
import { Home, Users, Settings } from 'lucide-react';

function App() {
  return (
    <Sidebar
      data={[
        {
          label: "Main",
          items: [
            { label: "Dashboard", leftSlot: <Home size={16} />, onClick: () => {} },
            { label: "Users", leftSlot: <Users size={16} />, onClick: () => {} },
            { label: "Settings", leftSlot: <Settings size={16} />, onClick: () => {} },
          ]
        }
      ]}
    >
      <div>Your main content here</div>
    </Sidebar>
  );
}
\`\`\`


## Features

- **Collapsible/expandable** sidebar with smooth animations
- **Integrated Directory component** for hierarchical navigation
- **Optional left panel** for tenant/workspace/category switching
- **Sticky header and footer** sections that remain visible while scrolling
- **Customizable topbar and footer** content
- **Responsive design** with mobile navigation drawer
- **Nested navigation items** with collapsible sections
- **Icon and badge support** in navigation items
- **Keyboard navigation** with configurable shortcuts
- **Accessibility compliant** (WCAG 2.1 Level AA)

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Keyboard Navigation**:
- \`Tab\`: Navigate between interactive elements
- \`Arrow Keys\`: Navigate within Directory sections
- \`Enter/Space\`: Activate navigation items
- \`/\` (default): Toggle sidebar expand/collapse
- \`Escape\`: Close mobile navigation drawer

**ARIA Landmarks**:
- Navigation regions properly labeled
- Search region with role="search"
- Complementary regions for footer
- Screen reader announcements for state changes

**Verification**:
- Storybook a11y addon (0 violations expected)
- Chromatic visual regression
- Manual testing with VoiceOver/NVDA
- Contrast ratio verification

## Props Categories

### Core Props
- **children**: Main content area
- **data**: Navigation structure

### Layout Props
- **topbar**, **leftPanel**, **footer**, **sidebarTopSlot**

### State Control
- **isExpanded** / **onExpandedChange**: Controlled expand/collapse
- **activeItem** / **onActiveItemChange**: Controlled active navigation
- **defaultIsExpanded**, **defaultActiveItem**: Uncontrolled defaults

### Behavior Props
- **disableIntermediateState**: Disable hover peek
- **iconOnlyMode**: Icon-only view with tooltips
- **hideOnIconOnlyToggle**: Hide instead of expand in icon-only
- **sidebarCollapseKey**: Keyboard shortcut (default: "/")

### Topbar Options
- **enableTopbarAutoHide**: Auto-hide on scroll
- **isTopbarVisible** / **onTopbarVisibilityChange**: Controlled visibility

### Mobile Options
- **showPrimaryActionButton**: Show FAB on mobile
- **primaryActionButtonProps**: Configure FAB

## Quick Start

### With Tenant Switching

\`\`\`tsx
<Sidebar
  leftPanel={{
    items: [
      { label: "Production", icon: <Zap size={16} color="#ef4444" /> },
      { label: "Staging", icon: <Server size={16} color="#f59e0b" /> },
    ],
    selected: activeEnv,
    onSelect: setActiveEnv,
  }}
  data={navigationData}
>
  {children}
</Sidebar>
\`\`\`

### Controlled Expand/Collapse

\`\`\`tsx
const [isExpanded, setIsExpanded] = useState(true);

<Sidebar
  isExpanded={isExpanded}
  onExpandedChange={setIsExpanded}
  data={navigationData}
>
  {children}
</Sidebar>
\`\`\`

### Icon-Only Mode

\`\`\`tsx
<Sidebar
  iconOnlyMode={true}
  defaultIsExpanded={false}
  data={navigationData}
>
  {children}
</Sidebar>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        // Core Props
        children: {
            control: false,
            description:
                'Main content to render in the sidebar layout. This is displayed in the main content area to the right of the sidebar.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Core',
            },
        },
        data: {
            control: 'object',
            description:
                'Directory navigation data structure defining the sidebar menu items, sections, and hierarchy',
            table: {
                type: {
                    summary: 'DirectoryData[]',
                    detail: `DirectoryData: {
  label?: string;           // Section label
  items: NavbarItem[];      // Array of navigation items
  isCollapsible?: boolean;  // Whether section can be collapsed
  defaultOpen?: boolean;    // Default expanded state
}

NavbarItem: {
  label: string;            // Display text (required)
  leftSlot?: ReactNode;     // Icon/content on left
  rightSlot?: ReactNode;    // Badge/content on right
  items?: NavbarItem[];     // Nested sub-items
  onClick?: () => void;     // Click handler
  href?: string;            // Link URL
  isSelected?: boolean;     // Selected state
}`,
                },
                category: 'Core',
            },
        },
        // Layout Props
        topbar: {
            control: false,
            description:
                'Content to display in the topbar/header area. Typically contains search, notifications, and user avatar. Rendered within the Topbar component.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Layout',
            },
        },
        leftPanel: {
            control: 'object',
            description:
                'Left panel configuration for tenant/workspace/category switching',
            table: {
                type: {
                    summary: 'LeftPanelInfo',
                    detail: `{
  items: LeftPanelItem[];     // Array of panel items
  selected: string;           // Currently selected value
  onSelect: (value) => void; // Selection callback
  tenantSlot1?: ReactNode;    // Custom slot 1
  tenantSlot2?: ReactNode;    // Custom slot 2
  tenantFooter?: ReactNode;   // Footer content
}

LeftPanelItem: {
  label: string;          // Display text
  icon: ReactNode;        // Icon element
  value?: string;         // Item value
  showInPanel?: boolean;  // Whether to show in panel
}`,
                },
                category: 'Layout',
            },
        },
        footer: {
            control: false,
            description:
                'Content to display in the sidebar footer. Typically contains user profile info, logout button, or action buttons. Sticky at bottom of sidebar.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Layout',
            },
        },
        sidebarTopSlot: {
            control: false,
            description:
                'Custom content for the sidebar top slot. Replaces the default merchant/tenant selector. Use for custom header content in the sidebar.',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Layout',
            },
        },
        showLeftPanel: {
            control: 'boolean',
            description:
                'Whether to show the left panel (tenant/workspace selector). When false, the left panel is hidden even if leftPanel config is provided. Useful for role-based panel visibility.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Layout',
            },
        },
        // State Control Props - Expanded/Collapsed
        isExpanded: {
            control: 'boolean',
            description:
                'Controlled expanded state. When provided, the sidebar becomes a controlled component and does not manage its own expanded state. Use with onExpandedChange for full control.',
            table: {
                type: { summary: 'boolean' },
                category: 'State',
            },
        },
        onExpandedChange: {
            control: false,
            description:
                'Callback fired when the sidebar expanded state changes. Receives the new expanded state (true/false). Use with isExpanded for controlled behavior.',
            table: {
                type: { summary: '(expanded: boolean) => void' },
                category: 'Events',
            },
        },
        defaultIsExpanded: {
            control: 'boolean',
            description:
                'Default expanded state for uncontrolled sidebar. Only used when isExpanded is not provided. Determines initial expanded state on mount.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'State',
            },
        },
        // Behavior Props
        disableIntermediateState: {
            control: 'boolean',
            description:
                'When true, disables the intermediate state that appears on hover. When false, hovering over the collapsed sidebar temporarily shows it in an intermediate/expanded state. This allows users to peek at sidebar content without fully expanding it.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        iconOnlyMode: {
            control: 'boolean',
            description:
                'When true, shows only icons (52px width) with tooltips on hover. Directory items show only icons, tooltips appear on hover, sections render as dividers, and merchant switcher moves to topbar. Toggle button appears at top.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        hideOnIconOnlyToggle: {
            control: 'boolean',
            description:
                'When true, clicking the toggle button in icon-only mode completely hides the sidebar. When false, clicking expands to full sidebar view. Only applies when iconOnlyMode is true.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        sidebarCollapseKey: {
            control: 'text',
            description:
                'Keyboard key to toggle sidebar expand/collapse. Pressing this key (when not in an input) toggles the sidebar. Set to empty string to disable keyboard shortcut.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"/"' },
                category: 'Behavior',
            },
        },
        // Topbar Auto-Hide Props
        enableTopbarAutoHide: {
            control: 'boolean',
            description:
                'When true, the topbar automatically hides when scrolling down and reappears when scrolling up. Provides more content space. Only works when topbar content is provided.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Topbar',
            },
        },
        isTopbarVisible: {
            control: 'boolean',
            description:
                'Controlled topbar visibility. Use with onTopbarVisibilityChange for controlled topbar visibility. Overrides auto-hide behavior when set.',
            table: {
                type: { summary: 'boolean' },
                category: 'Topbar',
            },
        },
        onTopbarVisibilityChange: {
            control: false,
            description:
                'Callback fired when topbar visibility changes. Receives boolean indicating new visibility state. Use with isTopbarVisible for controlled behavior.',
            table: {
                type: { summary: '(visible: boolean) => void' },
                category: 'Events',
            },
        },
        defaultIsTopbarVisible: {
            control: 'boolean',
            description:
                'Default topbar visibility state. Used when isTopbarVisible is not provided. Has no effect unless enableTopbarAutoHide is true.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Topbar',
            },
        },
        // Active Item Props
        activeItem: {
            control: 'text',
            description:
                'Currently active navigation item identifier. Used for highlighting the active menu item. Should match the href or unique identifier of the active item in the data.',
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
            },
        },
        onActiveItemChange: {
            control: false,
            description:
                'Callback fired when the active navigation item changes. Receives the identifier of the newly active item. Use with activeItem for controlled active state.',
            table: {
                type: { summary: '(item: string | null) => void' },
                category: 'Events',
            },
        },
        defaultActiveItem: {
            control: 'text',
            description:
                'Default active item identifier for uncontrolled mode. Used when activeItem prop is not provided. Sets initial active item on mount.',
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
            },
        },
        // Mobile Props
        showPrimaryActionButton: {
            control: 'boolean',
            description:
                'Whether to show a floating action button (FAB) on mobile. The FAB appears at the bottom of the screen on mobile devices for primary actions like "Create" or "Add".',
            table: {
                type: { summary: 'boolean' },
                category: 'Mobile',
            },
        },
        primaryActionButtonProps: {
            control: 'object',
            description:
                'Configuration for the mobile floating action button (FAB)',
            table: {
                type: {
                    summary: 'ButtonProps',
                    detail: `{
  text?: string;           // Button text
  onClick?: () => void;    // Click handler
  icon?: ReactNode;        // Icon element
  // ...extends ButtonHTMLAttributes
}`,
                },
                category: 'Mobile',
            },
        },
        // Event Props
        onSidebarStateChange: {
            description:
                'Callback fired when the sidebar transitions between states: "collapsed", "intermediate" (hover peek), and "expanded". Useful for analytics or syncing external UI.',
            control: false,
            action: 'onSidebarStateChange',
            table: {
                type: {
                    summary:
                        '(state: "collapsed" | "intermediate" | "expanded") => void',
                },
                category: 'Events',
            },
        },
        // Legacy Props
        merchantInfo: {
            control: 'object',
            description:
                'Legacy merchant information object. Consider using leftPanel for modern tenant switching.',
            table: {
                type: {
                    summary: 'SidebarMerchantInfo',
                    detail: `{
  items: Array<{
    label: string;
    value: string;
    icon?: ReactNode;
  }>;
  selected: string;
  onSelect: (value) => void;
}`,
                },
                category: 'Legacy',
            },
        },
        rightActions: {
            control: false,
            description:
                'Legacy right-side actions for topbar. Array of action objects with icon, label, and onClick. Consider using topbar prop for custom topbar content instead.',
            table: {
                type: { summary: 'TopbarAction[]' },
                category: 'Legacy',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sidebar>

// Helper function to create sample content
const DashboardContent = ({ title }: { title: string }) => (
    <div className="p-8 bg-gray-50 min-h-screen">
        <div className="mb-8 pb-6 border-b border-gray-300">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {title}
            </h1>
            <p className="text-gray-500">
                Welcome back! Here's what's happening today.
            </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Total Revenue</span>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-300">
                        <DollarSign size={20} className="text-blue-600" />
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">$45,231</div>
                <div className="text-sm text-green-600 mt-1">
                    +12.5% from last month
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Active Users</span>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center border border-purple-300">
                        <Users size={20} className="text-purple-600" />
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">2,847</div>
                <div className="text-sm text-green-600 mt-1">
                    +8.2% from last month
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                        Pending Orders
                    </span>
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center border border-orange-300">
                        <Package size={20} className="text-orange-600" />
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-sm text-red-600 mt-1">
                    Requires attention
                </div>
            </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">
                    Recent Activity
                </h3>
                <div className="space-y-4">
                    {[
                        {
                            icon: ShoppingCart,
                            text: 'New order received',
                            time: '2 min ago',
                            color: 'blue',
                        },
                        {
                            icon: Users,
                            text: 'New user registered',
                            time: '15 min ago',
                            color: 'purple',
                        },
                        {
                            icon: CreditCard,
                            text: 'Payment processed',
                            time: '1 hour ago',
                            color: 'green',
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            <div
                                className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center border border-${item.color}-300`}
                            >
                                <item.icon
                                    size={20}
                                    className={`text-${item.color}-600`}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {item.text}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Add Product', icon: Package },
                        { label: 'Create Order', icon: ShoppingCart },
                        { label: 'View Reports', icon: BarChart3 },
                        { label: 'Manage Team', icon: Users },
                    ].map((action, i) => (
                        <button
                            key={i}
                            className="p-4 rounded-xl border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                        >
                            <action.icon
                                size={24}
                                className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors"
                            />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                                {action.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
)

// Default story
export const Default: Story = {
    render: () => {
        const DefaultComponent = () => {
            const [activeTenant, setActiveTenant] = useState('Retail Corp')
            const [sidebarState, setSidebarState] = useState<
                'collapsed' | 'expanded' | 'intermediate'
            >('expanded')

            const navigationData: DirectoryData[] = [
                {
                    label: 'Main',
                    items: [
                        {
                            label: 'Dashboard',
                            leftSlot: <Home size={16} aria-hidden="true" />,
                            onClick: () => console.log('Dashboard clicked'),
                        },
                        {
                            label: 'Analytics',
                            leftSlot: (
                                <BarChart3 size={16} aria-hidden="true" />
                            ),
                            rightSlot: (
                                <ChevronRight size={16} aria-hidden="true" />
                            ),
                            onClick: () => console.log('Analytics clicked'),
                        },
                        {
                            label: 'Reports',
                            leftSlot: <FileText size={16} aria-hidden="true" />,
                            onClick: () => console.log('Reports clicked'),
                        },
                    ],
                },
                {
                    label: 'Commerce',
                    items: [
                        {
                            label: 'Products',
                            leftSlot: <Package size={16} aria-hidden="true" />,
                            onClick: () => console.log('Products clicked'),
                        },
                        {
                            label: 'Orders',
                            leftSlot: (
                                <ShoppingCart size={16} aria-hidden="true" />
                            ),
                            rightSlot: (
                                <span
                                    className="bg-red-500 text-white rounded-[10px] px-1.5 py-0.5 text-[11px] font-medium"
                                    aria-label="12 new orders"
                                >
                                    12
                                </span>
                            ),
                            onClick: () => console.log('Orders clicked'),
                        },
                        {
                            label: 'Customers',
                            leftSlot: <Users size={16} aria-hidden="true" />,
                            onClick: () => console.log('Customers clicked'),
                        },
                    ],
                },
                {
                    label: 'Settings',
                    items: [
                        {
                            label: 'General',
                            leftSlot: <Settings size={16} aria-hidden="true" />,
                            onClick: () =>
                                console.log('General settings clicked'),
                        },
                        {
                            label: 'Billing',
                            leftSlot: (
                                <CreditCard size={16} aria-hidden="true" />
                            ),
                            onClick: () => console.log('Billing clicked'),
                        },
                    ],
                },
            ]

            return (
                <div className="h-screen flex">
                    <Sidebar
                        onSidebarStateChange={(state) => {
                            setSidebarState(state)
                            console.log('[Sidebar state]', state)
                        }}
                        leftPanel={{
                            items: [
                                {
                                    label: 'Retail Corp',
                                    icon: (
                                        <Building
                                            size={16}
                                            color="#3b82f6"
                                            aria-hidden="true"
                                        />
                                    ),
                                },
                                {
                                    label: 'Tech Inc',
                                    icon: (
                                        <Cpu
                                            size={16}
                                            color="#8b5cf6"
                                            aria-hidden="true"
                                        />
                                    ),
                                },
                                {
                                    label: 'Finance Ltd',
                                    icon: (
                                        <DollarSign
                                            size={16}
                                            color="#10b981"
                                            aria-hidden="true"
                                        />
                                    ),
                                },
                            ],
                            selected: activeTenant,
                            onSelect: setActiveTenant,
                        }}
                        data={navigationData}
                        topbar={
                            <div className="flex items-center gap-4 w-full">
                                <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                                    <Search
                                        size={16}
                                        color="#6b7280"
                                        aria-hidden="true"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        aria-label="Search input"
                                        className="border-none outline-none bg-transparent w-full"
                                    />
                                </div>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<Bell aria-hidden="true" />}
                                    aria-label="Notifications"
                                />
                                <Avatar
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="User"
                                    size={AvatarSize.SM}
                                    shape={AvatarShape.ROUNDED}
                                />
                            </div>
                        }
                        footer={
                            <div className="flex items-center gap-3 w-full">
                                <Avatar
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="John Doe"
                                    size={AvatarSize.SM}
                                    shape={AvatarShape.CIRCULAR}
                                />
                                <div className="flex-1">
                                    <div className="text-sm font-medium">
                                        John Doe
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        john@example.com
                                    </div>
                                </div>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<LogOut aria-hidden="true" />}
                                    aria-label="Log out"
                                />
                            </div>
                        }
                    >
                        <DashboardContent title="Dashboard" />
                    </Sidebar>
                </div>
            )
        }
        return <DefaultComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Default sidebar with multi-tenant support, merchant switching, and navigation sections.',
            },
        },
    },
}

// Sidebar without intermediate state
export const WithoutIntermediateState: Story = {
    render: () => {
        const WithoutIntermediateStateComponent = () => {
            const [activeTenant, setActiveTenant] = useState('Retail Corp')
            const [sidebarState, setSidebarState] = useState<
                'collapsed' | 'expanded' | 'intermediate'
            >('expanded')

            const navigationData: DirectoryData[] = [
                {
                    label: 'Main',
                    items: [
                        {
                            label: 'Dashboard',
                            leftSlot: <Home size={16} aria-hidden="true" />,
                            onClick: () => console.log('Dashboard clicked'),
                        },
                        {
                            label: 'Analytics',
                            leftSlot: (
                                <BarChart3 size={16} aria-hidden="true" />
                            ),
                            onClick: () => console.log('Analytics clicked'),
                        },
                        {
                            label: 'Reports',
                            leftSlot: <FileText size={16} aria-hidden="true" />,
                            onClick: () => console.log('Reports clicked'),
                        },
                    ],
                },
                {
                    label: 'Commerce',
                    items: [
                        {
                            label: 'Products',
                            leftSlot: <Package size={16} aria-hidden="true" />,
                            onClick: () => console.log('Products clicked'),
                        },
                        {
                            label: 'Orders',
                            leftSlot: (
                                <ShoppingCart size={16} aria-hidden="true" />
                            ),
                            onClick: () => console.log('Orders clicked'),
                        },
                    ],
                },
            ]

            return (
                <div className="h-screen flex">
                    <Sidebar
                        onSidebarStateChange={(state) => {
                            setSidebarState(state)
                            console.log('[Sidebar state]', state)
                        }}
                        disableIntermediateState={true}
                        defaultIsExpanded={false}
                        leftPanel={{
                            items: [
                                {
                                    label: 'Retail Corp',
                                    icon: (
                                        <Building
                                            size={16}
                                            color="#3b82f6"
                                            aria-hidden="true"
                                        />
                                    ),
                                },
                                {
                                    label: 'Tech Inc',
                                    icon: (
                                        <Cpu
                                            size={16}
                                            color="#8b5cf6"
                                            aria-hidden="true"
                                        />
                                    ),
                                },
                            ],
                            selected: activeTenant,
                            onSelect: setActiveTenant,
                        }}
                        data={navigationData}
                        topbar={
                            <div className="flex items-center gap-4 w-full">
                                <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                                    <Search
                                        size={16}
                                        color="#6b7280"
                                        aria-hidden="true"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        aria-label="Search input"
                                        className="border-none outline-none bg-transparent w-full"
                                    />
                                </div>
                            </div>
                        }
                    >
                        <DashboardContent title="Sidebar Without Intermediate State" />
                    </Sidebar>
                </div>
            )
        }
        return <WithoutIntermediateStateComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Sidebar with intermediate state disabled. When collapsed, hovering over the sidebar will not trigger the intermediate/expanded state. The sidebar can only be expanded by clicking the toggle button or using the keyboard shortcut. This is useful when you want to prevent accidental expansion on hover.',
            },
        },
    },
}

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
    Store,
    DollarSign,
    TrendingUp,
    Activity,
    Calendar,
    Mail,
    Bell,
    Search,
    HelpCircle,
    LogOut,
    ChevronRight,
    Plus,
    Filter,
    Download,
    Upload,
    RefreshCw,
    Shield,
    Lock,
    Key,
    Database,
    Server,
    Cloud,
    Zap,
    Globe,
    Cpu,
    Tag,
    Truck,
    Star,
    LayoutDashboard,
    FileBarChart,
    GitBranch,
    Brain,
    AlertTriangle,
    Lightbulb,
    Code,
    ChevronDown,
    Percent,
    Share2,
    Receipt,
    Shirt,
    Tent,
    Webhook,
    UserCheck,
    AlertCircle,
    Layers,
    FileCode,
    Wifi,
    Save,
    Smartphone,
    ShoppingBag,
    Target,
    Clock,
    HardDrive,
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
        docs: {
            description: {
                component: `

A comprehensive sidebar navigation component with collapsible sections, integrated directory navigation, customizable panels, and responsive design.

## Overview

The Sidebar component provides a complete application navigation solution with support for hierarchical menus, tenant/workspace switching, mobile responsiveness, and extensive customization options.

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
const SampleContent = ({ title }: { title: string }) => (
    <div style={{ padding: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
            {title}
        </h1>
        <div style={{ display: 'grid', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    style={{
                        padding: '16px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: 500,
                            marginBottom: '8px',
                        }}
                    >
                        Section {i}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>
            ))}
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
                                    style={{
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        borderRadius: '10px',
                                        padding: '2px 6px',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                    }}
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
                <div style={{ height: '100vh', display: 'flex' }}>
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    width: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 16px',
                                        backgroundColor: '#f3f4f6',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Search
                                        size={16}
                                        color="#6b7280"
                                        aria-hidden="true"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        aria-label="Search input"
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                            width: '100%',
                                        }}
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                }}
                            >
                                <Avatar
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="John Doe"
                                    size={AvatarSize.SM}
                                    shape={AvatarShape.CIRCULAR}
                                />
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }}
                                    >
                                        John Doe
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
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
                        <SampleContent title="Dashboard" />
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

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating WCAG 2.1 Level AA compliance
 */
export const Accessibility: Story = {
    render: () => {
        const AccessibilityComponent = () => {
            const [activeTenant, setActiveTenant] = useState('Retail Corp')
            const [isExpanded, setIsExpanded] = useState(true)
            const [sidebarState, setSidebarState] = useState<
                'collapsed' | 'expanded' | 'intermediate'
            >('expanded')

            const navigationData: DirectoryData[] = [
                {
                    label: 'Main Navigation',
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
                            rightSlot: (
                                <span
                                    style={{
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        borderRadius: '10px',
                                        padding: '2px 6px',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                    }}
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
                            label: 'General Settings',
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
                <div style={{ height: '100vh', display: 'flex' }}>
                    <Sidebar
                        onSidebarStateChange={(state) => {
                            setSidebarState(state)
                            console.log('[Sidebar state]', state)
                        }}
                        isExpanded={isExpanded}
                        onExpandedChange={setIsExpanded}
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    width: '100%',
                                }}
                                role="search"
                                aria-label="Search navigation"
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 16px',
                                        backgroundColor: '#f3f4f6',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Search
                                        size={16}
                                        color="#6b7280"
                                        aria-hidden="true"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        aria-label="Search navigation items"
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<Bell aria-hidden="true" />}
                                    aria-label="View notifications"
                                />
                                <Avatar
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="User profile"
                                    size={AvatarSize.SM}
                                    shape={AvatarShape.ROUNDED}
                                />
                            </div>
                        }
                        footer={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                }}
                                role="complementary"
                                aria-label="User profile and actions"
                            >
                                <Avatar
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="John Doe"
                                    size={AvatarSize.SM}
                                    shape={AvatarShape.CIRCULAR}
                                />
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }}
                                    >
                                        John Doe
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        john@example.com
                                    </div>
                                </div>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    leadingIcon={<LogOut aria-hidden="true" />}
                                    aria-label="Sign out"
                                />
                            </div>
                        }
                    >
                        <div style={{ padding: '32px' }}>
                            <h1
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    marginBottom: '16px',
                                }}
                            >
                                Sidebar Component Accessibility Showcase
                            </h1>
                            <p
                                style={{
                                    fontSize: '16px',
                                    color: '#475569',
                                    lineHeight: '1.6',
                                    marginBottom: '24px',
                                }}
                            >
                                Interactive examples demonstrating the Sidebar
                                component's accessibility features including
                                keyboard navigation, screen reader support, and
                                proper ARIA attributes.
                            </p>

                            <section
                                style={{
                                    marginBottom: '32px',
                                    padding: '20px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        marginBottom: '16px',
                                    }}
                                >
                                    Keyboard Navigation
                                </h2>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <strong>2.1.1 Keyboard (Level A)</strong>:
                                    All functionality is keyboard accessible.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        <strong>Tab</strong>: Navigate between
                                        interactive elements
                                    </li>
                                    <li>
                                        <strong>Arrow Keys</strong>: Navigate
                                        within Directory sections
                                    </li>
                                    <li>
                                        <strong>Enter/Space</strong>: Activate
                                        navigation items
                                    </li>
                                    <li>
                                        <strong>/ (default)</strong>: Toggle
                                        sidebar expand/collapse
                                    </li>
                                    <li>
                                        <strong>Escape</strong>: Close mobile
                                        navigation drawer
                                    </li>
                                </ul>
                            </section>

                            <section
                                style={{
                                    marginBottom: '32px',
                                    padding: '20px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        marginBottom: '16px',
                                    }}
                                >
                                    Focus Management
                                </h2>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <strong>
                                        2.4.7 Focus Visible (Level AA)
                                    </strong>
                                    : Focus indicators are visible on all
                                    interactive elements.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        Visible focus rings on all interactive
                                        elements
                                    </li>
                                    <li>
                                        Focus management in mobile navigation
                                        drawer
                                    </li>
                                    <li>
                                        Logical tab order: Topbar → Sidebar →
                                        Content
                                    </li>
                                </ul>
                            </section>

                            <section
                                style={{
                                    marginBottom: '32px',
                                    padding: '20px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        marginBottom: '16px',
                                    }}
                                >
                                    Screen Reader Support
                                </h2>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <strong>
                                        4.1.2 Name, Role, Value (Level A)
                                    </strong>
                                    : All elements have programmatically
                                    determinable names, roles, and values.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        Navigation items announced with labels
                                        and icons (when not decorative)
                                    </li>
                                    <li>
                                        Badge counts announced (e.g., "12 new
                                        orders")
                                    </li>
                                    <li>
                                        State changes announced
                                        (expanded/collapsed)
                                    </li>
                                    <li>
                                        Decorative icons marked with
                                        aria-hidden="true"
                                    </li>
                                </ul>
                            </section>

                            <section
                                style={{
                                    marginBottom: '32px',
                                    padding: '20px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        marginBottom: '16px',
                                    }}
                                >
                                    Semantic Structure
                                </h2>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <strong>
                                        1.3.1 Info and Relationships (Level A)
                                    </strong>
                                    : Information structure is programmatically
                                    determinable.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>Navigation regions properly labeled</li>
                                    <li>Search region with role="search"</li>
                                    <li>
                                        Complementary regions for footer content
                                    </li>
                                    <li>
                                        Logical heading hierarchy maintained
                                    </li>
                                </ul>
                            </section>

                            <section
                                style={{
                                    padding: '20px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        marginBottom: '16px',
                                    }}
                                >
                                    Accessibility Verification
                                </h2>
                                <p
                                    style={{
                                        color: '#6b7280',
                                        fontSize: '14px',
                                        marginBottom: '12px',
                                    }}
                                >
                                    To verify the accessibility of the Sidebar
                                    component, follow these steps:
                                </p>
                                <ol
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li style={{ marginBottom: '8px' }}>
                                        <strong>Storybook a11y addon</strong>:
                                        <ul
                                            style={{
                                                margin: '4px 0 0 0',
                                                paddingLeft: '20px',
                                                listStyleType: 'disc',
                                            }}
                                        >
                                            <li>
                                                Open the Accessibility panel in
                                                Storybook and verify there are
                                                no violations for these
                                                scenarios.
                                            </li>
                                            <li>
                                                Pay special attention to
                                                navigation regions, ARIA labels,
                                                and keyboard accessibility.
                                            </li>
                                        </ul>
                                    </li>
                                    <li style={{ marginBottom: '8px' }}>
                                        <strong>Chromatic visual tests</strong>:
                                        <ul
                                            style={{
                                                margin: '4px 0 0 0',
                                                paddingLeft: '20px',
                                                listStyleType: 'disc',
                                            }}
                                        >
                                            <li>
                                                Run Chromatic visual tests to
                                                ensure focus ring visibility on
                                                interactive elements.
                                            </li>
                                            <li>
                                                Verify hover/active states and
                                                responsive behavior.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Manual testing</strong>:
                                        <ul
                                            style={{
                                                margin: '4px 0 0 0',
                                                paddingLeft: '20px',
                                                listStyleType: 'disc',
                                            }}
                                        >
                                            <li>
                                                Navigate using keyboard only (
                                                <code>Tab</code> to focus,{' '}
                                                <code>Enter</code>/
                                                <code>Space</code> to activate,
                                                <code>/</code> to toggle
                                                sidebar).
                                            </li>
                                            <li>
                                                Use a screen reader
                                                (VoiceOver/NVDA) to confirm
                                                navigation items are announced
                                                correctly, state changes are
                                                communicated, and the sidebar
                                                structure is understandable.
                                            </li>
                                            <li>
                                                Verify color contrast of text
                                                and icons against their
                                                backgrounds using contrast
                                                checker tools.
                                            </li>
                                            <li>
                                                Test responsive behavior and
                                                mobile navigation drawer
                                                accessibility.
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
                            </section>
                        </div>
                    </Sidebar>
                </div>
            )
        }
        return <AccessibilityComponent />
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive examples demonstrating the Sidebar component's accessibility features including keyboard navigation, screen reader support, proper ARIA attributes, and focus management across various configurations.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to navigation regions, ARIA labels, and keyboard accessibility.

2. **Chromatic visual tests**:
   - Run Chromatic visual tests to ensure focus ring visibility on interactive elements.
   - Verify hover/active states and responsive behavior.

3. **Manual testing**:
   - Navigate using keyboard only (\`Tab\` to focus, \`Enter\`/\`Space\` to activate, \`/\` to toggle sidebar).
   - Use a screen reader (VoiceOver/NVDA) to confirm navigation items are announced correctly, state changes are communicated, and the sidebar structure is understandable.
   - Verify color contrast of text and icons against their backgrounds using contrast checker tools.
   - Test responsive behavior and mobile navigation drawer accessibility.
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('interactive'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
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
                <div style={{ height: '100vh', display: 'flex' }}>
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    width: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 16px',
                                        backgroundColor: '#f3f4f6',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Search
                                        size={16}
                                        color="#6b7280"
                                        aria-hidden="true"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        aria-label="Search input"
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                            </div>
                        }
                    >
                        <SampleContent title="Sidebar Without Intermediate State" />
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

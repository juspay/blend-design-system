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

A comprehensive sidebar navigation component with collapsible sections, integrated directory navigation, and customizable panels.

## Features
Collapsible/expandable sidebar with smooth animations, integrated Directory component for hierarchical navigation, optional left panel for tenant/category switching, sticky header and footer sections, customizable topbar and footer content, responsive design with proper scrolling, support for nested navigation items, and icon and badge support in navigation items.

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible navigation (Tab, Arrow keys, Enter, Space, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper semantic structure and ARIA attributes
- Focus management and visible focus indicators
- Logical tab order throughout navigation
- Responsive design that works across screen sizes
- Mobile navigation with accessible touch targets

**Level AAA Compliance**: ⚠️ Partial
- ✅ **Compliant**: 1.3.4 Orientation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: Color contrast ratios should be verified using actual color values from theme tokens

**Key Accessibility Features**:
- Keyboard shortcut support (configurable collapse key, default '/')
- Proper ARIA landmarks and navigation regions
- Focus trap management in mobile drawer
- Screen reader announcements for state changes
- Skip links and logical heading hierarchy
- Touch targets meet Level AA requirement (24x24px minimum)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker

## Usage

\`\`\`tsx
import { Sidebar } from '@juspay/blend-design-system';

const navigationData = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", leftSlot: <Home size={16} />, onClick: () => {} },
      { label: "Analytics", leftSlot: <BarChart3 size={16} />, onClick: () => {} }
    ]
  }
];

<Sidebar
  data={navigationData}
  topbar={<div>Search bar</div>}
  leftPanel={{
    items: [{ label: "Tenant 1", icon: <Building size={16} /> }],
    selected: "Tenant 1",
    onSelect: (value) => console.log(value)
  }}
>
  <div>Main content</div>
</Sidebar>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        data: {
            control: 'object',
            description: 'Directory navigation data structure',
        },
        topbar: {
            control: false,
            description: 'Content to display in the topbar',
        },
        leftPanel: {
            control: 'object',
            description:
                'Left panel configuration for tenant/category switching',
        },
        footer: {
            control: false,
            description: 'Content to display in the sidebar footer',
        },
        sidebarTopSlot: {
            control: false,
            description:
                'Custom content for the sidebar top slot (replaces default merchant selector)',
        },
        disableIntermediateState: {
            control: 'boolean',
            description:
                'When true, disables the intermediate state that appears on hover. When false or undefined, hovering over the collapsed sidebar will temporarily show it in an intermediate/expanded state. The intermediate state allows users to see the sidebar content without fully expanding it. Defaults to false (intermediate state enabled).',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        iconOnlyMode: {
            control: 'boolean',
            description:
                'When true, shows only icons (52px width) with tooltips on hover. In this mode: directory items show only their icons, tooltips appear on hover showing the item label, sections render as horizontal dividers, merchant switcher moves to topbar, and intermediate/hover state expansion is disabled. The toggle button appears at the top of the icon-only panel. Clicking the toggle button expands to full sidebar view (or hides the sidebar if hideOnIconOnlyToggle is true). Defaults to false.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        hideOnIconOnlyToggle: {
            control: 'boolean',
            description:
                'When true, clicking the toggle button in icon-only mode will completely hide the sidebar. When false, clicking the toggle button will expand to full sidebar view with tenant panel (if provided) and directory. Only applies when iconOnlyMode is true. Defaults to false (expands to full sidebar).',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
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

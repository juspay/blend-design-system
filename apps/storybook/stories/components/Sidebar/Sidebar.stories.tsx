import type { Meta, StoryObj } from '@storybook/react-vite'
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
    title: 'Hidden/Sidebar',
    component: Sidebar,
    includeStories: [],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `

A comprehensive sidebar navigation component with collapsible sections, integrated directory navigation, and customizable panels.

## Features
Collapsible/expandable sidebar with smooth animations, integrated Directory component for hierarchical navigation, optional left panel for tenant/category switching, sticky header and footer sections, customizable topbar and footer content, responsive design with proper scrolling, support for nested navigation items, and icon and badge support in navigation items.

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
                            leftSlot: <Home size={16} />,
                            onClick: () => console.log('Dashboard clicked'),
                        },
                        {
                            label: 'Analytics',
                            leftSlot: <BarChart3 size={16} />,
                            rightSlot: <ChevronRight size={16} />,
                            onClick: () => console.log('Analytics clicked'),
                        },
                        {
                            label: 'Reports',
                            leftSlot: <FileText size={16} />,
                            onClick: () => console.log('Reports clicked'),
                        },
                    ],
                },
                {
                    label: 'Commerce',
                    items: [
                        {
                            label: 'Products',
                            leftSlot: <Package size={16} />,
                            onClick: () => console.log('Products clicked'),
                        },
                        {
                            label: 'Orders',
                            leftSlot: <ShoppingCart size={16} />,
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
                                >
                                    12
                                </span>
                            ),
                            onClick: () => console.log('Orders clicked'),
                        },
                        {
                            label: 'Customers',
                            leftSlot: <Users size={16} />,
                            onClick: () => console.log('Customers clicked'),
                        },
                    ],
                },
                {
                    label: 'Settings',
                    items: [
                        {
                            label: 'General',
                            leftSlot: <Settings size={16} />,
                            onClick: () =>
                                console.log('General settings clicked'),
                        },
                        {
                            label: 'Billing',
                            leftSlot: <CreditCard size={16} />,
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
                                        <Building size={16} color="#3b82f6" />
                                    ),
                                },
                                {
                                    label: 'Tech Inc',
                                    icon: <Cpu size={16} color="#8b5cf6" />,
                                },
                                {
                                    label: 'Finance Ltd',
                                    icon: (
                                        <DollarSign size={16} color="#10b981" />
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
                                    <Search size={16} color="#6b7280" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
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
                                    leadingIcon={<Bell />}
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
                                    leadingIcon={<LogOut />}
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

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    TabsSize,
    TabItem,
} from '@juspay/blend-design-system'
import { MultiSelect } from '@juspay/blend-design-system'
import {
    Settings,
    User,
    Bell,
    Shield,
    CreditCard,
    HelpCircle,
    FileText,
    Archive,
    Send,
    ShoppingCart,
    Package,
    Users,
    BarChart3,
} from 'lucide-react'

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `

A flexible tabs component for organizing content into multiple panels with various visual styles and sizes.

## Features
- Multiple variants (Boxed, Floating, Underline, Pills)
- Two sizes (Medium, Large)
- Support for icons in tab triggers
- Expandable tab lists
- Fit content option for tab lists
- **New: Dynamic tab management with closable tabs**
- **New: Default tabs that cannot be closed**
- **New: Tab concatenation for shared content (TabA+TabB+TabC)**
- **New: MultiSelect integration for adding tabs**
- **New: Dropdown navigation for all tabs (including scrolled-out)**
- **New: Horizontal scrolling with sticky controls**
- Built on Radix UI primitives for accessibility

## Basic Usage

\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsVariant } from '@juspay/blend-design-system';

<Tabs defaultValue="tab1" variant={TabsVariant.BOXED}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for Tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for Tab 2
  </TabsContent>
</Tabs>
\`\`\`

## Dynamic Tab Management

\`\`\`tsx
const [tabs, setTabs] = useState<TabItem[]>([
  {
    value: 'home',
    label: 'Home',
    content: <div>Home content</div>,
    isDefault: true, // Cannot be closed
  },
  {
    value: 'projects',
    label: 'Projects', 
    content: <div>Projects content</div>,
    closable: true, // Can be closed
  }
]);

<Tabs
  items={tabs}
  onTabClose={(value) => setTabs(tabs.filter(t => t.value !== value))}
  onTabAdd={() => setShowAddModal(true)}
  showDropdown={true}
  showAddButton={true}
  dropdownTooltip="Navigate to any tab"
  addButtonTooltip="Add new tabs"
  maxDisplayTabs={4}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: Object.values(TabsVariant),
            description: 'The visual variant of the tabs',
        },
        size: {
            control: 'select',
            options: Object.values(TabsSize),
            description: 'The size of the tabs',
        },
        defaultValue: {
            control: 'text',
            description: 'The default active tab value',
        },
        value: {
            control: 'text',
            description: 'The controlled active tab value',
        },
        onValueChange: {
            action: 'valueChanged',
            description: 'Callback when the active tab changes',
        },
        items: {
            control: 'object',
            description: 'Array of tab items for dynamic management',
        },
        onTabClose: {
            action: 'tabClosed',
            description: 'Callback when a tab is closed',
        },
        onTabAdd: {
            action: 'tabAdd',
            description: 'Callback when add button is clicked',
        },
        showDropdown: {
            control: 'boolean',
            description: 'Show dropdown navigation for all tabs',
        },
        showAddButton: {
            control: 'boolean',
            description: 'Show add button for adding new tabs',
        },
        maxDisplayTabs: {
            control: 'number',
            description: 'Maximum tabs to display before scrolling',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

// Default story (traditional usage)
export const Default: Story = {
    args: {
        defaultValue: 'account',
        variant: TabsVariant.BOXED,
        size: TabsSize.MD,
    },
    render: (args: any) => (
        <div style={{ width: '500px' }}>
            <Tabs
                defaultValue={args.defaultValue}
                value={args.value}
                onValueChange={args.onValueChange}
            >
                <TabsList variant={args.variant} size={args.size}>
                    <TabsTrigger
                        value="account"
                        variant={args.variant}
                        size={args.size}
                    >
                        Account
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        variant={args.variant}
                        size={args.size}
                    >
                        Password
                    </TabsTrigger>
                    <TabsTrigger
                        value="settings"
                        variant={args.variant}
                        size={args.size}
                    >
                        Settings
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="account"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Account Settings
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Manage your account settings and preferences here. You
                        can update your profile information, change your email
                        address, and configure other account-related options.
                    </p>
                </TabsContent>
                <TabsContent
                    value="password"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Password & Security
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Update your password and manage security settings.
                        Enable two-factor authentication and review your recent
                        login activity to keep your account secure.
                    </p>
                </TabsContent>
                <TabsContent
                    value="settings"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        General Settings
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Configure your general preferences including language,
                        timezone, notifications, and other application settings
                        to customize your experience.
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    ),
}

export const DynamicTabManagement: Story = {
    render: () => {
        // Shared content for concatenation demo
        const sharedContent = (
            <div
                style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                }}
            >
                <h3
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Shared Content
                </h3>
                <p style={{ margin: 0, color: '#64748b' }}>
                    This content is shared between multiple tabs. When multiple
                    tabs have the same content, their labels are concatenated
                    (e.g., "TabA+TabB+TabC"). Max 3 items can be concatenated.
                </p>
            </div>
        )

        // Available items that can be added as tabs
        const availableTabOptions = [
            { value: 'analytics', label: 'Analytics' },
            { value: 'reports', label: 'Reports' },
            { value: 'users', label: 'Users' },
            { value: 'permissions', label: 'Permissions' },
            { value: 'settings', label: 'Settings' },
            { value: 'notifications', label: 'Notifications' },
            { value: 'billing', label: 'Billing' },
            { value: 'integrations', label: 'Integrations' },
        ]

        const [tabs, setTabs] = useState<TabItem[]>([
            // Default tabs - always visible at front, no X icon
            {
                value: 'dashboard',
                label: 'Dashboard',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#eff6ff',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Dashboard Content
                        </h3>
                        <p style={{ margin: 0, color: '#1e40af' }}>
                            This is a default tab that cannot be closed. Default
                            tabs are always visible at the front.
                        </p>
                    </div>
                ),
                isDefault: true,
            },
            {
                value: 'overview',
                label: 'Overview',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Overview Content
                        </h3>
                        <p style={{ margin: 0, color: '#166534' }}>
                            Another default tab. Notice it doesn't have an X
                            button and stays at the front.
                        </p>
                    </div>
                ),
                isDefault: true,
            },
        ])

        const [activeTab, setActiveTab] = useState('dashboard')
        const [selectedTabsToAdd, setSelectedTabsToAdd] = useState<string[]>([])
        const [showMultiSelect, setShowMultiSelect] = useState(false)

        // Get available items that haven't been added yet
        const getAvailableItems = () => {
            const existingValues = tabs.map((tab) => tab.value)
            return availableTabOptions.filter(
                (item) => !existingValues.includes(item.value)
            )
        }

        const handleTabClose = (value: string) => {
            const filteredTabs = tabs.filter((tab) => tab.value !== value)
            setTabs(filteredTabs)

            // If closing active tab, switch to first remaining tab
            if (value === activeTab && filteredTabs.length > 0) {
                setActiveTab(filteredTabs[0].value)
            }
        }

        const handleTabAdd = () => {
            setShowMultiSelect(true)
        }

        const handleMultiSelectChange = (value: string) => {
            if (selectedTabsToAdd.includes(value)) {
                setSelectedTabsToAdd((prev) => prev.filter((v) => v !== value))
            } else if (selectedTabsToAdd.length < 3) {
                setSelectedTabsToAdd((prev) => [...prev, value])
            }
        }

        const handleAddSelectedTabs = () => {
            if (selectedTabsToAdd.length === 0) return

            const newTabs: TabItem[] = selectedTabsToAdd.map((value) => {
                const item = availableTabOptions.find(
                    (opt) => opt.value === value
                )!

                // For demo: if user selects multiple items, they share content for concatenation
                const content =
                    selectedTabsToAdd.length > 1 ? (
                        sharedContent
                    ) : (
                        <div
                            style={{
                                padding: '16px',
                                backgroundColor: '#faf5ff',
                                borderRadius: '8px',
                            }}
                        >
                            <h3
                                style={{
                                    margin: '0 0 12px 0',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                {item.label} Content
                            </h3>
                            <p style={{ margin: 0, color: '#7c3aed' }}>
                                This is unique content for {item.label} tab.
                            </p>
                        </div>
                    )

                return {
                    value: item.value,
                    label: item.label,
                    content,
                    closable: true,
                    isDefault: false,
                }
            })

            setTabs([...tabs, ...newTabs])
            setActiveTab(newTabs[0].value)
            setSelectedTabsToAdd([])
            setShowMultiSelect(false)
        }

        const handleCancelAdd = () => {
            setSelectedTabsToAdd([])
            setShowMultiSelect(false)
        }

        const multiSelectItems = [
            {
                items: getAvailableItems(),
            },
        ]

        return (
            <div style={{ width: '800px', maxWidth: '90vw' }}>
                <div
                    style={{
                        marginBottom: '20px',
                        padding: '16px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Enhanced Tab Features
                    </h3>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: '20px',
                            color: '#64748b',
                            fontSize: '14px',
                        }}
                    >
                        <li>
                            Default tabs (Dashboard, Overview) cannot be closed
                        </li>
                        <li>Click + to add new tabs via MultiSelect</li>
                        <li>
                            Select multiple items to create concatenated tabs
                            (e.g., "Analytics+Reports+Users")
                        </li>
                        <li>
                            Use dropdown to navigate to any tab (including
                            scrolled-out ones)
                        </li>
                        <li>
                            Tabs scroll horizontally when they exceed container
                            width
                        </li>
                    </ul>
                </div>

                <Tabs
                    items={tabs}
                    value={activeTab}
                    onValueChange={setActiveTab}
                    onTabClose={handleTabClose}
                    onTabAdd={handleTabAdd}
                    showDropdown={true}
                    showAddButton={true}
                    dropdownTooltip="Navigate to any tab (includes scrolled-out tabs)"
                    addButtonTooltip="Add new tabs via MultiSelect"
                    maxDisplayTabs={4}
                />

                {/* MultiSelect Modal */}
                {showMultiSelect && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: 'white',
                                padding: '24px',
                                borderRadius: '8px',
                                maxWidth: '500px',
                                width: '90%',
                                margin: '16px',
                            }}
                        >
                            <h3
                                style={{
                                    margin: '0 0 16px 0',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                }}
                            >
                                Add New Tabs
                            </h3>
                            <p
                                style={{
                                    margin: '0 0 16px 0',
                                    color: '#64748b',
                                }}
                            >
                                Select up to 3 tabs to add. If you select
                                multiple tabs, they will share content and be
                                concatenated as "TabA+TabB+TabC".
                            </p>

                            <MultiSelect
                                selectedValues={selectedTabsToAdd}
                                onChange={handleMultiSelectChange}
                                items={multiSelectItems}
                                placeholder={`Select up to 3 items (${selectedTabsToAdd.length}/3 selected)`}
                                label="Available Tabs"
                                enableSearch={true}
                                searchPlaceholder="Search available tabs..."
                                showActionButtons={true}
                                primaryAction={{
                                    text: 'Add Selected Tabs',
                                    onClick: handleAddSelectedTabs,
                                    disabled: selectedTabsToAdd.length === 0,
                                }}
                                secondaryAction={{
                                    text: 'Cancel',
                                    onClick: handleCancelAdd,
                                }}
                                useDrawerOnMobile={false}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complete dynamic tab management with default tabs, closable tabs, MultiSelect integration, concatenation, and navigation dropdown.',
            },
        },
    },
}

// Tab Concatenation Demo
export const TabConcatenation: Story = {
    render: () => {
        const sharedContent = (
            <div
                style={{
                    padding: '16px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '8px',
                }}
            >
                <h3
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Concatenated Tab Content
                </h3>
                <p style={{ margin: 0, color: '#92400e' }}>
                    This content is shared between multiple tabs. When tabs
                    share the same content, their labels are automatically
                    concatenated for better organization.
                </p>
            </div>
        )

        const [tabs] = useState<TabItem[]>([
            {
                value: 'home',
                label: 'Home',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#eff6ff',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Home Content
                        </h3>
                        <p style={{ margin: 0, color: '#1e40af' }}>
                            This is unique content for the Home tab.
                        </p>
                    </div>
                ),
                isDefault: true,
            },
            {
                value: 'analytics',
                label: 'Analytics',
                content: sharedContent,
                closable: true,
            },
            {
                value: 'reports',
                label: 'Reports',
                content: sharedContent,
                closable: true,
            },
            {
                value: 'dashboards',
                label: 'Dashboards',
                content: sharedContent,
                closable: true,
            },
            {
                value: 'settings',
                label: 'Settings',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Settings Content
                        </h3>
                        <p style={{ margin: 0, color: '#166534' }}>
                            This is unique content for the Settings tab.
                        </p>
                    </div>
                ),
                closable: true,
            },
        ])

        const [activeTab, setActiveTab] = useState('home')

        return (
            <div style={{ width: '700px', maxWidth: '90vw' }}>
                <div
                    style={{
                        marginBottom: '20px',
                        padding: '16px',
                        backgroundColor: '#fef3c7',
                        borderRadius: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Tab Concatenation Example
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            color: '#92400e',
                            fontSize: '14px',
                        }}
                    >
                        Notice how "Analytics", "Reports", and "Dashboards" are
                        displayed as "Analytics+Reports+Dashboards" because they
                        share the same content. Home and Settings remain
                        separate as they have unique content.
                    </p>
                </div>

                <Tabs
                    items={tabs}
                    value={activeTab}
                    onValueChange={setActiveTab}
                    showDropdown={true}
                    showAddButton={false}
                    dropdownTooltip="All tabs (including concatenated ones)"
                    maxDisplayTabs={3}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates automatic tab concatenation when multiple tabs share the same content.',
            },
        },
    },
}

// Tab variants
export const TabVariants: Story = {
    args: {
        defaultValue: 'tab1',
        variant: TabsVariant.BOXED,
        size: TabsSize.MD,
    },
    render: (args: any) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                width: '500px',
            }}
        >
            <div>
                <h4
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Boxed Variant
                </h4>
                <Tabs
                    defaultValue={args.defaultValue}
                    value={args.value}
                    onValueChange={args.onValueChange}
                >
                    <TabsList variant={TabsVariant.BOXED} size={args.size}>
                        <TabsTrigger
                            value="tab1"
                            variant={TabsVariant.BOXED}
                            size={args.size}
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab2"
                            variant={TabsVariant.BOXED}
                            size={args.size}
                        >
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab3"
                            variant={TabsVariant.BOXED}
                            size={args.size}
                        >
                            Reports
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="tab1"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Overview content with boxed tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Reports content with data visualization.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Floating Variant
                </h4>
                <Tabs
                    defaultValue={args.defaultValue}
                    value={args.value}
                    onValueChange={args.onValueChange}
                >
                    <TabsList variant={TabsVariant.FLOATING} size={args.size}>
                        <TabsTrigger
                            value="tab1"
                            variant={TabsVariant.FLOATING}
                            size={args.size}
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab2"
                            variant={TabsVariant.FLOATING}
                            size={args.size}
                        >
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab3"
                            variant={TabsVariant.FLOATING}
                            size={args.size}
                        >
                            Reports
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="tab1"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Overview content with floating tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Reports content with data visualization.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Underline Variant
                </h4>
                <Tabs
                    defaultValue={args.defaultValue}
                    value={args.value}
                    onValueChange={args.onValueChange}
                >
                    <TabsList variant={TabsVariant.UNDERLINE} size={args.size}>
                        <TabsTrigger
                            value="tab1"
                            variant={TabsVariant.UNDERLINE}
                            size={args.size}
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab2"
                            variant={TabsVariant.UNDERLINE}
                            size={args.size}
                        >
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab3"
                            variant={TabsVariant.UNDERLINE}
                            size={args.size}
                        >
                            Reports
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="tab1"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Overview content with underline tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Reports content with data visualization.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Pills Variant
                </h4>
                <Tabs
                    defaultValue={args.defaultValue}
                    value={args.value}
                    onValueChange={args.onValueChange}
                >
                    <TabsList variant={TabsVariant.PILLS} size={args.size}>
                        <TabsTrigger
                            value="tab1"
                            variant={TabsVariant.PILLS}
                            size={args.size}
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab2"
                            variant={TabsVariant.PILLS}
                            size={args.size}
                        >
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab3"
                            variant={TabsVariant.PILLS}
                            size={args.size}
                        >
                            Reports
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="tab1"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Overview content with pills tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Reports content with data visualization.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different visual variants: boxed, floating, underline, and pills styles.',
            },
        },
    },
}

// Tab sizes
export const TabSizes: Story = {
    args: {
        defaultValue: 'tab1',
        variant: TabsVariant.BOXED,
        size: TabsSize.MD,
    },
    render: (args: any) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                width: '500px',
            }}
        >
            <div>
                <h4
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Medium Size
                </h4>
                <Tabs
                    defaultValue={args.defaultValue}
                    value={args.value}
                    onValueChange={args.onValueChange}
                >
                    <TabsList variant={args.variant} size={TabsSize.MD}>
                        <TabsTrigger
                            value="tab1"
                            variant={args.variant}
                            size={TabsSize.MD}
                        >
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab2"
                            variant={args.variant}
                            size={TabsSize.MD}
                        >
                            Projects
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab3"
                            variant={args.variant}
                            size={TabsSize.MD}
                        >
                            Team
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="tab1"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Dashboard content in medium size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Projects content in medium size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Team content in medium size tabs.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    Large Size
                </h4>
                <Tabs
                    defaultValue={args.defaultValue}
                    value={args.value}
                    onValueChange={args.onValueChange}
                >
                    <TabsList variant={args.variant} size={TabsSize.LG}>
                        <TabsTrigger
                            value="tab1"
                            variant={args.variant}
                            size={TabsSize.LG}
                        >
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab2"
                            variant={args.variant}
                            size={TabsSize.LG}
                        >
                            Projects
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab3"
                            variant={args.variant}
                            size={TabsSize.LG}
                        >
                            Team
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="tab1"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Dashboard content in large size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Projects content in large size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        style={{
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            marginTop: '8px',
                        }}
                    >
                        <p style={{ margin: 0, color: '#64748b' }}>
                            Team content in large size tabs.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tab sizes: medium and large for various use cases.',
            },
        },
    },
}

// With icons
export const WithIcons: Story = {
    args: {
        defaultValue: 'profile',
        variant: TabsVariant.BOXED,
        size: TabsSize.MD,
    },
    render: (args: any) => (
        <div style={{ width: '600px' }}>
            <Tabs
                defaultValue={args.defaultValue}
                value={args.value}
                onValueChange={args.onValueChange}
            >
                <TabsList variant={args.variant} size={args.size}>
                    <TabsTrigger
                        value="profile"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<User size={16} />}
                    >
                        Profile
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<Shield size={16} />}
                    >
                        Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<Bell size={16} />}
                    >
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="billing"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<CreditCard size={16} />}
                    >
                        Billing
                    </TabsTrigger>
                    <TabsTrigger
                        value="help"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<HelpCircle size={16} />}
                    >
                        Help
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="profile"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Profile Information
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Update your personal information, profile picture, and
                        bio. This information will be visible to other users in
                        your organization.
                    </p>
                </TabsContent>
                <TabsContent
                    value="security"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Security Settings
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Manage your password, two-factor authentication, and
                        review recent login activity. Keep your account secure
                        with these security features.
                    </p>
                </TabsContent>
                <TabsContent
                    value="notifications"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Notification Preferences
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Configure how and when you receive notifications. Choose
                        your preferred channels and frequency for different
                        types of updates.
                    </p>
                </TabsContent>
                <TabsContent
                    value="billing"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Billing & Subscription
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        View your current subscription, payment methods, and
                        billing history. Upgrade or downgrade your plan as
                        needed.
                    </p>
                </TabsContent>
                <TabsContent
                    value="help"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Help & Support
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Find answers to common questions, contact support, or
                        browse our documentation. We're here to help you get the
                        most out of our platform.
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tabs with icons in the left slot to enhance visual identification.',
            },
        },
    },
}

// Expanded tabs
export const ExpandedTabs: Story = {
    args: {
        defaultValue: 'overview',
        variant: TabsVariant.BOXED,
        size: TabsSize.MD,
    },
    render: (args: any) => (
        <div style={{ width: '100%', maxWidth: '800px' }}>
            <Tabs
                defaultValue={args.defaultValue}
                value={args.value}
                onValueChange={args.onValueChange}
            >
                <TabsList variant={args.variant} size={args.size} expanded>
                    <TabsTrigger
                        value="overview"
                        variant={args.variant}
                        size={args.size}
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="analytics"
                        variant={args.variant}
                        size={args.size}
                    >
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger
                        value="reports"
                        variant={args.variant}
                        size={args.size}
                    >
                        Reports
                    </TabsTrigger>
                    <TabsTrigger
                        value="settings"
                        variant={args.variant}
                        size={args.size}
                        rightSlot={<Settings size={16} />}
                    >
                        Settings
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="overview"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Overview Dashboard
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Get a high-level view of your key metrics and
                        performance indicators. This expanded tab layout
                        provides more space for navigation.
                    </p>
                </TabsContent>
                <TabsContent
                    value="analytics"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Analytics & Insights
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Dive deep into your data with detailed analytics and
                        insights. Track trends, identify patterns, and make
                        data-driven decisions.
                    </p>
                </TabsContent>
                <TabsContent
                    value="reports"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Reports & Export
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Generate and export detailed reports for your
                        stakeholders. Schedule automated reports and customize
                        the data included.
                    </p>
                </TabsContent>
                <TabsContent
                    value="settings"
                    style={{
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Configuration Settings
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Configure your dashboard settings, data sources, and
                        user preferences. Customize the experience to match your
                        workflow.
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Expanded tabs that take the full width of their container for better space utilization.',
            },
        },
    },
}

// Fit content tabs
export const FitContentTabs: Story = {
    args: {
        defaultValue: 'home',
        variant: TabsVariant.UNDERLINE,
        size: TabsSize.MD,
    },
    render: (args: any) => (
        <div style={{ width: '400px' }}>
            <Tabs
                defaultValue={args.defaultValue}
                value={args.value}
                onValueChange={args.onValueChange}
            >
                <TabsList variant={args.variant} size={args.size} fitContent>
                    <TabsTrigger
                        value="home"
                        variant={args.variant}
                        size={args.size}
                    >
                        Home
                    </TabsTrigger>
                    <TabsTrigger
                        value="about"
                        variant={args.variant}
                        size={args.size}
                    >
                        About
                    </TabsTrigger>
                    <TabsTrigger
                        value="contact"
                        variant={args.variant}
                        size={args.size}
                    >
                        Contact
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="home"
                    style={{
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Welcome to the home page. This tab list fits its content
                        width.
                    </p>
                </TabsContent>
                <TabsContent
                    value="about"
                    style={{
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Learn more about us on this about page.
                    </p>
                </TabsContent>
                <TabsContent
                    value="contact"
                    style={{
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '8px',
                    }}
                >
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Get in touch with us through this contact page.
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tabs with fitContent option that only take the space needed for their content.',
            },
        },
    },
}

// Complex example with mixed features
export const ComplexExample: Story = {
    args: {
        defaultValue: 'dashboard',
        variant: TabsVariant.FLOATING,
        size: TabsSize.LG,
    },
    render: (args: any) => (
        <div style={{ width: '700px' }}>
            <Tabs
                defaultValue={args.defaultValue}
                value={args.value}
                onValueChange={args.onValueChange}
            >
                <TabsList variant={args.variant} size={args.size}>
                    <TabsTrigger
                        value="dashboard"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<Settings size={16} />}
                        rightSlot={
                            <span
                                style={{
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    borderRadius: '10px',
                                    padding: '2px 6px',
                                    fontSize: '10px',
                                    fontWeight: '600',
                                }}
                            >
                                3
                            </span>
                        }
                    >
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger
                        value="users"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<User size={16} />}
                    >
                        Users
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<Bell size={16} />}
                        rightSlot={
                            <span
                                style={{
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    borderRadius: '10px',
                                    padding: '2px 6px',
                                    fontSize: '10px',
                                    fontWeight: '600',
                                }}
                            >
                                12
                            </span>
                        }
                    >
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        variant={args.variant}
                        size={args.size}
                        leftSlot={<Shield size={16} />}
                    >
                        Security
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="dashboard"
                    style={{
                        padding: '24px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        marginTop: '12px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        Admin Dashboard
                    </h3>
                    <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>
                        Monitor system performance, user activity, and key
                        metrics from this central dashboard. You have 3 pending
                        alerts that require attention.
                    </p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px',
                            marginTop: '16px',
                        }}
                    >
                        <div
                            style={{
                                padding: '16px',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                            }}
                        >
                            <h4
                                style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                Active Users
                            </h4>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: '#059669',
                                }}
                            >
                                1,234
                            </p>
                        </div>
                        <div
                            style={{
                                padding: '16px',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                            }}
                        >
                            <h4
                                style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                Revenue
                            </h4>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: '#0891b2',
                                }}
                            >
                                $45,678
                            </p>
                        </div>
                        <div
                            style={{
                                padding: '16px',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                            }}
                        >
                            <h4
                                style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                Conversion
                            </h4>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: '#7c3aed',
                                }}
                            >
                                3.2%
                            </p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent
                    value="users"
                    style={{
                        padding: '24px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        marginTop: '12px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        User Management
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Manage user accounts, permissions, and access levels.
                        View user activity logs and handle account-related
                        requests from this centralized interface.
                    </p>
                </TabsContent>
                <TabsContent
                    value="notifications"
                    style={{
                        padding: '24px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        marginTop: '12px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        Notification Center
                    </h3>
                    <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>
                        You have 12 new notifications. Configure notification
                        settings and review system alerts, user messages, and
                        automated reports.
                    </p>
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#ecfdf5',
                            border: '1px solid #10b981',
                            borderRadius: '8px',
                            marginTop: '16px',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: '14px',
                                color: '#065f46',
                            }}
                        >
                            ✓ System backup completed successfully at 2:00 AM
                        </p>
                    </div>
                </TabsContent>
                <TabsContent
                    value="security"
                    style={{
                        padding: '24px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        marginTop: '12px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        Security Center
                    </h3>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        Monitor security events, configure access controls, and
                        review audit logs. Ensure your system remains secure
                        with comprehensive security management tools.
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A complex example showcasing tabs with icons, badges, and rich content areas.',
            },
        },
    },
}

// Enhanced closable tabs with individual controls
export const ClosableTabs: Story = {
    render: () => {
        const [tabs, setTabs] = useState<TabItem[]>([
            {
                value: 'home',
                label: 'Home',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#f0f9ff',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Home Dashboard
                        </h3>
                        <p style={{ margin: 0, color: '#0369a1' }}>
                            Welcome! This is a default tab that cannot be
                            closed. It serves as your home base.
                        </p>
                    </div>
                ),
                isDefault: true,
            },
            {
                value: 'analytics',
                label: 'Analytics',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Analytics Dashboard
                        </h3>
                        <p style={{ margin: 0, color: '#166534' }}>
                            View comprehensive analytics and insights. This tab
                            can be closed using the X button.
                        </p>
                    </div>
                ),
                closable: true,
            },
            {
                value: 'reports',
                label: 'Reports',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#fef3c7',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Reports Center
                        </h3>
                        <p style={{ margin: 0, color: '#92400e' }}>
                            Generate and export reports. This tab is also
                            closable for a cleaner interface.
                        </p>
                    </div>
                ),
                closable: true,
            },
            {
                value: 'settings',
                label: 'Settings',
                content: (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#faf5ff',
                            borderRadius: '8px',
                        }}
                    >
                        <h3
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                            Configuration Settings
                        </h3>
                        <p style={{ margin: 0, color: '#7c3aed' }}>
                            Customize your experience. Close this tab when
                            configuration is complete.
                        </p>
                    </div>
                ),
                closable: true,
            },
        ])

        const [activeTab, setActiveTab] = useState('home')

        const handleTabClose = (value: string) => {
            const filteredTabs = tabs.filter((tab) => tab.value !== value)
            setTabs(filteredTabs)

            // Switch to home if closing active tab
            if (value === activeTab) {
                setActiveTab('home')
            }
        }

        return (
            <div style={{ width: '700px', maxWidth: '90vw' }}>
                <div
                    style={{
                        marginBottom: '20px',
                        padding: '16px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                    }}
                >
                    <h3
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Closable Tabs Demo
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            color: '#64748b',
                            fontSize: '14px',
                        }}
                    >
                        Try closing different tabs using the X button. Notice
                        that the Home tab cannot be closed as it's marked as
                        default.
                    </p>
                </div>

                <Tabs
                    items={tabs}
                    value={activeTab}
                    onValueChange={setActiveTab}
                    onTabClose={handleTabClose}
                    variant={TabsVariant.BOXED}
                    size={TabsSize.MD}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates closable tabs with default tabs that cannot be closed. Shows how tab closing affects active tab selection.',
            },
        },
    },
}

// Advanced slot usage with badges, icons, and status indicators
export const AdvancedSlotUsage: Story = {
    render: () => (
        <div style={{ width: '800px', maxWidth: '90vw' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}
            >
                {/* Notification badges and status indicators */}
                <div>
                    <h4
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                        }}
                    >
                        Notification Badges & Status Indicators
                    </h4>
                    <Tabs
                        defaultValue="inbox"
                        variant={TabsVariant.FLOATING}
                        size={TabsSize.MD}
                    >
                        <TabsList>
                            <TabsTrigger
                                value="inbox"
                                variant={TabsVariant.FLOATING}
                                size={TabsSize.MD}
                                leftSlot={<Bell size={16} />}
                                rightSlot={
                                    <span
                                        style={{
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            borderRadius: '10px',
                                            padding: '2px 6px',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        5
                                    </span>
                                }
                            >
                                Inbox
                            </TabsTrigger>
                            <TabsTrigger
                                value="drafts"
                                variant={TabsVariant.FLOATING}
                                size={TabsSize.MD}
                                leftSlot={<FileText size={16} />}
                                rightSlot={
                                    <span
                                        style={{
                                            backgroundColor: '#f59e0b',
                                            color: 'white',
                                            borderRadius: '10px',
                                            padding: '2px 6px',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        3
                                    </span>
                                }
                            >
                                Drafts
                            </TabsTrigger>
                            <TabsTrigger
                                value="archive"
                                variant={TabsVariant.FLOATING}
                                size={TabsSize.MD}
                                leftSlot={<Archive size={16} />}
                            >
                                Archive
                            </TabsTrigger>
                            <TabsTrigger
                                value="sent"
                                variant={TabsVariant.FLOATING}
                                size={TabsSize.MD}
                                leftSlot={<Send size={16} />}
                                rightSlot={
                                    <div
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#10b981',
                                            borderRadius: '50%',
                                        }}
                                    />
                                }
                            >
                                Sent
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="inbox"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                You have 5 unread messages in your inbox.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="drafts"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                3 draft messages are waiting to be completed.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="archive"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Your archived messages are stored here.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="sent"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Successfully sent messages with online status
                                indicator.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Project status with emoji and progress */}
                <div>
                    <h4
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                        }}
                    >
                        Project Status with Progress Indicators
                    </h4>
                    <Tabs
                        defaultValue="frontend"
                        variant={TabsVariant.PILLS}
                        size={TabsSize.LG}
                    >
                        <TabsList>
                            <TabsTrigger
                                value="frontend"
                                variant={TabsVariant.PILLS}
                                size={TabsSize.LG}
                                leftSlot={
                                    <span style={{ fontSize: '16px' }}>⚛️</span>
                                }
                                rightSlot={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontSize: '12px',
                                            color: '#10b981',
                                        }}
                                    >
                                        <span>85%</span>
                                        <div
                                            style={{
                                                width: '20px',
                                                height: '4px',
                                                backgroundColor: '#e5e7eb',
                                                borderRadius: '2px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '85%',
                                                    height: '100%',
                                                    backgroundColor: '#10b981',
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                            >
                                Frontend
                            </TabsTrigger>
                            <TabsTrigger
                                value="backend"
                                variant={TabsVariant.PILLS}
                                size={TabsSize.LG}
                                leftSlot={
                                    <span style={{ fontSize: '16px' }}>🔧</span>
                                }
                                rightSlot={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontSize: '12px',
                                            color: '#f59e0b',
                                        }}
                                    >
                                        <span>62%</span>
                                        <div
                                            style={{
                                                width: '20px',
                                                height: '4px',
                                                backgroundColor: '#e5e7eb',
                                                borderRadius: '2px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '62%',
                                                    height: '100%',
                                                    backgroundColor: '#f59e0b',
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                            >
                                Backend
                            </TabsTrigger>
                            <TabsTrigger
                                value="testing"
                                variant={TabsVariant.PILLS}
                                size={TabsSize.LG}
                                leftSlot={
                                    <span style={{ fontSize: '16px' }}>🧪</span>
                                }
                                rightSlot={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontSize: '12px',
                                            color: '#ef4444',
                                        }}
                                    >
                                        <span>28%</span>
                                        <div
                                            style={{
                                                width: '20px',
                                                height: '4px',
                                                backgroundColor: '#e5e7eb',
                                                borderRadius: '2px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '28%',
                                                    height: '100%',
                                                    backgroundColor: '#ef4444',
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                            >
                                Testing
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="frontend"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Frontend development is 85% complete. React
                                components and styling are nearly finished.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="backend"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Backend APIs are 62% implemented. Core
                                functionality is working, authentication
                                pending.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="testing"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Testing coverage is at 28%. Unit tests started,
                                integration tests are next priority.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Advanced slot usage showcasing notification badges, status indicators, progress bars, and emoji icons.',
            },
        },
    },
}

// Real-world application scenarios
export const RealWorldScenarios: Story = {
    render: () => (
        <div style={{ width: '900px', maxWidth: '95vw' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                }}
            >
                {/* E-commerce admin panel */}
                <div>
                    <h4
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#374151',
                        }}
                    >
                        E-commerce Admin Panel
                    </h4>
                    <Tabs
                        defaultValue="orders"
                        variant={TabsVariant.UNDERLINE}
                        size={TabsSize.MD}
                    >
                        <TabsList>
                            <TabsTrigger
                                value="orders"
                                variant={TabsVariant.UNDERLINE}
                                size={TabsSize.MD}
                                leftSlot={<ShoppingCart size={16} />}
                                rightSlot={
                                    <span
                                        style={{
                                            backgroundColor: '#dc2626',
                                            color: 'white',
                                            borderRadius: '10px',
                                            padding: '2px 6px',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        23
                                    </span>
                                }
                            >
                                Orders
                            </TabsTrigger>
                            <TabsTrigger
                                value="products"
                                variant={TabsVariant.UNDERLINE}
                                size={TabsSize.MD}
                                leftSlot={<Package size={16} />}
                            >
                                Products
                            </TabsTrigger>
                            <TabsTrigger
                                value="customers"
                                variant={TabsVariant.UNDERLINE}
                                size={TabsSize.MD}
                                leftSlot={<Users size={16} />}
                                rightSlot={
                                    <span
                                        style={{
                                            width: '6px',
                                            height: '6px',
                                            backgroundColor: '#10b981',
                                            borderRadius: '50%',
                                            display: 'block',
                                        }}
                                    />
                                }
                            >
                                Customers
                            </TabsTrigger>
                            <TabsTrigger
                                value="analytics"
                                variant={TabsVariant.UNDERLINE}
                                size={TabsSize.MD}
                                leftSlot={<BarChart3 size={16} />}
                            >
                                Analytics
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="orders"
                            style={{
                                padding: '20px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '12px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '16px',
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: '18px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Recent Orders
                                </h3>
                                <span
                                    style={{
                                        color: '#dc2626',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    23 pending orders
                                </span>
                            </div>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                <div
                                    style={{
                                        padding: '12px',
                                        backgroundColor: '#fef2f2',
                                        border: '1px solid #fecaca',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span style={{ fontWeight: '500' }}>
                                            Order #1234
                                        </span>
                                        <span
                                            style={{
                                                color: '#dc2626',
                                                fontSize: '12px',
                                                backgroundColor: '#fee2e2',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            Pending
                                        </span>
                                    </div>
                                    <p
                                        style={{
                                            margin: '4px 0 0 0',
                                            fontSize: '14px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        $299.99 • John Doe • 2 items
                                    </p>
                                </div>
                                <div
                                    style={{
                                        padding: '12px',
                                        backgroundColor: '#f0fdf4',
                                        border: '1px solid #bbf7d0',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span style={{ fontWeight: '500' }}>
                                            Order #1235
                                        </span>
                                        <span
                                            style={{
                                                color: '#059669',
                                                fontSize: '12px',
                                                backgroundColor: '#d1fae5',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            Completed
                                        </span>
                                    </div>
                                    <p
                                        style={{
                                            margin: '4px 0 0 0',
                                            fontSize: '14px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        $149.50 • Jane Smith • 1 item
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="products"
                            style={{
                                padding: '20px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '12px',
                            }}
                        >
                            <h3
                                style={{
                                    margin: '0 0 16px 0',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                }}
                            >
                                Product Catalog
                            </h3>
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Manage your product inventory, pricing, and
                                descriptions. Add new products or update
                                existing ones.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="customers"
                            style={{
                                padding: '20px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '12px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '16px',
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: '18px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Customer Management
                                </h3>
                                <span
                                    style={{
                                        color: '#10b981',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Online now
                                </span>
                            </div>
                            <p style={{ margin: 0, color: '#64748b' }}>
                                View customer profiles, order history, and
                                support tickets. The green indicator shows
                                you're connected to real-time customer data.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="analytics"
                            style={{
                                padding: '20px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '12px',
                            }}
                        >
                            <h3
                                style={{
                                    margin: '0 0 16px 0',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                }}
                            >
                                Sales Analytics
                            </h3>
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Track sales performance, revenue trends, and
                                customer behavior patterns with detailed charts
                                and reports.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* File browser with different file types */}
                <div>
                    <h4
                        style={{
                            margin: '0 0 16px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#374151',
                        }}
                    >
                        File Browser with Type Indicators
                    </h4>
                    <Tabs
                        defaultValue="documents"
                        variant={TabsVariant.BOXED}
                        size={TabsSize.MD}
                    >
                        <TabsList fitContent>
                            <TabsTrigger
                                value="documents"
                                variant={TabsVariant.BOXED}
                                size={TabsSize.MD}
                                leftSlot={
                                    <span style={{ fontSize: '16px' }}>📄</span>
                                }
                                rightSlot={
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        24
                                    </span>
                                }
                            >
                                Documents
                            </TabsTrigger>
                            <TabsTrigger
                                value="images"
                                variant={TabsVariant.BOXED}
                                size={TabsSize.MD}
                                leftSlot={
                                    <span style={{ fontSize: '16px' }}>🖼️</span>
                                }
                                rightSlot={
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        156
                                    </span>
                                }
                            >
                                Images
                            </TabsTrigger>
                            <TabsTrigger
                                value="videos"
                                variant={TabsVariant.BOXED}
                                size={TabsSize.MD}
                                leftSlot={
                                    <span style={{ fontSize: '16px' }}>🎥</span>
                                }
                                rightSlot={
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        8
                                    </span>
                                }
                            >
                                Videos
                            </TabsTrigger>
                            <TabsTrigger
                                value="code"
                                variant={TabsVariant.BOXED}
                                size={TabsSize.MD}
                                leftSlot={
                                    <span style={{ fontSize: '16px' }}>💻</span>
                                }
                                rightSlot={
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        42
                                    </span>
                                }
                            >
                                Code
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="documents"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                24 documents including PDFs, Word files, and
                                spreadsheets. Recent files are shown first.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="images"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                156 images in various formats (JPG, PNG, SVG).
                                Organized by upload date and project folders.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="videos"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                8 video files including MP4 and MOV formats.
                                Thumbnails and duration shown for each file.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="code"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                42 code files across multiple programming
                                languages. Syntax highlighting available for
                                preview.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Real-world application scenarios including e-commerce admin panels and file browsers with contextual information.',
            },
        },
    },
}

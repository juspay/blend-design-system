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
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A flexible tabs component for organizing content into multiple panels with various visual styles and sizes. Built on Radix UI Tabs primitives for robust accessibility.

## Features
- Multiple variants (Boxed, Floating, Underline, Pills)
- Two sizes (Medium, Large)
- Support for icons in tab triggers
- Expandable tab lists
- Fit content option for tab lists
- **Dynamic tab management with newItem tabs**
- **Tab concatenation for shared content (TabA+TabB+TabC)**
- **MultiSelect integration for adding tabs**
- **Dropdown navigation for all tabs (including scrolled-out)**
- **Horizontal scrolling with sticky controls**
- Built on Radix UI primitives for accessibility

## Accessibility

**WCAG Compliance**: 2.2 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Proper ARIA attributes (aria-selected, aria-controls, aria-disabled)
- Semantic HTML structure with role="tab" and role="tabpanel"
- Comprehensive keyboard navigation (Arrow keys Left/Right, Home/End, Tab, Enter/Space)
- Screen reader support (VoiceOver/NVDA/JAWS)
- Decorative icons marked with aria-hidden="true"
- Interactive elements (close button, dropdown, add button) have proper accessible names
- Visible focus indicators for keyboard navigation
- Proper state management and announcements

**Level AAA Compliance**: ⚠️ Partial (7 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 2.3.3 Animation from Interactions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Interactive elements (tab triggers, close buttons) may not meet 44x44px minimum
- ℹ️ **Not Applicable**: 3.3.6 Error Prevention (All) - application-dependent

**Touch Target Sizes**:
- Tab triggers: ~40px height (meets AA 24px, may not meet AAA 44px depending on content)
- Close buttons: ~32px (meets AA 24px, does not meet AAA 44px)

**Keyboard Navigation**:
- **Tab**: Navigate to tabs list
- **Arrow Left/Right**: Navigate between tabs
- **Home/End**: Navigate to first/last tab
- **Enter/Space**: Activate selected tab
- **Tab (from tabs)**: Move to tab panel content

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Tabs.accessibility\` (40+ tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA/JAWS, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

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
    newItem: false, // Cannot be closed
  },
  {
    value: 'projects',
    label: 'Projects', 
    content: <div>Projects content</div>,
    newItem: true, // Can be closed
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
        expanded: {
            control: 'boolean',
            description:
                'When true, tabs expand to fill the full available width of their container. This is useful for creating evenly distributed tabs across the entire width, ensuring consistent spacing and a balanced visual appearance. When false, tabs only take up the space needed for their content.',
        },
        fitContent: {
            control: 'boolean',
            description:
                'When true, tabs automatically size to fit their content width rather than expanding or using default sizing. This is ideal when you want tabs to be compact and only take up the minimum space required. Useful for scenarios with varying tab label lengths where you want each tab to be sized individually based on its content.',
        },
        disable: {
            control: 'boolean',
            description:
                'When true, disables all tabs in the tab list, preventing user interaction. All tabs will be visually disabled and non-interactive. This is useful for temporarily disabling the entire tab component during loading states or when certain conditions prevent tab navigation. Individual tabs can still override this with their own disable prop.',
        },
        showSkeleton: {
            control: 'boolean',
            description:
                'When true, displays skeleton loading placeholders instead of the actual tab content. This provides visual feedback during data loading, preventing layout shifts and improving perceived performance. The skeleton state maintains the same dimensions and structure as the actual tabs, creating a smooth transition when content loads.',
        },
        skeletonVariant: {
            control: 'select',
            options: ['pulse', 'wave', 'shimmer'],
            description:
                'Determines the animation style for skeleton loading states. "pulse" creates a gentle fade in/out effect, "wave" creates a shimmer wave animation that moves across the skeleton, and "shimmer" creates a bright shimmer effect. Use this to match your application\'s loading animation style or to differentiate loading states.',
        },
        stickyHeader: {
            control: 'boolean',
            description:
                'When true, makes the tab listing header stick to the top of its container when scrolling. This keeps the tab navigation visible while scrolling through long tab content. The header will have position: sticky, top: 0, and a z-index to stay above other content.',
        },
        offsetTop: {
            control: 'number',
            description:
                'Optional number value that sets the top offset in pixels for the sticky header. Only applies when stickyHeader is true. Defaults to 0.',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

// ============================================================================
// Story Categories
// ============================================================================
// Organize stories into logical groups:
// 1. Basic Usage
// 2. Dynamic Tab Management
// 3. Visual Variants & Sizes
// 4. Content Variations (icons, slots)
// 5. Advanced Features
// 6. Real-World Examples
// 7. Accessibility Testing
// ============================================================================

// ============================================================================
// Basic Usage
// ============================================================================

/**
 * Default tabs with traditional usage
 */
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
    parameters: {
        docs: {
            description: {
                story: 'Default tabs with traditional usage pattern. All tabs maintain proper ARIA attributes and keyboard navigation.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Dynamic Tab Management
// ============================================================================

/**
 * Dynamic tab management with newItem tabs, MultiSelect integration, and dropdown navigation
 */
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
            // Tabs without newItem - cannot be closed
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
                            This is a tab that cannot be closed.
                        </p>
                    </div>
                ),
                newItem: false,
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
                            Another tab that cannot be closed. Notice it doesn't
                            have an X button.
                        </p>
                    </div>
                ),
                newItem: false,
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
                    newItem: true,
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
                            Tabs (Dashboard, Overview) without newItem cannot be
                            closed
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
                story: 'Complete dynamic tab management with newItem tabs, MultiSelect integration, concatenation, and navigation dropdown. All interactive elements maintain proper accessibility.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Tab concatenation demo
 */
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
                newItem: false,
            },
            {
                value: 'analytics',
                label: 'Analytics',
                content: sharedContent,
                newItem: true,
            },
            {
                value: 'reports',
                label: 'Reports',
                content: sharedContent,
                newItem: true,
            },
            {
                value: 'dashboards',
                label: 'Dashboards',
                content: sharedContent,
                newItem: true,
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
                newItem: true,
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
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates automatic tab concatenation when multiple tabs share the same content. Concatenated tabs maintain proper ARIA attributes.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Visual Variants & Sizes
// ============================================================================

/**
 * Different visual variants: boxed, floating, underline, and pills styles
 */
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
                story: 'Different visual variants: boxed, floating, underline, and pills styles. All variants maintain proper keyboard navigation and ARIA attributes.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Different tab sizes: medium and large
 */
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
                story: 'Different tab sizes: medium and large for various use cases. All sizes maintain proper touch target sizes and accessibility.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Content Variations
// ============================================================================

/**
 * Tabs with icons in the left slot
 */
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
                story: 'Tabs with icons in the left slot to enhance visual identification. Icons are marked with aria-hidden="true" when decorative.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Expanded tabs that take full width
 */
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
                story: 'Expanded tabs that take the full width of their container for better space utilization. Maintains proper keyboard navigation.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Tabs with fitContent option
 */
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
                story: 'Tabs with fitContent option that only take the space needed for their content. Maintains accessibility features.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Advanced Features
// ============================================================================

/**
 * Complex example with mixed features
 */
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
                story: 'A complex example showcasing tabs with icons, badges, and rich content areas. All interactive elements maintain proper accessibility.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Tabs with newItem property to control closability
 */
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
                            Welcome! This tab cannot be closed. It serves as
                            your home base.
                        </p>
                    </div>
                ),
                newItem: false,
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
                newItem: true,
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
                            Generate and export reports. This tab can be closed
                            for a cleaner interface.
                        </p>
                    </div>
                ),
                newItem: true,
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
                newItem: true,
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
                        Tabs with newItem Demo
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            color: '#64748b',
                            fontSize: '14px',
                        }}
                    >
                        Try closing different tabs using the X button. Notice
                        that the Home tab cannot be closed as it has newItem set
                        to false.
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
                story: 'Demonstrates tabs with newItem property to control closability. Shows how tab closing affects active tab selection. Close buttons have proper aria-label attributes.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

/**
 * Advanced slot usage with badges, icons, and status indicators
 */
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
                story: 'Advanced slot usage showcasing notification badges, status indicators, progress bars, and emoji icons. Decorative elements are properly marked with aria-hidden.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Real-World Examples
// ============================================================================

/**
 * Real-world application scenarios
 */
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
                story: 'Real-world application scenarios including e-commerce admin panels and file browsers with contextual information. All examples maintain proper accessibility.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples
 */
export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '24px',
                maxWidth: '900px',
            }}
        >
            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Attributes
                </h3>
                <div style={{ width: '600px' }}>
                    <Tabs defaultValue="aria-1" variant={TabsVariant.BOXED}>
                        <TabsList>
                            <TabsTrigger value="aria-1">
                                ARIA Selected
                            </TabsTrigger>
                            <TabsTrigger value="aria-2">
                                ARIA Controls
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="aria-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Tab triggers have aria-selected attribute that
                                updates based on state (true/false). Check
                                Accessibility panel to verify.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="aria-2"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Each trigger has aria-controls linking to its
                                tabpanel, establishing proper relationships.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h3>
                <div style={{ width: '600px' }}>
                    <Tabs defaultValue="keyboard-1" variant={TabsVariant.BOXED}>
                        <TabsList>
                            <TabsTrigger value="keyboard-1">
                                Tab Navigation
                            </TabsTrigger>
                            <TabsTrigger value="keyboard-2">
                                Arrow Keys
                            </TabsTrigger>
                            <TabsTrigger value="keyboard-3">
                                Home/End Keys
                            </TabsTrigger>
                            <TabsTrigger value="keyboard-4">
                                Enter/Space
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="keyboard-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Tab to focus tabs list. Each tab trigger is
                                keyboard accessible.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="keyboard-2"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Use Arrow Left/Right keys to navigate between
                                tabs.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="keyboard-3"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Press Home to go to first tab, End to go to last
                                tab.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="keyboard-4"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Press Enter or Space to activate the selected
                                tab.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Semantic Roles
                </h3>
                <div style={{ width: '600px' }}>
                    <Tabs defaultValue="role-1" variant={TabsVariant.BOXED}>
                        <TabsList>
                            <TabsTrigger value="role-1">role="tab"</TabsTrigger>
                            <TabsTrigger value="role-2">
                                role="tabpanel"
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="role-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Tab triggers have role="tab" for proper semantic
                                structure. Check Accessibility panel to verify.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="role-2"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Tab panels have role="tabpanel" to establish
                                proper relationships with tabs.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Decorative Icons
                </h3>
                <div style={{ width: '600px' }}>
                    <Tabs defaultValue="icon-1" variant={TabsVariant.BOXED}>
                        <TabsList>
                            <TabsTrigger
                                value="icon-1"
                                leftSlot={<User size={16} />}
                            >
                                Icon with aria-hidden
                            </TabsTrigger>
                            <TabsTrigger
                                value="icon-2"
                                leftSlot={<Shield size={16} />}
                            >
                                Decorative Icon
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="icon-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Decorative icons in leftSlot are marked with
                                aria-hidden="true" to hide them from screen
                                readers.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="icon-2"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Icons are decorative and properly hidden from
                                assistive technologies.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Focus Indicators
                </h3>
                <div style={{ width: '600px' }}>
                    <Tabs defaultValue="focus-1" variant={TabsVariant.BOXED}>
                        <TabsList>
                            <TabsTrigger value="focus-1">Focus Me</TabsTrigger>
                            <TabsTrigger value="focus-2">
                                Focus Me Too
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="focus-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Tab to focus this tab trigger. You should see a
                                visible focus indicator.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="focus-2"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                All tab triggers have visible focus indicators
                                for keyboard navigation.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Disabled State
                </h3>
                <div style={{ width: '600px' }}>
                    <Tabs defaultValue="enabled-1" variant={TabsVariant.BOXED}>
                        <TabsList>
                            <TabsTrigger value="enabled-1">
                                Enabled Tab
                            </TabsTrigger>
                            <TabsTrigger value="disabled-1" disabled>
                                Disabled Tab
                            </TabsTrigger>
                            <TabsTrigger value="enabled-2">
                                Another Enabled
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="enabled-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                This tab is enabled and can be activated.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="disabled-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                This tab is disabled and has
                                aria-disabled="true". Arrow key navigation skips
                                disabled tabs.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="enabled-2"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Arrow key navigation skips disabled tabs.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Screen Reader Support
                </h3>
                <div style={{ width: '600px' }}>
                    <Tabs defaultValue="sr-1" variant={TabsVariant.BOXED}>
                        <TabsList>
                            <TabsTrigger value="sr-1">
                                State Announcements
                            </TabsTrigger>
                            <TabsTrigger value="sr-2">
                                Tab Navigation
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="sr-1"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Screen readers announce when tabs are selected
                                via aria-selected changes. Tab panels are
                                properly associated with their triggers.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="sr-2"
                            style={{
                                padding: '16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                marginTop: '8px',
                            }}
                        >
                            <p style={{ margin: 0, color: '#64748b' }}>
                                Screen readers announce tab count, current tab
                                position, and tab labels for navigation context.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Interactive Elements (Close Button, Dropdown, Add Button)
                </h3>
                <div style={{ width: '700px' }}>
                    <Tabs
                        items={[
                            {
                                value: 'tab1',
                                label: 'Tab 1',
                                content: (
                                    <p style={{ margin: 0, color: '#64748b' }}>
                                        Close button has aria-label for
                                        accessibility.
                                    </p>
                                ),
                                newItem: true,
                            },
                            {
                                value: 'tab2',
                                label: 'Tab 2',
                                content: (
                                    <p style={{ margin: 0, color: '#64748b' }}>
                                        Dropdown and add buttons have proper
                                        accessible names via aria-label.
                                    </p>
                                ),
                                newItem: true,
                            },
                        ]}
                        defaultValue="tab1"
                        showDropdown={true}
                        showAddButton={true}
                        dropdownTooltip="Navigate to any tab"
                        addButtonTooltip="Add new tab"
                        variant={TabsVariant.BOXED}
                    />
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating ARIA attributes, keyboard navigation, semantic roles, decorative icons, focus indicators, disabled states, screen reader support, and interactive elements.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0)
   - Review passing tests (12+)
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test Tabs.accessibility
   \`\`\`
   - 40+ automated tests
   - WCAG compliance verification
   - ARIA attribute validation

3. **Chromatic visual tests**:
   \`\`\`bash
   pnpm chromatic
   \`\`\`
   - Focus ring visibility
   - State changes
   - Responsive behavior

4. **Manual testing**:
   - VoiceOver (macOS), NVDA (Windows), or JAWS
   - Keyboard navigation (Tab, Arrow keys, Home/End, Enter/Space)
   - Color contrast verification

## Accessibility Report

**Current Status**: 
- ✅ **WCAG 2.2 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.2 Level AAA**: Partial Compliance (7/9 applicable criteria compliant)

**AAA Compliance Details**:
- ✅ Compliant: Visual Presentation (1.4.8), Images of Text (1.4.9), Keyboard No Exception (2.1.3), No Timing (2.2.3), Interruptions (2.2.4), Animation from Interactions (2.3.3), Change on Request (3.2.5)
- ❌ Needs Improvement: Contrast Enhanced (1.4.6) - requires 7:1 ratio, Target Size (2.5.5) - Interactive elements need 44x44px
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis

**Key Accessibility Features**:
- Proper ARIA attributes (aria-selected, aria-controls, aria-disabled)
- Semantic HTML structure with role="tab" and role="tabpanel"
- Comprehensive keyboard navigation (Arrow Left/Right, Home/End, Tab, Enter/Space)
- Decorative icons marked with aria-hidden="true"
- Visible focus indicators
- Disabled tabs properly handled with aria-disabled
- Interactive elements (close button, dropdown, add button) have proper accessible names
- Built on Radix UI with robust accessibility features
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

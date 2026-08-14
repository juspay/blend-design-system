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
} from '@juspay/blend-design-system/deprecated/tabs'
import { MultiSelect } from '@juspay/blend-design-system/deprecated/multi-select'
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
} from '../../../../.storybook/a11y.config'

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A flexible tabs component for organizing content into multiple panels with various visual styles and sizes.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsVariant } from '@juspay/blend-design-system/deprecated/tabs';

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

## Features
- Multiple variants (Boxed, Floating, Underline, Pills)
- Three sizes (Small, Medium, Large)
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
            table: {
                type: {
                    summary: 'TabItem[]',
                    detail: `TabItem: {
  value: string;                      // Unique identifier for the tab (required)
  label: string;                      // Display text for the tab (required)
  content: ReactNode;                 // Tab panel content (required)
  disable?: boolean;                  // Disable this tab
  showSkeleton?: boolean;             // Show skeleton loading state
  skeletonVariant?: 'pulse' | 'wave'; // Skeleton animation variant
  leftSlot?: ReactNode;               // Icon/content on left of label
  rightSlot?: ReactNode;              // Icon/content on right of label
  newItem?: boolean;                  // Highlight as new item
}`,
                },
                category: 'Data',
            },
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
        <div className="w-125">
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
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Account Settings
                    </h3>
                    <p className="m-0 text-slate-500">
                        Manage your account settings and preferences here. You
                        can update your profile information, change your email
                        address, and configure other account-related options.
                    </p>
                </TabsContent>
                <TabsContent
                    value="password"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Password & Security
                    </h3>
                    <p className="m-0 text-slate-500">
                        Update your password and manage security settings.
                        Enable two-factor authentication and review your recent
                        login activity to keep your account secure.
                    </p>
                </TabsContent>
                <TabsContent
                    value="settings"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        General Settings
                    </h3>
                    <p className="m-0 text-slate-500">
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
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="m-0 mb-3 text-base font-semibold">
                    Shared Content
                </h3>
                <p className="m-0 text-slate-500">
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
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Dashboard Content
                        </h3>
                        <p className="m-0 text-blue-800">
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
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Overview Content
                        </h3>
                        <p className="m-0 text-green-800">
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
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h3 className="m-0 mb-3 text-base font-semibold">
                                {item.label} Content
                            </h3>
                            <p className="m-0 text-violet-600">
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
            <div className="w-200 max-w-[90vw]">
                <div className="mb-5 p-4 bg-gray-50 rounded-lg">
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Enhanced Tab Features
                    </h3>
                    <ul className="m-0 pl-5 text-slate-500 text-sm">
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
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-125 w-[90%] m-4">
                            <h3 className="m-0 mb-4 text-lg font-semibold">
                                Add New Tabs
                            </h3>
                            <p className="m-0 mb-4 text-slate-500">
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
            <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="m-0 mb-3 text-base font-semibold">
                    Concatenated Tab Content
                </h3>
                <p className="m-0 text-amber-800">
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
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Home Content
                        </h3>
                        <p className="m-0 text-blue-800">
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
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Settings Content
                        </h3>
                        <p className="m-0 text-green-800">
                            This is unique content for the Settings tab.
                        </p>
                    </div>
                ),
                newItem: true,
            },
        ])

        const [activeTab, setActiveTab] = useState('home')

        return (
            <div className="w-175 max-w-[90vw]">
                <div className="mb-5 p-4 bg-amber-50 rounded-lg">
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Tab Concatenation Example
                    </h3>
                    <p className="m-0 text-amber-800 text-sm">
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
        <div className="flex flex-col gap-8 w-125">
            <div>
                <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Overview content with boxed tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Reports content with data visualization.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Overview content with floating tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Reports content with data visualization.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Overview content with underline tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Reports content with data visualization.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Overview content with pills tab styling.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Analytics content with detailed metrics.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
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
 * Different tab sizes: small, medium, and large
 */
export const TabSizes: Story = {
    args: {
        defaultValue: 'tab1',
        variant: TabsVariant.BOXED,
        size: TabsSize.MD,
    },
    render: (args: any) => (
        <div className="flex flex-col gap-8 w-125">
            <div>
                <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
                    Small Size
                </h4>
                <Tabs
                    defaultValue={args.defaultValue}
                    value={args.value}
                    onValueChange={args.onValueChange}
                >
                    <TabsList variant={args.variant} size={TabsSize.SM}>
                        <TabsTrigger
                            value="tab1"
                            variant={args.variant}
                            size={TabsSize.SM}
                        >
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab2"
                            variant={args.variant}
                            size={TabsSize.SM}
                        >
                            Projects
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab3"
                            variant={args.variant}
                            size={TabsSize.SM}
                        >
                            Team
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="tab1"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Dashboard content in small size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Projects content in small size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Team content in small size tabs.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Dashboard content in medium size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Projects content in medium size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Team content in medium size tabs.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Dashboard content in large size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab2"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
                            Projects content in large size tabs.
                        </p>
                    </TabsContent>
                    <TabsContent
                        value="tab3"
                        className="p-4 border border-slate-200 rounded-lg mt-2"
                    >
                        <p className="m-0 text-slate-500">
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
                story: 'Different tab sizes: small, medium, and large for various use cases. All sizes maintain proper touch target sizes and accessibility.',
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
        <div className="w-150">
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
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Profile Information
                    </h3>
                    <p className="m-0 text-slate-500">
                        Update your personal information, profile picture, and
                        bio. This information will be visible to other users in
                        your organization.
                    </p>
                </TabsContent>
                <TabsContent
                    value="security"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Security Settings
                    </h3>
                    <p className="m-0 text-slate-500">
                        Manage your password, two-factor authentication, and
                        review recent login activity. Keep your account secure
                        with these security features.
                    </p>
                </TabsContent>
                <TabsContent
                    value="notifications"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Notification Preferences
                    </h3>
                    <p className="m-0 text-slate-500">
                        Configure how and when you receive notifications. Choose
                        your preferred channels and frequency for different
                        types of updates.
                    </p>
                </TabsContent>
                <TabsContent
                    value="billing"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Billing & Subscription
                    </h3>
                    <p className="m-0 text-slate-500">
                        View your current subscription, payment methods, and
                        billing history. Upgrade or downgrade your plan as
                        needed.
                    </p>
                </TabsContent>
                <TabsContent
                    value="help"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Help & Support
                    </h3>
                    <p className="m-0 text-slate-500">
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
        <div className="w-full max-w-200">
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
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Overview Dashboard
                    </h3>
                    <p className="m-0 text-slate-500">
                        Get a high-level view of your key metrics and
                        performance indicators. This expanded tab layout
                        provides more space for navigation.
                    </p>
                </TabsContent>
                <TabsContent
                    value="analytics"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Analytics & Insights
                    </h3>
                    <p className="m-0 text-slate-500">
                        Dive deep into your data with detailed analytics and
                        insights. Track trends, identify patterns, and make
                        data-driven decisions.
                    </p>
                </TabsContent>
                <TabsContent
                    value="reports"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Reports & Export
                    </h3>
                    <p className="m-0 text-slate-500">
                        Generate and export detailed reports for your
                        stakeholders. Schedule automated reports and customize
                        the data included.
                    </p>
                </TabsContent>
                <TabsContent
                    value="settings"
                    className="p-5 border border-slate-200 rounded-lg mt-2"
                >
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Configuration Settings
                    </h3>
                    <p className="m-0 text-slate-500">
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
        <div className="w-100">
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
                    className="p-4 border border-slate-200 rounded-lg mt-2"
                >
                    <p className="m-0 text-slate-500">
                        Welcome to the home page. This tab list fits its content
                        width.
                    </p>
                </TabsContent>
                <TabsContent
                    value="about"
                    className="p-4 border border-slate-200 rounded-lg mt-2"
                >
                    <p className="m-0 text-slate-500">
                        Learn more about us on this about page.
                    </p>
                </TabsContent>
                <TabsContent
                    value="contact"
                    className="p-4 border border-slate-200 rounded-lg mt-2"
                >
                    <p className="m-0 text-slate-500">
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
                    <div className="p-4 bg-sky-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Home Dashboard
                        </h3>
                        <p className="m-0 text-sky-700">
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
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Analytics Dashboard
                        </h3>
                        <p className="m-0 text-green-800">
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
                    <div className="p-4 bg-amber-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Reports Center
                        </h3>
                        <p className="m-0 text-amber-800">
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
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="m-0 mb-3 text-base font-semibold">
                            Configuration Settings
                        </h3>
                        <p className="m-0 text-violet-600">
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
            <div className="w-175 max-w-[90vw]">
                <div className="mb-5 p-4 bg-gray-50 rounded-lg">
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Tabs with newItem Demo
                    </h3>
                    <p className="m-0 text-slate-500 text-sm">
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
        <div className="w-200 max-w-[90vw]">
            <div className="flex flex-col gap-8">
                {/* Notification badges and status indicators */}
                <div>
                    <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                                    <span className="bg-red-500 text-white rounded-[10px] px-1.5 py-0.5 text-[10px] font-semibold">
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
                                    <span className="bg-amber-500 text-white rounded-[10px] px-1.5 py-0.5 text-[10px] font-semibold">
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
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                }
                            >
                                Sent
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="inbox"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                You have 5 unread messages in your inbox.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="drafts"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                3 draft messages are waiting to be completed.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="archive"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                Your archived messages are stored here.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="sent"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                Successfully sent messages with online status
                                indicator.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Project status with emoji and progress */}
                <div>
                    <h4 className="m-0 mb-4 text-sm font-semibold text-gray-700">
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
                                leftSlot={<span className="text-base">⚛️</span>}
                                rightSlot={
                                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                                        <span>85%</span>
                                        <div className="w-5 h-1 bg-gray-200 rounded-sm overflow-hidden">
                                            <div className="w-[85%] h-full bg-emerald-500" />
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
                                leftSlot={<span className="text-base">🔧</span>}
                                rightSlot={
                                    <div className="flex items-center gap-1 text-xs text-amber-500">
                                        <span>62%</span>
                                        <div className="w-5 h-1 bg-gray-200 rounded-sm overflow-hidden">
                                            <div className="w-[62%] h-full bg-amber-500" />
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
                                leftSlot={<span className="text-base">🧪</span>}
                                rightSlot={
                                    <div className="flex items-center gap-1 text-xs text-red-500">
                                        <span>28%</span>
                                        <div className="w-5 h-1 bg-gray-200 rounded-sm overflow-hidden">
                                            <div className="w-[28%] h-full bg-red-500" />
                                        </div>
                                    </div>
                                }
                            >
                                Testing
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="frontend"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                Frontend development is 85% complete. React
                                components and styling are nearly finished.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="backend"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                Backend APIs are 62% implemented. Core
                                functionality is working, authentication
                                pending.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="testing"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
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
        <div className="w-225 max-w-[95vw]">
            <div className="flex flex-col gap-10">
                {/* E-commerce admin panel */}
                <div>
                    <h4 className="m-0 mb-4 text-base font-semibold text-gray-700">
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
                                    <span className="bg-red-600 text-white rounded-[10px] px-1.5 py-0.5 text-[10px] font-semibold">
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
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full block" />
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
                            className="p-5 border border-slate-200 rounded-lg mt-3"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="m-0 text-lg font-semibold">
                                    Recent Orders
                                </h3>
                                <span className="text-red-600 text-sm font-medium">
                                    23 pending orders
                                </span>
                            </div>
                            <div className="grid gap-3">
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            Order #1234
                                        </span>
                                        <span className="text-red-600 text-xs bg-red-100 px-2 py-0.5 rounded">
                                            Pending
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        $299.99 • John Doe • 2 items
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            Order #1235
                                        </span>
                                        <span className="text-emerald-600 text-xs bg-emerald-100 px-2 py-0.5 rounded">
                                            Completed
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        $149.50 • Jane Smith • 1 item
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="products"
                            className="p-5 border border-slate-200 rounded-lg mt-3"
                        >
                            <h3 className="m-0 mb-4 text-lg font-semibold">
                                Product Catalog
                            </h3>
                            <p className="m-0 text-slate-500">
                                Manage your product inventory, pricing, and
                                descriptions. Add new products or update
                                existing ones.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="customers"
                            className="p-5 border border-slate-200 rounded-lg mt-3"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="m-0 text-lg font-semibold">
                                    Customer Management
                                </h3>
                                <span className="text-emerald-500 text-sm font-medium">
                                    Online now
                                </span>
                            </div>
                            <p className="m-0 text-slate-500">
                                View customer profiles, order history, and
                                support tickets. The green indicator shows
                                you're connected to real-time customer data.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="analytics"
                            className="p-5 border border-slate-200 rounded-lg mt-3"
                        >
                            <h3 className="m-0 mb-4 text-lg font-semibold">
                                Sales Analytics
                            </h3>
                            <p className="m-0 text-slate-500">
                                Track sales performance, revenue trends, and
                                customer behavior patterns with detailed charts
                                and reports.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* File browser with different file types */}
                <div>
                    <h4 className="m-0 mb-4 text-base font-semibold text-gray-700">
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
                                leftSlot={<span className="text-base">📄</span>}
                                rightSlot={
                                    <span className="text-xs text-gray-500">
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
                                leftSlot={<span className="text-base">🖼️</span>}
                                rightSlot={
                                    <span className="text-xs text-gray-500">
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
                                leftSlot={<span className="text-base">🎥</span>}
                                rightSlot={
                                    <span className="text-xs text-gray-500">
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
                                leftSlot={<span className="text-base">💻</span>}
                                rightSlot={
                                    <span className="text-xs text-gray-500">
                                        42
                                    </span>
                                }
                            >
                                Code
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="documents"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                24 documents including PDFs, Word files, and
                                spreadsheets. Recent files are shown first.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="images"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                156 images in various formats (JPG, PNG, SVG).
                                Organized by upload date and project folders.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="videos"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
                                8 video files including MP4 and MOV formats.
                                Thumbnails and duration shown for each file.
                            </p>
                        </TabsContent>
                        <TabsContent
                            value="code"
                            className="p-4 border border-slate-200 rounded-lg mt-2"
                        >
                            <p className="m-0 text-slate-500">
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
// Skeleton Loading States
// ============================================================================

/**
 * Tabs with skeleton loading states
 */
export const SkeletonLoading: Story = {
    render: () => {
        const [loading, setLoading] = useState(true)
        const [variant, setVariant] = useState<'pulse' | 'wave' | 'shimmer'>(
            'pulse'
        )

        const skeletonItems: TabItem[] = [
            {
                value: 'overview',
                label: 'Overview',
                content: <div>Overview content loaded!</div>,
                showSkeleton: loading,
                skeletonVariant: variant,
            },
            {
                value: 'analytics',
                label: 'Analytics',
                content: <div>Analytics content loaded!</div>,
                showSkeleton: loading,
                skeletonVariant: variant,
            },
            {
                value: 'reports',
                label: 'Reports',
                content: <div>Reports content loaded!</div>,
                showSkeleton: loading,
                skeletonVariant: variant,
            },
        ]

        return (
            <div className="w-150">
                <div className="mb-5 p-4 bg-gray-50 rounded-lg">
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Skeleton Loading Demo
                    </h3>
                    <p className="m-0 mb-4 text-slate-500 text-sm">
                        Toggle loading state to see skeleton placeholders.
                        Select different animation variants.
                    </p>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setLoading(!loading)}
                            className={`px-4 py-2 text-white border-none rounded-md cursor-pointer text-sm ${loading ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        >
                            {loading ? 'Load Content' : 'Show Skeleton'}
                        </button>
                        <select
                            value={variant}
                            onChange={(e) =>
                                setVariant(
                                    e.target.value as
                                        | 'pulse'
                                        | 'wave'
                                        | 'shimmer'
                                )
                            }
                            className="px-3 py-2 rounded-md border border-slate-200 text-sm"
                        >
                            <option value="pulse">Pulse</option>
                            <option value="wave">Wave</option>
                            <option value="shimmer">Shimmer</option>
                        </select>
                    </div>
                </div>

                <Tabs
                    items={skeletonItems}
                    defaultValue="overview"
                    showSkeleton={loading}
                    skeletonVariant={variant}
                />

                <div className="mt-5 p-4 bg-sky-50 rounded-lg text-sm">
                    <strong>Features:</strong>
                    <ul className="mt-2 pl-5 text-slate-500">
                        <li>
                            <code>showSkeleton</code>: Displays loading
                            placeholders
                        </li>
                        <li>
                            <code>skeletonVariant</code>: Choose pulse, wave, or
                            shimmer animation
                        </li>
                        <li>Maintains tab structure during loading</li>
                        <li>Smooth transition when content loads</li>
                    </ul>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates skeleton loading states with different animation variants (pulse, wave, shimmer). Useful for showing loading feedback while tab content is being fetched.',
            },
        },
    },
}

// ============================================================================
// Sticky Header
// ============================================================================

/**
 * Tabs with sticky header for long content
 */
export const StickyHeader: Story = {
    render: () => {
        const [isSticky, setIsSticky] = useState(true)
        const [offsetTop, setOffsetTop] = useState(0)

        const longContentItems: TabItem[] = [
            {
                value: 'section1',
                label: 'Section 1',
                content: (
                    <div className="p-5">
                        <h3>Scrollable Content Section 1</h3>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <p key={i} className="leading-loose text-slate-500">
                                Paragraph {i + 1}: Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed do eiusmod
                                tempor incididunt ut labore et dolore magna
                                aliqua.
                            </p>
                        ))}
                    </div>
                ),
            },
            {
                value: 'section2',
                label: 'Section 2',
                content: (
                    <div className="p-5">
                        <h3>Scrollable Content Section 2</h3>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <p key={i} className="leading-loose text-slate-500">
                                Paragraph {i + 1}: Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                        ))}
                    </div>
                ),
            },
            {
                value: 'section3',
                label: 'Section 3',
                content: (
                    <div className="p-5">
                        <h3>Scrollable Content Section 3</h3>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <p key={i} className="leading-loose text-slate-500">
                                Paragraph {i + 1}: Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur.
                            </p>
                        ))}
                    </div>
                ),
            },
        ]

        return (
            <div className="w-150">
                <div className="mb-5 p-4 bg-gray-50 rounded-lg">
                    <h3 className="m-0 mb-3 text-base font-semibold">
                        Sticky Header Demo
                    </h3>
                    <p className="m-0 mb-4 text-slate-500 text-sm">
                        Scroll down in the content area below. The tab header
                        stays visible when sticky is enabled.
                    </p>
                    <div className="flex gap-3 items-center flex-wrap">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={isSticky}
                                onChange={(e) => setIsSticky(e.target.checked)}
                            />
                            Enable Sticky Header
                        </label>
                        <div className="flex items-center gap-2">
                            <label className="text-sm">Offset Top:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={offsetTop}
                                onChange={(e) =>
                                    setOffsetTop(Number(e.target.value))
                                }
                                className="w-25"
                            />
                            <span className="text-sm min-w-10">
                                {offsetTop}px
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-100 overflow-auto border border-slate-200 rounded-lg">
                    <Tabs
                        items={longContentItems}
                        defaultValue="section1"
                        stickyHeader={isSticky}
                        offsetTop={offsetTop}
                    />
                </div>

                <div className="mt-5 p-4 bg-green-50 rounded-lg text-sm">
                    <strong>Features:</strong>
                    <ul className="mt-2 pl-5 text-slate-500">
                        <li>
                            <code>stickyHeader</code>: Keeps tabs visible while
                            scrolling
                        </li>
                        <li>
                            <code>offsetTop</code>: Adjust sticky position
                            (0-100px)
                        </li>
                        <li>Useful for long tab content</li>
                        <li>Maintains context during navigation</li>
                    </ul>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates sticky header functionality that keeps tab navigation visible while scrolling through long content. Includes offset top adjustment for fine-tuning the sticky position.',
            },
        },
    },
}

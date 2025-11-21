import { useState } from 'react'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    TabsSize,
    TabItem,
} from '../../../../packages/blend/lib/components/Tabs'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import {
    MultiSelect,
    MultiSelectVariant,
} from '../../../../packages/blend/lib/components/MultiSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import Modal from '../../../../packages/blend/lib/components/Modal/Modal'
import {
    Home,
    User,
    Settings,
    FileText,
    BarChart3,
    Mail,
    Bell,
    Star,
    Heart,
    Download,
    Upload,
    Trash2,
} from 'lucide-react'

const sharedContent = (
    <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Shared Content</h3>
        <p className="text-gray-600">
            This content is shared between multiple tabs. When multiple tabs
            have the same content, their labels are concatenated (e.g.,
            "TabA+TabB+TabC"). Max 3 items can be concatenated.
        </p>
    </div>
)

const availableTabOptions = [
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
    { value: 'settings', label: 'Settings' },
    { value: 'documents', label: 'Documents' },
    { value: 'uploads', label: 'Uploads' },
    { value: 'downloads', label: 'Downloads' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'users', label: 'Users' },
    { value: 'permissions', label: 'Permissions' },
]

const TabsDemo = () => {
    // Playground state
    const [playgroundVariant, setPlaygroundVariant] = useState<TabsVariant>(
        TabsVariant.UNDERLINE
    )
    const [playgroundSize, setPlaygroundSize] = useState<TabsSize>(TabsSize.MD)
    const [expanded, setExpanded] = useState(false)
    const [fitContent, setFitContent] = useState(false)
    const [showIcons, setShowIcons] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(false)
    const [activeTab, setActiveTab] = useState('tab1')

    // Enhanced tabs state - default tabs always at front
    const [enhancedTabs, setEnhancedTabs] = useState<TabItem[]>([
        // Default tabs - always visible at front, no X icon
        {
            value: 'home',
            label: 'Home',
            content: (
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Home Content</h3>
                    <p className="text-blue-600">
                        This is a default tab that cannot be closed. Default
                        tabs are always visible at the front.
                    </p>
                </div>
            ),
            isDefault: true,
        },
        {
            value: 'dashboard',
            label: 'Dashboard',
            content: (
                <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                        Dashboard Content
                    </h3>
                    <p className="text-green-600">
                        Another default tab. Notice it doesn't have an X button
                        and stays at the front.
                    </p>
                </div>
            ),
            isDefault: true,
        },
    ])

    const [enhancedActiveTab, setEnhancedActiveTab] = useState('home')
    const [showEnhancedDropdown, setShowEnhancedDropdown] = useState(true)
    const [showEnhancedAddButton, setShowEnhancedAddButton] = useState(true)

    // MultiSelect state
    const [selectedTabsToAdd, setSelectedTabsToAdd] = useState<string[]>([])
    const [showMultiSelect, setShowMultiSelect] = useState(false)

    // Disabled state demo
    const [globalDisable, setGlobalDisable] = useState(false)

    // Skeleton state demo
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [skeletonVariant, setSkeletonVariant] = useState<
        'pulse' | 'wave' | 'shimmer'
    >('pulse')

    // Options for selects
    const variantOptions = [
        { value: TabsVariant.BOXED, label: 'Boxed' },
        { value: TabsVariant.FLOATING, label: 'Floating' },
        { value: TabsVariant.UNDERLINE, label: 'Underline' },
        { value: TabsVariant.PILLS, label: 'Pills' },
    ]

    const sizeOptions = [
        { value: TabsSize.MD, label: 'Medium' },
        { value: TabsSize.LG, label: 'Large' },
    ]

    const getIconForTab = (tabId: string) => {
        switch (tabId) {
            case 'tab1':
                return <Home size={16} />
            case 'tab2':
                return <User size={16} />
            case 'tab3':
                return <Settings size={16} />
            case 'tab4':
                return <FileText size={16} />
            default:
                return <Home size={16} />
        }
    }

    const getRightSlotForTab = (tabId: string) => {
        switch (tabId) {
            case 'tab1':
                return <Star size={14} />
            case 'tab2':
                return <Heart size={14} />
            case 'tab3':
                return <Bell size={14} />
            case 'tab4':
                return <Mail size={14} />
            default:
                return <Star size={14} />
        }
    }

    const getAvailableItems = () => {
        const existingValues = enhancedTabs.map((tab) => tab.value)
        return availableTabOptions.filter(
            (item) => !existingValues.includes(item.value)
        )
    }

    // Enhanced tabs handlers
    const handleTabClose = (value: string) => {
        const tabToClose = enhancedTabs.find((tab) => tab.value === value)
        if (!tabToClose) return

        // Filter out the tab being closed and any concatenated tabs with same content
        const filteredTabs = enhancedTabs.filter((tab) => {
            // Keep if it's not the tab being closed
            if (tab.value === value) return false
            // Remove non-default tabs that share the same content (concatenated tabs)
            if (tab.content === tabToClose.content && !tab.isDefault)
                return false
            return true
        })

        // Check if active tab will be removed
        const activeTabWillBeRemoved = !filteredTabs.some(
            (tab) => tab.value === enhancedActiveTab
        )

        setEnhancedTabs(filteredTabs)

        // Switch to first remaining tab if active tab was removed
        if (activeTabWillBeRemoved && filteredTabs.length > 0) {
            setEnhancedActiveTab(filteredTabs[0].value)
        }
    }

    const handleTabAdd = () => {
        setShowMultiSelect(true)
    }

    const handleMultiSelectChange = (value: string) => {
        if (selectedTabsToAdd.includes(value)) {
            // Remove the item if it's already selected
            setSelectedTabsToAdd((prev) => prev.filter((v) => v !== value))
        } else {
            // Only add if we haven't reached the limit of 3
            if (selectedTabsToAdd.length < 3) {
                setSelectedTabsToAdd((prev) => [...prev, value])
            }
            // If already at limit, don't add more (MultiSelect should handle this visually)
        }
    }

    const handleAddSelectedTabs = () => {
        if (selectedTabsToAdd.length === 0) return

        // Create new tabs - multiple selections share content, single gets unique content
        const isMultipleSelection = selectedTabsToAdd.length > 1
        const newTabs: TabItem[] = selectedTabsToAdd.reduce<TabItem[]>(
            (acc, value) => {
                const item = availableTabOptions.find(
                    (opt) => opt.value === value
                )
                if (!item) return acc

                acc.push({
                    value: item.value,
                    label: item.label,
                    content: isMultipleSelection ? (
                        sharedContent
                    ) : (
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">
                                {item.label} Content
                            </h3>
                            <p className="text-purple-600">
                                This is unique content for {item.label} tab.
                            </p>
                        </div>
                    ),
                    closable: true,
                    isDefault: false,
                })
                return acc
            },
            []
        )

        // Add new tabs and activate the first one
        setEnhancedTabs((prevTabs) => [...prevTabs, ...newTabs])
        if (newTabs.length > 0) {
            setEnhancedActiveTab(newTabs[0].value)
        }

        // Close modal and reset selection
        setSelectedTabsToAdd([])
        setShowMultiSelect(false)
    }

    const handleCloseModal = () => {
        setSelectedTabsToAdd([])
        setShowMultiSelect(false)
    }

    const multiSelectItems = [
        {
            items: getAvailableItems().map((item) => ({
                ...item,
                disabled:
                    selectedTabsToAdd.length >= 3 &&
                    !selectedTabsToAdd.includes(item.value),
            })),
        },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Enhanced Tabs Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Enhanced Tabs with Dynamic Management
                </h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Show Dropdown"
                            checked={showEnhancedDropdown}
                            onChange={() =>
                                setShowEnhancedDropdown(!showEnhancedDropdown)
                            }
                        />
                        <Switch
                            label="Show Add Button"
                            checked={showEnhancedAddButton}
                            onChange={() =>
                                setShowEnhancedAddButton(!showEnhancedAddButton)
                            }
                        />
                    </div>

                    <div className="p-6 bg-white border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">
                            Features: Default Tabs • Closable Tabs • Dropdown
                            (All Tabs) • MultiSelect Add • Auto Concatenation
                        </h3>
                        <Tabs
                            items={enhancedTabs}
                            value={enhancedActiveTab}
                            onValueChange={setEnhancedActiveTab}
                            onTabClose={handleTabClose}
                            onTabAdd={handleTabAdd}
                            showDropdown={showEnhancedDropdown}
                            showAddButton={showEnhancedAddButton}
                            dropdownTooltip="Navigate to any tab (includes scrolled-out tabs)"
                            addButtonTooltip="Add new tabs via MultiSelect"
                            maxDisplayTabs={4}
                        />
                    </div>

                    <Modal
                        isOpen={showMultiSelect}
                        onClose={handleCloseModal}
                        title="Add New Tabs"
                        subtitle="Select up to 3 tabs to add. Multiple tabs will share content and be concatenated."
                        minWidth="600px"
                        primaryAction={{
                            text: 'Add Selected Tabs',
                            onClick: handleAddSelectedTabs,
                            disabled: selectedTabsToAdd.length === 0,
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: handleCloseModal,
                        }}
                    >
                        <MultiSelect
                            selectedValues={selectedTabsToAdd}
                            onChange={handleMultiSelectChange}
                            items={multiSelectItems}
                            placeholder={`Select up to 3 items (${selectedTabsToAdd.length}/3 selected)`}
                            label="select tabs to add"
                            enableSearch={true}
                            searchPlaceholder="Search available tabs..."
                            maxSelections={3}
                            useDrawerOnMobile={false}
                            fullWidth={true}
                            variant={MultiSelectVariant.NO_CONTAINER}
                        />
                    </Modal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">
                                Default Tabs:
                            </h4>
                            <ul className="text-blue-700 space-y-1 text-sm">
                                <li>• Home and Dashboard are default tabs</li>
                                <li>• Always visible at the front</li>
                                <li>• Cannot be closed (no X button)</li>
                                <li>
                                    • User can define any number of default tabs
                                </li>
                            </ul>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2">
                                Dynamic Features:
                            </h4>
                            <ul className="text-green-700 space-y-1 text-sm">
                                <li>• + button opens MultiSelect</li>
                                <li>
                                    • Select multiple items to create
                                    concatenated tab
                                </li>
                                <li>
                                    • Same content = auto concatenation (max 3)
                                </li>
                                <li>
                                    • Dropdown shows ALL tabs (even
                                    scrolled-out)
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">
                            Concatenation Examples:
                        </h4>
                        <div className="text-purple-700 text-sm space-y-1">
                            <p>
                                <strong>Select 3 items:</strong> Creates one tab
                                "Analytics+Reports+Settings"
                            </p>
                            <p>
                                <strong>Select 1 item:</strong> Creates
                                individual tab with unique content
                            </p>
                            <p>
                                <strong>Max limit:</strong> Only first 3 items
                                are concatenated
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Disabled State Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Disabled State</h2>
                <div className="space-y-8">
                    {/* Individual Disabled Tabs */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Individual Disabled Tabs
                        </h3>
                        <p className="text-gray-600">
                            Specific tabs can be disabled individually using the{' '}
                            <code className="px-2 py-1 bg-gray-100 rounded">
                                disable
                            </code>{' '}
                            property on each tab item.
                        </p>
                        <Tabs
                            defaultValue="tab1"
                            items={[
                                {
                                    value: 'tab1',
                                    label: 'Active Tab',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Active Tab Content
                                            </h4>
                                            <p className="text-gray-600">
                                                This tab is active and
                                                clickable.
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    value: 'tab2',
                                    label: 'Disabled Tab',
                                    disable: true,
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Disabled Tab Content
                                            </h4>
                                            <p className="text-gray-600">
                                                This content won't be
                                                accessible.
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    value: 'tab3',
                                    label: 'Another Active Tab',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Another Active Tab Content
                                            </h4>
                                            <p className="text-gray-600">
                                                This tab is also active and
                                                clickable.
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    value: 'tab4',
                                    label: 'Also Disabled',
                                    disable: true,
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Also Disabled Content
                                            </h4>
                                            <p className="text-gray-600">
                                                This tab is disabled too.
                                            </p>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>

                    {/* Global Disabled State */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Global Disabled State
                        </h3>
                        <p className="text-gray-600">
                            All tabs can be disabled at once using the{' '}
                            <code className="px-2 py-1 bg-gray-100 rounded">
                                disable
                            </code>{' '}
                            property on the Tabs component.
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                            <Switch
                                label="Disable All Tabs"
                                checked={globalDisable}
                                onChange={() =>
                                    setGlobalDisable(!globalDisable)
                                }
                            />
                        </div>
                        <Tabs
                            defaultValue="overview"
                            disable={globalDisable}
                            items={[
                                {
                                    value: 'overview',
                                    label: 'Overview',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Overview Content
                                            </h4>
                                            <p className="text-gray-600">
                                                All tabs are{' '}
                                                {globalDisable
                                                    ? 'disabled'
                                                    : 'enabled'}{' '}
                                                based on the global state.
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    value: 'analytics',
                                    label: 'Analytics',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Analytics Content
                                            </h4>
                                            <p className="text-gray-600">
                                                Analytics data and charts.
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    value: 'reports',
                                    label: 'Reports',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Reports Content
                                            </h4>
                                            <p className="text-gray-600">
                                                Generated reports and exports.
                                            </p>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>

                    {/* Disabled with Children Pattern */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Disabled State with Children Pattern
                        </h3>
                        <p className="text-gray-600">
                            The disable prop works with the children pattern as
                            well, following the Accordion component pattern.
                        </p>
                        <Tabs defaultValue="tab1" disable={globalDisable}>
                            <TabsList>
                                <TabsTrigger
                                    value="tab1"
                                    leftSlot={<Home size={16} />}
                                >
                                    Home
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab2"
                                    leftSlot={<User size={16} />}
                                >
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab3"
                                    leftSlot={<Settings size={16} />}
                                >
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tab1" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Home Content
                                    </h4>
                                    <p className="text-gray-600">
                                        Toggle the switch above to see all tabs
                                        disabled.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab2" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Profile Content
                                    </h4>
                                    <p className="text-gray-600">
                                        Profile information and settings.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab3" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Settings Content
                                    </h4>
                                    <p className="text-gray-600">
                                        Application settings and preferences.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Disabled Across Variants */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Disabled State Across Variants
                        </h3>
                        <p className="text-gray-600">
                            The disabled state styling works consistently across
                            all tab variants.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.values(TabsVariant).map((variant) => (
                                <div key={variant} className="space-y-2">
                                    <h4 className="font-medium capitalize">
                                        {variant} Variant
                                    </h4>
                                    <Tabs
                                        disable={globalDisable}
                                        defaultValue="tab1"
                                    >
                                        <TabsList variant={variant}>
                                            <TabsTrigger
                                                disable={true}
                                                value="tab1"
                                                variant={variant}
                                            >
                                                Active
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="tab2"
                                                variant={variant}
                                                disable={true}
                                            >
                                                Disabled
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="tab3"
                                                variant={variant}
                                            >
                                                Active
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent
                                            value="tab1"
                                            className="mt-4"
                                        >
                                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                                <p className="text-gray-600">
                                                    Active tab in {variant}{' '}
                                                    variant
                                                </p>
                                            </div>
                                        </TabsContent>

                                        <TabsContent
                                            value="tab3"
                                            className="mt-4"
                                        >
                                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                                <p className="text-gray-600">
                                                    Another active tab
                                                </p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">
                            Disabled State Features:
                        </h4>
                        <ul className="text-blue-700 space-y-1 text-sm">
                            <li>
                                • Individual tabs can be disabled using{' '}
                                <code className="px-1 bg-blue-100 rounded">
                                    disable
                                </code>{' '}
                                prop on TabItem
                            </li>
                            <li>
                                • All tabs can be disabled globally using{' '}
                                <code className="px-1 bg-blue-100 rounded">
                                    disable
                                </code>{' '}
                                prop on Tabs component
                            </li>
                            <li>
                                • Works with both items pattern and children
                                pattern
                            </li>
                            <li>
                                • Disabled tabs show reduced opacity and are not
                                clickable
                            </li>
                            <li>
                                • Consistent styling across all variants and
                                sizes
                            </li>
                            <li>
                                • Follows the same pattern as Accordion
                                component
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Skeleton State Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Skeleton State</h2>
                <div className="space-y-8">
                    {/* Skeleton Controls */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Skeleton Loading State
                        </h3>
                        <p className="text-gray-600">
                            The Tabs component supports skeleton loading state
                            to show a loading placeholder while content is being
                            fetched. Use the{' '}
                            <code className="px-2 py-1 bg-gray-100 rounded">
                                showSkeleton
                            </code>{' '}
                            prop to enable skeleton state and{' '}
                            <code className="px-2 py-1 bg-gray-100 rounded">
                                skeletonVariant
                            </code>{' '}
                            to choose the animation style.
                        </p>
                        <div className="flex items-center gap-6 flex-wrap">
                            <Switch
                                label="Show Skeleton"
                                checked={showSkeleton}
                                onChange={() => setShowSkeleton(!showSkeleton)}
                            />
                            <SingleSelect
                                label="Skeleton Variant"
                                items={[
                                    {
                                        items: [
                                            { value: 'pulse', label: 'Pulse' },
                                            { value: 'wave', label: 'Wave' },
                                            {
                                                value: 'shimmer',
                                                label: 'Shimmer',
                                            },
                                        ],
                                    },
                                ]}
                                selected={skeletonVariant}
                                onSelect={(value) =>
                                    setSkeletonVariant(
                                        value as 'pulse' | 'wave' | 'shimmer'
                                    )
                                }
                                placeholder="Select variant"
                            />
                        </div>
                        <Tabs
                            showSkeleton={showSkeleton}
                            skeletonVariant={skeletonVariant}
                            defaultValue="tab1"
                            items={[
                                {
                                    value: 'tab1',
                                    label: 'Overview',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Overview Content
                                            </h4>
                                            <p className="text-gray-600">
                                                This content is shown when
                                                skeleton is disabled.
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    value: 'tab2',
                                    label: 'Analytics',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Analytics Content
                                            </h4>
                                            <p className="text-gray-600">
                                                Analytics data and charts.
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    value: 'tab3',
                                    label: 'Reports',
                                    content: (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                Reports Content
                                            </h4>
                                            <p className="text-gray-600">
                                                Generated reports and exports.
                                            </p>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>

                    {/* Skeleton Across Variants */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Skeleton State Across Variants
                        </h3>
                        <p className="text-gray-600">
                            Skeleton state works consistently across all tab
                            variants.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.values(TabsVariant).map((variant) => (
                                <div key={variant} className="space-y-2">
                                    <h4 className="font-medium capitalize">
                                        {variant} Variant
                                    </h4>
                                    <Tabs
                                        showSkeleton={showSkeleton}
                                        skeletonVariant={skeletonVariant}
                                        defaultValue="tab1"
                                    >
                                        <TabsList variant={variant}>
                                            <TabsTrigger
                                                value="tab1"
                                                variant={variant}
                                            >
                                                Overview
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="tab2"
                                                variant={variant}
                                            >
                                                Analytics
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="tab3"
                                                variant={variant}
                                            >
                                                Reports
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent
                                            value="tab1"
                                            className="mt-4"
                                        >
                                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                                <p className="text-gray-600">
                                                    Content for {variant}{' '}
                                                    variant
                                                </p>
                                            </div>
                                        </TabsContent>

                                        <TabsContent
                                            value="tab2"
                                            className="mt-4"
                                        >
                                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                                <p className="text-gray-600">
                                                    Analytics content
                                                </p>
                                            </div>
                                        </TabsContent>

                                        <TabsContent
                                            value="tab3"
                                            className="mt-4"
                                        >
                                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                                <p className="text-gray-600">
                                                    Reports content
                                                </p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skeleton with Children Pattern */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Skeleton State with Children Pattern
                        </h3>
                        <p className="text-gray-600">
                            The skeleton prop works with the children pattern as
                            well.
                        </p>
                        <Tabs
                            showSkeleton={showSkeleton}
                            skeletonVariant={skeletonVariant}
                            defaultValue="tab1"
                        >
                            <TabsList>
                                <TabsTrigger
                                    value="tab1"
                                    leftSlot={<Home size={16} />}
                                >
                                    Home
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab2"
                                    leftSlot={<User size={16} />}
                                >
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab3"
                                    leftSlot={<Settings size={16} />}
                                >
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tab1" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Home Content
                                    </h4>
                                    <p className="text-gray-600">
                                        Toggle the skeleton switch above to see
                                        the loading state.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab2" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Profile Content
                                    </h4>
                                    <p className="text-gray-600">
                                        Profile information and settings.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab3" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Settings Content
                                    </h4>
                                    <p className="text-gray-600">
                                        Application settings and preferences.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">
                            Skeleton State Features:
                        </h4>
                        <ul className="text-blue-700 space-y-1 text-sm">
                            <li>
                                • Enable skeleton state using{' '}
                                <code className="px-1 bg-blue-100 rounded">
                                    showSkeleton
                                </code>{' '}
                                prop on Tabs component
                            </li>
                            <li>
                                • Choose animation style with{' '}
                                <code className="px-1 bg-blue-100 rounded">
                                    skeletonVariant
                                </code>{' '}
                                prop (pulse, wave, shimmer)
                            </li>
                            <li>
                                • Works with both items pattern and children
                                pattern
                            </li>
                            <li>
                                • Tab content becomes transparent and
                                non-interactive when skeleton is active
                            </li>
                            <li>
                                • Consistent behavior across all variants and
                                sizes
                            </li>
                            <li>
                                • Follows the same pattern as Button component
                            </li>
                            <li>
                                • Skeleton wrapper provides visual loading
                                feedback
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={playgroundVariant}
                            onSelect={(value) =>
                                setPlaygroundVariant(value as TabsVariant)
                            }
                            placeholder="Select variant"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as TabsSize)
                            }
                            placeholder="Select size"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Expanded"
                            checked={expanded}
                            onChange={() => setExpanded(!expanded)}
                        />
                        <Switch
                            label="Fit Content"
                            checked={fitContent}
                            onChange={() => setFitContent(!fitContent)}
                        />
                        <Switch
                            label="Show Icons"
                            checked={showIcons}
                            onChange={() => setShowIcons(!showIcons)}
                        />
                        <Switch
                            label="Show Right Slot"
                            checked={showRightSlot}
                            onChange={() => setShowRightSlot(!showRightSlot)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-4">
                        <div className="w-full ">
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                            >
                                <TabsList
                                    variant={playgroundVariant}
                                    size={playgroundSize}
                                    expanded={expanded}
                                    fitContent={fitContent}
                                >
                                    <TabsTrigger
                                        value="tab1"
                                        variant={playgroundVariant}
                                        size={playgroundSize}
                                        leftSlot={
                                            showIcons
                                                ? getIconForTab('tab1')
                                                : undefined
                                        }
                                        rightSlot={
                                            showRightSlot
                                                ? getRightSlotForTab('tab1')
                                                : undefined
                                        }
                                    >
                                        Home
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="tab2"
                                        variant={playgroundVariant}
                                        size={playgroundSize}
                                        leftSlot={
                                            showIcons
                                                ? getIconForTab('tab2')
                                                : undefined
                                        }
                                        rightSlot={
                                            showRightSlot
                                                ? getRightSlotForTab('tab2')
                                                : undefined
                                        }
                                    >
                                        Profile
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="tab3"
                                        variant={playgroundVariant}
                                        size={playgroundSize}
                                        leftSlot={
                                            showIcons
                                                ? getIconForTab('tab3')
                                                : undefined
                                        }
                                        rightSlot={
                                            showRightSlot
                                                ? getRightSlotForTab('tab3')
                                                : undefined
                                        }
                                    >
                                        Settings
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="tab4"
                                        variant={playgroundVariant}
                                        size={playgroundSize}
                                        leftSlot={
                                            showIcons
                                                ? getIconForTab('tab4')
                                                : undefined
                                        }
                                        rightSlot={
                                            showRightSlot
                                                ? getRightSlotForTab('tab4')
                                                : undefined
                                        }
                                    >
                                        Documents
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="tab1" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Home Content
                                        </h3>
                                        <p className="text-gray-600">
                                            This is the home tab content. You
                                            can put any content here including
                                            forms, lists, or other components.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab2" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Profile Content
                                        </h3>
                                        <p className="text-gray-600">
                                            This is the profile tab content.
                                            Here you can display user
                                            information, preferences, or account
                                            settings.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab3" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Settings Content
                                        </h3>
                                        <p className="text-gray-600">
                                            This is the settings tab content.
                                            You can include configuration
                                            options, preferences, or system
                                            settings here.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab4" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Documents Content
                                        </h3>
                                        <p className="text-gray-600">
                                            This is the documents tab content.
                                            You can display file lists, document
                                            management tools, or file upload
                                            interfaces here.
                                        </p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Variants */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Tabs Variants</h2>
                <div className="space-y-8">
                    {Object.values(TabsVariant).map((variant) => (
                        <div key={variant} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {variant} Variant
                            </h3>
                            <Tabs defaultValue="tab1">
                                <TabsList variant={variant}>
                                    <TabsTrigger value="tab1">
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger value="tab2">
                                        Analytics
                                    </TabsTrigger>
                                    <TabsTrigger value="tab3">
                                        Reports
                                    </TabsTrigger>
                                    <TabsTrigger value="tab4">
                                        Settings
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="tab1" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Overview
                                        </h4>
                                        <p className="text-gray-600">
                                            This is the overview content for the{' '}
                                            {variant} variant.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab2" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Analytics
                                        </h4>
                                        <p className="text-gray-600">
                                            Analytics content for the {variant}{' '}
                                            variant.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab3" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Reports
                                        </h4>
                                        <p className="text-gray-600">
                                            Reports content for the {variant}{' '}
                                            variant.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab4" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Settings
                                        </h4>
                                        <p className="text-gray-600">
                                            Settings content for the {variant}{' '}
                                            variant.
                                        </p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Tabs Sizes</h2>
                <div className="space-y-8">
                    {Object.values(TabsSize).map((size) => (
                        <div key={size} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {size} Size
                            </h3>
                            <Tabs defaultValue="tab1">
                                <TabsList size={size}>
                                    <TabsTrigger value="tab1" size={size}>
                                        Dashboard
                                    </TabsTrigger>
                                    <TabsTrigger value="tab2" size={size}>
                                        Users
                                    </TabsTrigger>
                                    <TabsTrigger value="tab3" size={size}>
                                        Products
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="tab1" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Dashboard
                                        </h4>
                                        <p className="text-gray-600">
                                            Dashboard content with {size} size
                                            tabs.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab2" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Users
                                        </h4>
                                        <p className="text-gray-600">
                                            Users content with {size} size tabs.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="tab3" className="mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            Products
                                        </h4>
                                        <p className="text-gray-600">
                                            Products content with {size} size
                                            tabs.
                                        </p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs with Icons */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Tabs with Icons</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Left Icons</h3>
                        <Tabs defaultValue="tab1">
                            <TabsList>
                                <TabsTrigger
                                    value="tab1"
                                    leftSlot={<Home size={16} />}
                                >
                                    Home
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab2"
                                    leftSlot={<User size={16} />}
                                >
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab3"
                                    leftSlot={<Settings size={16} />}
                                >
                                    Settings
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab4"
                                    leftSlot={<FileText size={16} />}
                                >
                                    Documents
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tab1" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">Home</h4>
                                    <p className="text-gray-600">
                                        Home tab with left icon.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab2" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Profile
                                    </h4>
                                    <p className="text-gray-600">
                                        Profile tab with left icon.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab3" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Settings
                                    </h4>
                                    <p className="text-gray-600">
                                        Settings tab with left icon.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab4" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Documents
                                    </h4>
                                    <p className="text-gray-600">
                                        Documents tab with left icon.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Right Icons</h3>
                        <Tabs defaultValue="tab1">
                            <TabsList>
                                <TabsTrigger
                                    value="tab1"
                                    rightSlot={<Star size={14} />}
                                >
                                    Favorites
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab2"
                                    rightSlot={<Heart size={14} />}
                                >
                                    Likes
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab3"
                                    rightSlot={<Bell size={14} />}
                                >
                                    Notifications
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab4"
                                    rightSlot={<Mail size={14} />}
                                >
                                    Messages
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tab1" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Favorites
                                    </h4>
                                    <p className="text-gray-600">
                                        Favorites tab with right icon.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab2" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Likes
                                    </h4>
                                    <p className="text-gray-600">
                                        Likes tab with right icon.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab3" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Notifications
                                    </h4>
                                    <p className="text-gray-600">
                                        Notifications tab with right icon.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab4" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Messages
                                    </h4>
                                    <p className="text-gray-600">
                                        Messages tab with right icon.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Both Icons</h3>
                        <Tabs defaultValue="tab1">
                            <TabsList>
                                <TabsTrigger
                                    value="tab1"
                                    leftSlot={<Download size={16} />}
                                    rightSlot={<Star size={14} />}
                                >
                                    Downloads
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab2"
                                    leftSlot={<Upload size={16} />}
                                    rightSlot={<Heart size={14} />}
                                >
                                    Uploads
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab3"
                                    leftSlot={<Trash2 size={16} />}
                                    rightSlot={<Bell size={14} />}
                                >
                                    Trash
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tab1" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Downloads
                                    </h4>
                                    <p className="text-gray-600">
                                        Downloads tab with both icons.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab2" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Uploads
                                    </h4>
                                    <p className="text-gray-600">
                                        Uploads tab with both icons.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab3" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Trash
                                    </h4>
                                    <p className="text-gray-600">
                                        Trash tab with both icons.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Layout Options */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Layout Options</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Expanded Tabs</h3>
                        <Tabs defaultValue="tab1">
                            <TabsList expanded>
                                <TabsTrigger value="tab1">Overview</TabsTrigger>
                                <TabsTrigger value="tab2">
                                    Analytics
                                </TabsTrigger>
                                <TabsTrigger value="tab3">Reports</TabsTrigger>
                                <TabsTrigger value="tab4">Settings</TabsTrigger>
                            </TabsList>

                            <TabsContent value="tab1" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Overview
                                    </h4>
                                    <p className="text-gray-600">
                                        Expanded tabs distribute space evenly.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab2" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Analytics
                                    </h4>
                                    <p className="text-gray-600">
                                        Each tab takes equal width.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab3" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Reports
                                    </h4>
                                    <p className="text-gray-600">
                                        Perfect for navigation menus.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab4" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Settings
                                    </h4>
                                    <p className="text-gray-600">
                                        Centered text in each tab.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Fit Content</h3>
                        <Tabs defaultValue="tab1">
                            <TabsList fitContent>
                                <TabsTrigger value="tab1">Short</TabsTrigger>
                                <TabsTrigger value="tab2">
                                    Medium Length
                                </TabsTrigger>
                                <TabsTrigger value="tab3">
                                    Very Long Tab Name
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tab1" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Short
                                    </h4>
                                    <p className="text-gray-600">
                                        Tabs fit their content width.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab2" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Medium Length
                                    </h4>
                                    <p className="text-gray-600">
                                        Each tab is sized to its content.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab3" className="mt-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                        Very Long Tab Name
                                    </h4>
                                    <p className="text-gray-600">
                                        Longer tabs get more space as needed.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Dashboard Tabs
                        </h3>
                        <Tabs defaultValue="overview">
                            <TabsList>
                                <TabsTrigger
                                    value="overview"
                                    leftSlot={<BarChart3 size={16} />}
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="analytics"
                                    leftSlot={<BarChart3 size={16} />}
                                >
                                    Analytics
                                </TabsTrigger>
                                <TabsTrigger
                                    value="reports"
                                    leftSlot={<FileText size={16} />}
                                >
                                    Reports
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    leftSlot={<Settings size={16} />}
                                >
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-4">
                                <div className="p-6 bg-white border rounded-lg">
                                    <h4 className="text-xl font-semibold mb-4">
                                        Overview Dashboard
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <h5 className="font-semibold text-blue-800">
                                                Total Users
                                            </h5>
                                            <p className="text-2xl font-bold text-blue-600">
                                                1,234
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-lg">
                                            <h5 className="font-semibold text-green-800">
                                                Active Sessions
                                            </h5>
                                            <p className="text-2xl font-bold text-green-600">
                                                567
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-lg">
                                            <h5 className="font-semibold text-purple-800">
                                                Revenue
                                            </h5>
                                            <p className="text-2xl font-bold text-purple-600">
                                                $12,345
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="analytics" className="mt-4">
                                <div className="p-6 bg-white border rounded-lg">
                                    <h4 className="text-xl font-semibold mb-4">
                                        Analytics
                                    </h4>
                                    <p className="text-gray-600">
                                        Detailed analytics and metrics would be
                                        displayed here.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="reports" className="mt-4">
                                <div className="p-6 bg-white border rounded-lg">
                                    <h4 className="text-xl font-semibold mb-4">
                                        Reports
                                    </h4>
                                    <p className="text-gray-600">
                                        Generated reports and data exports would
                                        be available here.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="settings" className="mt-4">
                                <div className="p-6 bg-white border rounded-lg">
                                    <h4 className="text-xl font-semibold mb-4">
                                        Settings
                                    </h4>
                                    <p className="text-gray-600">
                                        Configuration options and preferences
                                        would be managed here.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabsDemo

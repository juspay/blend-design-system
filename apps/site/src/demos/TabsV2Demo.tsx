import { useState } from 'react'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import {
    TabsV2,
    TabsV2Content,
    TabsV2List,
    TabsV2Size,
    TabsV2Trigger,
    TabsV2Variant,
    type TabsV2TabItem,
} from '../../../../packages/blend/lib/components/TabsV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'

const variantOptions = [
    { value: TabsV2Variant.UNDERLINE, label: 'Underline' },
    { value: TabsV2Variant.BOXED, label: 'Boxed' },
    { value: TabsV2Variant.FLOATING, label: 'Floating' },
    { value: TabsV2Variant.PILLS, label: 'Pills' },
]

const sizeOptions = [
    { value: TabsV2Size.MD, label: 'MD' },
    { value: TabsV2Size.LG, label: 'LG' },
]

const skeletonVariantOptions = [
    { value: 'pulse', label: 'Pulse' },
    { value: 'wave', label: 'Wave' },
    { value: 'shimmer', label: 'Shimmer' },
]

const TabsV2Demo = () => {
    const { theme } = useTheme()

    const [variant, setVariant] = useState<TabsV2Variant>(
        TabsV2Variant.UNDERLINE
    )
    const [size, setSize] = useState<TabsV2Size>(TabsV2Size.MD)
    const [stickyHeader, setStickyHeader] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [disable, setDisable] = useState(false)
    const [showDropdown, setShowDropdown] = useState(true)
    const [showAddButton, setShowAddButton] = useState(true)
    const [showClosableTabs, setShowClosableTabs] = useState(false)
    const [skeletonVariant, setSkeletonVariant] = useState<
        'pulse' | 'wave' | 'shimmer'
    >('pulse')

    const [activeTab, setActiveTab] = useState('overview')
    const [tabs, setTabs] = useState<TabsV2TabItem[]>([
        {
            value: 'overview',
            label: 'Overview',
            content: (
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                    Composite: Overview content
                </div>
            ),
        },
        {
            value: 'payments',
            label: 'Payments',
            content: (
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                    Composite: Payments content
                </div>
            ),
        },
        {
            value: 'refunds',
            label: 'Refunds',
            content: (
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                    Composite: Refunds content
                </div>
            ),
        },
    ])

    const containerClass =
        theme === Theme.DARK
            ? 'border-gray-700 bg-gray-900'
            : 'border-gray-300 bg-gray-50'

    const handleTabAdd = () => {
        const nextIndex = tabs.length + 1
        const value = `new-${nextIndex}`
        setTabs((prev) => [
            ...prev,
            {
                value,
                label: `New ${nextIndex}`,
                newItem: showClosableTabs,
                content: (
                    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                        Added tab content: {value}
                    </div>
                ),
            },
        ])
        setActiveTab(value)
    }

    const handleTabClose = (tabValue: string) => {
        setTabs((prev) => {
            const updated = prev.filter((tab) => tab.value !== tabValue)
            if (activeTab === tabValue && updated.length > 0) {
                setActiveTab(updated[Math.max(updated.length - 1, 0)].value)
            }
            return updated
        })
    }

    const tabsPlayground = (
        <TabsV2
            variant={variant}
            size={size}
            value={activeTab}
            onValueChange={setActiveTab}
            stickyHeader={stickyHeader}
            showSkeleton={showSkeleton}
            disable={disable}
            skeletonVariant={skeletonVariant}
        >
            <TabsV2List
                items={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onTabAdd={handleTabAdd}
                onTabClose={handleTabClose}
                showDropdown={showDropdown}
                showAddButton={showAddButton}
                addButtonTooltip="Add tab"
                dropdownTooltip="Navigate tab"
            >
                <TabsV2Trigger value="overview">Overview</TabsV2Trigger>
            </TabsV2List>
            {tabs.map((tab) => (
                <TabsV2Content key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsV2Content>
            ))}
        </TabsV2>
    )

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">TabsV2 Playground</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SingleSelect
                    label="Variant"
                    placeholder="Select variant"
                    items={[{ items: variantOptions }]}
                    selected={variant}
                    onSelect={(value) => setVariant(value as TabsV2Variant)}
                />
                <SingleSelect
                    label="Size"
                    placeholder="Select size"
                    items={[{ items: sizeOptions }]}
                    selected={size}
                    onSelect={(value) => setSize(value as TabsV2Size)}
                />
                <SingleSelect
                    label="Skeleton Variant"
                    placeholder="Select skeleton variant"
                    items={[{ items: skeletonVariantOptions }]}
                    selected={skeletonVariant}
                    onSelect={(value) =>
                        setSkeletonVariant(
                            value as 'pulse' | 'wave' | 'shimmer'
                        )
                    }
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Switch
                    label="Sticky Header"
                    checked={stickyHeader}
                    onChange={() => setStickyHeader((prev) => !prev)}
                />
                <Switch
                    label="Show Skeleton"
                    checked={showSkeleton}
                    onChange={() => setShowSkeleton((prev) => !prev)}
                />
                <Switch
                    label="Disable"
                    checked={disable}
                    onChange={() => setDisable((prev) => !prev)}
                />
                <Switch
                    label="Show Dropdown"
                    checked={showDropdown}
                    onChange={() => setShowDropdown((prev) => !prev)}
                />
                <Switch
                    label="Show Add Button"
                    checked={showAddButton}
                    onChange={() => setShowAddButton((prev) => !prev)}
                />
                <Switch
                    label="Closable Added Tabs"
                    checked={showClosableTabs}
                    onChange={() => setShowClosableTabs((prev) => !prev)}
                />
            </div>

            <div
                className={`min-h-64 p-6 rounded-xl border-2 border-dashed overflow-auto ${containerClass}`}
            >
                {tabsPlayground}
            </div>
        </div>
    )
}

export default TabsV2Demo

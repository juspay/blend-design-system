import { useState } from 'react'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import PrimitiveButton from '../../../../packages/blend/lib/components/Primitives/PrimitiveButton/PrimitiveButton'
import { Tooltip } from '../../../../packages/blend/lib/components/Tooltip/Tooltip'
import {
    TabsV2,
    TabsV2Content,
    TabsV2List,
    TabsV2Size,
    TabsV2Trigger,
    TabsV2Variant,
} from '../../../../packages/blend/lib/components/TabsV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import { ChevronDown, Plus } from 'lucide-react'

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
    const { theme, foundationTokens } = useTheme()

    const [variant, setVariant] = useState<TabsV2Variant>(
        TabsV2Variant.UNDERLINE
    )
    const [size, setSize] = useState<TabsV2Size>(TabsV2Size.MD)
    const [stickyHeader, setStickyHeader] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [disable, setDisable] = useState(false)
    const [showDropdown, setShowDropdown] = useState(true)
    const [showAddButton, setShowAddButton] = useState(true)
    const [skeletonVariant, setSkeletonVariant] = useState<
        'pulse' | 'wave' | 'shimmer'
    >('pulse')

    const [activeTab, setActiveTab] = useState('overview')
    const [tabs, setTabs] = useState([
        { value: 'overview', label: 'Overview' },
        { value: 'payments', label: 'Payments' },
        { value: 'refunds', label: 'Refunds' },
    ])

    const containerClass =
        theme === Theme.DARK
            ? 'border-gray-700 bg-gray-900'
            : 'border-gray-300 bg-gray-50'

    const isDarkTheme = theme === Theme.DARK
    const iconButtonHoverBackground = isDarkTheme
        ? foundationTokens.colors.gray[800]
        : foundationTokens.colors.gray[100]

    const handleTabAdd = () => {
        const nextIndex = tabs.length + 1
        const value = `new-${nextIndex}`
        setTabs((prev) => [
            ...prev,
            {
                value,
                label: `New ${nextIndex}`,
            },
        ])
        setActiveTab(value)
    }

    const dropdownItems = [
        { items: tabs.map((tab) => ({ value: tab.value, label: tab.label })) },
    ]

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
            <div className="flex items-center gap-2">
                <TabsV2List>
                    {tabs.map((tab) => (
                        <TabsV2Trigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsV2Trigger>
                    ))}
                </TabsV2List>

                {showDropdown && (
                    <SingleSelect
                        enableSearch={true}
                        items={dropdownItems}
                        selected={activeTab}
                        onSelect={setActiveTab}
                        placeholder="Navigate"
                        searchPlaceholder="Search and navigate to tab"
                        customTrigger={
                            <PrimitiveButton
                                height={foundationTokens.unit[20]}
                                width={foundationTokens.unit[20]}
                                backgroundColor="transparent"
                                contentCentered
                                aria-label="Navigate to tab"
                                _hover={{
                                    backgroundColor: iconButtonHoverBackground,
                                }}
                                borderRadius={foundationTokens.unit[4]}
                            >
                                <ChevronDown size={16} aria-hidden="true" />
                            </PrimitiveButton>
                        }
                        useDrawerOnMobile={false}
                    />
                )}

                {showAddButton && (
                    <Tooltip content="Add new tab">
                        <PrimitiveButton
                            onClick={handleTabAdd}
                            height={foundationTokens.unit[20]}
                            width={foundationTokens.unit[20]}
                            backgroundColor="transparent"
                            contentCentered
                            aria-label="Add new tab"
                            _hover={{
                                backgroundColor: iconButtonHoverBackground,
                            }}
                            borderRadius={foundationTokens.unit[4]}
                        >
                            <Plus size={16} aria-hidden="true" />
                        </PrimitiveButton>
                    </Tooltip>
                )}
            </div>

            <TabsV2Content value="overview">
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mt-4">
                    Composite: Overview content
                </div>
            </TabsV2Content>
            <TabsV2Content value="payments">
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mt-4">
                    Composite: Payments content
                </div>
            </TabsV2Content>
            <TabsV2Content value="refunds">
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mt-4">
                    Composite: Refunds content
                </div>
            </TabsV2Content>
            {tabs
                .filter((tab) => tab.value.startsWith('new-'))
                .map((tab) => (
                    <TabsV2Content key={tab.value} value={tab.value}>
                        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mt-4">
                            Added tab content: {tab.value}
                        </div>
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
            </div>

            <div
                className={`min-h-64 p-6 rounded-xl border-2 border-dashed overflow-auto ${containerClass}`}
            >
                {tabsPlayground}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Composite Pattern Benefits:
                </h3>
                <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                    <li>
                        • Build your own dropdown navigation using SingleSelect
                    </li>
                    <li>• Add custom buttons (Add, Close, etc.) as siblings</li>
                    <li>• Full control over tab state and behavior</li>
                    <li>
                        • Use rightSlot prop on TabsV2Trigger for icons/actions
                    </li>
                    <li>• Mix static and dynamic tabs easily</li>
                </ul>
            </div>
        </div>
    )
}

export default TabsV2Demo

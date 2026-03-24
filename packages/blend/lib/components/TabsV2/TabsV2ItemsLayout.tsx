import type { TabsV2Size, TabsV2TabItem, TabsV2Variant } from './tabsV2.types'
import TabsV2List from './TabsV2List'
import TabsV2Content from './TabsV2Content'

export type TabsV2ItemsLayoutProps = {
    processedItems: TabsV2TabItem[]
    originalItems: TabsV2TabItem[]
    activeTab: string
    variant?: TabsV2Variant
    size?: TabsV2Size
    expanded: boolean
    fitContent: boolean
    onTabClose?: (value: string) => void
    onTabAdd?: () => void
    showDropdown: boolean
    showAddButton: boolean
    dropdownTooltip: string
    addButtonTooltip: string
    onTabChange: (value: string) => void
    stickyHeader: boolean
    offsetTop: number
}

/**
 * Data-driven TabsV2: renders list + content panels from `items` (Radix value lives on parent root).
 */
const TabsV2ItemsLayout = ({
    processedItems,
    originalItems,
    activeTab,
    variant,
    size,
    expanded,
    fitContent,
    onTabClose,
    onTabAdd,
    showDropdown,
    showAddButton,
    dropdownTooltip,
    addButtonTooltip,
    onTabChange,
    stickyHeader,
    offsetTop,
}: TabsV2ItemsLayoutProps) => (
    <>
        <TabsV2List
            data-element="tab-list"
            variant={variant}
            size={size}
            expanded={expanded}
            fitContent={fitContent}
            items={processedItems}
            originalItems={originalItems}
            onTabClose={onTabClose}
            onTabAdd={onTabAdd}
            showDropdown={showDropdown}
            showAddButton={showAddButton}
            dropdownTooltip={dropdownTooltip}
            addButtonTooltip={addButtonTooltip}
            onTabChange={onTabChange}
            activeTab={activeTab}
            stickyHeader={stickyHeader}
            offsetTop={offsetTop}
        />
        {originalItems.map((item) => (
            <TabsV2Content key={item.value} value={item.value}>
                {item.content}
            </TabsV2Content>
        ))}
    </>
)

TabsV2ItemsLayout.displayName = 'TabsV2ItemsLayout'

export default TabsV2ItemsLayout

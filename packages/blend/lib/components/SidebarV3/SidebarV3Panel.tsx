import type { ReactNode } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import { DirectoryDisclosureMotionProvider } from '../Directory/NavItem'
import { normalizeDirectoryData } from '../Directory/utils'
import type { DirectoryData, DirectoryProps } from '../Directory/types'
import SidebarV2Header from '../SidebarV2/SidebarV2Header'
import SidebarV2Footer from '../SidebarV2/SidebarV2Footer'
import type { SidebarV2Props } from '../SidebarV2/types'
import type { SidebarV3StateChangeType } from './types'
import type { SidebarV3TokensType } from './sidebarV3.tokens'

const DirectoryContainer = styled(Block)`
    flex: 1;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
`

export type SidebarV3PanelProps = {
    sidebarTopSlot?: ReactNode
    sidebarSearch?: ReactNode
    merchantInfo?: SidebarV2Props['merchantInfo']
    isExpanded: boolean
    isScrolled: boolean
    sidebarCollapseKey: string
    onToggle: () => void
    sidebarNavId?: string
    data: DirectoryData[] | null
    idPrefix: string
    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null
    iconOnlyMode?: boolean
    hideToggleButton?: boolean
    footer?: ReactNode
    setIsHovering?: (isHovering: boolean) => void
    sidebarState?: SidebarV3StateChangeType
    tokens: SidebarV3TokensType
    showHierarchyLines?: DirectoryProps['showHierarchyLines']
    hierarchyLineBorderRadius?: DirectoryProps['hierarchyLineBorderRadius']
    expandedItems?: DirectoryProps['expandedItems']
    defaultExpandedItems?: DirectoryProps['defaultExpandedItems']
    onExpandedItemsChange?: DirectoryProps['onExpandedItemsChange']
    onItemExpand?: DirectoryProps['onItemExpand']
    enableVirtualization?: DirectoryProps['enableVirtualization']
    virtualization?: DirectoryProps['virtualization']
}

const SidebarV3Panel = ({
    sidebarTopSlot,
    sidebarSearch,
    merchantInfo,
    isExpanded,
    isScrolled,
    sidebarCollapseKey,
    onToggle,
    sidebarNavId,
    data,
    idPrefix,
    activeItem,
    onActiveItemChange,
    defaultActiveItem,
    iconOnlyMode = false,
    hideToggleButton = false,
    footer,
    setIsHovering,
    sidebarState = 'expanded',
    tokens,
    showHierarchyLines = false,
    hierarchyLineBorderRadius = 0,
    expandedItems,
    defaultExpandedItems,
    onExpandedItemsChange,
    onItemExpand,
    enableVirtualization = false,
    virtualization,
}: SidebarV3PanelProps) => {
    const directoryData = normalizeDirectoryData(data)

    return (
        <Block
            data-element="sidebar-panel"
            width={
                iconOnlyMode
                    ? String(tokens.container.maxWidth.iconOnly)
                    : String(tokens.primarySidebar.width)
            }
            height="100%"
            display="flex"
            flexDirection="column"
            position="relative"
            minWidth={0}
            flexShrink={0}
            overflow="hidden"
            transition="width 0.2s cubic-bezier(0.2, 0, 0, 1)"
        >
            <SidebarV2Header
                sidebarTopSlot={sidebarTopSlot}
                merchantInfo={merchantInfo}
                isExpanded={isExpanded}
                isScrolled={isScrolled}
                sidebarCollapseKey={sidebarCollapseKey}
                onToggle={onToggle}
                sidebarNavId={sidebarNavId}
                iconOnlyMode={iconOnlyMode}
                hideToggleButton={hideToggleButton}
                tokens={tokens}
            />

            {sidebarSearch && !iconOnlyMode && (
                <Block
                    data-sidebar-v3-search
                    flexShrink={0}
                    padding={tokens.search.padding}
                >
                    {sidebarSearch}
                </Block>
            )}

            <DirectoryContainer
                data-directory-container
                id={sidebarNavId}
                role="region"
                aria-label="Navigation menu"
                onMouseEnter={
                    setIsHovering ? () => setIsHovering(true) : undefined
                }
            >
                <DirectoryDisclosureMotionProvider
                    motion={{
                        duration: String(tokens.navigation.feedbackDuration),
                        fadeDuration: String(tokens.navigation.motionDuration),
                        easing: String(tokens.navigation.feedbackEasing),
                    }}
                >
                    <Directory
                        directoryData={directoryData}
                        idPrefix={idPrefix}
                        activeItem={activeItem}
                        onActiveItemChange={onActiveItemChange}
                        defaultActiveItem={defaultActiveItem}
                        iconOnlyMode={iconOnlyMode}
                        showHierarchyLines={showHierarchyLines}
                        hierarchyLineBorderRadius={hierarchyLineBorderRadius}
                        expandedItems={expandedItems}
                        defaultExpandedItems={defaultExpandedItems}
                        onExpandedItemsChange={onExpandedItemsChange}
                        onItemExpand={onItemExpand}
                        enableVirtualization={enableVirtualization}
                        virtualization={virtualization}
                    />
                </DirectoryDisclosureMotionProvider>
            </DirectoryContainer>

            <SidebarV2Footer
                footer={footer}
                sidebarState={sidebarState}
                tokens={tokens}
            />
        </Block>
    )
}

export default SidebarV3Panel

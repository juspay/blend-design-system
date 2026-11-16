import { useLayoutEffect, useRef, type ReactNode } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import {
    DirectoryDisclosureMotionProvider,
    type DirectoryDisclosureMotion,
} from '../Directory/NavItem'
import { DirectoryAppearanceProvider } from '../Directory/DirectoryAppearance'
import type { DirectoryTokenType } from '../Directory/directory.tokens.types'
import { normalizeDirectoryData } from '../Directory/utils'
import type {
    DirectoryAppearance,
    DirectoryData,
    DirectoryProps,
} from '../Directory/types'
import SidebarV2Header from './SidebarV2Header'
import SidebarV2Footer from './SidebarV2Footer'
import type { SidebarV2StateChangeType } from './types'
import type { SidebarV2TokensType } from './sidebarV2.tokens'

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

const SearchContainer = styled(Block)<{
    $collapsed: boolean
    $transition?: string
}>`
    display: grid;
    grid-template-rows: ${({ $collapsed }) => ($collapsed ? '0fr' : '1fr')};
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    transition: ${({ $transition }) => $transition ?? 'none'};

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`

export type SidebarV2PanelProps = {
    sidebarTopSlot?: ReactNode
    sidebarSearch?: ReactNode
    searchTransition?: string
    disclosureMotion?: DirectoryDisclosureMotion
    directoryTokens?: DirectoryTokenType
    directoryAppearance?: DirectoryAppearance
    merchantInfo?: {
        items: Array<{
            label: string
            value: string
            icon?: ReactNode
        }>
        selected: string
        onSelect: (value: string) => void
    }
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
    sidebarState?: SidebarV2StateChangeType
    tokens: SidebarV2TokensType
    showHierarchyLines?: DirectoryProps['showHierarchyLines']
    hierarchyLineBorderRadius?: DirectoryProps['hierarchyLineBorderRadius']
    expandedItems?: DirectoryProps['expandedItems']
    defaultExpandedItems?: DirectoryProps['defaultExpandedItems']
    onExpandedItemsChange?: DirectoryProps['onExpandedItemsChange']
    onItemExpand?: DirectoryProps['onItemExpand']
    enableVirtualization?: DirectoryProps['enableVirtualization']
    virtualization?: DirectoryProps['virtualization']
}

const SidebarV2Panel = ({
    sidebarTopSlot,
    sidebarSearch,
    searchTransition,
    disclosureMotion,
    directoryTokens,
    directoryAppearance,
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
}: SidebarV2PanelProps) => {
    const searchRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const search = searchRef.current
        if (!search) return
        if (iconOnlyMode) {
            if (search.contains(document.activeElement)) {
                ;(document.activeElement as HTMLElement).blur()
            }
            search.setAttribute('inert', '')
        } else {
            search.removeAttribute('inert')
        }
    }, [iconOnlyMode])
    const directoryData = normalizeDirectoryData(data)
    const directory = (
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
            appearance={directoryAppearance}
        />
    )
    const animatedDirectory = disclosureMotion ? (
        <DirectoryDisclosureMotionProvider motion={disclosureMotion}>
            {directory}
        </DirectoryDisclosureMotionProvider>
    ) : (
        directory
    )
    const themedDirectory = directoryTokens ? (
        <DirectoryAppearanceProvider tokens={directoryTokens}>
            {animatedDirectory}
        </DirectoryAppearanceProvider>
    ) : (
        animatedDirectory
    )

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

            {sidebarSearch && (
                <SearchContainer
                    ref={searchRef}
                    data-sidebar-search
                    data-state={iconOnlyMode ? 'collapsed' : 'expanded'}
                    aria-hidden={iconOnlyMode ? true : undefined}
                    flexShrink={0}
                    $collapsed={iconOnlyMode}
                    $transition={searchTransition}
                >
                    <Block minHeight={0} overflow="hidden">
                        {sidebarSearch}
                    </Block>
                </SearchContainer>
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
                {themedDirectory}
            </DirectoryContainer>

            <SidebarV2Footer
                footer={footer}
                sidebarState={sidebarState}
                tokens={tokens}
            />
        </Block>
    )
}

export default SidebarV2Panel

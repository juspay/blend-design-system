import type { ReactNode } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import { normalizeDirectoryData } from '../Directory/utils'
import type { DirectoryData, DirectoryProps } from '../Directory/types'
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

const shouldTrackHover = (
    setIsHovering: ((isHovering: boolean) => void) | undefined
): boolean => !!setIsHovering

export type SidebarV2PanelProps = {
    sidebarTopSlot?: ReactNode
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
}

const SidebarV2Panel = ({
    sidebarTopSlot,
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
}: SidebarV2PanelProps) => {
    const trackHover = shouldTrackHover(setIsHovering)
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
            transition="width 0.25s ease-in-out"
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

            <DirectoryContainer
                data-directory-container
                id={sidebarNavId}
                role="region"
                aria-label="Navigation menu"
                onMouseEnter={
                    trackHover ? () => setIsHovering?.(true) : undefined
                }
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
                />
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

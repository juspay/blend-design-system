import type { ReactNode } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import type { DirectoryData } from '../Directory/types'
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
    iconOnlyMode: boolean,
    setIsHovering: ((isHovering: boolean) => void) | undefined
): boolean => iconOnlyMode && !!setIsHovering

export type SidebarV2PanelProps = {
    /** Slot content rendered at the top of the sidebar */
    sidebarTopSlot?: ReactNode
    /** Merchant switcher configuration */
    merchantInfo?: {
        items: Array<{
            label: string
            value: string
            icon?: ReactNode
        }>
        selected: string
        onSelect: (value: string) => void
    }
    /** Whether the sidebar is in expanded state */
    isExpanded: boolean
    /** Whether the directory has been scrolled */
    isScrolled: boolean
    /** Keyboard shortcut key to toggle sidebar */
    sidebarCollapseKey: string
    /** Callback when toggle button is clicked */
    onToggle: () => void
    /** ID for the navigation region */
    sidebarNavId?: string
    /** Navigation directory data */
    data: DirectoryData[]
    /** Prefix for generating unique IDs */
    idPrefix: string
    /** Currently active navigation item */
    activeItem?: string | null
    /** Callback when active item changes */
    onActiveItemChange?: (item: string | null) => void
    /** Default active item on initial render */
    defaultActiveItem?: string | null
    /** Whether to show icon-only mode (collapsed state) */
    iconOnlyMode?: boolean
    /** Footer content rendered at the bottom */
    footer?: ReactNode
    /** Callback to set hover state (for intermediate expand on hover) */
    setIsHovering?: (isHovering: boolean) => void
    /** Current sidebar state for styling */
    sidebarState?: SidebarV2StateChangeType
    /** Design tokens for styling */
    tokens: SidebarV2TokensType
}

/**
 * SidebarV2Panel renders the main sidebar panel including header,
 * scrollable navigation directory, and footer.
 *
 * Used both for the primary sidebar and the hover-preview overlay
 * when the sidebar is collapsed.
 */
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
    footer,
    setIsHovering,
    sidebarState = 'expanded',
    tokens,
}: SidebarV2PanelProps) => {
    const trackHover = shouldTrackHover(iconOnlyMode, setIsHovering)

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
                onMouseLeave={
                    trackHover ? () => setIsHovering?.(false) : undefined
                }
            >
                <Directory
                    directoryData={data}
                    idPrefix={idPrefix}
                    activeItem={activeItem}
                    onActiveItemChange={onActiveItemChange}
                    defaultActiveItem={defaultActiveItem}
                    iconOnlyMode={iconOnlyMode}
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

import React from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'
import type { DirectoryData } from '../Directory/types'
import type { SidebarMerchantInfo } from './types'

const DirectoryContainer = styled(Block)<{
    $showTopBlur?: boolean
    $showBottomBlur?: boolean
}>`
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

export type SidebarContentProps = {
    sidebarTopSlot?: React.ReactNode
    merchantInfo?: SidebarMerchantInfo
    isExpanded: boolean
    isScrolled: boolean
    sidebarCollapseKey: string
    onToggle: () => void
    sidebarNavId?: string
    showTopBlur: boolean
    showBottomBlur: boolean
    data: DirectoryData[]
    idPrefix: string
    activeItem?: string | null
    onActiveItemChange?: (item: string | null) => void
    defaultActiveItem?: string | null
    iconOnlyMode?: boolean
    footer?: React.ReactNode
    setIsHovering?: (isHovering: boolean) => void
}

const SidebarContent: React.FC<SidebarContentProps> = ({
    sidebarTopSlot,
    merchantInfo,
    isExpanded,
    isScrolled,
    sidebarCollapseKey,
    onToggle,
    sidebarNavId,
    showTopBlur,
    showBottomBlur,
    data,
    idPrefix,
    activeItem,
    onActiveItemChange,
    defaultActiveItem,
    iconOnlyMode = false,
    footer,
    setIsHovering,
}) => {
    return (
        <Block
            data-element="sidebar-content"
            width={iconOnlyMode ? '58px' : '250px'}
            height="100%"
            display="flex"
            flexDirection="column"
            position="relative"
            minWidth={0}
            flexShrink={0}
            overflow="hidden"
            transition="width 0.25s ease-in-out"
        >
            <SidebarHeader
                sidebarTopSlot={sidebarTopSlot}
                merchantInfo={merchantInfo}
                isExpanded={isExpanded}
                isScrolled={isScrolled}
                sidebarCollapseKey={sidebarCollapseKey}
                onToggle={onToggle}
                sidebarNavId={sidebarNavId}
                iconOnlyMode={iconOnlyMode}
            />

            <DirectoryContainer
                data-directory-container
                id={sidebarNavId}
                role="region"
                aria-label="Navigation menu"
                $showTopBlur={showTopBlur}
                $showBottomBlur={showBottomBlur}
                onMouseEnter={() => setIsHovering?.(true)}
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

            <SidebarFooter footer={footer} isExpanded={isExpanded} />
        </Block>
    )
}

export default SidebarContent

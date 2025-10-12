import { forwardRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import type { SidebarProps } from './types'
import type { SidebarTokenType } from './sidebar.tokens'
import { Topbar } from '../Topbar'
import TenantPanel from './TenantPanel'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    getSidebarWidth,
    getSidebarBorder,
    getTopbarStyles,
    getDefaultMerchantInfo,
    useTopbarAutoHide,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'

const DirectoryContainer = styled(Block)`
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const MainContentContainer = styled(Block)`
    width: 100%;
    height: 100%;
    background-color: #f9fafb;
    position: relative;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
    (
        {
            children,
            data,
            topbar,
            leftPanel,
            sidebarTopSlot,
            footer,
            sidebarCollapseKey = '/',
            merchantInfo,
            rightActions,
            enableTopbarAutoHide = false,
        },
        ref
    ) => {
        // Simplified state management
        const [isExpanded, setIsExpanded] = useState<boolean>(true)
        const [showToggleButton, setShowToggleButton] = useState<boolean>(false)
        const [isHovering, setIsHovering] = useState<boolean>(false)
        const [isScrolled, setIsScrolled] = useState<boolean>(false)

        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < BREAKPOINTS.lg

        // Use custom hook for topbar auto-hide
        const showTopbar = useTopbarAutoHide(enableTopbarAutoHide)

        // Keyboard shortcut handler
        useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === sidebarCollapseKey && !isMobile) {
                    event.preventDefault()
                    setIsExpanded(!isExpanded)
                }
            }
            document.addEventListener('keydown', handleKeyPress)
            return () => document.removeEventListener('keydown', handleKeyPress)
        }, [isExpanded, isMobile, sidebarCollapseKey])

        // Mobile and toggle button logic
        useEffect(() => {
            if (isMobile && isExpanded) {
                setIsExpanded(false)
                setIsHovering(false)
                return
            }
            if (!isExpanded && !isMobile) {
                const timer = setTimeout(() => setShowToggleButton(true), 50)
                return () => clearTimeout(timer)
            } else {
                setShowToggleButton(false)
            }
        }, [isExpanded, isMobile])

        // Directory scroll detection
        useEffect(() => {
            const directoryContainer = document.querySelector(
                '[data-directory-container]'
            )
            if (!directoryContainer) return
            const handleScroll = () =>
                setIsScrolled(directoryContainer.scrollTop > 0)
            directoryContainer.addEventListener('scroll', handleScroll)
            return () =>
                directoryContainer.removeEventListener('scroll', handleScroll)
        }, [])

        // Helper functions and values
        const toggleSidebar = () => {
            setIsExpanded(!isExpanded)
            setIsHovering(false)
        }
        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => setIsHovering(false)
        const hasLeftPanel = Boolean(leftPanel?.items?.length)
        const defaultMerchantInfo = getDefaultMerchantInfo()
        const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')

        return (
            <Block
                ref={ref}
                width="100%"
                height="100%"
                display="flex"
                backgroundColor={tokens.backgroundColor}
                position="relative"
                zIndex={99}
            >
                {!isExpanded && !isMobile && (
                    <Block
                        position="absolute"
                        left="0"
                        top="0"
                        width={FOUNDATION_THEME.unit[24]}
                        height="100%"
                        zIndex="98"
                        onMouseEnter={handleMouseEnter}
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    />
                )}

                <Block
                    backgroundColor={tokens.backgroundColor}
                    maxWidth={getSidebarWidth(
                        isExpanded,
                        isHovering,
                        hasLeftPanel,
                        tokens
                    )}
                    width="100%"
                    borderRight={getSidebarBorder(
                        isExpanded,
                        isHovering,
                        tokens
                    )}
                    display={isMobile ? 'none' : 'flex'}
                    position={!isExpanded ? 'absolute' : 'relative'}
                    zIndex="98"
                    height="100%"
                    style={{
                        willChange: 'transform',
                        transitionDuration: '150ms',
                        animation: 'slide-in-from-left 0.3s ease-out',
                        overflow: 'hidden',
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    {!isMobile && (
                        <>
                            {hasLeftPanel &&
                                leftPanel &&
                                (isExpanded || isHovering) && (
                                    <TenantPanel
                                        items={leftPanel.items}
                                        selected={leftPanel.selected}
                                        onSelect={leftPanel.onSelect}
                                        maxVisibleItems={
                                            leftPanel.maxVisibleItems
                                        }
                                    />
                                )}

                            {(isExpanded || isHovering) && (
                                <Block
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    position="relative"
                                >
                                    <SidebarHeader
                                        sidebarTopSlot={sidebarTopSlot}
                                        merchantInfo={merchantInfo}
                                        isExpanded={isExpanded}
                                        isScrolled={isScrolled}
                                        sidebarCollapseKey={sidebarCollapseKey}
                                        onToggle={toggleSidebar}
                                    />

                                    <DirectoryContainer
                                        data-directory-container
                                    >
                                        <Directory
                                            directoryData={data}
                                            className="pb-20"
                                        />
                                    </DirectoryContainer>

                                    <SidebarFooter footer={footer} />
                                </Block>
                            )}
                        </>
                    )}
                </Block>

                <MainContentContainer data-main-content>
                    <Block
                        position="sticky"
                        top="0"
                        zIndex="90"
                        style={getTopbarStyles(
                            enableTopbarAutoHide,
                            showTopbar
                        )}
                    >
                        <Topbar
                            isExpanded={isExpanded}
                            onToggleExpansion={toggleSidebar}
                            showToggleButton={showToggleButton}
                            sidebarTopSlot={sidebarTopSlot}
                            topbar={topbar}
                            leftPanel={leftPanel}
                            merchantInfo={merchantInfo || defaultMerchantInfo}
                            rightActions={rightActions}
                        />
                    </Block>

                    <Block>{children}</Block>
                </MainContentContainer>
            </Block>
        )
    }
)

Sidebar.displayName = 'Sidebar'

export default Sidebar

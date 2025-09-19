import { forwardRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Directory from '../Directory/Directory'
import type { SidebarProps } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import { Topbar } from '../Topbar'
import TenantPanel from './TenantPanel'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'

import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'

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
    background-color: ${FOUNDATION_THEME.colors.gray[0]};
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
        },
        ref
    ) => {
        const [isExpanded, setIsExpanded] = useState<boolean>(true)
        const [showToggleButton, setShowToggleButton] = useState<boolean>(false)
        const [isHovering, setIsHovering] = useState<boolean>(false)
        const [isScrolled, setIsScrolled] = useState<boolean>(false)

        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < BREAKPOINTS.lg

        // Handle keyboard shortcut for sidebar toggle
        useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === sidebarCollapseKey && !isMobile) {
                    event.preventDefault()
                    setIsExpanded(!isExpanded)
                }
            }

            document.addEventListener('keydown', handleKeyPress)
            return () => {
                document.removeEventListener('keydown', handleKeyPress)
            }
        }, [isExpanded, isMobile, sidebarCollapseKey])

        useEffect(() => {
            if (isMobile && isExpanded) {
                setIsExpanded(false)
                setIsHovering(false)
                return
            }

            if (!isExpanded && !isMobile) {
                const timer = setTimeout(() => {
                    setShowToggleButton(true)
                }, 50)
                return () => clearTimeout(timer)
            } else {
                setShowToggleButton(false)
            }
        }, [isExpanded, isMobile])

        useEffect(() => {
            const directoryContainer = document.querySelector(
                '[data-directory-container]'
            )
            if (!directoryContainer) return

            const handleScroll = () => {
                setIsScrolled(directoryContainer.scrollTop > 0)
            }

            directoryContainer.addEventListener('scroll', handleScroll)
            return () =>
                directoryContainer.removeEventListener('scroll', handleScroll)
        }, [])

        const toggleSidebar = () => {
            setIsExpanded(!isExpanded)
            setIsHovering(false)
        }

        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => setIsHovering(false)

        const defaultMerchantInfo = {
            items: [
                {
                    label: 'juspay',
                    value: 'juspay',
                    icon: null,
                },
            ],
            selected: 'juspay',
            onSelect: (value: string) => {
                console.log('Selected merchant:', value)
            },
        }
        const hasLeftPanel = Boolean(leftPanel?.items?.length)

        return (
            <Block
                ref={ref}
                width="100%"
                height="100%"
                display="flex"
                backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                position="relative"
            >
                {!isExpanded && !isMobile && (
                    <Block
                        position="absolute"
                        left="0"
                        top="0"
                        width="20px"
                        height="100%"
                        zIndex="30"
                        onMouseEnter={handleMouseEnter}
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    />
                )}

                <Block
                    backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                    maxWidth={
                        isExpanded || isHovering
                            ? hasLeftPanel
                                ? '300px'
                                : '250px'
                            : '0'
                    }
                    width="100%"
                    borderRight={
                        isExpanded || isHovering
                            ? `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
                            : 'none'
                    }
                    display={isMobile ? 'none' : 'flex'}
                    position={!isExpanded ? 'absolute' : 'relative'}
                    zIndex={!isExpanded ? '20' : 'auto'}
                    height="100%"
                    style={{
                        willChange: 'transform',
                        transitionDuration: '150ms',
                        animation: 'slide-in-from-left 0.3s ease-out',
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    {(isExpanded || isHovering) && !isMobile && (
                        <>
                            {hasLeftPanel && leftPanel && (
                                <TenantPanel
                                    items={leftPanel.items}
                                    selected={leftPanel.selected}
                                    onSelect={leftPanel.onSelect}
                                    maxVisibleItems={leftPanel.maxVisibleItems}
                                />
                            )}

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

                                <DirectoryContainer data-directory-container>
                                    <Directory
                                        directoryData={data}
                                        className="pb-20"
                                    />
                                </DirectoryContainer>

                                <SidebarFooter footer={footer} />
                            </Block>
                        </>
                    )}
                </Block>

                <MainContentContainer>
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

                    <Block>{children}</Block>
                </MainContentContainer>
            </Block>
        )
    }
)

Sidebar.displayName = 'Sidebar'

export default Sidebar

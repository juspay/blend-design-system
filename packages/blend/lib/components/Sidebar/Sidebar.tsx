import { forwardRef, useState, useEffect, useCallback } from 'react'
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
    isControlledSidebar,
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
            isExpanded: controlledIsExpanded,
            onExpandedChange,
            defaultIsExpanded = true,
        },
        ref
    ) => {
        const isControlled = isControlledSidebar(controlledIsExpanded)

        const [internalExpanded, setInternalExpanded] =
            useState<boolean>(defaultIsExpanded)
        const [showToggleButton, setShowToggleButton] = useState<boolean>(false)
        const [isHovering, setIsHovering] = useState<boolean>(false)
        const [isScrolled, setIsScrolled] = useState<boolean>(false)

        const isExpanded = isControlled
            ? controlledIsExpanded!
            : internalExpanded

        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < BREAKPOINTS.lg

        // Use custom hook for topbar auto-hide
        const showTopbar = useTopbarAutoHide(enableTopbarAutoHide)

        const toggleSidebar = useCallback(() => {
            const newValue = !isExpanded

            if (!isControlled) {
                setInternalExpanded(newValue)
            }

            onExpandedChange?.(newValue)
        }, [isExpanded, isControlled, onExpandedChange, setInternalExpanded])

        const handleToggle = useCallback(() => {
            toggleSidebar()
            setIsHovering(false)
        }, [toggleSidebar, setIsHovering])

        // Keyboard shortcut handler
        useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === sidebarCollapseKey && !isMobile) {
                    event.preventDefault()
                    toggleSidebar()
                }
            }
            document.addEventListener('keydown', handleKeyPress)
            return () => document.removeEventListener('keydown', handleKeyPress)
        }, [isMobile, sidebarCollapseKey, toggleSidebar])

        // Mobile and toggle button logic
        useEffect(() => {
            if (isMobile && isExpanded) {
                setIsHovering(false)
                if (isControlled) {
                    // In controlled mode, only notify parent
                    // Parent is responsible for updating isExpanded prop
                    onExpandedChange?.(false)
                } else {
                    // In uncontrolled mode, auto-collapse
                    setInternalExpanded(false)
                }
                return
            }

            if (!isExpanded && !isMobile) {
                const timer = setTimeout(() => setShowToggleButton(true), 50)
                return () => clearTimeout(timer)
            }

            setShowToggleButton(false)
        }, [
            isExpanded,
            isMobile,
            isControlled,
            onExpandedChange,
            setInternalExpanded,
        ])

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

        const handleMouseEnter = useCallback(() => setIsHovering(true), [])
        const handleMouseLeave = useCallback(() => setIsHovering(false), [])
        const hasLeftPanel = Boolean(leftPanel?.items?.length)
        const defaultMerchantInfo = getDefaultMerchantInfo()
        const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')

        const getSidebarState = () => {
            if (isExpanded) return 'expanded'
            if (isHovering) return 'intermediate'
            return 'closed'
        }

        const getSidebarZIndex = () => {
            const state = getSidebarState()
            if (state === 'intermediate') return '98'
            return '48'
        }

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
                    zIndex={getSidebarZIndex()}
                    height="100%"
                    style={{
                        willChange: 'transform',
                        transitionDuration: '150ms',
                        animation: 'slide-in-from-left 0.3s ease-out',
                        overflow: 'hidden',
                    }}
                    onMouseLeave={handleMouseLeave}
                    data-is-sidebar-expanded={isExpanded}
                    boxShadow={
                        isHovering
                            ? '0 3px 16px 3px rgba(5, 5, 6, 0.07)'
                            : 'none'
                    }
                    data-sidebar-state={getSidebarState()}
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
                                        onToggle={handleToggle}
                                    />

                                    <DirectoryContainer
                                        data-directory-container
                                    >
                                        <Directory directoryData={data} />
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
                            onToggleExpansion={handleToggle}
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

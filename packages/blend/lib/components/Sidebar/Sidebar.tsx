import { forwardRef, useState, useEffect, useCallback, useMemo } from 'react'
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
    getMobileNavigationItems,
    MOBILE_NAVIGATION_COLLAPSED_HEIGHT,
    MOBILE_NAVIGATION_SAFE_AREA,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import SidebarMobileNavigation from './SidebarMobile'

// Styled wrappers for pseudo-element support (::webkit-scrollbar)
// Block primitive doesn't support pseudo-elements, so we need minimal styled wrappers
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

const COLLAPSED_MOBILE_PADDING = `calc(${MOBILE_NAVIGATION_COLLAPSED_HEIGHT} + ${MOBILE_NAVIGATION_SAFE_AREA})`

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
            isTopbarVisible,
            onTopbarVisibilityChange,
            defaultIsTopbarVisible = true,
            isExpanded: controlledIsExpanded,
            onExpandedChange,
            defaultIsExpanded = true,
            tenantPanelOnlyMode = false,
            showPrimaryActionButton,
            primaryActionButtonProps,
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
        const isTenantPanelOnlyMode = tenantPanelOnlyMode && hasLeftPanel
        const defaultMerchantInfo = getDefaultMerchantInfo()
        const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')
        const [mobileNavigationHeight, setMobileNavigationHeight] =
            useState<string>()

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

        const mobileNavigationItems = useMemo(
            () => getMobileNavigationItems(data),
            [data]
        )

        useEffect(() => {
            if (!isMobile || mobileNavigationItems.length === 0) {
                setMobileNavigationHeight(undefined)
            }
        }, [isMobile, mobileNavigationItems])

        const handleMobileNavigationHeightChange = useCallback(
            (height: string) => {
                setMobileNavigationHeight(height)
            },
            []
        )

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
                {/* Hover trigger area - only show when NOT in tenant panel only mode */}
                {!isExpanded && !isMobile && !isTenantPanelOnlyMode && (
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
                    maxWidth={
                        isTenantPanelOnlyMode
                            ? 'fit-content'
                            : getSidebarWidth(
                                  isExpanded,
                                  isHovering,
                                  hasLeftPanel,
                                  tokens
                              )
                    }
                    width={isTenantPanelOnlyMode ? 'auto' : '100%'}
                    borderRight={
                        isTenantPanelOnlyMode
                            ? tokens.borderRight
                            : getSidebarBorder(isExpanded, isHovering, tokens)
                    }
                    display={isMobile ? 'none' : 'flex'}
                    position={
                        isTenantPanelOnlyMode
                            ? 'relative'
                            : !isExpanded
                              ? 'absolute'
                              : 'relative'
                    }
                    zIndex={isTenantPanelOnlyMode ? '48' : getSidebarZIndex()}
                    height="100%"
                    style={{
                        willChange: 'transform',
                        transitionDuration: '150ms',
                        animation: 'slide-in-from-left 0.3s ease-out',
                        overflow: 'hidden',
                    }}
                    onMouseLeave={
                        isTenantPanelOnlyMode ? undefined : handleMouseLeave
                    }
                    data-is-sidebar-expanded={
                        isTenantPanelOnlyMode ? 'false' : isExpanded
                    }
                    boxShadow={
                        isTenantPanelOnlyMode
                            ? 'none'
                            : isHovering
                              ? '0 3px 16px 3px rgba(5, 5, 6, 0.07)'
                              : 'none'
                    }
                    data-sidebar-state={
                        isTenantPanelOnlyMode
                            ? 'tenant-only'
                            : getSidebarState()
                    }
                >
                    {!isMobile && (
                        <>
                            {/* Tenant Panel Only Mode: Show only tenant panel, always visible */}
                            {isTenantPanelOnlyMode && leftPanel && (
                                <TenantPanel
                                    items={leftPanel.items}
                                    selected={leftPanel.selected}
                                    onSelect={leftPanel.onSelect}
                                    maxVisibleItems={leftPanel.maxVisibleItems}
                                    tenantSlot1={leftPanel.tenantSlot1}
                                    tenantSlot2={leftPanel.tenantSlot2}
                                    tenantFooter={leftPanel.tenantFooter}
                                />
                            )}

                            {/* Normal Mode: Show tenant panel + sidebar content on expand/hover */}
                            {!isTenantPanelOnlyMode && (
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
                                                tenantSlot1={
                                                    leftPanel.tenantSlot1
                                                }
                                                tenantSlot2={
                                                    leftPanel.tenantSlot2
                                                }
                                                tenantFooter={
                                                    leftPanel.tenantFooter
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
                                                sidebarCollapseKey={
                                                    sidebarCollapseKey
                                                }
                                                onToggle={handleToggle}
                                            />

                                            <DirectoryContainer
                                                data-directory-container
                                            >
                                                <Directory
                                                    directoryData={data}
                                                />
                                            </DirectoryContainer>

                                            <SidebarFooter footer={footer} />
                                        </Block>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Block>

                <MainContentContainer
                    data-main-content
                    paddingBottom={
                        isMobile && mobileNavigationItems.length > 0
                            ? (mobileNavigationHeight ??
                              COLLAPSED_MOBILE_PADDING)
                            : undefined
                    }
                >
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
                            isVisible={isTopbarVisible}
                            onVisibilityChange={onTopbarVisibilityChange}
                            defaultIsVisible={defaultIsTopbarVisible}
                        />
                    </Block>

                    <Block>{children}</Block>
                </MainContentContainer>

                {isMobile && mobileNavigationItems.length > 0 && (
                    <SidebarMobileNavigation
                        items={mobileNavigationItems}
                        onHeightChange={handleMobileNavigationHeightChange}
                        showPrimaryActionButton={showPrimaryActionButton}
                        primaryActionButtonProps={primaryActionButtonProps}
                    />
                )}
            </Block>
        )
    }
)

Sidebar.displayName = 'Sidebar'

export default Sidebar

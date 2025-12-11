import {
    forwardRef,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useId,
} from 'react'
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
            panelOnlyMode = false,
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

        // Keyboard shortcut handler with screen reader announcement
        useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
                // Only trigger if not typing in an input/textarea
                const target = event.target as HTMLElement
                const isInputElement =
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.isContentEditable

                if (
                    event.key === sidebarCollapseKey &&
                    !isMobile &&
                    !isInputElement
                ) {
                    event.preventDefault()
                    toggleSidebar()

                    // Announce state change to screen readers
                    const announcement = document.createElement('div')
                    announcement.setAttribute('role', 'status')
                    announcement.setAttribute('aria-live', 'polite')
                    announcement.setAttribute('aria-atomic', 'true')
                    announcement.style.position = 'absolute'
                    announcement.style.left = '-10000px'
                    announcement.style.width = '1px'
                    announcement.style.height = '1px'
                    announcement.style.overflow = 'hidden'
                    announcement.textContent = `Sidebar ${!isExpanded ? 'expanded' : 'collapsed'}`
                    document.body.appendChild(announcement)

                    // Remove announcement after screen reader has time to read it
                    setTimeout(() => {
                        document.body.removeChild(announcement)
                    }, 1000)
                }
            }
            document.addEventListener('keydown', handleKeyPress)
            return () => document.removeEventListener('keydown', handleKeyPress)
        }, [isMobile, sidebarCollapseKey, toggleSidebar, isExpanded])

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
        const isPanelOnlyMode = panelOnlyMode && hasLeftPanel
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

        // Generate unique IDs for ARIA relationships
        const baseId = useId()
        const sidebarId = `${baseId}-sidebar`
        const sidebarNavId = `${baseId}-sidebar-nav`
        const skipToContentId = `${baseId}-skip-to-content`
        const skipToNavId = `${baseId}-skip-to-nav`

        // Generate accessible label for sidebar
        const sidebarLabel = useMemo(() => {
            const state = isExpanded ? 'expanded' : 'collapsed'
            return `Sidebar navigation, ${state}`
        }, [isExpanded])

        return (
            <Block
                ref={ref}
                width="100%"
                height="100%"
                display="flex"
                backgroundColor={tokens.backgroundColor}
                position="relative"
                zIndex={99}
                id={sidebarId}
            >
                {/* Skip Links for Keyboard Navigation */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '0',
                        zIndex: 10000,
                    }}
                >
                    <a
                        href={`#${skipToNavId}`}
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            padding: '8px 16px',
                            backgroundColor: '#000',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 500,
                            zIndex: 10000,
                            transform: 'translateY(-100%)',
                            transition: 'transform 0.2s',
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.transform =
                                'translateY(-100%)'
                        }}
                    >
                        Skip to navigation
                    </a>
                    <a
                        href={`#${skipToContentId}`}
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '150px',
                            padding: '8px 16px',
                            backgroundColor: '#000',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 500,
                            zIndex: 10000,
                            transform: 'translateY(-100%)',
                            transition: 'transform 0.2s',
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.transform =
                                'translateY(-100%)'
                        }}
                    >
                        Skip to main content
                    </a>
                </div>
                {/* Hover trigger area - only show when NOT in panel only mode */}
                {!isExpanded && !isMobile && !isPanelOnlyMode && (
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
                    as="nav"
                    backgroundColor={tokens.backgroundColor}
                    maxWidth={
                        isPanelOnlyMode
                            ? 'fit-content'
                            : getSidebarWidth(
                                  isExpanded,
                                  isHovering,
                                  hasLeftPanel,
                                  tokens
                              )
                    }
                    width={isPanelOnlyMode ? 'auto' : '100%'}
                    borderRight={
                        isPanelOnlyMode
                            ? tokens.borderRight
                            : getSidebarBorder(isExpanded, isHovering, tokens)
                    }
                    display={isMobile ? 'none' : 'flex'}
                    position={
                        isPanelOnlyMode
                            ? 'relative'
                            : !isExpanded
                              ? 'absolute'
                              : 'relative'
                    }
                    zIndex={isPanelOnlyMode ? '48' : getSidebarZIndex()}
                    height="100%"
                    id={skipToNavId}
                    role="navigation"
                    aria-label={sidebarLabel}
                    aria-expanded={
                        isPanelOnlyMode ? undefined : isExpanded ? true : false
                    }
                    style={{
                        willChange: 'transform',
                        transitionDuration: '150ms',
                        animation: 'slide-in-from-left 0.3s ease-out',
                        overflow: 'hidden',
                    }}
                    onMouseLeave={
                        isPanelOnlyMode ? undefined : handleMouseLeave
                    }
                    data-is-sidebar-expanded={
                        isPanelOnlyMode ? 'false' : isExpanded
                    }
                    boxShadow={
                        isPanelOnlyMode
                            ? 'none'
                            : isHovering
                              ? '0 3px 16px 3px rgba(5, 5, 6, 0.07)'
                              : 'none'
                    }
                    data-sidebar-state={
                        isPanelOnlyMode ? 'panel-only' : getSidebarState()
                    }
                >
                    {!isMobile && (
                        <>
                            {isPanelOnlyMode && leftPanel && (
                                <TenantPanel
                                    items={leftPanel.items}
                                    selected={leftPanel.selected}
                                    onSelect={leftPanel.onSelect}
                                    tenantSlot1={leftPanel.tenantSlot1}
                                    tenantSlot2={leftPanel.tenantSlot2}
                                    tenantFooter={leftPanel.tenantFooter}
                                />
                            )}

                            {!isPanelOnlyMode && (
                                <>
                                    {hasLeftPanel &&
                                        leftPanel &&
                                        (isExpanded || isHovering) && (
                                            <TenantPanel
                                                items={leftPanel.items}
                                                selected={leftPanel.selected}
                                                onSelect={leftPanel.onSelect}
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
                                                sidebarNavId={sidebarNavId}
                                            />

                                            <DirectoryContainer
                                                data-directory-container
                                                id={sidebarNavId}
                                                role="region"
                                                aria-label="Navigation menu"
                                            >
                                                <Directory
                                                    directoryData={data}
                                                    idPrefix={`${baseId}-`}
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
                    as="main"
                    id={skipToContentId}
                    data-main-content
                    role="main"
                    aria-label="Main content"
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
                            panelOnlyMode={isPanelOnlyMode}
                            sidebarTopSlot={sidebarTopSlot}
                            topbar={topbar}
                            leftPanel={leftPanel}
                            merchantInfo={merchantInfo || defaultMerchantInfo}
                            rightActions={rightActions}
                            isVisible={isTopbarVisible}
                            ariaControls={sidebarNavId}
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

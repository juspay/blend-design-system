import {
    forwardRef,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useId,
    useRef,
} from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import type { SidebarProps, SidebarStateChangeType } from './types'
import type { SidebarTokenType } from './sidebar.tokens'
import { Topbar } from '../Topbar'
import TenantPanel from './TenantPanel'
import SidebarContent from './SidebarContent'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    getTopbarStyles,
    useTopbarAutoHide,
    isControlledSidebar,
    getMobileNavigationItems,
    MOBILE_NAVIGATION_COLLAPSED_HEIGHT,
    MOBILE_NAVIGATION_SAFE_AREA,
} from './utils'
import SidebarMobileNavigation from './SidebarMobile'

const getSidebarStatus = (
    isExpanded: boolean,
    isHovering: boolean
): SidebarStateChangeType => {
    if (isHovering) return 'intermediate'
    return isExpanded ? 'expanded' : 'collapsed'
}

const announceSidebarStateChange = (isExpanded: boolean) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    announcement.textContent = `Sidebar ${isExpanded ? 'expanded' : 'collapsed'}`
    document.body.appendChild(announcement)

    // Remove announcement after screen reader has time to read it
    setTimeout(() => {
        document.body.removeChild(announcement)
    }, 1000)
}

const MainContentContainer = styled(Block)`
    display: flex;
    flex-direction: column;
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

const SkipLinks = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    & a {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
        padding: 0.5rem 1rem;
        background: inherit;
    }
    & a:focus {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
        width: auto;
        height: auto;
        overflow: visible;
        clip: auto;
        z-index: 1001;
    }
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
            isTopbarVisible,
            onTopbarVisibilityChange,
            defaultIsTopbarVisible = true,
            isExpanded: controlledIsExpanded,
            onExpandedChange,
            defaultIsExpanded = true,
            // disableIntermediateState = false,
            // hideOnIconOnlyToggle = false,
            showPrimaryActionButton,
            primaryActionButtonProps,
            activeItem,
            onActiveItemChange,
            defaultActiveItem,
            showLeftPanel = true,
            onSidebarStateChange,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'
        const isControlled = isControlledSidebar(controlledIsExpanded)

        // layout / ui state
        const [internalExpanded, setInternalExpanded] =
            useState<boolean>(defaultIsExpanded)
        const [showToggleButton, setShowToggleButton] = useState<boolean>(true)
        const [isScrolled, setIsScrolled] = useState<boolean>(false)
        const [showTopBlur, setShowTopBlur] = useState<boolean>(false)
        const [showBottomBlur, setShowBottomBlur] = useState<boolean>(false)
        const [isHovering, setIsHovering] = useState<boolean>(false)
        const [mobileNavigationHeight, setMobileNavigationHeight] =
            useState<string>()

        // refs
        const tenantPanelRef = useRef<HTMLDivElement>(null)

        // derived state
        const isExpanded = isControlled
            ? controlledIsExpanded!
            : internalExpanded

        const iconOnlyMode = !isExpanded
        const showTopbar = useTopbarAutoHide(enableTopbarAutoHide)
        const isLeftPanelVisible = leftPanel && showLeftPanel

        // Generate unique IDs for ARIA relationships
        const baseId = useId()
        const sidebarId = `${baseId}-sidebar`
        const sidebarNavId = `${baseId}-sidebar-nav`
        const skipToContentId = `${baseId}-skip-to-content`
        const skipToNavId = `${baseId}-skip-to-nav`

        const mobileNavigationItems = useMemo(
            () => getMobileNavigationItems(data),
            [data]
        )

        const sidebarLabel = useMemo(() => {
            const state = isExpanded ? 'expanded' : 'collapsed'
            return `Sidebar navigation, ${state}`
        }, [isExpanded])

        const sidebarStatus = getSidebarStatus(isExpanded, isHovering)

        const shouldRenderMobileNavigation =
            isSmallScreen && mobileNavigationItems.length > 0

        const shouldRenderIntermediateLeftPanel = leftPanel && !showLeftPanel

        const toggleSidebar = useCallback(() => {
            const newValue = !isExpanded

            if (!isControlled) {
                setInternalExpanded(newValue)
            }
            setIsHovering(false)

            onExpandedChange?.(newValue)
        }, [isExpanded, isControlled, onExpandedChange])

        const handleMobileNavigationHeightChange = useCallback(
            (height: string) => {
                setMobileNavigationHeight(height)
            },
            []
        )

        useEffect(() => {
            if (!onSidebarStateChange) return
            onSidebarStateChange(sidebarStatus)
        }, [onSidebarStateChange, sidebarStatus])

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
                    !isSmallScreen &&
                    !isInputElement
                ) {
                    event.preventDefault()
                    toggleSidebar()

                    announceSidebarStateChange(!isExpanded)
                }
            }
            document.addEventListener('keydown', handleKeyPress)
            return () => document.removeEventListener('keydown', handleKeyPress)
        }, [isSmallScreen, sidebarCollapseKey, toggleSidebar, isExpanded])

        // Mobile and toggle button logic
        useEffect(() => {
            if (isSmallScreen && isExpanded) {
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

            if (!isExpanded && !isSmallScreen) {
                const timer = setTimeout(() => setShowToggleButton(true), 50)
                return () => clearTimeout(timer)
            }

            setShowToggleButton(false)
        }, [
            isExpanded,
            isSmallScreen,
            isControlled,
            onExpandedChange,
            setInternalExpanded,
        ])

        useEffect(() => {
            if (!shouldRenderMobileNavigation) {
                setMobileNavigationHeight(undefined)
            }
        }, [shouldRenderMobileNavigation])

        useEffect(() => {
            const directoryContainer = document.querySelector(
                '[data-directory-container]'
            ) as HTMLElement | null
            if (!directoryContainer) return

            const getScrollingElement = (): HTMLElement | null => {
                const navElement = directoryContainer.querySelector('nav')
                const checkElement = (el: HTMLElement): boolean => {
                    const style = window.getComputedStyle(el)
                    const hasOverflow =
                        style.overflow === 'auto' ||
                        style.overflowY === 'auto' ||
                        style.overflow === 'scroll' ||
                        style.overflowY === 'scroll'
                    return hasOverflow && el.scrollHeight > el.clientHeight
                }

                if (navElement && checkElement(navElement as HTMLElement)) {
                    return navElement as HTMLElement
                }
                if (checkElement(directoryContainer)) {
                    return directoryContainer
                }
                return null
            }

            const scrollingElement = getScrollingElement()
            if (!scrollingElement) {
                setShowTopBlur(false)
                setShowBottomBlur(false)
                return
            }

            const updateBlurState = () => {
                const { scrollTop, scrollHeight, clientHeight } =
                    scrollingElement
                const hasScrollableContent = scrollHeight > clientHeight
                const isAtTop = scrollTop <= 5
                const isAtBottom =
                    Math.abs(scrollTop + clientHeight - scrollHeight) <= 5

                setIsScrolled(scrollTop > 0)
                setShowTopBlur(
                    hasScrollableContent && !isAtTop && scrollTop > 5
                )
                setShowBottomBlur(hasScrollableContent && !isAtBottom)
            }

            updateBlurState()

            scrollingElement.addEventListener('scroll', updateBlurState, {
                passive: true,
            })

            const handleResize = () => setTimeout(updateBlurState, 50)
            window.addEventListener('resize', handleResize, { passive: true })

            return () => {
                scrollingElement.removeEventListener('scroll', updateBlurState)
                window.removeEventListener('resize', handleResize)
            }
        }, [isExpanded, data])

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
                <SkipLinks aria-hidden="true">
                    <a href={`#${skipToNavId}`}>Skip to navigation</a>
                    <a href={`#${skipToContentId}`}>Skip to main content</a>
                </SkipLinks>
                <Block
                    as="nav"
                    id={skipToNavId}
                    data-sidebar="sidebar"
                    data-status={sidebarStatus}
                    role="navigation"
                    aria-label={sidebarLabel}
                    aria-expanded={isExpanded}
                    display={isSmallScreen ? 'none' : 'flex'}
                    backgroundColor={tokens.backgroundColor}
                    borderRight={tokens.borderRight}
                    height="100%"
                    position="relative"
                >
                    {!isSmallScreen && (
                        <>
                            {/* left panel */}
                            {isLeftPanelVisible && (
                                <TenantPanel
                                    ref={tenantPanelRef}
                                    items={leftPanel.items}
                                    selected={leftPanel.selected}
                                    onSelect={leftPanel.onSelect}
                                    tenantSlot1={leftPanel.tenantSlot1}
                                    tenantSlot2={leftPanel.tenantSlot2}
                                    tenantFooter={leftPanel.tenantFooter}
                                />
                            )}

                            {/* Main Sidebar with Icon Only Mode */}
                            <SidebarContent
                                sidebarTopSlot={sidebarTopSlot}
                                merchantInfo={merchantInfo}
                                isExpanded={isExpanded}
                                isScrolled={isScrolled}
                                sidebarCollapseKey={sidebarCollapseKey}
                                onToggle={toggleSidebar}
                                sidebarNavId={sidebarNavId}
                                showTopBlur={showTopBlur}
                                showBottomBlur={showBottomBlur}
                                data={data}
                                idPrefix={`${baseId}-`}
                                activeItem={activeItem}
                                onActiveItemChange={onActiveItemChange}
                                defaultActiveItem={defaultActiveItem}
                                iconOnlyMode={iconOnlyMode}
                                footer={footer}
                                setIsHovering={setIsHovering}
                            />

                            {/* Intermediate Sidebar */}

                            {!isExpanded && (
                                <Block
                                    position="absolute"
                                    display="flex"
                                    top={0}
                                    left={isLeftPanelVisible ? '52px' : 0}
                                    width={
                                        isHovering
                                            ? shouldRenderIntermediateLeftPanel
                                                ? '302px'
                                                : '250px'
                                            : 0
                                    }
                                    minWidth={0}
                                    height="100%"
                                    overflow="hidden"
                                    zIndex={99}
                                    aria-hidden="true"
                                    backgroundColor={tokens.backgroundColor}
                                    borderRight={
                                        isHovering ? tokens.borderRight : 'none'
                                    }
                                    boxShadow={
                                        isHovering
                                            ? '4px 0 16px 0 rgba(5, 5, 6, 0.07)'
                                            : 'none'
                                    }
                                    transition="width 0.3s ease-in-out, border 0.2s ease-in-out"
                                    pointerEvents={isHovering ? 'auto' : 'none'}
                                    onMouseLeave={() => setIsHovering(false)}
                                >
                                    {shouldRenderIntermediateLeftPanel && (
                                        <TenantPanel
                                            ref={tenantPanelRef}
                                            items={leftPanel.items}
                                            selected={leftPanel.selected}
                                            onSelect={leftPanel.onSelect}
                                            tenantSlot1={leftPanel.tenantSlot1}
                                            tenantSlot2={leftPanel.tenantSlot2}
                                            tenantFooter={
                                                leftPanel.tenantFooter
                                            }
                                        />
                                    )}
                                    <SidebarContent
                                        sidebarTopSlot={sidebarTopSlot}
                                        merchantInfo={merchantInfo}
                                        isExpanded={isExpanded}
                                        isScrolled={isScrolled}
                                        sidebarCollapseKey={sidebarCollapseKey}
                                        onToggle={toggleSidebar}
                                        sidebarNavId={sidebarNavId}
                                        showTopBlur={showTopBlur}
                                        showBottomBlur={showBottomBlur}
                                        data={data}
                                        idPrefix={`${baseId}-`}
                                        activeItem={activeItem}
                                        onActiveItemChange={onActiveItemChange}
                                        defaultActiveItem={defaultActiveItem}
                                        footer={footer}
                                    />
                                </Block>
                            )}
                        </>
                    )}
                </Block>
                <MainContentContainer
                    as="main"
                    id={skipToContentId}
                    role="main"
                    aria-label="Main content"
                    paddingBottom={
                        shouldRenderMobileNavigation
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
                            onToggleExpansion={toggleSidebar}
                            showToggleButton={showToggleButton}
                            sidebarTopSlot={sidebarTopSlot}
                            topbar={topbar}
                            leftPanel={leftPanel}
                            merchantInfo={merchantInfo}
                            rightActions={rightActions}
                            isVisible={isTopbarVisible}
                            ariaControls={sidebarNavId}
                            onVisibilityChange={onTopbarVisibilityChange}
                            defaultIsVisible={defaultIsTopbarVisible}
                        />
                    </Block>

                    <Block
                        display="flex"
                        flexDirection="column"
                        flexGrow={1}
                        flexShrink={1}
                        flexBasis="0"
                        minHeight="0"
                        overflow="auto"
                        data-main-content
                    >
                        {children}
                    </Block>
                </MainContentContainer>
                {shouldRenderMobileNavigation && (
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

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
import { PanelsTopLeft } from 'lucide-react'
import { Tooltip, TooltipSide } from '../Tooltip'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { useComponentToken } from '../../context/useComponentToken'
import type { ResponsiveTopbarTokens } from '../Topbar/topbar.tokens'

// Styled wrappers for pseudo-element support (::webkit-scrollbar)
// Block primitive doesn't support pseudo-elements, so we need minimal styled wrappers
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
            disableIntermediateState = false,
            iconOnlyMode = false,
            hideOnIconOnlyToggle = false,
            showPrimaryActionButton,
            primaryActionButtonProps,
            activeItem,
            onActiveItemChange,
            defaultActiveItem,
        },
        ref
    ) => {
        const isControlled = isControlledSidebar(controlledIsExpanded)

        const [internalExpanded, setInternalExpanded] =
            useState<boolean>(defaultIsExpanded)
        const [showToggleButton, setShowToggleButton] = useState<boolean>(false)
        const [isHovering, setIsHovering] = useState<boolean>(false)
        const [isScrolled, setIsScrolled] = useState<boolean>(false)
        const [showTopBlur, setShowTopBlur] = useState<boolean>(false)
        const [showBottomBlur, setShowBottomBlur] = useState<boolean>(false)

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

        const handleIconOnlyToggle = useCallback(() => {
            if (hideOnIconOnlyToggle) {
                // Collapse to hide (iconOnlyMode should be turned off by parent)
                if (!isControlled) {
                    setInternalExpanded(false)
                }
                onExpandedChange?.(false)
            } else {
                // Expand to full sidebar
                if (!isControlled) {
                    setInternalExpanded(true)
                }
                onExpandedChange?.(true)
            }
        }, [
            hideOnIconOnlyToggle,
            isControlled,
            onExpandedChange,
            setInternalExpanded,
        ])

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
        }, [isExpanded, iconOnlyMode, data])

        const handleMouseEnter = useCallback(() => {
            if (!disableIntermediateState) {
                setIsHovering(true)
            }
        }, [disableIntermediateState])
        const handleMouseLeave = useCallback(() => {
            if (!disableIntermediateState) {
                setIsHovering(false)
            }
        }, [disableIntermediateState])
        const hasLeftPanel = Boolean(leftPanel?.items?.length)
        const isPanelOnlyMode = panelOnlyMode && hasLeftPanel
        const defaultMerchantInfo = getDefaultMerchantInfo()
        const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')
        const topbarTokens = useComponentToken(
            'TOPBAR'
        ) as ResponsiveTopbarTokens
        const topbarToken = isMobile ? topbarTokens.sm : topbarTokens.lg
        const shouldShowMerchantInTopbar = iconOnlyMode && merchantInfo
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
                {!isExpanded &&
                    !isMobile &&
                    !isPanelOnlyMode &&
                    !iconOnlyMode &&
                    !disableIntermediateState && (
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
                        iconOnlyMode && !isExpanded
                            ? String(tokens.maxWidth.iconOnly)
                            : isPanelOnlyMode
                              ? 'fit-content'
                              : getSidebarWidth(
                                    isExpanded,
                                    isHovering,
                                    hasLeftPanel,
                                    tokens,
                                    false
                                )
                    }
                    width={
                        iconOnlyMode && !isExpanded
                            ? String(tokens.maxWidth.iconOnly)
                            : isPanelOnlyMode
                              ? 'auto'
                              : '100%'
                    }
                    minWidth={
                        iconOnlyMode && !isExpanded
                            ? String(tokens.maxWidth.iconOnly)
                            : undefined
                    }
                    borderRight={
                        isPanelOnlyMode || (iconOnlyMode && !isExpanded)
                            ? tokens.borderRight
                            : getSidebarBorder(isExpanded, isHovering, tokens)
                    }
                    display={isMobile ? 'none' : 'flex'}
                    position={
                        isPanelOnlyMode || (iconOnlyMode && !isExpanded)
                            ? 'relative'
                            : !isExpanded
                              ? 'absolute'
                              : 'relative'
                    }
                    zIndex={
                        isPanelOnlyMode || (iconOnlyMode && !isExpanded)
                            ? '48'
                            : getSidebarZIndex()
                    }
                    height="100%"
                    id={skipToNavId}
                    role="navigation"
                    aria-label={sidebarLabel}
                    aria-expanded={
                        isPanelOnlyMode || (iconOnlyMode && !isExpanded)
                            ? undefined
                            : isExpanded
                              ? true
                              : false
                    }
                    style={{
                        willChange: 'transform',
                        transitionDuration: '150ms',
                        animation: 'slide-in-from-left 0.3s ease-out',
                        overflow: 'hidden',
                    }}
                    onMouseLeave={
                        isPanelOnlyMode ||
                        iconOnlyMode ||
                        disableIntermediateState
                            ? undefined
                            : handleMouseLeave
                    }
                    onMouseEnter={
                        isPanelOnlyMode ||
                        iconOnlyMode ||
                        disableIntermediateState
                            ? undefined
                            : handleMouseEnter
                    }
                    data-is-sidebar-expanded={
                        isPanelOnlyMode || (iconOnlyMode && !isExpanded)
                            ? 'false'
                            : isExpanded
                    }
                    boxShadow={
                        isPanelOnlyMode ||
                        (iconOnlyMode && !isExpanded) ||
                        isExpanded
                            ? 'none'
                            : isHovering
                              ? '0 3px 16px 3px rgba(5, 5, 6, 0.07)'
                              : 'none'
                    }
                    data-sidebar-state={
                        isPanelOnlyMode
                            ? 'panel-only'
                            : iconOnlyMode && !isExpanded
                              ? 'icon-only'
                              : getSidebarState()
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

                            {iconOnlyMode && !isExpanded && (
                                <Block
                                    width={String(tokens.maxWidth.iconOnly)}
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    position="relative"
                                    overflow="hidden"
                                >
                                    <Block
                                        width="100%"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        padding={`${FOUNDATION_THEME.unit[16]} 0`}
                                        backgroundColor={
                                            topbarToken.backgroundColor
                                        }
                                        style={{
                                            backdropFilter:
                                                topbarToken.backdropFilter,
                                        }}
                                    >
                                        <Tooltip
                                            content={`${hideOnIconOnlyToggle ? 'Hide' : 'Expand'} sidebar (${sidebarCollapseKey})`}
                                            side={TooltipSide.RIGHT}
                                        >
                                            <PrimitiveButton
                                                type="button"
                                                onClick={handleIconOnlyToggle}
                                                data-icon="sidebar-hamburger"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                border="none"
                                                backgroundColor={
                                                    tokens.header.toggleButton
                                                        .backgroundColor.default
                                                }
                                                borderRadius="10px"
                                                cursor="pointer"
                                                padding="9px"
                                                aria-label={`${hideOnIconOnlyToggle ? 'Hide' : 'Expand'} sidebar. Press ${sidebarCollapseKey} to toggle.`}
                                                aria-expanded={false}
                                                style={{
                                                    transition:
                                                        'background-color 0.15s ease',
                                                }}
                                                _hover={{
                                                    backgroundColor:
                                                        tokens.header
                                                            .toggleButton
                                                            .backgroundColor
                                                            .hover,
                                                }}
                                            >
                                                <PanelsTopLeft
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[600]
                                                    }
                                                    size={
                                                        tokens.header
                                                            .toggleButton.width
                                                    }
                                                    aria-hidden="true"
                                                />
                                            </PrimitiveButton>
                                        </Tooltip>
                                    </Block>
                                    <DirectoryContainer
                                        data-directory-container
                                        id={sidebarNavId}
                                        role="region"
                                        aria-label="Navigation menu"
                                        $showTopBlur={showTopBlur}
                                        $showBottomBlur={showBottomBlur}
                                        style={{
                                            width: String(
                                                tokens.maxWidth.iconOnly
                                            ),
                                            maxWidth: String(
                                                tokens.maxWidth.iconOnly
                                            ),
                                        }}
                                    >
                                        <Directory
                                            directoryData={data}
                                            idPrefix={`${baseId}-`}
                                            activeItem={activeItem}
                                            onActiveItemChange={
                                                onActiveItemChange
                                            }
                                            defaultActiveItem={
                                                defaultActiveItem
                                            }
                                            iconOnlyMode={!isExpanded}
                                        />
                                    </DirectoryContainer>
                                </Block>
                            )}

                            {iconOnlyMode && isExpanded && (
                                <>
                                    {hasLeftPanel && leftPanel && (
                                        <TenantPanel
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
                                            hideToggleButton={false}
                                        />

                                        <DirectoryContainer
                                            data-directory-container
                                            id={sidebarNavId}
                                            role="region"
                                            aria-label="Navigation menu"
                                            $showTopBlur={showTopBlur}
                                            $showBottomBlur={showBottomBlur}
                                        >
                                            <Directory
                                                directoryData={data}
                                                idPrefix={`${baseId}-`}
                                                activeItem={activeItem}
                                                onActiveItemChange={
                                                    onActiveItemChange
                                                }
                                                defaultActiveItem={
                                                    defaultActiveItem
                                                }
                                                iconOnlyMode={false}
                                            />
                                        </DirectoryContainer>

                                        <SidebarFooter footer={footer} />
                                    </Block>
                                </>
                            )}

                            {!isPanelOnlyMode && !iconOnlyMode && (
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
                                                hideToggleButton={false}
                                            />

                                            <DirectoryContainer
                                                data-directory-container
                                                id={sidebarNavId}
                                                role="region"
                                                aria-label="Navigation menu"
                                                $showTopBlur={showTopBlur}
                                                $showBottomBlur={showBottomBlur}
                                            >
                                                <Directory
                                                    directoryData={data}
                                                    idPrefix={`${baseId}-`}
                                                    activeItem={activeItem}
                                                    onActiveItemChange={
                                                        onActiveItemChange
                                                    }
                                                    defaultActiveItem={
                                                        defaultActiveItem
                                                    }
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
                            showToggleButton={showToggleButton && !iconOnlyMode}
                            panelOnlyMode={isPanelOnlyMode}
                            sidebarTopSlot={sidebarTopSlot}
                            topbar={topbar}
                            leftPanel={leftPanel}
                            merchantInfo={
                                shouldShowMerchantInTopbar
                                    ? merchantInfo
                                    : !iconOnlyMode
                                      ? merchantInfo || defaultMerchantInfo
                                      : undefined
                            }
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
                    >
                        {children}
                    </Block>
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

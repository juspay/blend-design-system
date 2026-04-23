import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useState,
} from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import type { SidebarV2TokensType } from './sidebarV2.tokens'
import type { SidebarV2Props } from './types'
import { SecondarySidebar } from './SecondarySidebar'
import SidebarV2Panel from './SidebarV2Panel'
import { TopbarV2 } from '../TopbarV2'
import type { ResponsiveTopbarV2Tokens } from '../TopbarV2/topbarV2.tokens'
import { SectionStateContext } from '../Directory/Section'
import SidebarV2MobileNavigation from './SidebarV2MobileNavigation'
import { getSidebarV2CollapsedMobilePadding } from './SidebarV2MobileNavigation/utils'
import type { MobileNavigationV2TokenType } from './SidebarV2MobileNavigation/mobile.tokens'
import {
    announceSidebarV2StateChange,
    getSidebarV2MobileNavigationItems,
    getSidebarV2Status,
    getTopbarV2Styles,
    isControlledSidebarV2,
    useTopbarV2AutoHide,
} from './utils'

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

const SidebarV2 = forwardRef<HTMLDivElement, SidebarV2Props>(
    (
        {
            height = '100dvh',
            children,
            data,
            topbar,
            secondarySidebar,
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
            showPrimaryActionButton,
            primaryActionButtonProps,
            activeItem,
            onActiveItemChange,
            defaultActiveItem,
            onSidebarStateChange,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<SidebarV2TokensType>('SIDEBARV2')
        const mobileNavigationTokens =
            useResponsiveTokens<MobileNavigationV2TokenType>(
                'MOBILE_NAVIGATION_V2'
            )
        const topbarTokens =
            useResponsiveTokens<ResponsiveTopbarV2Tokens>('TOPBARV2')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'
        const isControlled = isControlledSidebarV2(controlledIsExpanded)
        const safeDirectory = useMemo(() => data ?? [], [data])
        const collapsedMobilePadding = useMemo(
            () => getSidebarV2CollapsedMobilePadding(mobileNavigationTokens),
            [mobileNavigationTokens]
        )

        const [internalExpanded, setInternalExpanded] =
            useState<boolean>(defaultIsExpanded)
        const [showToggleButton, setShowToggleButton] = useState<boolean>(true)
        const [isScrolled, setIsScrolled] = useState<boolean>(false)
        const [isHovering, setIsHovering] = useState<boolean>(false)
        const [mobileNavigationHeight, setMobileNavigationHeight] =
            useState<string>()

        const [sectionStates, setSectionStates] = useState<
            Map<number, boolean>
        >(new Map())
        const setSectionState = useCallback(
            (index: number, isOpen: boolean) => {
                setSectionStates((prev) => {
                    const next = new Map(prev)
                    next.set(index, isOpen)
                    return next
                })
            },
            []
        )
        const sectionStateValue = useMemo(
            () => ({ sectionStates, setSectionState }),
            [sectionStates, setSectionState]
        )

        const isExpanded = isControlled
            ? controlledIsExpanded!
            : internalExpanded
        const iconOnlyMode = !isExpanded
        const showTopbar = useTopbarV2AutoHide(enableTopbarAutoHide)
        const hasSecondarySidebarItems = !!secondarySidebar?.items?.length
        const shouldRenderSecondarySidebar =
            hasSecondarySidebarItems && isExpanded

        const baseId = useId()
        const sidebarId = `${baseId}-sidebar`
        const sidebarNavId = `${baseId}-sidebar-nav`
        const skipToContentId = `${baseId}-skip-to-content`
        const skipToNavId = `${baseId}-skip-to-nav`
        const secondarySidebarId = `${baseId}-secondary-sidebar`

        const mobileNavigationItems = useMemo(
            () => getSidebarV2MobileNavigationItems(safeDirectory),
            [safeDirectory]
        )

        const sidebarLabel = useMemo(() => {
            const state = isExpanded ? 'expanded' : 'collapsed'
            return `Sidebar navigation, ${state}`
        }, [isExpanded])

        const sidebarStatus = getSidebarV2Status(isExpanded, isHovering)

        const shouldRenderMobileNavigation =
            isSmallScreen && mobileNavigationItems.length > 0

        const toggleSidebar = useCallback(() => {
            const next = !isExpanded
            if (!isControlled) {
                setInternalExpanded(next)
            }
            setIsHovering(false)
            onExpandedChange?.(next)
        }, [isExpanded, isControlled, onExpandedChange])

        const handleMobileNavigationHeightChange = useCallback((h: string) => {
            setMobileNavigationHeight(h)
        }, [])

        useEffect(() => {
            onSidebarStateChange?.(sidebarStatus)
        }, [onSidebarStateChange, sidebarStatus])

        useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
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
                    announceSidebarV2StateChange(!isExpanded)
                }
            }
            document.addEventListener('keydown', handleKeyPress)
            return () => document.removeEventListener('keydown', handleKeyPress)
        }, [isSmallScreen, sidebarCollapseKey, toggleSidebar, isExpanded])

        useEffect(() => {
            if (isSmallScreen && isExpanded) {
                if (isControlled) {
                    onExpandedChange?.(false)
                } else {
                    setInternalExpanded(false)
                }
                return
            }

            if (!isExpanded && !isSmallScreen) {
                const timer = setTimeout(() => setShowToggleButton(true), 50)
                return () => clearTimeout(timer)
            }

            setShowToggleButton(false)
        }, [isExpanded, isSmallScreen, isControlled, onExpandedChange])

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
                setIsScrolled(false)
                return
            }

            const updateScrollState = () => {
                setIsScrolled(scrollingElement.scrollTop > 0)
            }

            updateScrollState()

            scrollingElement.addEventListener('scroll', updateScrollState, {
                passive: true,
            })

            const handleResize = () => setTimeout(updateScrollState, 50)
            window.addEventListener('resize', handleResize, { passive: true })

            return () => {
                scrollingElement.removeEventListener(
                    'scroll',
                    updateScrollState
                )
                window.removeEventListener('resize', handleResize)
            }
        }, [isExpanded, safeDirectory])

        return (
            <SectionStateContext.Provider value={sectionStateValue}>
                <Block
                    ref={ref}
                    width="100%"
                    height={height}
                    display="flex"
                    backgroundColor={tokens.container.backgroundColor}
                    position="relative"
                    zIndex={tokens.container.zIndex}
                    id={sidebarId}
                >
                    <Block
                        as="nav"
                        id={skipToNavId}
                        data-sidebar="sidebar"
                        data-status={sidebarStatus}
                        role="navigation"
                        aria-label={sidebarLabel}
                        aria-expanded={isExpanded}
                        display={isSmallScreen ? 'none' : 'flex'}
                        backgroundColor={tokens.container.backgroundColor}
                        borderRight={tokens.container.borderRight}
                        height="100%"
                        position="relative"
                    >
                        {/* Secondary Sidebar */}
                        {shouldRenderSecondarySidebar && (
                            <SecondarySidebar
                                id={secondarySidebarId}
                                secondarySidebar={secondarySidebar}
                                tokens={tokens}
                            />
                        )}

                        <SidebarV2Panel
                            sidebarTopSlot={sidebarTopSlot}
                            merchantInfo={merchantInfo}
                            isExpanded={isExpanded}
                            isScrolled={isScrolled}
                            sidebarCollapseKey={sidebarCollapseKey}
                            onToggle={toggleSidebar}
                            sidebarNavId={sidebarNavId}
                            data={safeDirectory}
                            idPrefix={`${baseId}-`}
                            activeItem={activeItem}
                            onActiveItemChange={onActiveItemChange}
                            defaultActiveItem={defaultActiveItem}
                            iconOnlyMode={iconOnlyMode}
                            footer={footer}
                            setIsHovering={setIsHovering}
                            sidebarState={sidebarStatus}
                            tokens={tokens}
                        />

                        {!isExpanded && (
                            <Block
                                position="absolute"
                                display="flex"
                                top={0}
                                left={0}
                                width={
                                    isHovering
                                        ? hasSecondarySidebarItems
                                            ? `calc(${tokens.secondarySidebar.width} + ${tokens.primarySidebar.width})`
                                            : tokens.primarySidebar.width
                                        : 0
                                }
                                minWidth={0}
                                height="100%"
                                overflow="hidden"
                                zIndex={tokens.container.zIndex}
                                aria-hidden="true"
                                backgroundColor={
                                    tokens.container.backgroundColor
                                }
                                borderRight={
                                    isHovering
                                        ? tokens.container.borderRight
                                        : 'none'
                                }
                                boxShadow={
                                    isHovering
                                        ? tokens.container.hoverPreview
                                              .boxShadow
                                        : 'none'
                                }
                                transition="width 0.3s ease-in-out, border 0.2s ease-in-out"
                                pointerEvents={isHovering ? 'auto' : 'none'}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {hasSecondarySidebarItems && (
                                    <SecondarySidebar
                                        id={`${secondarySidebarId}-intermediate`}
                                        secondarySidebar={secondarySidebar}
                                        tokens={tokens}
                                    />
                                )}
                                <SidebarV2Panel
                                    sidebarTopSlot={sidebarTopSlot}
                                    merchantInfo={merchantInfo}
                                    isExpanded={isExpanded}
                                    isScrolled={isScrolled}
                                    sidebarCollapseKey={sidebarCollapseKey}
                                    onToggle={toggleSidebar}
                                    sidebarNavId={sidebarNavId}
                                    data={safeDirectory}
                                    idPrefix={`${baseId}-`}
                                    activeItem={activeItem}
                                    onActiveItemChange={onActiveItemChange}
                                    defaultActiveItem={defaultActiveItem}
                                    iconOnlyMode={false}
                                    footer={footer}
                                    sidebarState={sidebarStatus}
                                    tokens={tokens}
                                />
                            </Block>
                        )}
                    </Block>

                    <MainContentContainer
                        as="main"
                        id={skipToContentId}
                        role="main"
                        aria-label="Main content"
                        style={
                            shouldRenderMobileNavigation
                                ? {
                                      paddingBottom:
                                          mobileNavigationHeight ??
                                          collapsedMobilePadding,
                                  }
                                : undefined
                        }
                    >
                        <Block
                            position="sticky"
                            top="0"
                            zIndex={tokens.header.zIndex}
                            style={getTopbarV2Styles(
                                enableTopbarAutoHide,
                                showTopbar,
                                topbarTokens?.[isSmallScreen ? 'sm' : 'lg']
                                    ?.height
                            )}
                        >
                            <TopbarV2
                                isExpanded={isExpanded}
                                onToggleExpansion={toggleSidebar}
                                showToggleButton={showToggleButton}
                                sidebarTopSlot={sidebarTopSlot}
                                topbar={topbar}
                                secondarySidebar={secondarySidebar}
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
                        <SidebarV2MobileNavigation
                            items={mobileNavigationItems}
                            onHeightChange={handleMobileNavigationHeightChange}
                            showPrimaryActionButton={showPrimaryActionButton}
                            primaryActionButtonProps={primaryActionButtonProps}
                        />
                    )}
                </Block>
            </SectionStateContext.Provider>
        )
    }
)

SidebarV2.displayName = 'SidebarV2'

export default SidebarV2

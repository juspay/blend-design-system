import * as React from 'react'
import {
    forwardRef,
    useMemo,
    useCallback,
    useId,
    useEffect,
    useRef,
} from 'react'
import { type TabsV2ListProps, TabsV2Variant } from './tabsV2.types'
import { StyledTabsV2List } from './StyledTabsV2'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import { useTheme } from '../../context/ThemeContext'
import { Theme } from '../../context/theme.enum'
import { useTabsV2Chrome } from './useTabsV2Chrome'
import { calculateTabIndicatorPosition } from './tabsV2.utils'

const TabsV2List = forwardRef<HTMLDivElement, TabsV2ListProps>(
    (
        {
            className,
            variant: variantProp,
            size: sizeProp,
            expanded: expandedProp,
            fitContent: fitContentProp,
            disable: disableProp,
            showSkeleton: showSkeletonProp,
            skeletonVariant: skeletonVariantProp,
            stickyHeader: stickyHeaderProp,
            offsetTop: offsetTopProp,
            children,
        },
        ref
    ) => {
        const chrome = useTabsV2Chrome()
        const variant = variantProp ?? chrome.variant ?? TabsV2Variant.UNDERLINE
        const size = sizeProp ?? chrome.size
        const expanded = expandedProp ?? chrome.expanded ?? false
        const fitContent = fitContentProp ?? chrome.fitContent ?? false
        const disable = disableProp ?? chrome.disable ?? false
        const showSkeleton = showSkeletonProp ?? chrome.showSkeleton ?? false
        const skeletonVariant =
            skeletonVariantProp ?? chrome.skeletonVariant ?? 'pulse'
        const stickyHeader = stickyHeaderProp ?? chrome.stickyHeader ?? false
        const offsetTop = offsetTopProp ?? chrome.offsetTop ?? 0
        const activeTab = chrome.activeTab ?? ''

        const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')
        const { theme, foundationTokens } = useTheme()
        const isDarkTheme = theme === Theme.DARK || theme === 'dark'
        const stickyHeaderBackground = isDarkTheme
            ? foundationTokens.colors.gray[900]
            : foundationTokens.colors.gray[0]
        const tabsGroupId = useId()

        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const tabsListRef = useRef<HTMLDivElement>(null)
        const tabRefsMap = useRef<Map<string, HTMLButtonElement>>(new Map())
        const isScrollingRef = useRef(false)
        const hasMountedRef = useRef(false)

        const hasAnyChildSkeleton = useMemo(() => {
            if (showSkeleton) return true

            return React.Children.toArray(children).some((child) => {
                if (!React.isValidElement(child)) return false
                const props = child.props as Record<string, unknown>
                return props.showSkeleton === true
            })
        }, [children, showSkeleton])

        const updateIndicator = useCallback(() => {
            if (variant !== TabsV2Variant.UNDERLINE || hasAnyChildSkeleton) {
                return
            }

            const listElement = tabsListRef.current
            const activeTabElement = tabRefsMap.current?.get(activeTab)

            if (!activeTabElement || !listElement) {
                return
            }

            const { tabLeft, tabWidth } = calculateTabIndicatorPosition(
                activeTabElement,
                listElement
            )

            listElement.style.setProperty(
                '--tabs-indicator-left',
                `${tabLeft}px`
            )
            listElement.style.setProperty(
                '--tabs-indicator-width',
                `${tabWidth}`
            )
        }, [activeTab, variant, hasAnyChildSkeleton])

        useEffect(() => {
            if (
                !activeTab ||
                variant !== TabsV2Variant.UNDERLINE ||
                hasAnyChildSkeleton
            ) {
                return
            }

            const listElement = tabsListRef.current
            const activeTabElement = tabRefsMap.current?.get(activeTab)

            if (!activeTabElement || !listElement) {
                return
            }

            const needsDelay = !hasMountedRef.current
            const delay = needsDelay ? 100 : 0

            const timeout = setTimeout(() => {
                updateIndicator()
                hasMountedRef.current = true
            }, delay)

            window.addEventListener('resize', updateIndicator)

            const resizeObserver = new ResizeObserver(() => {
                updateIndicator()
            })

            resizeObserver.observe(listElement)
            if (listElement.parentElement) {
                resizeObserver.observe(listElement.parentElement)
            }

            return () => {
                clearTimeout(timeout)
                window.removeEventListener('resize', updateIndicator)
                resizeObserver.disconnect()
            }
        }, [activeTab, variant, hasAnyChildSkeleton, updateIndicator])

        useEffect(() => {
            if (!activeTab || isScrollingRef.current) {
                return
            }

            const scrollContainer = scrollContainerRef.current
            const activeTabElement = tabRefsMap.current?.get(activeTab)

            if (!activeTabElement) {
                return
            }

            if (!scrollContainer) {
                updateIndicator()
                return
            }

            const containerRect = scrollContainer.getBoundingClientRect()
            const tabRect = activeTabElement.getBoundingClientRect()

            const isTabVisible =
                tabRect.left >= containerRect.left &&
                tabRect.right <= containerRect.right

            if (!isTabVisible) {
                isScrollingRef.current = true

                const containerWidth = scrollContainer.offsetWidth
                const tabOffsetLeft = activeTabElement.offsetLeft
                const tabWidth = activeTabElement.offsetWidth

                scrollContainer.scrollTo({
                    left: Math.max(
                        0,
                        tabOffsetLeft - containerWidth / 2 + tabWidth / 2
                    ),
                    behavior: 'smooth',
                })

                const scrollTimer = setTimeout(() => {
                    isScrollingRef.current = false
                    updateIndicator()
                }, 500)

                return () => clearTimeout(scrollTimer)
            } else {
                updateIndicator()
            }
        }, [activeTab, updateIndicator])

        const registerTabRef = useCallback(
            (node: HTMLButtonElement | null, value: string) => {
                if (node && value) {
                    tabRefsMap.current.set(value, node)
                } else if (value) {
                    tabRefsMap.current.delete(value)
                }
            },
            []
        )

        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                tabsListRef.current = node
                if (typeof ref === 'function') {
                    ref(node)
                } else if (ref) {
                    ref.current = node
                }
            },
            [ref]
        )

        const renderChildren = () => {
            return React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child

                const existingProps = child.props as Record<string, unknown>
                const childDisable =
                    'disable' in existingProps
                        ? (existingProps.disable as boolean | undefined)
                        : undefined
                const childValue =
                    'value' in existingProps
                        ? (existingProps.value as string)
                        : ''

                const isTabsTrigger =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsV2Trigger'

                const childProps = {
                    ...existingProps,
                    disable: childDisable || disable,
                    variant,
                    size,
                    isActive: childValue === activeTab,
                    tabsGroupId,
                    ...(isTabsTrigger && {
                        showSkeleton:
                            'showSkeleton' in existingProps
                                ? existingProps.showSkeleton
                                : showSkeleton,
                        skeletonVariant:
                            'skeletonVariant' in existingProps
                                ? existingProps.skeletonVariant
                                : skeletonVariant,
                    }),
                    ref: (node: HTMLButtonElement) =>
                        registerTabRef(node, childValue),
                }

                return React.cloneElement(child, childProps)
            })
        }

        return (
            <Block
                data-element="tabs-list"
                data-status={expanded ? 'expanded' : 'collapsed'}
                style={{
                    position: stickyHeader ? 'sticky' : 'relative',
                    top: stickyHeader ? offsetTop : 'auto',
                    zIndex: stickyHeader ? 50 : 'auto',
                    backgroundColor: stickyHeader
                        ? stickyHeaderBackground
                        : 'transparent',
                    borderBottom:
                        variant === TabsV2Variant.UNDERLINE &&
                        !hasAnyChildSkeleton
                            ? tabsToken.borderBottom[variant]
                            : 'none',
                    boxShadow: stickyHeader
                        ? tabsToken.chrome.stickyHeaderShadow
                        : 'none',
                }}
            >
                <Block
                    ref={scrollContainerRef}
                    style={{
                        overflowX: 'auto',
                        overflowY: 'visible',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    className="hide-scrollbar"
                >
                    <Block
                        style={{
                            position: 'relative',
                            width: fitContent ? 'fit-content' : '100%',
                        }}
                    >
                        <StyledTabsV2List
                            ref={setRefs}
                            className={className}
                            $variant={variant}
                            $size={size}
                            $expanded={expanded}
                            $fitContent={fitContent}
                            $tabsToken={tabsToken}
                            $hideIndicator={hasAnyChildSkeleton}
                            style={{
                                display: 'flex',
                                minWidth: 'max-content',
                            }}
                        >
                            {renderChildren()}
                        </StyledTabsV2List>
                    </Block>
                </Block>
            </Block>
        )
    }
)

TabsV2List.displayName = 'TabsV2List'

export default TabsV2List

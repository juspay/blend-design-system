import * as React from 'react'
import {
    forwardRef,
    useMemo,
    useCallback,
    useId,
    useEffect,
    useRef,
} from 'react'
import {
    type TabsV2ListProps,
    type TabsV2TriggerProps,
    TabsV2Variant,
} from './tabsV2.types'
import { StyledTabsList } from './StyledTabsV2'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import { useTheme } from '../../context/ThemeContext'
import { Theme } from '../../context/theme.enum'
import { useTabsV2Context } from './tabsV2.context'
import { calculateTabIndicatorPosition } from './tabsV2.utils'

const TabsV2List = forwardRef<HTMLDivElement, TabsV2ListProps>(
    (
        {
            className,
            variant: variantProp,
            size: sizeProp,
            expanded: expandedProp,
            fitContent: fitContentProp,
            disabled: disabledProp,
            showSkeleton: showSkeletonProp,
            skeletonVariant: skeletonVariantProp,
            stickyHeader: stickyHeaderProp,
            offsetTop: offsetTopProp,
            children,
        },
        ref
    ) => {
        const context = useTabsV2Context()
        const variant =
            variantProp ?? context.variant ?? TabsV2Variant.UNDERLINE
        const size = sizeProp ?? context.size
        const expanded = expandedProp ?? context.expanded ?? false
        const fitContent = fitContentProp ?? context.fitContent ?? false
        const disabled = disabledProp ?? context.disabled ?? false
        const showSkeleton = showSkeletonProp ?? context.showSkeleton ?? false
        const skeletonVariant =
            skeletonVariantProp ?? context.skeletonVariant ?? 'pulse'
        const stickyHeader = stickyHeaderProp ?? context.stickyHeader ?? false
        const offsetTop = offsetTopProp ?? context.offsetTop ?? 0
        const activeTab = context.activeTab ?? ''

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

        const hasAnySkeleton = useMemo(() => {
            if (showSkeleton) return true

            return React.Children.toArray(children).some((child) => {
                if (!React.isValidElement(child)) return false
                const props = child.props as Record<string, unknown>
                return props.showSkeleton === true
            })
        }, [children, showSkeleton])

        const updateIndicator = useCallback(() => {
            if (variant !== TabsV2Variant.UNDERLINE || hasAnySkeleton) {
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
        }, [activeTab, variant, hasAnySkeleton])

        useEffect(() => {
            if (
                !activeTab ||
                variant !== TabsV2Variant.UNDERLINE ||
                hasAnySkeleton
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
        }, [activeTab, variant, hasAnySkeleton, updateIndicator])

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
                const childValue =
                    'value' in existingProps
                        ? (existingProps.value as string)
                        : ''

                const isTabsTrigger =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsV2Trigger'

                // Important: only clone/inject props for actual TabsV2Trigger children.
                // For any other children, return as-is to avoid React warnings
                // (unknown props forwarded to DOM) and avoid attaching refs to
                // non-ref-forwarding components.
                if (!isTabsTrigger) return child

                const childDisable =
                    'disable' in existingProps
                        ? (existingProps.disable as boolean | undefined)
                        : 'disabled' in existingProps
                          ? (existingProps.disabled as boolean | undefined)
                          : undefined

                return React.cloneElement(
                    child as React.ReactElement<TabsV2TriggerProps>,
                    {
                        ...existingProps,
                        disabled: childDisable || disabled,
                        variant,
                        size,
                        isActive: childValue === activeTab,
                        tabsGroupId,
                        showSkeleton:
                            'showSkeleton' in existingProps
                                ? (existingProps.showSkeleton as boolean)
                                : showSkeleton,
                        skeletonVariant:
                            'skeletonVariant' in existingProps
                                ? (existingProps.skeletonVariant as
                                      | TabsV2TriggerProps['skeletonVariant']
                                      | undefined)
                                : skeletonVariant,
                        ref: (node: HTMLButtonElement | null) =>
                            registerTabRef(node, childValue),
                    } as any
                )
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
                        variant === TabsV2Variant.UNDERLINE && !hasAnySkeleton
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
                        <StyledTabsList
                            ref={setRefs}
                            className={className}
                            $variant={variant}
                            $size={size}
                            $expanded={expanded}
                            $fitContent={fitContent}
                            $tabsToken={tabsToken}
                            $hideIndicator={hasAnySkeleton}
                            style={{
                                display: 'flex',
                                minWidth: 'max-content',
                            }}
                        >
                            {renderChildren()}
                        </StyledTabsList>
                    </Block>
                </Block>
            </Block>
        )
    }
)

TabsV2List.displayName = 'TabsV2List'

export default TabsV2List

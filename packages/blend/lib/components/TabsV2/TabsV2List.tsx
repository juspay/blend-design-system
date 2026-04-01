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
            ...rest
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
        const tabRefsMap = useRef<Map<string, HTMLElement>>(new Map())
        const isScrollingRef = useRef(false)
        const hasMountedRef = useRef(false)

        const hasAnySkeleton = useMemo(() => {
            if (showSkeleton) return true

            const hasSkeletonInTree = (nodes: React.ReactNode): boolean => {
                return React.Children.toArray(nodes).some((child) => {
                    if (!React.isValidElement(child)) return false

                    const props = child.props as {
                        showSkeleton?: boolean
                        children?: React.ReactNode
                    }

                    if (props.showSkeleton === true) {
                        return true
                    }

                    if (props.children) {
                        return hasSkeletonInTree(props.children)
                    }

                    return false
                })
            }

            return hasSkeletonInTree(children)
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
        }, [activeTab, variant, hasAnySkeleton, expanded, fitContent])

        const childrenCount = React.Children.count(children)

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
        }, [
            activeTab,
            variant,
            hasAnySkeleton,
            updateIndicator,
            childrenCount,
            expanded,
            fitContent,
        ])

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
            (node: HTMLElement | null, value: string) => {
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

        const renderChildren = (
            childrenToRender: React.ReactNode
        ): React.ReactNode => {
            const setRef = <T,>(ref: React.Ref<T> | undefined, value: T) => {
                if (!ref) return
                if (typeof ref === 'function') {
                    ref(value)
                    return
                }
                if (typeof ref === 'object' && 'current' in ref) {
                    ;(ref as React.RefObject<T | null>).current = value
                }
            }

            return React.Children.map(childrenToRender, (child) => {
                if (!React.isValidElement(child)) return child

                const existingProps = child.props as Record<string, unknown>
                const childChildren =
                    (existingProps.children as React.ReactNode) || null

                const childValue =
                    'value' in existingProps
                        ? (existingProps.value as string)
                        : ''

                const isTabsTrigger =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsV2Trigger'

                if (isTabsTrigger) {
                    const childDisabled =
                        'disabled' in existingProps
                            ? (existingProps.disabled as boolean | undefined)
                            : undefined

                    const existingRef = (
                        child as React.ReactElement & {
                            ref?: React.Ref<unknown>
                        }
                    ).ref

                    return React.cloneElement(
                        child as React.ReactElement<TabsV2TriggerProps>,
                        {
                            ...existingProps,
                            disabled: childDisabled || disabled,
                            variant,
                            size,
                            isActive: childValue === activeTab,
                            tabsGroupId:
                                (existingProps as { tabsGroupId?: unknown })
                                    .tabsGroupId ?? tabsGroupId,
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
                            ref: (node: HTMLElement | null) => {
                                registerTabRef(node, childValue)
                                setRef(
                                    existingRef as React.Ref<HTMLElement>,
                                    node
                                )
                            },
                        } as TabsV2TriggerProps & {
                            ref: (node: HTMLElement | null) => void
                        }
                    )
                }

                if (childChildren) {
                    const childElement = child as React.ReactElement<{
                        children?: React.ReactNode
                    }>

                    return React.cloneElement(childElement, {
                        ...childElement.props,
                        children: renderChildren(childChildren),
                    })
                }

                return child
            })
        }

        return (
            <Block
                data-element="tabs-list"
                data-status={expanded ? 'expanded' : 'collapsed'}
                style={{
                    position: stickyHeader ? 'sticky' : 'relative',
                    top: stickyHeader ? offsetTop : 'auto',
                    zIndex: stickyHeader
                        ? tabsToken.tabList.stickyHeader.zIndex
                        : 'auto',
                    backgroundColor: stickyHeader
                        ? stickyHeaderBackground
                        : 'transparent',
                    borderBottom: 'none',
                    boxShadow: stickyHeader
                        ? tabsToken.tabList.stickyHeader.boxShadow
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
                            {...rest}
                        >
                            {renderChildren(children)}
                        </StyledTabsList>
                    </Block>
                </Block>
            </Block>
        )
    }
)

TabsV2List.displayName = 'TabsV2List'

export default TabsV2List

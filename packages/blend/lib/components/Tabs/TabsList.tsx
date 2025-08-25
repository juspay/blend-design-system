import {
    forwardRef,
    useMemo,
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react'
import { type TabsListProps, TabsSize, TabsVariant } from './types'
import { StyledTabsList } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import TabsTrigger from './TabsTrigger'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { ChevronDown, Plus } from 'lucide-react'
import { Tooltip } from '../Tooltip/Tooltip'
import SingleSelect from '../SingleSelect/SingleSelect'
import { SelectMenuVariant } from '../Select'
import {
    processTabsWithConcatenation,
    prepareDropdownItems,
    getDisplayTabs,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
    (
        {
            className,
            variant = TabsVariant.UNDERLINE,
            size = TabsSize.MD,
            expanded = false,
            fitContent = false,
            items = [],
            onTabClose,
            onTabAdd,
            showDropdown = false,
            showAddButton = false,
            // dropdownTooltip = 'Navigate to tab',
            addButtonTooltip = 'Add new tab',
            onTabChange,
            activeTab = '',
            children,
            ...props
        },
        ref
    ) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')
        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const [, setShowScrolling] = useState(false)

        useEffect(() => {
            const checkScrolling = () => {
                if (scrollContainerRef.current) {
                    const { scrollWidth, clientWidth } =
                        scrollContainerRef.current
                    setShowScrolling(scrollWidth > clientWidth)
                }
            }

            checkScrolling()
            window.addEventListener('resize', checkScrolling)
            return () => window.removeEventListener('resize', checkScrolling)
        }, [items])

        const processedItems = useMemo(() => {
            return processTabsWithConcatenation(items)
        }, [items])

        const dropdownItems = useMemo(() => {
            return prepareDropdownItems(processedItems)
        }, [processedItems])

        const displayTabs = useMemo(() => {
            return getDisplayTabs(processedItems)
        }, [processedItems])

        const handleTabClose = useCallback(
            (processedTabValue: string) => {
                if (processedTabValue.includes('_')) {
                    const originalValues = processedTabValue.split('_')
                    originalValues.forEach((val) => onTabClose?.(val))
                } else {
                    onTabClose?.(processedTabValue)
                }
            },
            [onTabClose]
        )

        const handleDropdownSelect = useCallback(
            (value: string) => {
                onTabChange?.(value)
            },
            [onTabChange]
        )

        const handleAddClick = useCallback(() => {
            onTabAdd?.()
        }, [onTabAdd])

        if (items.length > 0) {
            return (
                <Block
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <Block
                        ref={scrollContainerRef}
                        style={{
                            flex: 1,
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
                    >
                        <StyledTabsList
                            ref={ref}
                            className={className}
                            $variant={variant}
                            $size={size}
                            $expanded={expanded}
                            $fitContent={fitContent}
                            $tabsToken={tabsToken}
                            style={{
                                display: 'flex',
                                minWidth: 'max-content',
                                marginBottom: 0,
                            }}
                            {...props}
                        >
                            {displayTabs.map((item) => (
                                <TabsTrigger
                                    key={item.value}
                                    value={
                                        item.value.includes('_')
                                            ? item.value.split('_')[0]
                                            : item.value
                                    }
                                    variant={variant}
                                    size={size}
                                    closable={item.closable && !item.isDefault}
                                    onClose={() => handleTabClose(item.value)}
                                    style={{
                                        flexShrink: 0,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {item.label}
                                </TabsTrigger>
                            ))}
                        </StyledTabsList>
                    </Block>

                    {(showDropdown || showAddButton) && (
                        <Block
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: FOUNDATION_THEME.unit[4],
                                flexShrink: 0,
                                height: FOUNDATION_THEME.unit[20],
                            }}
                        >
                            {showDropdown && (
                                // <Tooltip content={dropdownTooltip}>
                                <SingleSelect
                                    items={dropdownItems}
                                    selected={activeTab}
                                    onSelect={handleDropdownSelect}
                                    placeholder="Navigate"
                                    customTrigger={
                                        <PrimitiveButton
                                            height={FOUNDATION_THEME.unit[20]}
                                            width={FOUNDATION_THEME.unit[20]}
                                            backgroundColor="transparent"
                                            contentCentered
                                            _hover={{
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[100],
                                            }}
                                            borderRadius={
                                                FOUNDATION_THEME.unit[4]
                                            }
                                        >
                                            <ChevronDown size={16} />
                                        </PrimitiveButton>
                                    }
                                    useDrawerOnMobile={false}
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                />
                                // {</Tooltip> */}
                            )}

                            {showAddButton && (
                                <Tooltip content={addButtonTooltip}>
                                    <PrimitiveButton
                                        onClick={handleAddClick}
                                        height={FOUNDATION_THEME.unit[20]}
                                        width={FOUNDATION_THEME.unit[20]}
                                        backgroundColor="transparent"
                                        contentCentered
                                        _hover={{
                                            backgroundColor:
                                                FOUNDATION_THEME.colors
                                                    .gray[100],
                                        }}
                                        borderRadius={FOUNDATION_THEME.unit[4]}
                                    >
                                        <Plus size={16} />
                                    </PrimitiveButton>
                                </Tooltip>
                            )}
                        </Block>
                    )}
                </Block>
            )
        }

        return (
            <StyledTabsList
                ref={ref}
                className={className}
                $variant={variant}
                $size={size}
                $expanded={expanded}
                $fitContent={fitContent}
                $tabsToken={tabsToken}
                {...props}
            >
                {children}
            </StyledTabsList>
        )
    }
)

TabsList.displayName = 'TabsList'

export default TabsList

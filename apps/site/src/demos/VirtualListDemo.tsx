import { useState, useCallback, useRef, CSSProperties } from 'react'
import VirtualList from '../../../../packages/blend/lib/components/VirtualList/VirtualList'
import type {
    VirtualListItem,
    VirtualListRef,
} from '../../../../packages/blend/lib/components/VirtualList/types'
import { User, Mail, Phone, MapPin, Star, Database, Zap } from 'lucide-react'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import MultiSelect from '../../../../packages/blend/lib/components/MultiSelect/MultiSelect'
import { SelectMenuSize } from '../../../../packages/blend/lib/components/Select'
import type { SelectMenuGroupType } from '../../../../packages/blend/lib/components/Select'
import {
    type MultiSelectMenuGroupType,
    MultiSelectMenuSize,
} from '../../../../packages/blend/lib/components/MultiSelect/types'

// Inline styles
const styles = {
    demoContainer: {
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
    } as CSSProperties,
    demoSection: {
        marginBottom: '60px',
    } as CSSProperties,
    sectionTitle: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '12px',
        color: '#1a1a1a',
    } as CSSProperties,
    sectionDescription: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '24px',
        lineHeight: '1.6',
    } as CSSProperties,
    demoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
    } as CSSProperties,
    demoCard: {
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    } as CSSProperties,
    cardHeader: {
        padding: '16px 20px',
        background: '#f8f9fa',
        borderBottom: '1px solid #e5e5e5',
    } as CSSProperties,
    cardTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1a1a1a',
        margin: '0 0 4px 0',
    } as CSSProperties,
    cardSubtitle: {
        fontSize: '13px',
        color: '#666',
        margin: '0',
    } as CSSProperties,
    cardContent: {
        padding: '0',
    } as CSSProperties,
    controlPanel: {
        padding: '16px 20px',
        background: '#f8f9fa',
        borderTop: '1px solid #e5e5e5',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap' as const,
    } as CSSProperties,
    button: (variant: 'primary' | 'secondary' = 'secondary') =>
        ({
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            border: `1px solid ${variant === 'primary' ? '#3b82f6' : '#e5e5e5'}`,
            background: variant === 'primary' ? '#3b82f6' : 'white',
            color: variant === 'primary' ? 'white' : '#1a1a1a',
            transition: 'all 0.2s',
        }) as CSSProperties,
    listItem: {
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'background 0.15s',
    } as CSSProperties,
    iconWrapper: (color?: string) =>
        ({
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: color || '#e0e7ff',
            color: color ? 'white' : '#3b82f6',
            flexShrink: 0,
        }) as CSSProperties,
    itemContent: {
        flex: 1,
        minWidth: 0,
    } as CSSProperties,
    itemTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#1a1a1a',
        marginBottom: '4px',
    } as CSSProperties,
    itemSubtitle: {
        fontSize: '12px',
        color: '#666',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    } as CSSProperties,
    badge: (color?: string) =>
        ({
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '500',
            background: color || '#e0e7ff',
            color: color ? 'white' : '#3b82f6',
        }) as CSSProperties,
    stats: {
        padding: '12px 20px',
        background: '#fef3c7',
        borderBottom: '1px solid #fde68a',
        fontSize: '12px',
        color: '#92400e',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    } as CSSProperties,
}

// Types
interface UserItem extends VirtualListItem {
    name: string
    email: string
    role: string
    status: 'active' | 'inactive'
}
// Helpers
const generateUsers = (count: number, startId: number = 0): UserItem[] => {
    const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Engineer']
    const statuses: ('active' | 'inactive')[] = [
        'active',
        'active',
        'active',
        'inactive',
    ]

    return Array.from({ length: count }, (_, i) => ({
        id: startId + i,
        name: `User ${startId + i + 1}`,
        email: `user${startId + i + 1}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
    }))
}

// Simulate API call
const fetchMoreUsers = (
    page: number,
    pageSize: number = 20
): Promise<UserItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const startId = page * pageSize
            resolve(generateUsers(pageSize, startId))
        }, 1000) // Simulate network delay
    })
}

// Generate large dataset for SingleSelect
const generateSelectItems = (count: number): SelectMenuGroupType[] => {
    const categories = [
        'Engineering',
        'Design',
        'Product',
        'Marketing',
        'Sales',
    ]
    const groups: SelectMenuGroupType[] = []

    categories.forEach((category, categoryIndex) => {
        const items: SelectMenuGroupType['items'] = []
        const itemsPerGroup = Math.floor(count / categories.length)

        for (let i = 0; i < itemsPerGroup; i++) {
            const itemNumber = categoryIndex * itemsPerGroup + i + 1
            items.push({
                label: `${category} Option ${itemNumber}`,
                value: `${category.toLowerCase()}-${itemNumber}`,
                subLabel: `Description for option ${itemNumber}`,
            })
        }

        groups.push({
            groupLabel: category,
            items,
            showSeparator: categoryIndex < categories.length - 1,
        })
    })

    return groups
}

// Generate large dataset for MultiSelect
const generateMultiSelectItems = (
    count: number
): MultiSelectMenuGroupType[] => {
    const categories = [
        'Engineering',
        'Design',
        'Product',
        'Marketing',
        'Sales',
    ]
    const groups: MultiSelectMenuGroupType[] = []

    categories.forEach((category, categoryIndex) => {
        const items: MultiSelectMenuGroupType['items'] = []
        const itemsPerGroup = Math.floor(count / categories.length)

        for (let i = 0; i < itemsPerGroup; i++) {
            const itemNumber = categoryIndex * itemsPerGroup + i + 1
            items.push({
                label: `${category} Option ${itemNumber}`,
                value: `${category.toLowerCase()}-${itemNumber}`,
                subLabel: `Description for option ${itemNumber}`,
            })
        }

        groups.push({
            groupLabel: category,
            items,
            showSeparator: categoryIndex < categories.length - 1,
        })
    })

    return groups
}

const VirtualListDemo = () => {
    // Demo 1: Basic Fixed Height List
    const [basicItems] = useState(() => generateUsers(1000))

    // Demo 2: Infinite Scroll with API calls
    const [infiniteItems, setInfiniteItems] = useState(() => generateUsers(20))
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const loadMore = useCallback(async () => {
        if (isLoading) return

        setIsLoading(true)
        const nextPage = page + 1

        try {
            const newItems = await fetchMoreUsers(nextPage)
            setInfiniteItems((prev) => [...prev, ...newItems])
            setPage(nextPage)

            // Simulate reaching end after 200 items
            if (infiniteItems.length + newItems.length >= 200) {
                setHasMore(false)
            }
        } catch (error) {
            console.error('Error loading items:', error)
        } finally {
            setIsLoading(false)
        }
    }, [page, isLoading, infiniteItems.length])

    // Demo 4: Controlled Scrolling
    const virtualListRef = useRef<VirtualListRef>(null)
    const [scrollControlItems] = useState(() => generateUsers(1000))

    const scrollToTop = () => {
        virtualListRef.current?.scrollTo(0, true)
    }

    const scrollToMiddle = () => {
        virtualListRef.current?.scrollToIndex(500, 'center', true)
    }

    const scrollToBottom = () => {
        virtualListRef.current?.scrollToIndex(999, 'end', true)
    }

    // Demo 5: Range Change Callback
    const [visibleRange, setVisibleRange] = useState({
        startIndex: 0,
        endIndex: 0,
    })
    const [rangeItems] = useState(() => generateUsers(1000))

    // Demo 6: Limited Render Count
    const [limitedItems] = useState(() => generateUsers(10000))
    const [itemsToRender, setItemsToRender] = useState(50)

    // Demo 7: SingleSelect with Virtualization
    const [selectItems] = useState(() => generateSelectItems(1000))
    const [selectedNormal, setSelectedNormal] = useState('')
    const [selectedVirtualized, setSelectedVirtualized] = useState('')

    // Demo 8: SingleSelect with Infinite Scroll + API Calls
    const [infiniteSelectItems, setInfiniteSelectItems] = useState<
        SelectMenuGroupType[]
    >(() => generateSelectItems(50))
    const [selectLoading, setSelectLoading] = useState(false)
    const [selectHasMore, setSelectHasMore] = useState(true)
    const [selectPage, setSelectPage] = useState(1)
    const [selectedInfinite, setSelectedInfinite] = useState('')

    // Demo 9: MultiSelect with Virtualization
    const [multiSelectItems] = useState(() => generateMultiSelectItems(1000))
    const [selectedMultiNormal, setSelectedMultiNormal] = useState<string[]>([])
    const [selectedMultiVirtualized, setSelectedMultiVirtualized] = useState<
        string[]
    >([])

    const handleMultiSelectChange = (
        setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        return (value: string) => {
            setter((prev) =>
                prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
            )
        }
    }

    // Demo 10: MultiSelect with Infinite Scroll
    const [infiniteMultiSelectItems, setInfiniteMultiSelectItems] = useState<
        MultiSelectMenuGroupType[]
    >(() => generateMultiSelectItems(50))
    const [multiSelectLoading, setMultiSelectLoading] = useState(false)
    const [multiSelectHasMore, setMultiSelectHasMore] = useState(true)
    const [multiSelectPage, setMultiSelectPage] = useState(1)
    const [selectedInfiniteMulti, setSelectedInfiniteMulti] = useState<
        string[]
    >([])

    const loadMoreMultiSelectOptions = useCallback(async () => {
        if (multiSelectLoading) return

        setMultiSelectLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newPage = multiSelectPage + 1
        const newItems = generateMultiSelectItems(50)

        setInfiniteMultiSelectItems((prev) => {
            const combined: MultiSelectMenuGroupType[] = [...prev]
            newItems.forEach((newGroup, index) => {
                if (combined[index]) {
                    combined[index] = {
                        ...combined[index],
                        items: [...combined[index].items, ...newGroup.items],
                    }
                } else {
                    combined.push(newGroup)
                }
            })
            return combined
        })

        setMultiSelectPage(newPage)

        if (newPage >= 10) {
            setMultiSelectHasMore(false)
        }

        setMultiSelectLoading(false)
    }, [multiSelectLoading, multiSelectPage])

    const loadMoreSelectOptions = useCallback(async () => {
        if (selectLoading) return

        setSelectLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newPage = selectPage + 1
        const newItems = generateSelectItems(50)

        setInfiniteSelectItems((prev) => {
            const combined: SelectMenuGroupType[] = [...prev]
            newItems.forEach((newGroup, index) => {
                if (combined[index]) {
                    combined[index] = {
                        ...combined[index],
                        items: [...combined[index].items, ...newGroup.items],
                    }
                } else {
                    combined.push(newGroup)
                }
            })
            return combined
        })

        setSelectPage(newPage)

        if (newPage >= 10) {
            setSelectHasMore(false)
        }

        setSelectLoading(false)
    }, [selectLoading, selectPage])

    return (
        <div style={styles.demoContainer}>
            <h1
                style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '16px',
                }}
            >
                VirtualList Component Demo
            </h1>
            <p
                style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '48px',
                }}
            >
                A production-ready virtualization component for rendering large
                lists efficiently. Inspired by React Virtuoso with advanced
                features like infinite scroll, dynamic heights, and API
                integration.
            </p>

            {/* Demo 1: Basic Fixed Height */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>1. Basic Fixed Height List</h2>
                <p style={styles.sectionDescription}>
                    Renders 1,000 items with fixed heights. Only visible items
                    are rendered to the DOM for optimal performance.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Fixed Height (40px)
                            </h3>
                            <p style={styles.cardSubtitle}>
                                1,000 users • Ultra-fast rendering
                            </p>
                        </div>
                        <div style={styles.cardContent}>
                            <VirtualList
                                items={basicItems}
                                itemHeight={60}
                                containerHeight={400}
                                overscan={5}
                                renderItem={({ item }) => {
                                    const user = item as UserItem
                                    return (
                                        <div style={styles.listItem}>
                                            <div style={styles.iconWrapper()}>
                                                <User size={20} />
                                            </div>
                                            <div style={styles.itemContent}>
                                                <div style={styles.itemTitle}>
                                                    {user.name}
                                                </div>
                                                <div
                                                    style={styles.itemSubtitle}
                                                >
                                                    <Mail size={12} />
                                                    {user.email}
                                                </div>
                                            </div>
                                            <span
                                                style={styles.badge(
                                                    user.status === 'active'
                                                        ? '#10b981'
                                                        : '#6b7280'
                                                )}
                                            >
                                                {user.status}
                                            </span>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 2: Infinite Scroll */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    2. Infinite Scroll with API Calls
                </h2>
                <p style={styles.sectionDescription}>
                    Load more data automatically as you scroll to the bottom.
                    Perfect for paginated APIs and large datasets.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Infinite Scroll</h3>
                            <p style={styles.cardSubtitle}>
                                {infiniteItems.length} items loaded •{' '}
                                {hasMore ? 'Has more' : 'All loaded'}
                            </p>
                        </div>
                        <div style={styles.cardContent}>
                            <VirtualList
                                items={infiniteItems}
                                itemHeight={60}
                                containerHeight={400}
                                overscan={5}
                                onEndReached={loadMore}
                                endReachedThreshold={300}
                                isLoading={isLoading}
                                hasMore={hasMore}
                                renderItem={({ item }) => {
                                    const user = item as UserItem
                                    return (
                                        <div style={styles.listItem}>
                                            <div
                                                style={styles.iconWrapper(
                                                    '#8b5cf6'
                                                )}
                                            >
                                                <Database size={20} />
                                            </div>
                                            <div style={styles.itemContent}>
                                                <div style={styles.itemTitle}>
                                                    {user.name}
                                                </div>
                                                <div
                                                    style={styles.itemSubtitle}
                                                >
                                                    {user.role} • {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div style={styles.stats}>
                            💡 Scroll to the bottom to load more items
                            automatically
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 4: Controlled Scrolling */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    4. Programmatic Scroll Control
                </h2>
                <p style={styles.sectionDescription}>
                    Control scroll position programmatically with smooth
                    scrolling and alignment options.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Scroll Control</h3>
                            <p style={styles.cardSubtitle}>
                                Jump to any position with smooth animations
                            </p>
                        </div>
                        <div style={styles.cardContent}>
                            <VirtualList
                                ref={virtualListRef}
                                items={scrollControlItems}
                                itemHeight={60}
                                containerHeight={400}
                                overscan={5}
                                renderItem={({ item, index }) => {
                                    const user = item as UserItem
                                    return (
                                        <div style={styles.listItem}>
                                            <div
                                                style={styles.iconWrapper(
                                                    '#ec4899'
                                                )}
                                            >
                                                <Star size={20} />
                                            </div>
                                            <div style={styles.itemContent}>
                                                <div style={styles.itemTitle}>
                                                    Item #{index + 1} -{' '}
                                                    {user.name}
                                                </div>
                                                <div
                                                    style={styles.itemSubtitle}
                                                >
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div style={styles.controlPanel}>
                            <button
                                style={styles.button('primary')}
                                onClick={scrollToTop}
                            >
                                Scroll to Top
                            </button>
                            <button
                                style={styles.button('primary')}
                                onClick={scrollToMiddle}
                            >
                                Scroll to Middle (Item #500)
                            </button>
                            <button
                                style={styles.button('primary')}
                                onClick={scrollToBottom}
                            >
                                Scroll to Bottom
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 5: Range Change Callback */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>5. Visible Range Tracking</h2>
                <p style={styles.sectionDescription}>
                    Track which items are currently visible. Useful for
                    analytics, lazy loading images, or prefetching data.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Range Change Tracking
                            </h3>
                            <p style={styles.cardSubtitle}>
                                Visible: {visibleRange.startIndex} -{' '}
                                {visibleRange.endIndex} (
                                {visibleRange.endIndex -
                                    visibleRange.startIndex +
                                    1}{' '}
                                items)
                            </p>
                        </div>
                        <div style={styles.cardContent}>
                            <VirtualList
                                items={rangeItems}
                                itemHeight={60}
                                containerHeight={400}
                                overscan={5}
                                onRangeChange={setVisibleRange}
                                renderItem={({ index }) => {
                                    const isVisible =
                                        index >= visibleRange.startIndex &&
                                        index <= visibleRange.endIndex
                                    return (
                                        <div
                                            style={{
                                                ...styles.listItem,
                                                background: isVisible
                                                    ? '#f0fdf4'
                                                    : 'transparent',
                                            }}
                                        >
                                            <div
                                                style={styles.iconWrapper(
                                                    '#10b981'
                                                )}
                                            >
                                                <MapPin size={20} />
                                            </div>
                                            <div style={styles.itemContent}>
                                                <div style={styles.itemTitle}>
                                                    Item #{index + 1}
                                                </div>
                                                <div
                                                    style={styles.itemSubtitle}
                                                >
                                                    {isVisible
                                                        ? '👁️ Currently visible'
                                                        : 'Not visible'}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div style={styles.stats}>
                            💡 Green highlighted items are currently in the
                            visible range
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 6: Limit Rendered Items */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>6. Render Limit Control</h2>
                <p style={styles.sectionDescription}>
                    Limit the maximum number of items rendered at once. Useful
                    for extremely large datasets or performance tuning.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                10,000 Items with Render Limit
                            </h3>
                            <p style={styles.cardSubtitle}>
                                Rendering max {itemsToRender} items at once
                            </p>
                        </div>
                        <div style={styles.cardContent}>
                            <VirtualList
                                items={limitedItems}
                                itemHeight={60}
                                containerHeight={400}
                                overscan={5}
                                itemsToRender={itemsToRender}
                                renderItem={({ item, index }) => {
                                    const user = item as UserItem
                                    return (
                                        <div style={styles.listItem}>
                                            <div
                                                style={styles.iconWrapper(
                                                    '#f59e0b'
                                                )}
                                            >
                                                <Phone size={20} />
                                            </div>
                                            <div style={styles.itemContent}>
                                                <div style={styles.itemTitle}>
                                                    Item #{index + 1} of 10,000
                                                </div>
                                                <div
                                                    style={styles.itemSubtitle}
                                                >
                                                    {user.name} • {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div style={styles.controlPanel}>
                            <button
                                style={styles.button(
                                    itemsToRender === 20
                                        ? 'primary'
                                        : 'secondary'
                                )}
                                onClick={() => setItemsToRender(20)}
                            >
                                20 items
                            </button>
                            <button
                                style={styles.button(
                                    itemsToRender === 50
                                        ? 'primary'
                                        : 'secondary'
                                )}
                                onClick={() => setItemsToRender(50)}
                            >
                                50 items
                            </button>
                            <button
                                style={styles.button(
                                    itemsToRender === 100
                                        ? 'primary'
                                        : 'secondary'
                                )}
                                onClick={() => setItemsToRender(100)}
                            >
                                100 items
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 7: SingleSelect with Virtualization */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    7. SingleSelect with Virtualization
                </h2>
                <p style={styles.sectionDescription}>
                    Compare normal vs virtualized SingleSelect with 1,000+
                    options. Virtualization eliminates lag and improves
                    performance dramatically.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Normal SingleSelect (Laggy)
                            </h3>
                            <p style={styles.cardSubtitle}>
                                1,000 options • Without virtualization
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <SingleSelect
                                placeholder="Select an option..."
                                items={selectItems}
                                selected={selectedNormal}
                                onSelect={setSelectedNormal}
                                enableSearch
                                searchPlaceholder="Search 1,000 options..."
                                size={SelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                            />
                            {selectedNormal && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedNormal}
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Virtualized SingleSelect{' '}
                                <Zap
                                    size={16}
                                    style={{
                                        display: 'inline',
                                        color: '#f59e0b',
                                    }}
                                />
                            </h3>
                            <p style={styles.cardSubtitle}>
                                1,000 options • With virtualization (Smooth!)
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <SingleSelect
                                placeholder="Select an option..."
                                items={selectItems}
                                selected={selectedVirtualized}
                                onSelect={setSelectedVirtualized}
                                enableSearch
                                searchPlaceholder="Search 1,000 options..."
                                size={SelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                                enableVirtualization={true}
                                virtualListItemHeight={48}
                                virtualListOverscan={5}
                            />
                            {selectedVirtualized && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedVirtualized}
                                </div>
                            )}
                        </div>
                        <div style={styles.stats}>
                            ⚡ Try scrolling through both selects - notice the
                            difference!
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 8: Infinite Scroll SingleSelect */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    8. SingleSelect with Infinite Scroll & API Calls
                </h2>
                <p style={styles.sectionDescription}>
                    Load options on demand as you scroll! Perfect for dropdowns
                    with thousands of options from an API. Only loads 50 items
                    at a time.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Infinite Scroll SingleSelect
                            </h3>
                            <p style={styles.cardSubtitle}>
                                {infiniteSelectItems.reduce(
                                    (acc, group) => acc + group.items.length,
                                    0
                                )}{' '}
                                options loaded
                                {selectHasMore && ' • More available'}
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <SingleSelect
                                placeholder="Select an option..."
                                items={infiniteSelectItems}
                                selected={selectedInfinite}
                                onSelect={setSelectedInfinite}
                                enableSearch
                                searchPlaceholder="Search options..."
                                size={SelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                                enableVirtualization={true}
                                virtualListItemHeight={48}
                                onEndReached={loadMoreSelectOptions}
                                endReachedThreshold={200}
                                hasMore={selectHasMore}
                                itemsToRender={50}
                            />
                            {selectedInfinite && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedInfinite}
                                </div>
                            )}
                            <div
                                style={{
                                    marginTop: '12px',
                                    fontSize: '12px',
                                    color: '#999',
                                }}
                            >
                                💡 Scroll to bottom to load more options
                                automatically
                            </div>
                        </div>
                        <div
                            style={{
                                ...styles.stats,
                                background: '#dbeafe',
                                borderBottom: '1px solid #93c5fd',
                                color: '#1e40af',
                            }}
                        >
                            🔄{' '}
                            {selectLoading
                                ? 'Loading more options...'
                                : `${infiniteSelectItems.reduce((acc, g) => acc + g.items.length, 0)} options loaded`}
                            {!selectHasMore && ' • All data loaded'}
                        </div>
                    </div>
                </div>

                {/* Code Example */}
                <div
                    style={{
                        marginTop: '24px',
                        padding: '20px',
                        background: '#1e293b',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                    }}
                >
                    <div style={{ marginBottom: '12px', color: '#94a3b8' }}>
                        // Usage Example:
                    </div>
                    <pre
                        style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                    >{`const [items, setItems] = useState(initialItems)
const [hasMore, setHasMore] = useState(true)

const loadMore = async () => {
  const newItems = await fetchFromAPI()
  setItems(prev => [...prev, ...newItems])
  if (newItems.length === 0) setHasMore(false)
}

<SingleSelect
  items={items}
  selected={value}
  onSelect={setValue}
  enableVirtualization={true}
  onEndReached={loadMore}      // Load more on scroll
  endReachedThreshold={200}     // Trigger 200px before end
  hasMore={hasMore}             // Show loading state
  itemsToRender={50}            // Render max 50 at once
/>`}</pre>
                </div>
            </div>

            {/* Demo 9: MultiSelect with Virtualization */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    9. MultiSelect with Virtualization
                </h2>
                <p style={styles.sectionDescription}>
                    Compare normal vs virtualized MultiSelect with 1,000+
                    options. Virtualization enables smooth multi-selection even
                    with massive datasets.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Normal MultiSelect (Laggy)
                            </h3>
                            <p style={styles.cardSubtitle}>
                                1,000 options • Without virtualization
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <MultiSelect
                                label="Select Options"
                                placeholder="Choose multiple options..."
                                items={multiSelectItems}
                                selectedValues={selectedMultiNormal}
                                onChange={handleMultiSelectChange(
                                    setSelectedMultiNormal
                                )}
                                enableSearch
                                searchPlaceholder="Search 1,000 options..."
                                size={MultiSelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                                enableSelectAll
                            />
                            {selectedMultiNormal.length > 0 && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedMultiNormal.length} items
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Virtualized MultiSelect{' '}
                                <Zap
                                    size={16}
                                    style={{
                                        display: 'inline',
                                        color: '#f59e0b',
                                    }}
                                />
                            </h3>
                            <p style={styles.cardSubtitle}>
                                1,000 options • With virtualization (Smooth!)
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <MultiSelect
                                label="Select Options"
                                placeholder="Choose multiple options..."
                                items={multiSelectItems}
                                selectedValues={selectedMultiVirtualized}
                                onChange={handleMultiSelectChange(
                                    setSelectedMultiVirtualized
                                )}
                                enableSearch
                                searchPlaceholder="Search 1,000 options..."
                                size={MultiSelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                                enableSelectAll
                                enableVirtualization={true}
                                virtualListItemHeight={48}
                                virtualListOverscan={5}
                            />
                            {selectedMultiVirtualized.length > 0 && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedMultiVirtualized.length}{' '}
                                    items
                                </div>
                            )}
                        </div>
                        <div style={styles.stats}>
                            ⚡ Check/uncheck multiple items - notice the smooth
                            performance!
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo 10: Infinite Scroll MultiSelect */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    10. MultiSelect with Infinite Scroll & API Calls
                </h2>
                <p style={styles.sectionDescription}>
                    Load options on demand as you scroll in a multi-select
                    dropdown! Perfect for selecting from thousands of options
                    loaded incrementally. Includes "Select All" for the loaded
                    items.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Infinite Scroll MultiSelect
                            </h3>
                            <p style={styles.cardSubtitle}>
                                {infiniteMultiSelectItems.reduce(
                                    (acc, group) => acc + group.items.length,
                                    0
                                )}{' '}
                                options loaded
                                {multiSelectHasMore && ' • More available'}
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <MultiSelect
                                label="Select Multiple Options"
                                placeholder="Choose options..."
                                items={infiniteMultiSelectItems}
                                selectedValues={selectedInfiniteMulti}
                                onChange={handleMultiSelectChange(
                                    setSelectedInfiniteMulti
                                )}
                                enableSearch
                                searchPlaceholder="Search options..."
                                size={MultiSelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                                enableSelectAll
                                enableVirtualization={true}
                                virtualListItemHeight={48}
                                onEndReached={loadMoreMultiSelectOptions}
                                endReachedThreshold={200}
                                hasMore={multiSelectHasMore}
                                itemsToRender={50}
                            />
                            {selectedInfiniteMulti.length > 0 && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedInfiniteMulti.length}{' '}
                                    items
                                </div>
                            )}
                            <div
                                style={{
                                    marginTop: '12px',
                                    fontSize: '12px',
                                    color: '#999',
                                }}
                            >
                                💡 Scroll to bottom to load more options • Use
                                "Select All" to select all loaded items
                            </div>
                        </div>
                        <div
                            style={{
                                ...styles.stats,
                                background: '#dbeafe',
                                borderBottom: '1px solid #93c5fd',
                                color: '#1e40af',
                            }}
                        >
                            🔄{' '}
                            {multiSelectLoading
                                ? 'Loading more options...'
                                : `${infiniteMultiSelectItems.reduce((acc, g) => acc + g.items.length, 0)} options loaded`}
                            {!multiSelectHasMore && ' • All data loaded'}
                        </div>
                    </div>
                </div>

                {/* Code Example */}
                <div
                    style={{
                        marginTop: '24px',
                        padding: '20px',
                        background: '#1e293b',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                    }}
                >
                    <div style={{ marginBottom: '12px', color: '#94a3b8' }}>
                        // MultiSelect Usage Example:
                    </div>
                    <pre
                        style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                    >{`const [items, setItems] = useState(initialItems)
const [selectedValues, setSelectedValues] = useState<string[]>([])
const [hasMore, setHasMore] = useState(true)

const loadMore = async () => {
  const newItems = await fetchFromAPI()
  setItems(prev => [...prev, ...newItems])
  if (newItems.length === 0) setHasMore(false)
}

const handleChange = (value: string) => {
  setSelectedValues(prev =>
    prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]
  )
}

<MultiSelect
  label="Select Options"
  placeholder="Choose multiple..."
  items={items}
  selectedValues={selectedValues}
  onChange={handleChange}
  enableVirtualization={true}
  onEndReached={loadMore}           // Load more on scroll
  endReachedThreshold={200}          // Trigger 200px before end
  hasMore={hasMore}                  // Show loading state
  itemsToRender={50}                 // Render max 50 at once
  enableSelectAll={true}             // Allow select all
/>`}</pre>
                </div>
            </div>

            {/* Summary */}
            <div
                style={{
                    padding: '32px',
                    background: '#f0f9ff',
                    borderRadius: '12px',
                    marginTop: '40px',
                }}
            >
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#0369a1',
                    }}
                >
                    🎯 Key Features Summary
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px',
                        fontSize: '14px',
                        color: '#075985',
                    }}
                >
                    <div>
                        <strong>✨ Fixed & Dynamic Heights</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Handles both fixed and variable height items
                            seamlessly
                        </p>
                    </div>
                    <div>
                        <strong>🔄 Infinite Scroll</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Load more data automatically as you scroll
                        </p>
                    </div>
                    <div>
                        <strong>🎮 Programmatic Control</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Scroll to any position or item with animations
                        </p>
                    </div>
                    <div>
                        <strong>👁️ Range Tracking</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Know which items are visible in real-time
                        </p>
                    </div>
                    <div>
                        <strong>⚙️ Render Control</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Limit items rendered for extreme performance
                        </p>
                    </div>
                    <div>
                        <strong>🎯 SingleSelect Integration</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Eliminates lag in dropdowns with 1000+ options
                        </p>
                    </div>
                    <div>
                        <strong>✅ MultiSelect Support</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Smooth multi-selection with virtualization &
                            infinite scroll
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VirtualListDemo

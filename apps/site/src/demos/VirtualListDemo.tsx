import { useState, useCallback, useRef, CSSProperties } from 'react'
import VirtualList from '../../../../packages/blend/lib/components/VirtualList/VirtualList'
import type { VirtualListRef } from '../../../../packages/blend/lib/components/VirtualList/types'
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
interface UserItem {
    id: string | number
    name: string
    email: string
    role: string
    status: 'active' | 'inactive'
    [key: string]: unknown
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
        virtualListRef.current?.scrollTo(0)
    }

    const scrollToMiddle = () => {
        virtualListRef.current?.scrollToIndex(500)
    }

    const scrollToBottom = () => {
        virtualListRef.current?.scrollToIndex(999)
    }

    // Demo 5: Range Change Callback
    const [visibleRange] = useState({
        startIndex: 0,
        endIndex: 0,
    })
    const [rangeItems] = useState(() => generateUsers(1000))

    // Demo 6: Limited Render Count
    const [limitedItems] = useState(() => generateUsers(10000))

    // Demo 7: SingleSelect with Virtualization
    const [selectItems] = useState(() => generateSelectItems(1000))
    const [selectedNormal, setSelectedNormal] = useState('')
    const [selectedVirtualized, setSelectedVirtualized] = useState('')

    // Demo 8: SingleSelect with Infinite Scroll + API Calls
    const [infiniteSelectItems] = useState<SelectMenuGroupType[]>(() =>
        generateSelectItems(1000)
    )
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
    const [infiniteMultiSelectItems] = useState<MultiSelectMenuGroupType[]>(
        () => generateMultiSelectItems(50)
    )
    const [selectedInfiniteMulti, setSelectedInfiniteMulti] = useState<
        string[]
    >([])

    // Demo 11: SingleSelect with API Infinite Scroll
    const [apiSelectItems, setApiSelectItems] = useState<SelectMenuGroupType[]>(
        () => generateSelectItems(50)
    )
    const [selectedApiSelect, setSelectedApiSelect] = useState('')
    const [apiSelectLoading, setApiSelectLoading] = useState(false)
    const [apiSelectHasMore, setApiSelectHasMore] = useState(true)
    const [apiSelectPage, setApiSelectPage] = useState(1)

    const loadMoreApiSelectItems = useCallback(async () => {
        if (apiSelectLoading) return

        setApiSelectLoading(true)
        const nextPage = apiSelectPage + 1

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const newItems = generateSelectItems(50)

            setApiSelectItems((prev) => [
                ...prev,
                ...newItems.map((group) => ({
                    ...group,
                    items: group.items.map((item) => ({
                        ...item,
                        value: `${item.value}-page${nextPage}`,
                        label: `${item.label} (Page ${nextPage})`,
                    })),
                })),
            ])
            setApiSelectPage(nextPage)

            // Stop after 5 pages (250 items)
            if (nextPage >= 5) {
                setApiSelectHasMore(false)
            }
        } catch (error) {
            console.error('Error loading items:', error)
        } finally {
            setApiSelectLoading(false)
        }
    }, [apiSelectPage, apiSelectLoading])

    // Demo 12: MultiSelect with API Infinite Scroll
    const [apiMultiSelectItems, setApiMultiSelectItems] = useState<
        MultiSelectMenuGroupType[]
    >(() => generateMultiSelectItems(50))
    const [selectedApiMultiSelect, setSelectedApiMultiSelect] = useState<
        string[]
    >([])
    const [apiMultiSelectLoading, setApiMultiSelectLoading] = useState(false)
    const [apiMultiSelectHasMore, setApiMultiSelectHasMore] = useState(true)
    const [apiMultiSelectPage, setApiMultiSelectPage] = useState(1)

    const loadMoreApiMultiSelectItems = useCallback(async () => {
        if (apiMultiSelectLoading) return

        setApiMultiSelectLoading(true)
        const nextPage = apiMultiSelectPage + 1

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const newItems = generateMultiSelectItems(50)

            setApiMultiSelectItems((prev) => [
                ...prev,
                ...newItems.map((group) => ({
                    ...group,
                    items: group.items.map((item) => ({
                        ...item,
                        value: `${item.value}-page${nextPage}`,
                        label: `${item.label} (Page ${nextPage})`,
                    })),
                })),
            ])
            setApiMultiSelectPage(nextPage)

            // Stop after 5 pages (250 items)
            if (nextPage >= 5) {
                setApiMultiSelectHasMore(false)
            }
        } catch (error) {
            console.error('Error loading items:', error)
        } finally {
            setApiMultiSelectLoading(false)
        }
    }, [apiMultiSelectPage, apiMultiSelectLoading])

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
                                height={400}
                                itemHeight={60}
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
                                height={400}
                                itemHeight={60}
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
                                height={400}
                                itemHeight={60}
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
                                height={400}
                                itemHeight={60}
                                overscan={5}
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
                                10,000 items with automatic optimization
                            </p>
                        </div>
                        <div style={styles.cardContent}>
                            <VirtualList
                                items={limitedItems}
                                height={400}
                                itemHeight={60}
                                overscan={5}
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
                        <div style={styles.stats}>
                            💡 VirtualList automatically optimizes rendering for
                            10,000+ items
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
                                virtualListOverscan={2}
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

            {/* Demo 8: SingleSelect with Large Dataset */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    8. SingleSelect with Large Dataset (Virtualized)
                </h2>
                <p style={styles.sectionDescription}>
                    SingleSelect with 1000 options using virtualization. Opens
                    instantly with smooth scrolling.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Large Dataset SingleSelect
                            </h3>
                            <p style={styles.cardSubtitle}>
                                {infiniteSelectItems.reduce(
                                    (acc, group) => acc + group.items.length,
                                    0
                                )}{' '}
                                options available
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
                                virtualListOverscan={2}
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
                                💡 Search through{' '}
                                {infiniteSelectItems.reduce(
                                    (acc, g) => acc + g.items.length,
                                    0
                                )}{' '}
                                options
                            </div>
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

<SingleSelect
  items={items}
  selected={value}
  onSelect={setValue}
  enableSearch
  maxMenuHeight={400}
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
                                virtualListItemHeight={44}
                                virtualListOverscan={2}
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

            {/* Demo 10: MultiSelect with Large Dataset */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    10. MultiSelect with Large Dataset (Virtualized)
                </h2>
                <p style={styles.sectionDescription}>
                    MultiSelect with 50 options using virtualization. Opens
                    instantly with smooth multi-selection.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                Large Dataset MultiSelect
                            </h3>
                            <p style={styles.cardSubtitle}>
                                {infiniteMultiSelectItems.reduce(
                                    (acc, group) => acc + group.items.length,
                                    0
                                )}{' '}
                                options available
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
                                virtualListItemHeight={44}
                                virtualListOverscan={2}
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
                                💡 Search through{' '}
                                {infiniteMultiSelectItems.reduce(
                                    (acc, g) => acc + g.items.length,
                                    0
                                )}{' '}
                                options • Use "Select All" to select all items
                            </div>
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
  enableSearch
  maxMenuHeight={400}
  enableSelectAll
/>`}</pre>
                </div>
            </div>

            {/* Demo 11: SingleSelect with API Infinite Scroll */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    11. SingleSelect with API Infinite Scroll
                </h2>
                <p style={styles.sectionDescription}>
                    SingleSelect that loads more data from an API as you scroll.
                    Perfect for large datasets that need pagination.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                API Infinite Scroll SingleSelect
                            </h3>
                            <p style={styles.cardSubtitle}>
                                {apiSelectItems.reduce(
                                    (acc, group) => acc + group.items.length,
                                    0
                                )}{' '}
                                items loaded •{' '}
                                {apiSelectHasMore
                                    ? 'Scroll for more'
                                    : 'All loaded'}
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <SingleSelect
                                placeholder="Select an option..."
                                items={apiSelectItems}
                                selected={selectedApiSelect}
                                onSelect={setSelectedApiSelect}
                                enableSearch
                                searchPlaceholder="Search options..."
                                size={SelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                                enableVirtualization={true}
                                virtualListItemHeight={48}
                                virtualListOverscan={2}
                                onEndReached={loadMoreApiSelectItems}
                                endReachedThreshold={200}
                                hasMore={apiSelectHasMore}
                                loadingComponent={
                                    apiSelectLoading ? (
                                        <div
                                            style={{
                                                padding: '16px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Loading more...
                                        </div>
                                    ) : null
                                }
                            />
                            {selectedApiSelect && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedApiSelect}
                                </div>
                            )}
                            <div
                                style={{
                                    marginTop: '12px',
                                    fontSize: '12px',
                                    color: '#999',
                                }}
                            >
                                💡 Scroll to the bottom to load more items from
                                API
                            </div>
                        </div>
                        <div style={styles.stats}>
                            {apiSelectLoading ? '⏳ Loading...' : '✅ Ready'}
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
                        // API Infinite Scroll Example:
                    </div>
                    <pre
                        style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                    >{`const [items, setItems] = useState(initialItems)
const [loading, setLoading] = useState(false)
const [hasMore, setHasMore] = useState(true)
const [page, setPage] = useState(1)

const loadMore = async () => {
  if (loading) return
  setLoading(true)
  
  try {
    const response = await fetch(\`/api/items?page=\${page + 1}\`)
    const newItems = await response.json()
    
    setItems(prev => [...prev, ...newItems])
    setPage(prev => prev + 1)
    
    if (newItems.length === 0) {
      setHasMore(false)
    }
  } finally {
    setLoading(false)
  }
}

<SingleSelect
  items={items}
  selected={value}
  onSelect={setValue}
  enableVirtualization
  onEndReached={loadMore}
  hasMore={hasMore}
  endReachedThreshold={200}
/>`}</pre>
                </div>
            </div>

            {/* Demo 12: MultiSelect with API Infinite Scroll */}
            <div style={styles.demoSection}>
                <h2 style={styles.sectionTitle}>
                    12. MultiSelect with API Infinite Scroll
                </h2>
                <p style={styles.sectionDescription}>
                    MultiSelect that loads more data from an API as you scroll.
                    Supports multi-selection with infinite scrolling.
                </p>
                <div style={styles.demoGrid}>
                    <div style={styles.demoCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                API Infinite Scroll MultiSelect
                            </h3>
                            <p style={styles.cardSubtitle}>
                                {apiMultiSelectItems.reduce(
                                    (acc, group) => acc + group.items.length,
                                    0
                                )}{' '}
                                items loaded •{' '}
                                {apiMultiSelectHasMore
                                    ? 'Scroll for more'
                                    : 'All loaded'}
                            </p>
                        </div>
                        <div style={{ ...styles.cardContent, padding: '20px' }}>
                            <MultiSelect
                                label="Select Multiple Options"
                                placeholder="Choose options..."
                                items={apiMultiSelectItems}
                                selectedValues={selectedApiMultiSelect}
                                onChange={handleMultiSelectChange(
                                    setSelectedApiMultiSelect
                                )}
                                enableSearch
                                searchPlaceholder="Search options..."
                                size={MultiSelectMenuSize.MEDIUM}
                                maxMenuHeight={400}
                                enableSelectAll
                                enableVirtualization={true}
                                virtualListItemHeight={44}
                                virtualListOverscan={2}
                                onEndReached={loadMoreApiMultiSelectItems}
                                endReachedThreshold={200}
                                hasMore={apiMultiSelectHasMore}
                                loadingComponent={
                                    apiMultiSelectLoading ? (
                                        <div
                                            style={{
                                                padding: '16px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Loading more...
                                        </div>
                                    ) : null
                                }
                            />
                            {selectedApiMultiSelect.length > 0 && (
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    Selected: {selectedApiMultiSelect.length}{' '}
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
                                💡 Scroll to the bottom to load more items from
                                API
                            </div>
                        </div>
                        <div style={styles.stats}>
                            {apiMultiSelectLoading
                                ? '⏳ Loading...'
                                : '✅ Ready'}
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
                        // MultiSelect API Infinite Scroll Example:
                    </div>
                    <pre
                        style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                    >{`const [items, setItems] = useState(initialItems)
const [selectedValues, setSelectedValues] = useState<string[]>([])
const [loading, setLoading] = useState(false)
const [hasMore, setHasMore] = useState(true)

const loadMore = async () => {
  if (loading) return
  setLoading(true)
  
  try {
    const response = await fetch(\`/api/items?page=\${page + 1}\`)
    const newItems = await response.json()
    setItems(prev => [...prev, ...newItems])
    
    if (newItems.length === 0) setHasMore(false)
  } finally {
    setLoading(false)
  }
}

<MultiSelect
  items={items}
  selectedValues={selectedValues}
  onChange={(value) => {
    setSelectedValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }}
  enableVirtualization
  onEndReached={loadMore}
  hasMore={hasMore}
  enableSelectAll
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
                    🎯 Simplified VirtualList Features
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
                        <strong>✨ Simple API</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Just pass items, height, and renderItem - that's it!
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
                            Scroll to any position or item with smooth
                            animations
                        </p>
                    </div>
                    <div>
                        <strong>⚡ Performance</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Only renders visible items + overscan buffer
                        </p>
                    </div>
                    <div>
                        <strong>🎯 Zero UI Interference</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Pure virtualization wrapper - no styling imposed
                        </p>
                    </div>
                    <div>
                        <strong>📱 Responsive</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Works with any height - fixed or dynamic
                        </p>
                    </div>
                    <div>
                        <strong>🔧 Easy Integration</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                            Drop-in replacement for any list component
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VirtualListDemo

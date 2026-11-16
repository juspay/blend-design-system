import { useEffect, useMemo, useRef, useState } from 'react'
import {
    Activity,
    Bell,
    ChartNoAxesColumn,
    ChevronLeft,
    CodeXml,
    CreditCard,
    Ellipsis,
    Gift,
    House,
    PlugZap,
    RefreshCw,
    Route,
    Search,
    Send,
    ShieldCheck,
    ShoppingBag,
    Scale,
} from 'lucide-react'
import { Theme, ThemeProvider } from '../../../../packages/blend/lib/context'
import { SidebarV3 } from '../../../../packages/blend/lib/components/SidebarV3'
import type {
    DirectoryData,
    NavbarItem,
} from '../../../../packages/blend/lib/components/Directory/types'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'

const navigation: DirectoryData[] = [
    {
        items: [
            {
                id: 'home',
                label: 'Home',
                leftSlot: <House size={16} />,
                showOnMobile: true,
            },
            {
                id: 'connectors',
                label: 'Connectors',
                leftSlot: <PlugZap size={14} />,
                showOnMobile: true,
            },
            {
                id: 'smart-routing',
                label: 'Smart routing',
                leftSlot: <Route size={14} />,
                items: [
                    { id: 'payment', label: 'Payment' },
                    { id: 'payout', label: 'Payout' },
                    { id: 'risk-fraud', label: 'Risk & fraud' },
                ],
            },
            {
                id: 'developers',
                label: 'Developers',
                leftSlot: <CodeXml size={14} />,
            },
            {
                id: 'analytics',
                label: 'Analytics',
                leftSlot: <ChartNoAxesColumn size={14} />,
                items: [
                    { id: 'transactions', label: 'Transactions' },
                    { id: 'refunds', label: 'Refunds' },
                ],
            },
            {
                id: 'monitoring',
                label: 'Monitoring',
                leftSlot: <Activity size={14} />,
                items: [{ id: 'alerts', label: 'Alerts' }],
            },
            {
                id: 'more',
                label: 'More',
                leftSlot: <Ellipsis size={14} />,
            },
        ],
    },
    {
        label: 'Products',
        isCollapsible: false,
        items: [
            {
                id: 'payments',
                label: 'Payments',
                leftSlot: <CreditCard size={14} />,
                items: [
                    { id: 'orders', label: 'Orders' },
                    { id: 'subscriptions', label: 'Subscriptions' },
                ],
            },
            {
                id: 'payment-collection',
                label: 'Payment collection',
                leftSlot: <ShoppingBag size={14} />,
                items: [{ id: 'links', label: 'Payment links' }],
            },
            {
                id: 'offers-rewards',
                label: 'Offers & rewards',
                leftSlot: <Gift size={14} />,
                items: [{ id: 'offers', label: 'Offers' }],
            },
            {
                id: 'payouts',
                label: 'Payouts',
                leftSlot: <Send size={14} />,
                items: [{ id: 'transfers', label: 'Transfers' }],
            },
            {
                id: 'risk-security',
                label: 'Risk & security',
                leftSlot: <ShieldCheck size={14} />,
                items: [{ id: 'risk-rules', label: 'Risk rules' }],
            },
            {
                id: 'recon-settlement',
                label: 'Recon & settlement',
                leftSlot: <Scale size={14} />,
                items: [{ id: 'settlements', label: 'Settlements' }],
            },
            {
                id: 'billing',
                label: 'Billing',
                leftSlot: <RefreshCw size={14} />,
            },
        ],
    },
]

const merchants = [
    { label: 'Integrating merchant', value: 'integrating' },
    { label: 'A merchant with a long account name', value: 'long-name' },
]

const getPageLabel = (path: string | null): string => {
    if (!path) return 'Home'
    let items: NavbarItem[] = navigation.flatMap(
        (section) => section.items ?? []
    )
    let label = 'Home'
    for (const segment of path.split('/')) {
        const item = items.find(
            (entry) => (entry.id ?? entry.label) === segment
        )
        if (!item) return label
        label = item.label
        items = item.items ?? []
    }
    return label
}

const SidebarV3Demo = () => {
    const searchRef = useRef<HTMLInputElement>(null)
    const [activeItem, setActiveItem] = useState<string | null>('home')
    const [isExpanded, setIsExpanded] = useState(true)
    const [merchant, setMerchant] = useState(merchants[0].value)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const focusSearch = (event: KeyboardEvent) => {
            if (
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === 'k'
            ) {
                event.preventDefault()
                searchRef.current?.focus()
            }
        }
        window.addEventListener('keydown', focusSearch)
        return () => window.removeEventListener('keydown', focusSearch)
    }, [])

    const visibleNavigation = useMemo(() => {
        const search = query.trim().toLowerCase()
        if (!search) return navigation
        return navigation
            .map((section) => ({
                ...section,
                items: (section.items ?? []).flatMap((item) => {
                    if (item.label.toLowerCase().includes(search)) return [item]
                    const children = item.items?.filter((child) =>
                        child.label.toLowerCase().includes(search)
                    )
                    return children?.length
                        ? [{ ...item, items: children }]
                        : []
                }),
            }))
            .filter((section) => section.items.length > 0)
    }, [query])

    const currentPage = getPageLabel(activeItem)

    return (
        <ThemeProvider theme={Theme.LIGHT}>
            <SidebarV3
                sidebarCollapseKey="["
                data={
                    visibleNavigation.length
                        ? visibleNavigation
                        : [{ items: [] }]
                }
                topStrip={
                    <>
                        <strong
                            style={{
                                color: FOUNDATION_THEME.colors.gray[0],
                                marginLeft: FOUNDATION_THEME.unit[6],
                            }}
                        >
                            ◉ JUSPAY
                        </strong>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: FOUNDATION_THEME.unit[12],
                                marginRight: FOUNDATION_THEME.unit[6],
                            }}
                        >
                            <Bell size={18} aria-label="Notifications" />
                            <a
                                href="#directory"
                                style={{
                                    color: FOUNDATION_THEME.colors.gray[0],
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: FOUNDATION_THEME.unit[4],
                                }}
                            >
                                <ChevronLeft size={16} aria-hidden="true" />
                                Back to site
                            </a>
                        </div>
                    </>
                }
                sidebarSearch={
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: FOUNDATION_THEME.unit[8],
                            padding: FOUNDATION_THEME.unit[8],
                            border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
                            borderRadius: FOUNDATION_THEME.border.radius[8],
                            color: FOUNDATION_THEME.colors.gray[600],
                            backgroundColor: FOUNDATION_THEME.colors.gray[0],
                            boxShadow: FOUNDATION_THEME.shadows.sm,
                        }}
                    >
                        <Search size={14} aria-hidden="true" />
                        <input
                            ref={searchRef}
                            aria-label="Search sidebar pages"
                            placeholder="Quick search..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            style={{
                                width: '100%',
                                outline: 'none',
                                background: 'transparent',
                                color: 'inherit',
                            }}
                        />
                        <kbd style={{ whiteSpace: 'nowrap', fontSize: 12 }}>
                            ⌘K
                        </kbd>
                    </label>
                }
                merchantInfo={{
                    items: merchants,
                    selected: merchant,
                    onSelect: setMerchant,
                }}
                isExpanded={isExpanded}
                onExpandedChange={setIsExpanded}
                activeItem={activeItem}
                onActiveItemChange={setActiveItem}
                showHierarchyLines
                footer={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: FOUNDATION_THEME.unit[8],
                            minWidth: 0,
                            width: '100%',
                        }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                display: 'grid',
                                placeItems: 'center',
                                flexShrink: 0,
                                width: FOUNDATION_THEME.unit[24],
                                height: FOUNDATION_THEME.unit[24],
                                borderRadius:
                                    FOUNDATION_THEME.border.radius.full,
                                backgroundColor:
                                    FOUNDATION_THEME.colors.primary[500],
                                color: FOUNDATION_THEME.colors.gray[0],
                                fontSize: 10,
                            }}
                        >
                            HA
                        </span>
                        {isExpanded && (
                            <span
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    fontSize: 12,
                                }}
                            >
                                harshvardhan.agarwal@juspay.in
                            </span>
                        )}
                    </div>
                }
            >
                <div
                    style={{
                        padding: FOUNDATION_THEME.unit[24],
                        color: FOUNDATION_THEME.colors.gray[900],
                    }}
                >
                    <header aria-live="polite">
                        <h1
                            style={{
                                fontSize: 20,
                                fontWeight: 600,
                                margin: 0,
                            }}
                        >
                            {currentPage}
                        </h1>
                        <p
                            style={{
                                marginTop: FOUNDATION_THEME.unit[4],
                                color: FOUNDATION_THEME.colors.gray[600],
                                fontSize: 14,
                            }}
                        >
                            {currentPage === 'Home'
                                ? 'Select a sidebar item to preview its page.'
                                : `${currentPage} page preview.`}
                        </p>
                    </header>
                    {query && visibleNavigation.length === 0 && (
                        <p role="status">No pages match “{query}”.</p>
                    )}
                </div>
            </SidebarV3>
        </ThemeProvider>
    )
}

export default SidebarV3Demo

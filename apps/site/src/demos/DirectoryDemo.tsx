import { useMemo, useState } from 'react'
import {
    Building2,
    CreditCard,
    FolderTree,
    Network,
    Settings,
    Store,
} from 'lucide-react'
import { Directory } from '../../../../packages/blend/lib/components/Directory'
import type { DirectoryData } from '../../../../packages/blend/lib/components/Directory/types'
import { Switch } from '../../../../packages/blend/lib/components/Switch'

const iconStyle = { width: '16px', height: '16px' }

const rightSlotStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '20px',
    padding: '0 6px',
    borderRadius: '999px',
    backgroundColor: '#F1F5F9',
    color: '#475569',
    fontSize: '11px',
    fontWeight: 600,
}

const largeDirectoryGroups = [
    'North India Operations',
    'West India Operations',
    'South India Operations',
    'East India Operations',
    'Central India Operations',
    'Enterprise Accounts',
    'Marketplace Sellers',
    'Pharmacy Networks',
    'Grocery Channels',
    'Electronics Retail',
    'Travel Partners',
    'Subscription Billing',
    'International Merchants',
    'Risk Review Queue',
    'Settlement Operations',
    'Refund Management',
    'Dispute Resolution',
    'Payout Configurations',
    'Routing Experiments',
    'Failover Policies',
    'Webhook Consumers',
    'Invoice Collections',
    'Reconciliation Jobs',
    'Manual Review Workflows',
    'Fraud Strategy',
    'Gateway Health',
    'Terminal Deployments',
    'Partner Onboarding',
    'Merchant Success',
    'Escalation Desk',
    'Compliance Review',
    'KYC Verification',
    'Tax Configuration',
    'Pricing Experiments',
    'Offer Campaigns',
    'Loyalty Programs',
    'Credit Products',
    'Debit Products',
    'UPI Mandates',
    'Card Tokenization',
]

const commerceDirectoryData: DirectoryData[] = [
    {
        label: 'Commerce groups',
        isCollapsible: false,
        items: [
            {
                label: 'Acme Commerce Group',
                leftSlot: <Building2 style={iconStyle} />,
                items: [
                    {
                        label: 'Helix Network',
                        leftSlot: <Network style={iconStyle} />,
                        items: [
                            {
                                label: 'Orbit Pharma',
                                leftSlot: <Store style={iconStyle} />,
                            },
                            {
                                label: 'Indus Pharma',
                                leftSlot: <Store style={iconStyle} />,
                            },
                            {
                                label: 'Orion Pharma',
                                leftSlot: <Store style={iconStyle} />,
                            },
                            {
                                label: 'Apollo Pharma',
                                leftSlot: <Store style={iconStyle} />,
                            },
                        ],
                    },
                    {
                        label: 'Quanta Network',
                        leftSlot: <Network style={iconStyle} />,
                    },
                    {
                        label: 'Nimbus Ventures',
                        leftSlot: <Network style={iconStyle} />,
                    },
                    {
                        label: 'Polaris Channel',
                        leftSlot: <Network style={iconStyle} />,
                    },
                ],
            },
            {
                label: 'Meridian Retail Holdings',
                leftSlot: <Building2 style={iconStyle} />,
                items: [
                    {
                        label: 'Atlas Partner Network',
                        leftSlot: <Network style={iconStyle} />,
                        items: [
                            {
                                label: 'Cobalt Stores',
                                leftSlot: <Store style={iconStyle} />,
                            },
                            {
                                label: 'Juniper Market',
                                leftSlot: <Store style={iconStyle} />,
                            },
                        ],
                    },
                    {
                        label: 'Summit Distribution',
                        leftSlot: <Network style={iconStyle} />,
                    },
                ],
            },
            {
                label: 'Solace Merchant Group',
                leftSlot: <Building2 style={iconStyle} />,
                items: [
                    {
                        label: 'Nova Channel',
                        leftSlot: <Network style={iconStyle} />,
                    },
                    {
                        label: 'Vertex Pharmacy Network',
                        leftSlot: <Network style={iconStyle} />,
                        items: [
                            {
                                label: 'Lumen Pharma',
                                leftSlot: <Store style={iconStyle} />,
                            },
                            {
                                label: 'Crest Life Sciences',
                                leftSlot: <Store style={iconStyle} />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]

const productDirectoryData: DirectoryData[] = [
    {
        label: 'Product areas',
        defaultOpen: true,
        items: [
            {
                label: 'Payments',
                leftSlot: <CreditCard style={iconStyle} />,
                items: [
                    { label: 'Transactions' },
                    { label: 'Settlements' },
                    { label: 'Refunds' },
                ],
            },
            {
                label: 'Configuration',
                leftSlot: <Settings style={iconStyle} />,
                items: [
                    { label: 'Routing' },
                    { label: 'Risk rules' },
                    { label: 'Webhooks' },
                ],
            },
        ],
    },
]

const fiveLevelDirectoryData: DirectoryData[] = [
    {
        label: 'Five level hierarchy',
        isCollapsible: false,
        items: [
            {
                label: 'Acme Commerce Group',
                leftSlot: <Building2 style={iconStyle} />,
                items: [
                    {
                        label: 'Helix Network',
                        leftSlot: <Network style={iconStyle} />,
                        items: [
                            {
                                label: 'Orbit Pharma',
                                leftSlot: <Store style={iconStyle} />,
                                items: [
                                    {
                                        label: 'North India Region',
                                        leftSlot: <Network style={iconStyle} />,
                                        items: [
                                            {
                                                label: 'Delhi Fulfillment Hub',
                                                leftSlot: (
                                                    <Store style={iconStyle} />
                                                ),
                                            },
                                            {
                                                label: 'Gurgaon Retail Desk',
                                                leftSlot: (
                                                    <Store style={iconStyle} />
                                                ),
                                            },
                                        ],
                                    },
                                    {
                                        label: 'West India Region',
                                        leftSlot: <Network style={iconStyle} />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]

const longNameDirectoryData: DirectoryData[] = [
    {
        label: 'Long route names',
        isCollapsible: false,
        items: [
            {
                label: 'Global Acme Commerce Group Enterprise Administration Console',
                leftSlot: <Building2 style={iconStyle} />,
                items: [
                    {
                        label: 'Helix Network Cross Border Payment Operations and Reconciliation',
                        leftSlot: <Network style={iconStyle} />,
                        items: [
                            {
                                label: 'Orbit Pharma International Merchant Settlement Configuration',
                                leftSlot: <Store style={iconStyle} />,
                                items: [
                                    {
                                        label: 'North India Region Routing Rules and Failover Preferences',
                                        leftSlot: <Network style={iconStyle} />,
                                    },
                                    {
                                        label: 'West India Region Risk Review Queue and Manual Approval Flow',
                                        leftSlot: <Network style={iconStyle} />,
                                    },
                                ],
                            },
                            {
                                label: 'Indus Pharma Subscription Billing Recovery Workflows',
                                leftSlot: <Store style={iconStyle} />,
                            },
                        ],
                    },
                    {
                        label: 'Nimbus Ventures Marketplace Seller Onboarding Dashboard',
                        leftSlot: <Network style={iconStyle} />,
                    },
                ],
            },
        ],
    },
]

const LAZY_PAGE_SIZE = 25
const LAZY_MAX_ROWS = 150

const LazyLoadSection = () => {
    const [rowCount, setRowCount] = useState(LAZY_PAGE_SIZE)
    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState<string[]>([])

    const logEvent = (message: string) => {
        console.log(`[Directory onEndReached] ${message}`)
        setEvents((prev) => [...prev.slice(-5), message])
    }

    const handleEndReached = () => {
        if (isLoading) return
        if (rowCount >= LAZY_MAX_ROWS) {
            logEvent(`end reached at ${rowCount} rows — no more data`)
            return
        }
        logEvent(
            `end reached at ${rowCount} rows — fetching ${LAZY_PAGE_SIZE} more…`
        )
        setIsLoading(true)
        window.setTimeout(() => {
            setRowCount((prev) =>
                Math.min(prev + LAZY_PAGE_SIZE, LAZY_MAX_ROWS)
            )
            setIsLoading(false)
        }, 600)
    }

    const lazyDirectoryData: DirectoryData[] = useMemo(
        () => [
            {
                label: `Lazy merchants (${rowCount} loaded)`,
                isCollapsible: false,
                items: Array.from({ length: rowCount }, (_, index) => ({
                    id: `lazy-${index}`,
                    label: `Merchant ${String(index + 1).padStart(3, '0')}`,
                    leftSlot: <Store style={iconStyle} />,
                })),
            },
        ],
        [rowCount]
    )

    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold">
                Lazy loading (onEndReached)
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="h-72 w-full max-w-md rounded-lg border border-gray-200 bg-white p-3">
                    <Directory
                        directoryData={lazyDirectoryData}
                        onEndReached={handleEndReached}
                        endReachedThreshold={80}
                    />
                </div>
                <div className="w-full max-w-md space-y-2">
                    <p className="text-xs text-gray-500">
                        Scroll the list to the bottom — each time the viewport
                        gets within 80px of the end, onEndReached fires (also
                        printed to the browser console), a fetch is simulated
                        for 600ms, and {LAZY_PAGE_SIZE} more rows are appended
                        (up to {LAZY_MAX_ROWS}).
                    </p>
                    {isLoading && (
                        <p className="text-xs font-medium text-blue-600">
                            loading more…
                        </p>
                    )}
                    <pre className="whitespace-pre-wrap rounded bg-gray-50 p-2 text-xs text-gray-700">
                        {events.length
                            ? events.join('\n')
                            : 'no onEndReached events yet'}
                    </pre>
                </div>
            </div>
        </section>
    )
}

const DirectoryDemo = () => {
    const [showHierarchyLines, setShowHierarchyLines] = useState(true)
    const [hierarchyLineBorderRadius, setHierarchyLineBorderRadius] =
        useState(0)
    const [activeItem, setActiveItem] = useState<string | null>(null)
    const virtualizedExpandedItems = useMemo(
        () => [
            'Merchant Directory',
            ...largeDirectoryGroups.map(
                (group) => `Merchant Directory/${group}`
            ),
        ],
        []
    )
    const virtualizedDirectoryData = useMemo<DirectoryData[]>(
        () => [
            {
                label: 'Large merchant tree',
                isCollapsible: false,
                items: [
                    {
                        label: 'Merchant Directory',
                        leftSlot: <FolderTree style={iconStyle} />,
                        rightSlot: (
                            <span style={rightSlotStyle}>
                                {largeDirectoryGroups.length}
                            </span>
                        ),
                        items: largeDirectoryGroups.map(
                            (group, groupIndex) => ({
                                label: group,
                                leftSlot: <Network style={iconStyle} />,
                                rightSlot: (
                                    <span style={rightSlotStyle}>250</span>
                                ),
                                items: Array.from(
                                    { length: 250 },
                                    (_, index) => {
                                        const merchantNumber =
                                            groupIndex * 250 + index + 1
                                        const paddedMerchantNumber = String(
                                            merchantNumber
                                        ).padStart(5, '0')
                                        const routeType =
                                            index % 4 === 0
                                                ? 'Settlements'
                                                : index % 4 === 1
                                                  ? 'Refunds'
                                                  : index % 4 === 2
                                                    ? 'Risk Review'
                                                    : 'Routing Rules'

                                        return {
                                            label: `${group} / ${routeType} / Merchant Operations Route ${paddedMerchantNumber}`,
                                            leftSlot: (
                                                <Store style={iconStyle} />
                                            ),
                                            rightSlot: (
                                                <span style={rightSlotStyle}>
                                                    {index % 3 === 0
                                                        ? 'Live'
                                                        : index % 3 === 1
                                                          ? 'Beta'
                                                          : 'QA'}
                                                </span>
                                            ),
                                        }
                                    }
                                ),
                            })
                        ),
                    },
                ],
            },
        ],
        []
    )

    return (
        <div className="p-8 space-y-8">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">Directory Component</h1>
                <p className="text-gray-600">
                    Inline hierarchical navigation with expandable rows and
                    optional connector lines.
                </p>
            </div>

            <section className="space-y-4">
                <div className="flex items-center gap-6 flex-wrap">
                    <Switch
                        label="Show hierarchy lines"
                        checked={showHierarchyLines}
                        onChange={() => setShowHierarchyLines((prev) => !prev)}
                    />
                    <div className="flex min-w-64 items-center gap-3">
                        <label
                            htmlFor="directory-line-radius"
                            className="text-sm font-medium text-gray-700"
                        >
                            Line radius
                        </label>
                        <input
                            id="directory-line-radius"
                            type="range"
                            min={0}
                            max={16}
                            step={1}
                            value={hierarchyLineBorderRadius}
                            onChange={(event) =>
                                setHierarchyLineBorderRadius(
                                    Number(event.target.value)
                                )
                            }
                            className="w-32"
                        />
                        <span className="w-10 text-sm text-gray-500">
                            {hierarchyLineBorderRadius}px
                        </span>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">
                            Multiple parent hierarchy
                        </h2>
                        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-3">
                            <Directory
                                directoryData={commerceDirectoryData}
                                activeItem={activeItem}
                                onActiveItemChange={setActiveItem}
                                showHierarchyLines={showHierarchyLines}
                                hierarchyLineBorderRadius={`${hierarchyLineBorderRadius}px`}
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            Click parent rows to expand each level. Current
                            active item: <strong>{activeItem ?? 'none'}</strong>
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">
                            Default comparison
                        </h2>
                        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-3">
                            <Directory
                                directoryData={productDirectoryData}
                                showHierarchyLines={false}
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            Same inline expansion model without connector lines.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Compact tree</h2>
                <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <Directory
                        directoryData={[
                            {
                                label: 'Workspace',
                                isCollapsible: false,
                                items: [
                                    {
                                        label: 'Blend Design System',
                                        leftSlot: (
                                            <FolderTree style={iconStyle} />
                                        ),
                                        items: [
                                            { label: 'Components' },
                                            { label: 'Tokens' },
                                            { label: 'Documentation' },
                                        ],
                                    },
                                ],
                            },
                        ]}
                        showHierarchyLines
                        hierarchyLineBorderRadius={`${hierarchyLineBorderRadius}px`}
                    />
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Five level hierarchy</h2>
                <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-3">
                    <Directory
                        directoryData={fiveLevelDirectoryData}
                        defaultActiveItem="Acme Commerce Group/Helix Network/Orbit Pharma/North India Region/Delhi Fulfillment Hub"
                        showHierarchyLines
                        hierarchyLineBorderRadius={`${hierarchyLineBorderRadius}px`}
                    />
                </div>
                <p className="text-xs text-gray-500">
                    Expand Acme Commerce Group → Helix Network → Orbit Pharma →
                    North India Region to inspect connector lines across five
                    levels.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Long route names</h2>
                <div className="w-full max-w-xs rounded-lg border border-gray-200 bg-white p-3">
                    <Directory
                        directoryData={longNameDirectoryData}
                        defaultActiveItem="Global Acme Commerce Group Enterprise Administration Console/Helix Network Cross Border Payment Operations and Reconciliation/Orbit Pharma International Merchant Settlement Configuration/North India Region Routing Rules and Failover Preferences"
                        showHierarchyLines
                        hierarchyLineBorderRadius={`${hierarchyLineBorderRadius}px`}
                    />
                </div>
                <p className="text-xs text-gray-500">
                    Narrow container with intentionally long labels to inspect
                    truncation, tooltips, hover backgrounds, and line spacing.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Virtualized 10K rows</h2>
                <div className="h-96 w-full max-w-md rounded-lg border border-gray-200 bg-white p-3">
                    <Directory
                        directoryData={virtualizedDirectoryData}
                        defaultExpandedItems={virtualizedExpandedItems}
                        enableVirtualization
                        virtualization={{
                            rowHeight: 36,
                            sectionHeight: 28,
                            viewportHeight: 340,
                            overscan: 8,
                            threshold: 100,
                        }}
                        showHierarchyLines={showHierarchyLines}
                        hierarchyLineBorderRadius={`${hierarchyLineBorderRadius}px`}
                    />
                </div>
                <p className="text-xs text-gray-500">
                    Opt-in viewport rendering for 40 expanded groups and 10,000
                    merchant rows. Only visible rows plus overscan are mounted.
                </p>
            </section>

            <LazyLoadSection />
        </div>
    )
}

export default DirectoryDemo

import { useState } from 'react'
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

const DirectoryDemo = () => {
    const [showHierarchyLines, setShowHierarchyLines] = useState(true)
    const [hierarchyLineBorderRadius, setHierarchyLineBorderRadius] =
        useState(0)
    const [activeItem, setActiveItem] = useState<string | null>(
        'Acme Commerce Group/Helix Network/Orbit Pharma'
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
        </div>
    )
}

export default DirectoryDemo

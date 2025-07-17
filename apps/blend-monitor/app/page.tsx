'use client'

import React, { useEffect, useState } from 'react'
import {
    useComponentCoverage,
    usePackageStats,
    useRecentActivity,
    useDownloadTrends,
} from '@/hooks/useRealtimeData'
import {
    Package,
    Link,
    Download,
    Tag,
    Activity,
    AlertCircle,
    TrendingUp,
    RefreshCw,
    ArrowRight,
    CheckCircle,
    XCircle,
    Clock,
    GitBranch,
    BarChart3,
    Code2,
    Beaker,
    Home,
    Settings,
    HelpCircle,
    Bell,
    Search,
    User,
    LogOut,
    ChevronRight,
    Zap,
    Shield,
    Database,
} from 'lucide-react'
import {
    Sidebar,
    ButtonV2,
    ButtonSizeV2,
    ButtonTypeV2,
    Charts,
    ChartType,
    Tag as BlendTag,
    TagVariant,
    TagColor,
    TagSize,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    Avatar,
    AvatarSize,
    StatCard,
    StatCardVariant,
    ChangeType,
} from 'blend-v1'
import { useRouter } from 'next/navigation'

export default function DashboardHome() {
    const router = useRouter()
    const { coverage, loading: coverageLoading } = useComponentCoverage()
    const { packageStats, loading: packageLoading } = usePackageStats()
    const { activities, loading: activitiesLoading } = useRecentActivity(5)
    const { trends, loading: trendsLoading } = useDownloadTrends()
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Trigger initial data fetch
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setRefreshing(true)
        try {
            await Promise.all([
                fetch('/api/components').then((res) => res.json()),
                fetch('/api/npm').then((res) => res.json()),
            ])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setRefreshing(false)
        }
    }

    // Tenant and merchant configuration
    const tenants = [
        {
            label: 'Blend Monitor',
            icon: (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                    <Zap className="w-5 h-5" />
                </div>
            ),
            id: 'blend-monitor',
        },
    ]

    const merchants = [
        {
            label: 'Production',
            icon: <Shield className="w-4 h-4 text-green-600" />,
            id: 'production',
        },
        {
            label: 'Development',
            icon: <Code2 className="w-4 h-4 text-blue-600" />,
            id: 'development',
        },
    ]

    // Navigation data with better organization
    const navigationData = [
        {
            label: 'Main',
            isCollapsible: false,
            items: [
                {
                    label: 'Dashboard',
                    leftSlot: <Home className="w-4 h-4" />,
                    rightSlot: (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    ),
                    onClick: () => router.push('/'),
                    isActive: true,
                },
                {
                    label: 'Analytics',
                    leftSlot: <BarChart3 className="w-4 h-4" />,
                    onClick: () => router.push('/analytics'),
                },
            ],
        },
        {
            label: 'Code Connect',
            items: [
                {
                    label: 'Coverage',
                    leftSlot: <Link className="w-4 h-4" />,
                    rightSlot: (
                        <BlendTag
                            text={`${coverage?.percentage || 0}%`}
                            variant={TagVariant.SUBTLE}
                            color={TagColor.SUCCESS}
                            size={TagSize.XS}
                        />
                    ),
                    onClick: () => router.push('/code-connect'),
                },
                {
                    label: 'Health Monitor',
                    leftSlot: <AlertCircle className="w-4 h-4" />,
                    onClick: () => router.push('/code-connect/health'),
                },
                {
                    label: 'Integration Status',
                    leftSlot: <Database className="w-4 h-4" />,
                    onClick: () => router.push('/code-connect/status'),
                },
            ],
        },
        {
            label: 'NPM Publishing',
            items: [
                {
                    label: 'Package Stats',
                    leftSlot: <Package className="w-4 h-4" />,
                    rightSlot: (
                        <BlendTag
                            text="Live"
                            variant={TagVariant.ATTENTIVE}
                            color={TagColor.PRIMARY}
                            size={TagSize.XS}
                        />
                    ),
                    onClick: () => router.push('/npm'),
                },
                {
                    label: 'Version History',
                    leftSlot: <Tag className="w-4 h-4" />,
                    onClick: () => router.push('/npm/history'),
                },
                {
                    label: 'Release Notes',
                    leftSlot: <GitBranch className="w-4 h-4" />,
                    onClick: () => router.push('/npm/releases'),
                },
            ],
        },
        {
            label: 'Settings',
            items: [
                {
                    label: 'Configuration',
                    leftSlot: <Settings className="w-4 h-4" />,
                    onClick: () => router.push('/settings'),
                },
                {
                    label: 'Help & Support',
                    leftSlot: <HelpCircle className="w-4 h-4" />,
                    onClick: () => router.push('/help'),
                },
            ],
        },
    ]

    // Prepare chart data
    const chartData =
        trends.length > 0
            ? [
                  {
                      name: 'Downloads',
                      data: trends.slice(-7).reduce((acc, trend) => {
                          const date = new Date(trend.date).toLocaleDateString(
                              'en-US',
                              { weekday: 'short' }
                          )
                          acc[date] = {
                              primary: {
                                  label: 'Downloads',
                                  val: trend.downloads,
                              },
                          }
                          return acc
                      }, {} as any),
                  },
              ]
            : []

    const coverageData = [
        {
            name: 'Coverage',
            data: {
                Inputs: { primary: { label: 'Components', val: 12 } },
                Display: { primary: { label: 'Components', val: 9 } },
                Navigation: { primary: { label: 'Components', val: 4 } },
                Feedback: { primary: { label: 'Components', val: 3 } },
                Other: { primary: { label: 'Components', val: 3 } },
            },
        },
    ]

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'integration_added':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'version_published':
                return <GitBranch className="w-4 h-4 text-blue-500" />
            case 'component_updated':
                return <Package className="w-4 h-4 text-purple-500" />
            case 'sync_failed':
                return <XCircle className="w-4 h-4 text-red-500" />
            default:
                return <Activity className="w-4 h-4 text-gray-500" />
        }
    }

    const getActivityMessage = (activity: any) => {
        switch (activity.type) {
            case 'integration_added':
                return (
                    <span>
                        Code Connect added for{' '}
                        <strong className="font-semibold text-blue-600">
                            {activity.component}
                        </strong>
                    </span>
                )
            case 'version_published':
                return (
                    <span>
                        Version{' '}
                        <strong className="font-semibold text-green-600">
                            {activity.version}
                        </strong>{' '}
                        published
                    </span>
                )
            case 'component_updated':
                return (
                    <span>
                        <strong className="font-semibold text-purple-600">
                            {activity.component}
                        </strong>{' '}
                        updated
                    </span>
                )
            case 'sync_failed':
                return (
                    <span>
                        Sync failed for{' '}
                        <strong className="font-semibold text-red-600">
                            {activity.component}
                        </strong>
                    </span>
                )
            case 'component_scan':
                return (
                    <span>
                        Component scan completed -{' '}
                        <strong className="font-semibold">
                            {activity.componentsFound} components
                        </strong>{' '}
                        found
                    </span>
                )
            case 'npm_stats_updated':
                return (
                    <span>
                        NPM statistics updated for version{' '}
                        <strong className="font-semibold">
                            {activity.version}
                        </strong>
                    </span>
                )
            default:
                return <span>{activity.type}</span>
        }
    }

    // Minimal topbar with only essentials
    const topbar = (
        <div className="sticky top-0 z-50 bg-white">
            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Blend Monitoring
                    </h2>
                    <BlendTag
                        text="Live"
                        variant={TagVariant.SUBTLE}
                        color={TagColor.SUCCESS}
                        size={TagSize.XS}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <ButtonV2
                        leadingIcon={
                            <RefreshCw
                                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                            />
                        }
                        onClick={fetchData}
                        disabled={refreshing}
                        size={ButtonSizeV2.SMALL}
                    />
                    <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                        alt="John Doe"
                        size={AvatarSize.SM}
                    />
                </div>
            </div>
        </div>
    )

    // Footer with user info and actions
    const footer = (
        <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                        alt="John Doe"
                        size={AvatarSize.MD}
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            John Doe
                        </p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4 text-gray-600" />
                </button>
            </div>
        </div>
    )

    return (
        <div className="h-screen w-screen overflow-hidden">
            <Sidebar
                tenants={tenants}
                merchants={merchants}
                data={navigationData}
                topbar={topbar}
                footer={footer}
                activeTenant="blend-monitor"
                setActiveTenant={() => {}}
                activeMerchant="production"
                setActiveMerchant={() => {}}
            >
                <div className="h-full overflow-y-auto bg-white">
                    <div className="p-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="Total Components"
                                value={
                                    coverageLoading
                                        ? '...'
                                        : String(coverage?.total || 0)
                                }
                                titleIcon={
                                    <Package className="w-5 h-5 text-blue-600" />
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Code Connect Coverage"
                                value={
                                    coverageLoading
                                        ? '...'
                                        : `${coverage?.percentage || 0}%`
                                }
                                subtitle={
                                    coverageLoading
                                        ? 'Loading...'
                                        : `${coverage?.integrated || 0} of ${coverage?.total || 0} integrated`
                                }
                                change={{
                                    value: 3,
                                    type: ChangeType.INCREASE,
                                }}
                                titleIcon={
                                    <Link className="w-5 h-5 text-green-600" />
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Weekly Downloads"
                                value={
                                    packageLoading
                                        ? '...'
                                        : packageStats?.downloads.weekly.toLocaleString() ||
                                          '0'
                                }
                                change={{
                                    value: 12,
                                    type: ChangeType.INCREASE,
                                }}
                                titleIcon={
                                    <Download className="w-5 h-5 text-purple-600" />
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Current Version"
                                value={
                                    packageLoading
                                        ? '...'
                                        : packageStats?.version || '0.0.0'
                                }
                                subtitle={
                                    packageLoading
                                        ? 'Loading...'
                                        : packageStats?.lastPublish
                                          ? `Published ${new Date(packageStats.lastPublish).toLocaleDateString()}`
                                          : ''
                                }
                                titleIcon={
                                    <Tag className="w-5 h-5 text-amber-600" />
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                        </div>

                        {/* Charts and Analytics */}
                        <Tabs defaultValue="analytics">
                            <TabsList variant={TabsVariant.UNDERLINE}>
                                <TabsTrigger
                                    value="analytics"
                                    leftSlot={<BarChart3 className="w-4 h-4" />}
                                >
                                    Analytics
                                </TabsTrigger>
                                <TabsTrigger
                                    value="components"
                                    leftSlot={<Code2 className="w-4 h-4" />}
                                >
                                    Components
                                </TabsTrigger>
                                <TabsTrigger
                                    value="health"
                                    leftSlot={<Beaker className="w-4 h-4" />}
                                >
                                    Health
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="analytics" className="mt-8">
                                <div className="flex gap-6">
                                    <div className="flex-1 overflow-hidden">
                                        <Charts
                                            chartType={ChartType.BAR}
                                            data={chartData}
                                            chartHeaderSlot={
                                                <div className="mb-4">
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        Download Trends
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        Last 7 days
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <Charts
                                            chartType={ChartType.PIE}
                                            data={coverageData}
                                            chartHeaderSlot={
                                                <div className="mb-4">
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        Coverage Distribution
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        By component category
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="components" className="mt-8">
                                <div className="flex gap-6">
                                    <div className="flex-1 overflow-hidden">
                                        <Charts
                                            chartType={ChartType.BAR}
                                            data={[
                                                {
                                                    name: 'Component Health',
                                                    data: {
                                                        Storybook: {
                                                            primary: {
                                                                label: 'Components',
                                                                val: 28,
                                                            },
                                                        },
                                                        Tests: {
                                                            primary: {
                                                                label: 'Components',
                                                                val: 25,
                                                            },
                                                        },
                                                        Figma: {
                                                            primary: {
                                                                label: 'Components',
                                                                val: 31,
                                                            },
                                                        },
                                                        Documented: {
                                                            primary: {
                                                                label: 'Components',
                                                                val: 22,
                                                            },
                                                        },
                                                    },
                                                },
                                            ]}
                                            chartHeaderSlot={
                                                <div className="mb-4">
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        Component Health Metrics
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        Coverage by type
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <Charts
                                            chartType={ChartType.LINE}
                                            data={[
                                                {
                                                    name: 'Component Growth',
                                                    data: trends
                                                        .slice(-7)
                                                        .reduce(
                                                            (
                                                                acc,
                                                                trend,
                                                                index
                                                            ) => {
                                                                const date =
                                                                    new Date(
                                                                        trend.date
                                                                    ).toLocaleDateString(
                                                                        'en-US',
                                                                        {
                                                                            weekday:
                                                                                'short',
                                                                        }
                                                                    )
                                                                acc[date] = {
                                                                    primary: {
                                                                        label: 'Components',
                                                                        val:
                                                                            25 +
                                                                            index *
                                                                                2,
                                                                    },
                                                                }
                                                                return acc
                                                            },
                                                            {} as any
                                                        ),
                                                },
                                            ]}
                                            chartHeaderSlot={
                                                <div className="mb-4">
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        Component Growth
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        Over time
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="health" className="mt-8">
                                <div className="flex gap-6">
                                    <div className="flex-1 overflow-hidden">
                                        <Charts
                                            chartType={ChartType.PIE}
                                            data={[
                                                {
                                                    name: 'System Status',
                                                    data: {
                                                        Operational: {
                                                            primary: {
                                                                label: 'Systems',
                                                                val: 3,
                                                            },
                                                        },
                                                        Warning: {
                                                            primary: {
                                                                label: 'Systems',
                                                                val: 1,
                                                            },
                                                        },
                                                        Down: {
                                                            primary: {
                                                                label: 'Systems',
                                                                val: 0,
                                                            },
                                                        },
                                                    },
                                                },
                                            ]}
                                            chartHeaderSlot={
                                                <div className="mb-4">
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        System Health
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        Current status
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <Charts
                                            chartType={ChartType.BAR}
                                            data={[
                                                {
                                                    name: 'Integration Status',
                                                    data: {
                                                        Figma: {
                                                            primary: {
                                                                label: 'Status',
                                                                val: 100,
                                                            },
                                                        },
                                                        NPM: {
                                                            primary: {
                                                                label: 'Status',
                                                                val: 100,
                                                            },
                                                        },
                                                        GitHub: {
                                                            primary: {
                                                                label: 'Status',
                                                                val: 50,
                                                            },
                                                        },
                                                    },
                                                },
                                            ]}
                                            chartHeaderSlot={
                                                <div className="mb-4">
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        Integration Status
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        Connection health
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}

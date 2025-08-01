'use client'

import React, { useEffect, useState } from 'react'
import {
    useComponentCoverage,
    usePackageStats,
    useRecentActivity,
    useDownloadTrends,
} from '@/frontend/hooks/usePostgreSQLData'
import { CardSkeleton } from '@/frontend/components/shared/Loader'
import {
    Package,
    Link,
    Download,
    Tag,
    BarChart3,
    Code2,
    Beaker,
} from 'lucide-react'
import {
    Charts,
    ChartType,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    StatCard,
    StatCardVariant,
    ChangeType,
} from 'blend-v1'
import { useRouter, usePathname } from 'next/navigation'
import { getNavigationData } from '@/frontend/components/shared/SidebarConfig'

export default function DashboardHome() {
    const router = useRouter()
    const pathname = usePathname()
    const { coverage, loading: coverageLoading } = useComponentCoverage()
    const { packageStats, loading: packageLoading } = usePackageStats()
    useRecentActivity(5)
    const { trends } = useDownloadTrends()
    const [, setRefreshing] = useState(false)

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

    // Get navigation data from shared config
    getNavigationData(router, pathname)

    // Prepare chart data
    const chartData =
        trends.length > 0
            ? [
                  {
                      name: 'Downloads',
                      data: trends.slice(-7).reduce(
                          (acc, trend) => {
                              const date = new Date(
                                  trend.date
                              ).toLocaleDateString('en-US', {
                                  weekday: 'short',
                              })
                              acc[date] = {
                                  primary: {
                                      label: 'Downloads',
                                      val: trend.downloads,
                                  },
                              }
                              return acc
                          },
                          {} as Record<
                              string,
                              {
                                  primary: {
                                      label: string
                                      val: number
                                  }
                              }
                          >
                      ),
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

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {coverageLoading || packageLoading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        <>
                            <StatCard
                                title="Total Components"
                                value={String(coverage?.total || 0)}
                                titleIcon={
                                    <Package className="w-5 h-5 text-blue-600" />
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                            <StatCard
                                title="Code Connect Coverage"
                                value={`${coverage?.percentage || 0}%`}
                                subtitle={`${coverage?.integrated || 0} of ${coverage?.total || 0} integrated`}
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
                                    packageStats?.downloads.weekly.toLocaleString() ||
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
                                value={packageStats?.version || '0.0.0'}
                                subtitle={
                                    packageStats?.lastPublish
                                        ? `Published ${new Date(packageStats.lastPublish).toLocaleDateString()}`
                                        : ''
                                }
                                titleIcon={
                                    <Tag className="w-5 h-5 text-amber-600" />
                                }
                                variant={StatCardVariant.NUMBER}
                            />
                        </>
                    )}
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
                                            data: trends.slice(-7).reduce(
                                                (acc, trend, index) => {
                                                    const date = new Date(
                                                        trend.date
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            weekday: 'short',
                                                        }
                                                    )
                                                    acc[date] = {
                                                        primary: {
                                                            label: 'Components',
                                                            val: 25 + index * 2,
                                                        },
                                                    }
                                                    return acc
                                                },
                                                {} as Record<
                                                    string,
                                                    {
                                                        primary: {
                                                            label: string
                                                            val: number
                                                        }
                                                    }
                                                >
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
    )
}

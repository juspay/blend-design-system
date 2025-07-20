'use client'

import React, { useState, useMemo } from 'react'
import { useComponents, useCategoryCoverage } from '@/hooks/useRealtimeData'
import { ComponentInfo } from '@/types'
import Loader, { CardSkeleton } from '@/components/shared/Loader'
import {
    ButtonV2,
    Tag,
    Charts,
    ChartType,
    TagVariant,
    TagColor,
    TagSize,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    DataTable,
} from 'blend-v1'
import {
    Package,
    Check,
    X,
    AlertCircle,
    RefreshCw,
    ArrowRight,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CodeConnectContent() {
    const router = useRouter()
    const { components, loading } = useComponents()
    const { categories } = useCategoryCoverage()
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [refreshing, setRefreshing] = useState(false)

    // Filter components by category
    const filteredComponents = useMemo(() => {
        if (selectedCategory === 'all') return components
        return components.filter((c) => c.category === selectedCategory)
    }, [components, selectedCategory])

    // Calculate stats
    const stats = useMemo(() => {
        const total = filteredComponents.length
        const integrated = filteredComponents.filter(
            (c) => c.hasFigmaConnect
        ).length
        const withStorybook = filteredComponents.filter(
            (c) => c.hasStorybook
        ).length
        const withTests = filteredComponents.filter((c) => c.hasTests).length

        return {
            total,
            integrated,
            percentage: total > 0 ? Math.round((integrated / total) * 100) : 0,
            withStorybook,
            withTests,
        }
    }, [filteredComponents])

    // Prepare chart data for pie chart
    const pieChartData = useMemo(() => {
        return [
            {
                name: 'Coverage',
                data: {
                    Integrated: {
                        primary: { label: 'Components', val: stats.integrated },
                    },
                    'Not Integrated': {
                        primary: {
                            label: 'Components',
                            val: stats.total - stats.integrated,
                        },
                    },
                },
            },
        ]
    }, [stats])

    // Prepare chart data for bar chart
    const barChartData = useMemo(() => {
        const categoryData = Object.entries(categories).map(
            ([category, data]) => ({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                integrated: data.integrated,
                total: data.total,
            })
        )

        return [
            {
                name: 'Categories',
                data: categoryData.reduce((acc, cat) => {
                    acc[cat.name] = {
                        primary: {
                            label: 'Integrated',
                            val: cat.integrated,
                        },
                    }
                    return acc
                }, {} as any),
            },
        ]
    }, [categories])

    // Calculate counts for each category
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {
            all: components.length,
        }

        Object.keys(categories).forEach((category) => {
            counts[category] = components.filter(
                (c) => c.category === category
            ).length
        })

        return counts
    }, [components, categories])

    // Button group items with counts
    const categoryButtons = [
        { id: 'all', label: `All (${categoryCounts.all || 0})` },
        { id: 'data', label: `Data (${categoryCounts.data || 0})` },
        { id: 'display', label: `Display (${categoryCounts.display || 0})` },
        { id: 'feedback', label: `Feedback (${categoryCounts.feedback || 0})` },
        { id: 'input', label: `Input (${categoryCounts.input || 0})` },
        {
            id: 'navigation',
            label: `Navigation (${categoryCounts.navigation || 0})`,
        },
        { id: 'other', label: `Other (${categoryCounts.other || 0})` },
    ]

    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            await fetch('/api/components', { method: 'POST' })
            // Data will auto-update via Firebase listeners
        } catch (error) {
            console.error('Error refreshing:', error)
        }
        setRefreshing(false)
    }

    if (loading) {
        return <Loader fullScreen size="large" text="Loading components..." />
    }

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                <div className="mb-8 flex items-center justify-end">
                    <ButtonV2
                        text="Refresh"
                        leadingIcon={
                            <RefreshCw
                                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                            />
                        }
                        onClick={handleRefresh}
                        disabled={refreshing}
                    />
                </div>

                {/* Coverage Overview */}
                <div className="flex gap-6 mb-8">
                    {loading ? (
                        <>
                            <div className="flex-1">
                                <CardSkeleton />
                            </div>
                            <div className="flex-1">
                                <CardSkeleton />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex-1 overflow-hidden">
                                <Charts
                                    chartType={ChartType.PIE}
                                    data={pieChartData}
                                    chartHeaderSlot={
                                        <div className="mb-4">
                                            <h3 className="text-base font-semibold text-gray-900">
                                                Overall Coverage
                                            </h3>
                                            <p className="text-xs text-gray-600">
                                                {stats.integrated} of{' '}
                                                {stats.total} components
                                                integrated ({stats.percentage}%)
                                            </p>
                                        </div>
                                    }
                                />
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <Charts
                                    chartType={ChartType.BAR}
                                    data={barChartData}
                                    chartHeaderSlot={
                                        <div className="mb-4">
                                            <h3 className="text-base font-semibold text-gray-900">
                                                Coverage by Category
                                            </h3>
                                            <p className="text-xs text-gray-600">
                                                Integration progress by
                                                component type
                                            </p>
                                        </div>
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Category Filter and Components */}
                <Tabs
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                >
                    <div className="sticky top-0 z-40 bg-white pb-6 -mx-8 px-8 pt-2">
                        <TabsList variant={TabsVariant.BOXED}>
                            {categoryButtons.map((button) => (
                                <TabsTrigger
                                    key={button.id}
                                    value={button.id}
                                    variant={TabsVariant.BOXED}
                                >
                                    {button.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value={selectedCategory}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredComponents.map((component) => (
                                <div
                                    key={component.id}
                                    className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                                >
                                    {/* Card Header */}
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {component.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {component.category}
                                                </p>
                                            </div>
                                            <Package className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 space-y-2">
                                        {/* Integration Status */}
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Code Connect
                                            </span>
                                            {component.hasFigmaConnect ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <X className="w-4 h-4 text-gray-300" />
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Storybook
                                            </span>
                                            {component.hasStorybook ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <X className="w-4 h-4 text-gray-300" />
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Tests
                                            </span>
                                            {component.hasTests ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <X className="w-4 h-4 text-gray-300" />
                                            )}
                                        </div>

                                        {/* Status */}
                                        <div className="pt-3 mt-3 border-t border-gray-100">
                                            {component.hasFigmaConnect ? (
                                                <Tag
                                                    text="Integrated"
                                                    variant={TagVariant.SUBTLE}
                                                    color={TagColor.SUCCESS}
                                                    size={TagSize.XS}
                                                />
                                            ) : (
                                                <Tag
                                                    text="Needs Integration"
                                                    variant={TagVariant.SUBTLE}
                                                    color={TagColor.WARNING}
                                                    size={TagSize.XS}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

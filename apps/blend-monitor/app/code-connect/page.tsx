'use client'

import React, { useState, useMemo } from 'react'
import { useComponents, useCategoryCoverage } from '@/hooks/useRealtimeData'
import {
    ButtonV2,
    Tag,
    Charts,
    ChartType,
    TagVariant,
    TagColor,
    TagSize,
} from 'blend-v1'
import { Package, Check, X, AlertCircle, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CodeConnectPage() {
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

    // Prepare chart data
    const chartData = useMemo(() => {
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
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading components...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Code Connect Coverage
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Track Figma Code Connect integration progress
                    </p>
                </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Overall Coverage
                        </h3>
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center">
                                <svg className="w-32 h-32">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="#e5e7eb"
                                        strokeWidth="12"
                                        fill="none"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="#3b82f6"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray={`${stats.percentage * 3.52} 352`}
                                        strokeDashoffset="0"
                                        transform="rotate(-90 64 64)"
                                    />
                                </svg>
                                <div className="absolute">
                                    <p className="text-3xl font-bold">
                                        {stats.percentage}%
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {stats.integrated}/{stats.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    With Storybook
                                </span>
                                <span className="font-medium">
                                    {stats.withStorybook}/{stats.total}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    With Tests
                                </span>
                                <span className="font-medium">
                                    {stats.withTests}/{stats.total}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow p-6">
                        <Charts
                            chartType={ChartType.BAR}
                            data={chartData}
                            chartHeaderSlot={
                                <h3 className="text-lg font-semibold mb-4">
                                    Coverage by Category
                                </h3>
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                    <Tag
                        text="All"
                        variant={
                            selectedCategory === 'all'
                                ? TagVariant.ATTENTIVE
                                : TagVariant.SUBTLE
                        }
                        color={TagColor.PRIMARY}
                        size={TagSize.MD}
                        onClick={() => setSelectedCategory('all')}
                    />
                    {Object.keys(categories).map((category) => (
                        <Tag
                            key={category}
                            text={
                                category.charAt(0).toUpperCase() +
                                category.slice(1)
                            }
                            variant={
                                selectedCategory === category
                                    ? TagVariant.ATTENTIVE
                                    : TagVariant.SUBTLE
                            }
                            color={TagColor.NEUTRAL}
                            size={TagSize.MD}
                            onClick={() => setSelectedCategory(category)}
                        />
                    ))}
                </div>
            </div>

            {/* Components Grid */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">
                        Components ({filteredComponents.length})
                    </h3>
                </div>
                <div className="divide-y">
                    {filteredComponents.map((component) => (
                        <div
                            key={component.id}
                            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() =>
                                router.push(`/code-connect/${component.id}`)
                            }
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Package className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            {component.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {component.category}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        {component.hasFigmaConnect ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <X className="w-4 h-4 text-gray-300" />
                                        )}
                                        <span className="text-sm text-gray-600">
                                            Code Connect
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {component.hasStorybook ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <X className="w-4 h-4 text-gray-300" />
                                        )}
                                        <span className="text-sm text-gray-600">
                                            Storybook
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {component.hasTests ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <X className="w-4 h-4 text-gray-300" />
                                        )}
                                        <span className="text-sm text-gray-600">
                                            Tests
                                        </span>
                                    </div>
                                    {!component.hasFigmaConnect && (
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
            </div>
        </div>
    )
}

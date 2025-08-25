'use client'

interface TrendData {
    date: string
    componentCount: number
    sessionCount: number
    eventCount: number
}

interface TrendsChartProps {
    trends: TrendData[]
}

export function TrendsChart({ trends }: TrendsChartProps) {
    if (trends.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No trend data available
            </div>
        )
    }

    // Sort trends by date (most recent first for display)
    const sortedTrends = [...trends].reverse()

    // Calculate max values for scaling
    const maxEvents = Math.max(...sortedTrends.map((t) => t.eventCount))
    const maxSessions = Math.max(...sortedTrends.map((t) => t.sessionCount))

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-800">
                        Total Events
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                        {sortedTrends
                            .reduce((sum, t) => sum + t.eventCount, 0)
                            .toLocaleString()}
                    </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-800">
                        Total Sessions
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                        {sortedTrends
                            .reduce((sum, t) => sum + t.sessionCount, 0)
                            .toLocaleString()}
                    </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-purple-800">
                        Unique Components
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                        {Math.max(...sortedTrends.map((t) => t.componentCount))}
                    </div>
                </div>
            </div>

            {/* Chart area */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                        Daily Activity
                    </h4>
                </div>

                {/* Chart bars */}
                <div className="space-y-3">
                    {sortedTrends.slice(0, 10).map((trend) => {
                        const eventHeight =
                            maxEvents > 0
                                ? (trend.eventCount / maxEvents) * 100
                                : 0
                        const sessionHeight =
                            maxSessions > 0
                                ? (trend.sessionCount / maxSessions) * 100
                                : 0

                        return (
                            <div
                                key={trend.date}
                                className="flex items-center space-x-4"
                            >
                                <div className="w-16 text-xs text-gray-600">
                                    {formatDate(trend.date)}
                                </div>

                                {/* Events bar */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-xs text-blue-600 w-12">
                                            Events
                                        </div>
                                        <div className="flex-1 bg-blue-100 rounded-full h-4 relative">
                                            <div
                                                className="bg-blue-500 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                                                style={{
                                                    width: `${Math.max(eventHeight, 5)}%`,
                                                }}
                                            >
                                                {trend.eventCount > 0 && (
                                                    <span className="text-xs text-white font-medium">
                                                        {trend.eventCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sessions bar */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-xs text-green-600 w-12">
                                            Sessions
                                        </div>
                                        <div className="flex-1 bg-green-100 rounded-full h-4 relative">
                                            <div
                                                className="bg-green-500 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                                                style={{
                                                    width: `${Math.max(sessionHeight, 5)}%`,
                                                }}
                                            >
                                                {trend.sessionCount > 0 && (
                                                    <span className="text-xs text-white font-medium">
                                                        {trend.sessionCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Components count */}
                                <div className="w-16 text-xs text-purple-600 text-center">
                                    {trend.componentCount} comp
                                </div>
                            </div>
                        )
                    })}
                </div>

                {sortedTrends.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No data for the last 30 days
                    </div>
                )}
            </div>
        </div>
    )
}

import { NextRequest, NextResponse } from 'next/server'
import { getAdminDatabase } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const environment = searchParams.get('environment') || 'production'
        const hours = parseInt(searchParams.get('hours') || '24')

        // Fetch performance data from Realtime Database
        const db = getAdminDatabase()
        const snapshot = await db
            .ref(`deployments/performance/${environment}`)
            .once('value')
        const performanceData = snapshot.val()

        if (!performanceData) {
            return NextResponse.json({
                metrics: {
                    avgResponseTime: { p50: 0, p95: 0, p99: 0 },
                    avgErrorRate: 0,
                    avgRequestsPerSecond: 0,
                    avgCpuUsage: 0,
                    avgMemoryUsage: 0,
                },
                raw: [],
                environment,
                timeRange: {
                    start: Date.now() - hours * 60 * 60 * 1000,
                    end: Date.now(),
                },
            })
        }

        // Get current metrics
        const currentMetrics = performanceData.current || {}

        // Filter history by time range
        const now = Date.now()
        const startTime = now - hours * 60 * 60 * 1000
        const history = (performanceData.history || []).filter(
            (metric: any) => metric.timestamp >= startTime
        )

        // Calculate aggregated metrics
        const aggregated = {
            avgResponseTime: {
                p50: currentMetrics.responseTime?.p50 || 0,
                p95: currentMetrics.responseTime?.p95 || 0,
                p99: currentMetrics.responseTime?.p99 || 0,
            },
            avgErrorRate: currentMetrics.errorRate || 0,
            avgRequestsPerSecond: currentMetrics.requestsPerSecond || 0,
            avgCpuUsage: currentMetrics.cpuUsage || 0,
            avgMemoryUsage: currentMetrics.memoryUsage || 0,
            avgActiveConnections: currentMetrics.activeConnections || 0,
        }

        // If we have history, calculate averages
        if (history.length > 0) {
            const totals = history.reduce(
                (acc: any, metric: any) => {
                    acc.responseTime.p50 += metric.responseTime?.p50 || 0
                    acc.responseTime.p95 += metric.responseTime?.p95 || 0
                    acc.responseTime.p99 += metric.responseTime?.p99 || 0
                    acc.errorRate += metric.errorRate || 0
                    acc.requestsPerSecond += metric.requestsPerSecond || 0
                    acc.cpuUsage += metric.cpuUsage || 0
                    acc.memoryUsage += metric.memoryUsage || 0
                    acc.activeConnections += metric.activeConnections || 0
                    return acc
                },
                {
                    responseTime: { p50: 0, p95: 0, p99: 0 },
                    errorRate: 0,
                    requestsPerSecond: 0,
                    cpuUsage: 0,
                    memoryUsage: 0,
                    activeConnections: 0,
                }
            )

            const count = history.length
            aggregated.avgResponseTime.p50 = totals.responseTime.p50 / count
            aggregated.avgResponseTime.p95 = totals.responseTime.p95 / count
            aggregated.avgResponseTime.p99 = totals.responseTime.p99 / count
            aggregated.avgErrorRate = totals.errorRate / count
            aggregated.avgRequestsPerSecond = totals.requestsPerSecond / count
            aggregated.avgCpuUsage = totals.cpuUsage / count
            aggregated.avgMemoryUsage = totals.memoryUsage / count
            aggregated.avgActiveConnections = totals.activeConnections / count
        }

        return NextResponse.json({
            metrics: aggregated,
            raw: history,
            environment,
            timeRange: { start: startTime, end: now },
        })
    } catch (error) {
        console.error('Error fetching performance metrics:', error)
        return NextResponse.json(
            { error: 'Failed to fetch performance metrics' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { environment, metrics } = body

        if (!environment || !metrics) {
            return NextResponse.json(
                { error: 'Environment and metrics are required' },
                { status: 400 }
            )
        }

        // Store metrics in Realtime Database
        const db = getAdminDatabase()
        const timestamp = Date.now()

        // Update current metrics
        await db.ref(`deployments/performance/${environment}/current`).set({
            ...metrics,
            timestamp,
        })

        // Add to history
        await db.ref(`deployments/performance/${environment}/history`).push({
            ...metrics,
            timestamp,
        })

        return NextResponse.json({
            success: true,
            message: 'Performance metrics recorded',
        })
    } catch (error) {
        console.error('Error recording performance metrics:', error)
        return NextResponse.json(
            { error: 'Failed to record performance metrics' },
            { status: 500 }
        )
    }
}

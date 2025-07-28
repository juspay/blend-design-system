import { NextRequest, NextResponse } from 'next/server'
import { getFirebaseUsage, updateUsageMetrics } from '@/lib/deployment-client'

export async function GET(request: NextRequest) {
    try {
        const usage = await getFirebaseUsage()

        if (!usage) {
            // Return null to indicate no data
            return NextResponse.json({ usage: null })
        }

        return NextResponse.json({ usage })
    } catch (error) {
        console.error('Error fetching Firebase usage:', error)
        return NextResponse.json(
            { error: 'Failed to fetch usage data' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { usage } = body

        if (!usage) {
            return NextResponse.json(
                { error: 'Usage data is required' },
                { status: 400 }
            )
        }

        await updateUsageMetrics(usage)

        return NextResponse.json({
            success: true,
            message: 'Usage metrics updated',
        })
    } catch (error) {
        console.error('Error updating usage metrics:', error)
        return NextResponse.json(
            { error: 'Failed to update usage metrics' },
            { status: 500 }
        )
    }
}

// Endpoint to check for usage alerts
export async function PUT(request: NextRequest) {
    try {
        const usage = await getFirebaseUsage()

        if (!usage) {
            return NextResponse.json({ alerts: [] })
        }

        const alerts = []

        // Check hosting bandwidth
        const bandwidthUsage =
            (usage.hosting.bandwidth.used / usage.hosting.bandwidth.limit) * 100
        if (bandwidthUsage > 80) {
            alerts.push({
                type: 'warning',
                service: 'hosting',
                metric: 'bandwidth',
                message: `Hosting bandwidth usage is at ${bandwidthUsage.toFixed(1)}% of the monthly limit`,
                percentage: bandwidthUsage,
            })
        }

        // Check Firestore reads
        const firestoreReadsUsage =
            (usage.firestore.reads.used / usage.firestore.reads.limit) * 100
        if (firestoreReadsUsage > 80) {
            alerts.push({
                type: 'warning',
                service: 'firestore',
                metric: 'reads',
                message: `Firestore read operations are at ${firestoreReadsUsage.toFixed(1)}% of the monthly limit`,
                percentage: firestoreReadsUsage,
            })
        }

        // Check budget
        const budgetUsage =
            (usage.billing.currentCost / usage.billing.budget) * 100
        if (budgetUsage > 90) {
            alerts.push({
                type: 'critical',
                service: 'billing',
                metric: 'budget',
                message: `Current spending is at ${budgetUsage.toFixed(1)}% of the monthly budget`,
                percentage: budgetUsage,
            })
        } else if (budgetUsage > 75) {
            alerts.push({
                type: 'warning',
                service: 'billing',
                metric: 'budget',
                message: `Current spending is at ${budgetUsage.toFixed(1)}% of the monthly budget`,
                percentage: budgetUsage,
            })
        }

        return NextResponse.json({ alerts })
    } catch (error) {
        console.error('Error checking usage alerts:', error)
        return NextResponse.json(
            { error: 'Failed to check usage alerts' },
            { status: 500 }
        )
    }
}

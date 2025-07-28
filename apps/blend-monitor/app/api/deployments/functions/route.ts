import { NextRequest, NextResponse } from 'next/server'
import {
    getFunctionsStatus,
    updateFunctionMetrics,
} from '@/lib/deployment-client'

export async function GET(request: NextRequest) {
    try {
        const functions = await getFunctionsStatus()

        // Separate API and background functions
        const apiFunctions = functions.filter((f) => f.name.startsWith('/api/'))
        const backgroundFunctions = functions.filter(
            (f) => !f.name.startsWith('/api/')
        )

        return NextResponse.json({
            api: apiFunctions,
            background: backgroundFunctions,
            total: functions.length,
        })
    } catch (error) {
        console.error('Error fetching functions status:', error)
        return NextResponse.json(
            { error: 'Failed to fetch functions status' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { functionName, metrics } = body

        if (!functionName || !metrics) {
            return NextResponse.json(
                { error: 'Function name and metrics are required' },
                { status: 400 }
            )
        }

        await updateFunctionMetrics(functionName, metrics)

        return NextResponse.json({
            success: true,
            message: `Metrics updated for function ${functionName}`,
        })
    } catch (error) {
        console.error('Error updating function metrics:', error)
        return NextResponse.json(
            { error: 'Failed to update function metrics' },
            { status: 500 }
        )
    }
}

// Webhook endpoint for Cloud Functions to report their status
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { functionName, status, metrics } = body

        if (!functionName) {
            return NextResponse.json(
                { error: 'Function name is required' },
                { status: 400 }
            )
        }

        const updateData: any = {
            lastExecution: new Date().toISOString(),
        }

        if (status) {
            updateData.status = status
        }

        if (metrics) {
            Object.assign(updateData, metrics)
        }

        await updateFunctionMetrics(functionName, updateData)

        return NextResponse.json({
            success: true,
            message: 'Function status updated',
        })
    } catch (error) {
        console.error('Error in function webhook:', error)
        return NextResponse.json(
            { error: 'Failed to process webhook' },
            { status: 500 }
        )
    }
}

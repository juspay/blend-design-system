import { NextRequest, NextResponse } from 'next/server'
import {
    getEnvironmentStatus,
    getHostingReleases,
} from '@/lib/deployment-client'
import type { Environment } from '@/types'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const environment = searchParams.get('environment')

        if (environment) {
            // Get specific environment status
            const status = await getEnvironmentStatus(environment)
            return NextResponse.json({ status })
        }

        // Get all environments
        const environments = ['production', 'staging', 'development']
        const statuses: Record<string, Environment | null> = {}

        for (const env of environments) {
            statuses[env] = await getEnvironmentStatus(env)
        }

        // Also get hosting releases if project ID is provided
        const projectId = process.env.FIREBASE_PROJECT_ID
        let releases = null

        if (projectId) {
            releases = await getHostingReleases(projectId)
        }

        return NextResponse.json({
            environments: statuses,
            releases,
        })
    } catch (error) {
        console.error('Error in hosting API:', error)
        return NextResponse.json(
            { error: 'Failed to fetch hosting data' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { environment, status } = body

        if (!environment || !status) {
            return NextResponse.json(
                { error: 'Environment and status are required' },
                { status: 400 }
            )
        }

        // In a real implementation, you would update the environment status
        // For now, we'll return a success response
        return NextResponse.json({
            success: true,
            message: `Environment ${environment} status updated`,
        })
    } catch (error) {
        console.error('Error updating hosting status:', error)
        return NextResponse.json(
            { error: 'Failed to update hosting status' },
            { status: 500 }
        )
    }
}

import { NextRequest, NextResponse } from 'next/server'
import { getDeploymentHistory, createDeployment } from '@/lib/deployment-client'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50')
        const environment = searchParams.get('environment') || undefined
        const source = searchParams.get('source') || 'all'

        const deployments = await getDeploymentHistory(
            limit,
            environment,
            source
        )

        return NextResponse.json({ deployments })
    } catch (error) {
        console.error('Error fetching deployment history:', error)
        return NextResponse.json(
            { error: 'Failed to fetch deployment history' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        // In production, verify user authentication
        // const session = await getServerSession()
        // if (!session) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        // }

        const body = await request.json()
        const { environment, version, commitSha, deployer } = body

        if (!environment || !version || !commitSha) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const deployment = {
            environment,
            version,
            commitSha,
            deployer: deployer || {
                name: 'System',
                email: 'system@blend.app',
            },
            startTime: new Date().toISOString(),
            status: 'in_progress' as const,
            rollbackAvailable: false,
        }

        const deploymentId = await createDeployment(deployment)

        return NextResponse.json({
            success: true,
            deploymentId,
        })
    } catch (error) {
        console.error('Error creating deployment:', error)
        return NextResponse.json(
            { error: 'Failed to create deployment' },
            { status: 500 }
        )
    }
}

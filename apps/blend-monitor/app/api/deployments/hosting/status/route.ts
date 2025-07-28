import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth, getAdminDatabase } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.split('Bearer ')[1]

        try {
            const auth = getAdminAuth()
            await auth.verifyIdToken(token)
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        // Get deployment ID from query params
        const { searchParams } = new URL(request.url)
        const deploymentId = searchParams.get('deploymentId')

        if (!deploymentId) {
            return NextResponse.json(
                { error: 'Deployment ID is required' },
                { status: 400 }
            )
        }

        // Get deployment status from database
        const db = getAdminDatabase()
        const snapshot = await db
            .ref(`deployments/history/${deploymentId}`)
            .once('value')
        const deployment = snapshot.val()

        if (!deployment) {
            return NextResponse.json(
                { error: 'Deployment not found' },
                { status: 404 }
            )
        }

        // Get build logs
        const buildLogsSnapshot = await db
            .ref(`deployments/history/${deploymentId}/buildLogs`)
            .once('value')
        const buildLogs: string[] = []
        buildLogsSnapshot.forEach((child: any) => {
            buildLogs.push(child.val())
        })

        // Get deployment logs
        const deploymentLogsSnapshot = await db
            .ref(`deployments/history/${deploymentId}/deploymentLogs`)
            .once('value')
        const deploymentLogs: string[] = []
        deploymentLogsSnapshot.forEach((child: any) => {
            deploymentLogs.push(child.val())
        })

        return NextResponse.json({
            success: true,
            deployment: {
                ...deployment,
                buildLogs,
                deploymentLogs,
            },
        })
    } catch (error) {
        console.error('Status API error:', error)
        return NextResponse.json(
            {
                error: 'Failed to get deployment status',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

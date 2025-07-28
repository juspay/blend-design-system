import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth } from '@/lib/firebase-admin'
import { deploymentService } from '@/lib/deployment-service'

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.split('Bearer ')[1]
        let userId: string

        try {
            const auth = getAdminAuth()
            const decodedToken = await auth.verifyIdToken(token)
            userId = decodedToken.uid
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        // Parse request body
        const body = await request.json()
        const { deploymentId, comments } = body

        if (!deploymentId) {
            return NextResponse.json(
                { error: 'Deployment ID is required' },
                { status: 400 }
            )
        }

        // For now, any authenticated user can approve
        // TODO: Once permissions are fixed, implement role-based access control
        // In production, you'd want to check if user has admin role

        // Approve the deployment
        await deploymentService.approveDeployment(
            deploymentId,
            userId,
            comments
        )

        return NextResponse.json({
            success: true,
            message: 'Deployment approved successfully',
        })
    } catch (error) {
        console.error('Approval API error:', error)
        return NextResponse.json(
            {
                error: 'Failed to approve deployment',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

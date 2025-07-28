import { NextRequest, NextResponse } from 'next/server'
import { getAdminAuth } from '@/lib/firebase-admin'
import { deploymentService } from '@/lib/deployment-service'
import type { DeploymentRequest } from '@/types'

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
        const deploymentRequest: DeploymentRequest = {
            target: body.target,
            branch: body.branch,
            commitSha: body.commitSha,
            requireApproval: body.requireApproval,
            scheduledFor: body.scheduledFor,
            isPreview: body.isPreview,
            previewExpiry: body.previewExpiry,
            buildOptions: body.buildOptions || {
                clean: false,
                cache: true,
                parallel: false,
            },
        }

        // Validate target
        if (!deploymentRequest.target) {
            return NextResponse.json(
                { error: 'Target environment is required' },
                { status: 400 }
            )
        }

        // Check permissions for production deployments
        // For now, always require approval for production deployments
        // TODO: Once permissions are fixed, check user email for admin role
        if (deploymentRequest.target === 'blend-prod') {
            deploymentRequest.requireApproval = true
        }

        // Create deployment
        const deployment = await deploymentService.deployToHosting(
            deploymentRequest,
            userId
        )

        return NextResponse.json({
            success: true,
            deployment,
        })
    } catch (error) {
        console.error('Deployment API error:', error)
        return NextResponse.json(
            {
                error: 'Failed to create deployment',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

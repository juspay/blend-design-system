import { NextRequest, NextResponse } from 'next/server'
import { rollbackDeployment, logAuditAction } from '@/lib/deployment-client'
import { auth } from '@/lib/firebase'

export async function POST(request: NextRequest) {
    try {
        // Get current user from Firebase Auth
        // In production, you'd verify the user's permissions
        const user = auth.currentUser

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { deploymentId, targetVersion } = body

        if (!deploymentId || !targetVersion) {
            return NextResponse.json(
                { error: 'Deployment ID and target version are required' },
                { status: 400 }
            )
        }

        // Perform the rollback
        await rollbackDeployment(
            deploymentId,
            targetVersion,
            user.email || 'unknown@blend.app'
        )

        // Log the action
        await logAuditAction({
            action: 'rollback',
            user: user.email || 'unknown@blend.app',
            details: {
                deploymentId,
                targetVersion,
                timestamp: new Date().toISOString(),
            },
            result: 'success',
            resource: `deployment/${deploymentId}`,
        })

        return NextResponse.json({
            success: true,
            message: `Rollback initiated for deployment ${deploymentId}`,
        })
    } catch (error) {
        console.error('Error during rollback:', error)

        // Log the failed attempt
        try {
            const user = auth.currentUser
            await logAuditAction({
                action: 'rollback',
                user: user?.email || 'unknown@blend.app',
                details: {
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                    timestamp: new Date().toISOString(),
                },
                result: 'failed',
                resource: 'deployment',
            })
        } catch (logError) {
            console.error('Failed to log audit action:', logError)
        }

        return NextResponse.json(
            { error: 'Failed to perform rollback' },
            { status: 500 }
        )
    }
}

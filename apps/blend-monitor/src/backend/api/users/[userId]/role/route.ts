import { NextRequest, NextResponse } from 'next/server'
import {
    authenticateRequest,
    requirePermission,
    logAuditEvent,
} from '@/lib/auth-middleware'
import { databaseService } from '@/backe@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'

export async function PUT(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        await initializeDatabase()

        // Authenticate the request
        const user = await authenticateRequest(request)

        // Check permissions
        const permissionCheck = await requirePermission('users', 'write')(
            request,
            user
        )
        if (permissionCheck) {
            return permissionCheck
        }

        const { newRole } = await request.json()

        if (!newRole) {
            return NextResponse.json(
                { error: 'New role is required' },
                { status: 400 }
            )
        }

        // Get current user data for audit logging
        const currentUserData = await databaseService.getUserByFirebaseUid(
            params.userId
        )
        if (!currentUserData) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const oldRole = currentUserData.role

        // Update the user role
        await databaseService.updateUserRole(params.userId, newRole)

        // Log the audit event
        await logAuditEvent(
            user!,
            'role_change',
            `user:${params.userId}`,
            {
                targetUser: currentUserData.email,
                oldRole,
                newRole,
                userId: params.userId,
            },
            'success'
        )

        return NextResponse.json({
            success: true,
            message: 'User role updated successfully',
            oldRole,
            newRole,
        })
    } catch (error) {
        console.error('Error updating user role:', error)

        // Log failed attempt
        const user = await authenticateRequest(request)
        if (user) {
            await logAuditEvent(
                user,
                'role_change',
                `user:${params.userId}`,
                {
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                    userId: params.userId,
                },
                'failed'
            )
        }

        return NextResponse.json(
            { error: 'Failed to update user role' },
            { status: 500 }
        )
    }
}

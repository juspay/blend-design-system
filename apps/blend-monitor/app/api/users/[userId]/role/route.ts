import { NextRequest, NextResponse } from 'next/server'
import {
    authenticateRequest,
    requirePermission,
    logAuditEvent,
} from '@/backend/lib/auth-middleware'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    // Await the params first
    const { userId } = await params

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
        const currentUserData =
            await databaseService.getUserByFirebaseUid(userId)
        if (!currentUserData) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const oldRole = currentUserData.role

        // Update the user role
        await databaseService.updateUserRole(userId, newRole)

        // Log the audit event
        await logAuditEvent(
            user!,
            'role_change',
            `user:${userId}`,
            {
                targetUser: currentUserData.email,
                oldRole,
                newRole,
                userId: userId,
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
                `user:${userId}`,
                {
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                    userId: userId,
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

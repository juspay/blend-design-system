import { NextRequest, NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params

    try {
        await initializeDatabase()

        const user = await databaseService.getUserByFirebaseUid(userId)

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            user,
        })
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch user',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params

    try {
        await initializeDatabase()

        const body = await request.json()
        const { role, is_active, display_name } = body

        // Update user role if provided
        if (role !== undefined) {
            await databaseService.updateUserRole(userId, role)
        }

        // Update user status if provided
        if (is_active !== undefined) {
            await databaseService.updateUserStatus(userId, is_active)
        }

        // Update display name if provided
        if (display_name !== undefined) {
            await databaseService.updateUserDisplayName(userId, display_name)
        }

        // Get updated user
        const updatedUser = await databaseService.getUserByFirebaseUid(userId)

        return NextResponse.json({
            success: true,
            user: updatedUser,
        })
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update user',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params

    try {
        await initializeDatabase()

        await databaseService.deleteUser(userId)

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully',
        })
    } catch (error) {
        console.error('Error deleting user:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete user',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

import { NextRequest, NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import { authenticateRequest } from '@/backend/lib/auth-middleware'

export async function POST(request: NextRequest) {
    try {
        await initializeDatabase()

        // Note: POST is used by the frontend after login/logout
        // We'll allow this without full authentication for now
        const body = await request.json()
        const { user_id, action, details } = body

        if (!user_id || !action) {
            return NextResponse.json(
                { success: false, error: 'user_id and action are required' },
                { status: 400 }
            )
        }

        // Get user from database using firebase_uid
        const user = await databaseService.getUserByFirebaseUid(user_id)

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            )
        }

        // Log the activity
        await databaseService.logUserActivity(user.id, action, details)

        return NextResponse.json({
            success: true,
            message: 'Activity logged successfully',
        })
    } catch (error) {
        console.error('Error logging activity:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to log activity',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        await initializeDatabase()

        // Authenticate the request
        const authenticatedUser = await authenticateRequest(request)
        if (!authenticatedUser) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            )
        }

        const searchParams = request.nextUrl.searchParams
        const userId = searchParams.get('userId')
        const limit = searchParams.get('limit')
        const offset = searchParams.get('offset')

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'userId parameter is required' },
                { status: 400 }
            )
        }

        // Get user from database using firebase_uid
        const user = await databaseService.getUserByFirebaseUid(userId)

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            )
        }

        // Check if user can view this activity
        // Users can view their own activity, admins can view anyone's
        if (
            authenticatedUser.uid !== userId &&
            authenticatedUser.role !== 'admin'
        ) {
            return NextResponse.json(
                { success: false, error: 'Permission denied' },
                { status: 403 }
            )
        }

        const activities = await databaseService.getUserActivity(
            user.id,
            limit ? parseInt(limit) : undefined,
            offset ? parseInt(offset) : undefined
        )

        return NextResponse.json({
            success: true,
            activities,
            total: activities.length,
        })
    } catch (error) {
        console.error('Error fetching user activity:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch user activity',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

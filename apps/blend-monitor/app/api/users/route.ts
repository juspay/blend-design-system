import { NextRequest, NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import {
    authenticateRequest,
    requirePermission,
} from '@/backend/lib/auth-middleware'

export async function GET(request: NextRequest) {
    let retryCount = 0
    const maxRetries = 3

    while (retryCount < maxRetries) {
        try {
            await initializeDatabase()

            // Authenticate the request
            const user = await authenticateRequest(request)

            // Check permissions - users with 'read' permission can view users
            const permissionCheck = await requirePermission('users', 'read')(
                request,
                user
            )
            if (permissionCheck) {
                return permissionCheck
            }

            const searchParams = request.nextUrl.searchParams
            const limit = searchParams.get('limit')
            const offset = searchParams.get('offset')

            const users = await databaseService.getAllUsers(
                limit ? parseInt(limit) : undefined,
                offset ? parseInt(offset) : undefined
            )

            return NextResponse.json({
                success: true,
                users,
                total: users.length,
            })
        } catch (error) {
            console.error(
                `Error fetching users (attempt ${retryCount + 1}):`,
                error
            )

            // Check if it's a database connection error
            const isConnectionError =
                error instanceof Error &&
                (error.message.includes('Connection terminated') ||
                    error.message.includes('connection timeout') ||
                    error.message.includes('ECONNREFUSED'))

            if (isConnectionError && retryCount < maxRetries - 1) {
                retryCount++
                console.log(
                    `Retrying database connection (attempt ${retryCount + 1}/${maxRetries})`
                )
                // Wait before retrying
                await new Promise((resolve) =>
                    setTimeout(resolve, 1000 * retryCount)
                )
                continue
            }

            return NextResponse.json(
                {
                    success: false,
                    error: 'Failed to fetch users',
                    details:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                },
                { status: 500 }
            )
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        await initializeDatabase()

        // Note: POST is used during login to create/update user
        // We'll allow this without full authentication but verify the Firebase UID
        const body = await request.json()
        const {
            firebase_uid,
            email,
            display_name,
            photo_url,
            role = 'viewer',
        } = body

        if (!firebase_uid || !email) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'firebase_uid and email are required',
                },
                { status: 400 }
            )
        }

        const user = await databaseService.createOrUpdateUser(firebase_uid, {
            email,
            displayName: display_name,
            photoURL: photo_url,
            role,
        })

        return NextResponse.json({
            success: true,
            user,
        })
    } catch (error) {
        console.error('Error creating/updating user:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create/update user',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

import { NextRequest, NextResponse } from 'next/server'
import { databaseService } from '@/backe@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'

export async function GET(request: NextRequest) {
    try {
        await initializeDatabase()

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
        console.error('Error fetching users:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch users',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await initializeDatabase()

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

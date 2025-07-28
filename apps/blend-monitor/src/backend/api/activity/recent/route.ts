import { NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'

// GET /api/activity/recent - Get recent activity
export async function GET(request: Request) {
    try {
        await initializeDatabase()

        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '10')

        const activities = await databaseService.getRecentActivity(limit)

        return NextResponse.json(activities)
    } catch (error) {
        console.error('Error fetching recent activity:', error)
        return NextResponse.json(
            { error: 'Failed to fetch recent activity' },
            { status: 500 }
        )
    }
}

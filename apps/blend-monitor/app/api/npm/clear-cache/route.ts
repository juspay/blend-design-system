import { NextRequest, NextResponse } from 'next/server'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import {
    authenticateRequest,
    requirePermission,
} from '@/backend/lib/auth-middleware'

export async function POST(request: NextRequest) {
    try {
        // Initialize PostgreSQL database
        await initializeDatabase()

        // Authenticate the request
        const user = await authenticateRequest(request)

        // Check permissions - only admins can clear npm cache
        const permissionCheck = await requirePermission('npm', 'write')(
            request,
            user
        )
        if (permissionCheck) {
            return permissionCheck
        }

        // Clear the NPM cache
        await databaseService.clearNPMCache()

        // Trigger fresh data fetch
        const refreshResponse = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3003'}/api/npm`,
            {
                method: 'GET',
            }
        )

        let refreshData = null
        if (refreshResponse.ok) {
            refreshData = await refreshResponse.json()
        }

        return NextResponse.json({
            success: true,
            message: 'NPM cache cleared and data refreshed successfully',
            timestamp: new Date().toISOString(),
            refreshData: refreshData?.metadata || null,
        })
    } catch (error) {
        console.error('Error clearing NPM cache:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to clear NPM cache',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

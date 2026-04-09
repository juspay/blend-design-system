import { Router } from 'express'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import { asyncHandler } from '../utils/async-handler'

export const activityRouter = Router()

activityRouter.get(
    '/recent',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const limit = parseInt(
            (req.query.limit as string | undefined) || '10',
            10
        )
        const activities = await databaseService.getRecentActivity(limit)
        res.json(activities)
    })
)

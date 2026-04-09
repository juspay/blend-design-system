import { Router } from 'express'
import {
    authenticateBearer,
    logAuditEvent,
    hasPermission,
} from '@/backend/lib/auth-middleware'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import { asyncHandler } from '../utils/async-handler'

export const usersRouter = Router()

usersRouter.get(
    '/activity',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const userId = req.query.userId as string | undefined
        const limit = req.query.limit as string | undefined
        const offset = req.query.offset as string | undefined

        if (!userId) {
            res.status(400).json({
                success: false,
                error: 'userId parameter is required',
            })
            return
        }

        const user = await databaseService.getUserByFirebaseUid(userId)
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' })
            return
        }

        const activities = await databaseService.getUserActivity(
            user.id,
            limit ? parseInt(limit, 10) : undefined,
            offset ? parseInt(offset, 10) : undefined
        )

        res.json({
            success: true,
            activities,
            total: activities.length,
        })
    })
)

usersRouter.post(
    '/activity',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const { user_id, action, details } = req.body as {
            user_id?: string
            action?: string
            details?: unknown
        }

        if (!user_id || !action) {
            res.status(400).json({
                success: false,
                error: 'user_id and action are required',
            })
            return
        }

        const user = await databaseService.getUserByFirebaseUid(user_id)
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' })
            return
        }

        await databaseService.logUserActivity(
            user.id,
            action,
            details as Record<string, unknown> | undefined
        )

        res.json({ success: true, message: 'Activity logged successfully' })
    })
)

usersRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const limit = req.query.limit as string | undefined
        const offset = req.query.offset as string | undefined

        const users = await databaseService.getAllUsers(
            limit ? parseInt(limit, 10) : undefined,
            offset ? parseInt(offset, 10) : undefined
        )

        res.json({
            success: true,
            users,
            total: users.length,
        })
    })
)

usersRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const {
            firebase_uid,
            email,
            display_name,
            photo_url,
            role = 'viewer',
        } = req.body as {
            firebase_uid?: string
            email?: string
            display_name?: string
            photo_url?: string
            role?: string
        }

        if (!firebase_uid || !email) {
            res.status(400).json({
                success: false,
                error: 'firebase_uid and email are required',
            })
            return
        }

        const user = await databaseService.createOrUpdateUser(firebase_uid, {
            email,
            displayName: display_name,
            photoURL: photo_url,
            role,
        })

        res.json({ success: true, user })
    })
)

usersRouter.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const user = await databaseService.getUserByFirebaseUid(
            req.params.userId
        )

        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' })
            return
        }

        res.json({ success: true, user })
    })
)

usersRouter.patch(
    '/:userId',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const { role, is_active, display_name } = req.body as {
            role?: string
            is_active?: boolean
            display_name?: string
        }

        const uid = req.params.userId

        if (role !== undefined) {
            await databaseService.updateUserRole(uid, role)
        }
        if (is_active !== undefined) {
            await databaseService.updateUserStatus(uid, is_active)
        }
        if (display_name !== undefined) {
            await databaseService.updateUserDisplayName(uid, display_name)
        }

        const updatedUser = await databaseService.getUserByFirebaseUid(uid)

        res.json({ success: true, user: updatedUser })
    })
)

usersRouter.delete(
    '/:userId',
    asyncHandler(async (req, res) => {
        await initializeDatabase()
        await databaseService.deleteUser(req.params.userId)
        res.json({ success: true, message: 'User deleted successfully' })
    })
)

usersRouter.put(
    '/:userId/role',
    asyncHandler(async (req, res) => {
        await initializeDatabase()

        const actor = await authenticateBearer(
            req.headers.authorization ?? null
        )

        if (!actor || !hasPermission(actor, 'users', 'write')) {
            res.status(actor ? 403 : 401).json({
                error: actor
                    ? 'Insufficient permissions'
                    : 'Authentication required',
            })
            return
        }

        const { newRole } = req.body as { newRole?: string }
        if (!newRole) {
            res.status(400).json({ error: 'New role is required' })
            return
        }

        const targetId = req.params.userId
        const currentUserData =
            await databaseService.getUserByFirebaseUid(targetId)
        if (!currentUserData) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const oldRole = currentUserData.role
        await databaseService.updateUserRole(targetId, newRole)

        await logAuditEvent(
            actor,
            'role_change',
            `user:${targetId}`,
            {
                targetUser: currentUserData.email,
                oldRole,
                newRole,
                userId: targetId,
            },
            'success'
        )

        res.json({
            success: true,
            message: 'User role updated successfully',
            oldRole,
            newRole,
        })
    })
)

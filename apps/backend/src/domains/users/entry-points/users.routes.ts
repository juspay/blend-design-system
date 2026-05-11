import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate, requireRole } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import { validate, updateUserSchema } from '@/middlewares/validate.js'
import {
    listUsers,
    findUserById,
    updateUserProfile,
    updateUserRole,
    softDeleteUser,
} from '../data-access/user.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'
import { maskEmail, maskDisplayName } from '@/utils/crypto.js'

const router: IRouter = Router()

router.get(
    '/',
    authenticate,
    requireRole('admin'),
    asyncHandler(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 100)
        const organizationId = req.query.organizationId as string

        const { users, total } = await listUsers({
            page,
            limit,
            organizationId,
        })

        const maskedUsers = users.map((u: any) => ({
            ...u,
            email: maskEmail(u.email),
            displayName: maskDisplayName(u.displayName),
        }))

        res.json({
            success: true,
            data: {
                users: maskedUsers,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        })
    })
)

router.get(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params

        if (id !== req.user?.id && req.user?.role !== 'admin') {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Can only view your own profile',
                },
            })
            return
        }

        const user = await findUserById(id)

        if (!user) {
            res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'User not found' },
            })
            return
        }

        res.json({ success: true, data: { user } })
    })
)

router.patch(
    '/:id',
    authenticate,
    validate({ body: updateUserSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params

        if (id !== req.user?.id && req.user?.role !== 'admin') {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Can only update your own profile',
                },
            })
            return
        }

        const { displayName, photoUrl, role } = req.body

        if (role && req.user?.role !== 'admin') {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Only admins can change roles',
                },
            })
            return
        }

        let user
        if (role && req.user?.role === 'admin') {
            const previousUser = await findUserById(id)
            user = await updateUserRole(id, role)

            if (previousUser && req.user!.organizationId) {
                await auditLogRepo.createAuditLog({
                    organizationId: req.user!.organizationId,
                    action: 'user_role_changed',
                    actorId: req.user!.id,
                    actorEmail: req.user!.email,
                    targetType: 'user',
                    targetId: id,
                    metadata: {
                        previousRole: previousUser.role,
                        newRole: role,
                        changedBy: req.user!.id,
                    },
                })
            }
        } else {
            user = await updateUserProfile(id, { displayName, photoUrl })
        }

        res.json({ success: true, data: { user } })
    })
)

router.delete(
    '/:id',
    authenticate,
    requireRole('admin'),
    asyncHandler(async (req: Request, res: Response) => {
        const previousUser = await findUserById(req.params.id)
        await softDeleteUser(req.params.id)

        if (previousUser && req.user!.organizationId) {
            await auditLogRepo.createAuditLog({
                organizationId: req.user!.organizationId,
                action: 'user_deactivated',
                actorId: req.user!.id,
                actorEmail: req.user!.email,
                targetType: 'user',
                targetId: req.params.id,
                metadata: {
                    previousRole: previousUser.role,
                },
            })
        }

        res.json({ success: true, message: 'User deactivated' })
    })
)

export default router

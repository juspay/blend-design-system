import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import { validate } from '@/middlewares/validate.js'
import { z } from 'zod'
import * as lockService from '../domain/lock.service.js'

const router: IRouter = Router()

const createLockSchema = z.object({
    tokenPath: z
        .string()
        .min(1, 'Token path is required')
        .max(500, 'Token path must be 500 characters or fewer'),
    reason: z.string().max(1000).optional(),
})

// ---------------------------------------------------------------------------
// List Token Locks
// ---------------------------------------------------------------------------
router.get(
    '/:organizationId/locks',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const locks = await lockService.listLocks(
            req.params.organizationId,
            req.user!.id
        )
        res.json({ success: true, data: { locks } })
    })
)

// ---------------------------------------------------------------------------
// Lock a Token
// ---------------------------------------------------------------------------
router.post(
    '/:organizationId/locks',
    authenticate,
    validate({ body: createLockSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const lock = await lockService.lockToken(
            req.params.organizationId,
            req.body.tokenPath,
            req.body.reason,
            req.user!.id,
            req.user!.email
        )
        res.status(201).json({ success: true, data: { lock } })
    })
)

// ---------------------------------------------------------------------------
// Unlock a Token
// ---------------------------------------------------------------------------
router.delete(
    '/:organizationId/locks/:tokenPath',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const result = await lockService.unlockToken(
            req.params.organizationId,
            decodeURIComponent(req.params.tokenPath),
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: result })
    })
)

export default router

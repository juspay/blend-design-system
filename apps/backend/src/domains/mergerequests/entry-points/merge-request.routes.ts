import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import {
    validate,
    createMergeRequestSchema,
    reviewMergeRequestSchema,
} from '@/middlewares/validate.js'
import { strictLimiter } from '@/middlewares/rateLimit.js'
import * as mrService from '../domain/merge-request.service.js'

const router: IRouter = Router()

// ---------------------------------------------------------------------------
// List Merge Requests
// ---------------------------------------------------------------------------
router.get(
    '/',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const organizationId =
            (req.query.organizationId as string) || req.user?.organizationId

        const { mergeRequests, nextCursor } = await mrService.listMRs(
            {
                organizationId,
                status: req.query.status as string,
                requestedBy: req.query.requestedBy as string,
                limit: parseInt(req.query.limit as string) || 20,
                cursor: req.query.cursor as string,
            },
            req.user!.id
        )
        res.json({ success: true, data: { mergeRequests, nextCursor } })
    })
)

// ---------------------------------------------------------------------------
// Get Merge Request
// ---------------------------------------------------------------------------
router.get(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const mr = await mrService.getMR(req.params.id, req.user!.id)
        res.json({ success: true, data: { mergeRequest: mr } })
    })
)

// ---------------------------------------------------------------------------
// Create Merge Request
// ---------------------------------------------------------------------------
router.post(
    '/',
    authenticate,
    strictLimiter,
    validate({ body: createMergeRequestSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const orgId =
            (req.query.organizationId as string) ||
            req.body.organizationId ||
            req.user!.organizationId

        const mr = await mrService.createMR(
            orgId,
            req.body.sourceBranchId,
            req.body.targetBranchId,
            req.body.title,
            req.body.description,
            req.user!.id,
            req.user!.email
        )
        res.status(201).json({ success: true, data: { mergeRequest: mr } })
    })
)

// ---------------------------------------------------------------------------
// Approve Merge Request
// ---------------------------------------------------------------------------
router.post(
    '/:id/approve',
    authenticate,
    strictLimiter,
    validate({ body: reviewMergeRequestSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const mr = await mrService.approveMR(
            req.params.id,
            req.body.reviewComment,
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: { mergeRequest: mr } })
    })
)

// ---------------------------------------------------------------------------
// Reject Merge Request
// ---------------------------------------------------------------------------
router.post(
    '/:id/reject',
    authenticate,
    strictLimiter,
    validate({ body: reviewMergeRequestSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const mr = await mrService.rejectMR(
            req.params.id,
            req.body.reviewComment,
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: { mergeRequest: mr } })
    })
)

// ---------------------------------------------------------------------------
// Merge (execute the merge after approval)
// ---------------------------------------------------------------------------
router.post(
    '/:id/merge',
    authenticate,
    strictLimiter,
    asyncHandler(async (req: Request, res: Response) => {
        const mr = await mrService.mergeMR(
            req.params.id,
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: { mergeRequest: mr } })
    })
)

// ---------------------------------------------------------------------------
// Cancel Merge Request
// ---------------------------------------------------------------------------
router.post(
    '/:id/cancel',
    authenticate,
    strictLimiter,
    asyncHandler(async (req: Request, res: Response) => {
        const mr = await mrService.cancelMR(
            req.params.id,
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: { mergeRequest: mr } })
    })
)

export default router

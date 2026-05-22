import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import {
    validate,
    reviewMergeRequestSchema,
    listPublishRequestsSchema,
} from '@/middlewares/validate.js'
import { strictLimiter } from '@/middlewares/rateLimit.js'
import * as publishRequestService from '@/domains/branches/domain/publish-request.service.js'

const router: IRouter = Router()

router.get(
    '/',
    authenticate,
    validate({ query: listPublishRequestsSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const { publishRequests, nextCursor } =
            await publishRequestService.listPublishRequests(
                {
                    organizationId: req.query.organizationId as string,
                    branchId: req.query.branchId as string,
                    status: req.query.status as string,
                    requestedBy: req.query.requestedBy as string,
                    limit: parseInt(req.query.limit as string, 10) || 20,
                    cursor: req.query.cursor as string,
                },
                req.user!.id
            )
        res.json({ success: true, data: { publishRequests, nextCursor } })
    })
)

router.get(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const publishRequest = await publishRequestService.getPublishRequest(
            req.params.id,
            req.user!.id
        )
        res.json({ success: true, data: { publishRequest } })
    })
)

router.post(
    '/:id/approve',
    authenticate,
    strictLimiter,
    validate({ body: reviewMergeRequestSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const publishRequest = await publishRequestService.approvePublishRequest(
            req.params.id,
            req.body.reviewComment,
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: { publishRequest } })
    })
)

router.post(
    '/:id/reject',
    authenticate,
    strictLimiter,
    validate({ body: reviewMergeRequestSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const publishRequest = await publishRequestService.rejectPublishRequest(
            req.params.id,
            req.body.reviewComment,
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: { publishRequest } })
    })
)

router.post(
    '/:id/publish',
    authenticate,
    strictLimiter,
    asyncHandler(async (req: Request, res: Response) => {
        const result = await publishRequestService.executePublishRequest(
            req.params.id,
            req.user!.id,
            req.user!.displayName || req.user!.email,
            req.user!.email
        )
        res.json({
            success: true,
            data: {
                publishRequest: result.publishRequest,
                version: result.version,
            },
            message: 'Publish request executed successfully',
        })
    })
)

router.post(
    '/:id/cancel',
    authenticate,
    strictLimiter,
    asyncHandler(async (req: Request, res: Response) => {
        const publishRequest = await publishRequestService.cancelPublishRequest(
            req.params.id,
            req.user!.id,
            req.user!.email
        )
        res.json({ success: true, data: { publishRequest } })
    })
)

export default router

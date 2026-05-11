import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate, requireRole } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import { validate, createTagSchema } from '@/middlewares/validate.js'
import * as tagRepo from '../data-access/tag.repository.js'

const router: IRouter = Router()

router.get(
    '/',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const tags = await tagRepo.listTags({
            search: req.query.search as string,
            limit: parseInt(req.query.limit as string) || 100,
        })
        res.json({ success: true, data: { tags } })
    })
)

router.post(
    '/',
    authenticate,
    validate({ body: createTagSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const tag = await tagRepo.createTag(req.body.name)
        res.status(201).json({ success: true, data: { tag } })
    })
)

router.delete(
    '/:id',
    authenticate,
    requireRole('admin'),
    asyncHandler(async (req: Request, res: Response) => {
        await tagRepo.deleteTag(req.params.id)
        res.json({ success: true, message: 'Tag deleted' })
    })
)

export default router

import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import { validate, createApiKeySchema } from '@/middlewares/validate.js'
import * as apiKeyRepo from '../data-access/apikey.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'

const router: IRouter = Router()

router.post(
    '/',
    authenticate,
    validate({ body: createApiKeySchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const { apiKey, rawKey } = await apiKeyRepo.createApiKey({
            organizationId: req.body.organizationId,
            userId: req.user!.id,
            name: req.body.name,
            expiresAt: req.body.expiresAt
                ? new Date(req.body.expiresAt)
                : undefined,
        })

        await auditLogRepo.createAuditLog({
            organizationId: req.body.organizationId,
            action: 'api_key_created',
            actorId: req.user!.id,
            actorEmail: req.user!.email,
            targetType: 'api_key',
            targetId: apiKey.id,
            metadata: { name: req.body.name, prefix: apiKey.keyPrefix },
        })

        res.status(201).json({
            success: true,
            data: {
                apiKey: {
                    id: apiKey.id,
                    name: apiKey.name,
                    keyPrefix: apiKey.keyPrefix,
                    expiresAt: apiKey.expiresAt,
                    createdAt: apiKey.createdAt,
                },
                rawKey,
            },
        })
    })
)

router.get(
    '/',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const keys = await apiKeyRepo.listApiKeys(req.user!.id, {
            organizationId: req.query.organizationId as string,
        })
        res.json({ success: true, data: { apiKeys: keys } })
    })
)

router.delete(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const revoked = await apiKeyRepo.revokeApiKey(
            req.params.id,
            req.user!.id
        )
        if (!revoked) {
            res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'API key not found or already revoked',
                },
            })
            return
        }

        await auditLogRepo.createAuditLog({
            organizationId: revoked.organizationId,
            action: 'api_key_revoked',
            actorId: req.user!.id,
            actorEmail: req.user!.email,
            targetType: 'api_key',
            targetId: revoked.id,
            metadata: {
                name: revoked.name,
                prefix: revoked.keyPrefix,
            },
        })
        res.json({ success: true, message: 'API key revoked' })
    })
)

export default router

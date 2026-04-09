import { Router } from 'express'
import {
    authenticateBearer,
    hasPermission,
} from '@/backend/lib/auth-middleware'
import {
    createBranch,
    getBranch,
    listBranches,
    listVersions,
    publishVersion,
    updateBranch,
} from '@/backend/lib/branch-service'
import type {
    BranchListOptions,
    CreateBranchInput,
    CreateVersionInput,
    UpdateBranchInput,
} from '@blend-design/token-engine/server'
import { asyncHandler } from '../utils/async-handler'

/**
 * /api/studio/branches — Firestore token branches (see use-studio hook).
 */
export const studioRouter = Router()

studioRouter.get(
    '/branches',
    asyncHandler(async (req, res) => {
        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'studio', 'read')) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Authentication required',
                },
            })
            return
        }

        const options: BranchListOptions = {}
        const st = req.query.status as string | undefined
        const search = req.query.search as string | undefined
        const sorty = req.query.sortBy as
            | BranchListOptions['sortBy']
            | undefined
        const limitRaw = req.query.limit as string | undefined

        if (st) {
            options.filters = {
                ...options.filters,
                status: st as 'draft' | 'published' | 'archived',
            }
        }
        if (search) options.filters = { ...options.filters, search }
        if (sorty) options.sortBy = sorty
        if (limitRaw) options.limit = Number(limitRaw)

        const data = await listBranches(options)
        res.json({ success: true, data })
    })
)

studioRouter.post(
    '/branches',
    asyncHandler(async (req, res) => {
        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'studio', 'write')) {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Insufficient permissions',
                },
            })
            return
        }

        const input = req.body as CreateBranchInput
        const branch = await createBranch(input, {
            uid: user.uid,
            email: user.email,
        })
        res.status(201).json({ success: true, data: branch })
    })
)

studioRouter.get(
    '/branches/:branchId',
    asyncHandler(async (req, res) => {
        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'studio', 'read')) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Authentication required',
                },
            })
            return
        }

        const branchId = decodeURIComponent(req.params.branchId)
        const branch = await getBranch(branchId)
        if (!branch) {
            res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Branch not found' },
            })
            return
        }
        res.json({ success: true, data: branch })
    })
)

studioRouter.patch(
    '/branches/:branchId',
    asyncHandler(async (req, res) => {
        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'studio', 'write')) {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Insufficient permissions',
                },
            })
            return
        }

        const branchId = decodeURIComponent(req.params.branchId)
        const updates = req.body as UpdateBranchInput
        const branch = await updateBranch(branchId, updates, {
            uid: user.uid,
            email: user.email,
        })
        res.json({ success: true, data: branch })
    })
)

studioRouter.get(
    '/branches/:branchId/versions',
    asyncHandler(async (req, res) => {
        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'studio', 'read')) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Authentication required',
                },
            })
            return
        }

        const branchId = decodeURIComponent(req.params.branchId)
        const data = await listVersions(branchId)
        res.json({ success: true, data })
    })
)

studioRouter.post(
    '/branches/:branchId/publish',
    asyncHandler(async (req, res) => {
        const user = await authenticateBearer(req.headers.authorization ?? null)
        if (!user || !hasPermission(user, 'studio', 'write')) {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Insufficient permissions',
                },
            })
            return
        }

        const branchId = decodeURIComponent(req.params.branchId)
        const body = req.body as Omit<CreateVersionInput, 'branchId'>
        const version = await publishVersion(
            branchId,
            { ...body, branchId },
            {
                uid: user.uid,
                email: user.email,
            }
        )
        res.json({ success: true, data: version })
    })
)

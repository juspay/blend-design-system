import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import {
    validate,
    createBranchSchema,
    updateBranchSchema,
    publishBranchSchema,
    resolveTokensSchema,
    createSnapshotSchema,
    forkBranchSchema,
} from '@/middlewares/validate.js'
import * as branchService from '../domain/branch.service.js'
import * as branchRepo from '../data-access/branch.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'

const router: IRouter = Router()

// ---------------------------------------------------------------------------
// List Branches
// ---------------------------------------------------------------------------
router.get(
    '/',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { branches, nextCursor } = await branchService.listBranches({
            limit: parseInt(req.query.limit as string) || 20,
            cursor: req.query.cursor as string,
            createdBy: req.query.createdBy as string,
            organizationId: req.query.organizationId as string,
            status: req.query.status as string,
            visibility: req.query.visibility as string,
            search: req.query.search as string,
            tag: req.query.tag as string,
        })

        res.json({
            success: true,
            data: { branches, nextCursor },
        })
    })
)

// ---------------------------------------------------------------------------
// Create Branch
// ---------------------------------------------------------------------------
router.post(
    '/',
    authenticate,
    validate({ body: createBranchSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.createBranch(
            req.body,
            req.user!.id,
            req.user!.displayName || req.user!.email,
            req.user!.email,
            req.user!.organizationId || req.body.organizationId
        )
        res.status(201).json({
            success: true,
            data: { branch },
        })
    })
)

// ---------------------------------------------------------------------------
// Get Branch
// ---------------------------------------------------------------------------
router.get(
    '/:branchId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.getBranch(req.params.branchId)
        res.json({
            success: true,
            data: { branch },
        })
    })
)

// ---------------------------------------------------------------------------
// Pull Branch (CLI)
// ---------------------------------------------------------------------------
router.get(
    '/:branchId/pull',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.getBranch(req.params.branchId)

        const versionParam =
            typeof req.query.version === 'string'
                ? req.query.version
                : undefined

        const version = versionParam
            ? await branchRepo.getVersionByNumber(branch.id, versionParam)
            : null

        const brandConfig = version?.brandConfig ?? branch.brandConfig

        res.json({
            success: true,
            data: {
                branch,
                version: version
                    ? {
                          id: version.id,
                          branchId: version.branchId,
                          version: version.version,
                          changelog: version.changelog,
                          isBreaking: version.isBreaking,
                          isPrerelease: version.isPrerelease,
                          publishedBy: version.publishedBy,
                          publishedByName: version.publishedByName,
                          publishedAt: version.publishedAt,
                      }
                    : null,
                brandConfig,
            },
        })
    })
)

// ---------------------------------------------------------------------------
// Update Branch
// ---------------------------------------------------------------------------
router.patch(
    '/:branchId',
    authenticate,
    validate({ body: updateBranchSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.updateBranch(
            req.params.branchId,
            req.body,
            req.user!.id,
            req.user!.email
        )
        res.json({
            success: true,
            data: { branch },
        })
    })
)

// ---------------------------------------------------------------------------
// Delete Branch
// ---------------------------------------------------------------------------
router.delete(
    '/:branchId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        await branchService.deleteBranch(
            req.params.branchId,
            req.user!.id,
            req.user!.email
        )
        res.json({
            success: true,
            message: 'Branch deleted successfully',
        })
    })
)

// ---------------------------------------------------------------------------
// Fork Branch
// ---------------------------------------------------------------------------
router.post(
    '/:branchId/fork',
    authenticate,
    validate({ body: forkBranchSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.forkBranch(
            req.params.branchId,
            req.body.name,
            req.user!.id,
            req.user!.displayName || req.user!.email,
            req.user!.email,
            req.user!.organizationId || req.body.organizationId
        )
        res.status(201).json({
            success: true,
            data: { branch },
        })
    })
)

// ---------------------------------------------------------------------------
// Publish Branch
// ---------------------------------------------------------------------------
router.post(
    '/:branchId/publish',
    authenticate,
    validate({ body: publishBranchSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        await branchService.publishBranch(
            req.params.branchId,
            req.body,
            req.user!.id,
            req.user!.displayName || req.user!.email,
            req.user!.email
        )
        res.json({
            success: true,
            message: 'Branch published successfully',
        })
    })
)

// ---------------------------------------------------------------------------
// List Versions
// ---------------------------------------------------------------------------
router.get(
    '/:branchId/versions',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const versions = await branchService.listVersions(req.params.branchId)
        res.json({
            success: true,
            data: { versions },
        })
    })
)

// ---------------------------------------------------------------------------
// Resolve Tokens
// ---------------------------------------------------------------------------
router.post(
    '/:branchId/resolve',
    authenticate,
    validate({ body: resolveTokensSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const { branch, theme, brandConfig } =
            await branchService.resolveTokens(
                req.params.branchId,
                req.body.theme || 'light'
            )
        res.json({
            success: true,
            data: {
                branchId: branch.id,
                theme,
                brandConfig,
            },
        })
    })
)

// ---------------------------------------------------------------------------
// List Snapshots
// ---------------------------------------------------------------------------
router.get(
    '/:branchId/snapshots',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { getBranch } = await import('../domain/branch.service.js')
        await getBranch(req.params.branchId)
        const { listSnapshots } =
            await import('../data-access/branch.repository.js')
        const snapshots = await listSnapshots(req.params.branchId)
        res.json({
            success: true,
            data: { snapshots },
        })
    })
)

// ---------------------------------------------------------------------------
// Create Snapshot
// ---------------------------------------------------------------------------
router.post(
    '/:branchId/snapshots',
    authenticate,
    validate({ body: createSnapshotSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const { getBranch } = await import('../domain/branch.service.js')
        const branch = await getBranch(req.params.branchId)
        const { createSnapshot } =
            await import('../data-access/branch.repository.js')
        const snapshot = await createSnapshot(req.params.branchId, {
            brandConfig: req.body.brandConfig || branch.brandConfig,
            label: req.body.label || null,
            isAutoSave: req.body.isAutoSave || false,
            savedBy: req.user!.id,
            savedByName: req.user!.displayName || req.user!.email,
        })

        if (branch.organizationId) {
            await auditLogRepo.createAuditLog({
                organizationId: branch.organizationId,
                action: 'snapshot_created',
                actorId: req.user!.id,
                actorEmail: req.user!.email,
                targetType: 'snapshot',
                targetId: snapshot.id,
                metadata: {
                    label: req.body.label || null,
                    isAutoSave: req.body.isAutoSave || false,
                },
            })
        }
        res.status(201).json({
            success: true,
            data: { snapshot },
        })
    })
)

// ---------------------------------------------------------------------------
// Add / Remove Tags
// ---------------------------------------------------------------------------
router.post(
    '/:branchId/tags/:tagId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        await branchService.addTag(
            req.params.branchId,
            req.params.tagId,
            req.user!.id
        )
        res.json({
            success: true,
            message: 'Tag added to branch',
        })
    })
)

router.delete(
    '/:branchId/tags/:tagId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        await branchService.removeTag(
            req.params.branchId,
            req.params.tagId,
            req.user!.id
        )
        res.json({
            success: true,
            message: 'Tag removed from branch',
        })
    })
)

export default router

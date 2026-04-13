import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import * as branchService from '../domain/branch.service.js'

const router: IRouter = Router()

/**
 * @openapi
 * /api/branches:
 *   get:
 *     summary: List all branches
 *     description: Get paginated list of branches with optional filtering
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Number of results to return
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: Pagination cursor from previous response
 *     responses:
 *       200:
 *         description: List of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     branches:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Branch'
 *                     nextCursor:
 *                       type: string
 *                       nullable: true
 *       401:
 *         description: Unauthorized
 */
router.get(
    '/',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { branches, nextCursor } = await branchService.listBranches({
            limit: parseInt(req.query.limit as string) || 20,
            cursor: req.query.cursor as string,
            createdBy: req.query.createdBy as string,
        })

        res.json({
            success: true,
            data: { branches, nextCursor },
        })
    })
)

/**
 * @openapi
 * /api/branches:
 *   post:
 *     summary: Create a new branch
 *     description: Create a new token branch with default configuration
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Branch name
 *               parentBranch:
 *                 type: string
 *                 description: ID of parent branch to fork from
 *               brandConfig:
 *                 type: object
 *                 description: Initial brand configuration
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
    '/',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.createBranch(req.body, req.user!.id)
        res.status(201).json({
            success: true,
            data: { branch },
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}:
 *   get:
 *     summary: Get branch by ID
 *     description: Retrieve detailed information about a specific branch
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch UUID
 *     responses:
 *       200:
 *         description: Branch details
 *       404:
 *         description: Branch not found
 */
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

/**
 * @openapi
 * /api/branches/{branchId}:
 *   patch:
 *     summary: Update branch
 *     description: Update branch name or brand configuration
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brandConfig:
 *                 type: object
 *     responses:
 *       200:
 *         description: Branch updated
 *       403:
 *         description: Not authorized to update
 *       404:
 *         description: Branch not found
 */
router.patch(
    '/:branchId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.updateBranch(
            req.params.branchId,
            req.body,
            req.user!.id
        )
        res.json({
            success: true,
            data: { branch },
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}:
 *   delete:
 *     summary: Delete branch
 *     description: Permanently delete a branch and all its data
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch deleted
 *       403:
 *         description: Not authorized to delete
 *       404:
 *         description: Branch not found
 */
router.delete(
    '/:branchId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        await branchService.deleteBranch(req.params.branchId, req.user!.id)
        res.json({
            success: true,
            message: 'Branch deleted successfully',
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}/fork:
 *   post:
 *     summary: Fork a branch
 *     description: Create a copy of an existing branch
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name for the new forked branch
 *     responses:
 *       201:
 *         description: Branch forked successfully
 *       404:
 *         description: Source branch not found
 */
router.post(
    '/:branchId/fork',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const branch = await branchService.forkBranch(
            req.params.branchId,
            req.body.name,
            req.user!.id
        )
        res.status(201).json({
            success: true,
            data: { branch },
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}/publish:
 *   post:
 *     summary: Publish branch
 *     description: Create a new version of the branch
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - version
 *             properties:
 *               version:
 *                 type: string
 *                 pattern: '^\\d+\\.\\d+\\.\\d+$'
 *                 description: Version number (e.g., 1.0.0)
 *               notes:
 *                 type: string
 *                 description: Release notes
 *     responses:
 *       200:
 *         description: Branch published
 *       400:
 *         description: Invalid version format
 *       403:
 *         description: Not authorized
 */
router.post(
    '/:branchId/publish',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        await branchService.publishBranch(
            req.params.branchId,
            req.body,
            req.user!.id
        )
        res.json({
            success: true,
            message: 'Branch published successfully',
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}/versions:
 *   get:
 *     summary: List branch versions
 *     description: Get all published versions of a branch
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of versions
 */
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

/**
 * @openapi
 * /api/branches/{branchId}/resolve:
 *   post:
 *     summary: Resolve branch tokens
 *     description: Convert brand config to component tokens for a theme
 *     tags:
 *       - Branches
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 enum: [light, dark]
 *                 default: light
 *     responses:
 *       200:
 *         description: Resolved component tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     branchId:
 *                       type: string
 *                     theme:
 *                       type: string
 *                     componentTokens:
 *                       type: object
 */
router.post(
    '/:branchId/resolve',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { branch, theme, tokens } = await branchService.resolveTokens(
            req.params.branchId,
            req.body.theme || 'light'
        )
        res.json({
            success: true,
            data: {
                branchId: branch.id,
                theme,
                componentTokens: tokens,
            },
        })
    })
)

export default router

// Token Routes - Express router for token endpoints

import { Router, type IRouter, type Request, type Response } from 'express'
import multer from 'multer'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import * as tokenService from '../domain/token.service.js'

const router: IRouter = Router()
const upload = multer({ storage: multer.memoryStorage() })

/**
 * @openapi
 * /api/branches/{branchId}/tokens/upload:
 *   post:
 *     summary: Upload a token JSON file
 *     description: Upload and validate a token configuration JSON file
 *     tags:
 *       - Tokens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch UUID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: JSON token file
 *               description:
 *                 type: string
 *                 description: Optional description of the upload
 *     responses:
 *       201:
 *         description: Token uploaded successfully
 *       400:
 *         description: Invalid JSON or validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
    '/branches/:branchId/tokens/upload',
    authenticate,
    upload.single('file'),
    asyncHandler(async (req: Request, res: Response) => {
        const { branchId } = req.params

        if (!req.file) {
            throw new Error('No file uploaded')
        }

        const { buffer, originalname } = req.file
        const description = req.body.description as string | undefined

        const result = await tokenService.uploadToken({
            branchId,
            fileBuffer: buffer,
            fileName: originalname,
            description,
            uploadedBy: req.user!.id,
            uploadedByName: '', // req.user doesn't have displayName in current auth setup
        })

        res.status(201).json({
            success: true,
            data: result,
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}/tokens:
 *   get:
 *     summary: List all tokens for a branch
 *     description: Get all uploaded token files for a specific branch
 *     tags:
 *       - Tokens
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
 *         description: List of tokens
 *       401:
 *         description: Unauthorized
 */
router.get(
    '/branches/:branchId/tokens',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { branchId } = req.params

        const tokens = await tokenService.listTokensByBranch(branchId)

        res.json({
            success: true,
            data: tokens,
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}/tokens/{tokenId}:
 *   get:
 *     summary: Get a specific token by ID
 *     description: Retrieve token metadata by ID
 *     tags:
 *       - Tokens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch UUID
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: string
 *         description: Token UUID
 *     responses:
 *       200:
 *         description: Token details
 *       404:
 *         description: Token not found
 *       401:
 *         description: Unauthorized
 */
router.get(
    '/branches/:branchId/tokens/:tokenId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { branchId, tokenId } = req.params

        const token = await tokenService.getTokenById(branchId, tokenId)

        if (!token) {
            res.status(404).json({
                success: false,
                message: 'Token not found',
            })
            return
        }

        res.json({
            success: true,
            data: token,
        })
    })
)

/**
 * @openapi
 * /api/branches/{branchId}/tokens/{tokenId}/download:
 *   get:
 *     summary: Download token file content
 *     description: Download the raw JSON token file
 *     tags:
 *       - Tokens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch UUID
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: string
 *         description: Token UUID
 *     responses:
 *       200:
 *         description: Token file content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Token not found
 *       401:
 *         description: Unauthorized
 */
router.get(
    '/branches/:branchId/tokens/:tokenId/download',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { branchId, tokenId } = req.params

        const buffer = await tokenService.readTokenFile(branchId, tokenId)

        res.setHeader('Content-Type', 'application/json')
        res.send(buffer)
    })
)

/**
 * @openapi
 * /api/branches/{branchId}/tokens/{tokenId}:
 *   delete:
 *     summary: Delete a token
 *     description: Delete a token file and its metadata
 *     tags:
 *       - Tokens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch UUID
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: string
 *         description: Token UUID
 *     responses:
 *       200:
 *         description: Token deleted successfully
 *       404:
 *         description: Token not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
    '/branches/:branchId/tokens/:tokenId',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { branchId, tokenId } = req.params

        await tokenService.deleteToken(branchId, tokenId)

        res.json({
            success: true,
            message: 'Token deleted successfully',
        })
    })
)

export default router

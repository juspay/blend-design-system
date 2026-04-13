// ─────────────────────────────────────────────────────────────────────────────
// Token Controller - HTTP handlers for token endpoints
// ─────────────────────────────────────────────────────────────────────────────

import type { Request, Response, NextFunction } from 'express'
import { tokenService } from '../domain/token.service'
import { AppError } from '@/errors/AppError'

export class TokenController {
    /**
     * POST /api/branches/:branchId/tokens/upload
     * Upload a token JSON file
     */
    async upload(req: Request, res: Response, next: NextFunction) {
        try {
            const { branchId } = req.params
            const userId = req.user?.id
            const userName = req.user?.displayName || ''

            if (!userId) {
                throw new AppError('UNAUTHORIZED', 'Authentication required')
            }

            if (!req.file) {
                throw new AppError('BAD_REQUEST', 'No file uploaded')
            }

            const { buffer, originalname } = req.file
            const description = req.body.description as string | undefined

            const result = await tokenService.upload({
                branchId,
                fileBuffer: buffer,
                fileName: originalname,
                description,
                uploadedBy: userId,
                uploadedByName: userName,
            })

            res.status(201).json({
                success: true,
                data: result,
            })
        } catch (err) {
            next(err)
        }
    }

    /**
     * GET /api/branches/:branchId/tokens
     * List all tokens for a branch
     */
    async listByBranch(req: Request, res: Response, next: NextFunction) {
        try {
            const { branchId } = req.params

            const tokens = await tokenService.listByBranch(branchId)

            res.json({
                success: true,
                data: tokens,
            })
        } catch (err) {
            next(err)
        }
    }

    /**
     * GET /api/tokens/:tokenId
     * Get a specific token by ID
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { tokenId } = req.params

            const token = await tokenService.getById(tokenId)

            if (!token) {
                throw new AppError('NOT_FOUND', 'Token not found')
            }

            res.json({
                success: true,
                data: token,
            })
        } catch (err) {
            next(err)
        }
    }

    /**
     * GET /api/tokens/:tokenId/download
     * Download token file content
     */
    async download(req: Request, res: Response, next: NextFunction) {
        try {
            const { tokenId } = req.params

            const buffer = await tokenService.readFile(tokenId)

            res.setHeader('Content-Type', 'application/json')
            res.send(buffer)
        } catch (err) {
            next(err)
        }
    }

    /**
     * DELETE /api/tokens/:tokenId
     * Delete a token
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { tokenId } = req.params
            const userId = req.user?.id

            if (!userId) {
                throw new AppError('UNAUTHORIZED', 'Authentication required')
            }

            await tokenService.delete(tokenId, userId)

            res.json({
                success: true,
                message: 'Token deleted successfully',
            })
        } catch (err) {
            next(err)
        }
    }
}

export const tokenController = new TokenController()

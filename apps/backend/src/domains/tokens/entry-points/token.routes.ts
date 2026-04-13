// ─────────────────────────────────────────────────────────────────────────────
// Token Routes - Express router for token endpoints
// ─────────────────────────────────────────────────────────────────────────────

import { Router } from 'express'
import multer from 'multer'
import { tokenController } from './token.controller'
import { authenticateToken } from '@/middlewares/auth'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

// POST /api/branches/:branchId/tokens/upload
router.post(
    '/branches/:branchId/tokens/upload',
    authenticateToken,
    upload.single('file'),
    tokenController.upload.bind(tokenController)
)

// GET /api/branches/:branchId/tokens
router.get(
    '/branches/:branchId/tokens',
    authenticateToken,
    tokenController.listByBranch.bind(tokenController)
)

// GET /api/tokens/:tokenId
router.get(
    '/tokens/:tokenId',
    authenticateToken,
    tokenController.getById.bind(tokenController)
)

// GET /api/tokens/:tokenId/download
router.get(
    '/tokens/:tokenId/download',
    authenticateToken,
    tokenController.download.bind(tokenController)
)

// DELETE /api/tokens/:tokenId
router.delete(
    '/tokens/:tokenId',
    authenticateToken,
    tokenController.delete.bind(tokenController)
)

export default router

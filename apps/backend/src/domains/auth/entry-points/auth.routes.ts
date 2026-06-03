import { Router, type IRouter } from 'express'
import { authenticate } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import { validate, googleCallbackQuerySchema } from '@/middlewares/validate.js'
import {
    getGoogleAuthUrl,
    getCsrfToken,
    googleCallback,
    refreshAccessToken,
    logout,
    logoutAllDevices,
    getCliAccessToken,
    getCurrentUser,
} from './auth.controller.js'

const router: IRouter = Router()

/**
 * @openapi
 * /api/v1/auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     description: Returns the Google OAuth URL for authentication
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Google OAuth URL
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
 *                     url:
 *                       type: string
 *                       description: Google OAuth authorization URL
 */
router.get('/google', asyncHandler(getGoogleAuthUrl))

router.get('/csrf', asyncHandler(getCsrfToken))

/**
 * @openapi
 * /api/v1/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles the OAuth callback from Google and creates/logs in the user
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Authorization code from Google
 *     responses:
 *       302:
 *         description: Redirects to frontend with JWT token
 *       400:
 *         description: Missing or invalid authorization code
 */
router.get(
    '/google/callback',
    validate({ query: googleCallbackQuerySchema }),
    asyncHandler(googleCallback)
)

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Uses refresh token to generate a new access token
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: New access token generated
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
 *                     accessToken:
 *                       type: string
 *                     expiresIn:
 *                       type: number
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh', asyncHandler(refreshAccessToken))

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Revokes the current refresh token
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authenticate, asyncHandler(logout))

/**
 * @openapi
 * /api/v1/auth/logout-all:
 *   post:
 *     summary: Logout from all devices
 *     description: Revokes all refresh tokens for the user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out from all devices
 *       401:
 *         description: Unauthorized
 */
router.post('/logout-all', authenticate, asyncHandler(logoutAllDevices))

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's information
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         displayName:
 *                           type: string
 *                         photoUrl:
 *                           type: string
 *                         role:
 *                           type: string
 *                         teams:
 *                           type: array
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/me', authenticate, asyncHandler(getCurrentUser))

/**
 * CLI: exposes current access JWT when the user has a valid browser session (cookie).
 * POST avoids treating this as a cacheable GET; client must send credentials (cookies).
 */
router.post('/cli-token', authenticate, asyncHandler(getCliAccessToken))

export default router

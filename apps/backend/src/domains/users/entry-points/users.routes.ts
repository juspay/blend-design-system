import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate, requireRole } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import { prisma } from '@/config/database.js'

const router: IRouter = Router()

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users
 *     description: Get paginated list of users (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.get(
    '/',
    authenticate,
    requireRole('admin'),
    asyncHandler(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 100)
        const skip = (page - 1) * limit

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: limit,
                select: {
                    id: true,
                    email: true,
                    displayName: true,
                    photoUrl: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                    lastLogin: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.user.count(),
        ])

        res.json({
            success: true,
            data: {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        })
    })
)

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Get detailed user information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User UUID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params
        const requestingUserId = req.user?.id

        if (id !== requestingUserId && req.user?.role !== 'admin') {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Can only view your own profile',
                },
            })
            return
        }

        const user = await prisma.user.findUnique({
            where: { id },
        })

        if (!user) {
            res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'User not found' },
            })
            return
        }

        res.json({
            success: true,
            data: { user },
        })
    })
)

/**
 * @openapi
 * /api/users/{id}:
 *   patch:
 *     summary: Update user profile
 *     description: Update user information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               photoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       403:
 *         description: Cannot update other users
 */
router.patch(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params

        if (id !== req.user?.id && req.user?.role !== 'admin') {
            res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Can only update your own profile',
                },
            })
            return
        }

        const { displayName, photoUrl } = req.body

        const user = await prisma.user.update({
            where: { id },
            data: {
                displayName: displayName || undefined,
                photoUrl: photoUrl || undefined,
            },
        })

        res.json({
            success: true,
            data: { user },
        })
    })
)

export default router

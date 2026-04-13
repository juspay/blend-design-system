import type { Request, Response } from 'express'
import { env } from '@/config/index.js'
import { logger } from '@/utils/logger.js'
import { UnauthorizedError, NotFoundError } from '@/errors/AppError.js'
import {
    generateAuthUrl,
    exchangeCodeForTokens,
    generateTokens,
    verifyJwtToken,
    hashToken,
} from '../domain/auth.service.js'
import {
    findUserByEmail,
    findUserByGoogleId,
    findUserById,
    createUser,
    updateUserLogin,
    storeRefreshToken,
    findRefreshToken,
    revokeRefreshToken,
    revokeAllUserRefreshTokens,
} from '../data-access/auth.repository.js'

const REFRESH_TOKEN_EXPIRES_DAYS = 30

export const getGoogleAuthUrl = async (_req: Request, res: Response) => {
    const url = generateAuthUrl()
    res.json({ success: true, data: { url } })
}

export const googleCallback = async (req: Request, res: Response) => {
    const { code } = req.query as { code: string }

    if (!code) {
        return res.redirect(`${env.FRONTEND_URL}/login?error=no_code`)
    }

    try {
        const googleUser = await exchangeCodeForTokens(code)
        let user = await findUserByGoogleId(googleUser.googleId)
        let isNewUser = false

        if (!user) {
            const existingUser = await findUserByEmail(googleUser.email)
            if (existingUser) {
                user = existingUser
            } else {
                user = await createUser(googleUser)
                isNewUser = true
                logger.info(
                    { userId: user.id, email: user.email },
                    'New user registered'
                )
            }
        } else {
            user = await updateUserLogin(user.id)
        }

        const tokens = generateTokens({
            userId: user.id,
            email: user.email,
            role: user.role,
        })

        const refreshTokenHash = hashToken(tokens.refreshToken)
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS)
        await storeRefreshToken(user.id, refreshTokenHash, expiresAt)

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
            path: '/api/auth',
        })

        res.redirect(
            `${env.FRONTEND_URL}/auth-callback?token=${tokens.accessToken}&newUser=${isNewUser}`
        )
    } catch (error: any) {
        logger.error(
            {
                error: error.message || error,
                stack: error.stack,
                name: error.name,
            },
            'Google auth callback failed'
        )
        res.redirect(`${env.FRONTEND_URL}/login?error=auth_failed`)
    }
}

export const refreshAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!refreshToken) {
        throw new UnauthorizedError('Refresh token required')
    }

    const tokenHash = hashToken(refreshToken)
    const storedToken = await findRefreshToken(tokenHash)

    if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new UnauthorizedError('Invalid refresh token')
    }

    try {
        const decoded = verifyJwtToken(refreshToken)

        const newTokens = generateTokens({
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        })

        await revokeRefreshToken(tokenHash)

        const newRefreshTokenHash = hashToken(newTokens.refreshToken)
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS)
        await storeRefreshToken(decoded.userId, newRefreshTokenHash, expiresAt)

        res.cookie('refreshToken', newTokens.refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
            path: '/api/auth',
        })

        res.json({
            success: true,
            data: {
                accessToken: newTokens.accessToken,
                expiresIn: newTokens.expiresIn,
            },
        })
    } catch {
        await revokeRefreshToken(tokenHash)
        throw new UnauthorizedError('Invalid refresh token')
    }
}

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken

    if (refreshToken) {
        const tokenHash = hashToken(refreshToken)
        await revokeRefreshToken(tokenHash)

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/api/auth',
        })
    }

    res.json({ success: true, message: 'Logged out successfully' })
}

export const logoutAllDevices = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id

    if (userId) {
        await revokeAllUserRefreshTokens(userId)
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/api/auth',
    })

    res.json({ success: true, message: 'Logged out from all devices' })
}

export const getCurrentUser = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id

    if (!userId) {
        throw new UnauthorizedError('User not authenticated')
    }

    const user = await findUserById(userId)

    if (!user) {
        throw new NotFoundError('User')
    }

    res.json({
        success: true,
        data: {
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                photoUrl: user.photoUrl,
                role: user.role,
                isActive: user.isActive,
            },
        },
    })
}

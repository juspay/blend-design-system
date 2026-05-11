import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { env } from '@/config/index.js'
import { logger } from '@/utils/logger.js'
import { maskEmail, hashPII } from '@/utils/crypto.js'
import { UnauthorizedError, NotFoundError } from '@/errors/AppError.js'
import {
    generateAuthUrl,
    exchangeCodeForTokens,
    generateTokens,
    generateCliExportToken,
    verifyJwtToken,
    hashToken,
} from '../domain/auth.service.js'
import {
    findUserByEmail,
    findUserByGoogleId,
    findUserById,
    findOrCreateUser,
    updateUserLogin,
    storeRefreshToken,
    findRefreshToken,
    revokeRefreshToken,
    revokeAllUserRefreshTokens,
} from '../data-access/auth.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'

const REFRESH_TOKEN_EXPIRES_DAYS = 30
const cookieSameSite = env.NODE_ENV === 'production' ? 'none' : 'lax'

export const getGoogleAuthUrl = async (_req: Request, res: Response) => {
    const url = generateAuthUrl()
    res.json({ success: true, data: { url } })
}

export const getCsrfToken = async (_req: Request, res: Response) => {
    const token = crypto.randomBytes(32).toString('hex')

    res.cookie('csrfToken', token, {
        httpOnly: false,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/api',
    })

    res.setHeader('Cache-Control', 'no-store')
    res.json({ success: true, data: { csrfToken: token } })
}

export const googleCallback = async (req: Request, res: Response) => {
    const code = (req.query as { code?: string }).code
    const callbackContext = {
        requestHost: req.get('host'),
        requestOrigin: req.get('origin'),
        requestReferer: req.get('referer'),
        frontendUrl: env.FRONTEND_URL,
        googleRedirectUri: env.GOOGLE_REDIRECT_URI,
    }

    if (!code) {
        logger.warn(
            { ...callbackContext, reason: 'missing_code' },
            'Google callback missing authorization code'
        )
        return res.redirect(`${env.FRONTEND_URL}/login?error=no_code`)
    }

    try {
        logger.info(
            {
                ...callbackContext,
                codeLength: code.length,
            },
            'Processing Google OAuth callback'
        )
        const googleUser = await exchangeCodeForTokens(code)
        let user = await findUserByGoogleId(googleUser.googleId)
        let isNewUser = false

        if (!user) {
            const existingUser = await findUserByEmail(googleUser.email)
            if (existingUser) {
                user = existingUser
            } else {
                user = await findOrCreateUser({
                    email: googleUser.email,
                    displayName: googleUser.displayName,
                    photoUrl: googleUser.photoUrl,
                    googleId: googleUser.googleId,
                })
                isNewUser = true
                logger.info(
                    { userId: user.id, email: maskEmail(user.email) },
                    'New user registered'
                )

                const memberships = await (
                    await import('@/domains/users/data-access/user.repository.js')
                ).findUserMemberships(user.id)
                const orgId = memberships?.[0]?.organizationId
                if (orgId) {
                    await auditLogRepo.createAuditLog({
                        organizationId: orgId,
                        action: 'user_created',
                        actorId: user.id,
                        actorEmail: user.email,
                        targetType: 'user',
                        targetId: user.id,
                        metadata: {
                            emailHash: hashPII(user.email),
                            role: user.role,
                            provider: 'google',
                        },
                    })
                }
            }
        } else {
            const updated = await updateUserLogin(user.id)
            if (updated) user = updated
        }

        if (!user) {
            return res.redirect(
                `${env.FRONTEND_URL}/login?error=user_creation_failed`
            )
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
            sameSite: cookieSameSite,
            maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
            path: '/api/auth',
        })

        // Set access token as httpOnly cookie for secure browser requests.
        // The redirect still passes the token in the URL for the frontend
        // auth-callback page to do the initial setup, but subsequent requests
        // use the cookie automatically via credentials: 'include'.
        const accessTokenMaxDays = 7
        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: cookieSameSite,
            maxAge: accessTokenMaxDays * 24 * 60 * 60 * 1000,
            path: '/api',
        })

        logger.info(
            {
                ...callbackContext,
                userId: user.id,
                email: maskEmail(user.email),
                isNewUser,
            },
            'Google OAuth callback completed successfully'
        )
        res.redirect(`${env.FRONTEND_URL}/auth-callback?newUser=${isNewUser}`)
    } catch (error: any) {
        logger.error(
            {
                ...callbackContext,
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

        if (decoded.type !== 'refresh') {
            throw new UnauthorizedError('Invalid refresh token')
        }

        const newTokens = generateTokens({
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        })

        await revokeRefreshToken(tokenHash)

        const newRefreshTokenHash = hashToken(newTokens.refreshToken)

        const rawRefresh = jwt.decode(newTokens.refreshToken) as {
            exp?: number
        } | null
        const refreshExpSec = rawRefresh?.exp
        const refreshExpMs =
            typeof refreshExpSec === 'number' ? refreshExpSec * 1000 : null

        if (!refreshExpMs) {
            throw new UnauthorizedError('Invalid refresh token')
        }

        await storeRefreshToken(
            decoded.userId,
            newRefreshTokenHash,
            new Date(refreshExpMs)
        )

        res.cookie('refreshToken', newTokens.refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: cookieSameSite,
            maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
            path: '/api/auth',
        })

        res.cookie('accessToken', newTokens.accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: cookieSameSite,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/api',
        })

        res.json({
            success: true,
            data: {
                accessToken: newTokens.accessToken,
                expiresAt: (() => {
                    const rawAccess = jwt.decode(newTokens.accessToken) as {
                        exp?: number
                    } | null
                    const accessExpSec = rawAccess?.exp
                    return typeof accessExpSec === 'number'
                        ? accessExpSec * 1000
                        : null
                })(),
                // Remaining seconds to expiry (computed from exp).
                expiresInSeconds: (() => {
                    const rawAccess = jwt.decode(newTokens.accessToken) as {
                        exp?: number
                    } | null
                    const accessExpSec = rawAccess?.exp
                    return typeof accessExpSec === 'number'
                        ? Math.max(
                              0,
                              accessExpSec - Math.floor(Date.now() / 1000)
                          )
                        : null
                })(),
                // Return new refresh token so CLI can keep refreshing.
                refreshToken: newTokens.refreshToken,
                refreshExpiresAt: refreshExpMs,
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
            sameSite: cookieSameSite,
            path: '/api/auth',
        })
    }

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: cookieSameSite,
        path: '/api',
    })

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
        sameSite: cookieSameSite,
        path: '/api/auth',
    })

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: cookieSameSite,
        path: '/api',
    })

    res.json({ success: true, message: 'Logged out from all devices' })
}

/**
 * Mint a **short-lived CLI-only** JWT for `blend-studio login --token`.
 *
 * Requires a valid browser session (`authenticate`). Does **not** return the long-lived
 * httpOnly access cookie; instead signs a new JWT with `type: cli_export` and TTL
 * `JWT_CLI_EXPORT_EXPIRES_IN` (default **10 minutes**).
 *
 * **Security:** Narrower blast radius than exporting the 7-day access token. XSS on the
 * Studio origin can still exfiltrate a freshly minted token—use CSP and dependency hygiene.
 */
export const getCliAccessToken = async (req: Request, res: Response) => {
    const user = (req as any).user

    if (!user?.id || !user?.email) {
        throw new UnauthorizedError('User not authenticated')
    }

    // Short-lived token (10m) intended for `blend-studio login --token`.
    const token = generateCliExportToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    })

    const rawCli = jwt.decode(token) as { exp?: number } | null
    const cliExpSec = rawCli?.exp
    const cliExpMs = typeof cliExpSec === 'number' ? cliExpSec * 1000 : null
    const cliExpiresInSeconds =
        typeof cliExpSec === 'number'
            ? Math.max(0, cliExpSec - Math.floor(Date.now() / 1000))
            : null

    // Long-lived refresh token (days) for CLI auto-refresh.
    const tokens = generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
    })

    const rawRefresh = jwt.decode(tokens.refreshToken) as {
        exp?: number
    } | null
    const refreshExpSec = rawRefresh?.exp
    const refreshExpMs =
        typeof refreshExpSec === 'number' ? refreshExpSec * 1000 : null
    const refreshExpiresInSeconds =
        typeof refreshExpSec === 'number'
            ? Math.max(0, refreshExpSec - Math.floor(Date.now() / 1000))
            : null

    // Persist refresh token so `/api/auth/refresh` can validate it.
    if (refreshExpMs) {
        const refreshTokenHash = hashToken(tokens.refreshToken)
        await storeRefreshToken(
            user.id,
            refreshTokenHash,
            new Date(refreshExpMs)
        )
    }

    const rawAccess = jwt.decode(tokens.accessToken) as { exp?: number } | null
    const accessExpSec = rawAccess?.exp
    const accessExpMs =
        typeof accessExpSec === 'number' ? accessExpSec * 1000 : null
    const accessExpiresInSeconds =
        typeof accessExpSec === 'number'
            ? Math.max(0, accessExpSec - Math.floor(Date.now() / 1000))
            : null

    res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, private'
    )
    res.setHeader('Pragma', 'no-cache')

    res.json({
        success: true,
        data: {
            token,
            expiresAt: cliExpMs,
            expiresInSeconds: cliExpiresInSeconds,
            tokenType: 'cli_export' as const,

            // Extra fields for CLI auto-refresh (Option 2).
            accessToken: tokens.accessToken,
            accessExpiresAt: accessExpMs,
            accessExpiresInSeconds: accessExpiresInSeconds,

            refreshToken: tokens.refreshToken,
            refreshExpiresAt: refreshExpMs,
            refreshExpiresInSeconds,
        },
    })
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

    const { findUserMemberships } =
        await import('@/domains/users/data-access/user.repository.js')
    const memberships = await findUserMemberships(userId)

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
                organizations: memberships.map((m: any) => ({
                    organizationId: m.organizationId,
                    role: m.role,
                })),
            },
        },
    })
}

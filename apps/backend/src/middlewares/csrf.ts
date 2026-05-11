import type { NextFunction, Request, Response } from 'express'
import { ForbiddenError } from '@/errors/AppError.js'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

const getRequestOrigin = (req: Request): string | null => {
    const originHeader = req.get('origin')
    if (originHeader) {
        return originHeader
    }

    const refererHeader = req.get('referer')
    if (!refererHeader) {
        return null
    }

    try {
        return new URL(refererHeader).origin
    } catch {
        return null
    }
}

export const createCookieCsrfProtection = (trustedOrigins: string[]) => {
    const trustedOriginSet = new Set(
        trustedOrigins.map((origin) => origin.trim()).filter(Boolean)
    )

    return (req: Request, _res: Response, next: NextFunction) => {
        if (SAFE_METHODS.has(req.method)) {
            return next()
        }

        const hasSessionCookie = Boolean(
            req.cookies?.accessToken || req.cookies?.refreshToken
        )

        if (!hasSessionCookie) {
            return next()
        }

        const requestOrigin = getRequestOrigin(req)

        if (!requestOrigin || !trustedOriginSet.has(requestOrigin)) {
            return next(
                new ForbiddenError(
                    'Cross-site cookie-backed request blocked by CSRF protection'
                )
            )
        }

        return next()
    }
}

import type { Request, Response, NextFunction } from 'express'
import { verifyJwtToken } from '@/domains/auth/domain/auth.service.js'
import { UnauthorizedError, ForbiddenError } from '@/errors/AppError.js'

interface AuthenticatedRequest extends Request {
    user?: {
        id: string
        email: string
        role: string
    }
}

export const authenticate = async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedError('No token provided')
        }

        const token = authHeader.substring(7)
        const decoded = verifyJwtToken(token)

        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const requireRole = (...allowedRoles: string[]) => {
    return (
        req: AuthenticatedRequest,
        _res: Response,
        next: NextFunction
    ): void => {
        if (!req.user) {
            next(new UnauthorizedError('Authentication required'))
            return
        }

        if (!allowedRoles.includes(req.user.role)) {
            next(
                new ForbiddenError(
                    `Required role: ${allowedRoles.join(' or ')}`
                )
            )
            return
        }

        next()
    }
}

export const optionalAuth = async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization

        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.substring(7)
            const decoded = verifyJwtToken(token)

            req.user = {
                id: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            }
        }

        next()
    } catch {
        next()
    }
}

export { AuthenticatedRequest }

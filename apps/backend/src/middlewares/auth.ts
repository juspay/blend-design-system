import { verifyJwtToken } from '@/domains/auth/domain/auth.service.js'
import { UnauthorizedError, ForbiddenError } from '@/errors/AppError.js'
import * as apiKeyRepo from '@/domains/apikeys/data-access/apikey.repository.js'
import * as userRepo from '@/domains/users/data-access/user.repository.js'

export const authenticate = async (
    req: any,
    _res: any,
    next: any
): Promise<void> => {
    try {
        // 1. Check Authorization header (Bearer token or API key)
        const authHeader = req.headers.authorization
        let token: string | undefined

        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.substring(7)
        }

        // 2. Fallback to httpOnly cookie for browser requests
        if (!token && req.cookies?.accessToken) {
            token = req.cookies.accessToken
        }

        if (!token) {
            throw new UnauthorizedError('No token provided')
        }

        // 3. API key path
        if (token.startsWith('bts_')) {
            const apiKey = await apiKeyRepo.validateApiKey(token)
            if (!apiKey) {
                throw new UnauthorizedError('Invalid or revoked API key')
            }

            const user = await userRepo.findUserById(apiKey.userId)
            if (!user) {
                throw new UnauthorizedError('API key user not found')
            }

            const membership = await userRepo.findUserMembership(apiKey.userId)

            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
                displayName: user.displayName || '',
                organizationId: membership?.organizationId,
                authMethod: 'api_key',
            }

            next()
            return
        }

        // 4. JWT path
        const decoded = verifyJwtToken(token)

        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            displayName: (decoded as any).displayName || '',
            authMethod: 'jwt',
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const requireRole = (...allowedRoles: string[]) => {
    return (req: any, _res: any, next: any): void => {
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
    req: any,
    _res: any,
    next: any
): Promise<void> => {
    try {
        let token: string | undefined

        const authHeader = req.headers.authorization
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.substring(7)
        }

        if (!token && req.cookies?.accessToken) {
            token = req.cookies.accessToken
        }

        if (token && !token.startsWith('bts_')) {
            const decoded = verifyJwtToken(token)

            req.user = {
                id: decoded.userId,
                email: decoded.email,
                role: decoded.role,
                displayName: (decoded as any).displayName || '',
                authMethod: 'jwt',
            }
        }

        next()
    } catch {
        next()
    }
}

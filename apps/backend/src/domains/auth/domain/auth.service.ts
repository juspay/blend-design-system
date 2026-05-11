import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { env } from '@/config/index.js'
import { UnauthorizedError } from '@/errors/AppError.js'
import { logger } from '@/utils/logger.js'
import type {
    GoogleUserInfo,
    JwtPayload,
    TokenPayload,
    AuthTokens,
} from './auth.types.js'

const oauth2Client = new OAuth2Client(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_REDIRECT_URI
)

export const generateAuthUrl = (): string => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ]

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
    })
}

export const exchangeCodeForTokens = async (
    code: string
): Promise<GoogleUserInfo> => {
    try {
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)

        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload()
        if (!payload) {
            throw new UnauthorizedError('Invalid Google token')
        }

        return {
            googleId: payload.sub,
            email: payload.email!,
            displayName: payload.name,
            photoUrl: payload.picture,
        }
    } catch (error) {
        logger.error(error, 'Failed to exchange Google code')
        throw new UnauthorizedError('Failed to authenticate with Google')
    }
}

export const generateAccessToken = (payload: TokenPayload): string => {
    const tokenPayload: JwtPayload = {
        ...payload,
        type: 'access',
    }

    return jwt.sign(tokenPayload, env.JWT_SECRET, {
        expiresIn: (env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'],
    })
}

export const generateRefreshToken = (payload: TokenPayload): string => {
    const tokenPayload: JwtPayload = {
        ...payload,
        type: 'refresh',
    }

    return jwt.sign(tokenPayload, env.JWT_SECRET, {
        expiresIn: (env.JWT_REFRESH_EXPIRES_IN ||
            '30d') as jwt.SignOptions['expiresIn'],
    })
}

/**
 * Short-lived JWT for pasting into the Blend CLI (`login --token`).
 * Narrower blast radius than exporting the long-lived browser access token.
 */
export const generateCliExportToken = (payload: TokenPayload): string => {
    const tokenPayload: JwtPayload = {
        ...payload,
        type: 'cli_export',
    }

    return jwt.sign(tokenPayload, env.JWT_SECRET, {
        expiresIn:
            env.JWT_CLI_EXPORT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    })
}

export const verifyJwtToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, env.JWT_SECRET) as JwtPayload
    } catch {
        throw new UnauthorizedError('Invalid or expired token')
    }
}

export const generateTokens = (payload: TokenPayload): AuthTokens => {
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    const decoded = jwt.decode(accessToken) as { exp: number }

    return {
        accessToken,
        refreshToken,
        expiresIn: decoded.exp,
    }
}

export const hashToken = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

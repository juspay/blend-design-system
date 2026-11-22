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

export const generateAuthUrl = (state: string): string => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ]

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
        state,
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

/**
 * Every token this service issues is HS256 with the single server secret.
 * Pinning the algorithm at sign and verify time closes alg-confusion attacks
 * (`alg: none`, RS/HS mixups) — audit #19, CWE-347. Issuer/audience are bound
 * when configured via JWT_ISSUER / JWT_AUDIENCE.
 */
const jwtSignOptions = (expiresIn: string): jwt.SignOptions => ({
    algorithm: 'HS256',
    ...(env.JWT_ISSUER ? { issuer: env.JWT_ISSUER } : {}),
    ...(env.JWT_AUDIENCE ? { audience: env.JWT_AUDIENCE } : {}),
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
})

export const generateAccessToken = (payload: TokenPayload): string => {
    const tokenPayload: JwtPayload = {
        ...payload,
        type: 'access',
    }

    return jwt.sign(
        tokenPayload,
        env.JWT_SECRET,
        jwtSignOptions(env.JWT_EXPIRES_IN || '7d')
    )
}

export const generateRefreshToken = (payload: TokenPayload): string => {
    const tokenPayload: JwtPayload = {
        ...payload,
        type: 'refresh',
    }

    return jwt.sign(
        tokenPayload,
        env.JWT_SECRET,
        jwtSignOptions(env.JWT_REFRESH_EXPIRES_IN || '30d')
    )
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

    return jwt.sign(
        tokenPayload,
        env.JWT_SECRET,
        jwtSignOptions(env.JWT_CLI_EXPORT_EXPIRES_IN)
    )
}

export type AllowedTokenType = NonNullable<JwtPayload['type']>

export interface VerifyJwtTokenOptions {
    /** Reject tokens whose `type` claim is not this value. */
    type?: AllowedTokenType
    /** Reject tokens whose `type` claim is not one of these values. */
    types?: AllowedTokenType[]
}

// Token-type checks live here rather than in every caller so no endpoint can
// forget them (rescan hardening, CWE-347): a refresh or cli_export token can
// no longer pass as a session credential by relying on callers to check the
// `type` claim themselves.
export const verifyJwtToken = (
    token: string,
    options?: VerifyJwtTokenOptions
): JwtPayload => {
    let decoded: JwtPayload
    try {
        decoded = jwt.verify(token, env.JWT_SECRET, {
            algorithms: ['HS256'],
            ...(env.JWT_ISSUER ? { issuer: env.JWT_ISSUER } : {}),
            ...(env.JWT_AUDIENCE ? { audience: env.JWT_AUDIENCE } : {}),
        }) as JwtPayload
    } catch {
        throw new UnauthorizedError('Invalid or expired token')
    }

    if (options?.type && decoded.type !== options.type) {
        throw new UnauthorizedError('Invalid token type')
    }
    if (
        options?.types &&
        (!decoded.type || !options.types.includes(decoded.type))
    ) {
        throw new UnauthorizedError('Invalid token type')
    }

    return decoded
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

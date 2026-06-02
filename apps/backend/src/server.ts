import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { env, isDevelopment } from '@/config/index.js'
import { logger } from '@/utils/logger.js'
import { errorHandler, notFoundHandler } from '@/middlewares/errorHandler.js'
import { apiLimiter, authLimiter } from '@/middlewares/rateLimit.js'
import { createCookieCsrfProtection } from '@/middlewares/csrf.js'
import { swaggerUiHandler, swaggerUiSetup } from '@/config/swagger.js'
import { connectDatabaseWithRetry, isDatabaseReady } from '@/config/database.js'
import authRoutes from '@/domains/auth/entry-points/auth.routes.js'
import branchRoutes from '@/domains/branches/entry-points/branch.routes.js'
import tokenRoutes from '@/domains/tokens/entry-points/token.routes.js'
import userRoutes from '@/domains/users/entry-points/users.routes.js'
import orgRoutes from '@/domains/organizations/entry-points/organization.routes.js'
import tagRoutes from '@/domains/tags/entry-points/tag.routes.js'
import apiKeyRoutes from '@/domains/apikeys/entry-points/apikey.routes.js'
import lockRoutes from '@/domains/locks/entry-points/lock.routes.js'
import mergeRequestRoutes from '@/domains/mergerequests/entry-points/merge-request.routes.js'
import publishRequestRoutes from '@/domains/branches/entry-points/publish-request.routes.js'
// (callback route is mounted via /api/auth router)
import type { NextFunction, Request, Response } from 'express'

const app = express()
const API_V1_PREFIX = '/api/v1'
const LEGACY_API_PREFIX = '/api'

app.use(helmet())

const allowedOrigins = isDevelopment
    ? [
          'http://localhost:5173',
          'http://localhost:3000',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:3000',
      ]
    : [
          ...env.FRONTEND_URL.split(',').map((url: string) => url.trim()),
          ...(env.STUDIO_URL
              ? env.STUDIO_URL.split(',').map((url: string) => url.trim())
              : []),
      ]

const cookieCsrfProtection = createCookieCsrfProtection(allowedOrigins)

app.use(
    cors({
        origin: (
            origin: string | undefined,
            callback: (error: Error | null, allow?: boolean) => void
        ) => {
            if (!origin) return callback(null, true)

            if (allowedOrigins.indexOf(origin) !== -1 || isDevelopment) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    })
)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(cookieParser())
app.use(cookieCsrfProtection)

app.use((req: Request, res: Response, next: NextFunction) => {
    const hasAuthCookies = Boolean(
        req.cookies?.accessToken || req.cookies?.refreshToken
    )
    const isStateChanging = !['GET', 'HEAD', 'OPTIONS'].includes(req.method)

    // CSRF is relevant only for cookie-auth’d browser requests.
    if (!hasAuthCookies || !isStateChanging) {
        return next()
    }

    // 1) Enforce same-origin via Origin/Referer (defense-in-depth with CORS).
    const origin = req.get('origin')
    const referer = req.get('referer')
    const isAllowedOrigin =
        (origin && allowedOrigins.includes(origin)) ||
        (referer && allowedOrigins.some((o) => referer.startsWith(o)))

    if (!isAllowedOrigin) {
        return res.status(403).json({
            success: false,
            error: {
                code: 'CSRF_ORIGIN_DENIED',
                message: 'Request origin is not allowed',
            },
        })
    }

    // 2) Double-submit token: require header token to match cookie token.
    const cookieToken = req.cookies?.csrfToken
    const headerToken = req.get('x-csrf-token')

    if (
        typeof cookieToken !== 'string' ||
        typeof headerToken !== 'string' ||
        cookieToken.length === 0 ||
        headerToken.length === 0 ||
        cookieToken !== headerToken
    ) {
        return res.status(403).json({
            success: false,
            error: {
                code: 'CSRF_INVALID',
                message: 'Invalid CSRF token',
            },
        })
    }

    return next()
})

// ---------------------------------------------------------------------------
// Rate Limiting — prevent abuse and brute-force attacks
// ---------------------------------------------------------------------------
// Mounted on routers below to ensure all `/api/*` routes are covered.

app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.debug(
        {
            method: req.method,
            path: req.path,
        },
        'Incoming request'
    )
    next()
})

app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        database: isDatabaseReady() ? 'connected' : 'connecting',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    })
})

app.get(`${API_V1_PREFIX}/health`, (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        database: isDatabaseReady() ? 'connected' : 'connecting',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    })
})

app.get(`${LEGACY_API_PREFIX}/health`, (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        database: isDatabaseReady() ? 'connected' : 'connecting',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    })
})

app.use(
    [API_V1_PREFIX, LEGACY_API_PREFIX],
    (req: Request, res: Response, next: NextFunction) => {
        // Allow health and OAuth bootstrap endpoints even while DB is connecting.
        // OAuth callback still depends on DB and should remain guarded.
        const isReadinessBypassPath =
            req.path === '/health' || req.path === '/auth/google'

        if (isReadinessBypassPath || isDatabaseReady()) {
            return next()
        }

        return res.status(503).json({
            success: false,
            message: 'Database connection is still initializing. Please retry.',
        })
    }
)

app.use(
    '/docs',
    helmet({
        // Swagger UI relies on inline scripts/styles; keep CSP enabled, but scoped.
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'script-src': ["'self'", "'unsafe-inline'"],
                'style-src': ["'self'", "'unsafe-inline'", 'https:'],
                'img-src': ["'self'", 'data:', 'https:'],
            },
        },
    })
)
app.use('/docs', swaggerUiHandler, swaggerUiSetup)

const mountApiRoutes = (prefix: string) => {
    app.use(`${prefix}/auth`, authLimiter, authRoutes)
    app.use(`${prefix}/branches`, apiLimiter, branchRoutes)
    app.use(`${prefix}/users`, apiLimiter, userRoutes)
    app.use(`${prefix}/organizations`, apiLimiter, orgRoutes)
    app.use(`${prefix}/organizations`, apiLimiter, lockRoutes)
    app.use(`${prefix}/merge-requests`, apiLimiter, mergeRequestRoutes)
    app.use(`${prefix}/publish-requests`, apiLimiter, publishRequestRoutes)
    app.use(`${prefix}/tags`, apiLimiter, tagRoutes)
    app.use(`${prefix}/api-keys`, apiLimiter, apiKeyRoutes)
    app.use(prefix, apiLimiter, tokenRoutes)
}

mountApiRoutes(API_V1_PREFIX)
mountApiRoutes(LEGACY_API_PREFIX)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = parseInt(env.PORT, 10)

/**
 * Cloud Run requires the process to listen on PORT within a bounded startup
 * window (~240s). Prisma retries can exceed that if we await DB before listen.
 * Bind the HTTP server first, then connect in the background; `/api/*` stays
 * 503 until `isDatabaseReady()` except health/OAuth bootstrap paths.
 */
const start = () => {
    app.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`)
        logger.info(`Swagger docs available at http://localhost:${PORT}/docs`)
        logger.info(`Environment: ${env.NODE_ENV}`)

        void (async () => {
            try {
                await connectDatabaseWithRetry()
            } catch (error) {
                logger.error(
                    { err: error },
                    'Failed to establish database connection after startup'
                )
                process.exit(1)
            }
        })()
    })
}

start()

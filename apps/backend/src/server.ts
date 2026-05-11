import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { env, isDevelopment } from '@/config/index.js'
import { logger } from '@/utils/logger.js'
import { errorHandler, notFoundHandler } from '@/middlewares/errorHandler.js'
import { apiLimiter, authLimiter } from '@/middlewares/rateLimit.js'
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
import { googleCallback } from '@/domains/auth/entry-points/auth.controller.js'

const app = express()

app.use(
    helmet({
        contentSecurityPolicy: isDevelopment ? false : undefined,
    })
)

const allowedOrigins = isDevelopment
    ? [
          'http://localhost:5173',
          'http://localhost:3000',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:3000',
      ]
    : [
          ...env.FRONTEND_URL.split(',').map((url) => url.trim()),
          ...(env.STUDIO_URL
              ? env.STUDIO_URL.split(',').map((url) => url.trim())
              : []),
      ]

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true)

            if (allowedOrigins.indexOf(origin) !== -1 || isDevelopment) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(cookieParser())

// ---------------------------------------------------------------------------
// Rate Limiting — prevent abuse and brute-force attacks
// ---------------------------------------------------------------------------
// Mounted on routers below to ensure all `/api/*` routes are covered.

app.use((req, _res, next) => {
    logger.debug(
        {
            method: req.method,
            path: req.path,
        },
        'Incoming request'
    )
    next()
})

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        database: isDatabaseReady() ? 'connected' : 'connecting',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    })
})

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        database: isDatabaseReady() ? 'connected' : 'connecting',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    })
})

app.use('/api', (req, res, next) => {
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
})

app.use('/docs', swaggerUiHandler, swaggerUiSetup)

app.get('/auth/google/callback', googleCallback)

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/branches', apiLimiter, branchRoutes)
app.use('/api/users', apiLimiter, userRoutes)
app.use('/api/organizations', apiLimiter, orgRoutes)
app.use('/api/organizations', apiLimiter, lockRoutes)
app.use('/api/merge-requests', apiLimiter, mergeRequestRoutes)
app.use('/api/tags', apiLimiter, tagRoutes)
app.use('/api/api-keys', apiLimiter, apiKeyRoutes)
app.use('/api', apiLimiter, tokenRoutes)

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

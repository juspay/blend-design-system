import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { env, isDevelopment } from '@/config/index.js'
import { logger } from '@/utils/logger.js'
import { errorHandler, notFoundHandler } from '@/middlewares/errorHandler.js'
import { swaggerUiHandler, swaggerUiSetup } from '@/config/swagger.js'
import authRoutes from '@/domains/auth/entry-points/auth.routes.js'
import branchRoutes from '@/domains/branches/entry-points/branch.routes.js'

const app = express()

app.use(
    helmet({
        contentSecurityPolicy: isDevelopment ? false : undefined,
    })
)

// CORS configuration - allow multiple origins in development
const allowedOrigins = isDevelopment
    ? [
          'http://localhost:5173',
          'http://localhost:3000',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:3000',
      ]
    : [env.FRONTEND_URL]

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, etc.)
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

app.use((req, _res, next) => {
    logger.debug(
        {
            method: req.method,
            path: req.path,
            ip: req.ip,
        },
        'Incoming request'
    )
    next()
})

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    })
})

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    })
})

app.use('/docs', swaggerUiHandler, swaggerUiSetup)
app.use('/api/auth', authRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api', tokenRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = parseInt(env.PORT, 10)

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`)
    logger.info(`Swagger docs available at http://localhost:${PORT}/docs`)
    logger.info(`Environment: ${env.NODE_ENV}`)
})

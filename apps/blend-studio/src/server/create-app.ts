import express from 'express'
import cors from 'cors'
import { activityRouter } from './routes/activity'
import { componentsRouter } from './routes/components'
import { healthRouter } from './routes/health'
import { npmRouter } from './routes/npm'
import { studioRouter } from './routes/studio'
import { usersRouter } from './routes/users'

export function createApp() {
    const app = express()

    app.use(
        cors({
            origin: true,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Authorization', 'Content-Type'],
        })
    )
    app.use(express.json({ limit: '4mb' }))

    app.use('/api/health', healthRouter)
    app.use('/api/studio', studioRouter)
    app.use('/api/users', usersRouter)
    app.use('/api/activity', activityRouter)
    app.use('/api/npm', npmRouter)
    app.use('/api/components', componentsRouter)

    app.use(
        (
            err: unknown,
            _req: express.Request,
            res: express.Response,
            _next: express.NextFunction
        ) => {
            console.error('[api]', err)
            res.status(500).json({
                error: 'Internal server error',
                details: err instanceof Error ? err.message : 'Unknown error',
            })
        }
    )

    return app
}

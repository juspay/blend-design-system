import express, { type Express, type Router } from 'express'
import cookieParser from 'cookie-parser'

import { errorHandler, notFoundHandler } from '@/middlewares/errorHandler.js'

export const createHttpTestApp = (
    mountPath: string,
    router: Router
): Express => {
    const app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use(mountPath, router)
    app.use(notFoundHandler)
    app.use(errorHandler)
    return app
}

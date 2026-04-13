import type { Request, Response, NextFunction } from 'express'
import { AppError } from '@/errors/AppError.js'
import { logger } from '@/utils/logger.js'
import { isDevelopment } from '@/config/index.js'

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = 500
    let message = 'Internal Server Error'
    let code = 'INTERNAL_ERROR'

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
        code = err.code

        if (!err.isOperational) {
            logger.error(err, 'Unexpected error occurred')
        }
    } else {
        logger.error(err, 'Unhandled error occurred')
    }

    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            ...(isDevelopment && { stack: err.stack }),
        },
    })
}

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: `Route ${req.originalUrl} not found`,
        },
    })
}

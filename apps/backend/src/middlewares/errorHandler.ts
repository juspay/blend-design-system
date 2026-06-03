import type { Request, Response, NextFunction } from 'express'
import { AppError } from '@/errors/AppError.js'
import { logger } from '@/utils/logger.js'
import { isDevelopment } from '@/config/index.js'
import {
    isPrismaError,
    logPrismaError,
    mapPrismaErrorToAppError,
} from '@/utils/prismaErrorHandler.js'

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let normalizedError: Error = err

    if (isPrismaError(err)) {
        logPrismaError(err)

        const mappedError = mapPrismaErrorToAppError(err)
        if (mappedError) {
            normalizedError = mappedError
        }
    }

    let statusCode = 500
    let message = 'Internal Server Error'
    let code = 'INTERNAL_ERROR'

    if (normalizedError instanceof AppError) {
        statusCode = normalizedError.statusCode
        message = normalizedError.message
        code = normalizedError.code

        if (!normalizedError.isOperational) {
            logger.error(normalizedError, 'Unexpected error occurred')
        }
    } else if (!isPrismaError(err)) {
        logger.error(err, 'Unhandled error occurred')
    }

    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            ...(isDevelopment && { stack: normalizedError.stack }),
        },
    })
}

type AsyncHandlerFn = (
    req: Request,
    res: Response,
    next: NextFunction
) => unknown | Promise<unknown>

export const asyncHandler = (fn: AsyncHandlerFn) => {
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

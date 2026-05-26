import prismaClientModule from '@prisma/client'
import {
    AppError,
    ConflictError,
    NotFoundError,
    ValidationError,
} from '@/errors/AppError.js'
import { logger } from '@/utils/logger.js'

type PrismaErrorWithMeta = {
    code?: string
    meta?: {
        target?: unknown
        modelName?: unknown
    }
}

type PrismaKnownRequestError = Error &
    PrismaErrorWithMeta & {
        code: string
        clientVersion: string
    }

type PrismaValidationError = Error

type PrismaInitializationError = Error & {
    errorCode?: string
    clientVersion: string
}

type PrismaRustPanicError = Error & {
    clientVersion: string
}

type PrismaErrorConstructors = {
    PrismaClientKnownRequestError: new (
        ...args: unknown[]
    ) => PrismaKnownRequestError
    PrismaClientValidationError: new (
        ...args: unknown[]
    ) => PrismaValidationError
    PrismaClientInitializationError: new (
        ...args: unknown[]
    ) => PrismaInitializationError
    PrismaClientRustPanicError: new (...args: unknown[]) => PrismaRustPanicError
}

const { Prisma } = prismaClientModule as {
    Prisma: PrismaErrorConstructors
}

const isPrismaMetaTargetArray = (target: unknown): target is string[] => {
    return (
        Array.isArray(target) &&
        target.every((item) => typeof item === 'string')
    )
}

const getConstraintKey = (error: PrismaErrorWithMeta): string | null => {
    const target = error.meta?.target
    if (!isPrismaMetaTargetArray(target) || target.length === 0) {
        return null
    }

    return target.join('_')
}

const buildConflictMessage = (constraintKey: string | null): string => {
    const knownMessages: Record<string, string> = {
        email: 'Email address already in use',
        googleId: 'This Google account is already linked to another user',
        slug: 'Organization identifier already taken',
        branchId_version: 'This version number already exists for this branch',
        organizationId_userId: 'User already belongs to this organization',
        branchSlug: 'Branch slug already exists',
        name: 'This name is already in use',
        organizationId_tokenPath: 'This token path is already locked',
        tokenHash: 'Session conflict detected. Please try logging in again',
        keyHash: 'API key already exists',
    }

    if (!constraintKey) {
        return 'A resource with these values already exists'
    }

    return (
        knownMessages[constraintKey] ??
        'A resource with these values already exists'
    )
}

const getResourceName = (
    error: PrismaErrorWithMeta,
    fallback: string
): string => {
    const modelName = error.meta?.modelName
    if (typeof modelName !== 'string' || !modelName.trim()) {
        return fallback
    }

    return modelName
}

export const mapPrismaErrorToAppError = (error: unknown): AppError | null => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const constraintKey = getConstraintKey(error)

        switch (error.code) {
            case 'P2002':
                return new ConflictError(buildConflictMessage(constraintKey))
            case 'P2003':
                return new ValidationError(
                    'Unable to complete operation due to invalid related resource'
                )
            case 'P2014':
            case 'P2018':
                return new ValidationError(
                    'Unable to complete operation due to invalid relationship state'
                )
            case 'P2015':
            case 'P2025': {
                const resource = getResourceName(error, 'Resource')
                return new NotFoundError(resource)
            }
            case 'P2024':
                return new AppError(
                    'Database is currently busy. Please try again in a moment',
                    503,
                    'SERVICE_UNAVAILABLE'
                )
            case 'P2034':
                return new AppError(
                    'Unable to complete operation due to concurrent changes. Please retry',
                    409,
                    'TRANSACTION_CONFLICT'
                )
            default:
                return new AppError(
                    'Database operation failed',
                    500,
                    'DATABASE_ERROR'
                )
        }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return new ValidationError('Invalid database query input')
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        return new AppError(
            'Service temporarily unavailable. Please try again later',
            503,
            'SERVICE_UNAVAILABLE'
        )
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        return new AppError(
            'Service temporarily unavailable. Please try again later',
            503,
            'SERVICE_UNAVAILABLE'
        )
    }

    return null
}

export const logPrismaError = (error: unknown): void => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const logContext = {
            code: error.code,
            meta: error.meta,
            clientVersion: error.clientVersion,
        }

        if (
            ['P2002', 'P2003', 'P2014', 'P2015', 'P2018', 'P2025'].includes(
                error.code
            )
        ) {
            logger.warn(
                logContext,
                'Prisma request rejected due to invalid client input'
            )
            return
        }

        logger.error(logContext, 'Prisma known request error')
        return
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        logger.warn({ message: error.message }, 'Prisma validation error')
        return
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        logger.error(
            {
                message: error.message,
                errorCode: error.errorCode,
                clientVersion: error.clientVersion,
            },
            'Prisma initialization error'
        )
        return
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        logger.error(
            {
                message: error.message,
                clientVersion: error.clientVersion,
            },
            'Prisma Rust panic error'
        )
    }
}

export const isPrismaError = (error: unknown): boolean => {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientRustPanicError
    )
}

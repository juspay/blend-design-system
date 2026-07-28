/**
 * Database Configuration — PostgreSQL Only
 *
 * Single database. No Firestore. No Firebase.
 * PostgreSQL stores everything: users, branches, versions, snapshots, uploads.
 * JWT handles authentication. Google OAuth handles login.
 */

import prismaClientModule from '@prisma/client'
import { logger } from '@/utils/logger.js'

const { PrismaClient } = prismaClientModule as any

const getPositiveIntegerFromEnv = (
    value: string | undefined,
    fallback: number
): number => {
    if (!value) return fallback

    const parsed = Number.parseInt(value, 10)
    if (!Number.isFinite(parsed) || parsed <= 0) return fallback

    return parsed
}

const dbConnectionLimit = getPositiveIntegerFromEnv(
    process.env.DB_CONNECTION_LIMIT,
    3
)
const dbPoolTimeoutSeconds = getPositiveIntegerFromEnv(
    process.env.DB_POOL_TIMEOUT_SECONDS,
    10
)
const dbConnectRetryDelayMs = getPositiveIntegerFromEnv(
    process.env.DB_CONNECT_RETRY_DELAY_MS,
    5000
)
const dbConnectMaxAttempts = getPositiveIntegerFromEnv(
    process.env.DB_CONNECT_MAX_ATTEMPTS,
    6
)

const withPrismaPoolSettings = (
    rawDatabaseUrl?: string
): string | undefined => {
    if (!rawDatabaseUrl) return rawDatabaseUrl

    // Handle Cloud SQL Unix socket paths - don't parse URL, just append params
    if (rawDatabaseUrl.includes('/cloudsql/')) {
        const separator = rawDatabaseUrl.includes('?') ? '&' : '?'
        let result = rawDatabaseUrl
        if (!rawDatabaseUrl.includes('connection_limit')) {
            result += `${separator}connection_limit=${dbConnectionLimit}`
        }
        if (!rawDatabaseUrl.includes('pool_timeout')) {
            result += `&pool_timeout=${dbPoolTimeoutSeconds}`
        }
        return result
    }

    try {
        const parsedUrl = new URL(rawDatabaseUrl)
        const searchParams = parsedUrl.searchParams

        // Cloud Run creates many concurrent requests; keep per-instance
        // Prisma pool small and wait a bit longer before timing out.
        if (!searchParams.has('connection_limit')) {
            searchParams.set('connection_limit', String(dbConnectionLimit))
        }
        if (!searchParams.has('pool_timeout')) {
            searchParams.set('pool_timeout', String(dbPoolTimeoutSeconds))
        }

        return parsedUrl.toString()
    } catch (error) {
        logger.warn({ err: error }, 'Invalid DATABASE_URL; using raw value')
        return rawDatabaseUrl
    }
}

// ---------------------------------------------------------------------------
// PostgreSQL (Prisma)
// ---------------------------------------------------------------------------

const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
}

const prismaClientOptions = process.env.DATABASE_URL
    ? {
          datasources: {
              db: {
                  url: withPrismaPoolSettings(process.env.DATABASE_URL),
              },
          },
      }
    : undefined

export const prisma =
    globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

let databaseReady = false

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

export const connectDatabase = async (): Promise<void> => {
    try {
        await prisma.$connect()
        databaseReady = true
        logger.info('PostgreSQL connected successfully')
    } catch (error) {
        databaseReady = false
        logger.error(error, 'Failed to connect to PostgreSQL')
        throw error
    }
}

export const disconnectDatabase = async (): Promise<void> => {
    await prisma.$disconnect()
    databaseReady = false
    logger.info('PostgreSQL disconnected')
}

export const isDatabaseReady = (): boolean => databaseReady

export const connectDatabaseWithRetry = async (
    retryDelayMs = dbConnectRetryDelayMs,
    maxAttempts = dbConnectMaxAttempts
): Promise<void> => {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            await connectDatabase()
            return
        } catch (error) {
            if (attempt === maxAttempts) {
                logger.error(
                    { err: error, attempt, maxAttempts },
                    'Database connection failed after max retries'
                )
                throw error
            }

            logger.warn(
                { err: error, attempt, maxAttempts, retryDelayMs },
                'Database connection retry scheduled'
            )
            await new Promise((resolve) => setTimeout(resolve, retryDelayMs))
        }
    }
}

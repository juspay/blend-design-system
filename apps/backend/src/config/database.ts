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

// ---------------------------------------------------------------------------
// PostgreSQL (Prisma)
// ---------------------------------------------------------------------------

const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

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

export const connectDatabaseWithRetry = (retryDelayMs = 5000): void => {
    const tryConnect = async () => {
        try {
            await connectDatabase()
        } catch (error) {
            logger.warn(
                { err: error, retryDelayMs },
                'Database connection retry scheduled'
            )
            setTimeout(tryConnect, retryDelayMs)
        }
    }

    void tryConnect()
}

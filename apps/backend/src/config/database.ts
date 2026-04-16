/**
 * Database Configuration — PostgreSQL Only
 *
 * Single database. No Firestore. No Firebase.
 * PostgreSQL stores everything: users, branches, versions, snapshots, uploads.
 * JWT handles authentication. Google OAuth handles login.
 */

import { PrismaClient } from '@prisma/client'
import { logger } from '@/utils/logger.js'

// ---------------------------------------------------------------------------
// PostgreSQL (Prisma)
// ---------------------------------------------------------------------------

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

export const connectDatabase = async (): Promise<void> => {
    try {
        await prisma.$connect()
        logger.info('PostgreSQL connected successfully')
    } catch (error) {
        logger.error(error, 'Failed to connect to PostgreSQL')
        throw error
    }
}

export const disconnectDatabase = async (): Promise<void> => {
    await prisma.$disconnect()
    logger.info('PostgreSQL disconnected')
}

import { PrismaClient } from '@prisma/client'
import { logger } from '@/utils/logger.js'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const connectDatabase = async (): Promise<void> => {
    try {
        await prisma.$connect()
        logger.info('Database connected successfully')
    } catch (error) {
        logger.error(error, 'Failed to connect to database')
        throw error
    }
}

export const disconnectDatabase = async (): Promise<void> => {
    await prisma.$disconnect()
    logger.info('Database disconnected')
}

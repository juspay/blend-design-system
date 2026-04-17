import crypto from 'crypto'
import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export interface ApiKeyRow {
    id: string
    organizationId: string
    userId: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt: Date | null
    expiresAt: Date | null
    createdAt: Date
    revokedAt: Date | null
}

const KEY_PREFIX = 'bts_'
const KEY_BYTES = 32

export const generateRawKey = (): string => {
    return KEY_PREFIX + crypto.randomBytes(KEY_BYTES).toString('hex')
}

export const hashKey = (rawKey: string): string => {
    return crypto.createHash('sha256').update(rawKey).digest('hex')
}

export const createApiKey = async (data: {
    organizationId: string
    userId: string
    name: string
    expiresAt?: Date
}): Promise<{ apiKey: ApiKeyRow; rawKey: string }> => {
    const rawKey = generateRawKey()
    const keyHash = hashKey(rawKey)
    const keyPrefix = rawKey.substring(0, 8)

    const apiKey = await prisma.apiKey.create({
        data: {
            organizationId: data.organizationId,
            userId: data.userId,
            name: data.name,
            keyHash,
            keyPrefix,
            expiresAt: data.expiresAt || null,
        },
    })

    logger.info({ apiKeyId: apiKey.id, prefix: keyPrefix }, 'API key created')

    return {
        apiKey: apiKey as unknown as ApiKeyRow,
        rawKey,
    }
}

export const findApiKeyByHash = async (
    keyHash: string
): Promise<ApiKeyRow | null> => {
    const apiKey = await prisma.apiKey.findUnique({
        where: { keyHash },
    })
    return apiKey as unknown as ApiKeyRow | null
}

export const validateApiKey = async (
    rawKey: string
): Promise<ApiKeyRow | null> => {
    const keyHash = hashKey(rawKey)
    const apiKey = await findApiKeyByHash(keyHash)

    if (!apiKey) return null
    if (apiKey.revokedAt) return null
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) return null

    await prisma.apiKey.update({
        where: { id: apiKey.id },
        data: { lastUsedAt: new Date() },
    })

    return apiKey
}

export const revokeApiKey = async (
    id: string,
    userId: string
): Promise<ApiKeyRow | null> => {
    const apiKey = await prisma.apiKey.findFirst({
        where: { id, userId, revokedAt: null },
    })

    if (!apiKey) return null

    const revoked = await prisma.apiKey.update({
        where: { id },
        data: { revokedAt: new Date() },
    })

    logger.info({ apiKeyId: id }, 'API key revoked')
    return revoked as unknown as ApiKeyRow
}

export const listApiKeys = async (
    userId: string,
    options: { organizationId?: string } = {}
): Promise<ApiKeyRow[]> => {
    const where: any = { userId }
    if (options.organizationId) {
        where.organizationId = options.organizationId
    }

    const keys = await prisma.apiKey.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            organizationId: true,
            userId: true,
            name: true,
            keyPrefix: true,
            lastUsedAt: true,
            expiresAt: true,
            createdAt: true,
            revokedAt: true,
        },
    })

    return keys as unknown as ApiKeyRow[]
}

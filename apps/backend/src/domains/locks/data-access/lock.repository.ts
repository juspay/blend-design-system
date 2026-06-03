import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export interface TokenLockRow {
    id: string
    organizationId: string
    tokenPath: string
    reason: string | null
    lockedBy: string | null
    createdAt: Date
}

export const createLock = async (data: {
    organizationId: string
    tokenPath: string
    reason?: string
    lockedBy: string
}): Promise<TokenLockRow> => {
    const lock = await prisma.tokenLock.upsert({
        where: {
            organizationId_tokenPath: {
                organizationId: data.organizationId,
                tokenPath: data.tokenPath,
            },
        },
        update: {
            reason: data.reason || null,
            lockedBy: data.lockedBy,
        },
        create: {
            organizationId: data.organizationId,
            tokenPath: data.tokenPath,
            reason: data.reason || null,
            lockedBy: data.lockedBy,
        },
    })
    logger.info(
        { orgId: data.organizationId, path: data.tokenPath },
        'Token locked'
    )
    return lock as unknown as TokenLockRow
}

export const listLocks = async (
    organizationId: string
): Promise<TokenLockRow[]> => {
    const locks = await prisma.tokenLock.findMany({
        where: { organizationId },
        orderBy: { tokenPath: 'asc' },
    })
    return locks as unknown as TokenLockRow[]
}

export const deleteLock = async (
    organizationId: string,
    tokenPath: string
): Promise<boolean> => {
    const result = await prisma.tokenLock.deleteMany({
        where: { organizationId, tokenPath },
    })
    const deleted = result.count > 0
    if (deleted) {
        logger.info(
            { orgId: organizationId, path: tokenPath },
            'Token unlocked'
        )
    }
    return deleted
}

export const getLocksByOrg = async (
    organizationId: string
): Promise<TokenLockRow[]> => {
    return listLocks(organizationId)
}

export const isTokenLocked = async (
    organizationId: string,
    tokenPath: string
): Promise<boolean> => {
    const lock = await prisma.tokenLock.findUnique({
        where: {
            organizationId_tokenPath: { organizationId, tokenPath },
        },
    })
    return lock !== null
}

export const bulkCreateLocks = async (
    organizationId: string,
    locks: Array<{ tokenPath: string; reason?: string }>,
    lockedBy: string
): Promise<TokenLockRow[]> => {
    const results: TokenLockRow[] = []
    for (const lock of locks) {
        const row = await createLock({
            organizationId,
            tokenPath: lock.tokenPath,
            reason: lock.reason,
            lockedBy,
        })
        results.push(row)
    }
    return results
}

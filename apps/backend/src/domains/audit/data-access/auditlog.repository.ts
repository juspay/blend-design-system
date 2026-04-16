import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export type AuditAction =
    | 'branch_created'
    | 'branch_updated'
    | 'branch_deleted'
    | 'branch_published'
    | 'branch_archived'
    | 'branch_forked'
    | 'version_created'
    | 'snapshot_created'
    | 'token_uploaded'
    | 'user_created'
    | 'user_role_changed'
    | 'api_key_created'
    | 'api_key_revoked'

export interface AuditLogRow {
    id: string
    organizationId: string
    action: AuditAction
    actorId: string
    actorEmail: string
    targetType: string
    targetId: string
    metadata: Record<string, unknown> | null
    createdAt: Date
}

export const createAuditLog = async (
    data: Omit<AuditLogRow, 'id' | 'createdAt'>
): Promise<AuditLogRow> => {
    const log = await prisma.auditLog.create({
        data: {
            organizationId: data.organizationId,
            action: data.action as any,
            actorId: data.actorId,
            actorEmail: data.actorEmail,
            targetType: data.targetType,
            targetId: data.targetId,
            metadata: data.metadata as any,
        },
    })

    logger.debug(
        { auditLogId: log.id, action: data.action },
        'Audit log created'
    )
    return log as unknown as AuditLogRow
}

export const listAuditLogs = async (options: {
    organizationId: string
    action?: AuditAction
    targetType?: string
    targetId?: string
    actorId?: string
    limit?: number
    cursor?: string
}): Promise<{ logs: AuditLogRow[]; nextCursor?: string }> => {
    const limit = options.limit || 50

    const where: any = {
        organizationId: options.organizationId,
    }
    if (options.action) where.action = options.action
    if (options.targetType) where.targetType = options.targetType
    if (options.targetId) where.targetId = options.targetId
    if (options.actorId) where.actorId = options.actorId
    if (options.cursor) where.id = { lt: options.cursor }

    const logs = await prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit + 1,
    })

    let nextCursor: string | undefined
    if (logs.length > limit) {
        nextCursor = logs[limit - 1].id
        logs.pop()
    }

    return { logs: logs as unknown as AuditLogRow[], nextCursor }
}

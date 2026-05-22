import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'
import { hashPII } from '@/utils/crypto.js'

// ===========================================================================
// Audit Actions — every mutation tracked, enum enforced at DB level
// ===========================================================================

export type AuditAction =
    | 'branch_created'
    | 'branch_updated'
    | 'branch_deleted'
    | 'branch_published'
    | 'branch_archived'
    | 'branch_forked'
    | 'version_created'
    | 'snapshot_created'
    | 'snapshot_restored'
    | 'token_uploaded'
    | 'user_created'
    | 'user_role_changed'
    | 'user_deactivated'
    | 'api_key_created'
    | 'api_key_revoked'
    | 'member_invited'
    | 'member_removed'
    | 'token_locked'
    | 'token_unlocked'
    | 'merge_request_created'
    | 'merge_request_approved'
    | 'merge_request_rejected'
    | 'merge_request_merged'
    | 'merge_request_merged_admin_bypass'
    | 'publish_request_created'
    | 'publish_request_approved'
    | 'publish_request_rejected'
    | 'publish_request_cancelled'
    | 'publish_request_published'
    | 'publish_request_published_admin_bypass'
    | 'organization_settings_updated'
    | 'branch_protection_enabled'
    | 'branch_protection_updated'
    | 'branch_protection_disabled'

// ===========================================================================
// Structured Metadata — typed per action so callers can't pass random shapes
// ===========================================================================

export interface BranchCreatedMeta {
    name: string
    brandId: string
    visibility: string
}

export interface BranchUpdatedMeta {
    fieldsChanged: string[]
    previousValues?: Record<string, unknown>
}

export interface BranchDeletedMeta {
    name: string
    brandId: string
    softDelete: true
}

export interface BranchPublishedMeta {
    version: string
    isBreaking: boolean
    isPrerelease: boolean
}

export interface BranchArchivedMeta {
    previousStatus: string
}

export interface BranchForkedMeta {
    sourceBranchId: string
    sourceBranchName: string
}

export interface VersionCreatedMeta {
    version: string
    isBreaking: boolean
    isPrerelease: boolean
}

export interface SnapshotCreatedMeta {
    label: string | null
    isAutoSave: boolean
}

export interface SnapshotRestoredMeta {
    snapshotId: string
    snapshotLabel: string | null
}

export interface TokenUploadedMeta {
    fileName: string
    fileSize: number
    status: string
}

export interface UserCreatedMeta {
    emailHash: string
    role: string
    provider: string
}

export interface UserRoleChangedMeta {
    previousRole: string
    newRole: string
    changedBy: string
}

export interface UserDeactivatedMeta {
    previousRole: string
}

export interface ApiKeyCreatedMeta {
    name: string
    prefix: string
    expiresAt: string | null
}

export interface ApiKeyRevokedMeta {
    name: string
    prefix: string
}

export interface MemberInvitedMeta {
    emailHash: string
    role: string
}

export interface MemberRemovedMeta {
    emailHash: string
    previousRole: string
}

export interface TokenLockedMeta {
    tokenPath: string
    reason: string | null
}

export interface TokenUnlockedMeta {
    tokenPath: string
}

export interface MergeRequestCreatedMeta {
    sourceBranchId: string
    sourceBranchName: string
    targetBranchId: string
    targetBranchName: string
}

export interface MergeRequestReviewedMeta {
    reviewComment: string | null
}

export interface MergeRequestMergedMeta {
    sourceBranchId: string
    targetBranchId: string
}

export interface MergeRequestMergedBypassMeta {
    sourceBranchId: string
    targetBranchId: string
    usedAdminBypass: boolean
    approvalCount: number
    minRequired: number
}

export interface PublishRequestMeta {
    publishRequestId?: string
    branchId: string
    branchName: string
    version: string
    reviewComment?: string | null
    usedAdminBypass?: boolean
    approvalCount?: number
    minRequired?: number
}

export interface OrganizationSettingsUpdatedMeta {
    requireApprovalForMerge?: boolean
    requireApprovalForPublish?: boolean
    allowedApprovers?: string
    minApprovals?: number
    allowAdminBypass?: boolean
}

export interface BranchProtectionMeta {
    branchId: string
    isProtected: boolean
    requireApproval: boolean | null
    minApprovals: number | null
    hasCustomApprovers: boolean
}

export type AuditMetadata =
    | BranchCreatedMeta
    | BranchUpdatedMeta
    | BranchDeletedMeta
    | BranchPublishedMeta
    | BranchArchivedMeta
    | BranchForkedMeta
    | VersionCreatedMeta
    | SnapshotCreatedMeta
    | SnapshotRestoredMeta
    | TokenUploadedMeta
    | UserCreatedMeta
    | UserRoleChangedMeta
    | UserDeactivatedMeta
    | ApiKeyCreatedMeta
    | ApiKeyRevokedMeta
    | MemberInvitedMeta
    | MemberRemovedMeta
    | TokenLockedMeta
    | TokenUnlockedMeta
    | MergeRequestCreatedMeta
    | MergeRequestReviewedMeta
    | MergeRequestMergedMeta
    | MergeRequestMergedBypassMeta
    | PublishRequestMeta
    | OrganizationSettingsUpdatedMeta
    | BranchProtectionMeta

// ===========================================================================
// Target types — constrained set of entities that can be audit-logged
// ===========================================================================

export type AuditTargetType =
    | 'branch'
    | 'version'
    | 'snapshot'
    | 'token_upload'
    | 'user'
    | 'api_key'
    | 'member'
    | 'organization'
    | 'token_lock'
    | 'merge_request'
    | 'publish_request'

// ===========================================================================
// Create input — typed, no `any` leaks
// ===========================================================================

export interface CreateAuditLogInput {
    organizationId: string
    action: AuditAction
    actorId: string
    actorEmail: string
    targetType: AuditTargetType
    targetId: string
    metadata: AuditMetadata
}

export interface AuditLogRow {
    id: string
    organizationId: string
    action: AuditAction
    actorId: string
    actorEmailHash: string
    targetType: string
    targetId: string
    metadata: AuditMetadata | null
    createdAt: Date
}

// ===========================================================================
// Row shape from DB
// ===========================================================================

export interface AuditLogRow {
    id: string
    organizationId: string
    action: AuditAction
    actorId: string
    actorEmail: string
    targetType: string
    targetId: string
    metadata: AuditMetadata | null
    createdAt: Date
}

// ===========================================================================
// Repository functions
// ===========================================================================

export const createAuditLog = async (
    data: CreateAuditLogInput
): Promise<AuditLogRow> => {
    const emailHash = data.actorEmail ? hashPII(data.actorEmail) : ''

    const log = await prisma.auditLog.create({
        data: {
            organizationId: data.organizationId,
            action: data.action as any,
            actorId: data.actorId,
            actorEmailHash: emailHash,
            targetType: data.targetType,
            targetId: data.targetId,
            metadata: data.metadata as any,
        },
    })

    logger.debug(
        {
            auditLogId: log.id,
            action: data.action,
            targetType: data.targetType,
        },
        'Audit log created'
    )
    return log as unknown as AuditLogRow
}

export const listAuditLogs = async (options: {
    organizationId: string
    action?: AuditAction
    targetType?: AuditTargetType
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

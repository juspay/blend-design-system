import { NotFoundError, ValidationError } from '@/errors/AppError.js'
import * as lockRepo from '../data-access/lock.repository.js'
import * as orgRepo from '@/domains/organizations/data-access/organization.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'
import {
    validateAgainstLocks,
    type TokenLockEntry,
} from '@/domains/branches/domain/inheritance.js'
import type { BrandConfig } from '@/domains/branches/domain/branch.types.js'
import { requireOrganizationRole } from '@/domains/organizations/domain/org-permissions.service.js'

export const lockToken = async (
    organizationId: string,
    tokenPath: string,
    reason: string | undefined,
    userId: string,
    userEmail: string
) => {
    const org = await orgRepo.getOrganizationById(organizationId)
    if (!org) throw new NotFoundError('Organization')
    await requireOrganizationRole(
        organizationId,
        userId,
        ['admin'],
        'Only admins can lock tokens'
    )

    if (!tokenPath || tokenPath.trim().length === 0) {
        throw new ValidationError('Token path is required')
    }

    const lock = await lockRepo.createLock({
        organizationId,
        tokenPath: tokenPath.trim(),
        reason,
        lockedBy: userId,
    })

    await auditLogRepo.createAuditLog({
        organizationId,
        action: 'token_locked',
        actorId: userId,
        actorEmail: userEmail,
        targetType: 'token_lock',
        targetId: lock.id,
        metadata: { tokenPath, reason: reason || null },
    })

    return lock
}

export const unlockToken = async (
    organizationId: string,
    tokenPath: string,
    userId: string,
    userEmail: string
) => {
    await requireOrganizationRole(
        organizationId,
        userId,
        ['admin'],
        'Only admins can unlock tokens'
    )
    const deleted = await lockRepo.deleteLock(organizationId, tokenPath)
    if (!deleted) throw new NotFoundError('Token lock')

    await auditLogRepo.createAuditLog({
        organizationId,
        action: 'token_unlocked',
        actorId: userId,
        actorEmail: userEmail,
        targetType: 'token_lock',
        targetId: tokenPath,
        metadata: { tokenPath },
    })

    return { tokenPath, unlocked: true }
}

export const listLocks = async (organizationId: string, userId: string) => {
    const org = await orgRepo.getOrganizationById(organizationId)
    if (!org) throw new NotFoundError('Organization')
    await requireOrganizationRole(
        organizationId,
        userId,
        ['admin', 'editor', 'viewer'],
        'Only organization members can view token locks'
    )
    return lockRepo.listLocks(organizationId)
}

export const validateBranchAgainstLocks = async (
    organizationId: string,
    tokenConfig: BrandConfig,
    parentConfig: BrandConfig
) => {
    const locks = await lockRepo.listLocks(organizationId)
    const lockedPaths: TokenLockEntry[] = locks.map((l) => ({
        path: l.tokenPath,
        reason: l.reason || undefined,
    }))

    return validateAgainstLocks(parentConfig, tokenConfig, lockedPaths)
}

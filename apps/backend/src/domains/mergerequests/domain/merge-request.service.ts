import {
    NotFoundError,
    ValidationError,
    ForbiddenError,
} from '@/errors/AppError.js'
import * as mrRepo from '../data-access/merge-request.repository.js'
import * as branchRepo from '@/domains/branches/data-access/branch.repository.js'
import * as lockService from '@/domains/locks/domain/lock.service.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'
import * as orgRepo from '@/domains/organizations/data-access/organization.repository.js'
import type { BrandConfig } from '@/domains/branches/domain/branch.types.js'
import {
    requireOrganizationMember,
    requireOrganizationRole,
} from '@/domains/organizations/domain/org-permissions.service.js'

function diffBrandConfigs(
    configA: BrandConfig,
    configB: BrandConfig
): Array<{ path: string; oldValue: string; newValue: string }> {
    const diffs: Array<{ path: string; oldValue: string; newValue: string }> =
        []

    function diffObj(
        prefix: string,
        a: Record<string, any> | undefined,
        b: Record<string, any> | undefined
    ) {
        const aObj = a ?? {}
        const bObj = b ?? {}
        const allKeys = new Set([...Object.keys(aObj), ...Object.keys(bObj)])

        for (const key of allKeys) {
            const path = prefix ? `${prefix}.${key}` : key
            const oldVal = aObj[key]
            const newVal = bObj[key]

            if (
                oldVal &&
                typeof oldVal === 'object' &&
                !Array.isArray(oldVal) &&
                newVal &&
                typeof newVal === 'object' &&
                !Array.isArray(newVal)
            ) {
                diffObj(path, oldVal, newVal)
            } else if (oldVal !== newVal) {
                diffs.push({
                    path,
                    oldValue: oldVal ?? '(default)',
                    newValue: newVal ?? '(default)',
                })
            }
        }
    }

    diffObj('colors', configA.colors, configB.colors)
    diffObj('radius', configA.radius, configB.radius)
    diffObj('shadows', configA.shadows, configB.shadows)
    diffObj('font', configA.font, configB.font)

    return diffs
}

function mergeConfigForTargetBranch(
    targetConfig: BrandConfig,
    sourceConfig: BrandConfig
): BrandConfig {
    return {
        ...targetConfig,
        colors: {
            ...(targetConfig.colors ?? {}),
            ...(sourceConfig.colors ?? {}),
        },
        radius: {
            ...(targetConfig.radius ?? {}),
            ...(sourceConfig.radius ?? {}),
        },
        shadows: {
            ...(targetConfig.shadows ?? {}),
            ...(sourceConfig.shadows ?? {}),
        },
        font: {
            ...(targetConfig.font ?? {}),
            ...(sourceConfig.font ?? {}),
            ...(targetConfig.font?.weight || sourceConfig.font?.weight
                ? {
                      weight: {
                          ...(targetConfig.font?.weight ?? {}),
                          ...(sourceConfig.font?.weight ?? {}),
                      },
                  }
                : {}),
        },
        componentOverrides: {
            ...(targetConfig.componentOverrides ?? {}),
            ...(sourceConfig.componentOverrides ?? {}),
        },
        darkModeOverrides:
            targetConfig.darkModeOverrides || sourceConfig.darkModeOverrides
                ? {
                      colors: {
                          ...(targetConfig.darkModeOverrides?.colors ?? {}),
                          ...(sourceConfig.darkModeOverrides?.colors ?? {}),
                      },
                      radius: {
                          ...(targetConfig.darkModeOverrides?.radius ?? {}),
                          ...(sourceConfig.darkModeOverrides?.radius ?? {}),
                      },
                      shadows: {
                          ...(targetConfig.darkModeOverrides?.shadows ?? {}),
                          ...(sourceConfig.darkModeOverrides?.shadows ?? {}),
                      },
                      font: {
                          ...(targetConfig.darkModeOverrides?.font ?? {}),
                          ...(sourceConfig.darkModeOverrides?.font ?? {}),
                          ...(targetConfig.darkModeOverrides?.font?.weight ||
                          sourceConfig.darkModeOverrides?.font?.weight
                              ? {
                                    weight: {
                                        ...(targetConfig.darkModeOverrides?.font
                                            ?.weight ?? {}),
                                        ...(sourceConfig.darkModeOverrides?.font
                                            ?.weight ?? {}),
                                    },
                                }
                              : {}),
                      },
                  }
                : undefined,
    }
}

export const createMR = async (
    organizationId: string,
    sourceBranchId: string,
    targetBranchId: string,
    title: string,
    description: string | undefined,
    userId: string,
    userEmail: string
) => {
    await requireOrganizationRole(
        organizationId,
        userId,
        ['admin', 'editor'],
        'Only admins and editors can create merge requests'
    )

    const source = await branchRepo.getBranchById(sourceBranchId)
    if (!source) throw new NotFoundError('Source branch')

    const target = await branchRepo.getBranchById(targetBranchId)
    if (!target) throw new NotFoundError('Target branch')

    if (source.organizationId !== organizationId) {
        throw new ValidationError(
            'Source branch does not belong to organization'
        )
    }
    if (target.organizationId !== organizationId) {
        throw new ValidationError(
            'Target branch does not belong to organization'
        )
    }

    const organization = await orgRepo.getOrganizationById(organizationId)
    if (
        organization?.defaultBranchId &&
        target.id !== organization.defaultBranchId
    ) {
        throw new ValidationError(
            'Merge requests can only target the organization default branch'
        )
    }

    if (source.id === target.id) {
        throw new ValidationError(
            'Source and target branches must be different'
        )
    }

    const diff = diffBrandConfigs(target.brandConfig, source.brandConfig)

    let lockViolations = null
    try {
        const violations = await lockService.validateBranchAgainstLocks(
            organizationId,
            source.brandConfig,
            target.brandConfig
        )
        if (violations.length > 0) {
            lockViolations = violations
        }
    } catch {
        // Lock validation may fail if no locks exist yet
    }

    const mr = await mrRepo.createMergeRequest({
        organizationId,
        sourceBranchId: source.id,
        sourceBranchName: source.name,
        targetBranchId: target.id,
        targetBranchName: target.name,
        title,
        description,
        diff,
        lockViolations,
        requestedBy: userId,
    })

    await auditLogRepo.createAuditLog({
        organizationId,
        action: 'merge_request_created',
        actorId: userId,
        actorEmail: userEmail,
        targetType: 'merge_request',
        targetId: mr.id,
        metadata: {
            sourceBranchId: source.id,
            sourceBranchName: source.name,
            targetBranchId: target.id,
            targetBranchName: target.name,
        },
    })

    return mr
}

export const getMR = async (id: string, requesterUserId?: string) => {
    const mr = await mrRepo.getMergeRequest(id)
    if (!mr) throw new NotFoundError('Merge request')
    if (requesterUserId) {
        await requireOrganizationMember(mr.organizationId, requesterUserId)
    }
    return mr
}

export const listMRs = async (
    options: {
        organizationId?: string
        status?: string
        requestedBy?: string
        limit?: number
        cursor?: string
    },
    requesterUserId?: string
) => {
    if (options.organizationId && requesterUserId) {
        await requireOrganizationMember(options.organizationId, requesterUserId)
    }
    return mrRepo.listMergeRequests(options)
}

export const approveMR = async (
    id: string,
    reviewComment: string | undefined,
    userId: string,
    userEmail: string
) => {
    const mr = await getMR(id, userId)
    await requireOrganizationRole(
        mr.organizationId,
        userId,
        ['admin'],
        'Only admins can approve merge requests'
    )
    if (mr.status !== 'pending') {
        throw new ValidationError('Only pending merge requests can be approved')
    }

    const updated = await mrRepo.updateMergeRequestStatus(id, {
        status: 'approved',
        reviewedBy: userId,
        reviewComment,
    })

    await auditLogRepo.createAuditLog({
        organizationId: mr.organizationId,
        action: 'merge_request_approved',
        actorId: userId,
        actorEmail: userEmail,
        targetType: 'merge_request',
        targetId: id,
        metadata: { reviewComment: reviewComment || null },
    })

    return updated
}

export const rejectMR = async (
    id: string,
    reviewComment: string | undefined,
    userId: string,
    userEmail: string
) => {
    const mr = await getMR(id, userId)
    await requireOrganizationRole(
        mr.organizationId,
        userId,
        ['admin'],
        'Only admins can reject merge requests'
    )
    if (mr.status !== 'pending') {
        throw new ValidationError('Only pending merge requests can be rejected')
    }

    const updated = await mrRepo.updateMergeRequestStatus(id, {
        status: 'rejected',
        reviewedBy: userId,
        reviewComment,
    })

    await auditLogRepo.createAuditLog({
        organizationId: mr.organizationId,
        action: 'merge_request_rejected',
        actorId: userId,
        actorEmail: userEmail,
        targetType: 'merge_request',
        targetId: id,
        metadata: { reviewComment: reviewComment || null },
    })

    return updated
}

export const mergeMR = async (
    id: string,
    userId: string,
    userEmail: string
) => {
    const mr = await getMR(id, userId)
    const membership = await requireOrganizationRole(
        mr.organizationId,
        userId,
        ['admin'],
        'Only admins can merge merge requests'
    )

    if (mr.status !== 'approved') {
        if (!(mr.status === 'pending' && membership.role === 'admin')) {
            throw new ValidationError(
                'Only approved merge requests can be merged'
            )
        }
    }

    const source = await branchRepo.getBranchById(mr.sourceBranchId)
    if (!source) throw new NotFoundError('Source branch')

    const target = await branchRepo.getBranchById(mr.targetBranchId)
    if (!target) throw new NotFoundError('Target branch')

    const lockViolations = await lockService.validateBranchAgainstLocks(
        mr.organizationId,
        source.brandConfig,
        target.brandConfig
    )
    if (lockViolations.length > 0) {
        throw new ValidationError(
            'Cannot merge: lock violations must be resolved first'
        )
    }

    const mergedTargetConfig = mergeConfigForTargetBranch(
        target.brandConfig,
        source.brandConfig
    )

    await branchRepo.updateBranch(mr.targetBranchId, {
        brandConfig: mergedTargetConfig,
    })

    const updated = await mrRepo.updateMergeRequestStatus(id, {
        status: 'merged',
        reviewedBy: userId,
    })

    await auditLogRepo.createAuditLog({
        organizationId: mr.organizationId,
        action: 'merge_request_merged',
        actorId: userId,
        actorEmail: userEmail,
        targetType: 'merge_request',
        targetId: id,
        metadata: {
            sourceBranchId: mr.sourceBranchId,
            targetBranchId: mr.targetBranchId,
        },
    })

    return updated
}

export const cancelMR = async (
    id: string,
    userId: string,
    _userEmail: string
) => {
    const mr = await getMR(id, userId)
    if (mr.status !== 'pending') {
        throw new ValidationError(
            'Only pending merge requests can be cancelled'
        )
    }

    const membership = await requireOrganizationMember(
        mr.organizationId,
        userId
    )
    const isAdmin = membership.role === 'admin'

    if (mr.requestedBy !== userId && !isAdmin) {
        throw new ForbiddenError('Only the requestor or an admin can cancel')
    }

    return mrRepo.cancelMergeRequest(id)
}

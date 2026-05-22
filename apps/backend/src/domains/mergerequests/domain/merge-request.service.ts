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
import * as userRepo from '@/domains/users/data-access/user.repository.js'
import type { BrandConfig } from '@/domains/branches/domain/branch.types.js'
import {
    requireOrganizationRole,
    requireOrganizationMember,
    getOrganizationRole,
} from '@/domains/organizations/domain/org-permissions.service.js'
import {
    canBypassApproval,
    canRoleApprove,
    hasReachedApprovalThreshold,
    resolveMergeApprovalPolicy,
    type OrgApprovalSettings,
} from '@/domains/shared/approval-policy.service.js'

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

const toOrgPolicy = (
    organization: Awaited<ReturnType<typeof orgRepo.getOrganizationById>>
): OrgApprovalSettings | null => {
    if (!organization) return null
    return {
        defaultBranchId: organization.defaultBranchId,
        requireApprovalForMerge: organization.requireApprovalForMerge,
        requireApprovalForPublish: organization.requireApprovalForPublish,
        allowedApprovers: organization.allowedApprovers,
        minApprovals: organization.minApprovals,
        allowAdminBypass: organization.allowAdminBypass,
    }
}

const createPersonalPolicy = (targetBranchId: string): OrgApprovalSettings => ({
    defaultBranchId: targetBranchId,
    requireApprovalForMerge: true,
    requireApprovalForPublish: false,
    allowedApprovers: 'admins',
    minApprovals: 1,
    allowAdminBypass: true,
})

const normalizeOrgId = (
    sourceOrgId: string | null,
    targetOrgId: string | null
): string | null => {
    if (sourceOrgId && targetOrgId && sourceOrgId !== targetOrgId) {
        throw new ValidationError(
            'Source and target branches must belong to same organization context'
        )
    }
    return sourceOrgId || targetOrgId || null
}

const getRoleForMergeContext = async (
    organizationId: string | null,
    targetBranchCreatedBy: string,
    userId: string
): Promise<'admin' | 'editor' | 'viewer'> => {
    if (!organizationId) {
        return targetBranchCreatedBy === userId ? 'admin' : 'viewer'
    }
    return await getOrganizationRole(organizationId, userId, 'viewer')
}

export const createMR = async (
    organizationId: string | undefined,
    sourceBranchId: string,
    targetBranchId: string,
    title: string,
    description: string | undefined,
    userId: string,
    userEmail: string
) => {
    const source = await branchRepo.getBranchById(sourceBranchId)
    if (!source) throw new NotFoundError('Source branch')

    const target = await branchRepo.getBranchById(targetBranchId)
    if (!target) throw new NotFoundError('Target branch')

    const inferredOrgId = normalizeOrgId(
        source.organizationId,
        target.organizationId
    )
    const orgId = organizationId || inferredOrgId || null

    if (orgId) {
        await requireOrganizationRole(
            orgId,
            userId,
            ['admin', 'editor'],
            'Only admins and editors can create merge requests'
        )

        if (
            source.organizationId !== orgId ||
            target.organizationId !== orgId
        ) {
            throw new ValidationError(
                'Source and target branches must belong to organization'
            )
        }

        const organization = await orgRepo.getOrganizationById(orgId)
        if (
            organization?.defaultBranchId &&
            target.id !== organization.defaultBranchId
        ) {
            throw new ValidationError(
                'Merge requests can only target the organization default branch'
            )
        }
    } else {
        if (source.createdBy !== userId && target.createdBy !== userId) {
            throw new ForbiddenError(
                'Only branch owners can create merge requests without organization'
            )
        }
    }

    if (source.id === target.id) {
        throw new ValidationError(
            'Source and target branches must be different'
        )
    }

    const diff = diffBrandConfigs(target.brandConfig, source.brandConfig)

    let lockViolations: unknown = null
    if (orgId) {
        try {
            const violations = await lockService.validateBranchAgainstLocks(
                orgId,
                source.brandConfig,
                target.brandConfig
            )
            if (violations.length > 0) {
                lockViolations = violations
            }
        } catch {
            // Ignore lock validation bootstrap failures.
        }
    }

    const mr = await mrRepo.createMergeRequest({
        organizationId: orgId,
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

    if (orgId) {
        await auditLogRepo.createAuditLog({
            organizationId: orgId,
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
    }

    return mr
}

export const getMR = async (id: string, requesterUserId?: string) => {
    const mr = await mrRepo.getMergeRequest(id)
    if (!mr) throw new NotFoundError('Merge request')

    if (requesterUserId) {
        if (mr.organizationId) {
            await requireOrganizationMember(mr.organizationId, requesterUserId)
        } else {
            const [requester, source, target] = await Promise.all([
                userRepo.findUserById(requesterUserId),
                branchRepo.getBranchById(mr.sourceBranchId),
                branchRepo.getBranchById(mr.targetBranchId),
            ])
            if (!requester || !source || !target) {
                throw new ForbiddenError('Access denied')
            }

            const allowedUsers = new Set([
                mr.requestedBy,
                source.createdBy,
                target.createdBy,
            ])
            if (!allowedUsers.has(requesterUserId)) {
                throw new ForbiddenError('Access denied')
            }
        }
    }

    return mr
}

export const listMRs = async (
    options: {
        organizationId?: string
        status?: string
        requestedBy?: string
        sourceBranchId?: string
        targetBranchId?: string
        limit?: number
        cursor?: string
    },
    requesterUserId?: string
) => {
    if (options.organizationId && requesterUserId) {
        await requireOrganizationMember(options.organizationId, requesterUserId)
    } else if (
        !options.organizationId &&
        requesterUserId &&
        !options.requestedBy
    ) {
        options.requestedBy = requesterUserId
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
    if (mr.status !== 'pending') {
        throw new ValidationError('Only pending merge requests can be approved')
    }
    if (mr.requestedBy === userId) {
        throw new ForbiddenError('You cannot approve your own merge request')
    }

    const target = await branchRepo.getBranchById(mr.targetBranchId)
    if (!target) throw new NotFoundError('Target branch')

    const organization = mr.organizationId
        ? await orgRepo.getOrganizationById(mr.organizationId)
        : null
    const policy = resolveMergeApprovalPolicy(
        target,
        toOrgPolicy(organization) || createPersonalPolicy(target.id)
    )

    const userName =
        (await userRepo.findUserById(userId))?.displayName || userEmail
    const userRole = await getRoleForMergeContext(
        mr.organizationId,
        target.createdBy,
        userId
    )

    if (!canRoleApprove(policy, userRole, userId)) {
        throw new ForbiddenError(
            'You are not allowed to approve this merge request'
        )
    }

    await mrRepo.addMergeRequestApproval(id, {
        userId,
        userName,
        userRole,
    })

    const latest = await mrRepo.getMergeRequest(id)
    if (!latest) throw new NotFoundError('Merge request')

    const approved = hasReachedApprovalThreshold(
        latest.approvals.length,
        policy
    )
    const updated = await mrRepo.updateMergeRequestStatus(id, {
        status: approved ? 'approved' : 'pending',
        reviewedBy: approved ? userId : undefined,
        reviewComment,
    })

    if (mr.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: mr.organizationId,
            action: 'merge_request_approved',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'merge_request',
            targetId: id,
            metadata: {
                reviewComment: reviewComment || null,
            },
        })
    }

    return updated
}

export const rejectMR = async (
    id: string,
    reviewComment: string | undefined,
    userId: string,
    userEmail: string
) => {
    const mr = await getMR(id, userId)

    const target = await branchRepo.getBranchById(mr.targetBranchId)
    if (!target) throw new NotFoundError('Target branch')

    const userRole = await getRoleForMergeContext(
        mr.organizationId,
        target.createdBy,
        userId
    )
    if (userRole !== 'admin') {
        throw new ForbiddenError('Only admins can reject merge requests')
    }

    if (mr.status !== 'pending' && mr.status !== 'approved') {
        throw new ValidationError(
            'Only pending or approved merge requests can be rejected'
        )
    }

    const updated = await mrRepo.updateMergeRequestStatus(id, {
        status: 'rejected',
        reviewedBy: userId,
        reviewComment,
    })

    if (mr.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: mr.organizationId,
            action: 'merge_request_rejected',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'merge_request',
            targetId: id,
            metadata: {
                reviewComment: reviewComment || null,
            },
        })
    }

    return updated
}

export const mergeMR = async (
    id: string,
    userId: string,
    userEmail: string
) => {
    const mr = await getMR(id, userId)

    const source = await branchRepo.getBranchById(mr.sourceBranchId)
    if (!source) throw new NotFoundError('Source branch')

    const target = await branchRepo.getBranchById(mr.targetBranchId)
    if (!target) throw new NotFoundError('Target branch')

    const organization = mr.organizationId
        ? await orgRepo.getOrganizationById(mr.organizationId)
        : null
    const policy = resolveMergeApprovalPolicy(
        target,
        toOrgPolicy(organization) || createPersonalPolicy(target.id)
    )

    const userRole = await getRoleForMergeContext(
        mr.organizationId,
        target.createdBy,
        userId
    )
    const isAdmin = userRole === 'admin'
    if (!isAdmin) {
        throw new ForbiddenError('Only admins can merge merge requests')
    }

    const bypassAllowed = canBypassApproval(policy, userRole)
    const approvalsMet = hasReachedApprovalThreshold(
        mr.approvals.length,
        policy
    )

    if (policy.requireApproval && !approvalsMet && !bypassAllowed) {
        throw new ValidationError(
            `This merge request requires at least ${policy.minApprovals} approvals`
        )
    }

    if (mr.organizationId) {
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

    if (mr.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: mr.organizationId,
            action:
                policy.requireApproval && !approvalsMet && bypassAllowed
                    ? 'merge_request_merged_admin_bypass'
                    : 'merge_request_merged',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'merge_request',
            targetId: id,
            metadata: {
                sourceBranchId: mr.sourceBranchId,
                targetBranchId: mr.targetBranchId,
                usedAdminBypass:
                    policy.requireApproval && !approvalsMet && bypassAllowed,
                approvalCount: mr.approvals.length,
                minRequired: policy.minApprovals,
            },
        })
    }

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

    if (mr.organizationId) {
        const membership = await requireOrganizationMember(
            mr.organizationId,
            userId
        )
        const isAdmin = membership.role === 'admin'
        if (mr.requestedBy !== userId && !isAdmin) {
            throw new ForbiddenError(
                'Only the requestor or an admin can cancel'
            )
        }
    } else if (mr.requestedBy !== userId) {
        throw new ForbiddenError('Only the requestor can cancel')
    }

    return mrRepo.cancelMergeRequest(id)
}

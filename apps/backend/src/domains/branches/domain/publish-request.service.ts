import { ForbiddenError, NotFoundError, ValidationError } from '@/errors/AppError.js'
import * as publishRequestRepo from '@/domains/branches/data-access/publish-request.repository.js'
import * as branchRepo from '@/domains/branches/data-access/branch.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'
import * as orgRepo from '@/domains/organizations/data-access/organization.repository.js'
import * as userRepo from '@/domains/users/data-access/user.repository.js'
import {
    getOrganizationRole,
    requireOrganizationMember,
} from '@/domains/organizations/domain/org-permissions.service.js'
import {
    canBypassApproval,
    canRoleApprove,
    hasReachedApprovalThreshold,
    resolvePublishApprovalPolicy,
    type OrgApprovalSettings,
} from '@/domains/shared/approval-policy.service.js'

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

const createPersonalPolicy = (branchId: string): OrgApprovalSettings => ({
    defaultBranchId: branchId,
    requireApprovalForMerge: true,
    requireApprovalForPublish: false,
    allowedApprovers: 'admins',
    minApprovals: 1,
    allowAdminBypass: true,
})

const getRoleForPublishContext = async (
    organizationId: string | null,
    branchCreatedBy: string,
    userId: string
): Promise<'admin' | 'editor' | 'viewer'> => {
    if (!organizationId) {
        return branchCreatedBy === userId ? 'admin' : 'viewer'
    }

    return await getOrganizationRole(organizationId, userId, 'viewer')
}

export const listPublishRequests = async (
    options: {
        organizationId?: string
        branchId?: string
        status?: string
        requestedBy?: string
        limit?: number
        cursor?: string
    },
    requesterUserId: string
) => {
    if (options.organizationId) {
        await requireOrganizationMember(options.organizationId, requesterUserId)
    }
    return publishRequestRepo.listPublishRequests(options)
}

export const getPublishRequest = async (
    id: string,
    requesterUserId: string
) => {
    const request = await publishRequestRepo.getPublishRequestById(id)
    if (!request) {
        throw new NotFoundError('Publish request')
    }

    if (request.organizationId) {
        await requireOrganizationMember(request.organizationId, requesterUserId)
    } else if (request.requestedBy !== requesterUserId) {
        const branch = await branchRepo.getBranchById(request.branchId)
        if (!branch) {
            throw new ForbiddenError('Access denied')
        }
        const role = await getRoleForPublishContext(
            request.organizationId,
            branch.createdBy,
            requesterUserId
        )
        if (role !== 'admin') {
            throw new ForbiddenError('Access denied')
        }
    }

    return request
}

export const approvePublishRequest = async (
    id: string,
    reviewComment: string | undefined,
    userId: string,
    userEmail: string
) => {
    const request = await getPublishRequest(id, userId)
    if (request.status !== 'pending') {
        throw new ValidationError('Only pending publish requests can be approved')
    }
    if (request.requestedBy === userId) {
        throw new ForbiddenError('You cannot approve your own publish request')
    }

    const branch = await branchRepo.getBranchById(request.branchId)
    if (!branch) {
        throw new NotFoundError('Branch')
    }

    const organization = request.organizationId
        ? await orgRepo.getOrganizationById(request.organizationId)
        : null
    const policy = resolvePublishApprovalPolicy(
        branch,
        toOrgPolicy(organization) || createPersonalPolicy(branch.id)
    )

    const userName =
        (await userRepo.findUserById(userId))?.displayName || userEmail
    const userRole = await getRoleForPublishContext(
        request.organizationId,
        branch.createdBy,
        userId
    )
    if (!canRoleApprove(policy, userRole, userId)) {
        throw new ForbiddenError('You are not allowed to approve this publish request')
    }

    await publishRequestRepo.addPublishRequestApproval(id, {
        userId,
        userName,
        userRole,
    })

    const refreshed = await publishRequestRepo.getPublishRequestById(id)
    if (!refreshed) {
        throw new NotFoundError('Publish request')
    }

    const thresholdReached = hasReachedApprovalThreshold(
        refreshed.approvals.length,
        policy
    )
    const updated = await publishRequestRepo.updatePublishRequestStatus(id, {
        status: thresholdReached ? 'approved' : 'pending',
        reviewComment,
    })

    if (request.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: request.organizationId,
            action: 'publish_request_approved',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'publish_request',
            targetId: request.id,
            metadata: {
                branchId: request.branchId,
                branchName: request.branchName,
                version: request.version,
                reviewComment: reviewComment || null,
            },
        })
    }

    return updated
}

export const rejectPublishRequest = async (
    id: string,
    reviewComment: string | undefined,
    userId: string,
    userEmail: string
) => {
    const request = await getPublishRequest(id, userId)
    if (request.status !== 'pending' && request.status !== 'approved') {
        throw new ValidationError(
            'Only pending or approved publish requests can be rejected'
        )
    }

    const branch = await branchRepo.getBranchById(request.branchId)
    if (!branch) {
        throw new NotFoundError('Branch')
    }

    const userRole = await getRoleForPublishContext(
        request.organizationId,
        branch.createdBy,
        userId
    )
    if (userRole !== 'admin') {
        throw new ForbiddenError('Only admins can reject publish requests')
    }

    const updated = await publishRequestRepo.updatePublishRequestStatus(id, {
        status: 'rejected',
        reviewComment,
    })

    if (request.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: request.organizationId,
            action: 'publish_request_rejected',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'publish_request',
            targetId: request.id,
            metadata: {
                branchId: request.branchId,
                branchName: request.branchName,
                version: request.version,
                reviewComment: reviewComment || null,
            },
        })
    }

    return updated
}

export const executePublishRequest = async (
    id: string,
    userId: string,
    userName: string,
    userEmail: string
) => {
    const request = await getPublishRequest(id, userId)
    const branch = await branchRepo.getBranchById(request.branchId)
    if (!branch) {
        throw new NotFoundError('Branch')
    }

    const organization = request.organizationId
        ? await orgRepo.getOrganizationById(request.organizationId)
        : null
    const policy = resolvePublishApprovalPolicy(
        branch,
        toOrgPolicy(organization) || createPersonalPolicy(branch.id)
    )

    const userRole = await getRoleForPublishContext(
        request.organizationId,
        branch.createdBy,
        userId
    )
    const isAdmin = userRole === 'admin'
    if (!isAdmin) {
        throw new ForbiddenError('Only admins can execute publish requests')
    }

    const approvalsMet = hasReachedApprovalThreshold(
        request.approvals.length,
        policy
    )
    const bypassAllowed = canBypassApproval(policy, userRole)

    if (policy.requireApproval && !approvalsMet && !bypassAllowed) {
        throw new ValidationError(
            `This publish request requires at least ${policy.minApprovals} approvals`
        )
    }

    if (request.status !== 'approved') {
        if (!(policy.requireApproval && !approvalsMet && bypassAllowed)) {
            throw new ValidationError('Only approved publish requests can be executed')
        }
    }

    const version = await branchRepo.createVersion(request.branchId, {
        version: request.version,
        brandConfig: branch.brandConfig,
        changelog: request.changelog,
        isBreaking: request.isBreaking,
        isPrerelease: request.isPrerelease,
        publishedBy: userId,
        publishedByName: userName,
    })

    const updated = await publishRequestRepo.updatePublishRequestStatus(id, {
        status: 'published',
        publishedVersionId: version.id,
        publishedAt: new Date(),
    })

    if (request.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: request.organizationId,
            action:
                policy.requireApproval && !approvalsMet && bypassAllowed
                    ? 'publish_request_published_admin_bypass'
                    : 'publish_request_published',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'publish_request',
            targetId: request.id,
            metadata: {
                publishRequestId: request.id,
                branchId: request.branchId,
                branchName: request.branchName,
                version: request.version,
                usedAdminBypass:
                    policy.requireApproval && !approvalsMet && bypassAllowed,
                approvalCount: request.approvals.length,
                minRequired: policy.minApprovals,
            },
        })
    }

    return {
        publishRequest: updated,
        version,
    }
}

export const cancelPublishRequest = async (
    id: string,
    userId: string,
    userEmail: string
) => {
    const request = await getPublishRequest(id, userId)

    if (request.status !== 'pending' && request.status !== 'approved') {
        throw new ValidationError(
            'Only pending or approved publish requests can be cancelled'
        )
    }

    if (request.organizationId) {
        const membership = await requireOrganizationMember(request.organizationId, userId)
        const isAdmin = membership.role === 'admin'
        if (request.requestedBy !== userId && !isAdmin) {
            throw new ForbiddenError('Only the requestor or an admin can cancel')
        }
    } else if (request.requestedBy !== userId) {
        throw new ForbiddenError('Only the requestor can cancel')
    }

    const updated = await publishRequestRepo.updatePublishRequestStatus(id, {
        status: 'cancelled',
    })

    if (request.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: request.organizationId,
            action: 'publish_request_cancelled',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'publish_request',
            targetId: request.id,
            metadata: {
                branchId: request.branchId,
                branchName: request.branchName,
                version: request.version,
            },
        })
    }

    return updated
}

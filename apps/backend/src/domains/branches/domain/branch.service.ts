import {
    NotFoundError,
    ValidationError,
    ForbiddenError,
} from '@/errors/AppError.js'
import type {
    Branch,
    CreateBranchDTO,
    UpdateBranchDTO,
    UpdateBranchProtectionDTO,
    PublishBranchDTO,
    PublishBranchResult,
    BrandConfig,
    BranchVersion,
} from './branch.types.js'
import * as branchRepo from '../data-access/branch.repository.js'
import * as publishRequestRepo from '../data-access/publish-request.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'
import * as tagRepo from '@/domains/tags/data-access/tag.repository.js'
import * as userRepo from '@/domains/users/data-access/user.repository.js'
import * as lockRepo from '@/domains/locks/data-access/lock.repository.js'
import * as orgRepo from '@/domains/organizations/data-access/organization.repository.js'
import {
    canBypassApproval,
    canDirectlyUpdateBranch,
    resolvePublishApprovalPolicy,
    resolveMergeApprovalPolicy,
    type OrgApprovalSettings,
} from '@/domains/shared/approval-policy.service.js'
import { getOrganizationRole } from '@/domains/organizations/domain/org-permissions.service.js'
import {
    resolveWithInheritance,
    validateAgainstLocks,
    type TokenLockEntry,
} from './inheritance.js'

function deepMergeRecords(
    base: Record<string, unknown>,
    override: Record<string, unknown>
): Record<string, unknown> {
    const result: Record<string, unknown> = { ...base }
    for (const [key, value] of Object.entries(override)) {
        const baseValue = result[key]
        if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            baseValue &&
            typeof baseValue === 'object' &&
            !Array.isArray(baseValue)
        ) {
            result[key] = deepMergeRecords(
                baseValue as Record<string, unknown>,
                value as Record<string, unknown>
            )
        } else {
            result[key] = value
        }
    }
    return result
}

function mergeBrandConfig(
    base: BrandConfig,
    override?: Partial<BrandConfig>
): BrandConfig {
    if (!override) {
        return base
    }

    return {
        ...base,
        ...override,
        colors: {
            ...(base.colors ?? {}),
            ...(override.colors ?? {}),
        },
        radius: {
            ...(base.radius ?? {}),
            ...(override.radius ?? {}),
        },
        shadows: {
            ...(base.shadows ?? {}),
            ...(override.shadows ?? {}),
        },
        font: {
            ...(base.font ?? {}),
            ...(override.font ?? {}),
            ...(base.font?.weight || override.font?.weight
                ? {
                      weight: {
                          ...(base.font?.weight ?? {}),
                          ...(override.font?.weight ?? {}),
                      },
                  }
                : {}),
        },
        componentOverrides: deepMergeRecords(
            (base.componentOverrides ?? {}) as Record<string, unknown>,
            (override.componentOverrides ?? {}) as Record<string, unknown>
        ),
        darkModeOverrides:
            base.darkModeOverrides || override.darkModeOverrides
                ? {
                      colors: deepMergeRecords(
                          (base.darkModeOverrides?.colors ?? {}) as Record<
                              string,
                              unknown
                          >,
                          (override.darkModeOverrides?.colors ?? {}) as Record<
                              string,
                              unknown
                          >
                      ),
                      radius: {
                          ...(base.darkModeOverrides?.radius ?? {}),
                          ...(override.darkModeOverrides?.radius ?? {}),
                      },
                      shadows: {
                          ...(base.darkModeOverrides?.shadows ?? {}),
                          ...(override.darkModeOverrides?.shadows ?? {}),
                      },
                      font: {
                          ...(base.darkModeOverrides?.font ?? {}),
                          ...(override.darkModeOverrides?.font ?? {}),
                          ...(base.darkModeOverrides?.font?.weight ||
                          override.darkModeOverrides?.font?.weight
                              ? {
                                    weight: {
                                        ...(base.darkModeOverrides?.font
                                            ?.weight ?? {}),
                                        ...(override.darkModeOverrides?.font
                                            ?.weight ?? {}),
                                    },
                                }
                              : {}),
                      },
                  }
                : undefined,
    }
}

const validateLocksAgainstParent = (
    parentConfig: BrandConfig,
    candidateConfig: BrandConfig,
    lockedPaths: TokenLockEntry[]
) => {
    const violations = validateAgainstLocks(
        parentConfig,
        candidateConfig,
        lockedPaths
    )

    if (violations.length > 0) {
        throw new ValidationError(
            `Token lock violations: ${violations
                .map(
                    (violation) =>
                        `${violation.path} (${violation.reason || 'locked by org'})`
                )
                .join(', ')}`
        )
    }
}

const getOrgInheritanceContext = async (branch: Branch) => {
    if (!branch.organizationId) {
        return null
    }

    const organization = await orgRepo.getOrganizationById(
        branch.organizationId
    )
    const resolvedParentBranchId =
        branch.parentBranchId || organization?.defaultBranchId || null
    if (!resolvedParentBranchId) {
        return null
    }

    if (resolvedParentBranchId === branch.id) {
        return null
    }

    const parentBranch = await branchRepo.getBranchById(resolvedParentBranchId)
    if (!parentBranch) {
        return null
    }

    const locks = await lockRepo.listLocks(branch.organizationId)
    const lockedPaths: TokenLockEntry[] = locks.map((lock) => ({
        path: lock.tokenPath,
        reason: lock.reason || undefined,
    }))

    return { parentBranch, lockedPaths }
}

const getOrgParentContext = async (
    organizationId: string,
    parentBranchId?: string
) => {
    const organization = await orgRepo.getOrganizationById(organizationId)
    const resolvedParentBranchId =
        parentBranchId || organization?.defaultBranchId
    if (!resolvedParentBranchId) {
        return null
    }

    const parentBranch = await branchRepo.getBranchById(resolvedParentBranchId)
    if (!parentBranch) {
        throw new NotFoundError('Parent branch')
    }

    const locks = await lockRepo.listLocks(organizationId)
    const lockedPaths: TokenLockEntry[] = locks.map((lock) => ({
        path: lock.tokenPath,
        reason: lock.reason || undefined,
    }))

    return {
        parentBranchId: resolvedParentBranchId,
        parentBranch,
        lockedPaths,
    }
}

const toOrgApprovalSettings = (
    organization: Awaited<ReturnType<typeof orgRepo.getOrganizationById>>
): OrgApprovalSettings | null => {
    if (!organization) {
        return null
    }

    return {
        defaultBranchId: organization.defaultBranchId,
        requireApprovalForMerge: organization.requireApprovalForMerge,
        requireApprovalForPublish: organization.requireApprovalForPublish,
        allowedApprovers: organization.allowedApprovers,
        minApprovals: organization.minApprovals,
        allowAdminBypass: organization.allowAdminBypass,
    }
}

const getRoleForBranchContext = async (
    branch: Branch,
    userId: string
): Promise<'admin' | 'editor' | 'viewer'> => {
    if (!branch.organizationId) {
        return branch.createdBy === userId ? 'admin' : 'viewer'
    }

    return await getOrganizationRole(branch.organizationId, userId, 'viewer')
}

export const resolveEffectiveBrandConfig = async (
    branch: Branch,
    baseConfig: BrandConfig
): Promise<BrandConfig> => {
    const inheritanceContext = await getOrgInheritanceContext(branch)
    if (!inheritanceContext) {
        return baseConfig
    }

    const inheritanceResult = resolveWithInheritance(
        inheritanceContext.parentBranch.brandConfig,
        baseConfig,
        inheritanceContext.lockedPaths
    )

    return inheritanceResult.mergedConfig
}

export const createBranch = async (
    dto: CreateBranchDTO,
    userId: string,
    userName: string,
    userEmail: string,
    organizationId?: string | null
): Promise<Branch> => {
    if (!dto.name?.trim()) {
        throw new ValidationError('Branch name is required')
    }

    let orgId: string | null = organizationId || dto.organizationId || null
    if (!orgId) {
        const membership = await userRepo.findUserMembership(userId)
        orgId = membership?.organizationId || null
    }

    const brandId = dto.brandId || dto.name.toLowerCase().replace(/\s+/g, '-')

    const defaultConfig: BrandConfig = {
        brandId,
        name: dto.name,
        version: '1.0.0',
        colors: {
            primary: {
                '50': '#EFF6FF',
                '100': '#DBEAFE',
                '200': '#BFDBFE',
                '300': '#93C5FD',
                '400': '#60A5FA',
                '500': '#3B82F6',
                '600': '#2563EB',
                '700': '#1D4ED8',
                '800': '#1E40AF',
                '900': '#1E3A8A',
                '950': '#172554',
            },
        },
        radius: {
            '6': '6px',
            '8': '8px',
            '10': '10px',
            '12': '12px',
        },
    }

    const branchConfig = mergeBrandConfig(defaultConfig, dto.brandConfig)
    let resolvedParentBranchId = dto.parentBranchId || null

    if (orgId) {
        const parentContext = await getOrgParentContext(
            orgId,
            dto.parentBranchId
        )
        if (parentContext) {
            resolvedParentBranchId = parentContext.parentBranchId
            if (parentContext.lockedPaths.length > 0) {
                validateLocksAgainstParent(
                    parentContext.parentBranch.brandConfig,
                    branchConfig,
                    parentContext.lockedPaths
                )
            }
        }
    }

    const branch = await branchRepo.createBranch({
        organizationId: orgId,
        brandId,
        name: dto.name,
        description: dto.description || null,
        parentBranchId: resolvedParentBranchId,
        status: 'draft',
        visibility: dto.visibility || 'private',
        brandConfig: branchConfig,
        createdBy: userId,
        createdByName: userName,
    })

    if (dto.tags && dto.tags.length > 0) {
        for (const tagName of dto.tags) {
            const tag = await tagRepo.createTag(tagName)
            await branchRepo.addTagToBranch(branch.id, tag.id)
        }
    }

    if (orgId) {
        await auditLogRepo.createAuditLog({
            organizationId: orgId,
            action: 'branch_created',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'branch',
            targetId: branch.id,
            metadata: {
                name: dto.name,
                brandId,
                visibility: dto.visibility || 'private',
            },
        })
    }

    return branch as unknown as Branch
}

export const getBranch = async (branchId: string): Promise<Branch> => {
    const branch = await branchRepo.getBranchById(branchId)
    if (!branch) {
        throw new NotFoundError('Branch')
    }
    return branch as unknown as Branch
}

export const listBranches = async (
    options: {
        organizationId?: string
        limit?: number
        cursor?: string
        createdBy?: string
        status?: string
        visibility?: string
        search?: string
        tag?: string
    } = {}
) => {
    return branchRepo.listBranches(options)
}

export const updateBranch = async (
    branchId: string,
    dto: UpdateBranchDTO,
    userId: string,
    userEmail: string
): Promise<Branch> => {
    const branch = await getBranch(branchId)

    const [organization, userRole] = await Promise.all([
        branch.organizationId ? orgRepo.getOrganizationById(branch.organizationId) : null,
        getRoleForBranchContext(branch, userId),
    ])

    const canUpdate = canDirectlyUpdateBranch(
        branch,
        toOrgApprovalSettings(organization),
        userId,
        userRole
    )

    if (!canUpdate) {
        const isDefaultBranch = Boolean(
            organization?.defaultBranchId && organization.defaultBranchId === branch.id
        )

        if (isDefaultBranch) {
            throw new ForbiddenError(
                'Default branch is protected. Submit a merge request instead'
            )
        }
        if (branch.isProtected) {
            throw new ForbiddenError(
                'Protected branch cannot be directly updated. Submit a merge request instead'
            )
        }
        throw new ForbiddenError('Only the creator or an admin can update this branch')
    }

    const mergedBrandConfig = dto.brandConfig
        ? mergeBrandConfig(branch.brandConfig, dto.brandConfig)
        : undefined

    // Validate against org token locks when brandConfig changes
    if (dto.brandConfig && branch.organizationId) {
        const inheritanceContext = await getOrgInheritanceContext(branch)
        if (inheritanceContext && inheritanceContext.lockedPaths.length > 0) {
            validateLocksAgainstParent(
                inheritanceContext.parentBranch.brandConfig,
                mergedBrandConfig!,
                inheritanceContext.lockedPaths
            )
        }
    }

    const updates: any = {}

    if (dto.name) updates.name = dto.name
    if (dto.description !== undefined) updates.description = dto.description
    if (dto.visibility) updates.visibility = dto.visibility

    if (mergedBrandConfig) {
        updates.brandConfig = mergedBrandConfig
    }

    const previousValues: Record<string, unknown> = {}
    const fieldsChanged = Object.keys(dto)
    if (dto.name) previousValues.name = branch.name
    if (dto.description !== undefined)
        previousValues.description = branch.description
    if (dto.visibility) previousValues.visibility = branch.visibility

    const updated = await branchRepo.updateBranch(branchId, updates)
    if (!updated) {
        throw new NotFoundError('Branch')
    }

    if (branch.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: branch.organizationId,
            action: 'branch_updated',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'branch',
            targetId: branchId,
            metadata: {
                fieldsChanged,
                previousValues,
            },
        })
    }

    return updated as unknown as Branch
}

export const deleteBranch = async (
    branchId: string,
    userId: string,
    userEmail: string
): Promise<void> => {
    const branch = await getBranch(branchId)

    if (branch.createdBy !== userId) {
        throw new ForbiddenError('Only the creator can delete this branch')
    }

    await branchRepo.softDeleteBranch(branchId)

    if (branch.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: branch.organizationId,
            action: 'branch_deleted',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'branch',
            targetId: branchId,
            metadata: {
                name: branch.name,
                brandId: branch.brandId,
                softDelete: true,
            },
        })
    }
}

export const forkBranch = async (
    sourceBranchId: string,
    newName: string,
    userId: string,
    userName: string,
    userEmail: string,
    organizationId?: string | null
): Promise<Branch> => {
    if (!newName?.trim()) {
        throw new ValidationError('New branch name is required')
    }

    const source = await branchRepo.getBranchById(sourceBranchId)
    if (!source) {
        throw new NotFoundError('Source branch')
    }

    let orgId: string | null = organizationId || null
    if (!orgId) {
        const membership = await userRepo.findUserMembership(userId)
        orgId = membership?.organizationId || null
    }

    const forked = await branchRepo.forkBranch(sourceBranchId, {
        name: newName,
        brandId: newName.toLowerCase().replace(/\s+/g, '-'),
        organizationId: orgId,
        createdBy: userId,
        createdByName: userName,
    })
    if (!forked) {
        throw new NotFoundError('Source branch')
    }

    if (orgId) {
        await auditLogRepo.createAuditLog({
            organizationId: orgId,
            action: 'branch_forked',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'branch',
            targetId: forked.id,
            metadata: {
                sourceBranchId,
                sourceBranchName: source.name,
            },
        })
    }

    return forked as unknown as Branch
}

export const publishBranch = async (
    branchId: string,
    dto: PublishBranchDTO,
    userId: string,
    userName: string,
    userEmail: string
): Promise<PublishBranchResult> => {
    const branch = await getBranch(branchId)

    const [organization, userRole] = await Promise.all([
        branch.organizationId ? orgRepo.getOrganizationById(branch.organizationId) : null,
        getRoleForBranchContext(branch, userId),
    ])

    const isCreator = branch.createdBy === userId
    const isAdmin = userRole === 'admin'
    if (!isCreator && !isAdmin) {
        throw new ForbiddenError('Only the creator or an admin can publish this branch')
    }

    if (!dto.version?.match(/^\d+\.\d+\.\d+$/)) {
        throw new ValidationError(
            'Version must be in format: x.x.x (e.g., 1.0.0)'
        )
    }

    const policy = resolvePublishApprovalPolicy(
        branch,
        toOrgApprovalSettings(organization)
    )
    const bypassAllowed = canBypassApproval(policy, userRole)

    if (policy.requireApproval && !bypassAllowed) {
        const publishRequest = await publishRequestRepo.createPublishRequest({
            organizationId: branch.organizationId,
            branchId: branch.id,
            branchName: branch.name,
            version: dto.version,
            changelog: dto.changelog,
            isBreaking: dto.isBreaking,
            isPrerelease: dto.isPrerelease,
            requestedBy: userId,
            requestedByName: userName,
        })

        if (branch.organizationId) {
            await auditLogRepo.createAuditLog({
                organizationId: branch.organizationId,
                action: 'publish_request_created',
                actorId: userId,
                actorEmail: userEmail,
                targetType: 'publish_request',
                targetId: publishRequest.id,
                metadata: {
                    branchId,
                    branchName: branch.name,
                    version: dto.version,
                },
            })
        }

        return {
            mode: 'approval_required',
            publishRequest: {
                id: publishRequest.id,
                status: publishRequest.status,
            },
        }
    }

    if (policy.requireApproval && bypassAllowed && branch.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: branch.organizationId,
            action: 'publish_request_published_admin_bypass',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'branch',
            targetId: branch.id,
            metadata: {
                branchId,
                branchName: branch.name,
                version: dto.version,
                usedAdminBypass: true,
                approvalCount: 0,
                minRequired: policy.minApprovals,
            },
        })
    }

    const version = await branchRepo.createVersion(branchId, {
        version: dto.version,
        brandConfig: branch.brandConfig,
        changelog: dto.changelog || null,
        isBreaking: dto.isBreaking || false,
        isPrerelease: dto.isPrerelease || false,
        publishedBy: userId,
        publishedByName: userName,
    })

    if (branch.organizationId) {
        await auditLogRepo.createAuditLog({
            organizationId: branch.organizationId,
            action: 'branch_published',
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'branch',
            targetId: branchId,
            metadata: {
                version: dto.version,
                isBreaking: dto.isBreaking || false,
                isPrerelease: dto.isPrerelease || false,
            },
        })
    }

    return {
        mode: 'published',
        version: version as unknown as BranchVersion,
    }
}

export const updateBranchProtection = async (
    branchId: string,
    dto: UpdateBranchProtectionDTO,
    userId: string,
    userEmail: string
): Promise<Branch> => {
    const branch = await getBranch(branchId)

    const userRole = await getRoleForBranchContext(branch, userId)
    const isAdmin = userRole === 'admin'
    if (!isAdmin) {
        throw new ForbiddenError('Only admins can update branch protection settings')
    }

    const updates: Record<string, unknown> = {}

    if (dto.isProtected !== undefined) {
        updates.isProtected = dto.isProtected
    }

    if (dto.requireApproval !== undefined) {
        updates.protectionRequireApproval = dto.requireApproval
    }

    if (dto.minApprovals !== undefined) {
        updates.protectionMinApprovals = dto.minApprovals
    }

    if (dto.allowedApproverIds !== undefined) {
        updates.protectionAllowedApprovers = dto.allowedApproverIds
            ? dto.allowedApproverIds.join(',')
            : null
    }

    if (dto.isProtected === false) {
        updates.protectionRequireApproval = null
        updates.protectionMinApprovals = null
        updates.protectionAllowedApprovers = null
    }

    const updated = await branchRepo.updateBranch(branchId, updates as any)
    if (!updated) {
        throw new NotFoundError('Branch')
    }

    if (branch.organizationId) {
        const action = dto.isProtected === true
            ? 'branch_protection_enabled'
            : dto.isProtected === false
              ? 'branch_protection_disabled'
              : 'branch_protection_updated'

        await auditLogRepo.createAuditLog({
            organizationId: branch.organizationId,
            action,
            actorId: userId,
            actorEmail: userEmail,
            targetType: 'branch',
            targetId: branch.id,
            metadata: {
                branchId: branch.id,
                isProtected: updated.isProtected,
                requireApproval: updated.protectionRequireApproval,
                minApprovals: updated.protectionMinApprovals,
                hasCustomApprovers: Boolean(updated.protectionAllowedApprovers),
            },
        })
    }

    return updated as unknown as Branch
}

export const getBranchApprovalSettings = async (
    branchId: string,
    userId: string,
    context: 'merge' | 'publish'
) => {
    const branch = await getBranch(branchId)
    const organization = branch.organizationId
        ? await orgRepo.getOrganizationById(branch.organizationId)
        : null

    const userRole = await getRoleForBranchContext(branch, userId)
    const orgSettings = toOrgApprovalSettings(organization)
    const policy =
        context === 'publish'
            ? resolvePublishApprovalPolicy(branch, orgSettings)
            : resolveMergeApprovalPolicy(branch, orgSettings)

    return {
        branchId: branch.id,
        context,
        isDefaultBranch: Boolean(
            organization?.defaultBranchId && organization.defaultBranchId === branch.id
        ),
        branch: {
            isProtected: branch.isProtected,
            protectionRequireApproval: branch.protectionRequireApproval,
            protectionMinApprovals: branch.protectionMinApprovals,
            protectionAllowedApprovers: branch.protectionAllowedApprovers,
        },
        organization: organization
            ? {
                  requireApprovalForMerge: organization.requireApprovalForMerge,
                  requireApprovalForPublish: organization.requireApprovalForPublish,
                  allowedApprovers: organization.allowedApprovers,
                  minApprovals: organization.minApprovals,
                  allowAdminBypass: organization.allowAdminBypass,
              }
            : null,
        effectivePolicy: policy,
        currentUser: {
            id: userId,
            role: userRole,
            canAdminBypass: canBypassApproval(policy, userRole),
        },
    }
}

export { canDirectlyUpdateBranch } from '@/domains/shared/approval-policy.service.js'

export const listVersions = async (branchId: string) => {
    await getBranch(branchId)
    return branchRepo.listVersions(branchId)
}

export const resolveTokens = async (
    branchId: string,
    theme: 'light' | 'dark' = 'light'
): Promise<{ branch: Branch; theme: string; brandConfig: BrandConfig }> => {
    const branch = await getBranch(branchId)
    const effectiveBrandConfig = await resolveEffectiveBrandConfig(
        branch,
        branch.brandConfig
    )

    return {
        branch,
        theme,
        brandConfig: effectiveBrandConfig,
    }
}

export const addTag = async (
    branchId: string,
    tagId: string,
    _userId: string
): Promise<void> => {
    await getBranch(branchId)
    await branchRepo.addTagToBranch(branchId, tagId)
}

export const removeTag = async (
    branchId: string,
    tagId: string,
    _userId: string
): Promise<void> => {
    await getBranch(branchId)
    await branchRepo.removeTagFromBranch(branchId, tagId)
}

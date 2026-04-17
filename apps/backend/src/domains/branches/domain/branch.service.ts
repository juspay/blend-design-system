import {
    NotFoundError,
    ValidationError,
    ForbiddenError,
} from '@/errors/AppError.js'
import type {
    Branch,
    CreateBranchDTO,
    UpdateBranchDTO,
    PublishBranchDTO,
    BrandConfig,
} from './branch.types.js'
import * as branchRepo from '../data-access/branch.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'
import * as tagRepo from '@/domains/tags/data-access/tag.repository.js'
import * as userRepo from '@/domains/users/data-access/user.repository.js'

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

    const branch = await branchRepo.createBranch({
        organizationId: orgId,
        brandId,
        name: dto.name,
        description: dto.description || null,
        parentBranchId: dto.parentBranchId || null,
        status: 'draft',
        visibility: dto.visibility || 'private',
        brandConfig: { ...defaultConfig, ...dto.brandConfig },
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

    if (branch.createdBy !== userId) {
        throw new ForbiddenError('Only the creator can update this branch')
    }

    const updates: any = {}

    if (dto.name) updates.name = dto.name
    if (dto.description !== undefined) updates.description = dto.description
    if (dto.visibility) updates.visibility = dto.visibility

    if (dto.brandConfig) {
        updates.brandConfig = {
            ...branch.brandConfig,
            ...dto.brandConfig,
            colors: {
                ...branch.brandConfig.colors,
                ...dto.brandConfig.colors,
            },
            radius: {
                ...branch.brandConfig.radius,
                ...dto.brandConfig.radius,
            },
            shadows: {
                ...branch.brandConfig.shadows,
                ...dto.brandConfig.shadows,
            },
            font: {
                ...branch.brandConfig.font,
                ...dto.brandConfig.font,
            },
        }
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
): Promise<void> => {
    const branch = await getBranch(branchId)

    if (branch.createdBy !== userId) {
        throw new ForbiddenError('Only the creator can publish this branch')
    }

    if (!dto.version?.match(/^\d+\.\d+\.\d+$/)) {
        throw new ValidationError(
            'Version must be in format: x.x.x (e.g., 1.0.0)'
        )
    }

    await branchRepo.createVersion(branchId, {
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
}

export const listVersions = async (branchId: string) => {
    await getBranch(branchId)
    return branchRepo.listVersions(branchId)
}

export const resolveTokens = async (
    branchId: string,
    theme: 'light' | 'dark' = 'light'
): Promise<{ branch: Branch; theme: string; brandConfig: BrandConfig }> => {
    const branch = await getBranch(branchId)

    return {
        branch,
        theme,
        brandConfig: branch.brandConfig as BrandConfig,
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

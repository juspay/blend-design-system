import { NotFoundError, ValidationError } from '@/errors/AppError.js'
import type {
    Branch,
    CreateBranchDTO,
    UpdateBranchDTO,
    PublishBranchDTO,
    BrandConfig,
} from './branch.types.js'
import * as branchRepo from '../data-access/branch.repository.js'

export const createBranch = async (
    dto: CreateBranchDTO,
    userId: string
): Promise<Branch> => {
    if (!dto.name?.trim()) {
        throw new ValidationError('Branch name is required')
    }

    const defaultConfig: BrandConfig = {
        brandId: dto.name.toLowerCase().replace(/\s+/g, '-'),
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

    const parentBranch = dto.parentBranch || null

    return branchRepo.createBranch({
        brandId: defaultConfig.brandId,
        name: dto.name,
        parentBranch,
        status: 'draft',
        brandConfig: { ...defaultConfig, ...dto.brandConfig },
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedVersions: 0,
    })
}

export const getBranch = async (branchId: string): Promise<Branch> => {
    const branch = await branchRepo.getBranchById(branchId)
    if (!branch) {
        throw new NotFoundError('Branch')
    }
    return branch
}

export const listBranches = async (
    options: {
        limit?: number
        cursor?: string
        createdBy?: string
    } = {}
) => {
    return branchRepo.listBranches(options)
}

export const updateBranch = async (
    branchId: string,
    dto: UpdateBranchDTO,
    userId: string
): Promise<Branch> => {
    const branch = await getBranch(branchId)

    if (branch.createdBy !== userId) {
        throw new ValidationError('Only the creator can update this branch')
    }

    const updates: Partial<Branch> = {}

    if (dto.name) {
        updates.name = dto.name
    }

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

    const updated = await branchRepo.updateBranch(branchId, updates)
    if (!updated) {
        throw new NotFoundError('Branch')
    }

    return updated
}

export const deleteBranch = async (
    branchId: string,
    userId: string
): Promise<void> => {
    const branch = await getBranch(branchId)

    if (branch.createdBy !== userId) {
        throw new ValidationError('Only the creator can delete this branch')
    }

    await branchRepo.deleteBranch(branchId)
}

export const forkBranch = async (
    sourceBranchId: string,
    newName: string,
    userId: string
): Promise<Branch> => {
    if (!newName?.trim()) {
        throw new ValidationError('New branch name is required')
    }

    const forked = await branchRepo.forkBranch(sourceBranchId, newName, userId)
    if (!forked) {
        throw new NotFoundError('Source branch')
    }

    return forked
}

export const publishBranch = async (
    branchId: string,
    dto: PublishBranchDTO,
    userId: string
): Promise<void> => {
    const branch = await getBranch(branchId)

    if (branch.createdBy !== userId) {
        throw new ValidationError('Only the creator can publish this branch')
    }

    if (!dto.version?.match(/^\d+\.\d+\.\d+$/)) {
        throw new ValidationError(
            'Version must be in format: x.x.x (e.g., 1.0.0)'
        )
    }

    await branchRepo.createVersion(branchId, {
        version: dto.version,
        brandConfig: branch.brandConfig,
        publishedBy: userId,
        publishedAt: new Date(),
        notes: dto.notes || '',
    })
}

export const listVersions = async (branchId: string) => {
    await getBranch(branchId)
    return branchRepo.listVersions(branchId)
}

export const resolveTokens = async (
    branchId: string,
    theme: 'light' | 'dark' = 'light'
): Promise<{ branch: Branch; theme: string; tokens: unknown }> => {
    const branch = await getBranch(branchId)

    // Mock token resolution until @blend-design/token-engine is fully built
    // TODO: Re-enable actual token engine when DTS issues are resolved
    // const { resolveBrandTokens } = await import('@blend-design/token-engine')
    // const componentTokens = resolveBrandTokens(branch.brandConfig, theme)

    const primaryColor =
        branch.brandConfig.colors?.primary?.['500'] ?? '#3B82F6'
    const borderRadius = branch.brandConfig.radius?.['8'] ?? '8px'

    return {
        branch,
        theme,
        tokens: {
            Button: {
                backgroundColor: primaryColor,
                color: '#FFFFFF',
            },
            Card: {
                borderRadius: borderRadius,
                backgroundColor: '#FFFFFF',
            },
            theme,
            mockData: true,
        },
    }
}

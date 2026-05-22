import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'
import type {
    BrandConfig,
    TagRow,
    BranchStatus,
    BranchVisibility,
} from '../domain/branch.types.js'

export interface BranchRow {
    id: string
    organizationId: string | null
    brandId: string
    name: string
    description: string | null
    parentBranchId: string | null
    status: BranchStatus
    visibility: BranchVisibility
    brandConfig: BrandConfig
    publishedVersions: number
    latestVersion: string | null
    isProtected: boolean
    protectionRequireApproval: boolean | null
    protectionMinApprovals: number | null
    protectionAllowedApprovers: string | null
    createdBy: string
    createdByName: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    tags?: TagRow[]
}

export interface BranchVersionRow {
    id: string
    branchId: string
    version: string
    brandConfig: BrandConfig
    changelog: string | null
    isBreaking: boolean
    isPrerelease: boolean
    publishedBy: string
    publishedByName: string
    publishedAt: Date
}

export interface BranchSnapshotRow {
    id: string
    branchId: string
    brandConfig: BrandConfig
    label: string | null
    isAutoSave: boolean
    savedBy: string
    savedByName: string
    savedAt: Date
}

export const createBranch = async (
    data: Omit<
        BranchRow,
        | 'id'
        | 'createdAt'
        | 'updatedAt'
        | 'publishedVersions'
        | 'latestVersion'
        | 'deletedAt'
        | 'isProtected'
        | 'protectionRequireApproval'
        | 'protectionMinApprovals'
        | 'protectionAllowedApprovers'
        | 'tags'
    > & { organizationId: string | null }
): Promise<BranchRow> => {
    const branch = await prisma.branch.create({
        data: {
            organizationId: data.organizationId,
            brandId: data.brandId,
            name: data.name,
            description: data.description,
            parentBranchId: data.parentBranchId,
            status: data.status || 'draft',
            visibility: data.visibility || 'private',
            brandConfig: data.brandConfig as any,
            isProtected: false,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            protectionAllowedApprovers: null,
            createdBy: data.createdBy,
            createdByName: data.createdByName,
        },
    })

    logger.info({ branchId: branch.id }, 'Branch created')
    return branch as unknown as BranchRow
}

export const getBranchById = async (
    branchId: string
): Promise<BranchRow | null> => {
    const branch = await prisma.branch.findUnique({
        where: { id: branchId, deletedAt: null },
        include: { tags: { include: { tag: true } } },
    })

    if (!branch) return null

    return {
        ...(branch as any),
        tags: branch.tags?.map((bt: any) => bt.tag) ?? [],
    } as unknown as BranchRow
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
): Promise<{ branches: BranchRow[]; nextCursor?: string }> => {
    const limit = options.limit || 20

    const where: any = { deletedAt: null }

    if (options.organizationId) where.organizationId = options.organizationId
    if (options.createdBy) where.createdBy = options.createdBy
    if (options.status) where.status = options.status
    if (options.visibility) where.visibility = options.visibility
    if (options.search) {
        where.OR = [
            { name: { contains: options.search, mode: 'insensitive' } },
            { brandId: { contains: options.search, mode: 'insensitive' } },
            { description: { contains: options.search, mode: 'insensitive' } },
        ]
    }
    if (options.tag) {
        where.tags = { some: { tag: { name: options.tag } } }
    }
    if (options.cursor) {
        where.id = { lt: options.cursor }
    }

    const branches = await prisma.branch.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit + 1,
        include: { tags: { include: { tag: true } } },
    })

    let nextCursor: string | undefined
    if (branches.length > limit) {
        nextCursor = branches[limit - 1].id
        branches.pop()
    }

    return {
        branches: branches.map((b: any) => ({
            ...b,
            tags: b.tags?.map((bt: any) => bt.tag) ?? [],
        })) as unknown as BranchRow[],
        nextCursor,
    }
}

export const updateBranch = async (
    branchId: string,
    updates: Partial<
        Pick<
            BranchRow,
            | 'name'
            | 'description'
            | 'brandConfig'
            | 'status'
            | 'visibility'
            | 'latestVersion'
            | 'isProtected'
            | 'protectionRequireApproval'
            | 'protectionMinApprovals'
            | 'protectionAllowedApprovers'
        >
    >
): Promise<BranchRow | null> => {
    const branch = await prisma.branch.update({
        where: { id: branchId },
        data: updates as any,
    })

    return branch ? (branch as unknown as BranchRow) : null
}

export const softDeleteBranch = async (branchId: string): Promise<boolean> => {
    await prisma.branch.update({
        where: { id: branchId },
        data: { deletedAt: new Date() },
    })
    logger.info({ branchId }, 'Branch soft-deleted')
    return true
}

export const forkBranch = async (
    sourceBranchId: string,
    data: {
        name: string
        brandId: string
        organizationId: string | null
        createdBy: string
        createdByName: string
        description?: string
        visibility?: BranchVisibility
    }
): Promise<BranchRow | null> => {
    const source = await getBranchById(sourceBranchId)
    if (!source) return null

    return createBranch({
        organizationId: data.organizationId,
        brandId: data.brandId,
        name: data.name,
        description: data.description || null,
        parentBranchId: sourceBranchId,
        status: 'draft',
        visibility: data.visibility || 'private',
        brandConfig: source.brandConfig,
        createdBy: data.createdBy,
        createdByName: data.createdByName,
    })
}

export const addTagToBranch = async (
    branchId: string,
    tagId: string
): Promise<void> => {
    await prisma.branchTag.upsert({
        where: { branchId_tagId: { branchId, tagId } },
        update: {},
        create: { branchId, tagId },
    })
}

export const removeTagFromBranch = async (
    branchId: string,
    tagId: string
): Promise<void> => {
    await prisma.branchTag.deleteMany({
        where: { branchId, tagId },
    })
}

export const createVersion = async (
    branchId: string,
    data: Omit<BranchVersionRow, 'id' | 'branchId' | 'publishedAt'>
): Promise<BranchVersionRow> => {
    const version = await prisma.branchVersion.create({
        data: {
            branchId,
            version: data.version,
            brandConfig: data.brandConfig as any,
            changelog: data.changelog,
            isBreaking: data.isBreaking,
            isPrerelease: data.isPrerelease,
            publishedBy: data.publishedBy,
            publishedByName: data.publishedByName,
        },
    })

    await prisma.branch.update({
        where: { id: branchId },
        data: {
            status: 'published',
            publishedVersions: { increment: 1 },
            latestVersion: data.version,
        },
    })

    logger.info({ branchId, version: data.version }, 'Branch published')
    return version as unknown as BranchVersionRow
}

export const listVersions = async (
    branchId: string,
    limit: number = 20
): Promise<BranchVersionRow[]> => {
    const versions = await prisma.branchVersion.findMany({
        where: { branchId },
        orderBy: { publishedAt: 'desc' },
        take: limit,
    })

    return versions as unknown as BranchVersionRow[]
}

export const getVersion = async (
    branchId: string,
    versionId: string
): Promise<BranchVersionRow | null> => {
    const version = await prisma.branchVersion.findFirst({
        where: { id: versionId, branchId },
    })

    return version ? (version as unknown as BranchVersionRow) : null
}

export const getVersionByNumber = async (
    branchId: string,
    versionNumber: string
): Promise<BranchVersionRow | null> => {
    const version = await prisma.branchVersion.findUnique({
        where: { branchId_version: { branchId, version: versionNumber } },
    })

    return version ? (version as unknown as BranchVersionRow) : null
}

export const createSnapshot = async (
    branchId: string,
    data: Omit<BranchSnapshotRow, 'id' | 'branchId' | 'savedAt'>
): Promise<BranchSnapshotRow> => {
    const snapshot = await prisma.branchSnapshot.create({
        data: {
            branchId,
            brandConfig: data.brandConfig as any,
            label: data.label,
            isAutoSave: data.isAutoSave,
            savedBy: data.savedBy,
            savedByName: data.savedByName,
        },
    })

    return snapshot as unknown as BranchSnapshotRow
}

export const listSnapshots = async (
    branchId: string,
    limit: number = 20
): Promise<BranchSnapshotRow[]> => {
    const snapshots = await prisma.branchSnapshot.findMany({
        where: { branchId },
        orderBy: { savedAt: 'desc' },
        take: limit,
    })

    return snapshots as unknown as BranchSnapshotRow[]
}

export const getLatestSnapshot = async (
    branchId: string
): Promise<BranchSnapshotRow | null> => {
    const snapshot = await prisma.branchSnapshot.findFirst({
        where: { branchId },
        orderBy: { savedAt: 'desc' },
    })

    return snapshot ? (snapshot as unknown as BranchSnapshotRow) : null
}

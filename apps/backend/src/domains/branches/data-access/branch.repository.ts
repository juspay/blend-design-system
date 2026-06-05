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
    branchSlug: string
    name: string
    description: string | null
    parentBranchId: string | null
    status: BranchStatus
    visibility: BranchVisibility
    tokenConfig: BrandConfig
    publishedVersions: number
    latestVersion: string | null
    isProtected: boolean
    protectionRequireApproval: boolean | null
    protectionMinApprovals: number | null
    protectionApproverIds: string[]
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
    tokenConfig: BrandConfig
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
    tokenConfig: BrandConfig
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
        | 'protectionApproverIds'
        | 'tags'
    > & { organizationId: string | null }
): Promise<BranchRow> => {
    const branch = await prisma.branch.create({
        data: {
            organizationId: data.organizationId,
            branchSlug: data.branchSlug,
            name: data.name,
            description: data.description,
            parentBranchId: data.parentBranchId,
            status: data.status || 'draft',
            visibility: data.visibility || 'private',
            tokenConfig: data.tokenConfig as any,
            isProtected: false,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            createdBy: data.createdBy,
            createdByName: data.createdByName,
        },
        include: { protectionApprovers: true },
    })

    logger.info({ branchId: branch.id }, 'Branch created')
    return {
        ...(branch as any),
        protectionApproverIds:
            branch.protectionApprovers?.map((entry: any) => entry.userId) ?? [],
    } as unknown as BranchRow
}

export const getBranchById = async (
    branchId: string
): Promise<BranchRow | null> => {
    const branch = await prisma.branch.findUnique({
        where: { id: branchId, deletedAt: null },
        include: {
            tags: { include: { tag: true } },
            protectionApprovers: true,
        },
    })

    if (!branch) return null

    return {
        ...(branch as any),
        tags: branch.tags?.map((bt: any) => bt.tag) ?? [],
        protectionApproverIds:
            branch.protectionApprovers?.map((entry: any) => entry.userId) ?? [],
    } as unknown as BranchRow
}

export const listBranches = async (
    options: {
        organizationId?: string
        limit?: number
        cursor?: string
        createdBy?: string
        status?: BranchStatus
        visibility?: BranchVisibility
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
            { branchSlug: { contains: options.search, mode: 'insensitive' } },
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
        include: {
            tags: { include: { tag: true } },
            protectionApprovers: true,
        },
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
            protectionApproverIds:
                b.protectionApprovers?.map((entry: any) => entry.userId) ?? [],
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
            | 'tokenConfig'
            | 'status'
            | 'visibility'
            | 'latestVersion'
            | 'isProtected'
            | 'protectionRequireApproval'
            | 'protectionMinApprovals'
        >
    >
): Promise<BranchRow | null> => {
    const branch = await prisma.branch.update({
        where: { id: branchId },
        data: updates as any,
        include: { protectionApprovers: true },
    })

    return branch
        ? ({
              ...(branch as any),
              protectionApproverIds:
                  branch.protectionApprovers?.map(
                      (entry: any) => entry.userId
                  ) ?? [],
          } as unknown as BranchRow)
        : null
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
        branchSlug: string
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
        branchSlug: data.branchSlug,
        name: data.name,
        description: data.description || null,
        parentBranchId: sourceBranchId,
        status: 'draft',
        visibility: data.visibility || 'private',
        tokenConfig: source.tokenConfig,
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
            tokenConfig: data.tokenConfig as any,
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
            tokenConfig: data.tokenConfig as any,
            label: data.label,
            isAutoSave: data.isAutoSave,
            savedBy: data.savedBy,
            savedByName: data.savedByName,
        },
    })

    return snapshot as unknown as BranchSnapshotRow
}

export const setProtectionApproverIds = async (
    branchId: string,
    userIds: string[]
): Promise<void> => {
    await prisma.$transaction([
        prisma.branchProtectionApprover.deleteMany({ where: { branchId } }),
        ...(userIds.length > 0
            ? [
                  prisma.branchProtectionApprover.createMany({
                      data: userIds.map((userId) => ({
                          branchId,
                          userId,
                      })),
                  }),
              ]
            : []),
    ])
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

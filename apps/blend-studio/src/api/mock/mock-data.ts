import type {
    Branch,
    Version,
    Snapshot,
    BrandConfig,
    CreateBranchInput,
    BranchListFilters,
    BranchListResult,
} from '@juspay/blend-design-system/tokens'
import {
    branches as MOCK_BRANCHES,
    versions as MOCK_VERSIONS,
    snapshots as MOCK_SNAPSHOTS,
} from './fixtures'

let branchCounter = MOCK_BRANCHES.length + 1

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const mockApi = {
    listBranches: async (
        filters?: BranchListFilters
    ): Promise<BranchListResult> => {
        await delay(500)
        let result = [...MOCK_BRANCHES]

        if (filters?.status)
            result = result.filter((b) => b.status === filters.status)
        if (filters?.search) {
            const q = filters.search.toLowerCase()
            result = result.filter(
                (b) =>
                    b.name.toLowerCase().includes(q) ||
                    b.id.toLowerCase().includes(q)
            )
        }
        if (filters?.tags?.length)
            result = result.filter((b) =>
                filters.tags!.some((tag) => b.tags?.includes(tag))
            )
        if (filters?.owner)
            result = result.filter((b) => b.createdBy === filters.owner)

        return { branches: result, total: result.length, hasMore: false }
    },

    getBranch: async (branchId: string): Promise<Branch | null> => {
        await delay(300)
        return MOCK_BRANCHES.find((b) => b.id === branchId) || null
    },

    createBranch: async (input: CreateBranchInput): Promise<Branch> => {
        await delay(800)
        const newBranch: Branch = {
            id: `${input.brandId}/${input.slug || `branch-${branchCounter}`}`,
            brandId: input.brandId,
            name: input.name,
            slug: input.slug || `branch-${branchCounter++}`,
            description: input.description || '',
            status: 'draft',
            visibility: input.visibility || 'private',
            brandConfig: (input.brandConfig as BrandConfig) || {
                brandId: input.brandId,
                name: input.name,
                version: '0.1.0',
                colors: {},
            },
            parentBranch: input.parentBranch || null,
            forkedFrom: input.forkFrom || null,
            owner: {
                uid: 'current-user',
                email: 'vinit.khandal@juspay.in',
                displayName: 'Vinit Khandal',
            },
            meta: {
                createdByName: 'Vinit Khandal',
                createdByEmail: 'vinit.khandal@juspay.in',
            },
            tags: input.tags || [],
            clientName: input.clientName,
            projectName: input.projectName,
            latestVersion: null,
            publishedCount: 0,
            snapshotCount: 0,
            createdBy: 'current-user',
            createdAt: new Date(),
            updatedAt: new Date(),
            lastEditedBy: 'current-user',
            lastPublishedAt: null,
            lastPublishedBy: null,
            isLocked: false,
            lockedBy: null,
            lockedAt: null,
        }
        MOCK_BRANCHES.push(newBranch)
        return newBranch
    },

    updateBranch: async (
        branchId: string,
        updates: {
            brandConfig?: BrandConfig
            name?: string
            description?: string
        }
    ): Promise<Branch> => {
        await delay(600)
        const branch = MOCK_BRANCHES.find((b) => b.id === branchId)
        if (!branch) throw new Error(`Branch ${branchId} not found`)
        if (updates.brandConfig) branch.brandConfig = updates.brandConfig
        if (updates.name !== undefined) branch.name = updates.name
        if (updates.description !== undefined)
            branch.description = updates.description
        branch.updatedAt = new Date()
        return branch
    },

    listVersions: async (branchId: string): Promise<Version[]> => {
        await delay(400)
        return MOCK_VERSIONS.get(branchId) || []
    },

    publishVersion: async (
        branchId: string,
        input: {
            version: string
            brandConfig: BrandConfig
            changelog?: string
            isBreaking?: boolean
            isPrerelease?: boolean
        }
    ): Promise<Version> => {
        await delay(1000)
        const branch = MOCK_BRANCHES.find((b) => b.id === branchId)
        if (!branch) throw new Error(`Branch ${branchId} not found`)

        const newVersion: Version = {
            id: input.version,
            branchId,
            version: input.version,
            brandConfig: input.brandConfig,
            changelog: input.changelog || '',
            isBreaking: input.isBreaking || false,
            isPrerelease: input.isPrerelease || false,
            publishedBy: 'current-user',
            publishedByName: 'Current User',
            publishedAt: new Date(),
            downloadCount: 0,
            lastDownloadedAt: null,
            parentVersion: branch.latestVersion,
        }

        const existing = MOCK_VERSIONS.get(branchId) || []
        existing.unshift(newVersion)
        MOCK_VERSIONS.set(branchId, existing)

        branch.latestVersion = input.version
        branch.publishedCount++
        branch.lastPublishedAt = new Date()
        branch.lastPublishedBy = 'current-user'
        branch.updatedAt = new Date()
        branch.status = 'published'

        return newVersion
    },

    listSnapshots: async (branchId: string): Promise<Snapshot[]> => {
        await delay(350)
        return MOCK_SNAPSHOTS.get(branchId) || []
    },

    deleteBranch: async (branchId: string): Promise<void> => {
        await delay(600)
        const idx = MOCK_BRANCHES.findIndex((b) => b.id === branchId)
        if (idx !== -1) MOCK_BRANCHES.splice(idx, 1)
    },

    forkBranch: async (
        sourceBranchId: string,
        newName: string,
        newSlug: string
    ): Promise<Branch> => {
        await delay(800)
        const source = MOCK_BRANCHES.find((b) => b.id === sourceBranchId)
        if (!source) throw new Error(`Branch ${sourceBranchId} not found`)
        const newBranch: Branch = {
            ...source,
            id: `${source.brandId}/${newSlug}`,
            slug: newSlug,
            name: newName,
            status: 'draft',
            latestVersion: null,
            publishedCount: 0,
            snapshotCount: 0,
            forkedFrom: { branchId: source.id, name: source.name },
            parentBranch: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastPublishedAt: null,
            lastPublishedBy: null,
        }
        MOCK_BRANCHES.push(newBranch)
        return newBranch
    },

    createSnapshot: async (
        branchId: string,
        brandConfig: BrandConfig,
        label?: string,
        isAutoSave = true
    ): Promise<Snapshot> => {
        await delay(500)
        const snapshot: Snapshot = {
            id: `snapshot_${Date.now()}`,
            branchId,
            brandConfig,
            savedBy: 'current-user',
            savedByName: 'Current User',
            savedAt: new Date(),
            label: label || (isAutoSave ? 'Auto-saved' : 'Manual save'),
            isAutoSave,
        }
        const existing = MOCK_SNAPSHOTS.get(branchId) || []
        existing.unshift(snapshot)
        MOCK_SNAPSHOTS.set(branchId, existing)

        const branch = MOCK_BRANCHES.find((b) => b.id === branchId)
        if (branch) branch.snapshotCount = existing.length

        return snapshot
    },
}

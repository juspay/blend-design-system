import type {
    Branch,
    Version,
    Snapshot,
    BrandConfig,
    CreateBranchInput,
    BranchListFilters,
    BranchListResult,
    BranchStatus,
} from '@blend-design/token-engine'

const MOCK_BRANCHES: Branch[] = [
    {
        id: 'hdfc/retail',
        brandId: 'hdfc',
        name: 'HDFC Retail',
        slug: 'retail',
        description: 'Retail banking theme for HDFC Bank',
        status: 'published' as BranchStatus,
        visibility: 'team',
        brandConfig: {
            brandId: 'hdfc-retail',
            name: 'HDFC Retail',
            version: '2.1.0',
            colors: {
                primary: {
                    '50': '#EFF6FF',
                    '100': '#DBEAFE',
                    '200': '#BFDBFE',
                    '300': '#93C5FD',
                    '400': '#60A5FA',
                    '500': '#0047AB',
                    '600': '#003D94',
                    '700': '#00327A',
                    '800': '#002960',
                    '900': '#001F4D',
                    '950': '#001433',
                },
                gray: {
                    '50': '#F9FAFB',
                    '100': '#F3F4F6',
                    '200': '#E5E7EB',
                    '300': '#D1D5DB',
                    '400': '#9CA3AF',
                    '500': '#6B7280',
                    '600': '#4B5563',
                    '700': '#374151',
                    '800': '#1F2937',
                    '900': '#111827',
                    '950': '#030712',
                },
                red: {
                    '500': '#EF4444',
                },
                green: {
                    '500': '#10B981',
                },
            },
            font: {
                family: 'Inter',
            },
            radius: {
                '6': '6px',
                '8': '8px',
            },
        },
        parentBranch: null,
        forkedFrom: null,
        owner: {
            uid: 'mock-user-1',
            email: 'design@hdfc.com',
            displayName: 'Design Team',
        },
        meta: {
            createdByName: 'Admin',
            createdByEmail: 'admin@hdfc.com',
            clientName: 'HDFC Bank',
            projectName: 'Digital Banking Platform',
        },
        tags: ['banking', 'retail', 'production'],
        latestVersion: '2.1.0',
        publishedCount: 12,
        snapshotCount: 45,
        createdBy: 'mock-user-1',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-20'),
        lastEditedBy: 'mock-user-1',
        lastPublishedAt: new Date('2024-03-20'),
        lastPublishedBy: 'mock-user-1',
        isLocked: false,
        lockedBy: null,
        lockedAt: null,
    },
    {
        id: 'hdfc/corporate',
        brandId: 'hdfc',
        name: 'HDFC Corporate',
        slug: 'corporate',
        description: 'Corporate banking theme',
        status: 'draft' as BranchStatus,
        visibility: 'private',
        brandConfig: {
            brandId: 'hdfc-corporate',
            name: 'HDFC Corporate',
            version: '1.0.0-beta',
            colors: {
                primary: {
                    '50': '#F5F3FF',
                    '100': '#EDE9FE',
                    '200': '#DDD6FE',
                    '300': '#C4B5FD',
                    '400': '#A78BFA',
                    '500': '#5B21B6',
                    '600': '#4C1D95',
                    '700': '#3C1670',
                    '800': '#2D1050',
                    '900': '#1E0930',
                    '950': '#0F0415',
                },
                gray: {
                    '50': '#F9FAFB',
                    '100': '#F3F4F6',
                    '200': '#E5E7EB',
                    '300': '#D1D5DB',
                    '400': '#9CA3AF',
                    '500': '#6B7280',
                    '600': '#4B5563',
                    '700': '#374151',
                    '800': '#1F2937',
                    '900': '#111827',
                    '950': '#030712',
                },
                red: {
                    '500': '#DC2626',
                },
                green: {
                    '500': '#059669',
                },
            },
            font: {
                family: 'Roboto',
            },
            radius: {
                '6': '6px',
                '8': '4px',
            },
        },
        parentBranch: {
            branchId: 'hdfc/retail',
            name: 'HDFC Retail',
            version: '2.0.0',
        },
        forkedFrom: null,
        owner: {
            uid: 'mock-user-2',
            email: 'corporate@hdfc.com',
            displayName: 'Corporate Design',
        },
        meta: {
            createdByName: 'John Doe',
            createdByEmail: 'john@hdfc.com',
            clientName: 'HDFC Bank',
            projectName: 'Corporate Portal',
        },
        tags: ['banking', 'corporate', 'wip'],
        latestVersion: null,
        publishedCount: 0,
        snapshotCount: 23,
        createdBy: 'mock-user-2',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-18'),
        lastEditedBy: 'mock-user-2',
        lastPublishedAt: null,
        lastPublishedBy: null,
        isLocked: false,
        lockedBy: null,
        lockedAt: null,
    },
    {
        id: 'acme/light',
        brandId: 'acme',
        name: 'Acme Light',
        slug: 'light',
        description: 'Light theme for Acme Corp',
        status: 'published' as BranchStatus,
        visibility: 'public',
        brandConfig: {
            brandId: 'acme-light',
            name: 'Acme Light',
            version: '1.2.0',
            colors: {
                primary: {
                    '50': '#FFF7ED',
                    '100': '#FFEDD5',
                    '200': '#FED7AA',
                    '300': '#FDBA74',
                    '400': '#FB923C',
                    '500': '#EA580C',
                    '600': '#C2410C',
                    '700': '#9A3412',
                    '800': '#7C2D12',
                    '900': '#5D2408',
                    '950': '#3D1604',
                },
                gray: {
                    '50': '#F9FAFB',
                    '100': '#F3F4F6',
                    '200': '#E5E7EB',
                    '300': '#D1D5DB',
                    '400': '#9CA3AF',
                    '500': '#6B7280',
                    '600': '#4B5563',
                    '700': '#374151',
                    '800': '#1F2937',
                    '900': '#111827',
                    '950': '#030712',
                },
                red: {
                    '500': '#B91C1C',
                },
                green: {
                    '500': '#15803D',
                },
            },
            font: {
                family: 'Open Sans',
            },
            radius: {
                '6': '6px',
                '8': '16px',
            },
        },
        parentBranch: null,
        forkedFrom: null,
        owner: {
            uid: 'mock-user-3',
            email: 'hello@acme.com',
            displayName: 'Acme Team',
        },
        meta: {
            createdByName: 'Jane Smith',
            createdByEmail: 'jane@acme.com',
            clientName: 'Acme Corp',
            projectName: 'Public Website',
        },
        tags: ['ecommerce', 'public', 'featured'],
        latestVersion: '1.2.0',
        publishedCount: 5,
        snapshotCount: 18,
        createdBy: 'mock-user-3',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-03-15'),
        lastEditedBy: 'mock-user-3',
        lastPublishedAt: new Date('2024-03-15'),
        lastPublishedBy: 'mock-user-3',
        isLocked: false,
        lockedBy: null,
        lockedAt: null,
    },
]

const MOCK_VERSIONS: Map<string, Version[]> = new Map([
    [
        'hdfc/retail',
        [
            {
                id: '2.1.0',
                branchId: 'hdfc/retail',
                version: '2.1.0',
                brandConfig: MOCK_BRANCHES[0].brandConfig,
                changelog: 'Updated primary color, improved contrast ratios',
                isBreaking: false,
                isPrerelease: false,
                publishedBy: 'mock-user-1',
                publishedByName: 'Design Team',
                publishedAt: new Date('2024-03-20'),
                downloadCount: 1247,
                lastDownloadedAt: new Date('2024-03-25'),
                parentVersion: '2.0.5',
            },
            {
                id: '2.0.5',
                branchId: 'hdfc/retail',
                version: '2.0.5',
                brandConfig: MOCK_BRANCHES[0].brandConfig,
                changelog: 'Bug fixes for dark mode',
                isBreaking: false,
                isPrerelease: false,
                publishedBy: 'mock-user-1',
                publishedByName: 'Design Team',
                publishedAt: new Date('2024-03-10'),
                downloadCount: 892,
                lastDownloadedAt: new Date('2024-03-20'),
                parentVersion: '2.0.4',
            },
        ],
    ],
])

const MOCK_SNAPSHOTS: Map<string, Snapshot[]> = new Map([
    [
        'hdfc/retail',
        [
            {
                id: 'snapshot_1711000000000',
                branchId: 'hdfc/retail',
                brandConfig: MOCK_BRANCHES[0].brandConfig,
                savedBy: 'mock-user-1',
                savedByName: 'Design Team',
                savedAt: new Date('2024-03-21T10:00:00Z'),
                label: 'Before color change',
                isAutoSave: false,
            },
        ],
    ],
])

let branchCounter = MOCK_BRANCHES.length + 1

export const mockApi = {
    listBranches: async (
        filters?: BranchListFilters
    ): Promise<BranchListResult> => {
        await delay(500)

        let branches = [...MOCK_BRANCHES]

        if (filters?.status) {
            branches = branches.filter((b) => b.status === filters.status)
        }

        if (filters?.search) {
            const q = filters.search.toLowerCase()
            branches = branches.filter(
                (b) =>
                    b.name.toLowerCase().includes(q) ||
                    b.id.toLowerCase().includes(q)
            )
        }

        if (filters?.tags?.length) {
            branches = branches.filter((b) =>
                filters.tags!.some((tag) => b.tags?.includes(tag))
            )
        }

        if (filters?.owner) {
            branches = branches.filter((b) => b.createdBy === filters.owner)
        }

        return {
            branches,
            total: branches.length,
            hasMore: false,
        }
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
                email: 'user@example.com',
                displayName: 'Current User',
            },
            meta: {
                createdByName: 'Current User',
                createdByEmail: 'user@example.com',
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
        if (!branch) {
            throw new Error(`Branch ${branchId} not found`)
        }

        if (updates.brandConfig) {
            branch.brandConfig = updates.brandConfig
        }
        if (updates.name !== undefined) {
            branch.name = updates.name
        }
        if (updates.description !== undefined) {
            branch.description = updates.description
        }

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
        if (!branch) {
            throw new Error(`Branch ${branchId} not found`)
        }

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

        const versions = MOCK_VERSIONS.get(branchId) || []
        versions.unshift(newVersion)
        MOCK_VERSIONS.set(branchId, versions)

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

        const snapshots = MOCK_SNAPSHOTS.get(branchId) || []
        snapshots.unshift(snapshot)
        MOCK_SNAPSHOTS.set(branchId, snapshots)

        const branch = MOCK_BRANCHES.find((b) => b.id === branchId)
        if (branch) {
            branch.snapshotCount = snapshots.length
        }

        return snapshot
    },
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

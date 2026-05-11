/**
 * Mock Governance Layer — Organizations, Token Locks, Merge Requests
 *
 * Provides in-memory mock data for governance features so they can
 * be tested in demo mode without a running backend.
 */

import { mockUserStore } from '@/lib/mock-user'

// ---------------------------------------------------------------------------
// Types (matching backend.ts response shapes)
// ---------------------------------------------------------------------------

export interface MockOrganization {
    id: string
    name: string
    slug: string
    defaultBranchId: string | null
    blendVersion: string | null
    wcagEnforcement: 'none' | 'warn' | 'block'
    createdAt: string
    updatedAt: string
}

export interface MockTokenLock {
    id: string
    organizationId: string
    tokenPath: string
    reason: string | null
    lockedBy: string
    createdAt: string
}

export interface MockMergeRequest {
    id: string
    organizationId: string
    sourceBranchId: string
    sourceBranchName: string
    targetBranchId: string
    targetBranchName: string
    title: string
    description: string | null
    status: 'pending' | 'approved' | 'rejected' | 'merged' | 'cancelled'
    diff: unknown
    lockViolations: unknown
    requestedBy: string
    reviewedBy: string | null
    reviewedAt: string | null
    reviewComment: string | null
    mergedAt: string | null
    createdAt: string
    updatedAt: string
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

let lockCounter = 0
let mrCounter = 0

const ORG: MockOrganization = {
    id: 'mock-org-001',
    name: 'Demo Organization',
    slug: 'demo-org',
    defaultBranchId: 'demo/default',
    blendVersion: '0.2.43',
    wcagEnforcement: 'warn',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
}

const LOCKS: MockTokenLock[] = [
    {
        id: 'lock-1',
        organizationId: 'mock-org-001',
        tokenPath: 'colors.primary.500',
        reason: 'Brand primary must remain consistent across all products',
        lockedBy: 'mock-user-owner',
        createdAt: '2025-06-01T10:00:00Z',
    },
    {
        id: 'lock-2',
        organizationId: 'mock-org-001',
        tokenPath: 'font.family',
        reason: 'Typography is standardized org-wide',
        lockedBy: 'mock-user-admin',
        createdAt: '2025-06-15T14:30:00Z',
    },
]

const MERGE_REQUESTS: MockMergeRequest[] = [
    {
        id: 'mr-1',
        organizationId: 'mock-org-001',
        sourceBranchId: 'demo/retail',
        sourceBranchName: 'Retail App',
        targetBranchId: 'demo/default',
        targetBranchName: 'Master Theme',
        title: 'Update retail button colors',
        description:
            'Changed button primary color to match new retail brand guidelines.',
        status: 'pending',
        diff: { changes: 3 },
        lockViolations: null,
        requestedBy: 'mock-user-editor',
        reviewedBy: null,
        reviewedAt: null,
        reviewComment: null,
        mergedAt: null,
        createdAt: '2025-07-10T09:00:00Z',
        updatedAt: '2025-07-10T09:00:00Z',
    },
]

// ---------------------------------------------------------------------------
// Mock API
// ---------------------------------------------------------------------------

export const mockGovernanceApi = {
    // Organization
    getOrganization: async (_orgId: string): Promise<MockOrganization> => {
        await delay(300)
        return { ...ORG }
    },

    updateOrganization: async (
        _orgId: string,
        updates: Partial<MockOrganization>
    ): Promise<MockOrganization> => {
        await delay(400)
        Object.assign(ORG, updates, { updatedAt: new Date().toISOString() })
        return { ...ORG }
    },

    // Token Locks
    listTokenLocks: async (_orgId: string): Promise<MockTokenLock[]> => {
        await delay(300)
        return [...LOCKS]
    },

    lockToken: async (
        _orgId: string,
        tokenPath: string,
        reason?: string
    ): Promise<MockTokenLock> => {
        await delay(400)
        const user = mockUserStore.getUser()
        const lock: MockTokenLock = {
            id: `lock-${++lockCounter}`,
            organizationId: 'mock-org-001',
            tokenPath,
            reason: reason || null,
            lockedBy: user.id,
            createdAt: new Date().toISOString(),
        }
        LOCKS.push(lock)
        return lock
    },

    unlockToken: async (_orgId: string, tokenPath: string): Promise<void> => {
        await delay(300)
        const idx = LOCKS.findIndex((l) => l.tokenPath === tokenPath)
        if (idx !== -1) LOCKS.splice(idx, 1)
    },

    // Merge Requests
    listMergeRequests: async (options?: {
        status?: string
    }): Promise<{ mergeRequests: MockMergeRequest[] }> => {
        await delay(300)
        let results = [...MERGE_REQUESTS]
        if (options?.status) {
            results = results.filter((mr) => mr.status === options.status)
        }
        return { mergeRequests: results }
    },

    getMergeRequest: async (mrId: string): Promise<MockMergeRequest | null> => {
        await delay(200)
        return MERGE_REQUESTS.find((mr) => mr.id === mrId) ?? null
    },

    createMergeRequest: async (input: {
        sourceBranchId: string
        targetBranchId: string
        title: string
        description?: string
    }): Promise<MockMergeRequest> => {
        await delay(500)
        const user = mockUserStore.getUser()
        const mr: MockMergeRequest = {
            id: `mr-${++mrCounter}`,
            organizationId: 'mock-org-001',
            sourceBranchId: input.sourceBranchId,
            sourceBranchName: input.sourceBranchId.split('/').pop() || '',
            targetBranchId: input.targetBranchId,
            targetBranchName: 'Master Theme',
            title: input.title,
            description: input.description || null,
            status: 'pending',
            diff: { changes: 0 },
            lockViolations: null,
            requestedBy: user.id,
            reviewedBy: null,
            reviewedAt: null,
            reviewComment: null,
            mergedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        MERGE_REQUESTS.push(mr)
        return mr
    },

    approveMergeRequest: async (
        mrId: string,
        reviewComment?: string
    ): Promise<MockMergeRequest> => {
        await delay(400)
        const mr = MERGE_REQUESTS.find((m) => m.id === mrId)
        if (!mr) throw new Error(`MR ${mrId} not found`)
        const user = mockUserStore.getUser()
        mr.status = 'approved'
        mr.reviewedBy = user.id
        mr.reviewedAt = new Date().toISOString()
        mr.reviewComment = reviewComment || null
        mr.updatedAt = new Date().toISOString()
        return { ...mr }
    },

    rejectMergeRequest: async (
        mrId: string,
        reviewComment?: string
    ): Promise<MockMergeRequest> => {
        await delay(400)
        const mr = MERGE_REQUESTS.find((m) => m.id === mrId)
        if (!mr) throw new Error(`MR ${mrId} not found`)
        const user = mockUserStore.getUser()
        mr.status = 'rejected'
        mr.reviewedBy = user.id
        mr.reviewedAt = new Date().toISOString()
        mr.reviewComment = reviewComment || null
        mr.updatedAt = new Date().toISOString()
        return { ...mr }
    },

    mergeMergeRequest: async (mrId: string): Promise<MockMergeRequest> => {
        await delay(500)
        const mr = MERGE_REQUESTS.find((m) => m.id === mrId)
        if (!mr) throw new Error(`MR ${mrId} not found`)
        mr.status = 'merged'
        mr.mergedAt = new Date().toISOString()
        mr.updatedAt = new Date().toISOString()
        return { ...mr }
    },

    cancelMergeRequest: async (mrId: string): Promise<MockMergeRequest> => {
        await delay(300)
        const mr = MERGE_REQUESTS.find((m) => m.id === mrId)
        if (!mr) throw new Error(`MR ${mrId} not found`)
        mr.status = 'cancelled'
        mr.updatedAt = new Date().toISOString()
        return { ...mr }
    },
}

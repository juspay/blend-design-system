/**
 * Backend API Client
 *
 * Typed HTTP client for communicating with the Blend Studio backend API.
 * All responses follow a consistent envelope format:
 *   { success: true, data: { ... } }
 *   { success: false, error: { message: string, code?: string } }
 */

import { featureFlags } from '@/lib/feature-flags'
import { fetchWithCsrf } from '@/lib/csrf'
import {
    mapBackendBranchToStudioBranch,
    mapBackendSnapshotToStudioSnapshot,
    mapBackendVersionToStudioVersion,
    type BackendBranchRow,
    type BackendSnapshotRow,
    type BackendVersionRow,
} from '@/api/backend-branch-mapper'
import {
    generateBranchId,
    type Branch,
    type BrandConfig,
    type CreateBranchInput,
    type Snapshot,
    type Version,
} from '@juspay/blend-design-system/tokens'

// ---------------------------------------------------------------------------
// Error Class
// ---------------------------------------------------------------------------

/**
 * Structured error from the backend API.
 * Includes HTTP status code and optional error code for programmatic handling.
 */
export class BackendApiError extends Error {
    constructor(
        public readonly statusCode: number,
        message: string,
        public readonly code?: string
    ) {
        super(message)
        this.name = 'BackendApiError'
    }
}

const COOKIE_SESSION_TOKEN = '__cookie_session__'

// ---------------------------------------------------------------------------
// API Response Types
// ---------------------------------------------------------------------------

/** Standard successful API response wrapper. */
interface ApiSuccessResponse<T> {
    success: true
    data: T
}

/** Standard error API response wrapper. */
interface ApiErrorResponse {
    success: false
    error: {
        message: string
        code?: string
    }
}

/** Union type for all API responses. */
type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

// ---------------------------------------------------------------------------
// Response Payload Types
// ---------------------------------------------------------------------------

interface BranchResponse {
    branch: BackendBranchRow
}

interface BranchListResponse {
    branches: BackendBranchRow[]
    nextCursor?: string
}

interface ResolveTokensResponse {
    branchId: string
    brandConfig: BrandConfig
    theme: string
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

/**
 * Make an authenticated API request.
 * Automatically adds auth headers and parses JSON response.
 */
async function fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit,
    token: string
): Promise<T> {
    const flags = featureFlags.get()
    const baseUrl = flags.apiBaseUrl || ''

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string> | undefined) ?? {}),
    }
    const hasBearerToken = Boolean(token) && token !== COOKIE_SESSION_TOKEN
    if (hasBearerToken) {
        headers.Authorization = `Bearer ${token}`
    }

    const response = await fetchWithCsrf(baseUrl, endpoint, {
        ...options,
        headers,
    })

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        throw new BackendApiError(
            response.status,
            errorBody?.error?.message || `HTTP ${response.status}`,
            errorBody?.error?.code
        )
    }

    const data = (await response.json()) as ApiResponse<T>

    if (!data.success) {
        throw new BackendApiError(
            response.status,
            (data as ApiErrorResponse).error?.message || 'Unknown error',
            (data as ApiErrorResponse).error?.code
        )
    }

    return (data as ApiSuccessResponse<T>).data
}

// ---------------------------------------------------------------------------
// Branch CRUD
// ---------------------------------------------------------------------------

function resolveBranchSlug(input: CreateBranchInput): string {
    const slug =
        input.slug?.trim() ||
        input.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    return generateBranchId(input.brandId, slug)
}

/** Create a new branch. */
export async function createBranchBackend(
    token: string,
    input: CreateBranchInput,
    organizationId?: string
): Promise<Branch> {
    const branchSlug = resolveBranchSlug(input)
    const tokenConfig = input.brandConfig
        ? {
              ...input.brandConfig,
              brandId: branchSlug,
              name: input.name,
          }
        : undefined

    const data = await fetchWithAuth<BranchResponse>(
        '/api/branches',
        {
            method: 'POST',
            body: JSON.stringify({
                branchSlug,
                name: input.name,
                slug: input.slug,
                description: input.description,
                visibility: input.visibility,
                tokenConfig,
                parentBranchId:
                    input.parentBranch?.branchId ||
                    input.forkFrom?.branchId ||
                    undefined,
                tags: input.tags,
                clientName: input.clientName,
                projectName: input.projectName,
                organizationId,
            }),
        },
        token
    )
    return mapBackendBranchToStudioBranch(data.branch)
}

/** List all branches with optional pagination. */
export async function listBranchesBackend(
    token: string,
    options?: {
        limit?: number
        cursor?: string
        createdBy?: string
        organizationId?: string
    }
): Promise<{ branches: Branch[]; nextCursor?: string }> {
    const params = new URLSearchParams()
    if (options?.limit) params.append('limit', String(options.limit))
    if (options?.cursor) params.append('cursor', options.cursor)
    if (options?.createdBy) params.append('createdBy', options.createdBy)
    if (options?.organizationId)
        params.append('organizationId', options.organizationId)

    const query = params.toString() ? `?${params.toString()}` : ''

    const data = await fetchWithAuth<BranchListResponse>(
        `/api/branches${query}`,
        { method: 'GET' },
        token
    )
    return {
        branches: data.branches.map(mapBackendBranchToStudioBranch),
        nextCursor: data.nextCursor,
    }
}

/** Get a single branch by ID. */
export async function getBranchBackend(
    token: string,
    branchId: string
): Promise<Branch> {
    const data = await fetchWithAuth<BranchResponse>(
        `/api/branches/${encodeURIComponent(branchId)}`,
        { method: 'GET' },
        token
    )
    return mapBackendBranchToStudioBranch(data.branch)
}

/** Update a branch's name or brand config. */
export async function updateBranchBackend(
    token: string,
    branchId: string,
    updates: Partial<{
        name: string
        description?: string
        brandConfig: BrandConfig
    }>
): Promise<Branch> {
    const payload: Record<string, unknown> = {}
    if (updates.name !== undefined) payload.name = updates.name
    if (updates.description !== undefined) {
        payload.description = updates.description
    }
    if (updates.brandConfig !== undefined) {
        payload.tokenConfig = updates.brandConfig
    }

    const data = await fetchWithAuth<BranchResponse>(
        `/api/branches/${encodeURIComponent(branchId)}`,
        {
            method: 'PATCH',
            body: JSON.stringify(payload),
        },
        token
    )
    return mapBackendBranchToStudioBranch(data.branch)
}

/** Delete a branch. */
export async function deleteBranchBackend(
    token: string,
    branchId: string
): Promise<void> {
    await fetchWithAuth<Record<string, never>>(
        `/api/branches/${encodeURIComponent(branchId)}`,
        { method: 'DELETE' },
        token
    )
}

// ---------------------------------------------------------------------------
// Branch Actions
// ---------------------------------------------------------------------------

/** Fork a branch into a new branch. */
export async function forkBranchBackend(
    token: string,
    sourceBranchId: string,
    name: string
): Promise<Branch> {
    const data = await fetchWithAuth<BranchResponse>(
        `/api/branches/${encodeURIComponent(sourceBranchId)}/fork`,
        {
            method: 'POST',
            body: JSON.stringify({ name }),
        },
        token
    )
    return mapBackendBranchToStudioBranch(data.branch)
}

/** Publish a versioned snapshot of a branch. */
export async function publishBranchBackend(
    token: string,
    branchId: string,
    version: string,
    notes?: string
): Promise<void> {
    await fetchWithAuth<Record<string, never>>(
        `/api/branches/${encodeURIComponent(branchId)}/publish`,
        {
            method: 'POST',
            body: JSON.stringify({ version, notes }),
        },
        token
    )
}

/** Resolve a branch's brand config into component tokens. */
export async function resolveTokensBackend(
    token: string,
    branchId: string,
    theme: 'light' | 'dark' = 'light'
): Promise<ResolveTokensResponse> {
    return fetchWithAuth<ResolveTokensResponse>(
        `/api/branches/${encodeURIComponent(branchId)}/resolve`,
        {
            method: 'POST',
            body: JSON.stringify({ theme }),
        },
        token
    )
}

// ---------------------------------------------------------------------------
// Versions & Snapshots
// ---------------------------------------------------------------------------

interface VersionListResponse {
    versions: BackendVersionRow[]
}

/** List all published versions for a branch. */
export async function listVersionsBackend(
    token: string,
    branchId: string
): Promise<Version[]> {
    const data = await fetchWithAuth<VersionListResponse>(
        `/api/branches/${encodeURIComponent(branchId)}/versions`,
        { method: 'GET' },
        token
    )
    return data.versions.map(mapBackendVersionToStudioVersion)
}

interface SnapshotResponse {
    snapshot: BackendSnapshotRow
}

interface SnapshotListResponse {
    snapshots: BackendSnapshotRow[]
}

/** List all snapshots for a branch. */
export async function listSnapshotsBackend(
    token: string,
    branchId: string
): Promise<Snapshot[]> {
    const data = await fetchWithAuth<SnapshotListResponse>(
        `/api/branches/${encodeURIComponent(branchId)}/snapshots`,
        { method: 'GET' },
        token
    )
    return data.snapshots.map(mapBackendSnapshotToStudioSnapshot)
}

/** Create a new snapshot for a branch. */
export async function createSnapshotBackend(
    token: string,
    branchId: string,
    input: {
        brandConfig: BrandConfig
        label?: string
        isAutoSave?: boolean
    }
): Promise<Snapshot> {
    const data = await fetchWithAuth<SnapshotResponse>(
        `/api/branches/${encodeURIComponent(branchId)}/snapshots`,
        {
            method: 'POST',
            body: JSON.stringify({
                tokenConfig: input.brandConfig,
                label: input.label,
                isAutoSave: input.isAutoSave ?? true,
            }),
        },
        token
    )
    return mapBackendSnapshotToStudioSnapshot(data.snapshot)
}

interface PublishVersionResponse {
    version: BackendVersionRow
}

/** Publish a versioned snapshot of a branch with full metadata. */
export async function publishVersionBackend(
    token: string,
    branchId: string,
    input: {
        version: string
        changelog?: string
        isBreaking?: boolean
        isPrerelease?: boolean
    }
): Promise<Version> {
    const data = await fetchWithAuth<PublishVersionResponse>(
        `/api/branches/${encodeURIComponent(branchId)}/publish`,
        {
            method: 'POST',
            body: JSON.stringify({
                version: input.version,
                changelog: input.changelog,
                isBreaking: input.isBreaking ?? false,
                isPrerelease: input.isPrerelease ?? false,
            }),
        },
        token
    )
    return mapBackendVersionToStudioVersion(data.version)
}

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

interface OrganizationResponse {
    organization: {
        id: string
        name: string
        slug: string
        defaultBranchId: string | null
        blendVersion: string | null
        wcagEnforcement: string
        createdAt: string
        updatedAt: string
    }
}

export async function getOrganizationBackend(
    token: string,
    orgId: string
): Promise<OrganizationResponse['organization']> {
    const data = await fetchWithAuth<OrganizationResponse>(
        `/api/organizations/${orgId}`,
        { method: 'GET' },
        token
    )
    return data.organization
}

export async function updateOrganizationBackend(
    token: string,
    orgId: string,
    updates: {
        name?: string
        defaultBranchId?: string | null
        blendVersion?: string | null
        wcagEnforcement?: 'none' | 'warn' | 'block'
    }
): Promise<OrganizationResponse['organization']> {
    const data = await fetchWithAuth<OrganizationResponse>(
        `/api/organizations/${orgId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(updates),
        },
        token
    )
    return data.organization
}

// ---------------------------------------------------------------------------
// Token Locks
// ---------------------------------------------------------------------------

export interface TokenLock {
    id: string
    organizationId: string
    tokenPath: string
    reason: string | null
    lockedBy: string
    createdAt: string
}

interface TokenLockListResponse {
    locks: TokenLock[]
}

interface TokenLockResponse {
    lock: TokenLock
}

export async function listTokenLocksBackend(
    token: string,
    orgId: string
): Promise<TokenLock[]> {
    const data = await fetchWithAuth<TokenLockListResponse>(
        `/api/organizations/${orgId}/locks`,
        { method: 'GET' },
        token
    )
    return data.locks
}

export async function lockTokenBackend(
    token: string,
    orgId: string,
    tokenPath: string,
    reason?: string
): Promise<TokenLock> {
    const data = await fetchWithAuth<TokenLockResponse>(
        `/api/organizations/${orgId}/locks`,
        {
            method: 'POST',
            body: JSON.stringify({ tokenPath, reason }),
        },
        token
    )
    return data.lock
}

export async function unlockTokenBackend(
    token: string,
    orgId: string,
    tokenPath: string
): Promise<void> {
    await fetchWithAuth<{ tokenPath: string; unlocked: boolean }>(
        `/api/organizations/${orgId}/locks/${encodeURIComponent(tokenPath)}`,
        { method: 'DELETE' },
        token
    )
}

// ---------------------------------------------------------------------------
// Merge Requests
// ---------------------------------------------------------------------------

export interface MergeRequest {
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

interface MergeRequestListResponse {
    mergeRequests: MergeRequest[]
    nextCursor?: string
}

interface MergeRequestResponse {
    mergeRequest: MergeRequest
}

export async function listMergeRequestsBackend(
    token: string,
    options?: {
        organizationId?: string
        status?: string
        limit?: number
    }
): Promise<MergeRequestListResponse> {
    const params = new URLSearchParams()
    if (options?.organizationId)
        params.append('organizationId', options.organizationId)
    if (options?.status) params.append('status', options.status)
    if (options?.limit) params.append('limit', String(options.limit))

    const query = params.toString() ? `?${params.toString()}` : ''
    return fetchWithAuth<MergeRequestListResponse>(
        `/api/merge-requests${query}`,
        { method: 'GET' },
        token
    )
}

export async function getMergeRequestBackend(
    token: string,
    mrId: string
): Promise<MergeRequest> {
    const data = await fetchWithAuth<MergeRequestResponse>(
        `/api/merge-requests/${mrId}`,
        { method: 'GET' },
        token
    )
    return data.mergeRequest
}

export async function createMergeRequestBackend(
    token: string,
    input: {
        sourceBranchId: string
        targetBranchId: string
        title: string
        description?: string
        organizationId?: string
    }
): Promise<MergeRequest> {
    const query = input.organizationId
        ? `?organizationId=${input.organizationId}`
        : ''
    const data = await fetchWithAuth<MergeRequestResponse>(
        `/api/merge-requests${query}`,
        {
            method: 'POST',
            body: JSON.stringify(input),
        },
        token
    )
    return data.mergeRequest
}

export async function approveMergeRequestBackend(
    token: string,
    mrId: string,
    reviewComment?: string
): Promise<MergeRequest> {
    const data = await fetchWithAuth<MergeRequestResponse>(
        `/api/merge-requests/${mrId}/approve`,
        {
            method: 'POST',
            body: JSON.stringify({ reviewComment }),
        },
        token
    )
    return data.mergeRequest
}

export async function rejectMergeRequestBackend(
    token: string,
    mrId: string,
    reviewComment?: string
): Promise<MergeRequest> {
    const data = await fetchWithAuth<MergeRequestResponse>(
        `/api/merge-requests/${mrId}/reject`,
        {
            method: 'POST',
            body: JSON.stringify({ reviewComment }),
        },
        token
    )
    return data.mergeRequest
}

export async function mergeMergeRequestBackend(
    token: string,
    mrId: string
): Promise<MergeRequest> {
    const data = await fetchWithAuth<MergeRequestResponse>(
        `/api/merge-requests/${mrId}/merge`,
        { method: 'POST' },
        token
    )
    return data.mergeRequest
}

export async function cancelMergeRequestBackend(
    token: string,
    mrId: string
): Promise<MergeRequest> {
    const data = await fetchWithAuth<MergeRequestResponse>(
        `/api/merge-requests/${mrId}/cancel`,
        { method: 'POST' },
        token
    )
    return data.mergeRequest
}

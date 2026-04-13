import { featureFlags } from '@/lib/feature-flags'
import type { Branch, CreateBranchInput } from '@blend-design/token-engine'

export class BackendApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string
    ) {
        super(message)
        this.name = 'BackendApiError'
    }
}

async function fetchWithAuth(
    endpoint: string,
    options: RequestInit = {},
    token: string
): Promise<Response> {
    const flags = featureFlags.get()
    const baseUrl = flags.apiBaseUrl || 'http://localhost:3001'

    const url = `${baseUrl}${endpoint}`

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
    }

    const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
    })

    if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new BackendApiError(
            response.status,
            error?.error?.message || `HTTP ${response.status}`,
            error?.error?.code
        )
    }

    return response
}

export async function createBranchBackend(
    token: string,
    input: CreateBranchInput
): Promise<Branch> {
    const response = await fetchWithAuth(
        '/api/branches',
        {
            method: 'POST',
            body: JSON.stringify({
                name: input.name,
                brandId: input.brandId,
                description: input.description,
                visibility: input.visibility,
                brandConfig: input.brandConfig,
                parentBranch: input.parentBranch,
                forkFrom: input.forkFrom,
                tags: input.tags,
            }),
        },
        token
    )

    const data = await response.json()

    if (!data.success || !data.data?.branch) {
        throw new Error(data.error?.message || 'Failed to create branch')
    }

    return data.data.branch as Branch
}

export async function listBranchesBackend(
    token: string,
    options?: {
        limit?: number
        cursor?: string
        createdBy?: string
    }
): Promise<{ branches: Branch[]; nextCursor?: string }> {
    const params = new URLSearchParams()
    if (options?.limit) params.append('limit', String(options.limit))
    if (options?.cursor) params.append('cursor', options.cursor)
    if (options?.createdBy) params.append('createdBy', options.createdBy)

    const query = params.toString() ? `?${params.toString()}` : ''
    const response = await fetchWithAuth(`/api/branches${query}`, {}, token)

    const data = await response.json()

    if (!data.success || !data.data) {
        throw new Error(data.error?.message || 'Failed to list branches')
    }

    return {
        branches: data.data.branches as Branch[],
        nextCursor: data.data.nextCursor,
    }
}

export async function getBranchBackend(
    token: string,
    branchId: string
): Promise<Branch> {
    const response = await fetchWithAuth(
        `/api/branches/${encodeURIComponent(branchId)}`,
        {},
        token
    )

    const data = await response.json()

    if (!data.success || !data.data?.branch) {
        throw new Error(data.error?.message || 'Failed to get branch')
    }

    return data.data.branch as Branch
}

export async function updateBranchBackend(
    token: string,
    branchId: string,
    updates: Partial<{
        name: string
        brandConfig: Record<string, unknown>
    }>
): Promise<Branch> {
    const response = await fetchWithAuth(
        `/api/branches/${encodeURIComponent(branchId)}`,
        {
            method: 'PATCH',
            body: JSON.stringify(updates),
        },
        token
    )

    const data = await response.json()

    if (!data.success || !data.data?.branch) {
        throw new Error(data.error?.message || 'Failed to update branch')
    }

    return data.data.branch as Branch
}

export async function deleteBranchBackend(
    token: string,
    branchId: string
): Promise<void> {
    await fetchWithAuth(
        `/api/branches/${encodeURIComponent(branchId)}`,
        { method: 'DELETE' },
        token
    )
}

export async function forkBranchBackend(
    token: string,
    sourceBranchId: string,
    name: string
): Promise<Branch> {
    const response = await fetchWithAuth(
        `/api/branches/${encodeURIComponent(sourceBranchId)}/fork`,
        {
            method: 'POST',
            body: JSON.stringify({ name }),
        },
        token
    )

    const data = await response.json()

    if (!data.success || !data.data?.branch) {
        throw new Error(data.error?.message || 'Failed to fork branch')
    }

    return data.data.branch as Branch
}

export async function publishBranchBackend(
    token: string,
    branchId: string,
    version: string,
    notes?: string
): Promise<void> {
    await fetchWithAuth(
        `/api/branches/${encodeURIComponent(branchId)}/publish`,
        {
            method: 'POST',
            body: JSON.stringify({ version, notes }),
        },
        token
    )
}

export async function resolveTokensBackend(
    token: string,
    branchId: string,
    theme: 'light' | 'dark' = 'light'
): Promise<{ branch: Branch; tokens: Record<string, unknown>; theme: string }> {
    const response = await fetchWithAuth(
        `/api/branches/${encodeURIComponent(branchId)}/resolve`,
        {
            method: 'POST',
            body: JSON.stringify({ theme }),
        },
        token
    )

    const data = await response.json()

    if (!data.success || !data.data) {
        throw new Error(data.error?.message || 'Failed to resolve tokens')
    }

    return {
        branch: data.data.branch as Branch,
        tokens: data.data.componentTokens as Record<string, unknown>,
        theme: data.data.theme,
    }
}

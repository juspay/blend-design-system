import { useState, useEffect, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import {
    resolveBrandTokens,
    type Branch,
    type BranchListOptions,
    type BranchListResult,
    type BrandConfig,
    type CreateBranchInput,
    type Version,
    type Snapshot,
    type BranchListFilters,
    validateBranchId,
    validateVersion,
    parseBranchId,
} from '@blend-design/token-engine'

interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: { code: string; message: string }
}

const API_BASE_URL = 'https://firestore.googleapis.com/v1/projects'
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'dummy-project'

async function firestoreRequest<T>(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    body?: object,
    idToken?: string | null
): Promise<ApiResponse<T>> {
    if (!idToken) {
        return {
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
        }
    }

    const url = `${API_BASE_URL}/${PROJECT_ID}/databases/(default)/documents${path}`

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            ...(body && { body: JSON.stringify(body) }),
        })

        if (!response.ok) {
            const error = await response.json()
            return {
                success: false,
                error: {
                    code: error.error?.code || 'UNKNOWN_ERROR',
                    message: error.error?.message || 'Request failed',
                },
            }
        }

        const data = await response.json()
        return { success: true, data }
    } catch (err) {
        return {
            success: false,
            error: {
                code: 'NETWORK_ERROR',
                message: err instanceof Error ? err.message : 'Network error',
            },
        }
    }
}

function convertFirestoreDoc<T>(doc: any): T {
    const fields = doc.fields || {}
    const data: any = {}

    Object.entries(fields).forEach(([key, value]: [string, any]) => {
        if (value.stringValue !== undefined) {
            data[key] = value.stringValue
        } else if (value.integerValue !== undefined) {
            data[key] = parseInt(value.integerValue, 10)
        } else if (value.doubleValue !== undefined) {
            data[key] = value.doubleValue
        } else if (value.booleanValue !== undefined) {
            data[key] = value.booleanValue
        } else if (value.timestampValue !== undefined) {
            data[key] = new Date(value.timestampValue)
        } else if (value.mapValue?.fields !== undefined) {
            data[key] = convertFirestoreDoc<any>(value.mapValue)
        } else if (value.arrayValue?.values !== undefined) {
            data[key] = value.arrayValue.values.map((v: any) =>
                v.stringValue !== undefined
                    ? v.stringValue
                    : convertFirestoreDoc(v.mapValue || v)
            )
        }
    })

    return {
        ...data,
        id: doc.name?.split('/').pop() || '',
    } as T
}

export function useBranches(options?: BranchListOptions) {
    const [user] = useAuthState(auth)
    const [branches, setBranches] = useState<Branch[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBranches = useCallback(async () => {
        if (!user) {
            setBranches([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const idToken = await user.getIdToken()
            const response = await firestoreRequest<{
                documents?: any[]
                documentCount?: number
            }>('/branches', 'GET', undefined, idToken)

            if (response.success && response.data) {
                let fetchedBranches = (response.data.documents || []).map(
                    (doc) => convertFirestoreDoc<Branch>(doc)
                )

                if (options?.filters) {
                    if (options.filters.status) {
                        fetchedBranches = fetchedBranches.filter(
                            (b) => b.status === options.filters!.status
                        )
                    }
                    if (options.filters.search) {
                        const q = options.filters.search.toLowerCase()
                        fetchedBranches = fetchedBranches.filter(
                            (b) =>
                                b.name.toLowerCase().includes(q) ||
                                b.id.toLowerCase().includes(q)
                        )
                    }
                    if (options.filters.tags?.length) {
                        fetchedBranches = fetchedBranches.filter((b) =>
                            options.filters!.tags!.some((tag) =>
                                b.tags?.includes(tag)
                            )
                        )
                    }
                    if (options.filters.owner) {
                        fetchedBranches = fetchedBranches.filter(
                            (b) => b.createdBy === options.filters!.owner
                        )
                    }
                }

                if (options?.sortBy) {
                    const sortField = options.sortBy
                    fetchedBranches.sort((a, b) => {
                        const aVal = (a as any)[sortField]
                        const bVal = (b as any)[sortField]
                        const multiplier = options.sortOrder === 'asc' ? 1 : -1
                        return multiplier * (aVal > bVal ? 1 : -1)
                    })
                }

                if (options?.limit) {
                    fetchedBranches = fetchedBranches.slice(0, options.limit)
                }

                setBranches(fetchedBranches)
                setTotal(response.data.documentCount || fetchedBranches.length)
            } else {
                setError(response.error?.message || 'Failed to fetch branches')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }, [user, options])

    useEffect(() => {
        fetchBranches()
    }, [fetchBranches])

    return {
        branches,
        total,
        hasMore: false,
        loading,
        error,
        refetch: fetchBranches,
    }
}

export function useBranch(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [branch, setBranch] = useState<Branch | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user || !branchId) {
            setBranch(null)
            setLoading(false)
            return
        }

        const fetchBranch = async () => {
            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const validation = validateBranchId(branchId)

                if (!validation.valid) {
                    setError(validation.error || 'Invalid branch ID')
                    return
                }

                const response = await firestoreRequest<{
                    fields?: any
                }>(`/branches/${branchId}`, 'GET', undefined, idToken)

                if (response.success && response.data) {
                    const data = convertFirestoreDoc<Branch>(response.data)
                    setBranch(data)
                } else if (response.error?.code === 'NOT_FOUND') {
                    setBranch(null)
                } else {
                    setError(
                        response.error?.message || 'Failed to fetch branch'
                    )
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        fetchBranch()
    }, [user, branchId])

    const updateBranch = useCallback(
        async (updates: {
            brandConfig?: BrandConfig
            name?: string
            description?: string
        }) => {
            if (!user || !branchId) return null

            try {
                const idToken = await user.getIdToken()

                const fields: any = {}
                if (updates.brandConfig) {
                    fields.brandConfig = {
                        mapValue: { fields: updates.brandConfig },
                    }
                }
                if (updates.name !== undefined) {
                    fields.name = { stringValue: updates.name }
                }
                if (updates.description !== undefined) {
                    fields.description = { stringValue: updates.description }
                }
                fields.updatedAt = { timestampValue: new Date().toISOString() }
                fields.lastEditedBy = { stringValue: user.uid }

                const response = await firestoreRequest<{
                    fields?: any
                }>(`/branches/${branchId}`, 'PATCH', { fields }, idToken)

                if (response.success && response.data) {
                    const updatedBranch = convertFirestoreDoc<Branch>(
                        response.data
                    )
                    setBranch(updatedBranch)
                    return updatedBranch
                }

                throw new Error(
                    response.error?.message || 'Failed to update branch'
                )
            } catch (err) {
                throw err
            }
        },
        [user, branchId]
    )

    return { branch, loading, error, updateBranch }
}

export function useVersions(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [versions, setVersions] = useState<Version[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user || !branchId) {
            setVersions([])
            setLoading(false)
            return
        }

        const fetchVersions = async () => {
            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const response = await firestoreRequest<{
                    documents?: any[]
                }>(`/branches/${branchId}/versions`, 'GET', undefined, idToken)

                if (response.success && response.data) {
                    const fetchedVersions = (response.data.documents || []).map(
                        (doc) => convertFirestoreDoc<Version>(doc)
                    )
                    fetchedVersions.sort(
                        (a, b) =>
                            new Date(b.publishedAt).getTime() -
                            new Date(a.publishedAt).getTime()
                    )
                    setVersions(fetchedVersions)
                } else {
                    setError(
                        response.error?.message || 'Failed to fetch versions'
                    )
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        fetchVersions()
    }, [user, branchId])

    return { versions, loading, error }
}

export function useSnapshots(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [snapshots, setSnapshots] = useState<Snapshot[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user || !branchId) {
            setSnapshots([])
            setLoading(false)
            return
        }

        const fetchSnapshots = async () => {
            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const response = await firestoreRequest<{
                    documents?: any[]
                }>(`/branches/${branchId}/snapshots`, 'GET', undefined, idToken)

                if (response.success && response.data) {
                    const fetchedSnapshots = (
                        response.data.documents || []
                    ).map((doc) => convertFirestoreDoc<Snapshot>(doc))
                    fetchedSnapshots.sort(
                        (a, b) =>
                            new Date(b.savedAt).getTime() -
                            new Date(a.savedAt).getTime()
                    )
                    setSnapshots(fetchedSnapshots)
                } else {
                    setError(
                        response.error?.message || 'Failed to fetch snapshots'
                    )
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        fetchSnapshots()
    }, [user, branchId])

    return { snapshots, loading, error }
}

export function useCreateBranch() {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createBranch = useCallback(
        async (input: CreateBranchInput): Promise<Branch | null> => {
            if (!user) return null

            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()

                const validation = validateBranchId(
                    `${input.brandId}/${input.slug || input.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`
                )
                if (!validation.valid) {
                    throw new Error(validation.error)
                }

                const branchId = `${input.brandId}/${input.slug || input.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`

                const fields = {
                    id: { stringValue: branchId },
                    brandId: { stringValue: input.brandId },
                    name: { stringValue: input.name },
                    slug: {
                        stringValue:
                            input.slug ||
                            input.name
                                .toLowerCase()
                                .replace(/[^a-z0-9-]/g, '-'),
                    },
                    description: { stringValue: input.description || '' },
                    status: { stringValue: 'draft' },
                    visibility: { stringValue: input.visibility || 'private' },
                    brandConfig: {
                        mapValue: { fields: input.brandConfig || {} },
                    },
                    parentBranch: input.parentBranch
                        ? { mapValue: { fields: input.parentBranch } }
                        : { nullValue: null },
                    forkedFrom: input.forkFrom
                        ? { mapValue: { fields: input.forkFrom } }
                        : { nullValue: null },
                    owner: {
                        mapValue: {
                            fields: {
                                uid: { stringValue: user.uid },
                                email: { stringValue: user.email || '' },
                                displayName: {
                                    stringValue: user.displayName || '',
                                },
                            },
                        },
                    },
                    meta: {
                        mapValue: {
                            fields: {
                                createdByName: {
                                    stringValue: user.displayName || '',
                                },
                                createdByEmail: {
                                    stringValue: user.email || '',
                                },
                            },
                        },
                    },
                    tags: {
                        arrayValue: {
                            values: (input.tags || []).map((t) => ({
                                stringValue: t,
                            })),
                        },
                    },
                    latestVersion: { nullValue: null },
                    publishedCount: { integerValue: '0' },
                    snapshotCount: { integerValue: '0' },
                    createdBy: { stringValue: user.uid },
                    createdAt: { timestampValue: new Date().toISOString() },
                    updatedAt: { timestampValue: new Date().toISOString() },
                    lastEditedBy: { stringValue: user.uid },
                    lastPublishedAt: { nullValue: null },
                    lastPublishedBy: { nullValue: null },
                    isLocked: { booleanValue: false },
                    lockedBy: { nullValue: null },
                    lockedAt: { nullValue: null },
                }

                const response = await firestoreRequest<{
                    fields?: any
                }>(`/branches/${branchId}`, 'PATCH', { fields }, idToken)

                if (response.success && response.data) {
                    return convertFirestoreDoc<Branch>(response.data)
                }

                throw new Error(
                    response.error?.message || 'Failed to create branch'
                )
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return null
            } finally {
                setLoading(false)
            }
        },
        [user]
    )

    return { createBranch, loading, error }
}

export function usePublishVersion(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const publishVersion = useCallback(
        async (input: {
            version: string
            brandConfig: BrandConfig
            changelog?: string
            isBreaking?: boolean
            isPrerelease?: boolean
        }): Promise<Version | null> => {
            if (!user || !branchId) return null

            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()

                const validation = validateVersion(input.version)
                if (!validation.valid) {
                    throw new Error(validation.error)
                }

                const versionFields = {
                    id: { stringValue: input.version },
                    branchId: { stringValue: branchId },
                    version: { stringValue: input.version },
                    brandConfig: {
                        mapValue: { fields: input.brandConfig },
                    },
                    changelog: { stringValue: input.changelog || '' },
                    isBreaking: { booleanValue: input.isBreaking || false },
                    isPrerelease: {
                        booleanValue: input.isPrerelease || false,
                    },
                    publishedBy: { stringValue: user.uid },
                    publishedByName: { stringValue: user.displayName || '' },
                    publishedAt: { timestampValue: new Date().toISOString() },
                    downloadCount: { integerValue: '0' },
                    lastDownloadedAt: { nullValue: null },
                    parentVersion: { nullValue: null },
                }

                const versionResponse = await firestoreRequest<{
                    fields?: any
                }>(
                    `/branches/${branchId}/versions/${input.version}`,
                    'PATCH',
                    { fields: versionFields },
                    idToken
                )

                if (!versionResponse.success) {
                    throw new Error(
                        versionResponse.error?.message ||
                            'Failed to create version'
                    )
                }

                const branchUpdateFields = {
                    latestVersion: { stringValue: input.version },
                    publishedCount: { integerValue: '{inc}' },
                    lastPublishedAt: {
                        timestampValue: new Date().toISOString(),
                    },
                    lastPublishedBy: { stringValue: user.uid },
                    updatedAt: { timestampValue: new Date().toISOString() },
                    lastEditedBy: { stringValue: user.uid },
                }

                await firestoreRequest<{}>(
                    `/branches/${branchId}?updateMask.fieldPaths=latestVersion&updateMask.fieldPaths=publishedCount&updateMask.fieldPaths=lastPublishedAt&updateMask.fieldPaths=lastPublishedBy&updateMask.fieldPaths=updatedAt&updateMask.fieldPaths=lastEditedBy`,
                    'PATCH',
                    { fields: branchUpdateFields },
                    idToken
                )

                return convertFirestoreDoc<Version>(versionResponse.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return null
            } finally {
                setLoading(false)
            }
        },
        [user, branchId]
    )

    return { publishVersion, loading, error }
}

export function useCreateSnapshot(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createSnapshot = useCallback(
        async (
            brandConfig: BrandConfig,
            label?: string,
            isAutoSave = true
        ): Promise<Snapshot | null> => {
            if (!user || !branchId) return null

            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const snapshotId = `snapshot_${Date.now()}`

                const fields = {
                    id: { stringValue: snapshotId },
                    branchId: { stringValue: branchId },
                    brandConfig: { mapValue: { fields: brandConfig } },
                    savedBy: { stringValue: user.uid },
                    savedByName: { stringValue: user.displayName || '' },
                    savedAt: { timestampValue: new Date().toISOString() },
                    label: { stringValue: label || '' },
                    isAutoSave: { booleanValue: isAutoSave },
                }

                const response = await firestoreRequest<{
                    fields?: any
                }>(
                    `/branches/${branchId}/snapshots/${snapshotId}`,
                    'PATCH',
                    { fields },
                    idToken
                )

                if (response.success && response.data) {
                    return convertFirestoreDoc<Snapshot>(response.data)
                }

                throw new Error(
                    response.error?.message || 'Failed to create snapshot'
                )
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return null
            } finally {
                setLoading(false)
            }
        },
        [user, branchId]
    )

    return { createSnapshot, loading, error }
}

export function useResolvedTokens(
    brandConfig: BrandConfig | null,
    theme: 'light' | 'dark' = 'light'
) {
    return useCallback(() => {
        if (!brandConfig) return null
        return resolveBrandTokens(brandConfig, theme)
    }, [brandConfig, theme])
}

export function useForkBranch(branchId: string | null) {
    const [user] = useAuthState(auth)
    const { createBranch } = useCreateBranch()

    const forkBranch = useCallback(
        async (
            newBranchName: string,
            newSlug?: string
        ): Promise<Branch | null> => {
            if (!user || !branchId) return null

            try {
                const idToken = await user.getIdToken()
                const response = await firestoreRequest<{
                    fields?: any
                }>(`/branches/${branchId}`, 'GET', undefined, idToken)

                if (!response.success || !response.data) {
                    throw new Error('Failed to fetch source branch')
                }

                const sourceBranch = convertFirestoreDoc<Branch>(response.data)
                const parsed = parseBranchId(branchId)

                if (!parsed) {
                    throw new Error('Invalid branch ID')
                }

                return await createBranch({
                    brandId: parsed.owner,
                    name: newBranchName,
                    slug: newSlug,
                    brandConfig: sourceBranch.brandConfig,
                    forkFrom: {
                        branchId: branchId,
                        name: sourceBranch.name,
                        version: sourceBranch.latestVersion || undefined,
                    },
                })
            } catch (err) {
                throw err
            }
        },
        [user, branchId, createBranch]
    )

    return { forkBranch }
}

// Standalone async functions for use in hybrid hooks
export async function listBranchesFirestore(
    idToken: string,
    filters?: BranchListFilters
): Promise<BranchListResult> {
    const response = await firestoreRequest<{
        documents?: any[]
        documentCount?: number
    }>('/branches', 'GET', undefined, idToken)

    if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Failed to fetch branches')
    }

    let branches = (response.data.documents || []).map((doc) =>
        convertFirestoreDoc<Branch>(doc)
    )

    if (filters) {
        if (filters.status) {
            branches = branches.filter((b) => b.status === filters.status)
        }
        if (filters.search) {
            const q = filters.search.toLowerCase()
            branches = branches.filter(
                (b) =>
                    b.name.toLowerCase().includes(q) ||
                    b.id.toLowerCase().includes(q)
            )
        }
    }

    return {
        branches,
        total: response.data.documentCount || branches.length,
        hasMore: false,
    }
}

export async function getBranchFirestore(
    idToken: string,
    branchId: string
): Promise<Branch | null> {
    const validation = validateBranchId(branchId)
    if (!validation.valid) {
        throw new Error(validation.error)
    }

    const response = await firestoreRequest<{ fields?: any }>(
        `/branches/${branchId}`,
        'GET',
        undefined,
        idToken
    )

    if (!response.success) {
        if (response.error?.code === 'NOT_FOUND') {
            return null
        }
        throw new Error(response.error?.message || 'Failed to fetch branch')
    }

    return convertFirestoreDoc<Branch>(response.data)
}

export async function updateBranchFirestore(
    idToken: string,
    branchId: string,
    updates: {
        brandConfig?: BrandConfig
        name?: string
        description?: string
    },
    userId: string
): Promise<Branch> {
    const fields: any = {}
    if (updates.brandConfig) {
        fields.brandConfig = { mapValue: { fields: updates.brandConfig } }
    }
    if (updates.name !== undefined) {
        fields.name = { stringValue: updates.name }
    }
    if (updates.description !== undefined) {
        fields.description = { stringValue: updates.description }
    }
    fields.updatedAt = { timestampValue: new Date().toISOString() }
    fields.lastEditedBy = { stringValue: userId }

    const response = await firestoreRequest<{ fields?: any }>(
        `/branches/${branchId}`,
        'PATCH',
        { fields },
        idToken
    )

    if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Failed to update branch')
    }

    return convertFirestoreDoc<Branch>(response.data)
}

export async function listVersionsFirestore(
    idToken: string,
    branchId: string
): Promise<Version[]> {
    const response = await firestoreRequest<{ documents?: any[] }>(
        `/branches/${branchId}/versions`,
        'GET',
        undefined,
        idToken
    )

    if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Failed to fetch versions')
    }

    const versions = (response.data.documents || []).map((doc) =>
        convertFirestoreDoc<Version>(doc)
    )
    versions.sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
    )

    return versions
}

export async function publishVersionFirestore(
    idToken: string,
    branchId: string,
    input: {
        version: string
        brandConfig: BrandConfig
        changelog?: string
        isBreaking?: boolean
        isPrerelease?: boolean
    },
    userId: string,
    userName: string
): Promise<Version> {
    const validation = validateVersion(input.version)
    if (!validation.valid) {
        throw new Error(validation.error)
    }

    const versionFields = {
        id: { stringValue: input.version },
        branchId: { stringValue: branchId },
        version: { stringValue: input.version },
        brandConfig: { mapValue: { fields: input.brandConfig } },
        changelog: { stringValue: input.changelog || '' },
        isBreaking: { booleanValue: input.isBreaking || false },
        isPrerelease: { booleanValue: input.isPrerelease || false },
        publishedBy: { stringValue: userId },
        publishedByName: { stringValue: userName || '' },
        publishedAt: { timestampValue: new Date().toISOString() },
        downloadCount: { integerValue: '0' },
        lastDownloadedAt: { nullValue: null },
        parentVersion: { nullValue: null },
    }

    const versionResponse = await firestoreRequest<{ fields?: any }>(
        `/branches/${branchId}/versions/${input.version}`,
        'PATCH',
        { fields: versionFields },
        idToken
    )

    if (!versionResponse.success) {
        throw new Error(
            versionResponse.error?.message || 'Failed to create version'
        )
    }

    // Update branch metadata
    const branchUpdateFields = {
        latestVersion: { stringValue: input.version },
        lastPublishedAt: { timestampValue: new Date().toISOString() },
        lastPublishedBy: { stringValue: userId },
        updatedAt: { timestampValue: new Date().toISOString() },
        lastEditedBy: { stringValue: userId },
    }

    await firestoreRequest<{}>(
        `/branches/${branchId}`,
        'PATCH',
        { fields: branchUpdateFields },
        idToken
    )

    return convertFirestoreDoc<Version>(versionResponse.data)
}

export async function createSnapshotFirestore(
    idToken: string,
    branchId: string,
    brandConfig: BrandConfig,
    userId: string,
    userName: string,
    label?: string,
    isAutoSave = true
): Promise<Snapshot> {
    const snapshotId = `snapshot_${Date.now()}`

    const fields = {
        id: { stringValue: snapshotId },
        branchId: { stringValue: branchId },
        brandConfig: { mapValue: { fields: brandConfig } },
        savedBy: { stringValue: userId },
        savedByName: { stringValue: userName || '' },
        savedAt: { timestampValue: new Date().toISOString() },
        label: { stringValue: label || '' },
        isAutoSave: { booleanValue: isAutoSave },
    }

    const response = await firestoreRequest<{ fields?: any }>(
        `/branches/${branchId}/snapshots/${snapshotId}`,
        'PATCH',
        { fields },
        idToken
    )

    if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Failed to create snapshot')
    }

    return convertFirestoreDoc<Snapshot>(response.data)
}

export async function createBranchFirestore(
    idToken: string,
    userId: string,
    userEmail: string,
    userName: string,
    input: CreateBranchInput
): Promise<Branch> {
    const slug =
        input.slug || input.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    const branchId = `${input.brandId}/${slug}`

    const validation = validateBranchId(branchId)
    if (!validation.valid) {
        throw new Error(validation.error)
    }

    const fields = {
        id: { stringValue: branchId },
        brandId: { stringValue: input.brandId },
        name: { stringValue: input.name },
        slug: { stringValue: slug },
        description: { stringValue: input.description || '' },
        status: { stringValue: 'draft' },
        visibility: { stringValue: input.visibility || 'private' },
        brandConfig: { mapValue: { fields: input.brandConfig || {} } },
        parentBranch: input.parentBranch
            ? { mapValue: { fields: input.parentBranch } }
            : { nullValue: null },
        forkedFrom: input.forkFrom
            ? { mapValue: { fields: input.forkFrom } }
            : { nullValue: null },
        owner: {
            mapValue: {
                fields: {
                    uid: { stringValue: userId },
                    email: { stringValue: userEmail || '' },
                    displayName: { stringValue: userName || '' },
                },
            },
        },
        meta: {
            mapValue: {
                fields: {
                    createdByName: { stringValue: userName || '' },
                    createdByEmail: { stringValue: userEmail || '' },
                },
            },
        },
        tags: {
            arrayValue: {
                values: (input.tags || []).map((t) => ({ stringValue: t })),
            },
        },
        latestVersion: { nullValue: null },
        publishedCount: { integerValue: '0' },
        snapshotCount: { integerValue: '0' },
        createdBy: { stringValue: userId },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() },
        lastEditedBy: { stringValue: userId },
        lastPublishedAt: { nullValue: null },
        lastPublishedBy: { nullValue: null },
        isLocked: { booleanValue: false },
        lockedBy: { nullValue: null },
        lockedAt: { nullValue: null },
    }

    const response = await firestoreRequest<{ fields?: any }>(
        `/branches/${branchId}`,
        'PATCH',
        { fields },
        idToken
    )

    if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Failed to create branch')
    }

    return convertFirestoreDoc<Branch>(response.data)
}

export async function listSnapshotsFirestore(
    idToken: string,
    branchId: string
): Promise<Snapshot[]> {
    const response = await firestoreRequest<{ documents?: unknown[] }>(
        `/branches/${branchId}/snapshots`,
        'GET',
        undefined,
        idToken
    )
    if (!response.success || !response.data) return []
    const snaps = (response.data.documents || []).map((doc) =>
        convertFirestoreDoc<Snapshot>(doc as Record<string, unknown>)
    )
    snaps.sort(
        (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    )
    return snaps
}

export async function deleteBranchFirestore(
    idToken: string,
    branchId: string
): Promise<void> {
    const response = await firestoreRequest(
        `/branches/${branchId}`,
        'DELETE',
        undefined,
        idToken
    )
    if (!response.success) {
        throw new Error(response.error?.message || 'Failed to delete branch')
    }
}

export async function forkBranchFirestore(
    idToken: string,
    sourceBranchId: string,
    newName: string,
    newSlug: string,
    userId: string
): Promise<Branch> {
    // First read source
    const sourceResp = await firestoreRequest<{ fields?: unknown }>(
        `/branches/${sourceBranchId}`,
        'GET',
        undefined,
        idToken
    )
    if (!sourceResp.success || !sourceResp.data) {
        throw new Error(`Source branch ${sourceBranchId} not found`)
    }
    const source = convertFirestoreDoc<Branch>(
        sourceResp.data as Record<string, unknown>
    )
    const brandId = source.brandId
    const newBranchId = `${brandId}/${newSlug}`

    const fields = {
        id: { stringValue: newBranchId },
        brandId: { stringValue: brandId },
        name: { stringValue: newName },
        slug: { stringValue: newSlug },
        description: { stringValue: source.description || '' },
        status: { stringValue: 'draft' },
        visibility: { stringValue: source.visibility || 'private' },
        brandConfig: { mapValue: { fields: source.brandConfig } },
        parentBranch: { nullValue: null },
        forkedFrom: {
            mapValue: {
                fields: {
                    branchId: { stringValue: source.id },
                    name: { stringValue: source.name },
                },
            },
        },
        owner: {
            mapValue: {
                fields: {
                    uid: { stringValue: userId },
                    email: { stringValue: '' },
                    displayName: { stringValue: '' },
                },
            },
        },
        meta: {
            mapValue: {
                fields: {
                    createdByName: { stringValue: '' },
                    createdByEmail: { stringValue: '' },
                },
            },
        },
        tags: {
            arrayValue: {
                values: (source.tags || []).map((t) => ({ stringValue: t })),
            },
        },
        latestVersion: { nullValue: null },
        publishedCount: { integerValue: '0' },
        snapshotCount: { integerValue: '0' },
        createdBy: { stringValue: userId },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() },
        lastEditedBy: { stringValue: userId },
        lastPublishedAt: { nullValue: null },
        lastPublishedBy: { nullValue: null },
        isLocked: { booleanValue: false },
        lockedBy: { nullValue: null },
        lockedAt: { nullValue: null },
    }

    const response = await firestoreRequest<{ fields?: unknown }>(
        `/branches/${newBranchId}`,
        'PATCH',
        { fields },
        idToken
    )
    if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Failed to fork branch')
    }
    return convertFirestoreDoc<Branch>(response.data as Record<string, unknown>)
}

// React hooks (keep existing implementations)

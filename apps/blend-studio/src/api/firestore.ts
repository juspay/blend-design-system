/**
 * Firestore Data Access Layer
 *
 * Standalone async functions for Firestore operations.
 * These are the low-level data access functions used by:
 *   - The unified data source layer (data-source.ts)
 *   - The React hooks in use-studio.ts (via dynamic import)
 *   - Direct usage where hooks aren't appropriate
 *
 * React hooks that depend on these are in use-studio.ts.
 * This file intentionally has NO React imports.
 */

import {
    resolveBrandTokens,
    type Branch,
    type BranchListFilters,
    type BranchListResult,
    type BrandConfig,
    type CreateBranchInput,
    type Version,
    type Snapshot,
    validateBranchId,
    validateVersion,
    parseBranchId,
} from '@juspay/blend-design-system/tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const API_BASE_URL = 'https://firestore.googleapis.com/v1/projects'
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'dummy-project'

// ---------------------------------------------------------------------------
// Firestore HTTP Client
// ---------------------------------------------------------------------------

interface FirestoreResponse<T> {
    success: boolean
    data?: T
    error?: { code: string; message: string }
}

async function firestoreRequest<T>(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
    body?: object,
    idToken?: string | null
): Promise<FirestoreResponse<T>> {
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

// ---------------------------------------------------------------------------
// Document Conversion
// ---------------------------------------------------------------------------

function convertFirestoreDoc<T>(doc: any): T {
    const fields = doc.fields || {}
    const data: any = {}

    for (const [key, value] of Object.entries(fields) as [string, any][]) {
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
    }

    return {
        ...data,
        id: doc.name?.split('/').pop() || '',
    } as T
}

// ---------------------------------------------------------------------------
// Firestore Field Builders (reduces boilerplate in CRUD functions)
// ---------------------------------------------------------------------------

function stringField(value: string) {
    return { stringValue: value }
}

function nullField() {
    return { nullValue: null }
}

function boolField(value: boolean) {
    return { booleanValue: value }
}

function intField(value: number | string) {
    return { integerValue: String(value) }
}

function timestampField(date: Date = new Date()) {
    return { timestampValue: date.toISOString() }
}

function tagsField(tags: string[]) {
    return {
        arrayValue: {
            values: tags.map((t) => ({ stringValue: t })),
        },
    }
}

function ownerFields(userId: string, email: string, displayName: string) {
    return {
        mapValue: {
            fields: {
                uid: stringField(userId),
                email: stringField(email),
                displayName: stringField(displayName),
            },
        },
    }
}

// ---------------------------------------------------------------------------
// Branch Operations
// ---------------------------------------------------------------------------

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
        if (filters.tags?.length) {
            branches = branches.filter((b) =>
                filters.tags!.some((tag) => b.tags?.includes(tag))
            )
        }
        if (filters.owner) {
            branches = branches.filter((b) => b.createdBy === filters.owner)
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
        if (response.error?.code === 'NOT_FOUND') return null
        throw new Error(response.error?.message || 'Failed to fetch branch')
    }

    return convertFirestoreDoc<Branch>(response.data)
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
        id: stringField(branchId),
        brandId: stringField(input.brandId),
        name: stringField(input.name),
        slug: stringField(slug),
        description: stringField(input.description || ''),
        status: stringField('draft'),
        visibility: stringField(input.visibility || 'private'),
        brandConfig: { mapValue: { fields: input.brandConfig || {} } },
        parentBranch: input.parentBranch
            ? { mapValue: { fields: input.parentBranch } }
            : nullField(),
        forkedFrom: input.forkFrom
            ? { mapValue: { fields: input.forkFrom } }
            : nullField(),
        owner: ownerFields(userId, userEmail, userName),
        meta: {
            mapValue: {
                fields: {
                    createdByName: stringField(userName),
                    createdByEmail: stringField(userEmail),
                },
            },
        },
        tags: tagsField(input.tags || []),
        latestVersion: nullField(),
        publishedCount: intField(0),
        snapshotCount: intField(0),
        createdBy: stringField(userId),
        createdAt: timestampField(),
        updatedAt: timestampField(),
        lastEditedBy: stringField(userId),
        lastPublishedAt: nullField(),
        lastPublishedBy: nullField(),
        isLocked: boolField(false),
        lockedBy: nullField(),
        lockedAt: nullField(),
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
        fields.name = stringField(updates.name)
    }
    if (updates.description !== undefined) {
        fields.description = stringField(updates.description)
    }
    fields.updatedAt = timestampField()
    fields.lastEditedBy = stringField(userId)

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
    const newBranchId = `${source.brandId}/${newSlug}`

    const fields = {
        id: stringField(newBranchId),
        brandId: stringField(source.brandId),
        name: stringField(newName),
        slug: stringField(newSlug),
        description: stringField(source.description || ''),
        status: stringField('draft'),
        visibility: stringField(source.visibility || 'private'),
        brandConfig: { mapValue: { fields: source.brandConfig } },
        parentBranch: nullField(),
        forkedFrom: {
            mapValue: {
                fields: {
                    branchId: stringField(source.id),
                    name: stringField(source.name),
                },
            },
        },
        owner: ownerFields(userId, '', ''),
        meta: {
            mapValue: {
                fields: {
                    createdByName: stringField(''),
                    createdByEmail: stringField(''),
                },
            },
        },
        tags: tagsField(source.tags || []),
        latestVersion: nullField(),
        publishedCount: intField(0),
        snapshotCount: intField(0),
        createdBy: stringField(userId),
        createdAt: timestampField(),
        updatedAt: timestampField(),
        lastEditedBy: stringField(userId),
        lastPublishedAt: nullField(),
        lastPublishedBy: nullField(),
        isLocked: boolField(false),
        lockedBy: nullField(),
        lockedAt: nullField(),
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

// ---------------------------------------------------------------------------
// Version Operations
// ---------------------------------------------------------------------------

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
        id: stringField(input.version),
        branchId: stringField(branchId),
        version: stringField(input.version),
        brandConfig: { mapValue: { fields: input.brandConfig } },
        changelog: stringField(input.changelog || ''),
        isBreaking: boolField(input.isBreaking || false),
        isPrerelease: boolField(input.isPrerelease || false),
        publishedBy: stringField(userId),
        publishedByName: stringField(userName),
        publishedAt: timestampField(),
        downloadCount: intField(0),
        lastDownloadedAt: nullField(),
        parentVersion: nullField(),
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
        latestVersion: stringField(input.version),
        lastPublishedAt: timestampField(),
        lastPublishedBy: stringField(userId),
        updatedAt: timestampField(),
        lastEditedBy: stringField(userId),
    }

    await firestoreRequest<{}>(
        `/branches/${branchId}`,
        'PATCH',
        { fields: branchUpdateFields },
        idToken
    )

    return convertFirestoreDoc<Version>(versionResponse.data)
}

// ---------------------------------------------------------------------------
// Snapshot Operations
// ---------------------------------------------------------------------------

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
        id: stringField(snapshotId),
        branchId: stringField(branchId),
        brandConfig: { mapValue: { fields: brandConfig } },
        savedBy: stringField(userId),
        savedByName: stringField(userName),
        savedAt: timestampField(),
        label: stringField(label || ''),
        isAutoSave: boolField(isAutoSave),
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

// ---------------------------------------------------------------------------
// Legacy React Hooks (kept for backward compatibility — prefer use-studio.ts hooks)
// ---------------------------------------------------------------------------

import { useState, useEffect, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'

export function useBranches(
    options?: import('@juspay/blend-design-system/tokens').BranchListOptions
) {
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
            const result = await listBranchesFirestore(
                idToken,
                options?.filters
            )
            setBranches(result.branches)
            setTotal(result.total)
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
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const idToken = await user.getIdToken()
                const data = await getBranchFirestore(idToken, branchId)
                setBranch(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [user, branchId])

    const updateBranch = useCallback(
        async (updates: {
            brandConfig?: BrandConfig
            name?: string
            description?: string
        }) => {
            if (!user || !branchId) return null
            const idToken = await user.getIdToken()
            const updated = await updateBranchFirestore(
                idToken,
                branchId,
                updates,
                user.uid
            )
            setBranch(updated)
            return updated
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
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const idToken = await user.getIdToken()
                setVersions(await listVersionsFirestore(idToken, branchId))
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetch()
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
        const fetch = async () => {
            setLoading(true)
            setError(null)
            try {
                const idToken = await user.getIdToken()
                setSnapshots(await listSnapshotsFirestore(idToken, branchId))
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetch()
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
                return await createBranchFirestore(
                    idToken,
                    user.uid,
                    user.email || '',
                    user.displayName || '',
                    input
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
                return await publishVersionFirestore(
                    idToken,
                    branchId,
                    input,
                    user.uid,
                    user.displayName || ''
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
                return await createSnapshotFirestore(
                    idToken,
                    branchId,
                    brandConfig,
                    user.uid,
                    user.displayName || '',
                    label,
                    isAutoSave
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
            const idToken = await user.getIdToken()
            const source = await getBranchFirestore(idToken, branchId)
            if (!source) throw new Error('Source branch not found')

            const parsed = parseBranchId(branchId)
            if (!parsed) throw new Error('Invalid branch ID')

            return createBranch({
                brandId: parsed.owner,
                name: newBranchName,
                slug: newSlug,
                brandConfig: source.brandConfig,
                forkFrom: {
                    branchId,
                    name: source.name,
                    version: source.latestVersion || undefined,
                },
            })
        },
        [user, branchId, createBranch]
    )

    return { forkBranch }
}

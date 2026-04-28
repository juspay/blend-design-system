import { useCallback, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { featureFlags } from '@/lib/feature-flags'
import { mockApi } from '@/api/mock/mock-data'
import { z } from 'zod'
import {
    resolveDataSource,
    executeQueryWithDefault,
    executeMutation,
    type DataSource,
} from '@/api/data-source'
import type { TokenLock, MergeRequest } from '@/api/backend'
import type {
    Branch,
    BranchListOptions,
    BranchListResult,
    BrandConfig,
    CreateBranchInput,
    Version,
    Snapshot,
} from '@juspay/blend-design-system/tokens'

// Re-export utilities that consumers need
export {
    validateBranchId,
    validateVersion,
    incrementVersion,
    parseBranchId,
} from '@juspay/blend-design-system/tokens'

// Re-export standalone Firestore functions for direct use
export {
    listBranchesFirestore,
    getBranchFirestore,
    updateBranchFirestore,
    listVersionsFirestore,
    publishVersionFirestore,
    createSnapshotFirestore,
    createBranchFirestore,
    listSnapshotsFirestore,
    deleteBranchFirestore,
    forkBranchFirestore,
} from '@/api/firestore'

// Re-export Firestore hooks for backward compatibility
export {
    useBranches,
    useBranch,
    useVersions,
    useSnapshots,
    useCreateBranch,
    usePublishVersion,
    useCreateSnapshot,
    useResolvedTokens,
    useForkBranch,
} from '@/api/firestore'

const BranchSchema = z.custom<Branch>(
    (value) =>
        !!value &&
        typeof value === 'object' &&
        typeof (value as Branch).id === 'string' &&
        typeof (value as Branch).name === 'string' &&
        typeof (value as Branch).brandId === 'string' &&
        typeof (value as Branch).status === 'string' &&
        typeof (value as Branch).visibility === 'string' &&
        !!(value as Branch).brandConfig,
    'Invalid branch payload'
)

const VersionSchema = z.custom<Version>(
    (value) =>
        !!value &&
        typeof value === 'object' &&
        typeof (value as Version).id === 'string' &&
        typeof (value as Version).branchId === 'string' &&
        typeof (value as Version).version === 'string' &&
        !!(value as Version).brandConfig &&
        typeof (value as Version).isBreaking === 'boolean' &&
        typeof (value as Version).isPrerelease === 'boolean',
    'Invalid version payload'
)

const SnapshotSchema = z.custom<Snapshot>(
    (value) =>
        !!value &&
        typeof value === 'object' &&
        typeof (value as Snapshot).id === 'string' &&
        typeof (value as Snapshot).branchId === 'string' &&
        !!(value as Snapshot).brandConfig &&
        typeof (value as Snapshot).savedBy === 'string' &&
        typeof (value as Snapshot).isAutoSave === 'boolean',
    'Invalid snapshot payload'
)

const parseBranch = (value: unknown): Branch => {
    return BranchSchema.parse(value)
}

const parseBranchListResult = (value: unknown): BranchListResult => {
    const parsed = z
        .object({
            branches: z.array(z.unknown()),
            total: z.number(),
            hasMore: z.boolean().optional().default(false),
            nextCursor: z.string().optional(),
        })
        .parse(value)
    return {
        branches: parsed.branches.map((branch) => BranchSchema.parse(branch)),
        total: parsed.total,
        hasMore: parsed.hasMore,
        nextCursor: parsed.nextCursor,
    }
}

const parseVersion = (value: unknown): Version => {
    return VersionSchema.parse(value)
}

const parseSnapshot = (value: unknown): Snapshot => {
    return SnapshotSchema.parse(value)
}

const branchKeys = {
    all: ['studio', 'branches'] as const,
    list: (source: DataSource, optionsKey: string, orgId?: string) =>
        [
            ...branchKeys.all,
            source.type,
            source.backendToken ?? '',
            optionsKey,
            orgId ?? '',
        ] as const,
    detail: (source: DataSource, branchId: string) =>
        [
            ...branchKeys.all,
            'detail',
            source.type,
            source.backendToken ?? '',
            branchId,
        ] as const,
    versions: (source: DataSource, branchId: string) =>
        [
            ...branchKeys.all,
            'versions',
            source.type,
            source.backendToken ?? '',
            branchId,
        ] as const,
    snapshots: (source: DataSource, branchId: string) =>
        [
            ...branchKeys.all,
            'snapshots',
            source.type,
            source.backendToken ?? '',
            branchId,
        ] as const,
}

const getSourceToken = (source: DataSource): string => source.backendToken ?? ''

const isStudioBranchesKey = (key: readonly unknown[]): boolean =>
    Array.isArray(key) && key[0] === 'studio' && key[1] === 'branches'

const isBranchListKeyForSource = (
    key: readonly unknown[],
    source: DataSource
): boolean => {
    if (!isStudioBranchesKey(key)) return false
    const segment = key[2]
    return (
        typeof segment === 'string' &&
        segment !== 'detail' &&
        segment !== 'versions' &&
        segment !== 'snapshots' &&
        key[2] === source.type &&
        key[3] === getSourceToken(source)
    )
}

const isBranchScopeKeyForSource = (
    key: readonly unknown[],
    source: DataSource,
    branchId: string
): boolean => {
    if (!isStudioBranchesKey(key)) return false
    const segment = key[2]
    if (
        segment !== 'detail' &&
        segment !== 'versions' &&
        segment !== 'snapshots'
    ) {
        return false
    }
    return (
        key[3] === source.type &&
        key[4] === getSourceToken(source) &&
        key[5] === branchId
    )
}

// ---------------------------------------------------------------------------
// Internal: shared hook for resolving the current data source
// ---------------------------------------------------------------------------

function useDataSource(): DataSource {
    const [firebaseUser] = useAuthState(auth)
    const { token: backendToken } = useBackendAuth()
    const flags = featureFlags.get()

    return useMemo(
        () => resolveDataSource(flags, backendToken, firebaseUser ?? null),
        [flags.apiBaseUrl, flags.useMockData, backendToken, firebaseUser]
    )
}

// ---------------------------------------------------------------------------
// useBranchesWithMock
// ---------------------------------------------------------------------------

export function useBranchesWithMock(options?: BranchListOptions) {
    const source = useDataSource()
    const { user } = useBackendAuth()

    const optionsKey = options
        ? JSON.stringify({ limit: options.limit, filters: options.filters })
        : ''
    const orgId = user?.organizations?.[0]?.organizationId

    const query = useQuery({
        queryKey: branchKeys.list(source, optionsKey, orgId),
        enabled: source.type !== 'none',
        queryFn: async () => {
            const result = await executeQueryWithDefault<BranchListResult>(
                source,
                {
                    backend: async (token) => {
                        const { listBranchesBackend } =
                            await import('@/api/backend')
                        const data = await listBranchesBackend(token, {
                            limit: options?.limit,
                            createdBy: options?.filters?.owner,
                            organizationId: orgId,
                        })
                        return {
                            branches: data.branches,
                            total: data.branches.length,
                            hasMore: false,
                        }
                    },
                    firestore: async (idToken) => {
                        const { listBranchesFirestore } =
                            await import('@/api/firestore')
                        return listBranchesFirestore(idToken, options?.filters)
                    },
                    mock: () => mockApi.listBranches(options?.filters),
                },
                { branches: [], total: 0, hasMore: false }
            )
            return parseBranchListResult(result)
        },
    })

    return {
        branches: query.data?.branches ?? [],
        total: query.data?.total ?? 0,
        hasMore: false,
        loading: query.isLoading || query.isFetching,
        error: query.error instanceof Error ? query.error.message : null,
        refetch: query.refetch,
    }
}

// ---------------------------------------------------------------------------
// useBranchWithMock
// ---------------------------------------------------------------------------

export function useBranchWithMock(branchId: string | null) {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: branchId
            ? branchKeys.detail(source, branchId)
            : [...branchKeys.all, 'detail', 'empty'],
        enabled: !!branchId,
        queryFn: async () => {
            const data = await executeQueryWithDefault<Branch | null>(
                source,
                {
                    backend: async (token) => {
                        const { getBranchBackend } =
                            await import('@/api/backend')
                        return getBranchBackend(token, branchId!)
                    },
                    firestore: async (idToken) => {
                        const { getBranchFirestore } =
                            await import('@/api/firestore')
                        return getBranchFirestore(idToken, branchId!)
                    },
                    mock: () => mockApi.getBranch(branchId!),
                },
                null
            )
            if (!data) return null
            return parseBranch(data)
        },
    })

    const updateBranch = useCallback(
        async (
            id: string,
            updates: {
                brandConfig?: BrandConfig
                name?: string
                description?: string
            }
        ) => {
            const updated = await executeMutation<Branch | null>(source, {
                backend: async (token) => {
                    const { updateBranchBackend } =
                        await import('@/api/backend')
                    return updateBranchBackend(token, id, updates)
                },
                mock: () => mockApi.updateBranch(id, updates),
            })
            if (updated) {
                queryClient.setQueryData(branchKeys.detail(source, id), updated)
                await queryClient.invalidateQueries({
                    predicate: (query) =>
                        isBranchScopeKeyForSource(query.queryKey, source, id) ||
                        isBranchListKeyForSource(query.queryKey, source),
                    refetchType: 'active',
                })
            }
            return updated
        },
        [source.type, source.backendToken, queryClient]
    )

    return {
        branch: query.data ?? null,
        // `isFetching` includes background refetches (e.g. after snapshot invalidation).
        // Using it as "loading" causes editor pages to unmount/remount and lose focus/UI state.
        loading: query.isLoading,
        error: query.error instanceof Error ? query.error.message : null,
        updateBranch,
        refetch: query.refetch,
    }
}

// ---------------------------------------------------------------------------
// useVersionsWithMock
// ---------------------------------------------------------------------------

export function useVersionsWithMock(branchId: string | null) {
    const source = useDataSource()
    const query = useQuery({
        queryKey: branchId
            ? branchKeys.versions(source, branchId)
            : [...branchKeys.all, 'versions', 'empty'],
        enabled: !!branchId,
        queryFn: async () => {
            const data = await executeQueryWithDefault<unknown[]>(
                source,
                {
                    backend: async (token) => {
                        const { listVersionsBackend } =
                            await import('@/api/backend')
                        return listVersionsBackend(token, branchId!)
                    },
                    mock: () => mockApi.listVersions(branchId!),
                },
                []
            )
            return data.map(parseVersion)
        },
    })

    return {
        versions: query.data ?? [],
        loading: query.isLoading || query.isFetching,
        error: query.error instanceof Error ? query.error.message : null,
    }
}

// ---------------------------------------------------------------------------
// useSnapshotsWithMock
// ---------------------------------------------------------------------------

export function useSnapshotsWithMock(branchId: string | null) {
    const source = useDataSource()
    const query = useQuery({
        queryKey: branchId
            ? branchKeys.snapshots(source, branchId)
            : [...branchKeys.all, 'snapshots', 'empty'],
        enabled: !!branchId,
        queryFn: async () => {
            const data = await executeQueryWithDefault<unknown[]>(
                source,
                {
                    backend: async (token) => {
                        const { listSnapshotsBackend } =
                            await import('@/api/backend')
                        return listSnapshotsBackend(token, branchId!)
                    },
                    mock: () => mockApi.listSnapshots(branchId!),
                },
                []
            )
            return data.map(parseSnapshot)
        },
    })

    return {
        snapshots: query.data ?? [],
        loading: query.isLoading || query.isFetching,
        refetch: query.refetch,
    }
}

// ---------------------------------------------------------------------------
// usePublishVersionWithMock
// ---------------------------------------------------------------------------

export function usePublishVersionWithMock(branchId: string | null) {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (input: {
            version: string
            brandConfig: BrandConfig
            changelog?: string
            isBreaking?: boolean
            isPrerelease?: boolean
        }): Promise<Version | null> => {
            if (!branchId) {
                return null
            }
            const result = await executeMutation<Version | null>(source, {
                backend: async (token) => {
                    const { publishVersionBackend } =
                        await import('@/api/backend')
                    return publishVersionBackend(token, branchId!, {
                        version: input.version,
                        changelog: input.changelog,
                        isBreaking: input.isBreaking,
                        isPrerelease: input.isPrerelease,
                    }) as unknown as Version
                },
                mock: () => mockApi.publishVersion(branchId, input),
            })
            if (!result) return null
            return parseVersion(result)
        },
        onSuccess: async () => {
            if (!branchId) return

            // Invalidate only the active branch-scoped caches and matching
            // branch list queries for the same data source/session.
            await queryClient.invalidateQueries({
                predicate: (query) =>
                    isBranchScopeKeyForSource(
                        query.queryKey,
                        source,
                        branchId
                    ) || isBranchListKeyForSource(query.queryKey, source),
                refetchType: 'active',
            })
        },
    })

    return {
        publishVersion: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

// ---------------------------------------------------------------------------
// useCreateSnapshotWithMock
// ---------------------------------------------------------------------------

export function useCreateSnapshotWithMock(branchId: string | null) {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({
            brandConfig,
            label,
            isAutoSave,
        }: {
            brandConfig: BrandConfig
            label?: string
            isAutoSave?: boolean
        }): Promise<Snapshot | null> => {
            if (!branchId) return null
            const result = await executeMutation<Snapshot | null>(source, {
                backend: async (token) => {
                    const { createSnapshotBackend } =
                        await import('@/api/backend')
                    return createSnapshotBackend(token, branchId!, {
                        brandConfig,
                        label,
                        isAutoSave,
                    }) as unknown as Snapshot
                },
                mock: () =>
                    mockApi.createSnapshot(
                        branchId,
                        brandConfig,
                        label,
                        isAutoSave ?? true
                    ),
            })
            if (!result) return null
            return parseSnapshot(result)
        },
        onSuccess: async () => {
            if (!branchId) return
            await queryClient.invalidateQueries({
                predicate: (query) =>
                    isBranchScopeKeyForSource(
                        query.queryKey,
                        source,
                        branchId
                    ) || isBranchListKeyForSource(query.queryKey, source),
                refetchType: 'active',
            })
        },
    })

    const createSnapshot = useCallback(
        async (
            brandConfig: BrandConfig,
            label?: string,
            isAutoSave = true
        ): Promise<Snapshot | null> =>
            mutation.mutateAsync({ brandConfig, label, isAutoSave }),
        [mutation.mutateAsync]
    )

    return { createSnapshot, loading: mutation.isPending }
}

// ---------------------------------------------------------------------------
// useCreateBranchWithMock
// ---------------------------------------------------------------------------

export function useCreateBranchWithMock() {
    const source = useDataSource()
    const [firebaseUser] = useAuthState(auth)
    const { user } = useBackendAuth()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (
            input: CreateBranchInput
        ): Promise<Branch | null> => {
            const created = await executeMutation<Branch | null>(source, {
                backend: async (token) => {
                    const { createBranchBackend } =
                        await import('@/api/backend')
                    const orgId = user?.organizations?.[0]?.organizationId
                    return createBranchBackend(token, input, orgId)
                },
                firestore: async (idToken) => {
                    if (!firebaseUser) return null
                    const { createBranchFirestore } =
                        await import('@/api/firestore')
                    return createBranchFirestore(
                        idToken,
                        firebaseUser.uid,
                        firebaseUser.email || '',
                        firebaseUser.displayName || '',
                        input
                    )
                },
                mock: () => mockApi.createBranch(input),
            })
            if (!created) return null
            return parseBranch(created)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                predicate: (query) =>
                    isBranchListKeyForSource(query.queryKey, source),
                refetchType: 'active',
            })
        },
    })

    return {
        createBranch: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

// ---------------------------------------------------------------------------
// useDeleteBranchWithMock
// ---------------------------------------------------------------------------

export function useDeleteBranchWithMock() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (branchId: string): Promise<boolean> => {
            await executeMutation<void>(source, {
                backend: async (token) => {
                    const { deleteBranchBackend } =
                        await import('@/api/backend')
                    await deleteBranchBackend(token, branchId)
                },
                mock: () => mockApi.deleteBranch(branchId),
            })
            return true
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                predicate: (query) =>
                    isBranchListKeyForSource(query.queryKey, source),
                refetchType: 'active',
            })
        },
    })

    return {
        deleteBranch: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

// ---------------------------------------------------------------------------
// useForkBranchWithMock
// ---------------------------------------------------------------------------

export function useForkBranchWithMock() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({
            sourceBranchId,
            newName,
            slug,
        }: {
            sourceBranchId: string
            newName: string
            slug: string
        }): Promise<Branch | null> => {
            const created = await executeMutation<Branch | null>(source, {
                backend: async (token) => {
                    const { forkBranchBackend } = await import('@/api/backend')
                    return forkBranchBackend(token, sourceBranchId, newName)
                },
                mock: () => mockApi.forkBranch(sourceBranchId, newName, slug),
            })
            if (!created) return null
            return parseBranch(created)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                predicate: (query) =>
                    isBranchListKeyForSource(query.queryKey, source),
                refetchType: 'active',
            })
        },
    })

    const forkBranch = useCallback(
        async (
            sourceBranchId: string,
            newName: string,
            slug: string
        ): Promise<Branch | null> =>
            mutation.mutateAsync({ sourceBranchId, newName, slug }),
        [mutation]
    )

    return {
        forkBranch,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

// ---------------------------------------------------------------------------
// useResolvedTokens (no data source needed — pure computation)
// ---------------------------------------------------------------------------

export function useResolvedTokensWithMock(
    brandConfig: BrandConfig | null,
    theme: 'light' | 'dark' = 'light'
) {
    return useCallback(() => {
        if (!brandConfig) return null
        const {
            resolveBrandTokens,
        } = require('@juspay/blend-design-system/tokens')
        return resolveBrandTokens(brandConfig, theme)
    }, [brandConfig, theme])
}

// ---------------------------------------------------------------------------
// Organization Hooks
// ---------------------------------------------------------------------------

type OrganizationData = {
    id: string
    name: string
    slug: string
    defaultBranchId: string | null
    blendVersion: string | null
    wcagEnforcement: string
    createdAt: string
    updatedAt: string
}

export function useOrganization(orgId: string | null) {
    const source = useDataSource()

    const query = useQuery({
        queryKey: ['organization', source.type, orgId],
        enabled: source.type !== 'none' && !!orgId,
        queryFn: async () => {
            const result =
                await executeQueryWithDefault<OrganizationData | null>(
                    source,
                    {
                        backend: async (token) => {
                            const { getOrganizationBackend } =
                                await import('@/api/backend')
                            return getOrganizationBackend(token, orgId!)
                        },
                        mock: async () => {
                            const { mockGovernanceApi } =
                                await import('@/api/mock/mock-governance')
                            return mockGovernanceApi.getOrganization(orgId!)
                        },
                    },
                    null
                )
            return result
        },
    })

    return {
        organization: query.data ?? null,
        loading: query.isLoading,
        error: query.error?.message ?? null,
    }
}

export function useUpdateOrganization() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (input: {
            orgId: string
            updates: {
                name?: string
                defaultBranchId?: string | null
                blendVersion?: string | null
                wcagEnforcement?: 'none' | 'warn' | 'block'
            }
        }) => {
            const result = await executeMutation<OrganizationData>(source, {
                backend: async (token) => {
                    const { updateOrganizationBackend } =
                        await import('@/api/backend')
                    return updateOrganizationBackend(
                        token,
                        input.orgId,
                        input.updates
                    )
                },
                mock: async () => {
                    const { mockGovernanceApi } =
                        await import('@/api/mock/mock-governance')
                    return mockGovernanceApi.updateOrganization(
                        input.orgId,
                        input.updates
                    )
                },
            })
            return result
        },
        onSuccess: (
            _data: unknown,
            variables: {
                orgId: string
                updates: {
                    name?: string
                    defaultBranchId?: string | null
                    blendVersion?: string | null
                    wcagEnforcement?: 'none' | 'warn' | 'block'
                }
            }
        ) => {
            queryClient.invalidateQueries({
                queryKey: ['organization', variables.orgId],
            })
        },
    })

    return {
        updateOrganization: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

// ---------------------------------------------------------------------------
// Token Lock Hooks
// ---------------------------------------------------------------------------

export function useTokenLocks(orgId: string | null) {
    const source = useDataSource()

    const query = useQuery({
        queryKey: ['tokenLocks', source.type, orgId],
        enabled: source.type !== 'none' && !!orgId,
        queryFn: async () => {
            const result = await executeQueryWithDefault<TokenLock[]>(
                source,
                {
                    backend: async (token) => {
                        const { listTokenLocksBackend } =
                            await import('@/api/backend')
                        return listTokenLocksBackend(token, orgId!)
                    },
                    mock: async () => {
                        const { mockGovernanceApi } =
                            await import('@/api/mock/mock-governance')
                        return mockGovernanceApi.listTokenLocks(orgId!)
                    },
                },
                []
            )
            return result
        },
    })

    return {
        locks: query.data ?? [],
        loading: query.isLoading,
        error: query.error?.message ?? null,
    }
}

export function useLockToken() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (input: {
            orgId: string
            tokenPath: string
            reason?: string
        }) => {
            const result = await executeMutation<TokenLock>(source, {
                backend: async (token) => {
                    const { lockTokenBackend } = await import('@/api/backend')
                    return lockTokenBackend(
                        token,
                        input.orgId,
                        input.tokenPath,
                        input.reason
                    )
                },
                mock: async () => {
                    const { mockGovernanceApi } =
                        await import('@/api/mock/mock-governance')
                    return mockGovernanceApi.lockToken(
                        input.orgId,
                        input.tokenPath,
                        input.reason
                    )
                },
            })
            return result
        },
        onSuccess: (
            _data: unknown,
            variables: { orgId: string; tokenPath: string; reason?: string }
        ) => {
            queryClient.invalidateQueries({
                queryKey: ['tokenLocks', variables.orgId],
            })
        },
    })

    return {
        lockToken: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

export function useUnlockToken() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (input: { orgId: string; tokenPath: string }) => {
            await executeMutation<void>(source, {
                backend: async (token) => {
                    const { unlockTokenBackend } = await import('@/api/backend')
                    return unlockTokenBackend(
                        token,
                        input.orgId,
                        input.tokenPath
                    )
                },
                mock: async () => {
                    const { mockGovernanceApi } =
                        await import('@/api/mock/mock-governance')
                    return mockGovernanceApi.unlockToken(
                        input.orgId,
                        input.tokenPath
                    )
                },
            })
        },
        onSuccess: (
            _data: unknown,
            variables: { orgId: string; tokenPath: string }
        ) => {
            queryClient.invalidateQueries({
                queryKey: ['tokenLocks', variables.orgId],
            })
        },
    })

    return {
        unlockToken: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

// ---------------------------------------------------------------------------
// Merge Request Hooks
// ---------------------------------------------------------------------------

export function useMergeRequests(options?: {
    organizationId?: string
    status?: string
}) {
    const source = useDataSource()

    const query = useQuery({
        queryKey: ['mergeRequests', source.type, options],
        enabled: source.type !== 'none',
        queryFn: async () => {
            const result = await executeQueryWithDefault<{
                mergeRequests: MergeRequest[]
            }>(
                source,
                {
                    backend: async (token) => {
                        const { listMergeRequestsBackend } =
                            await import('@/api/backend')
                        return listMergeRequestsBackend(token, options)
                    },
                    mock: async () => {
                        const { mockGovernanceApi } =
                            await import('@/api/mock/mock-governance')
                        return mockGovernanceApi.listMergeRequests({
                            status: options?.status,
                        })
                    },
                },
                { mergeRequests: [] }
            )
            return result
        },
    })

    return {
        mergeRequests: query.data?.mergeRequests ?? [],
        loading: query.isLoading,
        error: query.error?.message ?? null,
    }
}

export function useMergeRequest(mrId: string | null) {
    const source = useDataSource()

    const query = useQuery({
        queryKey: ['mergeRequest', source.type, mrId],
        enabled: source.type !== 'none' && !!mrId,
        queryFn: async () => {
            const result = await executeQueryWithDefault<MergeRequest | null>(
                source,
                {
                    backend: async (token) => {
                        const { getMergeRequestBackend } =
                            await import('@/api/backend')
                        return getMergeRequestBackend(token, mrId!)
                    },
                    mock: async () => {
                        const { mockGovernanceApi } =
                            await import('@/api/mock/mock-governance')
                        return mockGovernanceApi.getMergeRequest(mrId!)
                    },
                },
                null
            )
            return result
        },
    })

    return {
        mergeRequest: query.data ?? null,
        loading: query.isLoading,
        error: query.error?.message ?? null,
    }
}

export function useCreateMergeRequest() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (input: {
            sourceBranchId: string
            targetBranchId: string
            title: string
            description?: string
            organizationId?: string
        }) => {
            const result = await executeMutation<MergeRequest>(source, {
                backend: async (token) => {
                    const { createMergeRequestBackend } =
                        await import('@/api/backend')
                    return createMergeRequestBackend(token, input)
                },
                mock: async () => {
                    const { mockGovernanceApi } =
                        await import('@/api/mock/mock-governance')
                    return mockGovernanceApi.createMergeRequest(input)
                },
            })
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mergeRequests'] })
        },
    })

    return {
        createMergeRequest: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

export function useApproveMergeRequest() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (input: { mrId: string; reviewComment?: string }) => {
            const result = await executeMutation<MergeRequest>(source, {
                backend: async (token) => {
                    const { approveMergeRequestBackend } =
                        await import('@/api/backend')
                    return approveMergeRequestBackend(
                        token,
                        input.mrId,
                        input.reviewComment
                    )
                },
                mock: async () => {
                    const { mockGovernanceApi } =
                        await import('@/api/mock/mock-governance')
                    return mockGovernanceApi.approveMergeRequest(
                        input.mrId,
                        input.reviewComment
                    )
                },
            })
            return result
        },
        onSuccess: (
            _data: unknown,
            variables: { mrId: string; reviewComment?: string }
        ) => {
            queryClient.invalidateQueries({
                queryKey: ['mergeRequest', variables.mrId],
            })
            queryClient.invalidateQueries({ queryKey: ['mergeRequests'] })
        },
    })

    return {
        approveMergeRequest: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

export function useRejectMergeRequest() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (input: { mrId: string; reviewComment?: string }) => {
            const result = await executeMutation<MergeRequest>(source, {
                backend: async (token) => {
                    const { rejectMergeRequestBackend } =
                        await import('@/api/backend')
                    return rejectMergeRequestBackend(
                        token,
                        input.mrId,
                        input.reviewComment
                    )
                },
                mock: async () => {
                    const { mockGovernanceApi } =
                        await import('@/api/mock/mock-governance')
                    return mockGovernanceApi.rejectMergeRequest(
                        input.mrId,
                        input.reviewComment
                    )
                },
            })
            return result
        },
        onSuccess: (
            _data: unknown,
            variables: { mrId: string; reviewComment?: string }
        ) => {
            queryClient.invalidateQueries({
                queryKey: ['mergeRequest', variables.mrId],
            })
            queryClient.invalidateQueries({ queryKey: ['mergeRequests'] })
        },
    })

    return {
        rejectMergeRequest: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

export function useMergeMergeRequest() {
    const source = useDataSource()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (mrId: string) => {
            const result = await executeMutation<MergeRequest>(source, {
                backend: async (token) => {
                    const { mergeMergeRequestBackend } =
                        await import('@/api/backend')
                    return mergeMergeRequestBackend(token, mrId)
                },
                mock: async () => {
                    const { mockGovernanceApi } =
                        await import('@/api/mock/mock-governance')
                    return mockGovernanceApi.mergeMergeRequest(mrId)
                },
            })
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mergeRequests'] })
            queryClient.invalidateQueries({ queryKey: ['branches'] })
        },
    })

    return {
        mergeMergeRequest: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
    }
}

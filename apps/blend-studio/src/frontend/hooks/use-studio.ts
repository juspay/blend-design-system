import { useState, useEffect, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { featureFlags } from '@/lib/feature-flags'
import { mockApi } from '@/api/mock/mock-data'
import {
    resolveBrandTokens,
    type Branch,
    type BranchListOptions,
    type BrandConfig,
    type CreateBranchInput,
    type Version,
    type Snapshot,
} from '@blend-design/token-engine'

// Import Firestore hooks
export * from '@/api/firestore'

// Export re-exported functions from token-engine
export {
    validateBranchId,
    validateVersion,
    incrementVersion,
    parseBranchId,
} from '@blend-design/token-engine'

// Wrapper hooks that use feature flags
export function useBranchesWithMock(options?: BranchListOptions) {
    const [user] = useAuthState(auth)
    const [branches, setBranches] = useState<Branch[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBranches = useCallback(async () => {
        const flags = featureFlags.get()

        if (flags.useMockData) {
            // Mock mode - no auth required
            setLoading(true)
            try {
                const result = await mockApi.listBranches(options?.filters)
                setBranches(result.branches)
                setTotal(result.total)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
            return
        }

        // Real Firestore mode
        if (!user) {
            setBranches([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const idToken = await user.getIdToken()
            const { listBranchesFirestore } = await import('@/api/firestore')
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

export function useBranchWithMock(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [branch, setBranch] = useState<Branch | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBranch = async () => {
            const flags = featureFlags.get()

            if (flags.useMockData) {
                setLoading(true)
                try {
                    const data = await mockApi.getBranch(branchId!)
                    setBranch(data)
                    setError(null)
                } catch (err) {
                    setError(
                        err instanceof Error ? err.message : 'Unknown error'
                    )
                } finally {
                    setLoading(false)
                }
                return
            }

            if (!user || !branchId) {
                setBranch(null)
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const { getBranchFirestore } = await import('@/api/firestore')
                const data = await getBranchFirestore(idToken, branchId)
                setBranch(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        if (branchId) {
            fetchBranch()
        }
    }, [user, branchId])

    const updateBranch = useCallback(
        async (
            branchId: string,
            updates: {
                brandConfig?: BrandConfig
                name?: string
                description?: string
            }
        ) => {
            const flags = featureFlags.get()

            if (flags.useMockData) {
                return mockApi.updateBranch(branchId, updates)
            }

            if (!user) return null

            const idToken = await user.getIdToken()
            const { updateBranchFirestore } = await import('@/api/firestore')
            return updateBranchFirestore(idToken, branchId, updates, user.uid)
        },
        [user]
    )

    return { branch, loading, error, updateBranch }
}

export function useVersionsWithMock(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [versions, setVersions] = useState<Version[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchVersions = async () => {
            const flags = featureFlags.get()

            if (flags.useMockData) {
                setLoading(true)
                try {
                    const data = await mockApi.listVersions(branchId!)
                    setVersions(data)
                    setError(null)
                } catch (err) {
                    setError(
                        err instanceof Error ? err.message : 'Unknown error'
                    )
                } finally {
                    setLoading(false)
                }
                return
            }

            // Real Firestore implementation
            if (!user || !branchId) {
                setVersions([])
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const { listVersionsFirestore } =
                    await import('@/api/firestore')
                const data = await listVersionsFirestore(idToken, branchId)
                setVersions(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        if (branchId) {
            fetchVersions()
        }
    }, [branchId, user])

    return { versions, loading, error }
}

export function usePublishVersionWithMock(branchId: string | null) {
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
                const flags = featureFlags.get()

                if (flags.useMockData) {
                    const data = await mockApi.publishVersion(branchId, input)
                    return data
                }

                // Real Firestore implementation
                const idToken = await user.getIdToken()
                const { publishVersionFirestore } =
                    await import('@/api/firestore')
                return publishVersionFirestore(
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
        [branchId, user]
    )

    return { publishVersion, loading, error }
}

export function useCreateSnapshotWithMock(branchId: string | null) {
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
                const flags = featureFlags.get()

                if (flags.useMockData) {
                    const data = await mockApi.createSnapshot(
                        branchId,
                        brandConfig,
                        label,
                        isAutoSave
                    )
                    return data
                }

                // Real Firestore implementation
                const idToken = await user.getIdToken()
                const { createSnapshotFirestore } =
                    await import('@/api/firestore')
                return createSnapshotFirestore(
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
        [branchId, user]
    )

    return { createSnapshot, loading, error }
}

export function useCreateBranchWithMock() {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createBranch = useCallback(
        async (input: CreateBranchInput): Promise<Branch | null> => {
            if (!user) return null

            setLoading(true)
            setError(null)

            try {
                const flags = featureFlags.get()

                if (flags.useMockData) {
                    const data = await mockApi.createBranch(input)
                    return data
                }

                // Real Firestore implementation
                const idToken = await user.getIdToken()
                const { createBranchFirestore } =
                    await import('@/api/firestore')
                return createBranchFirestore(
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

export function useResolvedTokens(
    brandConfig: BrandConfig | null,
    theme: 'light' | 'dark' = 'light'
) {
    return useCallback(() => {
        if (!brandConfig) return null
        return resolveBrandTokens(brandConfig, theme)
    }, [brandConfig, theme])
}

import { useState, useEffect, useCallback, useMemo } from 'react'
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
} from '@blend-design/token-engine'

const API_BASE = '/api/studio'

async function fetchApi<T>(
    path: string,
    options: RequestInit = {},
    idToken?: string | null
): Promise<{
    success: boolean
    data?: T
    error?: { code: string; message: string }
}> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    }

    if (idToken) {
        headers['Authorization'] = `Bearer ${idToken}`
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    })

    return response.json()
}

export function useBranches(options?: BranchListOptions) {
    const [user] = useAuthState(auth)
    const [result, setResult] = useState<BranchListResult | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBranches = useCallback(async () => {
        if (!user) {
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const idToken = await user.getIdToken()
            const params = new URLSearchParams()

            if (options?.filters?.status) {
                params.set('status', options.filters.status)
            }
            if (options?.filters?.search) {
                params.set('search', options.filters.search)
            }
            if (options?.sortBy) {
                params.set('sortBy', options.sortBy)
            }
            if (options?.limit) {
                params.set('limit', String(options.limit))
            }

            const response = await fetchApi<BranchListResult>(
                `/branches?${params.toString()}`,
                {},
                idToken
            )

            if (response.success && response.data) {
                setResult(response.data)
            } else {
                setError(response.error?.message || 'Failed to fetch branches')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }, [
        user,
        options?.filters?.status,
        options?.filters?.search,
        options?.sortBy,
        options?.limit,
    ])

    useEffect(() => {
        fetchBranches()
    }, [fetchBranches])

    return {
        branches: result?.branches ?? [],
        total: result?.total ?? 0,
        hasMore: result?.hasMore ?? false,
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
            setLoading(false)
            return
        }

        const fetchBranch = async () => {
            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const response = await fetchApi<Branch>(
                    `/branches/${encodeURIComponent(branchId)}`,
                    {},
                    idToken
                )

                if (response.success && response.data) {
                    setBranch(response.data)
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

            const idToken = await user.getIdToken()
            const response = await fetchApi<Branch>(
                `/branches/${encodeURIComponent(branchId)}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(updates),
                },
                idToken
            )

            if (response.success && response.data) {
                setBranch(response.data)
                return response.data
            }

            throw new Error(
                response.error?.message || 'Failed to update branch'
            )
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
            setLoading(false)
            return
        }

        const fetchVersions = async () => {
            setLoading(true)
            setError(null)

            try {
                const idToken = await user.getIdToken()
                const response = await fetchApi<Version[]>(
                    `/branches/${encodeURIComponent(branchId)}/versions`,
                    {},
                    idToken
                )

                if (response.success && response.data) {
                    setVersions(response.data)
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
                const response = await fetchApi<Branch>(
                    '/branches',
                    {
                        method: 'POST',
                        body: JSON.stringify(input),
                    },
                    idToken
                )

                if (response.success && response.data) {
                    return response.data
                }

                setError(response.error?.message || 'Failed to create branch')
                return null
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
                const response = await fetchApi<Version>(
                    `/branches/${encodeURIComponent(branchId)}/publish`,
                    {
                        method: 'POST',
                        body: JSON.stringify(input),
                    },
                    idToken
                )

                if (response.success && response.data) {
                    return response.data
                }

                setError(response.error?.message || 'Failed to publish version')
                return null
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

export function useResolvedTokens(
    brandConfig: BrandConfig | null,
    theme: 'light' | 'dark' = 'light'
) {
    return useMemo(() => {
        if (!brandConfig) return null
        return resolveBrandTokens(brandConfig, theme)
    }, [brandConfig, theme])
}

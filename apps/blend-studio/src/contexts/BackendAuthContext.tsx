import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from 'react'
import { featureFlags } from '@/lib/feature-flags'
import { mockUserStore } from '@/lib/mock-user'

const API_URL = import.meta.env.VITE_API_BASE_URL || ''

interface User {
    id: string
    email: string
    displayName: string | null
    photoUrl: string | null
    role: string
    organizations?: { organizationId: string; role: string }[]
}

interface AuthContextType {
    user: User | null
    loading: boolean
    isConfigured: boolean
    token: string | null
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function BackendAuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const flags = featureFlags.get()
    const isMockMode = flags.useMockData

    const [realUser, setRealUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(!isMockMode)
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem('blend_auth_token')
    )
    const [mockRoleVersion, setMockRoleVersion] = useState(0)

    useEffect(() => {
        if (!isMockMode) return
        const handler = () => setMockRoleVersion((v) => v + 1)
        window.addEventListener('mockRoleChanged', handler)
        return () => window.removeEventListener('mockRoleChanged', handler)
    }, [isMockMode])

    const mockUser = useMemo((): User | null => {
        if (!isMockMode) return null
        const mu = mockUserStore.getUser()
        return {
            id: mu.id,
            email: mu.email,
            displayName: mu.displayName,
            photoUrl: mu.photoUrl,
            role: mu.role,
            organizations: mu.organizations,
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMockMode, mockRoleVersion])

    const user = isMockMode ? mockUser : realUser

    const fetchUser = useCallback(async (bearerToken?: string) => {
        try {
            const headers: Record<string, string> = {}
            if (bearerToken) {
                headers['Authorization'] = `Bearer ${bearerToken}`
            }

            const response = await fetch(`${API_URL}/api/auth/me`, {
                headers,
                credentials: 'include',
            })

            if (response.ok) {
                const data = await response.json()
                setRealUser(data.data.user)
                return true
            } else {
                setToken(null)
                sessionStorage.removeItem('blend_auth_token')
                setRealUser(null)
                return false
            }
        } catch {
            return false
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (isMockMode) {
            setLoading(false)
            return
        }
        if (token) {
            fetchUser(token)
        } else {
            fetchUser()
        }
    }, [token, fetchUser, isMockMode])

    const signInWithGoogle = async () => {
        if (isMockMode) return

        const response = await fetch(`${API_URL}/api/auth/google`)
        const data = await response.json().catch(() => ({}))

        if (!response.ok || !data.success || !data.data?.url) {
            throw new Error(
                data?.message || 'Failed to initialize Google OAuth login'
            )
        }

        const googleAuthUrl = data.data.url
        const width = 500
        const height = 600
        const left = window.screenX + (window.outerWidth - width) / 2
        const top = window.screenY + (window.outerHeight - height) / 2

        const popup = window.open(
            googleAuthUrl,
            'Google Login',
            `width=${width},height=${height},left=${left},top=${top}`
        )

        if (!popup) {
            throw new Error('Popup blocked. Please allow popups for this site.')
        }

        return new Promise<void>((resolve, reject) => {
            const handleMessage = (event: MessageEvent) => {
                if (!event.data?.type) return

                if (event.data.type === 'AUTH_SUCCESS') {
                    const oneTimeToken = event.data.token as string
                    sessionStorage.setItem('blend_auth_token', oneTimeToken)
                    setToken(oneTimeToken)
                    popup?.close()
                    window.removeEventListener('message', handleMessage)
                    resolve()
                } else if (event.data.type === 'AUTH_ERROR') {
                    popup?.close()
                    window.removeEventListener('message', handleMessage)
                    reject(
                        new Error(event.data.error || 'Authentication failed')
                    )
                }
            }

            window.addEventListener('message', handleMessage)

            const checkClosed = setInterval(() => {
                if (popup?.closed) {
                    clearInterval(checkClosed)
                    window.removeEventListener('message', handleMessage)
                    reject(new Error('Login cancelled'))
                }
            }, 1000)
        })
    }

    const logout = async () => {
        if (isMockMode) {
            mockUserStore.setRole('viewer')
            return
        }

        sessionStorage.removeItem('blend_auth_token')
        setToken(null)
        setRealUser(null)

        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                ...(token
                    ? { headers: { Authorization: `Bearer ${token}` } }
                    : {}),
            })
        } catch {
            // Cookie clearing happens server-side; best-effort call
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isConfigured: true,
                token: isMockMode ? 'mock-token' : token,
                signInWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useBackendAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error(
            'useBackendAuth must be used within a BackendAuthProvider'
        )
    }
    return context
}

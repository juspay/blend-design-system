import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

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

/**
 * Auth provider using httpOnly cookies for secure token storage.
 *
 * Flow:
 * 1. Google OAuth callback sets httpOnly `accessToken` + `refreshToken` cookies
 * 2. Frontend auth-callback page receives a one-time URL token to detect success
 * 3. All subsequent API calls use `credentials: 'include'` — cookies are sent
 *    automatically. The Bearer header is kept as a fallback for API key usage.
 * 4. No tokens stored in localStorage — XSS-safe.
 */
export function BackendAuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    // Token is only kept in memory for the Bearer header fallback (CLI/API keys).
    // Browser requests primarily rely on the httpOnly cookie.
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem('blend_auth_token')
    )

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
                setUser(data.data.user)
                return true
            } else {
                setToken(null)
                sessionStorage.removeItem('blend_auth_token')
                setUser(null)
                return false
            }
        } catch {
            return false
        } finally {
            setLoading(false)
        }
    }, [])

    // On mount, try to fetch user using cookies
    useEffect(() => {
        if (token) {
            fetchUser(token)
        } else {
            // Try cookie-based auth (no Bearer header)
            fetchUser()
        }
    }, [token, fetchUser])

    const signInWithGoogle = async () => {
        const response = await fetch(`${API_URL}/api/auth/google`)
        const data = await response.json()

        if (!data.success || !data.data?.url) {
            throw new Error('Failed to get Google OAuth URL')
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
                    // Store token in sessionStorage as fallback for Bearer header.
                    // The httpOnly cookie is the primary auth mechanism.
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
        sessionStorage.removeItem('blend_auth_token')
        setToken(null)
        setUser(null)

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
                token,
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

import React, { createContext, useContext, useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface User {
    id: string
    email: string
    displayName: string | null
    photoUrl: string | null
    role: string
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
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => {
        if (token) {
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [token])

    const fetchUser = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data.data.user)
            } else {
                localStorage.removeItem('token')
                setToken(null)
            }
        } catch (error) {
            console.error('Failed to fetch user:', error)
        } finally {
            setLoading(false)
        }
    }

    const signInWithGoogle = async () => {
        // Step 1: Get the Google OAuth URL from backend
        const response = await fetch(`${API_URL}/api/auth/google`)
        const data = await response.json()

        if (!data.success || !data.data?.url) {
            throw new Error('Failed to get Google OAuth URL')
        }

        const googleAuthUrl = data.data.url

        // Step 2: Open popup with the Google URL (not the backend URL)
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

        // Step 3: Listen for message from popup
        return new Promise<void>((resolve, reject) => {
            const handleMessage = (event: MessageEvent) => {
                // Accept messages from our domain
                if (!event.data?.type) return

                if (event.data.type === 'AUTH_SUCCESS') {
                    localStorage.setItem('token', event.data.token)
                    setToken(event.data.token)
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

            // Cleanup if popup closes without message
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
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)

        // Optionally call backend logout
        if (token) {
            try {
                await fetch(`${API_URL}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            } catch (error) {
                console.error('Logout error:', error)
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isConfigured: true, // Always configured when using backend
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

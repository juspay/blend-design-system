'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    User,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/navigation'

// Basic types to replace the deleted role-service
interface UserData {
    uid: string
    email: string
    displayName?: string
    photoURL?: string
    role?: string
}

interface UserRole {
    id: string
    name: string
    permissions: string[]
}

interface AuthContextType {
    user: User | null
    userData: UserData | null
    userRole: UserRole | null
    loading: boolean
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
    hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [userRole, setUserRole] = useState<UserRole | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const getRoleName = (role: string) => {
        const roleNames: Record<string, string> = {
            admin: 'Administrator',
            developer: 'Developer',
            viewer: 'Viewer',
        }
        return roleNames[role] || 'Viewer'
    }

    const getRolePermissions = (role: string) => {
        const rolePermissions: Record<string, string[]> = {
            admin: ['*'],
            developer: ['read', 'write', 'deploy'],
            viewer: ['read'],
        }
        return rolePermissions[role] || ['read']
    }

    useEffect(() => {
        // Create or update user in PostgreSQL
        const createOrUpdateUser = async (firebaseUser: User) => {
            try {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firebase_uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        display_name: firebaseUser.displayName,
                        photo_url: firebaseUser.photoURL,
                    }),
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.success) {
                        setUserData({
                            uid: data.user.firebase_uid,
                            email: data.user.email,
                            displayName: data.user.display_name,
                            photoURL: data.user.photo_url,
                            role: data.user.role,
                        })

                        // Set user role based on database role
                        setUserRole({
                            id: data.user.role,
                            name: getRoleName(data.user.role),
                            permissions: getRolePermissions(data.user.role),
                        })
                    } else {
                        console.error(
                            'Failed to create/update user:',
                            data.error
                        )
                    }
                }
            } catch (error) {
                console.error('Error creating/updating user:', error)
            }
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)

            if (firebaseUser) {
                // Create or update user in PostgreSQL
                await createOrUpdateUser(firebaseUser)

                // Log user activity
                try {
                    await fetch('/api/users/activity', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: firebaseUser.uid,
                            action: 'user_login',
                            details: {
                                timestamp: new Date().toISOString(),
                                user_agent: navigator.userAgent,
                            },
                        }),
                    })
                } catch (error) {
                    console.error('Error logging user activity:', error)
                }
            } else {
                setUserData(null)
                setUserRole(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [getRoleName, getRolePermissions])

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            // User creation/update happens automatically in onAuthStateChanged
            router.push('/')
        } catch (error) {
            console.error('Error signing in with Google:', error)
            throw error
        }
    }

    const logout = async () => {
        try {
            // Log logout activity
            if (user) {
                try {
                    await fetch('/api/users/activity', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: user.uid,
                            action: 'user_logout',
                            details: {
                                timestamp: new Date().toISOString(),
                            },
                        }),
                    })
                } catch (error) {
                    console.error('Error logging logout activity:', error)
                }
            }

            await signOut(auth)
            setUserData(null)
            setUserRole(null)
            router.push('/login')
        } catch (error) {
            console.error('Error signing out:', error)
            throw error
        }
    }

    const hasPermission = (permission: string): boolean => {
        if (!userRole) return false
        return (
            userRole.permissions.includes('*') ||
            userRole.permissions.includes(permission)
        )
    }

    const value = {
        user,
        userData,
        userRole,
        loading,
        signInWithGoogle,
        logout,
        hasPermission,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

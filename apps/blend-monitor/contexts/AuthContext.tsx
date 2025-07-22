'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { roleService, UserData, UserRole } from '@/lib/role-service'
import { activityService, ActivityAction } from '@/lib/activity-service'

interface AuthContextType {
    user: User | null
    userData: UserData | null
    userRole: UserRole | null
    loading: boolean
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
    hasPermission: (resource: string, action: string) => boolean
    refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [userRole, setUserRole] = useState<UserRole | null>(null)
    const [loading, setLoading] = useState(true)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!auth) {
            setLoading(false)
            return
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user)

            if (user) {
                try {
                    // Initialize roles after authentication
                    await roleService.initializeRoles()

                    // Create or update user data in database
                    const userData = await roleService.createOrUpdateUser(user)
                    setUserData(userData)

                    // Get user role
                    const userRole = await roleService.getUserRole(user.uid)
                    setUserRole(userRole)

                    // Only log login activity for actual new logins, not session restores
                    // Check if this is a new sign-in by looking at the lastSignInTime
                    const metadata = user.metadata
                    const lastSignIn = metadata.lastSignInTime
                        ? new Date(metadata.lastSignInTime).getTime()
                        : 0
                    const creationTime = metadata.creationTime
                        ? new Date(metadata.creationTime).getTime()
                        : 0
                    const now = Date.now()

                    // Log activity if:
                    // 1. This is a brand new user (creation time is very recent)
                    // 2. OR this is a fresh login (last sign in was within the last 10 seconds)
                    // 3. AND we haven't already logged it in this session
                    const isNewUser = now - creationTime < 10000 // Created within last 10 seconds
                    const isFreshLogin = now - lastSignIn < 10000 // Signed in within last 10 seconds

                    if ((isNewUser || isFreshLogin) && !isInitialLoad) {
                        await activityService.logUserActivity(
                            user.uid,
                            ActivityAction.USER_LOGIN,
                            {
                                email: user.email,
                                provider:
                                    user.providerData[0]?.providerId ||
                                    'unknown',
                            }
                        )
                    }
                } catch (error) {
                    console.error('Error setting up user data:', error)
                }
            } else {
                setUserData(null)
                setUserRole(null)
            }

            setLoading(false)
            setIsInitialLoad(false)
        })

        return () => unsubscribe()
    }, [isInitialLoad])

    // Subscribe to user data changes
    useEffect(() => {
        if (!user) return

        const unsubscribeUserData = roleService.subscribeToUserData(
            user.uid,
            (userData) => {
                setUserData(userData)
            }
        )

        return unsubscribeUserData
    }, [user])

    // Subscribe to role changes
    useEffect(() => {
        if (!userData) return

        const unsubscribeRole = roleService.subscribeToRole(
            userData.role,
            (role) => {
                setUserRole(role)
            }
        )

        return unsubscribeRole
    }, [userData?.role])

    const signInWithGoogle = async () => {
        if (!auth) {
            throw new Error('Firebase auth not initialized')
        }

        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            if (result.user) {
                // Log login activity immediately after successful sign-in
                await activityService.logUserActivity(
                    result.user.uid,
                    ActivityAction.USER_LOGIN,
                    {
                        email: result.user.email,
                        provider: 'google.com',
                    }
                )
                router.push('/')
            }
        } catch (error) {
            console.error('Error signing in with Google:', error)
            throw error
        }
    }

    const logout = async () => {
        if (!auth) {
            throw new Error('Firebase auth not initialized')
        }

        try {
            // Log logout activity before signing out
            if (user) {
                await activityService.logUserActivity(
                    user.uid,
                    ActivityAction.USER_LOGOUT
                )
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

    const hasPermission = (resource: string, action: string): boolean => {
        return roleService.hasPermission(userRole, resource, action)
    }

    const refreshUserData = async () => {
        if (!user) return

        try {
            const userData = await roleService.getUserData(user.uid)
            setUserData(userData)

            if (userData) {
                const userRole = await roleService.getUserRole(user.uid)
                setUserRole(userRole)
            }
        } catch (error) {
            console.error('Error refreshing user data:', error)
        }
    }

    const value = {
        user,
        userData,
        userRole,
        loading,
        signInWithGoogle,
        logout,
        hasPermission,
        refreshUserData,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

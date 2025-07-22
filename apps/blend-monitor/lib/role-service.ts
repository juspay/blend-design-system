import {
    getDatabase,
    ref,
    set,
    get,
    onValue,
    off,
    Database,
} from 'firebase/database'
import { User } from 'firebase/auth'
import { app } from './firebase'

export interface Permission {
    resource: string
    actions: string[]
}

export interface UserRole {
    id: string
    name: string
    permissions: Record<string, string[]>
    isCustom: boolean
}

export interface UserData {
    email: string
    displayName: string
    role: string
    createdAt: string
    lastLogin: string
    isActive: boolean
    photoURL?: string
}

// Default roles configuration
export const DEFAULT_ROLES: Record<string, UserRole> = {
    admin: {
        id: 'admin',
        name: 'Administrator',
        permissions: {
            deployments: ['read', 'write', 'deploy', 'rollback'],
            users: ['read', 'write', 'delete', 'create', 'assign_roles'],
            components: ['read', 'write'],
            settings: ['read', 'write'],
        },
        isCustom: false,
    },
    developer: {
        id: 'developer',
        name: 'Developer',
        permissions: {
            deployments: ['read', 'deploy', 'rollback'],
            components: ['read', 'write'],
            users: ['read'],
        },
        isCustom: false,
    },
    viewer: {
        id: 'viewer',
        name: 'Viewer',
        permissions: {
            deployments: ['read'],
            components: ['read'],
            users: ['read'],
        },
        isCustom: false,
    },
}

// Admin email for bootstrap
const ADMIN_EMAIL = 'deepanshu.kumar@juspay.in'

export class RoleService {
    private db: Database | null = null

    private getDb(): Database {
        if (!this.db) {
            if (!app) {
                throw new Error('Firebase app not initialized')
            }
            this.db = getDatabase(app)
        }
        return this.db
    }

    // Initialize default roles in database
    async initializeRoles() {
        try {
            const db = this.getDb()
            const rolesRef = ref(db, 'roles')
            const snapshot = await get(rolesRef)

            if (!snapshot.exists()) {
                await set(rolesRef, DEFAULT_ROLES)
                console.log('Default roles initialized')
            }
        } catch (error) {
            console.error('Error initializing roles:', error)
        }
    }

    // Create or update user data
    async createOrUpdateUser(user: User): Promise<UserData> {
        try {
            const db = this.getDb()
            const userRef = ref(db, `users/${user.uid}`)
            const snapshot = await get(userRef)

            const now = new Date().toISOString()
            let userData: UserData

            if (snapshot.exists()) {
                // Update existing user
                userData = {
                    ...snapshot.val(),
                    lastLogin: now,
                    displayName: user.displayName || snapshot.val().displayName,
                    photoURL: user.photoURL || snapshot.val().photoURL,
                    isActive: true, // Mark as active when they sign in
                }
            } else {
                // Check if user was invited
                const inviteId = user.email!.replace(/[.#$[\]]/g, '_')
                const inviteRef = ref(db, `users/${inviteId}`)
                const inviteSnapshot = await get(inviteRef)

                if (inviteSnapshot.exists()) {
                    // User was invited - use their pre-assigned role
                    const invitedData = inviteSnapshot.val()
                    userData = {
                        email: user.email!,
                        displayName: user.displayName || '',
                        role: invitedData.role, // Use the invited role
                        createdAt: invitedData.createdAt, // Keep original creation time
                        lastLogin: now,
                        isActive: true,
                        photoURL: user.photoURL || '',
                    }

                    // Delete the invite entry
                    await set(inviteRef, null)
                } else {
                    // Create new user
                    const isAdmin = user.email === ADMIN_EMAIL
                    userData = {
                        email: user.email!,
                        displayName: user.displayName || '',
                        role: isAdmin ? 'admin' : 'viewer',
                        createdAt: now,
                        lastLogin: now,
                        isActive: true,
                        photoURL: user.photoURL || '',
                    }
                }
            }

            await set(userRef, userData)
            return userData
        } catch (error) {
            console.error('Error creating/updating user:', error)
            throw error
        }
    }

    // Get user data
    async getUserData(userId: string): Promise<UserData | null> {
        try {
            const db = this.getDb()
            const userRef = ref(db, `users/${userId}`)
            const snapshot = await get(userRef)
            return snapshot.exists() ? snapshot.val() : null
        } catch (error) {
            console.error('Error getting user data:', error)
            return null
        }
    }

    // Get user role
    async getUserRole(userId: string): Promise<UserRole | null> {
        try {
            const userData = await this.getUserData(userId)
            if (!userData) return null

            const db = this.getDb()
            const roleRef = ref(db, `roles/${userData.role}`)
            const snapshot = await get(roleRef)
            return snapshot.exists() ? snapshot.val() : null
        } catch (error) {
            console.error('Error getting user role:', error)
            return null
        }
    }

    // Check if user has permission
    hasPermission(
        userRole: UserRole | null,
        resource: string,
        action: string
    ): boolean {
        if (!userRole) return false

        const resourcePermissions = userRole.permissions[resource]
        if (!resourcePermissions) return false

        return resourcePermissions.includes(action)
    }

    // Get all users (for user management)
    async getAllUsers(): Promise<Record<string, UserData>> {
        try {
            const db = this.getDb()
            const snapshot = await get(ref(db, 'users'))
            return snapshot.val() || {}
        } catch (error) {
            console.error('Error getting all users:', error)
            throw error
        }
    }

    async inviteUser(email: string, role: string): Promise<void> {
        try {
            const db = this.getDb()
            // Generate a unique ID for the invited user
            const inviteId = email.replace(/[.#$[\]]/g, '_')

            // Create a pre-registered user entry
            const invitedUserData: UserData = {
                email,
                displayName: 'Invited User',
                role,
                createdAt: new Date().toISOString(),
                lastLogin: 'Never',
                isActive: false, // Will become active when they first sign in
                photoURL: '',
            }

            // Store the invited user
            await set(ref(db, `users/${inviteId}`), invitedUserData)

            console.log(`User ${email} invited with role: ${role}`)
        } catch (error) {
            console.error('Error inviting user:', error)
            throw error
        }
    }

    // Update user role (admin only)
    async updateUserRole(userId: string, newRole: string): Promise<void> {
        try {
            const db = this.getDb()
            const userRef = ref(db, `users/${userId}/role`)
            await set(userRef, newRole)
        } catch (error) {
            console.error('Error updating user role:', error)
            throw error
        }
    }

    // Update user status (admin only)
    async updateUserStatus(userId: string, isActive: boolean): Promise<void> {
        try {
            const db = this.getDb()
            const userRef = ref(db, `users/${userId}/isActive`)
            await set(userRef, isActive)
        } catch (error) {
            console.error('Error updating user status:', error)
            throw error
        }
    }

    // Delete user (admin only)
    async deleteUser(userId: string): Promise<void> {
        try {
            const db = this.getDb()
            const userRef = ref(db, `users/${userId}`)
            await set(userRef, null)
        } catch (error) {
            console.error('Error deleting user:', error)
            throw error
        }
    }

    // Listen to user data changes
    subscribeToUserData(
        userId: string,
        callback: (userData: UserData | null) => void
    ): () => void {
        const db = this.getDb()
        const userRef = ref(db, `users/${userId}`)

        const unsubscribe = onValue(userRef, (snapshot) => {
            const userData = snapshot.exists() ? snapshot.val() : null
            callback(userData)
        })

        return () => off(userRef, 'value', unsubscribe)
    }

    // Listen to role changes
    subscribeToRole(
        roleName: string,
        callback: (role: UserRole | null) => void
    ): () => void {
        const db = this.getDb()
        const roleRef = ref(db, `roles/${roleName}`)

        const unsubscribe = onValue(roleRef, (snapshot) => {
            const role = snapshot.exists() ? snapshot.val() : null
            callback(role)
        })

        return () => off(roleRef, 'value', unsubscribe)
    }
}

export const roleService = new RoleService()

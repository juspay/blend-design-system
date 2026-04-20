import { query } from './database'

export interface Role {
    id: string
    name: string
    permissions: Record<string, string[]>
}

export class RoleService {
    async getUserRole(userId: string): Promise<Role | null> {
        try {
            const result = await query<{ role: string }>(
                `SELECT role FROM users WHERE firebase_uid = $1`,
                [userId]
            )

            if (!result.rows[0]) {
                return null
            }

            const roleName = result.rows[0].role || 'viewer'

            // Define role permissions
            const rolePermissions: Record<string, Role> = {
                admin: {
                    id: 'admin',
                    name: 'Administrator',
                    permissions: {
                        users: ['read', 'write', 'delete'],
                        components: ['read', 'write', 'delete'],
                        npm: ['read', 'write', 'sync'],
                        system: ['read', 'write', 'configure'],
                    },
                },
                editor: {
                    id: 'editor',
                    name: 'Editor',
                    permissions: {
                        users: ['read'],
                        components: ['read', 'write'],
                        npm: ['read', 'sync'],
                        system: ['read'],
                    },
                },
                viewer: {
                    id: 'viewer',
                    name: 'Viewer',
                    permissions: {
                        users: ['read'],
                        components: ['read'],
                        npm: ['read'],
                        system: ['read'],
                    },
                },
            }

            return rolePermissions[roleName] || rolePermissions.viewer
        } catch (error) {
            console.error('Error getting user role:', error)
            return null
        }
    }

    async updateUserRole(userId: string, newRole: string): Promise<boolean> {
        try {
            const result = await query(
                `UPDATE users SET role = $1 WHERE firebase_uid = $2`,
                [newRole, userId]
            )

            return (result.rowCount || 0) > 0
        } catch (error) {
            console.error('Error updating user role:', error)
            return false
        }
    }
}

export const roleService = new RoleService()

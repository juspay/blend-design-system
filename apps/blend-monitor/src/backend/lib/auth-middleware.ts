import { NextRequest } from 'next/server'
import { getAdminAuth } from './firebase-admin'
import { roleService } from './role-service'

export interface AuthenticatedUser {
    uid: string
    email: string
    role: string
    permissions: Record<string, string[]>
}

export async function authenticateRequest(
    request: NextRequest
): Promise<AuthenticatedUser | null> {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null
        }

        const token = authHeader.substring(7)
        const adminAuth = getAdminAuth()

        // Verify the Firebase token
        const decodedToken = await adminAuth.verifyIdToken(token)

        // Get user role and permissions
        const userRole = await roleService.getUserRole(decodedToken.uid)
        if (!userRole) {
            return null
        }

        return {
            uid: decodedToken.uid,
            email: decodedToken.email || '',
            role: userRole.id,
            permissions: userRole.permissions,
        }
    } catch (error) {
        console.error('Authentication error:', error)
        return null
    }
}

export function hasPermission(
    user: AuthenticatedUser,
    resource: string,
    action: string
): boolean {
    const resourcePermissions = user.permissions[resource]
    if (!resourcePermissions) return false

    return resourcePermissions.includes(action)
}

export function requirePermission(resource: string, action: string) {
    return async (request: NextRequest, user: AuthenticatedUser | null) => {
        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Authentication required' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            )
        }

        if (!hasPermission(user, resource, action)) {
            return new Response(
                JSON.stringify({
                    error: `Insufficient permissions. Required: ${resource}:${action}`,
                    userRole: user.role,
                    requiredPermission: `${resource}:${action}`,
                }),
                { status: 403, headers: { 'Content-Type': 'application/json' } }
            )
        }

        return null // No error, permission granted
    }
}

// Audit logging for sensitive actions
export async function logAuditEvent(
    user: AuthenticatedUser,
    action: string,
    resource: string,
    details: Record<string, any> = {},
    result: 'success' | 'failed' = 'success'
) {
    try {
        const auditLog = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            action,
            user: user.email,
            timestamp: new Date().toISOString(),
            details,
            result,
            resource,
        }

        // In a real implementation, you would save this to your database
        console.log('Audit Log:', auditLog)

        // You could also save to Firebase Realtime Database
        // const { getAdminDatabase } = require('./firebase-admin')
        // const db = getAdminDatabase()
        // await db.ref(`audit-logs/${auditLog.id}`).set(auditLog)
    } catch (error) {
        console.error('Failed to log audit event:', error)
    }
}

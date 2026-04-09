import { getAdminAuth } from './firebase-admin'
import { roleService } from './role-service'

/** Subset of Fetch / Next request shape used for auth header reads. */
export type AuthHeaderSource = {
    headers: { get(name: string): string | null }
}

export interface AuthenticatedUser {
    uid: string
    email: string
    role: string
    permissions: Record<string, string[]>
}

export async function authenticateBearer(
    authorizationHeader: string | null
): Promise<AuthenticatedUser | null> {
    try {
        if (
            !authorizationHeader ||
            !authorizationHeader.startsWith('Bearer ')
        ) {
            return null
        }

        const token = authorizationHeader.substring(7)
        const adminAuth = getAdminAuth()

        const decodedToken = await adminAuth.verifyIdToken(token)

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

export async function authenticateRequest(
    request: AuthHeaderSource
): Promise<AuthenticatedUser | null> {
    return authenticateBearer(request.headers.get('authorization'))
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
    return async (
        _request: AuthHeaderSource,
        user: AuthenticatedUser | null
    ) => {
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
    details: Record<string, unknown> = {},
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

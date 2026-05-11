'use client'

import React from 'react'
import { useBackendAuth } from '@/contexts/BackendAuthContext'

interface PermissionGuardProps {
    resource: string
    action: string
    children: React.ReactNode
    fallback?: React.ReactNode
    showFallback?: boolean
}

export default function PermissionGuard({
    resource,
    action,
    children,
    fallback = null,
    showFallback = false,
}: PermissionGuardProps) {
    const { user } = useBackendAuth()

    // Simple permission check based on user role
    const hasPermission = (permission: string) => {
        if (!user) return false
        const [, permAction] = permission.split(':')
        // Admin has all permissions
        if (user.role === 'admin' || user.role === 'superadmin') return true
        // Editor can write
        if (user.role === 'editor' && permAction === 'write') return true
        // Everyone can read
        if (permAction === 'read') return true
        return false
    }

    const permission = `${resource}:${action}`

    if (!hasPermission(permission)) {
        return showFallback ? <>{fallback}</> : null
    }

    return <>{children}</>
}

// Higher-order component for permission-based rendering
export function withPermission<T extends object>(
    Component: React.ComponentType<T>,
    resource: string,
    action: string,
    fallback?: React.ReactNode
) {
    return function PermissionWrappedComponent(props: T) {
        return (
            <PermissionGuard
                resource={resource}
                action={action}
                fallback={fallback}
                showFallback={!!fallback}
            >
                <Component {...props} />
            </PermissionGuard>
        )
    }
}

// Hook for permission checking in components
export function usePermissions() {
    const { user } = useBackendAuth()

    const hasPermission = (_resource: string, action: string) => {
        if (!user) return false
        // Admin has all permissions
        if (user.role === 'admin' || user.role === 'superadmin') return true
        // Editor can write
        if (user.role === 'editor' && action === 'write') return true
        // Everyone can read
        if (action === 'read') return true
        return false
    }

    return {
        hasPermission: (resource: string, action: string) =>
            hasPermission(resource, action),
        userRole: user?.role || null,
        userData: user,
        canManageUsers: hasPermission('users', 'write'),
        canEditComponents: hasPermission('components', 'write'),
        canManageSettings: hasPermission('settings', 'write'),
        isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
        isEditor: user?.role === 'editor',
        isViewer: user?.role === 'viewer',
    }
}

'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'

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
    const { hasPermission } = useAuth()

    if (!hasPermission(resource, action)) {
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
    const { hasPermission, userRole, userData } = useAuth()

    return {
        hasPermission,
        userRole,
        userData,
        canManageUsers: hasPermission('users', 'write'),
        canDeploy: hasPermission('deployments', 'deploy'),
        canRollback: hasPermission('deployments', 'rollback'),
        canEditComponents: hasPermission('components', 'write'),
        canManageSettings: hasPermission('settings', 'write'),
        isAdmin: userData?.role === 'admin',
        isDeveloper: userData?.role === 'developer',
        isViewer: userData?.role === 'viewer',
    }
}

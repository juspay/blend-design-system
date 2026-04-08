'use client'

import React from 'react'
import {
    Home,
    Link,
    Package,
    Palette,
    Zap,
    Users,
    GitBranch,
    Eye,
} from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const tenants = [
    {
        label: 'Blend Studio',
        icon: (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                <Palette className="w-5 h-5" />
            </div>
        ),
        id: 'blend-studio',
    },
]

export const merchants = [] // Empty for now as not being used

export const getNavigationData = (
    router: AppRouterInstance,
    pathname: string
) => [
    // ---------------------------------------------------------------
    // Token Studio — accessible to all authenticated users
    // ---------------------------------------------------------------
    {
        label: 'Token Studio',
        isCollapsible: false,
        items: [
            {
                label: 'Branches',
                leftSlot: <GitBranch className="w-4 h-4" />,
                onClick: () => router.push('/studio'),
                isActive:
                    pathname === '/studio' ||
                    pathname.startsWith('/studio/editor'),
            },
            {
                label: 'Preview',
                leftSlot: <Eye className="w-4 h-4" />,
                onClick: () => router.push('/studio/preview'),
                isActive: pathname.startsWith('/studio/preview'),
            },
        ],
    },

    // ---------------------------------------------------------------
    // Monitor — admin-only section (existing functionality)
    // ---------------------------------------------------------------
    {
        label: 'Monitor',
        isCollapsible: true,
        items: [
            {
                label: 'Dashboard',
                leftSlot: <Home className="w-4 h-4" />,
                onClick: () => router.push('/'),
                isActive: pathname === '/',
            },
            {
                label: 'Code Connect',
                leftSlot: <Link className="w-4 h-4" />,
                onClick: () => router.push('/code-connect'),
                isActive: pathname === '/code-connect',
            },
            {
                label: 'NPM Stats',
                leftSlot: <Package className="w-4 h-4" />,
                onClick: () => router.push('/npm'),
                isActive: pathname === '/npm',
            },
        ],
    },
    {
        label: 'Administration',
        items: [
            {
                label: 'Users',
                leftSlot: <Users className="w-4 h-4" />,
                onClick: () => router.push('/users'),
                isActive: pathname === '/users',
            },
        ],
    },
]

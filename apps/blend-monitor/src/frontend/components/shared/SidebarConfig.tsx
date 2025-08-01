'use client'

import React from 'react'
import { Home, Link, Package, Zap, Users } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const tenants = [
    {
        label: 'Blend Monitor',
        icon: (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                <Zap className="w-5 h-5" />
            </div>
        ),
        id: 'blend-monitor',
    },
]

export const merchants = [] // Empty for now as not being used

export const getNavigationData = (
    router: AppRouterInstance,
    pathname: string
) => [
    {
        label: 'Main',
        isCollapsible: false,
        items: [
            {
                label: 'Dashboard',
                leftSlot: <Home className="w-4 h-4" />,
                onClick: () => router.push('/'),
                isActive: pathname === '/',
            },
        ],
    },
    {
        label: 'Monitoring',
        items: [
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

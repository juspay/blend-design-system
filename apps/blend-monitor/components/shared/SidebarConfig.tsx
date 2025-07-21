'use client'

import React from 'react'
import {
    Home,
    BarChart3,
    Link,
    Package,
    Tag,
    Zap,
    LogOut,
    Server,
    Activity,
    History,
    Code,
    DollarSign,
    Rocket,
    Users,
} from 'lucide-react'

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

export const getNavigationData = (router: any, pathname: string) => [
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
        label: 'Deployments',
        items: [
            {
                label: 'Hosting Status',
                leftSlot: <Server className="w-4 h-4" />,
                onClick: () => router.push('/deployments/hosting'),
                isActive: pathname === '/deployments/hosting',
            },
            {
                label: 'Deploy',
                leftSlot: <Rocket className="w-4 h-4" />,
                onClick: () => router.push('/deployments/deploy'),
                isActive: pathname === '/deployments/deploy',
            },
            // {
            //     label: 'Performance',
            //     leftSlot: <Activity className="w-4 h-4" />,
            //     onClick: () => router.push('/deployments/performance'),
            //     isActive: pathname === '/deployments/performance',
            // },
            {
                label: 'Deploy History',
                leftSlot: <History className="w-4 h-4" />,
                onClick: () => router.push('/deployments/history'),
                isActive: pathname === '/deployments/history',
            },
            // {
            //     label: 'Functions',
            //     leftSlot: <Code className="w-4 h-4" />,
            //     onClick: () => router.push('/deployments/functions'),
            //     isActive: pathname === '/deployments/functions',
            // },
            // {
            //     label: 'Usage & Costs',
            //     leftSlot: <DollarSign className="w-4 h-4" />,
            //     onClick: () => router.push('/deployments/usage'),
            //     isActive: pathname === '/deployments/usage',
            // },
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

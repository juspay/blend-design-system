'use client'

import React from 'react'
import { Sidebar } from 'blend-v1'
import { useRouter, usePathname } from 'next/navigation'
import { Activity, Link, AlertCircle, Package, Tag } from 'lucide-react'

export default function CodeConnectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()

    const navigationData = [
        {
            label: 'Overview',
            items: [
                {
                    label: 'Dashboard',
                    leftSlot: <Activity className="w-4 h-4" />,
                    onClick: () => router.push('/'),
                },
            ],
        },
        {
            label: 'Code Connect',
            items: [
                {
                    label: 'Coverage',
                    leftSlot: <Link className="w-4 h-4" />,
                    onClick: () => router.push('/code-connect'),
                },
                {
                    label: 'Health Monitor',
                    leftSlot: <AlertCircle className="w-4 h-4" />,
                    onClick: () => router.push('/code-connect/health'),
                },
            ],
        },
        {
            label: 'NPM Publishing',
            items: [
                {
                    label: 'Package Stats',
                    leftSlot: <Package className="w-4 h-4" />,
                    onClick: () => router.push('/npm'),
                },
                {
                    label: 'Version History',
                    leftSlot: <Tag className="w-4 h-4" />,
                    onClick: () => router.push('/npm/history'),
                },
            ],
        },
    ]

    return (
        <Sidebar
            tenants={[
                {
                    label: 'Blend Monitor',
                    icon: (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            B
                        </div>
                    ),
                },
            ]}
            merchants={[]}
            data={navigationData}
            topbar={
                <div className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl font-semibold">
                        Blend Design System Monitor
                    </h1>
                </div>
            }
            activeTenant="blend-monitor"
        >
            {children}
        </Sidebar>
    )
}

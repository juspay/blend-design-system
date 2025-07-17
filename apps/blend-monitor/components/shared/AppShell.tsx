'use client'

import React from 'react'
import { Sidebar } from 'blend-v1'
import { useRouter, usePathname } from 'next/navigation'
import { tenants, merchants, getNavigationData } from './SidebarConfig'

export default function AppShell({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const navigationData = getNavigationData(router, pathname)

    return (
        <div className="h-screen w-screen overflow-hidden">
            <Sidebar
                tenants={tenants}
                merchants={merchants}
                data={navigationData}
                topbar={
                    <div className="sticky top-0 z-50 bg-white">
                        <div className="flex items-center justify-between px-6 py-3">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Blend Monitoring
                            </h2>
                        </div>
                    </div>
                }
                activeTenant="blend-monitor"
                setActiveTenant={() => {}}
                activeMerchant=""
                setActiveMerchant={() => {}}
            >
                <div className="h-full overflow-hidden">{children}</div>
            </Sidebar>
        </div>
    )
}

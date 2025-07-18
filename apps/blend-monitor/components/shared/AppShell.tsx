'use client'

import React from 'react'
import { Sidebar } from 'blend-v1'
import { useRouter, usePathname } from 'next/navigation'
import { tenants, merchants, getNavigationData } from './SidebarConfig'
import UserAvatar from './UserAvatar'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut } from 'lucide-react'

export default function AppShell({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { logout } = useAuth()
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
                            <div className="flex items-center gap-3">
                                <UserAvatar />
                                <button
                                    onClick={logout}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors group cursor-pointer"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                                </button>
                            </div>
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

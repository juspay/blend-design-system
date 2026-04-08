'use client'

import React from 'react'
import {
    Sidebar,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import { useRouter, usePathname } from 'next/navigation'
import { tenants, merchants, getNavigationData } from './SidebarConfig'
import { useAuth } from '../../contexts/AuthContext'
import { LogOut, User } from 'lucide-react'

export default function AppShell({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { logout, user } = useAuth()
    const navigationData = getNavigationData(router, pathname)
    const [activeTenant, setActiveTenant] = React.useState('blend-monitor')

    // User account footer content
    const userFooter = user ? (
        <div className="flex items-center gap-3 w-full px-2">
            <div className="flex-shrink-0">
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {user.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
        </div>
    ) : null

    // Convert tenants to leftPanel format
    const leftPanel =
        tenants.length > 0
            ? {
                  items: tenants.map((tenant) => ({
                      label: tenant.label,
                      icon: tenant.icon,
                      value: tenant.id,
                      showInPanel: true,
                  })),
                  selected: activeTenant,
                  onSelect: (value: string) => {
                      setActiveTenant(value)
                  },
              }
            : undefined

    // Convert merchants to merchantInfo format
    const merchantInfo =
        merchants.length > 0
            ? {
                  items: merchants.map(
                      (merchant: {
                          label: string
                          id?: string
                          value?: string
                          icon?: React.ReactNode
                      }) => ({
                          label: merchant.label,
                          value:
                              merchant.id || merchant.value || merchant.label,
                          icon: merchant.icon,
                      })
                  ),
                  selected: '',
                  onSelect: () => {},
              }
            : undefined

    return (
        <div className="h-screen w-screen overflow-hidden flex">
            <Sidebar
                leftPanel={leftPanel}
                merchantInfo={merchantInfo}
                data={navigationData}
                topbar={
                    <div className="sticky top-0 z-50 bg-white">
                        <div className="flex items-center justify-between px-6 py-3">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Blend Monitoring
                            </h2>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Logout"
                                leadingIcon={<LogOut className="w-4 h-4" />}
                                onClick={logout}
                            />
                        </div>
                    </div>
                }
                footer={userFooter}
            >
                <div className="h-full overflow-hidden flex-1">{children}</div>
            </Sidebar>
        </div>
    )
}

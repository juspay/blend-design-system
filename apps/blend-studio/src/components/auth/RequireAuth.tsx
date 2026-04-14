import { useNavigate, useLocation } from '@tanstack/react-router'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { featureFlags } from '@/lib/feature-flags'
import { useEffect } from 'react'

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useBackendAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const flags = featureFlags.get()

    useEffect(() => {
        if (!loading && !user && !flags.useMockData) {
            navigate({
                to: '/login',
                search: { from: location.href },
                replace: true,
            })
        }
    }, [loading, user, flags.useMockData, location.href, navigate])

    if (flags.useMockData) {
        return <>{children}</>
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading…</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return <>{children}</>
}

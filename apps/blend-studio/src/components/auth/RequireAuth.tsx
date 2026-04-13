import { Navigate, useLocation } from '@tanstack/react-router'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { featureFlags } from '@/lib/feature-flags'

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useBackendAuth()
    const location = useLocation()
    const flags = featureFlags.get()

    // In mock mode, skip auth entirely so the app works without a backend
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
        return <Navigate to="/login" search={{ from: location.href }} replace />
    }

    return <>{children}</>
}

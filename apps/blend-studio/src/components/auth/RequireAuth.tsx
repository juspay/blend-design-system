import { Navigate, useLocation } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading, isConfigured } = useAuth()
    const location = useLocation()

    if (!isConfigured) {
        return <>{children}</>
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
                Loading…
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" search={{ from: location.href }} replace />
    }

    return <>{children}</>
}

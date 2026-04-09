import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    const { user, loading, isConfigured } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-400">Loading...</div>
            </div>
        )
    }

    if (!isConfigured) {
        return <Navigate to="/studio/test" />
    }

    if (!user) {
        return <Navigate to="/login" search={{ from: undefined }} />
    }

    return <Navigate to="/studio" replace />
}

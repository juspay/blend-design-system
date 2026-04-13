import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useBackendAuth } from '@/contexts/BackendAuthContext'

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    const { user, loading } = useBackendAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-400">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" search={{ from: undefined }} />
    }

    return <Navigate to="/studio" replace />
}

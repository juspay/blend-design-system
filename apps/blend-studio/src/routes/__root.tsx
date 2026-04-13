import { createRootRoute, Outlet } from '@tanstack/react-router'
import { BackendAuthProvider } from '@/contexts/BackendAuthContext'

export const Route = createRootRoute({
    component: () => (
        <BackendAuthProvider>
            <Outlet />
        </BackendAuthProvider>
    ),
})

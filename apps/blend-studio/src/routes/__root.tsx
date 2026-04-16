import { createRootRoute, Outlet } from '@tanstack/react-router'
import { BackendAuthProvider } from '@/contexts/BackendAuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider>
            <BackendAuthProvider>
                <Outlet />
            </BackendAuthProvider>
        </ThemeProvider>
    ),
})

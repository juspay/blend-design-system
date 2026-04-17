import { createRootRoute, Outlet } from '@tanstack/react-router'
import { BackendAuthProvider } from '@/contexts/BackendAuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeProvider as BlendThemeProvider } from '@juspay/blend-design-system'

export const Route = createRootRoute({
    component: () => (
        <BlendThemeProvider theme="light">
            <ThemeProvider>
                <BackendAuthProvider>
                    <Outlet />
                </BackendAuthProvider>
            </ThemeProvider>
        </BlendThemeProvider>
    ),
})

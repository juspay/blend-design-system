'use client'

import { useEffect } from 'react'

export default function ChangelogThemeForcer() {
    useEffect(() => {
        // Force dark mode when changelog page loads
        const currentTheme = document.documentElement.getAttribute('data-theme')

        if (currentTheme !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark')
            // Also save to localStorage so other theme components stay in sync
            localStorage.setItem('theme', 'dark')
        }
    }, [])

    return null // This component doesn't render anything
}

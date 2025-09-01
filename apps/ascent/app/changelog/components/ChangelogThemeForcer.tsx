'use client'

import { useEffect } from 'react'

export default function ChangelogThemeForcer() {
    useEffect(() => {
        const forceDarkMode = () => {
            // Set dark mode on document element
            document.documentElement.setAttribute('data-theme', 'dark')
            // Save to localStorage
            localStorage.setItem('theme', 'dark')
            // Add dark class if needed (some themes use this)
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        }

        // Force dark mode immediately
        forceDarkMode()

        // Create a MutationObserver to watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    (mutation.attributeName === 'data-theme' ||
                        mutation.attributeName === 'class')
                ) {
                    const currentTheme =
                        document.documentElement.getAttribute('data-theme')
                    if (currentTheme !== 'dark') {
                        forceDarkMode()
                    }
                }
            })
        })

        // Start observing
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'class'],
        })

        // Cleanup function
        return () => {
            observer.disconnect()
        }
    }, [])

    return null // This component doesn't render anything
}

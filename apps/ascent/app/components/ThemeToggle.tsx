'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme')
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light'
        const initialTheme = (savedTheme as 'light' | 'dark') || systemTheme

        setTheme(initialTheme)
        applyTheme(initialTheme)
    }, [])

    const applyTheme = (newTheme: 'light' | 'dark') => {
        const root = document.documentElement
        // Remove both classes first to ensure clean state
        root.classList.remove('dark', 'light')

        if (newTheme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.add('light')
        }

        // Also update the data attribute for better CSS targeting
        root.setAttribute('data-theme', newTheme)
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
    }

    if (!mounted) {
        return (
            <button className="p-2 rounded-md border border-[var(--border)] bg-[var(--background)] opacity-50">
                <Sun size={16} />
            </button>
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <Sun size={16} className="text-[var(--muted-foreground)]" />
            ) : (
                <Moon size={16} className="text-[var(--muted-foreground)]" />
            )}
        </button>
    )
}

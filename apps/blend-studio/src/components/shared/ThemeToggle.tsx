'use client'

import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '@/contexts/ThemeContext'

interface ThemeToggleProps {
    variant?: 'default' | 'compact' | 'minimal'
    className?: string
}

export function ThemeToggle({
    variant = 'default',
    className = '',
}: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme()

    if (variant === 'minimal') {
        return (
            <button
                onClick={toggleTheme}
                className={`p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${className}`}
                title={
                    theme === 'light'
                        ? 'Switch to dark mode'
                        : 'Switch to light mode'
                }
                aria-label={
                    theme === 'light'
                        ? 'Switch to dark mode'
                        : 'Switch to light mode'
                }
            >
                {theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                ) : (
                    <Sun className="w-5 h-5" />
                )}
            </button>
        )
    }

    if (variant === 'compact') {
        return (
            <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${className}`}
            >
                {theme === 'light' ? (
                    <Moon className="w-4 h-4" />
                ) : (
                    <Sun className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                    {theme === 'light' ? 'Dark' : 'Light'}
                </span>
            </button>
        )
    }

    return (
        <div
            className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ${className}`}
        >
            <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`p-1.5 rounded-md transition-colors ${
                    theme === 'light'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-yellow-500'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
                title="Light mode"
                aria-label="Switch to light mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => theme === 'light' && toggleTheme()}
                className={`p-1.5 rounded-md transition-colors ${
                    theme === 'dark'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-400'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
                title="Dark mode"
                aria-label="Switch to dark mode"
            >
                <Moon className="w-4 h-4" />
            </button>
        </div>
    )
}

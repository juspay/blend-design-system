'use client'

import React, { useState, useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'
import { useNavigation } from '../../layout/Navigation/GlobalKeyboardNavigation'

interface ShortcutItem {
    key: string
    description: string
    category: 'navigation' | 'search' | 'zones'
}

const shortcuts: ShortcutItem[] = [
    // Search shortcuts
    { key: '⌘ + K', description: 'Open search', category: 'search' },
    {
        key: 'Ctrl + K',
        description: 'Open search (Windows/Linux)',
        category: 'search',
    },
    {
        key: 'Esc',
        description: 'Close search or clear focus',
        category: 'search',
    },

    // Navigation shortcuts
    {
        key: '↑ ↓ ← →',
        description: 'Navigate between elements',
        category: 'navigation',
    },
    {
        key: 'Enter',
        description: 'Activate focused element',
        category: 'navigation',
    },
    {
        key: 'Space',
        description: 'Activate focused element',
        category: 'navigation',
    },
    {
        key: 'Tab',
        description: 'Switch between navigation zones',
        category: 'zones',
    },

    // Zone shortcuts
    { key: '1', description: 'Focus topbar', category: 'zones' },
    { key: '2', description: 'Focus sidebar', category: 'zones' },
    { key: '3', description: 'Focus main content', category: 'zones' },
    { key: '4', description: 'Focus table of contents', category: 'zones' },
]

const categoryLabels = {
    search: 'Search',
    navigation: 'Navigation',
    zones: 'Zone Switching',
}

export default function FloatingShortcutsButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { currentZone } = useNavigation()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Close on Escape
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
            // Toggle on ? key
            if (e.key === '?' && !isOpen) {
                e.preventDefault()
                setIsOpen(true)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    if (!mounted) {
        return null
    }

    const groupedShortcuts = shortcuts.reduce(
        (acc, shortcut) => {
            if (!acc[shortcut.category]) {
                acc[shortcut.category] = []
            }
            acc[shortcut.category].push(shortcut)
            return acc
        },
        {} as Record<string, ShortcutItem[]>
    )

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 p-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                aria-label="Show keyboard shortcuts"
                title="Keyboard shortcuts (?)"
            >
                <Keyboard size={20} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                            <div>
                                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                                    Keyboard Shortcuts
                                </h2>
                                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                                    Current zone:{' '}
                                    <span className="font-medium capitalize">
                                        {currentZone.replace('_', ' ')}
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-md hover:bg-[var(--sidebar-item-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                aria-label="Close shortcuts"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="space-y-8">
                                {Object.entries(groupedShortcuts).map(
                                    ([category, items]) => (
                                        <div key={category}>
                                            <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                                                {
                                                    categoryLabels[
                                                        category as keyof typeof categoryLabels
                                                    ]
                                                }
                                            </h3>
                                            <div className="space-y-3">
                                                {items.map(
                                                    (shortcut, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between py-2"
                                                        >
                                                            <span className="text-[var(--muted-foreground)]">
                                                                {
                                                                    shortcut.description
                                                                }
                                                            </span>
                                                            <div className="flex items-center gap-1">
                                                                {shortcut.key
                                                                    .split(
                                                                        ' + '
                                                                    )
                                                                    .map(
                                                                        (
                                                                            key,
                                                                            keyIndex
                                                                        ) => (
                                                                            <React.Fragment
                                                                                key={
                                                                                    keyIndex
                                                                                }
                                                                            >
                                                                                {keyIndex >
                                                                                    0 && (
                                                                                    <span className="text-[var(--muted-foreground)] mx-1">
                                                                                        +
                                                                                    </span>
                                                                                )}
                                                                                <kbd className="px-2 py-1 text-xs font-mono bg-[var(--muted)] text-[var(--muted-foreground)] rounded border border-[var(--border)] shadow-sm">
                                                                                    {
                                                                                        key
                                                                                    }
                                                                                </kbd>
                                                                            </React.Fragment>
                                                                        )
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Tips */}
                            <div className="mt-8 p-4 bg-[var(--muted)] rounded-lg">
                                <h4 className="font-medium text-[var(--foreground)] mb-2">
                                    Tips
                                </h4>
                                <ul className="text-sm text-[var(--muted-foreground)] space-y-1">
                                    <li>
                                        • Press{' '}
                                        <kbd className="px-1 py-0.5 text-xs bg-[var(--background)] rounded">
                                            ?
                                        </kbd>{' '}
                                        to open this help
                                    </li>
                                    <li>
                                        • Use Tab to cycle through navigation
                                        zones
                                    </li>
                                    <li>
                                        • Arrow keys work within each zone for
                                        spatial navigation
                                    </li>
                                    <li>
                                        • Press Escape to clear focus or close
                                        modals
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)] text-center">
                            <p className="text-xs text-[var(--muted-foreground)]">
                                Press{' '}
                                <kbd className="px-1 py-0.5 bg-[var(--background)] rounded">
                                    Esc
                                </kbd>{' '}
                                to close
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

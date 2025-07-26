'use client'

import React, { useState, useEffect } from 'react'
import { useNavigation, NavigationZone } from './GlobalKeyboardNavigation'

const KeyboardNavigationHelp = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [hasShownHelp, setHasShownHelp] = useState(false)

    // Get navigation context if available
    let currentZone = null
    try {
        const navigation = useNavigation()
        currentZone = navigation.currentZone
    } catch {
        // Navigation context not available, continue without it
    }

    // Show help on first load or when user starts using keyboard navigation
    useEffect(() => {
        const hasSeenHelp = localStorage.getItem('keyboard-nav-help-seen')
        if (!hasSeenHelp && !hasShownHelp) {
            const timer = setTimeout(() => {
                setIsVisible(true)
                setHasShownHelp(true)
            }, 2000) // Show after 2 seconds

            return () => clearTimeout(timer)
        }
    }, [hasShownHelp])

    // Show help when user starts navigating
    useEffect(() => {
        if (currentZone && !hasShownHelp) {
            setIsVisible(true)
            setHasShownHelp(true)
        }
    }, [currentZone, hasShownHelp])

    // Auto-hide after 8 seconds
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false)
                localStorage.setItem('keyboard-nav-help-seen', 'true')
            }, 8000)

            return () => clearTimeout(timer)
        }
    }, [isVisible])

    // Manual hide on click
    const handleHide = () => {
        setIsVisible(false)
        localStorage.setItem('keyboard-nav-help-seen', 'true')
    }

    // Show help with ? key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault()
                setIsVisible(true)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    if (!isVisible) return null

    const getZoneName = (zone: NavigationZone) => {
        switch (zone) {
            case NavigationZone.TOPBAR:
                return 'Topbar'
            case NavigationZone.SIDEBAR:
                return 'Sidebar'
            case NavigationZone.MAIN_CONTENT:
                return 'Main Content'
            case NavigationZone.TABLE_OF_CONTENTS:
                return 'Table of Contents'
            default:
                return 'Unknown'
        }
    }

    return (
        <div className={`keyboard-nav-help ${isVisible ? 'visible' : ''}`}>
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-sm text-[var(--foreground)]">
                    Keyboard Navigation
                </h3>
                <button
                    onClick={handleHide}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    aria-label="Close help"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="m18 6-12 12M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <kbd>Tab</kbd>
                        <span className="text-[var(--muted-foreground)]">
                            /
                        </span>
                        <kbd>Shift</kbd>
                        <kbd>Tab</kbd>
                    </div>
                    <span>Switch zones</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <kbd>↑</kbd>
                        <kbd>↓</kbd>
                    </div>
                    <span>Navigate items</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <kbd>←</kbd>
                        <kbd>→</kbd>
                    </div>
                    <span>Grid navigation</span>
                </div>

                <div className="flex items-center gap-2">
                    <kbd>Enter</kbd>
                    <span>Select item</span>
                </div>

                <div className="flex items-center gap-2">
                    <kbd>Esc</kbd>
                    <span>Clear focus</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <kbd>1</kbd>
                        <kbd>2</kbd>
                        <kbd>3</kbd>
                        <kbd>4</kbd>
                    </div>
                    <span>Quick zone switch</span>
                </div>

                <div className="flex items-center gap-2">
                    <kbd>?</kbd>
                    <span>Show this help</span>
                </div>
            </div>

            {currentZone && (
                <div className="mt-3 pt-2 border-t border-[var(--border)]">
                    <div className="text-xs text-[var(--muted-foreground)]">
                        Current zone:{' '}
                        <span className="text-[var(--accent)] font-medium">
                            {getZoneName(currentZone)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default KeyboardNavigationHelp

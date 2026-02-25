'use client'

import { useEffect, useState } from 'react'

export interface KeyboardNavigationOptions {
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onEnter?: () => void
    onEscape?: () => void
    onTab?: () => void
    enabled?: boolean
    preventDefault?: boolean
}

/**
 * Custom hook for component-specific keyboard navigation
 * This complements the global navigation system for modal/component-specific interactions
 */
export const useKeyboardNavigation = (options: KeyboardNavigationOptions) => {
    const {
        onArrowUp,
        onArrowDown,
        onArrowLeft,
        onArrowRight,
        onEnter,
        onEscape,
        onTab,
        enabled = true,
        preventDefault = true,
    } = options

    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (e: KeyboardEvent) => {
            let handled = false

            switch (e.key) {
                case 'ArrowUp':
                    if (onArrowUp) {
                        onArrowUp()
                        handled = true
                    }
                    break
                case 'ArrowDown':
                    if (onArrowDown) {
                        onArrowDown()
                        handled = true
                    }
                    break
                case 'ArrowLeft':
                    if (onArrowLeft) {
                        onArrowLeft()
                        handled = true
                    }
                    break
                case 'ArrowRight':
                    if (onArrowRight) {
                        onArrowRight()
                        handled = true
                    }
                    break
                case 'Enter':
                    if (onEnter) {
                        onEnter()
                        handled = true
                    }
                    break
                case 'Escape':
                    if (onEscape) {
                        onEscape()
                        handled = true
                    }
                    break
                case 'Tab':
                    if (onTab) {
                        onTab()
                        handled = true
                    }
                    break
            }

            if (handled && preventDefault) {
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [
        onArrowUp,
        onArrowDown,
        onArrowLeft,
        onArrowRight,
        onEnter,
        onEscape,
        onTab,
        enabled,
        preventDefault,
    ])
}

/**
 * Hook for list-based navigation (common pattern for search results, menus, etc.)
 */
export const useListNavigation = (
    items: any[],
    onSelect: (index: number, item: any) => void,
    options: {
        enabled?: boolean
        initialIndex?: number
        loop?: boolean
    } = {}
) => {
    const { enabled = true, initialIndex = -1, loop = true } = options
    const [selectedIndex, setSelectedIndex] = useState(initialIndex)

    // Reset when items change
    useEffect(() => {
        setSelectedIndex(initialIndex)
    }, [items, initialIndex])

    const navigateUp = () => {
        setSelectedIndex((prev) => {
            if (prev <= 0) {
                return loop ? items.length - 1 : 0
            }
            return prev - 1
        })
    }

    const navigateDown = () => {
        setSelectedIndex((prev) => {
            if (prev >= items.length - 1) {
                return loop ? 0 : items.length - 1
            }
            return prev + 1
        })
    }

    const selectCurrent = () => {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
            onSelect(selectedIndex, items[selectedIndex])
        }
    }

    useKeyboardNavigation({
        onArrowUp: navigateUp,
        onArrowDown: navigateDown,
        onEnter: selectCurrent,
        enabled,
    })

    return {
        selectedIndex,
        setSelectedIndex,
        navigateUp,
        navigateDown,
        selectCurrent,
    }
}

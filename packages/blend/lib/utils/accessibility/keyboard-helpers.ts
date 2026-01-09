import type { KeyboardEvent } from 'react'

/**
 * Keyboard navigation helpers for consistent keyboard support across all components
 *
 * These utilities ensure consistent keyboard interaction patterns following
 * WCAG 2.2 Level AA standards and ARIA Authoring Practices Guide.
 */

export interface KeyboardHandler {
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => void
}

/**
 * Create keyboard handler for button-like elements
 * Supports Enter and Space keys for activation
 *
 * @example
 * ```tsx
 * const keyboardHandler = createButtonKeyboardHandler(
 *     () => handleClick(),
 *     false // disabled
 * )
 * <button {...keyboardHandler}>Click me</button>
 * ```
 */
export function createButtonKeyboardHandler(
    onClick: () => void,
    disabled?: boolean
): KeyboardHandler {
    return {
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            if (disabled) return

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onClick()
            }
        },
    }
}

/**
 * Create keyboard handler for arrow key navigation
 * Supports ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home, and End keys
 *
 * @example
 * ```tsx
 * const keyboardHandler = createArrowKeyHandler({
 *     onArrowDown: () => moveToNext(),
 *     onArrowUp: () => moveToPrevious(),
 *     onHome: () => moveToFirst(),
 *     onEnd: () => moveToLast()
 * })
 * <div {...keyboardHandler}>...</div>
 * ```
 */
export function createArrowKeyHandler(options: {
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onHome?: () => void
    onEnd?: () => void
}): KeyboardHandler {
    return {
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowUp?.()
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowDown?.()
                    break
                case 'ArrowLeft':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowLeft?.()
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowRight?.()
                    break
                case 'Home':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onHome?.()
                    break
                case 'End':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onEnd?.()
                    break
            }
        },
    }
}

/**
 * Create keyboard handler for escape key
 *
 * @example
 * ```tsx
 * const keyboardHandler = createEscapeHandler(() => closeModal())
 * <div {...keyboardHandler}>Modal content</div>
 * ```
 */
export function createEscapeHandler(onEscape: () => void): KeyboardHandler {
    return {
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                e.stopPropagation()
                onEscape()
            }
        },
    }
}

/**
 * Create keyboard handler for tab trapping (modals, dropdowns)
 * Traps focus within a container by cycling between first and last elements
 *
 * @example
 * ```tsx
 * const firstElement = containerRef.current?.querySelector('[tabindex="0"]')
 * const lastElement = containerRef.current?.querySelector('[tabindex="0"]:last-child')
 * const keyboardHandler = createTabTrapHandler(firstElement, lastElement)
 * <div {...keyboardHandler}>Modal content</div>
 * ```
 */
export function createTabTrapHandler(
    firstElement: HTMLElement | null,
    lastElement: HTMLElement | null
): KeyboardHandler {
    return {
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            if (e.key !== 'Tab' || !firstElement || !lastElement) return

            if (e.shiftKey) {
                // Shift + Tab (backwards)
                if (document.activeElement === firstElement) {
                    e.preventDefault()
                    e.stopPropagation()
                    lastElement.focus()
                }
            } else {
                // Tab (forwards)
                if (document.activeElement === lastElement) {
                    e.preventDefault()
                    e.stopPropagation()
                    firstElement.focus()
                }
            }
        },
    }
}

/**
 * Create keyboard handler for list navigation
 * Combines arrow keys with Enter/Space for selection
 *
 * @example
 * ```tsx
 * const keyboardHandler = createListNavigationHandler({
 *     onArrowDown: () => moveToNext(),
 *     onArrowUp: () => moveToPrevious(),
 *     onSelect: () => selectCurrent()
 * })
 * <ul {...keyboardHandler}>...</ul>
 * ```
 */
export function createListNavigationHandler(options: {
    onArrowDown?: () => void
    onArrowUp?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onHome?: () => void
    onEnd?: () => void
    onSelect?: () => void
}): KeyboardHandler {
    return {
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowUp?.()
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowDown?.()
                    break
                case 'ArrowLeft':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowLeft?.()
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onArrowRight?.()
                    break
                case 'Home':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onHome?.()
                    break
                case 'End':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onEnd?.()
                    break
                case 'Enter':
                case ' ':
                    e.preventDefault()
                    e.stopPropagation()
                    options.onSelect?.()
                    break
            }
        },
    }
}

/**
 * Create keyboard handler for grid navigation
 * Supports arrow keys for 2D navigation
 *
 * @example
 * ```tsx
 * const keyboardHandler = createGridNavigationHandler({
 *     onArrowUp: () => moveUp(),
 *     onArrowDown: () => moveDown(),
 *     onArrowLeft: () => moveLeft(),
 *     onArrowRight: () => moveRight()
 * })
 * <div role="grid" {...keyboardHandler}>...</div>
 * ```
 */
export function createGridNavigationHandler(options: {
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onHome?: () => void
    onEnd?: () => void
    orientation?: 'horizontal' | 'vertical'
}): KeyboardHandler {
    return {
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
            // Handle orientation-specific behavior
            if (options.orientation === 'horizontal') {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowLeft?.()
                        break
                    case 'ArrowRight':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowRight?.()
                        break
                    case 'Home':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onHome?.()
                        break
                    case 'End':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onEnd?.()
                        break
                }
            } else if (options.orientation === 'vertical') {
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowUp?.()
                        break
                    case 'ArrowDown':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowDown?.()
                        break
                    case 'Home':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onHome?.()
                        break
                    case 'End':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onEnd?.()
                        break
                }
            } else {
                // Default: handle all arrow keys
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowUp?.()
                        break
                    case 'ArrowDown':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowDown?.()
                        break
                    case 'ArrowLeft':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowLeft?.()
                        break
                    case 'ArrowRight':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onArrowRight?.()
                        break
                    case 'Home':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onHome?.()
                        break
                    case 'End':
                        e.preventDefault()
                        e.stopPropagation()
                        options.onEnd?.()
                        break
                }
            }
        },
    }
}

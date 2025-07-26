'use client'

import React, {
    useState,
    useEffect,
    useRef,
    createContext,
    useContext,
} from 'react'
import { useRouter } from 'next/navigation'

// Navigation zones
export enum NavigationZone {
    TOPBAR = 'topbar',
    SIDEBAR = 'sidebar',
    MAIN_CONTENT = 'main_content',
    TABLE_OF_CONTENTS = 'table_of_contents',
}

// Navigation context
interface NavigationContextType {
    currentZone: NavigationZone
    setCurrentZone: (zone: NavigationZone) => void
    focusedElement: HTMLElement | null
    setFocusedElement: (element: HTMLElement | null) => void
    navigableItems: HTMLElement[]
    setNavigableItems: (items: HTMLElement[]) => void
    isSearchModalOpen: boolean
    setIsSearchModalOpen: (open: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export const useNavigation = () => {
    const context = useContext(NavigationContext)
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider')
    }
    return context
}

// Spatial navigation utilities
const getElementPosition = (element: HTMLElement): DOMRect => {
    return element.getBoundingClientRect()
}

const findNearestElement = (
    currentElement: HTMLElement,
    allElements: HTMLElement[],
    direction: 'up' | 'down' | 'left' | 'right',
    currentZone: NavigationZone
): HTMLElement | null => {
    const currentRect = getElementPosition(currentElement)
    const currentCenter = {
        x: currentRect.left + currentRect.width / 2,
        y: currentRect.top + currentRect.height / 2,
    }

    // Get zone boundaries to ensure navigation stays within the current zone
    const getZoneBoundaries = (zone: NavigationZone) => {
        const zoneSelector = {
            [NavigationZone.TOPBAR]: 'nav',
            [NavigationZone.SIDEBAR]: '.doc-sidebar',
            [NavigationZone.MAIN_CONTENT]: '.main-content-area',
            [NavigationZone.TABLE_OF_CONTENTS]: '.doc-toc-ctr',
        }[zone]

        if (zoneSelector) {
            const zoneElement = document.querySelector(zoneSelector)
            if (zoneElement) {
                return zoneElement.getBoundingClientRect()
            }
        }
        return null
    }

    const zoneBounds = getZoneBoundaries(currentZone)

    let bestElement: HTMLElement | null = null
    let bestScore = Infinity

    for (const element of allElements) {
        if (element === currentElement) continue

        const rect = getElementPosition(element)
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        }

        // Ensure the element is within the current zone boundaries
        if (zoneBounds) {
            const isWithinZone =
                center.x >= zoneBounds.left &&
                center.x <= zoneBounds.right &&
                center.y >= zoneBounds.top &&
                center.y <= zoneBounds.bottom

            if (!isWithinZone) {
                continue // Skip elements outside the current zone
            }
        }

        let isInDirection = false
        let distance = 0
        let alignment = 0

        switch (direction) {
            case 'up':
                isInDirection = center.y < currentCenter.y - 10 // Add threshold
                distance = currentCenter.y - center.y
                alignment =
                    1 - Math.abs(center.x - currentCenter.x) / window.innerWidth
                break
            case 'down':
                isInDirection = center.y > currentCenter.y + 10 // Add threshold
                distance = center.y - currentCenter.y
                alignment =
                    1 - Math.abs(center.x - currentCenter.x) / window.innerWidth
                break
            case 'left':
                isInDirection = center.x < currentCenter.x - 10 // Add threshold
                distance = currentCenter.x - center.x
                alignment =
                    1 -
                    Math.abs(center.y - currentCenter.y) / window.innerHeight
                break
            case 'right':
                isInDirection = center.x > currentCenter.x + 10 // Add threshold
                distance = center.x - currentCenter.x
                alignment =
                    1 -
                    Math.abs(center.y - currentCenter.y) / window.innerHeight
                break
        }

        if (isInDirection && distance > 0) {
            // Combine distance and alignment for scoring
            // Closer elements and better aligned elements get better scores
            const score = distance - alignment * 200 // Increase alignment weight

            if (score < bestScore) {
                bestScore = score
                bestElement = element
            }
        }
    }

    return bestElement
}

// Global keyboard navigation provider
export const GlobalKeyboardNavigationProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [currentZone, setCurrentZone] = useState<NavigationZone>(
        NavigationZone.SIDEBAR
    )
    const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(
        null
    )
    const [navigableItems, setNavigableItems] = useState<HTMLElement[]>([])
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
    const router = useRouter()

    // Collect navigable items based on current zone
    const collectNavigableItems = (zone: NavigationZone): HTMLElement[] => {
        let elements: HTMLElement[] = []

        switch (zone) {
            case NavigationZone.TOPBAR:
                elements = Array.from(
                    document.querySelectorAll('[data-nav-topbar]')
                ) as HTMLElement[]
                break

            case NavigationZone.SIDEBAR:
                elements = Array.from(
                    document.querySelectorAll('[data-sidebar-item]')
                ) as HTMLElement[]
                break

            case NavigationZone.MAIN_CONTENT:
                // Get explicitly marked elements, but exclude those in Table of Contents
                const explicitElements = Array.from(
                    document.querySelectorAll('[data-nav-content]')
                ) as HTMLElement[]
                const explicitElementsFiltered = explicitElements.filter(
                    (element) => {
                        // Exclude elements that are within the Table of Contents
                        return !element.closest('.doc-toc-ctr')
                    }
                )

                // Also get interactive elements within the main content area, excluding TOC
                const mainContentArea = document.querySelector(
                    '.main-content-area, article.prose, [data-component-preview]'
                )
                const interactiveElements: HTMLElement[] = []

                if (mainContentArea) {
                    // Get buttons, links, and other interactive elements within main content, excluding TOC
                    const buttons = Array.from(
                        mainContentArea.querySelectorAll(
                            'button:not([data-nav-content])'
                        )
                    ) as HTMLElement[]
                    const links = Array.from(
                        mainContentArea.querySelectorAll(
                            'a:not([data-nav-content])'
                        )
                    ) as HTMLElement[]
                    const inputs = Array.from(
                        mainContentArea.querySelectorAll(
                            'input:not([data-nav-content]), select:not([data-nav-content]), textarea:not([data-nav-content])'
                        )
                    ) as HTMLElement[]
                    const tabElements = Array.from(
                        mainContentArea.querySelectorAll(
                            '[role="tab"]:not([data-nav-content])'
                        )
                    ) as HTMLElement[]
                    const tooltipTriggers = Array.from(
                        mainContentArea.querySelectorAll(
                            '[data-radix-tooltip-trigger]:not([data-nav-content])'
                        )
                    ) as HTMLElement[]
                    const radixTriggers = Array.from(
                        mainContentArea.querySelectorAll(
                            '[data-state]:not([data-nav-content])'
                        )
                    ) as HTMLElement[]

                    // Filter out elements that are within the Table of Contents
                    const filteredButtons = buttons.filter(
                        (element) => !element.closest('.doc-toc-ctr')
                    )
                    const filteredLinks = links.filter(
                        (element) => !element.closest('.doc-toc-ctr')
                    )
                    const filteredInputs = inputs.filter(
                        (element) => !element.closest('.doc-toc-ctr')
                    )
                    const filteredTabElements = tabElements.filter(
                        (element) => !element.closest('.doc-toc-ctr')
                    )
                    const filteredTooltipTriggers = tooltipTriggers.filter(
                        (element) => !element.closest('.doc-toc-ctr')
                    )
                    const filteredRadixTriggers = radixTriggers.filter(
                        (element) => !element.closest('.doc-toc-ctr')
                    )

                    interactiveElements.push(
                        ...filteredButtons,
                        ...filteredLinks,
                        ...filteredInputs,
                        ...filteredTabElements,
                        ...filteredTooltipTriggers,
                        ...filteredRadixTriggers
                    )
                }

                // Combine explicit and interactive elements, removing duplicates
                const allElements = [
                    ...explicitElementsFiltered,
                    ...interactiveElements,
                ]
                elements = allElements.filter(
                    (element, index, array) =>
                        array.findIndex((el) => el === element) === index
                )
                break

            case NavigationZone.TABLE_OF_CONTENTS:
                elements = Array.from(
                    document.querySelectorAll('.doc-toc-ctr [data-nav-content]')
                ) as HTMLElement[]
                break

            default:
                elements = []
        }

        // Filter out hidden or disabled elements, but keep elements that are just outside viewport
        return elements.filter((element) => {
            const style = window.getComputedStyle(element)
            return (
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                !element.hasAttribute('disabled')
            )
            // Removed offsetParent check to include elements outside viewport
        })
    }

    // Update navigable items when zone changes
    useEffect(() => {
        const items = collectNavigableItems(currentZone)
        setNavigableItems(items)
        setFocusedElement(null) // Reset focus when changing zones
    }, [currentZone])

    // Auto-focus first item when zone changes
    useEffect(() => {
        if (navigableItems.length > 0 && !focusedElement) {
            setFocusedElement(navigableItems[0])
        }
    }, [navigableItems, focusedElement])

    // Global keyboard event handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't interfere with search modal
            if (isSearchModalOpen || document.querySelector('[cmdk-dialog]')) {
                return
            }

            // Don't interfere with form inputs
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            ) {
                return
            }

            // Zone switching with Tab key
            if (e.key === 'Tab') {
                e.preventDefault()
                const zones = Object.values(NavigationZone)
                const currentIndex = zones.indexOf(currentZone)
                const nextIndex = e.shiftKey
                    ? (currentIndex - 1 + zones.length) % zones.length
                    : (currentIndex + 1) % zones.length
                setCurrentZone(zones[nextIndex])
                return
            }

            // Spatial navigation with arrow keys
            if (
                ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
                    e.key
                ) &&
                focusedElement
            ) {
                e.preventDefault()

                const direction = {
                    ArrowUp: 'up',
                    ArrowDown: 'down',
                    ArrowLeft: 'left',
                    ArrowRight: 'right',
                }[e.key] as 'up' | 'down' | 'left' | 'right'

                const nextElement = findNearestElement(
                    focusedElement,
                    navigableItems,
                    direction,
                    currentZone
                )
                if (nextElement) {
                    setFocusedElement(nextElement)
                }
            } else if ((e.key === 'Enter' || e.key === ' ') && focusedElement) {
                e.preventDefault()

                // Handle different types of elements
                if (focusedElement.tagName === 'A') {
                    focusedElement.click()
                } else if (focusedElement.tagName === 'BUTTON') {
                    focusedElement.click()
                } else if (focusedElement.hasAttribute('data-sidebar-item')) {
                    const path =
                        focusedElement.getAttribute('data-sidebar-item')
                    if (path) {
                        router.push(`/docs/${path}`)
                    }
                } else if (focusedElement.hasAttribute('data-nav-content')) {
                    // Check if it's a tooltip trigger
                    if (
                        focusedElement.hasAttribute(
                            'data-radix-tooltip-trigger'
                        ) ||
                        focusedElement.closest('[data-radix-tooltip-trigger]')
                    ) {
                        // Trigger keyboard event for tooltip
                        const keyEvent = new KeyboardEvent('keydown', {
                            key: e.key,
                            bubbles: true,
                            cancelable: true,
                        })
                        focusedElement.dispatchEvent(keyEvent)
                    } else {
                        // Handle regular navigation
                        const href = focusedElement.getAttribute('href')
                        if (href) {
                            router.push(href)
                        } else {
                            focusedElement.click()
                        }
                    }
                }
            } else if (e.key === 'Escape') {
                e.preventDefault()
                setFocusedElement(null)
            }

            // Quick zone switching with number keys
            if (e.key === '1') {
                e.preventDefault()
                setCurrentZone(NavigationZone.TOPBAR)
            } else if (e.key === '2') {
                e.preventDefault()
                setCurrentZone(NavigationZone.SIDEBAR)
            } else if (e.key === '3') {
                e.preventDefault()
                setCurrentZone(NavigationZone.MAIN_CONTENT)
            } else if (e.key === '4') {
                e.preventDefault()
                setCurrentZone(NavigationZone.TABLE_OF_CONTENTS)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [currentZone, focusedElement, navigableItems, isSearchModalOpen, router])

    // Auto-scroll focused element into view
    useEffect(() => {
        if (focusedElement) {
            focusedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            })
        }
    }, [focusedElement])

    // Add visual focus indicators
    useEffect(() => {
        // Remove previous focus indicators
        document.querySelectorAll('.keyboard-focused').forEach((el) => {
            el.classList.remove('keyboard-focused')
        })

        // Add focus indicator to current element
        if (focusedElement) {
            focusedElement.classList.add('keyboard-focused')
        }

        // Add zone indicator
        document.querySelectorAll('.active-nav-zone').forEach((el) => {
            el.classList.remove('active-nav-zone')
        })

        const zoneSelector = {
            [NavigationZone.TOPBAR]: 'nav',
            [NavigationZone.SIDEBAR]: '.doc-sidebar',
            [NavigationZone.MAIN_CONTENT]: '.main-content-area',
            [NavigationZone.TABLE_OF_CONTENTS]: '.doc-toc-ctr',
        }[currentZone]

        if (zoneSelector) {
            const zoneElement = document.querySelector(zoneSelector)
            if (zoneElement) {
                zoneElement.classList.add('active-nav-zone')
            }
        }
    }, [focusedElement, currentZone])

    const contextValue: NavigationContextType = {
        currentZone,
        setCurrentZone,
        focusedElement,
        setFocusedElement,
        navigableItems,
        setNavigableItems,
        isSearchModalOpen,
        setIsSearchModalOpen,
    }

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    )
}

// Hook for components to register as navigable
export const useNavigable = (
    zone: NavigationZone,
    elementRef: React.RefObject<HTMLElement>,
    isEnabled: boolean = true
) => {
    const { currentZone, focusedElement } = useNavigation()

    useEffect(() => {
        if (!isEnabled || !elementRef.current) return

        const element = elementRef.current
        const dataAttribute = {
            [NavigationZone.TOPBAR]: 'data-nav-topbar',
            [NavigationZone.SIDEBAR]: 'data-sidebar-item',
            [NavigationZone.MAIN_CONTENT]: 'data-nav-content',
            [NavigationZone.TABLE_OF_CONTENTS]: 'data-nav-content',
        }[zone]

        if (dataAttribute) {
            element.setAttribute(dataAttribute, 'true')

            return () => {
                element.removeAttribute(dataAttribute)
            }
        }
    }, [zone, elementRef, isEnabled])

    // Return whether this element is currently focused
    const isFocused =
        currentZone === zone &&
        elementRef.current &&
        focusedElement === elementRef.current

    return { isFocused }
}

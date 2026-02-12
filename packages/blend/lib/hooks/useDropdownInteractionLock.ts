import { useEffect, useRef } from 'react'

let activeLockCount = 0

let wheelHandler: ((e: WheelEvent) => void) | null = null
let touchHandler: ((e: TouchEvent) => void) | null = null

type DropdownController = {
    id: string
    close: () => void
    parentContainer: HTMLElement | null
}

// Track multiple active dropdowns to allow multiple in same parent container
let activeDropdownControllers: DropdownController[] = []
let dropdownIdCounter = 0

export type DropdownSelectors = {
    content?: string[]
    trigger?: string[]
    parentContainers?: string[]
}

type ResolvedSelectors = Required<DropdownSelectors> & {
    contentSelectorString: string
    parentSelectorString: string
}

const DEFAULT_SELECTORS: Required<DropdownSelectors> = {
    content: [
        '[data-radix-popper-content-wrapper]',
        '[data-radix-dropdown-menu-content]',
        '[role="menu"]',
        '[role="listbox"]',
        '[data-dropdown="dropdown"]',
    ],
    trigger: [
        '[data-radix-dropdown-menu-trigger]',
        'button[aria-expanded]',
        'button[aria-haspopup]',
    ],
    parentContainers: [
        '[data-modal]',
        '[data-popover]',
        '[role="dialog"]',
        '[data-radix-popover-content]',
    ],
}

function resolveSelectors(selectors?: DropdownSelectors): ResolvedSelectors {
    const content = selectors?.content ?? DEFAULT_SELECTORS.content
    const parentContainers =
        selectors?.parentContainers ?? DEFAULT_SELECTORS.parentContainers

    return {
        content,
        trigger: selectors?.trigger ?? DEFAULT_SELECTORS.trigger,
        parentContainers,
        contentSelectorString: content.join(', '),
        parentSelectorString: parentContainers.join(', '),
    }
}

function matchesClosest(
    target: HTMLElement | null,
    selectorString: string
): boolean {
    if (!target) return false
    return Boolean(target.closest(selectorString))
}

function findParentContainer(
    element: HTMLElement | null,
    parentSelectorString: string
): HTMLElement | null {
    if (!element) return null
    return element.closest(parentSelectorString)
}

function findTriggerElement(selectors: ResolvedSelectors): HTMLElement | null {
    // Find trigger with aria-expanded="true" — apply qualifier to each selector individually
    const expandedTrigger = document.querySelector<HTMLElement>(
        selectors.trigger
            .map((sel) => `${sel}[aria-expanded="true"]`)
            .join(', ')
    )
    if (expandedTrigger) return expandedTrigger

    // Fallback: find any trigger with aria-haspopup="true"
    const hasPopupTrigger = document.querySelector<HTMLElement>(
        selectors.trigger
            .map((sel) => `${sel}[aria-haspopup="true"]`)
            .join(', ')
    )
    if (hasPopupTrigger) return hasPopupTrigger

    return null
}

function applyLock(selectors: ResolvedSelectors) {
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.documentElement.style.touchAction = 'none'

    wheelHandler = (e) => {
        if (
            matchesClosest(
                e.target as HTMLElement,
                selectors.contentSelectorString
            )
        )
            return
        if (
            matchesClosest(
                e.target as HTMLElement,
                selectors.parentSelectorString
            )
        )
            return
        e.preventDefault()
    }

    touchHandler = (e) => {
        if (
            matchesClosest(
                e.target as HTMLElement,
                selectors.contentSelectorString
            )
        )
            return
        if (
            matchesClosest(
                e.target as HTMLElement,
                selectors.parentSelectorString
            )
        )
            return
        e.preventDefault()
    }

    document.addEventListener('wheel', wheelHandler, { passive: false })
    document.addEventListener('touchmove', touchHandler, { passive: false })
}

function removeLock() {
    document.documentElement.style.overflow = ''
    document.documentElement.style.overscrollBehavior = ''
    document.documentElement.style.touchAction = ''

    if (wheelHandler) {
        document.removeEventListener('wheel', wheelHandler)
        wheelHandler = null
    }

    if (touchHandler) {
        document.removeEventListener('touchmove', touchHandler)
        touchHandler = null
    }
}

export function createOutsideInteractionHandler(options?: {
    parentContainerSelectors?: string[]
    preventOnTrigger?: boolean
    contentSelectors?: string[]
}) {
    const parentSelectorString = (
        options?.parentContainerSelectors ?? DEFAULT_SELECTORS.parentContainers
    ).join(', ')
    const triggerSelectorString = DEFAULT_SELECTORS.trigger.join(', ')
    const contentSelectorString = (
        options?.contentSelectors ?? DEFAULT_SELECTORS.content
    ).join(', ')
    const preventOnTrigger = options?.preventOnTrigger ?? true

    return (e: Event) => {
        const target = e.target as HTMLElement | null

        // Prevent closing when clicking on dropdown content itself
        if (matchesClosest(target, contentSelectorString)) {
            e.preventDefault()
            return
        }

        // Prevent closing when clicking on trigger elements
        if (preventOnTrigger && matchesClosest(target, triggerSelectorString)) {
            e.preventDefault()
            return
        }

        // Prevent closing when clicking inside parent containers (modals, popovers)
        if (matchesClosest(target, parentSelectorString)) {
            e.preventDefault()
        }
    }
}

export default function useDropdownInteractionLock(
    isOpen: boolean,
    onClose: () => void,
    options?: {
        selectors?: DropdownSelectors
        triggerElement?: HTMLElement | null
    }
) {
    const idRef = useRef<string>('')
    const onCloseRef = useRef(onClose)

    if (!idRef.current) {
        dropdownIdCounter++
        idRef.current = `dropdown-${dropdownIdCounter}`
    }

    useEffect(() => {
        onCloseRef.current = onClose
    })

    const selectorsRef = useRef<ResolvedSelectors>(
        resolveSelectors(options?.selectors)
    )

    useEffect(() => {
        selectorsRef.current = resolveSelectors(options?.selectors)
    }, [options?.selectors])

    useEffect(() => {
        if (typeof window === 'undefined') return

        if (isOpen) {
            // Find trigger element - prefer passed ref, otherwise auto-detect
            const trigger =
                options?.triggerElement ??
                findTriggerElement(selectorsRef.current)

            const currentParentContainer = findParentContainer(
                trigger,
                selectorsRef.current.parentSelectorString
            )

            // Close dropdowns in DIFFERENT parent containers
            // Allow multiple dropdowns in the SAME parent container
            activeDropdownControllers = activeDropdownControllers.filter(
                (controller) => {
                    if (controller.id === idRef.current) return true

                    const previousParent = controller.parentContainer

                    // If both are in the same parent container (or both have no parent), keep both
                    const sameContext =
                        currentParentContainer &&
                        previousParent &&
                        currentParentContainer === previousParent

                    const bothRootLevel =
                        !currentParentContainer && !previousParent

                    if (sameContext || bothRootLevel) {
                        return true
                    }

                    controller.close()
                    return false
                }
            )

            activeDropdownControllers.push({
                id: idRef.current,
                close: () => onCloseRef.current(),
                parentContainer: currentParentContainer,
            })

            activeLockCount++
            if (activeLockCount === 1) {
                applyLock(selectorsRef.current)
            }
        }

        return () => {
            if (!isOpen) return

            activeDropdownControllers = activeDropdownControllers.filter(
                (controller) => controller.id !== idRef.current
            )

            activeLockCount--

            if (activeLockCount <= 0) {
                activeLockCount = 0
                removeLock()
            }
        }
    }, [isOpen, options?.triggerElement])
}

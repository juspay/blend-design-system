import { useEffect, useRef } from 'react'

let activeLockCount = 0
let styleInjected = false

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

const CLASS_NAME = 'dropdown-interaction-locked'
const STYLE_ID = 'dropdown-interaction-lock-style'

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
    // First, try to find trigger with aria-expanded="true" (most reliable)
    const expandedTrigger = document.querySelector<HTMLElement>(
        `${selectors.trigger.join(', ')}[aria-expanded="true"]`
    )
    if (expandedTrigger) return expandedTrigger

    // Fallback: find any trigger that has aria-haspopup
    const hasPopupTrigger = document.querySelector<HTMLElement>(
        `${selectors.trigger.join(', ')}[aria-haspopup="true"]`
    )
    if (hasPopupTrigger) return hasPopupTrigger

    // Last resort: find the most recently opened dropdown content and trace back to trigger
    const dropdownContents = document.querySelectorAll<HTMLElement>(
        selectors.contentSelectorString
    )
    if (dropdownContents.length > 0) {
        const lastContent =
            Array.from(dropdownContents)[dropdownContents.length - 1]
        // Try to find trigger near the content (Radix usually places them close)
        const possibleTrigger =
            lastContent.parentElement?.querySelector<HTMLElement>(
                selectors.trigger.join(', ')
            )
        if (possibleTrigger) return possibleTrigger
    }

    return null
}

function injectStyle(selectors: ResolvedSelectors) {
    if (styleInjected || typeof document === 'undefined') return

    const contentSelectors = selectors.content
        .map((sel) => `body.${CLASS_NAME} ${sel}, body.${CLASS_NAME} ${sel} *`)
        .join(',\n')

    const parentSelectors = selectors.parentContainers
        .map((sel) => `body.${CLASS_NAME} ${sel}, body.${CLASS_NAME} ${sel} *`)
        .join(',\n')

    const style = document.createElement('style')
    style.id = STYLE_ID

    style.textContent = `
    body.${CLASS_NAME} * {
      pointer-events: none !important;
    }

    ${parentSelectors},
    ${contentSelectors} {
      pointer-events: auto !important;
    }
  `

    document.head.appendChild(style)
    styleInjected = true
}

function applyLock(selectors: ResolvedSelectors) {
    injectStyle(selectors)

    document.body.classList.add(CLASS_NAME)

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
        e.preventDefault()
    }

    document.addEventListener('wheel', wheelHandler, { passive: false })
    document.addEventListener('touchmove', touchHandler, { passive: false })
}

function removeLock() {
    document.body.classList.remove(CLASS_NAME)

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
        // This allows multiple dropdowns in the same modal/popover to stay open
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

    if (!idRef.current) {
        dropdownIdCounter++
        idRef.current = `dropdown-${dropdownIdCounter}`
    }

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
                close: onClose,
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
    }, [isOpen, onClose, options?.triggerElement])
}

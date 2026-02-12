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

let activeDropdownController: DropdownController | null = null
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

export function createOutsideInteractionHandler(
    parentContainerSelectors?: string[]
) {
    const parentSelectorString = (
        parentContainerSelectors ?? DEFAULT_SELECTORS.parentContainers
    ).join(', ')

    return (e: Event) => {
        const target = e.target as HTMLElement | null

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
            const trigger = options?.triggerElement ?? null

            const currentParentContainer = findParentContainer(
                trigger,
                selectorsRef.current.parentSelectorString
            )

            if (
                activeDropdownController &&
                activeDropdownController.id !== idRef.current
            ) {
                const previousParent = activeDropdownController.parentContainer

                const sameContext =
                    currentParentContainer &&
                    previousParent &&
                    currentParentContainer === previousParent

                if (!sameContext) {
                    activeDropdownController.close()
                }
            }

            activeDropdownController = {
                id: idRef.current,
                close: onClose,
                parentContainer: currentParentContainer,
            }

            activeLockCount++
            if (activeLockCount === 1) {
                applyLock(selectorsRef.current)
            }
        }

        return () => {
            if (!isOpen) return

            if (
                activeDropdownController &&
                activeDropdownController.id === idRef.current
            ) {
                activeDropdownController = null
            }

            activeLockCount--

            if (activeLockCount <= 0) {
                activeLockCount = 0
                removeLock()
            }
        }
    }, [isOpen, onClose, options?.triggerElement])
}

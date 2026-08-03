import {
    useCallback,
    useLayoutEffect,
    useRef,
    type FocusEventHandler,
    type RefObject,
} from 'react'

type UseSelectSearchFocusRecoveryOptions = {
    enabled: boolean
    open: boolean
    items: unknown
    searchInputRef: RefObject<HTMLInputElement | null>
}

export const useSelectSearchFocusRecovery = ({
    enabled,
    open,
    items,
    searchInputRef,
}: UseSelectSearchFocusRecoveryOptions) => {
    const focusedResultRef = useRef<{
        element: HTMLElement
        identity: string
    } | null>(null)

    const onFocusCapture = useCallback<FocusEventHandler<HTMLElement>>(
        (event) => {
            const target = event.target as HTMLElement
            if (target.matches('[role="menuitem"], [role="option"]')) {
                focusedResultRef.current = {
                    element: target,
                    identity:
                        target.dataset.value ??
                        target.dataset.id ??
                        target.textContent ??
                        '',
                }
            }
        },
        []
    )

    useLayoutEffect(() => {
        const focusedResult = focusedResultRef.current
        if (!enabled || !open || !focusedResult) {
            return
        }

        const currentIdentity =
            focusedResult.element.dataset.value ??
            focusedResult.element.dataset.id ??
            focusedResult.element.textContent ??
            ''
        if (
            focusedResult.element.isConnected &&
            currentIdentity === focusedResult.identity
        ) {
            return
        }

        focusedResultRef.current = null
        searchInputRef.current?.focus()
    }, [enabled, items, open, searchInputRef])

    return onFocusCapture
}
